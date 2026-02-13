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
export { renderDoneTile } from './done-tile.js';

// Dialogue practice utilities
export { renderDialogueTile, renderDialogueUzbekTile, highlightGrammarTokens, translateToNaturalUzbek } from './dialogue-practice-tile.js';
