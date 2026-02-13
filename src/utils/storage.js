/**
 * Storage Utility Functions
 * =========================
 * Centralized localStorage/sessionStorage management.
 * Pure ES Module with error handling and type safety.
 * 
 * @module src/utils/storage
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { STORAGE_KEYS } from './constants.js';

// ============================
// STORAGE HELPERS
// ============================

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
export function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check if sessionStorage is available
 * @returns {boolean}
 */
export function isSessionStorageAvailable() {
  try {
    const test = '__storage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// ============================
// LOCAL STORAGE OPERATIONS
// ============================

/**
 * Get item from localStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key doesn't exist
 * @returns {*} Parsed value or default
 */
export function getLocal(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Failed to get localStorage key "${key}":`, e);
    return defaultValue;
  }
}

/**
 * Set item in localStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export function setLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Failed to set localStorage key "${key}":`, e);
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeLocal(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`Failed to remove localStorage key "${key}":`, e);
    return false;
  }
}

// ============================
// SESSION STORAGE OPERATIONS
// ============================

/**
 * Get item from sessionStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key doesn't exist
 * @returns {*} Parsed value or default
 */
export function getSession(key, defaultValue = null) {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Failed to get sessionStorage key "${key}":`, e);
    return defaultValue;
  }
}

/**
 * Set item in sessionStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export function setSession(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Failed to set sessionStorage key "${key}":`, e);
    return false;
  }
}

/**
 * Remove item from sessionStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeSession(key) {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`Failed to remove sessionStorage key "${key}":`, e);
    return false;
  }
}

// ============================
// SPECIALIZED STORAGE FUNCTIONS
// ============================

/**
 * Load completed lessons from localStorage
 * @returns {Set<string>} Set of completed lesson IDs
 */
export function loadCompletedLessons() {
  const data = getLocal(STORAGE_KEYS.COMPLETED_LESSONS, []);
  return new Set(Array.isArray(data) ? data : []);
}

/**
 * Save completed lessons to localStorage
 * @param {Set<string>} lessons - Set of lesson IDs
 * @returns {boolean} Success status
 */
export function saveCompletedLessons(lessons) {
  return setLocal(STORAGE_KEYS.COMPLETED_LESSONS, Array.from(lessons));
}

/**
 * Load completed units from localStorage
 * @returns {Set<string>} Set of completed unit IDs
 */
export function loadCompletedUnits() {
  const data = getLocal(STORAGE_KEYS.COMPLETED_UNITS, []);
  return new Set(Array.isArray(data) ? data : []);
}

/**
 * Save completed units to localStorage
 * @param {Set<string>} units - Set of unit IDs
 * @returns {boolean} Success status
 */
export function saveCompletedUnits(units) {
  return setLocal(STORAGE_KEYS.COMPLETED_UNITS, Array.from(units));
}

/**
 * Load usage tracker data
 * @returns {Object} Usage tracker object
 */
export function loadUsageTracker() {
  return getLocal(STORAGE_KEYS.USAGE_TRACKER, {});
}

/**
 * Save usage tracker data
 * @param {Object} tracker - Usage tracker object
 * @returns {boolean} Success status
 */
export function saveUsageTracker(tracker) {
  return setLocal(STORAGE_KEYS.USAGE_TRACKER, tracker);
}

/**
 * Load score history for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {Array} Score history array
 */
export function loadScoreHistory(lessonId) {
  const key = STORAGE_KEYS.SCORE_HISTORY(lessonId);
  return getLocal(key, []);
}

/**
 * Save score history for a lesson
 * @param {string} lessonId - Lesson ID
 * @param {Array} history - Score history array
 * @returns {boolean} Success status
 */
export function saveScoreHistory(lessonId, history) {
  const key = STORAGE_KEYS.SCORE_HISTORY(lessonId);
  return setLocal(key, history);
}

/**
 * Add score entry to history
 * @param {string} lessonId - Lesson ID
 * @param {Object} entry - Score entry { date, score, maxScore, percentage }
 * @param {number} [maxEntries=10] - Maximum entries to keep
 * @returns {boolean} Success status
 */
export function addScoreToHistory(lessonId, entry, maxEntries = 10) {
  const history = loadScoreHistory(lessonId);
  history.push(entry);
  
  // Keep only recent entries
  if (history.length > maxEntries) {
    history.shift();
  }
  
  return saveScoreHistory(lessonId, history);
}

/**
 * Check if POS game has been shown for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {boolean}
 */
export function isPOSGameShown(lessonId) {
  const key = STORAGE_KEYS.POS_GAME_SHOWN(lessonId);
  return getSession(key, false) === true;
}

/**
 * Mark POS game as shown for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {boolean} Success status
 */
export function setPOSGameShown(lessonId) {
  const key = STORAGE_KEYS.POS_GAME_SHOWN(lessonId);
  return setSession(key, true);
}

/**
 * Load vocab card completion status
 * @returns {Object} Completion map { vocabId: boolean }
 */
export function loadVocabCompletion() {
  return getSession(STORAGE_KEYS.VOCAB_COMPLETION, {});
}

/**
 * Save vocab card completion status
 * @param {Object} completion - Completion map
 * @returns {boolean} Success status
 */
export function saveVocabCompletion(completion) {
  return setSession(STORAGE_KEYS.VOCAB_COMPLETION, completion);
}

/**
 * Mark a vocab card as completed
 * @param {string} vocabId - Vocab ID
 * @returns {boolean} Success status
 */
export function markVocabCompleted(vocabId) {
  const completion = loadVocabCompletion();
  completion[vocabId] = true;
  return saveVocabCompletion(completion);
}

/**
 * Check if a vocab card is completed
 * @param {string} vocabId - Vocab ID
 * @returns {boolean}
 */
export function isVocabCompleted(vocabId) {
  const completion = loadVocabCompletion();
  return completion[vocabId] === true;
}

/**
 * Clear all vocab completion data (for new lesson)
 * @returns {boolean} Success status
 */
export function clearVocabCompletion() {
  return removeSession(STORAGE_KEYS.VOCAB_COMPLETION);
}

// ============================
// GAME STATE STORAGE
// ============================

/**
 * Load full game state from localStorage
 * @returns {Object|null} Game state object or null
 */
export function loadGameState() {
  return getLocal(STORAGE_KEYS.GAME_STATE, null);
}

/**
 * Save full game state to localStorage
 * @param {Object} state - Game state object
 * @returns {boolean} Success status
 */
export function saveGameState(state) {
  return setLocal(STORAGE_KEYS.GAME_STATE, state);
}

/**
 * Clear all game-related storage
 * @returns {void}
 */
export function clearAllGameData() {
  removeLocal(STORAGE_KEYS.GAME_STATE);
  removeLocal(STORAGE_KEYS.COMPLETED_LESSONS);
  removeLocal(STORAGE_KEYS.COMPLETED_UNITS);
  removeLocal(STORAGE_KEYS.USAGE_TRACKER);
  // Note: Score history is per-lesson, would need to clear all
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.StorageUtils = {
    isLocalStorageAvailable,
    isSessionStorageAvailable,
    getLocal,
    setLocal,
    removeLocal,
    getSession,
    setSession,
    removeSession,
    loadCompletedLessons,
    saveCompletedLessons,
    loadCompletedUnits,
    saveCompletedUnits,
    loadUsageTracker,
    saveUsageTracker,
    loadScoreHistory,
    saveScoreHistory,
    addScoreToHistory,
    isPOSGameShown,
    setPOSGameShown,
    loadVocabCompletion,
    saveVocabCompletion,
    markVocabCompleted,
    isVocabCompleted,
    clearVocabCompletion,
    loadGameState,
    saveGameState,
    clearAllGameData,
  };
}
