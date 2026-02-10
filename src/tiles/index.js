/**
 * Tiles Module Index
 * ==================
 * Re-exports all tile renderers for centralized access.
 * 
 * @module src/tiles
 * @version 3.0.0 (Tile Registry)
 */

// Tile registry (replaces window.* dispatch)
export { registerTile, registerSimpleTile, mountTile, unmountActive, hasTile, getActiveTile, getRegisteredTiles } from './tile-registry.js';

// Tile utilities (shared infrastructure)
export * from './tile-utils.js';

// Individual tile renderers
export { renderIntroTile } from './intro-tile.js';
export { renderVocabTile, renderSandwichDialogueTile } from './vocab-tile.js';
export { renderLessonDialogueTile } from './dialogue-tile.js';
export { renderPatternTile } from './pattern-tile.js';
export { renderWritingTile } from './writing-tile.js';
export { renderMistakeTile } from './mistake-tile.js';
export { renderDoneTile } from './done-tile.js';
export { renderListenWriteTile } from './listen-write-tile.js';
export { renderControlledTile } from './controlled-tile.js';
export { renderFunctionTile } from './function-tile.js';

// Unit-level tiles
export { renderUnitErrorDetectionTile } from './unit-error-tile.js';
export { renderGrandTile } from './grand-tile.js';

// Integration lesson tiles
export { renderDialogueTile, renderDialogueUzbekTile, highlightGrammarTokens, translateToNaturalUzbek } from './dialogue-practice-tile.js';
export { renderTransformationTile } from './transformation-tile.js';
