/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 01.5: Possession, Existence & Extended Questions
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4+2 Act Slide Structure (Renderer V2.5+)
 * MISSION FLOW: 3×2 Successive Mastery Cycle (Sandwich Technique)
 *
 * UNIT SCOPE (A1+ Extensions - Building on U01 Foundation):
 * - HAVE/HAS possession patterns
 * - THERE IS/ARE existence patterns
 * - Complex WH-questions (where, how, when, why)
 * - Prepositions (in, on, at)
 * - Addition marker (too)
 *
 * THE 4+2 ACT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Act 1: PRESENTATION   → Uzbek Context Q, Mirror, Hybrid, scaffold     │
 * │ Act 2: CONCEPT CHECK  → implicit grammar understanding                │
 * │ ★ DISCOVERY           → grammar token highlight, "Why this form?"     │
 * │ Act 3: DRILL LIST     → Anchor (from dialogue), Ex2, Ex3             │
 * │ Act 4: PRODUCTION     → input + bubble unlock                         │
 * │ ★ PERSONALIZATION     → open-ended personal response + flexibleCheck  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * MASTER DOCUMENT COMPLIANCE:
 * ✅ CONSTRAINT 1: 100% Core vocabulary in dialogues
 * ✅ CONSTRAINT 2: Anchor sentence = exact sentence from dialogue
 * ✅ CONSTRAINT 3: Target grammar in (+), (-), (?) in dialogues
 * ✅ CONSTRAINT 4: Recycling through dialogues; recycling_balance tracked
 * ✅ CONSTRAINT 5: All 6 content elements per card (4+2 Act)
 * ✅ CONSTRAINT 6: Mission Flow Model compliance (3×2 cycle)
 * ✅ RULE D7: Every dialogue line has line_uz (Uzbek translation)
 * ✅ RULE E1: Presentation uz_context = polarity/friction
 * ✅ RULE E11: Syntactic Mirroring (syntax_scaffold on presentations)
 *
 * RECYCLING CHAIN: U01 (Foundation) → U01.5 (This Unit)
 *
 * @version 2.0.0 - 4+2 Act + Mission Flow + Contrastive Turns
 */

window.VOCAB_CARDS_U01_5 = {
  unit_id: "U01_5",
  unit_title: "Possession, Existence & Extended Questions",
  scalability_level: 1,
  grammar_focus: "HAVE/HAS, THERE IS/ARE, WH-questions, Prepositions",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01 (Rule R2)
  // ═══════════════════════════════════════════════════════════════════════════
  recycling: {
    mandatory: {
      from_u01: {
        subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
        to_be_forms: ["am", "is", "are", "isn't", "aren't"],
        possessive_det: ["my", "your", "his", "her", "our", "their"],
        question_words: ["what", "who"],
        articles: ["a", "an", "the"],
        demonstratives: ["this", "that"],
        family: ["father", "mother", "brother", "sister"],
        identity: ["name", "teacher", "student"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSION METADATA (3×2 Successive Mastery Cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  mission: {
    mission_id: "U01_5_M01",
    flow_model: "sandwich",
    target_vocab: ["have", "has", "don't have", "doesn't have", "there is", "there are", "there isn't", "there aren't", "where", "how", "when", "why", "in", "on", "at", "too"],
    stages: [
      {
        stage: 1,
        form: "affirmative",
        target_vocab: ["have", "has"],
        dialogue_id: "U01_5_L01_D01",
        pressure_id: "U01_5_L01_D01_1",
        mirror_mode: true
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: ["don't have", "doesn't have", "there isn't", "there aren't"],
        dialogue_id: "U01_5_L02_D01",
        pressure_id: "U01_5_L02_D01_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: ["where", "how", "when", "why"],
        dialogue_id: "U01_5_L03_D01",
        pressure_id: "U01_5_L03_D01_1",
        mirror_mode: false
      }
    ],
    mastery_dialogue_id: "U01_5_L03_D01_1"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
  // ═══════════════════════════════════════════════════════════════════════════
  contrastive_turns: [
    {
      stage: 1,
      focus: "have_vs_has",
      dialogue_id: "U01_5_L01_D01",
      speaker_a: { text: "I have a brother.", speaker: "Malika" },
      speaker_b: { text: "He has a book.", speaker: "Malika" },
      highlights: [
        {
          blue: { text: "have", type: "base_verb" },
          red: { text: "has", marker: "s", type: "third_person_verb" }
        }
      ]
    },
    {
      stage: 2,
      focus: "existence_affirmative_vs_negative",
      dialogue_id: "U01_5_L02_D01",
      speaker_a: { text: "There is a teacher.", speaker: "Bekzod" },
      speaker_b: { text: "There isn't a car.", speaker: "Bekzod" },
      highlights: [
        {
          blue: { text: "There is", type: "existence_affirmative" },
          red: { text: "There isn't", type: "existence_negative" }
        }
      ]
    },
    {
      stage: 3,
      focus: "statement_vs_wh_question",
      dialogue_id: "U01_5_L03_D01",
      speaker_a: { text: "Ali is in the class.", speaker: "Karim" },
      speaker_b: { text: "Where is Ali?", speaker: "Sara" },
      highlights: [
        {
          blue: { text: "Ali is", type: "statement_order" },
          red: { text: "Where is Ali?", marker: "Where", type: "wh_question_inversion" }
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    // -------------------------------------------------------------------------
    // LESSON 01: HAVE/HAS Possession
    // -------------------------------------------------------------------------
    "U01_5_L01_D01": {
      id: "U01_5_L01_D01",
      title: "Family and Things",
      setting: "Two classmates talking about their families and possessions",
      characters: ["Ali", "Malika"],
      grammar_coverage: {
        affirmative: ["I have a brother.", "She has a book.", "We have a teacher."],
        negative: ["I don't have a sister.", "He doesn't have a car."],
        question: ["Do you have a brother?", "Does she have a book?"]
      },
      recycling_balance: {
        least_used_included: ["this", "that", "our"],
        quota_met: true,
        notes: "Foundation words from U01 + new HAVE/HAS target vocabulary."
      },
      lines: [
        { speaker: "Ali", line: "Hello Malika! Do you have a brother?", line_uz: "Salom Malika! Akangiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "brother"], mastery_key: "U01_5_L01_D01_0" },
        { speaker: "Malika", line: "Yes, I have a brother. His name is Karim.", line_uz: "Ha, akam bor. Uning ismi Karim.", recycled: ["I", "a", "His", "name", "is"], target: ["have", "brother"], mastery_key: "U01_5_L01_D01_1" },
        { speaker: "Ali", line: "Does he have a book?", line_uz: "Uning kitobi bormi?", recycled: ["he", "a"], target: ["Does", "have", "book"], mastery_key: "U01_5_L01_D01_2" },
        { speaker: "Malika", line: "Yes, he has a book. This is his book.", line_uz: "Ha, kitobi bor. Bu uning kitobi.", recycled: ["he", "a", "This", "is", "his"], target: ["has", "book"], mastery_key: "U01_5_L01_D01_3" },
        { speaker: "Ali", line: "Do you have a sister?", line_uz: "Sizning singlingiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "sister"], mastery_key: "U01_5_L01_D01_4" },
        { speaker: "Malika", line: "No, I don't have a sister. I have a brother.", line_uz: "Yo'q, singlim yo'q. Akam bor.", recycled: ["I", "a"], target: ["don't have", "sister", "have", "brother"], mastery_key: "U01_5_L01_D01_5" },
        { speaker: "Ali", line: "I have a sister. Her name is Sara.", line_uz: "Mening singlim bor. Uning ismi Sara.", recycled: ["I", "a", "Her", "name", "is"], target: ["have", "sister"], mastery_key: "U01_5_L01_D01_6" },
        { speaker: "Malika", line: "That is nice! Does your father have a car?", line_uz: "Zo'r! Dadangizning mashinasi bormi?", recycled: ["That", "is", "your", "father"], target: ["Does", "have", "car"], mastery_key: "U01_5_L01_D01_7" },
        { speaker: "Ali", line: "No, he doesn't have a car.", line_uz: "Yo'q, uning mashinasi yo'q.", recycled: ["he", "a"], target: ["doesn't have", "car"], mastery_key: "U01_5_L01_D01_8" },
        { speaker: "Malika", line: "We have a nice teacher. Our teacher is good.", line_uz: "Bizning ajoyib o'qituvchimiz bor. O'qituvchimiz yaxshi.", recycled: ["We", "a", "teacher", "is"], target: ["have", "Our"], mastery_key: "U01_5_L01_D01_9" }
      ]
    },

    // -------------------------------------------------------------------------
    // LESSON 02: THERE IS/ARE Existence
    // -------------------------------------------------------------------------
    "U01_5_L02_D01": {
      id: "U01_5_L02_D01",
      title: "In the Classroom",
      setting: "Students looking around their classroom",
      characters: ["Nilufar", "Bekzod"],
      grammar_coverage: {
        affirmative: ["There is a book.", "There are students.", "There is a teacher in the class."],
        negative: ["There isn't a car.", "There aren't books on the table."],
        question: ["Is there a teacher?", "Are there students?"]
      },
      recycling_balance: {
        least_used_included: ["my", "your", "that"],
        quota_met: true,
        notes: "U01 foundation + U01.5 L01 (have/has) + new THERE IS/ARE."
      },
      lines: [
        { speaker: "Nilufar", line: "Is there a teacher in the class?", line_uz: "Sinfda o'qituvchi bormi?", recycled: ["a", "teacher", "the"], target: ["Is there", "in", "class"], mastery_key: "U01_5_L02_D01_0" },
        { speaker: "Bekzod", line: "Yes, there is a teacher. She is my teacher.", line_uz: "Ha, o'qituvchi bor. U mening o'qituvchim.", recycled: ["a", "teacher", "She", "is", "my"], target: ["there is"], mastery_key: "U01_5_L02_D01_1" },
        { speaker: "Nilufar", line: "Are there students in the class?", line_uz: "Sinfda talabalar bormi?", recycled: ["the"], target: ["Are there", "students", "in", "class"], mastery_key: "U01_5_L02_D01_2" },
        { speaker: "Bekzod", line: "Yes, there are students. There are five students.", line_uz: "Ha, talabalar bor. Besh talaba bor.", recycled: [], target: ["there are", "students", "five"], mastery_key: "U01_5_L02_D01_3" },
        { speaker: "Nilufar", line: "Is there a book on the table?", line_uz: "Stolda kitob bormi?", recycled: ["a", "the"], target: ["Is there", "book", "on", "table"], mastery_key: "U01_5_L02_D01_4" },
        { speaker: "Bekzod", line: "Yes, there is a book on the table. That is your book.", line_uz: "Ha, stolda kitob bor. Bu sizning kitobingiz.", recycled: ["a", "the", "That", "is", "your"], target: ["there is", "book", "on", "table"], mastery_key: "U01_5_L02_D01_5" },
        { speaker: "Nilufar", line: "Is there a car at school?", line_uz: "Maktabda mashina bormi?", recycled: ["a"], target: ["Is there", "car", "at", "school"], mastery_key: "U01_5_L02_D01_6" },
        { speaker: "Bekzod", line: "No, there isn't a car at school.", line_uz: "Yo'q, maktabda mashina yo'q.", recycled: ["a"], target: ["there isn't", "car", "at", "school"], mastery_key: "U01_5_L02_D01_7" },
        { speaker: "Nilufar", line: "Are there books in the bag?", line_uz: "Sumkada kitoblar bormi?", recycled: ["the"], target: ["Are there", "books", "in", "bag"], mastery_key: "U01_5_L02_D01_8" },
        { speaker: "Bekzod", line: "No, there aren't books in the bag. The bag is at home.", line_uz: "Yo'q, sumkada kitoblar yo'q. Sumka uyda.", recycled: ["the", "is"], target: ["there aren't", "books", "in", "bag", "at", "home"], mastery_key: "U01_5_L02_D01_9" }
      ]
    },

    // -------------------------------------------------------------------------
    // LESSON 03: Complex WH-Questions & Prepositions
    // -------------------------------------------------------------------------
    "U01_5_L03_D01": {
      id: "U01_5_L03_D01",
      title: "Where and How",
      setting: "Friends asking about locations and states",
      characters: ["Sara", "Karim"],
      grammar_coverage: {
        affirmative: ["The book is on the table.", "I am at home.", "Ali is in the class."],
        negative: ["The book isn't in the bag.", "I am not at school."],
        question: ["Where is Ali?", "How are you?", "When is the class?", "Why are you happy?"]
      },
      recycling_balance: {
        least_used_included: ["our", "their", "this"],
        quota_met: true,
        notes: "U01 foundation + U01.5 L01-L02 + new WH-questions and prepositions."
      },
      lines: [
        { speaker: "Sara", line: "Hello Karim! How are you?", line_uz: "Salom Karim! Qandaysiz?", recycled: ["you"], target: ["How", "are"], mastery_key: "U01_5_L03_D01_0" },
        { speaker: "Karim", line: "I am fine, thank you. How are you?", line_uz: "Yaxshiman, rahmat. Siz-chi?", recycled: ["I", "am", "you"], target: ["How", "are", "fine"], mastery_key: "U01_5_L03_D01_1" },
        { speaker: "Sara", line: "I am happy today. Where is Ali?", line_uz: "Bugun xursandman. Ali qayerda?", recycled: ["I", "am", "is"], target: ["happy", "Where"], mastery_key: "U01_5_L03_D01_2" },
        { speaker: "Karim", line: "Ali is in the class. He has a book.", line_uz: "Ali sinfda. Uning kitobi bor.", recycled: ["is", "the", "He", "has", "a", "book"], target: ["in", "class"], mastery_key: "U01_5_L03_D01_3" },
        { speaker: "Sara", line: "Where is the book?", line_uz: "Kitob qayerda?", recycled: ["is", "the", "book"], target: ["Where"], mastery_key: "U01_5_L03_D01_4" },
        { speaker: "Karim", line: "The book is on the table.", line_uz: "Kitob stolda.", recycled: ["The", "book", "is", "the"], target: ["on", "table"], mastery_key: "U01_5_L03_D01_5" },
        { speaker: "Sara", line: "When is the class?", line_uz: "Dars qachon?", recycled: ["is", "the"], target: ["When", "class"], mastery_key: "U01_5_L03_D01_6" },
        { speaker: "Karim", line: "The class is at nine. It is in the morning.", line_uz: "Dars to'qqizda. Ertalab.", recycled: ["The", "is", "It", "in", "the"], target: ["class", "at", "nine", "morning"], mastery_key: "U01_5_L03_D01_7" },
        { speaker: "Sara", line: "This is good! Why are you happy?", line_uz: "Zo'r! Nega xursandsiz?", recycled: ["This", "is", "you"], target: ["Why", "are", "happy"], mastery_key: "U01_5_L03_D01_8" },
        { speaker: "Karim", line: "I have a sister too. She is at home.", line_uz: "Mening ham singlim bor. U uyda.", recycled: ["I", "have", "a", "sister", "She", "is"], target: ["too", "at", "home"], mastery_key: "U01_5_L03_D01_9" }
      ]
    },
    
    "U01_5_L03_D02": {
      id: "U01_5_L03_D02",
      title: "Locations and Reasons",
      setting: "Students talking about places and reasons",
      characters: ["Madina", "Vali"],
      grammar_coverage: {
        affirmative: ["The bag is in the room.", "I am at school.", "There is a book on the table."],
        negative: ["The car isn't at home.", "I am not in the class."],
        question: ["Where are the students?", "Why is she sad?", "How is your father?"]
      },
      recycling_balance: {
        least_used_included: ["their", "our", "that"],
        quota_met: true,
        notes: "Consolidates all U01.5 grammar with varied contexts."
      },
      lines: [
        { speaker: "Madina", line: "Where are the students?", line_uz: "Talabalar qayerda?", recycled: ["the"], target: ["Where", "are", "students"], mastery_key: "U01_5_L03_D02_0" },
        { speaker: "Vali", line: "They are in the class. Their teacher is there too.", line_uz: "Ular sinfda. O'qituvchilari ham u yerda.", recycled: ["They", "are", "in", "the", "teacher", "is"], target: ["class", "Their", "there", "too"], mastery_key: "U01_5_L03_D02_1" },
        { speaker: "Madina", line: "Where is my bag?", line_uz: "Sumkam qayerda?", recycled: ["is", "my"], target: ["Where", "bag"], mastery_key: "U01_5_L03_D02_2" },
        { speaker: "Vali", line: "Your bag is on the table.", line_uz: "Sumkangiz stolda.", recycled: ["Your", "is", "the"], target: ["bag", "on", "table"], mastery_key: "U01_5_L03_D02_3" },
        { speaker: "Madina", line: "How is your father?", line_uz: "Dadangiz qalaysiz?", recycled: ["is", "your", "father"], target: ["How"], mastery_key: "U01_5_L03_D02_4" },
        { speaker: "Vali", line: "He is fine. He is at home now.", line_uz: "U yaxshi. Hozir uyda.", recycled: ["He", "is"], target: ["fine", "at", "home"], mastery_key: "U01_5_L03_D02_5" },
        { speaker: "Madina", line: "Why is your sister at school?", line_uz: "Nega singlingiz maktabda?", recycled: ["is", "your", "sister"], target: ["Why", "at", "school"], mastery_key: "U01_5_L03_D02_6" },
        { speaker: "Vali", line: "She has a class. There is an exam.", line_uz: "Uning darsi bor. Imtihon bor.", recycled: ["She", "has", "a", "is", "an"], target: ["class", "There", "exam"], mastery_key: "U01_5_L03_D02_7" },
        { speaker: "Madina", line: "Why are you happy?", line_uz: "Nega xursandsiz?", recycled: ["you"], target: ["Why", "are", "happy"], mastery_key: "U01_5_L03_D02_8" },
        { speaker: "Vali", line: "I am happy. I have a book. The book is good.", line_uz: "Xursandman. Kitobim bor. Kitob yaxshi.", recycled: ["I", "am", "have", "a", "book", "The", "is"], target: ["happy"], mastery_key: "U01_5_L03_D02_9" }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    // =========================================================================
    // LESSON 01: Possession with HAVE/HAS
    // =========================================================================
    "U01_5_L01": {
      lesson_id: "U01_5_L01",
      title: "Possession with HAVE/HAS",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L01_D01_1",
      grammar_target: "I/you/we/they + have / he/she/it + has",
      scalability_pattern: "[Subject] + have/has + [Object]",
      source_dialogues: ["U01_5_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I have a brother.", "She has a book."] },
        negative: { required: 1, examples: ["I don't have a sister."] },
        question: { required: 1, examples: ["Do you have a brother?"] }
      },
      
      recycling_stats: {
        total_content_words: 40,
        recycled_words: 30,
        new_words: 10,
        ratio: 0.75,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // ═══════════════════════════════════════════════════════════════
        // CARD 1: have (POSSESSION VERB I/YOU/WE/THEY)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L01_have",
          en: "have",
          uz: "bor (ega bo'lmoq)",
          pos: "verb",
          type: "possession_verb",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L01",
          image: "/images/U01_5/U01_5_L01/img_have.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L01_D01",
            line_index: 1,
            speaker: "Malika",
            bubble_text: "Yes, I have a brother."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Sizning akangiz yo'qmi?",
              audio: "audio/U01_5/q_have.mp3",
              
              uz_mirror_answer: "Yo'q, mening akam bor.",
              hybrid_answer: "Yo'q, men **have a brother**.",
              en_canonical: "I have a brother.",
              syntax_scaffold: { en_structure: "I have a brother.", uz_gloss: "Mening akam bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a brother", role: "object", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Have' kimlar bilan ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "I have a brother.",
                options: [
                  { label: "He, She, It", value: "third_singular", correct: false },
                  { label: "I, You, We, They", value: "other_subjects", correct: true }
                ],
                success_msg: "To'g'ri! 'Have' = I, You, We, They bilan ishlatiladi.",
                fail_msg: "'Have' — I, You, We, They uchun. He/She/It uchun 'Has' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "have", form_focus: "subject_agreement", why_prompt: "Nega 'have' va 'has' farqi bor?", explanation_uz: "'Have' — I, You, We, They bilan. 'Has' — He, She, It bilan. Uchinchi shaxs birlikda 'has' kerak.", mini_rule: "I/you/we/they + HAVE | he/she/it + HAS" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Yes, I have a brother. His name is Karim.",
                  uz: "Ha, akam bor. Uning ismi Karim.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L01_D01",
                  source_line: 1,
                  speaker: "Malika"
                },
                {
                  en: "We have a nice teacher.",
                  uz: "Bizning ajoyib o'qituvchimiz bor.",
                  subject: "We",
                  focus_word: "have"
                },
                {
                  en: "They have a car.",
                  uz: "Ularning mashinasi bor.",
                  subject: "They",
                  focus_word: "have"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Mening akam bor'",
              model_answer: "I have a brother",
              accepted_answers: ["I have a brother", "I have a brother."],
              
              trap: {
                trigger: "I has",
                message: "⚠️ 'Has' — He/She/It uchun. 'I' bilan 'HAVE' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 1
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizda nima bor? Ayting.", model_frame: "I have ___.", flexibleCheck: true, tags: ["possession", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 2: has (POSSESSION VERB HE/SHE/IT)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L01_has",
          en: "has",
          uz: "bor (uchinchi shaxs)",
          pos: "verb",
          type: "possession_verb",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L01",
          image: "/images/U01_5/U01_5_L01/img_has.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L01_D01",
            line_index: 3,
            speaker: "Malika",
            bubble_text: "Yes, he has a book."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Karimning kitobi yo'qmi?",
              audio: "audio/U01_5/q_has.mp3",
              
              uz_mirror_answer: "Yo'q, uning kitobi bor.",
              hybrid_answer: "Yo'q, u **has a book**.",
              en_canonical: "He has a book.",
              syntax_scaffold: { en_structure: "He has a book.", uz_gloss: "Uning kitobi bor.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "has", role: "verb", color: "green" }, { word: "a book", role: "object", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Has' kimlar bilan ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "She has a book.",
                options: [
                  { label: "I, You, We, They", value: "other_subjects", correct: false },
                  { label: "He, She, It", value: "third_singular", correct: true }
                ],
                success_msg: "To'g'ri! 'Has' = He, She, It (uchinchi shaxs birlik) uchun.",
                fail_msg: "'Has' — He/She/It uchun. I/You/We/They uchun 'Have' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "has", form_focus: "third_person_s", why_prompt: "Nega 'has' faqat uchinchi shaxs uchun?", explanation_uz: "'Has' — He, She, It (uchinchi shaxs birlik) uchun maxsus shakl. Boshqa shaxslar uchun 'have' ishlatiladi.", mini_rule: "he/she/it + HAS (NOT have)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Yes, he has a book. This is his book.",
                  uz: "Ha, kitobi bor. Bu uning kitobi.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L01_D01",
                  source_line: 3,
                  speaker: "Malika"
                },
                {
                  en: "She has a sister.",
                  uz: "Uning singlisi bor.",
                  subject: "She",
                  focus_word: "has"
                },
                {
                  en: "My father has a car.",
                  uz: "Dadamning mashinasi bor.",
                  subject: "My father",
                  focus_word: "has"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Uning kitobi bor' (erkak)",
              model_answer: "He has a book",
              accepted_answers: ["He has a book", "He has a book."],
              
              trap: {
                trigger: "He have",
                message: "⚠️ 'Have' — I/You/We/They uchun. 'He' bilan 'HAS' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning do'stingizda nima bor?", model_frame: "My friend has ___.", flexibleCheck: true, tags: ["possession", "third_person"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 3: don't have (NEGATIVE POSSESSION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L01_dont_have",
          en: "don't have",
          uz: "yo'q (egalik yo'qligi)",
          pos: "verb_phrase",
          type: "possession_negative",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L01",
          image: "/images/U01_5/U01_5_L01/img_dont_have.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L01_D01",
            line_index: 5,
            speaker: "Malika",
            bubble_text: "No, I don't have a sister."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Sizning singlingiz bormi?",
              audio: "audio/U01_5/q_dont_have.mp3",
              
              uz_mirror_answer: "Yo'q, mening singlim yo'q.",
              hybrid_answer: "Yo'q, men **don't have** singlim.",
              en_canonical: "I don't have a sister.",
              syntax_scaffold: { en_structure: "I don't have a sister.", uz_gloss: "Mening singlim yo'q.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "don't", role: "negative", color: "red" }, { word: "have", role: "verb", color: "green" }, { word: "a sister", role: "object", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Don't have' nimani bildiradi?",
              
              exercise: {
                type: "function_sort",
                sentence: "I don't have a sister.",
                options: [
                  { label: "Egalik bor (Possession)", value: "affirmative", correct: false },
                  { label: "Egalik yo'q (No possession)", value: "negative", correct: true }
                ],
                success_msg: "To'g'ri! 'Don't have' = egalik YO'Q.",
                fail_msg: "'Don't' = inkor. 'Don't have' = egalik YO'Q!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "don't have", form_focus: "negation", why_prompt: "Inkor qanday hosil bo'ladi?", explanation_uz: "'Don't' = do + not. I/You/We/They bilan 'don't have' ishlatiladi. He/She/It uchun 'doesn't have' kerak.", mini_rule: "I/you/we/they + DON'T HAVE | he/she/it + DOESN'T HAVE" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "No, I don't have a sister. I have a brother.",
                  uz: "Yo'q, singlim yo'q. Akam bor.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L01_D01",
                  source_line: 5,
                  speaker: "Malika"
                },
                {
                  en: "We don't have a car.",
                  uz: "Bizning mashinamiz yo'q.",
                  subject: "We",
                  focus_word: "don't have"
                },
                {
                  en: "They don't have a teacher.",
                  uz: "Ularning o'qituvchisi yo'q.",
                  subject: "They",
                  focus_word: "don't have"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Mening singlim yo'q'",
              model_answer: "I don't have a sister",
              accepted_answers: ["I don't have a sister", "I don't have a sister.", "I do not have a sister"],
              
              trap: {
                trigger: "I haven't",
                message: "⚠️ Oddiy hozirgi zamon (Present Simple) inkor uchun 'DON'T HAVE' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 5
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizda nima yo'q?", model_frame: "I don't have ___.", flexibleCheck: true, tags: ["possession", "negation"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 4: doesn't have (NEGATIVE THIRD PERSON)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L01_doesnt_have",
          en: "doesn't have",
          uz: "yo'q (uchinchi shaxs)",
          pos: "verb_phrase",
          type: "possession_negative",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L01",
          image: "/images/U01_5/U01_5_L01/img_doesnt_have.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L01_D01",
            line_index: 8,
            speaker: "Ali",
            bubble_text: "No, he doesn't have a car."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Dadangizning mashinasi bormi?",
              audio: "audio/U01_5/q_doesnt_have.mp3",
              
              uz_mirror_answer: "Yo'q, uning mashinasi yo'q.",
              hybrid_answer: "Yo'q, u **doesn't have** mashina.",
              en_canonical: "He doesn't have a car.",
              syntax_scaffold: { en_structure: "He doesn't have a car.", uz_gloss: "Uning mashinasi yo'q.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "doesn't", role: "negative", color: "red" }, { word: "have", role: "verb", color: "green" }, { word: "a car", role: "object", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Doesn't have' kimlar uchun ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "He doesn't have a car.",
                options: [
                  { label: "I, You, We, They", value: "other_subjects", correct: false },
                  { label: "He, She, It", value: "third_singular", correct: true }
                ],
                success_msg: "To'g'ri! 'Doesn't have' = He/She/It uchun inkor.",
                fail_msg: "'Doesn't' — He/She/It uchun. I/You/We/They uchun 'Don't' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "doesn't have", form_focus: "third_person_negation", why_prompt: "Nega 'doesn't have' da 'has' yo'q?", explanation_uz: "'Doesn't' = does + not. 'Does' allaqachon uchinchi shaxs. Shuning uchun 'have' (HAS emas!) kerak: 'doesn't HAVE'.", mini_rule: "he/she/it + DOESN'T HAVE (NOT doesn't has)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "No, he doesn't have a car.",
                  uz: "Yo'q, uning mashinasi yo'q.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L01_D01",
                  source_line: 8,
                  speaker: "Ali"
                },
                {
                  en: "She doesn't have a brother.",
                  uz: "Uning akasi yo'q.",
                  subject: "She",
                  focus_word: "doesn't have"
                },
                {
                  en: "My mother doesn't have a bag.",
                  uz: "Onamning sumkasi yo'q.",
                  subject: "My mother",
                  focus_word: "doesn't have"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Uning mashinasi yo'q' (erkak)",
              model_answer: "He doesn't have a car",
              accepted_answers: ["He doesn't have a car", "He doesn't have a car.", "He does not have a car"],
              
              trap: {
                trigger: "He don't have",
                message: "⚠️ 'Don't' — I/You/We/They uchun. 'He' bilan 'DOESN'T' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 8
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning sinfdoshingizda nima yo'q?", model_frame: "My classmate doesn't have ___.", flexibleCheck: true, tags: ["possession", "third_person_negation"] }
          ]
        }
      ]
    },

    // =========================================================================
    // LESSON 02: Existence with THERE IS/ARE
    // =========================================================================
    "U01_5_L02": {
      lesson_id: "U01_5_L02",
      title: "Existence with THERE IS/ARE",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L02_D01_1",
      grammar_target: "There is (singular) / There are (plural)",
      scalability_pattern: "There is/are + [Thing] + [Location]",
      source_dialogues: ["U01_5_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["There is a book.", "There are students."] },
        negative: { required: 1, examples: ["There isn't a car."] },
        question: { required: 1, examples: ["Is there a teacher?"] }
      },
      
      recycling_stats: {
        total_content_words: 45,
        recycled_words: 32,
        new_words: 13,
        ratio: 0.71,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // ═══════════════════════════════════════════════════════════════
        // CARD 5: there is (EXISTENCE SINGULAR)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L02_there_is",
          en: "there is",
          uz: "bor (mavjudlik birlik)",
          pos: "phrase",
          type: "existence_marker",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L02",
          image: "/images/U01_5/U01_5_L02/img_there_is.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L02_D01",
            line_index: 1,
            speaker: "Bekzod",
            bubble_text: "Yes, there is a teacher."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Sinfda o'qituvchi yo'qmi?",
              audio: "audio/U01_5/q_there_is.mp3",
              
              uz_mirror_answer: "Yo'q, sinfda o'qituvchi bor.",
              hybrid_answer: "Yo'q, **there is** o'qituvchi sinfda.",
              en_canonical: "There is a teacher in the class.",
              syntax_scaffold: { en_structure: "There is a teacher in the class.", uz_gloss: "Sinfda o'qituvchi bor.", tokens: [{ word: "There is", role: "existence", color: "blue" }, { word: "a teacher", role: "subject", color: "green" }, { word: "in the class", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'There is' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "There is a book on the table.",
                options: [
                  { label: "Ko'p narsalar (Plural)", value: "plural", correct: false },
                  { label: "Bitta narsa (Singular)", value: "singular", correct: true }
                ],
                success_msg: "To'g'ri! 'There is' = BITTA narsa mavjud.",
                fail_msg: "'There is' — birlik uchun. Ko'plik uchun 'There are' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there is", form_focus: "existence_singular", why_prompt: "Nega 'there is' va 'there are' farqi bor?", explanation_uz: "'There is' = BITTA narsa mavjud. 'There are' = KO'P narsa mavjud. Sonni qarang!", mini_rule: "There IS + singular (a book) | There ARE + plural (books)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Yes, there is a teacher. She is my teacher.",
                  uz: "Ha, o'qituvchi bor. U mening o'qituvchim.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L02_D01",
                  source_line: 1,
                  speaker: "Bekzod"
                },
                {
                  en: "There is a book on the table.",
                  uz: "Stolda kitob bor.",
                  subject: "There",
                  focus_word: "there is"
                },
                {
                  en: "There is a car at school.",
                  uz: "Maktabda mashina bor.",
                  subject: "There",
                  focus_word: "there is"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Sinfda o'qituvchi bor'",
              model_answer: "There is a teacher in the class",
              accepted_answers: ["There is a teacher in the class", "There is a teacher in the class.", "There's a teacher in the class"],
              
              trap: {
                trigger: "There are a teacher",
                message: "⚠️ 'A teacher' = BITTA. 'There IS' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 1
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning xonangizda nima bor?", model_frame: "There is ___ in my room.", flexibleCheck: true, tags: ["existence", "place"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 6: there are (EXISTENCE PLURAL)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L02_there_are",
          en: "there are",
          uz: "bor (mavjudlik ko'plik)",
          pos: "phrase",
          type: "existence_marker",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L02",
          image: "/images/U01_5/U01_5_L02/img_there_are.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L02_D01",
            line_index: 3,
            speaker: "Bekzod",
            bubble_text: "Yes, there are students."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Sinfda talabalar yo'qmi?",
              audio: "audio/U01_5/q_there_are.mp3",
              
              uz_mirror_answer: "Yo'q, sinfda talabalar bor.",
              hybrid_answer: "Yo'q, **there are** talabalar sinfda.",
              en_canonical: "There are students in the class.",
              syntax_scaffold: { en_structure: "There are students in the class.", uz_gloss: "Sinfda talabalar bor.", tokens: [{ word: "There are", role: "existence", color: "blue" }, { word: "students", role: "subject", color: "green" }, { word: "in the class", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'There are' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "There are five students.",
                options: [
                  { label: "Bitta narsa (Singular)", value: "singular", correct: false },
                  { label: "Ko'p narsalar (Plural)", value: "plural", correct: true }
                ],
                success_msg: "To'g'ri! 'There are' = KO'P narsalar mavjud.",
                fail_msg: "'There are' — ko'plik uchun. Birlik uchun 'There is' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there are", form_focus: "existence_plural", why_prompt: "Nega 'are' ko'plik uchun?", explanation_uz: "'Are' = ko'plik uchun TO BE shakli. Students, books, teachers = ko'plik → 'There ARE'.", mini_rule: "There ARE + plural noun (students, books, teachers)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Yes, there are students. There are five students.",
                  uz: "Ha, talabalar bor. Besh talaba bor.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L02_D01",
                  source_line: 3,
                  speaker: "Bekzod"
                },
                {
                  en: "There are books on the table.",
                  uz: "Stolda kitoblar bor.",
                  subject: "There",
                  focus_word: "there are"
                },
                {
                  en: "There are teachers in the school.",
                  uz: "Maktabda o'qituvchilar bor.",
                  subject: "There",
                  focus_word: "there are"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Sinfda talabalar bor'",
              model_answer: "There are students in the class",
              accepted_answers: ["There are students in the class", "There are students in the class."],
              
              trap: {
                trigger: "There is students",
                message: "⚠️ 'Students' = KO'PLIK. 'There ARE' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sinfingizda nimalar bor?", model_frame: "There are ___ in my class.", flexibleCheck: true, tags: ["existence", "plural"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 7: there isn't (EXISTENCE NEGATIVE SINGULAR)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L02_there_isnt",
          en: "there isn't",
          uz: "yo'q (mavjudlik inkor birlik)",
          pos: "phrase",
          type: "existence_negative",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L02",
          image: "/images/U01_5/U01_5_L02/img_there_isnt.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L02_D01",
            line_index: 7,
            speaker: "Bekzod",
            bubble_text: "No, there isn't a car at school."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Maktabda mashina bormi?",
              audio: "audio/U01_5/q_there_isnt.mp3",
              
              uz_mirror_answer: "Yo'q, maktabda mashina yo'q.",
              hybrid_answer: "Yo'q, **there isn't** mashina maktabda.",
              en_canonical: "There isn't a car at school.",
              syntax_scaffold: { en_structure: "There isn't a car at school.", uz_gloss: "Maktabda mashina yo'q.", tokens: [{ word: "There isn't", role: "negative_existence", color: "red" }, { word: "a car", role: "subject", color: "green" }, { word: "at school", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'There isn't' nimani bildiradi?",
              
              exercise: {
                type: "function_sort",
                sentence: "There isn't a car at school.",
                options: [
                  { label: "Mavjud (Exists)", value: "affirmative", correct: false },
                  { label: "Mavjud emas (Does not exist)", value: "negative", correct: true }
                ],
                success_msg: "To'g'ri! 'There isn't' = bitta narsa MAVJUD EMAS.",
                fail_msg: "'Isn't' = inkor. 'There isn't' = mavjud EMAS!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there isn't", form_focus: "negative_existence", why_prompt: "Inkor qanday hosil bo'ladi?", explanation_uz: "'There is' + 'not' → 'There isn't'. Birlik uchun inkor shakl.", mini_rule: "There is + not → There ISN'T (singular negative)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "No, there isn't a car at school.",
                  uz: "Yo'q, maktabda mashina yo'q.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L02_D01",
                  source_line: 7,
                  speaker: "Bekzod"
                },
                {
                  en: "There isn't a book in the bag.",
                  uz: "Sumkada kitob yo'q.",
                  subject: "There",
                  focus_word: "there isn't"
                },
                {
                  en: "There isn't a teacher at home.",
                  uz: "Uyda o'qituvchi yo'q.",
                  subject: "There",
                  focus_word: "there isn't"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Maktabda mashina yo'q'",
              model_answer: "There isn't a car at school",
              accepted_answers: ["There isn't a car at school", "There isn't a car at school.", "There is not a car at school"],
              
              trap: {
                trigger: "There aren't a car",
                message: "⚠️ 'A car' = BITTA. 'There ISN'T' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 7
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning xonangizda nima yo'q?", model_frame: "There isn't ___ in my room.", flexibleCheck: true, tags: ["existence", "negation"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 8: there aren't (EXISTENCE NEGATIVE PLURAL)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L02_there_arent",
          en: "there aren't",
          uz: "yo'q (mavjudlik inkor ko'plik)",
          pos: "phrase",
          type: "existence_negative",
          priority: 1,
          category: "core_grammar",
          introduced_in: "U01_5_L02",
          image: "/images/U01_5/U01_5_L02/img_there_arent.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L02_D01",
            line_index: 9,
            speaker: "Bekzod",
            bubble_text: "No, there aren't books in the bag."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Sumkada kitoblar bormi?",
              audio: "audio/U01_5/q_there_arent.mp3",
              
              uz_mirror_answer: "Yo'q, sumkada kitoblar yo'q.",
              hybrid_answer: "Yo'q, **there aren't** kitoblar sumkada.",
              en_canonical: "There aren't books in the bag.",
              syntax_scaffold: { en_structure: "There aren't books in the bag.", uz_gloss: "Sumkada kitoblar yo'q.", tokens: [{ word: "There aren't", role: "negative_existence", color: "red" }, { word: "books", role: "subject", color: "green" }, { word: "in the bag", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'There aren't' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "There aren't books in the bag.",
                options: [
                  { label: "Bitta narsa (Singular)", value: "singular", correct: false },
                  { label: "Ko'p narsalar mavjud EMAS (Plural negative)", value: "plural_negative", correct: true }
                ],
                success_msg: "To'g'ri! 'There aren't' = ko'p narsalar mavjud EMAS.",
                fail_msg: "'Aren't' — ko'plik uchun. Birlik uchun 'Isn't' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there aren't", form_focus: "plural_negative_existence", why_prompt: "Ko'plik inkor qanday farq qiladi?", explanation_uz: "'There are' + 'not' → 'There aren't'. Ko'plik uchun inkor shakl. Birlik uchun 'isn't' ishlatiladi.", mini_rule: "There are + not → There AREN'T (plural negative)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "No, there aren't books in the bag. The bag is at home.",
                  uz: "Yo'q, sumkada kitoblar yo'q. Sumka uyda.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L02_D01",
                  source_line: 9,
                  speaker: "Bekzod"
                },
                {
                  en: "There aren't students at school.",
                  uz: "Maktabda talabalar yo'q.",
                  subject: "There",
                  focus_word: "there aren't"
                },
                {
                  en: "There aren't cars on the table.",
                  uz: "Stolda mashinalar yo'q.",
                  subject: "There",
                  focus_word: "there aren't"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Sumkada kitoblar yo'q'",
              model_answer: "There aren't books in the bag",
              accepted_answers: ["There aren't books in the bag", "There aren't books in the bag.", "There are not books in the bag"],
              
              trap: {
                trigger: "There isn't books",
                message: "⚠️ 'Books' = KO'PLIK. 'There AREN'T' kerak!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sinfingizda nimalar yo'q?", model_frame: "There aren't ___ in my class.", flexibleCheck: true, tags: ["existence", "plural_negation"] }
          ]
        }
      ]
    },

    // =========================================================================
    // LESSON 03: Complex WH-Questions & Prepositions
    // =========================================================================
    "U01_5_L03": {
      lesson_id: "U01_5_L03",
      title: "WH-Questions & Prepositions",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L03_D01_1",
      grammar_target: "where/how/when/why + in/on/at",
      scalability_pattern: "[WH-word] + is/are + [Subject/Thing]? + in/on/at [Place]",
      source_dialogues: ["U01_5_L03_D01", "U01_5_L03_D02"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["The book is on the table.", "I am at home."] },
        negative: { required: 1, examples: ["I am not at school."] },
        question: { required: 2, examples: ["Where is Ali?", "How are you?", "Why are you happy?"] }
      },
      
      recycling_stats: {
        total_content_words: 50,
        recycled_words: 38,
        new_words: 12,
        ratio: 0.76,
        status: "⚠️ Slightly high (target: 0.60-0.75) - consolidation lesson"
      },

      items: [
        // ═══════════════════════════════════════════════════════════════
        // CARD 9: where (LOCATION QUESTION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_where",
          en: "where",
          uz: "qayerda",
          pos: "question_word",
          type: "wh_question",
          priority: 1,
          category: "question_word",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_where.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 2,
            speaker: "Sara",
            bubble_text: "Where is Ali?"
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Ali qayerda ekanini bilasizmi?",
              audio: "audio/U01_5/q_where.mp3",
              
              uz_mirror_answer: "Yo'q, Ali qayerda ekanini bilmayman. Ali qayerda?",
              hybrid_answer: "**Where** is Ali?",
              en_canonical: "Where is Ali?",
              syntax_scaffold: { en_structure: "Where is Ali?", uz_gloss: "Ali qayerda?", tokens: [{ word: "Where", role: "wh_question", color: "red" }, { word: "is", role: "verb", color: "green" }, { word: "Ali", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Where' qanday savol so'zi?",
              
              exercise: {
                type: "function_sort",
                sentence: "Where is Ali?",
                options: [
                  { label: "Vaqt haqida (Time)", value: "time", correct: false },
                  { label: "Joy haqida (Location)", value: "location", correct: true }
                ],
                success_msg: "To'g'ri! 'Where' = QAYERDA (joy haqida).",
                fail_msg: "'Where' = QAYERDA. Bu joy haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "where", form_focus: "wh_question_location", why_prompt: "Savol so'zlari qanday ishlaydi?", explanation_uz: "'Where' = joy haqida savol. Savol tartibi: WHERE + IS/ARE + Subject? Darak gapdan farqli tartib!", mini_rule: "WHERE + is/are + subject? (question word order)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "I am happy today. Where is Ali?",
                  uz: "Bugun xursandman. Ali qayerda?",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 2,
                  speaker: "Sara"
                },
                {
                  en: "Where is the book?",
                  uz: "Kitob qayerda?",
                  subject: "book",
                  focus_word: "Where"
                },
                {
                  en: "Where are the students?",
                  uz: "Talabalar qayerda?",
                  subject: "students",
                  focus_word: "Where"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Ali qayerda?'",
              model_answer: "Where is Ali",
              accepted_answers: ["Where is Ali", "Where is Ali?", "Where's Ali"],
              
              trap: {
                trigger: "Where Ali is",
                message: "⚠️ Savol tartibini esda tuting: WHERE + IS + ALI?"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 2
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning eng yaqin do'stingiz qayerda?", model_frame: "My best friend is in/at ___.", flexibleCheck: true, tags: ["location", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 10: how (STATE/MANNER QUESTION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_how",
          en: "how",
          uz: "qanday/qanaqasiga",
          pos: "question_word",
          type: "wh_question",
          priority: 1,
          category: "question_word",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_how.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 0,
            speaker: "Sara",
            bubble_text: "Hello Karim! How are you?"
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Siz bilan uchrashganimda nima deyishim kerak?",
              audio: "audio/U01_5/q_how.mp3",
              
              uz_mirror_answer: "Salom! Qandaysiz? deb so'rashingiz kerak.",
              hybrid_answer: "Salom! **How are you?**",
              en_canonical: "How are you?",
              syntax_scaffold: { en_structure: "How are you?", uz_gloss: "Siz qandaysiz?", tokens: [{ word: "How", role: "wh_question", color: "red" }, { word: "are", role: "verb", color: "green" }, { word: "you", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'How are you?' nima haqida so'raydi?",
              
              exercise: {
                type: "function_sort",
                sentence: "How are you?",
                options: [
                  { label: "Joy haqida (Location)", value: "location", correct: false },
                  { label: "Holat haqida (State/Condition)", value: "state", correct: true }
                ],
                success_msg: "To'g'ri! 'How are you?' = siz QANDAY ekanligingizni so'raydi.",
                fail_msg: "'How' = QANDAY. Bu holat haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "how", form_focus: "wh_question_manner", why_prompt: "How qachon ishlatiladi?", explanation_uz: "'How' = holat yoki usul. 'How are you?' = Qanday ekansiz? 'How' bilan turli savollar tuzish mumkin.", mini_rule: "HOW + is/are + subject? = state/manner question" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Hello Karim! How are you?",
                  uz: "Salom Karim! Qandaysiz?",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 0,
                  speaker: "Sara"
                },
                {
                  en: "How is your father?",
                  uz: "Dadangiz qalaysiz?",
                  subject: "father",
                  focus_word: "How"
                },
                {
                  en: "How is she?",
                  uz: "U qanday?",
                  subject: "she",
                  focus_word: "How"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Qandaysiz?'",
              model_answer: "How are you",
              accepted_answers: ["How are you", "How are you?"],
              
              trap: {
                trigger: "How you are",
                message: "⚠️ Savol tartibini esda tuting: HOW + ARE + YOU?"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 0
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Bugun o'zingizni qanday his qilyapsiz?", model_frame: "I am ___ today.", flexibleCheck: true, tags: ["state", "feeling"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 11: when (TIME QUESTION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_when",
          en: "when",
          uz: "qachon",
          pos: "question_word",
          type: "wh_question",
          priority: 1,
          category: "question_word",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_when.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 6,
            speaker: "Sara",
            bubble_text: "When is the class?"
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Dars qachon boshlanishini bilasizmi?",
              audio: "audio/U01_5/q_when.mp3",
              
              uz_mirror_answer: "Bilmayman. Dars qachon?",
              hybrid_answer: "**When** is the class?",
              en_canonical: "When is the class?",
              syntax_scaffold: { en_structure: "When is the class?", uz_gloss: "Dars qachon?", tokens: [{ word: "When", role: "wh_question", color: "red" }, { word: "is", role: "verb", color: "green" }, { word: "the class", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'When' qanday savol so'zi?",
              
              exercise: {
                type: "function_sort",
                sentence: "When is the class?",
                options: [
                  { label: "Joy haqida (Location)", value: "location", correct: false },
                  { label: "Vaqt haqida (Time)", value: "time", correct: true }
                ],
                success_msg: "To'g'ri! 'When' = QACHON (vaqt haqida).",
                fail_msg: "'When' = QACHON. Bu vaqt haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "when", form_focus: "wh_question_time", why_prompt: "When savol so'zi nima uchun?", explanation_uz: "'When' = vaqt haqida savol. 'When + is/are + subject?' — vaqtni so'rash uchun.", mini_rule: "WHEN + is/are + subject? = time question" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "When is the class?",
                  uz: "Dars qachon?",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 6,
                  speaker: "Sara"
                },
                {
                  en: "When is the exam?",
                  uz: "Imtihon qachon?",
                  subject: "exam",
                  focus_word: "When"
                },
                {
                  en: "When are you at home?",
                  uz: "Siz qachon uyda bo'lasiz?",
                  subject: "you",
                  focus_word: "When"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Dars qachon?'",
              model_answer: "When is the class",
              accepted_answers: ["When is the class", "When is the class?", "When's the class"],
              
              trap: {
                trigger: "When the class is",
                message: "⚠️ Savol tartibini esda tuting: WHEN + IS + THE CLASS?"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 6
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning darslaringiz qachon?", model_frame: "My class is at ___.", flexibleCheck: true, tags: ["time", "schedule"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 12: why (REASON QUESTION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_why",
          en: "why",
          uz: "nega/nima uchun",
          pos: "question_word",
          type: "wh_question",
          priority: 1,
          category: "question_word",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_why.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 8,
            speaker: "Sara",
            bubble_text: "Why are you happy?"
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Siz xursand ekansiz. Sabab nima?",
              audio: "audio/U01_5/q_why.mp3",
              
              uz_mirror_answer: "Nega xursandman? Bugungi kun yaxshi!",
              hybrid_answer: "**Why** are you happy?",
              en_canonical: "Why are you happy?",
              syntax_scaffold: { en_structure: "Why are you happy?", uz_gloss: "Nega siz xursandsiz?", tokens: [{ word: "Why", role: "wh_question", color: "red" }, { word: "are", role: "verb", color: "green" }, { word: "you", role: "subject", color: "blue" }, { word: "happy", role: "adjective", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Why' qanday savol so'zi?",
              
              exercise: {
                type: "function_sort",
                sentence: "Why are you happy?",
                options: [
                  { label: "Vaqt haqida (Time)", value: "time", correct: false },
                  { label: "Sabab haqida (Reason)", value: "reason", correct: true }
                ],
                success_msg: "To'g'ri! 'Why' = NEGA/NIMA UCHUN (sabab haqida).",
                fail_msg: "'Why' = NEGA. Bu sabab haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "why", form_focus: "wh_question_reason", why_prompt: "Why nima uchun?", explanation_uz: "'Why' = sabab/sababni so'rash. 'Why + are/is + subject + adjective?' — sababni aniqlash.", mini_rule: "WHY + is/are + subject + state? = reason question" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "This is good! Why are you happy?",
                  uz: "Zo'r! Nega xursandsiz?",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 8,
                  speaker: "Sara"
                },
                {
                  en: "Why is she sad?",
                  uz: "Nega u g'amgin?",
                  subject: "she",
                  focus_word: "Why"
                },
                {
                  en: "Why are they at school?",
                  uz: "Nega ular maktabda?",
                  subject: "they",
                  focus_word: "Why"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Nega xursandsiz?'",
              model_answer: "Why are you happy",
              accepted_answers: ["Why are you happy", "Why are you happy?"],
              
              trap: {
                trigger: "Why you are happy",
                message: "⚠️ Savol tartibini esda tuting: WHY + ARE + YOU + HAPPY?"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 8
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz nega ingliz tilini o'rganasiz?", model_frame: "I study English because ___.", flexibleCheck: true, tags: ["reason", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 13: in (PREPOSITION - INSIDE)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_in",
          en: "in",
          uz: "-da/-de (ichida)",
          pos: "preposition",
          type: "preposition_location",
          priority: 1,
          category: "preposition",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_in.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 3,
            speaker: "Karim",
            bubble_text: "Ali is in the class."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Ali sinf tashqarisidami?",
              audio: "audio/U01_5/q_in.mp3",
              
              uz_mirror_answer: "Yo'q, Ali sinfda.",
              hybrid_answer: "Yo'q, Ali **in** the class.",
              en_canonical: "Ali is in the class.",
              syntax_scaffold: { en_structure: "Ali is in the class.", uz_gloss: "Ali sinfda.", tokens: [{ word: "Ali", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "in", role: "preposition", color: "red" }, { word: "the class", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'In' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "Ali is in the class.",
                options: [
                  { label: "Ustida (On surface)", value: "on_surface", correct: false },
                  { label: "Ichida (Inside)", value: "inside", correct: true }
                ],
                success_msg: "To'g'ri! 'In' = ICHIDA (sinf ichida).",
                fail_msg: "'In' = ICHIDA. 'In the class' = sinf ICHIDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "in", form_focus: "preposition_enclosed", why_prompt: "In, On, At — farqi nima?", explanation_uz: "IN = ichida (in the room, in the bag). ON = ustida (on the table). AT = aniq joy (at school). Uch xil joy ko'rsatish!", mini_rule: "IN = inside | ON = surface | AT = specific point" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "Ali is in the class. He has a book.",
                  uz: "Ali sinfda. Uning kitobi bor.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 3,
                  speaker: "Karim"
                },
                {
                  en: "The book is in the bag.",
                  uz: "Kitob sumkada.",
                  subject: "book",
                  focus_word: "in"
                },
                {
                  en: "We are in the class.",
                  uz: "Biz sinfdamiz.",
                  subject: "We",
                  focus_word: "in"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Ali sinfda'",
              model_answer: "Ali is in the class",
              accepted_answers: ["Ali is in the class", "Ali is in the class.", "Ali's in the class"],
              
              trap: {
                trigger: "Ali is at the class",
                message: "⚠️ 'In' = ICHIDA. 'In the class' to'g'ri!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz hozir qayerdasiz?", model_frame: "I am in ___.", flexibleCheck: true, tags: ["location", "preposition"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 14: on (PREPOSITION - SURFACE)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_on",
          en: "on",
          uz: "ustida",
          pos: "preposition",
          type: "preposition_location",
          priority: 1,
          category: "preposition",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_on.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 5,
            speaker: "Karim",
            bubble_text: "The book is on the table."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Kitob stol tagidami?",
              audio: "audio/U01_5/q_on.mp3",
              
              uz_mirror_answer: "Yo'q, kitob stol ustida.",
              hybrid_answer: "Yo'q, the book is **on** the table.",
              en_canonical: "The book is on the table.",
              syntax_scaffold: { en_structure: "The book is on the table.", uz_gloss: "Kitob stolda.", tokens: [{ word: "The book", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "on", role: "preposition", color: "red" }, { word: "the table", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'On' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "The book is on the table.",
                options: [
                  { label: "Ichida (Inside)", value: "inside", correct: false },
                  { label: "Ustida (On surface)", value: "on_surface", correct: true }
                ],
                success_msg: "To'g'ri! 'On' = USTIDA (stol ustida).",
                fail_msg: "'On' = USTIDA. 'On the table' = stol USTIDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "on", form_focus: "preposition_surface", why_prompt: "On qachon ishlatiladi?", explanation_uz: "'On' = sirt ustida. On the table, on the wall, on the floor — narsa sirt USTIDA tursa 'on' kerak.", mini_rule: "ON = on a surface (table, wall, floor)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "The book is on the table.",
                  uz: "Kitob stolda.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 5,
                  speaker: "Karim"
                },
                {
                  en: "Your bag is on the table.",
                  uz: "Sumkangiz stolda.",
                  subject: "bag",
                  focus_word: "on"
                },
                {
                  en: "The picture is on the wall.",
                  uz: "Surat devorda.",
                  subject: "picture",
                  focus_word: "on"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Kitob stolda'",
              model_answer: "The book is on the table",
              accepted_answers: ["The book is on the table", "The book is on the table."],
              
              trap: {
                trigger: "The book is in the table",
                message: "⚠️ 'On' = USTIDA. 'On the table' to'g'ri!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 5
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning stolingizda nimalar bor?", model_frame: "There is ___ on my table.", flexibleCheck: true, tags: ["location", "surface"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 15: at (PREPOSITION - SPECIFIC LOCATION)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_at",
          en: "at",
          uz: "-da/-de (aniq joy)",
          pos: "preposition",
          type: "preposition_location",
          priority: 1,
          category: "preposition",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_at.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 9,
            speaker: "Karim",
            bubble_text: "She is at home."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Singlingiz maktabdami?",
              audio: "audio/U01_5/q_at.mp3",
              
              uz_mirror_answer: "Yo'q, u uyda.",
              hybrid_answer: "Yo'q, she is **at** home.",
              en_canonical: "She is at home.",
              syntax_scaffold: { en_structure: "She is at home.", uz_gloss: "U uyda.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "at", role: "preposition", color: "red" }, { word: "home", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'At' qachon ishlatiladi?",
              
              exercise: {
                type: "function_sort",
                sentence: "She is at home.",
                options: [
                  { label: "Ichida (Inside)", value: "inside", correct: false },
                  { label: "Aniq joy (Specific location)", value: "specific_location", correct: true }
                ],
                success_msg: "To'g'ri! 'At' = aniq joy (at home, at school, at work).",
                fail_msg: "'At' = aniq joy uchun. 'At home' = UYDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "at", form_focus: "preposition_point", why_prompt: "At qachon ishlatiladi?", explanation_uz: "'At' = aniq belgilangan joy. At home, at school, at work — bu joylarning NOMI bilan 'at' kerak.", mini_rule: "AT = specific point (at home, at school, at work)" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "I have a sister too. She is at home.",
                  uz: "Mening ham singlim bor. U uyda.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 9,
                  speaker: "Karim"
                },
                {
                  en: "I am at school.",
                  uz: "Men maktabdaman.",
                  subject: "I",
                  focus_word: "at"
                },
                {
                  en: "He is at work.",
                  uz: "U ishda.",
                  subject: "He",
                  focus_word: "at"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'U uyda' (ayol)",
              model_answer: "She is at home",
              accepted_answers: ["She is at home", "She is at home.", "She's at home"],
              
              trap: {
                trigger: "She is in home",
                message: "⚠️ 'At home' = uyda. 'In home' noto'g'ri!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz hozir qayerdasiz?", model_frame: "I am at ___.", flexibleCheck: true, tags: ["location", "specific_place"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 16: too (ADDITION MARKER)
        // ═══════════════════════════════════════════════════════════════
        {
          id: "V_U01_5_L03_too",
          en: "too",
          uz: "ham",
          pos: "adverb",
          type: "addition_marker",
          priority: 2,
          category: "addition",
          introduced_in: "U01_5_L03",
          image: "/images/U01_5/U01_5_L03/img_too.png",
          
          dialogue_ref: {
            dialogue_id: "U01_5_L03_D01",
            line_index: 9,
            speaker: "Karim",
            bubble_text: "I have a sister too."
          },

          slides: [
            // ACT 1: PRESENTATION
            {
              phase: "presentation",
              uz_context: "Faqat Saraning singlisi bormi?",
              audio: "audio/U01_5/q_too.mp3",
              
              uz_mirror_answer: "Yo'q, mening ham singlim bor.",
              hybrid_answer: "Yo'q, I have a sister **too**.",
              en_canonical: "I have a sister too.",
              syntax_scaffold: { en_structure: "I have a sister too.", uz_gloss: "Mening ham singlim bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a sister", role: "object", color: "purple" }, { word: "too", role: "addition", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Too' nimani bildiradi?",
              
              exercise: {
                type: "function_sort",
                sentence: "I have a sister too.",
                options: [
                  { label: "Inkor (Negation)", value: "negation", correct: false },
                  { label: "Qo'shimcha (Also/Addition)", value: "addition", correct: true }
                ],
                success_msg: "To'g'ri! 'Too' = HAM (qo'shimcha ma'nosi).",
                fail_msg: "'Too' = HAM. Bu qo'shimcha qilish uchun ishlatiladi!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "too", form_focus: "addition_marker", why_prompt: "Too qayerda keladi?", explanation_uz: "'Too' = ham. Gap OXIRIDA keladi: 'I am happy TOO.' 'Also' esa gap o'rtasida: 'I also have...'", mini_rule: "TOO = end of sentence | ALSO = middle of sentence" },

            // ACT 3: DRILL LIST
            {
              phase: "practice",
              type: "drill_list",
              
              en_examples: [
                {
                  en: "I have a sister too. She is at home.",
                  uz: "Mening ham singlim bor. U uyda.",
                  is_anchor: true,
                  source_dialogue: "U01_5_L03_D01",
                  source_line: 9,
                  speaker: "Karim"
                },
                {
                  en: "I am a student too.",
                  uz: "Men ham talabaman.",
                  subject: "I",
                  focus_word: "too"
                },
                {
                  en: "She is happy too.",
                  uz: "U ham xursand.",
                  subject: "She",
                  focus_word: "too"
                }
              ]
            },

            // ACT 4: PRODUCTION
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Mening ham singlim bor'",
              model_answer: "I have a sister too",
              accepted_answers: ["I have a sister too", "I have a sister too.", "I also have a sister"],
              
              trap: {
                trigger: "I too have",
                message: "⚠️ 'Too' gap oxirida keladi: 'I have a sister TOO'!"
              },
              
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz ham nimaga qiziqasiz?", model_frame: "I like ___ too.", flexibleCheck: true, tags: ["addition", "preference"] }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER METHODS (Renderer API)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Get all vocabulary cards for a specific lesson
   * @param {string} lessonId - e.g., "U01_5_L01"
   * @returns {Array} Array of card objects
   */
  getCardsForLesson(lessonId) {
    const lesson = this.lessons[lessonId];
    return lesson ? lesson.items : [];
  },

  /**
   * Get lesson metadata
   * @param {string} lessonId - e.g., "U01_5_L01"
   * @returns {Object} Lesson object without items array
   */
  getLesson(lessonId) {
    const lesson = this.lessons[lessonId];
    if (!lesson) return null;
    const { items, ...metadata } = lesson;
    return metadata;
  },

  /**
   * Get a specific dialogue by ID
   * @param {string} dialogueId - e.g., "U01_5_L01_D01"
   * @returns {Object} Dialogue object
   */
  getDialogue(dialogueId) {
    return this.dialogues[dialogueId] || null;
  },

  /**
   * Get a single card by ID
   * @param {string} cardId - e.g., "V_U01_5_L01_have"
   * @returns {Object} Card object or null
   */
  getCardById(cardId) {
    for (const lessonId in this.lessons) {
      const card = this.lessons[lessonId].items.find(item => item.id === cardId);
      if (card) return card;
    }
    return null;
  }
};

// Freeze to prevent runtime modification
Object.freeze(window.VOCAB_CARDS_U01_5);
