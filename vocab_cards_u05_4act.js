/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 05: Past Actions (Regular Verbs) (4 Lessons, 4+2 Act)
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

window.VOCAB_CARDS_U05 = {
    unit_id: "U05",
    unit_title: "Past Actions (Regular Verbs)",
    scalability_level: "A1",
    grammar_focus: "Past Simple (Regular Verbs) — add -ed; did/didn't + base verb",

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
            }
        },
        ratio_target: { min: 0.60, max: 0.75 }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MISSION METADATA (3×2 Successive Mastery Cycle)
    // ═══════════════════════════════════════════════════════════════════════════
    mission: {
        mission_id: "U05_M01",
        flow_model: "sandwich",
        target_vocab: ["played", "watched", "visited", "worked", "walked", "studied", "cleaned", "listened", "Did you", "didn't", "Yes I did", "No I didn't", "talked", "finished", "helped", "cooked", "prepared", "started", "stopped", "stayed", "arrived", "washed", "picked", "watered", "harvested", "climbed", "crossed", "opened", "received", "painted", "recorded"],
        stages: [
            {
                stage: 1,
                form: "affirmative",
                target_vocab: ["played", "watched", "visited", "worked", "walked", "studied", "cleaned", "listened"],
                dialogue_id: "U05_L01_D01",
                pressure_id: "U05_L01_D01_1",
                mirror_mode: true
            },
            {
                stage: 2,
                form: "negative",
                target_vocab: ["Did you", "didn't", "Yes I did", "No I didn't", "talked", "finished", "helped", "cooked", "prepared"],
                dialogue_id: "U05_L02_D01",
                pressure_id: "U05_L02_D01_1",
                mirror_mode: true
            },
            {
                stage: 3,
                form: "interrogative",
                target_vocab: ["started", "stopped", "stayed", "arrived", "washed", "picked", "watered", "harvested"],
                dialogue_id: "U05_L03_D01",
                pressure_id: "U05_L03_D01_1",
                mirror_mode: false
            }
        ],
        mastery_dialogue_id: "U05_L03_D01_1"
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
    // ═══════════════════════════════════════════════════════════════════════════
    contrastive_turns: [
        {
            stage: 1,
            focus: "present_vs_past_ed",
            dialogue_id: "U05_L01_D01",
            speaker_a: { text: "I play football every day.", speaker: "Kamola" },
            speaker_b: { text: "I played football on Saturday.", speaker: "Rashid" },
            highlights: [
                {
                    blue: { text: "play", type: "present_base_verb" },
                    red: { text: "played", marker: "ed", type: "past_regular_ed" }
                }
            ]
        },
        {
            stage: 2,
            focus: "affirmative_ed_vs_negative_base",
            dialogue_id: "U05_L02_D01",
            speaker_a: { text: "I watched TV yesterday.", speaker: "Anvar" },
            speaker_b: { text: "I didn't watch TV yesterday.", speaker: "Zarina" },
            highlights: [
                {
                    blue: { text: "watched", type: "past_affirmative_ed" },
                    red: { text: "didn't watch", type: "negative_base_verb" }
                }
            ]
        },
        {
            stage: 3,
            focus: "statement_vs_question_inversion",
            dialogue_id: "U05_L03_D01",
            speaker_a: { text: "You visited the museum.", speaker: "Sardor" },
            speaker_b: { text: "Did you visit the museum?", speaker: "Nigora" },
            highlights: [
                {
                    blue: { text: "visited", type: "statement_past_ed" },
                    red: { text: "Did you visit", type: "question_did_base" }
                }
            ]
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // DIALOGUES (Constraint 1, 2, 3, 4)
    // ═══════════════════════════════════════════════════════════════════════════
    dialogues: {
        "U05_L01_D01": {
            id: "U05_L01_D01",
            title: "Weekend Activities",
            lines: [
                { speaker: "Kamola", line: "Hi Rashid! What did you do on the weekend?", line_uz: "Salom Rashid! Hafta oxiri nima qilding?", target: ["What", "did", "do"], mastery_key: "U05_L01_D01_0" },
                { speaker: "Rashid", line: "Hi Kamola! I played football on Saturday. How about you?", line_uz: "Salom Kamola! Men shanba kuni futbol o'ynadim. Sen-chi?", target: ["played", "football"], mastery_key: "U05_L01_D01_1" },
                { speaker: "Kamola", line: "I rested at home and watched TV.", line_uz: "Men uyda dam oldim va televizor ko'rdim.", target: ["watched", "TV"], mastery_key: "U05_L01_D01_2" },
                { speaker: "Rashid", line: "Good! What did you do on Sunday?", line_uz: "Yaxshi! Yakshanba kuni nima qilding?", target: ["did", "Sunday"], mastery_key: "U05_L01_D01_3" },
                { speaker: "Kamola", line: "I visited my friends. We went to the museum.", line_uz: "Men do'stlarimni ziyorat qildim. Biz muzeyga bordik.", target: ["visited", "friends"], mastery_key: "U05_L01_D01_4" },
                { speaker: "Rashid", line: "Wonderful! Was the museum interesting?", line_uz: "Ajoyib! Muzey qiziqarli edimi?", target: ["Was", "interesting"], mastery_key: "U05_L01_D01_5" },
                { speaker: "Kamola", line: "Yes, it was very interesting! We saw many things.", line_uz: "Ha, juda qiziqarli edi! Biz ko'p narsalarni ko'rdik.", target: ["very", "interesting"], mastery_key: "U05_L01_D01_6" },
                { speaker: "Rashid", line: "I will go to the museum next week too!", line_uz: "Men ham keyingi hafta muzeyga boraman!", target: ["next week", "too"], mastery_key: "U05_L01_D01_7" }
            ]
        },
        "U05_L02_D01": {
            id: "U05_L02_D01",
            title: "Talking About Yesterday",
            lines: [
                { speaker: "Anvar", line: "Hi Zarina! Did you come to school yesterday?", line_uz: "Salom Zarina! Kecha maktabga keldingmi?", target: ["Did you", "come", "yesterday"], mastery_key: "U05_L02_D01_0" },
                { speaker: "Zarina", line: "No, I didn't come to school. I was at home.", line_uz: "Yo'q, men maktabga kelmadim. Men uyda edim.", target: ["didn't", "come"], mastery_key: "U05_L02_D01_1" },
                { speaker: "Anvar", line: "Why? Were you sick?", line_uz: "Nima uchun? Kasal edingmi?", target: ["Why", "sick"], mastery_key: "U05_L02_D01_2" },
                { speaker: "Zarina", line: "No, I wasn't sick. I was just tired.", line_uz: "Yo'q, men kasal emas edim. Faqat charchagan edim.", target: ["wasn't", "just", "tired"], mastery_key: "U05_L02_D01_3" },
                { speaker: "Anvar", line: "I understand. What did you do at home?", line_uz: "Tushundim. Uyda nima qilding?", target: ["What", "did", "do"], mastery_key: "U05_L02_D01_4" },
                { speaker: "Zarina", line: "I read a book and listened to music. What did you do?", line_uz: "Men kitob o'qidim va musiqa tingladim. Sen nima qilding?", target: ["listened", "music"], mastery_key: "U05_L02_D01_5" },
                { speaker: "Anvar", line: "I went to school and studied math.", line_uz: "Men maktabga bordim va matematika o'qidim.", target: ["studied", "math"], mastery_key: "U05_L02_D01_6" },
                { speaker: "Zarina", line: "Good! Now I'm at school too!", line_uz: "Yaxshi! Endi men ham maktabdaman!", target: ["Now", "too"], mastery_key: "U05_L02_D01_7" }
            ]
        },
        "U05_L03_D01": {
            id: "U05_L03_D01",
            title: "Last Week Story",
            lines: [
                { speaker: "Sardor", line: "Hi Nigora! What did you do last week?", line_uz: "Salom Nigora! O'tgan hafta nima qilding?", target: ["What", "did", "last week"], mastery_key: "U05_L03_D01_0" },
                { speaker: "Nigora", line: "Hi Sardor! I did many things!", line_uz: "Salom Sardor! Men juda ko'p narsalar qildim!", target: ["did", "many", "things"], mastery_key: "U05_L03_D01_1" },
                { speaker: "Sardor", line: "Tell me! I want to hear.", line_uz: "Menga aytib ber! Men eshitmoqchiman.", target: ["Tell", "hear"], mastery_key: "U05_L03_D01_2" },
                { speaker: "Nigora", line: "On Monday I studied at school. On Tuesday I visited my friends.", line_uz: "Dushanba kuni maktabda o'qidim. Seshanba kuni do'stlarimni ziyorat qildim.", target: ["studied", "visited", "Monday", "Tuesday"], mastery_key: "U05_L03_D01_3" },
                { speaker: "Sardor", line: "Wonderful! Continue!", line_uz: "Ajoyib! Davom et!", target: ["Wonderful", "Continue"], mastery_key: "U05_L03_D01_4" },
                { speaker: "Nigora", line: "On Wednesday I helped my mother at home. On Thursday I read a book at the library.", line_uz: "Chorshanba kuni onamga uyda yordam berdim. Payshanba kuni kutubxonada kitob o'qidim.", target: ["helped", "Wednesday", "Thursday", "library"], mastery_key: "U05_L03_D01_5" },
                { speaker: "Sardor", line: "What about Friday?", line_uz: "Juma kuni-chi?", target: ["Friday"], mastery_key: "U05_L03_D01_6" },
                { speaker: "Nigora", line: "On Friday I played football and on Saturday I went to the museum!", line_uz: "Juma kuni futbol o'ynadim va shanba kuni muzeyga bordim!", target: ["played", "went", "Saturday"], mastery_key: "U05_L03_D01_7" }
            ]
        },
        "U05_L04_D01": {
            id: "U05_L04_D01",
            title: "Busy Week",
            lines: [
                { speaker: "Feruza", line: "Hi Jasur! This week I was very busy!", line_uz: "Salom Jasur! Bu hafta juda band edim!", target: ["was", "very", "busy"], mastery_key: "U05_L04_D01_0" },
                { speaker: "Jasur", line: "Hi Feruza! Me too! What did you do?", line_uz: "Salom Feruza! Men ham! Nima qilding?", target: ["Me too", "What", "did"], mastery_key: "U05_L04_D01_1" },
                { speaker: "Feruza", line: "I studied at school every day. Then I helped at home.", line_uz: "Men har kuni maktabda o'qidim. Keyin uyda yordam berdim.", target: ["studied", "every day", "helped"], mastery_key: "U05_L04_D01_2" },
                { speaker: "Jasur", line: "Me too! I helped my mother cook food.", line_uz: "Men ham! Men onamga ovqat pishirishda yordam berdim.", target: ["helped", "cook", "food"], mastery_key: "U05_L04_D01_3" },
                { speaker: "Feruza", line: "Wonderful! Did you spend time with friends?", line_uz: "Ajoyib! Sen do'stlaring bilan vaqt o'tkazdingmi?", target: ["Did you", "spend", "time"], mastery_key: "U05_L04_D01_4" },
                { speaker: "Jasur", line: "Yes, on Wednesday I visited my friends. We played football.", line_uz: "Ha, chorshanba kuni do'stlarimni ziyorat qildim. Biz futbol o'ynadik.", target: ["visited", "played", "football"], mastery_key: "U05_L04_D01_5" },
                { speaker: "Feruza", line: "I also went to the museum with friends on Thursday!", line_uz: "Men ham payshanba kuni do'stlarim bilan muzeyga bordim!", target: ["went", "museum", "Thursday"], mastery_key: "U05_L04_D01_6" },
                { speaker: "Jasur", line: "Now it's time to rest! We'll rest on the weekend!", line_uz: "Endi dam olish vaqti! Hafta oxiri dam olamiz!", target: ["rest", "weekend"], mastery_key: "U05_L04_D01_7" }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LESSONS
    // ═══════════════════════════════════════════════════════════════════════════
    lessons: {
        "U05_L01": {
            lesson_id: "U05_L01",
            title: "Regular Past Actions (-ED)",
            flow_model: "sandwich",
            mastery_dialogue_id: "U05_L03_D01_1",
            items: [
                // ── CARD 1: played ──────────────────────────────────────
                {
                    id: "V_U05_L01_played",
                    en: "played",
                    uz: "o'ynadi (play → played)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 1,
                    category: "action",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/played.jpg",
                    dialogue_ref: { dialogue_id: "U05_L01_D01", line_index: 1, speaker: "Rashid", bubble_text: "I played football on Saturday." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha dam oldingmi? Uyda yotdingmi?", audio: "/assets/audio/unit05/played.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men futbol o'ynadim!", hybrid_answer: "Yo'q, men futbol **played**. Men o'ynadim!", en_canonical: "No, I played football!", syntax_scaffold: { en_structure: "I played football on Saturday.", uz_gloss: "Men shanba kuni futbol o'ynadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "played", role: "past_regular_verb", color: "green" }, { word: "football", role: "object", color: "purple" }, { word: "on Saturday", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'I played' — bu qaysi zamon?", choices: [{ text: "Hozirgi (present)", correct: false }, { text: "O'tmish (past)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "played", form_focus: "regular_ed_suffix", why_prompt: "Nega 'play' → 'played' bo'ladi?", explanation_uz: "Ingliz tilida o'tmish zamon uchun fe'lga '-ed' qo'shiladi: play → played, watch → watched, visit → visited. Bu ODDIY (regular) fe'llar.", mini_rule: "verb + ed = past tense (played, watched, visited)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I played football on Saturday.", uz: "Men shanba kuni futbol o'ynadim.", is_anchor: true, anchor_sentence: "I played football on Saturday.", source_dialogue: "U05_L01_D01", source_line: 1, speaker: "Rashid" },
                            { en: "She played volleyball yesterday evening.", uz: "U kecha kechqurun voleybol o'ynadi.", example_2: "t" },
                            { en: "My brother played computer games after school.", uz: "Mening akam maktabdan keyin kompyuter o'yinlari o'ynadi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'played' ishlatib o'tmish gap tuzing.", model_sentence: "I played football yesterday.", hints: ["I played ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima o'ynadingiz?", model_frame: "I played ___ yesterday.", flexibleCheck: true, tags: ["past", "activity"] }
                    ]
                },
                // ── CARD 2: watched ─────────────────────────────────────
                {
                    id: "V_U05_L01_watched",
                    en: "watched",
                    uz: "ko'rdi (watch → watched)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 1,
                    category: "action",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/watched.jpg",
                    dialogue_ref: { dialogue_id: "U05_L01_D01", line_index: 2, speaker: "Kamola", bubble_text: "I watched TV." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha o'qidingmi? Kitob o'qidingmi?", audio: "/assets/audio/unit05/watched.mp3", uz_mirror_answer: "Yo'q, men o'qimadim. Men televizor ko'rdim.", hybrid_answer: "Yo'q, men kecha televizor **watched**.", en_canonical: "No, I watched TV.", syntax_scaffold: { en_structure: "I watched TV.", uz_gloss: "Men televizor ko'rdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "watched", role: "past_regular_verb", color: "green" }, { word: "TV", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'watch' → o'tmishda qanday?", choices: [{ text: "watched", correct: true }, { text: "watchd", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "watched", form_focus: "ed_after_consonant", why_prompt: "'watch' + 'ed' = 'watched'. Talaffuzi qanday?", explanation_uz: "'watch' oxiri '-ch' bilan tugaydi. '-ed' qo'shganda /t/ ovozi chiqadi: watched = /wɒtʃt/. '-ed' 3 xil talaffuz: /d/, /t/, /ɪd/.", mini_rule: "watched = /wɒtʃt/ — after voiceless sounds, -ed sounds like /t/" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I watched TV.", uz: "Men televizor ko'rdim.", is_anchor: true, anchor_sentence: "I watched TV.", source_dialogue: "U05_L01_D01", source_line: 2, speaker: "Kamola" },
                            { en: "He watched a movie last night.", uz: "U kecha kechasi film ko'rdi.", example_2: "t" },
                            { en: "We watched a concert on TV because we love music.", uz: "Biz televizorda konsert ko'rdik chunki biz musiqani yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'watched' ishlatib gap tuzing.", model_sentence: "I watched a movie yesterday.", hints: ["I watched ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha kechqurun nima ko'rdingiz?", model_frame: "I watched ___ yesterday evening.", flexibleCheck: true, tags: ["past", "entertainment"] }
                    ]
                },
                // ── CARD 3: visited ─────────────────────────────────────
                {
                    id: "V_U05_L01_visited",
                    en: "visited",
                    uz: "ziyorat qildi (visit → visited)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 1,
                    category: "action",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/visited.jpg",
                    dialogue_ref: { dialogue_id: "U05_L01_D01", line_index: 4, speaker: "Kamola", bubble_text: "I visited my friends." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uyda edingmi? Hech kimga bormasdingmi?", audio: "/assets/audio/unit05/visited.mp3", uz_mirror_answer: "Yo'q, men uyda emas edim. Men do'stlarimni ziyorat qildim.", hybrid_answer: "Yo'q, men kecha do'stlarimni **visited**.", en_canonical: "No, I visited my friends.", syntax_scaffold: { en_structure: "I visited my friends.", uz_gloss: "Men do'stlarimni ziyorat qildim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "visited", role: "past_regular_verb", color: "green" }, { word: "my friends", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'visit' + '-ed' = ?", choices: [{ text: "visited", correct: true }, { text: "visitted", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "visited", form_focus: "ed_pronunciation_id", why_prompt: "'visited' = /ˈvɪzɪtɪd/ — nega '-id' talaffuz?", explanation_uz: "Fe'l '-t' yoki '-d' bilan tugasa, '-ed' = /ɪd/ bo'ladi: visited, wanted, started. Bu uchunchi talaffuz.", mini_rule: "after -t or -d endings, -ed sounds like /ɪd/ (visit-id)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I visited my friends.", uz: "Men do'stlarimni ziyorat qildim.", is_anchor: true, anchor_sentence: "I visited my friends.", source_dialogue: "U05_L01_D01", source_line: 4, speaker: "Kamola" },
                            { en: "She visited the museum last week.", uz: "U o'tgan hafta muzeyni ziyorat qildi.", example_2: "t" },
                            { en: "My family visited my grandmother yesterday because we love her.", uz: "Mening oilam kecha buvimni ziyorat qildi chunki biz uni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'visited' ishlatib gap tuzing.", model_sentence: "I visited the museum yesterday.", hints: ["I visited ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "O'tgan hafta kimni ziyorat qildingiz?", model_frame: "I visited ___ last week.", flexibleCheck: true, tags: ["past", "social"] }
                    ]
                },
                // ── CARD 4: worked ──────────────────────────────────────
                {
                    id: "V_U05_L01_worked",
                    en: "worked",
                    uz: "ishladi (work → worked)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/worked.jpg",
                    dialogue_ref: { dialogue_id: "U05_L01_D01", line_index: 2, speaker: "Kamola", bubble_text: "I rested at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha dam oldingmi? Uyda yotdingmi?", audio: "/assets/audio/unit05/worked.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men ishladim.", hybrid_answer: "Yo'q, men kecha **worked**. Men ishladim.", en_canonical: "No, I worked yesterday.", syntax_scaffold: { en_structure: "I worked at the office.", uz_gloss: "Men ofisda ishladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "worked", role: "past_regular_verb", color: "green" }, { word: "at the office", role: "location", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'She worked all day' — qanchadan qancha?", choices: [{ text: "Butun kun", correct: true }, { text: "Biroz", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "worked", form_focus: "ed_pronunciation_t", why_prompt: "'worked' = /wɜːkt/ — nega '/t/' talaffuz?", explanation_uz: "'work' oxiri '-k' (jarangsiz) bilan tugaydi. Jarangsiz undoshdan keyin '-ed' = /t/: worked, walked, watched.", mini_rule: "after voiceless k/p/s/ch/sh → -ed = /t/ (worked, walked)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I worked at the office.", uz: "Men ofisda ishladim.", is_anchor: true, anchor_sentence: "I worked at the office.", source_dialogue: "U05_L01_D01", source_line: 2, speaker: "Kamola" },
                            { en: "He worked all morning yesterday.", uz: "U kecha butun ertalab ishladi.", example_2: "t" },
                            { en: "My mother worked at school yesterday because she is a teacher.", uz: "Mening onam kecha maktabda ishladi chunki u o'qituvchi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'worked' ishlatib gap tuzing.", model_sentence: "I worked all day yesterday.", hints: ["I worked ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Otangiz kecha qayerda ishladi?", model_frame: "My father worked at ___.", flexibleCheck: true, tags: ["past", "work"] }
                    ]
                },
                // ── CARD 5: walked ──────────────────────────────────────
                {
                    id: "V_U05_L01_walked",
                    en: "walked",
                    uz: "yurdi (walk → walked)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "movement",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/walked.jpg",
                    dialogue_ref: { dialogue_id: "U05_L01_D01", line_index: 4, speaker: "Kamola", bubble_text: "We went to the museum." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha avtobus oldingmi? Transport bilan bordingmi?", audio: "/assets/audio/unit05/walked.mp3", uz_mirror_answer: "Yo'q, men avtobus olmadim. Men yurdim.", hybrid_answer: "Yo'q, men kecha **walked**. Men yurdim.", en_canonical: "No, I walked.", syntax_scaffold: { en_structure: "I walked to school.", uz_gloss: "Men maktabga yurdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "walked", role: "past_regular_verb", color: "green" }, { word: "to school", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'walked' nima degani?", choices: [{ text: "Piyoda yurdi", correct: true }, { text: "Mashina haydadi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "walked", form_focus: "ed_same_pattern", why_prompt: "'walk' + 'ed' = 'walked'. Qoida bir xil!", explanation_uz: "Barcha oddiy fe'llar bir xil qoida: play→played, walk→walked, work→worked. Faqat '-ed' qo'shing. Bu ODDIY (regular) pattern.", mini_rule: "Regular pattern: just add -ed (walk → walked)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I walked to school.", uz: "Men maktabga yurdim.", is_anchor: true, anchor_sentence: "I walked to school.", source_dialogue: "U05_L01_D01", source_line: 4, speaker: "Kamola" },
                            { en: "She walked home after school.", uz: "U maktabdan keyin uyga yurdi.", example_2: "t" },
                            { en: "We walked to the park and played football.", uz: "Biz bog'ga yurdik va futbol o'ynadik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'walked' ishlatib gap tuzing.", model_sentence: "I walked to school yesterday.", hints: ["I walked to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha qayerga yurdingiz?", model_frame: "I walked to ___ yesterday.", flexibleCheck: true, tags: ["past", "movement"] }
                    ]
                },
                // ── CARD 6: studied ─────────────────────────────────────
                {
                    id: "V_U05_L01_studied",
                    en: "studied",
                    uz: "o'qidi (study → studied)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "education",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/studied.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 6, speaker: "Anvar", bubble_text: "I studied math." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha o'ynadingmi? Do'stlaring bilan vaqt o'tkazdingmi?", audio: "/assets/audio/unit05/studied.mp3", uz_mirror_answer: "Yo'q, men o'ynamadim. Men o'qidim.", hybrid_answer: "Yo'q, men kecha ingliz tilini **studied**.", en_canonical: "No, I studied English yesterday.", syntax_scaffold: { en_structure: "I studied English.", uz_gloss: "Men ingliz tilini o'qidim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "studied", role: "past_regular_verb", color: "green" }, { word: "English", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'study' → o'tmishda qanday?", choices: [{ text: "studyed", correct: false }, { text: "studied", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "studied", form_focus: "y_to_ied", why_prompt: "Nega 'studyed' emas, 'studied'?", explanation_uz: "Fe'l undosh + 'y' bilan tugasa, 'y' → 'i' o'zgaradi: study → studied, carry → carried, worry → worried. Unli + 'y' bo'lsa, o'zgarmaydi: play → played.", mini_rule: "consonant + y → ied (studied); vowel + y → yed (played)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I studied math.", uz: "Men matematika o'qidim.", is_anchor: true, anchor_sentence: "I studied math.", source_dialogue: "U05_L02_D01", source_line: 6, speaker: "Anvar" },
                            { en: "He studied math last night.", uz: "U kecha kechasi matematika o'qidi.", example_2: "t" },
                            { en: "My sister studied all day because she has an exam.", uz: "Mening singlim butun kun o'qidi chunki uning imtihoni bor.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'studied' ishlatib gap tuzing.", model_sentence: "I studied English yesterday.", hints: ["I studied ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima o'qidingiz?", model_frame: "I studied ___ yesterday.", flexibleCheck: true, tags: ["past", "education"] }
                    ]
                },
                // ── CARD 7: cleaned ─────────────────────────────────────
                {
                    id: "V_U05_L01_cleaned",
                    en: "cleaned",
                    uz: "tozaladi (clean → cleaned)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "household",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/cleaned.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 2, speaker: "Feruza", bubble_text: "I helped at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uxladingmi? Dam oldingmi?", audio: "/assets/audio/unit05/cleaned.mp3", uz_mirror_answer: "Yo'q, men uxlamadim. Men xonamni tozaladim.", hybrid_answer: "Yo'q, men kecha xonamni **cleaned**.", en_canonical: "No, I cleaned my room.", syntax_scaffold: { en_structure: "I cleaned my room.", uz_gloss: "Men xonamni tozaladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "cleaned", role: "past_regular_verb", color: "green" }, { word: "my room", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'cleaned' nima degani?", choices: [{ text: "Tozaladi", correct: true }, { text: "Iflosladi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "cleaned", form_focus: "ed_pronunciation_d", why_prompt: "'cleaned' = /kliːnd/ — nega '/d/' talaffuz?", explanation_uz: "'clean' oxiri '-n' (jarangli) bilan tugaydi. Jarangli undoshdan keyin '-ed' = /d/: cleaned, played, listened.", mini_rule: "after voiced sounds (n/l/v/z/b/g) → -ed = /d/ (cleaned)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I cleaned my room.", uz: "Men xonamni tozaladim.", is_anchor: true, anchor_sentence: "I cleaned my room.", source_dialogue: "U05_L04_D01", source_line: 2, speaker: "Feruza" },
                            { en: "She cleaned the house yesterday morning.", uz: "U kecha ertalab uyni tozaladi.", example_2: "t" },
                            { en: "We cleaned our bedroom after school every day.", uz: "Biz har kuni maktabdan keyin xonamizni tozalaymiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'cleaned' ishlatib gap tuzing.", model_sentence: "I cleaned the kitchen yesterday.", hints: ["I cleaned ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha uyda nima tozaladingiz?", model_frame: "I cleaned ___ yesterday.", flexibleCheck: true, tags: ["past", "household"] }
                    ]
                },
                // ── CARD 8: listened ────────────────────────────────────
                {
                    id: "V_U05_L01_listened",
                    en: "listened",
                    uz: "tingladi (listen → listened)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L01",
                    image: "/assets/images/unit05/listened.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 5, speaker: "Zarina", bubble_text: "I listened to music." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha televizor ko'rdingmi? Film ko'rdingmi?", audio: "/assets/audio/unit05/listened.mp3", uz_mirror_answer: "Yo'q, men televizor ko'rmadim. Men musiqa tingladim.", hybrid_answer: "Yo'q, men kecha musiqa **listened**.", en_canonical: "No, I listened to music.", syntax_scaffold: { en_structure: "I listened to music.", uz_gloss: "Men musiqa tingladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "listened", role: "past_regular_verb", color: "green" }, { word: "to music", role: "object_prep", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'listen' bilan qaysi predlog?", choices: [{ text: "listen TO", correct: true }, { text: "listen AT", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "listened to", form_focus: "listen_requires_to", why_prompt: "Nega 'listened TO music' — 'listened music' emas?", explanation_uz: "'Listen' har doim 'to' bilan keladi: 'listen to music' (musiqani tinglash). 'Hear' esa predlogsiz: 'I heard music' (men musiqa eshitdim).", mini_rule: "listen TO something (always 'to'); hear something (no 'to')" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I listened to music.", uz: "Men musiqa tingladim.", is_anchor: true, anchor_sentence: "I listened to music.", source_dialogue: "U05_L02_D01", source_line: 5, speaker: "Zarina" },
                            { en: "He listened to songs all evening.", uz: "U butun kechqurun qo'shiqlarni tingladi.", example_2: "t" },
                            { en: "My brother listened to a band's album because he loves music.", uz: "Mening akam guruh albomini tingladi chunki u musiqani yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'listened' ishlatib gap tuzing.", model_sentence: "I listened to music yesterday.", hints: ["I listened to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qanday musiqa tinglaysiz?", model_frame: "I listened to ___ yesterday.", flexibleCheck: true, tags: ["past", "music"] }
                    ]
                }
            ]
        },

        "U05_L02": {
            lesson_id: "U05_L02",
            title: "Past Questions & Negatives (did/didn't)",
            flow_model: "sandwich",
            mastery_dialogue_id: "U05_L03_D01_1",
            items: [
                // ── CARD 9: Did you...? ─────────────────────────────────
                {
                    id: "V_U05_L02_did_you",
                    en: "Did you...?",
                    uz: "Siz ...dingizmi? (o'tmish savol)",
                    pos: "auxiliary",
                    type: "past_question",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/did_you.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 0, speaker: "Anvar", bubble_text: "Did you come to school yesterday?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha futbol o'ynamadingmi?", audio: "/assets/audio/unit05/did_you.mp3", uz_mirror_answer: "Savol: Men futbol o'ynadimmi?", hybrid_answer: "**Did you** kecha futbol play?", en_canonical: "Did you play football yesterday?", syntax_scaffold: { en_structure: "Did you come to school yesterday?", uz_gloss: "Kecha maktabga keldingizmi?", tokens: [{ word: "Did", role: "question_auxiliary", color: "red" }, { word: "you", role: "subject", color: "blue" }, { word: "come", role: "base_verb", color: "green" }, { word: "to school", role: "destination", color: "purple" }, { word: "yesterday", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "Qaysi savol to'g'ri?", choices: [{ text: "Did you came? (XATO)", correct: false }, { text: "Did you come? (TO'G'RI)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "Did", form_focus: "did_base_verb_rule", why_prompt: "Nega 'Did you come' — 'Did you came' emas?", explanation_uz: "'Did' o'zi o'tmishi ko'rsatadi, shuning uchun undan keyin BASE fe'l (asosiy shakl) keladi. 'Did' + base verb = o'tmish savol. XATO: 'Did you came/played/went'.", mini_rule: "Did + subject + BASE verb? (NOT past form!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you come to school yesterday?", uz: "Kecha maktabga keldingizmi?", is_anchor: true, anchor_sentence: "Did you come to school yesterday?", source_dialogue: "U05_L02_D01", source_line: 0, speaker: "Anvar" },
                            { en: "Did you watch TV last night?", uz: "Siz kecha kechasi televizor ko'rdingizmi?", example_2: "t" },
                            { en: "Did you visit your grandmother yesterday?", uz: "Siz kecha buvingizni ziyorat qildingizmi?", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did you' bilan savol tuzing.", model_sentence: "Did you play football yesterday?", hints: ["Did you ___ ?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan savol so'rang.", model_frame: "Did you ___ yesterday?", flexibleCheck: true, tags: ["past", "question"] }
                    ]
                },
                // ── CARD 10: didn't ─────────────────────────────────────
                {
                    id: "V_U05_L02_didnt",
                    en: "didn't",
                    uz: "qilmadi (did not = didn't)",
                    pos: "auxiliary",
                    type: "past_negative",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/didnt.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 1, speaker: "Zarina", bubble_text: "I didn't come to school." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha maktabga bordingmi?", audio: "/assets/audio/unit05/didnt.mp3", uz_mirror_answer: "Yo'q, men maktabga bormasdim.", hybrid_answer: "Yo'q, men kecha maktabga **didn't** come.", en_canonical: "No, I didn't come to school.", syntax_scaffold: { en_structure: "I didn't come to school.", uz_gloss: "Men maktabga kelmadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_auxiliary", color: "red" }, { word: "come", role: "base_verb", color: "green" }, { word: "to school", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Qaysi gap to'g'ri?", choices: [{ text: "I didn't played (XATO)", correct: false }, { text: "I didn't play (TO'G'RI)", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "didn't", form_focus: "didnt_base_verb", why_prompt: "Nega 'didn't play' — 'didn't played' emas?", explanation_uz: "'Didn't' o'zi o'tmishni ko'rsatadi. Shuning uchun ikkinchi fe'l BASE shaklda qoladi: didn't play, didn't go, didn't watch. XATO: didn't played, didn't went.", mini_rule: "didn't + BASE verb (never -ed after didn't!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't come to school.", uz: "Men maktabga kelmadim.", is_anchor: true, anchor_sentence: "I didn't come to school.", source_dialogue: "U05_L02_D01", source_line: 1, speaker: "Zarina" },
                            { en: "She didn't play football yesterday.", uz: "U kecha futbol o'ynamadi.", example_2: "t" },
                            { en: "We didn't watch the concert because we don't like loud music.", uz: "Biz konsertni ko'rmadik chunki biz baland musiqani yoqtirmaymiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't' ishlatib gap tuzing.", model_sentence: "I didn't watch TV yesterday.", hints: ["I didn't ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima qilmadingiz?", model_frame: "I didn't ___ yesterday.", flexibleCheck: true, tags: ["past", "negative"] }
                    ]
                },
                // ── CARD 11: Yes, I did / No, I didn't ──────────────────
                {
                    id: "V_U05_L02_short_answers",
                    en: "Yes, I did / No, I didn't",
                    uz: "Ha, qildim / Yo'q, qilmadim",
                    pos: "phrase",
                    type: "short_answer",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/yes_no_did.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 1, speaker: "Zarina", bubble_text: "No, I didn't come." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha televizor ko'rdingmi?", audio: "/assets/audio/unit05/yes_no_did.mp3", uz_mirror_answer: "Ha, ko'rdim. / Yo'q, ko'rmadim.", hybrid_answer: "**Yes, I did**. / **No, I didn't**.", en_canonical: "Yes, I did. / No, I didn't.", syntax_scaffold: { en_structure: "Did you watch TV? — Yes, I did.", uz_gloss: "Televizor ko'rdingizmi? — Ha, ko'rdim.", tokens: [{ word: "Yes,", role: "affirmation", color: "green" }, { word: "I", role: "subject", color: "blue" }, { word: "did", role: "auxiliary_past", color: "green" }] } },
                        { phase: "concept_check", question_uz: "'Did you play?' — qisqa javob?", choices: [{ text: "Yes, I played / No, I didn't played", correct: false }, { text: "Yes, I did / No, I didn't", correct: true }], correct_index: 1 },
                        { phase: "discovery", grammar_token: "did/didn't", form_focus: "short_answer_pattern", why_prompt: "Nega 'Yes, I did' — 'Yes, I played' emas?", explanation_uz: "Qisqa javoblarda fe'lni takrorlamasdan 'did/didn't' bilan javob beramiz: 'Did you play?' → 'Yes, I did.' (not 'Yes, I played.'). Bu qisqartma qoida.", mini_rule: "Did you...? → Yes, I did. / No, I didn't. (no main verb)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you come to school? — No, I didn't.", uz: "Maktabga keldingizmi? — Yo'q, kelmadim.", is_anchor: true, anchor_sentence: "No, I didn't.", source_dialogue: "U05_L02_D01", source_line: 1, speaker: "Zarina" },
                            { en: "Did you study? — Yes, I did.", uz: "O'qidingizmi? — Ha, o'qidim.", example_2: "t" },
                            { en: "Did you play football? — Yes, I did. I love football!", uz: "Futbol o'ynadingizmi? — Ha, o'ynadim. Men futbolni yaxshi ko'raman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "Savol va qisqa javob yozing.", model_sentence: "Did you watch TV? — Yes, I did.", hints: ["Did you ___? — Yes, I did."], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingiz sizga savol berdi. Javob bering.", model_frame: "Did you ___? — ___, I ___.", flexibleCheck: true, tags: ["past", "question", "answer"] }
                    ]
                },
                // ── CARD 12: talked ─────────────────────────────────────
                {
                    id: "V_U05_L02_talked",
                    en: "talked",
                    uz: "gaplashdi (talk → talked)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "communication",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/talked.jpg",
                    dialogue_ref: { dialogue_id: "U05_L02_D01", line_index: 5, speaker: "Zarina", bubble_text: "I read a book and listened to music." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha jim edingmi? Hech kim bilan gaplashmasdingmi?", audio: "/assets/audio/unit05/talked.mp3", uz_mirror_answer: "Yo'q, men jim emas edim. Men do'stlarim bilan gaplashdim.", hybrid_answer: "Yo'q, men kecha do'stlarim bilan **talked**.", en_canonical: "No, I talked with my friends.", syntax_scaffold: { en_structure: "I talked with my friends.", uz_gloss: "Men do'stlarim bilan gaplashdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "talked", role: "past_regular_verb", color: "green" }, { word: "with my friends", role: "companion", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'talked' nima?", choices: [{ text: "Gaplashdi", correct: true }, { text: "Jim bo'ldi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "talked", form_focus: "talk_with_to", why_prompt: "'talk WITH' yoki 'talk TO'?", explanation_uz: "'Talk with' = birga gaplashish (ikki tomon). 'Talk to' = biriga aytish (yo'nalish). Ikkalasi ham to'g'ri, 'with' — do'stona.", mini_rule: "talk with (friendly/equal); talk to (direction/authority)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I talked with my friends.", uz: "Men do'stlarim bilan gaplashdim.", is_anchor: true, anchor_sentence: "I talked with my friends.", source_dialogue: "U05_L02_D01", source_line: 5, speaker: "Zarina" },
                            { en: "She talked to her teacher after school.", uz: "U maktabdan keyin o'qituvchisi bilan gaplashdi.", example_2: "t" },
                            { en: "My mother talked to my father about the party yesterday.", uz: "Mening onam kecha otam bilan bazm haqida gaplashdi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'talked' ishlatib gap tuzing.", model_sentence: "I talked with my sister yesterday.", hints: ["I talked with ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha kim bilan gaplashdingiz?", model_frame: "I talked with ___ yesterday.", flexibleCheck: true, tags: ["past", "social"] }
                    ]
                },
                // ── CARD 13: finished ───────────────────────────────────
                {
                    id: "V_U05_L02_finished",
                    en: "finished",
                    uz: "tugatdi (finish → finished)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/finished.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 2, speaker: "Feruza", bubble_text: "I studied every day." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uy vazifangni boshladingmi? Faqat boshladingmi?", audio: "/assets/audio/unit05/finished.mp3", uz_mirror_answer: "Yo'q, men faqat boshlamadim. Men tugatdim!", hybrid_answer: "Yo'q, men kecha uy vazifamni **finished**!", en_canonical: "No, I finished my homework!", syntax_scaffold: { en_structure: "I finished my homework.", uz_gloss: "Men uy vazifamni tugatdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "finished", role: "past_regular_verb", color: "green" }, { word: "my homework", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'finished' nima degani?", choices: [{ text: "Tugatdi", correct: true }, { text: "Boshladi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "finished", form_focus: "finish_vs_start", why_prompt: "'Finished' va 'started' — qarama-qarshi.", explanation_uz: "'Finish' = tugatish, 'Start' = boshlash. Qarama-qarshi juftlik. 'I finished' = men tugatdim, 'I started' = men boshladim.", mini_rule: "finish ↔ start (antonym pair)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I finished my homework.", uz: "Men uy vazifamni tugatdim.", is_anchor: true, anchor_sentence: "I finished my homework.", source_dialogue: "U05_L04_D01", source_line: 2, speaker: "Feruza" },
                            { en: "He finished his work at night.", uz: "U kechasi ishini tugatdi.", example_2: "t" },
                            { en: "We finished the exam yesterday and we were happy.", uz: "Biz kecha imtihonni tugatdik va xursand edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'finished' ishlatib gap tuzing.", model_sentence: "I finished my homework yesterday.", hints: ["I finished ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nimani tugatdingiz?", model_frame: "I finished ___ yesterday.", flexibleCheck: true, tags: ["past", "completion"] }
                    ]
                },
                // ── CARD 14: helped ─────────────────────────────────────
                {
                    id: "V_U05_L02_helped",
                    en: "helped",
                    uz: "yordam berdi (help → helped)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/helped.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 5, speaker: "Nigora", bubble_text: "I helped my mother at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha faqat o'zingga qaradingmi? Hech kimga yordam bermasdingmi?", audio: "/assets/audio/unit05/helped.mp3", uz_mirror_answer: "Yo'q, men faqat o'zimga qaramadim. Men onamga yordam berdim.", hybrid_answer: "Yo'q, men kecha onamga **helped**.", en_canonical: "No, I helped my mother.", syntax_scaffold: { en_structure: "I helped my mother at home.", uz_gloss: "Men onamga uyda yordam berdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "helped", role: "past_regular_verb", color: "green" }, { word: "my mother", role: "object", color: "purple" }, { word: "at home", role: "location", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'helped' nima?", choices: [{ text: "Yordam berdi", correct: true }, { text: "Oldi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "helped", form_focus: "help_with", why_prompt: "'Help' bilan qanday ishlatiladi?", explanation_uz: "'Help' + kishi + WITH + ish: 'I helped her with homework.' Yoki 'Help' + kishi + fe'l: 'I helped her cook.' Ikkalasi ham to'g'ri.", mini_rule: "help + person (+ with task): helped my mother with cooking" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I helped my mother at home.", uz: "Men onamga uyda yordam berdim.", is_anchor: true, anchor_sentence: "I helped my mother at home.", source_dialogue: "U05_L03_D01", source_line: 5, speaker: "Nigora" },
                            { en: "She helped her brother with homework.", uz: "U akasiga uy vazifasida yordam berdi.", example_2: "t" },
                            { en: "My father helped me because he is very kind.", uz: "Mening otam menga yordam berdi chunki u juda mehribon.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'helped' ishlatib gap tuzing.", model_sentence: "I helped my sister yesterday.", hints: ["I helped ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha kimga yordam berdingiz?", model_frame: "I helped ___ yesterday.", flexibleCheck: true, tags: ["past", "kindness"] }
                    ]
                },
                // ── CARD 15: cooked ─────────────────────────────────────
                {
                    id: "V_U05_L02_cooked",
                    en: "cooked",
                    uz: "pishirdi (cook → cooked)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "household",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/cooked.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 3, speaker: "Jasur", bubble_text: "I helped my mother cook food." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha restoranda ovqat yedingmi?", audio: "/assets/audio/unit05/cooked.mp3", uz_mirror_answer: "Yo'q, men restoranda yemadim. Men uyda ovqat pishirdim.", hybrid_answer: "Yo'q, men kecha uyda ovqat **cooked**.", en_canonical: "No, I cooked food at home.", syntax_scaffold: { en_structure: "I cooked food at home.", uz_gloss: "Men uyda ovqat pishirdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "cooked", role: "past_regular_verb", color: "green" }, { word: "food", role: "object", color: "purple" }, { word: "at home", role: "location", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'cooked' nima?", choices: [{ text: "Ovqat pishirdi", correct: true }, { text: "Ovqat yedi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "cooked", form_focus: "cook_noun_verb", why_prompt: "'Cook' — ism ham, fe'l ham!", explanation_uz: "'Cook' = fe'l (ovqat pishirmoq) va ism (oshpaz). 'I cooked dinner' = Men kechki ovqat pishirdim. 'She is a cook' = U oshpaz.", mini_rule: "cook (verb = to prepare food; noun = chef/oshpaz)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I cooked food at home.", uz: "Men uyda ovqat pishirdim.", is_anchor: true, anchor_sentence: "I cooked food at home.", source_dialogue: "U05_L04_D01", source_line: 3, speaker: "Jasur" },
                            { en: "He cooked dinner last night.", uz: "U kecha kechasi kechki ovqat pishirdi.", example_2: "t" },
                            { en: "My mother cooked plov yesterday because we love it.", uz: "Mening onam kecha palov pishirdi chunki biz uni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'cooked' ishlatib gap tuzing.", model_sentence: "I cooked dinner yesterday.", hints: ["I cooked ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oilangizda kim ovqat pishirdi kecha?", model_frame: "___ cooked ___ yesterday.", flexibleCheck: true, tags: ["past", "food"] }
                    ]
                },
                // ── CARD 16: prepared ───────────────────────────────────
                {
                    id: "V_U05_L02_prepared",
                    en: "prepared",
                    uz: "tayyorladi (prepare → prepared)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L02",
                    image: "/assets/images/unit05/prepared.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 2, speaker: "Feruza", bubble_text: "Then I helped at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa qilmasdingmi? Dam oldingmi?", audio: "/assets/audio/unit05/prepared.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men hisobotlarni tayyorladim.", hybrid_answer: "Yo'q, men kecha hisobotlarni **prepared**.", en_canonical: "No, I prepared reports.", syntax_scaffold: { en_structure: "I prepared reports.", uz_gloss: "Men hisobotlarni tayyorladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "prepared", role: "past_regular_verb", color: "green" }, { word: "reports", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'prepared' nima?", choices: [{ text: "Tayyorladi", correct: true }, { text: "Yo'q qildi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "prepared", form_focus: "e_ending_rule", why_prompt: "'prepare' → 'prepared' — nega 'prepareed' emas?", explanation_uz: "Fe'l '-e' bilan tugasa, faqat '-d' qo'shiladi: prepare → prepared, live → lived, arrive → arrived. Ikki 'e' kerak emas.", mini_rule: "verb ending in -e: just add -d (prepared, lived, arrived)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I prepared reports.", uz: "Men hisobotlarni tayyorladim.", is_anchor: true, anchor_sentence: "I prepared reports.", source_dialogue: "U05_L04_D01", source_line: 2, speaker: "Feruza" },
                            { en: "She prepared lunch for the family.", uz: "U oila uchun tushlik tayyorladi.", example_2: "t" },
                            { en: "My father prepared for the exam because he studies every day.", uz: "Mening otam imtihonga tayyorgarlik ko'rdi chunki u har kuni o'qiydi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'prepared' ishlatib gap tuzing.", model_sentence: "I prepared for the exam yesterday.", hints: ["I prepared ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimaga tayyorgarlik ko'rdingiz?", model_frame: "I prepared for ___ yesterday.", flexibleCheck: true, tags: ["past", "work"] }
                    ]
                }
            ]
        },

        "U05_L03": {
            lesson_id: "U05_L03",
            title: "Extended Past Narratives",
            flow_model: "sandwich",
            mastery_dialogue_id: "U05_L03_D01_1",
            items: [
                // ── CARD 17: started ────────────────────────────────────
                {
                    id: "V_U05_L03_started",
                    en: "started",
                    uz: "boshladi (start → started)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/started.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 1, speaker: "Nigora", bubble_text: "I did many things!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ishni tugatdingmi?", audio: "/assets/audio/unit05/started.mp3", uz_mirror_answer: "Yo'q, men tugatmadim. Men faqat boshladim.", hybrid_answer: "Yo'q, men kecha faqat **started**.", en_canonical: "No, I only started.", syntax_scaffold: { en_structure: "I started my homework.", uz_gloss: "Men uy vazifamni boshladim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "started", role: "past_regular_verb", color: "green" }, { word: "my homework", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'started' ning aksi nima?", choices: [{ text: "finished", correct: true }, { text: "walked", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "started", form_focus: "ed_after_t", why_prompt: "'start' + 'ed' = 'started' — talaffuz /ɪd/!", explanation_uz: "'start' oxiri '-t' bilan tugaydi. '-t' yoki '-d' dan keyin '-ed' = /ɪd/: started, visited, wanted, needed. Alohida bo'g'in.", mini_rule: "after -t/-d: -ed = /ɪd/ (start-id, visit-id, want-id)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I started my homework.", uz: "Men uy vazifamni boshladim.", is_anchor: true, anchor_sentence: "I started my homework.", source_dialogue: "U05_L03_D01", source_line: 1, speaker: "Nigora" },
                            { en: "She started the exam at nine o'clock.", uz: "U soat to'qqizda imtihonni boshladi.", example_2: "t" },
                            { en: "We started to play football after school.", uz: "Biz maktabdan keyin futbol o'ynashni boshladik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'started' ishlatib gap tuzing.", model_sentence: "I started work at eight o'clock.", hints: ["I started ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Bugun nimani boshladingiz?", model_frame: "I started ___ today.", flexibleCheck: true, tags: ["past", "beginning"] }
                    ]
                },
                // ── CARD 18: stopped ────────────────────────────────────
                {
                    id: "V_U05_L03_stopped",
                    en: "stopped",
                    uz: "to'xtadi (stop → stopped)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "action",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/stopped.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 4, speaker: "Sardor", bubble_text: "Continue!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha davom etdingmi?", audio: "/assets/audio/unit05/stopped.mp3", uz_mirror_answer: "Yo'q, men davom etmadim. Men to'xtatdim.", hybrid_answer: "Yo'q, men kecha **stopped**.", en_canonical: "No, I stopped.", syntax_scaffold: { en_structure: "I stopped playing.", uz_gloss: "Men o'ynashni to'xtatdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "stopped", role: "past_regular_verb", color: "green" }, { word: "playing", role: "gerund_object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Nega 'stoped' emas, 'stopped'?", choices: [{ text: "Oxirgi undosh ikkilanadi", correct: true }, { text: "Imlo xatosi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "stopped", form_focus: "consonant_doubling", why_prompt: "Nega 'stop' → 'stopped' (ikki 'p')?", explanation_uz: "Qisqa unli + bitta undosh = undosh ikkilanadi: stop → stopped, plan → planned, drop → dropped. Bu imlo qoidasi.", mini_rule: "short vowel + consonant → double consonant + ed (stopped, planned)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I stopped playing.", uz: "Men o'ynashni to'xtatdim.", is_anchor: true, anchor_sentence: "I stopped playing.", source_dialogue: "U05_L03_D01", source_line: 4, speaker: "Sardor" },
                            { en: "He stopped working at five o'clock.", uz: "U soat beshda ishlashni to'xtatdi.", example_2: "t" },
                            { en: "My sister stopped watching TV because she doesn't like it.", uz: "Mening singlim televizor ko'rishni to'xtatdi chunki u uni yoqtirmaydi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'stopped' ishlatib gap tuzing.", model_sentence: "I stopped working at six.", hints: ["I stopped ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nimani to'xtatdingiz?", model_frame: "I stopped ___ yesterday.", flexibleCheck: true, tags: ["past", "cessation"] }
                    ]
                },
                // ── CARD 19: stayed ─────────────────────────────────────
                {
                    id: "V_U05_L03_stayed",
                    en: "stayed",
                    uz: "qoldi (stay → stayed)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "location",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/stayed.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 3, speaker: "Nigora", bubble_text: "On Tuesday I visited my friends." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha chiqdingmi? Tashqariga bordingmi?", audio: "/assets/audio/unit05/stayed.mp3", uz_mirror_answer: "Yo'q, men chiqmadim. Men uyda qoldim.", hybrid_answer: "Yo'q, men kecha uyda **stayed**.", en_canonical: "No, I stayed at home.", syntax_scaffold: { en_structure: "I stayed at home and rested.", uz_gloss: "Men uyda qoldim va dam oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "stayed", role: "past_regular_verb", color: "green" }, { word: "at home", role: "location", color: "purple" }, { word: "and rested", role: "additional_action", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'stayed' nima?", choices: [{ text: "Qoldi", correct: true }, { text: "Ketdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "stayed", form_focus: "stay_vs_live", why_prompt: "'Stay' va 'live' farqi?", explanation_uz: "'Stay' = vaqtincha qolish (I stayed at a hotel). 'Live' = doimiy yashash (I live in Tashkent). 'Stay' = qisqa muddat.", mini_rule: "stay = temporary; live = permanent" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I stayed at home and rested.", uz: "Men uyda qoldim va dam oldim.", is_anchor: true, anchor_sentence: "I stayed at home and rested.", source_dialogue: "U05_L03_D01", source_line: 3, speaker: "Nigora" },
                            { en: "She stayed at the library all evening.", uz: "U butun kechqurun kutubxonada qoldi.", example_2: "t" },
                            { en: "We stayed at the party because we love music and dancing.", uz: "Biz bazmda qoldik chunki biz musiqa va raqsni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'stayed' ishlatib gap tuzing.", model_sentence: "I stayed at home yesterday.", hints: ["I stayed at ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Hafta oxiri qayerda qoldingiz?", model_frame: "I stayed at ___ last weekend.", flexibleCheck: true, tags: ["past", "location"] }
                    ]
                },
                // ── CARD 20: arrived ────────────────────────────────────
                {
                    id: "V_U05_L03_arrived",
                    en: "arrived",
                    uz: "keldi/yetib keldi (arrive → arrived)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 2,
                    category: "movement",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/arrived.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 7, speaker: "Nigora", bubble_text: "On Saturday I went to the museum!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ketdingmi? Chiqib ketdingmi?", audio: "/assets/audio/unit05/arrived.mp3", uz_mirror_answer: "Yo'q, men ketmadim. Men keldim!", hybrid_answer: "Yo'q, men kecha **arrived**. Men keldim!", en_canonical: "No, I arrived!", syntax_scaffold: { en_structure: "I arrived at school at eight o'clock.", uz_gloss: "Men soat sakkizda maktabga keldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "arrived", role: "past_regular_verb", color: "green" }, { word: "at school", role: "destination", color: "purple" }, { word: "at eight o'clock", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'arrived' nima?", choices: [{ text: "Yetib keldi", correct: true }, { text: "Ketdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "arrived", form_focus: "arrive_at_in", why_prompt: "'Arrive AT' yoki 'arrive IN'?", explanation_uz: "'Arrive at' = kichik joy (at school, at the airport). 'Arrive in' = katta joy (in London, in Tashkent). 'Home' — predlogsiz: 'arrive home'.", mini_rule: "arrive AT (small place); arrive IN (city/country); arrive home (no prep)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I arrived at school at eight o'clock.", uz: "Men soat sakkizda maktabga keldim.", is_anchor: true, anchor_sentence: "I arrived at school at eight o'clock.", source_dialogue: "U05_L03_D01", source_line: 7, speaker: "Nigora" },
                            { en: "He arrived at the party late.", uz: "U bazmga kech keldi.", example_2: "t" },
                            { en: "My family arrived at the museum yesterday morning.", uz: "Mening oilam kecha ertalab muzeyga keldi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'arrived' ishlatib gap tuzing.", model_sentence: "I arrived at work at nine.", hints: ["I arrived at ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Bugun soat nechada maktabga keldingiz?", model_frame: "I arrived at school at ___.", flexibleCheck: true, tags: ["past", "arrival"] }
                    ]
                },
                // ── CARD 21: washed ─────────────────────────────────────
                {
                    id: "V_U05_L03_washed",
                    en: "washed",
                    uz: "yuvdi (wash → washed)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "household",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/washed.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 3, speaker: "Jasur", bubble_text: "I helped my mother cook food." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa qilmasdingmi?", audio: "/assets/audio/unit05/washed.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men idishlarni yuvdim.", hybrid_answer: "Yo'q, men kecha idishlarni **washed**.", en_canonical: "No, I washed the dishes.", syntax_scaffold: { en_structure: "I washed the dishes.", uz_gloss: "Men idishlarni yuvdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "washed", role: "past_regular_verb", color: "green" }, { word: "the dishes", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'washed' nima?", choices: [{ text: "Yuvdi", correct: true }, { text: "Quritdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "washed", form_focus: "wash_ed_pronunciation", why_prompt: "'washed' = /wɒʃt/ — '/t/' talaffuz.", explanation_uz: "'wash' oxiri '-sh' (jarangsiz). Jarangsiz undoshdan keyin '-ed' = /t/: washed, watched, finished.", mini_rule: "after sh/ch/s/k/p → -ed = /t/ (washed, watched)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I washed the dishes.", uz: "Men idishlarni yuvdim.", is_anchor: true, anchor_sentence: "I washed the dishes.", source_dialogue: "U05_L04_D01", source_line: 3, speaker: "Jasur" },
                            { en: "She washed her clothes yesterday.", uz: "U kecha kiyimlarini yuvdi.", example_2: "t" },
                            { en: "My mother washed the car because she loves it to be clean.", uz: "Mening onam mashinani yuvdi chunki u toza bo'lishini yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'washed' ishlatib gap tuzing.", model_sentence: "I washed the dishes yesterday.", hints: ["I washed ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha uyda nimani yuvdingiz?", model_frame: "I washed ___ yesterday.", flexibleCheck: true, tags: ["past", "household"] }
                    ]
                },
                // ── CARD 22: picked ─────────────────────────────────────
                {
                    id: "V_U05_L03_picked",
                    en: "picked",
                    uz: "terdi (pick → picked)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "agriculture",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/picked.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 5, speaker: "Nigora", bubble_text: "I helped my mother." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uxladingmi? Hech narsa qilmasdingmi?", audio: "/assets/audio/unit05/picked.mp3", uz_mirror_answer: "Yo'q, men uxlamadim. Men pomidor terdim.", hybrid_answer: "Yo'q, men kecha pomidor **picked**.", en_canonical: "No, I picked tomatoes.", syntax_scaffold: { en_structure: "I picked tomatoes.", uz_gloss: "Men pomidor terdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "picked", role: "past_regular_verb", color: "green" }, { word: "tomatoes", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'picked' nima?", choices: [{ text: "Terdi (mevalarni)", correct: true }, { text: "Ekdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "picked", form_focus: "pick_vs_choose", why_prompt: "'Pick' va 'choose' farqi?", explanation_uz: "'Pick' = 1) termoq (pick tomatoes), 2) tanlash (pick a color). 'Choose' = faqat tanlash. 'Pick' kengroq.", mini_rule: "pick = harvest/select; choose = select only" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I picked tomatoes.", uz: "Men pomidor terdim.", is_anchor: true, anchor_sentence: "I picked tomatoes.", source_dialogue: "U05_L03_D01", source_line: 5, speaker: "Nigora" },
                            { en: "He picked vegetables at the farm.", uz: "U fermada sabzavot terdi.", example_2: "t" },
                            { en: "My family picked cucumbers yesterday because we have a garden.", uz: "Mening oilam kecha bodring terdi chunki bizda bog' bor.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'picked' ishlatib gap tuzing.", model_sentence: "I picked fruit yesterday.", hints: ["I picked ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Bog'da nima terdingiz?", model_frame: "I picked ___ in the garden.", flexibleCheck: true, tags: ["past", "agriculture"] }
                    ]
                },
                // ── CARD 23: watered ────────────────────────────────────
                {
                    id: "V_U05_L03_watered",
                    en: "watered",
                    uz: "sug'ordi (water → watered)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "agriculture",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/watered.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 5, speaker: "Nigora", bubble_text: "I helped my mother at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha bog'da hech narsa qilmasdingmi?", audio: "/assets/audio/unit05/watered.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men dalalarni sug'ordim.", hybrid_answer: "Yo'q, men kecha dalalarni **watered**.", en_canonical: "No, I watered the fields.", syntax_scaffold: { en_structure: "I watered the fields.", uz_gloss: "Men dalalarni sug'ordim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "watered", role: "past_regular_verb", color: "green" }, { word: "the fields", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'watered' nima?", choices: [{ text: "Sug'ordi", correct: true }, { text: "O'rdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "watered", form_focus: "water_noun_verb", why_prompt: "'Water' — ism ham, fe'l ham!", explanation_uz: "'Water' = ism (suv) va fe'l (sug'ormoq). 'I drank water' = Men suv ichdim. 'I watered the plants' = Men o'simliklarni sug'ordim.", mini_rule: "water (noun = suv; verb = sug'ormoq)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I watered the fields.", uz: "Men dalalarni sug'ordim.", is_anchor: true, anchor_sentence: "I watered the fields.", source_dialogue: "U05_L03_D01", source_line: 5, speaker: "Nigora" },
                            { en: "She watered the plants in the morning.", uz: "U ertalab o'simliklarni sug'ordi.", example_2: "t" },
                            { en: "My father watered the vegetables every day because he loves gardening.", uz: "Mening otam har kuni sabzavotlarni sug'ordi chunki u bog'dorchilikni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'watered' ishlatib gap tuzing.", model_sentence: "I watered the garden yesterday.", hints: ["I watered ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Uyingizda nima sug'orasiz?", model_frame: "I watered ___ yesterday.", flexibleCheck: true, tags: ["past", "garden"] }
                    ]
                },
                // ── CARD 24: harvested ──────────────────────────────────
                {
                    id: "V_U05_L03_harvested",
                    en: "harvested",
                    uz: "yig'ib oldi (harvest → harvested)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "agriculture",
                    introduced_in: "U05_L03",
                    image: "/assets/images/unit05/harvested.jpg",
                    dialogue_ref: { dialogue_id: "U05_L03_D01", line_index: 7, speaker: "Nigora", bubble_text: "On Saturday I went to the museum!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ekmadingmi?", audio: "/assets/audio/unit05/harvested.mp3", uz_mirror_answer: "To'g'ri, men ekmadim. Men yig'ib oldim!", hybrid_answer: "To'g'ri, men kecha **harvested**. Men yig'ib oldim!", en_canonical: "Right, I harvested!", syntax_scaffold: { en_structure: "I harvested wheat.", uz_gloss: "Men bug'doyni yig'ib oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "harvested", role: "past_regular_verb", color: "green" }, { word: "wheat", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'harvested' nima?", choices: [{ text: "Yig'ib oldi (hosilni)", correct: true }, { text: "Ekdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "harvested", form_focus: "harvest_season", why_prompt: "'Harvest' — qachon?", explanation_uz: "'Harvest' = hosil yig'ish, kuzda bo'ladi. 'Harvest' = ism (hosil, yig'im-terim) va fe'l (yig'ib olmoq). O'zbekistonda paxtani 'harvest' qilishadi.", mini_rule: "harvest = verb (to gather crops) or noun (the crop collection)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I harvested wheat.", uz: "Men bug'doyni yig'ib oldim.", is_anchor: true, anchor_sentence: "I harvested wheat.", source_dialogue: "U05_L03_D01", source_line: 7, speaker: "Nigora" },
                            { en: "He harvested crops at the farm.", uz: "U fermada hosilni yig'ib oldi.", example_2: "t" },
                            { en: "My family harvested vegetables last week because we work on a farm.", uz: "Mening oilam o'tgan hafta sabzavotlarni yig'ib oldi chunki biz fermada ishlaymiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'harvested' ishlatib gap tuzing.", model_sentence: "We harvested vegetables last week.", hints: ["We harvested ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oilangiz nimani yig'ib oladi?", model_frame: "My family harvested ___ last ___.", flexibleCheck: true, tags: ["past", "agriculture"] }
                    ]
                }
            ]
        },

        "U05_L04": {
            lesson_id: "U05_L04",
            title: "Complex Past Activities",
            flow_model: "sandwich",
            mastery_dialogue_id: "U05_L03_D01_1",
            items: [
                // ── CARD 25: climbed ────────────────────────────────────
                {
                    id: "V_U05_L04_climbed",
                    en: "climbed",
                    uz: "chiqdi (climb → climbed)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "movement",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/climbed.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 6, speaker: "Feruza", bubble_text: "I went to the museum on Thursday!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha pastga tushdingmi?", audio: "/assets/audio/unit05/climbed.mp3", uz_mirror_answer: "Yo'q, men pastga tushmadim. Men tog'ga chiqdim!", hybrid_answer: "Yo'q, men kecha tog'ga **climbed**!", en_canonical: "No, I climbed the mountain!", syntax_scaffold: { en_structure: "I climbed the mountain.", uz_gloss: "Men tog'ga chiqdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "climbed", role: "past_regular_verb", color: "green" }, { word: "the mountain", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'climbed' = ?", choices: [{ text: "Tepaga chiqdi", correct: true }, { text: "Pastga tushdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "climbed", form_focus: "silent_b", why_prompt: "'Climbed' dagi 'b' — jim harf!", explanation_uz: "'Climb' so'zidagi 'b' talaffuz qilinmaydi: /klaɪm/. 'Climbed' = /klaɪmd/. Boshqa jim harfli so'zlar: 'bomb' /bɒm/, 'lamb' /læm/.", mini_rule: "climb = /klaɪm/ — silent 'b' (also: bomb, lamb, thumb)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I climbed the mountain.", uz: "Men tog'ga chiqdim.", is_anchor: true, anchor_sentence: "I climbed the mountain.", source_dialogue: "U05_L04_D01", source_line: 6, speaker: "Feruza" },
                            { en: "She climbed the stairs yesterday.", uz: "U kecha zinapoyaga chiqdi.", example_2: "t" },
                            { en: "We climbed to the top and we were very tired.", uz: "Biz tepaga chiqdik va juda charchagan edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'climbed' ishlatib gap tuzing.", model_sentence: "I climbed the stairs yesterday.", hints: ["I climbed ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimaga chiqdingiz?", model_frame: "I climbed ___ yesterday.", flexibleCheck: true, tags: ["past", "adventure"] }
                    ]
                },
                // ── CARD 26: crossed ────────────────────────────────────
                {
                    id: "V_U05_L04_crossed",
                    en: "crossed",
                    uz: "o'tdi (cross → crossed)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "movement",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/crossed.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 6, speaker: "Feruza", bubble_text: "I went to the museum." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha daryodan o'tmadingmi?", audio: "/assets/audio/unit05/crossed.mp3", uz_mirror_answer: "Yo'q, men bu tarafda qolmadim. Men daryodan o'tdim!", hybrid_answer: "Yo'q, men kecha daryodan **crossed**!", en_canonical: "No, I crossed the river!", syntax_scaffold: { en_structure: "I crossed the river.", uz_gloss: "Men daryodan o'tdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "crossed", role: "past_regular_verb", color: "green" }, { word: "the river", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'crossed' nima?", choices: [{ text: "O'tdi (bir tarafdan ikkinchisiga)", correct: true }, { text: "Qoldi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "crossed", form_focus: "cross_the_road", why_prompt: "'Cross the road' — muhim ibora!", explanation_uz: "'Cross' = o'tmoq, kesib o'tmoq. 'Cross the road' = ko'chadan o'tmoq. Bolalarni o'rgatishadi: 'Look left, look right, then cross the road.' Xavfsizlik!", mini_rule: "cross = go from one side to the other (cross the road/river/bridge)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I crossed the river.", uz: "Men daryodan o'tdim.", is_anchor: true, anchor_sentence: "I crossed the river.", source_dialogue: "U05_L04_D01", source_line: 6, speaker: "Feruza" },
                            { en: "He crossed the street carefully.", uz: "U ko'chadan ehtiyotkorlik bilan o'tdi.", example_2: "t" },
                            { en: "My family crossed the bridge yesterday when we visited the museum.", uz: "Mening oilam kecha ko'prikdan o'tdi muzeyga borganimizda.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'crossed' ishlatib gap tuzing.", model_sentence: "I crossed the road carefully.", hints: ["I crossed ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nimadan o'tdingiz?", model_frame: "I crossed ___ yesterday.", flexibleCheck: true, tags: ["past", "movement"] }
                    ]
                },
                // ── CARD 27: opened ─────────────────────────────────────
                {
                    id: "V_U05_L04_opened",
                    en: "opened",
                    uz: "ochdi (open → opened)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "action",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/opened.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 1, speaker: "Jasur", bubble_text: "What did you do?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha eshikni yopdingmi?", audio: "/assets/audio/unit05/opened.mp3", uz_mirror_answer: "Yo'q, men yopmadim. Men ochdim!", hybrid_answer: "Yo'q, men kecha eshikni **opened**!", en_canonical: "No, I opened the door!", syntax_scaffold: { en_structure: "I opened the door.", uz_gloss: "Men eshikni ochdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "opened", role: "past_regular_verb", color: "green" }, { word: "the door", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'opened' ning aksi nima?", choices: [{ text: "closed", correct: true }, { text: "locked", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "opened", form_focus: "open_close_pair", why_prompt: "'Open' va 'close' — qarama-qarshi juftlik.", explanation_uz: "'Open ↔ close', 'start ↔ stop/finish', 'arrive ↔ leave'. Qarama-qarshi fe'llarni juftlik qilib o'rganish oson.", mini_rule: "open ↔ close, start ↔ finish, arrive ↔ leave" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I opened the door.", uz: "Men eshikni ochdim.", is_anchor: true, anchor_sentence: "I opened the door.", source_dialogue: "U05_L04_D01", source_line: 1, speaker: "Jasur" },
                            { en: "She opened the window in the morning.", uz: "U ertalab derazani ochdi.", example_2: "t" },
                            { en: "My mother opened her purse because she wanted money.", uz: "Mening onam hamyonini ochdi chunki unga pul kerak edi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'opened' ishlatib gap tuzing.", model_sentence: "I opened the window yesterday.", hints: ["I opened ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nimani ochdingiz?", model_frame: "I opened ___ yesterday.", flexibleCheck: true, tags: ["past", "daily"] }
                    ]
                },
                // ── CARD 28: received ───────────────────────────────────
                {
                    id: "V_U05_L04_received",
                    en: "received",
                    uz: "oldi (receive → received)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "communication",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/received.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 7, speaker: "Jasur", bubble_text: "Now it's time to rest!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa yubormadingmi?", audio: "/assets/audio/unit05/received.mp3", uz_mirror_answer: "Yo'q, men yubormadim. Men xat oldim!", hybrid_answer: "Yo'q, men kecha xat **received**!", en_canonical: "No, I received a letter!", syntax_scaffold: { en_structure: "I received a letter.", uz_gloss: "Men xat oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "received", role: "past_regular_verb", color: "green" }, { word: "a letter", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'received' nima?", choices: [{ text: "Oldi (qabul qildi)", correct: true }, { text: "Yubordi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "received", form_focus: "ie_rule", why_prompt: "'receive' = 'ei' — imlo qoidasi!", explanation_uz: "'i before e, except after c' qoidasi: receive, ceiling, receipt — 'c' dan keyin 'ei'. Believe, friend — 'c' siz 'ie'.", mini_rule: "i before e, except after c: receive, ceiling (but: believe, friend)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I received a letter.", uz: "Men xat oldim.", is_anchor: true, anchor_sentence: "I received a letter.", source_dialogue: "U05_L04_D01", source_line: 7, speaker: "Jasur" },
                            { en: "He received a present for his birthday.", uz: "U tug'ilgan kunida sovg'a oldi.", example_2: "t" },
                            { en: "My sister received a book yesterday and she was very happy.", uz: "Mening singlim kecha kitob oldi va u juda xursand edi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'received' ishlatib gap tuzing.", model_sentence: "I received a gift yesterday.", hints: ["I received ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oxirgi marta nima oldingiz?", model_frame: "I received ___ last ___.", flexibleCheck: true, tags: ["past", "receiving"] }
                    ]
                },
                // ── CARD 29: painted ────────────────────────────────────
                {
                    id: "V_U05_L04_painted",
                    en: "painted",
                    uz: "bo'yadi (paint → painted)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "creative",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/painted.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 2, speaker: "Feruza", bubble_text: "Then I helped at home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha faqat dam oldingmi?", audio: "/assets/audio/unit05/painted.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men shiftni bo'yadim!", hybrid_answer: "Yo'q, men kecha shiftni **painted**!", en_canonical: "No, I painted the ceiling!", syntax_scaffold: { en_structure: "I painted the ceiling.", uz_gloss: "Men shiftni bo'yadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "painted", role: "past_regular_verb", color: "green" }, { word: "the ceiling", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'painted' nima?", choices: [{ text: "Bo'yadi / rasm chizdi", correct: true }, { text: "Yuvdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "painted", form_focus: "paint_two_meanings", why_prompt: "'Paint' — ikki ma'no!", explanation_uz: "'Paint' = 1) bo'yamoq (paint a wall / a room) 2) rasm chizmoq (paint a picture). 'Painter' = rassom YOKI bo'yoqchi.", mini_rule: "paint = color a surface (wall) OR create art (picture)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I painted the ceiling.", uz: "Men shiftni bo'yadim.", is_anchor: true, anchor_sentence: "I painted the ceiling.", source_dialogue: "U05_L04_D01", source_line: 2, speaker: "Feruza" },
                            { en: "She painted pictures all day.", uz: "U butun kun rasmlar chizdi.", example_2: "t" },
                            { en: "My brother painted his room yesterday because he loves blue.", uz: "Mening akam kecha xonasini bo'yadi chunki u ko'k rangni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'painted' ishlatib gap tuzing.", model_sentence: "I painted the wall yesterday.", hints: ["I painted ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima bo'yaganingiz yoki chizganingiz bor?", model_frame: "I painted ___ last ___.", flexibleCheck: true, tags: ["past", "creative"] }
                    ]
                },
                // ── CARD 30: recorded ───────────────────────────────────
                {
                    id: "V_U05_L04_recorded",
                    en: "recorded",
                    uz: "yozib oldi (record → recorded)",
                    pos: "verb",
                    type: "past_regular",
                    priority: 3,
                    category: "media",
                    introduced_in: "U05_L04",
                    image: "/assets/images/unit05/recorded.jpg",
                    dialogue_ref: { dialogue_id: "U05_L04_D01", line_index: 7, speaker: "Jasur", bubble_text: "We'll rest on the weekend!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha jonli konsert qildingmi?", audio: "/assets/audio/unit05/recorded.mp3", uz_mirror_answer: "Yo'q, men jonli ijro etmadim. Men albom yozib oldim!", hybrid_answer: "Yo'q, men kecha albom **recorded**!", en_canonical: "No, I recorded an album!", syntax_scaffold: { en_structure: "She recorded an album.", uz_gloss: "U albom yozib oldi.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "recorded", role: "past_regular_verb", color: "green" }, { word: "an album", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'recorded' nima?", choices: [{ text: "Yozib oldi", correct: true }, { text: "O'chirdi", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "recorded", form_focus: "record_stress", why_prompt: "'Record' — urg'u o'zgaradi!", explanation_uz: "'REcord' (urg'u 1-bo'g'inda) = ism (yozuv). 'reCORD' (urg'u 2-bo'g'inda) = fe'l (yozib olmoq). Urg'u o'rnini o'zgartirsa, ma'no o'zgaradi!", mini_rule: "REcord = noun (a recording); reCORD = verb (to make a recording)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "She recorded an album.", uz: "U albom yozib oldi.", is_anchor: true, anchor_sentence: "She recorded an album.", source_dialogue: "U05_L04_D01", source_line: 7, speaker: "Jasur" },
                            { en: "He recorded a video last week.", uz: "U o'tgan hafta video yozib oldi.", example_2: "t" },
                            { en: "My favorite singer recorded a new song and I love it!", uz: "Mening sevimli qo'shiqchim yangi qo'shiq yozib oldi va men uni yaxshi ko'raman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'recorded' ishlatib gap tuzing.", model_sentence: "I recorded a video yesterday.", hints: ["I recorded ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima yozib olgansiz?", model_frame: "I recorded ___ last ___.", flexibleCheck: true, tags: ["past", "media"] }
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
    Object.freeze(window.VOCAB_CARDS_U05);
}
