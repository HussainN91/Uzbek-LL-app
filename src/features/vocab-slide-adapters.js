/**
 * Vocab Slide Adapters
 * ====================
 * Pure transform functions that convert raw vocab card data
 * from various formats into the renderer-compatible slides format.
 * Extracted from vocab-card-renderer.js (Priority 3: Split renderer monolith).
 *
 * @module src/features/vocab-slide-adapters
 * @version 1.0.0
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// ADAPTER: Master Document Format → Slides Format
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
 *   slides: [{ phase: "presentation"|"concept_check"|"discovery"|"drill"|"production"|"personalization", ... }]
 *
 * @param {any} rawCard - Raw card data from vocab_cards_uXX data file
 * @returns {any} Card with slides[] array attached
 */
export function adaptMasterDocFormat(rawCard) {
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
        {
          sentence: c.anchor_sentence?.en || '',
          sentence_uz: c.uz_mirror_answer || ''
        },
        {
          sentence: c.example_2?.en || '',
          sentence_uz: c.example_2?.uz || ''
        },
        {
          sentence: c.example_3?.en || '',
          sentence_uz: c.example_3?.uz || ''
        }
      ].filter(ex => ex.sentence),

      exercise: exercises[0] ? {
        type: exercises[0].type,
        data: exercises[0].type === 'jumble'
          ? exercises[0].words
          : exercises[0].hidden || []
      } : null
    }
  }];

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
// ADAPTER: 4+2 Act Format → Renderer Format
// ═══════════════════════════════════════════════════════════════

/**
 * Detects and adapts the 4-Act / 4+2 Act format to renderer-compatible structure.
 *
 * 4+2 Act Format Detection:
 *   - Has slides[] array
 *   - slides[0].uz_context exists
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
 *
 * @param {any} rawCard - Raw card data
 * @returns {any} Card adapted to renderer format
 */
export function adapt4ActFormat(rawCard) {
  const slides = rawCard.slides;
  const hasSlides = Array.isArray(slides) && slides.length >= 4;
  const firstSlide = hasSlides ? slides[0] : null;
  const hasPresentation = firstSlide && (firstSlide.uz_context != null || firstSlide.phase === 'presentation');
  const is4Act = hasSlides && (hasPresentation || rawCard.dialogue_ref);

  if (!is4Act) {
    return rawCard;
  }

  const presentationSlide = slides.find(s => s.phase === 'presentation') || firstSlide;
  const conceptCheckSlide = slides.find(s => s.type === 'concept_check');
  const discoverySlide = slides.find(s => s.type === 'discovery');
  const drillListSlide = slides.find(s => s.type === 'drill_list');
  const productionSlides = slides.filter(s => s.phase === 'production');
  const productionSlide = productionSlides.find(s => s.type !== 'personalization') || productionSlides[0];
  const personalizationSlide = slides.find(s => s.type === 'personalization');

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
