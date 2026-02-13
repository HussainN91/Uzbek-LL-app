/**
 * Tile Utilities Module
 * =====================
 * Shared utilities for all tile renderers.
 * 
 * @module src/tiles/tile-utils
 * @version 2.0.0 (Phase 2 Refactor)
 */

// JSDoc Type Imports
/** @typedef {import('../types/curriculum.d.ts').Lesson} Lesson */
/** @typedef {import('../types/curriculum.d.ts').AudioEntry} AudioEntry */
/** @typedef {import('../types/vocab.d.ts').VocabItem} VocabItem */
/** @typedef {import('../types/state.d.ts').TileState} TileState */

// ============================
// DOM HELPERS
// ============================

/**
 * Get the tile container element
 * @returns {HTMLElement|null} The tile container
 */
export function getTileContainer() {
  return window.tileContainer || document.getElementById('tile-container');
}

/**
 * Clear the tile container
 * Delegates to app.js clearTileContainer for progress bar/back button
 */
export function clearTileContainer() {
  if (typeof window.clearTileContainer === 'function') {
    window.clearTileContainer();
  } else {
    const container = getTileContainer();
    if (container) container.innerHTML = '';
  }
}

/**
 * Create a section div for tiles
 * @param {string} className - CSS class name
 * @param {string} content - Text content
 * @param {Object} [options] - Options { uzTranslation, isUzText }
 * @returns {HTMLElement} Section element
 */
export function createTileSection(className, content, options = {}) {
  const section = document.createElement('div');
  section.className = className || 'tile-section';
  section.textContent = content;
  
  if (options.isUzText) {
    section.classList.add('tl-uz');
    if (options.uzTranslation) {
      section.dataset.translation = options.uzTranslation;
    }
  }
  
  return section;
}

/**
 * Create a tile title element
 * @param {string} text - Title text
 * @returns {HTMLElement} Title element
 */
export function createTileTitle(text) {
  const title = document.createElement('div');
  title.className = 'tile-title';
  title.textContent = text;
  return title;
}

/**
 * Append multiple children to a container
 * @param {HTMLElement} container - Parent container
 * @param {...HTMLElement} children - Child elements
 */
export function appendChildren(container, ...children) {
  children.forEach(child => {
    if (child) container.appendChild(child);
  });
}

// ============================
// DATA RESOLUTION
// ============================

/**
 * Resolve UI data for a tile state
 * @param {string} state - State constant (e.g., STATES.INTRO)
 * @param {Object} lesson - Lesson object
 * @returns {Object} Resolved data with missingKeys
 */
export function resolveUIData(state, lesson) {
  if (typeof window.resolveUIData === 'function') {
    return window.resolveUIData(state, lesson);
  }
  // Fallback
  return { data: lesson || {}, missingKeys: [] };
}

/**
 * Merge missing keys into tracking array
 * @param {string[]} keys - Array of missing key names
 */
export function mergeMissingKeys(keys) {
  if (typeof window.mergeMissingKeys === 'function') {
    window.mergeMissingKeys(keys);
  }
}

// ============================
// STATE MANAGEMENT
// ============================

/**
 * Set application state (navigate to tile)
 * @param {string} state - State constant
 */
export function setState(state) {
  if (typeof window.setState === 'function') {
    window.setState(state);
  }
}

/**
 * Transition to a new tile with Activity Context Card (student mode)
 * Shows a brief context overlay before the tile renders
 * @param {string} state - Target state constant
 * @param {Object} [options] - Optional context for the card
 * @returns {Promise<void>}
 */
export async function transitionToTile(state, options = {}) {
  if (typeof window.transitionToTile === 'function') {
    await window.transitionToTile(state, options);
  } else {
    // Fallback to direct state change if transition not available
    setState(state);
  }
}

/**
 * Get current application state
 * @returns {string} Current state
 */
export function getCurrentState() {
  return window.currentState || '';
}

/**
 * Get current lesson
 * @returns {Object|null} Current lesson object
 */
export function getCurrentLesson() {
  return window.currentLesson || null;
}

/**
 * Get current lesson ID
 * @returns {string|null} Current lesson ID
 */
export function getCurrentLessonId() {
  return window.currentLessonId || null;
}

// ============================
// BUTTON CREATION
// ============================

/**
 * Create a navigation button
 * @param {string} text - Button text
 * @param {(event: MouseEvent) => void} onClick - Click handler
 * @returns {HTMLElement} Button element
 */
export function createButton(text, onClick) {
  if (typeof window.createButton === 'function') {
    return window.createButton(text, onClick);
  }
  
  // Fallback implementation
  const btn = document.createElement('button');
  btn.className = 'tile-btn primary';
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  return btn;
}

/**
 * Create a next tile button
 * Uses transitionToTile to show Activity Context Card before navigation
 * @param {string} nextStateName - Name of next state
 * @param {string} nextState - State constant
 * @returns {HTMLElement} Button element
 */
export function createNextButton(nextStateName, nextState) {
  return createButton(`Next: ${nextStateName}`, () => transitionToTile(nextState));
}

// ============================
// VOCAB DATA UTILITIES (replaces SmartLoad)
// ============================

/**
 * Get vocab items for a lesson (direct data access, no SmartLoad)
 * @param {Object} lesson - Lesson object
 * @returns {Object} Vocab data with items array
 */
export function getVocabForLesson(lesson) {
  const lessonId = lesson?.lesson_id || "";
  const unitId = lessonId?.match(/^(U\d+(?:_\d+)?)/)?.[1] || lessonId.split("_")[0];
  const vocabCardsKey = unitId ? `VOCAB_CARDS_${unitId}` : null;
  const vocabCards = vocabCardsKey ? window[vocabCardsKey] : null;
  const ids = Array.isArray(lesson?.vocab_ids) ? lesson.vocab_ids : [];

  let items = [];

  if (vocabCards && typeof vocabCards.getCardById === "function" && ids.length > 0) {
    items = ids.map((id) => vocabCards.getCardById(id)).filter(Boolean);
  } else if (vocabCards && typeof vocabCards.getCardsForLesson === "function" && lessonId) {
    items = vocabCards.getCardsForLesson(lessonId) || [];
  } else if (window.ACTIVE_CURRICULUM?.vocab && ids.length > 0) {
    items = ids.map((id) => window.ACTIVE_CURRICULUM.vocab[id]).filter(Boolean);
  }

  return {
    items,
    count: items.length
  };
}

// ============================
// AUDIO UTILITIES
// ============================

/**
 * Play a sound effect
 * @param {string} type - Sound type
 */
export function playSound(type) {
  if (typeof window.playSound === 'function') {
    window.playSound(type);
  }
}

/**
 * Speak text using TTS
 * @param {string} text - Text to speak
 * @param {string|Record<string, any>} [langOrOptions] - Language code or TTS options
 */
export function speakText(text, langOrOptions = 'en-US') {
  if (typeof window.speakText === 'function') {
    window.speakText(text, langOrOptions);
  }
}

// ============================
// SCORING
// ============================

/**
 * Award points to the user
 * @param {number} points - Points to award
 * @param {string} [reason] - Reason for points
 * @param {string} [tile] - Tile name
 */
export function awardPoints(points, reason, tile) {
  if (typeof window.awardPoints === 'function') {
    window.awardPoints(points, reason, tile);
  }
}

/**
 * Award XP for gamification (levels, badges, streaks)
 * @param {number} xp - XP amount
 * @param {string} [reason] - Reason for display
 */
export function awardXP(xp, reason) {
  if (typeof window.StateActions?.awardXP === 'function') {
    return window.StateActions.awardXP(xp, reason);
  }
}

/**
 * Update the daily streak counter on lesson completion
 */
export function updateStreak() {
  if (typeof window.StateActions?.updateStreak === 'function') {
    window.StateActions.updateStreak();
  }
}

/**
 * Add to the max score for the session
 * @param {number} points - Points to add to max
 */
export function addMaxScore(points) {
  if (typeof window.addMaxScore === 'function') {
    window.addMaxScore(points);
  }
}

// ============================
// CONSTANTS REFERENCE
// ============================

/**
 * Get STATES constants
 * @returns {Object} STATES object
 */
export function getStates() {
  return window.STATES || {
    INTRO: 'intro',
    VOCAB: 'vocab',
    DIALOGUE: 'dialogue',
    DONE: 'done'
  };
}

/**
 * Direct reference to STATES constants
 */
export const STATES = typeof window !== 'undefined' && window.STATES ? window.STATES : {
  INTRO: 'intro',
  VOCAB: 'vocab',
  DIALOGUE: 'dialogue',
  DONE: 'done'
};

// ============================
// PROGRESS & NAVIGATION
// ============================

/**
 * Create a progress bar for the current tile
 * @returns {HTMLElement|null} Progress bar element
 */
export function createProgressBar() {
  if (typeof window.createProgressBar === 'function') {
    return window.createProgressBar();
  }
  return null;
}

/**
 * Create a back button
 * @returns {HTMLElement|null} Back button element
 */
export function createBackButton() {
  if (typeof window.createBackButton === 'function') {
    return window.createBackButton();
  }
  return null;
}

/**
 * Get current unit ID (e.g., "U01", "U02")
 * @returns {string} Unit ID
 */
export function getCurrentUnitId() {
  return window.CURRENT_UNIT_ID || 'U01';
}

// ============================
// GRAMMAR UTILITIES
// ============================

/**
 * Highlight grammar tokens in text
 * @param {string} text - Text to process
 * @returns {string} HTML with highlighted tokens
 */
export function highlightGrammarTokens(text) {
  if (typeof window.highlightGrammarTokens === 'function') {
    return window.highlightGrammarTokens(text);
  }
  return text;
}

/**
 * Add grammar hover tooltip to an element
 * @param {HTMLElement} element - Target element
 * @param {Object} pattern - Pattern object with grammar info
 * @param {Object} lesson - Lesson object
 */
export function addGrammarHover(element, pattern, lesson) {
  if (typeof window.addGrammarHover === 'function') {
    window.addGrammarHover(element, pattern, lesson);
  }
}

/**
 * Open grammar presentation modal
 * @param {Object} grammarPresentation - Grammar presentation data
 * @param {Object} lesson - Lesson object
 */
export function openGrammarPresentationModal(grammarPresentation, lesson) {
  if (typeof window.openGrammarPresentationModal === 'function') {
    window.openGrammarPresentationModal(grammarPresentation, lesson);
  }
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.TileUtils = {
    getTileContainer,
    clearTileContainer,
    createTileSection,
    createTileTitle,
    appendChildren,
    resolveUIData,
    mergeMissingKeys,
    setState,
    transitionToTile, // NEW: with activity context card
    getCurrentState,
    getCurrentLesson,
    getCurrentLessonId,
    createButton,
    createNextButton,
    getVocabForLesson,
    playSound,
    speakText,
    awardPoints,
    addMaxScore,
    getStates,
    STATES,
    createProgressBar,
    createBackButton,
    getCurrentUnitId,
    highlightGrammarTokens,
    addGrammarHover,
    openGrammarPresentationModal
  };
}
