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
      uz_polar_question: getText(c, 'context_question') || c.uz_context_question,
      uz_mirror_answer: getText(c, 'mirror_answer') || c.uz_mirror_answer,
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
  // Match by BOTH type and phase — U07+ uses phase directly, older formats use type
  const conceptCheckSlide = slides.find(s => s.type === 'concept_check' || s.phase === 'concept_check');
  const discoverySlide = slides.find(s => s.type === 'discovery' || s.phase === 'discovery');
  const drillListSlide = slides.find(s => s.type === 'drill_list' || (s.phase === 'practice' && s.type === 'drill_list'));
  const productionSlides = slides.filter(s => s.phase === 'production');
  const productionSlide = productionSlides.find(s => s.type !== 'personalization' && s.phase !== 'personalization') || productionSlides[0];
  const personalizationSlide = slides.find(s => s.type === 'personalization' || s.phase === 'personalization');

  // ─── Slide 1: PRESENTATION ───────────────────────────────────
  // Handle syntax_scaffold as both string (legacy) and object (U07+)
  const rawScaffold = presentationSlide?.syntax_scaffold || null;
  const scaffoldValue = (rawScaffold && typeof rawScaffold === 'object')
    ? rawScaffold  // Keep as object for the renderer to parse
    : rawScaffold; // String or null

  const slidePresentation = {
    phase: 'presentation',
    presentation: {
      uz_polar_question: presentationSlide?.uz_context || '',
      ar_polar_question: presentationSlide?.ar_context || '',
      uz_mirror_answer: presentationSlide?.uz_mirror_answer || '',
      ar_mirror_answer: presentationSlide?.ar_mirror_answer || '',
      hybrid_answer: presentationSlide?.hybrid_answer || '',
      uz_context: []
    },
    reproduction: { en_canonical: presentationSlide?.en_canonical || '' },
    audio: presentationSlide?.audio || null,
    grammar_visual: presentationSlide?.grammar_visual || null,
    syntax_scaffold: scaffoldValue,
    ar_syntax_scaffold: presentationSlide?.ar_syntax_scaffold || null
  };

  // ─── Slide 2: CONCEPT CHECK ──────────────────────────────────
  // U07+ format: { phase: "concept_check", question_uz, choices: [{text, correct}] }
  // Legacy format: { type: "concept_check", exercise: { type: "function_sort", ... } }
  let conceptExercise = null;
  if (conceptCheckSlide) {
    if (conceptCheckSlide.exercise) {
      // Legacy format with exercise sub-object
      conceptExercise = {
        type: conceptCheckSlide.exercise.type,
        data: conceptCheckSlide.exercise,
        instruction: conceptCheckSlide.instruction || '',
        ar_instruction: conceptCheckSlide.ar_instruction || ''
      };
    } else if (conceptCheckSlide.choices || conceptCheckSlide.question_uz) {
      // U07+ format: convert question_uz + choices to function_sort exercise
      conceptExercise = {
        type: 'function_sort',
        data: {
          sentence: conceptCheckSlide.question_uz || '',
          options: (conceptCheckSlide.choices || []).map(c => ({
            label: c.text || '',
            value: c.text || '',
            correct: !!c.correct
          })),
          success_msg: conceptCheckSlide.success_msg || '',
          fail_msg: conceptCheckSlide.fail_msg || ''
        },
        instruction: conceptCheckSlide.question_uz || ''
      };
    }
  }

  const slideConceptCheck = {
    phase: 'practice',
    type: 'concept_check',
    practice: {
      en_examples: [],
      exercise: conceptExercise
    }
  };

  // ─── Slide 3: DISCOVERY ──────────────────────────────────────
  // U07+ format: { phase: "discovery", grammar_token, form_focus, why_prompt, explanation_uz, mini_rule }
  // Legacy format: { type: "discovery", sentence, highlight_tokens[], options[] }
  const slideDiscovery = {
    phase: 'practice',
    type: 'discovery',
    // Legacy fields
    instruction: discoverySlide?.instruction || discoverySlide?.why_prompt || '',
    ar_instruction: discoverySlide?.ar_instruction || '',
    sentence: discoverySlide?.sentence || '',
    highlight_tokens: discoverySlide?.highlight_tokens || [],
    options: discoverySlide?.options || [],
    success_msg: discoverySlide?.success_msg || '',
    ar_success_msg: discoverySlide?.ar_success_msg || '',
    fail_msg: discoverySlide?.fail_msg || '',
    ar_fail_msg: discoverySlide?.ar_fail_msg || '',
    // U07+ grammar pattern fields
    grammar_token: discoverySlide?.grammar_token || '',
    form_focus: discoverySlide?.form_focus || '',
    why_prompt: discoverySlide?.why_prompt || '',
    explanation_uz: discoverySlide?.explanation_uz || '',
    mini_rule: discoverySlide?.mini_rule || ''
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
        sentence_ar: ex.ar || '',
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
  // U07+ uses prompt_uz/model_sentence, legacy uses uz_prompt/model_answer
  const slideProduction = {
    phase: 'production',
    production: {
      uz_prompt: productionSlide?.uz_prompt || productionSlide?.prompt_uz || '',
      ar_prompt: productionSlide?.ar_prompt || '',
      en_target: productionSlide?.model_answer || productionSlide?.model_sentence || '',
      model_answer: productionSlide?.model_answer || productionSlide?.model_sentence || '',
      accepted_answers: productionSlide?.accepted_answers || [],
      hints: productionSlide?.hints || [],
      trap: productionSlide?.trap || null,
      on_success: productionSlide?.on_success || null
    }
  };

  // ─── Slide 6: PERSONALIZATION ────────────────────────────────
  // U07+ uses prompt_uz/model_frame/flexibleCheck, legacy uses uz_prompt/focus_pattern
  const slidePersonalization = {
    phase: 'production',
    type: 'personalization',
    uz_prompt: personalizationSlide?.uz_prompt || personalizationSlide?.prompt_uz || '',
    ar_prompt: personalizationSlide?.ar_prompt || '',
    focus_pattern: personalizationSlide?.focus_pattern || personalizationSlide?.model_frame || '',
    accepted_patterns: personalizationSlide?.accepted_patterns || personalizationSlide?.tags || [],
    on_success: personalizationSlide?.on_success || null,
    success_msg: personalizationSlide?.on_success?.message || 'Well done!',
    ar_success_msg: personalizationSlide?.on_success?.ar_message || '',
    fail_msg: 'Try using the target pattern in your answer.',
    flexibleCheck: personalizationSlide?.flexibleCheck || false,
    model_frame: personalizationSlide?.model_frame || ''
  };

  return {
    ...rawCard,
    slides: [slidePresentation, slideConceptCheck, slideDiscovery, slideDrill, slideProduction, slidePersonalization],
    production: slideProduction.production,
    dialogue_ref: rawCard.dialogue_ref || null,
    _is4Act: true
  };
}
