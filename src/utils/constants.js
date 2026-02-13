/**
 * Application Constants
 * =====================
 * Central location for all application constants.
 * Pure ES Module - no window.* dependencies.
 * 
 * @module src/utils/constants
 * @version 2.0.0 (Phase 2 Refactor)
 */

// ============================
// TYPE DEFINITIONS
// ============================
/**
 * @typedef {'intro'|'vocab'|'dialogue'|'done'} TileStateValue
 */

// ============================
// TILE STATES (Application Flow)
// ============================
/** @type {Readonly<Record<string, TileStateValue>>} */
export const STATES = Object.freeze({
  INTRO: "intro",
  VOCAB: "vocab",
  DIALOGUE: "dialogue",
  DONE: "done",
});

// ============================
// UI DATA CONTRACT
// Maps tile states to expected data fields from LessonPack
// ============================
export const UI_DATA_CONTRACT = Object.freeze({
  [STATES.INTRO]: Object.freeze({
    function_uz: "function_uz",
    semantic_category_uz: "semantic_category_uz",
    grammar_spine: "grammar_spine",
  }),

  [STATES.VOCAB]: Object.freeze({
    vocab_ids: "vocab_ids",
  }),
});

// ============================
// STORAGE KEYS
// Centralized localStorage/sessionStorage key management
// ============================
export const STORAGE_KEYS = Object.freeze({
  // localStorage keys
  GAME_STATE: 'gameState',
  COMPLETED_UNITS: 'completedUnits',
  COMPLETED_LESSONS: 'completedLessons',
  USAGE_TRACKER: 'usageTracker',
  
  // Dynamic key generators
  SCORE_HISTORY: (lessonId) => `scoreHistory_${lessonId}`,
  SRS_DATA: (vocabId) => `srs_${vocabId}`,
  
  // sessionStorage keys
  VOCAB_COMPLETION: 'vocabCardCompletion',
  POS_GAME_SHOWN: (lessonId) => `POSGameShown_${lessonId}`,
});

// ============================
// DEVICE DETECTION
// ============================
export const DeviceInfo = Object.freeze({
  isTouchDevice: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  isMobile: typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: typeof navigator !== 'undefined' && /iPad|Android(?=.*\bMobile\b)|Tablet|PlayBook/i.test(navigator.userAgent),
  get isSmartBoard() {
    return typeof window !== 'undefined' && window.innerWidth >= 1200 && this.isTouchDevice;
  },
  get isSmartTV() {
    return typeof window !== 'undefined' && window.innerWidth >= 1920 && window.innerHeight >= 1080 && this.isTouchDevice;
  },
});

// ============================
// SOUND CONFIGURATIONS
// Musical tones for audio feedback
// ============================
export const SOUND_CONFIGS = Object.freeze({
  correct: { 
    notes: [523.25, 659.25, 783.99], // C5, E5, G5 (Major chord)
    duration: 0.12,
    type: 'sine',
    envelope: { attack: 0.01, decay: 0.1 }
  },
  wrong: { 
    notes: [311.13, 329.63], // Eb4, E4 (Minor second)
    duration: 0.15,
    type: 'triangle',
    envelope: { attack: 0.01, decay: 0.14 }
  },
  complete: { 
    notes: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6 (Rising arpeggio)
    duration: 0.15,
    type: 'sine',
    envelope: { attack: 0.01, decay: 0.12 }
  },
  click: { 
    notes: [800],
    duration: 0.03,
    type: 'sine',
    envelope: { attack: 0.005, decay: 0.025 }
  }
});

// ============================
// CSS CLASS NAMES
// Centralized class name management
// ============================
export const CSS_CLASSES = Object.freeze({
  // Tile classes
  TILE_SECTION: 'tile-section',
  TILE_HEADER: 'tile-header',
  TILE_CONTENT: 'tile-content',
  
  // Button variants
  BTN_PRIMARY: 'btn-primary',
  BTN_SECONDARY: 'btn-secondary',
  BTN_SUCCESS: 'btn-success',
  BTN_DANGER: 'btn-danger',
  
  // State classes
  ACTIVE: 'active',
  DISABLED: 'disabled',
  LOADING: 'loading',
  HIDDEN: 'hidden',
  
  // Vocab classes
  VOCAB_CARD: 'vocab-card',
  VOCAB_CARD_FAMILIAR: 'vocab-card--familiar',
  VOCAB_CARD_NEW: 'vocab-card--new',
  
  // Touch feedback
  TOUCH_FEEDBACK: 'touch-feedback',
  RIPPLE_EFFECT: 'ripple-effect',
});

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// Expose to window.* for legacy code
// Remove these once all code uses ES modules
// ============================
if (typeof window !== 'undefined') {
  Object.assign(window, {
    STATES,
    UI_DATA_CONTRACT,
    STORAGE_KEYS,
    AppConstants: {
      STATES,
      UI_DATA_CONTRACT,
      STORAGE_KEYS,
      SOUND_CONFIGS,
      CSS_CLASSES,
    }
  });
}
