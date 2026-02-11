/**
 * Unit Error Detection Tile Module
 * =================================
 * Handles the unit-level error detection exercise where students 
 * identify if sentences are correct or incorrect.
 *
 * @module src/tiles/unit-error-tile
 * @version 1.0.0 (Phase 2 Refactor)
 */

import {
  getTileContainer,
  clearTileContainer,
  STATES,
  setState,
  transitionToTile,
  createButton
} from './tile-utils.js';

/**
 * Bilingual string retrieval functions from window
 */
function getUz(path) {
  return typeof window.getUz === 'function' ? window.getUz(path) : path;
}

function getEn(path) {
  return typeof window.getEn === 'function' ? window.getEn(path) : path;
}

/**
 * Play audio for an exercise item (accessed from window)
 */
function playExerciseAudio(audioSpec) {
  if (typeof window.playExerciseAudio === 'function') {
    return window.playExerciseAudio(audioSpec, "neutral_female_slow");
  }
  console.warn('playExerciseAudio not available');
  return Promise.resolve();
}

/**
 * Access getUnitErrorDetectionSpec from window
 */
function getUnitErrorDetectionSpec(unitId) {
  return typeof window.getUnitErrorDetectionSpec === 'function'
    ? window.getUnitErrorDetectionSpec(unitId)
    : null;
}

/**
 * Access ACTIVE_CURRICULUM from window
 */
function getActiveCurriculum() {
  return window.ACTIVE_CURRICULUM || null;
}

/**
 * Check if teacher mode is enabled
 */
function isTeacherMode() {
  return !!window.TEACHER_MODE;
}

/**
 * Render the Unit Error Detection Tile
 * Displays sentences for students to mark as correct or incorrect.
 *
 * @param {string} unitId - The current unit ID
 */
export function renderUnitErrorDetectionTile(unitId) {
  const tileContainer = getTileContainer();
  clearTileContainer();

  const spec = getUnitErrorDetectionSpec(unitId);
  const curriculum = getActiveCurriculum();

  // Create title element
  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Birlik \u200D\u201C Xatolarni Aniqlash";
  title.classList.add("tl-uz");
  title.dataset.translation = "Unit \u200D\u201C Error Detection";

  // Validate data availability
  if (!spec || !Array.isArray(spec.items) || !curriculum || !curriculum.audio) {
    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = "Unit error detection ma'lumotlari topilmadi yoki noto'g'ri.";
    msg.classList.add("tl-uz");
    msg.dataset.translation = "Unit error detection data not found or invalid.";
    
    const btnSkip = createButton("Skip to Grand Tile", () => transitionToTile(STATES.GRAND_TILE));
    
    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnSkip);
    return;
  }

  // Create instruction section
  const info = document.createElement("div");
  info.className = "tile-section";
  info.textContent = spec.prompt_uz || "Har bir gapni tinglang yoki o'qing va to'g'ri yoki noto'g'ri ekanligini aniqlang.";
  info.classList.add("tl-uz");
  info.dataset.translation = spec.prompt_en || "Listen to or read each sentence and determine if it is correct or incorrect.";

  // Build form with sentence items
  const form = document.createElement("div");
  const controls = [];

  spec.items.forEach((audioId, idx) => {
    const audioEntry = curriculum.audio[audioId];
    if (!audioEntry) return;

    const wrapper = document.createElement("div");
    wrapper.className = "tile-section";

    // Sentence label
    const label = document.createElement("div");
    const displayText = audioEntry.wrong || audioEntry.transcript_correct || "(no text)";
    label.textContent = "Gap " + (idx + 1) + ": " + displayText;
    label.classList.add("tl-uz");
    label.dataset.translation = "Sentence " + (idx + 1) + ": " + displayText;

    // Create selection dropdown
    const select = document.createElement("select");

    const optBlank = document.createElement("option");
    optBlank.value = "";
    optBlank.textContent = "Tanlang\u200D\u00A6";
    optBlank.classList.add("tl-uz");
    optBlank.dataset.translation = "Select\u200D\u00A6";

    const optCorrect = document.createElement("option");
    optCorrect.value = "correct";
    optCorrect.textContent = "To'g'ri";
    optCorrect.classList.add("tl-uz");
    optCorrect.dataset.translation = "Correct";

    const optIncorrect = document.createElement("option");
    optIncorrect.value = "incorrect";
    optIncorrect.textContent = "Noto'g'ri";
    optIncorrect.classList.add("tl-uz");
    optIncorrect.dataset.translation = "Incorrect";

    select.appendChild(optBlank);
    select.appendChild(optCorrect);
    select.appendChild(optIncorrect);

    // Determine expected answer from is_correct field
    const expected = (audioEntry.is_correct === true || audioEntry.is_correct === "true") 
      ? "correct" 
      : "incorrect";
    select.dataset.expected = expected;
    select.dataset.errorType = audioEntry.error_type_uz || "";
    controls.push(select);

    wrapper.appendChild(label);

    // Add play button if audio is available
    if (audioEntry.transcript_correct || audioEntry.file) {
      const btnPlay = createButton("Tinglash", () => playExerciseAudio(audioEntry));
      btnPlay.classList.add("tl-uz");
      btnPlay.dataset.translation = "Listen";
      wrapper.appendChild(btnPlay);
    }

    wrapper.appendChild(select);
    form.appendChild(wrapper);
  });

  // Feedback element
  const feedback = document.createElement("div");
  feedback.className = "feedback";

  // Check button
  const btnCheck = createButton(getUz("common.buttons.check"), () => {
    if (controls.length === 0) {
      feedback.textContent = getUz("errorDetectionTile.feedback.noQuestions");
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = getEn("errorDetectionTile.feedback.noQuestions");
      feedback.className = "feedback err";
      return;
    }

    let correctCount = 0;
    const wrong = [];
    
    controls.forEach((sel, idx) => {
      const val = sel.value;
      const expected = sel.dataset.expected;
      if (val === expected && expected !== "") {
        correctCount++;
      } else if (val !== "" && val !== expected) {
        wrong.push({ idx: idx + 1, expected, errorType: sel.dataset.errorType });
      }
    });

    const score = correctCount / controls.length;
    const threshold = spec.pass_threshold || 0.8;

    if (score >= threshold) {
      feedback.textContent = "Yaxshi! Grand Tile ochildi.";
      feedback.className = "feedback ok";
    } else {
      let msg = getUz("errorDetectionTile.feedback.someWrong") + " ";
      if (wrong.length > 0) {
        const first = wrong[0];
        msg += "Gap " + first.idx + " " + (first.expected === "incorrect" 
          ? getUz("errorDetectionTile.options.incorrect").toLowerCase() 
          : getUz("errorDetectionTile.options.correct").toLowerCase()) + ".";
        if (first.errorType) msg += " (" + first.errorType + ")";
      }
      feedback.textContent = msg;
      feedback.className = "feedback err";
    }

    feedback.dataset.lastScore = String(score);
  });
  btnCheck.classList.add("tl-uz");
  btnCheck.dataset.translation = getEn("common.buttons.check");

  // Continue button
  const btnContinue = createButton(getUz("errorDetectionTile.continueGrand"), () => {
    // TEACHER MODE: Bypass validation
    if (isTeacherMode()) {
      transitionToTile(STATES.GRAND_TILE);
      return;
    }
    
    const lastScore = Number(feedback.dataset.lastScore || "0");
    const threshold = spec.pass_threshold || 0.8;
    
    if (lastScore >= threshold) {
      transitionToTile(STATES.GRAND_TILE);
    } else {
      feedback.textContent = "Oldin xatolarni aniqlash topshirig'idan o'ting (≥" + Math.round(threshold * 100) + "%).";
      feedback.className = "feedback err";
    }
  });
  btnContinue.classList.add("tl-uz");
  btnContinue.dataset.translation = getEn("errorDetectionTile.continueGrand");

  // Assemble tile
  tileContainer.appendChild(title);
  tileContainer.appendChild(info);
  tileContainer.appendChild(form);
  tileContainer.appendChild(btnCheck);
  tileContainer.appendChild(btnContinue);
  tileContainer.appendChild(feedback);
}

// Backward compatibility for window-based access
if (typeof window !== 'undefined') {
  window.renderUnitErrorDetectionTile = renderUnitErrorDetectionTile;
}

export default renderUnitErrorDetectionTile;
