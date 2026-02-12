/**
 * writing-tile.js - Tile 7: Writing (Gated)
 * Free-form writing with vocabulary and length requirements
 */

import {
  getTileContainer,
  clearTileContainer,
  createButton,
  setState,
  transitionToTile,
  STATES
} from './tile-utils.js';
import { uz, en } from '../core/i18n.js';
import { createInstructionBanner } from '../components/instruction-banner.js';

/**
 * Get translation function reference — delegates to i18n.js
 * (Kept for backward compat but now routes through centralized i18n)
 */
function getUz(key) {
  return uz(key);
}

function getEn(key) {
  return en(key);
}

/**
 * Get vocab by ID
 */
function getVocab(id) {
  return typeof window.getVocab === 'function' ? window.getVocab(id) : null;
}

/**
 * Get master spec for current lesson
 */
function getMasterSpecForCurrentLesson() {
  return typeof window.getMasterSpecForCurrentLesson === 'function' 
    ? window.getMasterSpecForCurrentLesson() 
    : null;
}

/**
 * Word count helper
 */
function _wordCount(text) {
  return (text || '').trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Token inclusion check
 */
function _includesToken(text, token) {
  if (!text || !token) return false;
  const re = new RegExp('\\b' + token.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'i');
  return re.test(text);
}

/**
 * Coverage ratio calculation
 */
function _coverageRatio(text, tokens) {
  if (!tokens || tokens.length === 0) return 1;
  const found = tokens.filter(tok => _includesToken(text, tok)).length;
  return found / tokens.length;
}

/**
 * Render Tile 7 - Writing (Gated)
 * @param {Object} lesson - Lesson data
 */
export function renderWritingTile(lesson) {
  const tileContainer = getTileContainer();
  clearTileContainer();

  // Get controlled stage requirements
  const CONTROLLED_STAGES = window.CONTROLLED_STAGES || ['gap-fill', 'reorder', 'short-answer'];
  const totalStages = CONTROLLED_STAGES.length;
  const controlledStageIndex = window.controlledStageIndex || 0;

  // Enforce CONTROLLED stage completion before allowing Writing
  if (controlledStageIndex < totalStages) {
    const title = document.createElement("div");
    title.className = "tile-title";
    title.textContent = uz('writing.locked');
    title.classList.add('tl-uz');
    title.dataset.translation = en('writing.locked');
    
    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = "Oldin CONTROLLED barcha " + totalStages + " bosqichini (" + CONTROLLED_STAGES.join(", ") + ") yakunlang. Hozirgi bosqich: " + Math.min(controlledStageIndex + 1, totalStages) + "/" + totalStages + ".";
    msg.classList.add("tl-uz");
    msg.dataset.translation = "Complete all " + totalStages + " stages of CONTROLLED (" + CONTROLLED_STAGES.join(", ") + ") first. Current stage: " + Math.min(controlledStageIndex + 1, totalStages) + "/" + totalStages + ".";
    
    const btnBack = createButton("Qaytish: CONTROLLED", () => {
      transitionToTile(STATES.CONTROLLED);
    });
    btnBack.classList.add("tl-uz");
    btnBack.dataset.translation = "Back: CONTROLLED";
    
    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnBack);
    return;
  }

  window.lastWritingPassed = false;

  // Prefer lesson.writing_expectations, fallback to master spec
  const we = (lesson && lesson.writing_expectations && typeof lesson.writing_expectations === "object")
    ? lesson.writing_expectations
    : null;

  const masterSpec = getMasterSpecForCurrentLesson() || {};
  const uzPrompt =
    (we && we.uzbek_prompt) ||
    masterSpec.uz_instruction ||
    "Kamida 2 ta sodda gap yozing (darsdan so'zlar ishlating).";

  const requiredTL = (we && Array.isArray(we.required_tl_tokens) ? we.required_tl_tokens : null) ||
    (Array.isArray(masterSpec.required_tokens) ? masterSpec.required_tokens : []);

  // TV coverage: use lesson vocab_ids
  const vocabIds = Array.isArray(lesson.vocab_ids) ? lesson.vocab_ids : [];
  const preferredTV = vocabIds
    .map((id) => (getVocab(id) && (getVocab(id).en || getVocab(id).word)) || "")
    .filter(Boolean);

  // A1-FRIENDLY: Just 2 sentences = ~8 words minimum
  const targetWordCount = (we && Number(we.target_word_count)) || 10;
  const minWC = Math.max(8, Math.ceil(targetWordCount * 0.8));

  // Instruction banner
  const writingBanner = createInstructionBanner('writing', { showPairWork: true });
  if (writingBanner) tileContainer.appendChild(writingBanner);

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = uz('tiles.writing');
  title.classList.add('tl-uz');
  title.dataset.translation = en('tiles.writing');

  const instr = document.createElement("div");
  instr.className = "tile-section";
  instr.textContent = uzPrompt;
  instr.classList.add("tl-uz");
  if (we && we.english_prompt) {
    instr.dataset.translation = String(we.english_prompt);
  } else {
    instr.dataset.translation = "Write at least 2 simple sentences (use words from the lesson).";
  }

  const textarea = document.createElement("textarea");
  textarea.rows = 5;
  textarea.placeholder = uz('writing.placeholder');
  textarea.classList.add("tl-uz");
  textarea.dataset.translation = getEn("common.placeholders.writeHere");

  const feedback = document.createElement("div");
  feedback.className = "feedback";

  const btnCheck = createButton(uz('buttons.check'), () => {
    const text = textarea.value || "";
    const wc = _wordCount(text);
    const wcOk = wc >= minWC;

    // A1-FRIENDLY: Combined 60% threshold
    const allVocab = [...requiredTL, ...preferredTV];
    const vocabRatio = _coverageRatio(text, allVocab);
    const vocabOk = vocabRatio >= 0.6;

    if (wcOk && vocabOk) {
      window.lastWritingPassed = true;
      feedback.textContent = "✓ Yaxshi, funksiyani to'liq ishlatyapsiz.";
      feedback.className = "feedback ok";
    } else {
      window.lastWritingPassed = false;
      
      let uzFeedback;
      if (!wcOk) {
        const needed = minWC - wc;
        uzFeedback = "Kamida 2 ta gap kerak. Yana " + needed + " ta so'z yozing (" + wc + "/" + minWC + ").";
      } else if (!vocabOk) {
        const missingWords = [];
        allVocab.forEach((tok) => {
          if (!_includesToken(text, tok) && missingWords.length < 3) {
            missingWords.push(tok);
          }
        });
        if (missingWords.length > 0) {
          uzFeedback = "Bu so'zlardan ishlating: '" + missingWords.join("', '") + "'.";
        } else {
          uzFeedback = "Darsdan ko'proq so'zlar ishlating.";
        }
      } else {
        uzFeedback = "Qayta urinib ko'ring.";
      }
      
      feedback.textContent = uzFeedback;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = "Check console for details. You need more words or more lesson vocabulary.";
      feedback.className = "feedback err";
    }
  });

  const btnContinue = createButton(uz('nav.nextListenWrite'), () => {
    // TEACHER MODE: Bypass all validation
    if (window.TEACHER_MODE) {
      transitionToTile(STATES.LISTEN_WRITE);
      return;
    }
    
    if (window.lastWritingPassed) {
      transitionToTile(STATES.LISTEN_WRITE);
    } else {
      feedback.textContent = "Oldin WRITING tile'dan o'ting (shartlar bajarilsin).";
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = "Pass the WRITING tile first (meet the requirements).";
      feedback.className = "feedback err";
    }
  });
  btnContinue.classList.add("tl-uz");
  btnContinue.dataset.translation = getEn("common.buttons.continue");

  tileContainer.appendChild(title);
  tileContainer.appendChild(instr);
  tileContainer.appendChild(textarea);
  tileContainer.appendChild(btnCheck);
  tileContainer.appendChild(btnContinue);
  tileContainer.appendChild(feedback);
}

// Backward compatibility
window.renderWritingTile = renderWritingTile;
