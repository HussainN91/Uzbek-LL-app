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
 *   ?— Presentation — ?— Concept Check — ?— Discovery — ?— Drill — ?— Production — ?— Personalization
 * 
 * @module src/features/vocab-card-renderer
 * @version 3.2.0 - Modularized (State + Adapters + Exercises extracted)
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

    renderStageContent();
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
        ">?? ${polarQ}</div>
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
        <div class="vocab-flip-container" style="
          perspective: 1000px;
          width: 100%;
          min-height: 130px;
          margin: 4px 0;
        ">
          <div class="vocab-flip-card" id="flip-card" onclick="this.classList.toggle('flipped')" style="
            position: relative;
            width: 100%;
            min-height: 130px;
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
            cursor: pointer;
          ">
            <!-- FRONT: Hybrid -->
            <div class="vocab-flip-front" style="
              position: absolute;
              width: 100%;
              min-height: 130px;
              backface-visibility: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 20px;
              border-radius: 14px;
              background: linear-gradient(135deg, #fff9c4, #fff59d);
              box-shadow: 0 4px 16px rgba(0,0,0,0.1);
              text-align: center;
            ">
              <div style="font-size: 17px;color:#333;line-height:1.5;">${renderHybridAnswer(hybridA)}</div>
              <div style="margin-top:14px;font-size:11px;color:#999;">?— Tap to see full English</div>
            </div>
            
            <!-- BACK: Full English -->
            <div class="vocab-flip-back" style="
              position: absolute;
              width: 100%;
              min-height: 130px;
              backface-visibility: hidden;
              transform: rotateY(180deg);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 20px;
              border-radius: 14px;
              background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
              box-shadow: 0 4px 16px rgba(0,0,0,0.1);
              text-align: center;
            ">
              <div style="font-size:11px;color:#558b2f;margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Full English</div>
              <div style="font-size:22px;font-weight:700;color:#2e7d32;line-height:1.35;">${enCanonical}</div>
              <div style="margin-top:14px;font-size:11px;color:#999;">?— Tap to flip back</div>
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
        <div style="font-size: 13px; font-weight: 600; color: #666; padding: 10px 14px; border-bottom: 1px solid #e0e0e0;">?— Grammar Reference</div>
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
          ${isTarget ? '<span style="font-size: 14px; padding-top: 6px;">????</span>' : (isUnlocked ? '<span style="font-size: 12px; padding-top: 6px; opacity: 0.5;">???</span>' : '<span style="font-size: 12px; padding-top: 6px; opacity: 0.3;">????</span>')}
        </div>
      `;
    }).join('');

    return `
      <div style="margin-top: 16px;">
        <button id="dialogue-toggle-btn" onclick="(function(){
          var v = document.getElementById('dialogue-lines');
          var b = document.getElementById('dialogue-toggle-btn');
          if (v.style.display === 'none') { v.style.display = 'block'; b.textContent = '?— ${dialogue.title || 'Dialogue'} — Hide'; }
          else { v.style.display = 'none'; b.textContent = '?— ${dialogue.title || 'Dialogue'} — Show'; }
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
        ">?— ${dialogue.title || 'Dialogue'} — Show</button>
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
            ?— Complete vocab cards to unlock more lines
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
          " onmouseenter="this.style.background='rgba(255,255,255,0.35)'" onmouseleave="this.style.background='rgba(255,255,255,0.2)'">??</button>
          <div style="font-size: 13px; opacity: 0.9; margin-bottom: 4px;">In context</div>
          <div style="font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">${dialogue.title || 'Dialogue'}</div>
          ${(dialogue.setting || dialogue.characters?.length) ? `<div style="font-size: 12px; opacity: 0.85; margin-top: 6px;">${dialogue.setting || ''}${dialogue.setting && dialogue.characters?.length ? ' ? ' : ''}${(dialogue.characters || []).join(' & ')}</div>` : ''}
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
        ">?— Play Audio</button>
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
          ?— Syntax Scaffold (Mirror Mode)
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
          ?— DISCOVERY
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
          ?— PERSONALIZATION
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
              <span>???</span> ANCHOR${ex.speaker ? ' — ' + ex.speaker : ''}
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
                <span>????????</span> Tap to reveal English${ex.subject ? ` <span style="opacity:0.7">(${ex.subject})</span>` : ''}
              </div>
              <div style="font-size:16px;color:#333;line-height:1.4;">${uzSentence || '...'}</div>
            </div>
            <div class="en-side" style="display:none;">
              <div style="font-size:11px;color:#1565c0;margin-bottom:5px;font-weight:700;">?????— ENGLISH</div>
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
          ?— EXERCISE — ${exerciseLabel}
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
          ?— PRODUCTION
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
              <strong>?— Trap Detected!</strong><br>
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
            <div style="font-size:13px;font-weight:600;color:#2e7d32;">?— Dialogue Line Unlocked!</div>
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

  // triggerBubbleUnlock — imported from vocab-card-state.js (line 33)

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
          background: #5a67d8;
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
          " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">??</button>
          
          <div style="font-size: 32px; font-weight: 700; margin-bottom: 8px;">${card.en}</div>
          <div style="font-size: 14px; opacity: 0.9;">${card.id}${card.is_chunk ? ' <span style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:12px;font-size:11px;margin-left:8px;">CHUNK</span>' : ''}</div>
          ${isCompleted ? '<div style="margin-top: 12px; display: inline-block; padding: 6px 12px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 13px;">— Completed</div>' : ''}
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
          ">?— Context</button>
          
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
          ">?— Practice</button>
          
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
          ">?— Produce</button>
        </div>

        <!-- Tab Contents -->
        <div style="padding: 24px;">
          
          <!-- —???????????????????????????— CONTEXT TAB —???????????????????????????— -->
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

          <!-- —???????????????????????????— PRACTICE TAB (CAROUSEL) —???????????????????????????— -->
          <div class="vocab-tab-content" data-panel="practice" style="display: none;">
            <div id="carousel-container"></div>
          </div>

          <!-- —???????????????????????????— PRODUCE TAB —???????????????????????????— -->
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
                    ">??— Click to reveal</span>
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
          ">${isCompleted ? '— Completed' : '— Mark Complete'}</button>
          
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

    // ═══════════════════════════════════════════════════════════════
    // Event Listeners
    // ═══════════════════════════════════════════════════════════════
    
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

    setExerciseCompleted(false);

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
          background: #5a67d8;
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
    if (slide?.type === 'concept_check') return '?— Concept Check';
    if (slide?.type === 'drill_list') return '?— Drill';
    switch (phase) {
      case 'presentation': return '?— Context';
      case 'practice': return '?— Practice';
      case 'exercise': return '?— Exercise';
      case 'production': return '?— Produce';
      case 'discovery': return '?— Discovery';
      case 'personalization': return '?— Personalization';
      default: return phase || 'Card';
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
            <div class="vocab-act-label">?— Context</div>
            <div class="vocab-polar-question">?? ${uzPolarQ || ''}</div>
            <div class="vocab-polar-answer">— ${uzMirror || ''}</div>
            <div id="flip-card-container" class="vocab-flip-container">
              <div id="flip-card" class="vocab-flip-card" onclick="this.classList.toggle('flipped')">
                <div class="vocab-flip-front">${renderChunks(hybridAnswer || '')}</div>
                <div class="vocab-flip-back">${enCanonical || ''}</div>
              </div>
            </div>
            <p class="vocab-act-hint">?— Tap the card to flip</p>
          </div>
          <div id="nav-button-area" style="text-align: center;"></div>
        `;
      } else if (uzContext.length > 0) {
        container.innerHTML = `
          ${progressHTML}
          <div class="vocab-act vocab-act-presentation">
            <div class="vocab-act-label">?— When & Why to Use</div>
            <div class="vocab-context-list">
              ${uzContext.map(ctx => `<div class="vocab-context-item">— ${ctx}</div>`).join('')}
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
          <div class="vocab-act-label">?— Example Sentences</div>
          ${enExamples.map((ex) => `
            <div class="vocab-drill-item" onclick="this.querySelector('.vocab-drill-reveal').classList.add('visible')">
              <div class="vocab-drill-en">${renderChunks(ex.sentence || '')}</div>
              <div class="vocab-drill-reveal">— ${(ex.sentence_uz != null ? ex.sentence_uz : ex.sentence) || ''}</div>
            </div>
          `).join('')}
          <p class="vocab-act-hint">?— Tap each row to reveal Uzbek / check</p>
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
          <div class="vocab-act-label">?— Your Turn — Produce!</div>
          <div class="vocab-production-prompt">${production.uz_prompt || ''}</div>
          <div class="vocab-production-pattern"><strong>Pattern:</strong> ${production.en_target || ''}</div>
          <div class="vocab-act-label">— Model Answer</div>
          <div id="model-answer-reveal" class="vocab-model-reveal">
            <div id="model-answer-overlay" class="vocab-model-overlay">
              <span>??— Click to reveal model answer</span>
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
          setExerciseCompleted(true);
          showNavigationButton(isLastSlide, true);
        };
      }
    } else if (phase === 'discovery') {
      const sentence = slide.sentence || slide.grammar_sentence || '';
      const grammarTokens = slide.grammar_tokens || slide.pattern ? [slide.pattern] : [];
      const question = slide.question || 'Why did the speaker use this form here?';
      const options = slide.options || [];
      const correctOption = options.find(o => o.correct);
      let sentenceHtml = escapeHtmlForSlide(sentence);
      grammarTokens.forEach(tok => {
        const esc = (tok || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('\\b(' + esc + ')\\b', 'gi');
        sentenceHtml = sentenceHtml.replace(re, '<span class="grammar-flood">$1</span>');
      });
      container.innerHTML = `
        ${progressHTML}
        <div class="vocab-act vocab-act-discovery">
          <div class="vocab-act-label">?— Look closely</div>
          <div class="vocab-discovery-sentence">${sentenceHtml}</div>
          <div class="vocab-act-label" style="margin-top:16px;">${question}</div>
          <div id="discovery-options" class="vocab-discovery-options"></div>
          <div id="discovery-feedback" class="vocab-discovery-feedback"></div>
        </div>
        <div id="nav-button-area" style="text-align: center;"></div>
      `;
      const optionsEl = document.getElementById('discovery-options');
      const feedbackEl = document.getElementById('discovery-feedback');
      if (optionsEl && options.length > 0) {
        options.forEach(opt => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'vocab-discovery-opt';
          btn.textContent = opt.label || opt.value || '';
          btn.dataset.value = opt.value || '';
          btn.onclick = () => {
            const correct = correctOption && opt.value === correctOption.value;
            if (feedbackEl) {
              feedbackEl.textContent = correct ? (slide.success_msg || 'Correct!') : (slide.fail_msg || 'Try again.');
              feedbackEl.className = 'vocab-discovery-feedback ' + (correct ? 'correct' : 'incorrect');
            }
            optionsEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
            if (correct && typeof showNavigationButton === 'function') {
              setExerciseCompleted(true);
              showNavigationButton(isLastSlide, true);
            }
          };
          optionsEl.appendChild(btn);
        });
      } else {
        showNavigationButton(isLastSlide, true);
      }
    } else if (phase === 'personalization') {
      const uzPrompt = slide.uz_prompt || slide.prompt || '';
      const focusWord = slide.focus_word || '';
      const focusPattern = slide.focus_pattern || slide.regex;
      let pattern = focusPattern;
      if (!pattern && focusWord) {
        const esc = (focusWord + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = new RegExp(esc.replace(/\s+/g, '\\s+'), 'i');
      } else if (typeof pattern === 'string' && pattern.startsWith('/')) {
        const match = pattern.match(/^\/(.*)\/(\w*)$/);
        pattern = match ? new RegExp(match[1], match[2] || 'i') : null;
      }
      container.innerHTML = `
        ${progressHTML}
        <div class="vocab-act vocab-act-personalization">
          <div class="vocab-act-label">?— Your turn</div>
          <div class="vocab-personalization-prompt">${escapeHtmlForSlide(uzPrompt)}</div>
          <input type="text" id="personalization-input" class="vocab-personalization-input" placeholder="Type in English..." style="width:100%;padding:12px;margin-top:12px;border-radius:8px;border:1px solid #ddd;font-size:15px;">
          <div id="personalization-feedback" class="vocab-personalization-feedback"></div>
          <button type="button" id="personalization-check" style="margin-top:12px;padding:10px 20px;border-radius:8px;background:#4caf50;color:white;border:none;cursor:pointer;">Check</button>
        </div>
        <div id="nav-button-area" style="text-align: center;"></div>
      `;
      const inputEl = document.getElementById('personalization-input');
      const feedbackEl = document.getElementById('personalization-feedback');
      const checkBtn = document.getElementById('personalization-check');
      if (inputEl && checkBtn) {
        const flexibleCheck = (text) => {
          if (!pattern) return text.trim().length > 0;
          if (pattern instanceof RegExp) return pattern.test((text || '').trim());
          return false;
        };
        checkBtn.onclick = () => {
          const text = (inputEl.value || '').trim();
          const ok = flexibleCheck(text);
          if (feedbackEl) {
            feedbackEl.textContent = ok ? (slide.success_msg || 'Correct!') : (slide.fail_msg || 'Try again.');
            feedbackEl.className = 'vocab-personalization-feedback ' + (ok ? 'correct' : 'incorrect');
          }
          if (ok) {
            setExerciseCompleted(true);
            showNavigationButton(isLastSlide, true);
          }
        };
      } else {
        showNavigationButton(isLastSlide, true);
      }
    }
  }

  function escapeHtmlForSlide(s) {
    if (typeof s !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
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
          <span style="font-weight: 600;">?— Slot:</span> 
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
          — Tense Toggle: <span style="background: #ffeb3b; padding: 2px 8px; border-radius: 4px;">${practice.toggle_trigger}</span>
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
          <div style="font-size: 13px; color: #888; margin-bottom: 6px; font-weight: 600;">?— Polarity Question</div>
          
          <!-- Wrong assumption (polar question) -->
          <div style="
            padding: 14px 18px;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
            border-left: 4px solid #ef5350;
            border-radius: 8px;
            margin-bottom: 12px;
            font-size: 16px;
            color: #b71c1c;
          ">?? ${slide.presentation.uz_polar_question}</div>
          
          <!-- Correction answer -->
          <div style="
            padding: 14px 18px;
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            border-left: 4px solid #4caf50;
            border-radius: 8px;
            font-size: 16px;
            color: #1b5e20;
            font-weight: 600;
          ">— ${slide.presentation.uz_mirror_answer}</div>
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
            ${(slide.presentation?.uz_context || []).map(ctx => `<div style="margin-bottom: 8px;">— ${ctx}</div>`).join('')}
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
      setExerciseCompleted(true);
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
          <div style="font-size: 12px; color: #ef5350; margin-bottom: 4px;">?? Polar Question:</div>
          <div style="margin-bottom: 8px; color: #333;">${slide.presentation.uz_polar_question}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: #4caf50; margin-bottom: 4px;">— Answer:</div>
          <div style="color: #1b5e20; font-weight: 500;">${slide.presentation.uz_mirror_answer}</div>
        </div>
      `;
    } else if (slide.phase === 'presentation' && slide.presentation?.uz_context) {
      // Handle phase-based format
      contextDiv.innerHTML = slide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">— ${ctx}</div>`).join('');
    } else if (slide.presentation?.uz_context) {
      // Legacy format
      contextDiv.innerHTML = slide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">— ${ctx}</div>`).join('');
    } else {
      // Find presentation slide in the array for phase-based format
      const presSlide = currentCard.slides.find(s => s.phase === 'presentation');
      if (presSlide?.presentation?.uz_context) {
        contextDiv.innerHTML = presSlide.presentation.uz_context.map(ctx => `<div style="margin-bottom: 8px;">— ${ctx}</div>`).join('');
      } else if (presSlide?.presentation?.uz_polar_question) {
        contextDiv.innerHTML = `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; color: #ef5350; margin-bottom: 4px;">?? Polar Question:</div>
            <div style="margin-bottom: 8px; color: #333;">${presSlide.presentation.uz_polar_question}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #4caf50; margin-bottom: 4px;">— Answer:</div>
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
      setExerciseCompleted(true);
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
      // Show "Complete —" button on last slide
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
        ">— Complete Card</button>
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
      // Show "Next —" button
      navArea.innerHTML = `
        <button id="btn-next-slide" style="
          padding: 14px 32px;
          background: #5a67d8;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
          transition: all 0.2s;
        ">Next —</button>
      `;
      const btn = document.getElementById('btn-next-slide');
      if (btn) {
        btn.onclick = () => {
          setSlideIndex(currentSlideIndex + 1);
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
      if (window.__DEV_AUDIT__) console.log('?— Auto-unlocked bubble on card complete:', currentCard.dialogue_ref);
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
