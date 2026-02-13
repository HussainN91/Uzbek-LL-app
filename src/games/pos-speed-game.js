/**
 * POS Speed Game Module
 * =====================
 * Part of Speech Speed Game - Vocab Tile Enhancement.
 * A timed game where users identify word categories.
 * 
 * @module src/games/pos-speed-game
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { uz, en } from '../core/i18n.js';

// ============================
// GAME STRINGS (Uzbek/English)
// ============================
const DEFAULT_STRINGS = {
  title: { uz: "⚡ Tezkor o'yin: So'z turini top!", en: "Speed Game: Identify the Part of Speech!" },
  instruction: { uz: "Har bir so'zning turini aniqlash uchun 4 soniya vaqtingiz bor", en: "You have 4 seconds to identify each word's part of speech" },
  categories: {
    verb: { uz: "Fe'l", en: "Verb", icon: "🔴" },
    subject: { uz: "Ega", en: "Subject/Noun", icon: "🟠" },
    adjective: { uz: "Sifat", en: "Adjective", icon: "🟣" },
    time: { uz: "Vaqt", en: "Time/Adverb", icon: "🟡" },
    place: { uz: "Joy", en: "Place", icon: "🟢" }
  },
  feedback: {
    correct: { uz: "✓ To'g'ri!", en: "Correct!" },
    wrong: { uz: "✗ Noto'g'ri", en: "Wrong" },
    timeout: { uz: "⏱ Vaqt tugadi!", en: "Time's up!" }
  },
  results: {
    title: { uz: "Natija", en: "Results" },
    score: { uz: "Ball", en: "Score" }
  },
  reviewVocab: { uz: "📖 So'zlarni ko'rib chiqish", en: "Review vocabulary" },
  ready: { uz: "✓ Tayyorman!", en: "I'm ready!" }
};

// All possible POS category values (Uzbek names used as keys in the game)
const ALL_CATEGORIES = ["Fe'l", "Ega", "Sifat", "Vaqt", "Joy"];

// Reverse lookup: category value → string key
const CATEGORY_TO_KEY = {
  "Fe'l": "verb",
  "Ega": "subject",
  "Sifat": "adjective",
  "Vaqt": "time",
  "Joy": "place"
};

// ============================
// POS MAPPING FUNCTIONS
// ============================

/**
 * Map raw POS tag to game category
 * @param {string} raw - Raw POS tag
 * @returns {string|null} Category name or null
 */
export function mapPosToCategory(raw) {
  if (!raw) return null;
  const s = String(raw).toLowerCase();
  
  // Check more specific patterns FIRST to avoid substring conflicts
  
  // === Vaqt (Time/Adverb) ===
  if (s.includes("time") || s.includes("vaqt")) return 'Vaqt';
  if (s.includes("age_phrase")) return 'Vaqt';
  if (s.includes("quantity_time")) return 'Vaqt';
  if (s.includes("frequency") || s.includes("adverb")) return 'Vaqt';
  
  // === Joy (Place/Location) ===
  if (s.includes("place") || s.includes("joy") || s.includes("location")) return 'Joy';
  if (s.includes("city") || s.includes("country")) return 'Joy';
  if (s.includes("preposition")) return 'Joy';
  
  // === Fe'l (Verb) — check BEFORE adjective since "verb" may appear in compound tags ===
  if (s.includes("verb") || s.includes("fe'l")) return "Fe'l";
  if (s.includes("phrasal")) return "Fe'l";
  
  // === Sifat (Adjective) — now a SEPARATE category ===
  if (s.includes("adjective") || s.includes("sifat")) return 'Sifat';
  if (s.includes("state_adjective")) return 'Sifat';
  
  // === Ega (Subject/Noun) ===
  if (s.includes("noun") || s.includes("ega") || s.includes("subject")) return 'Ega';
  if (s.includes("pronoun")) return 'Ega';
  if (s.includes("determiner")) return 'Ega';
  if (s.includes("number")) return 'Ega';
  
  return null;
}

/**
 * Heuristic category detection based on English text
 * @param {string} enText - English text
 * @returns {string|null} Category name or null
 */
export function heuristicCategory(enText) {
  const t = (enText || '').toLowerCase();
  if (!t) return null;
  
  // Time-related tokens (Vaqt)
  const timeTokens = [
    'now', 'right now', 'at the moment', 'today', 'this week', 'tonight',
    'morning', 'evening', 'night', 'weekend', 'weekends', 'afternoon',
    'before', 'after', 'friday', 'monday', 'tuesday', 'wednesday', 'thursday', 'saturday', 'sunday',
    'usually', 'often', 'always', 'never', 'sometimes', 'rarely',
    'years old', 'years', 'old', 'yesterday', 'all day', 'all morning'
  ];
  if (timeTokens.some(tok => t.includes(tok))) return 'Vaqt';
  
  // Place-related tokens (Joy)
  const placeTokens = [
    'school', 'home', 'house', 'park', 'office', 'mosque', 'room', 'class', 'kitchen', 'yard',
    'uzbekistan', 'tashkent', 'samarkand', 'bukhara', 'egypt', 'japan',
    'country', 'city', 'from', 'at school', 'at home', 'at work'
  ];
  if (placeTokens.some(tok => t.includes(tok))) return 'Joy';
  
  // Adjective-like tokens (Sifat) — common adjectives and state words
  const adjectiveTokens = [
    'happy', 'sad', 'tired', 'nervous', 'excited', 'busy', 'fine', 'great', 'nice', 'good', 'bad',
    'calm', 'difficult', 'late', 'ok', 'beautiful', 'big', 'small', 'tall', 'short',
    'hungry', 'thirsty', 'cold', 'hot', 'sick', 'angry', 'bored'
  ];
  if (adjectiveTokens.some(tok => t.includes(tok))) return 'Sifat';
  
  // Verb-like tokens (Fe'l) — common verbs
  const verbTokens = [
    'was', 'were', 'is', 'are', 'am', 'go', 'run', 'work', 'study', 'play', 'eat', 'sleep',
    'like', 'love', 'hate', 'have', 'do', 'make', 'say', 'get', 'come', 'take'
  ];
  if (verbTokens.some(tok => t.includes(tok))) return "Fe'l";
  
  return null;
}

/**
 * Build POS lookup from lesson data
 * @param {Object} lesson - Lesson object
 * @returns {Object} Lookup map { id: { pos, pos_uz, en } }
 */
export function buildPosLookupFromLesson(lesson) {
  const lookup = {};
  if (!lesson) return lookup;
  
  const tv = Array.isArray(lesson.TV_items) ? lesson.TV_items : 
             Array.isArray(lesson.tv_items) ? lesson.tv_items : [];
  const rtv = Array.isArray(lesson.recycled_tv) ? lesson.recycled_tv : [];
  
  [...tv, ...rtv].forEach(item => {
    if (!item || !item.id) return;
    lookup[item.id] = {
      pos: item.pos || '',
      pos_uz: item.pos_uz || '',
      en: item.en || ''
    };
  });
  
  return lookup;
}

/**
 * Get category for a word using all available data
 * @param {Object} word - Word object
 * @param {Object} posLookup - POS lookup map
 * @returns {string} Category name
 */
export function getCategoryForWord(word, posLookup = {}) {
  const id = word.id;
  const fromLookup = id ? posLookup[id] : null;
  const rawPosUz = word.pos_uz || fromLookup?.pos_uz;
  const rawPos = word.pos || fromLookup?.pos;
  const rawType = word.type || word.category || '';
  
  // 1. Try Uzbek POS tag
  let cat = mapPosToCategory(rawPosUz);
  
  // 2. Try English POS tag
  if (!cat) cat = mapPosToCategory(rawPos);
  
  // 3. Try card type field (e.g. "state_adjective", "grammar_verb", "time_expression", "location_chunk")
  if (!cat && rawType) {
    cat = mapPosToCategory(rawType);
  }
  
  // 4. Heuristic from English text
  if (!cat) cat = heuristicCategory(word.en || word.word || fromLookup?.en);
  
  // 5. Fallback
  if (!cat) cat = 'Ega';
  
  return cat;
}

// ============================
// GAME CLASS
// ============================

/**
 * POS Speed Game instance
 */
class POSSpeedGame {
  constructor(lesson, options = {}) {
    this.lesson = lesson;
    this.strings = options.strings || window.UI_STRINGS?.posSpeedGame || DEFAULT_STRINGS;
    
    this.overlay = null;
    this.modal = null;
    this.currentTimer = null;
    
    this.gameState = 'intro'; // 'intro', 'playing', 'results'
    this.currentWordIndex = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.gameWords = [];
    this.posLookup = {};
  }

  /**
   * Start the game
   */
  start() {
    this.loadGameWords();
    this.posLookup = buildPosLookupFromLesson(this.lesson);
    this.activeCategories = this.computeActiveCategories();
    this.createModal();
    this.renderIntro();
  }

  /**
   * Compute which POS categories are actually present in the game words.
   * Returns at least 3 and at most 5 categories so the buttons are meaningful.
   * @returns {string[]} Array of category values (e.g. ["Fe'l", "Sifat", "Vaqt", "Joy"])
   */
  computeActiveCategories() {
    // Get the categories for each game word
    const catSet = new Set();
    this.gameWords.forEach(word => {
      const cat = getCategoryForWord(word, this.posLookup);
      catSet.add(cat);
    });

    // Always include the found categories
    let cats = Array.from(catSet);

    // If fewer than 3, pad with common categories to create distractors
    if (cats.length < 3) {
      for (const fallback of ALL_CATEGORIES) {
        if (!cats.includes(fallback)) cats.push(fallback);
        if (cats.length >= 4) break;
      }
    }

    // Cap at 5 (shouldn't happen with current POS set)
    return cats.slice(0, 5);
  }

  /**
   * Load words for the game
   */
  loadGameWords() {
    const lessonId = this.lesson?.lesson_id || '';
    const unitId = lessonId?.match(/^(U\d+(?:_\d+)?)/)?.[1] || (lessonId ? lessonId.split('_')[0] : null);
    const vocabCardsKey = unitId ? `VOCAB_CARDS_${unitId}` : null;
    const vocabCardsData = window[vocabCardsKey];
    
    if (vocabCardsData) {
      const allCards = vocabCardsData.getCardsForLesson(lessonId) || [];
      this.gameWords = allCards.slice(0, 8); // First 8 words
      
      // Enrich with curriculum POS data
      if (window.ACTIVE_CURRICULUM?.vocab) {
        this.gameWords = this.gameWords.map(word => {
          const curriculumData = window.ACTIVE_CURRICULUM.vocab[word.id];
          if (curriculumData?.pos) {
            return { ...word, pos: curriculumData.pos };
          }
          return word;
        });
      }
    }
    
    // Fallback sample words
    if (this.gameWords.length === 0) {
      this.gameWords = [
        { en: 'run', pos: 'Verb', pos_uz: "Fe'l" },
        { en: 'beautiful', pos: 'Adjective', pos_uz: 'Sifat' },
        { en: 'yesterday', pos: 'Time', pos_uz: 'Vaqt' },
        { en: 'mosque', pos: 'Place', pos_uz: 'Joy' }
      ];
    }
  }

  /**
   * Create modal elements
   */
  createModal() {
    // Remove existing
    document.querySelector('.pos-game-modal-overlay')?.remove();
    
    this.overlay = document.createElement('div');
    this.overlay.className = 'pos-game-modal-overlay';
    
    this.modal = document.createElement('div');
    this.modal.className = 'pos-game-modal';
    
    this.overlay.appendChild(this.modal);
    document.body.appendChild(this.overlay);
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  /**
   * Render intro screen
   */
  renderIntro() {
    const s = this.strings;
    
    // Build category list from active categories
    const categoryItemsHTML = this.activeCategories.map(catValue => {
      const key = CATEGORY_TO_KEY[catValue];
      const catStrings = key ? s.categories[key] : null;
      const icon = catStrings?.icon || '⚪';
      const uz = catStrings?.uz || catValue;
      const en = catStrings?.en || catValue;
      return `<div class="pos-game-category-item">${icon} ${uz} (${en})</div>`;
    }).join('');

    this.modal.innerHTML = `
      <div class="pos-game-intro" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 16px;">⚡</div>
        <h2 class="tl-uz" style="font-size: 1.8rem; margin: 0 0 8px 0; color: #333;">
          ${s.title.uz}
        </h2>
        <p class="tl-uz" style="font-size: 0.95rem; color: #666; margin: 12px 0 24px 0;">
          ${s.instruction.uz}
        </p>
        
        <div class="pos-game-info-box">
          <div class="pos-game-info-title">
            ${uz('posGame.wordTypes')}
          </div>
          <div class="pos-game-category-grid">
            ${categoryItemsHTML}
          </div>
        </div>

        <button class="pos-game-ready-btn pos-game-btn mt-24">
          ${s.ready.uz}
        </button>
      </div>
    `;

    this.modal.querySelector('.pos-game-ready-btn').addEventListener('click', () => {
      this.gameState = 'playing';
      this.currentWordIndex = 0;
      this.renderPlaying();
    });
  }

  /**
   * Render playing screen
   */
  renderPlaying() {
    if (this.currentWordIndex >= this.gameWords.length) {
      this.gameState = 'results';
      this.renderResults();
      return;
    }

    const s = this.strings;
    const word = this.gameWords[this.currentWordIndex];
    
    // Build buttons from the active categories for this lesson
    const categories = this.activeCategories.map(catValue => {
      const key = CATEGORY_TO_KEY[catValue];
      const catStrings = key ? s.categories[key] : null;
      const icon = catStrings?.icon || '⚪';
      const uz = catStrings?.uz || catValue;
      return { name: `${icon} ${uz}`, value: catValue };
    });

    this.modal.innerHTML = `
      <div class="pos-game-playing">
        <div class="pos-game-header">
          <div class="pos-game-progress">
            ${this.currentWordIndex + 1} / ${this.gameWords.length}
          </div>
          <div class="pos-game-score">
            ${uz('posGame.score').replace('{score}', this.score)}
          </div>
        </div>

        <div class="pos-game-word-container">
          <div class="pos-game-word">
            ${word.en || word.word}
          </div>
          <div class="pos-game-timer-container">
            <div class="timer-progress pos-game-timer-progress"></div>
          </div>
          <div class="timer-text pos-game-timer-text">4s</div>
        </div>

        <div class="pos-game-category-buttons">
          ${categories.map(cat => `
            <button class="category-btn pos-game-category-btn" data-category="${cat.value}">
              ${cat.name}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.startTimer(word);
    
    // Event delegation for category buttons
    const categoryContainer = /** @type {HTMLElement|null} */ (this.modal.querySelector('.pos-game-category-buttons'));
    if (categoryContainer && !categoryContainer.dataset.delegated) {
      categoryContainer.dataset.delegated = 'true';
      categoryContainer.addEventListener('click', (e) => {
        const target = e.target instanceof HTMLElement ? e.target : null;
        const btn = target ? target.closest('.category-btn') : null;
        if (!(btn instanceof HTMLElement)) return;
        e.preventDefault();
        this.stopTimer();
        const currentWord = this.gameWords[this.currentWordIndex];
        const correct = getCategoryForWord(currentWord, this.posLookup);
        this.handleAnswer(btn.dataset.category || '', correct);
      });
    }
  }

  /**
   * Start the countdown timer
   * @param {Object} word - Current word
   */
  startTimer(word) {
    const timerBar = /** @type {HTMLElement|null} */ (this.modal.querySelector('.timer-progress'));
    const timerText = /** @type {HTMLElement|null} */ (this.modal.querySelector('.timer-text'));
    if (!timerBar || !timerText) {
      return;
    }
    const startTime = Date.now();
    const duration = 4000;
    let lastSecond = -1;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (remaining / duration) * 100;
      
      timerBar.style.width = `${percentage}%`;
      
      // Only update text when the displayed second changes (avoid layout thrash)
      const sec = Math.ceil(remaining / 1000);
      if (sec !== lastSecond) {
        timerText.textContent = `${sec}s`;
        lastSecond = sec;
      }

      if (remaining <= 0) {
        this.currentTimer = null;
        this.handleTimeout(word);
      } else {
        this.currentTimer = requestAnimationFrame(tick);
      }
    };

    this.currentTimer = requestAnimationFrame(tick);
  }

  /**
   * Stop the timer
   */
  stopTimer() {
    if (this.currentTimer) {
      cancelAnimationFrame(this.currentTimer);
      this.currentTimer = null;
    }
  }

  /**
   * Handle answer selection
   * @param {string} selected - Selected category
   * @param {string} correct - Correct category
   */
  handleAnswer(selected, correct) {
    const isCorrect = selected === correct;
    const s = this.strings;

    if (isCorrect) {
      this.score += 10;
      this.correctAnswers++;
    }

    this.showFeedback({
      type: isCorrect ? 'correct' : 'wrong',
      message: isCorrect ? s.feedback.correct.uz : s.feedback.wrong.uz,
      answer: correct,
      onRetry: isCorrect ? null : () => this.renderPlaying(),
      onNext: () => {
        this.currentWordIndex++;
        this.renderPlaying();
      }
    });
  }

  /**
   * Handle timeout
   * @param {Object} word - Current word
   */
  handleTimeout(word) {
    const s = this.strings;
    const correct = getCategoryForWord(word, this.posLookup);

    this.showFeedback({
      type: 'timeout',
      message: s.feedback.timeout.uz,
      answer: correct,
      onRetry: () => this.renderPlaying(),
      onNext: () => {
        this.currentWordIndex++;
        this.renderPlaying();
      }
    });
  }

  /**
   * Show feedback overlay
   * @param {Object} options - Feedback options
   */
  showFeedback({ type, message, answer, onRetry, onNext }) {
    const icons = { correct: '✓', wrong: '✗', timeout: '⏱' };

    const feedback = document.createElement('div');
    feedback.className = `pos-game-feedback pos-game-feedback--${type}`;

    feedback.innerHTML = `
      <div class="pos-game-feedback-icon">${icons[type]}</div>
      <div class="pos-game-feedback-message pos-game-feedback-message--${type}">${message}</div>
      ${type !== 'correct' ? `<div class="pos-game-feedback-answer">${uz('posGame.answer')} <strong>${answer}</strong></div>` : ''}
      <div class="pos-game-feedback-buttons">
        ${onRetry ? `<button data-action="retry" class="pos-game-feedback-btn pos-game-feedback-btn--primary">${uz('posGame.retry')}</button>` : ''}
        <button data-action="next" class="pos-game-feedback-btn ${onRetry ? 'pos-game-feedback-btn--secondary' : 'pos-game-feedback-btn--primary'}">
          ${onRetry ? uz('posGame.nextWord') : uz('posGame.continue')}
        </button>
      </div>
    `;

    document.body.appendChild(feedback);

    if (type === 'correct') {
      setTimeout(() => {
        feedback.remove();
        onNext();
      }, 1200);
      return;
    }

    feedback.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
      feedback.remove();
      onRetry();
    });

    feedback.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      feedback.remove();
      onNext();
    });
  }

  /**
   * Render results screen
   */
  renderResults() {
    const s = this.strings;
    const percentage = Math.round((this.correctAnswers / this.gameWords.length) * 100);
    const emoji = percentage === 100 ? '🏆' : percentage >= 75 ? '🎉' : percentage >= 50 ? '👍' : '💪';

    this.modal.innerHTML = `
      <div class="pos-game-results">
        <div class="pos-game-results-emoji">${emoji}</div>
        <h2 class="pos-game-results-title">${s.results.title.uz}</h2>
        
        <div class="pos-game-results-score-section">
          <div class="pos-game-results-label">${uz('posGame.yourScore')}</div>
          <div class="pos-game-results-score">${this.score}</div>
          <div class="pos-game-results-fraction">${this.correctAnswers} / ${this.gameWords.length}</div>
        </div>

        <div class="pos-game-results-summary">
          ${uz('posGame.percentCorrect').replace('{percent}', percentage)}
        </div>

        <button class="pos-game-close-btn pos-game-btn mt-24">
          ${uz('posGame.close')}
        </button>
      </div>
    `;

    this.modal.querySelector('.pos-game-close-btn').addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * Close the game modal
   */
  close() {
    this.stopTimer();
    this.overlay?.remove();
    
    // Refresh vocab grid if function exists
    if (window.refreshVocabGrid) {
      window.refreshVocabGrid();
    }
  }
}

// ============================
// PUBLIC API
// ============================

/**
 * Open POS Speed Game modal
 * @param {Object} lesson - Lesson object
 * @param {Object} [options] - Options
 */
export function openPOSSpeedGameModal(lesson, options = {}) {
  console.log('[POS Game] openPOSSpeedGameModal called with lesson:', lesson?.lesson_id);
  
  const game = new POSSpeedGame(lesson, options);
  game.start();
  
  return game;
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.openPOSSpeedGameModal = openPOSSpeedGameModal;
  window.mapPosToCategory = mapPosToCategory;
  window.getCategoryForWord = getCategoryForWord;
  
  window.POSSpeedGame = {
    open: openPOSSpeedGameModal,
    mapPosToCategory,
    heuristicCategory,
    getCategoryForWord,
    buildPosLookupFromLesson,
  };
}
