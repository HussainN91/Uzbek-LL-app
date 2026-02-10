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
 * @version 1.0.0
 */

import { registerSimpleTile } from './tile-registry.js';

// Core lesson tiles
import { renderIntroTile } from './intro-tile.js';
import { renderVocabTile, renderSandwichDialogueTile } from './vocab-tile.js';
import { renderLessonDialogueTile } from './dialogue-tile.js';
import { renderPatternTile } from './pattern-tile.js';
import { renderFunctionTile } from './function-tile.js';
import { renderControlledTile } from './controlled-tile.js';
import { renderWritingTile } from './writing-tile.js';
import { renderListenWriteTile } from './listen-write-tile.js';
import { renderMistakeTile } from './mistake-tile.js';

// Unit-level tiles
import { renderUnitErrorDetectionTile } from './unit-error-tile.js';
import { renderGrandTile } from './grand-tile.js';
import { renderDoneTile } from './done-tile.js';

// Integration lesson tiles
import { renderDialogueTile, renderDialogueUzbekTile } from './dialogue-practice-tile.js';
import { renderTransformationTile } from './transformation-tile.js';

// ============================
// REGISTER ALL TILES
// ============================

// Core tiles (state ID matches STATES.XXX values from constants.js)
registerSimpleTile('intro',                 'Intro',                renderIntroTile);
registerSimpleTile('vocab',                 'Vocab',                renderVocabTile);
registerSimpleTile('vocab_sandwich',        'Vocab Sandwich',       renderSandwichDialogueTile);
registerSimpleTile('dialogue',              'Dialogue',             renderLessonDialogueTile);
registerSimpleTile('pattern',               'Pattern',              renderPatternTile);
registerSimpleTile('function',              'Function',             renderFunctionTile);
registerSimpleTile('controlled',            'Controlled',           renderControlledTile);
registerSimpleTile('writing',               'Writing',              renderWritingTile);
registerSimpleTile('listen_write',          'Listen & Write',       renderListenWriteTile);
registerSimpleTile('mistake',               'Mistake',              renderMistakeTile);
registerSimpleTile('unit_error_detection',  'Unit Error Detection', renderUnitErrorDetectionTile);
registerSimpleTile('grand_tile',            'Grand Tile',           renderGrandTile);
registerSimpleTile('done',                  'Done',                 renderDoneTile);

// Integration lesson sub-tiles
registerSimpleTile('integration_dialogue',    'Integration Dialogue',       renderDialogueTile);
registerSimpleTile('integration_dialogue_uz', 'Integration Dialogue (Uz)',  renderDialogueUzbekTile);
registerSimpleTile('integration_transformation', 'Integration Transformation', renderTransformationTile);
// Note: integration_listen_write and integration_done are not yet implemented

console.log('✅ Tile registry populated');
