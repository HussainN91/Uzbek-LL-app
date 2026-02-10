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
 * @typedef {'intro'|'vocab'|'dialogue'|'pattern'|'function'|'controlled'|'writing'|'listen_write'|'mistake'|'unit_error_detection'|'grand_tile'|'done'} TileStateValue
 */

/**
 * @typedef {'GAP'|'REORDER'} ControlledStageValue
 */

// ============================
// TILE STATES (Application Flow)
// ============================
/** @type {Readonly<Record<string, TileStateValue>>} */
export const STATES = Object.freeze({
  INTRO: "intro",
  VOCAB: "vocab",
  DIALOGUE: "dialogue",
  PATTERN: "pattern",
  FUNCTION: "function",
  CONTROLLED: "controlled",
  WRITING: "writing",
  LISTEN_WRITE: "listen_write",
  MISTAKE: "mistake",
  UNIT_ERROR_DETECTION: "unit_error_detection",
  GRAND_TILE: "grand_tile",
  DONE: "done",
});

// ============================
// CONTROLLED PRACTICE STAGES
// (Simplified: GAP_EASY and GAP_HARD merged into GAP)
// ============================
export const CONTROLLED_STAGES = Object.freeze(["GAP", "REORDER"]);

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

  [STATES.PATTERN]: Object.freeze({
    pattern_id: "main_pattern_id",
    pattern_template: "PATTERN.pattern_template",
    pattern_name: "PATTERN.name",
    examples: "PATTERN.example_sentences",
  }),

  [STATES.FUNCTION]: Object.freeze({
    items: "function_check_items",
    function_en: "function_en",
  }),

  [STATES.WRITING]: Object.freeze({
    expectations: "writing_expectations",
  }),

  [STATES.LISTEN_WRITE]: Object.freeze({
    refs: "listen_write_refs",
    audio_ids: "listen_write_refs",
  }),

  [STATES.CONTROLLED]: Object.freeze({
    controlled: "controlled_templates",
    examples: "ALL_PATTERNS.example_sentences",
  }),

  [STATES.UNIT_ERROR_DETECTION]: Object.freeze({
    items: "unitErrorDetection.items",
    prompt_uz: "unitErrorDetection.prompt_uz",
    pass_threshold: "unitErrorDetection.pass_threshold",
  }),

  [STATES.GRAND_TILE]: Object.freeze({
    uz_instruction: "grandTile.uz_instruction",
    expected_output_samples_en: "grandTile.expected_output_samples_en",
    expected_output_sample: "grandTile.expected_output_sample",
    required_tokens: "grandTile.required_tokens",
    target_word_count: "grandTile.target_word_count",
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
  CONTROLLED_STAGE: (lessonId) => `controlledStage_${lessonId}`,
  SRS_DATA: (vocabId) => `srs_${vocabId}`,
  
  // sessionStorage keys
  VOCAB_COMPLETION: 'vocabCardCompletion',
  POS_GAME_SHOWN: (lessonId) => `POSGameShown_${lessonId}`,
});

// ============================
// LESSON SELECTOR CONFIG (U01)
// ============================
export const LESSON_SELECTOR_CONFIG = Object.freeze([
  { id: "U01_L01", label: "Names & Identity" },
  { id: "U01_L02", label: "Age" },
  { id: "U01_L03", label: "Origin" },
]);

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
    CONTROLLED_STAGES,
    UI_DATA_CONTRACT,
    LESSON_SELECTOR_CONFIG: Array.from(LESSON_SELECTOR_CONFIG),
    STORAGE_KEYS,
    AppConstants: {
      STATES,
      CONTROLLED_STAGES,
      UI_DATA_CONTRACT,
      LESSON_SELECTOR_CONFIG: Array.from(LESSON_SELECTOR_CONFIG),
      STORAGE_KEYS,
      SOUND_CONFIGS,
      CSS_CLASSES,
    }
  });
}
