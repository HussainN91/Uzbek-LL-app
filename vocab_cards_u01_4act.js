/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 01: Names & Identity (3 Lessons, 4+2 Act Structure)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4+2 Act Slide Structure (Renderer V2.5+)
 * MISSION FLOW: 3×2 Successive Mastery Cycle (Sandwich Technique)
 *
 * THE 4+2 ACT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Act 1: PRESENTATION   → Uzbek Context Q (polarity), Mirror, Hybrid,   │
 * │                          syntax_scaffold (RULE E11)                    │
 * │ Act 2: CONCEPT CHECK  → implicit grammar understanding                │
 * │ ★ DISCOVERY (NEW)     → grammar token highlight, "Why this form?"     │
 * │ Act 3: DRILL LIST     → Anchor (from dialogue), Ex2, Ex3             │
 * │ Act 4: PRODUCTION     → input + bubble unlock                         │
 * │ ★ PERSONALIZATION     → open-ended personal response + flexibleCheck  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * MISSION FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Stage 1 (L01): AFFIRMATIVE  → I am / He is / She is                   │
 * │ Stage 2 (L02): NEGATIVE     → He isn't / She isn't / aren't           │
 * │ Stage 3 (L03): INTERROGATIVE→ Is she...? / Are they...?               │
 * │ Mirror Mode: ON in Stages 1-2, OFF in Stage 3                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @version 5.0.0 - 4+2 Act + Mission Flow + Contrastive Turns
 */

window.VOCAB_CARDS_U01 = {
  unit_id: "U01",
  unit_title: "Names & Identity",
  scalability_level: 1,
  grammar_focus: "TO BE (am/is/are) + possessives + Yes/No questions",
  
  recycling: {
    mandatory: {},
    ratio_target: { min: 0.00, max: 0.00 },
    note: "U01 is foundation. All vocabulary here becomes RULE R2 mandatory recycling for U02-U10."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSION METADATA (3×2 Successive Mastery Cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  mission: {
    mission_id: "U01_M01",
    flow_model: "sandwich",
    target_vocab: ["hello", "my", "name", "is", "I", "am", "student", "nice", "meet", "you", "are", "teacher", "he", "she", "your", "we", "they", "father", "his", "mother", "her", "brother", "sister"],
    stages: [
      {
        stage: 1,
        form: "affirmative",
        target_vocab: ["hello", "my", "name", "is", "I", "am", "student"],
        dialogue_id: "U01_L01_D01",
        pressure_id: "U01_L01_D01_1",
        mirror_mode: true
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: ["nice", "meet", "you", "are", "teacher", "he", "she", "your"],
        dialogue_id: "U01_L02_D01",
        pressure_id: "U01_L02_D01_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: ["we", "they", "father", "his", "mother", "her", "brother", "sister"],
        dialogue_id: "U01_L03_D01",
        pressure_id: "U01_L03_D01_1",
        mirror_mode: false
      }
    ],
    mastery_dialogue_id: "U01_L03_D01_1"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
  // ═══════════════════════════════════════════════════════════════════════════
  contrastive_turns: [
    {
      stage: 1,
      focus: "subject_verb_agreement",
      dialogue_id: "U01_L01_D01",
      speaker_a: { text: "I am a student.", speaker: "Ali" },
      speaker_b: { text: "He is a teacher.", speaker: "Sara" },
      highlights: [
        {
          blue: { text: "am", type: "first_person_be" },
          red: { text: "is", type: "third_person_be" }
        }
      ]
    },
    {
      stage: 2,
      focus: "negation",
      dialogue_id: "U01_L02_D01",
      speaker_a: { text: "He is a teacher.", speaker: "Sara" },
      speaker_b: { text: "No, she isn't a teacher.", speaker: "Ali" },
      highlights: [
        {
          blue: { text: "is", type: "affirmative_be" },
          red: { text: "isn't", type: "negative_be" }
        }
      ]
    },
    {
      stage: 3,
      focus: "question_formation",
      dialogue_id: "U01_L03_D01",
      speaker_a: { text: "She is a student.", speaker: "Vali" },
      speaker_b: { text: "Is she a student?", speaker: "Ali" },
      highlights: [
        {
          blue: { text: "She is", type: "statement_order" },
          red: { text: "Is she", type: "question_order" }
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U01_L01_D01": {
      id: "U01_L01_D01",
      title: "Identity",
      lines: [
        { speaker: "Ali", line: "Hello! My name is Ali.", line_uz: "Salom! Mening ismim Ali.", target: ["Hello", "My", "name", "is"], mastery_key: "U01_L01_D01_0", audio_id: "U01_L01_D01_L0" },
        { speaker: "Ali", line: "I am a student.", line_uz: "Men talabaman.", target: ["I", "am", "student"], mastery_key: "U01_L01_D01_1", audio_id: "U01_L01_D01_L1" },
        { speaker: "Sara", line: "Hello, Ali. My name is Sara.", line_uz: "Salom, Ali. Mening ismim Sara.", target: [], mastery_key: "U01_L01_D01_2", audio_id: "U01_L01_D01_L2" },
        { speaker: "Sara", line: "I am a student too.", line_uz: "Men ham talabaman.", target: [], mastery_key: "U01_L01_D01_3", audio_id: "U01_L01_D01_L3" }
      ]
    },
    "U01_L02_D01": {
      id: "U01_L02_D01",
      title: "Interaction",
      lines: [
        { speaker: "Ali", line: "Nice to meet you, Sara.", line_uz: "Tanishganimdan xursandman, Sara.", target: ["Nice", "meet", "you"], mastery_key: "U01_L02_D01_0", audio_id: "U01_L02_D01_L0" },
        { speaker: "Ali", line: "Are you a teacher?", line_uz: "Siz o'qituvchimisiz?", target: ["Are", "teacher", "you"], mastery_key: "U01_L02_D01_1", audio_id: "U01_L02_D01_L1" },
        { speaker: "Sara", line: "No. He is a teacher.", line_uz: "Yo'q. U o'qituvchi.", target: ["He", "is", "teacher"], mastery_key: "U01_L02_D01_2", audio_id: "U01_L02_D01_L2" },
        { speaker: "Ali", line: "Is she a teacher?", line_uz: "U o'qituvchimi?", target: ["she"], mastery_key: "U01_L02_D01_3", audio_id: "U01_L02_D01_L3" },
        { speaker: "Sara", line: "No, she is a student.", line_uz: "Yo'q, u talaba.", target: [], mastery_key: "U01_L02_D01_4", audio_id: "U01_L02_D01_L4" },
        { speaker: "Ali", line: "What is your name, Miss?", line_uz: "Ismingiz nima, xonim?", target: ["your"], mastery_key: "U01_L02_D01_5", audio_id: "U01_L02_D01_L5" }
      ]
    },
    "U01_L03_D01": {
      id: "U01_L03_D01",
      title: "Family",
      lines: [
        { speaker: "Vali", line: "We are students. They are teachers.", line_uz: "Biz talabalarmiz. Ular o'qituvchilar.", target: ["We", "They"], mastery_key: "U01_L03_D01_0", audio_id: "U01_L03_D01_L0" },
        { speaker: "Vali", line: "This is my father. His name is Omar.", line_uz: "Bu mening otam. Uning ismi Omar.", target: ["father", "His"], mastery_key: "U01_L03_D01_1", audio_id: "U01_L03_D01_L1" },
        { speaker: "Vali", line: "This is my mother. Her name is Laylo.", line_uz: "Bu mening onam. Uning ismi Laylo.", target: ["mother", "Her"], mastery_key: "U01_L03_D01_2", audio_id: "U01_L03_D01_L2" },
        { speaker: "Vali", line: "This is my brother and my sister.", line_uz: "Bu mening akam va mening singlim.", target: ["brother", "sister"], mastery_key: "U01_L03_D01_3", audio_id: "U01_L03_D01_L3" }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U01_L01": {
      lesson_id: "U01_L01",
      title: "Identity",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_L01_D01_1",
      items: [
        // hello
        {
          id: "V_U01_L01_hello",
          en: "hello",
          uz: "salom",
          pos: "interjection",
          type: "greeting",
          priority: 1,
          category: "greeting",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_hello.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "Hello! My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Xayr aytish kerak-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_hello.mp3", uz_mirror_answer: "Yo'q, salom aytish kerak.", hybrid_answer: "Yo'q, **hello** demoq kerak.", en_canonical: "No, we say hello.", syntax_scaffold: "[Yo'q], [biz] **hello** [deymiz]" },
            { phase: "practice", type: "concept_check", instruction: "'Hello' qachon ishlatiladi?", exercise: { type: "function_sort", sentence: "Hello! My name is Ali.", options: [{ label: "Uchrashganda (When meeting)", value: "meeting", correct: true }, { label: "Xayrlashganda (When leaving)", value: "leaving", correct: false }], success_msg: "To'g'ri! 'Hello' = SALOM, uchrashganda.", fail_msg: "Yo'q. 'Hello' = uchrashganda, 'Goodbye' = xayrlashganda." } },
            { phase: "practice", type: "discovery", instruction: "Diqqat bilan qarang: 'Hello' qayerda keladi?", sentence: "Hello! My name is Ali.", highlight_tokens: ["Hello"], options: [{ label: "Gapning boshida — salomlashish (At the beginning — greeting)", value: "greeting_position", correct: true }, { label: "Gapning oxirida — xayrlashish (At the end — farewell)", value: "farewell_position", correct: false }], success_msg: "'Hello' har doim gapning BOSHIDA keladi — uchrashgandagi salomlashish.", fail_msg: "Yo'q. 'Hello' gapning BOSHIDA, salomlashish uchun ishlatiladi." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Hello! My name is Ali.", uz: "Salom! Mening ismim Ali.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "Hello, Sara!", uz: "Salom, Sara!", subject: "", focus_word: "Hello" }, { en: "Hello, everyone!", uz: "Salom, hamma!", subject: "", focus_word: "Hello" }] },
            { phase: "production", uz_prompt: "Ingliz tilida salom ayting.", model_answer: "Hello!", accepted_answers: ["Hello!", "Hello.", "Hi!"], trap: { trigger: "Salom", message: "⚠️ Ingliz tilida! 'HELLO' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga ingliz tilida salom ayting va ismingizni ayting.", focus_pattern: "hello|hi", accepted_patterns: ["hello.*my\\s+name", "hi.*my\\s+name", "hello.*I\\s+am"], on_success: { message: "Ajoyib! Siz ingliz tilida salomlasha olasiz! 🎉", unlock_next: true } }
          ]
        },
        // my
        {
          id: "V_U01_L01_my",
          en: "my",
          uz: "mening",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_my.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Uning ismi Ali-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_my.mp3", uz_mirror_answer: "Yo'q, mening ismim Sara.", hybrid_answer: "Yo'q, **my** name is Sara.", en_canonical: "No, my name is Sara.", syntax_scaffold: "[Yo'q], **my** [ismim] [Sara]" },
            { phase: "practice", type: "concept_check", instruction: "'My' so'zi kim haqida?", exercise: { type: "function_sort", sentence: "My name is Ali.", options: [{ label: "Gapiruvchiga tegishli (Belongs to speaker)", value: "speaker", correct: true }, { label: "Boshqaga tegishli (Belongs to someone else)", value: "other", correct: false }], success_msg: "To'g'ri! 'MY' = MENING, gapiruvchiga tegishli.", fail_msg: "Yo'q. 'MY' = gapiruvchining o'zi." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'me' emas, 'my' ishlatilgan?", sentence: "My name is Sara.", highlight_tokens: ["My"], options: [{ label: "'My' = egalik (mening) — ism oldidan keladi", value: "possessive", correct: true }, { label: "'My' = meni — tushum kelishigi", value: "object", correct: false }], success_msg: "'My' = MENING (egalik). Ism/narsa oldidan keladi: MY name, MY book.", fail_msg: "'My' = MENING. 'Me' = MENI. Ism oldidan doim 'MY' kerak." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "My father is Omar.", uz: "Mening otam Omar.", subject: "My", focus_word: "My" }, { en: "My mother is Laylo.", uz: "Mening onam Laylo.", subject: "My", focus_word: "My" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening ismim [your name].", model_answer: "My name is [name].", accepted_answers: ["My name is...", "My name's..."], trap: { trigger: "Me name", message: "⚠️ 'ME name' emas! 'MY name' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Oilangiz haqida bir gap ayting: Mening ... (my ...)", focus_pattern: "my\\s+\\w+", accepted_patterns: ["my\\s+name", "my\\s+father", "my\\s+mother", "my\\s+brother", "my\\s+sister", "my\\s+\\w+"], on_success: { message: "Zo'r! 'My' so'zini to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // name
        {
          id: "V_U01_L01_name",
          en: "name",
          uz: "ism",
          ar: "اسم",
          pos: "noun",
          type: "identity_noun",
          priority: 1,
          category: "identity",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_name.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Sizning ismingiz Ali-mi?", ar_context: "هل اسمك علي؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_name.mp3", uz_mirror_answer: "Yo'q, mening ismim Sara.", ar_mirror_answer: "لا ، اسمي سارة.", hybrid_answer: "Yo'q, mening **name** Sara.", en_canonical: "No, my name is Sara.", syntax_scaffold: "[Yo'q], [mening] **name** is [Sara]" },
            { phase: "practice", type: "concept_check", instruction: "Bu gapda 'name' so'zi nima haqida?", ar_instruction: "ماذا تعني كلمة name هنا؟", exercise: { type: "function_sort", sentence: "My name is Ali.", options: [{ label: "Shaxsni aniqlash (Identity)", value: "identity", correct: true }, { label: "Harakat (Action)", value: "action", correct: false }], success_msg: "To'g'ri! 'Name' = ism, shaxsni aniqlaydi.", fail_msg: "Yo'q. 'Name' = ISM. Bu harakat emas, shaxsni aniqlash." } },
            { phase: "practice", type: "discovery", instruction: "'Name' so'zi gapda qanday o'rin egallaydi?", sentence: "My name is Ali.", highlight_tokens: ["name"], options: [{ label: "Ot (noun) — shaxsni aniqlash uchun", value: "noun_identity", correct: true }, { label: "Fe'l (verb) — harakat bildiradi", value: "verb_action", correct: false }], success_msg: "'Name' = ISM (ot). 'My name is...' — shaxsni aniqlash uchun ishlatiladi.", fail_msg: "'Name' = ISM (ot). Bu harakat emas, shaxsni aniqlash uchun." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "Her name is Sara.", uz: "Uning ismi Sara.", subject: "Her", focus_word: "name" }, { en: "What is his name?", uz: "Uning ismi nima?", subject: "his", focus_word: "name" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening ismim [your name].", model_answer: "My name is [student's name].", accepted_answers: ["My name is...", "I am...", "My name's..."], trap: { trigger: "Me name", message: "⚠️ 'Me' emas! 'MY name' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizning ismini ingliz tilida ayting.", focus_pattern: "name\\s+is", accepted_patterns: ["(his|her|my)\\s+name\\s+is\\s+\\w+", "name\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Ism haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // is
        {
          id: "V_U01_L01_is",
          en: "is",
          uz: "-dir / -mi",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_is.png",
          grammar_table: { subjects: ["he", "she", "it"], form: "is", usage: "'He', 'She', 'It' va ismlar bilan ishlatiladi." },
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Men o'qituvchi-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_is.mp3", uz_mirror_answer: "Yo'q, u talaba.", hybrid_answer: "Yo'q, he **is** a student.", en_canonical: "No, he is a student.", grammar_visual: { subjects: ["he", "she", "it", "name"], verb: "is", pattern: "He/She/It/Name + IS + noun/adjective" }, syntax_scaffold: "[Yo'q], [u] **is** [talaba]" },
            { phase: "practice", type: "concept_check", instruction: "'Is' qaysi olmoshlar bilan ishlatiladi?", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "He / She / It bilan", value: "third_singular", correct: true }, { label: "I / You / We bilan", value: "first_second", correct: false }], success_msg: "To'g'ri! 'IS' = He/She/It (uchinchi shaxs birlik).", fail_msg: "Yo'q. 'IS' = He/She/It. 'I' = am, 'You/We/They' = are." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'are' emas, 'is' ishlatilgan?", sentence: "He is a teacher.", highlight_tokens: ["is"], options: [{ label: "'He' — uchinchi shaxs birlik, 'is' kerak", value: "third_singular", correct: true }, { label: "'He' — ko'plik, 'are' kerak", value: "plural", correct: false }], success_msg: "'He/She/It' bilan har doim 'IS' keladi. 'Are' = you/we/they.", fail_msg: "'Is' = He/She/It BILAN. 'Are' = You/We/They bilan." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "She is a student.", uz: "U talaba.", subject: "She", focus_word: "is" }, { en: "Is he here?", uz: "U shu yerda-mi?", subject: "he", focus_word: "Is" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi (erkak).", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher."], trap: { trigger: "He am", message: "⚠️ 'He AM' emas! 'He IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdoshingiz haqida gap ayting: U ... (He/She is ...)", focus_pattern: "(he|she)\\s+is", accepted_patterns: ["he\\s+is\\s+\\w+", "she\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'Is' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // I
        {
          id: "V_U01_L01_I",
          en: "I",
          uz: "men",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_I.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_I.mp3", uz_mirror_answer: "Yo'q, men talabaman.", hybrid_answer: "Yo'q, **I** am a student.", en_canonical: "No, I am a student.", syntax_scaffold: "[Yo'q], **I** am [talaba]" },
            { phase: "practice", type: "concept_check", instruction: "'I' so'zi kim haqida gapiradi?", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "Gapiruvchi (Speaker)", value: "speaker", correct: true }, { label: "Boshqa odam (Another person)", value: "other", correct: false }], success_msg: "To'g'ri! 'I' = MEN, gapiruvchi o'zi haqida.", fail_msg: "Yo'q. 'I' har doim GAPIRUVCHI haqida." } },
            { phase: "practice", type: "discovery", instruction: "'I' dan keyin qaysi fe'l keladi?", sentence: "I am a student.", highlight_tokens: ["I", "am"], options: [{ label: "'I' + 'am' — faqat shu juftlik to'g'ri", value: "i_am", correct: true }, { label: "'I' + 'is' — uchinchi shaxs bilan", value: "i_is", correct: false }], success_msg: "'I' har doim 'AM' bilan keladi. I AM = Men ...man.", fail_msg: "'I' FAQAT 'am' bilan! 'Is' = he/she/it." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "I am a student.", uz: "Men talabaman.", subject: "I", focus_word: "I" }, { en: "I am a teacher.", uz: "Men o'qituvchiman.", subject: "I", focus_word: "I" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men talabaman.", model_answer: "I am a student.", accepted_answers: ["I am a student.", "I'm a student."], trap: { trigger: "Me am", message: "⚠️ 'Me am' emas! 'I AM' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'zingiz haqida ingliz tilida bir gap ayting: I am ...", focus_pattern: "I\\s+am", accepted_patterns: ["I\\s+am\\s+\\w+", "I'm\\s+\\w+"], on_success: { message: "Ajoyib! O'zingiz haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // am
        {
          id: "V_U01_L01_am",
          en: "am",
          uz: "-man",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_am.png",
          grammar_table: { singular: { subjects: ["I"], form: "am" }, usage: "Faqat 'I' bilan ishlatiladi. I AM = Men ...man" },
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "Siz talaba-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_am.mp3", uz_mirror_answer: "Ha, men talabaman.", hybrid_answer: "Ha, I **am** a student.", en_canonical: "Yes, I am a student.", grammar_visual: { subject: "I", verb: "am", pattern: "I + AM + noun/adjective" }, syntax_scaffold: "[Ha], I **am** [talaba]" },
            { phase: "practice", type: "concept_check", instruction: "'Am' qaysi olmosh bilan ishlatiladi?", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "Faqat 'I' bilan (Only with 'I')", value: "I", correct: true }, { label: "Barcha olmoshlar bilan (With all pronouns)", value: "all", correct: false }], success_msg: "To'g'ri! 'AM' faqat 'I' bilan. I AM = Men ...man.", fail_msg: "Yo'q. 'AM' FAQAT 'I' bilan!" } },
            { phase: "practice", type: "discovery", instruction: "'Am' boshqa olmoshlar bilan ishlatiladi-mi?", sentence: "I am a student.", highlight_tokens: ["am"], options: [{ label: "Yo'q, faqat 'I' bilan", value: "only_i", correct: true }, { label: "Ha, 'he' bilan ham", value: "he_too", correct: false }], success_msg: "'Am' FAQAT 'I' bilan. He = is, You/We/They = are.", fail_msg: "'Am' faqat 'I' bilan! 'He' = is, 'You' = are." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "I am a student.", uz: "Men talabaman.", subject: "I", focus_word: "am" }, { en: "I am a teacher.", uz: "Men o'qituvchiman.", subject: "I", focus_word: "am" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men Ali-man.", model_answer: "I am Ali.", accepted_answers: ["I am Ali.", "I'm Ali."], trap: { trigger: "I is", message: "⚠️ 'I IS' emas! 'I AM' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'zingiz haqida ayting — kasbingiz yoki holatingiz: I am ...", focus_pattern: "I\\s+am|I'm", accepted_patterns: ["I\\s+am\\s+a?\\s*\\w+", "I'm\\s+a?\\s*\\w+"], on_success: { message: "A'lo! 'I am' ni mukammal ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // student
        {
          id: "V_U01_L01_student",
          en: "student",
          uz: "talaba",
          pos: "noun",
          type: "identity_noun",
          priority: 1,
          category: "profession",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_student.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "Siz o'qituvchi-misiz?", audio: "./audio_assets/unit_01/vocab/V_U01_L01_student.mp3", uz_mirror_answer: "Yo'q, men talabaman.", hybrid_answer: "Yo'q, I am a **student**.", en_canonical: "No, I am a student.", syntax_scaffold: "[Yo'q], I am [a] **student**" },
            { phase: "practice", type: "concept_check", instruction: "'Student' nima?", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "O'quvchi/Talaba (Learner)", value: "learner", correct: true }, { label: "O'qituvchi (Teacher)", value: "teacher", correct: false }], success_msg: "To'g'ri! 'Student' = TALABA, o'quvchi.", fail_msg: "Yo'q. 'Student' = talaba, 'Teacher' = o'qituvchi." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'a' artikli kerak: 'a student'?", sentence: "I am a student.", highlight_tokens: ["a", "student"], options: [{ label: "'A' = bitta, noaniq — kasb/rol oldidan kerak", value: "indefinite_article", correct: true }, { label: "'A' kerak emas, to'g'ridan-to'g'ri aytiladi", value: "no_article", correct: false }], success_msg: "Ingliz tilida kasb/rol oldidan 'A' artikli kerak: a student, a teacher.", fail_msg: "Ingliz tilida kasb oldidan 'A' artikli SHART: I am A student." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "We are students.", uz: "Biz talabamiz.", subject: "We", focus_word: "students" }, { en: "Are you a student?", uz: "Siz talaba-misiz?", subject: "you", focus_word: "student" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men talabaman.", model_answer: "I am a student.", accepted_answers: ["I am a student.", "I'm a student."], trap: { trigger: "I am student", message: "⚠️ 'A' artikli kerak! 'I am A student' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Siz talabamisiz yoki o'qituvchimisiz? Ingliz tilida javob bering.", focus_pattern: "I\\s+am\\s+a", accepted_patterns: ["I\\s+am\\s+a\\s+student", "I\\s+am\\s+a\\s+teacher", "I'm\\s+a\\s+\\w+"], on_success: { message: "Zo'r! Kasbingiz haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        }
      ]
    },

    "U01_L02": {
      lesson_id: "U01_L02",
      title: "Interaction",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_L02_D01_1",
      items: [
        // nice
        {
          id: "V_U01_L02_nice",
          en: "nice",
          uz: "yoqimli",
          pos: "adjective",
          type: "greeting_adjective",
          priority: 2,
          category: "greeting",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_nice.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "Uni tanishgandan bexursand-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_nice.mp3", uz_mirror_answer: "Yo'q, tanishgandan xursandman.", hybrid_answer: "Yo'q, **nice** to meet you!", en_canonical: "No, nice to meet you!", syntax_scaffold: "[Yo'q], **nice** to meet [siz]!" },
            { phase: "practice", type: "concept_check", instruction: "'Nice to meet you' qachon ishlatiladi?", exercise: { type: "function_sort", sentence: "Nice to meet you, Sara.", options: [{ label: "Birinchi marta tanishganda (First meeting)", value: "first", correct: true }, { label: "Har doim ko'rishganda (Every meeting)", value: "always", correct: false }], success_msg: "To'g'ri! 'Nice to meet you' = birinchi tanishuv.", fail_msg: "Yo'q. 'Nice to meet you' = BIRINCHI marta tanishganda." } },
            { phase: "practice", type: "discovery", instruction: "'Nice to meet you' — bu iboraning tarkibini ko'ring.", sentence: "Nice to meet you, Sara.", highlight_tokens: ["Nice", "meet"], options: [{ label: "Salomlashish iborasi — birinchi uchrashuv", value: "greeting_phrase", correct: true }, { label: "Maqtash iborasi — yaxshi ish qildi", value: "compliment", correct: false }], success_msg: "'Nice to meet you' = birinchi marta uchrashgandagi RASMIY salom.", fail_msg: "Bu maqtash emas! 'Nice to meet you' = tanishish salomlashishi." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "Nice to meet you, Malika.", uz: "Tanishganimdan xursandman, Malika.", subject: "", focus_word: "Nice" }, { en: "Very nice to meet you.", uz: "Sizni tanishgandan juda xursandman.", subject: "", focus_word: "nice" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Tanishganimdan xursandman.", model_answer: "Nice to meet you.", accepted_answers: ["Nice to meet you.", "Nice to meet you!"], trap: { trigger: "Nice meet you", message: "⚠️ 'TO' kerak! 'Nice TO meet you' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Yangi do'stingizga salomlashing: Nice to meet you, [ism]!", focus_pattern: "nice\\s+to\\s+meet", accepted_patterns: ["nice\\s+to\\s+meet\\s+you", "nice\\s+to\\s+meet\\s+you.*"], on_success: { message: "Ajoyib salomlashish! 🎉", unlock_next: true } }
          ]
        },
        // meet
        {
          id: "V_U01_L02_meet",
          en: "meet",
          uz: "tanishmoq",
          pos: "verb",
          type: "action_verb",
          priority: 2,
          category: "greeting",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_meet.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "U uni biladi-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_meet.mp3", uz_mirror_answer: "Yo'q, lekin tanishmoqchi.", hybrid_answer: "Yo'q, but I want to **meet** her.", en_canonical: "No, but I want to meet her.", syntax_scaffold: "[Yo'q], [lekin] I [xohlayman] to **meet** [uni]" },
            { phase: "practice", type: "concept_check", instruction: "'Meet' nima demak?", exercise: { type: "function_sort", sentence: "Nice to meet you.", options: [{ label: "Tanishmoq (To become acquainted)", value: "acquainted", correct: true }, { label: "Ko'rmoq (To see)", value: "see", correct: false }], success_msg: "To'g'ri! 'Meet' = TANISHMOQ.", fail_msg: "Yo'q. 'Meet' = tanishmoq, 'See' = ko'rmoq." } },
            { phase: "practice", type: "discovery", instruction: "'Meet' va 'see' — farqi nimada?", sentence: "Nice to meet you.", highlight_tokens: ["meet"], options: [{ label: "'Meet' = TANISHMOQ (birinchi marta)", value: "acquaint", correct: true }, { label: "'Meet' = KO'RMOQ (ko'z bilan)", value: "see", correct: false }], success_msg: "'Meet' = TANISHMOQ (birinchi uchrashuv). 'See' = KO'RMOQ.", fail_msg: "'Meet' ≠ 'see'. 'Meet' = TANISHMOQ, 'See' = KO'RMOQ." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "Nice to meet you all!", uz: "Hammaningiz bilan tanishgandan xursandman!", subject: "", focus_word: "meet" }, { en: "I want to meet your brother.", uz: "Akangiz bilan tanishmoqchiman.", subject: "I", focus_word: "meet" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Tanishganimdan xursandman.", model_answer: "Nice to meet you.", accepted_answers: ["Nice to meet you.", "Nice to meet you!"], trap: { trigger: "Nice to met", message: "⚠️ 'MET' emas! 'MEET' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Kim bilan tanishmoqchisiz? I want to meet ...", focus_pattern: "meet", accepted_patterns: ["(want|like)\\s+to\\s+meet\\s+\\w+", "nice\\s+to\\s+meet\\s+\\w+"], on_success: { message: "Zo'r! 'Meet' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // you
        {
          id: "V_U01_L02_you",
          en: "you",
          uz: "siz",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_you.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "Men o'qituvchiman-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_you.mp3", uz_mirror_answer: "Ha, siz to'g'ri.", hybrid_answer: "Ha, **you** are right.", en_canonical: "Yes, you are right.", syntax_scaffold: "[Ha], **you** are [to'g'ri]" },
            { phase: "practice", type: "concept_check", instruction: "'You' so'zi kim haqida?", exercise: { type: "function_sort", sentence: "Are you a teacher?", options: [{ label: "Tinglovchi (Listener)", value: "listener", correct: true }, { label: "Gapiruvchi (Speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'You' = SIZ, tinglovchi haqida.", fail_msg: "Yo'q. 'You' = TINGLOVCHI haqida, 'I' = gapiruvchi." } },
            { phase: "practice", type: "discovery", instruction: "'You' — birlik va ko'plik uchun bir xil-mi?", sentence: "Are you a teacher?", highlight_tokens: ["you"], options: [{ label: "Ha, 'you' birlik ham ko'plik ham", value: "both", correct: true }, { label: "Yo'q, ko'plik uchun boshqa so'z bor", value: "different", correct: false }], success_msg: "Ingliz tilida 'you' = siz/sen/sizlar — hammasi bir xil!", fail_msg: "'You' birlik HAM ko'plik HAM uchun ishlatiladi." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "You are Sara.", uz: "Siz Sara-siz.", subject: "You", focus_word: "You" }, { en: "You are a student.", uz: "Siz talaba-siz.", subject: "You", focus_word: "You" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Siz talaba-misiz?", model_answer: "Are you a student?", accepted_answers: ["Are you a student?", "You are a student?"], trap: { trigger: "You is", message: "⚠️ 'You IS' emas! 'You ARE' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga savol bering: Are you ...?", focus_pattern: "you", accepted_patterns: ["are\\s+you\\s+\\w+", "you\\s+are\\s+\\w+"], on_success: { message: "Ajoyib savol! 🎉", unlock_next: true } }
          ]
        },
        // are
        {
          id: "V_U01_L02_are",
          en: "are",
          uz: "-siz / -miz",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_are.png",
          grammar_table: { subjects: ["you", "we", "they"], form: "are", usage: "'You', 'We', 'They' bilan ishlatiladi." },
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 1, speaker: "Ali", bubble_text: "Are you a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_are.mp3", uz_mirror_answer: "Ha, siz talaba-siz.", hybrid_answer: "Ha, you **are** a student.", en_canonical: "Yes, you are a student.", grammar_visual: { subjects: ["you", "we", "they"], verb: "are", pattern: "You/We/They + ARE + noun/adjective" }, syntax_scaffold: "[Ha], you **are** [talaba]" },
            { phase: "practice", type: "concept_check", instruction: "'Are' qaysi olmoshlar bilan ishlatiladi?", exercise: { type: "function_sort", sentence: "You are a student.", options: [{ label: "You / We / They bilan", value: "plural", correct: true }, { label: "I / He / She bilan", value: "singular", correct: false }], success_msg: "To'g'ri! 'ARE' = You/We/They bilan.", fail_msg: "Yo'q. 'ARE' = You/We/They. 'I' = am, 'He/She' = is." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'is' emas, 'are' ishlatilgan?", sentence: "You are a student.", highlight_tokens: ["are"], options: [{ label: "'You' — ko'plik/hurmat, 'are' kerak", value: "plural_form", correct: true }, { label: "'You' — birlik, 'is' kerak", value: "singular_form", correct: false }], success_msg: "'You/We/They' bilan har doim 'ARE'. 'Is' = He/She/It.", fail_msg: "'You' bilan 'ARE' keladi, 'is' emas!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Are you a teacher?", uz: "Siz o'qituvchimisiz?", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 1, speaker: "Ali" }, { en: "You are a student.", uz: "Siz talaba-siz.", subject: "You", focus_word: "are" }, { en: "They are here.", uz: "Ular shu yerda.", subject: "They", focus_word: "are" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Siz talaba-misiz?", model_answer: "Are you a student?", accepted_answers: ["Are you a student?", "You are a student?"], trap: { trigger: "You am", message: "⚠️ 'You AM' emas! 'You ARE' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Oilangiz haqida ayting: We are ... / They are ...", focus_pattern: "(we|they|you)\\s+are", accepted_patterns: ["we\\s+are\\s+\\w+", "they\\s+are\\s+\\w+", "you\\s+are\\s+\\w+"], on_success: { message: "Zo'r! 'Are' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // teacher
        {
          id: "V_U01_L02_teacher",
          en: "teacher",
          uz: "o'qituvchi",
          pos: "noun",
          type: "identity_noun",
          priority: 1,
          category: "profession",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_teacher.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 1, speaker: "Ali", bubble_text: "Are you a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_teacher.mp3", uz_mirror_answer: "Yo'q, u o'qituvchi.", hybrid_answer: "Yo'q, he is a **teacher**.", en_canonical: "No, he is a teacher.", syntax_scaffold: "[Yo'q], he is [a] **teacher**" },
            { phase: "practice", type: "concept_check", instruction: "'Teacher' nima?", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "Kasbni bildiradi (Profession)", value: "profession", correct: true }, { label: "Joyni bildiradi (Place)", value: "place", correct: false }], success_msg: "To'g'ri! 'Teacher' = O'QITUVCHI, kasb.", fail_msg: "Yo'q. 'Teacher' = KASB, joy emas." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'a teacher' — 'a' kerak?", sentence: "He is a teacher.", highlight_tokens: ["a", "teacher"], options: [{ label: "Kasb oldidan 'a' artikli kerak", value: "indefinite_article", correct: true }, { label: "'A' kerak emas, to'g'ridan-to'g'ri aytiladi", value: "no_article", correct: false }], success_msg: "Ingliz tilida kasb aytganda 'A' artikli SHART: a teacher, a student.", fail_msg: "Kasb oldidan 'A' kerak: He is A teacher." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Are you a teacher?", uz: "Siz o'qituvchimisiz?", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 1, speaker: "Ali" }, { en: "Are you a teacher?", uz: "Siz o'qituvchi-misiz?", subject: "you", focus_word: "teacher" }, { en: "My father is a teacher.", uz: "Mening otam o'qituvchi.", subject: "My father", focus_word: "teacher" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi.", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher.", "She is a teacher.", "She's a teacher."], trap: { trigger: "He is teacher", message: "⚠️ 'A' artikli kerak! 'He is A teacher' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'qituvchingiz haqida gap ayting: He/She is a teacher.", focus_pattern: "teacher", accepted_patterns: ["(he|she)\\s+is\\s+a\\s+teacher", "my\\s+teacher\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Kasblar haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // he
        {
          id: "V_U01_L02_he",
          en: "he",
          uz: "u (erkak)",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_he.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 2, speaker: "Sara", bubble_text: "He is a teacher." },
          slides: [
            { phase: "presentation", uz_context: "U Malika-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_he.mp3", uz_mirror_answer: "Yo'q, u Karim.", hybrid_answer: "Yo'q, **he** is Karim.", en_canonical: "No, he is Karim.", syntax_scaffold: "[Yo'q], **he** is [Karim]" },
            { phase: "practice", type: "concept_check", instruction: "'He' so'zi kim haqida?", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "Erkak kishi (Male person)", value: "male", correct: true }, { label: "Ayol kishi (Female person)", value: "female", correct: false }], success_msg: "To'g'ri! 'He' = U (erkak kishi haqida).", fail_msg: "Yo'q. 'He' = ERKAK, 'She' = ayol." } },
            { phase: "practice", type: "discovery", instruction: "'He' va 'she' — qanday tanlanadi?", sentence: "He is a teacher.", highlight_tokens: ["He"], options: [{ label: "Erkak kishi haqida — 'he'", value: "male", correct: true }, { label: "Hammasi uchun bir xil", value: "same", correct: false }], success_msg: "'He' = ERKAK (u). 'She' = AYOL (u). Jins bo'yicha farqlanadi.", fail_msg: "'He' faqat ERKAK uchun! 'She' = ayol." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "He is a teacher.", uz: "U o'qituvchi.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 2, speaker: "Sara" }, { en: "He is a student.", uz: "U talaba.", subject: "He", focus_word: "He" }, { en: "Is he here?", uz: "U shu yerda-mi?", subject: "he", focus_word: "he" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi.", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher."], trap: { trigger: "He are", message: "⚠️ 'He ARE' emas! 'He IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdagi bir erkak o'quvchi haqida gap ayting: He is ...", focus_pattern: "he\\s+is", accepted_patterns: ["he\\s+is\\s+\\w+", "he's\\s+\\w+"], on_success: { message: "Zo'r! Erkak haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // she
        {
          id: "V_U01_L02_she",
          en: "she",
          uz: "u (ayol)",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_she.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 3, speaker: "Ali", bubble_text: "Is she a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U o'qituvchi-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_she.mp3", uz_mirror_answer: "Yo'q, u talaba.", hybrid_answer: "Yo'q, **she** is a student.", en_canonical: "No, she is a student.", syntax_scaffold: "[Yo'q], **she** is [talaba]" },
            { phase: "practice", type: "concept_check", instruction: "'She' so'zi kim haqida?", exercise: { type: "function_sort", sentence: "She is a student.", options: [{ label: "Ayol kishi (Female person)", value: "female", correct: true }, { label: "Erkak kishi (Male person)", value: "male", correct: false }], success_msg: "To'g'ri! 'She' = U (ayol kishi haqida).", fail_msg: "Yo'q. 'She' = AYOL, 'He' = erkak." } },
            { phase: "practice", type: "discovery", instruction: "Bu gapda nima uchun 'she' ishlatilgan?", sentence: "She is a student.", highlight_tokens: ["She"], options: [{ label: "Ayol kishi haqida gapirilmoqda", value: "female", correct: true }, { label: "Erkak kishi haqida gapirilmoqda", value: "male", correct: false }], success_msg: "'She' = U (ayol). Ayol haqida gapirganingizda 'she' ishlating.", fail_msg: "'She' = AYOL uchun! Erkak = 'he'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Is she a teacher?", uz: "U o'qituvchi-mi?", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 3, speaker: "Ali" }, { en: "She is Malika.", uz: "U Malika.", subject: "She", focus_word: "She" }, { en: "Is she here?", uz: "U shu yerda-mi?", subject: "she", focus_word: "she" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U talaba (ayol).", model_answer: "She is a student.", accepted_answers: ["She is a student.", "She's a student."], trap: { trigger: "She are", message: "⚠️ 'She ARE' emas! 'She IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdagi bir qiz o'quvchi haqida gap ayting: She is ...", focus_pattern: "she\\s+is", accepted_patterns: ["she\\s+is\\s+\\w+", "she's\\s+\\w+"], on_success: { message: "Ajoyib! Ayol haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // your
        {
          id: "V_U01_L02_your",
          en: "your",
          uz: "sizning",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_your.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 5, speaker: "Ali", bubble_text: "What is your name, Miss?" },
          slides: [
            { phase: "presentation", uz_context: "Mening akam shu yerda-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L02_your.mp3", uz_mirror_answer: "Sizning akangiz shu yerda.", hybrid_answer: "**Your** brother is here.", en_canonical: "Your brother is here.", syntax_scaffold: "**Your** [aka] is [shu yerda]" },
            { phase: "practice", type: "concept_check", instruction: "'Your' so'zi kimga tegishli?", exercise: { type: "function_sort", sentence: "Is your brother here?", options: [{ label: "Tinglovchiga tegishli (Belongs to listener)", value: "listener", correct: true }, { label: "Gapiruvchiga tegishli (Belongs to speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'YOUR' = SIZNING, tinglovchiga tegishli.", fail_msg: "Yo'q. 'YOUR' = tinglovchiga, 'MY' = gapiruvchiga." } },
            { phase: "practice", type: "discovery", instruction: "'Your' va 'you' — farqi nimada?", sentence: "What is your name?", highlight_tokens: ["your"], options: [{ label: "'Your' = sizning (egalik), 'you' = siz (olmosh)", value: "possessive", correct: true }, { label: "'Your' va 'you' bir xil", value: "same", correct: false }], success_msg: "'Your' = SIZNING (egalik). 'You' = SIZ (olmosh). Egalik uchun 'your'!", fail_msg: "'Your' ≠ 'you'. 'Your' = SIZNING, 'You' = SIZ." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "What is your name, Miss?", uz: "Ismingiz nima, xonim?", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 5, speaker: "Ali" }, { en: "What is your name?", uz: "Sizning ismingiz nima?", subject: "your", focus_word: "your" }, { en: "Your mother is Malika.", uz: "Sizning onangiz Malika.", subject: "Your", focus_word: "Your" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Sizning ismingiz nima?", model_answer: "What is your name?", accepted_answers: ["What is your name?", "What's your name?"], trap: { trigger: "you name", message: "⚠️ 'YOU name' emas! 'YOUR name' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 5 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga savol bering: What is your ...?", focus_pattern: "your", accepted_patterns: ["what\\s+is\\s+your\\s+\\w+", "your\\s+\\w+\\s+is"], on_success: { message: "Zo'r savol! 'Your' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        }
      ]
    },

    "U01_L03": {
      lesson_id: "U01_L03",
      title: "Family",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_L03_D01_1",
      items: [
        // we
        {
          id: "V_U01_L03_we",
          en: "we",
          uz: "biz",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_we.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 0, speaker: "Vali", bubble_text: "We are students." },
          slides: [
            { phase: "presentation", uz_context: "Ular o'qituvchi-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_we.mp3", uz_mirror_answer: "Yo'q, biz talabamiz.", hybrid_answer: "Yo'q, **we** are students.", en_canonical: "No, we are students.", syntax_scaffold: "[Yo'q], **we** are [talabalar]" },
            { phase: "practice", type: "concept_check", instruction: "'We' so'zi kimlar haqida?", exercise: { type: "function_sort", sentence: "We are students.", options: [{ label: "Gapiruvchi + boshqalar (Speaker + others)", value: "we", correct: true }, { label: "Faqat boshqalar (Only others)", value: "they", correct: false }], success_msg: "To'g'ri! 'We' = BIZ, gapiruvchi + boshqalar.", fail_msg: "Yo'q. 'We' = gapiruvchi O'ZI HAM ichida." } },
            { phase: "practice", type: "discovery", instruction: "'We' va 'they' — farqi nimada?", sentence: "We are students. They are teachers.", highlight_tokens: ["We", "They"], options: [{ label: "'We' = men ham ichidaman, 'they' = boshqalar", value: "inclusive_exclusive", correct: true }, { label: "'We' va 'they' bir xil", value: "same", correct: false }], success_msg: "'We' = BIZ (gapiruvchi + boshqalar). 'They' = ULAR (faqat boshqalar).", fail_msg: "'We' ≠ 'they'. 'We' = men HAM, 'They' = faqat boshqalar." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "We are students.", uz: "Biz talabalarmiz.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 0, speaker: "Vali" }, { en: "We are here.", uz: "Biz shu yerdamiz.", subject: "We", focus_word: "We" }, { en: "Are we ready?", uz: "Biz tayyormiz-mi?", subject: "we", focus_word: "we" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Biz talabamiz.", model_answer: "We are students.", accepted_answers: ["We are students.", "We're students."], trap: { trigger: "We is", message: "⚠️ 'We IS' emas! 'We ARE' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Siz va do'stlaringiz haqida ayting: We are ...", focus_pattern: "we\\s+are", accepted_patterns: ["we\\s+are\\s+\\w+", "we're\\s+\\w+"], on_success: { message: "Ajoyib! Guruh haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // they
        {
          id: "V_U01_L03_they",
          en: "they",
          uz: "ular",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_they.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 0, speaker: "Vali", bubble_text: "They are teachers." },
          slides: [
            { phase: "presentation", uz_context: "Ular shu yerda-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_they.mp3", uz_mirror_answer: "Ha, ular talaba.", hybrid_answer: "Ha, **they** are students.", en_canonical: "Yes, they are students.", syntax_scaffold: "[Ha], **they** are [talabalar]" },
            { phase: "practice", type: "concept_check", instruction: "'They' so'zi kimlar haqida?", exercise: { type: "function_sort", sentence: "They are students.", options: [{ label: "Boshqa odamlar (Other people)", value: "others", correct: true }, { label: "Gapiruvchi (Speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'They' = ULAR, boshqa odamlar haqida.", fail_msg: "Yo'q. 'They' = BOSHQALAR, 'I/We' = gapiruvchi." } },
            { phase: "practice", type: "discovery", instruction: "'They' qanday kishilar haqida ishlatiladi?", sentence: "They are students.", highlight_tokens: ["They"], options: [{ label: "Uchinchi shaxs ko'plik — boshqa odamlar", value: "third_plural", correct: true }, { label: "Birinchi shaxs — gapiruvchi va do'stlari", value: "first_person", correct: false }], success_msg: "'They' = ULAR (uchinchi shaxs ko'plik). Gapiruvchi ichida EMAS.", fail_msg: "'They' = boshqa odamlar. Gapiruvchi ichida bo'lsa 'we' ishlatiladi." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "They are teachers.", uz: "Ular o'qituvchilar.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 0, speaker: "Vali" }, { en: "They are here.", uz: "Ular shu yerda.", subject: "They", focus_word: "They" }, { en: "They are my friends.", uz: "Ular mening do'stlarim.", subject: "They", focus_word: "They" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Ular talaba.", model_answer: "They are students.", accepted_answers: ["They are students.", "They're students."], trap: { trigger: "They is", message: "⚠️ 'They IS' emas! 'They ARE' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "O'qituvchilaringiz haqida ayting: They are ...", focus_pattern: "they\\s+are", accepted_patterns: ["they\\s+are\\s+\\w+", "they're\\s+\\w+"], on_success: { message: "Zo'r! 'They' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // father
        {
          id: "V_U01_L03_father",
          en: "father",
          uz: "ota",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_father.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 1, speaker: "Vali", bubble_text: "This is my father." },
          slides: [
            { phase: "presentation", uz_context: "Ota kim?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_father.mp3", uz_mirror_answer: "Mening otam Omar.", hybrid_answer: "My **father** is Omar.", en_canonical: "My father is Omar.", syntax_scaffold: "[Mening] **father** is [Omar]" },
            { phase: "practice", type: "concept_check", instruction: "'Father' kim?", exercise: { type: "function_sort", sentence: "My father is Omar.", options: [{ label: "Erkak ota-ona (Male parent)", value: "male_parent", correct: true }, { label: "Ayol ota-ona (Female parent)", value: "female_parent", correct: false }], success_msg: "To'g'ri! 'Father' = OTA, erkak ota-ona.", fail_msg: "Yo'q. 'Father' = ota, 'Mother' = ona." } },
            { phase: "practice", type: "discovery", instruction: "'Father' so'zini qaysi egalik so'zi bilan ishlatamiz?", sentence: "My father is Omar. His name is Omar.", highlight_tokens: ["father", "My", "His"], options: [{ label: "Egalik so'zi kerak: my father, his father", value: "possessive_required", correct: true }, { label: "Egalik so'zisiz: father is Omar", value: "no_possessive", correct: false }], success_msg: "Oila a'zolari oldidan egalik so'zi kerak: MY father, HIS father.", fail_msg: "Ingliz tilida oila a'zolari oldidan egalik so'zi SHART." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my father.", uz: "Bu mening otam.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 1, speaker: "Vali" }, { en: "His father is here.", uz: "Uning otasi shu yerda.", subject: "His", focus_word: "father" }, { en: "Is your father a teacher?", uz: "Sizning otangiz o'qituvchi-mi?", subject: "your", focus_word: "father" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening otam [ism].", model_answer: "My father is [name].", accepted_answers: ["My father is..."], trap: { trigger: "My father are", message: "⚠️ 'ARE' emas! 'My father IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Otangiz haqida gap ayting: My father is ...", focus_pattern: "(my|his|her)\\s+father", accepted_patterns: ["my\\s+father\\s+is\\s+\\w+", "his\\s+father\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Otangiz haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // his
        {
          id: "V_U01_L03_his",
          en: "his",
          uz: "uning (erkak)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_his.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 1, speaker: "Vali", bubble_text: "His name is Omar." },
          slides: [
            { phase: "presentation", uz_context: "Mening ismim Karim-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_his.mp3", uz_mirror_answer: "Yo'q, uning ismi Karim.", hybrid_answer: "Yo'q, **his** name is Karim.", en_canonical: "No, his name is Karim.", syntax_scaffold: "[Yo'q], **his** [ismi] is [Karim]" },
            { phase: "practice", type: "concept_check", instruction: "'His' so'zi kimga tegishli?", exercise: { type: "function_sort", sentence: "His name is Karim.", options: [{ label: "Erkak kishiga tegishli (Belongs to male)", value: "male", correct: true }, { label: "Ayol kishiga tegishli (Belongs to female)", value: "female", correct: false }], success_msg: "To'g'ri! 'HIS' = UNING (erkak kishiga tegishli).", fail_msg: "Yo'q. 'HIS' = erkak, 'HER' = ayol." } },
            { phase: "practice", type: "discovery", instruction: "'His' va 'he' — qanday farq bor?", sentence: "His name is Karim.", highlight_tokens: ["His"], options: [{ label: "'His' = uning (egalik), 'he' = u (olmosh)", value: "possessive_vs_pronoun", correct: true }, { label: "'His' va 'he' bir xil ma'noda", value: "same", correct: false }], success_msg: "'His' = UNING (egalik). 'He' = U (olmosh). Egalik uchun 'his'!", fail_msg: "'His' ≠ 'he'. 'His' = UNING (egalik), 'He' = U (olmosh)." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "His name is Omar.", uz: "Uning ismi Omar.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 1, speaker: "Vali" }, { en: "His father is here.", uz: "Uning otasi shu yerda.", subject: "His", focus_word: "His" }, { en: "Is his sister a student?", uz: "Uning singlisi talaba-mi?", subject: "his", focus_word: "his" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Uning ismi Karim (erkak).", model_answer: "His name is Karim.", accepted_answers: ["His name is Karim."], trap: { trigger: "He name", message: "⚠️ 'HE name' emas! 'HIS name' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingiz (erkak) haqida ayting: His name is ...", focus_pattern: "his\\s+\\w+", accepted_patterns: ["his\\s+name\\s+is\\s+\\w+", "his\\s+father\\s+is\\s+\\w+", "his\\s+\\w+\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'His' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // mother
        {
          id: "V_U01_L03_mother",
          en: "mother",
          uz: "ona",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_mother.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 2, speaker: "Vali", bubble_text: "This is my mother." },
          slides: [
            { phase: "presentation", uz_context: "Ona kim?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_mother.mp3", uz_mirror_answer: "Mening onam Laylo.", hybrid_answer: "My **mother** is Laylo.", en_canonical: "My mother is Laylo.", syntax_scaffold: "[Mening] **mother** is [Laylo]" },
            { phase: "practice", type: "concept_check", instruction: "'Mother' kim?", exercise: { type: "function_sort", sentence: "My mother is Laylo.", options: [{ label: "Ayol ota-ona (Female parent)", value: "female_parent", correct: true }, { label: "Erkak ota-ona (Male parent)", value: "male_parent", correct: false }], success_msg: "To'g'ri! 'Mother' = ONA, ayol ota-ona.", fail_msg: "Yo'q. 'Mother' = ona, 'Father' = ota." } },
            { phase: "practice", type: "discovery", instruction: "'Mother' va 'father' — oiladagi roli nimada?", sentence: "My mother is Laylo.", highlight_tokens: ["mother"], options: [{ label: "'Mother' = ona (ayol ota-ona)", value: "female_parent", correct: true }, { label: "'Mother' = ota (erkak ota-ona)", value: "male_parent", correct: false }], success_msg: "'Mother' = ONA (ayol ota-ona). 'Father' = OTA (erkak ota-ona).", fail_msg: "'Mother' = ONA! 'Father' = OTA. Adashmang!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my mother.", uz: "Bu mening onam.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 2, speaker: "Vali" }, { en: "Her mother is Malika.", uz: "Uning onasi Malika.", subject: "Her", focus_word: "mother" }, { en: "Is your mother here?", uz: "Sizning onangiz shu yerda-mi?", subject: "your", focus_word: "mother" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening onam [ism].", model_answer: "My mother is [name].", accepted_answers: ["My mother is..."], trap: { trigger: "My mother are", message: "⚠️ 'ARE' emas! 'My mother IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Onangiz haqida gap ayting: My mother is ...", focus_pattern: "(my|his|her)\\s+mother", accepted_patterns: ["my\\s+mother\\s+is\\s+\\w+", "her\\s+mother\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Onangiz haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // her
        {
          id: "V_U01_L03_her",
          en: "her",
          uz: "uning (ayol)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_her.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 2, speaker: "Vali", bubble_text: "Her name is Laylo." },
          slides: [
            { phase: "presentation", uz_context: "Mening onamning ismi nima?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_her.mp3", uz_mirror_answer: "Uning ismi Malika.", hybrid_answer: "**Her** name is Malika.", en_canonical: "Her name is Malika.", syntax_scaffold: "**Her** [ismi] is [Malika]" },
            { phase: "practice", type: "concept_check", instruction: "'Her' so'zi kimga tegishli?", exercise: { type: "function_sort", sentence: "Her name is Malika.", options: [{ label: "Ayol kishiga tegishli (Belongs to female)", value: "female", correct: true }, { label: "Erkak kishiga tegishli (Belongs to male)", value: "male", correct: false }], success_msg: "To'g'ri! 'HER' = UNING (ayol kishiga tegishli).", fail_msg: "Yo'q. 'HER' = ayol, 'HIS' = erkak." } },
            { phase: "practice", type: "discovery", instruction: "'Her' qaysi jinsdagi kishi uchun ishlatiladi?", sentence: "Her name is Malika.", highlight_tokens: ["Her"], options: [{ label: "Ayol uchun — 'her' = uning (ayol)", value: "female", correct: true }, { label: "Erkak uchun — 'her' = uning (erkak)", value: "male", correct: false }], success_msg: "'Her' = UNING (ayol). 'His' = UNING (erkak). Jins bo'yicha farqlanadi.", fail_msg: "'Her' = AYOL uchun! Erkak uchun 'his' ishlating." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Her name is Laylo.", uz: "Uning ismi Laylo.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 2, speaker: "Vali" }, { en: "Her father is Omar.", uz: "Uning otasi Omar.", subject: "Her", focus_word: "Her" }, { en: "Is her brother here?", uz: "Uning akasi shu yerda-mi?", subject: "her", focus_word: "her" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Uning ismi Malika (ayol).", model_answer: "Her name is Malika.", accepted_answers: ["Her name is Malika."], trap: { trigger: "She name", message: "⚠️ 'SHE name' emas! 'HER name' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingiz (qiz) haqida ayting: Her name is ...", focus_pattern: "her\\s+\\w+", accepted_patterns: ["her\\s+name\\s+is\\s+\\w+", "her\\s+mother\\s+is\\s+\\w+", "her\\s+\\w+\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'Her' ni to'g'ri ishlatdingiz! 🎉", unlock_next: true } }
          ]
        },
        // brother
        {
          id: "V_U01_L03_brother",
          en: "brother",
          uz: "aka",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_brother.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 3, speaker: "Vali", bubble_text: "This is my brother." },
          slides: [
            { phase: "presentation", uz_context: "Akangiz shu yerda-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_brother.mp3", uz_mirror_answer: "Ha, mening akam shu yerda.", hybrid_answer: "Ha, my **brother** is here.", en_canonical: "Yes, my brother is here.", syntax_scaffold: "[Ha], [mening] **brother** is [shu yerda]" },
            { phase: "practice", type: "concept_check", instruction: "'Brother' kim?", exercise: { type: "function_sort", sentence: "Is your brother here?", options: [{ label: "Erkak bola (Male sibling)", value: "male_sibling", correct: true }, { label: "Ayol bola (Female sibling)", value: "female_sibling", correct: false }], success_msg: "To'g'ri! 'Brother' = AKA, erkak bola.", fail_msg: "Yo'q. 'Brother' = aka, 'Sister' = singil." } },
            { phase: "practice", type: "discovery", instruction: "'Brother' va 'sister' — qanday juftlik?", sentence: "This is my brother and my sister.", highlight_tokens: ["brother", "sister"], options: [{ label: "'Brother' = erkak, 'sister' = ayol (aka-singil)", value: "male_female_sibling", correct: true }, { label: "'Brother' va 'sister' bir xil", value: "same", correct: false }], success_msg: "'Brother' = AKA/UKA (erkak). 'Sister' = OPA/SINGIL (ayol).", fail_msg: "'Brother' = erkak bola, 'Sister' = ayol bola. Farq bor!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my brother.", uz: "Bu mening akam.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 3, speaker: "Vali" }, { en: "My brother is a student.", uz: "Mening akam talaba.", subject: "My", focus_word: "brother" }, { en: "His brother is here.", uz: "Uning akasi shu yerda.", subject: "His", focus_word: "brother" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Sizning akangiz shu yerda-mi?", model_answer: "Is your brother here?", accepted_answers: ["Is your brother here?", "Is your brother here"], trap: { trigger: "Your brother is here?", message: "⚠️ Savol uchun 'IS' birinchi! 'IS your brother here?' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Akangiz yoki ukangiz bormi? My brother is ...", focus_pattern: "brother", accepted_patterns: ["my\\s+brother\\s+is\\s+\\w+", "I\\s+have\\s+a\\s+brother", "his\\s+brother"], on_success: { message: "Ajoyib! Oilangiz haqida gapira olasiz! 🎉", unlock_next: true } }
          ]
        },
        // sister
        {
          id: "V_U01_L03_sister",
          en: "sister",
          uz: "singil",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_sister.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 3, speaker: "Vali", bubble_text: "and my sister." },
          slides: [
            { phase: "presentation", uz_context: "Singlingiz shu yerda-mi?", audio: "./audio_assets/unit_01/vocab/V_U01_L03_sister.mp3", uz_mirror_answer: "Ha, mening singlim shu yerda.", hybrid_answer: "Ha, my **sister** is here.", en_canonical: "Yes, my sister is here.", syntax_scaffold: "[Ha], [mening] **sister** is [shu yerda]" },
            { phase: "practice", type: "concept_check", instruction: "'Sister' kim?", exercise: { type: "function_sort", sentence: "Is your sister a student?", options: [{ label: "Ayol bola (Female sibling)", value: "female_sibling", correct: true }, { label: "Erkak bola (Male sibling)", value: "male_sibling", correct: false }], success_msg: "To'g'ri! 'Sister' = SINGIL, ayol bola.", fail_msg: "Yo'q. 'Sister' = singil, 'Brother' = aka." } },
            { phase: "practice", type: "discovery", instruction: "'Sister' so'zi kimni bildiradi?", sentence: "Is your sister a student?", highlight_tokens: ["sister"], options: [{ label: "Ayol aka-uka (opa yoki singil)", value: "female_sibling", correct: true }, { label: "Erkak aka-uka (aka yoki uka)", value: "male_sibling", correct: false }], success_msg: "'Sister' = OPA/SINGIL (ayol). Erkak = 'brother'.", fail_msg: "'Sister' = AYOL bola! Erkak = 'brother'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my sister.", uz: "Bu mening singlim.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 3, speaker: "Vali" }, { en: "Is your sister a student?", uz: "Sizning singlingiz talaba-mi?", subject: "your", focus_word: "sister" }, { en: "His sister is a teacher.", uz: "Uning singlisi o'qituvchi.", subject: "His", focus_word: "sister" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening singlim shu yerda.", model_answer: "My sister is here.", accepted_answers: ["My sister is here.", "My sister is here"], trap: { trigger: "My sister are", message: "⚠️ 'ARE' emas! 'My sister IS' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Opangiz yoki singlingiz bormi? My sister is ...", focus_pattern: "sister", accepted_patterns: ["my\\s+sister\\s+is\\s+\\w+", "I\\s+have\\s+a\\s+sister", "her\\s+sister"], on_success: { message: "Zo'r! Oila haqida to'liq gapira olasiz! 🎉", unlock_next: true } }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════════
  getCardsForLesson: function(lessonId) {
    const lesson = this.lessons?.[lessonId];
    return lesson?.items || [];
  },

  getLesson: function(lessonId) {
    return this.lessons?.[lessonId] || null;
  },

  getDialogue: function(dialogueId) {
    return this.dialogues?.[dialogueId] || null;
  },

  getCardById: function(cardId) {
    for (const lessonKey in this.lessons) {
      const lesson = this.lessons[lessonKey];
      for (const item of lesson.items) {
        if (item.id === cardId) {
          return item;
        }
      }
    }
    return null;
  }
};

if (Object.freeze) {
  Object.freeze(window.VOCAB_CARDS_U01);
}
