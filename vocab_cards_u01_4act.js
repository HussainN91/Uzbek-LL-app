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
        { speaker: "Ali", line: "Hello! My name is Ali.", line_uz: "Salom! Mening ismim Ali.", line_ar: "مرحبا! اسمي علي.", target: ["Hello", "My", "name", "is"], mastery_key: "U01_L01_D01_0", audio_id: "U01_L01_D01_L0" },
        { speaker: "Ali", line: "I am a student.", line_uz: "Men talabaman.", line_ar: "أنا طالب.", target: ["I", "am", "student"], mastery_key: "U01_L01_D01_1", audio_id: "U01_L01_D01_L1" },
        { speaker: "Sara", line: "Hello, Ali. My name is Sara.", line_uz: "Salom, Ali. Mening ismim Sara.", line_ar: "مرحبا علي. اسمي سارة.", target: [], mastery_key: "U01_L01_D01_2", audio_id: "U01_L01_D01_L2" },
        { speaker: "Sara", line: "I am a student too.", line_uz: "Men ham talabaman.", line_ar: "أنا طالبة أيضا.", target: [], mastery_key: "U01_L01_D01_3", audio_id: "U01_L01_D01_L3" }
      ]
    },
    "U01_L02_D01": {
      id: "U01_L02_D01",
      title: "Interaction",
      lines: [
        { speaker: "Ali", line: "Nice to meet you, Sara.", line_uz: "Tanishganimdan xursandman, Sara.", line_ar: "تشرفت بلقائك يا سارة.", target: ["Nice", "meet", "you"], mastery_key: "U01_L02_D01_0", audio_id: "U01_L02_D01_L0" },
        { speaker: "Ali", line: "Are you a teacher?", line_uz: "Siz o'qituvchimisiz?", line_ar: "هل أنت معلمة؟", target: ["Are", "teacher", "you"], mastery_key: "U01_L02_D01_1", audio_id: "U01_L02_D01_L1" },
        { speaker: "Sara", line: "No. He is a teacher.", line_uz: "Yo'q. U o'qituvchi.", line_ar: "لا. هو معلم.", target: ["He", "is", "teacher"], mastery_key: "U01_L02_D01_2", audio_id: "U01_L02_D01_L2" },
        { speaker: "Ali", line: "Is she a teacher?", line_uz: "U o'qituvchimi?", line_ar: "هل هي معلمة؟", target: ["she"], mastery_key: "U01_L02_D01_3", audio_id: "U01_L02_D01_L3" },
        { speaker: "Sara", line: "No, she is a student.", line_uz: "Yo'q, u talaba.", line_ar: "لا، هي طالبة.", target: [], mastery_key: "U01_L02_D01_4", audio_id: "U01_L02_D01_L4" },
        { speaker: "Ali", line: "What is your name, Miss?", line_uz: "Ismingiz nima, xonim?", line_ar: "ما اسمك يا آنسة؟", target: ["your"], mastery_key: "U01_L02_D01_5", audio_id: "U01_L02_D01_L5" }
      ]
    },
    "U01_L03_D01": {
      id: "U01_L03_D01",
      title: "Family",
      lines: [
        { speaker: "Vali", line: "We are students. They are teachers.", line_uz: "Biz talabalarmiz. Ular o'qituvchilar.", line_ar: "نحن طلاب. هم معلمون.", target: ["We", "They"], mastery_key: "U01_L03_D01_0", audio_id: "U01_L03_D01_L0" },
        { speaker: "Vali", line: "This is my father. His name is Omar.", line_uz: "Bu mening otam. Uning ismi Omar.", line_ar: "هذا أبي. اسمه عمر.", target: ["father", "His"], mastery_key: "U01_L03_D01_1", audio_id: "U01_L03_D01_L1" },
        { speaker: "Vali", line: "This is my mother. Her name is Laylo.", line_uz: "Bu mening onam. Uning ismi Laylo.", line_ar: "هذه أمي. اسمها ليلى.", target: ["mother", "Her"], mastery_key: "U01_L03_D01_2", audio_id: "U01_L03_D01_L2" },
        { speaker: "Vali", line: "This is my brother and my sister.", line_uz: "Bu mening akam va mening singlim.", line_ar: "هذا أخي وهذه أختي.", target: ["brother", "sister"], mastery_key: "U01_L03_D01_3", audio_id: "U01_L03_D01_L3" }
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
          ar: "مرحبا",
          pos: "interjection",
          type: "greeting",
          priority: 1,
          category: "greeting",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_hello.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "Hello! My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Xayr aytish kerak-mi?", ar_context: "هل يجب أن أقول وداعًا؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_hello.mp3", uz_mirror_answer: "Yo'q, salom aytish kerak.", ar_mirror_answer: "لا، يجب أن أقول مرحباً.", hybrid_answer: "Yo'q, **hello** demoq kerak.", en_canonical: "No, we say hello.", syntax_scaffold: "[Yo'q], [biz] **hello** [deymiz]", ar_syntax_scaffold: "[لا]، [نحن] **hello** [نقول]" },
            { phase: "practice", type: "concept_check", instruction: "'Hello' qachon ishlatiladi?", ar_instruction: "متى نستخدم 'Hello'؟", exercise: { type: "function_sort", sentence: "Hello! My name is Ali.", options: [{ label: "Uchrashganda (When meeting)", ar_label: "عند اللقاء (When meeting)", value: "meeting", correct: true }, { label: "Xayrlashganda (When leaving)", ar_label: "عند الوداع (When leaving)", value: "leaving", correct: false }], success_msg: "To'g'ri! 'Hello' = SALOM, uchrashganda.", ar_success_msg: "صحيح! 'Hello' = مرحبا، عند اللقاء.", fail_msg: "Yo'q. 'Hello' = uchrashganda, 'Goodbye' = xayrlashganda.", ar_fail_msg: "لا. 'Hello' = عند اللقاء، 'Goodbye' = عند الوداع." } },
            { phase: "practice", type: "discovery", instruction: "Diqqat bilan qarang: 'Hello' qayerda keladi?", ar_instruction: "انظر بعناية: أين تأتي 'Hello'؟", sentence: "Hello! My name is Ali.", highlight_tokens: ["Hello"], options: [{ label: "Gapning boshida — salomlashish (At the beginning — greeting)", ar_label: "في بداية الجملة — تحية (At the beginning — greeting)", value: "greeting_position", correct: true }, { label: "Gapning oxirida — xayrlashish (At the end — farewell)", ar_label: "في نهاية الجملة — وداع (At the end — farewell)", value: "farewell_position", correct: false }], success_msg: "'Hello' har doim gapning BOSHIDA keladi — uchrashgandagi salomlashish.", ar_success_msg: "'Hello' تأتي دائماً في بداية الجملة — تحية عند اللقاء.", fail_msg: "Yo'q. 'Hello' gapning BOSHIDA, salomlashish uchun ishlatiladi.", ar_fail_msg: "لا. 'Hello' تأتي في بداية الجملة، للتحية." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Hello! My name is Ali.", uz: "Salom! Mening ismim Ali.", ar: "مرحبا! اسمي علي.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "Hello, Sara!", uz: "Salom, Sara!", ar: "مرحبا، سارة!", subject: "", focus_word: "Hello" }, { en: "Hello, everyone!", uz: "Salom, hamma!", ar: "مرحبا للجميع!", subject: "", focus_word: "Hello" }] },
            { phase: "production", uz_prompt: "Ingliz tilida salom ayting.", ar_prompt: "قل مرحباً باللغة الإنجليزية.", model_answer: "Hello!", accepted_answers: ["Hello!", "Hello.", "Hi!"], trap: { trigger: "Salom", message: "⚠️ Ingliz tilida! 'HELLO' to'g'ri.", ar_message: "⚠️ بالإنجليزية! 'HELLO' هو الصحيح." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga ingliz tilida salom ayting va ismingizni ayting.", ar_prompt: "قل مرحباً لصديقك واذكر اسمك.", focus_pattern: "hello|hi", accepted_patterns: ["hello.*my\\s+name", "hi.*my\\s+name", "hello.*I\\s+am"], on_success: { message: "Ajoyib! Siz ingliz tilida salomlasha olasiz! 🎉", ar_message: "رائع! يمكنك التحية بالإنجليزية! 🎉", unlock_next: true } }
          ]
        },
        // my
        {
          id: "V_U01_L01_my",
          en: "my",
          uz: "mening",
          ar: "لي (ملكي)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_my.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Uning ismi Ali-mi?", ar_context: "هل اسمه علي؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_my.mp3", uz_mirror_answer: "Yo'q, mening ismim Sara.", ar_mirror_answer: "لا، اسمي سارة.", hybrid_answer: "Yo'q, **my** name is Sara.", en_canonical: "No, my name is Sara.", syntax_scaffold: "[Yo'q], **my** [ismim] [Sara]", ar_syntax_scaffold: "[لا]، **my** [اسمي] [سارة]" },
            { phase: "practice", type: "concept_check", instruction: "'My' so'zi kim haqida?", ar_instruction: "عمن تتحدث كلمة 'My'؟", exercise: { type: "function_sort", sentence: "My name is Ali.", options: [{ label: "Gapiruvchiga tegishli (Belongs to speaker)", ar_label: "تابع للمتحدث (Belongs to speaker)", value: "speaker", correct: true }, { label: "Boshqaga tegishli (Belongs to someone else)", ar_label: "تابع لشخص آخر (Belongs to someone else)", value: "other", correct: false }], success_msg: "To'g'ri! 'MY' = MENING, gapiruvchiga tegishli.", ar_success_msg: "صحيح! 'MY' = لي، تابع للمتحدث.", fail_msg: "Yo'q. 'MY' = gapiruvchining o'zi.", ar_fail_msg: "لا. 'MY' = المتحدث نفسه." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'me' emas, 'my' ishlatilgan?", ar_instruction: "لماذا استخدمنا 'my' وليس 'me'؟", sentence: "My name is Sara.", highlight_tokens: ["My"], options: [{ label: "'My' = egalik (mening) — ism oldidan keladi", ar_label: "'My' = ملكية (لي) — تأتي قبل الاسم", value: "possessive", correct: true }, { label: "'My' = meni — tushum kelishigi", ar_label: "'My' = لي — مفعول به", value: "object", correct: false }], success_msg: "'My' = MENING (egalik). Ism/narsa oldidan keladi: MY name, MY book.", ar_success_msg: "'My' = لي (ملكية). تأتي قبل الاسم: MY name, MY book.", fail_msg: "'My' = MENING. 'Me' = MENI. Ism oldidan doim 'MY' kerak.", ar_fail_msg: "'My' = لي. 'Me' = أنا. قبل الاسم دائماً 'MY'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", ar: "اسمي علي.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "My father is Omar.", uz: "Mening otam Omar.", ar: "أبي عمر.", subject: "My", focus_word: "My" }, { en: "My mother is Laylo.", uz: "Mening onam Laylo.", ar: "أمي ليلى.", subject: "My", focus_word: "My" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening ismim [your name].", ar_prompt: "قل بالإنجليزية: اسمي [اسمك].", model_answer: "My name is [name].", accepted_answers: ["My name is...", "My name's..."], trap: { trigger: "Me name", message: "⚠️ 'ME name' emas! 'MY name' to'g'ri.", ar_message: "⚠️ ليس 'ME name'! الصحيح 'MY name'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Oilangiz haqida bir gap ayting: Mening ... (my ...)", ar_prompt: "تحدث عن عائلتك: My ... (أبي، أمي...)", focus_pattern: "my\\s+\\w+", accepted_patterns: ["my\\s+name", "my\\s+father", "my\\s+mother", "my\\s+brother", "my\\s+sister", "my\\s+\\w+"], on_success: { message: "Zo'r! 'My' so'zini to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'My' بشكل صحيح! 🎉", unlock_next: true } }
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
            { phase: "presentation", uz_context: "Sizning ismingiz Ali-mi?", ar_context: "هل اسمك علي؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_name.mp3", uz_mirror_answer: "Yo'q, mening ismim Sara.", ar_mirror_answer: "لا ، اسمي سارة.", hybrid_answer: "Yo'q, mening **name** Sara.", en_canonical: "No, my name is Sara.", syntax_scaffold: "[Yo'q], [mening] **name** is [Sara]", ar_syntax_scaffold: "[لا]، [ـي] **name** is [سارة]" },
            { phase: "practice", type: "concept_check", instruction: "Bu gapda 'name' so'zi nima haqida?", ar_instruction: "ماذا تعني كلمة name هنا؟", exercise: { type: "function_sort", sentence: "My name is Ali.", options: [{ label: "Shaxsni aniqlash (Identity)", ar_label: "تحديد الهوية (Identity)", value: "identity", correct: true }, { label: "Harakat (Action)", ar_label: "فعل (Action)", value: "action", correct: false }], success_msg: "To'g'ri! 'Name' = ism, shaxsni aniqlaydi.", ar_success_msg: "صحيح! 'Name' = اسم، يحدد الهوية.", fail_msg: "Yo'q. 'Name' = ISM. Bu harakat emas, shaxsni aniqlash.", ar_fail_msg: "لا. 'Name' = اسم. ليس فعلاً، بل تحديد هوية." } },
            { phase: "practice", type: "discovery", instruction: "'Name' so'zi gapda qanday o'rin egallaydi?", ar_instruction: "أين تقع كلمة 'name' في الجملة؟", sentence: "My name is Ali.", highlight_tokens: ["name"], options: [{ label: "Ot (noun) — shaxsni aniqlash uchun", ar_label: "اسم (noun) — لتحديد الهوية", value: "noun_identity", correct: true }, { label: "Fe'l (verb) — harakat bildiradi", ar_label: "فعل (verb) — يدل على حركة", value: "verb_action", correct: false }], success_msg: "'Name' = ISM (ot). 'My name is...' — shaxsni aniqlash uchun ishlatiladi.", ar_success_msg: "'Name' = اسم. 'My name is...' — يستخدم لتحديد الهوية.", fail_msg: "'Name' = ISM (ot). Bu harakat emas, shaxsni aniqlash uchun.", ar_fail_msg: "'Name' = اسم. ليس فعلاً، بل لتحديد الهوية." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", ar: "اسمي علي.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "Her name is Sara.", uz: "Uning ismi Sara.", ar: "اسمها سارة.", subject: "Her", focus_word: "name" }, { en: "What is his name?", uz: "Uning ismi nima?", ar: "ما اسمه؟", subject: "his", focus_word: "name" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening ismim [your name].", ar_prompt: "قل بالإنجليزية: اسمي [اسمك].", model_answer: "My name is [student's name].", accepted_answers: ["My name is...", "I am...", "My name's..."], trap: { trigger: "Me name", message: "⚠️ 'Me' emas! 'MY name' to'g'ri.", ar_message: "⚠️ ليس 'Me'! الصحيح 'MY name'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizning ismini ingliz tilida ayting.", ar_prompt: "اذكر اسم صديقك بالإنجليزية.", focus_pattern: "name\\s+is", accepted_patterns: ["(his|her|my)\\s+name\\s+is\\s+\\w+", "name\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Ism haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن الأسماء! 🎉", unlock_next: true } }
          ]
        },
        // is
        {
          id: "V_U01_L01_is",
          en: "is",
          uz: "-dir / -mi",
          ar: "يكون (للمفرد)",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_is.png",
          grammar_table: { subjects: ["he", "she", "it"], form: "is", usage: "'He', 'She', 'It' va ismlar bilan ishlatiladi.", ar_usage: "يستخدم مع 'He'، 'She'، 'It' والأسماء." },
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "My name is Ali." },
          slides: [
            { phase: "presentation", uz_context: "Men o'qituvchi-mi?", ar_context: "هل هو معلم؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_is.mp3", uz_mirror_answer: "Yo'q, u talaba.", ar_mirror_answer: "لا، هو طالب.", hybrid_answer: "Yo'q, he **is** a student.", en_canonical: "No, he is a student.", grammar_visual: { subjects: ["he", "she", "it", "name"], verb: "is", pattern: "He/She/It/Name + IS + noun/adjective" }, syntax_scaffold: "[Yo'q], [u] **is** [talaba]", ar_syntax_scaffold: "[لا]، [هو] **is** [طالب]" },
            { phase: "practice", type: "concept_check", instruction: "'Is' qaysi olmoshlar bilan ishlatiladi?", ar_instruction: "مع أي ضمائر نستخدم 'Is'؟", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "He / She / It bilan", ar_label: "مع He / She / It", value: "third_singular", correct: true }, { label: "I / You / We bilan", ar_label: "مع I / You / We", value: "first_second", correct: false }], success_msg: "To'g'ri! 'IS' = He/She/It (uchinchi shaxs birlik).", ar_success_msg: "صحيح! 'IS' = He/She/It (الشخص الثالث المفرد).", fail_msg: "Yo'q. 'IS' = He/She/It. 'I' = am, 'You/We/They' = are.", ar_fail_msg: "لا. 'IS' = He/She/It. 'I' = am، 'You/We/They' = are." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'are' emas, 'is' ishlatilgan?", ar_instruction: "لماذا استخدمنا 'is' وليس 'are'؟", sentence: "He is a teacher.", highlight_tokens: ["is"], options: [{ label: "'He' — uchinchi shaxs birlik, 'is' kerak", ar_label: "'He' — الشخص الثالث المفرد، نستخدم 'is'", value: "third_singular", correct: true }, { label: "'He' — ko'plik, 'are' kerak", ar_label: "'He' — جمع، نستخدم 'are'", value: "plural", correct: false }], success_msg: "'He/She/It' bilan har doim 'IS' keladi. 'Are' = you/we/they.", ar_success_msg: "مع 'He/She/It' دائماً 'IS'. 'Are' = you/we/they.", fail_msg: "'Is' = He/She/It BILAN. 'Are' = You/We/They bilan.", ar_fail_msg: "'Is' = مع He/She/It. 'Are' = مع You/We/They." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "My name is Ali.", uz: "Mening ismim Ali.", ar: "اسمي علي.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 0, speaker: "Ali" }, { en: "She is a student.", uz: "U talaba.", ar: "هي طالبة.", subject: "She", focus_word: "is" }, { en: "Is he here?", uz: "U shu yerda-mi?", ar: "هل هو هنا؟", subject: "he", focus_word: "Is" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi (erkak).", ar_prompt: "قل بالإنجليزية: هو معلم.", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher."], trap: { trigger: "He am", message: "⚠️ 'He AM' emas! 'He IS' to'g'ri.", ar_message: "⚠️ ليس 'He AM'! الصحيح 'He IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdoshingiz haqida gap ayting: U ... (He/She is ...)", ar_prompt: "تحدث عن زميل لك: He/She is ...", focus_pattern: "(he|she)\\s+is", accepted_patterns: ["he\\s+is\\s+\\w+", "she\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'Is' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'Is' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // I
        {
          id: "V_U01_L01_I",
          en: "I",
          uz: "men",
          ar: "أنا",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_I.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", ar_context: "هل هو طالب؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_I.mp3", uz_mirror_answer: "Yo'q, men talabaman.", ar_mirror_answer: "لا، أنا طالب.", hybrid_answer: "Yo'q, **I** am a student.", en_canonical: "No, I am a student.", syntax_scaffold: "[Yo'q], **I** am [talaba]", ar_syntax_scaffold: "[لا]، **I** am [طالب]" },
            { phase: "practice", type: "concept_check", instruction: "'I' so'zi kim haqida gapiradi?", ar_instruction: "عمن يتحدث الضمير 'I'؟", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "Gapiruvchi (Speaker)", ar_label: "المتحدث (Speaker)", value: "speaker", correct: true }, { label: "Boshqa odam (Another person)", ar_label: "شخص آخر (Another person)", value: "other", correct: false }], success_msg: "To'g'ri! 'I' = MEN, gapiruvchi o'zi haqida.", ar_success_msg: "صحيح! 'I' = أنا، المتحدث عن نفسه.", fail_msg: "Yo'q. 'I' har doim GAPIRUVCHI haqida.", ar_fail_msg: "لا. 'I' دائماً عن المتحدث." } },
            { phase: "practice", type: "discovery", instruction: "'I' dan keyin qaysi fe'l keladi?", ar_instruction: "ما الفعل الذي يأتي بعد 'I'؟", sentence: "I am a student.", highlight_tokens: ["I", "am"], options: [{ label: "'I' + 'am' — faqat shu juftlik to'g'ri", ar_label: "'I' + 'am' — هذا الزوج الصحيح فقط", value: "i_am", correct: true }, { label: "'I' + 'is' — uchinchi shaxs bilan", ar_label: "'I' + 'is' — مع الشخص الثالث", value: "i_is", correct: false }], success_msg: "'I' har doim 'AM' bilan keladi. I AM = Men ...man.", ar_success_msg: "'I' دائماً مع 'AM'. I AM = أنا...", fail_msg: "'I' FAQAT 'am' bilan! 'Is' = he/she/it.", ar_fail_msg: "'I' فقط مع 'am'! 'Is' = he/she/it." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", ar: "أنا طالب.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "I am a student.", uz: "Men talabaman.", ar: "أنا طالب.", subject: "I", focus_word: "I" }, { en: "I am a teacher.", uz: "Men o'qituvchiman.", ar: "أنا معلم.", subject: "I", focus_word: "I" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men talabaman.", ar_prompt: "قل بالإنجليزية: أنا طالب.", model_answer: "I am a student.", accepted_answers: ["I am a student.", "I'm a student."], trap: { trigger: "Me am", message: "⚠️ 'Me am' emas! 'I AM' to'g'ri.", ar_message: "⚠️ ليس 'Me am'! الصحيح 'I AM'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'zingiz haqida ingliz tilida bir gap ayting: I am ...", ar_prompt: "تحدث عن نفسك بالإنجليزية: I am ...", focus_pattern: "I\\s+am", accepted_patterns: ["I\\s+am\\s+\\w+", "I'm\\s+\\w+"], on_success: { message: "Ajoyib! O'zingiz haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن نفسك! 🎉", unlock_next: true } }
          ]
        },
        // am
        {
          id: "V_U01_L01_am",
          en: "am",
          uz: "-man",
          ar: "أكون (فعل يكون)",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_am.png",
          grammar_table: { singular: { subjects: ["I"], form: "am" }, usage: "Faqat 'I' bilan ishlatiladi. I AM = Men ...man", ar_usage: "يستخدم فقط مع 'I'. I AM = أنا..." },
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "Siz talaba-mi?", ar_context: "هل أنت طالب؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_am.mp3", uz_mirror_answer: "Ha, men talabaman.", ar_mirror_answer: "نعم، أنا طالب.", hybrid_answer: "Ha, I **am** a student.", en_canonical: "Yes, I am a student.", grammar_visual: { subject: "I", verb: "am", pattern: "I + AM + noun/adjective" }, syntax_scaffold: "[Ha], I **am** [talaba]", ar_syntax_scaffold: "[نعم]، I **am** [طالب]" },
            { phase: "practice", type: "concept_check", instruction: "'Am' qaysi olmosh bilan ishlatiladi?", ar_instruction: "مع أي ضمير نستخدم 'Am'؟", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "Faqat 'I' bilan (Only with 'I')", ar_label: "فقط مع 'I' (Only with 'I')", value: "I", correct: true }, { label: "Barcha olmoshlar bilan (With all pronouns)", ar_label: "مع جميع الضمائر (With all pronouns)", value: "all", correct: false }], success_msg: "To'g'ri! 'AM' faqat 'I' bilan. I AM = Men ...man.", ar_success_msg: "صحيح! 'AM' فقط مع 'I'. I AM = أنا...", fail_msg: "Yo'q. 'AM' FAQAT 'I' bilan!", ar_fail_msg: "لا. 'AM' فقط مع 'I'!" } },
            { phase: "practice", type: "discovery", instruction: "'Am' boshqa olmoshlar bilan ishlatiladi-mi?", ar_instruction: "هل تستخدم 'Am' مع ضمائر أخرى؟", sentence: "I am a student.", highlight_tokens: ["am"], options: [{ label: "Yo'q, faqat 'I' bilan", ar_label: "لا، فقط مع 'I'", value: "only_i", correct: true }, { label: "Ha, 'he' bilan ham", ar_label: "نعم، مع 'he' أيضاً", value: "he_too", correct: false }], success_msg: "'Am' FAQAT 'I' bilan. He = is, You/We/They = are.", ar_success_msg: "'Am' فقط مع 'I'. He = is، You/We/They = are.", fail_msg: "'Am' faqat 'I' bilan! 'He' = is, 'You' = are.", ar_fail_msg: "'Am' فقط مع 'I'! 'He' = is، 'You' = are." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", ar: "أنا طالب.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "I am a student.", uz: "Men talabaman.", ar: "أنا طالب.", subject: "I", focus_word: "am" }, { en: "I am a teacher.", uz: "Men o'qituvchiman.", ar: "أنا معلم.", subject: "I", focus_word: "am" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men Ali-man.", ar_prompt: "قل بالإنجليزية: أنا علي.", model_answer: "I am Ali.", accepted_answers: ["I am Ali.", "I'm Ali."], trap: { trigger: "I is", message: "⚠️ 'I IS' emas! 'I AM' to'g'ri.", ar_message: "⚠️ ليس 'I IS'! الصحيح 'I AM'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'zingiz haqida ayting — kasbingiz yoki holatingiz: I am ...", ar_prompt: "تحدث عن نفسك: I am ...", focus_pattern: "I\\s+am|I'm", accepted_patterns: ["I\\s+am\\s+a?\\s*\\w+", "I'm\\s+a?\\s*\\w+"], on_success: { message: "A'lo! 'I am' ni mukammal ishlatdingiz! 🎉", ar_message: "ممتاز! استخدمت 'I am' بشكل مثالي! 🎉", unlock_next: true } }
          ]
        },
        // student
        {
          id: "V_U01_L01_student",
          en: "student",
          uz: "talaba",
          ar: "طالب",
          pos: "noun",
          type: "identity_noun",
          priority: 1,
          category: "profession",
          introduced_in: "U01_L01",
          image: "/images/U01/U01_L01/img_student.png",
          dialogue_ref: { dialogue_id: "U01_L01_D01", line_index: 1, speaker: "Ali", bubble_text: "I am a student." },
          slides: [
            { phase: "presentation", uz_context: "Siz o'qituvchi-misiz?", ar_context: "هل أنت معلم؟", audio: "./audio_assets/unit_01/vocab/V_U01_L01_student.mp3", uz_mirror_answer: "Yo'q, men talabaman.", ar_mirror_answer: "لا، أنا طالب.", hybrid_answer: "Yo'q, I am a **student**.", en_canonical: "No, I am a student.", syntax_scaffold: "[Yo'q], I am [a] **student**", ar_syntax_scaffold: "[لا]، I am [a] **student**" },
            { phase: "practice", type: "concept_check", instruction: "'Student' nima?", ar_instruction: "ما معنى 'Student'؟", exercise: { type: "function_sort", sentence: "I am a student.", options: [{ label: "O'quvchi/Talaba (Learner)", ar_label: "متعلم/طالب (Learner)", value: "learner", correct: true }, { label: "O'qituvchi (Teacher)", ar_label: "معلم (Teacher)", value: "teacher", correct: false }], success_msg: "To'g'ri! 'Student' = TALABA, o'quvchi.", ar_success_msg: "صحيح! 'Student' = طالب، متعلم.", fail_msg: "Yo'q. 'Student' = talaba, 'Teacher' = o'qituvchi.", ar_fail_msg: "لا. 'Student' = طالب، 'Teacher' = معلم." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'a' artikli kerak: 'a student'?", ar_instruction: "لماذا نحتاج إلى أداة 'a': 'a student'؟", sentence: "I am a student.", highlight_tokens: ["a", "student"], options: [{ label: "'A' = bitta, noaniq — kasb/rol oldidan kerak", ar_label: "'A' = واحد، غير محدد — يلزم قبل المهنة", value: "indefinite_article", correct: true }, { label: "'A' kerak emas, to'g'ridan-to'g'ri aytiladi", ar_label: "'A' غير ضروري، يقال مباشرة", value: "no_article", correct: false }], success_msg: "Ingliz tilida kasb/rol oldidan 'A' artikli kerak: a student, a teacher.", ar_success_msg: "في الإنجليزية يلزم 'A' قبل المهنة: a student, a teacher.", fail_msg: "Ingliz tilida kasb oldidan 'A' artikli SHART: I am A student.", ar_fail_msg: "في الإنجليزية 'A' ضروري قبل المهنة: I am A student." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I am a student.", uz: "Men talabaman.", ar: "أنا طالب.", is_anchor: true, source_dialogue: "U01_L01_D01", source_line: 1, speaker: "Ali" }, { en: "We are students.", uz: "Biz talabamiz.", ar: "نحن طلاب.", subject: "We", focus_word: "students" }, { en: "Are you a student?", uz: "Siz talaba-misiz?", ar: "هل أنت طالب؟", subject: "you", focus_word: "student" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men talabaman.", ar_prompt: "قل بالإنجليزية: أنا طالب.", model_answer: "I am a student.", accepted_answers: ["I am a student.", "I'm a student."], trap: { trigger: "I am student", message: "⚠️ 'A' artikli kerak! 'I am A student' to'g'ri.", ar_message: "⚠️ يلزم 'A'! الصحيح 'I am A student'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L01_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Siz talabamisiz yoki o'qituvchimisiz? Ingliz tilida javob bering.", ar_prompt: "هل أنت طالب أم معلم؟ أجب بالإنجليزية.", focus_pattern: "I\\s+am\\s+a", accepted_patterns: ["I\\s+am\\s+a\\s+student", "I\\s+am\\s+a\\s+teacher", "I'm\\s+a\\s+\\w+"], on_success: { message: "Zo'r! Kasbingiz haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن مهنتك! 🎉", unlock_next: true } }
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
          ar: "لطيف / جيد",
          pos: "adjective",
          type: "greeting_adjective",
          priority: 2,
          category: "greeting",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_nice.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "Uni tanishgandan bexursand-mi?", ar_context: "هل هو حزين لرؤيته؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_nice.mp3", uz_mirror_answer: "Yo'q, tanishgandan xursandman.", ar_mirror_answer: "لا، أنا سعيد بلقائك.", hybrid_answer: "Yo'q, **nice** to meet you!", en_canonical: "No, nice to meet you!", syntax_scaffold: "[Yo'q], **nice** to meet [siz]!", ar_syntax_scaffold: "[لا]، **nice** to meet [أنت]!" },
            { phase: "practice", type: "concept_check", instruction: "'Nice to meet you' qachon ishlatiladi?", ar_instruction: "متى نستخدم 'Nice to meet you'؟", exercise: { type: "function_sort", sentence: "Nice to meet you, Sara.", options: [{ label: "Birinchi marta tanishganda (First meeting)", ar_label: "عند اللقاء الأول (First meeting)", value: "first", correct: true }, { label: "Har doim ko'rishganda (Every meeting)", ar_label: "عند كل لقاء (Every meeting)", value: "always", correct: false }], success_msg: "To'g'ri! 'Nice to meet you' = birinchi tanishuv.", ar_success_msg: "صحيح! 'Nice to meet you' = عند اللقاء الأول.", fail_msg: "Yo'q. 'Nice to meet you' = BIRINCHI marta tanishganda.", ar_fail_msg: "لا. 'Nice to meet you' = عند اللقاء الأول فقط." } },
            { phase: "practice", type: "discovery", instruction: "'Nice to meet you' — bu iboraning tarkibini ko'ring.", ar_instruction: "انظر إلى تركيب 'Nice to meet you'.", sentence: "Nice to meet you, Sara.", highlight_tokens: ["Nice", "meet"], options: [{ label: "Salomlashish iborasi — birinchi uchrashuv", ar_label: "عبارة تحية — اللقاء الأول", value: "greeting_phrase", correct: true }, { label: "Maqtash iborasi — yaxshi ish qildi", ar_label: "عبارة مدح — عمل جيد", value: "compliment", correct: false }], success_msg: "'Nice to meet you' = birinchi marta uchrashgandagi RASMIY salom.", ar_success_msg: "'Nice to meet you' = تحية رسمية عند اللقاء الأول.", fail_msg: "Bu maqtash emas! 'Nice to meet you' = tanishish salomlashishi.", ar_fail_msg: "ليس مدحاً! 'Nice to meet you' = تحية عند التعارف." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", ar: "تشرفت بلقائك يا سارة.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "Nice to meet you, Malika.", uz: "Tanishganimdan xursandman, Malika.", ar: "تشرفت بلقائك يا مليكة.", subject: "", focus_word: "Nice" }, { en: "Very nice to meet you.", uz: "Sizni tanishgandan juda xursandman.", ar: "سررت جداً بلقائك.", subject: "", focus_word: "nice" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Tanishganimdan xursandman.", ar_prompt: "قل بالإنجليزية: سررت بلقائك.", model_answer: "Nice to meet you.", accepted_answers: ["Nice to meet you.", "Nice to meet you!"], trap: { trigger: "Nice meet you", message: "⚠️ 'TO' kerak! 'Nice TO meet you' to'g'ri.", ar_message: "⚠️ يلزم 'TO'! الصحيح 'Nice TO meet you'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Yangi do'stingizga salomlashing: Nice to meet you, [ism]!", ar_prompt: "حيِّ صديقك الجديد: Nice to meet you, [الاسم]!", focus_pattern: "nice\\s+to\\s+meet", accepted_patterns: ["nice\\s+to\\s+meet\\s+you", "nice\\s+to\\s+meet\\s+you.*"], on_success: { message: "Ajoyib salomlashish! 🎉", ar_message: "تحية رائعة! 🎉", unlock_next: true } }
          ]
        },
        // meet
        {
          id: "V_U01_L02_meet",
          en: "meet",
          uz: "tanishmoq",
          ar: "يقابل / يلتقي",
          pos: "verb",
          type: "action_verb",
          priority: 2,
          category: "greeting",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_meet.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "U uni biladi-mi?", ar_context: "هل يعرفها؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_meet.mp3", uz_mirror_answer: "Yo'q, lekin tanishmoqchi.", ar_mirror_answer: "لا، لكنه يريد أن يقابلها.", hybrid_answer: "Yo'q, but I want to **meet** her.", en_canonical: "No, but I want to meet her.", syntax_scaffold: "[Yo'q], [lekin] I [xohlayman] to **meet** [uni]", ar_syntax_scaffold: "[لا]، [لكن] I [أريد] to **meet** [ها]" },
            { phase: "practice", type: "concept_check", instruction: "'Meet' nima demak?", ar_instruction: "ماذا تعني 'Meet'؟", exercise: { type: "function_sort", sentence: "Nice to meet you.", options: [{ label: "Tanishmoq (To become acquainted)", ar_label: "التعارف (To become acquainted)", value: "acquainted", correct: true }, { label: "Ko'rmoq (To see)", ar_label: "الرؤية (To see)", value: "see", correct: false }], success_msg: "To'g'ri! 'Meet' = TANISHMOQ.", ar_success_msg: "صحيح! 'Meet' = التعارف.", fail_msg: "Yo'q. 'Meet' = tanishmoq, 'See' = ko'rmoq.", ar_fail_msg: "لا. 'Meet' = التعارف، 'See' = الرؤية." } },
            { phase: "practice", type: "discovery", instruction: "'Meet' va 'see' — farqi nimada?", ar_instruction: "ما الفرق بين 'Meet' و 'See'؟", sentence: "Nice to meet you.", highlight_tokens: ["meet"], options: [{ label: "'Meet' = TANISHMOQ (birinchi marta)", ar_label: "'Meet' = التعارف (أول مرة)", value: "acquaint", correct: true }, { label: "'Meet' = KO'RMOQ (ko'z bilan)", ar_label: "'Meet' = الرؤية (بالعين)", value: "see", correct: false }], success_msg: "'Meet' = TANISHMOQ (birinchi uchrashuv). 'See' = KO'RMOQ.", ar_success_msg: "'Meet' = التعارف (اللقاء الأول). 'See' = الرؤية.", fail_msg: "'Meet' ≠ 'see'. 'Meet' = TANISHMOQ, 'See' = KO'RMOQ.", ar_fail_msg: "'Meet' ≠ 'see'. 'Meet' = التعارف، 'See' = الرؤية." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", ar: "تشرفت بلقائك يا سارة.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "Nice to meet you all!", uz: "Hammaningiz bilan tanishgandan xursandman!", ar: "سررت بلقائكم جميعاً!", subject: "", focus_word: "meet" }, { en: "I want to meet your brother.", uz: "Akangiz bilan tanishmoqchiman.", ar: "أريد أن ألتقي بأخيك.", subject: "I", focus_word: "meet" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Tanishganimdan xursandman.", ar_prompt: "قل بالإنجليزية: سررت بلقائك.", model_answer: "Nice to meet you.", accepted_answers: ["Nice to meet you.", "Nice to meet you!"], trap: { trigger: "Nice to met", message: "⚠️ 'MET' emas! 'MEET' to'g'ri.", ar_message: "⚠️ ليس 'MET'! الصحيح 'MEET'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Kim bilan tanishmoqchisiz? I want to meet ...", ar_prompt: "بمن تريد أن تلتقي؟ I want to meet ...", focus_pattern: "meet", accepted_patterns: ["(want|like)\\s+to\\s+meet\\s+\\w+", "nice\\s+to\\s+meet\\s+\\w+"], on_success: { message: "Zo'r! 'Meet' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'Meet' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // you
        {
          id: "V_U01_L02_you",
          en: "you",
          uz: "siz",
          ar: "أنتَ / أنتِ / أنتم",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_you.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 0, speaker: "Ali", bubble_text: "Nice to meet you, Sara." },
          slides: [
            { phase: "presentation", uz_context: "Men o'qituvchiman-mi?", ar_context: "هل أنا المعلم؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_you.mp3", uz_mirror_answer: "Ha, siz to'g'ri.", ar_mirror_answer: "نعم، أنت محق.", hybrid_answer: "Ha, **you** are right.", en_canonical: "Yes, you are right.", syntax_scaffold: "[Ha], **you** are [to'g'ri]", ar_syntax_scaffold: "[نعم]، **you** are [صحيح]" },
            { phase: "practice", type: "concept_check", instruction: "'You' so'zi kim haqida?", ar_instruction: "عمن تتحدث كلمة 'You'؟", exercise: { type: "function_sort", sentence: "Are you a teacher?", options: [{ label: "Tinglovchi (Listener)", ar_label: "المستمع (Listener)", value: "listener", correct: true }, { label: "Gapiruvchi (Speaker)", ar_label: "المتحدث (Speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'You' = SIZ, tinglovchi haqida.", ar_success_msg: "صحيح! 'You' = أنت، عن المستمع.", fail_msg: "Yo'q. 'You' = TINGLOVCHI haqida, 'I' = gapiruvchi.", ar_fail_msg: "لا. 'You' = عن المستمع، 'I' = المتحدث." } },
            { phase: "practice", type: "discovery", instruction: "'You' — birlik va ko'plik uchun bir xil-mi?", ar_instruction: "هل 'You' للمفرد أم للجمع؟", sentence: "Are you a teacher?", highlight_tokens: ["you"], options: [{ label: "Ha, 'you' birlik ham ko'plik ham", ar_label: "نعم، 'you' للمفرد والجمع", value: "both", correct: true }, { label: "Yo'q, ko'plik uchun boshqa so'z bor", ar_label: "لا، هناك كلمة أخرى للجمع", value: "different", correct: false }], success_msg: "Ingliz tilida 'you' = siz/sen/sizlar — hammasi bir xil!", ar_success_msg: "في الإنجليزية 'you' = أنت/أنتم — الكل واحد!", fail_msg: "'You' birlik HAM ko'plik HAM uchun ishlatiladi.", ar_fail_msg: "'You' للمفرد والجمع معاً." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Nice to meet you, Sara.", uz: "Tanishganimdan xursandman, Sara.", ar: "تشرفت بلقائك يا سارة.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 0, speaker: "Ali" }, { en: "You are Sara.", uz: "Siz Sara-siz.", ar: "أنت سارة.", subject: "You", focus_word: "You" }, { en: "You are a student.", uz: "Siz talaba-siz.", ar: "أنت طالب.", subject: "You", focus_word: "You" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Siz talaba-misiz?", ar_prompt: "اسأل بالإنجليزية: هل أنت طالب؟", model_answer: "Are you a student?", accepted_answers: ["Are you a student?", "You are a student?"], trap: { trigger: "You is", message: "⚠️ 'You IS' emas! 'You ARE' to'g'ri.", ar_message: "⚠️ ليس 'You IS'! الصحيح 'You ARE'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga savol bering: Are you ...?", ar_prompt: "اسأل صديقك: Are you ...؟", focus_pattern: "you", accepted_patterns: ["are\\s+you\\s+\\w+", "you\\s+are\\s+\\w+"], on_success: { message: "Ajoyib savol! 🎉", ar_message: "سؤال رائع! 🎉", unlock_next: true } }
          ]
        },
        // are
        {
          id: "V_U01_L02_are",
          en: "are",
          uz: "-siz / -miz",
          ar: "تكون / تكونون (فعل يكون للجمع والمخاطب)",
          pos: "verb (TO BE)",
          type: "grammar_verb",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_are.png",
          grammar_table: { subjects: ["you", "we", "they"], form: "are", usage: "'You', 'We', 'They' bilan ishlatiladi.", ar_usage: "يُستخدم مع 'You'، 'We'، 'They'." },
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 1, speaker: "Ali", bubble_text: "Are you a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", ar_context: "هل هو طالب؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_are.mp3", uz_mirror_answer: "Ha, siz talaba-siz.", ar_mirror_answer: "نعم، أنت طالب.", hybrid_answer: "Ha, you **are** a student.", en_canonical: "Yes, you are a student.", grammar_visual: { subjects: ["you", "we", "they"], verb: "are", pattern: "You/We/They + ARE + noun/adjective" }, syntax_scaffold: "[Ha], you **are** [talaba]", ar_syntax_scaffold: "[نعم]، you **are** [طالب]" },
            { phase: "practice", type: "concept_check", instruction: "'Are' qaysi olmoshlar bilan ishlatiladi?", ar_instruction: "مع أي ضمائر نستخدم 'Are'؟", exercise: { type: "function_sort", sentence: "You are a student.", options: [{ label: "You / We / They bilan", ar_label: "مع You / We / They", value: "plural", correct: true }, { label: "I / He / She bilan", ar_label: "مع I / He / She", value: "singular", correct: false }], success_msg: "To'g'ri! 'ARE' = You/We/They bilan.", ar_success_msg: "صحيح! 'ARE' = مع You/We/They.", fail_msg: "Yo'q. 'ARE' = You/We/They. 'I' = am, 'He/She' = is.", ar_fail_msg: "لا. 'ARE' = You/We/They. 'I' = am، 'He/She' = is." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'is' emas, 'are' ishlatilgan?", ar_instruction: "لماذا استخدمنا 'are' وليس 'is'؟", sentence: "You are a student.", highlight_tokens: ["are"], options: [{ label: "'You' — ko'plik/hurmat, 'are' kerak", ar_label: "'You' — جمع/احترام، نستخدم 'are'", value: "plural_form", correct: true }, { label: "'You' — birlik, 'is' kerak", ar_label: "'You' — مفرد، نستخدم 'is'", value: "singular_form", correct: false }], success_msg: "'You/We/They' bilan har doim 'ARE'. 'Is' = He/She/It.", ar_success_msg: "مع 'You/We/They' دائماً 'ARE'. 'Is' = He/She/It.", fail_msg: "'You' bilan 'ARE' keladi, 'is' emas!", ar_fail_msg: "مع 'You' نستخدم 'ARE'، ليس 'is'!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Are you a teacher?", uz: "Siz o'qituvchimisiz?", ar: "هل أنت معلم؟", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 1, speaker: "Ali" }, { en: "You are a student.", uz: "Siz talaba-siz.", ar: "أنت طالب.", subject: "You", focus_word: "are" }, { en: "They are here.", uz: "Ular shu yerda.", ar: "هم هنا.", subject: "They", focus_word: "are" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Siz talaba-misiz?", ar_prompt: "اسأل بالإنجليزية: هل أنت طالب؟", model_answer: "Are you a student?", accepted_answers: ["Are you a student?", "You are a student?"], trap: { trigger: "You am", message: "⚠️ 'You AM' emas! 'You ARE' to'g'ri.", ar_message: "⚠️ ليس 'You AM'! الصحيح 'You ARE'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Oilangiz haqida ayting: We are ... / They are ...", ar_prompt: "تحدث عن عائلتك أو أصدقائك: We are ... / They are ...", focus_pattern: "(we|they|you)\\s+are", accepted_patterns: ["we\\s+are\\s+\\w+", "they\\s+are\\s+\\w+", "you\\s+are\\s+\\w+"], on_success: { message: "Zo'r! 'Are' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'Are' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // teacher
        {
          id: "V_U01_L02_teacher",
          en: "teacher",
          uz: "o'qituvchi",
          ar: "معلم / معلمة",
          pos: "noun",
          type: "identity_noun",
          priority: 1,
          category: "profession",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_teacher.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 1, speaker: "Ali", bubble_text: "Are you a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U talaba-mi?", ar_context: "هل هو طالب؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_teacher.mp3", uz_mirror_answer: "Yo'q, u o'qituvchi.", ar_mirror_answer: "لا، هو معلم.", hybrid_answer: "Yo'q, he is a **teacher**.", en_canonical: "No, he is a teacher.", syntax_scaffold: "[Yo'q], he is [a] **teacher**", ar_syntax_scaffold: "[لا]، he is [a] **teacher**" },
            { phase: "practice", type: "concept_check", instruction: "'Teacher' nima?", ar_instruction: "ما معنى 'Teacher'؟", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "Kasbni bildiradi (Profession)", ar_label: "مهنة (Profession)", value: "profession", correct: true }, { label: "Joyni bildiradi (Place)", ar_label: "مكان (Place)", value: "place", correct: false }], success_msg: "To'g'ri! 'Teacher' = O'QITUVCHI, kasb.", ar_success_msg: "صحيح! 'Teacher' = معلم، مهنة.", fail_msg: "Yo'q. 'Teacher' = KASB, joy emas.", ar_fail_msg: "لا. 'Teacher' = مهنة، ليس مكان." } },
            { phase: "practice", type: "discovery", instruction: "Nima uchun 'a teacher' — 'a' kerak?", ar_instruction: "لماذا نحتاج 'a' في 'a teacher'؟", sentence: "He is a teacher.", highlight_tokens: ["a", "teacher"], options: [{ label: "Kasb oldidan 'a' artikli kerak", ar_label: "يلزم 'a' قبل المهنة", value: "indefinite_article", correct: true }, { label: "'A' kerak emas, to'g'ridan-to'g'ri aytiladi", ar_label: "'A' غير ضروري، يقال مباشرة", value: "no_article", correct: false }], success_msg: "Ingliz tilida kasb aytganda 'A' artikli SHART: a teacher, a student.", ar_success_msg: "في الإنجليزية 'A' ضروري قبل المهنة: a teacher, a student.", fail_msg: "Kasb oldidan 'A' kerak: He is A teacher.", ar_fail_msg: "'A' ضروري قبل المهنة: He is A teacher." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Are you a teacher?", uz: "Siz o'qituvchimisiz?", ar: "هل أنت معلم؟", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 1, speaker: "Ali" }, { en: "Are you a teacher?", uz: "Siz o'qituvchi-misiz?", ar: "هل أنت معلم؟", subject: "you", focus_word: "teacher" }, { en: "My father is a teacher.", uz: "Mening otam o'qituvchi.", ar: "أبي معلم.", subject: "My father", focus_word: "teacher" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi.", ar_prompt: "قل بالإنجليزية: هو معلم.", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher.", "She is a teacher.", "She's a teacher."], trap: { trigger: "He is teacher", message: "⚠️ 'A' artikli kerak! 'He is A teacher' to'g'ri.", ar_message: "⚠️ يلزم 'A'! الصحيح 'He is A teacher'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "O'qituvchingiz haqida gap ayting: He/She is a teacher.", ar_prompt: "تحدث عن معلمك: He/She is a teacher.", focus_pattern: "teacher", accepted_patterns: ["(he|she)\\s+is\\s+a\\s+teacher", "my\\s+teacher\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Kasblar haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن المهن! 🎉", unlock_next: true } }
          ]
        },
        // he
        {
          id: "V_U01_L02_he",
          en: "he",
          uz: "u (erkak)",
          ar: "هو",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_he.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 2, speaker: "Sara", bubble_text: "He is a teacher." },
          slides: [
            { phase: "presentation", uz_context: "U Malika-mi?", ar_context: "من هذا الرجل؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_he.mp3", uz_mirror_answer: "Yo'q, u Karim.", ar_mirror_answer: "هو علي.", hybrid_answer: "Yo'q, **he** is Karim.", en_canonical: "No, he is Karim.", syntax_scaffold: "[Yo'q], **he** is [Karim]", ar_syntax_scaffold: "[لا]، **he** is [كريم]" },
            { phase: "practice", type: "concept_check", instruction: "'He' so'zi kim haqida?", ar_instruction: "عمن يتحدث الضمير 'He'؟", exercise: { type: "function_sort", sentence: "He is a teacher.", options: [{ label: "Erkak kishi (Male person)", ar_label: "شخص ذكر (Male person)", value: "male", correct: true }, { label: "Ayol kishi (Female person)", ar_label: "شخص أنثى (Female person)", value: "female", correct: false }], success_msg: "To'g'ri! 'He' = U (erkak kishi haqida).", ar_success_msg: "صحيح! 'He' = هو (عن شخص ذكر).", fail_msg: "Yo'q. 'He' = ERKAK, 'She' = ayol.", ar_fail_msg: "لا. 'He' = ذكر، 'She' = أنثى." } },
            { phase: "practice", type: "discovery", instruction: "'He' va 'she' — qanday tanlanadi?", ar_instruction: "هل نستخدم 'He' للفتاة؟", sentence: "He is a teacher.", highlight_tokens: ["He"], options: [{ label: "Erkak kishi haqida — 'he'", ar_label: "عن شخص ذكر — 'he'", value: "male", correct: true }, { label: "Hammasi uchun bir xil", ar_label: "نفس الشيء للجميع", value: "same", correct: false }], success_msg: "'He' = ERKAK (u). 'She' = AYOL (u). Jins bo'yicha farqlanadi.", ar_success_msg: "'He' = ذكر (هو). 'She' = أنثى (هي). يختلفان حسب الجنس.", fail_msg: "'He' faqat ERKAK uchun! 'She' = ayol.", ar_fail_msg: "'He' فقط للذكور! 'She' = أنثى." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "He is a teacher.", uz: "U o'qituvchi.", ar: "هو معلم.", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 2, speaker: "Sara" }, { en: "He is a student.", uz: "U talaba.", ar: "هو طالب.", subject: "He", focus_word: "He" }, { en: "Is he here?", uz: "U shu yerda-mi?", ar: "هل هو هنا؟", subject: "he", focus_word: "he" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U o'qituvchi.", ar_prompt: "قل بالإنجليزية: هو معلم.", model_answer: "He is a teacher.", accepted_answers: ["He is a teacher.", "He's a teacher."], trap: { trigger: "He are", message: "⚠️ 'He ARE' emas! 'He IS' to'g'ri.", ar_message: "⚠️ ليس 'He ARE'! الصحيح 'He IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdagi bir erkak o'quvchi haqida gap ayting: He is ...", ar_prompt: "تحدث عن زميل لك: He is ...", focus_pattern: "he\\s+is", accepted_patterns: ["he\\s+is\\s+\\w+", "he's\\s+\\w+"], on_success: { message: "Zo'r! Erkak haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن الذكور! 🎉", unlock_next: true } }
          ]
        },
        // she
        {
          id: "V_U01_L02_she",
          en: "she",
          uz: "u (ayol)",
          ar: "هي",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_she.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 3, speaker: "Ali", bubble_text: "Is she a teacher?" },
          slides: [
            { phase: "presentation", uz_context: "U o'qituvchi-mi?", ar_context: "هل هي معلمة؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_she.mp3", uz_mirror_answer: "Yo'q, u talaba.", ar_mirror_answer: "لا، هي طالبة.", hybrid_answer: "Yo'q, **she** is a student.", en_canonical: "No, she is a student.", syntax_scaffold: "[Yo'q], **she** is [talaba]", ar_syntax_scaffold: "[لا]، **she** is [طالبة]" },
            { phase: "practice", type: "concept_check", instruction: "'She' so'zi kim haqida?", ar_instruction: "عمن تتحدث كلمة 'She'؟", exercise: { type: "function_sort", sentence: "She is a student.", options: [{ label: "Ayol kishi (Female person)", ar_label: "شخص أنثى (Female person)", value: "female", correct: true }, { label: "Erkak kishi (Male person)", ar_label: "شخص ذكر (Male person)", value: "male", correct: false }], success_msg: "To'g'ri! 'She' = U (ayol kishi haqida).", ar_success_msg: "صحيح! 'She' = هي (عن شخص أنثى).", fail_msg: "Yo'q. 'She' = AYOL, 'He' = erkak.", ar_fail_msg: "لا. 'She' = أنثى، 'He' = ذكر." } },
            { phase: "practice", type: "discovery", instruction: "Bu gapda nima uchun 'she' ishlatilgan?", ar_instruction: "لماذا استخدمنا 'she' في هذه الجملة؟", sentence: "She is a student.", highlight_tokens: ["She"], options: [{ label: "Ayol kishi haqida gapirilmoqda", ar_label: "الحديث عن شخص أنثى", value: "female", correct: true }, { label: "Erkak kishi haqida gapirilmoqda", ar_label: "الحديث عن شخص ذكر", value: "male", correct: false }], success_msg: "'She' = U (ayol). Ayol haqida gapirganingizda 'she' ishlating.", ar_success_msg: "'She' = هي (أنثى). عند الحديث عن أنثى استخدم 'she'.", fail_msg: "'She' = AYOL uchun! Erkak = 'he'.", ar_fail_msg: "'She' = للأنثى فقط! الذكر = 'he'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Is she a teacher?", uz: "U o'qituvchi-mi?", ar: "هل هي معلمة؟", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 3, speaker: "Ali" }, { en: "She is Malika.", uz: "U Malika.", ar: "هي مليكة.", subject: "She", focus_word: "She" }, { en: "Is she here?", uz: "U shu yerda-mi?", ar: "هل هي هنا؟", subject: "she", focus_word: "she" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U talaba (ayol).", ar_prompt: "قل بالإنجليزية: هي طالبة.", model_answer: "She is a student.", accepted_answers: ["She is a student.", "She's a student."], trap: { trigger: "She are", message: "⚠️ 'She ARE' emas! 'She IS' to'g'ri.", ar_message: "⚠️ ليس 'She ARE'! الصحيح 'She IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Sinfdagi bir qiz o'quvchi haqida gap ayting: She is ...", ar_prompt: "تحدث عن زميلة لك: She is ...", focus_pattern: "she\\s+is", accepted_patterns: ["she\\s+is\\s+\\w+", "she's\\s+\\w+"], on_success: { message: "Ajoyib! Ayol haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن الإناث! 🎉", unlock_next: true } }
          ]
        },
        // your
        {
          id: "V_U01_L02_your",
          en: "your",
          uz: "sizning",
          ar: "ـك (ضمير الملكية للمخاطب)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L02",
          image: "/images/U01/U01_L01/img_your.png",
          dialogue_ref: { dialogue_id: "U01_L02_D01", line_index: 5, speaker: "Ali", bubble_text: "What is your name, Miss?" },
          slides: [
            { phase: "presentation", uz_context: "Mening akam shu yerda-mi?", ar_context: "هل هذا أخي؟", audio: "./audio_assets/unit_01/vocab/V_U01_L02_your.mp3", uz_mirror_answer: "Sizning akangiz shu yerda.", ar_mirror_answer: "أخوك هنا.", hybrid_answer: "**Your** brother is here.", en_canonical: "Your brother is here.", syntax_scaffold: "**Your** [aka] is [shu yerda]", ar_syntax_scaffold: "**Your** [أخ] is [هنا]" },
            { phase: "practice", type: "concept_check", instruction: "'Your' so'zi kimga tegishli?", ar_instruction: "لمن تشير كلمة 'Your'؟", exercise: { type: "function_sort", sentence: "Is your brother here?", options: [{ label: "Tinglovchiga tegishli (Belongs to listener)", ar_label: "تابع للمستمع (Belongs to listener)", value: "listener", correct: true }, { label: "Gapiruvchiga tegishli (Belongs to speaker)", ar_label: "تابع للمتحدث (Belongs to speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'YOUR' = SIZNING, tinglovchiga tegishli.", ar_success_msg: "صحيح! 'YOUR' = لك، تابع للمستمع.", fail_msg: "Yo'q. 'YOUR' = tinglovchiga, 'MY' = gapiruvchiga.", ar_fail_msg: "لا. 'YOUR' = للمستمع، 'MY' = للمتحدث." } },
            { phase: "practice", type: "discovery", instruction: "'Your' va 'you' — farqi nimada?", ar_instruction: "ما الفرق بين 'Your' و 'You'؟", sentence: "What is your name?", highlight_tokens: ["your"], options: [{ label: "'Your' = sizning (egalik), 'you' = siz (olmosh)", ar_label: "'Your' = لك (ملكية)، 'you' = أنت (ضمير)", value: "possessive", correct: true }, { label: "'Your' va 'you' bir xil", ar_label: "'Your' و 'you' نفس الشيء", value: "same", correct: false }], success_msg: "'Your' = SIZNING (egalik). 'You' = SIZ (olmosh). Egalik uchun 'your'!", ar_success_msg: "'Your' = لك (ملكية). 'You' = أنت (ضمير). للملكية 'your'!", fail_msg: "'Your' ≠ 'you'. 'Your' = SIZNING, 'You' = SIZ.", ar_fail_msg: "'Your' ≠ 'you'. 'Your' = لك، 'You' = أنت." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "What is your name, Miss?", uz: "Ismingiz nima, xonim?", ar: "ما اسمك يا آنسة؟", is_anchor: true, source_dialogue: "U01_L02_D01", source_line: 5, speaker: "Ali" }, { en: "What is your name?", uz: "Sizning ismingiz nima?", ar: "ما اسمك؟", subject: "your", focus_word: "your" }, { en: "Your mother is Malika.", uz: "Sizning onangiz Malika.", ar: "أمك مليكة.", subject: "Your", focus_word: "Your" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Sizning ismingiz nima?", ar_prompt: "اسأل بالإنجليزية: ما اسمك؟", model_answer: "What is your name?", accepted_answers: ["What is your name?", "What's your name?"], trap: { trigger: "you name", message: "⚠️ 'YOU name' emas! 'YOUR name' to'g'ri.", ar_message: "⚠️ ليس 'YOU name'! الصحيح 'YOUR name'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L02_D01", line_index: 5 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingizga savol bering: What is your ...?", ar_prompt: "اسأل صديقك عن شيء يملكه: What is your ...؟", focus_pattern: "your", accepted_patterns: ["what\\s+is\\s+your\\s+\\w+", "your\\s+\\w+\\s+is"], on_success: { message: "Zo'r savol! 'Your' ni to'g'ri ishlatdingiz! 🎉", ar_message: "سؤال رائع! استخدمت 'Your' بشكل صحيح! 🎉", unlock_next: true } }
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
          ar: "نحن",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_we.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 0, speaker: "Vali", bubble_text: "We are students." },
          slides: [
            { phase: "presentation", uz_context: "Ular o'qituvchi-mi?", ar_context: "هل هم معلمون؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_we.mp3", uz_mirror_answer: "Yo'q, biz talabamiz.", ar_mirror_answer: "لا، نحن طلاب.", hybrid_answer: "Yo'q, **we** are students.", en_canonical: "No, we are students.", syntax_scaffold: "[Yo'q], **we** are [talabalar]", ar_syntax_scaffold: "[لا]، **we** are [طلاب]" },
            { phase: "practice", type: "concept_check", instruction: "'We' so'zi kimlar haqida?", ar_instruction: "عمن تتحدث كلمة 'We'؟", exercise: { type: "function_sort", sentence: "We are students.", options: [{ label: "Gapiruvchi + boshqalar (Speaker + others)", ar_label: "المتحدث + آخرون (Speaker + others)", value: "we", correct: true }, { label: "Faqat boshqalar (Only others)", ar_label: "الآخرون فقط (Only others)", value: "they", correct: false }], success_msg: "To'g'ri! 'We' = BIZ, gapiruvchi + boshqalar.", ar_success_msg: "صحيح! 'We' = نحن، المتحدث + آخرون.", fail_msg: "Yo'q. 'We' = gapiruvchi O'ZI HAM ichida.", ar_fail_msg: "لا. 'We' = المتحدث نفسه مشمول أيضاً." } },
            { phase: "practice", type: "discovery", instruction: "'We' va 'they' — farqi nimada?", ar_instruction: "ما الفرق بين 'We' و 'They'؟", sentence: "We are students. They are teachers.", highlight_tokens: ["We", "They"], options: [{ label: "'We' = men ham ichidaman, 'they' = boshqalar", ar_label: "'We' = أنا مشمول، 'they' = الآخرون", value: "inclusive_exclusive", correct: true }, { label: "'We' va 'they' bir xil", ar_label: "'We' و 'they' نفس الشيء", value: "same", correct: false }], success_msg: "'We' = BIZ (gapiruvchi + boshqalar). 'They' = ULAR (faqat boshqalar).", ar_success_msg: "'We' = نحن (المتحدث + آخرون). 'They' = هم (الآخرون فقط).", fail_msg: "'We' ≠ 'they'. 'We' = men HAM, 'They' = faqat boshqalar.", ar_fail_msg: "'We' ≠ 'they'. 'We' = أنا أيضاً، 'They' = الآخرون فقط." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "We are students.", uz: "Biz talabalarmiz.", ar: "نحن طلاب.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 0, speaker: "Vali" }, { en: "We are here.", uz: "Biz shu yerdamiz.", ar: "نحن هنا.", subject: "We", focus_word: "We" }, { en: "Are we ready?", uz: "Biz tayyormiz-mi?", ar: "هل نحن مستعدون؟", subject: "we", focus_word: "we" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Biz talabamiz.", ar_prompt: "قل بالإنجليزية: نحن طلاب.", model_answer: "We are students.", accepted_answers: ["We are students.", "We're students."], trap: { trigger: "We is", message: "⚠️ 'We IS' emas! 'We ARE' to'g'ri.", ar_message: "⚠️ ليس 'We IS'! الصحيح 'We ARE'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "Siz va do'stlaringiz haqida ayting: We are ...", ar_prompt: "تحدث عن مجموعتك: We are ...", focus_pattern: "we\\s+are", accepted_patterns: ["we\\s+are\\s+\\w+", "we're\\s+\\w+"], on_success: { message: "Ajoyib! Guruh haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن المجموعة! 🎉", unlock_next: true } }
          ]
        },
        // they
        {
          id: "V_U01_L03_they",
          en: "they",
          uz: "ular",
          ar: "هم / هن",
          pos: "pronoun",
          type: "subject_pronoun",
          priority: 1,
          category: "pronoun",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_they.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 0, speaker: "Vali", bubble_text: "They are teachers." },
          slides: [
            { phase: "presentation", uz_context: "Ular shu yerda-mi?", ar_context: "هل هم هنا؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_they.mp3", uz_mirror_answer: "Ha, ular talaba.", ar_mirror_answer: "نعم، هم طلاب.", hybrid_answer: "Ha, **they** are students.", en_canonical: "Yes, they are students.", syntax_scaffold: "[Ha], **they** are [talabalar]", ar_syntax_scaffold: "[نعم]، **they** are [طلاب]" },
            { phase: "practice", type: "concept_check", instruction: "'They' so'zi kimlar haqida?", ar_instruction: "عمن تتحدث كلمة 'They'؟", exercise: { type: "function_sort", sentence: "They are students.", options: [{ label: "Boshqa odamlar (Other people)", ar_label: "أشخاص آخرون (Other people)", value: "others", correct: true }, { label: "Gapiruvchi (Speaker)", ar_label: "المتحدث (Speaker)", value: "speaker", correct: false }], success_msg: "To'g'ri! 'They' = ULAR, boshqa odamlar haqida.", ar_success_msg: "صحيح! 'They' = هم، عن أشخاص آخرين.", fail_msg: "Yo'q. 'They' = BOSHQALAR, 'I/We' = gapiruvchi.", ar_fail_msg: "لا. 'They' = الآخرون، 'I/We' = المتحدث." } },
            { phase: "practice", type: "discovery", instruction: "'They' qanday kishilar haqida ishlatiladi?", ar_instruction: "هل تشمل 'They' المتحدث؟", sentence: "They are students.", highlight_tokens: ["They"], options: [{ label: "Uchinchi shaxs ko'plik — boshqa odamlar", ar_label: "الشخص الثالث جمع — أشخاص آخرون", value: "third_plural", correct: true }, { label: "Birinchi shaxs — gapiruvchi va do'stlari", ar_label: "الشخص الأول — المتحدث وأصدقاؤه", value: "first_person", correct: false }], success_msg: "'They' = ULAR (uchinchi shaxs ko'plik). Gapiruvchi ichida EMAS.", ar_success_msg: "'They' = هم (الشخص الثالث جمع). المتحدث غير مشمول.", fail_msg: "'They' = boshqa odamlar. Gapiruvchi ichida bo'lsa 'we' ishlatiladi.", ar_fail_msg: "'They' = أشخاص آخرون. إذا كان المتحدث مشمولاً نستخدم 'we'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "They are teachers.", uz: "Ular o'qituvchilar.", ar: "هم معلمون.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 0, speaker: "Vali" }, { en: "They are here.", uz: "Ular shu yerda.", ar: "هم هنا.", subject: "They", focus_word: "They" }, { en: "They are my friends.", uz: "Ular mening do'stlarim.", ar: "هم أصدقائي.", subject: "They", focus_word: "They" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Ular talaba.", ar_prompt: "قل بالإنجليزية: هم طلاب.", model_answer: "They are students.", accepted_answers: ["They are students.", "They're students."], trap: { trigger: "They is", message: "⚠️ 'They IS' emas! 'They ARE' to'g'ri.", ar_message: "⚠️ ليس 'They IS'! الصحيح 'They ARE'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 0 } },
            { phase: "production", type: "personalization", uz_prompt: "O'qituvchilaringiz haqida ayting: They are ...", ar_prompt: "تحدث عن المعلمين: They are ...", focus_pattern: "they\\s+are", accepted_patterns: ["they\\s+are\\s+\\w+", "they're\\s+\\w+"], on_success: { message: "Zo'r! 'They' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'They' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // father
        {
          id: "V_U01_L03_father",
          en: "father",
          uz: "ota",
          ar: "أب (والد)",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_father.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 1, speaker: "Vali", bubble_text: "This is my father." },
          slides: [
            { phase: "presentation", uz_context: "Ota kim?", ar_context: "من الأب؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_father.mp3", uz_mirror_answer: "Mening otam Omar.", ar_mirror_answer: "أبي هو عمر.", hybrid_answer: "My **father** is Omar.", en_canonical: "My father is Omar.", syntax_scaffold: "[Mening] **father** is [Omar]", ar_syntax_scaffold: "[والدي] **father** is [عمر]" },
            { phase: "practice", type: "concept_check", instruction: "'Father' kim?", ar_instruction: "من هو 'Father'؟", exercise: { type: "function_sort", sentence: "My father is Omar.", options: [{ label: "Erkak ota-ona (Male parent)", ar_label: "الوالد الذكر (Male parent)", value: "male_parent", correct: true }, { label: "Ayol ota-ona (Female parent)", ar_label: "الوالدة الأنثى (Female parent)", value: "female_parent", correct: false }], success_msg: "To'g'ri! 'Father' = OTA, erkak ota-ona.", ar_success_msg: "صحيح! 'Father' = أب، الوالد الذكر.", fail_msg: "Yo'q. 'Father' = ota, 'Mother' = ona.", ar_fail_msg: "لا. 'Father' = أب، 'Mother' = أم." } },
            { phase: "practice", type: "discovery", instruction: "'Father' so'zini qaysi egalik so'zi bilan ishlatamiz?", ar_instruction: "أي ضمير ملكية نستخدم مع 'father'؟", sentence: "My father is Omar. His name is Omar.", highlight_tokens: ["father", "My", "His"], options: [{ label: "Egalik so'zi kerak: my father, his father", ar_label: "يلزم ضمير ملكية: my father, his father", value: "possessive_required", correct: true }, { label: "Egalik so'zisiz: father is Omar", ar_label: "بدون ضمير ملكية: father is Omar", value: "no_possessive", correct: false }], success_msg: "Oila a'zolari oldidan egalik so'zi kerak: MY father, HIS father.", ar_success_msg: "يلزم ضمير ملكية قبل أفراد العائلة: MY father, HIS father.", fail_msg: "Ingliz tilida oila a'zolari oldidan egalik so'zi SHART.", ar_fail_msg: "في الإنجليزية ضمير الملكية ضروري قبل أفراد العائلة." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my father.", uz: "Bu mening otam.", ar: "هذا أبي.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 1, speaker: "Vali" }, { en: "His father is here.", uz: "Uning otasi shu yerda.", ar: "أبوه هنا.", subject: "His", focus_word: "father" }, { en: "Is your father a teacher?", uz: "Sizning otangiz o'qituvchi-mi?", ar: "هل أبوك معلم؟", subject: "your", focus_word: "father" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening otam [ism].", ar_prompt: "قل بالإنجليزية: أبي هو [الاسم].", model_answer: "My father is [name].", accepted_answers: ["My father is..."], trap: { trigger: "My father are", message: "⚠️ 'ARE' emas! 'My father IS' to'g'ri.", ar_message: "⚠️ ليس 'ARE'! الصحيح 'My father IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Otangiz haqida gap ayting: My father is ...", ar_prompt: "تحدث عن والدك: My father is ...", focus_pattern: "(my|his|her)\\s+father", accepted_patterns: ["my\\s+father\\s+is\\s+\\w+", "his\\s+father\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Otangiz haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن والدك! 🎉", unlock_next: true } }
          ]
        },
        // his
        {
          id: "V_U01_L03_his",
          en: "his",
          uz: "uning (erkak)",
          ar: "ـه (ضمير الملكية للمذكر)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_his.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 1, speaker: "Vali", bubble_text: "His name is Omar." },
          slides: [
            { phase: "presentation", uz_context: "Mening ismim Karim-mi?", ar_context: "هل اسمي كريم؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_his.mp3", uz_mirror_answer: "Yo'q, uning ismi Karim.", ar_mirror_answer: "لا، اسمه كريم.", hybrid_answer: "Yo'q, **his** name is Karim.", en_canonical: "No, his name is Karim.", syntax_scaffold: "[Yo'q], **his** [ismi] is [Karim]", ar_syntax_scaffold: "[لا]، **his** [اسمه] is [كريم]" },
            { phase: "practice", type: "concept_check", instruction: "'His' so'zi kimga tegishli?", ar_instruction: "لمن تشير 'His'؟", exercise: { type: "function_sort", sentence: "His name is Karim.", options: [{ label: "Erkak kishiga tegishli (Belongs to male)", ar_label: "تابع للذكر (Belongs to male)", value: "male", correct: true }, { label: "Ayol kishiga tegishli (Belongs to female)", ar_label: "تابع للأنثى (Belongs to female)", value: "female", correct: false }], success_msg: "To'g'ri! 'HIS' = UNING (erkak kishiga tegishli).", ar_success_msg: "صحيح! 'HIS' = له (تابع للذكر).", fail_msg: "Yo'q. 'HIS' = erkak, 'HER' = ayol.", ar_fail_msg: "لا. 'HIS' = ذكر، 'HER' = أنثى." } },
            { phase: "practice", type: "discovery", instruction: "'His' va 'he' — qanday farq bor?", ar_instruction: "ما الفرق بين 'His' و 'He'؟", sentence: "His name is Karim.", highlight_tokens: ["His"], options: [{ label: "'His' = uning (egalik), 'he' = u (olmosh)", ar_label: "'His' = له (ملكية)، 'he' = هو (ضمير)", value: "possessive_vs_pronoun", correct: true }, { label: "'His' va 'he' bir xil ma'noda", ar_label: "'His' و 'he' بنفس المعنى", value: "same", correct: false }], success_msg: "'His' = UNING (egalik). 'He' = U (olmosh). Egalik uchun 'his'!", ar_success_msg: "'His' = له (ملكية). 'He' = هو (ضمير). للملكية 'his'!", fail_msg: "'His' ≠ 'he'. 'His' = UNING (egalik), 'He' = U (olmosh).", ar_fail_msg: "'His' ≠ 'he'. 'His' = له (ملكية)، 'He' = هو (ضمير)." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "His name is Omar.", uz: "Uning ismi Omar.", ar: "اسمه عمر.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 1, speaker: "Vali" }, { en: "His father is here.", uz: "Uning otasi shu yerda.", ar: "أبوه هنا.", subject: "His", focus_word: "His" }, { en: "Is his sister a student?", uz: "Uning singlisi talaba-mi?", ar: "هل أخته طالبة؟", subject: "his", focus_word: "his" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Uning ismi Karim (erkak).", ar_prompt: "قل بالإنجليزية: اسمه كريم (مذكر).", model_answer: "His name is Karim.", accepted_answers: ["His name is Karim."], trap: { trigger: "He name", message: "⚠️ 'HE name' emas! 'HIS name' to'g'ri.", ar_message: "⚠️ ليس 'HE name'! الصحيح 'HIS name'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 1 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingiz (erkak) haqida ayting: His name is ...", ar_prompt: "تحدث عن صديقك: His name is ...", focus_pattern: "his\\s+\\w+", accepted_patterns: ["his\\s+name\\s+is\\s+\\w+", "his\\s+father\\s+is\\s+\\w+", "his\\s+\\w+\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'His' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'His' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // mother
        {
          id: "V_U01_L03_mother",
          en: "mother",
          uz: "ona",
          ar: "أم (والدة)",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_mother.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 2, speaker: "Vali", bubble_text: "This is my mother." },
          slides: [
            { phase: "presentation", uz_context: "Ona kim?", ar_context: "من الأم؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_mother.mp3", uz_mirror_answer: "Mening onam Laylo.", ar_mirror_answer: "أمي هي ليلى.", hybrid_answer: "My **mother** is Laylo.", en_canonical: "My mother is Laylo.", syntax_scaffold: "[Mening] **mother** is [Laylo]", ar_syntax_scaffold: "[والدتي] **mother** is [ليلى]" },
            { phase: "practice", type: "concept_check", instruction: "'Mother' kim?", ar_instruction: "من هي 'Mother'؟", exercise: { type: "function_sort", sentence: "My mother is Laylo.", options: [{ label: "Ayol ota-ona (Female parent)", ar_label: "الوالدة الأنثى (Female parent)", value: "female_parent", correct: true }, { label: "Erkak ota-ona (Male parent)", ar_label: "الوالد الذكر (Male parent)", value: "male_parent", correct: false }], success_msg: "To'g'ri! 'Mother' = ONA, ayol ota-ona.", ar_success_msg: "صحيح! 'Mother' = أم، الوالدة.", fail_msg: "Yo'q. 'Mother' = ona, 'Father' = ota.", ar_fail_msg: "لا. 'Mother' = أم، 'Father' = أب." } },
            { phase: "practice", type: "discovery", instruction: "'Mother' va 'father' — oiladagi roli nimada?", ar_instruction: "ما دور الأم والأب في العائلة؟", sentence: "My mother is Laylo.", highlight_tokens: ["mother"], options: [{ label: "'Mother' = ona (ayol ota-ona)", ar_label: "'Mother' = أم (الوالدة)", value: "female_parent", correct: true }, { label: "'Mother' = ota (erkak ota-ona)", ar_label: "'Mother' = أب (الوالد)", value: "male_parent", correct: false }], success_msg: "'Mother' = ONA (ayol ota-ona). 'Father' = OTA (erkak ota-ona).", ar_success_msg: "'Mother' = أم (الوالدة). 'Father' = أب (الوالد).", fail_msg: "'Mother' = ONA! 'Father' = OTA. Adashmang!", ar_fail_msg: "'Mother' = أم! 'Father' = أب. لا تخلط بينهما!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my mother.", uz: "Bu mening onam.", ar: "هذه أمي.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 2, speaker: "Vali" }, { en: "Her mother is Malika.", uz: "Uning onasi Malika.", ar: "أمها مليكة.", subject: "Her", focus_word: "mother" }, { en: "Is your mother here?", uz: "Sizning onangiz shu yerda-mi?", ar: "هل أمك هنا؟", subject: "your", focus_word: "mother" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening onam [ism].", ar_prompt: "قل بالإنجليزية: أمي هي [الاسم].", model_answer: "My mother is [name].", accepted_answers: ["My mother is..."], trap: { trigger: "My mother are", message: "⚠️ 'ARE' emas! 'My mother IS' to'g'ri.", ar_message: "⚠️ ليس 'ARE'! الصحيح 'My mother IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Onangiz haqida gap ayting: My mother is ...", ar_prompt: "تحدث عن والدتك: My mother is ...", focus_pattern: "(my|his|her)\\s+mother", accepted_patterns: ["my\\s+mother\\s+is\\s+\\w+", "her\\s+mother\\s+is\\s+\\w+"], on_success: { message: "Ajoyib! Onangiz haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن والدتك! 🎉", unlock_next: true } }
          ]
        },
        // her
        {
          id: "V_U01_L03_her",
          en: "her",
          uz: "uning (ayol)",
          ar: "ـها (ضمير الملكية للمؤنث)",
          pos: "possessive determiner",
          type: "possessive",
          priority: 1,
          category: "possessive",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_her.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 2, speaker: "Vali", bubble_text: "Her name is Laylo." },
          slides: [
            { phase: "presentation", uz_context: "Mening onamning ismi nima?", ar_context: "ما اسم والدتي؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_her.mp3", uz_mirror_answer: "Uning ismi Malika.", ar_mirror_answer: "اسمها مليكة.", hybrid_answer: "**Her** name is Malika.", en_canonical: "Her name is Malika.", syntax_scaffold: "**Her** [ismi] is [Malika]", ar_syntax_scaffold: "**Her** [اسمها] is [مليكة]" },
            { phase: "practice", type: "concept_check", instruction: "'Her' so'zi kimga tegishli?", ar_instruction: "لمن تشير 'Her'؟", exercise: { type: "function_sort", sentence: "Her name is Malika.", options: [{ label: "Ayol kishiga tegishli (Belongs to female)", ar_label: "تابع للأنثى (Belongs to female)", value: "female", correct: true }, { label: "Erkak kishiga tegishli (Belongs to male)", ar_label: "تابع للذكر (Belongs to male)", value: "male", correct: false }], success_msg: "To'g'ri! 'HER' = UNING (ayol kishiga tegishli).", ar_success_msg: "صحيح! 'HER' = لها (تابع للأنثى).", fail_msg: "Yo'q. 'HER' = ayol, 'HIS' = erkak.", ar_fail_msg: "لا. 'HER' = أنثى، 'HIS' = ذكر." } },
            { phase: "practice", type: "discovery", instruction: "'Her' qaysi jinsdagi kishi uchun ishlatiladi?", ar_instruction: "هل هناك فرق بين 'Her' و 'His'؟", sentence: "Her name is Malika.", highlight_tokens: ["Her"], options: [{ label: "Ayol uchun — 'her' = uning (ayol)", ar_label: "للأنثى — 'her' = لها", value: "female", correct: true }, { label: "Erkak uchun — 'her' = uning (erkak)", ar_label: "للذكر — 'her' = له", value: "male", correct: false }], success_msg: "'Her' = UNING (ayol). 'His' = UNING (erkak). Jins bo'yicha farqlanadi.", ar_success_msg: "'Her' = لها (أنثى). 'His' = له (ذكر). يختلفان حسب الجنس.", fail_msg: "'Her' = AYOL uchun! Erkak uchun 'his' ishlating.", ar_fail_msg: "'Her' = للأنثى فقط! للذكر استخدم 'his'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Her name is Laylo.", uz: "Uning ismi Laylo.", ar: "اسمها ليلى.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 2, speaker: "Vali" }, { en: "Her father is Omar.", uz: "Uning otasi Omar.", ar: "أبوها عمر.", subject: "Her", focus_word: "Her" }, { en: "Is her brother here?", uz: "Uning akasi shu yerda-mi?", ar: "هل أخوها هنا؟", subject: "her", focus_word: "her" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Uning ismi Malika (ayol).", ar_prompt: "قل بالإنجليزية: اسمها مليكة (مؤنث).", model_answer: "Her name is Malika.", accepted_answers: ["Her name is Malika."], trap: { trigger: "She name", message: "⚠️ 'SHE name' emas! 'HER name' to'g'ri.", ar_message: "⚠️ ليس 'SHE name'! الصحيح 'HER name'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 2 } },
            { phase: "production", type: "personalization", uz_prompt: "Do'stingiz (qiz) haqida ayting: Her name is ...", ar_prompt: "تحدث عن صديقتك: Her name is ...", focus_pattern: "her\\s+\\w+", accepted_patterns: ["her\\s+name\\s+is\\s+\\w+", "her\\s+mother\\s+is\\s+\\w+", "her\\s+\\w+\\s+is\\s+\\w+"], on_success: { message: "Zo'r! 'Her' ni to'g'ri ishlatdingiz! 🎉", ar_message: "رائع! استخدمت 'Her' بشكل صحيح! 🎉", unlock_next: true } }
          ]
        },
        // brother
        {
          id: "V_U01_L03_brother",
          en: "brother",
          uz: "aka",
          ar: "أخ",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_brother.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 3, speaker: "Vali", bubble_text: "This is my brother." },
          slides: [
            { phase: "presentation", uz_context: "Akangiz shu yerda-mi?", ar_context: "هل أخوك هنا؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_brother.mp3", uz_mirror_answer: "Ha, mening akam shu yerda.", ar_mirror_answer: "نعم، أخي هنا.", hybrid_answer: "Ha, my **brother** is here.", en_canonical: "Yes, my brother is here.", syntax_scaffold: "[Ha], [mening] **brother** is [shu yerda]", ar_syntax_scaffold: "[نعم]، [أخي] **brother** is [هنا]" },
            { phase: "practice", type: "concept_check", instruction: "'Brother' kim?", ar_instruction: "من هو 'Brother'؟", exercise: { type: "function_sort", sentence: "Is your brother here?", options: [{ label: "Erkak bola (Male sibling)", ar_label: "أخ ذكر (Male sibling)", value: "male_sibling", correct: true }, { label: "Ayol bola (Female sibling)", ar_label: "أخت أنثى (Female sibling)", value: "female_sibling", correct: false }], success_msg: "To'g'ri! 'Brother' = AKA, erkak bola.", ar_success_msg: "صحيح! 'Brother' = أخ.", fail_msg: "Yo'q. 'Brother' = aka, 'Sister' = singil.", ar_fail_msg: "لا. 'Brother' = أخ، 'Sister' = أخت." } },
            { phase: "practice", type: "discovery", instruction: "'Brother' va 'sister' — qanday juftlik?", ar_instruction: "ما العلاقة بين 'Brother' و 'Sister'؟", sentence: "This is my brother and my sister.", highlight_tokens: ["brother", "sister"], options: [{ label: "'Brother' = erkak, 'sister' = ayol (aka-singil)", ar_label: "'Brother' = ذكر، 'sister' = أنثى (أخ-أخت)", value: "male_female_sibling", correct: true }, { label: "'Brother' va 'sister' bir xil", ar_label: "'Brother' و 'sister' نفس الشيء", value: "same", correct: false }], success_msg: "'Brother' = AKA/UKA (erkak). 'Sister' = OPA/SINGIL (ayol).", ar_success_msg: "'Brother' = أخ (ذكر). 'Sister' = أخت (أنثى).", fail_msg: "'Brother' = erkak bola, 'Sister' = ayol bola. Farq bor!", ar_fail_msg: "'Brother' = أخ ذكر، 'Sister' = أخت أنثى. هناك فرق!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my brother.", uz: "Bu mening akam.", ar: "هذا أخي.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 3, speaker: "Vali" }, { en: "My brother is a student.", uz: "Mening akam talaba.", ar: "أخي طالب.", subject: "My", focus_word: "brother" }, { en: "His brother is here.", uz: "Uning akasi shu yerda.", ar: "أخوه هنا.", subject: "His", focus_word: "brother" }] },
            { phase: "production", uz_prompt: "Ingliz tilida so'rang: Sizning akangiz shu yerda-mi?", ar_prompt: "اسأل: هل أخوك هنا؟", model_answer: "Is your brother here?", accepted_answers: ["Is your brother here?", "Is your brother here"], trap: { trigger: "Your brother is here?", message: "⚠️ Savol uchun 'IS' birinchi! 'IS your brother here?' to'g'ri.", ar_message: "⚠️ في السؤال 'IS' أولاً! الصحيح 'IS your brother here?'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Akangiz yoki ukangiz bormi? My brother is ...", ar_prompt: "تحدث عن أخيك: My brother is ...", focus_pattern: "brother", accepted_patterns: ["my\\s+brother\\s+is\\s+\\w+", "I\\s+have\\s+a\\s+brother", "his\\s+brother"], on_success: { message: "Ajoyib! Oilangiz haqida gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن عائلتك! 🎉", unlock_next: true } }
          ]
        },
        // sister
        {
          id: "V_U01_L03_sister",
          en: "sister",
          uz: "singil",
          ar: "أخت",
          pos: "noun",
          type: "family_noun",
          priority: 1,
          category: "family",
          introduced_in: "U01_L03",
          image: "/images/U01/U01_L01/img_sister.png",
          dialogue_ref: { dialogue_id: "U01_L03_D01", line_index: 3, speaker: "Vali", bubble_text: "and my sister." },
          slides: [
            { phase: "presentation", uz_context: "Singlingiz shu yerda-mi?", ar_context: "هل أختك هنا؟", audio: "./audio_assets/unit_01/vocab/V_U01_L03_sister.mp3", uz_mirror_answer: "Ha, mening singlim shu yerda.", ar_mirror_answer: "نعم، أختي هنا.", hybrid_answer: "Ha, my **sister** is here.", en_canonical: "Yes, my sister is here.", syntax_scaffold: "[Ha], [mening] **sister** is [shu yerda]", ar_syntax_scaffold: "[نعم]، [أختي] **sister** is [هنا]" },
            { phase: "practice", type: "concept_check", instruction: "'Sister' kim?", ar_instruction: "من هي 'Sister'؟", exercise: { type: "function_sort", sentence: "Is your sister a student?", options: [{ label: "Ayol bola (Female sibling)", ar_label: "أخت أنثى (Female sibling)", value: "female_sibling", correct: true }, { label: "Erkak bola (Male sibling)", ar_label: "أخ ذكر (Male sibling)", value: "male_sibling", correct: false }], success_msg: "To'g'ri! 'Sister' = SINGIL, ayol bola.", ar_success_msg: "صحيح! 'Sister' = أخت.", fail_msg: "Yo'q. 'Sister' = singil, 'Brother' = aka.", ar_fail_msg: "لا. 'Sister' = أخت، 'Brother' = أخ." } },
            { phase: "practice", type: "discovery", instruction: "'Sister' so'zi kimni bildiradi?", ar_instruction: "ما معنى كلمة 'Sister'؟", sentence: "Is your sister a student?", highlight_tokens: ["sister"], options: [{ label: "Ayol aka-uka (opa yoki singil)", ar_label: "أخت أنثى (أكبر أو أصغر)", value: "female_sibling", correct: true }, { label: "Erkak aka-uka (aka yoki uka)", ar_label: "أخ ذكر (أكبر أو أصغر)", value: "male_sibling", correct: false }], success_msg: "'Sister' = OPA/SINGIL (ayol). Erkak = 'brother'.", ar_success_msg: "'Sister' = أخت (أنثى). الذكر = 'brother'.", fail_msg: "'Sister' = AYOL bola! Erkak = 'brother'.", ar_fail_msg: "'Sister' = أنثى! الذكر = 'brother'." },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "This is my sister.", uz: "Bu mening singlim.", ar: "هذه أختي.", is_anchor: true, source_dialogue: "U01_L03_D01", source_line: 3, speaker: "Vali" }, { en: "Is your sister a student?", uz: "Sizning singlingiz talaba-mi?", ar: "هل أختك طالبة؟", subject: "your", focus_word: "sister" }, { en: "His sister is a teacher.", uz: "Uning singlisi o'qituvchi.", ar: "أخته معلمة.", subject: "His", focus_word: "sister" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening singlim shu yerda.", ar_prompt: "قل بالإنجليزية: أختي هنا.", model_answer: "My sister is here.", accepted_answers: ["My sister is here.", "My sister is here"], trap: { trigger: "My sister are", message: "⚠️ 'ARE' emas! 'My sister IS' to'g'ri.", ar_message: "⚠️ ليس 'ARE'! الصحيح 'My sister IS'." }, on_success: { unlock_bubble: true, dialogue_id: "U01_L03_D01", line_index: 3 } },
            { phase: "production", type: "personalization", uz_prompt: "Opangiz yoki singlingiz bormi? My sister is ...", ar_prompt: "تحدث عن أختك: My sister is ...", focus_pattern: "sister", accepted_patterns: ["my\\s+sister\\s+is\\s+\\w+", "I\\s+have\\s+a\\s+sister", "her\\s+sister"], on_success: { message: "Zo'r! Oila haqida to'liq gapira olasiz! 🎉", ar_message: "رائع! يمكنك التحدث عن العائلة بالكامل! 🎉", unlock_next: true } }
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
