/**
 * Intro Tile Module
 * =================
 * Tile 1: Introduction with lesson metadata in Uzbek.
 * 
 * @module src/tiles/intro-tile
 * @version 2.1.0 (SmartLoad removed)
 */

import {
  getTileContainer,
  clearTileContainer,
  createTileTitle,
  appendChildren,
  resolveUIData,
  mergeMissingKeys,
  createButton,
  transitionToTile,
  getStates
} from './tile-utils.js';
import { uz, en } from '../core/i18n.js';
import { createInstructionBanner } from '../components/instruction-banner.js';

/**
 * Render the Intro tile
 * @param {Object} lesson - Lesson object
 */
export function renderIntroTile(lesson) {
  const STATES = getStates();
  const tileContainer = getTileContainer();
  
  clearTileContainer();

  const r = resolveUIData(STATES.INTRO, lesson);
  mergeMissingKeys(r.missingKeys);

  // Instruction banner
  const banner = createInstructionBanner('intro');
  if (banner) tileContainer.appendChild(banner);

  // Title
  const title = createTileTitle(uz('tiles.intro'));
  title.classList.add('tl-uz');
  title.dataset.translation = en('tiles.intro');

  // Function section
  const fn = document.createElement("div");
  fn.className = "tile-section";
  fn.textContent = uz('intro.functionLabel') + (r.data.function_uz || uz('intro.notSet'));
  fn.classList.add("tl-uz");
  fn.dataset.translation = en('intro.functionEnLabel') + (lesson?.function_en || en('intro.notSetLabel'));

  // Semantic category section
  const sem = document.createElement("div");
  sem.className = "tile-section";
  sem.textContent = uz('intro.semanticLabel') + (r.data.semantic_category_uz || uz('intro.notSet'));
  sem.classList.add("tl-uz");
  sem.dataset.translation = en('intro.semanticEnLabel') + (lesson?.semantic_category_en || en('intro.notSetLabel'));
  
  // Grammar spine section
  const grammarDiv = document.createElement("div");
  grammarDiv.className = "tile-section";
  const grammarItems = Array.isArray(r.data.grammar_spine) ? r.data.grammar_spine : [];
  grammarDiv.textContent = uz('intro.grammarLabel') + (grammarItems.length > 0 ? grammarItems.join(" • ") : uz('intro.notSet'));
  grammarDiv.classList.add("tl-uz");
  grammarDiv.dataset.translation = en('intro.grammarEnLabel') + (grammarItems.length > 0 ? grammarItems.join(" \u2022 ") : en('intro.notSetLabel'));

  // Append main sections
  appendChildren(tileContainer, title, fn, sem, grammarDiv);

  // Next button
  const btnNext = createButton(uz('nav.nextVocab'), () => transitionToTile(STATES.VOCAB));
  btnNext.classList.add('tl-uz');
  btnNext.dataset.translation = en('nav.nextVocab');
  tileContainer.appendChild(btnNext);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.renderIntroTile = renderIntroTile;
}
