/**
 * Core Module Barrel Export
 * =========================
 * Central export point for all core modules.
 * 
 * @module src/core/index
 */

// Curriculum loading and data access
export {
  setActiveUnit,
  detectAvailableUnits,
  getActiveCurriculum,
  getCurrentUnitId,
  getVocab,
  getPattern,
  getMistake,
  getUnitDisplayName,
  // Pedagogical data access
  getMission,
  getDialogues,
  getDialogue,
  getContrastiveTurns,
  getContrastiveTurnsForLesson,
  getGrammarFocus,
  getMissionStageForLesson
} from './curriculum-loader.js';

// Navigation and state management
export {
  setState,
  setCurrentLesson,
  render,
  initNavigation,
  resetSessionScore,
  awardPoints,
  addMaxScore,
  getSessionScore,
  markLessonCompleted,
  markUnitCompleted,
  isLessonCompleted,
  isUnitCompleted,
  getCompletedLessons,
  getCompletedUnits,
  setAvailableUnits,
  getAvailableUnits,
  setControlledStageIndex,
  getControlledStageIndex,
  resetControlledStage,
  setIntegrationState,
  resetIntegrationState,
  getCurrentState,
  getCurrentLessonId,
  getTileContainer,
  clearTileContainer
} from './navigation.js';

// UI builders
export {
  buildUnitSelectorUI,
  buildLessonSelectorUI
} from './ui-builders.js';

// Teacher mode and dev tools
export {
  initTeacherMode,
  toggleTeacherMode,
  goToTile,
  goToLesson,
  goToUnit,
  showUnits,
  showLessons,
  showTiles,
  updateTeacherPanelUI
} from './teacher-mode.js';

// Helpers and evaluation
export {
  // Text utilities
  normalizeText,
  compareAnswers,
  fuzzyCompare,
  
  // Controlled practice
  pickGap,
  pickGapEasy,  // Legacy alias
  pickGapHard,  // Legacy alias
  makeReorder,
  makeConstruction,
  
  // Evaluation
  evaluateTextAnswer,
  evaluateMultipleChoice,
  evaluateReorder,
  evaluateGapFill,
  evaluateMasterOutput,
  detectCommonErrors,
  getMistakeFeedback,
  
  // Randomization
  shuffle,
  pickRandom,
  pickOne
} from './helpers.js';

// Chunk System (linguistic units)
export {
  ChunkSystem,
  CHUNK_TYPES,
  UNIT_CHUNK_PROGRESSION,
  POSITION_RULES
} from './chunk-system.js';

// Example Variation Engine
export {
  ExampleVariationEngine,
  SUBJECT_LIBRARY,
  VERB_CONJUGATION
} from './example-variation-engine.js';

// Semantic Tag System (context-specific vocabulary recycling)
export {
  SEMANTIC_CATEGORIES,
  UNIT_SEMANTIC_POOLS,
  SEMANTIC_COMPATIBILITY,
  SEMANTIC_SWAP_GROUPS,
  ANIMACY_RULES,
  TRANSITIVITY_RULES,
  SemanticTagEngine,
  SemanticDebug
} from './semantic-tags.js';

// Internationalization (i18n)
export { uz, en, uzEl, uzify, uzBtn } from './i18n.js';

// Uzbek per-tile instructions
export { getInstructionForTile, getAllInstructions } from './uz-instructions.js';

// Badge catalog & gamification
export {
  BADGE_CATALOG,
  checkBadges,
  getBadge,
  getBadgesByCategory,
  showBadgeNotification
} from './badge-catalog.js';

// Classroom mode
export {
  initClassroomMode,
  buildClassroomSection,
  getClassroomState,
  getPaceMultiplier
} from './classroom-mode.js';
