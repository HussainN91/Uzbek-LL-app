/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 06: Past Negation, Questions & Jobs (3 Lessons, 4+2 Act)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4+2 Act Slide Structure (Renderer V2.5+)
 * MISSION FLOW: 3×2 Successive Mastery Cycle (Sandwich Technique)
 *
 * UNIT SCOPE (A1+ Past Negation & Questions — Building on U05 Past Actions):
 * - Past negatives: didn't + BASE verb (NOT verb-ed!)
 * - Past questions: Did + subject + BASE verb?
 * - Short answers: Yes, I did / No, I didn't
 * - Reason clauses with "because" (new adverbial progression)
 * - Jobs/professions vocabulary in past contexts
 * - "Why" questions with didn't
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
 * @version 2.0.0 - 4+2 Act + Mission Flow + Contrastive Turns (upgrade from 1.0)
 */

window.VOCAB_CARDS_U06 = {
    unit_id: "U06",
    unit_title: "Past Negation, Questions & Jobs",
    scalability_level: "A1",
    grammar_focus: "did/didn't + base verb; Why questions; because clauses; jobs",

    // ═══════════════════════════════════════════════════════════════════════════
    // RECYCLING REGISTRY (Rule R2)
    // ═══════════════════════════════════════════════════════════════════════════
    recycling: {
        mandatory: {
            from_u01: {
                subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
                to_be_present: ["am", "is", "are", "isn't", "aren't"],
                possessive_det: ["my", "your", "his", "her", "our", "their"],
                question_words: ["what", "who"],
                articles: ["a", "an", "the"],
                demonstratives: ["this", "that"],
                family: ["mother", "father", "brother", "sister"],
                identity: ["name", "teacher", "student"],
                greetings: ["hello", "nice", "meet"]
            },
            from_u01_5: {
                possession: ["have", "has", "don't have", "doesn't have"],
                existence: ["there is", "there are", "there isn't", "there aren't"],
                wh_questions: ["where", "how", "when", "why"],
                prepositions: ["in", "on", "at"],
                addition: ["too"]
            },
            from_u02: {
                time_markers: ["every day", "in the morning", "in the evening", "at night"],
                action_verbs: ["wake up", "go", "work", "study", "play"],
                frequency: ["always", "usually", "sometimes"],
                auxiliaries_present: ["do", "does", "don't", "doesn't"]
            },
            from_u03: {
                preference_verbs: ["like", "love", "hate"],
                emotion_adj: ["happy", "sad", "excited"],
                food_items: ["pizza", "fish", "chicken"],
                music_terms: ["song", "music", "singer"]
            },
            from_u04: {
                past_states: ["was", "were", "wasn't", "weren't"],
                state_adjectives: ["tired", "busy", "nervous", "fine", "great"],
                past_time_markers: ["yesterday", "last week"],
                locations: ["home", "museum", "park", "beach", "library"]
            },
            from_u05: {
                past_regular_verbs: ["played", "watched", "visited", "worked", "walked", "studied", "cleaned", "listened", "talked", "finished", "helped", "cooked", "prepared", "started", "stopped", "stayed", "arrived"],
                past_auxiliaries: ["did", "didn't"],
                past_question_forms: ["Did you...?"],
                past_time_expressions: ["yesterday", "last week", "last night"]
            }
        },
        ratio_target: { min: 0.60, max: 0.75 }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MISSION METADATA (3×2 Successive Mastery Cycle)
    // ═══════════════════════════════════════════════════════════════════════════
    mission: {
        mission_id: "U06_M01",
        flow_model: "sandwich",
        target_vocab: ["didn't", "Did", "Why", "together", "castle", "sad", "teacher", "manager", "cook", "nurse", "before", "job", "because", "sick", "come", "busy"],
        stages: [
            {
                stage: 1,
                form: "affirmative",
                target_vocab: ["teacher", "manager", "cook", "nurse", "before", "job"],
                dialogue_id: "U06_L02_D01",
                pressure_id: "U06_L02_D01_1",
                mirror_mode: true
            },
            {
                stage: 2,
                form: "negative",
                target_vocab: ["didn't", "together", "castle", "sad"],
                dialogue_id: "U06_L01_D01",
                pressure_id: "U06_L01_D01_1",
                mirror_mode: true
            },
            {
                stage: 3,
                form: "interrogative",
                target_vocab: ["Did", "Why", "because", "sick", "come", "busy"],
                dialogue_id: "U06_L03_D01",
                pressure_id: "U06_L03_D01_1",
                mirror_mode: false
            }
        ],
        mastery_dialogue_id: "U06_L03_D01_1"
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
    // ═══════════════════════════════════════════════════════════════════════════
    contrastive_turns: [
        {
            stage: 1,
            focus: "affirm_past_job_pattern",
            dialogue_id: "U06_L02_D01",
            speaker_a: { text: "I worked as a teacher for two years.", speaker: "Ali" },
            speaker_b: { text: "I didn't work as a manager.", speaker: "Ali" },
            highlights: [
                {
                    blue: { text: "worked as", type: "past_affirm_job" },
                    red: { text: "didn't work as", type: "past_neg_base_job" }
                }
            ]
        },
        {
            stage: 2,
            focus: "neg_didnt_plus_base_not_ed",
            dialogue_id: "U06_L01_D01",
            speaker_a: { text: "She played football yesterday.", speaker: "Bekzod" },
            speaker_b: { text: "She didn't play football yesterday.", speaker: "Sara" },
            highlights: [
                {
                    blue: { text: "played", type: "past_affirmative_ed" },
                    red: { text: "didn't play", type: "negative_base_verb" }
                }
            ]
        },
        {
            stage: 3,
            focus: "why_question_because_answer",
            dialogue_id: "U06_L03_D01",
            speaker_a: { text: "I didn't come to school.", speaker: "Nilufar" },
            speaker_b: { text: "Why didn't you come to school?", speaker: "Madina" },
            highlights: [
                {
                    blue: { text: "didn't come", type: "negative_statement" },
                    red: { text: "Why didn't you come", type: "why_question_inversion" }
                }
            ]
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // DIALOGUES (Constraint 1, 2, 3, 4)
    // ═══════════════════════════════════════════════════════════════════════════
    dialogues: {
        "U06_L01_D01": {
            id: "U06_L01_D01",
            title: "Weekend Plans Gone Wrong",
            lines: [
                { speaker: "Bekzod", line: "Hi Sara! Did you go to the museum yesterday?", line_uz: "Salom Sara! Kecha muzeyga bordingizmi?", target: ["Did", "go", "museum", "yesterday"], mastery_key: "U06_L01_D01_0" },
                { speaker: "Sara", line: "No, I didn't go to the museum.", line_uz: "Yo'q, muzeyga bormadim.", target: ["didn't", "go", "museum"], mastery_key: "U06_L01_D01_1" },
                { speaker: "Bekzod", line: "Why didn't you go?", line_uz: "Nega bormadingiz?", target: ["Why", "didn't", "go"], mastery_key: "U06_L01_D01_2" },
                { speaker: "Sara", line: "I was tired. I stayed at home.", line_uz: "Charchagan edim. Uyda qoldim.", target: ["was", "tired", "stayed"], mastery_key: "U06_L01_D01_3" },
                { speaker: "Bekzod", line: "Did she play football with you?", line_uz: "U siz bilan futbol o'ynadimi?", target: ["Did", "play", "football"], mastery_key: "U06_L01_D01_4" },
                { speaker: "Sara", line: "No, she didn't play football yesterday.", line_uz: "Yo'q, u kecha futbol o'ynamadi.", target: ["didn't", "play", "football"], mastery_key: "U06_L01_D01_5" },
                { speaker: "Bekzod", line: "I didn't visit the castle last week.", line_uz: "Men o'tgan hafta qal'aga bormadim.", target: ["didn't", "visit", "castle"], mastery_key: "U06_L01_D01_6" },
                { speaker: "Sara", line: "Why didn't you visit it?", line_uz: "Nega bormadingiz?", target: ["Why", "didn't", "visit"], mastery_key: "U06_L01_D01_7" },
                { speaker: "Bekzod", line: "I was busy. I worked all day.", line_uz: "Band edim. Kun bo'yi ishladim.", target: ["was", "busy", "worked"], mastery_key: "U06_L01_D01_8" },
                { speaker: "Sara", line: "We didn't go together. That's sad.", line_uz: "Biz birga bormadik. Bu qayg'uli.", target: ["didn't", "go", "together", "sad"], mastery_key: "U06_L01_D01_9" }
            ]
        },
        "U06_L02_D01": {
            id: "U06_L02_D01",
            title: "Past Jobs Interview",
            lines: [
                { speaker: "Manager", line: "Did you work as a teacher before?", line_uz: "Ilgari o'qituvchi bo'lib ishlaganmisiz?", target: ["Did", "work", "teacher", "before"], mastery_key: "U06_L02_D01_0" },
                { speaker: "Ali", line: "Yes, I worked as a teacher for two years.", line_uz: "Ha, ikki yil o'qituvchi bo'lib ishladim.", target: ["worked", "teacher", "years"], mastery_key: "U06_L02_D01_1" },
                { speaker: "Manager", line: "That's good! Did you work as a manager too?", line_uz: "Yaxshi! Siz menejer ham bo'lib ishladingizmi?", target: ["Did", "work", "manager"], mastery_key: "U06_L02_D01_2" },
                { speaker: "Ali", line: "No, I didn't work as a manager.", line_uz: "Yo'q, menejer bo'lib ishlamadim.", target: ["didn't", "work", "manager"], mastery_key: "U06_L02_D01_3" },
                { speaker: "Manager", line: "Did you work as a cook?", line_uz: "Oshpaz bo'lib ishladingizmi?", target: ["Did", "work", "cook"], mastery_key: "U06_L02_D01_4" },
                { speaker: "Ali", line: "No, I didn't work as a cook. I don't like cooking.", line_uz: "Yo'q, oshpaz bo'lib ishlamadim. Pishirishni yoqtirmayman.", target: ["didn't", "work", "cook", "cooking"], mastery_key: "U06_L02_D01_5" },
                { speaker: "Manager", line: "Why didn't you work as a cook?", line_uz: "Nega oshpaz bo'lib ishlamadingiz?", target: ["Why", "didn't", "work", "cook"], mastery_key: "U06_L02_D01_6" },
                { speaker: "Ali", line: "I love teaching. That's my job.", line_uz: "Men o'qitishni yaxshi ko'raman. Bu mening ishim.", target: ["love", "teaching", "job"], mastery_key: "U06_L02_D01_7" },
                { speaker: "Manager", line: "Did your brother work as a nurse?", line_uz: "Akangiz hamshira bo'lib ishladimi?", target: ["Did", "work", "nurse"], mastery_key: "U06_L02_D01_8" },
                { speaker: "Ali", line: "Yes, he worked as a nurse last year.", line_uz: "Ha, u o'tgan yili hamshira bo'lib ishladi.", target: ["worked", "nurse", "year"], mastery_key: "U06_L02_D01_9" }
            ]
        },
        "U06_L03_D01": {
            id: "U06_L03_D01",
            title: "Explaining Why",
            lines: [
                { speaker: "Madina", line: "Hi Nilufar! Why didn't you come to school yesterday?", line_uz: "Salom Nilufar! Kecha nega maktabga kelmadingiz?", target: ["Why", "didn't", "come", "school"], mastery_key: "U06_L03_D01_0" },
                { speaker: "Nilufar", line: "I didn't come because I was sick.", line_uz: "Kelmadim chunki kasal edim.", target: ["didn't", "come", "because", "sick"], mastery_key: "U06_L03_D01_1" },
                { speaker: "Madina", line: "That's sad! Are you fine now?", line_uz: "Qayg'uli! Endi yaxshimisiz?", target: ["sad", "fine", "now"], mastery_key: "U06_L03_D01_2" },
                { speaker: "Nilufar", line: "Yes, I'm fine now. Did you play football yesterday?", line_uz: "Ha, endi yaxshiman. Kecha futbol o'ynadingizmi?", target: ["fine", "Did", "play"], mastery_key: "U06_L03_D01_3" },
                { speaker: "Madina", line: "No, I didn't play because I was tired.", line_uz: "Yo'q, o'ynamadim chunki charchagan edim.", target: ["didn't", "play", "because", "tired"], mastery_key: "U06_L03_D01_4" },
                { speaker: "Nilufar", line: "Did your sister come to school?", line_uz: "Singliz maktabga keldimi?", target: ["Did", "come", "school"], mastery_key: "U06_L03_D01_5" },
                { speaker: "Madina", line: "No, she didn't come. She was at home.", line_uz: "Yo'q, kelmadi. U uyda edi.", target: ["didn't", "come", "home"], mastery_key: "U06_L03_D01_6" },
                { speaker: "Nilufar", line: "Why didn't she come?", line_uz: "Nega kelmadi?", target: ["Why", "didn't", "come"], mastery_key: "U06_L03_D01_7" },
                { speaker: "Madina", line: "She didn't come because she was busy.", line_uz: "Kelmadi chunki band edi.", target: ["didn't", "come", "because", "busy"], mastery_key: "U06_L03_D01_8" },
                { speaker: "Nilufar", line: "I didn't study yesterday because I was sick.", line_uz: "Kecha dars o'qimadim chunki kasal edim.", target: ["didn't", "study", "because", "sick"], mastery_key: "U06_L03_D01_9" }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LESSONS
    // ═══════════════════════════════════════════════════════════════════════════
    lessons: {
        "U06_L01": {
            lesson_id: "U06_L01",
            title: "Past Negatives & Questions (didn't/Did + base verb)",
            flow_model: "sandwich",
            mastery_dialogue_id: "U06_L03_D01_1",
            items: [
                // ── CARD 1: didn't ──────────────────────────────────────
                {
                    id: "V_U06_L01_didnt",
                    en: "didn't",
                    uz: "qilmadi (did not = didn't)",
                    pos: "auxiliary",
                    type: "past_negative_auxiliary",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/didnt.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 1, speaker: "Sara", bubble_text: "No, I didn't go to the museum." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz kecha muzeyga bordingizmi?", audio: "/assets/audio/unit06/didnt.mp3", uz_mirror_answer: "Yo'q, men muzeyga bormadim.", hybrid_answer: "Yo'q, men **didn't go** muzeyga kecha.", en_canonical: "No, I didn't go to the museum.", syntax_scaffold: { en_structure: "I didn't go to the museum.", uz_gloss: "Men muzeyga bormadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "go", role: "base_verb", color: "green" }, { word: "to the museum", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Qaysi gap to'g'ri?", choices: [{ text: "I didn't went (XATO)", correct: false }, { text: "I didn't go (TO'G'RI)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "didn't", form_focus: "didnt_base_verb_rule", why_prompt: "Nega 'didn't go' — 'didn't went' emas?", explanation_uz: "'Didn't' o'zi o'tmishni ko'rsatadi. Shuning uchun ikkinchi fe'l BASE shaklda qoladi: didn't go, didn't play, didn't visit. XATO: didn't went, didn't played. Bu eng ko'p xato qilinadigan qoida!", mini_rule: "didn't + BASE verb (NEVER -ed or past form after didn't!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "No, I didn't go to the museum.", uz: "Yo'q, muzeyga bormadim.", is_anchor: true, anchor_sentence: "No, I didn't go to the museum.", source_dialogue: "U06_L01_D01", source_line: 1, speaker: "Sara" },
                            { en: "She didn't play football yesterday.", uz: "U kecha futbol o'ynamadi.", example_2: "t" },
                            { en: "We didn't visit the castle last week.", uz: "Biz o'tgan hafta qal'aga bormadik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't' ishlatib gap tuzing.", model_sentence: "I didn't go to the museum.", hints: ["I didn't ___ to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima QILMADINGIZ?", model_frame: "I didn't ___ yesterday.", flexibleCheck: true, tags: ["past", "negative"] }
                    ]
                },
                // ── CARD 2: Did ─────────────────────────────────────────
                {
                    id: "V_U06_L01_did",
                    en: "Did",
                    uz: "qildimi (o'tmish savol)",
                    pos: "auxiliary",
                    type: "past_question_auxiliary",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/did.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 0, speaker: "Bekzod", bubble_text: "Did you go to the museum yesterday?" },
                    slides: [
                        { phase: "presentation", uz_context: "Siz kecha muzeyga bormaganmisiz?", audio: "/assets/audio/unit06/did.mp3", uz_mirror_answer: "Savol: bordingizmi?", hybrid_answer: "**Did** you **go** to the museum yesterday?", en_canonical: "Did you go to the museum yesterday?", syntax_scaffold: { en_structure: "Did you go to the museum yesterday?", uz_gloss: "Kecha muzeyga bordingizmi?", tokens: [{ word: "Did", role: "question_auxiliary", color: "red" }, { word: "you", role: "subject", color: "blue" }, { word: "go", role: "base_verb", color: "green" }, { word: "to the museum", role: "destination", color: "purple" }, { word: "yesterday", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "Qaysi savol to'g'ri?", choices: [{ text: "Did you went? (XATO)", correct: false }, { text: "Did you go? (TO'G'RI)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "Did", form_focus: "did_base_verb_question", why_prompt: "Nega 'Did you go' — 'Did you went' emas?", explanation_uz: "'Did' o'zi o'tmishni ko'rsatadi. Shuning uchun fe'l BASE shaklda qoladi: Did you go? Did she play? Did they visit? XATO: Did you went? Did she played?", mini_rule: "Did + subject + BASE verb? (Never past form after Did!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you go to the museum yesterday?", uz: "Kecha muzeyga bordingizmi?", is_anchor: true, anchor_sentence: "Did you go to the museum yesterday?", source_dialogue: "U06_L01_D01", source_line: 0, speaker: "Bekzod" },
                            { en: "Did she play football with you?", uz: "U siz bilan futbol o'ynadimi?", example_2: "t" },
                            { en: "Did they visit the castle?", uz: "Ular qal'aga bordilarmi?", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did' bilan savol tuzing.", model_sentence: "Did you go to the museum?", hints: ["Did you ___ ?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan kecha haqida savol so'rang.", model_frame: "Did you ___ yesterday?", flexibleCheck: true, tags: ["past", "question"] }
                    ]
                },
                // ── CARD 3: Why ─────────────────────────────────────────
                {
                    id: "V_U06_L01_why",
                    en: "Why",
                    uz: "nega / nima uchun",
                    pos: "question_word",
                    type: "wh_question",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/why.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 2, speaker: "Bekzod", bubble_text: "Why didn't you go?" },
                    slides: [
                        { phase: "presentation", uz_context: "Siz sabab so'ramaganmisiz? Nega qilmaganini bilmoqchimisiz?", audio: "/assets/audio/unit06/why.mp3", uz_mirror_answer: "Ha, men sabab so'radim. Nega?", hybrid_answer: "**Why** didn't you go? Nega bormadingiz?", en_canonical: "Why didn't you go?", syntax_scaffold: { en_structure: "Why didn't you go?", uz_gloss: "Nega bormadingiz?", tokens: [{ word: "Why", role: "question_word", color: "red" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "you", role: "subject", color: "blue" }, { word: "go", role: "base_verb", color: "green" }] } },
                        { phase: "concept_check", question_uz: "'Why' qanday savol?", choices: [{ text: "Ha/Yo'q savol (Yes/No)", correct: false }, { text: "Sabab savol (Reason)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "Why", form_focus: "why_didnt_word_order", why_prompt: "'Why didn't you go?' — tartib qanday?", explanation_uz: "'Why' + didn't + subject + BASE verb: Why didn't you go? Why didn't she play? XATO: 'Why you didn't go?' — tartib noto'g'ri! Ingliz tilida savol so'z tartibida auxiliary oldin keladi.", mini_rule: "Why + didn't + subject + BASE verb? (NOT 'Why you didn't...')" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Why didn't you go?", uz: "Nega bormadingiz?", is_anchor: true, anchor_sentence: "Why didn't you go?", source_dialogue: "U06_L01_D01", source_line: 2, speaker: "Bekzod" },
                            { en: "Why didn't she play football?", uz: "U nega futbol o'ynamadi?", example_2: "t" },
                            { en: "Why didn't they visit the museum yesterday?", uz: "Ular kecha nega muzeyga bormadi?", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Why' bilan sabab savol tuzing.", model_sentence: "Why didn't you go?", hints: ["Why didn't you ___ ?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Biror kishi nimani qilmaganiga sabab so'rang.", model_frame: "Why didn't you ___ yesterday?", flexibleCheck: true, tags: ["past", "why", "question"] }
                    ]
                },
                // ── CARD 4: together ────────────────────────────────────
                {
                    id: "V_U06_L01_together",
                    en: "together",
                    uz: "birga",
                    pos: "adverb",
                    type: "manner_adverb",
                    priority: 2,
                    category: "social",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/together.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 9, speaker: "Sara", bubble_text: "We didn't go together." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz yolg'iz bordingizmi? Faqat o'zingiz bordingizmi?", audio: "/assets/audio/unit06/together.mp3", uz_mirror_answer: "Yo'q, men yolg'iz bormadim. Biz birga bordik!", hybrid_answer: "Yo'q, biz **together** bordik! Birga!", en_canonical: "No, we went together!", syntax_scaffold: { en_structure: "We didn't go together.", uz_gloss: "Biz birga bormadik.", tokens: [{ word: "We", role: "subject", color: "blue" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "go", role: "base_verb", color: "green" }, { word: "together", role: "manner_adverb", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'together' nima degani?", choices: [{ text: "Birga", correct: true }, { text: "Yolg'iz", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "together", form_focus: "together_position", why_prompt: "'Together' gap oxirida keladi!", explanation_uz: "'Together' odatda gap oxirida turadi: We went together. They studied together. 'Alone' = yolg'iz (qarama-qarshi). 'Together' = birga, birgalikda.", mini_rule: "together = birga (end of sentence); alone = yolg'iz (opposite)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "We didn't go together.", uz: "Biz birga bormadik.", is_anchor: true, anchor_sentence: "We didn't go together.", source_dialogue: "U06_L01_D01", source_line: 9, speaker: "Sara" },
                            { en: "They studied together yesterday.", uz: "Ular kecha birga o'qishdi.", example_2: "t" },
                            { en: "My sister and I walked to school together.", uz: "Men va singlim birga maktabga yurdik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'together' ishlatib gap tuzing.", model_sentence: "We played football together.", hints: ["We ___ together."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kim bilan birga nima qilasiz?", model_frame: "I ___ together with ___.", flexibleCheck: true, tags: ["social", "friendship"] }
                    ]
                },
                // ── CARD 5: castle ──────────────────────────────────────
                {
                    id: "V_U06_L01_castle",
                    en: "castle",
                    uz: "qal'a",
                    pos: "noun",
                    type: "place",
                    priority: 2,
                    category: "landmarks",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/castle.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 6, speaker: "Bekzod", bubble_text: "I didn't visit the castle last week." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz o'tgan hafta qayerga bordingiz?", audio: "/assets/audio/unit06/castle.mp3", uz_mirror_answer: "Men o'tgan hafta qal'aga bormadim.", hybrid_answer: "Men **castle**ga bormadim. Qal'aga!", en_canonical: "I didn't visit the castle last week.", syntax_scaffold: { en_structure: "I didn't visit the castle last week.", uz_gloss: "Men o'tgan hafta qal'aga bormadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "visit", role: "base_verb", color: "green" }, { word: "the castle", role: "object", color: "purple" }, { word: "last week", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'castle' nima?", choices: [{ text: "Qal'a (qadimiy bino)", correct: true }, { text: "Muzey", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "castle", form_focus: "silent_t", why_prompt: "'Castle' talaffuzida 't' jim!", explanation_uz: "'Castle' = /ˈkɑːsl/ — 't' talaffuz qilinmaydi! Bu jim harf (silent letter). Boshqa misol: 'listen' = /ˈlɪsn/ ('t' jim). Ingliz tilida ko'p jim harflar bor.", mini_rule: "castle = /ˈkɑːsl/ (silent 't'); also: listen = /ˈlɪsn/" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't visit the castle last week.", uz: "Men o'tgan hafta qal'aga bormadim.", is_anchor: true, anchor_sentence: "I didn't visit the castle last week.", source_dialogue: "U06_L01_D01", source_line: 6, speaker: "Bekzod" },
                            { en: "Did you see the old castle?", uz: "Eski qal'ani ko'rdingizmi?", example_2: "t" },
                            { en: "We visited a beautiful castle yesterday.", uz: "Biz kecha go'zal qal'aga bordik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'castle' ishlatib gap tuzing.", model_sentence: "I visited the castle yesterday.", hints: ["I ___ the castle ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qal'aga borganmisiz? Qanday edi?", model_frame: "I ___ the castle and it was ___.", flexibleCheck: true, tags: ["past", "landmarks"] }
                    ]
                },
                // ── CARD 6: sad ─────────────────────────────────────────
                {
                    id: "V_U06_L01_sad",
                    en: "sad",
                    uz: "qayg'uli / xafa",
                    pos: "adjective",
                    type: "emotion",
                    priority: 2,
                    category: "feelings",
                    introduced_in: "U06_L01",
                    image: "/assets/images/unit06/sad.jpg",
                    dialogue_ref: { dialogue_id: "U06_L01_D01", line_index: 9, speaker: "Sara", bubble_text: "That's sad." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz xursand edingizmi? Baxtli edingizmi?", audio: "/assets/audio/unit06/sad.mp3", uz_mirror_answer: "Yo'q, men xursand emas edim. Men xafa edim.", hybrid_answer: "Yo'q, men **sad** edim. Xafa edim.", en_canonical: "No, I was sad.", syntax_scaffold: { en_structure: "That's sad.", uz_gloss: "Bu qayg'uli.", tokens: [{ word: "That's", role: "subject_contraction", color: "blue" }, { word: "sad", role: "adjective", color: "red" }] } },
                        { phase: "concept_check", question_uz: "'sad' ning aksi nima?", choices: [{ text: "happy", correct: true }, { text: "tired", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "sad", form_focus: "emotion_adjective_pair", why_prompt: "'sad ↔ happy' — qarama-qarshi his-tuyg'ular.", explanation_uz: "His-tuyg'u sifatlari juftlik qiladi: sad ↔ happy, tired ↔ energetic, nervous ↔ calm, excited ↔ bored. O'tmishda: 'I was sad' / 'She was happy'.", mini_rule: "sad ↔ happy; tired ↔ energetic; nervous ↔ calm" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "That's sad.", uz: "Bu qayg'uli.", is_anchor: true, anchor_sentence: "That's sad.", source_dialogue: "U06_L01_D01", source_line: 9, speaker: "Sara" },
                            { en: "She was sad because she didn't play.", uz: "U xafa edi chunki o'ynamadi.", example_2: "t" },
                            { en: "We were sad when our teacher was sick.", uz: "O'qituvchimiz kasal bo'lganda biz xafa edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'sad' ishlatib gap tuzing.", model_sentence: "I was sad yesterday.", hints: ["I was sad because ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qachon xafa bo'lgansiz? Nega?", model_frame: "I was sad because ___.", flexibleCheck: true, tags: ["past", "emotion"] }
                    ]
                }
            ]
        },

        "U06_L02": {
            lesson_id: "U06_L02",
            title: "Past Jobs & Professions",
            flow_model: "sandwich",
            mastery_dialogue_id: "U06_L03_D01_1",
            items: [
                // ── CARD 7: teacher ─────────────────────────────────────
                {
                    id: "V_U06_L02_teacher",
                    en: "teacher",
                    uz: "o'qituvchi",
                    pos: "noun",
                    type: "profession",
                    priority: 1,
                    category: "jobs",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/teacher.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 1, speaker: "Ali", bubble_text: "Yes, I worked as a teacher for two years." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz talaba edingizmi? Faqat o'qidingizmi?", audio: "/assets/audio/unit06/teacher.mp3", uz_mirror_answer: "Yo'q, men talaba emas edim. Men o'qituvchi edim!", hybrid_answer: "Yo'q, men **teacher** edim. O'qituvchi bo'lib ishladim!", en_canonical: "No, I worked as a teacher.", syntax_scaffold: { en_structure: "I worked as a teacher for two years.", uz_gloss: "Men ikki yil o'qituvchi bo'lib ishladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "worked", role: "past_verb", color: "green" }, { word: "as a teacher", role: "job_role", color: "purple" }, { word: "for two years", role: "duration", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'Teacher' nima qiladi?", choices: [{ text: "O'qitadi", correct: true }, { text: "Davolaydi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "worked as a", form_focus: "work_as_a_job", why_prompt: "'Worked AS A teacher' — nega 'as a'?", explanation_uz: "'Work as a' = kasb sifatida ishlash. 'As' = sifatida. 'A' = bitta. 'I worked as a teacher' = Men o'qituvchi sifatida ishladim. Barcha kasblar uchun: 'as a nurse', 'as a cook'.", mini_rule: "worked as a + JOB (teacher/nurse/cook/manager)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Yes, I worked as a teacher for two years.", uz: "Ha, ikki yil o'qituvchi bo'lib ishladim.", is_anchor: true, anchor_sentence: "Yes, I worked as a teacher for two years.", source_dialogue: "U06_L02_D01", source_line: 1, speaker: "Ali" },
                            { en: "She worked as a teacher last year.", uz: "U o'tgan yili o'qituvchi bo'lib ishladi.", example_2: "t" },
                            { en: "My mother worked as a teacher because she loves children.", uz: "Mening onam o'qituvchi bo'lib ishladi chunki u bolalarni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'teacher' ishlatib gap tuzing.", model_sentence: "I worked as a teacher.", hints: ["I worked as a ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oilangizdagi kimdir o'qituvchimi?", model_frame: "My ___ works as a teacher at ___.", flexibleCheck: true, tags: ["job", "family"] }
                    ]
                },
                // ── CARD 8: manager ─────────────────────────────────────
                {
                    id: "V_U06_L02_manager",
                    en: "manager",
                    uz: "menejer / boshqaruvchi",
                    pos: "noun",
                    type: "profession",
                    priority: 2,
                    category: "jobs",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/manager.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 3, speaker: "Ali", bubble_text: "No, I didn't work as a manager." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz menejer bo'lib ishlagansiz shekilli?", audio: "/assets/audio/unit06/manager.mp3", uz_mirror_answer: "Yo'q, men menejer bo'lib ishlamadim.", hybrid_answer: "Yo'q, men **manager** bo'lib **didn't work**.", en_canonical: "No, I didn't work as a manager.", syntax_scaffold: { en_structure: "I didn't work as a manager.", uz_gloss: "Men menejer bo'lib ishlamadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't work", role: "negative_past", color: "red" }, { word: "as a manager", role: "job_role", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Manager' nima qiladi?", choices: [{ text: "Boshqaradi (manages)", correct: true }, { text: "O'qitadi (teaches)", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "manage", form_focus: "manage_manager", why_prompt: "'Manage' → 'manager' — '-er' qo'shish.", explanation_uz: "Fe'lga '-er' qo'shsak, odam ma'nosini beradi: teach → teacher, work → worker, manage → manager, play → player. Bu productiv suffiks.", mini_rule: "verb + -er = person (teach→teacher, manage→manager, play→player)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "No, I didn't work as a manager.", uz: "Yo'q, menejer bo'lib ishlamadim.", is_anchor: true, anchor_sentence: "No, I didn't work as a manager.", source_dialogue: "U06_L02_D01", source_line: 3, speaker: "Ali" },
                            { en: "He worked as a manager for five years.", uz: "U besh yil menejer bo'lib ishladi.", example_2: "t" },
                            { en: "Did she work as a manager? — Yes, she did.", uz: "U menejer bo'lib ishladimi? — Ha, ishladi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'manager' ishlatib gap tuzing.", model_sentence: "He works as a manager.", hints: ["___ works as a manager."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kim boshqaruvchi bo'lishni xohlaydi?", model_frame: "I want to work as a ___.", flexibleCheck: true, tags: ["job", "ambition"] }
                    ]
                },
                // ── CARD 9: cook (noun) ─────────────────────────────────
                {
                    id: "V_U06_L02_cook",
                    en: "cook",
                    uz: "oshpaz",
                    pos: "noun",
                    type: "profession",
                    priority: 2,
                    category: "jobs",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/cook.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 5, speaker: "Ali", bubble_text: "No, I didn't work as a cook." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz oshpaz bo'lib ishlamaganmisiz?", audio: "/assets/audio/unit06/cook.mp3", uz_mirror_answer: "Yo'q, men oshpaz bo'lib ishlamadim.", hybrid_answer: "Yo'q, men **cook** bo'lib **didn't work**.", en_canonical: "No, I didn't work as a cook.", syntax_scaffold: { en_structure: "I didn't work as a cook. I don't like cooking.", uz_gloss: "Men oshpaz bo'lib ishlamadim. Pishirishni yoqtirmayman.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't work", role: "negative_past", color: "red" }, { word: "as a cook", role: "job_role", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Cook' — ism ham, fe'l ham!", choices: [{ text: "To'g'ri: cook (oshpaz/pishirmoq)", correct: true }, { text: "Noto'g'ri: faqat ism", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "cook / cooking", form_focus: "cook_verb_noun_gerund", why_prompt: "'Cook' = oshpaz, 'cooking' = pishirish — qanday farq?", explanation_uz: "'Cook' ism (oshpaz: He's a cook) VA fe'l (pishirmoq: I cook food). 'Cooking' = gerund (pishirish): 'I like cooking.' = Men pishirishni yoqtiraman. Farq: cook (kishi/harakat) vs cooking (jarayon).", mini_rule: "cook = noun (chef) or verb (to prepare); cooking = gerund (the activity)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "No, I didn't work as a cook. I don't like cooking.", uz: "Yo'q, oshpaz bo'lib ishlamadim. Pishirishni yoqtirmayman.", is_anchor: true, anchor_sentence: "No, I didn't work as a cook.", source_dialogue: "U06_L02_D01", source_line: 5, speaker: "Ali" },
                            { en: "She worked as a cook in a restaurant.", uz: "U restoranda oshpaz bo'lib ishladi.", example_2: "t" },
                            { en: "My father is a cook because he loves cooking.", uz: "Mening otam oshpaz chunki u pishirishni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'cook' ishlatib gap tuzing.", model_sentence: "He worked as a cook.", hints: ["___ worked as a cook."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oilangizda kim yaxshi pishiradi?", model_frame: "My ___ is a good cook because ___.", flexibleCheck: true, tags: ["job", "food"] }
                    ]
                },
                // ── CARD 10: nurse ──────────────────────────────────────
                {
                    id: "V_U06_L02_nurse",
                    en: "nurse",
                    uz: "hamshira",
                    pos: "noun",
                    type: "profession",
                    priority: 2,
                    category: "jobs",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/nurse.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 9, speaker: "Ali", bubble_text: "Yes, he worked as a nurse last year." },
                    slides: [
                        { phase: "presentation", uz_context: "Akangiz shifokor bo'lib ishladimi?", audio: "/assets/audio/unit06/nurse.mp3", uz_mirror_answer: "Yo'q, akam shifokor emas, hamshira bo'lib ishladi.", hybrid_answer: "Yo'q, u **nurse** bo'lib ishladi. Hamshira!", en_canonical: "He worked as a nurse last year.", syntax_scaffold: { en_structure: "He worked as a nurse last year.", uz_gloss: "U o'tgan yili hamshira bo'lib ishladi.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "worked", role: "past_verb", color: "green" }, { word: "as a nurse", role: "job_role", color: "purple" }, { word: "last year", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'Nurse' qayerda ishlaydi?", choices: [{ text: "Kasalxonada (Hospital)", correct: true }, { text: "Maktabda (School)", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "nurse", form_focus: "nurse_vs_doctor", why_prompt: "'Nurse' va 'doctor' farqi?", explanation_uz: "'Nurse' = hamshira (bemordarga g'amxo'rlik, dori berish). 'Doctor' = shifokor (kasal tashxis qo'yish, retsept yozish). Ikkalasi ham kasalxonada ishlaydi. 'Nurse' erkak ham bo'lishi mumkin!", mini_rule: "nurse = hamshira (care); doctor = shifokor (diagnose/treat)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Yes, he worked as a nurse last year.", uz: "Ha, u o'tgan yili hamshira bo'lib ishladi.", is_anchor: true, anchor_sentence: "Yes, he worked as a nurse last year.", source_dialogue: "U06_L02_D01", source_line: 9, speaker: "Ali" },
                            { en: "She worked as a nurse for ten years.", uz: "U o'n yil hamshira bo'lib ishladi.", example_2: "t" },
                            { en: "Did you work as a nurse? — Yes, I did.", uz: "Hamshira bo'lib ishladingizmi? — Ha, ishladim.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'nurse' ishlatib gap tuzing.", model_sentence: "She worked as a nurse.", hints: ["___ worked as a nurse."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kimni bilasiz hamshira bo'lib ishlaydigan?", model_frame: "My ___ works as a nurse at ___.", flexibleCheck: true, tags: ["job", "health"] }
                    ]
                },
                // ── CARD 11: before ─────────────────────────────────────
                {
                    id: "V_U06_L02_before",
                    en: "before",
                    uz: "oldin / ilgari",
                    pos: "adverb",
                    type: "time_word",
                    priority: 2,
                    category: "time",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/before.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 0, speaker: "Manager", bubble_text: "Did you work as a teacher before?" },
                    slides: [
                        { phase: "presentation", uz_context: "Siz hozir ishlamayrapsizmi? Avval-chi?", audio: "/assets/audio/unit06/before.mp3", uz_mirror_answer: "Ha, men ilgari ishladim.", hybrid_answer: "Ha, men **before** ishladim. Ilgari!", en_canonical: "Yes, I worked before.", syntax_scaffold: { en_structure: "Did you work as a teacher before?", uz_gloss: "Ilgari o'qituvchi bo'lib ishlaganmisiz?", tokens: [{ word: "Did", role: "question_auxiliary", color: "red" }, { word: "you", role: "subject", color: "blue" }, { word: "work", role: "base_verb", color: "green" }, { word: "as a teacher", role: "job_role", color: "purple" }, { word: "before", role: "time_adverb", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'before' nima degani?", choices: [{ text: "Oldin / Ilgari", correct: true }, { text: "Keyin / Keyinroq", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "before", form_focus: "before_vs_after", why_prompt: "'Before' va 'after' — qarama-qarshi vaqt so'zlari.", explanation_uz: "'Before' = oldin, avval, ilgari. 'After' = keyin, so'ng. 'Before school' = maktabdan oldin. 'After school' = maktabdan keyin. Gap oxirida ham keladi: 'I worked there before.' = Men u yerda ilgari ishladim.", mini_rule: "before = oldin ↔ after = keyin (opposite pair)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you work as a teacher before?", uz: "Ilgari o'qituvchi bo'lib ishlaganmisiz?", is_anchor: true, anchor_sentence: "Did you work as a teacher before?", source_dialogue: "U06_L02_D01", source_line: 0, speaker: "Manager" },
                            { en: "I visited the museum before.", uz: "Men ilgari muzeyga borgan edim.", example_2: "t" },
                            { en: "She studied English before.", uz: "U ilgari ingliz tili o'qigan.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'before' ishlatib gap tuzing.", model_sentence: "I worked there before.", hints: ["I ___ before."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Ilgari nima qilgansiz?", model_frame: "I ___ before.", flexibleCheck: true, tags: ["past", "time"] }
                    ]
                },
                // ── CARD 12: job ────────────────────────────────────────
                {
                    id: "V_U06_L02_job",
                    en: "job",
                    uz: "ish / kasb",
                    pos: "noun",
                    type: "concept",
                    priority: 2,
                    category: "work",
                    introduced_in: "U06_L02",
                    image: "/assets/images/unit06/job.jpg",
                    dialogue_ref: { dialogue_id: "U06_L02_D01", line_index: 7, speaker: "Ali", bubble_text: "That's my job." },
                    slides: [
                        { phase: "presentation", uz_context: "Bu sizning hobbingizmi? Faqat sevimli mashg'ulotingizmi?", audio: "/assets/audio/unit06/job.mp3", uz_mirror_answer: "Yo'q, bu mening hobbim emas. Bu mening ishim!", hybrid_answer: "Yo'q, bu mening **job**. Ishim!", en_canonical: "No, that's my job!", syntax_scaffold: { en_structure: "That's my job.", uz_gloss: "Bu mening ishim.", tokens: [{ word: "That's", role: "subject_contraction", color: "blue" }, { word: "my", role: "possessive", color: "blue" }, { word: "job", role: "noun", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Job' nima degani?", choices: [{ text: "Ish / Kasb", correct: true }, { text: "O'yin", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "job", form_focus: "job_vs_work", why_prompt: "'Job' va 'work' farqi?", explanation_uz: "'Job' = sanaladigan ish (a job, two jobs). 'Work' = sanalmaydigan ish (work, no 'a'). 'I have a job' but 'I have work to do'. 'Job' = aniq kasb; 'Work' = umuman ishlash.", mini_rule: "job = countable (a job, jobs); work = uncountable (work, no 'a')" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "That's my job.", uz: "Bu mening ishim.", is_anchor: true, anchor_sentence: "That's my job.", source_dialogue: "U06_L02_D01", source_line: 7, speaker: "Ali" },
                            { en: "He loves his job as a teacher.", uz: "U o'qituvchilik kasbini yaxshi ko'radi.", example_2: "t" },
                            { en: "What is your job? — I'm a student!", uz: "Sizning kasbingiz nima? — Men talabaman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'job' ishlatib gap tuzing.", model_sentence: "Teaching is my job.", hints: ["___ is my job."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kelajakda qanday ish qilmoqchisiz?", model_frame: "I want a job as a ___.", flexibleCheck: true, tags: ["job", "future"] }
                    ]
                }
            ]
        },

        "U06_L03": {
            lesson_id: "U06_L03",
            title: "Reasons with 'because'",
            flow_model: "sandwich",
            mastery_dialogue_id: "U06_L03_D01_1",
            items: [
                // ── CARD 13: because ────────────────────────────────────
                {
                    id: "V_U06_L03_because",
                    en: "because",
                    uz: "chunki / sababi",
                    pos: "conjunction",
                    type: "reason_conjunction",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U06_L03",
                    image: "/assets/images/unit06/because.jpg",
                    dialogue_ref: { dialogue_id: "U06_L03_D01", line_index: 1, speaker: "Nilufar", bubble_text: "I didn't come because I was sick." },
                    slides: [
                        { phase: "presentation", uz_context: "Nima uchun kelmadingiz? Sabab bormi?", audio: "/assets/audio/unit06/because.mp3", uz_mirror_answer: "Ha, sabab bor. Men kelmadim chunki kasal edim.", hybrid_answer: "Men kelmadim **because** kasal edim. Chunki!", en_canonical: "I didn't come because I was sick.", syntax_scaffold: { en_structure: "I didn't come because I was sick.", uz_gloss: "Kelmadim chunki kasal edim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't come", role: "negative_past", color: "red" }, { word: "because", role: "conjunction", color: "orange" }, { word: "I was sick", role: "reason_clause", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Because' nima uchun ishlatiladi?", choices: [{ text: "Sabab bildiradi (Reason)", correct: true }, { text: "Vaqt bildiradi (Time)", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "because", form_focus: "because_clause_structure", why_prompt: "'Because' dan keyin to'liq gap keladi!", explanation_uz: "'Because' + SUBJECT + VERB: 'because I was sick' (chunki men kasal edim). 'Because' dan keyin to'liq gap (subject + verb) kerak. XATO: 'because sick' (subject va verb yo'q!).", mini_rule: "because + FULL CLAUSE (subject + verb): because I was sick" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't come because I was sick.", uz: "Kelmadim chunki kasal edim.", is_anchor: true, anchor_sentence: "I didn't come because I was sick.", source_dialogue: "U06_L03_D01", source_line: 1, speaker: "Nilufar" },
                            { en: "She didn't play because she was tired.", uz: "U o'ynamadi chunki charchagan edi.", example_2: "t" },
                            { en: "They didn't visit the museum because they were busy.", uz: "Ular muzeyga bormadi chunki band edilar.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'because' ishlatib gap tuzing.", model_sentence: "I didn't come because I was tired.", hints: ["I didn't ___ because I was ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nega nimadir qilmadingiz? Sabab ayting.", model_frame: "I didn't ___ because ___.", flexibleCheck: true, tags: ["past", "reason"] }
                    ]
                },
                // ── CARD 14: sick ───────────────────────────────────────
                {
                    id: "V_U06_L03_sick",
                    en: "sick",
                    uz: "kasal",
                    pos: "adjective",
                    type: "health_state",
                    priority: 1,
                    category: "health",
                    introduced_in: "U06_L03",
                    image: "/assets/images/unit06/sick.jpg",
                    dialogue_ref: { dialogue_id: "U06_L03_D01", line_index: 1, speaker: "Nilufar", bubble_text: "I was sick." },
                    slides: [
                        { phase: "presentation", uz_context: "Siz sog'lom edingizmi? Yaxshi edingizmi?", audio: "/assets/audio/unit06/sick.mp3", uz_mirror_answer: "Yo'q, men yaxshi emas edim. Men kasal edim.", hybrid_answer: "Yo'q, men **sick** edim. Kasal edim.", en_canonical: "No, I was sick.", syntax_scaffold: { en_structure: "I was sick yesterday.", uz_gloss: "Men kecha kasal edim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "was", role: "past_be", color: "green" }, { word: "sick", role: "adjective", color: "red" }, { word: "yesterday", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'sick' nima degani?", choices: [{ text: "Kasal", correct: true }, { text: "Sog'lom", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "sick", form_focus: "sick_ill_unwell", why_prompt: "'Sick', 'ill', 'unwell' — barchasi kasal!", explanation_uz: "'Sick' = kasal (eng ko'p ishlatiladi, ayniqsa AQShda). 'Ill' = kasal (rasmiyroq, Britaniyada). 'Unwell' = kasal (eng rasmiy). Barchasi bir xil ma'no. 'Sick' ↔ 'healthy/well' (qarama-qarshi).", mini_rule: "sick = ill = unwell (all mean kasal); opposite: healthy/well" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't come because I was sick.", uz: "Kelmadim chunki kasal edim.", is_anchor: true, anchor_sentence: "I didn't come because I was sick.", source_dialogue: "U06_L03_D01", source_line: 1, speaker: "Nilufar" },
                            { en: "She was sick last week.", uz: "U o'tgan hafta kasal edi.", example_2: "t" },
                            { en: "Were you sick yesterday? — Yes, I was.", uz: "Kecha kasal edingizmi? — Ha, edim.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'sick' ishlatib gap tuzing.", model_sentence: "I was sick yesterday.", hints: ["I was sick ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oxirgi marotaba qachon kasal bo'lgansiz?", model_frame: "I was sick last ___.", flexibleCheck: true, tags: ["past", "health"] }
                    ]
                },
                // ── CARD 15: come ───────────────────────────────────────
                {
                    id: "V_U06_L03_come",
                    en: "come",
                    uz: "kelmoq",
                    pos: "verb",
                    type: "movement_verb",
                    priority: 1,
                    category: "movement",
                    introduced_in: "U06_L03",
                    image: "/assets/images/unit06/come.jpg",
                    dialogue_ref: { dialogue_id: "U06_L03_D01", line_index: 0, speaker: "Madina", bubble_text: "Why didn't you come to school?" },
                    slides: [
                        { phase: "presentation", uz_context: "Siz kecha maktabga keldingizmi?", audio: "/assets/audio/unit06/come.mp3", uz_mirror_answer: "Yo'q, men maktabga kelmadim.", hybrid_answer: "Yo'q, men kecha maktabga **didn't come**.", en_canonical: "I didn't come to school yesterday.", syntax_scaffold: { en_structure: "Why didn't you come to school yesterday?", uz_gloss: "Kecha nega maktabga kelmadingiz?", tokens: [{ word: "Why", role: "question_word", color: "red" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "you", role: "subject", color: "blue" }, { word: "come", role: "base_verb", color: "green" }, { word: "to school", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Qaysi gap to'g'ri?", choices: [{ text: "I didn't came (XATO)", correct: false }, { text: "I didn't come (TO'G'RI)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "come", form_focus: "come_vs_go", why_prompt: "'Come' va 'go' farqi?", explanation_uz: "'Come' = kelmoq (gapiruvchi tomonga harakat). 'Go' = bormoq (gapiruvchidan uzoqqa). 'Come to school' = maktabga kel. 'Go to school' = maktabga bor. O'tmishi: came (irregular!), went.", mini_rule: "come = toward speaker (kel); go = away from speaker (bor)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Why didn't you come to school yesterday?", uz: "Kecha nega maktabga kelmadingiz?", is_anchor: true, anchor_sentence: "Why didn't you come to school yesterday?", source_dialogue: "U06_L03_D01", source_line: 0, speaker: "Madina" },
                            { en: "She didn't come because she was busy.", uz: "U kelmadi chunki band edi.", example_2: "t" },
                            { en: "Did they come to the party? — No, they didn't.", uz: "Ular bazmga keldilarmi? — Yo'q, kelishmadi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'come' ishlatib gap tuzing.", model_sentence: "I didn't come to school yesterday.", hints: ["I didn't come to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kim kecha maktabga kelmadi? Nega?", model_frame: "___ didn't come because ___.", flexibleCheck: true, tags: ["past", "movement"] }
                    ]
                },
                // ── CARD 16: busy ───────────────────────────────────────
                {
                    id: "V_U06_L03_busy",
                    en: "busy",
                    uz: "band",
                    pos: "adjective",
                    type: "state_adjective",
                    priority: 2,
                    category: "state",
                    introduced_in: "U06_L03",
                    image: "/assets/images/unit06/busy.jpg",
                    dialogue_ref: { dialogue_id: "U06_L03_D01", line_index: 8, speaker: "Madina", bubble_text: "She didn't come because she was busy." },
                    slides: [
                        { phase: "presentation", uz_context: "Singliz bo'sh edimi kecha? Dam oldimi?", audio: "/assets/audio/unit06/busy.mp3", uz_mirror_answer: "Yo'q, u bo'sh emas edi. U band edi.", hybrid_answer: "Yo'q, u **busy** edi. Band!", en_canonical: "She was busy.", syntax_scaffold: { en_structure: "She didn't come because she was busy.", uz_gloss: "U kelmadi chunki band edi.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "didn't come", role: "negative_past", color: "red" }, { word: "because", role: "conjunction", color: "orange" }, { word: "she was busy", role: "reason_clause", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'busy' ning aksi nima?", choices: [{ text: "free / bo'sh", correct: true }, { text: "tired / charchagan", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "busy", form_focus: "busy_with_because", why_prompt: "'Because' bilan holat jumlalar.", explanation_uz: "'Because' bilan SABAB aytamiz. Eng ko'p ishlatiladigan sabablar: 'because I was tired' (charchagan), 'because I was sick' (kasal), 'because I was busy' (band). Sabablar 'was/were' + sifat.", mini_rule: "Common reasons: because I was tired/sick/busy/happy/sad" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "She didn't come because she was busy.", uz: "U kelmadi chunki band edi.", is_anchor: true, anchor_sentence: "She didn't come because she was busy.", source_dialogue: "U06_L03_D01", source_line: 8, speaker: "Madina" },
                            { en: "I was busy yesterday. I worked all day.", uz: "Men kecha band edim. Kun bo'yi ishladim.", example_2: "t" },
                            { en: "Were you busy last week? — Yes, I was very busy.", uz: "O'tgan hafta band edingizmi? — Ha, juda band edim.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'busy' ishlatib gap tuzing.", model_sentence: "I was busy yesterday.", hints: ["I was busy because ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qachon juda band bo'lgansiz?", model_frame: "I was very busy last ___ because ___.", flexibleCheck: true, tags: ["past", "state"] }
                    ]
                }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER METHODS (Renderer API — REQUIRED)
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
                if (item.id === cardId) return item;
            }
        }
        return null;
    }
};

if (Object.freeze) {
    Object.freeze(window.VOCAB_CARDS_U06);
}
