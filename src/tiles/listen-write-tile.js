/**
 * Listen & Write Tile (Tile 8)
 * ============================
 * Audio dictation exercise - learners hear sentences and type what they hear.
 * Uses approved sentence pool from PATTERN/CONTROLLED tiles.
 * 
 * @module src/tiles/listen-write-tile
 * @version 2.0.0 (Phase 2 Refactor)
 */

import {
  clearTileContainer,
  getTileContainer,
  createButton,
  setState,
  transitionToTile,
  STATES,
  resolveUIData,
  awardPoints,
  addMaxScore,
  playSound
} from './tile-utils.js';
import { uz, en } from '../core/i18n.js';
import { createInstructionBanner } from '../components/instruction-banner.js';

// ============================
// HELPER FUNCTIONS
// ============================

/**
 * Normalize text for comparison (lowercase, trim, collapse spaces, strip punctuation)
 * @param {string} s - Text to normalize
 * @returns {string} Normalized text
 */
function _normText(s) {
  if (typeof window._normText === 'function') {
    return window._normText(s);
  }
  // Fallback implementation
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.?!,;:'"]+$/g, '');
}

/**
 * Get audio entry from AUDIO_BANK
 * @param {string} audioId - Audio ID to lookup
 * @returns {Object|null} Audio entry or null
 */
function getAudioEntry(audioId) {
  if (typeof window.getAudioEntry === 'function') {
    return window.getAudioEntry(audioId);
  }
  // Fallback: search AUDIO_BANK directly
  for (const unitId in window.AUDIO_BANK) {
    if (window.AUDIO_BANK[unitId] && window.AUDIO_BANK[unitId][audioId]) {
      return window.AUDIO_BANK[unitId][audioId];
    }
  }
  return null;
}

/**
 * Play audio for exercise (TTS or audio bank)
 * @param {Object|string} item - Audio item or text to speak
 * @param {string} voice - Voice profile
 * @returns {Promise<boolean>} Success status
 */
async function playExerciseAudio(item, voice) {
  if (typeof window.playExerciseAudio === 'function') {
    return window.playExerciseAudio(item, voice);
  }
  // Fallback to browser TTS
  const text = typeof item === 'string' ? item : (item.transcript_correct || '');
  if (text && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

// ============================
// MAIN RENDER FUNCTION
// ============================

/**
 * Render the Listen & Write tile
 * Enforces WRITING completion before allowing access.
 * Uses approved sentence pool from PATTERN/CONTROLLED tiles.
 * 
 * @param {Object} lesson - Lesson data object
 */
export function renderListenWriteTile(lesson) {
  clearTileContainer();
  const tileContainer = getTileContainer();

  // Enforce WRITING tile completion before allowing Listen & Write
  // Teacher mode bypasses ALL gates for absolute freedom
  if (!window.lastWritingPassed && !window.TEACHER_MODE) {
    const title = document.createElement("div");
    title.className = "tile-title";
    title.textContent = uz('listenWrite.locked');
    title.classList.add('tl-uz');
    title.dataset.translation = en('listenWrite.locked');

    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = uz('listenWrite.gateWriting');
    msg.classList.add("tl-uz");
    msg.dataset.translation = en('listenWrite.gateWriting');

    const btnBack = createButton(uz("nav.backWriting"), () => {
      transitionToTile(STATES.WRITING);
    });
    btnBack.classList.add("tl-uz");
    btnBack.dataset.translation = en("nav.backWriting");

    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnBack);
    return;
  }

  const r = resolveUIData(STATES.LISTEN_WRITE, lesson);

  // Instruction banner
  const lwBanner = createInstructionBanner('listen_write', { showPairWork: true });
  if (lwBanner) tileContainer.appendChild(lwBanner);

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = uz('tiles.listenWrite');
  title.classList.add('tl-uz');
  title.dataset.translation = en('tiles.listenWrite');

  const info = document.createElement("div");
  info.className = "tile-section";
  info.textContent = uz('listenWrite.fullInstruction');
  info.classList.add("tl-uz");
  info.dataset.translation = en('listenWrite.fullInstruction');

  // Build approved sentence pool from PATTERN + CONTROLLED pools
  const patternPool = window.__LAST_PATTERN_SENTENCES__ || [];
  const controlledPool = window.__LAST_CONTROLLED_SENTENCES__ || [];
  let pool = [...patternPool, ...controlledPool]
    .map(s => _normText(s || ""))
    .filter(Boolean);
  
  // Remove duplicates
  pool = [...new Set(pool)];

  // If pool is too small, fallback to extracting from lesson patterns
  if (pool.length < 3 && lesson && lesson.TL_patterns) {
    lesson.TL_patterns.forEach(p => {
      if (p.examples && Array.isArray(p.examples)) {
        p.examples.forEach(ex => {
          const ns = _normText(ex.en || ex.sentence || "");
          if (ns && !pool.includes(ns)) pool.push(ns);
        });
      }
      if (p.english_examples && Array.isArray(p.english_examples)) {
        p.english_examples.forEach(ex => {
          const ns = _normText(ex || "");
          if (ns && !pool.includes(ns)) pool.push(ns);
        });
      }
    });
  }

  // Take 5 sentences for the exercise
  pool = pool.slice(0, 5);

  if (pool.length === 0) {
    const err = document.createElement("div");
    err.className = "tile-section";
    err.textContent = uz('listenWrite.noSentences');
    tileContainer.appendChild(title);
    tileContainer.appendChild(err);
    return;
  }

  const form = document.createElement("div");
  const textareas = [];

  // Initialize max score for LISTEN_WRITE tile (4 points per sentence)
  const pointsPerSentence = 4;
  addMaxScore(pool.length * pointsPerSentence);

  pool.forEach((s, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tile-section listen-write-item";
    wrapper.style.cssText = "background:#fafafa;padding:12px;border-radius:8px;margin-bottom:12px;";

    const label = document.createElement("div");
    label.textContent = uz('listenWrite.perItemLabel').replace('{index}', idx + 1);
    label.classList.add("tl-uz");
    label.dataset.translation = en('listenWrite.perItemLabel').replace('{index}', idx + 1);
    label.style.marginBottom = "8px";

    // Audio play button
    const btnPlay = /** @type {HTMLButtonElement} */ (createButton(uz('listenWrite.listenBtn'), async () => {
      btnPlay.disabled = true;
      btnPlay.textContent = "⏳...";
      try {
        // Try audio bank first
        const audioEntry = getAudioEntry("LW_" + idx);
        if (audioEntry && audioEntry.path) {
          const audio = new Audio(audioEntry.path);
          await audio.play();
        } else {
          // Fallback to TTS
          const result = await playExerciseAudio({ transcript_correct: String(s || "") }, "neutral_female_slow");
          if (!result) {
            // Ultimate fallback: browser TTS
            if (window.speechSynthesis) {
              const utter = new SpeechSynthesisUtterance(s);
              utter.rate = 0.85;
              window.speechSynthesis.speak(utter);
            }
          }
        }
      } catch (e) {
        console.warn("Listen & Write audio failed:", e);
      }
      btnPlay.disabled = false;
      btnPlay.textContent = uz('listenWrite.listenBtn');
    }));
    btnPlay.classList.add("tl-uz");
    btnPlay.dataset.translation = en('listenWrite.listenBtn');
    btnPlay.style.marginBottom = "8px";

    const ta = document.createElement("textarea");
    ta.placeholder = uz('listenWrite.inputPlaceholder');
    ta.rows = 2;
    ta.style.cssText = "width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;font-size:1rem;resize:vertical;";
    ta.dataset.correct = s;

    textareas.push(ta);
    wrapper.appendChild(label);
    wrapper.appendChild(btnPlay);
    wrapper.appendChild(ta);
    form.appendChild(wrapper);
  });

  const feedback = document.createElement("div");
  feedback.className = "feedback";

  const btnCheck = createButton(uz('buttons.check'), () => {
    let passCount = 0;
    let totalPoints = 0;

    textareas.forEach((ta, idx) => {
      const user = _normText(ta.value || "");
      const gold = _normText(ta.dataset.correct || "");

      // Calculate word overlap percentage
      const userWords = user.split(" ").filter(Boolean);
      const goldWords = gold.split(" ").filter(Boolean);
      let matched = 0;
      userWords.forEach(w => {
        if (goldWords.includes(w)) matched++;
      });
      const ratio = goldWords.length > 0 ? matched / goldWords.length : 0;

      // 60% word overlap = pass for this sentence
      const passed = ratio >= 0.6;
      
      // Visual feedback
      ta.style.borderColor = passed ? "#4caf50" : "#f44336";
      ta.style.borderWidth = "2px";

      if (passed) {
        passCount++;
        // Award points only if not already awarded
        if (!ta.dataset.pointsAwarded) {
          awardPoints(pointsPerSentence, 'Listen-Write #' + (idx + 1), 'LISTEN_WRITE');
          ta.dataset.pointsAwarded = "true";
          totalPoints += pointsPerSentence;
        }
      }
    });

    const overallScore = textareas.length > 0 ? passCount / textareas.length : 0;
    const pointsMsg = totalPoints > 0 ? " (+" + totalPoints + " points)" : "";

    if (overallScore >= 0.8) {
      feedback.textContent = uz('listenWrite.successMsg').replace('{correct}', passCount + "/" + textareas.length) + pointsMsg;
      feedback.className = "feedback ok";
      playSound('correct');
      window.listenWritePassed = true;
    } else {
      feedback.textContent = uz('listenWrite.failureMsg').replace('{current}', passCount + "/" + textareas.length);
      feedback.className = "feedback err";
      playSound('wrong');
    }
    feedback.dataset.lastScore = String(overallScore);
  });

  const btnContinue = createButton(uz('buttons.continue'), () => {
    // TEACHER MODE: Bypass validation
    if (window.TEACHER_MODE) {
      playSound('complete');
      transitionToTile(STATES.MISTAKE);
      return;
    }

    const lastScore = Number(feedback.dataset.lastScore || "0");
    if (lastScore >= 0.8) {
      playSound('complete');
      transitionToTile(STATES.MISTAKE);
    } else {
      feedback.textContent = uz('listenWrite.gatePrev');
      feedback.className = "feedback err";
      playSound('wrong');
    }
  });

  // TEACHER MODE: Skip button
  if (window.TEACHER_MODE) {
    const btnSkip = createButton(uz('listenWrite.skipTeacher'), () => {
      transitionToTile(STATES.MISTAKE);
    });
    btnSkip.style.background = "#673ab7";
    form.appendChild(btnSkip);
  }

  tileContainer.appendChild(title);
  tileContainer.appendChild(info);
  tileContainer.appendChild(form);
  tileContainer.appendChild(btnCheck);
  tileContainer.appendChild(btnContinue);
  tileContainer.appendChild(feedback);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
window.renderListenWriteTile = renderListenWriteTile;

export default renderListenWriteTile;
