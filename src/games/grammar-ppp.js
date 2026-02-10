/**
 * Grammar PPP (Present-Practice-Produce) Modal
 * =============================================
 * Interactive grammar lesson using the PPP methodology.
 * 
 * Features:
 * - Pattern Hunting (inductive discovery)
 * - CCQ (Concept Checking Questions)
 * - Timeline visualization
 * - Drag-drop exercises
 * - Fill-in-the-blank practice
 * - Free production activities
 * 
 * @module src/games/grammar-ppp
 * @version 2.0.0 (Phase 2 Refactor)
 */

// ============================
// HELPER FUNCTIONS
// ============================

/**
 * Parse example with translation
 * Format: "English sentence. (Uzbek translation)" or just "English sentence"
 * @param {string} example - Example string
 * @returns {{en: string, uz: string}} Parsed example
 */
function parseExampleWithTranslation(example) {
  const match = example.match(/^(.+?)\s*\(([^)]+)\)$/);
  if (match) {
    return { en: match[1].trim(), uz: match[2].trim() };
  }
  return { en: example, uz: '' };
}

/**
 * Detect grammar type from data
 * @param {Object} grammarData - Grammar data object
 * @returns {string} Grammar type identifier
 */
function detectGrammarType(grammarData) {
  const title = (grammarData.title || grammarData.title_en || '').toLowerCase();
  const targets = (grammarData.target_words || []).join(' ').toLowerCase();
  
  if (title.includes('to be') || (targets.includes('am') && targets.includes('is') && targets.includes('are'))) {
    return 'to_be';
  }
  if (title.includes('present continuous') || title.includes('davom') || targets.includes('ing')) {
    return 'present_continuous';
  }
  if (title.includes('present simple') || title.includes('oddiy')) {
    return 'present_simple';
  }
  if (title.includes('frequency') || title.includes('always') || title.includes('usually')) {
    return 'frequency_adverbs';
  }
  if (title.includes('have') || title.includes('has')) {
    return 'have_has';
  }
  if (title.includes('can')) {
    return 'can_ability';
  }
  if (title.includes('past') || title.includes('was') || title.includes('were')) {
    return 'past_simple';
  }
  if (title.includes('there is') || title.includes('there are')) {
    return 'there_is_are';
  }
  if (title.includes('going to')) {
    return 'going_to';
  }
  return 'generic';
}

/**
 * Build grammar visual based on type
 * @param {string} grammarType - Grammar type identifier
 * @param {Object} grammarData - Grammar data object
 * @returns {string} HTML for visual
 */
function buildGrammarVisual(grammarType, grammarData) {
  switch (grammarType) {
    case 'to_be':
      return `
        <div class="grammar-visual to-be-visual">
          <div class="visual-title">🎯 TO BE (bo'lmoq)</div>
          <div class="conjugation-grid">
            <div class="conj-row header">
              <div class="conj-cell">Subject</div>
              <div class="conj-cell">Verb</div>
              <div class="conj-cell">Example</div>
            </div>
            <div class="conj-row animate-row" style="--delay: 0.1s">
              <div class="conj-cell subject">I</div>
              <div class="conj-cell verb highlight-verb">am</div>
              <div class="conj-cell example">I am a student</div>
            </div>
            <div class="conj-row animate-row" style="--delay: 0.2s">
              <div class="conj-cell subject">He / She / It</div>
              <div class="conj-cell verb highlight-verb">is</div>
              <div class="conj-cell example">He is happy</div>
            </div>
            <div class="conj-row animate-row" style="--delay: 0.3s">
              <div class="conj-cell subject">You / We / They</div>
              <div class="conj-cell verb highlight-verb">are</div>
              <div class="conj-cell example">They are friends</div>
            </div>
          </div>
        </div>`;
    
    case 'present_continuous':
      return `
        <div class="grammar-visual present-continuous-visual">
          <div class="visual-title">🔄 PRESENT CONTINUOUS (Hozirgi davom)</div>
          <div class="formula-box">
            <span class="formula-part subject">Subject</span>
            <span class="formula-operator">+</span>
            <span class="formula-part verb">am/is/are</span>
            <span class="formula-operator">+</span>
            <span class="formula-part ending">verb<span class="highlight-ending">-ing</span></span>
          </div>
          <div class="time-markers">
            <span class="time-chip active">now</span>
            <span class="time-chip active">right now</span>
            <span class="time-chip active">at the moment</span>
            <span class="time-chip">today</span>
            <span class="time-chip">this week</span>
          </div>
          <div class="example-animation">
            <div class="action-icon">📖</div>
            <div class="speech-bubble">I am reading <span class="now-indicator">now</span></div>
          </div>
        </div>`;
    
    case 'present_simple':
      return `
        <div class="grammar-visual present-simple-visual">
          <div class="visual-title">📅 PRESENT SIMPLE (Hozirgi oddiy)</div>
          <div class="dual-box">
            <div class="box-section">
              <div class="box-header">I / You / We / They</div>
              <div class="box-formula">verb (o'zgarmaydi)</div>
              <div class="box-example">I <span class="highlight-verb">wake</span> up at 7</div>
            </div>
            <div class="box-divider">VS</div>
            <div class="box-section">
              <div class="box-header">He / She / It</div>
              <div class="box-formula">verb + <span class="highlight-ending">s</span></div>
              <div class="box-example">She <span class="highlight-verb">wakes</span> up at 6</div>
            </div>
          </div>
          <div class="time-markers">
            <span class="time-chip">every day</span>
            <span class="time-chip">always</span>
            <span class="time-chip">usually</span>
            <span class="time-chip">in the morning</span>
          </div>
        </div>`;
    
    case 'frequency_adverbs':
      return `
        <div class="grammar-visual frequency-visual">
          <div class="visual-title">📊 FREQUENCY ADVERBS (Tezlik so'zlari)</div>
          <div class="frequency-scale">
            <div class="freq-bar" style="--percent: 100%">
              <span class="freq-label">always</span>
              <span class="freq-uz">har doim</span>
              <div class="freq-fill"></div>
            </div>
            <div class="freq-bar" style="--percent: 80%">
              <span class="freq-label">usually</span>
              <span class="freq-uz">odatda</span>
              <div class="freq-fill"></div>
            </div>
            <div class="freq-bar" style="--percent: 60%">
              <span class="freq-label">often</span>
              <span class="freq-uz">tez-tez</span>
              <div class="freq-fill"></div>
            </div>
            <div class="freq-bar" style="--percent: 40%">
              <span class="freq-label">sometimes</span>
              <span class="freq-uz">ba'zan</span>
              <div class="freq-fill"></div>
            </div>
            <div class="freq-bar" style="--percent: 0%">
              <span class="freq-label">never</span>
              <span class="freq-uz">hech qachon</span>
              <div class="freq-fill"></div>
            </div>
          </div>
          <div class="position-note">
            <strong>Joyi:</strong> Subject + <span class="highlight-adv">adverb</span> + verb
          </div>
        </div>`;
    
    default:
      return `
        <div class="grammar-visual generic-visual">
          <div class="visual-title">🎓 Key Pattern / Asosiy namuna</div>
          <div class="target-words-display">
            ${(grammarData.target_words || []).map(word => 
              `<span class="target-word-chip">${word}</span>`
            ).join('')}
          </div>
        </div>`;
  }
}

/**
 * Build quick check questions based on grammar type
 * @param {string} grammarType - Grammar type identifier
 * @param {Object} grammarData - Grammar data object
 * @returns {string} HTML for questions
 */
function buildQuickCheckQuestions(grammarType, grammarData) {
  const questions = [];
  
  switch (grammarType) {
    case 'to_be':
      questions.push(
        { q: '"I" bilan qaysi fe\'l ishlatiladi?', options: ['am', 'is', 'are'], correct: 0 },
        { q: '"She" bilan qaysi fe\'l ishlatiladi?', options: ['am', 'is', 'are'], correct: 1 }
      );
      break;
    case 'present_continuous':
      questions.push(
        { q: 'Present Continuous qachon ishlatiladi?', options: ['Har doim', 'Hozir', 'Kecha'], correct: 1 },
        { q: 'Fe\'lga qanday qo\'shimcha qo\'shiladi?', options: ['-s', '-ed', '-ing'], correct: 2 }
      );
      break;
    case 'present_simple':
      questions.push(
        { q: '"He" bilan fe\'lga nima qo\'shiladi?', options: ['-ing', '-s', '-ed'], correct: 1 },
        { q: 'Present Simple qachon ishlatiladi?', options: ['Hozir', 'Odatda', 'Kecha'], correct: 1 }
      );
      break;
    default:
      questions.push(
        { q: 'Bu grammatika qoidasini tushundingizmi?', options: ['Ha', 'Yana ko\'rishim kerak'], correct: 0 }
      );
  }
  
  return questions.slice(0, 2).map((q, idx) => `
    <div class="quick-question" data-idx="${idx}">
      <p class="question-text">${q.q}</p>
      <div class="question-options">
        ${q.options.map((opt, optIdx) => `
          <button class="quick-option" data-correct="${optIdx === q.correct}" data-qidx="${idx}">${opt}</button>
        `).join('')}
      </div>
      <div class="question-feedback" data-idx="${idx}"></div>
    </div>
  `).join('');
}

// ============================
// MAIN MODAL CLASS
// ============================

/**
 * Grammar PPP Modal instance
 */
class GrammarPPPModal {
  constructor(grammarData, lesson) {
    this.grammarData = grammarData;
    this.lesson = lesson;
    this.overlay = null;
    
    // Modal state
    this.currentPhase = 'present'; // 'present', 'practice', 'produce'
    this.currentStep = 0;
    this.score = 0;
    this.attempts = 0;
    this.discoveredPatterns = 0;
    this.practiceCompleted = 0;
    this.productionCompleted = 0;
    
    // Interactive state
    this.interactiveState = {
      animationsEnabled: true,
      soundsEnabled: true,
      showHints: true,
      streakCount: 0,
      maxStreak: 0
    };
    
    // Target words for highlighting
    this.targetWords = grammarData.target_words || ['am', 'is', 'are'];
    this.targetWordsRegex = new RegExp('\\b(' + this.targetWords.join('|') + ')\\b', 'gi');
    
    // Grammar type detection
    this.grammarType = detectGrammarType(grammarData);
    this.visualComponent = buildGrammarVisual(this.grammarType, grammarData);
    
    // Build PPP data structure
    this.pppData = this.buildPPPData();
  }

  /**
   * Build PPP structure from grammar data
   */
  buildPPPData() {
    const grammarData = this.grammarData;
    
    // Convert practice_items to fill_blank format
    const practiceItems = grammarData.practice_items || [];
    const fillBlankSentences = practiceItems.map(item => ({
      text: item.prompt || '',
      correct: item.answer || '',
      hint: item.hint || '',
      uz: item.hint ? `Maslahat: ${item.hint}` : ''
    }));

    // Production prompts from data
    let productionPrompts = grammarData.production_prompts || [];
    productionPrompts = productionPrompts.map(p => {
      if (typeof p === 'string') return { prompt_uz: p, prompt_en: p };
      return p;
    });
    if (productionPrompts.length === 0) {
      productionPrompts = [
        { prompt_uz: 'O\'zingizning gaplaringizni yarating', prompt_en: 'Create sentences using the grammar pattern' },
        { prompt_uz: 'Namuna asosida mashq qiling', prompt_en: 'Practice the pattern with your own examples' }
      ];
    }

    return {
      present: {
        title: '🎯 PRESENT',
        titleUz: '🎯 TAQDIM',
        subtitle: 'Discover the Pattern',
        subtitleUz: 'Namunani kashf eting',
        steps: [
          {
            type: 'inductive',
            title: 'Pattern Discovery',
            titleUz: 'Namuna kashfiyoti',
            content: 'Look at these examples. What do you notice?',
            contentUz: 'Ushbu misollarga qarang. Nima sezasiz?',
            examples: grammarData.examples || ['Example 1', 'Example 2', 'Example 3']
          },
          {
            type: 'explanation',
            title: grammarData.title_en || 'The Rule',
            titleUz: grammarData.title || 'Qoida',
            content: grammarData.overview_en || grammarData.overview || 'Grammar explanation',
            contentUz: grammarData.overview || 'Grammatika tushuntirishi',
            points: grammarData.points || []
          }
        ]
      },
      practice: {
        title: '🎮 PRACTICE',
        titleUz: '🎮 MASHQ',
        subtitle: 'Controlled Practice',
        subtitleUz: 'Boshqarilgan mashq',
        exercises: [
          {
            type: 'fill_blank',
            title: 'Complete the sentences',
            titleUz: 'Gaplarni to\'ldiring',
            sentences: fillBlankSentences.length > 0 ? fillBlankSentences : [
              { text: 'Example: I ___ here.', correct: 'am', hint: 'I bilan' }
            ]
          }
        ]
      },
      produce: {
        title: '🚀 PRODUCE',
        titleUz: '🚀 ISHLAB CHIQARISH',
        subtitle: 'Free Production',
        subtitleUz: 'Erkin ishlab chiqarish',
        activities: [
          {
            type: 'guided_production',
            title: 'Create Your Own',
            titleUz: 'O\'zingiz yarating',
            prompts: productionPrompts
          }
        ]
      }
    };
  }

  /**
   * Open the modal
   */
  open() {
    // Remove existing modal
    document.querySelector('.grammar-modal-overlay')?.remove();
    
    this.createModal();
    this.attachEventListeners();
    
    // Initialize with animation
    setTimeout(() => {
      this.overlay.classList.add('active');
      this.renderCurrentPhase();
    }, 50);
  }

  /**
   * Create modal DOM
   */
  createModal() {
    const grammarData = this.grammarData;
    const pppData = this.pppData;
    
    this.overlay = document.createElement('div');
    this.overlay.className = 'grammar-modal-overlay';
    
    this.overlay.innerHTML = `
      <div class="grammar-modal">
        <div class="grammar-modal-header">
          <div class="grammar-modal-title">
            <h2 class="grammar-title-en">${pppData.present.title} - ${grammarData.title || 'Grammar'}</h2>
            <h3 class="grammar-title-uz">${pppData.present.titleUz} - ${grammarData.title_uz || 'Grammatika'}</h3>
          </div>
          <div class="grammar-modal-controls">
            <div class="grammar-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
              </div>
              <div class="progress-text">0/3</div>
            </div>
            <button class="grammar-modal-close" title="Yopish">✕</button>
          </div>
        </div>

        <div class="grammar-modal-content">
          <div class="grammar-phase-nav">
            <button class="phase-btn" data-phase="present">
              <span class="phase-icon">🎯</span>
              <span class="phase-text">Present</span>
              <span class="phase-text-uz">Taqdim</span>
            </button>
            <button class="phase-btn" data-phase="practice">
              <span class="phase-icon">🎮</span>
              <span class="phase-text">Practice</span>
              <span class="phase-text-uz">Mashq</span>
            </button>
            <button class="phase-btn" data-phase="produce">
              <span class="phase-icon">🚀</span>
              <span class="phase-text">Produce</span>
              <span class="phase-text-uz">Ishlab chiqarish</span>
            </button>
          </div>

          <div class="grammar-content-area">
            <!-- Dynamic content will be inserted here -->
          </div>

          <div class="grammar-actions">
            <button class="grammar-btn-prev" disabled>⬅ Previous</button>
            <div class="grammar-score">Score: <span class="score-value">0</span> ⭐</div>
            <button class="grammar-btn-next">Next ➡</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    
    // Cache strongly typed DOM references to satisfy checkJs
    const modal = this.overlay.querySelector('.grammar-modal');
    const contentArea = this.overlay.querySelector('.grammar-content-area');
    const progressFill = this.overlay.querySelector('.progress-fill');
    const progressText = this.overlay.querySelector('.progress-text');
    const scoreValue = this.overlay.querySelector('.score-value');
    const prevBtn = this.overlay.querySelector('.grammar-btn-prev');
    const nextBtn = this.overlay.querySelector('.grammar-btn-next');

    if (!(modal instanceof HTMLElement) || !(contentArea instanceof HTMLElement) ||
        !(progressFill instanceof HTMLElement) || !(progressText instanceof HTMLElement) ||
        !(scoreValue instanceof HTMLElement) || !(prevBtn instanceof HTMLButtonElement) ||
        !(nextBtn instanceof HTMLButtonElement)) {
      throw new Error('Grammar PPP modal is missing required elements.');
    }

    this.modal = modal;
    this.contentArea = contentArea;
    this.progressFill = progressFill;
    this.progressText = progressText;
    this.scoreValue = scoreValue;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.phaseBtns = Array.from(this.overlay.querySelectorAll('.phase-btn')).map(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        throw new Error('Phase navigation button missing.');
      }
      return btn;
    });
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    this.overlay.querySelector('.grammar-modal-close').addEventListener('click', () => {
      this.close();
    });

    // Overlay click to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Phase navigation buttons - event delegation
    const phaseNav = this.overlay.querySelector('.grammar-phase-nav');
    if (phaseNav) {
      phaseNav.addEventListener('click', (e) => {
        const btn = /** @type {HTMLElement|null} */ ((/** @type {HTMLElement} */ (e.target)).closest('.phase-btn'));
        if (!btn) return;
        this.currentPhase = btn.dataset.phase;
        this.renderCurrentPhase();
      });
    }

    // Previous button
    this.prevBtn.addEventListener('click', () => {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.renderCurrentPhase();
      }
    });

    // Next button
    this.nextBtn.addEventListener('click', () => {
      this.handleNext();
    });
  }

  /**
   * Handle next button click
   */
  handleNext() {
    const phaseData = this.pppData[this.currentPhase];
    const maxSteps = this.currentPhase === 'present' ? phaseData.steps.length :
                     this.currentPhase === 'practice' ? phaseData.exercises.length :
                     phaseData.activities.length;

    if (this.currentStep < maxSteps - 1) {
      this.currentStep++;
      this.renderCurrentPhase();
    } else {
      // Phase complete
      if (this.currentPhase === 'present') {
        this.currentPhase = 'practice';
      } else if (this.currentPhase === 'practice') {
        this.currentPhase = 'produce';
      } else {
        // All phases complete!
        this.renderCompletion();
        return;
      }
      this.renderCurrentPhase();
    }
  }

  /**
   * Update score display
   */
  updateScore(points) {
    this.score += points;
    this.scoreValue.textContent = String(this.score);
    this.scoreValue.style.animation = 'scorePulse 0.5s ease';
    setTimeout(() => {
      this.scoreValue.style.animation = '';
    }, 500);
  }

  /**
   * Update progress bar
   */
  updateProgress() {
    const phases = ['present', 'practice', 'produce'];
    const currentIndex = phases.indexOf(this.currentPhase);
    const progress = ((currentIndex + 1) / phases.length) * 100;
    this.progressFill.style.width = progress + '%';
    this.progressText.textContent = (currentIndex + 1) + '/' + phases.length;
  }

  /**
   * Update navigation buttons
   */
  updateNavigation() {
    const phaseData = this.pppData[this.currentPhase];
    const maxSteps = this.currentPhase === 'present' ? phaseData.steps.length :
                     this.currentPhase === 'practice' ? phaseData.exercises.length :
                     phaseData.activities.length;

    this.prevBtn.disabled = this.currentStep === 0;
    this.nextBtn.textContent = this.currentStep === maxSteps - 1 ? 'Complete ✅' : 'Next ➡';

    // Update phase button active states
    this.phaseBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.phase === this.currentPhase);
    });
  }

  /**
   * Render current phase
   */
  renderCurrentPhase() {
    this.currentStep = 0; // Reset step when changing phases

    if (this.currentPhase === 'present') {
      this.renderPresentPhase();
    } else if (this.currentPhase === 'practice') {
      this.renderPracticePhase();
    } else if (this.currentPhase === 'produce') {
      this.renderProducePhase();
    }

    this.updateProgress();
    this.updateNavigation();
  }

  /**
   * Render Present phase
   */
  renderPresentPhase() {
    const phaseData = this.pppData.present;
    const stepData = phaseData.steps[this.currentStep];
    const grammarData = this.grammarData;
    const grammarType = this.grammarType;
    const visualComponent = this.visualComponent;

    this.contentArea.innerHTML = `
      <div class="grammar-present-phase interactive">
        <div class="phase-header">
          <h3 class="phase-title-en">${stepData.title}</h3>
          <h4 class="phase-title-uz">${stepData.titleUz}</h4>
        </div>

        <div class="phase-content">
          ${stepData.type === 'inductive' ? this.renderPatternHunting(stepData) : ''}
          ${stepData.type === 'explanation' ? this.renderExplanation(stepData, grammarData, grammarType, visualComponent) : ''}
        </div>
      </div>
    `;

    // Attach phase-specific event listeners
    if (stepData.type === 'inductive') {
      this.attachPatternHuntingListeners(stepData);
    }
    if (stepData.type === 'explanation') {
      this.attachExplanationListeners();
    }
  }

  /**
   * Render pattern hunting HTML
   */
  renderPatternHunting(stepData) {
    const targetWords = this.targetWords;
    
    return `
      <div class="pattern-hunting-game">
        <div class="hunting-instructions">
          <div class="instruction-card main-instruction">
            <span class="instruction-icon">🎯</span>
            <p class="instruction-text tl-uz" data-translation="Click the word that shows the action!">Harakatni ko'rsatadigan so'zni bosing!</p>
          </div>
        </div>
        
        <div class="hunt-examples-container">
          ${stepData.examples.map((example, idx) => {
            const parsed = parseExampleWithTranslation(example);
            const words = parsed.en.split(/\s+/);
            const wordsHtml = words.map((word, wIdx) => {
              const cleanWord = word.replace(/[.,!?]/g, '');
              const isTarget = targetWords.some(tw => cleanWord.toLowerCase() === tw.toLowerCase());
              const punctuation = word.match(/[.,!?]$/) ? word.match(/[.,!?]$/)[0] : '';
              return `<span class="hunt-word ${isTarget ? 'is-target' : ''}" data-word="${cleanWord}" data-idx="${wIdx}">${cleanWord}</span>${punctuation ? `<span class="punctuation">${punctuation}</span>` : ''}`;
            }).join(' ');
            return `
            <div class="hunt-example-card" data-idx="${idx}" data-found="false" style="animation-delay: ${idx * 0.15}s">
              <div class="hunt-example-left">
                <span class="hunt-example-number">${idx + 1}</span>
                <div class="hunt-audio-btn" data-text="${parsed.en}" title="Tinglash">🔊</div>
              </div>
              <div class="hunt-example-center">
                <div class="hunt-sentence" data-original="${parsed.en}">${wordsHtml}</div>
                ${parsed.uz ? `<span class="hunt-translation">${parsed.uz}</span>` : ''}
              </div>
              <div class="hunt-example-status">
                <span class="hunt-status-icon">❓</span>
              </div>
            </div>
          `}).join('')}
        </div>
        
        <div class="hunting-progress">
          <div class="hunting-progress-bar">
            <div class="hunting-progress-fill" style="width: 0%"></div>
          </div>
          <span class="hunting-progress-text">0 / ${stepData.examples.length} topildi</span>
        </div>
        
        <div class="pattern-reveal" style="display: none;">
          <div class="pattern-reveal-header">
            <span class="reveal-icon">✨</span>
            <h4 class="tl-uz" data-translation="You found the pattern!">Siz namunani topdingiz!</h4>
          </div>
          <div class="pattern-summary">
            ${this.visualComponent}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render explanation HTML
   */
  renderExplanation(stepData, grammarData, grammarType, visualComponent) {
    const firstExample = (grammarData.examples && grammarData.examples[0]) 
      ? parseExampleWithTranslation(grammarData.examples[0]).en 
      : 'I am reading.';

    return `
      <!-- CCQ Section -->
      <div class="ccq-section" id="ccq-container">
        <div class="ccq-card">
          <div class="ccq-sentence">
            <p class="ccq-example">"${firstExample}"</p>
          </div>
          <div class="ccq-question">
            <p class="ccq-text tl-uz" data-translation="Is this happening NOW or EVERY DAY?">Bu HOZIR sodir bo'lyaptimi yoki HAR KUNI?</p>
          </div>
          <div class="ccq-options">
            <button class="ccq-option" data-answer="now" data-correct="true">
              <span class="ccq-icon">⏰</span>
              <span class="ccq-label">Hozir</span>
            </button>
            <button class="ccq-option" data-answer="everyday" data-correct="false">
              <span class="ccq-icon">📅</span>
              <span class="ccq-label">Har kuni</span>
            </button>
          </div>
          <div class="ccq-feedback" style="display: none;"></div>
        </div>
      </div>
      
      <!-- Timeline Section -->
      <div class="timeline-section" id="timeline-container" style="display: none;">
        <div class="timeline-header">
          <h4 class="tl-uz" data-translation="When does this happen?">Bu qachon sodir bo'ladi?</h4>
          <p class="timeline-instruction tl-uz" data-translation="Drag the marker to show when the action happens">Harakatning qachon sodir bo'lishini ko'rsatish uchun belgini suring</p>
        </div>
        <div class="timeline-visual">
          <div class="timeline-track">
            <div class="timeline-point past" data-time="past">
              <span class="point-label">O'tgan</span>
              <span class="point-sublabel">Past</span>
            </div>
            <div class="timeline-point present" data-time="present">
              <span class="point-label">HOZIR</span>
              <span class="point-sublabel">NOW</span>
              <span class="point-indicator">★</span>
            </div>
            <div class="timeline-point future" data-time="future">
              <span class="point-label">Kelajak</span>
              <span class="point-sublabel">Future</span>
            </div>
          </div>
          <div class="timeline-handle" id="timeline-handle" draggable="true">
            <span class="handle-icon">👆</span>
          </div>
        </div>
        <div class="timeline-sentence-display">
          <p class="timeline-example">"${firstExample}"</p>
        </div>
        <div class="timeline-feedback" id="timeline-feedback" style="display: none;">
          <span class="timeline-success">🎉 To'g'ri! Bu hozir sodir bo'lyapti!</span>
        </div>
      </div>
      
      <!-- Rule Explanation -->
      <div class="rule-explanation interactive" id="rule-explanation-container" style="display: none;">
        <div class="explanation-intro">
          <p class="phase-description-en">${stepData.content}</p>
          <p class="phase-description-uz">${stepData.contentUz}</p>
        </div>
        
        <div class="rule-cards">
          ${stepData.points.map((point, idx) => {
            const parsed = parseExampleWithTranslation(point);
            return `
            <div class="rule-card" style="animation-delay: ${idx * 0.1}s">
              <div class="rule-number">${idx + 1}</div>
              <div class="rule-content tl-uz" data-translation="${parsed.uz || parsed.en}">${parsed.en || point}</div>
              <button class="rule-audio-btn" data-text="${parsed.en || point}" title="Tinglash">🔊</button>
            </div>
          `}).join('')}
        </div>
        
        <div class="grammar-visual-container">
          ${visualComponent}
        </div>
        
        <div class="quick-check">
          <h4 class="tl-uz" data-translation="Quick Understanding Check">Tezkor tushunish tekshiruvi</h4>
          <div class="quick-check-questions">
            ${buildQuickCheckQuestions(grammarType, grammarData)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach pattern hunting event listeners
   */
  attachPatternHuntingListeners(stepData) {
    const overlay = this.overlay;
    if (!overlay) return;
    let foundCount = 0;
    const totalExamples = stepData.examples.length;
    
    overlay.querySelectorAll('.hunt-word').forEach(wordSpan => {
      if (!(wordSpan instanceof HTMLElement)) {
        return;
      }
      wordSpan.addEventListener('click', (e) => {
        const word = e.currentTarget;
        if (!(word instanceof HTMLElement)) {
          return;
        }
        const card = word.closest('.hunt-example-card');
        if (!(card instanceof HTMLElement)) {
          return;
        }
        const isTarget = word.classList.contains('is-target');
        const alreadyFound = card.dataset.found === 'true';
        
        if (alreadyFound) return;
        
        if (isTarget) {
          word.classList.add('found-correct');
          card.querySelectorAll('.hunt-word.is-target').forEach(tw => {
            if (tw instanceof HTMLElement) {
              tw.classList.add('verb-highlight', 'animated-highlight');
            }
          });
          card.dataset.found = 'true';
          card.classList.add('completed');
          const statusIcon = card.querySelector('.hunt-status-icon');
          if (statusIcon instanceof HTMLElement) {
            statusIcon.textContent = '✅';
          }
          
          foundCount++;
          this.updateScore(10);
          if (typeof window.playSound === 'function') window.playSound('correct');
          
          const progressFill = overlay.querySelector('.hunting-progress-fill');
          const progressText = overlay.querySelector('.hunting-progress-text');
          if (progressFill instanceof HTMLElement) {
            progressFill.style.width = ((foundCount / totalExamples) * 100) + '%';
          }
          if (progressText instanceof HTMLElement) {
            progressText.textContent = `${foundCount} / ${totalExamples} topildi`;
          }
          
          if (foundCount >= totalExamples) {
            setTimeout(() => {
              const patternReveal = overlay.querySelector('.pattern-reveal');
              if (patternReveal instanceof HTMLElement) {
                patternReveal.style.display = 'block';
                patternReveal.classList.add('revealed');
                this.updateScore(20);
                if (typeof window.playSound === 'function') window.playSound('levelup');
              }
            }, 500);
          }
        } else {
          word.classList.add('shake-wrong');
          setTimeout(() => word.classList.remove('shake-wrong'), 500);
          if (typeof window.playSound === 'function') window.playSound('wrong');
        }
      });
    });
    
    overlay.querySelectorAll('.hunt-audio-btn').forEach(btn => {
      if (!(btn instanceof HTMLElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        const text = target.dataset.text;
        if (typeof window.speakText === 'function' && text) {
          window.speakText(text);
          target.classList.add('playing');
          setTimeout(() => target.classList.remove('playing'), 1000);
        }
      });
    });
  }

  /**
   * Attach explanation event listeners
   */
  attachExplanationListeners() {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    
    // CCQ handlers
    overlay.querySelectorAll('.ccq-option').forEach(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const optionButton = e.currentTarget;
        if (!(optionButton instanceof HTMLButtonElement)) {
          return;
        }
        const isCorrect = optionButton.dataset.correct === 'true';
        const ccqContainer = overlay.querySelector('#ccq-container');
        const timelineContainer = overlay.querySelector('#timeline-container');
        const ruleContainer = overlay.querySelector('#rule-explanation-container');
        const feedbackEl = overlay.querySelector('.ccq-feedback');
        if (!(ccqContainer instanceof HTMLElement) || !(feedbackEl instanceof HTMLElement)) {
          return;
        }
        
        overlay.querySelectorAll('.ccq-option').forEach(opt => {
          if (opt instanceof HTMLButtonElement) {
            opt.disabled = true;
          }
        });
        
        if (isCorrect) {
          optionButton.classList.add('ccq-correct');
          feedbackEl.innerHTML = '<span class="ccq-success">🎉 To\'g\'ri! Keling, vaqt chizig\'ida ko\'ring...</span>';
          feedbackEl.style.display = 'block';
          self.updateScore(15);
          if (typeof window.playSound === 'function') window.playSound('correct');
          
          setTimeout(() => {
            ccqContainer.classList.add('ccq-answered');
            if (timelineContainer instanceof HTMLElement) {
              timelineContainer.style.display = 'block';
              timelineContainer.classList.add('fade-in');
              self.initializeTimeline(ruleContainer);
            } else if (ruleContainer instanceof HTMLElement) {
              ruleContainer.style.display = 'block';
              ruleContainer.classList.add('fade-in');
            }
          }, 1200);
        } else {
          optionButton.classList.add('ccq-wrong');
          feedbackEl.innerHTML = '<span class="ccq-hint">🤔 Yana o\'ylab ko\'ring... "-ing" qo\'shimchasi nimani bildiradi?</span>';
          feedbackEl.style.display = 'block';
          if (typeof window.playSound === 'function') window.playSound('wrong');
          
          setTimeout(() => {
            overlay.querySelectorAll('.ccq-option').forEach(opt => {
              if (opt instanceof HTMLButtonElement) {
                opt.disabled = false;
                opt.classList.remove('ccq-wrong');
              }
            });
            feedbackEl.style.display = 'none';
          }, 2000);
        }
      });
    });
    
    // Quick check handlers
    overlay.querySelectorAll('.quick-option').forEach(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const optionBtn = e.currentTarget;
        if (!(optionBtn instanceof HTMLButtonElement)) {
          return;
        }
        const isCorrect = optionBtn.dataset.correct === 'true';
        const questionEl = optionBtn.closest('.quick-question');
        if (!(questionEl instanceof HTMLElement)) {
          return;
        }
        const feedbackEl = questionEl.querySelector('.question-feedback');
        if (!(feedbackEl instanceof HTMLElement)) {
          return;
        }
        
        questionEl.querySelectorAll('.quick-option').forEach(opt => {
          if (opt instanceof HTMLButtonElement) {
            opt.disabled = true;
            if (opt.dataset.correct === 'true') {
              opt.classList.add('correct');
            }
          }
        });
        
        if (isCorrect) {
          optionBtn.classList.add('selected-correct');
          feedbackEl.innerHTML = '<span class="feedback-correct">✅ To\'g\'ri!</span>';
          self.updateScore(15);
          self.interactiveState.streakCount++;
          if (typeof window.playSound === 'function') window.playSound('correct');
        } else {
          optionBtn.classList.add('selected-wrong');
          feedbackEl.innerHTML = '<span class="feedback-wrong">❌ Qaytadan o\'ylab ko\'ring</span>';
          self.interactiveState.streakCount = 0;
        }
      });
    });
    
    // Rule audio handlers
    overlay.querySelectorAll('.rule-audio-btn').forEach(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        if (!(target instanceof HTMLButtonElement)) {
          return;
        }
        const text = target.dataset.text;
        if (typeof window.speakText === 'function' && text) {
          window.speakText(text);
        }
      });
    });
  }

  /**
   * Initialize timeline slider
   */
  initializeTimeline(ruleContainer) {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    const timelinePoints = Array.from(overlay.querySelectorAll('.timeline-point')).map(point => {
      if (!(point instanceof HTMLElement)) {
        throw new Error('Timeline point missing');
      }
      return point;
    });
    const handleEl = overlay.querySelector('#timeline-handle');
    const feedbackEl = overlay.querySelector('#timeline-feedback');
    const handle = handleEl instanceof HTMLElement ? handleEl : null;
    const feedback = feedbackEl instanceof HTMLElement ? feedbackEl : null;
    const ruleTarget = ruleContainer instanceof HTMLElement ? ruleContainer : null;
    
    timelinePoints.forEach(point => {
      point.addEventListener('click', () => {
        const time = point.dataset.time;
        
        timelinePoints.forEach(p => p.classList.remove('selected'));
        point.classList.add('selected');
        
        if (handle) {
          handle.style.left = point.offsetLeft + (point.offsetWidth / 2) - 20 + 'px';
          handle.classList.add('placed');
        }
        
        if (typeof window.playSound === 'function') window.playSound('pop');
        
        if (time === 'present') {
          point.classList.add('correct-time');
          if (feedback) {
            feedback.style.display = 'block';
            feedback.classList.add('fade-in');
          }
          self.updateScore(20);
          if (typeof window.playSound === 'function') window.playSound('levelup');
          
          setTimeout(() => {
            if (ruleTarget) {
              ruleTarget.style.display = 'block';
              ruleTarget.classList.add('fade-in');
            }
          }, 1500);
        } else {
          point.classList.add('wrong-time');
          setTimeout(() => point.classList.remove('wrong-time'), 1000);
          if (typeof window.playSound === 'function') window.playSound('wrong');
        }
      });
    });
    
    // Touch support for handle
    if (handle) {
      let isDragging = false;
      
      handle.addEventListener('touchstart', () => {
        isDragging = true;
        handle.classList.add('dragging');
      });
      
      handle.addEventListener('touchmove', /** @param {TouchEvent} e */ (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const track = overlay.querySelector('.timeline-track');
        if (track instanceof HTMLElement) {
          const rect = track.getBoundingClientRect();
          let x = touch.clientX - rect.left - 20;
          x = Math.max(0, Math.min(x, rect.width - 40));
          handle.style.left = x + 'px';
        }
      });
      
      handle.addEventListener('touchend', () => {
        isDragging = false;
        handle.classList.remove('dragging');
        const handleRect = handle.getBoundingClientRect();
        const handleCenter = handleRect.left + handleRect.width / 2;
        /** @type {HTMLElement|null} */
        let closestPoint = null;
        let closestDist = Infinity;
        
        timelinePoints.forEach(point => {
          const pointRect = point.getBoundingClientRect();
          const pointCenter = pointRect.left + pointRect.width / 2;
          const dist = Math.abs(handleCenter - pointCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestPoint = point;
          }
        });
        
        if (closestPoint) {
          closestPoint.click();
        }
      });
    }
  }

  /**
   * Render Practice phase
   */
  renderPracticePhase() {
    const phaseData = this.pppData.practice;
    const exercise = phaseData.exercises[this.currentStep];

    this.contentArea.innerHTML = `
      <div class="grammar-practice-phase">
        <div class="phase-header">
          <h3 class="phase-title-en">${exercise.title}</h3>
          <h4 class="phase-title-uz">${exercise.titleUz}</h4>
        </div>

        <div class="exercise-content">
          ${exercise.type === 'fill_blank' ? this.renderFillBlank(exercise) : ''}
          ${exercise.type === 'drag_drop' ? this.renderDragDrop(exercise) : ''}
        </div>
      </div>
    `;

    if (exercise.type === 'fill_blank') {
      this.attachFillBlankListeners();
    }
    if (exercise.type === 'drag_drop') {
      this.attachDragDropListeners(exercise);
    }
  }

  /**
   * Render fill-in-the-blank exercise
   */
  renderFillBlank(exercise) {
    return `
      <div class="fill-blank-exercise">
        ${exercise.sentences.map((sentence, idx) => `
          <div class="sentence-item">
            <div class="sentence-text-en">${(sentence.text || '').replace('___', '<input type="text" class="blank-input" data-correct="' + (sentence.correct || '') + '" data-idx="' + idx + '">')}</div>
            ${sentence.uz ? `<div class="sentence-hint">${sentence.uz}</div>` : (sentence.hint ? `<div class="sentence-hint">💡 ${sentence.hint}</div>` : '')}
            <button class="check-sentence-btn" data-idx="${idx}">Check</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render drag-drop exercise
   */
  renderDragDrop(exercise) {
    return `
      <div class="drag-drop-exercise enhanced-drag-drop">
        <div class="drag-instructions">
          <span class="drag-icon">🧩</span>
          <p>So'zlarni to'g'ri joyga suring yoki bosing!</p>
        </div>
        
        <div class="word-bank" id="word-bank">
          <div class="word-bank-label">So'zlar:</div>
          <div class="word-bank-items">
            ${['am', 'is', 'are'].map(word => `
              <div class="draggable-word" draggable="true" data-word="${word}" id="word-${word}">
                ${word}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="sentence-builder-container">
          ${(exercise.items || []).map((item, idx) => `
            <div class="sentence-row" data-idx="${idx}" data-correct="${item.correct}">
              <div class="sentence-subject">${item.subject}</div>
              <div class="drop-zone-enhanced" data-idx="${idx}" data-correct="${item.correct}">
                <span class="drop-placeholder">?</span>
              </div>
              <div class="sentence-predicate">...</div>
              <div class="sentence-feedback-icon"></div>
            </div>
          `).join('')}
        </div>
        
        <div class="practice-check-all">
          <button class="check-all-btn">🔍 Barchasini tekshiring</button>
        </div>
      </div>
    `;
  }

  /**
   * Attach fill-blank event listeners
   */
  attachFillBlankListeners() {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    
    overlay.querySelectorAll('.check-sentence-btn').forEach(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const button = e.currentTarget;
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        const idx = button.dataset.idx;
        if (!idx) {
          return;
        }
        const input = overlay.querySelector(`.blank-input[data-idx="${idx}"]`);
        if (!(input instanceof HTMLInputElement)) {
          return;
        }
        const correct = input.dataset.correct || '';

        if (input.value.toLowerCase().trim() === correct) {
          input.style.backgroundColor = '#d4edda';
          input.style.borderColor = '#28a745';
          self.updateScore(10);
          button.textContent = '✅ Correct!';
          button.disabled = true;
        } else {
          input.style.backgroundColor = '#f8d7da';
          input.style.borderColor = '#dc3545';
          self.attempts++;
          button.textContent = `❌ Try again (${correct})`;
          setTimeout(() => {
            input.style.backgroundColor = '';
            input.style.borderColor = '';
            button.textContent = 'Check';
          }, 2000);
        }
      });
    });
  }

  /**
   * Attach drag-drop event listeners
   */
  attachDragDropListeners(exercise) {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    const draggables = Array.from(overlay.querySelectorAll('.draggable-word')).map(word => {
      if (!(word instanceof HTMLElement)) {
        throw new Error('Draggable word missing');
      }
      return word;
    });
    const dropZones = Array.from(overlay.querySelectorAll('.drop-zone-enhanced')).map(zone => {
      if (!(zone instanceof HTMLElement)) {
        throw new Error('Drop zone missing');
      }
      return zone;
    });
    /** @type {HTMLElement|null} */
    let selectedWord = null;
    
    draggables.forEach(word => {
      word.addEventListener('dragstart', /** @param {DragEvent} e */ (e) => {
        const dataTransfer = e.dataTransfer;
        if (!dataTransfer) {
          return;
        }
        dataTransfer.setData('text/plain', word.dataset.word || '');
        word.classList.add('dragging');
      });
      
      word.addEventListener('dragend', () => {
        word.classList.remove('dragging');
      });
      
      word.addEventListener('click', () => {
        if (selectedWord) {
          selectedWord.classList.remove('selected');
        }
        selectedWord = word;
        selectedWord.classList.add('selected');
        if (typeof window.playSound === 'function') window.playSound('click');
      });
    });
    
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });
      
      zone.addEventListener('drop', /** @param {DragEvent} e */ (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const dataTransfer = e.dataTransfer;
        if (!dataTransfer) {
          return;
        }
        const word = dataTransfer.getData('text/plain');
        if (word) {
          placeWordInZone(zone, word);
        }
      });
      
      zone.addEventListener('click', () => {
        if (selectedWord && selectedWord.dataset.word) {
          placeWordInZone(zone, selectedWord.dataset.word);
          selectedWord.classList.remove('selected');
          selectedWord = null;
        }
      });
    });
    
    function placeWordInZone(zone, word) {
      const existingWord = zone.querySelector('.placed-word');
      if (existingWord instanceof HTMLElement) existingWord.remove();
      
      const placeholder = zone.querySelector('.drop-placeholder');
      if (placeholder instanceof HTMLElement) placeholder.style.display = 'none';
      
      const placedWord = document.createElement('span');
      placedWord.className = 'placed-word';
      placedWord.textContent = word;
      placedWord.dataset.word = word;
      zone.appendChild(placedWord);
      
      placedWord.classList.add('just-placed');
      setTimeout(() => placedWord.classList.remove('just-placed'), 300);
      
      if (typeof window.playSound === 'function') window.playSound('pop');
    }
    
    const checkAllBtn = overlay.querySelector('.check-all-btn');
    if (checkAllBtn instanceof HTMLButtonElement) {
      checkAllBtn.addEventListener('click', () => {
      let allCorrect = true;
      let correctCount = 0;
      
      dropZones.forEach(zone => {
          const placedWord = zone.querySelector('.placed-word');
          const correctAnswer = zone.dataset.correct;
          const feedbackIcon = zone.closest('.sentence-row')?.querySelector('.sentence-feedback-icon');
          
          if (placedWord instanceof HTMLElement && placedWord.dataset.word === correctAnswer) {
          zone.classList.add('correct');
          zone.classList.remove('wrong');
            if (feedbackIcon instanceof HTMLElement) feedbackIcon.textContent = '✅';
          correctCount++;
        } else {
          zone.classList.add('wrong');
          zone.classList.remove('correct');
            if (feedbackIcon instanceof HTMLElement) feedbackIcon.textContent = '❌';
          allCorrect = false;
        }
      });
      
      self.updateScore(correctCount * 10);
      
      if (allCorrect) {
        if (typeof window.playSound === 'function') window.playSound('levelup');
          checkAllBtn.innerHTML = '🎉 Hammasi to\'g\'ri!';
          checkAllBtn.disabled = true;
      } else {
        if (typeof window.playSound === 'function') window.playSound('wrong');
      }
      });
    }
  }

  /**
   * Render Produce phase
   */
  renderProducePhase() {
    const phaseData = this.pppData.produce;
    const activity = phaseData.activities[this.currentStep] || phaseData.activities[0];

    if (activity.type === 'guided_production') {
      this.contentArea.innerHTML = this.renderGuidedProduction(activity);
      this.attachGuidedProductionListeners(activity);
    } else if (activity.type === 'sentence_builder') {
      this.contentArea.innerHTML = this.renderSentenceBuilder(activity);
      this.attachSentenceBuilderListeners();
    } else if (activity.type === 'conversation') {
      this.contentArea.innerHTML = this.renderConversation(activity);
      this.attachConversationListeners();
    }
  }

  /**
   * Render guided production
   */
  renderGuidedProduction(activity) {
    const prompts = activity.prompts || [];
    return `
      <div class="grammar-produce-phase">
        <div class="phase-header">
          <h3 class="phase-title-en">${activity.title}</h3>
          <h4 class="phase-title-uz">${activity.titleUz}</h4>
        </div>

        <div class="activity-content">
          <div class="production-prompts">
            ${prompts.map((prompt, idx) => {
              const promptText = typeof prompt === 'string' ? prompt : (prompt.prompt_uz || prompt.prompt_en || prompt.text || JSON.stringify(prompt));
              return `
              <div class="production-task" data-idx="${idx}">
                <div class="task-number">${idx + 1}</div>
                <div class="task-prompt">${promptText}</div>
                <div class="task-input">
                  <input type="text" class="production-input" data-idx="${idx}" 
                         placeholder="Type your sentence here...">
                  <button class="check-production-btn" data-idx="${idx}">✓</button>
                </div>
                <div class="task-feedback" data-idx="${idx}"></div>
              </div>
            `}).join('')}
          </div>
          
          <div class="production-summary" style="display: none;">
            <div class="summary-icon">🎉</div>
            <div class="summary-text">Well done! You practiced the grammar pattern!</div>
            <div class="summary-text-uz">Yaxshi! Siz grammatika namunasini mashq qildingiz!</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render sentence builder
   */
  renderSentenceBuilder(activity) {
    return `
      <div class="grammar-produce-phase">
        <div class="phase-header">
          <h3 class="phase-title-en">${activity.title}</h3>
          <h4 class="phase-title-uz">${activity.titleUz}</h4>
        </div>

        <div class="activity-content">
          <div class="activity-prompt">
            <div class="prompt-card">
              <div class="prompt-icon">🎭</div>
              <div class="prompt-text-en">${activity.prompt || ''}</div>
              <div class="prompt-text-uz">${activity.promptUz || ''}</div>
            </div>
          </div>

          <div class="sentence-builder">
            <div class="builder-tools">
              <div class="word-bank">
                <div class="word-bank-title">Word Bank / So'z banki</div>
                <div class="word-tokens">
                  ${['I', 'am', 'You', 'are', 'He', 'is', 'She', 'We', 'They', 'student', 'teacher', 'happy', 'tall'].map(word => `
                    <span class="word-token" data-word="${word}">${word}</span>
                  `).join('')}
                </div>
              </div>
              <div class="sentence-area">
                <div class="sentence-display" contenteditable="true" placeholder="Build your sentence here..."></div>
                <button class="submit-sentence-btn">Submit Sentence</button>
              </div>
            </div>
            <div class="built-sentences">
              <h4>Your Sentences / Sizning jumlalaringiz:</h4>
              <div class="sentences-list"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render conversation activity
   */
  renderConversation(activity) {
    return `
      <div class="grammar-produce-phase">
        <div class="phase-header">
          <h3 class="phase-title-en">${activity.title}</h3>
          <h4 class="phase-title-uz">${activity.titleUz}</h4>
        </div>

        <div class="activity-content">
          <div class="activity-prompt">
            <div class="prompt-card">
              <div class="prompt-icon">🎭</div>
              <div class="prompt-text-en">${activity.prompt || ''}</div>
              <div class="prompt-text-uz">${activity.promptUz || ''}</div>
            </div>
          </div>

          <div class="conversation-practice">
            <div class="conversation-setup">
              <div class="character-a">
                <div class="character-avatar">👤</div>
                <div class="character-name">You / Siz</div>
              </div>
              <div class="conversation-arrow">💬</div>
              <div class="character-b">
                <div class="character-avatar">👨</div>
                <div class="character-name">Friend / Do'st</div>
              </div>
            </div>
            <div class="conversation-input">
              <textarea placeholder="Write your conversation here... (Use the grammar we learned!)" rows="4"></textarea>
              <button class="submit-conversation-btn">Practice Conversation</button>
            </div>
            <div class="conversation-feedback"></div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach guided production listeners
   */
  attachGuidedProductionListeners(activity) {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    const prompts = activity.prompts || [];
    let completedTasks = 0;
    
    overlay.querySelectorAll('.check-production-btn').forEach(btn => {
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      btn.addEventListener('click', (e) => {
        const button = e.currentTarget;
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        const idx = button.dataset.idx;
        if (!idx) {
          return;
        }
        const input = overlay.querySelector(`.production-input[data-idx="${idx}"]`);
        const feedback = overlay.querySelector(`.task-feedback[data-idx="${idx}"]`);
        const task = overlay.querySelector(`.production-task[data-idx="${idx}"]`);
        if (!(input instanceof HTMLInputElement) || !(feedback instanceof HTMLElement) || !(task instanceof HTMLElement)) {
          return;
        }
        
        if (input.value.trim().length > 3) {
          feedback.innerHTML = '<span class="feedback-success">✓ Good sentence!</span>';
          task.classList.add('completed');
          input.disabled = true;
          button.disabled = true;
          self.updateScore(10);
          completedTasks++;
          
          if (completedTasks >= prompts.length) {
            setTimeout(() => {
              const summary = overlay.querySelector('.production-summary');
              if (summary instanceof HTMLElement) {
                summary.style.display = 'block';
              }
            }, 500);
          }
        } else {
          feedback.innerHTML = '<span class="feedback-hint">Write a longer sentence</span>';
        }
      });
    });
  }

  /**
   * Attach sentence builder listeners
   */
  attachSentenceBuilderListeners() {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    
    overlay.querySelectorAll('.word-token').forEach(token => {
      if (!(token instanceof HTMLElement)) {
        return;
      }
      token.addEventListener('click', () => {
        const sentenceDisplay = overlay.querySelector('.sentence-display');
        if (!(sentenceDisplay instanceof HTMLElement)) {
          return;
        }
        const word = token.dataset.word || '';
        if (!word) {
          return;
        }

        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.collapse(false);
          range.insertNode(document.createTextNode(word + ' '));
          selection.collapse(sentenceDisplay, sentenceDisplay.childNodes.length);
        } else {
          sentenceDisplay.append(document.createTextNode(word + ' '));
        }

        sentenceDisplay.focus();

        token.style.opacity = '0.3';
        setTimeout(() => { token.style.opacity = '1'; }, 200);
      });
    });

    const submitBtn = overlay.querySelector('.submit-sentence-btn');
    if (!(submitBtn instanceof HTMLButtonElement)) {
      return;
    }
    submitBtn.addEventListener('click', () => {
      const sentenceDisplay = overlay.querySelector('.sentence-display');
      if (!(sentenceDisplay instanceof HTMLElement)) {
        return;
      }
      const sentence = sentenceDisplay.textContent?.trim() || '';

      if (sentence) {
        const sentencesList = overlay.querySelector('.sentences-list');
        if (!(sentencesList instanceof HTMLElement)) {
          return;
        }
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'built-sentence';
        sentenceItem.innerHTML = `
          <span class="sentence-text">${sentence}</span>
          <span class="sentence-check">⭐</span>
        `;
        sentencesList.appendChild(sentenceItem);

        sentenceDisplay.textContent = '';
        self.updateScore(15);

        const builtCount = sentencesList.children.length;
        if (builtCount >= 3) {
          submitBtn.textContent = '🎉 Great job!';
          submitBtn.disabled = true;
        }
      }
    });
  }

  /**
   * Attach conversation listeners
   */
  attachConversationListeners() {
    const overlay = this.overlay;
    if (!overlay) return;
    const self = this;
    
    const submitBtn = overlay.querySelector('.submit-conversation-btn');
    if (!(submitBtn instanceof HTMLButtonElement)) {
      return;
    }
    submitBtn.addEventListener('click', () => {
      const textarea = overlay.querySelector('textarea');
      if (!(textarea instanceof HTMLTextAreaElement)) {
        return;
      }
      const conversation = textarea.value.trim();

      if (conversation) {
        const feedback = overlay.querySelector('.conversation-feedback');
        if (!(feedback instanceof HTMLElement)) {
          return;
        }
        feedback.innerHTML = `
          <div class="feedback-card success">
            <div class="feedback-icon">🎉</div>
            <div class="feedback-text-en">Excellent conversation! You used the grammar correctly.</div>
            <div class="feedback-text-uz">Ajoyib suhbat! Siz grammatikani to'g'ri ishlatdingiz.</div>
          </div>
        `;
        self.updateScore(20);
        textarea.disabled = true;
        submitBtn.disabled = true;
      }
    });
  }

  /**
   * Render completion screen
   */
  renderCompletion() {
    this.contentArea.innerHTML = `
      <div class="completion-celebration">
        <div class="celebration-icon">🎊</div>
        <h2 class="celebration-title-en">Congratulations!</h2>
        <h3 class="celebration-title-uz">Tabriklaymiz!</h3>
        <p class="celebration-text-en">You have successfully completed the PPP Grammar Lesson!</p>
        <p class="celebration-text-uz">Siz PPP Grammatika darsini muvaffaqiyatli yakunladingiz!</p>
        <div class="final-score">Final Score: ${this.score} ⭐</div>
        <button class="celebration-close-btn">Close & Continue</button>
      </div>
    `;

    this.overlay.querySelector('.celebration-close-btn').addEventListener('click', () => {
      this.close();
    });

    // Award points to the main app
    if (typeof window.awardPoints === 'function') {
      window.awardPoints(this.score, 'Grammar PPP Lesson Completion');
    }
  }

  /**
   * Close the modal
   */
  close() {
    this.overlay?.remove();
  }
}

// ============================
// PUBLIC API
// ============================

/**
 * Open Grammar Presentation Modal (PPP)
 * @param {Object} grammarData - Grammar data object
 * @param {Object} lesson - Lesson object
 * @returns {GrammarPPPModal} Modal instance
 */
export function openGrammarPresentationModal(grammarData, lesson) {
  console.log('[Grammar PPP] Opening modal for:', grammarData?.title || 'Unknown Grammar');
  
  const modal = new GrammarPPPModal(grammarData, lesson);
  modal.open();
  
  return modal;
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.openGrammarPresentationModal = openGrammarPresentationModal;
  
  window.GrammarPPP = {
    open: openGrammarPresentationModal,
    detectGrammarType,
    buildGrammarVisual,
    buildQuickCheckQuestions,
    parseExampleWithTranslation
  };
}
