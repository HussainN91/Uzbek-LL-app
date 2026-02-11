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
  if (!window.lastWritingPassed) {
    const title = document.createElement("div");
    title.className = "tile-title";
    title.textContent = "Tile 8 — Listen & Write (Locked)";

    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = "Oldin WRITING bosqichini yakunlang.";
    msg.classList.add("tl-uz");
    msg.dataset.translation = "Complete the WRITING tile first.";

    const btnBack = createButton("Qaytish: WRITING", () => {
      transitionToTile(STATES.WRITING);
    });
    btnBack.classList.add("tl-uz");
    btnBack.dataset.translation = "Back: WRITING";

    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnBack);
    return;
  }

  const r = resolveUIData(STATES.LISTEN_WRITE, lesson);

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Tile 8 — Listen & Write";

  const info = document.createElement("div");
  info.className = "tile-section";
  info.textContent = "Gapni eshiting va aynan shu gapni yozing. Har gapda kamida 60% mos kelishi kerak.";
  info.classList.add("tl-uz");
  info.dataset.translation = "Listen to the sentence and type exactly what you hear. Each sentence needs at least 60% word match.";

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
    err.textContent = "No sentences available for dictation.";
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
    label.textContent = "[" + (idx + 1) + "] Gapni eshiting va yozing:";
    label.classList.add("tl-uz");
    label.dataset.translation = "[" + (idx + 1) + "] Listen and type the sentence:";
    label.style.marginBottom = "8px";

    // Audio play button
    const btnPlay = /** @type {HTMLButtonElement} */ (createButton("🔊 Tinglash", async () => {
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
      btnPlay.textContent = "🔊 Tinglash";
    }));
    btnPlay.classList.add("tl-uz");
    btnPlay.dataset.translation = "Listen";
    btnPlay.style.marginBottom = "8px";

    const ta = document.createElement("textarea");
    ta.placeholder = "Type the sentence you hear...";
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

  const btnCheck = createButton("Check", () => {
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
      feedback.textContent = "Juda yaxshi! " + passCount + "/" + textareas.length + " to'g'ri." + pointsMsg;
      feedback.className = "feedback ok";
      playSound('correct');
      window.listenWritePassed = true;
    } else {
      feedback.textContent = "Kamida 80% (4/5 gap) to'g'ri bo'lishi kerak. Hozir: " + passCount + "/" + textareas.length;
      feedback.className = "feedback err";
      playSound('wrong');
    }
    feedback.dataset.lastScore = String(overallScore);
  });

  const btnContinue = createButton("Continue", () => {
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
      feedback.textContent = "Oldin bu mashqni yakunlang (≥80%).";
      feedback.className = "feedback err";
      playSound('wrong');
    }
  });

  // TEACHER MODE: Skip button
  if (window.TEACHER_MODE) {
    const btnSkip = createButton("🎓 Skip (Teacher)", () => {
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
