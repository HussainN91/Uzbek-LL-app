/**
 * Application State Module
 * ========================
 * Centralized state management with persistence.
 * Single source of truth for all application state.
 * 
 * @module src/state/app-state
 * @version 2.0.0 (Phase 2 Refactor)
 */

// JSDoc Type Imports
/** @typedef {import('../types/state').NavigationState} NavigationState */
/** @typedef {import('../types/state').ProgressState} ProgressState */
/** @typedef {import('../types/state').SessionState} SessionState */
/** @typedef {import('../types/state').ModesState} ModesState */
/** @typedef {import('../types/state').DataState} DataState */
/** @typedef {import('../types/state').StateObserver} StateObserver */
/** @typedef {import('../types/state').TileState} TileState */
/** @typedef {import('../types/state').AppStateShape} AppStateShape */

import { STATES, CONTROLLED_STAGES } from '../utils/constants.js';
import { 
  loadGameState, 
  saveGameState, 
  loadCompletedLessons,
  saveCompletedLessons,
  loadCompletedUnits,
  saveCompletedUnits,
  loadUsageTracker,
  saveUsageTracker,
} from '../utils/storage.js';

// ============================
// STATE SHAPE
// ============================

/**
 * Application State
 * Single source of truth for all application state
 */
/** @type {AppStateShape} */
const AppState = {
  // ============================
  // NAVIGATION STATE
  // ============================
  navigation: {
    unitId: 'U01',
    lessonId: 'U01_L01',
    tile: STATES.INTRO,
    controlledStage: 0,
    integrationState: null, // 'dialogue' | 'dialogue_uz' | 'transformation' | 'listen_write'
    integrationProgress: {
      dialogueAnswered: false,
      transformationsPassed: 0,
      totalTransformations: 0,
    },
    gates: {
      lastMasterPassed: false,
      lastWritingPassed: false,
      lastListenWritePassed: false,
    },
  },

  // ============================
  // PROGRESS STATE
  // ============================
  progress: {
    completedLessons: new Set(),
    completedUnits: new Set(),
    vocabCompletion: {},  // { vocabId: true }
    posGamesShown: {},    // { lessonId: true }
    preReadProgress: {},  // { lessonId_stageName: true }
    usageTracker: {},     // Token usage tracking
  },

  // ============================
  // SESSION STATE
  // ============================
  session: {
    score: 0,
    maxScore: 0,
    tileScores: {},       // { tileName: points }
    startTime: null,
    lastActivity: null,
  },

  // ============================
  // MODES STATE
  // ============================
  modes: {
    teacher: false,
    debug: false,
    devBypassGates: false,
  },

  // ============================
  // DATA STATE (loaded on demand)
  // ============================
  data: {
    curriculum: null,
    vocabCache: {},       // { unitId: vocabData }
    availableUnits: [],   // Detected available units
  },
};

// ============================
// STATE OBSERVERS
// ============================
/** @type {Set<StateObserver>} */
const observers = new Set();

/**
 * Subscribe to state changes
 * @param {StateObserver} callback - Called with (path, newValue, oldValue)
 * @returns {() => void} Unsubscribe function
 */
export function subscribe(callback) {
  observers.add(callback);
  return () => observers.delete(callback);
}

/**
 * Notify observers of state change
 * @param {string} path - Dot-separated path that changed
 * @param {*} newValue - New value
 * @param {*} oldValue - Previous value
 */
function notify(path, newValue, oldValue) {
  for (const observer of observers) {
    try {
      observer(path, newValue, oldValue);
    } catch (e) {
      console.error('State observer error:', e);
    }
  }
}

// ============================
// STATE ACTIONS
// ============================

/**
 * Set current tile/state
 * @param {TileState} tile - Tile state from STATES
 */
export function setTile(tile) {
  const oldValue = AppState.navigation.tile;
  if (oldValue === tile) return;
  
  AppState.navigation.tile = tile;
  notify('navigation.tile', tile, oldValue);
  
  // Track activity
  AppState.session.lastActivity = Date.now();
}

/**
 * Set current lesson
 * @param {string} lessonId - Lesson ID (e.g., "U01_L01")
 */
export function setLesson(lessonId) {
  const oldValue = AppState.navigation.lessonId;
  if (oldValue === lessonId) return;
  
  AppState.navigation.lessonId = lessonId;
  
  // Extract unit from lesson ID
  const unitId = lessonId.split('_')[0];
  if (unitId !== AppState.navigation.unitId) {
    AppState.navigation.unitId = unitId;
  }
  
  // Reset controlled stage for new lesson
  AppState.navigation.controlledStage = 0;
  
  // Reset integration state
  resetIntegrationState();
  
  notify('navigation.lessonId', lessonId, oldValue);
}

/**
 * Set current unit
 * @param {string} unitId - Unit ID (e.g., "U01")
 */
export function setUnit(unitId) {
  const oldValue = AppState.navigation.unitId;
  if (oldValue === unitId) return;
  
  AppState.navigation.unitId = unitId;
  notify('navigation.unitId', unitId, oldValue);
}

/**
 * Set controlled stage index
 * @param {number} stage - Stage index (0-based)
 */
export function setControlledStage(stage) {
  const maxStage = CONTROLLED_STAGES.length;
  const clampedStage = Math.max(0, Math.min(stage, maxStage));
  
  const oldValue = AppState.navigation.controlledStage;
  if (oldValue === clampedStage) return;
  
  AppState.navigation.controlledStage = clampedStage;
  notify('navigation.controlledStage', clampedStage, oldValue);
}

/**
 * Reset integration state (for lesson transitions)
 */
export function resetIntegrationState() {
  AppState.navigation.integrationState = null;
  AppState.navigation.integrationProgress = {
    dialogueAnswered: false,
    transformationsPassed: 0,
    totalTransformations: 0,
  };
}

// ============================
// GATE FLAGS
// ============================

/**
 * Set gate flag
 * @param {'lastMasterPassed'|'lastWritingPassed'|'lastListenWritePassed'} gate
 * @param {boolean} value
 */
export function setGate(gate, value) {
  if (!AppState.navigation.gates) {
    AppState.navigation.gates = { lastMasterPassed: false, lastWritingPassed: false, lastListenWritePassed: false };
  }
  const old = AppState.navigation.gates[gate];
  AppState.navigation.gates[gate] = value;
  if (old !== value) notify('navigation.gates.' + gate, value, old);
}

/**
 * Get gate flag
 * @param {'lastMasterPassed'|'lastWritingPassed'|'lastListenWritePassed'} gate
 * @returns {boolean}
 */
export function getGate(gate) {
  return AppState.navigation.gates?.[gate] ?? false;
}

/**
 * Mark a vocab item as completed
 * @param {string} vocabId - Vocab item ID
 */
export function completeVocab(vocabId) {
  AppState.progress.vocabCompletion[vocabId] = true;
  notify('progress.vocabCompletion', AppState.progress.vocabCompletion, null);
}

/**
 * Check if vocab is completed
 * @param {string} vocabId - Vocab item ID
 * @returns {boolean}
 */
export function isVocabComplete(vocabId) {
  return AppState.progress.vocabCompletion[vocabId] === true;
}

/**
 * Mark POS game as shown for a lesson
 * @param {string} lessonId - Lesson ID
 */
export function markPOSGameShown(lessonId) {
  AppState.progress.posGamesShown[lessonId] = true;
  notify('progress.posGamesShown', AppState.progress.posGamesShown, null);
}

/**
 * Check if POS game was shown for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {boolean}
 */
export function isPOSGameShown(lessonId) {
  return AppState.progress.posGamesShown[lessonId] === true;
}

/**
 * Mark pre-read as completed for a controlled stage
 * @param {string} lessonId - Lesson ID
 * @param {string} stageName - Stage name
 */
export function markPreReadComplete(lessonId, stageName) {
  const key = `${lessonId}_${stageName}`;
  if (!AppState.progress.preReadProgress) {
    AppState.progress.preReadProgress = {};
  }
  AppState.progress.preReadProgress[key] = true;
  notify('progress.preReadProgress', AppState.progress.preReadProgress, null);
}

/**
 * Check if pre-read is completed for a controlled stage
 * @param {string} lessonId - Lesson ID
 * @param {string} stageName - Stage name
 * @returns {boolean}
 */
export function isPreReadComplete(lessonId, stageName) {
  const key = `${lessonId}_${stageName}`;
  return AppState.progress?.preReadProgress?.[key] === true;
}

/**
 * Mark a lesson as completed
 * @param {string} lessonId - Lesson ID
 */
export function completeLesson(lessonId) {
  AppState.progress.completedLessons.add(lessonId);
  saveCompletedLessons(AppState.progress.completedLessons);
  notify('progress.completedLessons', AppState.progress.completedLessons, null);
}

/**
 * Mark a unit as completed
 * @param {string} unitId - Unit ID
 */
export function completeUnit(unitId) {
  AppState.progress.completedUnits.add(unitId);
  saveCompletedUnits(AppState.progress.completedUnits);
  notify('progress.completedUnits', AppState.progress.completedUnits, null);
}

/**
 * Award points to the session score
 * @param {number} points - Points to add
 * @param {string} [tileName=''] - Tile name for tracking
 */
export function awardPoints(points, tileName = '') {
  if (points <= 0) return;
  
  const oldScore = AppState.session.score;
  AppState.session.score += points;
  
  if (tileName) {
    AppState.session.tileScores[tileName] = 
      (AppState.session.tileScores[tileName] || 0) + points;
  }
  
  notify('session.score', AppState.session.score, oldScore);
}

/**
 * Add to maximum possible score
 * @param {number} points - Points to add to max
 */
export function addMaxScore(points) {
  const oldMax = AppState.session.maxScore;
  AppState.session.maxScore += points;
  notify('session.maxScore', AppState.session.maxScore, oldMax);
}

/**
 * Reset session score
 */
export function resetSessionScore() {
  AppState.session.score = 0;
  AppState.session.maxScore = 0;
  AppState.session.tileScores = {};
  AppState.session.startTime = Date.now();
  notify('session', AppState.session, null);
}

/**
 * Toggle teacher mode
 * @param {boolean} [force] - Optional force value
 */
export function toggleTeacherMode(force) {
  const oldValue = AppState.modes.teacher;
  AppState.modes.teacher = force !== undefined ? force : !oldValue;
  
  // Also update window flag for legacy code
  if (typeof window !== 'undefined') {
    window.TEACHER_MODE = AppState.modes.teacher;
  }
  
  notify('modes.teacher', AppState.modes.teacher, oldValue);
}

/**
 * Toggle dev gate bypass mode
 * @param {boolean} [force] - Optional force value
 */
export function toggleDevBypass(force) {
  const oldValue = AppState.modes.devBypassGates;
  AppState.modes.devBypassGates = force !== undefined ? force : !oldValue;
  
  // Also update window flag for legacy code
  if (typeof window !== 'undefined') {
    window.DEV_BYPASS_GATES = AppState.modes.devBypassGates;
  }
  
  notify('modes.devBypassGates', AppState.modes.devBypassGates, oldValue);
}

/**
 * Set curriculum data
 * @param {Object} curriculum - Curriculum data
 */
export function setCurriculum(curriculum) {
  AppState.data.curriculum = curriculum;
  
  // Also update window for legacy code
  if (typeof window !== 'undefined') {
    window.ACTIVE_CURRICULUM = curriculum;
  }
  
  notify('data.curriculum', curriculum, null);
}

/**
 * Cache vocab data for a unit
 * @param {string} unitId - Unit ID
 * @param {Object} vocabData - Vocab data
 */
export function cacheVocabData(unitId, vocabData) {
  AppState.data.vocabCache[unitId] = vocabData;
}

/**
 * Get cached vocab data
 * @param {string} unitId - Unit ID
 * @returns {Object|null}
 */
export function getCachedVocab(unitId) {
  return AppState.data.vocabCache[unitId] || null;
}

// ============================
// PERSISTENCE
// ============================

/**
 * Save current state to storage
 * Skipped in Teacher Mode to protect student data
 */
export function persistState() {
  if (AppState.modes.teacher) {
    if (window?.__DEV_AUDIT__) {
      console.log('⭐ State save skipped (Teacher Mode)');
    }
    return;
  }
  
  const stateToSave = {
    navigation: {
      unitId: AppState.navigation.unitId,
      lessonId: AppState.navigation.lessonId,
      tile: AppState.navigation.tile,
      controlledStage: AppState.navigation.controlledStage,
    },
    session: {
      score: AppState.session.score,
      maxScore: AppState.session.maxScore,
    },
  };
  
  saveGameState(stateToSave);
  saveCompletedLessons(AppState.progress.completedLessons);
  saveCompletedUnits(AppState.progress.completedUnits);
  saveUsageTracker(AppState.progress.usageTracker);
}

/**
 * Load state from storage
 * @returns {boolean} True if state was loaded
 */
export function hydrateState() {
  try {
    // Load game state
    const saved = loadGameState();
    if (saved) {
      if (saved.navigation) {
        Object.assign(AppState.navigation, saved.navigation);
      }
      if (saved.session) {
        Object.assign(AppState.session, saved.session);
      }
    }
    
    // Load progress
    AppState.progress.completedLessons = loadCompletedLessons();
    AppState.progress.completedUnits = loadCompletedUnits();
    AppState.progress.usageTracker = loadUsageTracker();
    
    if (window?.__DEV_AUDIT__) {
      console.log('📂 State hydrated from storage');
    }
    
    return true;
  } catch (e) {
    console.warn('Failed to hydrate state:', e);
    return false;
  }
}

/**
 * Reset all state to initial values
 */
export function resetState() {
  // Navigation
  AppState.navigation.unitId = 'U01';
  AppState.navigation.lessonId = 'U01_L01';
  AppState.navigation.tile = STATES.INTRO;
  AppState.navigation.controlledStage = 0;
  resetIntegrationState();
  
  // Progress
  AppState.progress.completedLessons.clear();
  AppState.progress.completedUnits.clear();
  AppState.progress.vocabCompletion = {};
  AppState.progress.posGamesShown = {};
  AppState.progress.preReadProgress = {};
  AppState.progress.usageTracker = {};
  
  // Session
  resetSessionScore();
  
  // Modes
  AppState.modes.teacher = false;
  AppState.modes.debug = false;
  AppState.modes.devBypassGates = false;
  
  notify('state', AppState, null);
}

// ============================
// STATE GETTERS (Read-only access)
// ============================

/**
 * Get current navigation state (read-only copy)
 * @returns {Object}
 */
export function getNavigation() {
  return { ...AppState.navigation };
}

/**
 * Get current session state (read-only copy)
 * @returns {Object}
 */
export function getSession() {
  return { ...AppState.session };
}

/**
 * Get current tile
 * @returns {string}
 */
export function getCurrentTile() {
  return AppState.navigation.tile;
}

/**
 * Get current lesson ID
 * @returns {string}
 */
export function getCurrentLessonId() {
  return AppState.navigation.lessonId;
}

/**
 * Get current unit ID
 * @returns {string}
 */
export function getCurrentUnitId() {
  return AppState.navigation.unitId;
}

/**
 * Check if teacher mode is active
 * @returns {boolean}
 */
export function isTeacherMode() {
  return AppState.modes.teacher;
}

/**
 * Get score percentage
 * @returns {number} Percentage (0-100)
 */
export function getScorePercentage() {
  if (AppState.session.maxScore === 0) return 0;
  return Math.round((AppState.session.score / AppState.session.maxScore) * 100);
}

// ============================
// EXPOSE STATE OBJECT (for debugging)
// ============================
export { AppState };

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  // Create a GameState-compatible object
  window.GameState = {
    get unitId() { return AppState.navigation.unitId; },
    set unitId(v) { setUnit(v); },
    get lessonId() { return AppState.navigation.lessonId; },
    set lessonId(v) { setLesson(v); },
    get tile() { return AppState.navigation.tile; },
    set tile(v) { setTile(v); },
    get controlledStage() { return AppState.navigation.controlledStage; },
    set controlledStage(v) { setControlledStage(v); },
    get score() { return AppState.session.score; },
    set score(v) { AppState.session.score = v; },
    get maxScore() { return AppState.session.maxScore; },
    set maxScore(v) { AppState.session.maxScore = v; },
    get completedLessons() { return AppState.progress.completedLessons; },
    get completedUnits() { return AppState.progress.completedUnits; },
    save: persistState,
    load: hydrateState,
    reset: resetState,
  };
  
  // Bridge for app.js globals (integration state)
  Object.defineProperty(window, 'integrationState', {
    get() { return AppState.navigation.integrationState; },
    set(v) { 
      AppState.navigation.integrationState = v;
      notify('navigation.integrationState', v, null);
    },
    configurable: true
  });
  
  Object.defineProperty(window, 'integrationProgress', {
    get() { return AppState.navigation.integrationProgress; },
    set(v) { 
      AppState.navigation.integrationProgress = v;
      notify('navigation.integrationProgress', v, null);
    },
    configurable: true
  });
  
  // Bridge for CURRENT_UNIT_ID
  Object.defineProperty(window, 'CURRENT_UNIT_ID', {
    get() { return AppState.navigation.unitId; },
    set(v) { setUnit(v); },
    configurable: true
  });
  
  // Bridge for currentLessonId (if not already defined)
  if (!Object.getOwnPropertyDescriptor(window, 'currentLessonId')) {
    Object.defineProperty(window, 'currentLessonId', {
      get() { return AppState.navigation.lessonId; },
      set(v) { setLesson(v); },
      configurable: true
    });
  }
  
  // Expose AppState for debugging
  window.AppState = AppState;
  
  // Expose actions
  window.StateActions = {
    setTile,
    setLesson,
    setUnit,
    setControlledStage,
    completeVocab,
    completeLesson,
    completeUnit,
    awardPoints,
    addMaxScore,
    resetSessionScore,
    toggleTeacherMode,
    toggleDevBypass,
    setCurriculum,
    persistState,
    hydrateState,
    resetState,
    subscribe,
    resetIntegrationState,
    setGate,
    getGate,
    // POS Game and Pre-read progress
    markPOSGameShown,
    isPOSGameShown,
    markPreReadComplete,
    isPreReadComplete,
  };
}
