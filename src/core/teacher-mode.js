/**
 * Teacher Mode Module
 * ===================
 * Teacher/dev mode for debugging and free navigation.
 * 
 * @module src/core/teacher-mode
 * @version 2.0.0 (Full Migration)
 */

import { STATES } from '../utils/constants.js';
import { 
  setActiveUnit, 
  getActiveCurriculum, 
  getCurrentUnitId,
  getUnitDisplayName,
  getFriendlyLessonName
} from './curriculum-loader.js';
import {
  setState,
  setCurrentLesson,
  render,
  getAvailableUnits,
  getCurrentLessonId,
  getCurrentState,
  getCompletedUnits,
  setLastMasterPassed,
  setLastWritingPassed,
  setLastListenWritePassed,
  setControlledStageIndex,
  resetIntegrationState
} from './navigation.js';
import { buildUnitSelectorUI, buildLessonSelectorUI } from './ui-builders.js';
import { setLanguageDisplay, getLanguageDisplay, toggleTeacherMode as syncTeacherMode, toggleDevBypass as syncDevBypass } from '../state/app-state.js';
import { openClassProfile, initClassProfile, closeClassProfile, isClassProfileOpen } from '../components/class-profile.js';
import { initClassroomMode, buildClassroomSection } from './classroom-mode.js';

// ============================
// MODE FLAGS
// ============================

let _TEACHER_MODE = false;
let _DEV_BYPASS_GATES = false;
let _rebuildInProgress = false;

// DOM refs
let teacherPanelEl = null;
let teacherToggleBtn = null;
let teacherUnitSelect = null;
let teacherLessonSelect = null;
let teacherTileSelect = null;
let teacherCloseBtn = null;
let teacherLangBtns = null;
let teacherClassBtn = null;

// ============================
// INITIALIZATION
// ============================

export function initTeacherMode() {
  teacherPanelEl = document.getElementById("teacher-panel");
  teacherToggleBtn = document.getElementById("teacher-toggle-btn");
  teacherUnitSelect = document.getElementById("teacher-unit-select");
  teacherLessonSelect = document.getElementById("teacher-lesson-select");
  teacherTileSelect = document.getElementById("teacher-tile-select");
  teacherCloseBtn = document.getElementById("teacher-close-btn");
  
  // Toggle button handler
  if (teacherToggleBtn) {
    teacherToggleBtn.addEventListener("click", async () => {
      await toggleTeacherMode();
    });
  }
  
  // Close button handler
  if (teacherCloseBtn) {
    teacherCloseBtn.addEventListener("click", () => {
      setTeacherMode(false);
    });
  }
  
  // Dropdown handlers
  if (teacherUnitSelect) {
    teacherUnitSelect.addEventListener("change", async (e) => {
      if (_TEACHER_MODE) {
        const target = /** @type {HTMLSelectElement} */ (e.target);
        await goToUnit(target.value);
      }
    });
  }
  
  if (teacherLessonSelect) {
    teacherLessonSelect.addEventListener("change", (e) => {
      if (_TEACHER_MODE) {
        const target = /** @type {HTMLSelectElement} */ (e.target);
        goToLesson(target.value);
      }
    });
  }
  
  if (teacherTileSelect) {
    teacherTileSelect.addEventListener("change", (e) => {
      if (_TEACHER_MODE) {
        const target = /** @type {HTMLSelectElement} */ (e.target);
        goToTile(target.value);
      }
    });
  }
  
  // Language control buttons
  teacherLangBtns = document.getElementById("teacher-lang-btns");
  if (teacherLangBtns) {
    teacherLangBtns.addEventListener("click", (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      if (target.classList.contains("teacher-lang-btn")) {
        const lang = target.dataset.lang;
        if (lang && ['auto', 'all-uz', 'all-en'].includes(lang)) {
          setLanguageDisplay(/** @type {'auto' | 'all-uz' | 'all-en'} */ (lang));
          
          // Update active state
          teacherLangBtns.querySelectorAll('.teacher-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
          });
          
          // Re-render current tile to apply language change
          render();
          
          console.log(`🌐 Language display set to: ${lang}`);
        }
      }
    });
  }
  
  // Class Profile button
  teacherClassBtn = document.getElementById("teacher-class-profile-btn");
  if (teacherClassBtn) {
    teacherClassBtn.addEventListener("click", () => {
      openClassProfile();
    });
  }
  
  // Initialize class profile system (loads data, sets up auto-sync)
  initClassProfile();
  
  // Initialize classroom mode controls
  initClassroomMode();
  
  console.log("✅ Teacher mode initialized");
}

// ============================
// TEACHER MODE TOGGLE
// ============================

export async function toggleTeacherMode() {
  await setTeacherMode(!_TEACHER_MODE);
}

export async function setTeacherMode(enabled) {
  if (_TEACHER_MODE === enabled) return;
  
  _TEACHER_MODE = enabled;
  _DEV_BYPASS_GATES = enabled; // Auto-enable bypass when teacher mode is on
  
  // ✅ Critical sync: keep AppState.modes.teacher in sync
  syncTeacherMode(enabled);
  syncDevBypass(enabled);
  
  console.log(`👨‍🏫 TEACHER MODE ${enabled ? "✅ ON" : "❌ OFF"}`);
  
  if (enabled) {
    // Detect all units
    const units = await window.detectAvailableUnits?.() || getAvailableUnits();
    window.setAvailableUnits?.(units);
    
    await buildUnitSelectorUI();
    buildLessonSelectorUI();
    
    // Build classroom mode controls in teacher panel
    if (teacherPanelEl) {
      buildClassroomSection(teacherPanelEl);
    }
  } else {
    // Close class profile panel if it was open
    if (isClassProfileOpen()) closeClassProfile();
  }
  
  updateTeacherPanelUI();
  render();
}

export function getTeacherMode() {
  return _TEACHER_MODE;
}

export function getDevBypassGates() {
  return _DEV_BYPASS_GATES;
}

export function setDevBypassGates(enabled) {
  if (_DEV_BYPASS_GATES === enabled || _rebuildInProgress) return;
  
  _DEV_BYPASS_GATES = enabled;
  syncDevBypass(enabled); // ✅ Keep AppState.modes.devBypassGates in sync
  console.log(`🔧 DEV: Gate Bypass ${enabled ? "✅ ON" : "❌ OFF"}`);
  
  _rebuildInProgress = true;
  Promise.resolve().then(async () => {
    try {
      await buildUnitSelectorUI();
      buildLessonSelectorUI();
      render();
    } catch (e) {
      console.error("Error rebuilding UI:", e);
    }
  }).finally(() => {
    _rebuildInProgress = false;
  });
}

// ============================
// NAVIGATION COMMANDS
// ============================

export function goToTile(stateName) {
  if (!_TEACHER_MODE) {
    console.error("❌ Teacher Mode is OFF. Enable with: TEACHER_MODE = true");
    return;
  }
  
  const stateInput = String(stateName || "").toUpperCase().trim();
  const stateKeys = Object.keys(STATES);
  
  let targetState = null;
  for (const key of stateKeys) {
    if (key === stateInput || STATES[key].toUpperCase() === stateInput) {
      targetState = STATES[key];
      break;
    }
  }
  
  if (!targetState) {
    console.error("❌ Unknown state:", stateInput);
    console.log("Available states:", stateKeys.join(", "));
    return;
  }
  
  console.log("🎯 Teacher Mode: Moving to", targetState);
  
  // Reset gate flags
  if (targetState === STATES.WRITING) setLastWritingPassed(false);
  if (targetState === STATES.LISTEN_WRITE) setLastListenWritePassed(false);
  if (targetState === STATES.MISTAKE) setLastListenWritePassed(true);
  
  setState(targetState);
  
  // Update dropdown
  if (teacherTileSelect) {
    const stateKey = Object.keys(STATES).find(k => STATES[k] === targetState);
    teacherTileSelect.value = stateKey || targetState.toUpperCase();
  }
  
  return "✅ Moved to " + targetState;
}

export function goToLesson(lessonId) {
  if (!_TEACHER_MODE) {
    console.error("❌ Teacher Mode is OFF");
    return;
  }
  
  _DEV_BYPASS_GATES = true;
  
  const lessons = getActiveCurriculum()?.lessons || {};
  if (!lessons[lessonId]) {
    console.error("❌ Unknown lesson:", lessonId);
    console.log("Available lessons:", Object.keys(lessons).join(", "));
    return;
  }
  
  console.log("🎯 Teacher Mode: Moving to lesson", lessonId);
  
  setCurrentLesson(lessonId);
  setLastMasterPassed(false);
  setLastWritingPassed(false);
  setLastListenWritePassed(false);
  setControlledStageIndex(0);
  resetIntegrationState();
  setState(STATES.INTRO);
  
  if (teacherLessonSelect) {
    teacherLessonSelect.value = lessonId;
  }
  if (teacherTileSelect) {
    teacherTileSelect.value = "";
  }
  
  return "✅ Moved to lesson " + lessonId;
}

export async function goToUnit(unitId) {
  if (!_TEACHER_MODE) {
    console.error("❌ Teacher Mode is OFF");
    return "Error: Teacher Mode is OFF";
  }
  
  _DEV_BYPASS_GATES = true;
  
  const unitToLoad = String(unitId || "U01").toUpperCase().trim();
  const availableUnits = getAvailableUnits();
  
  if (!availableUnits.includes(unitToLoad)) {
    console.error("❌ Unknown unit:", unitToLoad);
    console.log("Available units:", availableUnits.join(", "));
    return "Error: Unit not found";
  }
  
  console.log("🎯 Teacher Mode: Loading", unitToLoad);
  
  const loaded = await setActiveUnit(unitToLoad);
  if (!loaded) {
    console.error("❌ Failed to load unit:", unitToLoad);
    return "Error: Failed to load unit";
  }
  
  // Go to first lesson
  const firstLesson = Object.keys(getActiveCurriculum()?.lessons || {})[0];
  if (firstLesson) {
    return goToLesson(firstLesson);
  }
  
  return "✅ Unit " + unitToLoad + " loaded";
}

// ============================
// INFO COMMANDS
// ============================

export function showUnits() {
  const availableUnits = getAvailableUnits();
  const completedUnits = getCompletedUnits();
  
  console.table(
    availableUnits.map(unitId => ({
      unit: unitId,
      completed: completedUnits.has(unitId) ? "✅" : "❌"
    }))
  );
  return "Use: goToUnit('U02') to navigate to a unit";
}

export function showLessons() {
  const lessons = getActiveCurriculum()?.lessons || {};
  console.table(
    Object.entries(lessons).map(([id, lesson]) => ({
      id,
      title: lesson.title_en || "(no title)",
      function: lesson.function_en || "(no function)"
    }))
  );
  return "Use: goToLesson('lesson_id') to navigate";
}

export function showTiles() {
  const states = Object.values(STATES);
  console.log("Available Tiles/States:");
  states.forEach(state => console.log("  " + state));
  return "Use: goToTile('state_name') to navigate";
}

// ============================
// TEACHER PANEL UI
// ============================

export function updateTeacherPanelUI() {
  if (!teacherPanelEl || !teacherToggleBtn) return;
  
  const selectorBar = /** @type {HTMLElement|null} */ (document.querySelector('.selector-bar'));
  
  if (_TEACHER_MODE) {
    teacherPanelEl.classList.add("active");
    teacherToggleBtn.classList.add("active");
    document.body.classList.add("teacher-mode-active");
    
    if (selectorBar) selectorBar.style.display = 'none';
    
    // Update status
    const statusMini = document.getElementById("teacher-status-display");
    if (statusMini) {
      statusMini.textContent = `${getCurrentUnitId()} > ${getCurrentLessonId()} > ${getCurrentState()}`;
    }
    
    // Populate unit dropdown
    if (teacherUnitSelect) {
      teacherUnitSelect.innerHTML = '';
      const units = getAvailableUnits();
      units.forEach(unitId => {
        const option = document.createElement("option");
        option.value = unitId;
        option.textContent = getUnitDisplayName(unitId);
        if (unitId === getCurrentUnitId()) option.selected = true;
        teacherUnitSelect.appendChild(option);
      });
    }
    
    // Populate lesson dropdown
    if (teacherLessonSelect) {
      const lessons = getActiveCurriculum()?.lessons || {};
      teacherLessonSelect.innerHTML = '';
      Object.keys(lessons).forEach(lessonId => {
        const option = document.createElement("option");
        option.value = lessonId;
        option.textContent = getFriendlyLessonName(lessonId);
        if (lessonId === getCurrentLessonId()) option.selected = true;
        teacherLessonSelect.appendChild(option);
      });
    }
    
    // Populate tile dropdown
    if (teacherTileSelect) {
      const tileOrder = [
        { value: STATES.INTRO, label: "🏠 Intro" },
        { value: STATES.VOCAB, label: "📚 Vocabulary" },
        { value: STATES.DIALOGUE, label: "💬 Dialogue" },
        { value: STATES.PATTERN, label: "🔤 Patterns" },
        { value: STATES.FUNCTION, label: "✅ Function Check" },
        { value: STATES.CONTROLLED, label: "🎯 Controlled Practice" },
        { value: STATES.WRITING, label: "✍️ Writing" },
        { value: STATES.LISTEN_WRITE, label: "👂 Listen & Write" },
        { value: STATES.MISTAKE, label: "🔄 Mistake Review" },
        { value: STATES.DONE, label: "🎉 Done" }
      ];
      teacherTileSelect.innerHTML = '';
      tileOrder.forEach(tile => {
        const option = document.createElement("option");
        option.value = tile.value;
        option.textContent = tile.label;
        if (tile.value === getCurrentState()) option.selected = true;
        teacherTileSelect.appendChild(option);
      });
    }
    
    // Sync language control buttons with current state
    if (teacherLangBtns) {
      const currentLang = getLanguageDisplay();
      teacherLangBtns.querySelectorAll('.teacher-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
      });
    }
  } else {
    teacherPanelEl.classList.remove("active");
    teacherToggleBtn.classList.remove("active");
    document.body.classList.remove("teacher-mode-active");
    
    if (selectorBar) (/** @type {HTMLElement} */ (selectorBar)).style.display = 'flex';
    
    // Clear dropdowns
    if (teacherUnitSelect) teacherUnitSelect.innerHTML = '';
    if (teacherLessonSelect) teacherLessonSelect.innerHTML = '';
    if (teacherTileSelect) teacherTileSelect.innerHTML = '';
  }
}

// ============================
// WINDOW EXPORTS
// ============================

if (typeof window !== 'undefined') {
  // Mode getters/setters as properties
  Object.defineProperty(window, 'TEACHER_MODE', {
    get: () => _TEACHER_MODE,
    set: (v) => setTeacherMode(v),
    configurable: true
  });
  
  Object.defineProperty(window, 'DEV_BYPASS_GATES', {
    get: () => _DEV_BYPASS_GATES,
    set: (v) => setDevBypassGates(v),
    configurable: true
  });
  
  // Functions
  window.initTeacherMode = initTeacherMode;
  window.toggleTeacherMode = toggleTeacherMode;
  window.setTeacherMode = setTeacherMode;
  window.getTeacherMode = getTeacherMode;
  window.updateTeacherPanelUI = updateTeacherPanelUI;
  
  // Navigation commands
  window.goToTile = goToTile;
  window.goToLesson = goToLesson;
  window.goToUnit = goToUnit;
  window.showUnits = showUnits;
  window.showLessons = showLessons;
  window.showTiles = showTiles;
  
  // Dev toggle
  window.__DEV_toggleGateBypass = async () => {
    setDevBypassGates(!_DEV_BYPASS_GATES);
  };
  
  // Teacher mode command
  window.teacherMode = (cmd) => {
    if (!cmd || cmd === "on") {
      setTeacherMode(true);
      return "✅ Teacher Mode ON";
    } else if (cmd === "off") {
      setTeacherMode(false);
      return "❌ Teacher Mode OFF";
    } else if (cmd === "status") {
      return `Teacher Mode: ${_TEACHER_MODE ? "ON" : "OFF"}`;
    }
    return "Usage: teacherMode('on') or teacherMode('off')";
  };
}
