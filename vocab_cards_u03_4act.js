/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 03: Preferences & Opinions (5 Lessons, 4+2 Act)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4+2 Act Slide Structure (Renderer V2.5+)
 * MISSION FLOW: 3×2 Successive Mastery Cycle (Sandwich Technique)
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
 * @version 5.0.0 - 4+2 Act + Mission Flow + Contrastive Turns
 */

window.VOCAB_CARDS_U03 = {
  unit_id: "U03",
  unit_title: "Preferences & Opinions",
  scalability_level: 2,
  grammar_focus: "like/love/hate + noun, do/does questions",
  
  recycling: {
    mandatory: {
      from_u02: {
        time: ["morning", "evening", "every day", "weekend"],
        routine: ["eat", "play", "study", "work"],
        frequency: ["always", "usually", "often", "sometimes", "never"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSION METADATA (3×2 Successive Mastery Cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  mission: {
    mission_id: "U03_M01",
    flow_model: "sandwich",
    target_vocab: ["like", "love", "hate", "don't like", "breakfast", "lunch", "dinner", "pizza", "burgers", "plov", "laghman", "chocolate", "ice cream", "music", "singer", "band", "concert", "album", "movies", "sports", "games", "very much", "What do you like?", "friendly", "kind", "funny", "smart", "quiet", "helpful", "people"],
    stages: [
      {
        stage: 1,
        form: "affirmative",
        target_vocab: ["like", "love", "hate", "don't like", "breakfast", "lunch", "dinner"],
        dialogue_id: "U03_L01_D01",
        pressure_id: "U03_L01_D01_1",
        mirror_mode: true
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: ["pizza", "burgers", "plov", "laghman", "chocolate", "ice cream"],
        dialogue_id: "U03_L03_D02",
        pressure_id: "U03_L03_D02_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: ["music", "singer", "band", "concert", "album"],
        dialogue_id: "U03_L04_D03",
        pressure_id: "U03_L04_D03_1",
        mirror_mode: false
      }
    ],
    mastery_dialogue_id: "U03_L04_D03_1"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
  // ═══════════════════════════════════════════════════════════════════════════
  contrastive_turns: [
    {
      stage: 1,
      focus: "like_vs_love_intensity",
      dialogue_id: "U03_L01_D01",
      speaker_a: { text: "I like pizza.", speaker: "Ali" },
      speaker_b: { text: "I love pizza!", speaker: "Malika" },
      highlights: [
        {
          blue: { text: "like", type: "mild_preference" },
          red: { text: "love", type: "strong_preference" }
        }
      ]
    },
    {
      stage: 2,
      focus: "doesnt_like_third_person",
      dialogue_id: "U03_L03_D02",
      speaker_a: { text: "I don't like sports.", speaker: "Sara" },
      speaker_b: { text: "She doesn't like sports.", speaker: "Karim" },
      highlights: [
        {
          blue: { text: "don't like", type: "first_person_negative" },
          red: { text: "doesn't like", marker: "doesn't", type: "third_person_negative" }
        }
      ]
    },
    {
      stage: 3,
      focus: "do_does_question",
      dialogue_id: "U03_L04_D03",
      speaker_a: { text: "Do you like music?", speaker: "Laylo" },
      speaker_b: { text: "Does she like music?", speaker: "Karim" },
      highlights: [
        {
          blue: { text: "Do", type: "question_auxiliary_plural" },
          red: { text: "Does", type: "question_auxiliary_singular" }
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U03_L01_D01": {
      id: "U03_L01_D01",
      title: "Food Preferences",
      lines: [
        { speaker: "Ali", line: "Do you like pizza?", line_uz: "Siz pitstsani yaxshi ko'rasizmi?", target: ["like", "pizza"], mastery_key: "U03_L01_D01_0" },
        { speaker: "Malika", line: "Yes, I love pizza! I eat pizza every weekend.", line_uz: "Ha, men pitstsani juda yaxshi ko'raman! Men har hafta oxirida pittsa yeyman.", target: ["love", "pizza"], mastery_key: "U03_L01_D01_1" },
        { speaker: "Ali", line: "I like pizza too. But I love burgers.", line_uz: "Men ham pitstsani yaxshi ko'raman. Lekin men burgerlarni juda yaxshi ko'raman.", target: ["like", "love", "burgers"], mastery_key: "U03_L01_D01_2" },
        { speaker: "Malika", line: "I don't like burgers. My mother likes plov.", line_uz: "Men burgerlarni yaxshi ko'rmayman. Mening onam palovni yaxshi ko'radi.", target: ["don't like", "burgers", "plov"], mastery_key: "U03_L01_D01_3" },
        { speaker: "Ali", line: "I love plov! My father cooks plov on weekends.", line_uz: "Men palovni juda yaxshi ko'raman! Mening otam hafta oxirida palov pishiradi.", target: ["love", "plov"], mastery_key: "U03_L01_D01_4" },
        { speaker: "Malika", line: "I love chocolate and ice cream.", line_uz: "Men shokolad va muzqaymoqni juda yaxshi ko'raman.", target: ["love", "chocolate", "ice cream"], mastery_key: "U03_L01_D01_5" },
        { speaker: "Ali", line: "Me too! Do you have breakfast every morning?", line_uz: "Men ham! Siz har ertalab nonushta qilasizmi?", target: ["breakfast"], mastery_key: "U03_L01_D01_6" },
        { speaker: "Malika", line: "Yes, I have breakfast at home. I love breakfast.", line_uz: "Ha, men uyda nonushta qilaman. Men nonushtani juda yaxshi ko'raman.", target: ["breakfast", "love"], mastery_key: "U03_L01_D01_7" }
      ]
    },
    "U03_L03_D02": {
      id: "U03_L03_D02",
      title: "Authentication",
      lines: [
        { speaker: "Karim", line: "Do you like music?", line_uz: "Siz musiqani yaxshi ko'rasizmi?", target: ["like", "music"], mastery_key: "U03_L03_D02_0" },
        { speaker: "Sara", line: "Yes, I love music very much! I listen every day.", line_uz: "Ha, men musiqani juda yaxshi ko'raman! Men har kuni tinglayman.", target: ["love", "music", "very much"], mastery_key: "U03_L03_D02_1" },
        { speaker: "Karim", line: "I play in a band. We give a concert every month.", line_uz: "Men guruhda o'ynayman. Biz har oy konsert beramiz.", target: ["band", "concert"], mastery_key: "U03_L03_D02_2" },
        { speaker: "Sara", line: "That's great! I want to become a singer.", line_uz: "Bu ajoyib! Men qo'shiqchi bo'lishni xohlayman.", target: ["singer"], mastery_key: "U03_L03_D02_3" },
        { speaker: "Karim", line: "Does your sister like music?", line_uz: "Sizning opangiz musiqani yaxshi ko'radimi?", target: ["like", "music"], mastery_key: "U03_L03_D02_4" },
        { speaker: "Sara", line: "Yes, she loves music. She has a lot of albums.", line_uz: "Ha, u musiqani juda yaxshi ko'radi. Unda ko'p albomlar bor.", target: ["loves", "music", "albums"], mastery_key: "U03_L03_D02_5" },
        { speaker: "Karim", line: "Do you like movies?", line_uz: "Siz kinolarni yaxshi ko'rasizmi?", target: ["like", "movies"], mastery_key: "U03_L03_D02_6" },
        { speaker: "Sara", line: "I love movies! But I don't like sports very much.", line_uz: "Men kinolarni juda yaxshi ko'raman! Lekin men sportni unchalik yaxshi ko'rmayman.", target: ["love", "movies", "don't like", "sports"], mastery_key: "U03_L03_D02_7" }
      ]
    },
    "U03_L04_D03": {
      id: "U03_L04_D03",
      title: "Asking Preferences",
      lines: [
        { speaker: "Laylo", line: "What do you like?", line_uz: "Siz nimani yaxshi ko'rasiz?", target: ["What", "like"], mastery_key: "U03_L04_D03_0" },
        { speaker: "Vali", line: "I like sports. I play football. What do you like?", line_uz: "Men sportni yaxshi ko'raman. Men futbol o'ynayman. Siz nimani yaxshi ko'rasiz?", target: ["like", "sports"], mastery_key: "U03_L04_D03_1" },
        { speaker: "Laylo", line: "I love music. Do you like music?", line_uz: "Men musiqani juda yaxshi ko'raman. Siz musiqani yaxshi ko'rasizmi?", target: ["love", "music", "like"], mastery_key: "U03_L04_D03_2" },
        { speaker: "Vali", line: "Yes, I do. I play in a band.", line_uz: "Ha, (yaxshi ko'raman). Men guruhda o'ynayman.", target: ["Yes I do", "band"], mastery_key: "U03_L04_D03_3" },
        { speaker: "Laylo", line: "My sister loves music too. She wants to become a singer.", line_uz: "Mening opam ham musiqani juda yaxshi ko'radi. U qo'shiqchi bo'lishni xohlaydi.", target: ["loves", "singer"], mastery_key: "U03_L04_D03_4" },
        { speaker: "Vali", line: "What food does she like?", line_uz: "U qanday ovqatni yaxshi ko'radi?", target: ["What", "like"], mastery_key: "U03_L04_D03_5" },
        { speaker: "Laylo", line: "She loves chocolate. Do you like chocolate?", line_uz: "U shokoladni juda yaxshi ko'radi. Siz shokoladni yaxshi ko'rasizmi?", target: ["loves", "chocolate", "like"], mastery_key: "U03_L04_D03_6" },
        { speaker: "Vali", line: "Yes, I do! I love pizza and plov too.", line_uz: "Ha! Men pittsa va palovni ham juda yaxshi ko'raman.", target: ["Yes I do", "love"], mastery_key: "U03_L04_D03_7" }
      ]
    },
    "U03_L05_D04": {
      id: "U03_L05_D04",
      title: "Personality",
      lines: [
        { speaker: "Omar", line: "Do you like your teacher?", line_uz: "Siz o'qituvchingizni yaxshi ko'rasizmi?", target: ["like", "teacher"], mastery_key: "U03_L05_D04_0" },
        { speaker: "Malika", line: "Yes, I do! She is very kind and helpful.", line_uz: "Ha! U juda mehribon va foydali.", target: ["Yes I do", "kind", "helpful"], mastery_key: "U03_L05_D04_1" },
        { speaker: "Omar", line: "Me too! I love friendly people.", line_uz: "Men ham! Men do'stona odamlarni juda yaxshi ko'raman.", target: ["love", "friendly", "people"], mastery_key: "U03_L05_D04_2" },
        { speaker: "Malika", line: "Does your brother like his teacher?", line_uz: "Sizning akangiz o'z o'qituvchisini yaxshi ko'radimi?", target: ["like", "teacher"], mastery_key: "U03_L05_D04_3" },
        { speaker: "Omar", line: "Yes. His teacher is funny.", line_uz: "Ha. Uning o'qituvchisi kulgili.", target: ["funny"], mastery_key: "U03_L05_D04_4" },
        { speaker: "Malika", line: "I like smart classmates.", line_uz: "Men aqlli sinfdoshlarimni yaxshi ko'raman.", target: ["like", "smart"], mastery_key: "U03_L05_D04_5" },
        { speaker: "Omar", line: "My sister likes quiet places.", line_uz: "Mening opam jim joylarni yaxshi ko'radi.", target: ["likes", "quiet"], mastery_key: "U03_L05_D04_6" },
        { speaker: "Malika", line: "I like the library too. It is very quiet.", line_uz: "Men ham kutubxonani yaxshi ko'raman. U juda jim.", target: ["quiet"], mastery_key: "U03_L05_D04_7" }
      ]
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U03_L01": {
      lesson_id: "U03_L01",
      title: "Food & Likes (General)",
      flow_model: "sandwich",
      mastery_dialogue_id: "U03_L04_D03_1",
      items: [
        // like (Card 1)
        {
          id: "V_U03_L01_like",
          en: "like",
          uz: "yaxshi ko'rmoq",
          pos: "verb",
          type: "preference",
          priority: 1,
          category: "grammar",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_like.png",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "Do you like pizza?" },
          slides: [
            { phase: "presentation", uz_context: "Siz pitstsani yomon ko'rasizmi?", audio: "audio/U03/q_like.mp3", uz_mirror_answer: "Yo'q, men pitstsani yaxshi ko'raman.", hybrid_answer: "Yo'q, I **like** pizza.", en_canonical: "No, I like pizza." , syntax_scaffold: { en_structure: "No, I like pizza.", uz_gloss: "Yo'q, men pitstsani yaxshi ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "like", role: "verb", color: "green" }, { word: "pizza", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Like' = ?", exercise: { type: "function_sort", sentence: "I like you.", options: [{ label: "Yaxshi ko'rish (Positive)", value: "pos", correct: true }, { label: "Yomon ko'rish (Negative)", value: "neg", correct: false }], success_msg: "To'g'ri! 'Like' = yaxshi ko'rmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "like", form_focus: "preference_verb", why_prompt: "Nega 'like' + noun (otni) oladi?", explanation_uz: "'Like' dan keyin ot keladi: 'I like pizza', 'I like music'. Bu preference (afzallik) fe'lidir.", mini_rule: "like + noun (I like pizza, I like music)" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I like pizza.", uz: "Men pitstsani yaxshi ko'raman.", is_anchor: true, source_dialogue: "U03_L01_D01", source_line: 0, speaker: "Ali" }, { en: "She likes plov.", uz: "U palovni yaxshi ko'radi.", subject: "She", focus_word: "likes" }, { en: "We like football.", uz: "Biz futbolni yaxshi ko'ramiz.", subject: "We", focus_word: "like" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men musiqani yaxshi ko'raman.", model_answer: "I like music.", accepted_answers: ["I like music."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani yaxshi ko'rasiz?", model_frame: "I like ___.", flexibleCheck: true, tags: ["preference", "personal"] }

          ]
        },
        // love (Card 2)
        {
          id: "V_U03_L01_love",
          en: "love",
          uz: "sevmoq / juda yaxshi ko'rmoq",
          pos: "verb",
          type: "preference",
          priority: 1,
          category: "grammar",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_love.png",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 1, speaker: "Malika", bubble_text: "I love pizza!" },
          slides: [
            { phase: "presentation", uz_context: "Siz shokoladni shunchaki yaxshi ko'rasizmi?", audio: "audio/U03/q_love.mp3", uz_mirror_answer: "Yo'q, men uni juda yaxshi ko'raman.", hybrid_answer: "Yo'q, I **love** it.", en_canonical: "No, I love it." , syntax_scaffold: { en_structure: "No, I love it.", uz_gloss: "Yo'q, men uni juda yaxshi ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "love", role: "verb", color: "green" }, { word: "it", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Love' vs 'Like'?", exercise: { type: "function_sort", sentence: "I love mom.", options: [{ label: "Kuchli (Stronger)", value: "strong", correct: true }, { label: "Oddiy (Normal)", value: "normal", correct: false }], success_msg: "To'g'ri! 'Love' kuchliroq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "love", form_focus: "intensity_scale", why_prompt: "'Love' va 'like' farqi nima?", explanation_uz: "Kuchlilik shkalasi: hate ← don't like ← like ← love. 'Love' eng kuchli ijobiy his.", mini_rule: "hate < don't like < like < LOVE (strongest positive)" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I love pizza!", uz: "Men pitstsani juda yaxshi ko'raman!", is_anchor: true, source_dialogue: "U03_L01_D01", source_line: 1, speaker: "Malika" }, { en: "Do you love burgers?", uz: "Siz burgerlarni sevasizmi?", subject: "you", focus_word: "love" }, { en: "He loves sports.", uz: "U sportni juda yaxshi ko'radi.", subject: "He", focus_word: "loves" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men onamni sevaman.", model_answer: "I love my mother.", accepted_answers: ["I love my mother.", "I love my mom."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani juda yaxshi ko'rasiz?", model_frame: "I love ___.", flexibleCheck: true, tags: ["preference", "emotion"] }

          ]
        },
        // hate (Card 3)
        {
          id: "V_U03_L01_hate",
          en: "hate",
          uz: "yomon ko'rmoq",
          pos: "verb",
          type: "preference",
          priority: 1,
          category: "grammar",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_hate.png",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 3, speaker: "Malika", bubble_text: "I don't like burgers (related)" }, // hate not in dialogue, using example anchor
          slides: [
            { phase: "presentation", uz_context: "Siz imtihonlarni yaxshi ko'rasizmi?", audio: "audio/U03/q_hate.mp3", uz_mirror_answer: "Yo'q, men imtihonlarni yomon ko'raman.", hybrid_answer: "Yo'q, I **hate** exams.", en_canonical: "No, I hate exams." , syntax_scaffold: { en_structure: "No, I hate exams.", uz_gloss: "Yo'q, men imtihonlarni yomon ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "hate", role: "verb", color: "red" }, { word: "exams", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Hate' yaxshimi?", exercise: { type: "function_sort", sentence: "I hate war.", options: [{ label: "Salbiy (Negative)", value: "neg", correct: true }, { label: "Ijobiy (Positive)", value: "pos", correct: false }], success_msg: "To'g'ri! 'Hate' = yomon ko'rmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "hate", form_focus: "strong_negative", why_prompt: "'Hate' va 'don't like' farqi nima?", explanation_uz: "'Hate' = juda yomon ko'rish (kuchli). 'Don't like' = yoqtirmaslik (yumshoq). 'I hate exams' — kuchli his.", mini_rule: "hate = strong negative, don't like = mild negative" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I hate exams.", uz: "Men imtihonlarni yomon ko'raman.", is_anchor: true }, { en: "He hates homework.", uz: "U uyga vazifani yomon ko'radi.", subject: "He", focus_word: "hates" }, { en: "I hate traffic.", uz: "Men tirbandlikni yomon ko'raman.", subject: "I", focus_word: "hate" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men dushanbani yomon ko'raman.", model_answer: "I hate Mondays.", accepted_answers: ["I hate Monday.", "I hate Mondays."], on_success: { unlock_bubble: false } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani yomon ko'rasiz?", model_frame: "I hate ___.", flexibleCheck: true, tags: ["preference", "negative"] }

          ]
        },
        // don't like (Card 4)
        {
          id: "V_U03_L01_dont_like",
          en: "don't like",
          uz: "yaxshi ko'rmaslik",
          pos: "verb phrase",
          type: "preference",
          priority: 1,
          category: "grammar",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_dont_like.png",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 3, speaker: "Malika", bubble_text: "I don't like burgers." },
          slides: [
            { phase: "presentation", uz_context: "Siz burgerlarni yaxshi ko'rasizmi?", audio: "audio/U03/q_dont_like.mp3", uz_mirror_answer: "Yo'q, men ularni yaxshi ko'rmayman.", hybrid_answer: "Yo'q, I **don't like** them.", en_canonical: "No, I don't like them." , syntax_scaffold: { en_structure: "No, I don't like them.", uz_gloss: "Yo'q, men ularni yaxshi ko'rmayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "don't like", role: "negative_verb", color: "red" }, { word: "them", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Don't like' nima?", exercise: { type: "function_sort", sentence: "I don't like it.", options: [{ label: "Yoqtirmaslik (Dislike)", value: "dislike", correct: true }, { label: "Sevmoq (Love)", value: "love", correct: false }], success_msg: "To'g'ri! 'Don't like' = yoqtirmaslik.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "don't like", form_focus: "negative_preference", why_prompt: "Nega 'I not like' emas?", explanation_uz: "'Don't' yordamuchi fe'l — inkor qilish uchun kerak. 'I don't like' — to'g'ri. 'I not like' — NOTO'G'RI.", mini_rule: "I don't + verb (NOT I not + verb)" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I don't like burgers.", uz: "Men burgerlarni yaxshi ko'rmayman.", is_anchor: true, source_dialogue: "U03_L01_D01", source_line: 3, speaker: "Malika" }, { en: "She doesn't like spicy food.", uz: "U achchiq ovqatni yoqtirmaydi.", subject: "She", focus_word: "doesn't like" }, { en: "We don't like tests.", uz: "Biz testlarni yoqtirmaymiz.", subject: "We", focus_word: "don't like" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men bugerni yoqtirmayman.", model_answer: "I don't like burgers.", accepted_answers: ["I don't like burgers."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani yoqtirmaysiz?", model_frame: "I don't like ___.", flexibleCheck: true, tags: ["preference", "negative"] }

          ]
        },
        // breakfast (Card 11)
        {
          id: "V_U03_L01_breakfast",
          en: "breakfast",
          uz: "nonushta",
          pos: "noun",
          type: "meal",
          priority: 1,
          category: "food",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_breakfast.png", // Reusing or distinct? Reusing is fine but definition here is new context U03
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 7, speaker: "Malika", bubble_text: "I love breakfast." },
          slides: [
            { phase: "presentation", uz_context: "Siz ertalab nima qilasiz?", audio: "audio/U03/q_breakfast.mp3", uz_mirror_answer: "Men nonushta qilaman.", hybrid_answer: "I have **breakfast**.", en_canonical: "I have breakfast." , syntax_scaffold: { en_structure: "I have breakfast.", uz_gloss: "Men nonushta qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "breakfast", role: "meal_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Breakfast' qaysi payt?", exercise: { type: "function_sort", sentence: "Breakfast time.", options: [{ label: "Ertalab (Morning)", value: "am", correct: true }, { label: "Kechqurun (Evening)", value: "pm", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "breakfast", form_focus: "have_vs_eat", why_prompt: "'Have breakfast' vs 'eat breakfast'?", explanation_uz: "Ikkalasi ham to'g'ri! 'Have breakfast' = rasmiyroq. 'Eat breakfast' = oddiyroq. 'Have' ko'p ma'noli.", mini_rule: "have/eat breakfast — both correct" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I love breakfast.", uz: "Men nonushtani juda yaxshi ko'raman.", is_anchor: true, source_dialogue: "U03_L01_D01", source_line: 7, speaker: "Malika" }, { en: "I have breakfast at home.", uz: "Men uyda nonushta qilaman.", subject: "I", focus_word: "breakfast" }, { en: "No breakfast today.", uz: "Bugun nonushta yo'q.", subject: "No", focus_word: "breakfast" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men nonushtani yaxshi ko'raman.", model_answer: "I like breakfast.", accepted_answers: ["I like breakfast.", "I love breakfast."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz nonushtaga nima yeysiz?", model_frame: "For breakfast, I have ___.", flexibleCheck: true, tags: ["food", "routine"] }

          ]
        },
        // lunch / dinner (Card 12 - Splitting for simplicity or keeping as pair? Card list said 'lunch / dinner'. Let's do both as one item or split. Splitting is better for slides. Let's make them separate items in the same lesson.)
        // lunch
         {
          id: "V_U03_L01_lunch",
          en: "lunch",
          uz: "tushlik",
          pos: "noun",
          type: "meal",
          priority: 1,
          category: "food",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_lunch.png",
          dialogue_ref: null,
          slides: [
            { phase: "presentation", uz_context: "Soat 1 da nima yeysiz?", audio: "audio/U03/q_lunch.mp3", uz_mirror_answer: "Men tushlik yeyman.", hybrid_answer: "I have **lunch**.", en_canonical: "I have lunch." , syntax_scaffold: { en_structure: "I have lunch.", uz_gloss: "Men tushlik qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "lunch", role: "meal_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Lunch' = ?", exercise: { type: "function_sort", sentence: "Lunch at 1 PM.", options: [{ label: "Tushlik (Day)", value: "day", correct: true }, { label: "Nonushta (Morning)", value: "morning", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "lunch", form_focus: "meal_time", why_prompt: "Nega 'the lunch' emas?", explanation_uz: "Ovqat nomlari (breakfast, lunch, dinner) artiklsiz ishlatiladi: 'I have lunch', 'THE' kerak emas.", mini_rule: "have lunch / eat dinner (NO article before meals)" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I have lunch at school.", uz: "Men maktabda tushlik qilaman.", is_anchor: true }, { en: "Lunch is ready.", uz: "Tushlik tayyor.", subject: "Lunch", focus_word: "Lunch" }, { en: "Do you want lunch?", uz: "Tushlik xohlaysizmi?", subject: "you", focus_word: "lunch" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Tushlik vaqti.", model_answer: "Lunch time.", accepted_answers: ["Lunch time.", "Time for lunch."], on_success: { unlock_bubble: false } }
            ,{ phase: "personalization", prompt_uz: "Siz tushlikni qayerda qilasiz?", model_frame: "I have lunch at ___.", flexibleCheck: true, tags: ["food", "place"] }

          ]
        },
        // dinner
         {
          id: "V_U03_L01_dinner",
          en: "dinner",
          uz: "kechki ovqat",
          pos: "noun",
          type: "meal",
          priority: 1,
          category: "food",
          introduced_in: "U03_L01",
          image: "/images/U03/U03_L01/img_dinner.png",
          dialogue_ref: null,
          slides: [
            { phase: "presentation", uz_context: "Kechqurun nima yeysiz?", audio: "audio/U03/q_dinner.mp3", uz_mirror_answer: "Men kechki ovqat yeyman.", hybrid_answer: "I eat **dinner**.", en_canonical: "I eat dinner." , syntax_scaffold: { en_structure: "I eat dinner.", uz_gloss: "Men kechki ovqat yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "eat", role: "verb", color: "green" }, { word: "dinner", role: "meal_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Dinner' = ?", exercise: { type: "function_sort", sentence: "Dinner at 7 PM.", options: [{ label: "Kechki (Evening)", value: "eve", correct: true }, { label: "Tushlik (Noon)", value: "noon", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "dinner", form_focus: "meal_sequence", why_prompt: "Ovqat tartibi qanday?", explanation_uz: "Breakfast (ertalab) → Lunch (tushlik) → Dinner (kechki ovqat). Kunning uchta asosiy ovqat vaqti.", mini_rule: "breakfast → lunch → dinner (3 meals of the day)" },

            { phase: "practice", type: "drill_list", en_examples: [{ en: "I eat dinner at home.", uz: "Men uyda kechki ovqat yeyman.", is_anchor: true }, { en: "Dinner is huge.", uz: "Kechki ovqat katta.", subject: "Dinner", focus_word: "Dinner" }, { en: "What is for dinner?", uz: "Kechki ovqatga nima bor?", subject: "What", focus_word: "dinner" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men kechki ovqat yeyman.", model_answer: "I eat dinner.", accepted_answers: ["I eat dinner.", "I have dinner."], on_success: { unlock_bubble: false } }
            ,{ phase: "personalization", prompt_uz: "Siz kechki ovqatni soat nechada qilasiz?", model_frame: "I have dinner at ___.", flexibleCheck: true, tags: ["food", "time"] }

          ]
        }
      ]
    },
    "U03_L03": {
      lesson_id: "U03_L03",
      title: "Music & Arts",
      flow_model: "sandwich",
      mastery_dialogue_id: "U03_L04_D03_1",
      items: [
        // music
        {
          id: "V_U03_L03_music",
          en: "music",
          uz: "musiqa",
          pos: "noun",
          type: "art",
          introduced_in: "U03_L03",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 0, speaker: "Karim", bubble_text: "Do you like music?" },
          slides: [
             { phase: "presentation", uz_context: "Siz nimani tinglaysiz?", audio: "audio/U03/q_music.mp3", uz_mirror_answer: "Men musiqa tinglayman.", hybrid_answer: "I listen to **music**.", en_canonical: "I listen to music." , syntax_scaffold: { en_structure: "I listen to music.", uz_gloss: "Men musiqa tinglayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "listen to", role: "verb+prep", color: "green" }, { word: "music", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Music' = ?", exercise: { type: "function_sort", sentence: "Loud music.", options: [{ label: "Ovoz (Sound)", value: "sound", correct: true }, { label: "Ovqat (Food)", value: "food", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "listen to", form_focus: "verb_preposition", why_prompt: "Nega 'listen TO music' — 'to' kerak?", explanation_uz: "'Listen' dan keyin 'to' majburiy: 'listen TO music'. 'Listen music' — NOTO'G'RI.", mini_rule: "listen TO + noun (listen to music, NOT listen music)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "Do you like music?", uz: "Siz musiqani yaxshi ko'rasizmi?", is_anchor: true }, { en: "She loves music.", uz: "U musiqani juda yaxshi ko'radi.", subject: "She", focus_word: "music" }, { en: "I listen to music.", uz: "Men musiqa tinglayman.", subject: "I", focus_word: "music" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men musiqani yaxshi ko'raman.", model_answer: "I like music.", accepted_answers: ["I like music."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday musiqa tinglaysiz?", model_frame: "I listen to ___.", flexibleCheck: true, tags: ["music", "preference"] }

          ]
        },
        // singer
        {
          id: "V_U03_L03_singer",
          en: "singer",
          uz: "qo'shiqchi",
          pos: "noun",
          type: "person",
          introduced_in: "U03_L03",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 3, speaker: "Sara", bubble_text: "I want to become a singer." },
          slides: [
             { phase: "presentation", uz_context: "Kim qo'shiq aytadi?", audio: "audio/U03/q_singer.mp3", uz_mirror_answer: "Qo'shiqchi qo'shiq aytadi.", hybrid_answer: "The **singer** sings.", en_canonical: "The singer sings." , syntax_scaffold: { en_structure: "The singer sings.", uz_gloss: "Qo'shiqchi qo'shiq aytadi.", tokens: [{ word: "The singer", role: "subject", color: "blue" }, { word: "sings", role: "verb_3rd", color: "green" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Singer' nima qiladi?", exercise: { type: "function_sort", sentence: "A singer sings.", options: [{ label: "Qo'shiq aytadi (Sings)", value: "sings", correct: true }, { label: "Pishiradi (Cooks)", value: "cooks", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "singer", form_focus: "agent_suffix_er", why_prompt: "Nega 'sing' → 'singer'?", explanation_uz: "Fe'lga '-er' qo'shilsa, ish bajaruvchi bo'ladi: sing → singer, play → player, teach → teacher.", mini_rule: "verb + -er = person who does it (singer, player, teacher)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I want to be a singer.", uz: "Men qo'shiqchi bo'lishni xohlayman.", is_anchor: true }, { en: "She is a good singer.", uz: "U yaxshi qo'shiqchi.", subject: "She", focus_word: "singer" }, { en: "Famous singer.", uz: "Mashhur qo'shiqchi.", subject: "Famous", focus_word: "singer" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U qo'shiqchi.", model_answer: "She is a singer.", accepted_answers: ["She is a singer.", "He is a singer."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Sizning sevimli qo'shiqchingiz kim?", model_frame: "My favorite singer is ___.", flexibleCheck: true, tags: ["music", "person"] }

          ]
        },
        // band
        {
          id: "V_U03_L03_band",
          en: "band",
          uz: "guruh (musiqiy)",
          pos: "noun",
          type: "group",
          introduced_in: "U03_L03",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 2, speaker: "Karim", bubble_text: "I play in a band." },
          slides: [
             { phase: "presentation", uz_context: "Siz qayerda o'ynaysiz?", audio: "audio/U03/q_band.mp3", uz_mirror_answer: "Men guruhda o'ynayman.", hybrid_answer: "I play in a **band**.", en_canonical: "I play in a band." , syntax_scaffold: { en_structure: "I play in a band.", uz_gloss: "Men guruhda o'ynayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "play", role: "verb", color: "green" }, { word: "in a band", role: "place", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Band' = ?", exercise: { type: "function_sort", sentence: "Rock band.", options: [{ label: "Guruh (Group)", value: "grp", correct: true }, { label: "Yolg'iz (Solo)", value: "solo", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "in a band", form_focus: "preposition_in", why_prompt: "Nega 'IN a band'?", explanation_uz: "Guruh ichida bo'lish uchun 'in' ishlatiladi: 'in a band', 'in a team'. A'zo bo'lish ma'nosida.", mini_rule: "play IN a band / be IN a team (membership)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I play in a band.", uz: "Men guruhda o'ynayman.", is_anchor: true }, { en: "New band.", uz: "Yangi guruh.", subject: "New", focus_word: "band" }, { en: "Do you have a band?", uz: "Guruhingiz bormi?", subject: "you", focus_word: "band" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men guruhda o'ynayman.", model_answer: "I play in a band.", accepted_answers: ["I play in a band."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Siz musiqa guruhida bo'lishni xohlaysizmi?", model_frame: "I want to play in a ___.", flexibleCheck: true, tags: ["music", "aspiration"] }

          ]
        },
        // concert
        {
          id: "V_U03_L03_concert",
          en: "concert",
          uz: "konsert",
          pos: "noun",
          type: "event",
          introduced_in: "U03_L03",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 2, speaker: "Karim", bubble_text: "We give a concert every month." },
          slides: [
             { phase: "presentation", uz_context: "Siz qayerga borasiz?", audio: "audio/U03/q_concert.mp3", uz_mirror_answer: "Men konsertga boraman.", hybrid_answer: "I go to a **concert**.", en_canonical: "I go to a concert." , syntax_scaffold: { en_structure: "I go to a concert.", uz_gloss: "Men konsertga boraman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "go to", role: "verb+prep", color: "green" }, { word: "a concert", role: "destination", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Concert' qanday?", exercise: { type: "function_sort", sentence: "Big concert.", options: [{ label: "Tadbir (Event)", value: "evt", correct: true }, { label: "Uy (House)", value: "house", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "concert", form_focus: "go_to_event", why_prompt: "'Go TO a concert' — 'to' kerak?", explanation_uz: "Joyga borish uchun 'go to' ishlatiladi: 'go to a concert', 'go to school'. 'Go' + 'to' = yo'nalish.", mini_rule: "go TO + place/event (go to a concert)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "We give a concert.", uz: "Biz konsert beramiz.", is_anchor: true }, { en: "The concert is today.", uz: "Konsert bugun.", subject: "The", focus_word: "concert" }, { en: "I love concerts.", uz: "Men konsertlarni juda yaxshi ko'raman.", subject: "I", focus_word: "concerts" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Konsert yaxshi.", model_answer: "The concert is good.", accepted_answers: ["The concert is good.", "It is good."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Siz konsertga borishni yoqtirasizmi?", model_frame: "I like going to ___.", flexibleCheck: true, tags: ["event", "entertainment"] }

          ]
        },
        // album
        {
          id: "V_U03_L03_album",
          en: "album",
          uz: "albom",
          pos: "noun",
          type: "object",
          introduced_in: "U03_L03",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 5, speaker: "Sara", bubble_text: "She has a lot of albums." },
          slides: [
             { phase: "presentation", uz_context: "Sizda nima bor?", audio: "audio/U03/q_album.mp3", uz_mirror_answer: "Menda yangi albom bor.", hybrid_answer: "I have a new **album**.", en_canonical: "I have a new album." , syntax_scaffold: { en_structure: "I have a new album.", uz_gloss: "Menda yangi albom bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a new album", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Album' nima?", exercise: { type: "function_sort", sentence: "Top album.", options: [{ label: "Musiqa to'plami (Collection)", value: "col", correct: true }, { label: "Kino (Movie)", value: "mov", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "album", form_focus: "countable_noun", why_prompt: "'An album' yoki 'a album'?", explanation_uz: "'Album' unli harf (a) bilan boshlanadi, shuning uchun 'AN album' — to'g'ri. 'A' emas, 'AN' ishlatiladi.", mini_rule: "an + vowel sound (an album, an apple)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "She has many albums.", uz: "Unda ko'p albomlar bor.", is_anchor: true }, { en: "Listen to the album.", uz: "Albomni tinglang.", subject: "Listen", focus_word: "album" }, { en: "New album.", uz: "Yangi albom.", subject: "New", focus_word: "album" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men albomni tinglayman.", model_answer: "I listen to the album.", accepted_answers: ["I listen to the album."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Sizda sevimli albomingiz bormi?", model_frame: "My favorite album is ___.", flexibleCheck: true, tags: ["music", "collection"] }

          ]
        }
      ]
    },
    "U03_L04": {
      lesson_id: "U03_L04",
      title: "Hobbies & Questions",
      flow_model: "sandwich",
      mastery_dialogue_id: "U03_L04_D03_1",
      items: [
         // movies
        {
          id: "V_U03_L04_movies",
          en: "movies",
          uz: "kinolar",
          pos: "noun",
          type: "entertainment",
          introduced_in: "U03_L04",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 6, speaker: "Karim", bubble_text: "Do you like movies?" }, // Referencing prev dialogue end or new dialogue? Dialog used is D02 but introduced in L04. Wait, D02 is in L03? Ah, D02 has "Do you like movies?" at the end. Okay.
          slides: [
             { phase: "presentation", uz_context: "Siz nimani tomosha qilasiz?", audio: "audio/U03/q_movies.mp3", uz_mirror_answer: "Men kinolarni tomosha qilaman.", hybrid_answer: "I watch **movies**.", en_canonical: "I watch movies." , syntax_scaffold: { en_structure: "I watch movies.", uz_gloss: "Men kinolar ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "watch", role: "verb", color: "green" }, { word: "movies", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Movies' = ?", exercise: { type: "function_sort", sentence: "Action movies.", options: [{ label: "Kino (Film)", value: "film", correct: true }, { label: "Kitob (Book)", value: "book", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "movies", form_focus: "movie_vs_film", why_prompt: "'Movie' va 'film' farqi bormi?", explanation_uz: "'Movie' = amerikacha, 'film' = inglizcha. Ikkalasi ham to'g'ri. 'Movies' ko'plik — 'I like movies' (kinol-ar).", mini_rule: "movie = AmE, film = BrE (both correct)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love movies!", uz: "Men kinolarni juda yaxshi ko'raman!", is_anchor: true }, { en: "Do you like movies?", uz: "Siz kinolarni yaxshi ko'rasizmi?", subject: "you", focus_word: "movies" }, { en: "Good movie.", uz: "Yaxshi kino.", subject: "Good", focus_word: "movie" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men kinolarni yaxshi ko'raman.", model_answer: "I like movies.", accepted_answers: ["I like movies.", "I love movies."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 6 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday kinolarni yoqtirasiz?", model_frame: "I like ___ movies.", flexibleCheck: true, tags: ["entertainment", "preference"] }

          ]
        },
         // sports
        {
          id: "V_U03_L04_sports",
          en: "sports",
          uz: "sport",
          pos: "noun",
          type: "activity",
          introduced_in: "U03_L04",
          dialogue_ref: { dialogue_id: "U03_L04_D03", line_index: 1, speaker: "Vali", bubble_text: "I like sports." },
          slides: [
             { phase: "presentation", uz_context: "Siz nimani o'ynaysiz?", audio: "audio/U03/q_sports.mp3", uz_mirror_answer: "Men sport o'ynayman.", hybrid_answer: "I play **sports**.", en_canonical: "I play sports." , syntax_scaffold: { en_structure: "I play sports.", uz_gloss: "Men sport o'ynayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "play", role: "verb", color: "green" }, { word: "sports", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Sports' nima?", exercise: { type: "function_sort", sentence: "Football is sports.", options: [{ label: "Faoliyat (Activity)", value: "act", correct: true }, { label: "Ovqat (Food)", value: "food", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "sports", form_focus: "play_do_go", why_prompt: "Sport bilan qaysi fe'l — 'play', 'do', 'go'?", explanation_uz: "'Play' = jamoaviy sport (football, tennis). 'Do' = individual (yoga, karate). 'Go' = -ing (swimming, running).", mini_rule: "play football, do yoga, go swimming" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I like sports.", uz: "Men sportni yaxshi ko'raman.", is_anchor: true }, { en: "She hates sports.", uz: "U sportni yomon ko'radi.", subject: "She", focus_word: "sports" }, { en: "Do you play sports?", uz: "Siz sport o'ynaysizmi?", subject: "you", focus_word: "sports" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men sportni yaxshi ko'raman.", model_answer: "I like sports.", accepted_answers: ["I like sports."], on_success: { unlock_bubble: true, dialogue_id: "U03_L04_D03", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday sport bilan shug'ullanasiz?", model_frame: "I play/do ___.", flexibleCheck: true, tags: ["sports", "activity"] }

          ]
        },
        // games
        {
          id: "V_U03_L04_games",
          en: "games",
          uz: "o'yinlar",
          pos: "noun",
          type: "activity",
          introduced_in: "U03_L04",
          dialogue_ref: null,
          slides: [
             { phase: "presentation", uz_context: "Bolalar nimani yaxshi ko'radi?", audio: "audio/U03/q_games.mp3", uz_mirror_answer: "Ular o'yinlarni yaxshi ko'radi.", hybrid_answer: "They like **games**.", en_canonical: "They like games." , syntax_scaffold: { en_structure: "They like games.", uz_gloss: "Ular o'yinlarni yaxshi ko'radi.", tokens: [{ word: "They", role: "subject", color: "blue" }, { word: "like", role: "verb", color: "green" }, { word: "games", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Games' = ?", exercise: { type: "function_sort", sentence: "Video games.", options: [{ label: "O'yin (Play)", value: "play", correct: true }, { label: "Ish (Work)", value: "work", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "games", form_focus: "plural_s", why_prompt: "Nega 'games' — 's' bilan?", explanation_uz: "Ko'p narsani bildirish uchun otga '-s' qo'shiladi: game → games, book → books. Bu ko'plik shakl.", mini_rule: "noun + s = plural (game → games)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "We play games.", uz: "Biz o'yin o'ynaymiz.", is_anchor: true }, { en: "I like computer games.", uz: "Men kompyuter o'yinlarini yaxshi ko'raman.", subject: "I", focus_word: "games" }, { en: "No games today.", uz: "Bugun o'yinlar yo'q.", subject: "No", focus_word: "games" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Biz o'yin o'ynaymiz.", model_answer: "We play games.", accepted_answers: ["We play games."], on_success: { unlock_bubble: false } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday o'yinlarni yoqtirasiz?", model_frame: "I like ___ games.", flexibleCheck: true, tags: ["games", "preference"] }

          ]
        },
        // very (much)
        {
          id: "V_U03_L04_very_much",
          en: "very (much)",
          uz: "(juda) ko'p / juda",
          pos: "adverb",
          type: "modifier",
          introduced_in: "U03_L04",
          dialogue_ref: { dialogue_id: "U03_L03_D02", line_index: 1, speaker: "Sara", bubble_text: "I love music very much!" },
          slides: [
             { phase: "presentation", uz_context: "Siz qanchalik yaxshi ko'rasiz?", audio: "audio/U03/q_very_much.mp3", uz_mirror_answer: "Men uni juda yaxshi ko'raman.", hybrid_answer: "I love it **very much**.", en_canonical: "I love it very much." , syntax_scaffold: { en_structure: "I love it very much.", uz_gloss: "Men uni juda yaxshi ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "love", role: "verb", color: "green" }, { word: "it", role: "object", color: "purple" }, { word: "very much", role: "intensifier", color: "orange" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Very much' = ?", exercise: { type: "function_sort", sentence: "Thanks very much.", options: [{ label: "Ko'p (A lot)", value: "lot", correct: true }, { label: "Oz (Little)", value: "lit", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "very much", form_focus: "intensifier_position", why_prompt: "'Very much' qayerda turadi?", explanation_uz: "'Very much' gap OXIRIDA keladi: 'I love it very much'. 'Very' yolg'iz sifat oldida: 'very good'. 'Very much' — fe'ldan keyin.", mini_rule: "verb + very much (end); very + adjective (before)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love music very much!", uz: "Men musiqani juda yaxshi ko'raman!", is_anchor: true }, { en: "Thank you very much.", uz: "Sizga katta rahmat.", subject: "Thank", focus_word: "very much" }, { en: "It is very good.", uz: "Bu juda yaxshi.", subject: "It", focus_word: "very" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Rahmat sizga.", model_answer: "Thank you very much.", accepted_answers: ["Thank you very much.", "Thanks."], on_success: { unlock_bubble: true, dialogue_id: "U03_L03_D02", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani juda yaxshi ko'rasiz?", model_frame: "I like ___ very much.", flexibleCheck: true, tags: ["intensifier", "preference"] }

          ]
        },
        // What do you like?
        {
          id: "V_U03_L04_what_like",
          en: "What do you like?",
          uz: "Siz nimani yaxshi ko'rasiz?",
          pos: "phrase",
          type: "question",
          introduced_in: "U03_L04",
          dialogue_ref: { dialogue_id: "U03_L04_D03", line_index: 0, speaker: "Laylo", bubble_text: "What do you like?" },
          slides: [
             { phase: "presentation", uz_context: "Sizning xohishingizni qanday so'rayman?", audio: "audio/U03/q_what_like.mp3", uz_mirror_answer: "Siz nimani yaxshi ko'rasiz?", hybrid_answer: "**What do you like**?", en_canonical: "What do you like?" , syntax_scaffold: { en_structure: "What do you like?", uz_gloss: "Siz nimani yaxshi ko'rasiz?", tokens: [{ word: "What", role: "question_word", color: "orange" }, { word: "do", role: "auxiliary", color: "green" }, { word: "you", role: "subject", color: "blue" }, { word: "like", role: "verb", color: "green" }] } },
             { phase: "practice", type: "concept_check", instruction: "Bu savolmi?", exercise: { type: "function_sort", sentence: "What do you like?", options: [{ label: "Savol (Question)", value: "q", correct: true }, { label: "Javob (Answer)", value: "a", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "What do you", form_focus: "wh_question_structure", why_prompt: "Nega 'What you like?' emas?", explanation_uz: "Savol so'z + 'do/does' + subject + verb. 'What DO you like?' — to'g'ri. 'What you like?' — NOTO'G'RI.", mini_rule: "Wh + do/does + subject + verb? (What do you like?)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "What do you like?", uz: "Siz nimani yaxshi ko'rasiz?", is_anchor: true }, { en: "What does she like?", uz: "U nimani yaxshi ko'radi?", subject: "she", focus_word: "like" }, { en: "What do they like?", uz: "Ular nimani yaxshi ko'radi?", subject: "they", focus_word: "like" }] },
             { phase: "production", uz_prompt: "Ingliz tilida so'rang: Siz nimani yaxshi ko'rasiz?", model_answer: "What do you like?", accepted_answers: ["What do you like?"], on_success: { unlock_bubble: true, dialogue_id: "U03_L04_D03", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Do'stingizdan so'rang.", model_frame: "What do you like?", flexibleCheck: true, tags: ["question", "preference"] }

          ]
        }
      ]
    },
    "U03_L05": {
      lesson_id: "U03_L05",
      title: "Personality",
      flow_model: "sandwich",
      mastery_dialogue_id: "U03_L04_D03_1",
      items: [
         // friendly
        {
          id: "V_U03_L05_friendly",
          en: "friendly",
          uz: "do'stona / samimiy",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 2, speaker: "Omar", bubble_text: "I love friendly people." },
          slides: [
             { phase: "presentation", uz_context: "Ali hamma bilan gaplashadi. U qanday?", audio: "audio/U03/q_friendly.mp3", uz_mirror_answer: "U samimiy.", hybrid_answer: "He is **friendly**.", en_canonical: "He is friendly." , syntax_scaffold: { en_structure: "He is friendly.", uz_gloss: "U do'stona.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "friendly", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Friendly' yaxshimi?", exercise: { type: "function_sort", sentence: "Friendly smile.", options: [{ label: "Yaxshi (Good)", value: "good", correct: true }, { label: "Yomon (Bad)", value: "bad", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "friendly", form_focus: "ly_adjective", why_prompt: "'Friendly' — sifat yoki ravish?", explanation_uz: "'Friendly' sifat (adjective)! Ko'pchilik '-ly' ravish bo'lsa ham, 'friendly' sifat: 'a friendly person'. 'Friend' + 'ly' = do'stona.", mini_rule: "friendly = adjective (NOT adverb), from friend + ly" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love friendly people.", uz: "Men samimiy odamlarni yaxshi ko'raman.", is_anchor: true }, { en: "She is very friendly.", uz: "U juda samimiy.", subject: "She", focus_word: "friendly" }, { en: "Friendly dog.", uz: "Do'stona it.", subject: "Friendly", focus_word: "dog" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U samimiy.", model_answer: "He is friendly.", accepted_answers: ["He is friendly.", "She is friendly."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Kim sizga do'stona munosabatda?", model_frame: "___ is friendly.", flexibleCheck: true, tags: ["personality", "people"] }

          ]
        },
         // kind
        {
          id: "V_U03_L05_kind",
          en: "kind",
          uz: "mehribon",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 1, speaker: "Malika", bubble_text: "She is very kind." },
          slides: [
             { phase: "presentation", uz_context: "Onangiz yordam beradimi? U qanday?", audio: "audio/U03/q_kind.mp3", uz_mirror_answer: "U mehribon.", hybrid_answer: "She is **kind**.", en_canonical: "She is kind." , syntax_scaffold: { en_structure: "She is kind.", uz_gloss: "U mehribon.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "kind", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Kind' = ?", exercise: { type: "function_sort", sentence: "Be kind.", options: [{ label: "Mehribon (Nice)", value: "nice", correct: true }, { label: "Jahldor (Angry)", value: "ang", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "kind", form_focus: "polysemy", why_prompt: "'Kind' ning boshqa ma'nosi bormi?", explanation_uz: "'Kind' = 1) mehribon (adjective): 'She is kind'. 2) tur/xil (noun): 'What kind of music?'. Kontekst hal qiladi.", mini_rule: "kind (adj) = nice; kind (noun) = type (What kind of...?)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "She is very kind.", uz: "U juda mehribon.", is_anchor: true }, { en: "Kind teacher.", uz: "Mehribon o'qituvchi.", subject: "Kind", focus_word: "teacher" }, { en: "Be kind to people.", uz: "Odamlarga mehribon bo'ling.", subject: "Be", focus_word: "kind" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U mehribon.", model_answer: "She is kind.", accepted_answers: ["She is kind.", "He is kind."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Kim sizga mehribon?", model_frame: "___ is kind to me.", flexibleCheck: true, tags: ["personality", "positive"] }

          ]
        },
         // funny
        {
          id: "V_U03_L05_funny",
          en: "funny",
          uz: "kulgili",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 4, speaker: "Omar", bubble_text: "His teacher is funny." },
          slides: [
             { phase: "presentation", uz_context: "U sizni kuldiradi. U qanday?", audio: "audio/U03/q_funny.mp3", uz_mirror_answer: "U kulgili.", hybrid_answer: "He is **funny**.", en_canonical: "He is funny." , syntax_scaffold: { en_structure: "He is funny.", uz_gloss: "U kulgili.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "funny", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Funny' = ?", exercise: { type: "function_sort", sentence: "Funny movie.", options: [{ label: "Kulgili (Haha)", value: "haha", correct: true }, { label: "Jiddiy (Serious)", value: "ser", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "funny", form_focus: "funny_vs_fun", why_prompt: "'Funny' va 'fun' farqi nima?", explanation_uz: "'Funny' = kulgili (makes you laugh). 'Fun' = qiziqarli (enjoyable). 'The movie is funny' (kuldiradi). 'The park is fun' (qiziqarli).", mini_rule: "funny = makes you laugh; fun = enjoyable" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "The movie is funny.", uz: "Kino kulgili.", is_anchor: true }, { en: "He is a funny man.", uz: "U kulgili odam.", subject: "He", focus_word: "funny" }, { en: "Very funny.", uz: "Juda kulgili.", subject: "Very", focus_word: "funny" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Bu kulgili.", model_answer: "It is funny.", accepted_answers: ["It is funny.", "This is funny."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 4 } }
            ,{ phase: "personalization", prompt_uz: "Kim sizni kuldirintiradi?", model_frame: "___ is very funny.", flexibleCheck: true, tags: ["personality", "humor"] }

          ]
        },
         // smart
        {
          id: "V_U03_L05_smart",
          en: "smart",
          uz: "aqlli",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 5, speaker: "Malika", bubble_text: "I like smart classmates." },
          slides: [
             { phase: "presentation", uz_context: "U hamma narsani biladi. U qanday?", audio: "audio/U03/q_smart.mp3", uz_mirror_answer: "U aqlli.", hybrid_answer: "He is **smart**.", en_canonical: "He is smart." , syntax_scaffold: { en_structure: "He is smart.", uz_gloss: "U aqlli.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "smart", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Smart' = ?", exercise: { type: "function_sort", sentence: "Smart student.", options: [{ label: "Aqlli (Intelligent)", value: "int", correct: true }, { label: "Ahmoq (Stupid)", value: "stupid", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "smart", form_focus: "synonyms", why_prompt: "'Smart' va 'clever' o'xshashmi?", explanation_uz: "'Smart' = aqlli (AmE ko'proq). 'Clever' = aqlli (BrE ko'proq). 'Intelligent' = rasmiyroq. Uchala so'z ham bir xil ma'noda.", mini_rule: "smart ≈ clever ≈ intelligent (all mean 'aqlli')" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "She is very smart.", uz: "U juda aqlli.", is_anchor: true }, { en: "Smart boy.", uz: "Aqlli bola.", subject: "Smart", focus_word: "boy" }, { en: "Are you smart?", uz: "Siz aqllimisiz?", subject: "Are", focus_word: "smart" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U aqlli.", model_answer: "She is smart.", accepted_answers: ["She is smart.", "He is smart."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Sizning sinfda kim eng aqlli?", model_frame: "___ is the smartest.", flexibleCheck: true, tags: ["personality", "intelligence"] }

          ]
        },
         // quiet
        {
          id: "V_U03_L05_quiet",
          en: "quiet",
          uz: "tinch / jim",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 6, speaker: "Omar", bubble_text: "My sister likes quiet places." },
          slides: [
             { phase: "presentation", uz_context: "Kutubxona qanday?", audio: "audio/U03/q_quiet.mp3", uz_mirror_answer: "U tinch.", hybrid_answer: "It is **quiet**.", en_canonical: "It is quiet." , syntax_scaffold: { en_structure: "It is quiet.", uz_gloss: "U tinch.", tokens: [{ word: "It", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "quiet", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Quiet' = ovoz bormi?", exercise: { type: "function_sort", sentence: "Be quiet.", options: [{ label: "Ovoz yo'q (No noise)", value: "no", correct: true }, { label: "Shovqin (Noise)", value: "yes", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "quiet", form_focus: "quiet_vs_quite", why_prompt: "'Quiet' va 'quite' farqi nima?", explanation_uz: "'Quiet' = jim, tinch (adjective). 'Quite' = ancha (adverb). Yozilishi o'xshash, lekin boshqa so'zlar! 'Be quiet' — jim bo'ling.", mini_rule: "quiet = silent; quite = rather (different words!)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "The room is quiet.", uz: "Xona tinch.", is_anchor: true }, { en: "Please be quiet.", uz: "Iltimos, jim bo'ling.", subject: "Please", focus_word: "quiet" }, { en: "I like quiet places.", uz: "Men tinch joylarni yaxshi ko'raman.", subject: "I", focus_word: "quiet" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Iltimos jim bo'ling.", model_answer: "Please be quiet.", accepted_answers: ["Please be quiet.", "Be quiet."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 6 } }
            ,{ phase: "personalization", prompt_uz: "Qaysi joylar tinch?", model_frame: "The ___ is quiet.", flexibleCheck: true, tags: ["description", "place"] }

          ]
        },
         // helpful
        {
          id: "V_U03_L05_helpful",
          en: "helpful",
          uz: "foydali / yordamsevar",
          pos: "adjective",
          type: "trait",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 1, speaker: "Malika", bubble_text: "helpful" },
          slides: [
             { phase: "presentation", uz_context: "U har doim yordam beradi. U qanday?", audio: "audio/U03/q_helpful.mp3", uz_mirror_answer: "U yordamsevar.", hybrid_answer: "He is **helpful**.", en_canonical: "He is helpful." , syntax_scaffold: { en_structure: "He is helpful.", uz_gloss: "U yordamsevar.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "helpful", role: "adjective", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Helpful' = ?", exercise: { type: "function_sort", sentence: "Helpful teacher.", options: [{ label: "Yordam beradi (Helps)", value: "help", correct: true }, { label: "Yordam bermaydi (No help)", value: "no", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "helpful", form_focus: "ful_suffix", why_prompt: "'Help' → 'helpful' — qanday?", explanation_uz: "'-ful' qo'shimchasi '...ga boy/to'la' ma'nosini beradi: help → helpful, care → careful, beauty → beautiful.", mini_rule: "noun + ful = adjective (helpful, careful, beautiful)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "She is very helpful.", uz: "U juda yordamsevar.", is_anchor: true }, { en: "Helpful advice.", uz: "Foydali maslahat.", subject: "Helpful", focus_word: "advice" }, { en: "Thank you for being helpful.", uz: "Yordamingiz uchun rahmat.", subject: "Thank", focus_word: "helpful" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U juda yordamsevar.", model_answer: "He is very helpful.", accepted_answers: ["He is very helpful.", "She is very helpful."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Kim sizga yordam beradi?", model_frame: "___ is very helpful.", flexibleCheck: true, tags: ["personality", "helping"] }

          ]
        },
         // people
        {
          id: "V_U03_L05_people",
          en: "people",
          uz: "odamlar",
          pos: "noun",
          type: "group",
          introduced_in: "U03_L05",
          dialogue_ref: { dialogue_id: "U03_L05_D04", line_index: 2, speaker: "Omar", bubble_text: "I love friendly people." },
          slides: [
             { phase: "presentation", uz_context: "Ko'p odam bormi?", audio: "audio/U03/q_people.mp3", uz_mirror_answer: "Ha, ko'p odamlar.", hybrid_answer: "Yes, many **people**.", en_canonical: "Yes, many people." , syntax_scaffold: { en_structure: "Yes, many people.", uz_gloss: "Ha, ko'p odamlar.", tokens: [{ word: "many", role: "quantifier", color: "orange" }, { word: "people", role: "noun_plural", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "1 person -> 2 ...?", exercise: { type: "function_sort", sentence: "Two people.", options: [{ label: "People", value: "ppl", correct: true }, { label: "Persons", value: "pers", correct: false }], success_msg: "To'g'ri! 'People' ko'plik.", fail_msg: "To'g'ri 'Persons' ham mumkin, lekin 'People' ko'proq ishlatiladi." } },
            { phase: "discovery", grammar_token: "people", form_focus: "irregular_plural", why_prompt: "Nega 'peoples' emas?", explanation_uz: "'Person' → 'people' (irregular). 'Peoples' faqat 'xalqlar' ma'nosida ishlatiladi. Odatda 'people' = odamlar.", mini_rule: "person → people (irregular plural, NOT persons)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I like good people.", uz: "Men yaxshi odamlarni yaxshi ko'raman.", is_anchor: true }, { en: "Many people.", uz: "Ko'p odamlar.", subject: "Many", focus_word: "people" }, { en: "People are talking.", uz: "Odamlar gaplashyapti.", subject: "People", focus_word: "talking" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Yaxshi odamlar.", model_answer: "Good people.", accepted_answers: ["Good people."], on_success: { unlock_bubble: true, dialogue_id: "U03_L05_D04", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday odamlarni yoqtirasiz?", model_frame: "I like ___ people.", flexibleCheck: true, tags: ["social", "description"] }

          ]
        }
      ]
    },
    "U03_L02": {
      lesson_id: "U03_L02",
      title: "Specific Foods",
      flow_model: "sandwich",
      mastery_dialogue_id: "U03_L04_D03_1",
      items: [
        // pizza
        {
          id: "V_U03_L02_pizza",
          en: "pizza",
          uz: "pittsa",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "Do you like pizza?" },
          slides: [
             { phase: "presentation", uz_context: "Siz burger yeysizmi?", audio: "audio/U03/q_pizza.mp3", uz_mirror_answer: "Yo'q, men pittsa yeyman.", hybrid_answer: "Yo'q, I eat **pizza**.", en_canonical: "No, I eat pizza." , syntax_scaffold: { en_structure: "No, I eat pizza.", uz_gloss: "Yo'q, men pittsa yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "eat", role: "verb", color: "green" }, { word: "pizza", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Pizza' nima?", exercise: { type: "function_sort", sentence: "Pizza is round.", options: [{ label: "Ovqat (Food)", value: "food", correct: true }, { label: "Ichimlik (Drink)", value: "drink", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "pizza", form_focus: "uncountable_food", why_prompt: "'A pizza' yoki 'pizza'?", explanation_uz: "'Pizza' ikki xil: 'I like pizza' (umumiy, artiklsiz). 'I want a pizza' (bitta dona). Ovqat nomi sifatida artiklsiz.", mini_rule: "like pizza (general) vs a pizza (one whole pizza)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love pizza!", uz: "Men pitstsani juda yaxshi ko'raman!", is_anchor: true }, { en: "She eats pizza.", uz: "U pittsa yeydi.", subject: "She", focus_word: "pizza" }, { en: "Do you like pizza?", uz: "Siz pitstsani yaxshi ko'rasizmi?", subject: "you", focus_word: "pizza" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men pitstsani yaxshi ko'raman.", model_answer: "I like pizza.", accepted_answers: ["I like pizza."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday pittsa yeyishni yoqtirasiz?", model_frame: "I like ___ pizza.", flexibleCheck: true, tags: ["food", "preference"] }

          ]
        },
        // burgers
        {
          id: "V_U03_L02_burgers",
          en: "burgers",
          uz: "burgerlar",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 2, speaker: "Ali", bubble_text: "But I love burgers." },
          slides: [
             { phase: "presentation", uz_context: "Ali nimani yaxshi ko'radi?", audio: "audio/U03/q_burgers.mp3", uz_mirror_answer: "U burgerlarni yaxshi ko'radi.", hybrid_answer: "He loves **burgers**.", en_canonical: "He loves burgers." , syntax_scaffold: { en_structure: "He loves burgers.", uz_gloss: "U burgerlarni juda yaxshi ko'radi.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "loves", role: "verb_3rd", color: "green" }, { word: "burgers", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "Singular vs Plural?", exercise: { type: "function_sort", sentence: "Burgers.", options: [{ label: "Ko'plik (Plural)", value: "pl", correct: true }, { label: "Birlik (Singular)", value: "sg", correct: false }], success_msg: "To'g'ri! 'S' bor.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "burgers", form_focus: "countable_plural", why_prompt: "Nega 'burgers' — ko'plik?", explanation_uz: "'Burger' — sanaladigan ot. Ko'plikda 's' qo'shiladi: burger → burgers. 'I like burgers' = umumiy (ko'plik).", mini_rule: "countable nouns: burger → burgers, apple → apples" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love burgers.", uz: "Men burgerlarni juda yaxshi ko'raman.", is_anchor: true }, { en: "I eat burgers.", uz: "Men burger yeyman.", subject: "I", focus_word: "burgers" }, { en: "Burgers are tasty.", uz: "Burgerlar mazali.", subject: "Burgers", focus_word: "Burgers" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men burger yeyman.", model_answer: "I eat burgers.", accepted_answers: ["I eat burgers.", "I have burgers."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Siz burgerga nima qo'shishni yoqtirasiz?", model_frame: "I like burgers with ___.", flexibleCheck: true, tags: ["food", "preference"] }

          ]
        },
         // plov
        {
          id: "V_U03_L02_plov",
          en: "plov",
          uz: "palov",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 4, speaker: "Ali", bubble_text: "I love plov!" },
          slides: [
             { phase: "presentation", uz_context: "Siz lag'monni yaxshi ko'rasizmi?", audio: "audio/U03/q_plov.mp3", uz_mirror_answer: "Yo'q, men palovni yaxshi ko'raman.", hybrid_answer: "Yo'q, I love **plov**.", en_canonical: "No, I love plov." , syntax_scaffold: { en_structure: "No, I love plov.", uz_gloss: "Yo'q, men palovni yaxshi ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "love", role: "verb", color: "green" }, { word: "plov", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Plov' nima?", exercise: { type: "function_sort", sentence: "I cook plov.", options: [{ label: "Milliy taom (Dish)", value: "dish", correct: true }, { label: "Sport (Sport)", value: "sport", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "plov", form_focus: "loanword", why_prompt: "'Plov' ingliz so'zimi?", explanation_uz: "'Plov' — o'zbek so'zi, ingliz tilida ham ishlatiladi. 'Pilaf' ham deyishadi. Milliy ovqatlar o'z nomida saqlanishi mumkin.", mini_rule: "plov / pilaf — cultural loanword in English" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love plov!", uz: "Men palovni juda yaxshi ko'raman!", is_anchor: true }, { en: "My mother likes plov.", uz: "Mening onam palovni yaxshi ko'radi.", subject: "mother", focus_word: "plov" }, { en: "We eat plov.", uz: "Biz palov yeymiz.", subject: "We", focus_word: "plov" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men palovni yaxshi ko'raman.", model_answer: "I like plov.", accepted_answers: ["I like plov.", "I love plov."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 4 } }
            ,{ phase: "personalization", prompt_uz: "Siz palovni kim pishirganda yaxshi ko'rasiz?", model_frame: "I love ___'s plov.", flexibleCheck: true, tags: ["food", "culture"] }

          ]
        },
         // laghman
        {
          id: "V_U03_L02_laghman",
          en: "laghman",
          uz: "lag'mon",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: null,
          slides: [
             { phase: "presentation", uz_context: "Sizning opangiz nimani yaxshi ko'radi?", audio: "audio/U03/q_laghman.mp3", uz_mirror_answer: "U lag'monni yaxshi ko'radi.", hybrid_answer: "She likes **laghman**.", en_canonical: "She likes laghman." , syntax_scaffold: { en_structure: "She likes laghman.", uz_gloss: "U lag'monni yaxshi ko'radi.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "likes", role: "verb_3rd", color: "green" }, { word: "laghman", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Laghman' = ?", exercise: { type: "function_sort", sentence: "Laghman is hot.", options: [{ label: "Ovqat (Food)", value: "food", correct: true }, { label: "Musiqa (Music)", value: "music", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "laghman", form_focus: "cultural_food", why_prompt: "'Laghman' inglizlar biladi-mi?", explanation_uz: "'Laghman' — Markaziy Osiyo taomi. Ingliz tilida 'noodle soup' yoki 'laghman' deb aytiladi. Madaniy so'zlar saqlanadi.", mini_rule: "laghman = Central Asian noodle dish (cultural term)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "She loves laghman.", uz: "U lag'monni juda yaxshi ko'radi.", is_anchor: true }, { en: "He eats laghman.", uz: "U lag'mon yeydi.", subject: "He", focus_word: "laghman" }, { en: "Do you like laghman?", uz: "Lag'monni yaxshi ko'rasizmi?", subject: "you", focus_word: "laghman" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: U lag'mon yeydi.", model_answer: "He eats laghman.", accepted_answers: ["He eats laghman.", "She eats laghman."], on_success: { unlock_bubble: false } }
            ,{ phase: "personalization", prompt_uz: "Siz lag'monni yoqtirasizmi?", model_frame: "I ___ laghman.", flexibleCheck: true, tags: ["food", "culture"] }

          ]
        },
         // chocolate
        {
          id: "V_U03_L02_chocolate",
          en: "chocolate",
          uz: "shokolad",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 5, speaker: "Malika", bubble_text: "I love chocolate." },
          slides: [
             { phase: "presentation", uz_context: "Sizga nima kerak?", audio: "audio/U03/q_chocolate.mp3", uz_mirror_answer: "Menga shokolad kerak.", hybrid_answer: "I want **chocolate**.", en_canonical: "I want chocolate." , syntax_scaffold: { en_structure: "I want chocolate.", uz_gloss: "Menga shokolad kerak.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "want", role: "verb", color: "green" }, { word: "chocolate", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Chocolate' = ?", exercise: { type: "function_sort", sentence: "Sweet chocolate.", options: [{ label: "Shirinlik (Sweet)", value: "sweet", correct: true }, { label: "Sabzavot (Veg)", value: "veg", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "chocolate", form_focus: "uncountable_general", why_prompt: "'A chocolate' yoki 'chocolate'?", explanation_uz: "'Chocolate' uncountable (umumiy): 'I like chocolate'. 'A chocolate' = bitta konfet. 'Some chocolate' = biroz.", mini_rule: "chocolate (uncountable general) vs a chocolate (one piece)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I love chocolate.", uz: "Men shokoladni juda yaxshi ko'raman.", is_anchor: true }, { en: "He likes chocolate.", uz: "U shokoladni yaxshi ko'radi.", subject: "He", focus_word: "chocolate" }, { en: "No chocolate for me.", uz: "Menga shokolad yo'q.", subject: "No", focus_word: "chocolate" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men shokolad yeysiz.", model_answer: "I eat chocolate.", accepted_answers: ["I eat chocolate."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz shokoladni yoqtirasizmi?", model_frame: "I ___ chocolate.", flexibleCheck: true, tags: ["food", "sweets"] }

          ]
        },
         // ice cream
        {
          id: "V_U03_L02_ice_cream",
          en: "ice cream",
          uz: "muzqaymoq",
          pos: "noun",
          type: "food",
          introduced_in: "U03_L02",
          dialogue_ref: { dialogue_id: "U03_L01_D01", line_index: 5, speaker: "Malika", bubble_text: "and ice cream." },
          slides: [
             { phase: "presentation", uz_context: "Yozda nima yeysiz?", audio: "audio/U03/q_ice_cream.mp3", uz_mirror_answer: "Men muzqaymoq yeyman.", hybrid_answer: "I eat **ice cream**.", en_canonical: "I eat ice cream." , syntax_scaffold: { en_structure: "I eat ice cream.", uz_gloss: "Men muzqaymoq yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "eat", role: "verb", color: "green" }, { word: "ice cream", role: "object", color: "purple" }] } },
             { phase: "practice", type: "concept_check", instruction: "'Ice cream' qanday?", exercise: { type: "function_sort", sentence: "Cold ice cream.", options: [{ label: "Sovuq (Cold)", value: "cold", correct: true }, { label: "Issiq (Hot)", value: "hot", correct: false }], success_msg: "To'g'ri!", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "ice cream", form_focus: "compound_noun", why_prompt: "'Ice cream' nima uchun ikki so'z?", explanation_uz: "'Ice' (muz) + 'cream' (qaymoq) = 'ice cream' (muzqaymoq). Bu compound noun — ikki so'z birlashib yangi ma'no beradi.", mini_rule: "ice + cream = ice cream (compound noun, two words)" },

             { phase: "practice", type: "drill_list", en_examples: [{ en: "I eat ice cream in the evening.", uz: "Men kechqurun muzqaymoq yeyman.", is_anchor: true }, { en: "She loves ice cream.", uz: "U muzqaymoqni juda yaxshi ko'radi.", subject: "She", focus_word: "ice cream" }, { en: "Chocolate ice cream.", uz: "Shokoladli muzqaymoq.", subject: "Chocolate", focus_word: "ice cream" }] },
             { phase: "production", uz_prompt: "Ingliz tilida ayting: Men muzqaymoqni juda yaxshi ko'raman.", model_answer: "I love ice cream.", accepted_answers: ["I love ice cream."], on_success: { unlock_bubble: true, dialogue_id: "U03_L01_D01", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday muzqaymoqni yoqtirasiz?", model_frame: "I like ___ ice cream.", flexibleCheck: true, tags: ["food", "dessert"] }

          ]
        }
      ]
    },
    // The file is getting long, I'll stop here and use replace to finish L3, L4, L5.
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
  Object.freeze(window.VOCAB_CARDS_U03);
}
