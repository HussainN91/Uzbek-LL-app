/**
 * Tile Registrations
 * ==================
 * Imports all tile renderers and registers them with the tile registry.
 * Import this file once from app-main.js to populate the registry.
 *
 * This replaces the old pattern of:
 *   window.renderXxxTile = renderXxxTile;
 *
 * @module src/tiles/tile-registrations
 * @version 2.0.0 - Stripped to core tiles only
 */

import { registerSimpleTile } from './tile-registry.js';

// Core lesson tiles
import { renderIntroTile } from './intro-tile.js';
import { renderVocabTile, renderSandwichDialogueTile } from './vocab-tile.js';
import { renderLessonDialogueTile } from './dialogue-tile.js';
import { renderDoneTile } from './done-tile.js';

// Dialogue practice utilities
import { renderDialogueTile, renderDialogueUzbekTile } from './dialogue-practice-tile.js';

// ============================
// REGISTER ALL TILES
// ============================

// Core tiles (state ID matches STATES.XXX values from constants.js)
registerSimpleTile('intro',                 'Intro',                renderIntroTile);
registerSimpleTile('vocab',                 'Vocab',                renderVocabTile);
registerSimpleTile('vocab_sandwich',        'Vocab Sandwich',       renderSandwichDialogueTile);
registerSimpleTile('dialogue',              'Dialogue',             renderLessonDialogueTile);
registerSimpleTile('done',                  'Done',                 renderDoneTile);

// Integration lesson sub-tiles
registerSimpleTile('integration_dialogue',    'Integration Dialogue',       renderDialogueTile);
registerSimpleTile('integration_dialogue_uz', 'Integration Dialogue (Uz)',  renderDialogueUzbekTile);

console.log('✅ Tile registry populated');
