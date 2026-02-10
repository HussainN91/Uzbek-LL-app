/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CANONICAL DATA TEMPLATE — VOCAB CARDS MODULE SCHEMA
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * SOURCE OF TRUTH: Extracted from vocab_cards_u04_4act.js (the template unit)
 * ALIGNED WITH: Master_Document.md (February 2026) — ALL CONSTRAINTS + RULES
 *
 * PURPOSE: This file is THE reference for building every unit (U01–U10).
 *          Every vocab card JS file MUST structurally match this template.
 *          When in doubt, check this file first, then Master_Document.md.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * MASTER DOCUMENT CONSTRAINT ALIGNMENT:
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │ CONSTRAINT 1 → 100% Core vocab in dialogues (no missing items)          │
 * │ CONSTRAINT 2 → Anchor sentence = EXACT sentence from dialogue           │
 * │ CONSTRAINT 3 → Target grammar in (+), (-), (?) in dialogues             │
 * │ CONSTRAINT 4 → Recycling via dialogues; AI-balanced (least-used 20%)    │
 * │ CONSTRAINT 5 → 6 elements per card (uz_context, mirror, hybrid,         │
 * │                anchor, example_2, example_3)                            │
 * │ RULE D7      → Every dialogue line has line_uz                          │
 * │ RULE E1      → uz_context = polarity/friction (wrong assumption)        │
 * │ RULE R2      → Progressive recycling from all prior units               │
 * │ RULE R3      → No recycled_parts/new_vocab annotations in vocab cards   │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * THE 4+2 ACT SLIDE STRUCTURE (maps to CONSTRAINT 5):
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │ Act 1: PRESENTATION  → (1) uz_context Q, (2) uz_mirror_answer,         │
 * │                         (3) hybrid_answer, en_canonical, syntax_scaffold │
 * │ Act 2: CONCEPT CHECK  → implicit grammar via function_sort exercise     │
 * │ DISCOVERY (NEW)       → grammar token highlighting + "Why this form?"   │
 * │ Act 3: DRILL LIST     → (4) Anchor (exact from dialogue),              │
 * │                         (5) Example 2, (6) Example 3                   │
 * │ Act 4: PRODUCTION     → uz_prompt → input → trap → bubble unlock       │
 * │ PERSONALIZATION (NEW) → open-ended personal response + flexibleCheck   │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * MISSION FLOW MODEL (3×2 SUCCESSIVE MASTERY CYCLE):
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │ Stage 1 (L01): AFFIRMATIVE  → Dialogue 1 + 1.1 + Contrastive Turn     │
 * │ Stage 2 (L02): NEGATIVE     → Dialogue 2 + 2.1 + Contrastive Turn     │
 * │ Stage 3 (L03): INTERROGATIVE→ Dialogue 3 + 3.1 + Contrastive Turn     │
 * │ Mirror Mode: Available in Stages 1-2, DISABLED in Stage 3              │
 * │ Mastery Peak (3.1): 100% English, no scaffolding                       │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * RECYCLING PHILOSOPHY:
 *   Recycling is IMPLICIT — embedded in dialogue lines as natural speech.
 *   Vocab card examples teach TARGET vocabulary ONLY (no annotations).
 *   The recycling registry is metadata for the AI to track obligations.
 *
 * @version 1.0.0 — Canonical template
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: TOP-LEVEL MODULE STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════════

const TEMPLATE_SCHEMA = {

  // ─── 1A: Unit Metadata (REQUIRED) ──────────────────────────────────────────
  unit_id: "UXX",                    // String. Format: "U01", "U01_5", "U02", ... "U10"
  unit_title: "",                     // String. Human-readable title
  scalability_level: 0,               // Number. 1-5, from Master Doc Scalability Template
  grammar_focus: "",                  // String. Primary grammar target for the unit

  // ─── 1B: Recycling Registry (REQUIRED — Rule R2) ──────────────────────────
  // Lists what MUST be recycled from all prior units.
  // Recycling happens implicitly IN dialogues, not in vocab cards.
  recycling: {
    mandatory: {
      // One key per prior unit. Add from_u01, from_u01_5, from_u02, etc.
      // Only include units that precede the current unit.
      //
      // ⚠️  KEY NAMING: Use descriptive suffixes to avoid collisions:
      //     to_be_present vs to_be_past vs to_be_forms
      //     This allows units to distinguish recycled forms precisely.
      from_u01: {
        subject_pronouns: [],         // Array of strings
        to_be_present: [],            // Array: ["am", "is", "are", "isn't", "aren't"] 
        possessive_det: [],           // Array: ["my", "your", "his", "her", "our", "their"]
        question_words: [],           // Array: what, who (basic from U01)
        articles: [],                 // Array: ["a", "an", "the"]
        demonstratives: [],           // Array: ["this", "that"]
        family: [],                   // Array: family nouns (optional - if introduced in U01)
        identity: [],                 // Array: name, teacher, student (optional)
        greetings: []                 // Array: hello, nice, meet (optional)
      },
      from_u01_5: {
        possession: [],               // Array: ["have", "has", "don't have", "doesn't have"]
        existence: [],                 // Array: ["there is", "there are", "there isn't", "there aren't"]
        wh_questions: [],              // Array: ["where", "how", "when", "why"]
        prepositions: [],              // Array: ["in", "on", "at"]
        addition: []                   // Array: ["too"]
      },
      // from_u02: { ... },
      // from_u03: { ... },
      // ... continue for each prior unit
    },
    ratio_target: { min: 0.60, max: 0.75 }  // CONSTRAINT 4: recycling ratio range
                                               // ⚠️  Some units use max: 0.70 - both are acceptable
  },

  // ─── 1C: Mission Metadata (REQUIRED — 3×2 Successive Mastery Cycle) ────
  // Defines the Triple-Dialogue Loop for this unit's Mission.
  // Maps L01→Stage 1 (Affirmative), L02→Stage 2 (Negative), L03→Stage 3 (Interrogative).
  mission: {
    mission_id: "UXX_M01",            // String. Format: "U02_M01", "U04_M01"
    flow_model: "sandwich",            // String. FIXED value — always "sandwich"
    target_vocab: [],                  // Array of strings. ALL 21-24 target items across 3 stages

    stages: [
      {
        stage: 1,                      // Number. Stage number (1, 2, or 3)
        form: "affirmative",           // String. "affirmative" | "negative" | "interrogative"
        target_vocab: [],              // Array. 7-8 new items for this stage
        dialogue_id: "UXX_L01_D01",    // String. Linked dialogue (Production Enforcement)
        pressure_id: "UXX_L01_D01_1",  // String. Same dialogue (Linguistic Pressure pass)
        mirror_mode: true              // Boolean. true for Stages 1-2, false for Stage 3
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: [],
        dialogue_id: "UXX_L02_D01",
        pressure_id: "UXX_L02_D01_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: [],
        dialogue_id: "UXX_L03_D01",
        pressure_id: "UXX_L03_D01_1",
        mirror_mode: false             // ⚠️ MUST be false for Stage 3 (RULE E11)
      }
    ],

    mastery_dialogue_id: "UXX_L03_D01_1"  // String. Final mastery dialogue (100% English)
  },

  // ─── 1D: Contrastive Turns (REQUIRED — Grammar Gap Solution) ───────────
  // Each stage MUST have a contrastive turn concluding its dialogue.
  // These replace explicit grammar rule teaching with discovery learning.
  contrastive_turns: [
    {
      stage: 1,                         // Number. Which stage this turn belongs to
      focus: "",                        // String. What contrast is being taught
                                        //   e.g., "plurality", "3rd_person_s", "tense", "negation"
      dialogue_id: "UXX_L01_D01",       // String. The dialogue this turn concludes

      speaker_a: {
        text: "",                       // String. Form A sentence (e.g., "Do you have a book?")
        speaker: ""                     // String. Character name
      },
      speaker_b: {
        text: "",                       // String. Form B sentence (e.g., "No, I have three books.")
        speaker: ""                     // String. Character name
      },

      // Discovery Popup highlight data (MANDATORY color scheme)
      highlights: [
        {
          blue: {                       // BLUE = Form A (base/singular/present)
            text: "",                   // String. The blue-highlighted text (e.g., "a")
            type: ""                    // String. Grammar type (e.g., "determiner", "base_verb")
          },
          red: {                        // RED = Form B (contrast/plural/past)
            text: "",                   // String. The red-highlighted text (e.g., "three")
            marker: "",                 // String. Optional. Specific suffix to highlight
                                        //   e.g., "s" in "books" — only the "s" gets red
            type: ""                    // String. Grammar type (e.g., "quantifier", "plural_noun")
          }
        }
        // ... additional highlight pairs as needed
      ]
    }
    // ... one contrastive turn per stage (3 total per mission)
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: DIALOGUES (CONSTRAINT 1, 2, 3, 4)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // CONSTRAINTS ENFORCED HERE:
  //   C1: Every core vocab item appears in at least one dialogue
  //   C2: Anchor sentences are pulled FROM these lines
  //   C3: (+), (-), (?) forms of target grammar present
  //   C4: Recycling balance tracked per dialogue
  //   D7: Every line has line_uz
  //
  // NAMING: "UXX_LYY_DZZ" where XX=unit, YY=lesson, ZZ=dialogue number
  //
  dialogues: {
    "UXX_LYY_DZZ": {
      // ─── Dialogue Metadata ─────────────────────────────────────────
      id: "UXX_LYY_DZZ",             // String. Must match the key
      title: "",                       // String. Descriptive title
      setting: "",                     // String. Where/when the dialogue happens
      characters: [],                  // Array of 2 character name strings

      // ─── Grammar Coverage (CONSTRAINT 3) ───────────────────────────
      // Target grammar MUST appear in all three polarity forms.
      grammar_coverage: {
        affirmative: [],               // Array of example sentences (min 2)
        negative: [],                  // Array of example sentences (min 1)
        question: []                   // Array of example sentences (min 1)
      },

      // ─── Recycling Balance (CONSTRAINT 4) ──────────────────────────
      // AI must scan prior dialogues, find bottom 20% least-used vocab,
      // and include min 3 words from that pool.
      recycling_balance: {
        least_used_included: [],       // Array: 3+ words from least-used 20%
        quota_met: true,               // Boolean: did we meet the min 3 quota?
        notes: ""                      // String: brief explanation
      },

      // ─── Dialogue Lines (RULE D7: line_uz required) ────────────────
      lines: [
        {
          speaker: "",                 // String. Character name
          line: "",                    // String. English dialogue line
          line_uz: "",                 // String. Uzbek translation (RULE D7 — MANDATORY)
          recycled: [],                // Array. Words recycled from prior units (metadata only)
          target: [],                  // Array. New target words introduced here (metadata only)
          mastery_key: ""              // String. "{dialogue_id}_{line_index}" — used by renderer
                                       //   to track mastered/unmastered state in localStorage.
                                       //   Renderer-consumed property, not content-creation concern.
        }
        // ... 8-12 lines per dialogue (RULE D1)
      ]
    }
    // ... additional dialogues as needed per RULE D0 (semantic clustering)
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // Each lesson groups cards by grammar target and links to source dialogues.
  //
  lessons: {
    "UXX_LYY": {
      // ─── Lesson Metadata ───────────────────────────────────────────
      lesson_id: "UXX_LYY",           // String. Must match the key
      title: "",                       // String. Lesson title
      grammar_target: "",              // String. What grammar this lesson teaches
      scalability_pattern: "",         // String. From Master Doc Scalability Template
      source_dialogues: [],            // Array of dialogue IDs this lesson draws from
      flow_model: "sandwich",          // String. "sandwich" — declares this lesson uses
                                       //   the 3×2 Successive Mastery Cycle.
      mastery_dialogue_id: "",         // String. Optional. Points to the dialogue used for
                                       //   Phase C mastery check (e.g., "UXX_L03_D01_1").

      // ─── Grammar Coverage Summary ─────────────────────────────────
      grammar_coverage: {
        affirmative: { required: 2, examples: [] },   // min 2 affirmative
        negative: { required: 1, examples: [] },      // min 1 negative
        question: { required: 1, examples: [] }       // min 1 question
      },

      // ─── Recycling Stats ──────────────────────────────────────────
      recycling_stats: {
        total_content_words: 0,        // Number. Total distinct content words in lesson
        recycled_words: 0,             // Number. Words from prior units
        new_words: 0,                  // Number. New target words
        ratio: 0.00,                   // Number. recycled / total (target: 0.60-0.75)
        status: ""                     // String. "✅ Within target" or "⚠️ explanation"
      },

      // ─── Vocab Cards (items array) ────────────────────────────────
      items: [
        // See SECTION 4 below for full card schema
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: VOCAB CARD SCHEMA (CONSTRAINT 5 — the core data object)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // Every card lives inside a lesson's `items` array.
  // Each card has exactly 6 slides (the 4+2 structure):
  //   Acts 1-4: presentation, concept_check, drill_list, production
  //   PLUS: discovery (after Act 2), personalization (after Act 4)
  //

  _CARD_SCHEMA: {
    // ─── Card Identity (ALL REQUIRED) ────────────────────────────────
    id: "V_UXX_LYY_word",             // String. Format: V_{unit}_{lesson}_{word}
    en: "",                            // String. English word/phrase
    uz: "",                            // String. Uzbek translation
    pos: "",                           // String. Part of speech (noun, verb, adjective, etc.)
    type: "",                          // String. Semantic type (action_verb, state_adjective, etc.)
    priority: 1,                       // Number. 1 = high (every unit), 2 = medium (every 2-3 units)
    category: "",                      // String. Grouping category
    introduced_in: "",                 // String. Unit where first taught (e.g., "U01", "U04_L01")
    image: "",                         // String. Path to image asset

    // ─── Grammar Table (OPTIONAL — for grammar cards only) ──────────
    // Include ONLY on cards that teach a grammar structure (e.g., was/were, have/has).
    // Provides paradigm data for the renderer to display a grammar summary.
    // ⚠️  This appears BOTH in grammar_table (card level) AND grammar_visual (slide level)
    grammar_table: {
      // Structure varies by grammar type. Examples:
      // For was/were:
      singular: { subjects: ["I", "he", "she", "it"], form: "was" },
      plural: { subjects: ["you", "we", "they"], form: "were" },
      negative: { was: "wasn't", were: "weren't" },
      question: { pattern: "Was/Were + subject + adjective?" }
      // For have/has:
      // have_subjects: ["I", "you", "we", "they"],
      // has_subjects: ["he", "she", "it"],
      // negative: { have: "don't have", has: "doesn't have" }
      // For wasn't/weren't:
      // wasn_t: { full: "was not", subjects: ["I", "he", "she", "it"] },
      // weren_t: { full: "were not", subjects: ["you", "we", "they"] }
    },

    // ─── Dialogue Reference (REQUIRED — CONSTRAINT 2) ───────────────
    // Links this card to the specific dialogue line that becomes the anchor.
    dialogue_ref: {
      dialogue_id: "",                 // String. Which dialogue this anchors to
      line_index: 0,                   // Number. 0-based index into lines array
      speaker: "",                     // String. Who says the anchor line
      bubble_text: ""                  // String. The exact line text (for bubble unlock)
    },

    // ─── THE 4 SLIDES (REQUIRED — CONSTRAINT 5) ────────────────────
    slides: [

      // ═════════════════════════════════════════════════════════════
      // SLIDE 1 / ACT 1: PRESENTATION (The Hook — Flip Card)
      // Maps to CONSTRAINT 5 elements: (1) uz_context, (2) mirror, (3) hybrid
      // ═════════════════════════════════════════════════════════════
      {
        phase: "presentation",         // FIXED value

        // FRONT OF CARD:
        uz_context: "",                // String. Uzbek question using polarity/friction (RULE E1)
                                       //   Pattern: wrong assumption → triggers correction
                                       //   e.g., "Siz charchamagan edingizmi?" (Weren't you tired?)
        audio: "",                     // String. Path to audio file for uz_context

        // BACK OF CARD (flip):
        uz_mirror_answer: "",          // String. Full Uzbek answer correcting the assumption
        hybrid_answer: "",             // String. Uzbek frame with **English target** bolded
                                       //   e.g., "Yo'q, men **was tired** kecha."
        en_canonical: "",              // String. Full English canonical form

        // OPTIONAL — For grammar cards only. Paradigm shown on presentation slide.
        //            Structure varies by grammar type (see examples in actual files).
        grammar_visual: {              // Object. Grammar paradigm display
          // Example for was/were:
          singular: { subjects: ["I", "he", "she", "it"], form: "was" },
          plural: { subjects: ["you", "we", "they"], form: "were" }
          // Example for have/has:
          // have_subjects: ["I", "you", "we", "they"],
          // has_subjects: ["he", "she", "it"]
        },

        // OPTIONAL — Syntactic Mirror scaffold for RULE E11 (Mirror Mode).
        //            Uzbek words rearranged into English SVO positions.
        //            Target English words remain in English; rest stays in Uzbek.
        syntax_scaffold: ""            // String. Mirrored Uzbek with English slots
                                       //   e.g., "[Mening xonamda] There are [o'ttizta kompyuterlar]"
      },

      // ═════════════════════════════════════════════════════════════
      // SLIDE 2 / ACT 2: CONCEPT CHECK (The Addendum — Drag & Sort)
      // Implicit grammar understanding — NO explicit rule teaching
      // ═════════════════════════════════════════════════════════════
      {
        phase: "practice",             // FIXED value
        type: "concept_check",         // FIXED value

        instruction: "",               // String. Uzbek question about the grammar concept

        exercise: {
          type: "function_sort",       // FIXED value — always function_sort
          sentence: "",                // String. The sentence being analyzed

          options: [                   // Array. Exactly 2 options (one correct, one wrong)
            {
              label: "",               // String. Uzbek label with English in parentheses
              value: "",               // String. Machine-readable value
              correct: false           // Boolean. Is this the right answer?
            },
            {
              label: "",
              value: "",
              correct: true
            }
          ],

          success_msg: "",             // String. Uzbek explanation shown on correct answer
          fail_msg: ""                 // String. Uzbek correction shown on wrong answer
        }
      },

      // ═════════════════════════════════════════════════════════════
      // SLIDE 2.5 / DISCOVERY (Grammar Noticing — After Concept Check)
      // MANDATORY — Highlights grammar tokens, asks "Why this form?"
      // Replaces explicit rule teaching with discovery-based learning
      // ═════════════════════════════════════════════════════════════
      {
        phase: "practice",             // FIXED value
        type: "discovery",             // FIXED value

        instruction: "",               // String. Uzbek instruction like "Diqqat bilan qarang..."
                                       //   (Look carefully...)
        sentence: "",                  // String. The sentence containing the grammar focus
        highlight_tokens: [],          // Array of strings. Tokens to bold in the sentence
                                       //   e.g., ["books", "s"] — highlights grammar markers

        options: [                     // Array. 2-3 multiple choice options
          {
            label: "",                 // String. Uzbek label for the option
            value: "",                 // String. Machine-readable value
            correct: false             // Boolean. Is this the right answer?
          },
          {
            label: "",
            value: "",
            correct: true
          }
          // Optional 3rd option:
          // { label: "", value: "", correct: false }
        ],

        success_msg: "",               // String. Uzbek explanation shown on correct answer
                                       //   Reinforces WHY this form was used
        fail_msg: ""                   // String. Uzbek correction shown on wrong answer
      },

      // ═════════════════════════════════════════════════════════════
      // SLIDE 3 / ACT 3: DRILL LIST (The Snowball — 3 Sentences)
      // Maps to CONSTRAINT 5 elements: (4) anchor, (5) ex2, (6) ex3
      // ═════════════════════════════════════════════════════════════
      {
        phase: "practice",             // FIXED value
        type: "drill_list",            // FIXED value

        en_examples: [
          // ─── Example 1: ANCHOR (CONSTRAINT 2 — from dialogue) ────
          {
            en: "",                    // String. EXACT sentence from dialogue
            uz: "",                    // String. Uzbek translation
            is_anchor: true,           // Boolean. MUST be true for first example
            source_dialogue: "",       // String. Dialogue ID where this sentence appears
            source_line: 0,            // Number. Line index in dialogue
            speaker: ""                // String. Who says it in the dialogue
          },

          // ─── Example 2: TRANSFER (different subject/context) ─────
          {
            en: "",                    // String. Same target word, different subject
            uz: "",                    // String. Uzbek translation
            subject: "",               // String. The new subject used
            focus_word: ""             // String. The target word being drilled
          },

          // ─── Example 3: EXTENSION (additional context) ───────────
          {
            en: "",                    // String. Further variation
            uz: "",                    // String. Uzbek translation
            subject: "",               // String. Another different subject
            focus_word: ""             // String. The target word being drilled
          }
        ]
      },

      // ═════════════════════════════════════════════════════════════
      // SLIDE 4 / ACT 4: PRODUCTION (The Test — Input Box)
      // Learner produces the sentence; unlocks dialogue bubble
      // ═════════════════════════════════════════════════════════════
      {
        phase: "production",           // FIXED value

        uz_prompt: "",                 // String. Uzbek instruction telling learner what to say
                                       //   e.g., "Ingliz tilida ayting: 'Kecha men charchagan edim'"
        model_answer: "",              // String. The expected English answer
        accepted_answers: [],          // Array of strings. All acceptable variations

        // ─── Trap (common error detection) ───────────────────────────
        trap: {
          trigger: "",                 // String. Common mistake to detect
                                       //   e.g., "I am tired" when past is needed
          message: ""                  // String. Uzbek correction message with ⚠️
                                       //   e.g., "⚠️ 'Am' = HOZIR. KECHA uchun 'Was' kerak!"
        },

        // ─── Bubble Unlock (dialogue integration) ────────────────────
        on_success: {
          unlock_bubble: true,         // Boolean. Always true
          dialogue_id: "",             // String. Which dialogue's bubble to unlock
          line_index: 0                // Number. Which line in the dialogue
        }
      },

      // ═════════════════════════════════════════════════════════════
      // SLIDE 5 / PERSONALIZATION (Open-Ended Personal Response)
      // MANDATORY — After Act 4. Student uses target tokens freely
      // Uses flexibleCheck (Regex) instead of static model_answer
      // ═════════════════════════════════════════════════════════════
      {
        phase: "production",           // FIXED value
        type: "personalization",       // FIXED value

        uz_prompt: "",                 // String. Uzbek prompt for personal response
                                       //   e.g., "Sumkangizda nima bor?" (What is in your bag?)
        focus_pattern: "",             // String. Regex pattern for target token validation
                                       //   e.g., "there\\s+(is|are)" — must use there is/are
        accepted_patterns: [],         // Array of regex strings. All acceptable response patterns
                                       //   e.g., ["there\\s+is\\s+\\w+", "there\\s+are\\s+\\w+"]
        on_success: {
          message: "",                 // String. Uzbek congratulation message
          unlock_next: true            // Boolean. Proceed to next card/dialogue
        }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: HELPER METHODS (Renderer API — REQUIRED)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // These 4 methods MUST exist on every unit module for renderer integration.
  // ⚠️  SYNTAX VARIATIONS: Choose one pattern and use consistently within a unit
  //    - ES6 method syntax: getCardsForLesson(lessonId) { ... }
  //    - Function syntax:   getCardsForLesson: function(lessonId) { ... }
  //    - Optional chaining: this.lessons?.[lessonId] (newer)
  //    - Regular access:    this.lessons[lessonId]   (older)
  //

  getCardsForLesson: function(lessonId) {
    // Returns: Array of card objects for given lesson
    const lesson = this.lessons?.[lessonId];
    return lesson?.items || [];
  },

  getLesson: function(lessonId) {
    // Returns: Lesson metadata object (without items)
    return this.lessons?.[lessonId] || null;
  },

  getDialogue: function(dialogueId) {
    // Returns: Dialogue object
    return this.dialogues?.[dialogueId] || null;
  },

  getCardById: function(cardId) {
    // Returns: Single card object or null
    for (const lessonKey in this.lessons) {
      const lesson = this.lessons[lessonKey];
      for (const item of lesson.items) {
        if (item.id === cardId) return item;
      }
    }
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: FREEZE (REQUIRED)
// ═══════════════════════════════════════════════════════════════════════════════
// Every unit module must be frozen after definition to prevent runtime mutation.
// ⚠️  PATTERN VARIATION: Some files use conditional freeze, others omit it.
//
//   if (Object.freeze) {
//     Object.freeze(window.VOCAB_CARDS_UXX);
//   }
//
// OR simply:
//   Object.freeze(window.VOCAB_CARDS_UXX);
//

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: VALIDATION CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════
//
// Before committing any unit file, verify:
//
// □ unit_id, unit_title, scalability_level, grammar_focus — all filled
// □ recycling.mandatory — has from_uXX key for EVERY prior unit
// □ recycling.ratio_target — { min: 0.60, max: 0.75 }
//
// MISSION METADATA (NEW):
// □ mission.mission_id matches unit (e.g., "U02_M01")
// □ mission.flow_model = "sandwich"
// □ mission.stages has exactly 3 stages: affirmative, negative, interrogative
// □ Each stage has 7-8 target_vocab items
// □ Stage 3 has mirror_mode = false
// □ mission.mastery_dialogue_id points to Stage 3 pressure dialogue
//
// CONTRASTIVE TURNS (NEW):
// □ contrastive_turns has exactly 3 entries (one per stage)
// □ Each turn has focus, speaker_a, speaker_b, highlights
// □ highlights use blue (Form A) and red (Form B) markers
// □ Marker-level precision: suffix "s" highlighted separately where applicable
//
// DIALOGUES:
// □ Every core vocab item appears in at least one dialogue (CONSTRAINT 1)
// □ grammar_coverage has affirmative (2+), negative (1+), question (1+) (CONSTRAINT 3)
// □ recycling_balance.least_used_included has 3+ words (CONSTRAINT 4)
// □ Every line has: speaker, line, line_uz, recycled[], target[], mastery_key (RULE D7)
// □ 8-12 lines per dialogue (RULE D1)
// □ 2 characters per dialogue (RULE D2)
// □ Dialogues feel natural within linguistic constraints (RULE D2)
//
// LESSONS:
// □ lesson_id, title, grammar_target, scalability_pattern — all filled
// □ flow_model = "sandwich"
// □ mastery_dialogue_id points to Stage 3 mastery dialogue (if applicable)
// □ source_dialogues — lists all dialogue IDs used
// □ grammar_coverage — matches dialogue grammar_coverage
// □ recycling_stats — ratio between 0.60 and 0.75
//
// CARDS (per card):
// □ id format: V_{unit}_{lesson}_{word}
// □ All identity fields filled (en, uz, pos, type, priority, category, introduced_in, image)
// □ dialogue_ref points to real dialogue line (CONSTRAINT 2)
// □ 6 slides in order: presentation → concept_check → discovery → drill_list → production → personalization
//
// SLIDE 1 (presentation):
// □ uz_context uses polarity/friction pattern (RULE E1)
// □ uz_mirror_answer corrects the wrong assumption
// □ hybrid_answer has **bolded English target**
// □ en_canonical is the full English form
// □ syntax_scaffold contains mirrored Uzbek with English slots (RULE E11)
// □ grammar_visual ONLY on grammar cards (optional)
//
// SLIDE 2 (concept_check):
// □ type = "concept_check", exercise.type = "function_sort"
// □ Exactly 2 options (one correct: true, one correct: false)
// □ success_msg and fail_msg in Uzbek
// □ Tests IMPLICIT grammar understanding (no explicit rules)
//
// SLIDE 2.5 (discovery — NEW):
// □ type = "discovery"
// □ instruction in Uzbek
// □ sentence contains the grammar focus
// □ highlight_tokens array lists tokens to bold
// □ 2-3 options (one correct: true)
// □ success_msg and fail_msg in Uzbek
//
// SLIDE 3 (drill_list):
// □ Exactly 3 examples in en_examples array
// □ Example 1: is_anchor = true, source_dialogue + source_line match real dialogue
// □ Example 1: en text is EXACT copy from dialogue line (CONSTRAINT 2)
// □ Examples 2-3: Different subjects, same focus_word
// □ NO recycled_parts, recycledFrom, or new_vocab annotations (RULE R3)
//
// SLIDE 4 (production):
// □ uz_prompt in Uzbek with target sentence
// □ model_answer is the expected English output
// □ accepted_answers includes reasonable variations
// □ trap.trigger catches a common mistake
// □ trap.message explains the error in Uzbek with ⚠️
// □ on_success.unlock_bubble = true
// □ on_success.dialogue_id + line_index point to real dialogue line
//
// SLIDE 5 (personalization — NEW):
// □ type = "personalization"
// □ uz_prompt in Uzbek with open-ended personal prompt
// □ focus_pattern is a valid regex targeting required tokens
// □ accepted_patterns array has reasonable response patterns
// □ on_success.unlock_next = true
//
// HELPER METHODS:
// □ getCardsForLesson(lessonId)
// □ getLesson(lessonId)
// □ getDialogue(dialogueId)
// □ getCardById(cardId)
//
// FREEZE:
// □ Object.freeze(window.VOCAB_CARDS_UXX) at end of file
//
// ═══════════════════════════════════════════════════════════════════════════════
// END OF CANONICAL DATA TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
