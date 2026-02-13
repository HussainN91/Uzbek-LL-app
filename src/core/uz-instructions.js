/**
 * Uzbek Instructions Module
 * ==========================
 * Provides contextual instructions for every tile.
 * Now pulls from i18n system for multi-language support.
 *
 * @module src/core/uz-instructions
 * @version 2.0.0 (i18n integration)
 */

import { uz, en } from './i18n.js';

// ============================
// TILE KEY MAPPING
// ============================

/** Maps tile state keys to i18n namespace keys */
const TILE_KEY_MAP = {
  intro: 'intro',
  vocab: 'vocab',
  dialogue: 'dialogue',
  done: 'done',
  repractice: 'repractice',
};

// ============================
// PUBLIC API
// ============================

/**
 * @typedef {Object} TileInstruction
 * @property {string} icon - Emoji icon
 * @property {string} uz - Native language instruction
 * @property {string} en - English translation
 * @property {string|null} pairWork - Pair work instruction (native)
 * @property {string|null} pairWorkEn - Pair work instruction (English)
 */

/**
 * Get instruction for a tile state
 * @param {string} tileState - Tile state key (e.g. 'dialogue', 'vocab')
 * @returns {TileInstruction|null}
 */
export function getInstructionForTile(tileState) {
  const normalizedKey = String(tileState || '').toLowerCase().replace(/\s+/g, '_');
  const i18nKey = TILE_KEY_MAP[normalizedKey];
  
  if (!i18nKey) return null;
  
  const icon = uz(`instr.${i18nKey}.icon`);
  const text = uz(`instr.${i18nKey}.text`);
  const pairWork = uz(`instr.${i18nKey}.pairWork`);
  const textEn = en(`instr.${i18nKey}.text`);
  const pairWorkEn = en(`instr.${i18nKey}.pairWork`);
  
  return {
    icon,
    uz: text,
    en: textEn,
    pairWork: pairWork || null,
    pairWorkEn: pairWorkEn || null,
  };
}

/**
 * Get all tile instructions as an object
 * @returns {Object<string, TileInstruction>}
 */
export function getAllInstructions() {
  const result = {};
  for (const tileState of Object.keys(TILE_KEY_MAP)) {
    result[tileState] = getInstructionForTile(tileState);
  }
  return result;
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.getInstructionForTile = getInstructionForTile;
}
