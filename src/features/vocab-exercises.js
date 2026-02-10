/**
 * Vocab Exercise Renderers
 * ========================
 * Self-contained exercise rendering functions for vocab cards.
 * Each function takes a container, data, and a completion callback.
 * Extracted from vocab-card-renderer.js (Priority 3: Split renderer monolith).
 *
 * @module src/features/vocab-exercises
 * @version 1.0.0
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════

/**
 * Fisher-Yates shuffle (immutable)
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Replace **chunk** markup with highlight spans
 * @param {string} text
 * @returns {string}
 */
export function renderChunks(text) {
  if (!text) return '';
  return text.replace(/\*\*(.+?)\*\*/g, '<span class="chunk-highlight">$1</span>');
}

/**
 * Build blurred canonical sentence for Scratch mode
 * @param {string} canonical
 * @param {string[]} scratchWords
 * @returns {string}
 */
export function renderScratchSentence(canonical, scratchWords = []) {
  if (!canonical) return '';
  if (!scratchWords.length) return canonical;

  const words = canonical.split(/(\s+)/); // keep whitespace tokens
  const lowerTargets = scratchWords.map(w => w.toLowerCase());

  return words.map(token => {
    const trimmed = token.trim();
    if (!trimmed) return token;
    const hide = lowerTargets.includes(trimmed.toLowerCase());
    return hide ? `<span class="scratch-hide">${trimmed}</span>` : token;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// 1. JUMBLE EXERCISE — Arrange words in correct order
// ═══════════════════════════════════════════════════════════════

/**
 * @param {HTMLElement} container
 * @param {string[]} jumbleWords
 * @param {string} correctSentence
 * @param {(() => void)|null} onComplete
 */
export function renderJumbleExercise(container, jumbleWords, correctSentence, onComplete) {
  container.innerHTML = '';

  const title = document.createElement('div');
  title.innerHTML = '🧩 <strong>Jumble</strong> — Tap words in the correct order';
  title.style.cssText = 'font-size: 16px; margin-bottom: 16px; color: #333;';
  container.appendChild(title);

  const answerArea = document.createElement('div');
  answerArea.style.cssText = `
    min-height: 60px;
    border: 2px dashed #ccc;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background: #fafafa;
  `;

  const wordBank = document.createElement('div');
  wordBank.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;';

  const selectedWords = [];
  const shuffled = shuffleArray(jumbleWords);

  shuffled.forEach((word) => {
    const chip = document.createElement('button');
    chip.textContent = word;
    chip.dataset.word = word;
    chip.style.cssText = `
      padding: 10px 16px;
      background: #5a67d8;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    `;

    chip.onclick = () => {
      if (chip.parentElement === wordBank) {
        answerArea.appendChild(chip);
        selectedWords.push(word);
      } else {
        wordBank.appendChild(chip);
        const idx = selectedWords.indexOf(word);
        if (idx > -1) selectedWords.splice(idx, 1);
      }
    };

    wordBank.appendChild(chip);
  });

  container.appendChild(answerArea);
  container.appendChild(wordBank);

  const checkBtn = document.createElement('button');
  checkBtn.textContent = '✓ Check Answer';
  checkBtn.style.cssText = `
    padding: 14px 24px;
    background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    transition: all 0.2s;
  `;

  checkBtn.onclick = () => {
    const userAnswer = selectedWords.join(' ');
    const correct = userAnswer.toLowerCase() === correctSentence.toLowerCase();

    if (correct) {
      answerArea.style.border = '2px solid #4caf50';
      answerArea.style.background = '#e8f5e9';
      checkBtn.textContent = '✓ Correct!';
      checkBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
      if (onComplete) setTimeout(onComplete, 1500);
    } else {
      answerArea.style.border = '2px solid #f44336';
      answerArea.style.background = '#ffebee';
      checkBtn.textContent = '✗ Try again';
      checkBtn.style.background = 'linear-gradient(135deg, #f44336 0%, #e53935 100%)';
      setTimeout(() => {
        answerArea.style.border = '2px dashed #ccc';
        answerArea.style.background = '#fafafa';
        checkBtn.textContent = '✓ Check Answer';
        checkBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
      }, 1500);
    }
  };

  container.appendChild(checkBtn);
}

// ═══════════════════════════════════════════════════════════════
// 2. TRAP EXERCISE — Identify and fix error
// ═══════════════════════════════════════════════════════════════

/**
 * @param {HTMLElement} container
 * @param {{ wrong: string, fix: string }} trapData
 * @param {(() => void)|null} onComplete
 */
export function renderTrapExercise(container, trapData, onComplete) {
  container.innerHTML = '';

  const title = document.createElement('div');
  title.innerHTML = '🪤 <strong>Trap</strong> — Spot the error';
  title.style.cssText = 'font-size: 16px; margin-bottom: 16px; color: #333;';
  container.appendChild(title);

  const wrongSentence = document.createElement('div');
  wrongSentence.textContent = `❌ "${trapData.wrong}"`;
  wrongSentence.style.cssText = `
    padding: 16px;
    background: #fff3cd;
    border-left: 4px solid #ff9800;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 15px;
    color: #333;
  `;
  container.appendChild(wrongSentence);

  const revealBtn = document.createElement('button');
  revealBtn.textContent = '🔍 Show Explanation';
  revealBtn.style.cssText = `
    padding: 12px 24px;
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
    transition: all 0.2s;
  `;

  const explanation = document.createElement('div');
  explanation.style.cssText = `
    padding: 16px;
    background: #e8f5e9;
    border-left: 4px solid #4caf50;
    border-radius: 8px;
    margin-top: 12px;
    font-size: 14px;
    color: #333;
    display: none;
  `;
  explanation.innerHTML = `✓ <strong>Fix:</strong> ${trapData.fix}`;

  revealBtn.onclick = () => {
    explanation.style.display = 'block';
    revealBtn.textContent = '✓ Explanation shown';
    revealBtn.disabled = true;
    revealBtn.style.opacity = '0.6';
    if (onComplete) setTimeout(onComplete, 2000);
  };

  container.appendChild(revealBtn);
  container.appendChild(explanation);
}

// ═══════════════════════════════════════════════════════════════
// 3. SCRATCH EXERCISE — Reveal hidden words by clicking
// ═══════════════════════════════════════════════════════════════

/**
 * @param {HTMLElement} container
 * @param {string[]} scratchWords
 * @param {string} canonicalSentence
 * @param {(() => void)|null} onComplete
 */
export function renderScratchExercise(container, scratchWords, canonicalSentence, onComplete) {
  container.innerHTML = '';

  const title = document.createElement('div');
  title.innerHTML = '🎯 <strong>Scratch</strong> — Tap to reveal hidden words';
  title.style.cssText = 'font-size: 16px; margin-bottom: 16px; color: #333;';
  container.appendChild(title);

  const scratchCard = document.createElement('div');
  scratchCard.style.cssText = `
    position: relative;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s;
    min-height: 120px;
  `;

  const sentence = document.createElement('div');
  sentence.innerHTML = renderScratchSentence(canonicalSentence, scratchWords);
  sentence.style.cssText = 'font-size: 18px; line-height: 1.6; color: #333;';

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    background: #5a67d8;
    opacity: 0.18;
    border-radius: 12px;
    pointer-events: none;
  `;

  scratchCard.appendChild(sentence);
  scratchCard.appendChild(overlay);

  scratchCard.onclick = () => {
    scratchCard.querySelectorAll('.scratch-hide').forEach(span => {
      span.classList.add('scratch-revealed');
    });
    scratchCard.style.background = '#e8f5e9';
    if (onComplete) setTimeout(onComplete, 600);
  };

  container.appendChild(scratchCard);
}
