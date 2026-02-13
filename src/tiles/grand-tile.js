/**
 * Grand Tile Module
 * ==================
 * Handles the final unit task where students write a complete response
 * using the vocabulary and grammar structures learned in the unit.
 *
 * @module src/tiles/grand-tile
 * @version 1.0.0 (Phase 2 Refactor)
 */

import {
  getTileContainer,
  clearTileContainer,
  STATES,
  setState,
  transitionToTile,
  createButton,
  resolveUIData,
  mergeMissingKeys
} from './tile-utils.js';
import { uz as getUz, en as getEn } from '../core/i18n.js';

/**
 * Access getGrandTileSpec from window
 */
function getGrandTileSpec(unitId) {
  return typeof window.getGrandTileSpec === 'function'
    ? window.getGrandTileSpec(unitId)
    : null;
}

/**
 * Access getCurrentLesson from window
 */
function getCurrentLesson() {
  return typeof window.getCurrentLesson === 'function'
    ? window.getCurrentLesson()
    : null;
}

/**
 * Access getVocab from window
 */
function getVocab(id) {
  return typeof window.getVocab === 'function'
    ? window.getVocab(id)
    : null;
}

/**
 * Access normalizeText from window
 */
function normalizeText(text) {
  if (typeof window.normalizeText === 'function') {
    return window.normalizeText(text);
  }
  // Fallback implementation
  return (text || '').toLowerCase().trim().replace(/[^\w\s]/g, '');
}

/**
 * Render the Grand Tile
 * Final unit task with free-form writing and vocabulary/grammar validation.
 *
 * @param {string} unitId - The current unit ID
 */
export function renderGrandTile(unitId) {
  const tileContainer = getTileContainer();
  clearTileContainer();

  const spec = getGrandTileSpec(unitId);
  const lesson = getCurrentLesson();
  const r = resolveUIData(STATES.GRAND_TILE, lesson);
  mergeMissingKeys(r.missingKeys);

  // Create title element
  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = getUz('grand.tileTitle');
  title.classList.add("tl-uz");
  title.dataset.translation = getEn('grand.tileTitle');

  // Validate data availability
  if (!spec && !r.data.uz_instruction && !r.data.expected_output_sample) {
    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = getUz('grand.noData');
    msg.classList.add("tl-uz");
    msg.dataset.translation = getEn('grand.noData');
    
    const btnFinish = createButton(getUz('grand.completeUnit'), () => transitionToTile(STATES.DONE));
    btnFinish.classList.add("tl-uz");
    btnFinish.dataset.translation = getEn('grand.finishUnit');
    
    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnFinish);
    return;
  }

  // Create instruction section
  const instr = document.createElement("div");
  instr.className = "tile-section";
  instr.textContent = r.data.uz_instruction || (spec && spec.uz_instruction) || getUz('grand.fallbackInstruction');
  instr.classList.add("tl-uz");
  instr.dataset.translation = getEn('grand.taskInstruction');

  // Create text input area
  const textarea = document.createElement("textarea");
  textarea.rows = 6;
  textarea.placeholder = getUz('grand.placeholder');
  textarea.classList.add("tl-uz");
  textarea.dataset.translation = getEn('grand.placeholder');

  // Create samples section
  const samplesDiv = document.createElement("div");
  samplesDiv.className = "tile-section";

  const samples =
    (Array.isArray(r.data.expected_output_sample) && r.data.expected_output_sample) ||
    (spec && Array.isArray(spec.expected_output_samples_en) && spec.expected_output_samples_en) ||
    (spec && Array.isArray(spec.expected_output_sample) && spec.expected_output_sample) ||
    null;

  if (samples) {
    const ul = document.createElement("ul");
    samples.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });
    samplesDiv.textContent = getUz("grandTile.samplesLabel");
    samplesDiv.classList.add("tl-uz");
    samplesDiv.dataset.translation = getEn("grandTile.samplesLabel");
    samplesDiv.appendChild(ul);
  }

  // Feedback element
  const feedback = document.createElement("div");
  feedback.className = "feedback";

  // Check button
  const btnCheck = createButton(getUz("common.buttons.check"), () => {
    const text = textarea.value || "";
    
    // Use Grand Tile specific evaluation if available
    const requiredTokens = (spec && Array.isArray(spec.required_tokens)) ? spec.required_tokens : [];
    const targetWordCount = (spec && spec.target_word_count) ? spec.target_word_count : 30;
    const minWordCount = Math.floor(targetWordCount * 0.8);
    
    const norm = normalizeText(text);
    const words = norm.split(" ").filter(Boolean);
    const wordCount = words.length;
    
    const missingTL = requiredTokens.filter((t) => !norm.includes(normalizeText(t)));
    
    // Get vocab for TV coverage check
    const vocabIds = Array.isArray(lesson && lesson.vocab_ids) ? lesson.vocab_ids : [];
    const tvForms = vocabIds
      .map((id) => (getVocab(id) && (getVocab(id).en || getVocab(id).word)) || "")
      .filter(Boolean)
      .map(normalizeText);
    
    const tvUnique = Array.from(new Set(tvForms));
    const tvHit = tvUnique.filter((w) => norm.includes(w)).length;
    const tvNeed = tvUnique.length ? Math.ceil(tvUnique.length * 0.6) : 0;
    
    // Collect validation reasons
    const reasons = [];
    if (wordCount < minWordCount) reasons.push("len");
    if (missingTL.length) reasons.push("tl");
    if (tvNeed > 0 && tvHit < tvNeed) reasons.push("tv");
    
    const passed = reasons.length === 0;
    
    if (passed) {
      feedback.textContent = getUz('grand.success');
      feedback.className = "feedback ok";
    } else {
      if (reasons.includes("len")) {
        feedback.textContent = getUz("grandTile.feedback.tooShort").replace("${min}", minWordCount);
      } else if (reasons.includes("tl")) {
        feedback.textContent = getUz("grandTile.feedback.requiredMissing").replace("${words}", missingTL.join(", "));
      } else if (reasons.includes("tv")) {
        feedback.textContent = getUz('grand.needMoreWords').replace('{count}', tvNeed);
      } else {
        feedback.textContent = getUz('grand.failure');
      }
      feedback.className = "feedback err";
    }
    
    feedback.dataset.lastPassed = passed ? "true" : "false";
  });

  // Finish button
  const btnFinish = createButton(getUz('grand.completeUnit'), () => {
    const lastPassed = feedback.dataset.lastPassed === "true";
    if (lastPassed) {
      // GRAND_TILE completion does NOT auto-unlock next unit (future-safe)
      // Just go to DONE state, unit selector handles unit progression separately
      transitionToTile(STATES.DONE);
    } else {
      feedback.textContent = getUz('grand.gate');
      feedback.className = "feedback err";
    }
  });

  // Assemble tile
  tileContainer.appendChild(title);
  tileContainer.appendChild(instr);
  tileContainer.appendChild(textarea);
  tileContainer.appendChild(samplesDiv);
  tileContainer.appendChild(btnCheck);
  tileContainer.appendChild(btnFinish);
  tileContainer.appendChild(feedback);
}

// Backward compatibility for window-based access
if (typeof window !== 'undefined') {
  window.renderGrandTile = renderGrandTile;
}

export default renderGrandTile;
