/**
 * Navigation Module
 * =================
 * Handles application navigation, state transitions, and tile rendering.
 * State is delegated to AppState (single source of truth).
 * Tile dispatch uses the tile registry (no more window.* dispatch).
 * 
 * @module src/core/navigation
 * @version 3.0.0 (State Unification + Tile Registry)
 */

import { STATES } from '../utils/constants.js';
import { getCurrentLesson, getUnitDisplayName, getCurrentUnitId, getMissingKeys, mergeMissingKeys } from './curriculum-loader.js';
import { mountTile, unmountActive, hasTile } from '../tiles/tile-registry.js';
import {
  AppState,
  setTile as appSetTile,
  setLesson as appSetLesson,
  setUnit as appSetUnit,
  setControlledStage as appSetControlledStage,
  resetIntegrationState as appResetIntegrationState,
  completeLesson as appCompleteLesson,
  completeUnit as appCompleteUnit,
  awardPoints as appAwardPoints,
  addMaxScore as appAddMaxScore,
  resetSessionScore as appResetSessionScore,
  setGate,
  getGate,
  hydrateState,
  persistState,
} from '../state/app-state.js';

// ============================
// CONVENIENCE ACCESSORS (delegate to AppState)
// ============================

function getCurrentLessonIdInternal() { return AppState.navigation.lessonId; }
function getCurrentStateInternal() { return AppState.navigation.tile; }

// DOM refs (set during init — these are NOT state)
let tileContainer = null;
let lessonMetaEl = null;
let stateDebugEl = null;
let lessonSelectorEl = null;

// ============================
// INITIALIZATION
// ============================

export function initNavigation() {
  tileContainer = document.getElementById("tile-container");
  lessonMetaEl = document.getElementById("lesson-meta");
  stateDebugEl = document.getElementById("state-debug");
  lessonSelectorEl = document.getElementById("lesson-selector");
  
  // Hydrate state from storage (AppState is the single source of truth)
  hydrateState();
  
  console.log("✅ Navigation initialized (v3 — tile registry + unified state)");
}

// ============================
// STATE MANAGEMENT
// ============================

export function setState(newState) {
  appSetTile(newState);
  
  // Persist
  persistState();
  
  // Reset score on new lesson
  if (newState === STATES.INTRO) {
    appResetSessionScore();
  }
  
  render();
  
  // Update teacher panel if active
  if (AppState.modes.teacher && typeof window.updateTeacherPanelUI === 'function') {
    window.updateTeacherPanelUI();
  }
}

export function setCurrentLesson(lessonId) {
  appSetLesson(lessonId);
  persistState();
}

export function getCurrentState() {
  return getCurrentStateInternal();
}

export function getCurrentLessonId() {
  return getCurrentLessonIdInternal();
}

// ============================
// MAIN RENDER DISPATCHER
// ============================

// Coalesce rapid render() calls to avoid 2–3 micro-refreshes when opening a page
let renderScheduled = false;
// Only run slide-in when state/lesson changed (avoids micro-refresh on every paint)
let lastRenderedKey = null;
function flushRender() {
  renderScheduled = false;
  doRender();
}

function doRender() {
  const currentState = getCurrentStateInternal();
  const currentLessonId = getCurrentLessonIdInternal();
  const lesson = getCurrentLesson(currentLessonId) || {};

  // ╔═══════════════════════════════════════════════════════════════╗
  // ║  DIAGNOSTIC: doRender() dispatch trace                       ║
  // ╚═══════════════════════════════════════════════════════════════╝
  console.group('%c[DIAG] doRender() DISPATCH', 'background:#222;color:#0ff;font-weight:bold;padding:2px 8px;');
  console.log('currentState:', JSON.stringify(currentState));
  console.log('currentLessonId:', currentLessonId);
  console.log('lesson keys:', Object.keys(lesson));
  console.log('lesson.lesson_id:', lesson.lesson_id);
  console.log('lesson.lesson_dialogue?', !!lesson.lesson_dialogue);
  if (lesson.lesson_dialogue) {
    console.log('  dialogues count:', lesson.lesson_dialogue.dialogues?.length);
    console.log('  title_en:', lesson.lesson_dialogue.title_en);
    lesson.lesson_dialogue.dialogues?.forEach((d, i) => {
      console.log(`  dialogue[${i}]: id=${d.id}, turns=${d.turns?.length}, context=${d.context_en}`);
    });
  }
  console.log('lesson.version:', lesson.version);
  console.log('lesson.source_dialogue:', lesson.source_dialogue);
  console.log('lesson.is_integration_lesson:', lesson.is_integration_lesson);
  console.log('STATES.DIALOGUE =', typeof STATES !== 'undefined' ? STATES.DIALOGUE : 'STATES not in scope');
  console.log('hasTile("dialogue"):', typeof hasTile === 'function' ? hasTile('dialogue') : 'hasTile not available');
  console.log('hasTile(currentState):', typeof hasTile === 'function' ? hasTile(currentState) : 'N/A');
  console.groupEnd();
  
  // Integration lesson check
  if (lesson.is_integration_lesson && lesson.integration_content) {
    renderIntegrationLesson(lesson);
    return;
  }
  
  // Update lesson meta
  if (lessonMetaEl) {
    const unitName = getUnitDisplayName(getCurrentUnitId());
    const lessonMatch = (lesson.lesson_id || currentLessonId || "").match(/_L(\d+)$/);
    const lessonNumber = lessonMatch ? parseInt(lessonMatch[1]) : "?";
    lessonMetaEl.textContent = `${unitName} · Lesson ${lessonNumber}`;
  }
  
  // Only run slide-in when state or lesson actually changed (avoids micro-refresh on every paint)
  const currentKey = `${currentState}-${currentLessonId}`;
  const shouldAnimate = lastRenderedKey !== null && lastRenderedKey !== currentKey;
  lastRenderedKey = currentKey;
  if (tileContainer && shouldAnimate) {
    tileContainer.classList.remove('slide-in');
    void tileContainer.offsetWidth;
    tileContainer.classList.add('slide-in');
  }

  // Unsubscribe from Sandwich when leaving VOCAB (e.g. "Next: Dialogue practice")
  if (currentState !== STATES.VOCAB && typeof window._sandwichUnsubscribe === 'function') {
    window._sandwichUnsubscribe();
    window._sandwichUnsubscribe = null;
  }

  // ============================
  // TILE DISPATCH (via tile registry — no more window.* dispatch)
  // ============================
  let dispatched = false;

  if (currentState === STATES.VOCAB) {
    if (typeof window._sandwichUnsubscribe === 'function') {
      window._sandwichUnsubscribe();
      window._sandwichUnsubscribe = null;
    }
    // Always use unified vocab tile (dialogue-first + card grid)
    // Sandwich logic merged into renderVocabTile — no more version gate
    dispatched = mountTile('vocab', lesson);
  } else if (currentState === STATES.UNIT_ERROR_DETECTION) {
    dispatched = mountTile('unit_error_detection', getCurrentUnitId());
  } else if (currentState === STATES.GRAND_TILE) {
    dispatched = mountTile('grand_tile', getCurrentUnitId());
  } else if (hasTile(currentState)) {
    // Generic dispatch: state ID matches a registered tile
    dispatched = mountTile(currentState, lesson);
  }

  if (!dispatched) {
    clearTileContainer();
    if (tileContainer) {
      tileContainer.textContent = `ERROR: Unknown state ${currentState}`;
    }
  }
  
  updateDebug(lesson);
}

/**
 * Public render entry: coalesces rapid calls to avoid micro-refreshes.
 */
export function render() {
  if (renderScheduled) return;
  renderScheduled = true;
  requestAnimationFrame(flushRender);
}

// ============================
// INTEGRATION LESSON
// ============================

function renderIntegrationLesson(lesson) {
  const content = lesson.integration_content;
  const intState = AppState.navigation.integrationState;
  
  switch (intState) {
    case null:
    case 'dialogue':
      if (content.dialogue) {
        mountTile('integration_dialogue', content.dialogue, lesson);
      }
      break;
    case 'dialogue_uz':
      if (content.dialogue) {
        mountTile('integration_dialogue_uz', content.dialogue, lesson);
      }
      break;
    case 'transformation':
      if (content.transformation) {
        mountTile('integration_transformation', content.transformation, lesson);
      }
      break;
    case 'listen_write':
      // TODO: register integration_listen_write tile
      if (content.listen_write && hasTile('integration_listen_write')) {
        mountTile('integration_listen_write', content.listen_write, lesson);
      }
      break;
    case 'done':
      // TODO: register integration_done tile
      if (hasTile('integration_done')) {
        mountTile('integration_done', lesson);
      }
      break;
  }
}

export function resetIntegrationState() {
  appResetIntegrationState();
}

export function setIntegrationState(state) {
  AppState.navigation.integrationState = state;
}

export function getIntegrationState() {
  return AppState.navigation.integrationState;
}

export function getIntegrationProgress() {
  return AppState.navigation.integrationProgress;
}

// ============================
// TILE CONTAINER HELPERS
// ============================

export function getTileContainer() {
  return tileContainer;
}

export function clearTileContainer() {
  if (!tileContainer) return;
  
  tileContainer.classList.remove("function-tile");
  tileContainer.innerHTML = "";
  
  // Progress bar
  const progressBar = createProgressBar();
  if (progressBar) tileContainer.appendChild(progressBar);
  
  // Back button
  const backBtn = createBackButton();
  if (backBtn) tileContainer.appendChild(backBtn);
  
  // Missing keys warning
  const missingKeys = getMissingKeys();
  if (missingKeys?.length) {
    const warn = document.createElement("div");
    warn.className = "feedback err";
    warn.textContent = "MISSING / UNCERTAIN: " + missingKeys.join(" | ");
    tileContainer.appendChild(warn);
  }
}

function createProgressBar() {
  const stateOrder = [
    STATES.INTRO, STATES.VOCAB, STATES.DIALOGUE, STATES.PATTERN,
    STATES.FUNCTION, STATES.CONTROLLED, STATES.WRITING,
    STATES.LISTEN_WRITE, STATES.MISTAKE
  ];
  
  const currentIndex = stateOrder.indexOf(getCurrentStateInternal());
  if (currentIndex < 0) return null;
  
  const container = document.createElement("div");
  container.className = "progress-container";
  
  const track = document.createElement("div");
  track.className = "progress-track";
  
  stateOrder.forEach((state, idx) => {
    const node = document.createElement("div");
    node.className = "progress-node";
    if (idx < currentIndex) node.classList.add("completed");
    if (idx === currentIndex) node.classList.add("active");
    track.appendChild(node);
  });
  
  const label = document.createElement("div");
  label.style.cssText = "text-align:center;font-size:0.85rem;color:#666;margin-top:8px;";
  label.textContent = `Step ${currentIndex + 1} of ${stateOrder.length}`;
  
  container.appendChild(track);
  container.appendChild(label);
  return container;
}

function createBackButton() {
  const stateOrder = [
    STATES.INTRO, STATES.VOCAB, STATES.DIALOGUE, STATES.PATTERN,
    STATES.FUNCTION, STATES.CONTROLLED, STATES.WRITING,
    STATES.LISTEN_WRITE, STATES.MISTAKE
  ];
  
  const idx = stateOrder.indexOf(getCurrentStateInternal());
  if (idx <= 0 || getCurrentStateInternal() === STATES.DONE) return null;
  
  const btn = document.createElement("button");
  btn.textContent = "← Back";
  btn.className = "back-btn";
  btn.style.cssText = "margin:10px 0;padding:10px 20px;background:#666;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;";
  btn.onclick = () => setState(stateOrder[idx - 1]);
  return btn;
}

function updateDebug(lesson) {
  if (!stateDebugEl) return;
  stateDebugEl.textContent = `Unit: ${getCurrentUnitId()} | Lesson: ${lesson.lesson_id || getCurrentLessonIdInternal()} | State: ${getCurrentStateInternal()}`;
}

// ============================
// SCORING (delegate to AppState)
// ============================

export function resetSessionScore() {
  appResetSessionScore();
  updateScoreDisplay();
}

export function awardPoints(points, tileName) {
  appAwardPoints(points, tileName || '');
  updateScoreDisplay();
  persistState();
}

export function addMaxScore(points) {
  appAddMaxScore(points);
  updateScoreDisplay();
  persistState();
}

function updateScoreDisplay() {
  const el = document.getElementById('sessionScoreDisplay');
  if (el) {
    const s = AppState.session;
    const pct = s.maxScore > 0 ? Math.round((s.score / s.maxScore) * 100) : 0;
    el.textContent = `${s.score} / ${s.maxScore} (${pct}%)`;
  }
}

export function getSessionScore() {
  return { score: AppState.session.score, maxScore: AppState.session.maxScore, tiles: AppState.session.tileScores };
}

// ============================
// COMPLETION TRACKING (delegate to AppState)
// ============================

export function markLessonCompleted(lessonId) {
  appCompleteLesson(lessonId);
}

export function markUnitCompleted(unitId) {
  appCompleteUnit(unitId);
}

export function isLessonCompleted(lessonId) {
  return AppState.progress.completedLessons.has(lessonId);
}

export function isUnitCompleted(unitId) {
  return AppState.progress.completedUnits.has(unitId);
}

export function getCompletedLessons() {
  return AppState.progress.completedLessons;
}

export function getCompletedUnits() {
  return AppState.progress.completedUnits;
}

// ============================
// GATE FLAGS (delegate to AppState)
// ============================

export function setLastWritingPassed(val) { setGate('lastWritingPassed', val); }
export function getLastWritingPassed() { return getGate('lastWritingPassed'); }
export function setLastListenWritePassed(val) { setGate('lastListenWritePassed', val); }
export function getLastListenWritePassed() { return getGate('lastListenWritePassed'); }
export function setLastMasterPassed(val) { setGate('lastMasterPassed', val); }
export function getLastMasterPassed() { return getGate('lastMasterPassed'); }

// ============================
// CONTROLLED STAGE (delegate to AppState)
// ============================

export function getControlledStageIndex() { return AppState.navigation.controlledStage; }
export function setControlledStageIndex(idx) { 
  appSetControlledStage(idx);
  saveControlledStageProgress();
}
export function resetControlledStage() {
  appSetControlledStage(0);
  saveControlledStageProgress();
}

function saveControlledStageProgress() {
  try {
    sessionStorage.setItem(`controlledStage_${getCurrentLessonIdInternal()}`, String(AppState.navigation.controlledStage));
  } catch {}
}

// ============================
// AVAILABLE UNITS (delegate to AppState)
// ============================

export function setAvailableUnits(units) { AppState.data.availableUnits = units; }
export function getAvailableUnits() { return AppState.data.availableUnits; }

// ============================
// WINDOW EXPORTS (backward compat — functions delegate to AppState)
// ============================

if (typeof window !== 'undefined') {
  // Core functions (still needed by tile-utils.js and legacy code)
  window.setState = setState;
  window.setCurrentLesson = setCurrentLesson;
  window.getCurrentState = getCurrentState;
  window.getCurrentLessonId = getCurrentLessonId;
  window.render = render;
  window.initNavigation = initNavigation;
  
  // Tile container
  Object.defineProperty(window, 'tileContainer', {
    get() { return tileContainer; },
    configurable: true
  });
  window.getTileContainer = getTileContainer;
  /** @type {any} */ (window).clearTileContainer = clearTileContainer;
  
  // Scoring
  window.resetSessionScore = resetSessionScore;
  window.awardPoints = awardPoints;
  window.addMaxScore = addMaxScore;
  window.getSessionScore = getSessionScore;
  
  // Completion
  window.markLessonCompleted = markLessonCompleted;
  window.markUnitCompleted = markUnitCompleted;
  window.isLessonCompleted = isLessonCompleted;
  window.isUnitCompleted = isUnitCompleted;
  Object.defineProperty(window, 'completedLessons', {
    get() { return AppState.progress.completedLessons; },
    configurable: true
  });
  Object.defineProperty(window, 'completedUnits', {
    get() { return AppState.progress.completedUnits; },
    configurable: true
  });
  
  // Gates (live getters — not stale snapshots)
  Object.defineProperty(window, 'lastWritingPassed', {
    get() { return getGate('lastWritingPassed'); },
    set(v) { setGate('lastWritingPassed', v); },
    configurable: true
  });
  Object.defineProperty(window, 'lastListenWritePassed', {
    get() { return getGate('lastListenWritePassed'); },
    set(v) { setGate('lastListenWritePassed', v); },
    configurable: true
  });
  Object.defineProperty(window, 'lastMasterPassed', {
    get() { return getGate('lastMasterPassed'); },
    set(v) { setGate('lastMasterPassed', v); },
    configurable: true
  });
  window.setLastWritingPassed = setLastWritingPassed;
  window.setLastListenWritePassed = setLastListenWritePassed;
  window.setLastMasterPassed = setLastMasterPassed;
  
  // Controlled
  Object.defineProperty(window, 'controlledStageIndex', {
    get() { return AppState.navigation.controlledStage; },
    set(v) { appSetControlledStage(v); },
    configurable: true
  });
  window.getControlledStageIndex = getControlledStageIndex;
  window.setControlledStageIndex = setControlledStageIndex;
  
  // Integration (delegated — AppState already defines these via defineProperty)
  window.resetIntegrationState = resetIntegrationState;
  window.setIntegrationState = setIntegrationState;
  
  // Units
  Object.defineProperty(window, 'availableUnits', {
    get() { return AppState.data.availableUnits; },
    set(v) { AppState.data.availableUnits = v; },
    configurable: true
  });
  window.setAvailableUnits = setAvailableUnits;
  window.getAvailableUnits = getAvailableUnits;
  
  // currentState / currentLessonId as live getters
  Object.defineProperty(window, 'currentState', {
    get() { return getCurrentStateInternal(); },
    set(v) { appSetTile(v); },
    configurable: true
  });
  // currentLessonId already defined by app-state.js — don't redefine
}
