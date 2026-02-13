// @ts-nocheck
/**
 * ═══════════════════════════════════════════════════════════════
 * VOCAB CARD RENDERER — Carousel Format (V2.5)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Supports FIVE data formats:
 * 
 * 1. LEGACY FORMAT (U01-U03):
 *    - presentation.uz_context: ["Uzbek explanation..."]
 *    - practice_loop: [{ context_question, hybrid_bridge, en_canonical, exercise }]
 *    - production: { uz_prompt, en_target }
 * 
 * 2. SLIDES FORMAT (U04+):
 *    - slides[]: Array of phase-based slides
 *    - Each slide has: { phase: "presentation" | "practice" | "production", ... }
 *    - Practice slides have: en_examples[] with bilingual sentences
 *    - Production slides have: model_answer
 * 
 * 3. MASTER DOCUMENT FORMAT (U04+ Preferred):
 *    - card: { uz_context_question, uz_mirror_answer, hybrid_answer, 
 *              anchor_sentence, example_2, example_3 }
 *    - exercises: [{ type: "jumble"|"scratch", ... }]
 *    - production: { uz_prompt, en_target }
 *    - Auto-converted to slides format via adaptMasterDocFormat()
 * 
 * 4. 4-ACT FORMAT (U04+):
 *    - slides[]: Array with 4 acts
 *    - Auto-converted via adapt4ActFormat()
 * 
 * 5. 4+2 ACT FORMAT (U04+ NEW) ← NEW IN V2.5
 *    - slides[]: Array with 6 slides (4 Acts + Discovery + Personalization)
 *    - slides[0]: { phase: "presentation", uz_context, hybrid_answer, en_canonical, syntax_scaffold }
 *    - slides[1]: { phase: "practice", type: "concept_check", exercise: { type: "function_sort" } }
 *    - slides[2]: { phase: "practice", type: "discovery", sentence, highlight_tokens[], options[] }
 *    - slides[3]: { phase: "practice", type: "drill_list", en_examples[] }
 *    - slides[4]: { phase: "production", trap: {}, on_success: { unlock_bubble } }
 *    - slides[5]: { phase: "production", type: "personalization", uz_prompt, focus_pattern, accepted_patterns[] }
 *    - dialogue_ref: Links card completion to dialogue bubble unlock
 *    - Auto-converted via adapt4ActFormat()
 * 
 * 6-STAGE FLOW:
 *   📖 Presentation → 🧠 Concept Check → 🔍 Discovery → 💬 Drill → 🎯 Production → ✏️ Personalization
 * 
 * @version 2.5.0 - 4+2 Act Format (Discovery + Personalization + syntax_scaffold)
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'vocabCardProgress';
  let completedCards = new Set();
  
  // ═══════════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════════
  // LANGUAGE HELPERS
  // ═══════════════════════════════════════════════════════════════

  const LANG_STORAGE_KEY = 'app_native_language';

  /**
   * Get current language code (uz, ar, en, etc.)
   */
  function getLang() {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'uz';
  }

  /**
   * Get localized line from dialogue data.
   * Tries: line_{lang} -> line_uz -> line (English) -> ''
   */
  function getLocalizedLine(lineObj) {
    if (!lineObj) return '';
    const lang = getLang();
    return lineObj[`line_${lang}`] || lineObj.line_uz || lineObj.line || '';
  }

  // CAROUSEL STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  
  let currentSlideIndex = 0;
  let currentCard = null;
  let exerciseCompleted = false;

  // ═══════════════════════════════════════════════════════════════
  // STORAGE & CARD LOOKUP
  // ═══════════════════════════════════════════════════════════════
  
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          completedCards = new Set(parsed);
        }
      }
    } catch (err) {
      console.warn('Unable to load vocab progress:', err);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedCards)));
    } catch (err) {
      console.warn('Unable to save vocab progress:', err);
    }
  }

  function findCard(vocabId) {
    for (let i = 1; i <= 10; i++) {
      const unitKey = 'VOCAB_CARDS_U' + String(i).padStart(2, '0');
      const unit = window[unitKey];
      if (!unit || !unit.lessons) continue;

      for (const lessonId in unit.lessons) {
        const lesson = unit.lessons[lessonId];
        if (!lesson || !lesson.items) continue;

        const raw = lesson.items.find(item => item.id === vocabId);
        if (raw) {
          if (typeof unit.resolveRef === 'function') {
            return { card: unit.resolveRef(raw), unitId: unit.unit_id, lessonId };
          }
          return { card: raw, unitId: unit.unit_id, lessonId };
        }
      }
    }
    return null;
  }

  loadProgress();

  // ═══════════════════════════════════════════════════════════════
  // TAB NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  
  function activateTab(tabName) {
    const modal = document.getElementById('vocab-modal');
    if (!modal) return;

    modal.querySelectorAll('.vocab-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    modal.querySelectorAll('.vocab-tab-content').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === tabName);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // EXERCISE RENDERERS
  // ═══════════════════════════════════════════════════════════════
  
  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Replace **chunk** markup with highlight spans
  function renderChunks(text) {
    if (!text) return '';
    return text.replace(/\*\*(.+?)\*\*/g, '<span class="chunk-highlight">$1</span>');
  }

  // Build blurred canonical sentence for Scratch mode
  function renderScratchSentence(canonical, scratchWords = []) {
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

  // ───────────────────────────────────────────────────────────────
  // 1. JUMBLE EXERCISE — Arrange words in correct order
  // ───────────────────────────────────────────────────────────────
  
  function renderJumbleExercise(container, jumbleWords, correctSentence, onComplete) {
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
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

  // ───────────────────────────────────────────────────────────────
  // 2. TRAP EXERCISE — Identify and fix error
  // ───────────────────────────────────────────────────────────────
  
  function renderTrapExercise(container, trapData, onComplete) {
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

  // ───────────────────────────────────────────────────────────────
  // 3. SCRATCH EXERCISE — Reveal hidden words by clicking
  // ───────────────────────────────────────────────────────────────
  
  function renderScratchExercise(container, scratchWords, canonicalSentence, onComplete) {
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

  // ═══════════════════════════════════════════════════════════════
  // ADAPTER: Master Document Format → Slides Format (U04+ Support)
  // ═══════════════════════════════════════════════════════════════
  
  /**
   * Converts the new Master Document aligned format (vocab_cards_u04+)
   * to the slides[] format that the renderer understands.
   * 
   * Input (Master Document format):
   *   card: { uz_context_question, uz_mirror_answer, hybrid_answer, anchor_sentence, example_2, example_3 }
   *   exercises: [{ type, instruction, ... }]
   *   production: { uz_prompt, en_target }
   * 
   * Output (Slides format):
   *   slides: [{ phase: "presentation"|"practice"|"exercise"|"production", ... }]
   */
  function adaptMasterDocFormat(rawCard) {
    // Check if this is Master Document format (has card.uz_context_question)
    if (!rawCard.card || !rawCard.card.uz_context_question) {
      return rawCard; // Not Master Doc format, return unchanged
    }

    const c = rawCard.card;
    const exercises = rawCard.exercises || [];
    const production = rawCard.production || {};

    // Build slides array from Master Document structure
    const slides = [{
      // Slide 1: Presentation (flip card)
      phase: 'presentation',
      presentation: {
        uz_polar_question: c.uz_context_question,
        uz_mirror_answer: c.uz_mirror_answer,
        hybrid_answer: c.hybrid_answer
      },
      reproduction: {
        en_canonical: c.anchor_sentence?.en || ''
      },
      production: {
        en_target: c.anchor_sentence?.en || ''
      },

      // Slide 2 data: Practice examples
      practice: {
        anchor: c.anchor_sentence?.en || '',
        en_examples: [
          // Example 1: Main anchor sentence
          {
            sentence: c.anchor_sentence?.en || '',
            sentence_uz: c.uz_mirror_answer || ''
          },
          // Example 2: Different subject/context
          {
            sentence: c.example_2?.en || '',
            sentence_uz: c.example_2?.uz || ''
          },
          // Example 3: With recycled vocabulary
          {
            sentence: c.example_3?.en || '',
            sentence_uz: c.example_3?.uz || ''
          }
        ].filter(ex => ex.sentence), // Remove empty examples
        
        // Exercise data (for stage 3)
        exercise: exercises[0] ? {
          type: exercises[0].type,
          data: exercises[0].type === 'jumble' 
            ? exercises[0].words 
            : exercises[0].hidden || []
        } : null
      }
    }];

    // Attach slides to the card object (without modifying original)
    return {
      ...rawCard,
      slides: slides,
      production: {
        uz_prompt: production.uz_prompt || c.uz_context_question,
        en_target: production.en_target || c.anchor_sentence?.en || ''
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // ADAPTER: 4+2 Act Format → Renderer Format (U04+ Support)
  // ═══════════════════════════════════════════════════════════════
  
  /**
   * Detects and adapts the 4-Act / 4+2 Act format to renderer-compatible structure.
   * 
   * 4+2 Act Format Detection:
   *   - Has slides[] array
   *   - slides[0].uz_context exists (not presentation.uz_polar_question)
   *   - OR has dialogue_ref property
   *   - OR slides have type: "concept_check" or "drill_list"
   * 
   * Input (4+2 Act format — 6 slides):
   *   slides[0]: { phase: "presentation", uz_context, hybrid_answer, en_canonical, syntax_scaffold }
   *   slides[1]: { phase: "practice", type: "concept_check", exercise: { type: "function_sort" } }
   *   slides[2]: { phase: "practice", type: "discovery", sentence, highlight_tokens[], options[] }
   *   slides[3]: { phase: "practice", type: "drill_list", en_examples[] }
   *   slides[4]: { phase: "production", trap: {}, on_success: { unlock_bubble } }
   *   slides[5]: { phase: "production", type: "personalization", uz_prompt, focus_pattern }
   * 
   * Output (Renderer format — 6 slides matching STAGES):
   *   [presentation, concept_check, discovery, drill, production, personalization]
   */
  function adapt4ActFormat(rawCard) {
    // Check if this is 4-Act or 4+2 Act format
    const is4Act = rawCard.slides &&
                   Array.isArray(rawCard.slides) &&
                   rawCard.slides.length >= 4 &&
                   (rawCard.slides[0]?.uz_context || rawCard.dialogue_ref);

    if (!is4Act) {
      return rawCard; // Not 4-Act format, return unchanged
    }

    const presentationSlide = rawCard.slides.find(s => s.phase === 'presentation');
    const conceptCheckSlide = rawCard.slides.find(s => s.type === 'concept_check');
    const discoverySlide = rawCard.slides.find(s => s.type === 'discovery');
    const drillListSlide = rawCard.slides.find(s => s.type === 'drill_list');
    const productionSlides = rawCard.slides.filter(s => s.phase === 'production');
    const productionSlide = productionSlides.find(s => s.type !== 'personalization') || productionSlides[0];
    const personalizationSlide = rawCard.slides.find(s => s.type === 'personalization');

    // ─── Slide 1: PRESENTATION ───────────────────────────────────
    const slidePresentation = {
      phase: 'presentation',
      presentation: {
        uz_polar_question: presentationSlide?.uz_context || '',
        uz_mirror_answer: presentationSlide?.uz_mirror_answer || '',
        hybrid_answer: presentationSlide?.hybrid_answer || '',
        uz_context: []
      },
      reproduction: { en_canonical: presentationSlide?.en_canonical || '' },
      audio: presentationSlide?.audio || null,
      grammar_visual: presentationSlide?.grammar_visual || null,
      syntax_scaffold: presentationSlide?.syntax_scaffold || null
    };

    // ─── Slide 2: CONCEPT CHECK ──────────────────────────────────
    const slideConceptCheck = {
      phase: 'practice',
      type: 'concept_check',
      practice: {
        en_examples: [],
        exercise: conceptCheckSlide?.exercise ? {
          type: conceptCheckSlide.exercise.type,
          data: conceptCheckSlide.exercise,
          instruction: conceptCheckSlide.instruction || ''
        } : null
      }
    };

    // ─── Slide 3: DISCOVERY ──────────────────────────────────────
    const slideDiscovery = {
      phase: 'practice',
      type: 'discovery',
      instruction: discoverySlide?.instruction || '',
      sentence: discoverySlide?.sentence || '',
      highlight_tokens: discoverySlide?.highlight_tokens || [],
      options: discoverySlide?.options || [],
      success_msg: discoverySlide?.success_msg || '',
      fail_msg: discoverySlide?.fail_msg || ''
    };

    // ─── Slide 4: DRILL LIST ─────────────────────────────────────
    const slideDrill = {
      phase: 'practice',
      type: 'drill_list',
      practice: {
        anchor: drillListSlide?.en_examples?.[0]?.en || '',
        en_examples: (drillListSlide?.en_examples || []).map(ex => ({
          sentence: ex.en || '',
          sentence_uz: ex.uz || '',
          is_anchor: ex.is_anchor || false,
          source_dialogue: ex.source_dialogue || null,
          speaker: ex.speaker || null,
          subject: ex.subject || null,
          focus_word: ex.focus_word || null
        })),
        exercise: null
      }
    };

    // ─── Slide 5: PRODUCTION ─────────────────────────────────────
    const slideProduction = {
      phase: 'production',
      production: {
        uz_prompt: productionSlide?.uz_prompt || '',
        en_target: productionSlide?.model_answer || '',
        model_answer: productionSlide?.model_answer || '',
        accepted_answers: productionSlide?.accepted_answers || [],
        trap: productionSlide?.trap || null,
        on_success: productionSlide?.on_success || null
      }
    };

    // ─── Slide 6: PERSONALIZATION ────────────────────────────────
    const slidePersonalization = {
      phase: 'production',
      type: 'personalization',
      uz_prompt: personalizationSlide?.uz_prompt || '',
      focus_pattern: personalizationSlide?.focus_pattern || '',
      accepted_patterns: personalizationSlide?.accepted_patterns || [],
      on_success: personalizationSlide?.on_success || null,
      success_msg: personalizationSlide?.on_success?.message || 'Well done!',
      fail_msg: 'Try using the target pattern in your answer.'
    };

    return {
      ...rawCard,
      slides: [slidePresentation, slideConceptCheck, slideDiscovery, slideDrill, slideProduction, slidePersonalization],
      production: slideProduction.production,
      dialogue_ref: rawCard.dialogue_ref || null,
      _is4Act: true
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // MODAL BUILDER — Main Rendering Function (Carousel Format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderVocabModal(vocabId) {
    const result = findCard(vocabId);
    if (!result) {
      console.error('Card not found:', vocabId);
      return;
    }

    // Apply adapters: First try 4-Act, then Master Document format
    let card = adapt4ActFormat(result.card);
    if (!card._is4Act) {
      card = adaptMasterDocFormat(result.card);
    }
    // Reset carousel state for new card
    currentCard = card;
    currentSlideIndex = 0;
    exerciseCompleted = false;

    // Check for slides[] (deep carousel format) or legacy practice object
    const hasSlidesFormat = Array.isArray(card.slides) && card.slides.length > 0;
    const hasLegacyFormat = card.practice && !card.slides;
    const hasMasterDocFormat = card.card && card.card.uz_context_question; // Should now have slides from adapter
    const has4ActFormat = card._is4Act === true; // Detected by adapt4ActFormat

    if (!hasSlidesFormat && !hasLegacyFormat) {
      console.error('Card format not recognized. Expected slides[], practice, Master Doc, or 4-Act format:', card);
      alert('This card is under construction or missing practice data.');
      return;
    }
    
    const isCompleted = completedCards.has(vocabId);

    let modal = document.getElementById('vocab-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vocab-modal';
      modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        padding: 20px;
      `;
      document.body.appendChild(modal);

      modal.onclick = (e) => {
        if (e.target === modal) closeVocabModal();
      };
    }

    // Build modal with staged navigation structure
    renderStagedModalContent(modal, card, vocabId, isCompleted);
    
    modal.style.display = 'flex';
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGED MODAL CONTENT BUILDER (New U02 Format)
  // ═══════════════════════════════════════════════════════════════
  
  // Stage management
  let currentStage = 0;
  const STAGES = ['presentation', 'concept_check', 'discovery', 'drill', 'production', 'personalization'];
  
  function renderStagedModalContent(modal, card, vocabId, isCompleted) {
    currentStage = 0;
    
    modal.innerHTML = `
      <div id="vocab-card-modal" style="
        background: white;
        border-radius: 16px;
        max-width: 640px;
        width: 100%;
        height: 85vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
        overflow: hidden;
      ">
        <!-- Header with Title -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px 24px;
          border-radius: 16px 16px 0 0;
          position: relative;
          flex-shrink: 0;
        ">
          <button onclick="window.closeVocabModal()" style="
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          ">×</button>
          
          <div style="font-size: 28px; font-weight: 700;">${card.en}</div>
          ${card.uz ? `<div style="font-size: 16px; opacity: 0.9; margin-top: 2px;">${card.uz}</div>` : ''}
          <div style="font-size: 13px; opacity: 0.75; margin-top: 4px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
            ${card.pos ? `<span style="background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:12px;">${card.pos}</span>` : ''}
            ${card.is_chunk ? '<span style="background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:12px;">CHUNK</span>' : ''}
            ${card.type ? `<span style="background:rgba(255,255,255,0.15);padding:2px 10px;border-radius:12px;">${card.type.replace(/_/g, ' ')}</span>` : ''}
            ${isCompleted ? '<span style="background:rgba(76,175,80,0.3);padding:2px 10px;border-radius:12px;">✓ Done</span>' : ''}
          </div>
          ${card.dialogue_ref?.bubble_text ? `
          <div style="margin-top: 8px; padding: 8px 12px; background: rgba(255,255,255,0.15); border-radius: 8px; border-left: 3px solid rgba(255,255,255,0.5); font-size: 13px; font-style: italic; opacity: 0.9;">
            💬 ${card.dialogue_ref.speaker || ''}: "${card.dialogue_ref.bubble_text}"
          </div>` : ''}
        </div>

        <!-- Stage Progress Dots -->
        <div id="stage-progress" style="
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          background: #fafafa;
          border-bottom: 1px solid #eee;
          flex-shrink: 0;
        ">
          ${STAGES.map((stage, i) => `
            <div class="stage-dot" data-stage="${i}" style="
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${i === 0 ? '#667eea' : '#ddd'};
              transition: all 0.3s;
            "></div>
          `).join('')}
        </div>

        <!-- Stage Content Area (fills remaining space) -->
        <div id="stage-content" style="
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        "></div>

        <!-- Navigation Footer -->
        <div style="
          padding: 16px 24px;
          border-top: 2px solid #f0f0f0;
          display: flex;
          gap: 12px;
          flex-shrink: 0;
          background: white;
        ">
          <button id="btn-back" onclick="window.goToPrevStage()" style="
            padding: 14px 24px;
            background: #f5f5f5;
            color: #666;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            display: none;
          ">← Back</button>
          
          <button id="btn-next" onclick="window.goToNextStage()" style="
            flex: 1;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          ">Next →</button>
          
          <button id="btn-complete" onclick="window.markVocabComplete('${vocabId}')" style="
            flex: 1;
            padding: 14px;
            background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            display: none;
          ">✓ Complete</button>
        </div>
      </div>
    `;

    // Render first stage
    renderCurrentStage();
  }

  // Navigate between stages
  window.goToNextStage = function() {
    if (currentStage < STAGES.length - 1) {
      currentStage++;
      renderCurrentStage();
    }
  };

  window.goToPrevStage = function() {
    if (currentStage > 0) {
      currentStage--;
      renderCurrentStage();
    }
  };

  function renderCurrentStage() {
    if (!currentCard) return;
    
    const container = document.getElementById('stage-content');
    // Use the slide that matches the current stage (not always [0])
    const slide = currentCard.slides?.[currentStage] || currentCard.slides?.[0] || {};
    
    // Update progress dots
    document.querySelectorAll('.stage-dot').forEach((dot, i) => {
      dot.style.background = i === currentStage ? '#667eea' : (i < currentStage ? '#4caf50' : '#ddd');
    });
    
    // Update navigation buttons
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnComplete = document.getElementById('btn-complete');
    
    if (btnBack) btnBack.style.display = currentStage > 0 ? 'block' : 'none';
    if (btnNext) btnNext.style.display = currentStage < STAGES.length - 1 ? 'block' : 'none';
    if (btnComplete) btnComplete.style.display = currentStage === STAGES.length - 1 ? 'block' : 'none';
    
    // Render appropriate stage
    switch (STAGES[currentStage]) {
      case 'presentation':
        renderPresentationStage(container, slide);
        break;
      case 'concept_check':
        renderExerciseStage(container, slide);
        break;
      case 'discovery':
        renderDiscoveryStage(container, slide);
        break;
      case 'drill':
        renderPracticeStage(container, slide);
        break;
      case 'production':
        renderProductionStage(container, slide);
        break;
      case 'personalization':
        renderPersonalizationStage(container, slide);
        break;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE 1: PRESENTATION (Flip Card)
  // ═══════════════════════════════════════════════════════════════
  
  function renderPresentationStage(container, slide) {
    const pres = slide.presentation || {};
    
    container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
      ">
        ${currentCard?.image ? `
        <div style="margin-bottom: 16px;">
          <img src="${currentCard.image}" alt="${currentCard.en || ''}" style="
            max-width: 100%;
            max-height: 160px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.12);
            object-fit: contain;
          " onerror="this.style.display='none'">
        </div>
        ` : ''}
        <div style="font-size: 14px; color: #888; margin-bottom: 16px; font-weight: 600;">
          📝 PRESENTATION
        </div>
        
        <!-- Flip Card -->
        <div id="flip-card-container" style="
          perspective: 1000px;
          width: 100%;
          max-width: 400px;
          height: 280px;
        ">
          <div id="flip-card" style="
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            cursor: pointer;
          " onclick="this.classList.toggle('flipped'); this.style.transform = this.classList.contains('flipped') ? 'rotateY(180deg)' : 'rotateY(0deg)'">
            
            <!-- FRONT: Uzbek Question + Hybrid Answer -->
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 24px;
              border-radius: 16px;
              background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            ">
              <!-- Polar Question -->
              <div style="
                font-size: 16px;
                color: #b71c1c;
                margin-bottom: 20px;
                padding: 12px 16px;
                background: rgba(244, 67, 54, 0.1);
                border-radius: 8px;
                border-left: 4px solid #ef5350;
              ">❓ ${pres.uz_polar_question || 'Loading...'}</div>
              
              <!-- Hybrid Answer (Uzbek + TARGET in English) -->
              <div style="
                font-size: 20px;
                color: #1b5e20;
                padding: 16px 20px;
                background: rgba(76, 175, 80, 0.1);
                border-radius: 8px;
                border-left: 4px solid #4caf50;
                line-height: 1.5;
              ">✓ ${renderHybridAnswer(pres.hybrid_answer || pres.uz_mirror_answer || '')}</div>
              
              <div style="
                margin-top: 24px;
                font-size: 12px;
                color: #888;
              ">👆 Tap to flip</div>
            </div>
            
            <!-- BACK: Full English -->
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              transform: rotateY(180deg);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 24px;
              border-radius: 16px;
              background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            ">
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">FULL ENGLISH</div>
              <div style="
                font-size: 24px;
                font-weight: 700;
                color: #2e7d32;
                text-align: center;
                line-height: 1.4;
              ">${slide.reproduction?.en_canonical || slide.production?.en_target || currentCard?.en || ''}</div>
              
              <div style="
                margin-top: 24px;
                font-size: 12px;
                color: #888;
              ">👆 Tap to flip back</div>
            </div>
          </div>
        </div>
        
        ${renderSyntaxScaffold(slide)}
        ${renderGrammarTable(currentCard)}
        ${renderAudioButton(slide)}
        ${renderDialogueViewer(currentCard)}
      </div>
    `;
  }

  // Render grammar conjugation table if card has grammar_table or grammar_visual
  function renderGrammarTable(card) {
    const gt = card.grammar_table || card.grammar_visual ||
               card.slides?.[0]?.grammar_visual;
    if (!gt || typeof gt !== 'object') return '';

    const singular = gt.singular;
    const plural = gt.plural;
    const negative = gt.negative;
    const question = gt.question;

    let rows = '';
    if (singular) {
      rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#1565c0;">${(singular.subjects || []).join(', ')}</td><td style="padding:8px 12px;font-weight:700;color:#2e7d32;">${singular.form || ''}</td></tr>`;
    }
    if (plural) {
      rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#1565c0;">${(plural.subjects || []).join(', ')}</td><td style="padding:8px 12px;font-weight:700;color:#e65100;">${plural.form || ''}</td></tr>`;
    }
    if (negative && typeof negative === 'object' && !Array.isArray(negative)) {
      if (typeof negative.was === 'string' || typeof negative.were === 'string') {
        const negEntries = Object.entries(negative).map(([k, v]) => (typeof v === 'string' ? `${k} → ${v}` : '')).filter(Boolean).join('; ');
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#c62828;">Negative</td><td style="padding:8px 12px;">${negEntries}</td></tr>`;
      } else {
        const negEntries = Object.entries(negative).map(([k, v]) => `${k} → ${v}`).join(', ');
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#c62828;">Negative</td><td style="padding:8px 12px;">${negEntries}</td></tr>`;
      }
    }
    if (question) {
      rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#6a1b9a;">Question</td><td style="padding:8px 12px;">${question.pattern || ''}</td></tr>`;
    }

    // U04 alternate shape: wasn_t: { full, subjects }, weren_t: { full, subjects }
    if (!rows && typeof gt === 'object') {
      const knownKeys = ['singular', 'plural', 'negative', 'question'];
      Object.keys(gt).forEach(function(key) {
        if (knownKeys.indexOf(key) !== -1) return;
        const entry = gt[key];
        if (entry && typeof entry === 'object' && (entry.subjects || entry.full || entry.form)) {
          const label = key.replace(/_/g, "'");
          const subj = (entry.subjects || []).join(', ');
          const form = entry.full || entry.form || '';
          rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#1565c0;">${subj}</td><td style="padding:8px 12px;font-weight:700;">${form}</td></tr>`;
        }
      });
    }

    if (!rows) return '';

    return `
      <div style="margin-top: 16px; background: #f5f5f5; border-radius: 12px; overflow: hidden;">
        <div style="font-size: 13px; font-weight: 600; color: #666; padding: 10px 14px; border-bottom: 1px solid #e0e0e0;">📊 Grammar Reference</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${rows}
        </table>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // DIALOGUE VIEWER — Shows dialogue lines with unlocked bubbles
  // ═══════════════════════════════════════════════════════════════

  /**
   * Render dialogue viewer section.
   * Shows the dialogue referenced by the current card.
   * Unlocked lines are fully visible; locked lines are blurred.
   * @param {Object} card - The current card (with dialogue_ref)
   * @returns {string} HTML string
   */
  function renderDialogueViewer(card) {
    const ref = card?.dialogue_ref;
    if (!ref || !ref.dialogue_id) return '';

    // Look up the dialogue from the unit data
    const unitId = (card.id || '').match(/V_U(\d+)/)?.[1];
    const unitKey = unitId ? `VOCAB_CARDS_U${unitId.padStart(2, '0')}` : null;
    const unitData = unitKey ? window[unitKey] : null;
    const dialogue = unitData?.dialogues?.[ref.dialogue_id] || unitData?.getDialogue?.(ref.dialogue_id);

    if (!dialogue || !Array.isArray(dialogue.lines)) return '';

    // Get unlocked bubbles from localStorage
    let unlockedSet;
    try {
      const unlocked = JSON.parse(localStorage.getItem('unlockedBubbles') || '[]');
      unlockedSet = new Set(unlocked);
    } catch (e) {
      unlockedSet = new Set();
    }

    const linesHTML = dialogue.lines.map((line, idx) => {
      const unlockId = `${ref.dialogue_id}_${idx}`;
      const isUnlocked = unlockedSet.has(unlockId);
      const isTarget = idx === ref.line_index;
      const isLeft = idx % 2 === 0;

      return `
        <div style="
          display: flex;
          flex-direction: ${isLeft ? 'row' : 'row-reverse'};
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 6px;
        ">
          <div style="
            font-size: 11px;
            font-weight: 700;
            color: ${isLeft ? '#1565c0' : '#6a1b9a'};
            min-width: 50px;
            text-align: ${isLeft ? 'right' : 'left'};
            padding-top: 6px;
          ">${line.speaker}</div>
          <div style="
            flex: 1;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.4;
            ${isTarget ? 'border: 2px solid #ff9800; background: #fff8e1;' : 'background: #f5f5f5; border: 1px solid #e0e0e0;'}
            ${!isUnlocked && !isTarget ? 'filter: blur(3px); user-select: none;' : ''}
          ">
            <div style="color: #333; ${isTarget ? 'font-weight: 600;' : ''}">${line.line}</div>
            ${isUnlocked || isTarget ? `<div style="font-size: 11px; color: #888; margin-top: 3px; font-style: italic;">${getLocalizedLine(line)}</div>` : ''}
          </div>
          ${isTarget ? '<span style="font-size: 14px; padding-top: 6px;">🔓</span>' : (isUnlocked ? '<span style="font-size: 12px; padding-top: 6px; opacity: 0.5;">✓</span>' : '<span style="font-size: 12px; padding-top: 6px; opacity: 0.3;">🔒</span>')}
        </div>
      `;
    }).join('');

    return `
      <div style="margin-top: 16px;">
        <button id="dialogue-toggle-btn" onclick="(function(){
          var v = document.getElementById('dialogue-lines');
          var b = document.getElementById('dialogue-toggle-btn');
          if (v.style.display === 'none') { v.style.display = 'block'; b.textContent = '💬 ${dialogue.title || 'Dialogue'} ▲ Hide'; }
          else { v.style.display = 'none'; b.textContent = '💬 ${dialogue.title || 'Dialogue'} ▼ Show'; }
        })()" style="
          width: 100%;
          padding: 10px 16px;
          background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
          border: 1px solid #9fa8da;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #283593;
          cursor: pointer;
          text-align: left;
        ">💬 ${dialogue.title || 'Dialogue'} ▼ Show</button>
        <div id="dialogue-lines" style="
          display: none;
          margin-top: 8px;
          padding: 12px;
          background: #fafafa;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          max-height: 260px;
          overflow-y: auto;
        ">
          <div style="font-size: 11px; color: #666; margin-bottom: 8px; text-align: center;">
            ${dialogue.setting || ''} — <strong>${(dialogue.characters || []).join(' & ')}</strong>
          </div>
          ${linesHTML}
          <div style="font-size: 11px; color: #999; text-align: center; margin-top: 8px;">
            🔒 Complete vocab cards to unlock more lines
          </div>
        </div>
      </div>
    `;
  }

  // Render audio play button if slide has audio
  function renderAudioButton(slide) {
    const audioSrc = slide?.audio;
    if (!audioSrc) return '';
    return `
      <div style="text-align: center; margin-top: 12px;">
        <button onclick="(function(){ var a = new Audio('${audioSrc}'); a.play().catch(function(){}); })()" style="
          padding: 10px 24px;
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          border: 1px solid #2196f3;
          border-radius: 24px;
          font-size: 14px;
          cursor: pointer;
          color: #1565c0;
          font-weight: 600;
        ">🔊 Play Audio</button>
      </div>
    `;
  }

  // Helper to render hybrid answer with TARGET highlighted
  function renderHybridAnswer(text) {
    // Replace **text** with highlighted span
    return text.replace(/\*\*(.+?)\*\*/g, '<span style="background: #ffe082; padding: 2px 8px; border-radius: 4px; font-weight: 700; color: #1565c0;">$1</span>');
  }

  // ═══════════════════════════════════════════════════════════════
  // SYNTAX SCAFFOLD RENDERER (Mirror Mode — RULE E11)
  // ═══════════════════════════════════════════════════════════════
  
  function renderSyntaxScaffold(slide) {
    const scaffold = slide.syntax_scaffold || slide.presentation?.syntax_scaffold;
    if (!scaffold) return '';

    return `
      <div style="
        margin-top: 16px;
        padding: 14px 18px;
        background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
        border-left: 4px solid #5c6bc0;
        border-radius: 10px;
      ">
        <div style="font-size: 11px; font-weight: 700; color: #283593; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          🪞 Syntax Scaffold (Mirror Mode)
        </div>
        <div style="font-size: 15px; color: #1a237e; line-height: 1.5;">
          ${renderHybridAnswer(scaffold)}
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE: DISCOVERY (Grammar Noticing — After Concept Check)
  // Highlights grammar tokens, asks "Why this form?"
  // ═══════════════════════════════════════════════════════════════
  
  function renderDiscoveryStage(container, slide) {
    const instruction = slide.instruction || 'Diqqat bilan qarang... (Look carefully...)';
    const sentence = slide.sentence || '';
    const highlightTokens = slide.highlight_tokens || [];
    const options = slide.options || [];
    const successMsg = slide.success_msg || 'To\'g\'ri! (Correct!)';
    const failMsg = slide.fail_msg || 'Qayta urinib ko\'ring. (Try again.)';
    const correctOption = options.find(o => o.correct);

    // Build sentence HTML with highlighted tokens
    let sentenceHTML = sentence;
    highlightTokens.forEach(token => {
      if (!token) return;
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('\\b(' + escaped + ')\\b', 'gi');
      sentenceHTML = sentenceHTML.replace(re, '<span style="background:#fff59d;padding:2px 6px;border-radius:4px;font-weight:700;color:#e65100;border-bottom:2px solid #ff9800;">$1</span>');
    });

    container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
      ">
        <div style="font-size: 14px; color: #888; margin-bottom: 16px; font-weight: 600; text-align: center;">
          🔍 DISCOVERY
        </div>

        <!-- Instruction -->
        <div style="
          padding: 12px 16px;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          color: #555;
          text-align: center;
        ">${instruction}</div>

        <!-- Sentence with highlighted tokens -->
        ${sentence ? `
        <div style="
          padding: 20px 24px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 18px;
          font-weight: 500;
          color: #1565c0;
          text-align: center;
          line-height: 1.6;
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
        ">"${sentenceHTML}"</div>
        ` : ''}

        <!-- Multiple choice options -->
        <div id="discovery-options" style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        ">
          ${options.map(opt => `
            <button class="discovery-opt" data-value="${(opt.value || '').replace(/"/g, '&quot;')}" data-correct="${!!opt.correct}" style="
              padding: 16px 24px;
              background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
              border: 2px solid #ddd;
              border-radius: 12px;
              font-size: 15px;
              cursor: pointer;
              transition: all 0.2s;
              text-align: left;
            ">${opt.label || opt.value || ''}</button>
          `).join('')}
        </div>

        <!-- Feedback -->
        <div id="discovery-feedback" style="margin-top: 8px;"></div>
      </div>
    `;

    // Add click handlers to options
    container.querySelectorAll('.discovery-opt').forEach(btn => {
      btn.onclick = () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedbackDiv = document.getElementById('discovery-feedback');

        // Disable all buttons and highlight correct one
        container.querySelectorAll('.discovery-opt').forEach(b => {
          b.style.pointerEvents = 'none';
          if (b.dataset.correct === 'true') {
            b.style.background = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
            b.style.borderColor = '#4caf50';
          }
        });

        if (isCorrect) {
          btn.style.background = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
          btn.style.borderColor = '#4caf50';
          if (feedbackDiv) {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#e8f5e9;border-radius:8px;color:#2e7d32;font-weight:600;">✓ ${successMsg}</div>`;
          }
        } else {
          btn.style.background = 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)';
          btn.style.borderColor = '#f44336';
          if (feedbackDiv) {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#ffebee;border-radius:8px;color:#c62828;">✗ ${failMsg}</div>`;
          }
        }
      };
    });

    // If no options, allow proceeding
    if (options.length === 0) {
      container.innerHTML += '<div style="text-align:center;color:#999;font-style:italic;">No discovery exercise for this card.</div>';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE: PERSONALIZATION (Open-Ended Personal Response)
  // flexibleCheck via regex patterns
  // ═══════════════════════════════════════════════════════════════
  
  function renderPersonalizationStage(container, slide) {
    const uzPrompt = slide.uz_prompt || '';
    const focusPattern = slide.focus_pattern || '';
    const acceptedPatterns = slide.accepted_patterns || [];
    const successMsg = slide.success_msg || 'Ajoyib! (Excellent!)';
    const failMsg = slide.fail_msg || 'Kerakli so\'zlarni ishlatib ko\'ring. (Try using the target words.)';

    container.innerHTML = `
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      ">
        <div style="font-size: 14px; color: #888; margin-bottom: 20px; font-weight: 600;">
          ✏️ PERSONALIZATION
        </div>

        <!-- Uzbek Prompt -->
        <div style="
          padding: 20px 24px;
          background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          max-width: 400px;
          width: 100%;
        ">
          <div style="font-size: 12px; color: #6a1b9a; margin-bottom: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Your turn — answer personally:</div>
          <div style="font-size: 18px; color: #4a148c; font-weight: 600; line-height: 1.4;">${uzPrompt}</div>
        </div>

        <!-- Input Area -->
        <div style="width: 100%; max-width: 400px; margin-bottom: 16px;">
          <input type="text" id="personalization-input" placeholder="Type your answer in English..." style="
            width: 100%;
            padding: 16px 20px;
            border: 2px solid #ce93d8;
            border-radius: 12px;
            font-size: 16px;
            outline: none;
            transition: all 0.2s;
          " />
        </div>

        <!-- Check Button -->
        <button id="personalization-check-btn" style="
          padding: 14px 32px;
          background: linear-gradient(135deg, #ab47bc 0%, #7b1fa2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(171, 71, 188, 0.3);
          transition: all 0.2s;
          margin-bottom: 16px;
        ">Check Answer</button>

        <!-- Feedback Area -->
        <div id="personalization-feedback" style="max-width: 400px; width: 100%;"></div>
      </div>
    `;

    const inputEl = document.getElementById('personalization-input');
    const checkBtn = document.getElementById('personalization-check-btn');
    const feedbackDiv = document.getElementById('personalization-feedback');

    // Build regex from focus_pattern or accepted_patterns
    const buildRegex = (pattern) => {
      if (!pattern) return null;
      try {
        if (pattern instanceof RegExp) return pattern;
        return new RegExp(pattern, 'i');
      } catch (e) {
        return null;
      }
    };

    const flexibleCheck = (text) => {
      if (!text || !text.trim()) return false;
      const trimmed = text.trim();

      // Check focus_pattern first
      if (focusPattern) {
        const re = buildRegex(focusPattern);
        if (re && re.test(trimmed)) return true;
      }

      // Check accepted_patterns
      if (acceptedPatterns.length > 0) {
        return acceptedPatterns.some(pat => {
          const re = buildRegex(pat);
          return re && re.test(trimmed);
        });
      }

      // Fallback: any non-empty answer passes
      return trimmed.length > 2;
    };

    if (checkBtn) {
      checkBtn.onclick = () => {
        const text = (inputEl?.value || '').trim();
        const ok = flexibleCheck(text);

        if (feedbackDiv) {
          if (ok) {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#e8f5e9;border-radius:8px;color:#2e7d32;font-weight:600;">✓ ${successMsg}</div>`;
            if (inputEl) {
              inputEl.style.borderColor = '#4caf50';
              inputEl.style.background = '#e8f5e9';
              inputEl.disabled = true;
            }
            checkBtn.style.display = 'none';
          } else {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#ffebee;border-radius:8px;color:#c62828;">✗ ${failMsg}</div>`;
            if (inputEl) {
              inputEl.style.borderColor = '#f44336';
              inputEl.style.background = '#ffebee';
              setTimeout(() => {
                inputEl.style.borderColor = '#ce93d8';
                inputEl.style.background = '#fff';
              }, 2000);
            }
          }
        }
      };
    }

    // Allow Enter key to submit
    if (inputEl) {
      inputEl.onkeypress = (e) => {
        if (e.key === 'Enter' && checkBtn) checkBtn.click();
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE 2: PRACTICE (Slot Substitution with Translation Practice)
  // First example in English, others in Uzbek with flip-to-reveal
  // ═══════════════════════════════════════════════════════════════
  
  function renderPracticeStage(container, slide) {
    const practice = slide.practice || {};
    const examples = practice.en_examples || [];
    
    container.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <div style="font-size: 14px; color: #888; margin-bottom: 12px; font-weight: 600; text-align: center;">
          🔀 PRACTICE — Translate to English
        </div>
        
        <div style="
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-bottom: 16px;
          padding: 8px;
          background: #f5f5f5;
          border-radius: 8px;
        ">
          Anchor: <span style="color: #1565c0; font-weight: 600;">"${practice.anchor || ''}"</span>
        </div>
        
        <div style="flex: 1; overflow-y: auto;" id="practice-examples"></div>
      </div>
    `;
    
    const examplesContainer = document.getElementById('practice-examples');
    
    examples.forEach((ex, idx) => {
      // Highlight focus_word if present, otherwise just highlight **chunks**
      let sentence = ex.sentence || '';
      if (ex.focus_word && sentence.includes(ex.focus_word)) {
        // Highlight focus_word with bold underline
        sentence = sentence.replace(
          new RegExp('\\b(' + ex.focus_word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'gi'),
          '<span style="background: #bbdefb; padding: 2px 6px; border-radius: 4px; font-weight: 700; text-decoration: underline;">$1</span>'
        );
      }
      sentence = sentence.replace(/\*\*(.+?)\*\*/g, '<span style="background: #bbdefb; padding: 2px 6px; border-radius: 4px; font-weight: 600;">$1</span>');

      const isAnchor = ex.is_anchor || idx === 0;
      
      if (isAnchor) {
        // Anchor sentence: prominent with source attribution
        examplesContainer.innerHTML += `
          <div style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            margin-bottom: 10px;
            font-size: 16px;
            color: #333;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
          ">
            <div style="font-size: 11px; color: #2e7d32; margin-bottom: 4px; font-weight: 600;">
              ⚓ ANCHOR${ex.speaker ? ' — ' + ex.speaker : ''}${ex.source_dialogue ? ' (' + ex.source_dialogue + ')' : ''}
            </div>
            ${sentence}
            ${ex.sentence_uz ? `<div style="font-size: 13px; color: #558b2f; margin-top: 6px; font-style: italic;">${ex.sentence_uz}</div>` : ''}
          </div>
        `;
      } else {
        // Transfer examples: Show in Uzbek with flip-to-reveal English
        const uzSentence = ex.sentence_uz || '';
        const uniqueId = 'flip-example-' + idx;
        
        examplesContainer.innerHTML += `
          <div id="${uniqueId}" style="
            padding: 14px 16px;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 12px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
          " onclick="window.flipPracticeCard('${uniqueId}')">
            <div class="uz-side" style="display: block;">
              <div style="font-size: 11px; color: #e65100; margin-bottom: 4px; font-weight: 600;">
                🇺🇿 UZBEK — Tap to see English${ex.subject ? ' (Subject: ' + ex.subject + ')' : ''}
              </div>
              <div style="font-size: 16px; color: #333;">${uzSentence || '(Uzbek not available)'}</div>
            </div>
            <div class="en-side" style="display: none;">
              <div style="font-size: 11px; color: #1565c0; margin-bottom: 4px; font-weight: 600;">🇬🇧 ENGLISH</div>
              <div style="font-size: 16px; color: #333;">${sentence}</div>
            </div>
          </div>
        `;
      }
    });
  }
  
  // Flip practice card handler
  window.flipPracticeCard = function(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const uzSide = card.querySelector('.uz-side');
    const enSide = card.querySelector('.en-side');
    
    if (uzSide.style.display !== 'none') {
      uzSide.style.display = 'none';
      enSide.style.display = 'block';
      card.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
      card.style.borderColor = '#1976d2';
    } else {
      uzSide.style.display = 'block';
      enSide.style.display = 'none';
      card.style.background = 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)';
      card.style.borderColor = '#ff9800';
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // STAGE 3: EXERCISE (Jumble with Chunk Preservation)
  // ═══════════════════════════════════════════════════════════════
  
  function renderExerciseStage(container, slide) {
    const exercise = slide.practice?.exercise || {};
    const canonical = slide.reproduction?.en_canonical || slide.production?.en_target || '';
    
    // Determine exercise type label
    let exerciseLabel = 'PRACTICE';
    if (exercise.type === 'jumble') exerciseLabel = 'Arrange the chunks';
    else if (exercise.type === 'function_sort') exerciseLabel = 'Concept Check';
    else if (exercise.type === 'trap') exerciseLabel = 'Spot the Error';
    else if (exercise.type === 'scratch') exerciseLabel = 'Reveal Words';
    
    container.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column;">
        <div style="font-size: 14px; color: #888; margin-bottom: 16px; font-weight: 600; text-align: center;">
          🧩 EXERCISE — ${exerciseLabel}
        </div>
        
        <div id="exercise-area" style="flex: 1; display: flex; flex-direction: column; justify-content: center;"></div>
      </div>
    `;
    
    const exerciseArea = document.getElementById('exercise-area');
    
    if (exercise.type === 'jumble' && Array.isArray(exercise.data)) {
      renderChunkJumbleExercise(exerciseArea, exercise.data, canonical);
    } else if (exercise.type === 'function_sort') {
      // NEW: Function Sort (Concept Check) exercise
      renderFunctionSortExercise(exerciseArea, exercise.data, exercise.instruction);
    } else if (exercise.type === 'trap') {
      renderTrapExercise(exerciseArea, exercise.data, () => {});
    } else if (exercise.type === 'scratch') {
      renderScratchExercise(exerciseArea, exercise.data, canonical, () => {});
    } else {
      exerciseArea.innerHTML = '<div style="text-align: center; color: #999;">No exercise available</div>';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // FUNCTION SORT EXERCISE — Concept Check (Drag & Drop Categories)
  // ═══════════════════════════════════════════════════════════════
  
  function renderFunctionSortExercise(container, exerciseData, instruction) {
    if (!exerciseData) {
      container.innerHTML = '<div style="text-align: center; color: #999;">No exercise data available</div>';
      return;
    }

    const sentence = exerciseData.sentence || '';
    const options = exerciseData.options || [];
    const successMsg = exerciseData.success_msg || 'Correct!';
    const failMsg = exerciseData.fail_msg || 'Try again.';

    container.innerHTML = `
      <div style="text-align: center;">
        <!-- Instruction -->
        <div style="
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          padding: 12px;
          background: #f5f5f5;
          border-radius: 8px;
        ">${instruction || 'Categorize this sentence:'}</div>
        
        <!-- Target Sentence -->
        <div style="
          padding: 20px 24px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 18px;
          font-weight: 600;
          color: #1565c0;
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
        ">"${sentence}"</div>
        
        <!-- Options -->
        <div id="function-sort-options" style="
          display: flex;
          flex-direction: column;
          gap: 12px;
        ">
          ${options.map((opt, i) => `
            <button class="sort-option" data-value="${opt.value}" data-correct="${opt.correct}" style="
              padding: 16px 24px;
              background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
              border: 2px solid #ddd;
              border-radius: 12px;
              font-size: 15px;
              cursor: pointer;
              transition: all 0.2s;
              text-align: left;
            " onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#ddd'">
              ${opt.label}
            </button>
          `).join('')}
        </div>
        
        <!-- Feedback -->
        <div id="sort-feedback" style="margin-top: 24px;"></div>
      </div>
    `;

    // Add click handlers
    container.querySelectorAll('.sort-option').forEach(btn => {
      btn.onclick = () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedbackDiv = document.getElementById('sort-feedback');
        
        // Disable all buttons
        container.querySelectorAll('.sort-option').forEach(b => {
          b.style.pointerEvents = 'none';
          if (b.dataset.correct === 'true') {
            b.style.background = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
            b.style.borderColor = '#4caf50';
          }
        });
        
        if (isCorrect) {
          btn.style.background = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
          btn.style.borderColor = '#4caf50';
          feedbackDiv.innerHTML = `
            <div style="
              padding: 16px;
              background: #e8f5e9;
              border-radius: 8px;
              color: #2e7d32;
              font-weight: 600;
            ">✓ ${successMsg}</div>
          `;
        } else {
          btn.style.background = 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)';
          btn.style.borderColor = '#f44336';
          feedbackDiv.innerHTML = `
            <div style="
              padding: 16px;
              background: #ffebee;
              border-radius: 8px;
              color: #c62828;
            ">✗ ${failMsg}</div>
          `;
        }
      };
    });
  }

  // Chunk-preserving jumble exercise
  function renderChunkJumbleExercise(container, chunks, correctAnswer) {
    // Shuffle chunks
    const shuffled = [...chunks].sort(() => Math.random() - 0.5);
    let selectedChunks = [];
    
    container.innerHTML = `
      <div style="text-align: center;">
        <!-- Drop zone -->
        <div id="jumble-answer" style="
          min-height: 60px;
          padding: 16px;
          background: #f5f5f5;
          border: 2px dashed #ccc;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          align-items: center;
        ">
          <span style="color: #999;">Tap chunks to build the sentence</span>
        </div>
        
        <!-- Chunk options -->
        <div id="jumble-options" style="
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        ">
          ${shuffled.map((chunk, i) => `
            <button class="jumble-chunk" data-chunk="${chunk}" data-index="${i}" style="
              padding: 14px 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
              transition: all 0.2s;
            ">${chunk}</button>
          `).join('')}
        </div>
        
        <!-- Feedback -->
        <div id="jumble-feedback" style="margin-top: 24px;"></div>
      </div>
    `;
    
    // Add click handlers
    container.querySelectorAll('.jumble-chunk').forEach(btn => {
      btn.onclick = () => {
        const chunk = btn.dataset.chunk;
        selectedChunks.push(chunk);
        btn.style.opacity = '0.3';
        btn.style.pointerEvents = 'none';
        
        updateJumbleAnswer();
      };
    });
    
    function updateJumbleAnswer() {
      const answerDiv = document.getElementById('jumble-answer');
      const feedbackDiv = document.getElementById('jumble-feedback');
      
      answerDiv.innerHTML = selectedChunks.map((chunk, i) => `
        <span style="
          padding: 10px 16px;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        " onclick="window.removeJumbleChunk(${i})">${chunk}</span>
      `).join('');
      
      // Check if complete
      if (selectedChunks.length === chunks.length) {
        const userAnswer = selectedChunks.join(' ');
        const isCorrect = userAnswer.toLowerCase().replace(/[.,!?]/g, '') === 
                          correctAnswer.toLowerCase().replace(/[.,!?]/g, '');
        
        if (isCorrect) {
          feedbackDiv.innerHTML = `
            <div style="
              padding: 16px;
              background: #e8f5e9;
              border-radius: 8px;
              color: #2e7d32;
              font-weight: 600;
            ">✓ Correct! Well done!</div>
          `;
          answerDiv.style.background = '#e8f5e9';
          answerDiv.style.borderColor = '#4caf50';
        } else {
          feedbackDiv.innerHTML = `
            <div style="
              padding: 16px;
              background: #ffebee;
              border-radius: 8px;
              color: #c62828;
            ">✗ Try again. Correct: <strong>${correctAnswer}</strong></div>
          `;
        }
      }
    }
    
    window.removeJumbleChunk = function(index) {
      const removed = selectedChunks.splice(index, 1)[0];
      
      // Re-enable the button
      container.querySelectorAll('.jumble-chunk').forEach(btn => {
        if (btn.dataset.chunk === removed && btn.style.opacity === '0.3') {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        }
      });
      
      updateJumbleAnswer();
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE 4: PRODUCTION (Final Challenge with Trap Detection)
  // ═══════════════════════════════════════════════════════════════
  
  function renderProductionStage(container, slide) {
    const prod = slide.production || currentCard?.production || {};
    const trap = prod.trap || null;
    const onSuccess = prod.on_success || null;
    const acceptedAnswers = prod.accepted_answers || [prod.en_target];
    
    container.innerHTML = `
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      ">
        <div style="font-size: 14px; color: #888; margin-bottom: 20px; font-weight: 600;">
          🎯 PRODUCTION
        </div>
        
        <!-- Uzbek Prompt -->
        <div style="
          padding: 20px 24px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          max-width: 400px;
          width: 100%;
        ">
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">Say in English:</div>
          <div style="font-size: 18px; color: #0d47a1; font-weight: 600;">${prod.uz_prompt || ''}</div>
        </div>
        
        <!-- Input Area -->
        <div style="width: 100%; max-width: 400px; margin-bottom: 16px;">
          <input type="text" id="production-input" placeholder="Type your answer here..." style="
            width: 100%;
            padding: 16px 20px;
            border: 2px solid #ddd;
            border-radius: 12px;
            font-size: 16px;
            outline: none;
            transition: all 0.2s;
          " onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#ddd'" />
        </div>
        
        <!-- Check Button -->
        <button id="production-check-btn" style="
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          transition: all 0.2s;
          margin-bottom: 16px;
        ">Check Answer</button>
        
        <!-- Feedback Area -->
        <div id="production-feedback" style="max-width: 400px; width: 100%;"></div>
        
        <!-- Reveal Answer (hidden initially) -->
        <div id="production-reveal" style="
          padding: 16px 24px;
          background: #f5f5f5;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
          margin-top: 16px;
          display: none;
        ">
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">Model Answer:</div>
          <div style="font-size: 18px; color: #2e7d32; font-weight: 700;">${prod.en_target || ''}</div>
        </div>
      </div>
    `;
    
    // Handle answer checking
    const inputEl = document.getElementById('production-input');
    const checkBtn = document.getElementById('production-check-btn');
    const feedbackDiv = document.getElementById('production-feedback');
    const revealDiv = document.getElementById('production-reveal');
    
    checkBtn.onclick = () => {
      const userAnswer = (inputEl.value || '').trim().toLowerCase().replace(/[.,!?]/g, '');
      const targetNormalized = (prod.en_target || '').toLowerCase().replace(/[.,!?]/g, '');
      
      // Check for trap first
      if (trap && trap.trigger) {
        const trapNormalized = trap.trigger.toLowerCase().replace(/[.,!?]/g, '');
        if (userAnswer.includes(trapNormalized) || userAnswer === trapNormalized) {
          feedbackDiv.innerHTML = `
            <div style="
              padding: 16px;
              background: #fff3cd;
              border-left: 4px solid #ff9800;
              border-radius: 8px;
              color: #856404;
              text-align: left;
            ">
              <strong>🪤 Trap Detected!</strong><br>
              ${trap.message || 'Check your answer carefully.'}
            </div>
          `;
          inputEl.style.borderColor = '#ff9800';
          inputEl.style.background = '#fff3cd';
          return;
        }
      }
      
      // Check against accepted answers
      const isCorrect = acceptedAnswers.some(ans => 
        userAnswer === ans.toLowerCase().replace(/[.,!?]/g, '')
      ) || userAnswer === targetNormalized;
      
      if (isCorrect) {
        feedbackDiv.innerHTML = `
          <div style="
            padding: 16px;
            background: #e8f5e9;
            border-radius: 8px;
            color: #2e7d32;
            font-weight: 600;
          ">✓ Correct! Well done!</div>
        `;
        inputEl.style.borderColor = '#4caf50';
        inputEl.style.background = '#e8f5e9';
        inputEl.disabled = true;
        checkBtn.style.display = 'none';
        
        // Trigger bubble unlock if configured
        if (onSuccess && onSuccess.unlock_bubble) {
          triggerBubbleUnlock(onSuccess.dialogue_id, onSuccess.line_index);
          
          // Show visual feedback for dialogue unlock
          const unlockNotice = document.createElement('div');
          unlockNotice.style.cssText = 'margin-top:12px;padding:12px 16px;background:linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%);border-radius:10px;border-left:4px solid #4caf50;animation:modalSlideIn 0.3s ease-out;';
          unlockNotice.innerHTML = `
            <div style="font-size:13px;font-weight:600;color:#2e7d32;">🔓 Dialogue Line Unlocked!</div>
            <div style="font-size:12px;color:#558b2f;margin-top:4px;">${currentCard?.dialogue_ref?.speaker || ''}: "${currentCard?.dialogue_ref?.bubble_text || ''}"</div>
          `;
          feedbackDiv.after(unlockNotice);
        }
      } else {
        feedbackDiv.innerHTML = `
          <div style="
            padding: 16px;
            background: #ffebee;
            border-radius: 8px;
            color: #c62828;
          ">✗ Not quite. Try again or reveal the answer.</div>
        `;
        inputEl.style.borderColor = '#f44336';
        inputEl.style.background = '#ffebee';
        revealDiv.style.display = 'block';
        
        setTimeout(() => {
          inputEl.style.borderColor = '#ddd';
          inputEl.style.background = '#fff';
        }, 2000);
      }
    };
    
    // Allow Enter key to submit
    inputEl.onkeypress = (e) => {
      if (e.key === 'Enter') {
        checkBtn.click();
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // DIALOGUE BUBBLE UNLOCK — Triggers when card is completed
  // ═══════════════════════════════════════════════════════════════
  
  function triggerBubbleUnlock(dialogueId, lineIndex) {
    console.log(`🔓 BUBBLE UNLOCK: Dialogue ${dialogueId}, Line ${lineIndex}`);
    
    // Dispatch custom event for the app to handle
    const event = new CustomEvent('vocabBubbleUnlock', {
      detail: {
        dialogue_id: dialogueId,
        line_index: lineIndex,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
    
    // Store unlock in localStorage for persistence
    try {
      const unlockKey = 'unlockedBubbles';
      const existing = JSON.parse(localStorage.getItem(unlockKey) || '[]');
      const unlockId = `${dialogueId}_${lineIndex}`;
      if (!existing.includes(unlockId)) {
        existing.push(unlockId);
        localStorage.setItem(unlockKey, JSON.stringify(existing));
      }
    } catch (e) {
      console.warn('Could not persist bubble unlock:', e);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LEGACY MODAL CONTENT BUILDER (Keeping for backward compatibility)
  // ═══════════════════════════════════════════════════════════════
  
  function renderModalContent(modal, card, vocabId, isCompleted, hasSlidesFormat) {
    const productionPrompt = (card.slides && card.slides[0]?.practice?.context_question) || (card.production?.uz_prompt ?? '');

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 16px;
        max-width: 640px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 16px 16px 0 0;
          position: relative;
        ">
          <button onclick="window.closeVocabModal()" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
          
          <div style="font-size: 32px; font-weight: 700; margin-bottom: 8px;">${card.en}</div>
          <div style="font-size: 14px; opacity: 0.9;">${card.id}${card.is_chunk ? ' <span style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:12px;font-size:11px;margin-left:8px;">CHUNK</span>' : ''}</div>
          ${isCompleted ? '<div style="margin-top: 12px; display: inline-block; padding: 6px 12px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 13px;">✓ Completed</div>' : ''}
        </div>

        <!-- Tabs -->
        <div style="
          display: flex;
          border-bottom: 2px solid #f0f0f0;
          background: #fafafa;
        ">
          <button class="vocab-tab" data-tab="context" style="
            flex: 1;
            padding: 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
          ">📖 Context</button>
          
          <button class="vocab-tab" data-tab="practice" style="
            flex: 1;
            padding: 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
          ">💪 Practice</button>
          
          <button class="vocab-tab" data-tab="produce" style="
            flex: 1;
            padding: 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
          ">🎯 Produce</button>
        </div>

        <!-- Tab Contents -->
        <div style="padding: 24px;">
          
          <!-- ═══════════ CONTEXT TAB ═══════════ -->
          <div class="vocab-tab-content" data-panel="context" style="display: none;">
            ${card.image ? `
              <div style="margin-bottom: 20px; text-align: center;">
                <img src="${card.image}" style="
                  max-width: 100%; 
                  max-height: 240px; 
                  border-radius: 12px; 
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  object-fit: cover;
                " alt="${card.en}">
              </div>
            ` : ''}
            <div style="margin-bottom: 20px;">
              <div style="font-size: 14px; color: #666; margin-bottom: 8px; font-weight: 600;">Uzbek Context</div>
              <div id="context-uzbek" style="font-size: 16px; color: #333; line-height: 1.6;"></div>
            </div>
          </div>

          <!-- ═══════════ PRACTICE TAB (CAROUSEL) ═══════════ -->
          <div class="vocab-tab-content" data-panel="practice" style="display: none;">
            <div id="carousel-container"></div>
          </div>

          <!-- ═══════════ PRODUCE TAB ═══════════ -->
          <div class="vocab-tab-content" data-panel="produce" style="display: none;">
            ${card.production ? `
              <div style="margin-bottom: 24px;">
                <div style="font-size: 14px; color: #666; margin-bottom: 8px; font-weight: 600;">Uzbek Prompt</div>
                <div style="
                  padding: 16px;
                  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                  border-radius: 8px;
                  font-size: 16px;
                  color: #333;
                  margin-bottom: 16px;
                ">${productionPrompt}</div>
              </div>

              <div>
                <div style="font-size: 14px; color: #666; margin-bottom: 8px; font-weight: 600;">English Target</div>
                <div id="production-reveal" style="
                  padding: 16px;
                  background: #e8f5e9;
                  border-radius: 8px;
                  font-size: 16px;
                  color: #333;
                  position: relative;
                  overflow: hidden;
                ">
                  <div id="production-overlay" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                  " onclick="this.style.opacity='0'; this.style.pointerEvents='none';">
                    <span style="
                      background: white;
                      padding: 12px 24px;
                      border-radius: 24px;
                      font-size: 14px;
                      font-weight: 600;
                      color: #333;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    ">👁️ Click to reveal</span>
                  </div>
                  ${card.production.en_target}
                </div>
              </div>
            ` : '<div style="color: #999; text-align: center; padding: 40px;">No production exercise available</div>'}
          </div>
        </div>

        <!-- Footer -->
        <div style="
          padding: 20px 24px;
          border-top: 2px solid #f0f0f0;
          display: flex;
          gap: 12px;
        ">
          <button onclick="window.markVocabComplete('${vocabId}')" style="
            flex: 1;
            padding: 14px;
            background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
            transition: all 0.2s;
          ">${isCompleted ? '✓ Completed' : '✓ Mark Complete'}</button>
          
          <button onclick="window.closeVocabModal()" style="
            padding: 14px 24px;
            background: #f5f5f5;
            color: #666;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          ">Close</button>
        </div>
      </div>
    `;

    // ───────────────────────────────────────────────────────────────
    // Event Listeners
    // ───────────────────────────────────────────────────────────────
    
    modal.querySelectorAll('.vocab-tab').forEach(btn => {
      btn.onclick = () => activateTab(btn.dataset.tab);
    });

    // Render the carousel for the Practice tab
    if (Array.isArray(card.slides) && card.slides.length > 0) {
      renderCarouselSlide();
    } else {
      // Legacy fallback
      renderLegacyPractice(card);
    }

    // Initial context tab content for slides[]
    if (Array.isArray(card.slides) && card.slides.length > 0) {
      updateContextTab();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CAROUSEL SLIDE RENDERER — Handles both legacy and phase-based formats
  // ═══════════════════════════════════════════════════════════════
  
  function renderCarouselSlide() {
    const container = document.getElementById('carousel-container');
    if (!container || !currentCard || !Array.isArray(currentCard.slides)) return;

    const slides = currentCard.slides;
    const slide = slides[currentSlideIndex];
    const totalSlides = slides.length;
    const isLastSlide = currentSlideIndex >= totalSlides - 1;

    exerciseCompleted = false;

    // Detect format: phase-based (new) vs combined (legacy)
    const isPhaseFormat = slide.phase !== undefined;

    // Progress bar and indicator
    let progressHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 20px;
      ">
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        ">${isPhaseFormat ? getPhaseLabel(slide.phase, slide) : `Part ${currentSlideIndex + 1}`} / ${totalSlides}</div>
        <div style="display: flex; gap: 6px;">
          ${slides.map((s, i) => `
            <div style="
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: ${i < currentSlideIndex ? '#4caf50' : i === currentSlideIndex ? '#667eea' : '#ddd'};
              transition: all 0.3s;
            "></div>
          `).join('')}
        </div>
      </div>
    `;

    // Render based on format
    if (isPhaseFormat) {
      renderPhaseBasedSlide(container, slide, progressHTML, isLastSlide);
    } else {
      renderLegacySlide(container, slide, progressHTML, isLastSlide);
    }

    // Update context tab
    updateContextTab();
  }

  // Get friendly label for phase (and slide for 4-Act)
  function getPhaseLabel(phase, slide) {
    if (slide?.type === 'concept_check') return '🧠 Concept Check';
    if (slide?.type === 'drill_list') return '💬 Drill';
    switch (phase) {
      case 'presentation': return '📖 Context';
      case 'practice': return '💪 Practice';
      case 'production': return '🎯 Produce';
      default: return phase;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE-BASED SLIDE RENDERER (New U04+ format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderPhaseBasedSlide(container, slide, progressHTML, isLastSlide) {
    const phase = slide.phase;
    const pres = slide.presentation || {};

    if (phase === 'presentation') {
      // PRESENTATION — Polarity (U04 4-Act) or uz_context list
      const uzPolarQ = pres.uz_polar_question;
      const uzMirror = pres.uz_mirror_answer;
      const hybridAnswer = pres.hybrid_answer;
      const enCanonical = slide.reproduction?.en_canonical || '';
      const uzContext = pres.uz_context || [];

      if (uzPolarQ || uzMirror) {
        // 4-Act polarity + flip card (readable, visible)
        container.innerHTML = `
          ${progressHTML}
          <div class="vocab-act vocab-act-presentation">
            <div class="vocab-act-label">📖 Context</div>
            <div class="vocab-polar-question">❓ ${uzPolarQ || ''}</div>
            <div class="vocab-polar-answer">✓ ${uzMirror || ''}</div>
            <div id="flip-card-container" class="vocab-flip-container">
              <div id="flip-card" class="vocab-flip-card" onclick="this.classList.toggle('flipped')">
                <div class="vocab-flip-front">${renderChunks(hybridAnswer || '')}</div>
                <div class="vocab-flip-back">${enCanonical || ''}</div>
              </div>
            </div>
            <p class="vocab-act-hint">👆 Tap the card to flip</p>
          </div>
          <div id="nav-button-area" style="text-align: center;"></div>
        `;
      } else if (uzContext.length > 0) {
        container.innerHTML = `
          ${progressHTML}
          <div class="vocab-act vocab-act-presentation">
            <div class="vocab-act-label">📖 When & Why to Use</div>
            <div class="vocab-context-list">
              ${uzContext.map(ctx => `<div class="vocab-context-item">• ${ctx}</div>`).join('')}
            </div>
          </div>
          <div id="nav-button-area" style="text-align: center;"></div>
        `;
      } else {
        container.innerHTML = `${progressHTML}<div id="nav-button-area" style="text-align: center;"></div>`;
      }
      showNavigationButton(isLastSlide, true);

    } else if (phase === 'practice') {
      // PRACTICE — concept_check (exercise only) or drill_list (en_examples + optional exercise)
      const practiceData = slide.practice || {};
      const enExamples = practiceData.en_examples || [];
      const exercise = practiceData.exercise;
      const isConceptCheck = slide.type === 'concept_check';
      const isDrillList = slide.type === 'drill_list';
      const answer = exercise?.data?.answer || exercise?.answer || '';

      const conceptInstruction = (exercise?.instruction || '').trim();
      const conceptSentence = exercise?.data?.sentence || exercise?.sentence || '';

      container.innerHTML = `
        ${progressHTML}
        ${isConceptCheck && (conceptInstruction || conceptSentence) ? `
        <div class="vocab-act vocab-act-concept-check">
          ${conceptInstruction ? `<div class="vocab-act-label">${conceptInstruction}</div>` : ''}
          ${conceptSentence ? `<div class="vocab-concept-sentence">${conceptSentence}</div>` : ''}
        </div>
        ` : ''}
        ${isDrillList && enExamples.length > 0 ? `
        <div class="vocab-act vocab-act-drill">
          <div class="vocab-act-label">💬 Example Sentences</div>
          ${enExamples.map((ex) => `
            <div class="vocab-drill-item" onclick="this.querySelector('.vocab-drill-reveal').classList.add('visible')">
              <div class="vocab-drill-en">${renderChunks(ex.sentence || '')}</div>
              <div class="vocab-drill-reveal">✓ ${(ex.sentence_uz != null ? ex.sentence_uz : ex.sentence) || ''}</div>
            </div>
          `).join('')}
          <p class="vocab-act-hint">👆 Tap each row to reveal Uzbek / check</p>
        </div>
        ` : ''}
        <div id="exercise-container" class="vocab-exercise-container"></div>
        <div id="nav-button-area" style="text-align: center;"></div>
      `;

      if (exercise) {
        renderPhaseExercise(exercise, answer, isLastSlide);
      } else {
        showNavigationButton(isLastSlide, true);
      }

    } else if (phase === 'production') {
      // PRODUCTION — Prompt + model answer (4-Act Act 4)
      const production = slide.production || {};
      const modelAnswer = production.model_answer || production.en_target || '';

      container.innerHTML = `
        ${progressHTML}
        <div class="vocab-act vocab-act-production">
          <div class="vocab-act-label">🎯 Your Turn — Produce!</div>
          <div class="vocab-production-prompt">${production.uz_prompt || ''}</div>
          <div class="vocab-production-pattern"><strong>Pattern:</strong> ${production.en_target || ''}</div>
          <div class="vocab-act-label">✅ Model Answer</div>
          <div id="model-answer-reveal" class="vocab-model-reveal">
            <div id="model-answer-overlay" class="vocab-model-overlay">
              <span>👁️ Click to reveal model answer</span>
            </div>
            <div class="vocab-model-text">${modelAnswer}</div>
          </div>
        </div>
        <div id="nav-button-area" style="text-align: center; margin-top: 20px;"></div>
      `;

      const overlay = document.getElementById('model-answer-overlay');
      if (overlay) {
        overlay.onclick = () => {
          overlay.classList.add('revealed');
          exerciseCompleted = true;
          showNavigationButton(isLastSlide, true);
        };
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // U02 SLOT-SUBSTITUTION PRACTICE RENDERER
  // ═══════════════════════════════════════════════════════════════
  
  function renderSlotSubstitutionPractice(practice) {
    if (!practice.en_examples || !Array.isArray(practice.en_examples)) return '';
    
    const examplesHTML = practice.en_examples.map((ex, idx) => {
      // Render sentence with **highlighted** parts
      const sentence = (ex.sentence || '').replace(/\*\*(.+?)\*\*/g, '<span style="background: #ffe082; padding: 2px 6px; border-radius: 4px; font-weight: 600;">$1</span>');
      return `<div style="
        padding: 10px 14px;
        background: ${idx === 0 ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' : '#fff'};
        border: 1px solid ${idx === 0 ? '#4caf50' : '#e0e0e0'};
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 15px;
        color: #333;
      ">${sentence}</div>`;
    }).join('');
    
    return `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 13px; color: #888; margin-bottom: 8px;">
          <span style="font-weight: 600;">🔀 Slot:</span> 
          <span style="background: #e3f2fd; padding: 3px 8px; border-radius: 4px; font-weight: 500;">${practice.slot}</span>
          <span style="margin-left: 10px; font-weight: 600;">Anchor:</span> 
          <span style="color: #2196f3;">"${practice.anchor}"</span>
        </div>
        ${examplesHTML}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // U02 TENSE TOGGLE PRACTICE RENDERER
  // ═══════════════════════════════════════════════════════════════
  
  function renderTenseTogglePractice(practice) {
    if (!practice.simple_form || !practice.continuous_form) return '';
    
    const examplesHTML = (practice.examples || []).map(ex => {
      return `<div style="
        display: flex;
        gap: 10px;
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin-bottom: 6px;
        font-size: 14px;
      ">
        <span style="background: #ffecb3; padding: 2px 8px; border-radius: 4px; font-weight: 500; min-width: 80px;">${ex.trigger || ex.sentence?.split(':')[0] || ''}</span>
        <span style="color: #333;">${ex.response || ex.sentence?.split(':')[1] || ''}</span>
      </div>`;
    }).join('');
    
    return `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 13px; color: #888; margin-bottom: 8px; font-weight: 600;">
          ⚡ Tense Toggle: <span style="background: #ffeb3b; padding: 2px 8px; border-radius: 4px;">${practice.toggle_trigger}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
          <div style="
            padding: 12px;
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 8px;
            text-align: center;
          ">
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">Simple</div>
            <div style="font-size: 14px; font-weight: 600; color: #0d47a1;">${practice.simple_form}</div>
          </div>
          <div style="
            padding: 12px;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border-radius: 8px;
            text-align: center;
          ">
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">Continuous</div>
            <div style="font-size: 14px; font-weight: 600; color: #e65100;">${practice.continuous_form}</div>
          </div>
        </div>
        
        ${examplesHTML}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // LEGACY SLIDE RENDERER (Old U01-U03 format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderLegacySlide(container, slide, progressHTML, isLastSlide) {
    // Detect U02 polarity format vs U04 context format
    const isPolarity = slide.presentation?.uz_polar_question && slide.presentation?.uz_mirror_answer;
    const hasSlotSubstitution = slide.practice?.anchor && slide.practice?.slot && slide.practice?.en_examples;
    const hasTenseToggle = slide.practice?.toggle_trigger && slide.practice?.simple_form && slide.practice?.continuous_form;
    
    // U02 Polarity Format
    if (isPolarity) {
      container.innerHTML = `
        ${progressHTML}

        <!-- U02 Polarity Presentation -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 13px; color: #888; margin-bottom: 6px; font-weight: 600;">📝 Polarity Question</div>
          
          <!-- Wrong assumption (polar question) -->
          <div style="
            padding: 14px 18px;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
            border-left: 4px solid #ef5350;
            border-radius: 8px;
            margin-bottom: 12px;
            font-size: 16px;
            color: #b71c1c;
          ">❓ ${slide.presentation.uz_polar_question}</div>
          
          <!-- Correction answer -->
          <div style="
            padding: 14px 18px;
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            border-left: 4px solid #4caf50;
            border-radius: 8px;
            font-size: 16px;
            color: #1b5e20;
            font-weight: 600;
          ">✓ ${slide.presentation.uz_mirror_answer}</div>
        </div>

        ${hasSlotSubstitution ? renderSlotSubstitutionPractice(slide.practice) : ''}
        ${hasTenseToggle ? renderTenseTogglePractice(slide.practice) : ''}

        <!-- Exercise Area -->
        <div id="exercise-container" style="
          min-height: 180px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 12px;
          margin-bottom: 16px;
        "></div>

        <!-- Navigation Button Area -->
        <div id="nav-button-area" style="text-align: center;"></div>
      `;
    } else {
      // U04 Context Format (original)
      container.innerHTML = `
        ${progressHTML}

        <!-- Uzbek Context for this slide -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 14px; color: #666; margin-bottom: 4px; font-weight: 600;">Uzbek Context</div>
          <div style="font-size: 16px; color: #333; line-height: 1.6;">
            ${(slide.presentation?.uz_context || []).map(ctx => `<div style="margin-bottom: 8px;">• ${ctx}</div>`).join('')}
          </div>
        </div>

        <!-- Context Question -->
        ${slide.practice?.context_question ? `
          <div style="
            padding: 14px;
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 4px solid #2196f3;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 15px;
            color: #0d47a1;
            font-weight: 600;
          ">${slide.practice.context_question}</div>
        ` : ''}

        <!-- Hybrid Bridge (Flip Card) -->
        <div id="flip-card-container" style="
          perspective: 1000px;
          min-height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        ">
          <div id="flip-card" style="
            position: relative;
            width: 100%;
            height: 160px;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            cursor: pointer;
          " onclick="this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)'">
            <!-- Front: Hybrid Bridge -->
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
              border-radius: 12px;
              padding: 24px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            ">
              <div style="font-size: 18px; line-height: 1.6; text-align: center; color: #333;">
                ${renderChunks(slide.practice?.hybrid_bridge || '')}
              </div>
            </div>
            <!-- Back: English Canonical -->
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              transform: rotateY(180deg);
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
              border-radius: 12px;
              padding: 24px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            ">
              <div style="font-size: 20px; font-weight: 600; text-align: center; color: #2e7d32;">
                ${slide.practice?.en_canonical || ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Exercise Area -->
        <div id="exercise-container" style="
          min-height: 180px;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 12px;
        margin-bottom: 16px;
      "></div>

      <!-- Navigation Button Area -->
      <div id="nav-button-area" style="text-align: center;"></div>
    `;
    }

    // Render the exercise for this slide (legacy format)
    renderCarouselExercise(slide.practice || {}, isLastSlide);
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE EXERCISE RENDERER (for new format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderPhaseExercise(exercise, correctAnswer, isLastSlide) {
    const exerciseContainer = document.getElementById('exercise-container');
    if (!exerciseContainer) return;

    const onComplete = () => {
      exerciseCompleted = true;
      showNavigationButton(isLastSlide, true);
    };

    const data = exercise.data || exercise;
    switch (exercise.type) {
      case 'jumble':
        renderJumbleExercise(exerciseContainer, data, correctAnswer, onComplete);
        break;
      case 'trap':
        renderTrapExercise(exerciseContainer, data, onComplete);
        break;
      case 'scratch':
        renderScratchExercise(exerciseContainer, data, correctAnswer, onComplete);
        break;
      case 'function_sort':
        renderFunctionSortExerciseLegacy(exerciseContainer, data, onComplete);
        break;
      default:
        exerciseContainer.innerHTML = `<div class="vocab-exercise-unknown">Unknown exercise type: ${exercise.type}</div>`;
        showNavigationButton(isLastSlide, true);
    }
  }

  // Legacy carousel version of function_sort (does NOT shadow the staged modal version)
  function renderFunctionSortExerciseLegacy(container, data, onComplete) {
    const options = data.options || [];
    const correctOption = options.find(o => o.correct);
    const successMsg = data.success_msg || 'Correct!';
    const failMsg = data.fail_msg || 'Try again.';

    container.innerHTML = `
      <div class="vocab-functionsort-options">
        ${options.map(opt => `
          <button type="button" class="vocab-functionsort-opt" data-value="${(opt.value || '').replace(/"/g, '&quot;')}">
            ${opt.label || opt.value || ''}
          </button>
        `).join('')}
      </div>
      <div id="functionsort-feedback" class="vocab-functionsort-feedback"></div>
    `;

    const feedbackEl = document.getElementById('functionsort-feedback');
    container.querySelectorAll('.vocab-functionsort-opt').forEach(btn => {
      btn.onclick = () => {
        const value = btn.dataset.value;
        const isCorrect = correctOption && value === correctOption.value;
        if (feedbackEl) {
          feedbackEl.innerHTML = isCorrect
            ? `<div class="vocab-feedback-correct">${successMsg}</div>`
            : `<div class="vocab-feedback-incorrect">${failMsg}</div>`;
          feedbackEl.classList.add('visible');
        }
        if (isCorrect && typeof onComplete === 'function') setTimeout(onComplete, 1200);
      };
    });
  }

  // Update the Context tab with the current slide's presentation
  function updateContextTab() {
    const contextDiv = document.getElementById('context-uzbek');
    if (!contextDiv || !currentCard || !Array.isArray(currentCard.slides)) return;
    const slide = currentCard.slides[currentSlideIndex];
    
    // Handle U02 polarity format
    if (slide.presentation?.uz_polar_question && slide.presentation?.uz_mirror_answer) {
      contextDiv.innerHTML = `
        <div style="margin-bottom: 12px;">
          <div style="font-size: 12px; color: #ef5350; margin-bottom: 4px;">❓ Polar Question:</div>
          <div style="margin-bottom: 8px; color: #333;">${slide.presentation.uz_polar_question}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: #4caf50; margin-bottom: 4px;">✓ Answer:</div>
          <div style="color: #1b5e20; font-weight: 500;">${slide.presentation.uz_mirror_answer}</div>
        </div>
      `;
    } else if (slide.phase === 'presentation' && slide.presentation?.uz_context) {
      // Handle phase-based format
      contextDiv.innerHTML = slide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">• ${ctx}</div>`).join('');
    } else if (slide.presentation?.uz_context) {
      // Legacy format
      contextDiv.innerHTML = slide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">• ${ctx}</div>`).join('');
    } else {
      // Find presentation slide in the array for phase-based format
      const presSlide = currentCard.slides.find(s => s.phase === 'presentation');
      if (presSlide?.presentation?.uz_context) {
        contextDiv.innerHTML = presSlide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">• ${ctx}</div>`).join('');
      } else if (presSlide?.presentation?.uz_polar_question) {
        contextDiv.innerHTML = `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; color: #ef5350; margin-bottom: 4px;">❓ Polar Question:</div>
            <div style="margin-bottom: 8px; color: #333;">${presSlide.presentation.uz_polar_question}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #4caf50; margin-bottom: 4px;">✓ Answer:</div>
            <div style="color: #1b5e20; font-weight: 500;">${presSlide.presentation.uz_mirror_answer || ''}</div>
          </div>
        `;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CAROUSEL EXERCISE RENDERER (Legacy format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderCarouselExercise(slideData, isLastSlide) {
    const exerciseContainer = document.getElementById('exercise-container');
    if (!exerciseContainer || !slideData.exercise) return;

    const exercise = slideData.exercise;
    const onComplete = () => {
      exerciseCompleted = true;
      showNavigationButton(isLastSlide, true);
    };

    switch (exercise.type) {
      case 'jumble':
        renderJumbleExercise(exerciseContainer, exercise.data, slideData.en_canonical, onComplete);
        break;
      case 'trap':
        renderTrapExercise(exerciseContainer, exercise.data, onComplete);
        break;
      case 'scratch':
        renderScratchExercise(exerciseContainer, exercise.data, slideData.en_canonical, onComplete);
        break;
      default:
        exerciseContainer.innerHTML = `<div style="color:#999; text-align:center;">Unknown exercise type: ${exercise.type}</div>`;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION BUTTON HANDLER — Updated for both formats
  // ═══════════════════════════════════════════════════════════════
  
  function showNavigationButton(isLastSlide, autoShow = false) {
    const navArea = document.getElementById('nav-button-area');
    if (!navArea) return;

    // For phase-based format, check if this is the last slide (personalization or production phase)
    const slidePhase = currentCard?.slides?.[currentSlideIndex]?.phase;
    const isFinalPhase = slidePhase === 'personalization' || slidePhase === 'production';

    if (isLastSlide || isFinalPhase) {
      // Show "Complete ✓" button on last slide
      navArea.innerHTML = `
        <button id="btn-complete-card" style="
          padding: 14px 32px;
          background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
          transition: all 0.2s;
          animation: pulseGlow 1.5s infinite;
        ">✓ Complete Card</button>
      `;
      const btn = document.getElementById('btn-complete-card');
      if (btn) {
        btn.onclick = () => {
          if (currentCard?.id) {
            window.markVocabComplete(currentCard.id);
          }
        };
      }
    } else {
      // Show "Next ➡" button
      navArea.innerHTML = `
        <button id="btn-next-slide" style="
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
          transition: all 0.2s;
        ">Next ➡</button>
      `;
      const btn = document.getElementById('btn-next-slide');
      if (btn) {
        btn.onclick = () => {
          currentSlideIndex++;
          renderCarouselSlide();
        };
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LEGACY PRACTICE RENDERER (for old data format)
  // ═══════════════════════════════════════════════════════════════
  
  function renderLegacyPractice(card) {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    container.innerHTML = `
      <div style="color: #666; text-align: center; padding: 20px;">
        <p>This card uses the legacy format.</p>
        <p>Data migration to carousel format pending.</p>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════
  
  window.openVocabCard = function(vocabId) {
    renderVocabModal(vocabId);
  };

  window.closeVocabModal = function() {
    const modal = document.getElementById('vocab-modal');
    if (modal) {
      modal.style.display = 'none';
    }
    // Refresh the vocab grid so tile badges/progress update
    if (typeof window.refreshVocabGrid === 'function') {
      window.refreshVocabGrid();
    }
  };

  window.markVocabComplete = function(vocabId) {
    completedCards.add(vocabId);
    saveProgress();
    
    // Trigger dialogue bubble unlock if card has dialogue_ref
    if (currentCard && currentCard.dialogue_ref) {
      triggerBubbleUnlock(
        currentCard.dialogue_ref.dialogue_id,
        currentCard.dialogue_ref.line_index
      );
      console.log('🔓 Auto-unlocked bubble on card complete:', currentCard.dialogue_ref);
    }
    
    renderVocabModal(vocabId);
  };

  // Compatibility shim for existing tile system
  window.VocabCardRenderer = {
    open: (id) => renderVocabModal(id),
    close: () => window.closeVocabModal(),
    isCompleted: (id) => completedCards.has(id),
    hasInteractiveData: (id) => !!findCard(id),

    /**
     * Count completed cards for a given lesson (or all lessons).
     * @param {string} [lessonId] - e.g. "U04_L01". Omit to count all.
     * @returns {number}
     */
    getCompletedCount: (lessonId) => {
      if (!lessonId) return completedCards.size;
      // Gather the IDs that belong to this lesson from all loaded unit data
      const unitNum = lessonId.split('_')[0]; // "U04"
      const unitKey = `VOCAB_CARDS_${unitNum}`;
      const unit = window[unitKey];
      if (!unit || !unit.lessons || !unit.lessons[lessonId]) return 0;
      const items = unit.lessons[lessonId].items || [];
      return items.filter(item => completedCards.has(item.id)).length;
    },

    /**
     * Check if every card in a lesson is completed.
     * @param {string} lessonId
     * @returns {boolean}
     */
    isLessonComplete: (lessonId) => {
      const unitNum = lessonId.split('_')[0];
      const unitKey = `VOCAB_CARDS_${unitNum}`;
      const unit = window[unitKey];
      if (!unit || !unit.lessons || !unit.lessons[lessonId]) return false;
      const items = unit.lessons[lessonId].items || [];
      return items.length > 0 && items.every(item => completedCards.has(item.id));
    },

    refreshVocabGrid: () => {
      if (typeof window.refreshVocabGrid === 'function') {
        window.refreshVocabGrid();
      }
    },

    getUnlockedBubbles: () => {
      try {
        return JSON.parse(localStorage.getItem('unlockedBubbles') || '[]');
      } catch (e) {
        return [];
      }
    },
    isBubbleUnlocked: (dialogueId, lineIndex) => {
      const unlocked = window.VocabCardRenderer.getUnlockedBubbles();
      return unlocked.includes(`${dialogueId}_${lineIndex}`);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // MODAL ANIMATION STYLES
  // ═══════════════════════════════════════════════════════════════
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes pulseGlow {
      0%, 100% {
        box-shadow: 0 4px 16px rgba(255, 111, 0, 0.4);
      }
      50% {
        box-shadow: 0 4px 24px rgba(255, 111, 0, 0.7);
      }
    }

    .vocab-tab:hover {
      background: #f0f0f0;
    }

    .vocab-tab.active {
      color: #667eea;
      border-bottom-color: #667eea !important;
      background: white;
    }

    .vocab-tab-content.active {
      display: block !important;
    }

    #vocab-modal button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    #vocab-modal button:active {
      transform: translateY(0);
    }

    .chunk-highlight {
      color: #667eea;
      font-weight: 700;
      font-size: 20px;
      display: inline-block;
    }

    .scratch-hide {
      filter: blur(7px);
      background: rgba(0,0,0,0.08);
      padding: 2px 4px;
      border-radius: 4px;
      transition: filter 0.3s, background 0.3s;
      display: inline-block;
    }

    .scratch-revealed {
      filter: none;
      background: #c8e6c9;
    }
  `;
  document.head.appendChild(style);

})();
