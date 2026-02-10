/**
 * Features Index
 * ==============
 * Re-exports all feature modules for convenient imports.
 * 
 * @module src/features
 * @version 2.0.0 (Phase 2 Refactor)
 */

// Scoring System
export {
  resetSessionScore,
  awardPoints,
  addMaxScore,
  updateScoreDisplay,
  showPointsAnimation,
  saveScoreToHistory,
  getScoreHistory,
  getBestScore,
  getAverageScore,
  getImprovementTrend
} from './scoring.js';

// Touch Handler
export {
  initTouchHandler,
  isScrollableElement,
  isTouchActive,
  isValidTap,
  setupTouchOptimizations
} from './touch-handler.js';

// Vocab Card Renderer
export {
  VocabCardRenderer,
  renderVocabModal,
  closeVocabModal,
  markVocabComplete
} from './vocab-card-renderer.js';

// UI Redesign
export { initUIRedesign } from './ui-redesign.js';
