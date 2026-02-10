/**
 * Games Index
 * ===========
 * Re-exports all game modules for convenient imports.
 * 
 * @module src/games
 * @version 2.0.0 (Phase 2 Refactor)
 */

// POS Speed Game
export {
  openPOSSpeedGameModal,
  mapPosToCategory,
  heuristicCategory,
  getCategoryForWord,
  buildPosLookupFromLesson
} from './pos-speed-game.js';

// Grammar PPP Modal
export {
  openGrammarPresentationModal
} from './grammar-ppp.js';
