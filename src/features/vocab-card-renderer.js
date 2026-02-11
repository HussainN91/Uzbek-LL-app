// @ts-nocheck
/**
 * ═══════════════════════════════════════════════════════════════
 * VOCAB CARD RENDERER — ES Module (V3.2)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Proper ES module. Exports VocabCardRenderer and related functions.
 * Inline onclick handlers in dynamic HTML use a thin window.* bridge.
 * 
 * State, adapters, and exercises have been extracted to separate modules:
 *   - vocab-card-state.js  (progress, card lookup, carousel state, bubbles)
 *   - vocab-slide-adapters.js  (adaptMasterDocFormat, adapt4ActFormat)
 *   - vocab-exercises.js  (jumble, trap, scratch exercise renderers)
 * 
 * 6-STAGE FLOW (4+2 Act):
 *   📖 Presentation → 🧠 Concept Check → 🔍 Discovery → 🏋 Drill → ✍ Production → 🎯 Personalization
 * 
 * @module src/features/vocab-card-renderer
 * @version 4.0.0 - Dead code removed, CSS migration, bug fixes
 */

'use strict';

  // ═══════════════════════════════════════════════════════════════
  // IMPORTS FROM EXTRACTED MODULES
  // ═══════════════════════════════════════════════════════════════
  
  import {
    loadProgress, saveProgress, findCard,
    markCompleted, isCompleted, getCompletedCount, isLessonComplete,
    currentSlideIndex, currentCard, exerciseCompleted,
    setSlideIndex, setCurrentCard, setExerciseCompleted,
    triggerBubbleUnlock, getUnlockedBubbles, isBubbleUnlocked
  } from './vocab-card-state.js';
  
  import { adaptMasterDocFormat, adapt4ActFormat } from './vocab-slide-adapters.js';
  
  import {
    shuffleArray, renderChunks, renderScratchSentence,
    renderJumbleExercise, renderTrapExercise, renderScratchExercise
  } from './vocab-exercises.js';

  // Note: carousel state is now imported from vocab-card-state.js
  // Use setSlideIndex/setCurrentCard/setExerciseCompleted to mutate
  // Use currentSlideIndex/currentCard/exerciseCompleted to read
  // (they are live bindings from ES module exports)

  // (carousel state imported from vocab-card-state.js — see imports above)

  // ═══════════════════════════════════════════════════════════════
  // EXERCISES + ADAPTERS — imported from extracted modules:
  //   vocab-exercises.js (shuffleArray, renderChunks, renderScratchSentence,
  //                       renderJumbleExercise, renderTrapExercise, renderScratchExercise)
  //   vocab-slide-adapters.js (adaptMasterDocFormat, adapt4ActFormat)
  // ═══════════════════════════════════════════════════════════════

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
    setCurrentCard(card);
    setSlideIndex(0);
    setExerciseCompleted(false);

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
    
    const completed = isCompleted(vocabId);

    let modal = document.getElementById('vocab-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vocab-modal';
      document.body.appendChild(modal);

      modal.onclick = (e) => {
        if (e.target === modal) closeVocabModal();
      };
    }

    // Keyboard: Escape closes modal, arrow keys navigate stages
    if (!modal._keyHandler) {
      modal._keyHandler = (e) => {
        if (e.key === 'Escape') closeVocabModal();
        if (e.key === 'ArrowRight') goToNextStage();
        if (e.key === 'ArrowLeft') goToPrevStage();
      };
      document.addEventListener('keydown', modal._keyHandler);
    }

    // Build modal with staged navigation structure
    renderStagedModalContent(modal, card, vocabId, completed);
    
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
      <div id="vocab-card-modal">
        <!-- Header -->
        <div class="vc-header">
          <button class="vc-close-btn" onclick="window.closeVocabModal()">×</button>
          <div class="vc-header-row">
            <span class="vc-word">${card.en || card.word || ''}</span>
            ${(card.uz || card.uz_word) ? `<span class="vc-translation">— ${card.uz || card.uz_word}</span>` : ''}
          </div>
          <div class="vc-tags">
            ${card.pos ? `<span class="vc-tag">${card.pos}</span>` : ''}
            ${card.type ? `<span class="vc-tag">${card.type.replace(/_/g, ' ')}</span>` : ''}
            ${isCompleted ? '<span class="vc-tag vc-tag--done">Done</span>' : ''}
          </div>
        </div>

        <!-- Stage Progress Bar -->
        <div id="stage-progress">
          ${STAGES.map((stage, i) => {
            const icons = { presentation: '📖', concept_check: '🧠', discovery: '🔍', drill: '🏋', production: '✍', personalization: '🎯' };
            return `
            <div class="stage-dot${i === 0 ? ' stage-dot--active' : ''}" data-stage="${i}">${icons[stage] || ''}</div>
            ${i < STAGES.length - 1 ? '<div class="stage-connector"></div>' : ''}
            `;
          }).join('')}
        </div>

        <!-- Stage Label -->
        <div id="stage-label">Presentation</div>

        <!-- Stage Content Area -->
        <div id="stage-content"></div>

        <!-- Navigation Footer -->
        <div class="vc-nav-footer">
          <button id="btn-back" onclick="window.goToPrevStage()">← Back</button>
          <button id="btn-next" onclick="window.goToNextStage()">Continue →</button>
          <button id="btn-complete" onclick="window.markVocabComplete('${vocabId}')">✓ Complete Card</button>
        </div>
      </div>
    `;

    // Render first stage
    renderCurrentStage();
  }

  // Navigate between stages
  function goToNextStage() {
    if (currentStage < STAGES.length - 1) {
      currentStage++;
      renderCurrentStage();
    }
  }

  function goToPrevStage() {
    if (currentStage > 0) {
      currentStage--;
      renderCurrentStage();
    }
  }

  function renderCurrentStage() {
    if (!currentCard) return;
    
    const container = document.getElementById('stage-content');
    if (!container) return;

    const slides = currentCard.slides || [];
    const stageName = STAGES[currentStage];

    // Find the slide that matches the current stage name.
    // adapt4ActFormat orders slides to match STAGES:
    //   [presentation, concept_check, discovery, drill, production, personalization]
    const slide = slides[currentStage] || {};
    
    // Update progress dots
    const stageLabels = ['📖', '🧠', '🔍', '🏋', '✍', '🎯'];
    document.querySelectorAll('.stage-dot').forEach((dot, i) => {
      dot.classList.remove('stage-dot--active', 'stage-dot--completed');
      if (i === currentStage) {
        dot.classList.add('stage-dot--active');
      } else if (i < currentStage) {
        dot.classList.add('stage-dot--completed');
      }
    });

    // Update stage label
    const stageLabel = document.getElementById('stage-label');
    if (stageLabel) {
      const labels = { presentation: '📖 Presentation', concept_check: '🧠 Concept Check', discovery: '🔍 Discovery', drill: '🏋 Drill', production: '✍ Production', personalization: '🎯 Personalization' };
      stageLabel.textContent = labels[stageName] || stageName;
    }
    
    // Update navigation buttons
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnComplete = document.getElementById('btn-complete');
    const isLast = currentStage >= STAGES.length - 1;
    
    if (btnBack) btnBack.style.display = currentStage > 0 ? 'inline-flex' : 'none';
    if (btnNext) btnNext.style.display = !isLast ? 'inline-flex' : 'none';
    if (btnComplete) btnComplete.style.display = isLast ? 'inline-flex' : 'none';
    
    // Render the stage content
    function renderStageContent() {
      switch (stageName) {
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

    // Error boundary: catch render failures gracefully
    try {
      renderStageContent();
    } catch (err) {
      console.error(`Stage render error (${stageName}):`, err);
      container.innerHTML = `
        <div class="vc-stage-error">
          <div style="text-align:center;padding:40px 20px;color:#c62828;">
            <div style="font-size:32px;margin-bottom:12px;">⚠️</div>
            <div style="font-size:16px;font-weight:600;margin-bottom:8px;">Stage failed to load</div>
            <div style="font-size:13px;color:#999;">Try the next stage or close and reopen.</div>
          </div>
        </div>
      `;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE 1: PRESENTATION (Flip Card)
  // ═══════════════════════════════════════════════════════════════
  
  function renderPresentationStage(container, slide) {
    const pres = slide.presentation || {};
    const enCanonical = slide.reproduction?.en_canonical || pres.en_canonical || slide.production?.en_target || currentCard?.en || '';
    const polarQ = pres.uz_polar_question || '';
    const mirrorA = pres.uz_mirror_answer || '';
    const hybridA = pres.hybrid_answer || mirrorA;
    
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;align-items:center;">

        ${currentCard?.image ? `
        <img src="${currentCard.image}" alt="${currentCard.en || ''}" style="
          max-width: 100%;
          max-height: 120px;
          border-radius: 14px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          object-fit: contain;
        " onerror="this.parentElement.style.display='none'">
        ` : ''}

        ${polarQ ? `
        <!-- Polarity Question (Uzbek) -->
        <div style="
          width:100%;
          padding: 12px 16px;
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          border-left: 4px solid #ff9800;
          border-radius: 10px;
          font-size: 15px;
          color: #e65100;
          line-height: 1.45;
        ">❓ ${polarQ}</div>
        ` : ''}

        ${mirrorA ? `
        <!-- Mirror Answer (Uzbek correction) -->
        <div style="
          width:100%;
          padding: 12px 16px;
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          border-left: 4px solid #4caf50;
          border-radius: 10px;
          font-size: 15px;
          color: #2e7d32;
          font-weight: 600;
          line-height: 1.45;
        ">— ${mirrorA}</div>
        ` : ''}

        <!-- Flip Card: Hybrid — Full English -->
        <div class="vc-flip-container">
          <div class="vc-flip-card" id="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="vc-flip-front">
              <div class="vc-flip-label" style="color:#b8860b;">🔀 Hybrid Bridge</div>
              <div class="vc-flip-text" style="color:#333;">${renderHybridAnswer(hybridA)}</div>
              <div class="vc-flip-hint">↕ Tap to see full English</div>
            </div>
            <div class="vc-flip-back">
              <div class="vc-flip-label" style="color:#558b2f;">Full English</div>
              <div class="vc-flip-text" style="font-size:20px;font-weight:700;color:#2e7d32;">${enCanonical}</div>
              <div class="vc-flip-hint">↕ Tap to flip back</div>
            </div>
          </div>
        </div>

        ${renderSyntaxScaffold(slide)}
        ${renderGrammarTable(currentCard)}
        ${renderAudioButton(slide)}
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
        const negEntries = Object.entries(negative).map(([k, v]) => (typeof v === 'string' ? `${k} — ${v}` : '')).filter(Boolean).join('; ');
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#c62828;">Negative</td><td style="padding:8px 12px;">${negEntries}</td></tr>`;
      } else {
        const negEntries = Object.entries(negative).map(([k, v]) => `${k} — ${v}`).join(', ');
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
    const data = getDialogueForCard(card);
    if (!data) return '';
    const { dialogue, ref } = data;

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
            ${isUnlocked || isTarget ? `<div style="font-size: 11px; color: #888; margin-top: 3px; font-style: italic;">${line.line_uz || ''}</div>` : ''}
          </div>
          ${isTarget ? '<span style="font-size: 14px; padding-top: 6px;">🎯</span>' : (isUnlocked ? '<span style="font-size: 12px; padding-top: 6px; opacity: 0.5;">✅</span>' : '<span style="font-size: 12px; padding-top: 6px; opacity: 0.3;">🔒</span>')}
        </div>
      `;
    }).join('');

    return `
      <div style="margin-top: 16px;">
        <button id="dialogue-toggle-btn" onclick="(function(){
          var v = document.getElementById('dialogue-lines');
          var b = document.getElementById('dialogue-toggle-btn');
          if (v.style.display === 'none') { v.style.display = 'block'; b.textContent = '💬 ${dialogue.title || 'Dialogue'} — Hide'; }
          else { v.style.display = 'none'; b.textContent = '💬 ${dialogue.title || 'Dialogue'} — Show'; }
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
        ">💬 ${dialogue.title || 'Dialogue'} — Show</button>
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

  /**
   * Get dialogue and unit data for a card (shared lookup for viewer and takeover).
   * @param {Object} card - Card with id and optional dialogue_ref
   * @returns {{ dialogue: Object, ref: Object, unitKey: string }|null}
   */
  function getDialogueForCard(card) {
    const ref = card?.dialogue_ref;
    if (!ref || !ref.dialogue_id) return null;
    const unitPart = (card.id || '').match(/^V_(U\d+(?:_\d+)?)_/)?.[1];
    const unitKey = unitPart ? `VOCAB_CARDS_${unitPart}` : null;
    const unitData = unitKey ? window[unitKey] : null;
    const dialogue = unitData?.dialogues?.[ref.dialogue_id] || unitData?.getDialogue?.(ref.dialogue_id);
    if (!dialogue || !Array.isArray(dialogue.lines)) return null;
    return { dialogue, ref, unitKey };
  }

  /** Escape special regex chars and highlight target word in text (word-boundary match). */
  function highlightTargetWord(text, targetWord) {
    if (!text || !targetWord || typeof text !== 'string' || typeof targetWord !== 'string') return text;
    const escaped = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b(' + escaped + ')\\b', 'gi');
    return text.replace(re, '<span style="background: #fff59d; padding: 2px 6px; border-radius: 4px; font-weight: 700; color: #e65100;">$1</span>');
  }

  /**
   * Full-screen dialogue view that replaces the card after completion.
   * Card disappears; user sees the dialogue in context with the unlocked line highlighted.
   * Target word (card.en) is highlighted in the unlocked bubble.
   */
  function renderDialogueTakeoverView(card) {
    const data = getDialogueForCard(card);
    if (!data) return '';
    const { dialogue, ref } = data;
    const targetWord = card.en || card.word || '';

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
      const isJustUnlocked = idx === ref.line_index;
      const isLeft = idx % 2 === 0;
      const lineText = isJustUnlocked && targetWord ? highlightTargetWord(line.line, targetWord) : (line.line || '');
      const lineUzText = (line.line_uz || '');

      return `
        <div class="dialogue-takeover-line" data-just-unlocked="${isJustUnlocked}" style="
          display: flex;
          flex-direction: ${isLeft ? 'row' : 'row-reverse'};
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 14px;
        ">
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            color: white;
            background: ${isLeft ? 'linear-gradient(135deg, #5c6bc0 0%, #3949ab 100%)' : 'linear-gradient(135deg, #7e57c2 0%, #5e35b1 100%)'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          ">${(line.speaker || '?').charAt(0).toUpperCase()}</div>
          <div style="
            flex: 1;
            min-width: 0;
            padding: 14px 18px;
            border-radius: 16px;
            font-size: 15px;
            line-height: 1.5;
            ${isJustUnlocked
              ? 'background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border: 2px solid #43a047; box-shadow: 0 2px 12px rgba(67,160,71,0.25);'
              : 'background: #fff; border: 1px solid #e8e8e8; box-shadow: 0 1px 4px rgba(0,0,0,0.06);'}
            ${!isUnlocked ? 'filter: blur(4px); user-select: none; pointer-events: none;' : ''}
          ">
            ${isJustUnlocked ? '<div style="font-size: 11px; font-weight: 700; color: #2e7d32; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">— Just unlocked</div>' : ''}
            <div style="color: #1a1a1a; font-weight: ${isJustUnlocked ? 600 : 400};">${lineText}</div>
            ${(isUnlocked || isJustUnlocked) && lineUzText ? `<div style="font-size: 13px; color: #5c6bc0; margin-top: 8px; font-style: italic;">${lineUzText}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div style="
        background: #fafafa;
        border-radius: 20px;
        max-width: 560px;
        width: 95%;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
        overflow: hidden;
      ">
        <div style="
          background: linear-gradient(135deg, #5c6bc0 0%, #3949ab 100%);
          color: white;
          padding: 20px 24px;
          flex-shrink: 0;
          position: relative;
        ">
          <button onclick="window.closeVocabModal()" style="
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
          " onmouseenter="this.style.background='rgba(255,255,255,0.35)'" onmouseleave="this.style.background='rgba(255,255,255,0.2)'">&times;</button>
          <div style="font-size: 13px; opacity: 0.9; margin-bottom: 4px;">In context</div>
          <div style="font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">${dialogue.title || 'Dialogue'}</div>
          ${(dialogue.setting || dialogue.characters?.length) ? `<div style="font-size: 12px; opacity: 0.85; margin-top: 6px;">${dialogue.setting || ''}${dialogue.setting && dialogue.characters?.length ? ' • ' : ''}${(dialogue.characters || []).join(' & ')}</div>` : ''}
        </div>
        <div style="
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 24px;
          min-height: 260px;
          -webkit-overflow-scrolling: touch;
        ">
          ${linesHTML}
        </div>
        <div style="
          padding: 18px 24px;
          border-top: 1px solid #eee;
          background: white;
          flex-shrink: 0;
          border-radius: 0 0 20px 20px;
        ">
          <button onclick="window.closeVocabModal()" style="
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, #5c6bc0 0%, #3949ab 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(57,73,171,0.35);
            transition: transform 0.2s, box-shadow 0.2s;
          " onmouseenter="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(57,73,171,0.4)'" onmouseleave="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(57,73,171,0.35)'">Back</button>
        </div>
      </div>
    `;
  }

  /**
   * Replace the modal's card content with the dialogue takeover view.
   * Called after marking the card complete when the card has dialogue_ref.
   * Uses the overlay directly so the card always disappears regardless of inner structure.
   */
  function replaceModalWithDialogueView() {
    if (!currentCard?.dialogue_ref) return;
    const html = renderDialogueTakeoverView(currentCard);
    if (!html) return;
    const overlay = document.getElementById('vocab-modal');
    if (!overlay) return;
    overlay.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;width:100%;min-height:100%;padding:20px;box-sizing:border-box;">${html}</div>`;
    // Scroll the just-unlocked line into view
    requestAnimationFrame(() => {
      const justUnlocked = document.querySelector('.dialogue-takeover-line[data-just-unlocked="true"]');
      if (justUnlocked) justUnlocked.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
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

    // U07+ object format: { en_structure, uz_gloss, tokens: [{word, role, color}] }
    if (typeof scaffold === 'object' && scaffold.tokens) {
      const roleColors = {
        subject: '#1565c0',
        irregular_past: '#2e7d32',
        regular_past: '#2e7d32',
        auxiliary_past: '#2e7d32',
        base_verb: '#6a1b9a',
        negative_helper: '#c62828',
        question_helper: '#e65100',
        question_word: '#e65100',
        object: '#6a1b9a',
        destination: '#6a1b9a',
        location: '#6a1b9a',
        activity: '#6a1b9a',
        beneficiary: '#e65100',
        time_adverb: '#e65100',
      };

      const tokensHTML = scaffold.tokens.map(t => {
        const color = roleColors[t.role] || t.color || '#333';
        return `<span style="color:${color};font-weight:600;" title="${(t.role || '').replace(/_/g, ' ')}">${t.word}</span>`;
      }).join(' ');

      return `
        <div style="
          margin-top: 16px;
          padding: 14px 18px;
          background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
          border-left: 4px solid #5c6bc0;
          border-radius: 10px;
        ">
          <div style="font-size: 11px; font-weight: 700; color: #283593; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            🔀 Syntax Scaffold (Mirror Mode)
          </div>
          <div style="font-size: 15px; line-height: 1.5; margin-bottom: 6px;">
            ${tokensHTML}
          </div>
          ${scaffold.uz_gloss ? `<div style="font-size: 13px; color: #555; font-style: italic;">${scaffold.uz_gloss}</div>` : ''}
        </div>
      `;
    }

    // Legacy string format
    return `
      <div style="
        margin-top: 16px;
        padding: 14px 18px;
        background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
        border-left: 4px solid #5c6bc0;
        border-radius: 10px;
      ">
        <div style="font-size: 11px; font-weight: 700; color: #283593; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          🔀 Syntax Scaffold (Mirror Mode)
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

  // U07+ Grammar Discovery — pattern-based (no MCQ, shows grammar_token + rule)
  function renderGrammarDiscovery(container, slide) {
    const token = slide.grammar_token || '';
    const formFocus = slide.form_focus || '';
    const whyPrompt = slide.why_prompt || '';
    const explanationUz = slide.explanation_uz || '';
    const miniRule = slide.mini_rule || '';

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;justify-content:center;">
        <div style="font-size:14px;color:#888;margin-bottom:16px;font-weight:600;text-align:center;">
          🔍 DISCOVERY
        </div>

        <!-- Grammar Token -->
        <div style="
          padding:24px;
          background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);
          border-radius:16px;
          margin-bottom:20px;
          text-align:center;
          box-shadow:0 4px 12px rgba(25,118,210,0.15);
        ">
          <div style="font-size:28px;font-weight:700;color:#1565c0;letter-spacing:-0.5px;">${token}</div>
          ${formFocus ? `<div style="font-size:12px;color:#42a5f5;margin-top:6px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;">${formFocus.replace(/_/g, ' ')}</div>` : ''}
        </div>

        <!-- Why Prompt (Uzbek question) -->
        ${whyPrompt ? `
        <div style="
          padding:16px 20px;
          background:#fff3e0;
          border-left:4px solid #ff9800;
          border-radius:10px;
          margin-bottom:16px;
          font-size:15px;
          color:#e65100;
          font-weight:500;
          line-height:1.5;
        ">❓ ${whyPrompt}</div>
        ` : ''}

        <!-- Reveal Button + Explanation -->
        <div id="grammar-reveal-area">
          <button id="grammar-reveal-btn" style="
            width:100%;
            padding:14px 20px;
            background:linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%);
            border:2px solid #66bb6a;
            border-radius:12px;
            font-size:15px;
            cursor:pointer;
            font-weight:600;
            color:#2e7d32;
            transition:all 0.2s;
          ">👆 Tap to see the rule</button>
        </div>

        <div id="grammar-explanation" style="display:none;margin-top:16px;">
          <!-- Mini Rule Card -->
          ${miniRule ? `
          <div style="
            padding:16px 20px;
            background:linear-gradient(135deg,#e8eaf6 0%,#c5cae9 100%);
            border-left:4px solid #5c6bc0;
            border-radius:10px;
            margin-bottom:12px;
          ">
            <div style="font-size:11px;font-weight:700;color:#283593;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">📏 Rule</div>
            <div style="font-size:16px;color:#1a237e;font-weight:600;line-height:1.5;">${miniRule}</div>
          </div>
          ` : ''}

          <!-- Explanation in Uzbek -->
          ${explanationUz ? `
          <div style="
            padding:14px 18px;
            background:#f5f5f5;
            border-radius:10px;
            font-size:14px;
            color:#555;
            line-height:1.6;
          ">${explanationUz}</div>
          ` : ''}
        </div>
      </div>
    `;

    // Reveal button handler
    const revealBtn = container.querySelector('#grammar-reveal-btn');
    const explanationDiv = container.querySelector('#grammar-explanation');
    if (revealBtn && explanationDiv) {
      revealBtn.onclick = () => {
        explanationDiv.style.display = 'block';
        revealBtn.style.display = 'none';
      };
    }
  }

  function renderDiscoveryStage(container, slide) {
    // ── U07+ grammar pattern format (grammar_token, mini_rule, why_prompt) ──
    if (slide.grammar_token || slide.mini_rule) {
      return renderGrammarDiscovery(container, slide);
    }

    // ── Legacy format (sentence + highlight_tokens + MCQ options) ──
    const instruction = slide.instruction || 'Diqqat bilan qarang... (Look carefully...)';
    const sentence = slide.sentence || '';
    const highlightTokens = slide.highlight_tokens || [];
    const options = slide.options || [];
    const successMsg = slide.success_msg || 'To\'g\'ri! (Correct!)';
    const failMsg = slide.fail_msg || 'Qayta urinib ko\'ring. (Try again.)';

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
              color: #333;
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

    // Add click handlers
    container.querySelectorAll('.discovery-opt').forEach(btn => {
      btn.onclick = () => {
        const isCorrect = btn.dataset.correct === 'true';
        const feedbackDiv = document.getElementById('discovery-feedback');

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
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#e8f5e9;border-radius:8px;color:#2e7d32;font-weight:600;">— ${successMsg}</div>`;
          }
        } else {
          btn.style.background = 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)';
          btn.style.borderColor = '#f44336';
          if (feedbackDiv) {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#ffebee;border-radius:8px;color:#c62828;">— ${failMsg}</div>`;
          }
        }
      };
    });

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
          🎯 PERSONALIZATION
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
            box-sizing: border-box;
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
      if (focusPattern) {
        const re = buildRegex(focusPattern);
        if (re && re.test(trimmed)) return true;
      }
      if (acceptedPatterns.length > 0) {
        return acceptedPatterns.some(pat => {
          const re = buildRegex(pat);
          return re && re.test(trimmed);
        });
      }
      return trimmed.length > 2;
    };

    if (checkBtn) {
      checkBtn.onclick = () => {
        const text = (inputEl?.value || '').trim();
        const ok = flexibleCheck(text);
        if (feedbackDiv) {
          if (ok) {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#e8f5e9;border-radius:8px;color:#2e7d32;font-weight:600;">— ${successMsg}</div>`;
            if (inputEl) { inputEl.style.borderColor = '#4caf50'; inputEl.style.background = '#e8f5e9'; inputEl.disabled = true; }
            checkBtn.style.display = 'none';
          } else {
            feedbackDiv.innerHTML = `<div style="padding:16px;background:#ffebee;border-radius:8px;color:#c62828;">— ${failMsg}</div>`;
            if (inputEl) {
              inputEl.style.borderColor = '#f44336'; inputEl.style.background = '#ffebee';
              setTimeout(() => { inputEl.style.borderColor = '#ce93d8'; inputEl.style.background = '#fff'; }, 2000);
            }
          }
        }
      };
    }

    if (inputEl) {
      inputEl.onkeypress = (e) => { if (e.key === 'Enter' && checkBtn) checkBtn.click(); };
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STAGE 2: PRACTICE (Slot Substitution with Translation Practice)
  // First example in English, others in Uzbek with flip-to-reveal
  // ═══════════════════════════════════════════════════════════════
  
  function renderPracticeStage(container, slide) {
    const practice = slide.practice || {};
    const examples = practice.en_examples || [];
    
    if (examples.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;">No practice examples available for this stage.</div>';
      return;
    }

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="
          font-size:12px;color:#666;text-align:center;
          padding:8px 12px;background:#f5f5f5;border-radius:8px;
        ">Tap each card to reveal the English translation</div>
        <div id="practice-examples" style="display:flex;flex-direction:column;gap:10px;"></div>
      </div>
    `;
    
    const examplesContainer = document.getElementById('practice-examples');
    if (!examplesContainer) return;
    
    examples.forEach((ex, idx) => {
      let sentence = ex.sentence || '';
      // Highlight focus_word
      if (ex.focus_word && sentence.includes(ex.focus_word)) {
        sentence = sentence.replace(
          new RegExp('\\b(' + ex.focus_word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'gi'),
          '<span style="background:#bbdefb;padding:1px 5px;border-radius:4px;font-weight:700;">$1</span>'
        );
      }
      sentence = sentence.replace(/\*\*(.+?)\*\*/g, '<span style="background:#bbdefb;padding:1px 5px;border-radius:4px;font-weight:600;">$1</span>');

      const isAnchor = ex.is_anchor === true;
      const uniqueId = 'flip-example-' + idx;
      
      if (isAnchor) {
        examplesContainer.innerHTML += `
          <div style="
            padding:14px 16px;
            background:linear-gradient(135deg,#e8f5e9,#c8e6c9);
            border:2px solid #66bb6a;
            border-radius:12px;
          ">
            <div style="font-size:11px;color:#2e7d32;margin-bottom:5px;font-weight:700;display:flex;align-items:center;gap:4px;">
              <span>⚓</span> ANCHOR${ex.speaker ? ' — ' + ex.speaker : ''}
            </div>
            <div style="font-size:16px;color:#1b5e20;line-height:1.4;">${sentence}</div>
            ${ex.sentence_uz ? `<div style="font-size:13px;color:#558b2f;margin-top:5px;font-style:italic;">${ex.sentence_uz}</div>` : ''}
          </div>
        `;
      } else {
        const uzSentence = ex.sentence_uz || '';
        examplesContainer.innerHTML += `
          <div id="${uniqueId}" style="
            padding:14px 16px;
            background:linear-gradient(135deg,#fff3e0,#ffe0b2);
            border:2px solid #ffb74d;
            border-radius:12px;
            cursor:pointer;
            transition:all 0.2s;
          " onclick="window.flipPracticeCard('${uniqueId}')">
            <div class="uz-side">
              <div style="font-size:11px;color:#e65100;margin-bottom:5px;font-weight:700;display:flex;align-items:center;gap:4px;">
                <span>👆</span> Tap to reveal English${ex.subject ? ` <span style="opacity:0.7">(${ex.subject})</span>` : ''}
              </div>
              <div style="font-size:16px;color:#333;line-height:1.4;">${uzSentence || '...'}</div>
            </div>
            <div class="en-side" style="display:none;">
              <div style="font-size:11px;color:#1565c0;margin-bottom:5px;font-weight:700;">🇬🇧 ENGLISH</div>
              <div style="font-size:16px;color:#0d47a1;line-height:1.4;">${sentence}</div>
              ${uzSentence ? `<div style="font-size:12px;color:#888;margin-top:4px;font-style:italic;">${uzSentence}</div>` : ''}
            </div>
          </div>
        `;
      }
    });
  }
  
  // Flip practice card handler
  function flipPracticeCard(cardId) {
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
  }

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
          📝 EXERCISE — ${exerciseLabel}
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
              color: #333;
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
            ">— ${successMsg}</div>
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
            ">— ${failMsg}</div>
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
              background: #5a67d8;
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
        const idx = btn.dataset.index;
        selectedChunks.push({ text: chunk, srcIndex: idx });
        btn.style.opacity = '0.3';
        btn.style.pointerEvents = 'none';
        
        updateJumbleAnswer();
      };
    });
    
    function updateJumbleAnswer() {
      const answerDiv = document.getElementById('jumble-answer');
      const feedbackDiv = document.getElementById('jumble-feedback');
      
      answerDiv.innerHTML = selectedChunks.map((item, i) => `
        <span style="
          padding: 10px 16px;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        " onclick="window.removeJumbleChunk(${i})">${item.text}</span>
      `).join('');
      
      // Check if complete
      if (selectedChunks.length === chunks.length) {
        const userAnswer = selectedChunks.map(c => c.text).join(' ');
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
            ">— Correct! Well done!</div>
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
            ">— Try again. Correct: <strong>${correctAnswer}</strong></div>
          `;
        }
      }
    }
    
    window.removeJumbleChunk = function(index) {
      const removed = selectedChunks.splice(index, 1)[0];
      
      // Re-enable the source button by matching data-index (handles duplicate words)
      const srcBtn = container.querySelector(`.jumble-chunk[data-index="${removed.srcIndex}"]`);
      if (srcBtn) {
        srcBtn.style.opacity = '1';
        srcBtn.style.pointerEvents = 'auto';
      }
      
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
          ✏️ PRODUCTION
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
            box-sizing: border-box;
          " onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#ddd'" />
        </div>
        
        <!-- Check Button -->
        <button id="production-check-btn" style="
          padding: 14px 32px;
          background: #5a67d8;
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
              <strong>⚠️ Trap Detected!</strong><br>
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
          ">— Correct! Well done!</div>
        `;
        inputEl.style.borderColor = '#4caf50';
        inputEl.style.background = '#e8f5e9';
        inputEl.disabled = true;
        checkBtn.style.display = 'none';
        
        // Trigger bubble unlock if configured
        if (onSuccess && onSuccess.unlock_bubble) {
          triggerBubbleUnlock(onSuccess.dialogue_id, onSuccess.line_index);
          if (window.currentSandwichLesson?.version === '2.5') {
            window.dispatchEvent(new CustomEvent('sandwichLineMastered'));
          }
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
          ">— Not quite. Try again or reveal the answer.</div>
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
  // MODULE-INTERNAL API FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  function closeVocabModal() {
    const modal = document.getElementById('vocab-modal');
    if (modal) {
      modal.style.display = 'none';
    }
    if (window._sandwichSessionActive && Array.isArray(window._sandwichLineQueue) && window._sandwichLineQueueIndex != null) {
      window._sandwichLineQueueIndex++;
      if (window._sandwichLineQueueIndex < window._sandwichLineQueue.length) {
        renderVocabModal(window._sandwichLineQueue[window._sandwichLineQueueIndex]);
        return;
      }
      window._sandwichLineQueue = null;
      window._sandwichLineQueueIndex = null;
    }
    if (window._sandwichSessionActive) {
      window._sandwichSessionActive = false;
      if (window.currentSandwichLesson && typeof window.renderSandwichDialogueTile === 'function') {
        window.renderSandwichDialogueTile(window.currentSandwichLesson);
      }
    } else if (typeof window.refreshVocabGrid === 'function') {
      window.refreshVocabGrid();
    }
  }

  function markVocabComplete(vocabId) {
    markCompleted(vocabId);
    saveProgress();
    
    // Trigger dialogue bubble unlock if card has dialogue_ref
    if (currentCard && currentCard.dialogue_ref) {
      triggerBubbleUnlock(
        currentCard.dialogue_ref.dialogue_id,
        currentCard.dialogue_ref.line_index
      );
      if (window.__DEV_AUDIT__) console.log('🔓 Auto-unlocked bubble on card complete:', currentCard.dialogue_ref);
      // If Sandwich line queue has more cards for this line, open next
      if (Array.isArray(window._sandwichLineQueue) && window._sandwichLineQueueIndex != null) {
        window._sandwichLineQueueIndex++;
        if (window._sandwichLineQueueIndex < window._sandwichLineQueue.length) {
          renderVocabModal(window._sandwichLineQueue[window._sandwichLineQueueIndex]);
          return;
        }
        window._sandwichLineQueue = null;
        window._sandwichLineQueueIndex = null;
      }
      // Replace card with dialogue-in-context view (card disappears, dialogue takes over)
      replaceModalWithDialogueView();
      if (window.currentSandwichLesson?.version === '2.5') {
        window.dispatchEvent(new CustomEvent('sandwichLineMastered'));
      }
      return;
    }
    // No dialogue_ref: close modal so user sees updated grid
    closeVocabModal();
  }

  // getUnlockedBubbles — imported from vocab-card-state.js (line 33)

  // ═══════════════════════════════════════════════════════════════
  // EXPORTED API
  // ═══════════════════════════════════════════════════════════════

  /**
   * Start a vocab session for a specific dialogue line (Sandwich 2.5).
   * If optionalCardIds is provided, use it as the queue and open the first (back-to-back in one modal).
   * Otherwise find cards by dialogue_ref and open the first.
   * @param {string} dialogueId - e.g. "U02_L01_D01"
   * @param {number} lineIndex - 0-based line index
   * @param {string[]} [optionalCardIds] - Card ids from text match; when provided, used as queue for back-to-back display
   */
  function startSessionForLine(dialogueId, lineIndex, optionalCardIds) {
    if (Array.isArray(optionalCardIds) && optionalCardIds.length > 0) {
      window._sandwichLineQueue = optionalCardIds.slice();
      window._sandwichLineQueueIndex = 0;
      renderVocabModal(optionalCardIds[0]);
      return;
    }
    const lesson = window.currentSandwichLesson;
    if (!lesson?.lesson_id) return;
    const lessonId = lesson.lesson_id;
    const unitPart = lessonId.match(/^(U\d+(?:_\d+)?)/)?.[1];
    const unitKey = unitPart ? `VOCAB_CARDS_${unitPart}` : null;
    const unit = unitKey ? window[unitKey] : null;
    if (!unit?.lessons?.[lessonId]?.items) return;
    const items = unit.lessons[lessonId].items;
    const forLine = items.filter(item => {
      const ref = item.dialogue_ref;
      return ref && ref.dialogue_id === dialogueId && ref.line_index === lineIndex;
    });
    if (forLine.length === 0) return;
    window._sandwichLineQueue = forLine.map(item => item.id);
    window._sandwichLineQueueIndex = 0;
    renderVocabModal(forLine[0].id);
  }

  export const VocabCardRenderer = {
    open: (id) => renderVocabModal(id),
    close: () => closeVocabModal(),
    startSessionForLine,
    isCompleted: (id) => isCompleted(id),
    hasInteractiveData: (id) => !!findCard(id),

    /**
     * Count completed cards for a given lesson (or all lessons).
     * @param {string} [lessonId] - e.g. "U04_L01". Omit to count all.
     * @returns {number}
     */
    getCompletedCount: (lessonId) => getCompletedCount(lessonId),

    /**
     * Check if every card in a lesson is completed.
     * @param {string} lessonId
     * @returns {boolean}
     */
    isLessonComplete: (lessonId) => isLessonComplete(lessonId),

    refreshVocabGrid: () => {
      if (typeof window.refreshVocabGrid === 'function') {
        window.refreshVocabGrid();
      }
    },

    getUnlockedBubbles,
    isBubbleUnlocked: (dialogueId, lineIndex) => {
      const unlocked = getUnlockedBubbles();
      return unlocked.includes(`${dialogueId}_${lineIndex}`);
    }
  };

  export { renderVocabModal, closeVocabModal, markVocabComplete };

  // ═══════════════════════════════════════════════════════════════
  // WINDOW BRIDGE — only for onclick="" in dynamic HTML
  // ═══════════════════════════════════════════════════════════════
  window.closeVocabModal = closeVocabModal;
  window.goToNextStage = goToNextStage;
  window.goToPrevStage = goToPrevStage;
  window.markVocabComplete = markVocabComplete;
  window.flipPracticeCard = flipPracticeCard;
  // window.removeJumbleChunk is set inside renderJumbleExercise (closure-scoped)

  // ═══════════════════════════════════════════════════════════════
  // MODAL ANIMATION STYLES — now in vocab-card-styles.css
  // ═══════════════════════════════════════════════════════════════
