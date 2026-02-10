/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 02: Daily Routine & Habits (5 Lessons, 4+2 Act)
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

window.VOCAB_CARDS_U02 = {
  unit_id: "U02",
  unit_title: "Daily Routine & Habits",
  scalability_level: 2,
  grammar_focus: "Present Simple (do/does) + frequency adverbs",
  
  recycling: {
    mandatory: {
      from_u01: {
        subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
        to_be: ["am", "is", "are", "isn't", "aren't"],
        possessive_det: ["my", "your", "his", "her", "our", "their"],
        question_words: ["what", "who"],
        articles: ["a", "an", "the"],
        demonstratives: ["this", "that"],
        family: ["mother", "father", "brother", "sister"],
        greetings: ["hello", "nice", "meet"]
      }
    },
    ratio_target: { min: 0.60, max: 0.70 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSION METADATA (3×2 Successive Mastery Cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  mission: {
    mission_id: "U02_M01",
    flow_model: "sandwich",
    target_vocab: ["wake up", "morning", "brush", "teeth", "shower", "breakfast", "eat", "work", "start", "study", "English", "play", "football", "weekend", "often", "always", "usually", "sometimes", "never", "every", "week", "exercise", "run", "healthy", "restaurant", "friend", "home", "time", "evening", "watch", "TV", "read", "relax", "sleep", "bed", "have", "there is"],
    stages: [
      {
        stage: 1,
        form: "affirmative",
        target_vocab: ["wake up", "morning", "brush", "teeth", "shower", "breakfast", "eat"],
        dialogue_id: "U02_L01_D01",
        pressure_id: "U02_L01_D01_1",
        mirror_mode: true
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: ["work", "start", "study", "English", "play", "football", "weekend"],
        dialogue_id: "U02_L01_D02",
        pressure_id: "U02_L01_D02_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: ["often", "always", "usually", "sometimes", "never", "every", "week"],
        dialogue_id: "U02_L01_D03",
        pressure_id: "U02_L01_D03_1",
        mirror_mode: false
      }
    ],
    mastery_dialogue_id: "U02_L01_D03_1"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
  // ═══════════════════════════════════════════════════════════════════════════
  contrastive_turns: [
    {
      stage: 1,
      focus: "third_person_s",
      dialogue_id: "U02_L01_D01",
      speaker_a: { text: "I wake up at 6 AM.", speaker: "Sara" },
      speaker_b: { text: "She wakes up at 7 AM.", speaker: "Ali" },
      highlights: [
        {
          blue: { text: "wake", type: "base_verb" },
          red: { text: "wakes", marker: "s", type: "third_person_verb" }
        }
      ]
    },
    {
      stage: 2,
      focus: "negation_dont",
      dialogue_id: "U02_L01_D02",
      speaker_a: { text: "I work every day.", speaker: "Bekzod" },
      speaker_b: { text: "I don't work on weekends.", speaker: "Madina" },
      highlights: [
        {
          blue: { text: "work", type: "affirmative_verb" },
          red: { text: "don't work", type: "negative_verb" }
        }
      ]
    },
    {
      stage: 3,
      focus: "question_do_does",
      dialogue_id: "U02_L01_D03",
      speaker_a: { text: "She studies English.", speaker: "Kamila" },
      speaker_b: { text: "Does she study English?", speaker: "Nilufar" },
      highlights: [
        {
          blue: { text: "studies", type: "third_person_verb" },
          red: { text: "Does...study", marker: "Does", type: "question_auxiliary" }
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U02_L01_D01": {
      id: "U02_L01_D01",
      title: "Morning Routine",
      lines: [
        { speaker: "Ali", line: "Good morning! Do you wake up early?", line_uz: "Xayrli tong! Siz erta turasismi?", target: ["morning", "wake up", "early"], mastery_key: "U02_L01_D01_0" },
        { speaker: "Sara", line: "Yes, I wake up at 6 AM every day.", line_uz: "Ha, men har kuni soat 6 da turaman.", target: ["wake up", "every day"], mastery_key: "U02_L01_D01_1" },
        { speaker: "Ali", line: "What do you do first?", line_uz: "Avval nima qilasiz?", target: ["do", "first"], mastery_key: "U02_L01_D01_2" },
        { speaker: "Sara", line: "I brush my teeth and take a shower.", line_uz: "Men tishlarimni yuvaman va dush qabul qilaman.", target: ["brush", "teeth", "shower"], mastery_key: "U02_L01_D01_3" },
        { speaker: "Ali", line: "I don't like mornings. Do you exercise?", line_uz: "Men ertalabni yoqtirmayman. Siz mashq qilasizmi?", target: ["don't", "like", "exercise"], mastery_key: "U02_L01_D01_4" },
        { speaker: "Sara", line: "Yes, I run every morning. It's good for you.", line_uz: "Ha, men har ertalab yuguraman. Bu siz uchun yaxshi.", target: ["run", "every", "morning"], mastery_key: "U02_L01_D01_5" },
        { speaker: "Ali", line: "That sounds nice. Do you eat breakfast?", line_uz: "Bu yaxshi eshitiladi. Siz nonushta qilasizmi?", target: ["eat", "breakfast"], mastery_key: "U02_L01_D01_6" },
        { speaker: "Sara", line: "Yes, I eat a big breakfast at 7 AM.", line_uz: "Ha, men soat 7 da katta nonushta qilaman.", target: ["eat", "breakfast", "big"], mastery_key: "U02_L01_D01_7" }
      ]
    },
    "U02_L01_D02": {
      id: "U02_L01_D02",
      title: "Work and Study",
      lines: [
        { speaker: "Bekzod", line: "What time do you start work?", line_uz: "Soat nechada ishni boshlaysiz?", target: ["time", "start", "work"], mastery_key: "U02_L01_D02_0" },
        { speaker: "Madina", line: "I start at 9 AM every day.", line_uz: "Men har kuni soat 9 da boshlayman.", target: ["start", "every day"], mastery_key: "U02_L01_D02_1" },
        { speaker: "Bekzod", line: "Do you study English?", line_uz: "Siz ingliz tilini o'rganasizmi?", target: ["study", "English"], mastery_key: "U02_L01_D02_2" },
        { speaker: "Madina", line: "Yes, I study two hours a day after work.", line_uz: "Ha, men ishdan keyin kuniga ikki soat o'qiyman.", target: ["study", "hours", "day", "after", "work"], mastery_key: "U02_L01_D02_3" },
        { speaker: "Bekzod", line: "That's good! What about sports?", line_uz: "Bu yaxshi! Sport-chi?", target: ["about", "sports"], mastery_key: "U02_L01_D02_4" },
        { speaker: "Madina", line: "I play football on weekends.", line_uz: "Men dam olish kunlari futbol o'ynayman.", target: ["play", "football", "weekends"], mastery_key: "U02_L01_D02_5" },
        { speaker: "Bekzod", line: "Do you work on Saturdays?", line_uz: "Shanba kuni ishlaysizmi?", target: ["work", "Saturdays"], mastery_key: "U02_L01_D02_6" },
        { speaker: "Madina", line: "No, I don't work on weekends.", line_uz: "Yo'q, men dam olish kunlari ishlamayman.", target: ["don't", "work", "weekends"], mastery_key: "U02_L01_D02_7" }
      ]
    },
    "U02_L01_D03": {
      id: "U02_L01_D03",
      title: "Daily Habits",
      lines: [
        { speaker: "Nilufar", line: "How often do you exercise?", line_uz: "Qanchalik tez-tez mashq qilasiz?", target: ["How often", "exercise"], mastery_key: "U02_L01_D03_0" },
        { speaker: "Kamila", line: "I always exercise three times a week.", line_uz: "Men har doim haftada uch marta mashq qilaman.", target: ["always", "exercise", "times", "week"], mastery_key: "U02_L01_D03_1" },
        { speaker: "Nilufar", line: "What about your diet?", line_uz: "Ovqatlanishingiz-chi?", target: ["about", "diet"], mastery_key: "U02_L01_D03_2" },
        { speaker: "Kamila", line: "I usually eat healthy food at home.", line_uz: "Men odatda uyda sog'lom ovqat yeyman.", target: ["usually", "eat", "healthy", "food"], mastery_key: "U02_L01_D03_3" },
        { speaker: "Nilufar", line: "Do you ever eat out?", line_uz: "Hech qachon tashqarida ovqatlanasizmi?", target: ["ever", "eat out"], mastery_key: "U02_L01_D03_4" },
        { speaker: "Kamila", line: "Sometimes I eat at restaurants with friends.", line_uz: "Ba'zan men do'stlarim bilan restoranda ovqatlanaman.", target: ["Sometimes", "eat", "restaurants"], mastery_key: "U02_L01_D03_5" },
        { speaker: "Nilufar", line: "That sounds good. What do you do in the evening?", line_uz: "Bu yaxshi eshitiladi. Kechqurun nima qilasiz?", target: ["evening"], mastery_key: "U02_L01_D03_6" },
        { speaker: "Kamila", line: "I usually watch TV or read books before bed.", line_uz: "Men odatda uxlashdan oldin televizor ko'raman yoki kitob o'qiyman.", target: ["usually", "watch", "TV", "read", "books", "bed"], mastery_key: "U02_L01_D03_7" }
      ]
    },
    "U02_L01_D04": {
      id: "U02_L01_D04",
      title: "Things Around You",
      lines: [
        { speaker: "Ali", line: "Is there a coffee shop near your office?", line_uz: "Ofisingiz yaqinida qahvaxona bormi?", target: ["Is there", "coffee shop", "near", "office"], mastery_key: "U02_L01_D04_0" },
        { speaker: "Bekzod", line: "Yes, there's a good coffee shop downstairs.", line_uz: "Ha, pastda yaxshi qahvaxona bor.", target: ["there's", "coffee shop", "downstairs"], mastery_key: "U02_L01_D04_1" },
        { speaker: "Ali", line: "Are there computers in your office?", line_uz: "Ofisingizda kompyuterlar bormi?", target: ["Are there", "computers", "office"], mastery_key: "U02_L01_D04_2" },
        { speaker: "Bekzod", line: "Yes, there are thirty computers. We use them every day.", line_uz: "Ha, o'ttizta kompyuter bor. Biz ularni har kuni ishlatamiz.", target: ["there are", "computers", "use", "every day"], mastery_key: "U02_L01_D04_3" },
        { speaker: "Ali", line: "That sounds nice. Do you have a laptop?", line_uz: "Bu yaxshi eshitiladi. Sizda noutbuk bormi?", target: ["have", "laptop"], mastery_key: "U02_L01_D04_4" },
        { speaker: "Bekzod", line: "Yes, I have my own laptop. I don't work without it.", line_uz: "Ha, mening shaxsiy noutbukam bor. Men usiz ishlamayman.", target: ["have", "laptop", "don't", "work", "without"], mastery_key: "U02_L01_D04_5" },
        { speaker: "Ali", line: "What about family? Do you have siblings?", line_uz: "Oila-chi? Sizda aka-uka yoki opa-singillar bormi?", target: ["family", "have", "siblings"], mastery_key: "U02_L01_D04_6" },
        { speaker: "Bekzod", line: "I have one sister. She studies at university.", line_uz: "Mening bitta singlim bor. U universitetda o'qiydi.", target: ["have", "studies", "university"], mastery_key: "U02_L01_D04_7" }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U02_L01": {
      lesson_id: "U02_L01",
      title: "Morning Routine",
      flow_model: "sandwich",
      mastery_dialogue_id: "U02_L01_D03_1",
      items: [
        // wake_up (Existing)
        {
          id: "V_U02_L01_wake_up",
          en: "wake up",
          uz: "uyg'onmoq",
          pos: "verb (phrasal)",
          type: "action_verb",
          priority: 1,
          category: "daily_routine",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_wake_up.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 1, speaker: "Sara", bubble_text: "I wake up at 6 AM every day." },
          slides: [
            { phase: "presentation", uz_context: "Siz soat 8 da uyg'onasizmi?", audio: "audio/U02/q_wake_up.mp3", uz_mirror_answer: "Yo'q, men soat 6 da uyg'onaman.", hybrid_answer: "Yo'q, I **wake up** at 6 AM.", en_canonical: "No, I wake up at 6 AM.", syntax_scaffold: { en_structure: "No, I wake up at 6 AM.", uz_gloss: "Yo'q, men uyg'onaman soat 6 da.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "wake up", role: "verb", color: "green" }, { word: "at 6 AM", role: "time", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Wake up' qachon bo'ladi?", exercise: { type: "function_sort", sentence: "I wake up at 6 AM.", options: [{ label: "Ertalab (In the morning)", value: "morning", correct: true }, { label: "Kechqurun (In the evening)", value: "evening", correct: false }], success_msg: "To'g'ri! 'Wake up' = uyg'onmoq, ertalab.", fail_msg: "Yo'q. 'Wake up' = UYĞONMOQ, ertalab bo'ladi." } },
            { phase: "discovery", grammar_token: "wake up", form_focus: "phrasal_verb", why_prompt: "Nega 'wake up' ikki so'z?", explanation_uz: "'Wake up' — bu frazel fe'l. 'Wake' + 'up' birga keladi va 'uyg'onmoq' ma'nosini beradi.", mini_rule: "Phrasal verb = verb + particle → new meaning" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I wake up at 6 AM every day.", uz: "Men har kuni soat 6 da uyg'onaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 1, speaker: "Sara" }, { en: "She wakes up early.", uz: "U erta uyg'onadi.", subject: "She", focus_word: "wakes up" }, { en: "Do you wake up late on weekends?", uz: "Dam olish kunlari kech uyg'onasizmi?", subject: "you", focus_word: "wake up" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men soat 7 da uyg'onaman.", model_answer: "I wake up at 7 AM.", accepted_answers: ["I wake up at 7 AM.", "I wake up at 7.", "I wake up at seven."], trap: { trigger: "I wakes up", message: "⚠️ 'I' bilan 'WAKE' (s siz)! 'I wake up' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz soat nechada uyg'onasiz?", model_frame: "I wake up at ___.", flexibleCheck: true, tags: ["time", "routine"] }
          ]
        },
        // morning (New)
        {
          id: "V_U02_L01_morning",
          en: "morning",
          uz: "ertalab / tong",
          pos: "noun/time",
          type: "time_phrase",
          priority: 1,
          category: "time",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_morning.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 0, speaker: "Ali", bubble_text: "Good morning!" },
          slides: [
            { phase: "presentation", uz_context: "Hozir kechqurun-mi?", audio: "audio/U02/q_morning.mp3", uz_mirror_answer: "Yo'q, hozir tong.", hybrid_answer: "Yo'q, it's **morning**.", en_canonical: "No, it's morning.", syntax_scaffold: { en_structure: "No, it's morning.", uz_gloss: "Yo'q, hozir ertalab.", tokens: [{ word: "it's", role: "subject+verb", color: "blue" }, { word: "morning", role: "time_noun", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Morning' qaysi vaqt?", exercise: { type: "function_sort", sentence: "Good morning!", options: [{ label: "Kun boshi (Start of day)", value: "start", correct: true }, { label: "Kun oxiri (End of day)", value: "end", correct: false }], success_msg: "To'g'ri! 'Morning' = kun boshi, tong.", fail_msg: "Yo'q. 'Morning' = tong." } },
            { phase: "discovery", grammar_token: "morning", form_focus: "time_noun", why_prompt: "Nega 'Good morning' deyiladi?", explanation_uz: "'Morning' — kun boshidagi vaqt. 'Good morning' — salomlashish shakli. Artiklsiz ham ishlatiladi.", mini_rule: "'Good + time_noun' = greeting (Good morning, Good evening)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Good morning!", uz: "Xayrli tong!", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 0, speaker: "Ali" }, { en: "I run every morning.", uz: "Men har ertalab yuguraman.", subject: "I", focus_word: "morning" }, { en: "In the morning I drink coffee.", uz: "Ertalab men kofe ichaman.", subject: "I", focus_word: "morning" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men har ertalab yuguraman.", model_answer: "I run every morning.", accepted_answers: ["I run every morning."], trap: { trigger: "run morning every", message: "⚠️ So'z tartibi! 'Every morning' oxirida keladi." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz ertalab nima qilishni yoqtirasiz?", model_frame: "In the morning, I ___.", flexibleCheck: true, tags: ["time", "preference"] }
          ]
        },
        // brush (New)
        {
          id: "V_U02_L01_brush",
          en: "brush",
          uz: "tozalamoq (tish/soch)",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "daily_routine",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_brush.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 3, speaker: "Sara", bubble_text: "I brush my teeth." },
          slides: [
            { phase: "presentation", uz_context: "Siz tishlaringizni yuvmaymisiz?", audio: "audio/U02/q_brush.mp3", uz_mirror_answer: "Yo'q, men har kuni tishimni yuvaman.", hybrid_answer: "Yo'q, I **brush** my teeth every day.", en_canonical: "No, I brush my teeth every day.", syntax_scaffold: { en_structure: "No, I brush my teeth every day.", uz_gloss: "Yo'q, men tishlarimni yuvaman har kuni.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "brush", role: "verb", color: "green" }, { word: "my teeth", role: "object", color: "purple" }, { word: "every day", role: "frequency", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Brush' nima bilan ishlatiladi?", exercise: { type: "function_sort", sentence: "I brush my teeth.", options: [{ label: "Tish yoki soch (Teeth or hair)", value: "hygiene", correct: true }, { label: "Ovqat (Food)", value: "food", correct: false }], success_msg: "To'g'ri! 'Brush' = tish yuvmoq yoki soch taramoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "brush", form_focus: "verb_collocations", why_prompt: "Nega 'wash teeth' emas, 'brush teeth'?", explanation_uz: "Ingliz tilida tish uchun 'wash' emas, 'BRUSH' ishlatiladi — cho'tka bilan tozalash ma'nosida. 'Brush hair' ham shunday.", mini_rule: "brush + teeth / hair (NOT wash teeth)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I brush my teeth.", uz: "Men tishlarimni yuvaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 3, speaker: "Sara" }, { en: "She brushes her hair.", uz: "U sochlarini taraydi.", subject: "She", focus_word: "brushes" }, { en: "Do you brush your teeth?", uz: "Tishlaringizni yuvasizmi?", subject: "you", focus_word: "brush" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men tishimni yuvaman.", model_answer: "I brush my teeth.", accepted_answers: ["I brush my teeth."], trap: { trigger: "I wash my teeth", message: "⚠️ Ingliz tilida 'wash' emas, 'BRUSH' ishlatiladi." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz kuniga necha marta tish yuvaysiz?", model_frame: "I brush my teeth ___ times a day.", flexibleCheck: true, tags: ["hygiene", "routine"] }
          ]
        },
        // teeth (New - Companion to brush)
        {
          id: "V_U02_L01_teeth",
          en: "teeth",
          uz: "tishlar",
          pos: "noun",
          type: "body_part",
          priority: 1,
          category: "body",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_teeth.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 3, speaker: "Sara", bubble_text: "I brush my teeth." },
          slides: [
            { phase: "presentation", uz_context: "Siz nimani yuvasiz?", audio: "audio/U02/q_teeth.mp3", uz_mirror_answer: "Men tishlarimni yuvaman.", hybrid_answer: "I brush my **teeth**.", en_canonical: "I brush my teeth.", syntax_scaffold: { en_structure: "I brush my teeth.", uz_gloss: "Men tishlarimni yuvaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "brush", role: "verb", color: "green" }, { word: "my teeth", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Teeth' nima?", exercise: { type: "function_sort", sentence: "My teeth are white.", options: [{ label: "Og'izdagi qism (In mouth)", value: "mouth", correct: true }, { label: "Qo'l (Hand)", value: "hand", correct: false }], success_msg: "To'g'ri! 'Teeth' = tishlar.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "teeth", form_focus: "irregular_plural", why_prompt: "Nega 'tooths' emas, 'teeth'?", explanation_uz: "'Tooth' → 'Teeth' — bu irregular plural. Qoidasiz ko'plik shakl. 'Foot → feet', 'goose → geese' kabi.", mini_rule: "tooth → teeth (irregular plural, no -s)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I brush my teeth.", uz: "Men tishlarimni yuvaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 3, speaker: "Sara" }, { en: "My teeth are clean.", uz: "Mening tishlarim toza.", subject: "My", focus_word: "teeth" }, { en: "Brush your teeth!", uz: "Tishingni yuv!", subject: "", focus_word: "teeth" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Mening tishlarim toza.", model_answer: "My teeth are clean.", accepted_answers: ["My teeth are clean."], trap: { trigger: "My tooth are", message: "⚠️ 'Tooth' = 1 ta, 'Teeth' = ko'p." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Sizning tishlaringiz qanday?", model_frame: "My teeth are ___.", flexibleCheck: true, tags: ["body", "description"] }
          ]
        },
        // shower (New)
        {
          id: "V_U02_L01_shower",
          en: "shower",
          uz: "dush",
          pos: "noun",
          type: "daily_routine",
          priority: 1,
          category: "hygiene",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_shower.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 3, speaker: "Sara", bubble_text: "take a shower" },
          slides: [
            { phase: "presentation", uz_context: "Siz ertalab nima qilasiz?", audio: "audio/U02/q_shower.mp3", uz_mirror_answer: "Men dush qabul qilaman.", hybrid_answer: "I take a **shower**.", en_canonical: "I take a shower.", syntax_scaffold: { en_structure: "I take a shower.", uz_gloss: "Men dush qabul qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "take", role: "verb", color: "green" }, { word: "a shower", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Take a shower' nima?", exercise: { type: "function_sort", sentence: "I take a shower every day.", options: [{ label: "Yuvinmoq (Wash body)", value: "wash", correct: true }, { label: "Ovqatlanmoq (Eat)", value: "eat", correct: false }], success_msg: "To'g'ri! 'Take a shower' = dush qabul qilmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "take a shower", form_focus: "collocation", why_prompt: "Nega 'make a shower' emas?", explanation_uz: "'Take a shower' yoki 'have a shower' — to'g'ri. 'Make' bu yerda ishlatilmaydi. Bu collocation (birga ishlatiladigan so'zlar).", mini_rule: "take / have + a shower (NOT make a shower)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I take a shower.", uz: "Men dush qabul qilaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 3, speaker: "Sara" }, { en: "He takes a shower in the evening.", uz: "U kechqurun dush qabul qiladi.", subject: "He", focus_word: "shower" }, { en: "Do you take a shower?", uz: "Dush qabul qilasizmi?", subject: "you", focus_word: "shower" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men dush qabul qilaman.", model_answer: "I take a shower.", accepted_answers: ["I take a shower.", "I have a shower."], trap: { trigger: "I make a shower", message: "⚠️ 'Make' emas! 'Take a shower' yoki 'Have a shower'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz qachon dush qabul qilasiz?", model_frame: "I take a shower in the ___.", flexibleCheck: true, tags: ["hygiene", "time"] }
          ]
        },
        // breakfast (Existing)
        {
          id: "V_U02_L01_breakfast",
          en: "breakfast",
          uz: "nonushta",
          pos: "noun",
          type: "meal",
          priority: 1,
          category: "daily_routine",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_breakfast.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 7, speaker: "Sara", bubble_text: "I eat a big breakfast at 7 AM." },
          slides: [
            { phase: "presentation", uz_context: "Siz tushlik qilasizmi?", audio: "audio/U02/q_breakfast.mp3", uz_mirror_answer: "Yo'q, men nonushta qilaman.", hybrid_answer: "Yo'q, I eat **breakfast**.", en_canonical: "No, I eat breakfast.", syntax_scaffold: { en_structure: "No, I eat breakfast.", uz_gloss: "Yo'q, men nonushta qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "eat", role: "verb", color: "green" }, { word: "breakfast", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Breakfast' qaysi ovqat?", exercise: { type: "function_sort", sentence: "I eat breakfast at 7 AM.", options: [{ label: "Ertalabki ovqat (Morning meal)", value: "morning", correct: true }, { label: "Kechki ovqat (Evening meal)", value: "evening", correct: false }], success_msg: "To'g'ri! 'Breakfast' = NONUSHTA.", fail_msg: "Yo'q. 'Breakfast' = nonushta." } },
            { phase: "discovery", grammar_token: "breakfast", form_focus: "zero_article", why_prompt: "Nega 'the breakfast' emas?", explanation_uz: "Ovqat nomlari (breakfast, lunch, dinner) oldidan artiklsiz ishlatiladi. 'I eat breakfast' — to'g'ri. 'I eat THE breakfast' — noto'g'ri.", mini_rule: "eat + breakfast/lunch/dinner (NO article)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I eat a big breakfast at 7 AM.", uz: "Men soat 7 da katta nonushta qilaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 7, speaker: "Sara" }, { en: "She eats breakfast every morning.", uz: "U har ertalab nonushta qiladi.", subject: "She", focus_word: "breakfast" }, { en: "Do you eat breakfast at home?", uz: "Siz uyda nonushta qilasizmi?", subject: "you", focus_word: "breakfast" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men har kuni nonushta qilaman.", model_answer: "I eat breakfast every day.", accepted_answers: ["I eat breakfast every day.", "I have breakfast every day."], trap: { trigger: "I eat the breakfast", message: "⚠️ 'THE' kerak emas! 'I eat breakfast' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Nonushtaga nima yeyishni yoqtirasiz?", model_frame: "For breakfast, I eat ___.", flexibleCheck: true, tags: ["food", "preference"] }
          ]
        },
        // eat (New)
        {
          id: "V_U02_L01_eat",
          en: "eat",
          uz: "yemoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "food_drink",
          introduced_in: "U02_L01",
          image: "/images/U02/U02_L01/img_eat.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 6, speaker: "Ali", bubble_text: "Do you eat breakfast?" },
          slides: [
            { phase: "presentation", uz_context: "Siz nonushta ichasizmi?", audio: "audio/U02/q_eat.mp3", uz_mirror_answer: "Yo'q, men nonushta yeyman.", hybrid_answer: "Yo'q, I **eat** breakfast.", en_canonical: "No, I eat breakfast.", syntax_scaffold: { en_structure: "No, I eat breakfast.", uz_gloss: "Yo'q, men nonushta yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "eat", role: "verb", color: "green" }, { word: "breakfast", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Eat' nima uchun?", exercise: { type: "function_sort", sentence: "I eat an apple.", options: [{ label: "Ovqat (Food)", value: "food", correct: true }, { label: "Ichimlik (Drink)", value: "drink", correct: false }], success_msg: "To'g'ri! 'Eat' = YEMOQ.", fail_msg: "Yo'q. 'Drink' = ichmoq." } },
            { phase: "discovery", grammar_token: "eat", form_focus: "present_simple_base", why_prompt: "Nega 'I eat', lekin 'She eats'?", explanation_uz: "'I/you/we/they' bilan 'eat' (s siz). 'He/she/it' bilan 'eats' (s bilan). Bu Present Simple qoidasidir.", mini_rule: "I/you/we/they + eat → he/she/it + eats" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Do you eat breakfast?", uz: "Siz nonushta qilasizmi?", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 6, speaker: "Ali" }, { en: "I eat healthy food.", uz: "Men sog'lom ovqat yeyman.", subject: "I", focus_word: "eat" }, { en: "She eats lunch at 1 PM.", uz: "U soat 1 da tushlik qiladi.", subject: "She", focus_word: "eats" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men olma yeyman.", model_answer: "I eat an apple.", accepted_answers: ["I eat an apple."], trap: { trigger: "I eating", message: "⚠️ Hozir emas, umuman! 'I eat' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 6 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani yeyishni ko'proq yoqtirasiz?", model_frame: "I usually eat ___.", flexibleCheck: true, tags: ["food", "preference"] }
          ]
        }
      ]
    },

    "U02_L02": {
      lesson_id: "U02_L02",
      title: "Work & Study",
      flow_model: "sandwich",
      mastery_dialogue_id: "U02_L01_D03_1",
      items: [
        // work (Existing)
        {
          id: "V_U02_L02_work",
          en: "work",
          uz: "ishlamoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "daily_routine",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_work.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 7, speaker: "Madina", bubble_text: "No, I don't work on weekends." },
          slides: [
            { phase: "presentation", uz_context: "Siz dam olish kunlari ishlaysizmi?", audio: "audio/U02/q_work.mp3", uz_mirror_answer: "Yo'q, men dam olish kunlari ishlamayman.", hybrid_answer: "Yo'q, I don't **work** on weekends.", en_canonical: "No, I don't work on weekends.", syntax_scaffold: { en_structure: "No, I don't work on weekends.", uz_gloss: "Yo'q, men ishlamayman dam olish kunlari.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "don't work", role: "negative_verb", color: "red" }, { word: "on weekends", role: "time", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Work' nima demak?", exercise: { type: "function_sort", sentence: "I work at an office.", options: [{ label: "Ishlamoq (To do a job)", value: "job", correct: true }, { label: "O'ynamoq (To play)", value: "play", correct: false }], success_msg: "To'g'ri! 'Work' = ISHLAMOQ.", fail_msg: "Yo'q. 'Work' = ishlamoq." } },
            { phase: "discovery", grammar_token: "don't work", form_focus: "present_simple_negative", why_prompt: "Nega 'I not work' emas?", explanation_uz: "Present Simple inkorida 'do not' (don't) yordamchi fe'l ishlatiladi. 'I don't work' — to'g'ri. 'I not work' — noto'g'ri.", mini_rule: "I/you/we/they + don't + base verb" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "No, I don't work on weekends.", uz: "Yo'q, men dam olish kunlari ishlamayman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 7, speaker: "Madina" }, { en: "She works at home.", uz: "U uyda ishlaydi.", subject: "She", focus_word: "works" }, { en: "Do you work every day?", uz: "Siz har kuni ishlaysizmi?", subject: "you", focus_word: "work" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men ofisda ishlayman.", model_answer: "I work at an office.", accepted_answers: ["I work at an office.", "I work in an office."], trap: { trigger: "I works", message: "⚠️ 'I' bilan 'WORK' (s siz)! 'He works', lekin 'I work'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz qayerda ishlaysiz?", model_frame: "I work at/in ___.", flexibleCheck: true, tags: ["work", "place"] }
          ]
        },
        // start (New)
        {
          id: "V_U02_L02_start",
          en: "start",
          uz: "boshlamoq",
          pos: "verb",
          type: "action_verb",
          priority: 2,
          category: "action",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_start.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 1, speaker: "Madina", bubble_text: "I start at 9 AM." },
          slides: [
            { phase: "presentation", uz_context: "Siz ishni 10 da boshlaysizmi?", audio: "audio/U02/q_start.mp3", uz_mirror_answer: "Yo'q, men 9 da boshlayman.", hybrid_answer: "Yo'q, I **start** at 9 AM.", en_canonical: "No, I start at 9 AM.", syntax_scaffold: { en_structure: "No, I start at 9 AM.", uz_gloss: "Yo'q, men boshlayman soat 9 da.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "start", role: "verb", color: "green" }, { word: "at 9 AM", role: "time", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Start' nimani bildiradi?", exercise: { type: "function_sort", sentence: "The movie starts at 8.", options: [{ label: "Boshlanish (Begin)", value: "begin", correct: true }, { label: "Tugash (Finish)", value: "finish", correct: false }], success_msg: "To'g'ri! 'Start' = BOSHLAMOQ.", fail_msg: "Yo'q. 'Start' = boshlamoq." } },
            { phase: "discovery", grammar_token: "start", form_focus: "present_simple_time", why_prompt: "Nega 'at' ishlatiladi?", explanation_uz: "Aniq vaqt bilan 'at' ishlatiladi: 'at 9 AM', 'at 6 o'clock'. 'IN' emas, 'AT' — vaqt uchun.", mini_rule: "at + specific time (at 9 AM, at noon)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I start at 9 AM every day.", uz: "Men har kuni soat 9 da boshlayman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 1, speaker: "Madina" }, { en: "The class starts at 2 PM.", uz: "Dars soat 2 da boshlanadi.", subject: "Class", focus_word: "starts" }, { en: "When do you start work?", uz: "Ishni qachon boshlaysiz?", subject: "you", focus_word: "start" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men soat 8 da boshlayman.", model_answer: "I start at 8.", accepted_answers: ["I start at 8.", "I start at 8 AM."], trap: { trigger: "I starts", message: "⚠️ 'I' bilan 'START' (s siz)! 'I start' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz ishni soat nechada boshlaysiz?", model_frame: "I start work at ___.", flexibleCheck: true, tags: ["work", "time"] }
          ]
        },
        // study (Existing)
        {
          id: "V_U02_L02_study",
          en: "study",
          uz: "o'qimoq / o'rganmoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "education",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_study.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 3, speaker: "Madina", bubble_text: "I study two hours a day." },
          slides: [
            { phase: "presentation", uz_context: "Siz ingliz tilini o'rganasizmi?", audio: "audio/U02/q_study.mp3", uz_mirror_answer: "Ha, men ingliz tilini o'rganayman.", hybrid_answer: "Ha, I **study** English.", en_canonical: "Yes, I study English.", syntax_scaffold: { en_structure: "Yes, I study English.", uz_gloss: "Ha, men o'rganayman ingliz tilini.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "study", role: "verb", color: "green" }, { word: "English", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Study' nima demak?", exercise: { type: "function_sort", sentence: "I study English.", options: [{ label: "O'rganmoq (Learn)", value: "learn", correct: true }, { label: "O'ynamoq (Play)", value: "play", correct: false }], success_msg: "To'g'ri! 'Study' = O'QIMOQ, o'rganmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "study", form_focus: "verb_3rd_person", why_prompt: "Nega 'studies' (ies), lekin 'plays' (ys)?", explanation_uz: "'Study' → 'studies' (y → ies). Lekin 'play' → 'plays' (undosh + y bo'lganda). Qoida: undosh + y = ies.", mini_rule: "consonant + y → ies (study→studies), vowel + y → ys (play→plays)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Yes, I study two hours a day.", uz: "Ha, men kuniga ikki soat o'qiyman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 3, speaker: "Madina" }, { en: "She studies medicine.", uz: "U tibbiyotni o'qiydi.", subject: "She", focus_word: "studies" }, { en: "Do you study at university?", uz: "Siz universitetda o'qiysizmi?", subject: "you", focus_word: "study" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men har kuni o'qiyman.", model_answer: "I study every day.", accepted_answers: ["I study every day."], trap: { trigger: "I am study", message: "⚠️ 'AM' kerak emas! 'I study' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz nimani o'rganasiz?", model_frame: "I study ___.", flexibleCheck: true, tags: ["education", "subject"] }
          ]
        },
        // English (New)
        {
          id: "V_U02_L02_English",
          en: "English",
          uz: "Ingliz tili",
          pos: "noun",
          type: "subject",
          priority: 1,
          category: "education",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_english.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 2, speaker: "Bekzod", bubble_text: "Do you study English?" },
          slides: [
            { phase: "presentation", uz_context: "Siz rus tilini o'rganasizmi?", audio: "audio/U02/q_english.mp3", uz_mirror_answer: "Yo'q, men ingliz tilini o'rganaman.", hybrid_answer: "Yo'q, I study **English**.", en_canonical: "No, I study English.", syntax_scaffold: { en_structure: "No, I study English.", uz_gloss: "Yo'q, men o'rganayman ingliz tilini.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "study", role: "verb", color: "green" }, { word: "English", role: "language_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'English' nima?", exercise: { type: "function_sort", sentence: "I speak English.", options: [{ label: "Til (Language)", value: "language", correct: true }, { label: "Davlat (Country)", value: "country", correct: false }], success_msg: "To'g'ri! 'English' = Ingliz tili.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "English", form_focus: "proper_noun_capitalization", why_prompt: "Nega 'English' katta harf bilan?", explanation_uz: "Tillar nomi har doim katta harf bilan yoziladi: English, Uzbek, Russian. Bu qoida.", mini_rule: "Language names always capitalized: English, Uzbek" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Do you study English?", uz: "Siz ingliz tilini o'rganasizmi?", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 2, speaker: "Bekzod" }, { en: "English is important.", uz: "Ingliz tili muhim.", subject: "English", focus_word: "English" }, { en: "I like English.", uz: "Men ingliz tilini yoqtiraman.", subject: "I", focus_word: "English" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men ingliz tilini o'rganaman.", model_answer: "I study English.", accepted_answers: ["I study English."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 2 } }
            ,{ phase: "personalization", prompt_uz: "Siz nima uchun ingliz tilini o'rganasiz?", model_frame: "I study English because ___.", flexibleCheck: true, tags: ["education", "motivation"] }
          ]
        },
        // play (Existing)
        {
          id: "V_U02_L02_play",
          en: "play",
          uz: "o'ynamoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "leisure",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_play.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 5, speaker: "Madina", bubble_text: "I play football on weekends." },
          slides: [
            { phase: "presentation", uz_context: "Siz tennis o'ynaysizmi?", audio: "audio/U02/q_play.mp3", uz_mirror_answer: "Yo'q, men futbol o'ynayman.", hybrid_answer: "Yo'q, I **play** football.", en_canonical: "No, I play football.", syntax_scaffold: { en_structure: "No, I play football.", uz_gloss: "Yo'q, men o'ynayman futbol.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "play", role: "verb", color: "green" }, { word: "football", role: "sport_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Play' nima bilan ishlatiladi?", exercise: { type: "function_sort", sentence: "I play football.", options: [{ label: "Sport va o'yinlar (Sports)", value: "sports", correct: true }, { label: "Ovqat (Food)", value: "food", correct: false }], success_msg: "To'g'ri! 'Play' = O'YNAMOQ.", fail_msg: "Yo'q. 'Play' sport uchun." } },
            { phase: "discovery", grammar_token: "play", form_focus: "zero_article_sports", why_prompt: "Nega 'play THE football' emas?", explanation_uz: "Sport nomlari bilan artiklsiz ishlatiladi: 'play football', 'play tennis'. 'THE' kerak emas.", mini_rule: "play + sport (NO article: play football, NOT play the football)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I play football on weekends.", uz: "Men dam olish kunlari futbol o'ynayman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 5, speaker: "Madina" }, { en: "She plays tennis.", uz: "U tennis o'ynaydi.", subject: "She", focus_word: "plays" }, { en: "Do you play chess?", uz: "Siz shaxmat o'ynaysizmi?", subject: "you", focus_word: "play" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men futbol o'ynayman.", model_answer: "I play football.", accepted_answers: ["I play football."], trap: { trigger: "I play the football", message: "⚠️ Sport bilan 'THE' kerak emas! 'I play football' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday sport o'ynaysiz?", model_frame: "I play ___.", flexibleCheck: true, tags: ["sports", "leisure"] }
          ]
        },
        // football (New)
        {
          id: "V_U02_L02_football",
          en: "football",
          uz: "futbol",
          pos: "noun",
          type: "sport",
          priority: 1,
          category: "sports",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_football.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 5, speaker: "Madina", bubble_text: "I play football on weekends." },
          slides: [
            { phase: "presentation", uz_context: "Siz basketbol o'ynaysizmi?", audio: "audio/U02/q_football.mp3", uz_mirror_answer: "Yo'q, men futbol o'ynayman.", hybrid_answer: "Yo'q, I play **football**.", en_canonical: "No, I play football.", syntax_scaffold: { en_structure: "No, I play football.", uz_gloss: "Yo'q, men o'ynayman futbol.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "play", role: "verb", color: "green" }, { word: "football", role: "sport_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Football' nima?", exercise: { type: "function_sort", sentence: "Football is popular.", options: [{ label: "Sport turi (Sport)", value: "sport", correct: true }, { label: "Musiqa (Music)", value: "music", correct: false }], success_msg: "To'g'ri! 'Football' = FUTBOL, sport.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "football", form_focus: "compound_noun", why_prompt: "Nega 'football' bitta so'z?", explanation_uz: "'Foot' + 'ball' = 'football'. Bu compound noun (qo'shma otlar). Ingliz tilida ko'p bunday so'zlar bor: basketball, bedroom.", mini_rule: "foot + ball = football (compound noun)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I play football on weekends.", uz: "Men dam olish kunlari futbol o'ynayman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 5, speaker: "Madina" }, { en: "Football is a great sport.", uz: "Futbol ajoyib sport.", subject: "Football", focus_word: "Football" }, { en: "They watch football.", uz: "Ular futbol tomosha qilishadi.", subject: "They", focus_word: "football" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men futbol o'ynayman.", model_answer: "I play football.", accepted_answers: ["I play football."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz futbol tomosha qilishni yoqtirasizmi?", model_frame: "I ___ football.", flexibleCheck: true, tags: ["sports", "preference"] }
          ]
        },
        // weekend (New)
        {
          id: "V_U02_L02_weekend",
          en: "weekend",
          uz: "dam olish kuni (shanba-yakshanba)",
          pos: "noun/time",
          type: "time_phrase",
          priority: 1,
          category: "time",
          introduced_in: "U02_L02",
          image: "/images/U02/U02_L01/img_weekend.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 7, speaker: "Madina", bubble_text: "No, I don't work on weekends." },
          slides: [
            { phase: "presentation", uz_context: "Siz dushanba kuni ishlaysizmi?", audio: "audio/U02/q_weekend.mp3", uz_mirror_answer: "Yo'q, men faqat dam olish kunlari ishlayman.", hybrid_answer: "Yo'q, I work on **weekends**.", en_canonical: "No, I work on weekends.", syntax_scaffold: { en_structure: "No, I work on weekends.", uz_gloss: "Yo'q, men ishlayman dam olish kunlari.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "work", role: "verb", color: "green" }, { word: "on weekends", role: "time", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Weekend' qaysi kunlar?", exercise: { type: "function_sort", sentence: "I relax on weekends.", options: [{ label: "Shanba va Yakshanba (Sat & Sun)", value: "satsun", correct: true }, { label: "Dushanbadan Jumagacha (Mon-Fri)", value: "monfri", correct: false }], success_msg: "To'g'ri! 'Weekend' = dam olish kunlari.", fail_msg: "Yo'q. 'Weekend' = Shanba va Yakshanba." } },
            { phase: "discovery", grammar_token: "weekend", form_focus: "preposition_on", why_prompt: "Nega 'ON weekends' deyiladi?", explanation_uz: "Kunlar va sanalar bilan 'ON' ishlatiladi: 'on Monday', 'on weekends', 'on Friday'. 'IN' emas.", mini_rule: "on + days/weekends (on Monday, on weekends)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I don't work on weekends.", uz: "Men dam olish kunlari ishlamayman.", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 7, speaker: "Madina" }, { en: "We go to the park on weekends.", uz: "Biz dam olish kunlari parkka boramiz.", subject: "We", focus_word: "weekends" }, { en: "Have a nice weekend!", uz: "Dam olish kuningiz yaxshi o'tsin!", subject: "", focus_word: "weekend" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Dam olish kunlari.", model_answer: "On weekends.", accepted_answers: ["On weekends.", "The weekend."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Dam olish kunlari nima qilasiz?", model_frame: "On weekends, I ___.", flexibleCheck: true, tags: ["weekend", "leisure"] }
          ]
        }
      ]
    },

    "U02_L03": {
      lesson_id: "U02_L03",
      title: "Frequency & Habits",
      flow_model: "sandwich",
      mastery_dialogue_id: "U02_L01_D03_1",
      items: [
        // often
        {
          id: "V_U02_L03_often",
          en: "often",
          uz: "tez-tez / ko'pincha",
          pos: "adverb",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_often.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 0, speaker: "Nilufar", bubble_text: "How often do you exercise?" },
          slides: [
            { phase: "presentation", uz_context: "Siz kamdan-kam mashq qilasizmi?", audio: "audio/U02/q_often.mp3", uz_mirror_answer: "Yo'q, men tez-tez mashq qilaman.", hybrid_answer: "Yo'q, I **often** exercise.", en_canonical: "No, I often exercise.", syntax_scaffold: { en_structure: "No, I often exercise.", uz_gloss: "Yo'q, men tez-tez mashq qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "often", role: "adverb", color: "orange" }, { word: "exercise", role: "verb", color: "green" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Often' qanchalik ko'p?", exercise: { type: "function_sort", sentence: "I often run.", options: [{ label: "Ko'p (A lot)", value: "high", correct: true }, { label: "Kam (Little)", value: "low", correct: false }], success_msg: "To'g'ri! 'Often' = tez-tez.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "often", form_focus: "adverb_position", why_prompt: "Nega 'often' fe'ldan OLDIN keladi?", explanation_uz: "Chastota ravishlarini (always, often, usually) asosiy fe'ldan oldin qo'yiladi: 'I OFTEN run'. Lekin 'be' dan keyin: 'He IS often late'.", mini_rule: "Frequency adverb + main verb (I often run)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "How often do you exercise?", uz: "Qanchalik tez-tez mashq qilasiz?", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 0, speaker: "Nilufar" }, { en: "I often eat fruit.", uz: "Men ko'pincha meva yeyman.", subject: "I", focus_word: "often" }, { en: "Do you often travel?", uz: "Siz tez-tez sayohat qilasizmi?", subject: "you", focus_word: "often" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men ko'pincha kitob o'qiyman.", model_answer: "I often read books.", accepted_answers: ["I often read books."], trap: { trigger: "I read often books", message: "⚠️ 'Often' fe'ldan oldin keladi: 'I OFTEN read'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz tez-tez nima qilasiz?", model_frame: "I often ___.", flexibleCheck: true, tags: ["frequency", "habits"] }
          ]
        },
        // always
        {
          id: "V_U02_L03_always",
          en: "always",
          uz: "har doim",
          pos: "adverb",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_always.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 1, speaker: "Kamila", bubble_text: "I always exercise three times a week." },
          slides: [
            { phase: "presentation", uz_context: "Siz ba'zan nonushta qilasizmi?", audio: "audio/U02/q_always.mp3", uz_mirror_answer: "Yo'q, men har doim nonushta qilaman.", hybrid_answer: "Yo'q, I **always** eat breakfast.", en_canonical: "No, I always eat breakfast.", syntax_scaffold: { en_structure: "No, I always eat breakfast.", uz_gloss: "Yo'q, men har doim nonushta qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "always", role: "adverb", color: "orange" }, { word: "eat", role: "verb", color: "green" }, { word: "breakfast", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Always' = ?", exercise: { type: "function_sort", sentence: "I always sleep.", options: [{ label: "100% (Har doim)", value: "100", correct: true }, { label: "50% (Ba'zan)", value: "50", correct: false }], success_msg: "To'g'ri! 'Always' = 100%.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "always", form_focus: "frequency_100", why_prompt: "Nega 'always' = 100%?", explanation_uz: "'Always' = har doim, 100% kafolatli. Chastota shkala: always (100%) > usually (80%) > often (60%) > sometimes (40%) > never (0%).", mini_rule: "always = 100%, never = 0%" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I always exercise.", uz: "Men har doim mashq qilaman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 1, speaker: "Kamila" }, { en: "She always works hard.", uz: "U har doim qattiq ishlaydi.", subject: "She", focus_word: "always" }, { en: "They always come late.", uz: "Ular har doim kech kelishadi.", subject: "They", focus_word: "always" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men har doim suv ichaman.", model_answer: "I always drink water.", accepted_answers: ["I always drink water."], trap: { trigger: "I drink always", message: "⚠️ 'Always' fe'ldan oldin: 'I ALWAYS drink'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz har doim nima qilasiz?", model_frame: "I always ___.", flexibleCheck: true, tags: ["frequency", "routine"] }
          ]
        },
        // usually
        {
          id: "V_U02_L03_usually",
          en: "usually",
          uz: "odatda",
          pos: "adverb",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_usually.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 3, speaker: "Kamila", bubble_text: "I usually eat healthy food." },
          slides: [
            { phase: "presentation", uz_context: "Siz har kuni baliq yeysizmi?", audio: "audio/U02/q_usually.mp3", uz_mirror_answer: "Yo'q, men odatda tovuq yeyman.", hybrid_answer: "Yo'q, I **usually** eat chicken.", en_canonical: "No, I usually eat chicken.", syntax_scaffold: { en_structure: "No, I usually eat chicken.", uz_gloss: "Yo'q, men odatda tovuq yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "usually", role: "adverb", color: "orange" }, { word: "eat", role: "verb", color: "green" }, { word: "chicken", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Usually' = ?", exercise: { type: "function_sort", sentence: "I usually work.", options: [{ label: "Ko'pincha (Most days)", value: "most", correct: true }, { label: "Har doim (Every day)", value: "every", correct: false }], success_msg: "To'g'ri! 'Usually' = odatda (80-90%).", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "usually", form_focus: "frequency_80", why_prompt: "'Usually' va 'always' farqi nima?", explanation_uz: "'Usually' = odatda (80-90%). 'Always' = har doim (100%). 'I usually walk' = ko'pincha yuraman, lekin har doim emas.", mini_rule: "usually ≈ 80% (most of the time, but not always)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I usually eat healthy food.", uz: "Men odatda sog'lom ovqat yeyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 3, speaker: "Kamila" }, { en: "We usually meet at 6.", uz: "Biz odatda 6 da uchrashamiz.", subject: "We", focus_word: "usually" }, { en: "Do you usually walk?", uz: "Siz odatda piyoda yurasizmi?", subject: "you", focus_word: "usually" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men odatda kitob o'qiyman.", model_answer: "I usually read books.", accepted_answers: ["I usually read books."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz odatda kechqurun nima qilasiz?", model_frame: "I usually ___ in the evening.", flexibleCheck: true, tags: ["frequency", "evening"] }
          ]
        },
        // sometimes
        {
          id: "V_U02_L03_sometimes",
          en: "sometimes",
          uz: "ba'zan",
          pos: "adverb",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_sometimes.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 5, speaker: "Kamila", bubble_text: "Sometimes I eat at restaurants." },
          slides: [
            { phase: "presentation", uz_context: "Siz har doim uyda yeysizmi?", audio: "audio/U02/q_sometimes.mp3", uz_mirror_answer: "Ba'zan men restoranda yeyman.", hybrid_answer: "I **sometimes** eat at restaurants.", en_canonical: "I sometimes eat at restaurants.", syntax_scaffold: { en_structure: "I sometimes eat at restaurants.", uz_gloss: "Men ba'zan restoranda yeyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "sometimes", role: "adverb", color: "orange" }, { word: "eat", role: "verb", color: "green" }, { word: "at restaurants", role: "place", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Sometimes' = ?", exercise: { type: "function_sort", sentence: "Sometimes I run.", options: [{ label: "50% (Ba'zan)", value: "50", correct: true }, { label: "0% (Hech qachon)", value: "0", correct: false }], success_msg: "To'g'ri! 'Sometimes' = ba'zan.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "sometimes", form_focus: "flexible_position", why_prompt: "'Sometimes' qayerda turadi?", explanation_uz: "'Sometimes' moslashuvchan — gap boshida yoki fe'ldan oldin turishi mumkin: 'Sometimes I run' yoki 'I sometimes run'. Ikkalasi ham to'g'ri!", mini_rule: "Sometimes I... / I sometimes... (both OK)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Sometimes I eat at restaurants.", uz: "Ba'zan men restoranda yeyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 5, speaker: "Kamila" }, { en: "I sometimes watch TV.", uz: "Men ba'zan televizor ko'raman.", subject: "I", focus_word: "sometimes" }, { en: "It is sometimes cold.", uz: "Ba'zan sovuq bo'ladi.", subject: "It", focus_word: "sometimes" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men ba'zan futbol o'ynayman.", model_answer: "I sometimes play football.", accepted_answers: ["I sometimes play football.", "Sometimes I play football."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz ba'zan nimani yeyishni yoqtirasiz?", model_frame: "Sometimes I eat ___.", flexibleCheck: true, tags: ["frequency", "food"] }
          ]
        },
        // never
        {
          id: "V_U02_L03_never",
          en: "never",
          uz: "hech qachon",
          pos: "adverb",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_never.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 4, speaker: "Nilufar", bubble_text: "Do you ever eat out?" },
          slides: [
            { phase: "presentation", uz_context: "Siz sigaret chekasizmi?", audio: "audio/U02/q_never.mp3", uz_mirror_answer: "Yo'q, men hech qachon chekmayman.", hybrid_answer: "Yo'q, I **never** smoke.", en_canonical: "No, I never smoke.", syntax_scaffold: { en_structure: "No, I never smoke.", uz_gloss: "Yo'q, men hech qachon chekmayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "never", role: "adverb", color: "red" }, { word: "smoke", role: "verb", color: "green" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Never' = ?", exercise: { type: "function_sort", sentence: "I never fly.", options: [{ label: "0% (Hech qachon)", value: "0", correct: true }, { label: "100% (Har doim)", value: "100", correct: false }], success_msg: "To'g'ri! 'Never' = 0%.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "never", form_focus: "negative_without_dont", why_prompt: "Nega 'I don't never' noto'g'ri?", explanation_uz: "'Never' o'zi inkor ma'nosini beradi, shuning uchun 'don't' kerak emas. 'I never smoke' = to'g'ri. 'I don't never smoke' = NOTO'G'RI (ikki inkor).", mini_rule: "never = already negative (I never..., NOT I don't never...)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I never eat junk food.", uz: "Men hech qachon zararli ovqat yemayman.", subject: "I", focus_word: "never" }, { en: "She never sleeps late.", uz: "U hech qachon kech uxlamaydi.", subject: "She", focus_word: "never" }, { en: "We never fight.", uz: "Biz hech qachon urishmaymiz.", subject: "We", focus_word: "never" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men hech qachon kech qolmayman.", model_answer: "I never come late.", accepted_answers: ["I never come late.", "I never arrive late."], trap: { trigger: "I don't never", message: "⚠️ 'Don't' va 'Never' birga kelmaydi! Faqat 'I never...'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 4 } }
            ,{ phase: "personalization", prompt_uz: "Siz hech qachon nima qilmaysiz?", model_frame: "I never ___.", flexibleCheck: true, tags: ["frequency", "negative"] }
          ]
        },
        // every
        {
          id: "V_U02_L03_every",
          en: "every",
          uz: "har (har bir)",
          pos: "determiner",
          type: "frequency",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_every.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 1, speaker: "Sara", bubble_text: "I wake up at 6 AM every day." },
          slides: [
            { phase: "presentation", uz_context: "Siz faqat dushanba kuni yugurasizmi?", audio: "audio/U02/q_every.mp3", uz_mirror_answer: "Yo'q, men har kuni yuguraman.", hybrid_answer: "Yo'q, I run **every** day.", en_canonical: "No, I run every day.", syntax_scaffold: { en_structure: "No, I run every day.", uz_gloss: "Yo'q, men har kuni yuguraman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "run", role: "verb", color: "green" }, { word: "every day", role: "frequency", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Every day' nima?", exercise: { type: "function_sort", sentence: "I run every day.", options: [{ label: "Muntazam (Daily)", value: "daily", correct: true }, { label: "Bir marta (Once)", value: "once", correct: false }], success_msg: "To'g'ri! 'Every' = HAR.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "every", form_focus: "determiner_singular", why_prompt: "Nega 'every day' (birlik), 'every days' emas?", explanation_uz: "'Every' dan keyin birlik otlar keladi: 'every day', 'every week', 'every student'. Ko'plik qo'shilmaydi!", mini_rule: "every + singular noun (every day, NOT every days)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I wake up at 6 AM every day.", uz: "Men har kuni soat 6 da uyg'onaman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 1, speaker: "Sara" }, { en: "Every student has a book.", uz: "Har bir talabada kitob bor.", subject: "Every", focus_word: "every" }, { en: "She works every morning.", uz: "U har ertalab ishlaydi.", subject: "She", focus_word: "every" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Har kuni.", model_answer: "Every day.", accepted_answers: ["Every day."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Siz har kuni nima qilasiz?", model_frame: "Every day, I ___.", flexibleCheck: true, tags: ["frequency", "daily"] }
          ]
        },
        // week
        {
          id: "V_U02_L03_week",
          en: "week",
          uz: "hafta",
          pos: "noun/time",
          type: "time_phrase",
          priority: 1,
          category: "time",
          introduced_in: "U02_L03",
          image: "/images/U02/U02_L03/img_week.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 1, speaker: "Kamila", bubble_text: "I always exercise three times a week." },
          slides: [
            { phase: "presentation", uz_context: "Bu oyda necha kun bor?", audio: "audio/U02/q_week.mp3", uz_mirror_answer: "Bir haftada yetti kun bor.", hybrid_answer: "One **week** has seven days.", en_canonical: "One week has seven days.", syntax_scaffold: { en_structure: "One week has seven days.", uz_gloss: "Bir haftada yetti kun bor.", tokens: [{ word: "One week", role: "subject", color: "blue" }, { word: "has", role: "verb", color: "green" }, { word: "seven days", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Week' = ?", exercise: { type: "function_sort", sentence: "See you next week.", options: [{ label: "Hafta (7 days)", value: "7", correct: true }, { label: "Yil (Year)", value: "365", correct: false }], success_msg: "To'g'ri! 'Week' = hafta.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "week", form_focus: "time_expressions", why_prompt: "'A week' va 'the week' farqi nima?", explanation_uz: "'A week' = har qanday bir hafta. 'This week' = shu hafta. 'Three times a week' = haftada uch marta ('a' = 'per' ma'nosida).", mini_rule: "times + a week (a = per: three times a week)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I exercise three times a week.", uz: "Men haftada uch marta mashq qilaman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 1, speaker: "Kamila" }, { en: "Have a good week!", uz: "Haftangiz yaxshi o'tsin!", subject: "", focus_word: "week" }, { en: "See you next week.", uz: "Kelasi hafta ko'rishamiz.", subject: "See", focus_word: "week" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Kelasi hafta.", model_answer: "Next week.", accepted_answers: ["Next week."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 1 } }
            ,{ phase: "personalization", prompt_uz: "Haftada necha marta mashq qilasiz?", model_frame: "I exercise ___ times a week.", flexibleCheck: true, tags: ["frequency", "exercise"] }
          ]
        }
      ]
    },
    
    "U02_L04": {
      lesson_id: "U02_L04",
      title: "Lifestyle & Health",
      flow_model: "sandwich",
      mastery_dialogue_id: "U02_L01_D03_1",
      items: [
        // exercise
        {
          id: "V_U02_L04_exercise",
          en: "exercise",
          uz: "mashq qilmoq (sport)",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "health",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_exercise.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 0, speaker: "Nilufar", bubble_text: "How often do you exercise?" },
          slides: [
            { phase: "presentation", uz_context: "Siz faqat uxlaysizmi?", audio: "audio/U02/q_exercise.mp3", uz_mirror_answer: "Yo'q, men har kuni mashq qilaman.", hybrid_answer: "Yo'q, I **exercise** every day.", en_canonical: "No, I exercise every day.", syntax_scaffold: { en_structure: "No, I exercise every day.", uz_gloss: "Yo'q, men har kuni mashq qilaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "exercise", role: "verb", color: "green" }, { word: "every day", role: "frequency", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Exercise' nima?", exercise: { type: "function_sort", sentence: "I exercise at the gym.", options: [{ label: "Sport (Physical activity)", value: "sport", correct: true }, { label: "Uxlamoq (Sleep)", value: "sleep", correct: false }], success_msg: "To'g'ri! 'Exercise' = mashq qilmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "exercise", form_focus: "verb_noun_dual", why_prompt: "'Exercise' \u2014 fe'l yoki ot?", explanation_uz: "'Exercise' ikki xil ishlatiladi: 1) Fe'l: 'I exercise every day' (mashq qilaman). 2) Ot: 'Exercise is good' (mashq foydali). Kontekst hal qiladi.", mini_rule: "exercise as verb: I exercise | as noun: Exercise is good" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "How often do you exercise?", uz: "Qanchalik tez-tez mashq qilasiz?", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 0, speaker: "Nilufar" }, { en: "Exercise is good for you.", uz: "Mashq qilish siz uchun foydali.", subject: "Exercise", focus_word: "Exercise" }, { en: "I don't exercise enough.", uz: "Men yetarlicha mashq qilmayman.", subject: "I", focus_word: "exercise" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men har kuni mashq qilaman.", model_answer: "I exercise every day.", accepted_answers: ["I exercise every day."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday mashq qilasiz?", model_frame: "I exercise by ___.", flexibleCheck: true, tags: ["health", "exercise"] }
          ]
        },
        // run
        {
          id: "V_U02_L04_run",
          en: "run",
          uz: "yugurmoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "health",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_run.png",
          dialogue_ref: { dialogue_id: "U02_L01_D01", line_index: 5, speaker: "Sara", bubble_text: "Yes, I run every morning." },
          slides: [
            { phase: "presentation", uz_context: "Siz yuradiganmisiz?", audio: "audio/U02/q_run.mp3", uz_mirror_answer: "Yo'q, men yuguraman.", hybrid_answer: "Yo'q, I **run**.", en_canonical: "No, I run.", syntax_scaffold: { en_structure: "No, I run.", uz_gloss: "Yo'q, men yuguraman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "run", role: "verb", color: "green" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Run' = ?", exercise: { type: "function_sort", sentence: "Run fast!", options: [{ label: "Yugurish (Fast)", value: "fast", correct: true }, { label: "Yurish (Slow)", value: "slow", correct: false }], success_msg: "To'g'ri! 'Run' = yugurmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "run", form_focus: "third_person_s", why_prompt: "Nega 'He runs' \u2014 's' bilan?", explanation_uz: "He/She/It bilan fe'lga '-s' qo'shiladi: 'He runs', 'She runs'. 'I/You/We/They' bilan 's' yo'q: 'I run', 'They run'.", mini_rule: "he/she/it + runs (add -s)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I run every morning.", uz: "Men har ertalab yuguraman.", is_anchor: true, source_dialogue: "U02_L01_D01", source_line: 5, speaker: "Sara" }, { en: "He runs in the park.", uz: "U parkda yuguradi.", subject: "He", focus_word: "runs" }, { en: "Do you like to run?", uz: "Yugurishni yoqtirasizmi?", subject: "you", focus_word: "run" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U parkda yuguradi.", model_answer: "He runs in the park.", accepted_answers: ["He runs in the park."], trap: { trigger: "He run", message: "\u26a0\ufe0f 'He' bilan 'S' qo'shing: 'He RUNS'." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D01", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz qayerda yugurasiz?", model_frame: "I run in/at ___.", flexibleCheck: true, tags: ["exercise", "place"] }
          ]
        },
        // healthy
        {
          id: "V_U02_L04_healthy",
          en: "healthy",
          uz: "sog'lom",
          pos: "adjective",
          type: "quality",
          priority: 1,
          category: "health",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_healthy.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 3, speaker: "Kamila", bubble_text: "I usually eat healthy food." },
          slides: [
            { phase: "presentation", uz_context: "Siz kasalmisiz?", audio: "audio/U02/q_healthy.mp3", uz_mirror_answer: "Yo'q, men sog'lomman.", hybrid_answer: "Yo'q, I am **healthy**.", en_canonical: "No, I am healthy.", syntax_scaffold: { en_structure: "No, I am healthy.", uz_gloss: "Yo'q, men sog'lomman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "am", role: "verb_be", color: "green" }, { word: "healthy", role: "adjective", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Healthy' nima?", exercise: { type: "function_sort", sentence: "Apples are healthy.", options: [{ label: "Foydali (Good for body)", value: "good", correct: true }, { label: "Zararli (Bad)", value: "bad", correct: false }], success_msg: "To'g'ri! 'Healthy' = sog'lom.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "healthy", form_focus: "adjective_position", why_prompt: "'Healthy food' \u2014 sifat qayerda turadi?", explanation_uz: "Ingliz tilida sifat otdan OLDIN keladi: 'healthy food' (sog'lom ovqat), 'big house' (katta uy). O'zbek tilidagi tartibga o'xshaydi.", mini_rule: "adjective + noun (healthy food, big house)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I usually eat healthy food.", uz: "Men odatda sog'lom ovqat yeyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 3, speaker: "Kamila" }, { en: "Exercise is healthy.", uz: "Mashq qilish sog'lom (foydali).", subject: "Exercise", focus_word: "healthy" }, { en: "Is this healthy?", uz: "Bu sog'lommi?", subject: "this", focus_word: "healthy" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Sog'lom ovqat.", model_answer: "Healthy food.", accepted_answers: ["Healthy food."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz sog'lom ovqat yeysizmi?", model_frame: "I eat healthy ___.", flexibleCheck: true, tags: ["health", "food"] }
          ]
        },
        // restaurant
        {
          id: "V_U02_L04_restaurant",
          en: "restaurant",
          uz: "restoran",
          pos: "noun",
          type: "place",
          priority: 1,
          category: "place",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_restaurant.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 5, speaker: "Kamila", bubble_text: "Sometimes I eat at restaurants." },
          slides: [
            { phase: "presentation", uz_context: "Biz bugun uyda ovqatlanamizmi?", audio: "audio/U02/q_restaurant.mp3", uz_mirror_answer: "Yo'q, restoranga boramiz.", hybrid_answer: "Yo'q, let's go to a **restaurant**.", en_canonical: "No, let's go to a restaurant.", syntax_scaffold: { en_structure: "No, let's go to a restaurant.", uz_gloss: "Yo'q, restoranga boramiz.", tokens: [{ word: "let's", role: "suggestion", color: "blue" }, { word: "go", role: "verb", color: "green" }, { word: "to a restaurant", role: "destination", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Restaurant' nima?", exercise: { type: "function_sort", sentence: "We eat at a restaurant.", options: [{ label: "Ovqatlanish joyi (Eating place)", value: "place", correct: true }, { label: "Kutubxona (Library)", value: "lib", correct: false }], success_msg: "To'g'ri! 'Restaurant' = restoran.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "restaurant", form_focus: "preposition_at", why_prompt: "Nega 'AT a restaurant' deyiladi?", explanation_uz: "'At' \u2014 aniq joy uchun ishlatiladi: 'at a restaurant', 'at home', 'at school'. 'In' \u2014 ichkarisini ta'kidlash uchun.", mini_rule: "eat AT a restaurant (at = specific location)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "Sometimes I eat at restaurants.", uz: "Ba'zan men restoranda yeyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 5, speaker: "Kamila" }, { en: "This restaurant is good.", uz: "Bu restoran yaxshi.", subject: "This", focus_word: "restaurant" }, { en: "Where is the restaurant?", uz: "Restoran qayerda?", subject: "Where", focus_word: "restaurant" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men restoranda yeyman.", model_answer: "I eat at a restaurant.", accepted_answers: ["I eat at a restaurant.", "I eat at restaurants."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Siz qaysi restoranni yoqtirasiz?", model_frame: "I like eating at ___.", flexibleCheck: true, tags: ["food", "place"] }
          ]
        },
        // friend
        {
          id: "V_U02_L04_friend",
          en: "friend",
          uz: "do'st",
          pos: "noun",
          type: "person",
          priority: 1,
          category: "social",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_friend.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 5, speaker: "Kamila", bubble_text: "with friends" },
          slides: [
            { phase: "presentation", uz_context: "U sizning dushmaningizmi?", audio: "audio/U02/q_friend.mp3", uz_mirror_answer: "Yo'q, u mening do'stim.", hybrid_answer: "Yo'q, he is my **friend**.", en_canonical: "No, he is my friend.", syntax_scaffold: { en_structure: "No, he is my friend.", uz_gloss: "Yo'q, u mening do'stim.", tokens: [{ word: "he", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "my friend", role: "noun_phrase", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Friend' kim?", exercise: { type: "function_sort", sentence: "Ali is my friend.", options: [{ label: "Yaqin inson (Close person)", value: "close", correct: true }, { label: "Notanish (Stranger)", value: "stranger", correct: false }], success_msg: "To'g'ri! 'Friend' = do'st.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "friend", form_focus: "possessive_my", why_prompt: "Nega 'my friend' \u2014 'me friend' emas?", explanation_uz: "Egalik olmoshlari: 'my', 'your', 'his', 'her'. 'My friend' = mening do'stim. 'Me' \u2014 boshqa holatlarda ishlatiladi.", mini_rule: "my + noun (my friend, my book)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I eat with friends.", uz: "Men do'stlarim bilan ovqatlanaman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 5, speaker: "Kamila" }, { en: "She is my best friend.", uz: "U mening eng yaqin do'stim.", subject: "She", focus_word: "friend" }, { en: "Hello, friend!", uz: "Salom, do'stim!", subject: "Hello", focus_word: "friend" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: U mening do'stim.", model_answer: "He is my friend.", accepted_answers: ["He is my friend.", "She is my friend."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 5 } }
            ,{ phase: "personalization", prompt_uz: "Sizning eng yaxshi do'stingiz kim?", model_frame: "My best friend is ___.", flexibleCheck: true, tags: ["social", "people"] }
          ]
        },
        // home
        {
          id: "V_U02_L04_home",
          en: "home",
          uz: "uy",
          pos: "noun/place",
          type: "place",
          priority: 1,
          category: "place",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_home.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 3, speaker: "Kamila", bubble_text: "I usually eat healthy food at home." },
          slides: [
            { phase: "presentation", uz_context: "Siz qayerdasiz?", audio: "audio/U02/q_home.mp3", uz_mirror_answer: "Men uydaman.", hybrid_answer: "I am at **home**.", en_canonical: "I am at home.", syntax_scaffold: { en_structure: "I am at home.", uz_gloss: "Men uydaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "am", role: "verb_be", color: "green" }, { word: "at home", role: "place", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Home' nima?", exercise: { type: "function_sort", sentence: "I go home.", options: [{ label: "Yashash joyi (Living place)", value: "live", correct: true }, { label: "Ish joyi (Work place)", value: "work", correct: false }], success_msg: "To'g'ri! 'Home' = uy.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "home", form_focus: "no_preposition_go", why_prompt: "Nega 'go home' \u2014 'go TO home' emas?", explanation_uz: "'Go home' = uyga borish. 'Home' bilan 'TO' kerak emas! 'I go home' to'g'ri, 'I go to home' noto'g'ri. Lekin 'at home' = uyda.", mini_rule: "go home (NO 'to'), but stay AT home" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I eat at home.", uz: "Men uyda ovqatlanaman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 3, speaker: "Kamila" }, { en: "I go home at 6.", uz: "Men 6 da uyga boraman.", subject: "I", focus_word: "home" }, { en: "Welcome home.", uz: "Uyga xush kelibsiz.", subject: "Welcome", focus_word: "home" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men uyga boraman.", model_answer: "I go home.", accepted_answers: ["I go home."], trap: { trigger: "I go to home", message: "\u26a0\ufe0f 'TO' kerak emas! 'I go home' to'g'ri." }, on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 3 } }
            ,{ phase: "personalization", prompt_uz: "Siz uyda nima qilishni yoqtirasiz?", model_frame: "At home, I like to ___.", flexibleCheck: true, tags: ["home", "leisure"] }
          ]
        },
        // time
        {
          id: "V_U02_L04_time",
          en: "time",
          uz: "vaqt",
          pos: "noun",
          type: "time",
          priority: 1,
          category: "time",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_time.png",
          dialogue_ref: { dialogue_id: "U02_L01_D02", line_index: 0, speaker: "Bekzod", bubble_text: "What time do you start work?" },
          slides: [
            { phase: "presentation", uz_context: "Soat nechi bo'ldi?", audio: "audio/U02/q_time.mp3", uz_mirror_answer: "Vaqt bo'ldi.", hybrid_answer: "It is **time**.", en_canonical: "It is time.", syntax_scaffold: { en_structure: "It is time.", uz_gloss: "Vaqt bo'ldi.", tokens: [{ word: "It", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "time", role: "noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Time' nima?", exercise: { type: "function_sort", sentence: "What time is it?", options: [{ label: "Vaqt (Clock)", value: "clock", correct: true }, { label: "Pul (Money)", value: "money", correct: false }], success_msg: "To'g'ri! 'Time' = vaqt.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "time", form_focus: "what_time_question", why_prompt: "'What time' qanday savol?", explanation_uz: "'What time...?' = Soat nechida? 'What time do you start?' = Soat nechada boshlaysiz? 'Time' ko\u2019p qirral\u0131 so\u2019z: vaqt, marta, davr.", mini_rule: "What time + do/does + subject + verb?" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "What time do you start work?", uz: "Soat nechada ishni boshlaysiz?", is_anchor: true, source_dialogue: "U02_L01_D02", source_line: 0, speaker: "Bekzod" }, { en: "I have time.", uz: "Menda vaqt bor.", subject: "I", focus_word: "time" }, { en: "Time is money.", uz: "Vaqt - bu pul.", subject: "Time", focus_word: "time" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Menda vaqt yo'q.", model_answer: "I don't have time.", accepted_answers: ["I don't have time.", "I have no time."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D02", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Siz soat nechada uxlaysiz?", model_frame: "I go to bed at ___.", flexibleCheck: true, tags: ["time", "routine"] }
          ]
        },
        // evening
        {
          id: "V_U02_L04_evening",
          en: "evening",
          uz: "kechqurun",
          pos: "noun/time",
          type: "time_phrase",
          priority: 1,
          category: "time",
          introduced_in: "U02_L04",
          image: "/images/U02/U02_L04/img_evening.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 6, speaker: "Nilufar", bubble_text: "What do you do in the evening?" },
          slides: [
            { phase: "presentation", uz_context: "Kechki ovqat qachon?", audio: "audio/U02/q_evening.mp3", uz_mirror_answer: "Kechqurun.", hybrid_answer: "In the **evening**.", en_canonical: "In the evening.", syntax_scaffold: { en_structure: "In the evening.", uz_gloss: "Kechqurun.", tokens: [{ word: "In", role: "preposition", color: "orange" }, { word: "the evening", role: "time_noun", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Evening' qaysi vaqt?", exercise: { type: "function_sort", sentence: "Good evening!", options: [{ label: "Kechki payt (After 6 PM)", value: "pm", correct: true }, { label: "Ertalab (Morning)", value: "am", correct: false }], success_msg: "To'g'ri! 'Evening' = kechqurun.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "evening", form_focus: "preposition_in", why_prompt: "Nega 'IN the evening', lekin 'AT night'?", explanation_uz: "'Morning', 'afternoon', 'evening' bilan 'IN' ishlatiladi: 'in the morning', 'in the evening'. Lekin 'night' bilan 'AT': 'at night'.", mini_rule: "in the morning/afternoon/evening, BUT at night" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "What do you do in the evening?", uz: "Kechqurun nima qilasiz?", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 6, speaker: "Nilufar" }, { en: "Good evening!", uz: "Xayrli kech!", subject: "Good", focus_word: "evening" }, { en: "I watch TV in the evening.", uz: "Men kechqurun televizor ko'raman.", subject: "I", focus_word: "evening" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Xayrli kech!", model_answer: "Good evening!", accepted_answers: ["Good evening!", "Good evening."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 6 } }
            ,{ phase: "personalization", prompt_uz: "Kechqurun nima qilishni yoqtirasiz?", model_frame: "In the evening, I ___.", flexibleCheck: true, tags: ["time", "evening"] }
          ]
        }
      ]
    },

    "U02_L05": {
      lesson_id: "U02_L05",
      title: "Environment & Grammar",
      flow_model: "sandwich",
      mastery_dialogue_id: "U02_L01_D03_1",
      items: [
        // watch
        {
          id: "V_U02_L05_watch",
          en: "watch",
          uz: "tomosha qilmoq (TV/kino)",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "leisure",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_watch.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "I usually watch TV." },
          slides: [
            { phase: "presentation", uz_context: "Siz kechqurun nima qilasiz?", audio: "audio/U02/q_watch.mp3", uz_mirror_answer: "Men televizor tomosha qilaman.", hybrid_answer: "I **watch** TV.", en_canonical: "I watch TV.", syntax_scaffold: { en_structure: "I watch TV.", uz_gloss: "Men televizor ko'raman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "watch", role: "verb", color: "green" }, { word: "TV", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Watch' nima?", exercise: { type: "function_sort", sentence: "I watch a movie.", options: [{ label: "Ko'rmoq (See moving things)", value: "see", correct: true }, { label: "Eshitmoq (Hear)", value: "hear", correct: false }], success_msg: "To'g'ri! 'Watch' = tomosha qilmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "watch", form_focus: "watch_vs_see_look", why_prompt: "'Watch', 'see', 'look' farqi nima?", explanation_uz: "'Watch' = diqqat bilan ko'rish (TV, film). 'See' = ko'rish (tasodifiy). 'Look' = qarash. 'I watch TV', lekin 'I see a bird'.", mini_rule: "watch = focused viewing (TV, movies)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I usually watch TV.", uz: "Men odatda televizor ko'raman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 7, speaker: "Kamila" }, { en: "She watches movies.", uz: "U kinolar ko'radi.", subject: "She", focus_word: "watches" }, { en: "Do not watch too much TV.", uz: "Ko'p televizor ko'rmang.", subject: "", focus_word: "watch" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men kino ko'raman.", model_answer: "I watch a movie.", accepted_answers: ["I watch a movie.", "I watch movies."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz televizorda nimani ko'rishni yoqtirasiz?", model_frame: "I like to watch ___.", flexibleCheck: true, tags: ["leisure", "TV"] }
          ]
        },
        // TV
        {
          id: "V_U02_L05_TV",
          en: "TV",
          uz: "televizor",
          pos: "noun",
          type: "object",
          priority: 1,
          category: "technology",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_tv.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "watch TV" },
          slides: [
            { phase: "presentation", uz_context: "Bu nima?", audio: "audio/U02/q_tv.mp3", uz_mirror_answer: "Bu televizor.", hybrid_answer: "It is a **TV**.", en_canonical: "It is a TV.", syntax_scaffold: { en_structure: "It is a TV.", uz_gloss: "Bu televizor.", tokens: [{ word: "It", role: "subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "a TV", role: "noun_phrase", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'TV' nima?", exercise: { type: "function_sort", sentence: "Turn on the TV.", options: [{ label: "Qurilma (Device)", value: "device", correct: true }, { label: "Odam (Person)", value: "person", correct: false }], success_msg: "To'g'ri! 'TV' = televizor.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "TV", form_focus: "abbreviation", why_prompt: "TV nima qisqartma?", explanation_uz: "'TV' = 'Television' qisqartmasi. 'Watch TV' = televizor ko'rmoq. 'Turn on the TV' = televizorni yoqmoq. Hissiy gap bilan 'a TV' ishlatiladi.", mini_rule: "TV = television (abbreviation, no period)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I watch TV.", uz: "Men televizor ko'raman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 7, speaker: "Kamila" }, { en: "The TV is on.", uz: "Televizor yoqilgan.", subject: "The", focus_word: "TV" }, { en: "We have a big TV.", uz: "Bizda katta televizor bor.", subject: "We", focus_word: "TV" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men televizorni yoqtiraman.", model_answer: "I like TV.", accepted_answers: ["I like TV."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Sizda nechta televizor bor?", model_frame: "I have ___ TV(s).", flexibleCheck: true, tags: ["technology", "home"] }
          ]
        },
        // read
        {
          id: "V_U02_L05_read",
          en: "read",
          uz: "o'qimoq (kitob)",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "leisure",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_read.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "read books" },
          slides: [
            { phase: "presentation", uz_context: "Siz kitob yozasizmi?", audio: "audio/U02/q_read.mp3", uz_mirror_answer: "Yo'q, men kitob o'qiyman.", hybrid_answer: "Yo'q, I **read** books.", en_canonical: "No, I read books.", syntax_scaffold: { en_structure: "No, I read books.", uz_gloss: "Yo'q, men kitob o'qiyman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "read", role: "verb", color: "green" }, { word: "books", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Read' nima?", exercise: { type: "function_sort", sentence: "I read a book.", options: [{ label: "O'qimoq (Look at words)", value: "look", correct: true }, { label: "Yozmoq (Write)", value: "write", correct: false }], success_msg: "To'g'ri! 'Read' = O'QIMOQ.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "read", form_focus: "irregular_pronunciation", why_prompt: "'Read' — o'tmishda qanday o'qiladi?", explanation_uz: "'Read' (hozirgi: /riːd/) va 'read' (o'tgan: /red/) — bir xil yoziladi, lekin turlicha o'qiladi! Bu irregular verb.", mini_rule: "read /riːd/ (present) vs read /red/ (past) — same spelling!" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I read books before bed.", uz: "Men uxlashdan oldin kitob o'qiyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 7, speaker: "Kamila" }, { en: "He reads the news.", uz: "U yangiliklarni o'qiydi.", subject: "He", focus_word: "reads" }, { en: "Do you like reading?", uz: "O'qishni yoqtirasizmi?", subject: "you", focus_word: "reading" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men kitob o'qiyman.", model_answer: "I read a book.", accepted_answers: ["I read a book.", "I read books."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday kitoblarni o'qishni yoqtirasiz?", model_frame: "I like to read ___.", flexibleCheck: true, tags: ["leisure", "reading"] }
          ]
        },
        // relax
        {
          id: "V_U02_L05_relax",
          en: "relax",
          uz: "dam olmoq / hordiq chiqarmoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "leisure",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_relax.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "usually watch TV (implied context of relaxing)" },
          slides: [
            { phase: "presentation", uz_context: "Siz ishdan keyin nima qilasiz?", audio: "audio/U02/q_relax.mp3", uz_mirror_answer: "Men dam olaman.", hybrid_answer: "I **relax**.", en_canonical: "I relax.", syntax_scaffold: { en_structure: "I relax.", uz_gloss: "Men dam olaman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "relax", role: "verb", color: "green" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Relax' = ?", exercise: { type: "function_sort", sentence: "I relax on Sunday.", options: [{ label: "Dam olish (Rest)", value: "rest", correct: true }, { label: "Ishlash (Work)", value: "work", correct: false }], success_msg: "To'g'ri! 'Relax' = dam olmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "relax", form_focus: "es_ending", why_prompt: "Nega 'She relaxes' — 'es' bilan?", explanation_uz: "Fe'l '-x', '-s', '-sh', '-ch' bilan tugasa, 3-shaxsda '-ES' qo'shiladi: 'relax → relaxes', 'watch → watches'. Oddiy '-s' emas!", mini_rule: "verbs ending in -x/-s/-sh/-ch + ES (relaxes, watches)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I relax in the evening.", uz: "Men kechqurun dam olaman.", subject: "I", focus_word: "relax" }, { en: "She relaxes with yoga.", uz: "U yoga bilan dam oladi.", subject: "She", focus_word: "relaxes" }, { en: "Just relax.", uz: "Shunchaki dam oling (tinchlaning).", subject: "Just", focus_word: "relax" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men uyda dam olaman.", model_answer: "I relax at home.", accepted_answers: ["I relax at home."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz qanday dam olasiz?", model_frame: "I relax by ___.", flexibleCheck: true, tags: ["leisure", "relaxation"] }
          ]
        },
        // sleep
        {
          id: "V_U02_L05_sleep",
          en: "sleep",
          uz: "uxlamoq",
          pos: "verb",
          type: "action_verb",
          priority: 1,
          category: "daily_routine",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_sleep.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "before bed (implied sleep)" },
          slides: [
            { phase: "presentation", uz_context: "Siz kechasi nima qilasiz?", audio: "audio/U02/q_sleep.mp3", uz_mirror_answer: "Men uxlayman.", hybrid_answer: "I **sleep**.", en_canonical: "I sleep.", syntax_scaffold: { en_structure: "I sleep.", uz_gloss: "Men uxlayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "sleep", role: "verb", color: "green" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Sleep' nima?", exercise: { type: "function_sort", sentence: "I sleep in a bed.", options: [{ label: "Uxlamoq (Rest eyes closed)", value: "rest", correct: true }, { label: "Yugurmoq (Run)", value: "run", correct: false }], success_msg: "To'g'ri! 'Sleep' = uxlamoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "sleep", form_focus: "intransitive_verb", why_prompt: "'Sleep' dan keyin nima keladi?", explanation_uz: "'Sleep' — intransitive fe'l, ya'ni ob'yektsiz ishlatiladi: 'I sleep' (men uxlayman). 'I sleep a book' — NOTO'G'RI. Lekin 'I sleep 8 hours' — TO'G'RI (vaqt bilan).", mini_rule: "I sleep (no object needed), but I sleep + time OK" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I sleep 8 hours.", uz: "Men 8 soat uxlayman.", subject: "I", focus_word: "sleep" }, { en: "Baby sleeps.", uz: "Chaqaloq uxlayapti.", subject: "Baby", focus_word: "sleeps" }, { en: "Good night, sleep well.", uz: "Xayrli tun, yaxshi dam oling.", subject: "Good", focus_word: "sleep" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men uxlayman.", model_answer: "I sleep.", accepted_answers: ["I sleep."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz necha soat uxlaysiz?", model_frame: "I sleep ___ hours.", flexibleCheck: true, tags: ["health", "routine"] }
          ]
        },
        // bed
        {
          id: "V_U02_L05_bed",
          en: "bed",
          uz: "yotoq / kravat",
          pos: "noun",
          type: "furniture",
          priority: 1,
          category: "furniture",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_bed.png",
          dialogue_ref: { dialogue_id: "U02_L01_D03", line_index: 7, speaker: "Kamila", bubble_text: "before bed" },
          slides: [
            { phase: "presentation", uz_context: "Siz qayerda uxlaysiz?", audio: "audio/U02/q_bed.mp3", uz_mirror_answer: "Men yotoqda uxlayman.", hybrid_answer: "I sleep in **bed**.", en_canonical: "I sleep in bed.", syntax_scaffold: { en_structure: "I sleep in bed.", uz_gloss: "Men yotoqda uxlayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "sleep", role: "verb", color: "green" }, { word: "in bed", role: "place", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Bed' nima?", exercise: { type: "function_sort", sentence: "Go to bed.", options: [{ label: "Mebel (Furniture for sleep)", value: "furniture", correct: true }, { label: "Stol (Table)", value: "table", correct: false }], success_msg: "To'g'ri! 'Bed' = yotoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "bed", form_focus: "zero_article_bed", why_prompt: "Nega 'go to bed' — 'THE' yo'q?", explanation_uz: "'Go to bed' = uxlashga bormoq (umumiy ma'no). 'THE bed' = aniq yotoqni ko'rsatish uchun ishlatiladi. 'In bed' = yotoqda (umumiy).", mini_rule: "go to bed / in bed (NO article for general meaning)" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I read before bed.", uz: "Men uxlashdan oldin o'qiyman.", is_anchor: true, source_dialogue: "U02_L01_D03", source_line: 7, speaker: "Kamila" }, { en: "This bed is soft.", uz: "Bu yotoq yumshoq.", subject: "This", focus_word: "bed" }, { en: "Go to bed!", uz: "Yotib uxla!", subject: "Go", focus_word: "bed" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Men yotoqga boraman (uxlashga).", model_answer: "I go to bed.", accepted_answers: ["I go to bed."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D03", line_index: 7 } }
            ,{ phase: "personalization", prompt_uz: "Siz soat nechada uxlashga borasiz?", model_frame: "I go to bed at ___.", flexibleCheck: true, tags: ["routine", "time"] }
          ]
        },
        // have
        {
          id: "V_U02_L05_have",
          en: "have",
          uz: "bor bo'lmoq (menda bor)",
          pos: "verb",
          type: "possession",
          priority: 1,
          category: "grammar_verb",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_have.png",
          dialogue_ref: { dialogue_id: "U02_L01_D04", line_index: 4, speaker: "Ali", bubble_text: "Do you have a laptop?" },
          slides: [
            { phase: "presentation", uz_context: "Sizda mashina bormi?", audio: "audio/U02/q_have.mp3", uz_mirror_answer: "Ha, menda mashina bor.", hybrid_answer: "Yes, I **have** a car.", en_canonical: "Yes, I have a car.", syntax_scaffold: { en_structure: "Yes, I have a car.", uz_gloss: "Ha, menda mashina bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a car", role: "object", color: "purple" }] } },
            { phase: "practice", type: "concept_check", instruction: "'Have' nima?", exercise: { type: "function_sort", sentence: "I have a pen.", options: [{ label: "Egalik qilish (Own)", value: "own", correct: true }, { label: "Yemoq (Eat)", value: "eat", correct: false }], success_msg: "To'g'ri! 'Have' = bor bo'lmoq.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "have", form_focus: "have_vs_has", why_prompt: "Nega 'I have', lekin 'She has'?", explanation_uz: "'Have' — 'I/you/we/they' bilan. 'Has' — 'he/she/it' bilan. 'I have a book' ✓, 'She has a book' ✓, 'She have...' ✗.", mini_rule: "I/you/we/they HAVE | he/she/it HAS" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "I have my own laptop.", uz: "Mening shaxsiy noutbukim bor.", is_anchor: true, source_dialogue: "U02_L01_D04", source_line: 5, speaker: "Bekzod" }, { en: "Do you have siblings?", uz: "Sizda aka-uka bormi?", subject: "you", focus_word: "have" }, { en: "We have time.", uz: "Bizda vaqt bor.", subject: "We", focus_word: "have" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Menda kitob bor.", model_answer: "I have a book.", accepted_answers: ["I have a book."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D04", line_index: 4 } }
            ,{ phase: "personalization", prompt_uz: "Sizda nima bor?", model_frame: "I have ___.", flexibleCheck: true, tags: ["possession", "personal"] }
          ]
        },
        // there is/are
        {
          id: "V_U02_L05_there_is",
          en: "there is / there are",
          uz: "bor (mavjudlik)",
          pos: "phrase",
          type: "existence",
          priority: 1,
          category: "grammar",
          introduced_in: "U02_L05",
          image: "/images/U02/U02_L05/img_there_is.png",
          dialogue_ref: { dialogue_id: "U02_L01_D04", line_index: 0, speaker: "Ali", bubble_text: "Is there a coffee shop near your office?" },
          slides: [
            { phase: "presentation", uz_context: "Bu yerda stol bormi?", audio: "audio/U02/q_there_is.mp3", uz_mirror_answer: "Ha, bu yerda stol bor.", hybrid_answer: "Yes, **there is** a table here.", en_canonical: "Yes, there is a table here.", syntax_scaffold: { en_structure: "Yes, there is a table here.", uz_gloss: "Ha, bu yerda stol bor.", tokens: [{ word: "there", role: "dummy_subject", color: "blue" }, { word: "is", role: "verb_be", color: "green" }, { word: "a table", role: "real_subject", color: "purple" }, { word: "here", role: "place", color: "orange" }] } },
            { phase: "practice", type: "concept_check", instruction: "'There is' qachon ishlatiladi?", exercise: { type: "function_sort", sentence: "There is a cat.", options: [{ label: "Bir narsa uchun (Singular)", value: "singular", correct: true }, { label: "Ko'p narsa uchun (Plural)", value: "plural", correct: false }], success_msg: "To'g'ri! 'There is' = birlikda, 'There are' = ko'plikda.", fail_msg: "Yo'q." } },
            { phase: "discovery", grammar_token: "there is/are", form_focus: "existential_there", why_prompt: "'There is' va 'There are' farqi nima?", explanation_uz: "'There is' = birlikda (there is a book). 'There are' = ko'plikda (there are books). 'There' bu yerda joy emas, mavjudlikni bildiradi.", mini_rule: "there is + singular | there are + plural" },
            { phase: "practice", type: "drill_list", en_examples: [{ en: "There's a good coffee shop.", uz: "Yaxshi qahvaxona bor.", is_anchor: true, source_dialogue: "U02_L01_D04", source_line: 1, speaker: "Bekzod" }, { en: "There are thirty computers.", uz: "O'ttizta kompyuter bor.", subject: "Computers", focus_word: "There are" }, { en: "Is there a problem?", uz: "Muammo bormi?", subject: "Problem", focus_word: "Is there" }] },
            { phase: "production", uz_prompt: "Ingliz tilida ayting: Kitob bor.", model_answer: "There is a book.", accepted_answers: ["There is a book."], on_success: { unlock_bubble: true, dialogue_id: "U02_L01_D04", line_index: 0 } }
            ,{ phase: "personalization", prompt_uz: "Sizning xonangizda nima bor?", model_frame: "There is/are ___ in my room.", flexibleCheck: true, tags: ["existence", "home"] }
          ]
        }
      ]
    },

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
  Object.freeze(window.VOCAB_CARDS_U02);
}
