// ========================================
// UI CONFIGURATION
// Contains UI-related static data and metadata
// ========================================

window.UI_CONFIG = {
  // Default unit metadata (fallback only)
  UNIT_META: {
    "U01": { name: "Personal Info", icon: "👤" },
    "U02": { name: "My Routine", icon: "🏠" },
    "U03": { name: "Likes & Dislikes", icon: "❤️" },
    "U04": { name: "Past States", icon: "🕰️" },
    "U05": { name: "Past Actions", icon: "⏳" },
    "U06": { name: "Jobs & Work", icon: "💼" },
    "U07": { name: "Holidays & Travel", icon: "🧳" },
  },

  // Display names for tile types
  TILE_NAMES: {
    'FUNCTION': 'Function Check',
    'CONTROLLED': 'Controlled Practice',
    'LISTEN_WRITE': 'Listen & Write',
    'MISTAKE': 'Mistake Review'
  },

  // List of units to check for availability
  SUPPORTED_UNITS: ["U01", "U02", "U03", "U04", "U05", "U06", "U07", "U08", "U09", "U10"],

  // Pattern Tile interaction settings
  PATTERN_TILE: {
    unlockThreshold: 0.7,    // 70% of verbs must be clicked to unlock
    verbBlurAmount: "4px",   // Blur amount for locked verbs
    animationSpeed: "0.3s"   // Transition speed for reveals
  },
  
  // POS Speed Game settings
  POS_SPEED_GAME: {
    wordCount: 5,            // Number of words to show
    timePerWord: 4000,       // 4 seconds per word (in ms)
    minCorrectToPass: 3,     // Minimum correct answers to "pass"
    choiceCount: 3           // Number of answer choices
  }
};
