/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 07: Irregular Past Actions (4 Lessons, 4+2 Act)
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

window.VOCAB_CARDS_U07 = {
    unit_id: "U07",
    unit_title: "Irregular Past Actions",
    scalability_level: "A1",
    grammar_focus: "Irregular Past Verbs: complete stem change (go→went, see→saw, etc.), didn't + base verb, Did you + base verb?",

    // ═══════════════════════════════════════════════════════════════════════════
    // MISSION METADATA (3×2 Successive Mastery Cycle)
    // ═══════════════════════════════════════════════════════════════════════════
    mission: {
        mission_id: "U07_M01",
        flow_model: "sandwich",
        target_vocab: ["went", "saw", "took", "bought", "ate", "came", "had", "did", "rode", "lay", "stayed", "buy presents", "do water sports", "go sightseeing", "go camping", "go to the beach", "didn't go", "didn't see", "didn't buy", "didn't eat", "Did you go", "Did you see", "Did you buy", "Did you eat", "made", "got", "gave", "wrote", "read", "left"],
        stages: [
            {
                stage: 1,
                form: "affirmative",
                target_vocab: ["went", "saw", "took", "bought", "ate", "came", "had", "did"],
                dialogue_id: "U07_L01_D01",
                pressure_id: "U07_L01_D01_1",
                mirror_mode: true
            },
            {
                stage: 2,
                form: "negative",
                target_vocab: ["didn't go", "didn't see", "didn't buy", "didn't eat"],
                dialogue_id: "U07_L03_D03",
                pressure_id: "U07_L03_D03_1",
                mirror_mode: true
            },
            {
                stage: 3,
                form: "interrogative",
                target_vocab: ["Did you go", "Did you see", "Did you buy", "Did you eat", "made", "got", "gave", "wrote", "read", "left"],
                dialogue_id: "U07_L04_D04",
                pressure_id: "U07_L04_D04_1",
                mirror_mode: false
            }
        ],
        mastery_dialogue_id: "U07_L04_D04_1"
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
    // ═══════════════════════════════════════════════════════════════════════════
    contrastive_turns: [
        {
            stage: 1,
            focus: "regular_ed_vs_irregular_change",
            dialogue_id: "U07_L01_D01",
            speaker_a: { text: "I walked to school.", speaker: "Aziza" },
            speaker_b: { text: "I went to Italy!", speaker: "Bobur" },
            highlights: [
                {
                    blue: { text: "walked", type: "regular_past_ed" },
                    red: { text: "went", type: "irregular_past_change" }
                }
            ]
        },
        {
            stage: 2,
            focus: "past_irregular_vs_didnt_base",
            dialogue_id: "U07_L03_D03",
            speaker_a: { text: "I went to the museum.", speaker: "Shoira" },
            speaker_b: { text: "I didn't go to the museum.", speaker: "Timur" },
            highlights: [
                {
                    blue: { text: "went", type: "irregular_past_affirm" },
                    red: { text: "didn't go", type: "negative_base_form" }
                }
            ]
        },
        {
            stage: 3,
            focus: "statement_vs_did_base_question",
            dialogue_id: "U07_L04_D04",
            speaker_a: { text: "I went to London.", speaker: "Jamshid" },
            speaker_b: { text: "Did you go to London?", speaker: "Gulnora" },
            highlights: [
                {
                    blue: { text: "went", type: "irregular_past_statement" },
                    red: { text: "Did you go", type: "did_base_question" }
                }
            ]
        }
    ],

    dialogues: {
        "U07_L01_D01": {
            id: "U07_L01_D01",
            title: "Vacation Talk",
            lines: [
                { speaker: "Aziza", line: "Hi Bobur! Where were you in summer?", line_uz: "Salom Bobur! Yozda qayerda edingiz?", target: ["were"], mastery_key: "U07_L01_D01_0" },
                { speaker: "Bobur", line: "Hi Aziza! I went to Italy! How about you?", line_uz: "Salom Aziza! Men Italiaga bordim! Sen-chi?", target: ["went"], mastery_key: "U07_L01_D01_1" },
                { speaker: "Aziza", line: "Wonderful! I went to London. I saw many things!", line_uz: "Ajoyib! Men Londonga bordim. Ko'p narsalarni ko'rdim!", target: ["went", "saw"], mastery_key: "U07_L01_D01_2" },
                { speaker: "Bobur", line: "What did you do? Did you go to a museum?", line_uz: "Nima qilding? Muzeyga bordingmi?", target: ["did", "Did", "go"], mastery_key: "U07_L01_D01_3" },
                { speaker: "Aziza", line: "Yes, I went to a museum and took many photos.", line_uz: "Ha, men muzeyga bordim va juda ko'p fotosuratlar oldim.", target: ["went", "took"], mastery_key: "U07_L01_D01_4" },
                { speaker: "Bobur", line: "Me too! I was at the beach and went swimming.", line_uz: "Men ham! Men sohilda edim va suzish qildim.", target: ["was"], mastery_key: "U07_L01_D01_5" },
                { speaker: "Aziza", line: "I stayed at a hotel. It was very good!", line_uz: "Men mehmonxonada qoldim. Juda yaxshi edi!", target: ["stayed", "was"], mastery_key: "U07_L01_D01_6" },
                { speaker: "Bobur", line: "Next summer we'll travel again!", line_uz: "Keyingi yozda yana sayohat qilamiz!", target: [], mastery_key: "U07_L01_D01_7" }
            ]
        },
        "U07_L02_D02": {
            id: "U07_L02_D02",
            title: "Beach Vacation",
            lines: [
                { speaker: "Madina", line: "Hi Rustam! Did you rest well at the beach?", line_uz: "Salom Rustam! Sohilda yaxshi dam oldingmi?", target: ["Did"], mastery_key: "U07_L02_D02_0" },
                { speaker: "Rustam", line: "Hi Madina! Yes, very well! I rode a bike.", line_uz: "Salom Madina! Ha, juda yaxshi! Men velosipedga mindim.", target: ["rode"], mastery_key: "U07_L02_D02_1" },
                { speaker: "Madina", line: "Wonderful! I lay on the beach and saw the sunset.", line_uz: "Ajoyib! Men sohilda yotdim va quyosh botishini ko'rdim.", target: ["lay", "saw"], mastery_key: "U07_L02_D02_2" },
                { speaker: "Rustam", line: "Me too! I did water sports.", line_uz: "Men ham! Men suv sportlarini qildim.", target: ["did"], mastery_key: "U07_L02_D02_3" },
                { speaker: "Madina", line: "Did you stay at a hotel?", line_uz: "Mehmonxonada qoldingmi?", target: ["Did", "stay"], mastery_key: "U07_L02_D02_4" },
                { speaker: "Rustam", line: "Yes, I stayed at a hotel. It was very good!", line_uz: "Ha, men mehmonxonada qoldim. U juda yaxshi edi!", target: ["stayed", "was"], mastery_key: "U07_L02_D02_5" },
                { speaker: "Madina", line: "Me too! Did you buy presents?", line_uz: "Men ham! Sovg'alar sotib oldingmi?", target: ["Did", "buy"], mastery_key: "U07_L02_D02_6" },
                { speaker: "Rustam", line: "Yes, I bought presents for my family!", line_uz: "Ha, men oilam uchun sovg'alar sotib oldim!", target: ["bought"], mastery_key: "U07_L02_D02_7" }
            ]
        },
        "U07_L03_D03": {
            id: "U07_L03_D03",
            title: "Weekend Plans Gone Wrong",
            lines: [
                { speaker: "Shoira", line: "Hi Timur! Did you go to the museum on the weekend?", line_uz: "Salom Timur! Hafta oxiri muzeyga bordingmi?", target: ["Did", "go"], mastery_key: "U07_L03_D03_0" },
                { speaker: "Timur", line: "No, I didn't go to the museum. I stayed at home.", line_uz: "Yo'q, men muzeyga bormadim. Men uyda qoldim.", target: ["didn't go", "stayed"], mastery_key: "U07_L03_D03_1" },
                { speaker: "Shoira", line: "Why? Were you sick?", line_uz: "Nima uchun? Kasal edingizmi?", target: ["Were"], mastery_key: "U07_L03_D03_2" },
                { speaker: "Timur", line: "Yes, I was a bit sick. Did you go to the museum?", line_uz: "Ha, biroz kasal edim. Sen muzeyga bordingmi?", target: ["was", "Did", "go"], mastery_key: "U07_L03_D03_3" },
                { speaker: "Shoira", line: "No, I didn't go either. I visited my friend.", line_uz: "Yo'q, men ham bormadim. Men do'stimni ziyorat qildim.", target: ["didn't go"], mastery_key: "U07_L03_D03_4" },
                { speaker: "Timur", line: "Was it interesting?", line_uz: "Qiziqarli edimi?", target: ["Was"], mastery_key: "U07_L03_D03_5" },
                { speaker: "Shoira", line: "Yes, it was very interesting! We talked a lot and ate food.", line_uz: "Ha, juda qiziqarli edi! Biz ko'p gaplashdik va ovqat yedik.", target: ["was", "ate"], mastery_key: "U07_L03_D03_6" },
                { speaker: "Timur", line: "Wonderful! Next week I'll go to the museum with you!", line_uz: "Ajoyib! Keyingi hafta siz bilan muzeyga boraman!", target: [], mastery_key: "U07_L03_D03_7" }
            ]
        },
        "U07_L04_D04": {
            id: "U07_L04_D04",
            title: "Last Summer Memories",
            lines: [
                { speaker: "Gulnora", line: "Hi Jamshid! What was the best day last summer?", line_uz: "Salom Jamshid! O'tgan yozda eng yaxshi kun qaysi edi?", target: ["was"], mastery_key: "U07_L04_D04_0" },
                { speaker: "Jamshid", line: "Hi Gulnora! When I went to London! How about you?", line_uz: "Salom Gulnora! Men Londonga borganimda! Sen-chi?", target: ["went"], mastery_key: "U07_L04_D04_1" },
                { speaker: "Gulnora", line: "When I lay by the lake in Italy!", line_uz: "Men Italiyadagi ko'l oldida yotganimda!", target: ["lay"], mastery_key: "U07_L04_D04_2" },
                { speaker: "Jamshid", line: "Wonderful! In London I saw many things and took photos.", line_uz: "Ajoyib! Londonda men ko'p narsalarni ko'rdim va fotosuratlar oldim.", target: ["saw", "took"], mastery_key: "U07_L04_D04_3" },
                { speaker: "Gulnora", line: "Me too! I went to a museum and bought presents.", line_uz: "Men ham! Men muzeyga bordim va sovg'alar sotib oldim.", target: ["went", "bought"], mastery_key: "U07_L04_D04_4" },
                { speaker: "Jamshid", line: "Interesting! I rode in a taxi and saw the city.", line_uz: "Qiziqarli edi! Men taksiga mindim va shaharni ko'rib chiqdim.", target: ["rode", "saw"], mastery_key: "U07_L04_D04_5" },
                { speaker: "Gulnora", line: "I rode a bike and climbed a mountain!", line_uz: "Men velosipedga mindim va tog'ga chiqdim!", target: ["rode"], mastery_key: "U07_L04_D04_6" },
                { speaker: "Jamshid", line: "Next summer we'll travel again!", line_uz: "Keyingi yoz yana sayohat qilamiz!", target: [], mastery_key: "U07_L04_D04_7" }
            ]
        },
        "U07_L01_D05": {
            id: "U07_L01_D05",
            title: "After School Activities",
            lines: [
                { speaker: "Nilufar", line: "What did you do after school yesterday?", line_uz: "Kecha maktabdan keyin nima qilding?", target: ["did", "do"], mastery_key: "U07_L01_D05_0" },
                { speaker: "Sardor", line: "I went to the park and had a great time.", line_uz: "Men parkga bordim va ajoyib vaqt o'tkazdim.", target: ["went", "had"], mastery_key: "U07_L01_D05_1" },
                { speaker: "Nilufar", line: "Nice! I came home and ate lunch.", line_uz: "Yaxshi! Men uyga keldim va tushlik yedim.", target: ["came", "ate"], mastery_key: "U07_L01_D05_2" },
                { speaker: "Sardor", line: "I saw my friends at the park. We took photos.", line_uz: "Men parkda do'stlarimni ko'rdim. Biz suratlarga tushdik.", target: ["saw", "took"], mastery_key: "U07_L01_D05_3" }
            ]
        },
        "U07_L03_D06": {
            id: "U07_L03_D06",
            title: "What Happened Yesterday?",
            lines: [
                { speaker: "Dilnoza", line: "Did you go to the concert yesterday?", line_uz: "Kecha konsertga bordingmi?", target: ["Did", "go"], mastery_key: "U07_L03_D06_0" },
                { speaker: "Farhod", line: "No, I didn't go. I didn't buy tickets.", line_uz: "Yo'q, men bormadim. Chipta sotib olmadim.", target: ["didn't go", "didn't buy"], mastery_key: "U07_L03_D06_1" },
                { speaker: "Dilnoza", line: "Did you see the movie then?", line_uz: "Unda filmni ko'rdingmi?", target: ["Did", "see"], mastery_key: "U07_L03_D06_2" },
                { speaker: "Farhod", line: "No, I didn't see the movie. I didn't eat dinner either!", line_uz: "Yo'q, filmni ko'rmadim. Kechki ovqat ham yemadim!", target: ["didn't see", "didn't eat"], mastery_key: "U07_L03_D06_3" }
            ]
        }
    },

    lessons: {
        "U07_L01": {
            lesson_id: "U07_L01",
            title: "Common Irregular Past Verbs",
            flow_model: "sandwich",
            mastery_dialogue_id: "U07_L04_D04_1",
            items: [
                {
                    id: "V_U07_L01_went",
                    en: "went",
                    uz: "bordi (go → went)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/went.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D01", line_index: 1, speaker: "Bobur", bubble_text: "I went to Italy!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uyda qoldingmi? Hech qaerga chiqmasdingmi?", audio: "/assets/audio/unit07/went.mp3", uz_mirror_answer: "Yo'q, men uyda qolmadim. Men bog'ga bordim!", hybrid_answer: "No, I **went** to the park yesterday.", en_canonical: "I went to the park.", syntax_scaffold: { en_structure: "I went to Italy.", uz_gloss: "Men Italiaga bordim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "went", role: "irregular_past", color: "green" }, { word: "to Italy", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Go' ning o'tmish shakli qaysi?", choices: [{ text: "went", correct: true }, { text: "goed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "went", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'goed' emas, 'went'?", explanation_uz: "'Go' — noto'g'ri fe'l. O'tmishda '-ed' qo'shilmaydi, butunlay o'zgaradi: go → went. Buni yodlash kerak!", mini_rule: "go → went (NO -ed! Complete change)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I went to Italy!", uz: "Men Italiaga bordim!", is_anchor: true, anchor_sentence: "I went to Italy!", source_dialogue: "U07_L01_D01", source_line: 1, speaker: "Bobur" },
                            { en: "She went to school yesterday.", uz: "U kecha maktabga bordi.", example_2: "t" },
                            { en: "My family went to the museum last week and we were very happy.", uz: "Mening oilam o'tgan hafta muzeyga bordi va biz juda xursand edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'went' ishlatib gap tuzing.", model_sentence: "I went to the park yesterday.", hints: ["I went to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha qayerga bordingiz?", model_frame: "I went to ___.", flexibleCheck: true, tags: ["past", "movement"] }
                    ]
                },
                {
                    id: "V_U07_L01_saw",
                    en: "saw",
                    uz: "ko'rdi (see → saw)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/saw.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D01", line_index: 2, speaker: "Aziza", bubble_text: "I saw many things!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa eshitmadingmi? Faqat eshitdingmi?", audio: "/assets/audio/unit07/saw.mp3", uz_mirror_answer: "Yo'q, men eshitmadim. Men ko'rdim!", hybrid_answer: "No, I **saw** many things yesterday.", en_canonical: "I saw many things.", syntax_scaffold: { en_structure: "I saw many things.", uz_gloss: "Men ko'p narsalarni ko'rdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "saw", role: "irregular_past", color: "green" }, { word: "many things", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'See' ning o'tmish shakli qaysi?", choices: [{ text: "saw", correct: true }, { text: "seed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "saw", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'seed' emas, 'saw'?", explanation_uz: "'See' — noto'g'ri fe'l: see → saw. '-ed' qo'shilmaydi. 'Seed' = urug' (boshqa so'z!). Yodlang: see → saw.", mini_rule: "see → saw (NOT seed! seed = urug')" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I saw many things!", uz: "Men ko'p narsalarni ko'rdim!", is_anchor: true, anchor_sentence: "I saw many things!", source_dialogue: "U07_L01_D01", source_line: 2, speaker: "Aziza" },
                            { en: "He saw a movie last night.", uz: "U kecha kechasi film ko'rdi.", example_2: "t" },
                            { en: "We saw a concert yesterday and we loved the music.", uz: "Biz kecha konsert ko'rdik va bizga musiqa juda yoqdi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'saw' ishlatib gap tuzing.", model_sentence: "I saw a movie yesterday.", hints: ["I saw ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nimani ko'rdingiz?", model_frame: "I saw ___.", flexibleCheck: true, tags: ["past", "perception"] }
                    ]
                },
                {
                    id: "V_U07_L01_took",
                    en: "took",
                    uz: "oldi (take → took)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/took.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D01", line_index: 4, speaker: "Aziza", bubble_text: "I took many photos." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha fotosuratlar bermadingmi? Hech narsani olmasdingmi?", audio: "/assets/audio/unit07/took.mp3", uz_mirror_answer: "Yo'q, men bermadim. Men juda ko'p fotosuratlar oldim!", hybrid_answer: "No, I **took** many photos yesterday.", en_canonical: "I took many photos.", syntax_scaffold: { en_structure: "I took many photos.", uz_gloss: "Men juda ko'p fotosuratlar oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "took", role: "irregular_past", color: "green" }, { word: "many photos", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Take' ning o'tmish shakli qaysi?", choices: [{ text: "took", correct: true }, { text: "taked", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "took", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'taked' emas, 'took'?", explanation_uz: "'Take' — noto'g'ri fe'l: take → took. Unli o'zgaradi: a → oo. 'Take a photo' → 'Took a photo'.", mini_rule: "take → took (vowel change: a → oo)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I took many photos.", uz: "Men juda ko'p fotosuratlar oldim.", is_anchor: true, anchor_sentence: "I took many photos.", source_dialogue: "U07_L01_D01", source_line: 4, speaker: "Aziza" },
                            { en: "She took a taxi yesterday.", uz: "U kecha taksi oldi.", example_2: "t" },
                            { en: "My brother took pictures at the party because he loves photography.", uz: "Mening akam bazmda rasmlar oldi chunki u fotografiyani yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'took' ishlatib gap tuzing.", model_sentence: "She took a taxi yesterday.", hints: ["___ took ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima oldingiz?", model_frame: "I took ___.", flexibleCheck: true, tags: ["past", "action"] }
                    ]
                },
                {
                    id: "V_U07_L01_bought",
                    en: "bought",
                    uz: "sotib oldi (buy → bought)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/bought.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 4, speaker: "Gulnora", bubble_text: "I bought presents." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha sovg'a sotdingmi? Narsalarni berdingmi?", audio: "/assets/audio/unit07/bought.mp3", uz_mirror_answer: "Yo'q, men sotmadim. Men sovg'a sotib oldim!", hybrid_answer: "No, I **bought** presents yesterday.", en_canonical: "I bought presents.", syntax_scaffold: { en_structure: "I bought presents.", uz_gloss: "Men sovg'alar sotib oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "bought", role: "irregular_past", color: "green" }, { word: "presents", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Buy' ning o'tmish shakli qaysi?", choices: [{ text: "bought", correct: true }, { text: "buyed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "bought", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'buyed' emas, 'bought'?", explanation_uz: "'Buy' — noto'g'ri fe'l: buy → bought. Butunlay o'zgaradi. '-ght' bilan tugaydi (caught, thought kabi). Yodlang!", mini_rule: "buy → bought (complete change, -ght ending)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I bought presents.", uz: "Men sovg'alar sotib oldim.", is_anchor: true, anchor_sentence: "I bought presents.", source_dialogue: "U07_L04_D04", source_line: 4, speaker: "Gulnora" },
                            { en: "He bought a new shirt last week.", uz: "U o'tgan hafta yangi ko'ylak sotib oldi.", example_2: "t" },
                            { en: "My mother bought cheese and biscuits at the shop yesterday.", uz: "Mening onam kecha do'konda pishloq va pechenye sotib oldi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'bought' ishlatib gap tuzing.", model_sentence: "He bought a new shirt last week.", hints: ["___ bought ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Oxirgi marta nima sotib oldingiz?", model_frame: "I bought ___.", flexibleCheck: true, tags: ["past", "shopping"] }
                    ]
                },
                {
                    id: "V_U07_L01_ate",
                    en: "ate",
                    uz: "yedi (eat → ate)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/ate.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D03", line_index: 6, speaker: "Shoira", bubble_text: "We ate food." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ichdinimi? Faqat suyuqlik ichgandingmi?", audio: "/assets/audio/unit07/ate.mp3", uz_mirror_answer: "Yo'q, men faqat ichmadim. Men ovqat yedim!", hybrid_answer: "No, I **ate** breakfast yesterday.", en_canonical: "I ate breakfast.", syntax_scaffold: { en_structure: "I ate breakfast.", uz_gloss: "Men nonushta yedim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "ate", role: "irregular_past", color: "green" }, { word: "breakfast", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Eat' ning o'tmish shakli qaysi?", choices: [{ text: "ate", correct: true }, { text: "eated", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "ate", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'eated' emas, 'ate'?", explanation_uz: "'Eat' — noto'g'ri fe'l: eat → ate. Talaffuzga e'tibor: 'ate' = /eɪt/ (eight bilan bir xil!). Yodlang: eat → ate.", mini_rule: "eat → ate (sounds like 'eight'!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "We ate food.", uz: "Biz ovqat yedik.", is_anchor: true, anchor_sentence: "We ate food.", source_dialogue: "U07_L03_D03", source_line: 6, speaker: "Shoira" },
                            { en: "She ate lunch at school.", uz: "U maktabda tushlik yedi.", example_2: "t" },
                            { en: "We ate pizza yesterday because we love it.", uz: "Biz kecha pitsa yedik chunki biz uni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'ate' ishlatib gap tuzing.", model_sentence: "She ate lunch at school.", hints: ["___ ate ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima yedingiz?", model_frame: "I ate ___.", flexibleCheck: true, tags: ["past", "food"] }
                    ]
                },
                {
                    id: "V_U07_L01_came",
                    en: "came",
                    uz: "keldi (come → came)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/came.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D05", line_index: 2, speaker: "Nilufar", bubble_text: "I came home." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ketdingmi? Chiqib ketdingmi?", audio: "/assets/audio/unit07/came.mp3", uz_mirror_answer: "Yo'q, men ketmadim. Men keldim!", hybrid_answer: "No, I **came** home yesterday.", en_canonical: "I came home.", syntax_scaffold: { en_structure: "He came home late.", uz_gloss: "U uyga kech keldi.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "came", role: "irregular_past", color: "green" }, { word: "home", role: "destination", color: "purple" }, { word: "late", role: "time_adverb", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'Come' ning o'tmish shakli qaysi?", choices: [{ text: "came", correct: true }, { text: "comed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "came", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'comed' emas, 'came'?", explanation_uz: "'Come' — noto'g'ri fe'l: come → came. Unli o'zgaradi: o → a. 'Came home' = uyga keldi.", mini_rule: "come → came (vowel change: o → a)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I came home and ate lunch.", uz: "Men uyga keldim va tushlik yedim.", is_anchor: true, anchor_sentence: "I came home and ate lunch.", source_dialogue: "U07_L01_D05", source_line: 2, speaker: "Nilufar" },
                            { en: "She came to school at eight o'clock.", uz: "U maktabga soat sakkizda keldi.", example_2: "t" },
                            { en: "My friends came to my party and we were very happy.", uz: "Mening do'stlarim bazmimga keldilar va biz juda xursand edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'came' ishlatib gap tuzing.", model_sentence: "She came to school at eight.", hints: ["___ came to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kim sizga keldi?", model_frame: "___ came to ___.", flexibleCheck: true, tags: ["past", "arrival"] }
                    ]
                },
                {
                    id: "V_U07_L01_had",
                    en: "had",
                    uz: "ega edi / qildi (have → had)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/had.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D05", line_index: 1, speaker: "Sardor", bubble_text: "I had a great time." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa yemadingmi? Och edingmi?", audio: "/assets/audio/unit07/had.mp3", uz_mirror_answer: "Yo'q, men yedim. Men nonushta qildim!", hybrid_answer: "No, I **had** a good breakfast.", en_canonical: "I had a good breakfast.", syntax_scaffold: { en_structure: "I had a good breakfast.", uz_gloss: "Men yaxshi nonushta qildim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "had", role: "irregular_past", color: "green" }, { word: "a good breakfast", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Have' ning o'tmish shakli qaysi?", choices: [{ text: "had", correct: true }, { text: "haved", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "had", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'haved' emas, 'had'?", explanation_uz: "'Have' — noto'g'ri fe'l: have → had. Qisqa va oddiy o'zgarish. 'Had breakfast' = nonushta qildi. 'Had a great time' = ajoyib vaqt o'tkazdi.", mini_rule: "have → had (short change, very common)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I had a great time.", uz: "Men ajoyib vaqt o'tkazdim.", is_anchor: true, anchor_sentence: "I had a great time.", source_dialogue: "U07_L01_D05", source_line: 1, speaker: "Sardor" },
                            { en: "He had lunch at the cafeteria.", uz: "U kafeteryada tushlik qildi.", example_2: "t" },
                            { en: "We had a great time at the museum yesterday.", uz: "Biz kecha muzeyda ajoyib vaqt o'tkazdik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'had' ishlatib gap tuzing.", model_sentence: "We had a great time yesterday.", hints: ["___ had ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qachon ajoyib vaqt o'tkazdingiz?", model_frame: "I had a great time at ___.", flexibleCheck: true, tags: ["past", "experience"] }
                    ]
                },
                {
                    id: "V_U07_L01_did",
                    en: "did",
                    uz: "qildi (do → did)",
                    pos: "verb",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L01",
                    image: "/assets/images/unit07/did.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D01", line_index: 3, speaker: "Bobur", bubble_text: "What did you do?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha hech narsa qilmasdingmi? Dam oldingmi?", audio: "/assets/audio/unit07/did.mp3", uz_mirror_answer: "Yo'q, men dam olmadim. Men ko'p narsalarni qildim!", hybrid_answer: "No, I **did** many things yesterday.", en_canonical: "I did many things.", syntax_scaffold: { en_structure: "What did you do?", uz_gloss: "Nima qilding?", tokens: [{ word: "What", role: "question_word", color: "orange" }, { word: "did", role: "auxiliary_past", color: "green" }, { word: "you", role: "subject", color: "blue" }, { word: "do", role: "base_verb", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Do' ning o'tmish shakli qaysi?", choices: [{ text: "did", correct: true }, { text: "doed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "did", form_focus: "did_dual_role", why_prompt: "'Did' ikki vazifada ishlatiladi?", explanation_uz: "'Did' = 1) 'do' ning o'tmishi (I did homework). 2) Savol yordamchisi (Did you go?). Savollarda: Did + subject + BASE verb!", mini_rule: "did = past of 'do' AND question helper (Did you + BASE verb?)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "What did you do?", uz: "Nima qilding?", is_anchor: true, anchor_sentence: "What did you do?", source_dialogue: "U07_L01_D01", source_line: 3, speaker: "Bobur" },
                            { en: "She did her homework last night.", uz: "U kecha kechasi uy vazifasini qildi.", example_2: "t" },
                            { en: "My brother did athletics yesterday because he loves sports.", uz: "Mening akam kecha atletika qildi chunki u sportni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'did' ishlatib gap tuzing.", model_sentence: "What did you do yesterday?", hints: ["What did you ___?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kecha nima qildingiz?", model_frame: "I did ___.", flexibleCheck: true, tags: ["past", "action"] }
                    ]
                }
            ]
        },
        "U07_L02": {
            lesson_id: "U07_L02",
            title: "Travel & Vacation Irregular Verbs",
            flow_model: "sandwich",
            mastery_dialogue_id: "U07_L04_D04_1",
            items: [
                {
                    id: "V_U07_L02_rode",
                    en: "rode",
                    uz: "mindi (ride → rode)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/rode.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 1, speaker: "Rustam", bubble_text: "I rode a bike." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha yurdingmi? Piyoda bordingmi?", audio: "/assets/audio/unit07/rode.mp3", uz_mirror_answer: "Yo'q, men yurmadim. Men velosipedga mindim!", hybrid_answer: "No, I **rode** a bike yesterday.", en_canonical: "I rode a bike.", syntax_scaffold: { en_structure: "I rode a bike.", uz_gloss: "Men velosipedga mindim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "rode", role: "irregular_past", color: "green" }, { word: "a bike", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Ride' ning o'tmish shakli qaysi?", choices: [{ text: "rode", correct: true }, { text: "rided", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "rode", form_focus: "irregular_past_vowel", why_prompt: "Nega 'rided' emas, 'rode'?", explanation_uz: "'Ride' — noto'g'ri fe'l: ride → rode. Unli o'zgaradi: i → o. Drive → drove ham xuddi shunday!", mini_rule: "ride → rode (vowel change: i → o, like drive → drove)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I rode a bike.", uz: "Men velosipedga mindim.", is_anchor: true, anchor_sentence: "I rode a bike.", source_dialogue: "U07_L02_D02", source_line: 1, speaker: "Rustam" },
                            { en: "She rode a horse last week.", uz: "U o'tgan hafta otga mingan.", example_2: "t" },
                            { en: "My brother rode his bike to school every day.", uz: "Mening akam har kuni velosipedda maktabga boradi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'rode' ishlatib gap tuzing.", model_sentence: "She rode a horse last week.", hints: ["___ rode ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimaga mindingiz?", model_frame: "I rode ___.", flexibleCheck: true, tags: ["past", "transport"] }
                    ]
                },
                {
                    id: "V_U07_L02_lay",
                    en: "lay",
                    uz: "yotdi (lie → lay)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/lay.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 2, speaker: "Madina", bubble_text: "I lay on the beach." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha turdingmi? Butun kun o'tirib oldingmi?", audio: "/assets/audio/unit07/lay.mp3", uz_mirror_answer: "Yo'q, men turmadim. Men sohilda yotdim!", hybrid_answer: "No, I **lay** on the beach yesterday.", en_canonical: "I lay on the beach.", syntax_scaffold: { en_structure: "I lay on the beach.", uz_gloss: "Men sohilda yotdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "lay", role: "irregular_past", color: "green" }, { word: "on the beach", role: "location", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Lie' (yotmoq) ning o'tmish shakli qaysi?", choices: [{ text: "lay", correct: true }, { text: "lied", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "lay", form_focus: "lie_vs_lay", why_prompt: "'Lay' va 'lie' farqi nima?", explanation_uz: "'Lie' (yotmoq) → 'lay' (o'tmish). Ehtiyot bo'ling: 'lay' hozirgi zamonda = 'qo'ymoq' (lay the table). Kontekstga qarang!", mini_rule: "lie (recline) → lay (past); lay (put down) → laid (past)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I lay on the beach.", uz: "Men sohilda yotdim.", is_anchor: true, anchor_sentence: "I lay on the beach.", source_dialogue: "U07_L02_D02", source_line: 2, speaker: "Madina" },
                            { en: "He lay in bed all morning.", uz: "U butun ertalab to'shakda yotdi.", example_2: "t" },
                            { en: "We lay on the grass at the park and we were very comfortable.", uz: "Biz bog'da o'tda yotdik va juda qulay edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'lay' ishlatib gap tuzing.", model_sentence: "He lay in bed all morning.", hints: ["___ lay on ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qayerda yotdingiz?", model_frame: "I lay on ___.", flexibleCheck: true, tags: ["past", "rest"] }
                    ]
                },
                {
                    id: "V_U07_L02_stayed",
                    en: "stayed",
                    uz: "qoldi (stay → stayed)",
                    pos: "verb",
                    type: "support",
                    priority: 2,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/stayed.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 5, speaker: "Rustam", bubble_text: "I stayed at a hotel." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha harakatlanding mi? Bir joydan ikkinchisiga ko'chding mi?", audio: "/assets/audio/unit07/stayed.mp3", uz_mirror_answer: "Yo'q, men harakat qilmadim. Men mehmonxonada qoldim!", hybrid_answer: "No, I **stayed** at a hotel yesterday.", en_canonical: "I stayed at a hotel.", syntax_scaffold: { en_structure: "I stayed at a hotel.", uz_gloss: "Men mehmonxonada qoldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "stayed", role: "regular_past", color: "green" }, { word: "at a hotel", role: "location", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Stay' to'g'ri fe'lmi yoki noto'g'rimi?", choices: [{ text: "To'g'ri (regular: stay → stayed)", correct: true }, { text: "Noto'g'ri (irregular)", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "stayed", form_focus: "regular_vs_irregular", why_prompt: "Nega 'stayed' noto'g'ri emas?", explanation_uz: "'Stay' — to'g'ri fe'l: stay + ed = stayed. Barcha fe'llar noto'g'ri emas! 'Stay', 'play', 'visit' — hammasi '-ed' bilan.", mini_rule: "stay → stayed (REGULAR! Not all verbs are irregular)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I stayed at a hotel.", uz: "Men mehmonxonada qoldim.", is_anchor: true, anchor_sentence: "I stayed at a hotel.", source_dialogue: "U07_L02_D02", source_line: 5, speaker: "Rustam" },
                            { en: "She stayed at home all day.", uz: "U butun kun uyda qoldi.", example_2: "t" },
                            { en: "My family stayed at the beach for a week and we loved it.", uz: "Mening oilam bir hafta sohilda qoldi va bizga juda yoqdi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'stayed' ishlatib gap tuzing.", model_sentence: "She stayed at home all day.", hints: ["___ stayed at ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qayerda qoldingiz?", model_frame: "I stayed at ___.", flexibleCheck: true, tags: ["past", "location"] }
                    ]
                },
                {
                    id: "V_U07_L02_buy_presents",
                    en: "buy presents",
                    uz: "sovg'alar sotib olmoq",
                    pos: "phrase",
                    type: "collocation",
                    priority: 2,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/buy_presents.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 7, speaker: "Rustam", bubble_text: "I bought presents for my family!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha sovg'a olmasdingmi? Hech kim uchun hech narsa sotib olmasdingmi?", audio: "/assets/audio/unit07/buy_presents.mp3", uz_mirror_answer: "Yo'q, men sovg'a olmadim. Men sovg'alar sotib oldim!", hybrid_answer: "No, I **bought presents** yesterday.", en_canonical: "I bought presents.", syntax_scaffold: { en_structure: "I bought presents for my family.", uz_gloss: "Men oilam uchun sovg'alar sotib oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "bought", role: "irregular_past", color: "green" }, { word: "presents", role: "object", color: "purple" }, { word: "for my family", role: "beneficiary", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'Buy presents' o'tmishda qanday?", choices: [{ text: "bought presents", correct: true }, { text: "buyed presents", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "buy presents", form_focus: "collocation_past", why_prompt: "Nega butun ibora o'zgaradi?", explanation_uz: "Faqat fe'l o'zgaradi: 'buy' → 'bought'. 'Presents' o'zgarmaydi. Ibora = fe'l + ot, faqat fe'l o'tmishga o'tadi.", mini_rule: "buy presents → bought presents (only verb changes)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I bought presents for my family!", uz: "Men oilam uchun sovg'alar sotib oldim!", is_anchor: true, anchor_sentence: "I bought presents for my family!", source_dialogue: "U07_L02_D02", source_line: 7, speaker: "Rustam" },
                            { en: "He bought presents for his friends.", uz: "U do'stlari uchun sovg'alar sotib oldi.", example_2: "t" },
                            { en: "We bought presents at the shop because we love shopping.", uz: "Biz do'konda sovg'alar sotib oldik chunki biz xarid qilishni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'buy presents' o'tmishda ishlatib gap tuzing.", model_sentence: "He bought presents for his friends.", hints: ["___ bought presents for ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kim uchun sovg'a sotib oldingiz?", model_frame: "I bought presents for ___.", flexibleCheck: true, tags: ["past", "shopping"] }
                    ]
                },
                {
                    id: "V_U07_L02_do_water_sports",
                    en: "do water sports",
                    uz: "suv sportlarini qilmoq",
                    pos: "phrase",
                    type: "collocation",
                    priority: 2,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/do_water_sports.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 3, speaker: "Rustam", bubble_text: "I did water sports." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uyda o'tirdingmi? Hech narsa qilmasdingmi?", audio: "/assets/audio/unit07/do_water_sports.mp3", uz_mirror_answer: "Yo'q, men uyda o'tirmadim. Men suv sportlarini qildim!", hybrid_answer: "No, I **did water sports** yesterday.", en_canonical: "I did water sports.", syntax_scaffold: { en_structure: "I did water sports.", uz_gloss: "Men suv sportlarini qildim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "did", role: "irregular_past", color: "green" }, { word: "water sports", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Do water sports' o'tmishda qanday?", choices: [{ text: "did water sports", correct: true }, { text: "doed water sports", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "do water sports", form_focus: "do_collocation", why_prompt: "Nega 'play' emas, 'do'?", explanation_uz: "'Do' = sport turlari (do athletics, do water sports). 'Play' = jamoa sporti (play football). 'Go' = '-ing' bilan (go swimming).", mini_rule: "do + sport type; play + team sport; go + -ing sport" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I did water sports.", uz: "Men suv sportlarini qildim.", is_anchor: true, anchor_sentence: "I did water sports.", source_dialogue: "U07_L02_D02", source_line: 3, speaker: "Rustam" },
                            { en: "She did water sports at the beach.", uz: "U sohilda suv sportlarini qildi.", example_2: "t" },
                            { en: "My friends did water sports last week because they love swimming.", uz: "Mening do'stlarim o'tgan hafta suv sportlarini qildilar chunki ular suzishni yaxshi ko'radilar.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'do water sports' o'tmishda gap tuzing.", model_sentence: "She did water sports at the beach.", hints: ["___ did water sports ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qaysi suv sportlarini qildingiz?", model_frame: "I did ___ at the beach.", flexibleCheck: true, tags: ["past", "sport"] }
                    ]
                },
                {
                    id: "V_U07_L02_go_sightseeing",
                    en: "go sightseeing",
                    uz: "diqqatga sazovor joylarni ko'rmoq",
                    pos: "phrase",
                    type: "collocation",
                    priority: 3,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/go_sightseeing.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 5, speaker: "Jamshid", bubble_text: "I saw the city." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uyda edingmi? Dam oldingmi?", audio: "/assets/audio/unit07/go_sightseeing.mp3", uz_mirror_answer: "Yo'q, men uyda emas edim. Men diqqatga sazovor joylarni ko'rdim!", hybrid_answer: "No, I **went sightseeing** yesterday.", en_canonical: "I went sightseeing.", syntax_scaffold: { en_structure: "I went sightseeing.", uz_gloss: "Men diqqatga sazovor joylarni ko'rdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "went", role: "irregular_past", color: "green" }, { word: "sightseeing", role: "activity", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Go sightseeing' o'tmishda qanday?", choices: [{ text: "went sightseeing", correct: true }, { text: "goed sightseeing", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "go sightseeing", form_focus: "go_ing_pattern", why_prompt: "Nega 'go sightseeing' — 'go' + '-ing'?", explanation_uz: "'Go' + faoliyat (-ing): go sightseeing, go swimming, go shopping. O'tmishda faqat 'go' o'zgaradi: went sightseeing.", mini_rule: "go + -ing activity: went sightseeing, went swimming, went shopping" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I went sightseeing.", uz: "Men diqqatga sazovor joylarni ko'rdim.", is_anchor: true, anchor_sentence: "I went sightseeing.", source_dialogue: "U07_L04_D04", source_line: 5, speaker: "Jamshid" },
                            { en: "He went sightseeing in London.", uz: "U Londonda diqqatga sazovor joylarni ko'rdi.", example_2: "t" },
                            { en: "My family went sightseeing at the museum and we saw many interesting things.", uz: "Mening oilam muzeyda diqqatga sazovor joylarni ko'rdi va biz ko'p qiziqarli narsalarni ko'rdik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'go sightseeing' o'tmishda gap tuzing.", model_sentence: "He went sightseeing in London.", hints: ["___ went sightseeing in ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qayerda ko'rgazma ko'rgansiz?", model_frame: "I went sightseeing in ___.", flexibleCheck: true, tags: ["past", "tourism"] }
                    ]
                },
                {
                    id: "V_U07_L02_go_camping",
                    en: "go camping",
                    uz: "kempingga bormoq",
                    pos: "phrase",
                    type: "collocation",
                    priority: 3,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/go_camping.jpg",
                    dialogue_ref: { dialogue_id: "U07_L01_D01", line_index: 6, speaker: "Aziza", bubble_text: "I stayed at a hotel." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha mehmonxonada qoldingmi? Yashash joyida edingmi?", audio: "/assets/audio/unit07/go_camping.mp3", uz_mirror_answer: "Yo'q, men mehmonxonada qolmadim. Men kempingga bordim!", hybrid_answer: "No, I **went camping** yesterday.", en_canonical: "I went camping.", syntax_scaffold: { en_structure: "I went camping.", uz_gloss: "Men kempingga bordim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "went", role: "irregular_past", color: "green" }, { word: "camping", role: "activity", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Go camping' o'tmishda qanday?", choices: [{ text: "went camping", correct: true }, { text: "goed camping", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "go camping", form_focus: "go_ing_pattern", why_prompt: "'Camping' nima?", explanation_uz: "'Camping' = chodirda yashash (tabiatda). 'Go camping' = kempingga borish. O'tmishda: 'went camping'. 'Go' + '-ing' naqshi.", mini_rule: "go camping → went camping (go + activity in nature)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I went camping.", uz: "Men kempingga bordim.", is_anchor: true, anchor_sentence: "I went camping.", source_dialogue: "U07_L01_D01", source_line: 6, speaker: "Aziza" },
                            { en: "She went camping with her family.", uz: "U oilasi bilan kempingga bordi.", example_2: "t" },
                            { en: "We went camping last week and we slept in a tent.", uz: "Biz o'tgan hafta kempingga bordik va chodirda uxladik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'go camping' o'tmishda gap tuzing.", model_sentence: "She went camping with her family.", hints: ["___ went camping ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kempingga borganmisiz?", model_frame: "I went camping ___.", flexibleCheck: true, tags: ["past", "outdoor"] }
                    ]
                },
                {
                    id: "V_U07_L02_go_to_the_beach",
                    en: "go to the beach",
                    uz: "sohilga bormoq",
                    pos: "phrase",
                    type: "collocation",
                    priority: 2,
                    category: "vocab",
                    introduced_in: "U07_L02",
                    image: "/assets/images/unit07/go_to_the_beach.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 0, speaker: "Madina", bubble_text: "Did you rest well at the beach?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha muzeyda edingmi? Yopiq joyda edingmi?", audio: "/assets/audio/unit07/go_to_the_beach.mp3", uz_mirror_answer: "Yo'q, men muzeyda emas edim. Men sohilga bordim!", hybrid_answer: "No, I **went to the beach** yesterday.", en_canonical: "I went to the beach.", syntax_scaffold: { en_structure: "I went to the beach.", uz_gloss: "Men sohilga bordim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "went", role: "irregular_past", color: "green" }, { word: "to the beach", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Go to the beach' o'tmishda qanday?", choices: [{ text: "went to the beach", correct: true }, { text: "goed to the beach", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "go to the beach", form_focus: "go_to_place", why_prompt: "'Go TO the beach' — nega 'to'?", explanation_uz: "'Go to' + joy: 'go to the beach', 'go to school'. LEKIN: 'go home' (to yo'q!), 'go there' (to yo'q!). 'Home' va 'there' maxsus.", mini_rule: "go to + place (go to the beach) BUT go home (NO to)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I went to the beach.", uz: "Men sohilga bordim.", is_anchor: true, anchor_sentence: "Did you rest well at the beach?", source_dialogue: "U07_L02_D02", source_line: 0, speaker: "Madina" },
                            { en: "He went to the beach last summer.", uz: "U o'tgan yozda sohilga bordi.", example_2: "t" },
                            { en: "My family went to the beach yesterday and we were very happy.", uz: "Mening oilam kecha sohilga bordi va biz juda xursand edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'go to the beach' o'tmishda gap tuzing.", model_sentence: "We went to the beach last summer.", hints: ["___ went to the beach ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qachon sohilga borgansiz?", model_frame: "I went to the beach ___.", flexibleCheck: true, tags: ["past", "vacation"] }
                    ]
                }
            ]
        },
        "U07_L03": {
            lesson_id: "U07_L03",
            title: "Past Negatives & Questions with Irregular Verbs",
            flow_model: "sandwich",
            mastery_dialogue_id: "U07_L04_D04_1",
            items: [
                {
                    id: "V_U07_L03_didnt_go",
                    en: "didn't go",
                    uz: "bormadi (go → didn't go)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/didnt_go.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D03", line_index: 1, speaker: "Timur", bubble_text: "I didn't go to the museum." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha maktabga bordingmi? Darsga keldingmi?", audio: "/assets/audio/unit07/didnt_go.mp3", uz_mirror_answer: "Yo'q, men maktabga bormadim. Men uyda qoldim.", hybrid_answer: "No, I **didn't go** to school yesterday. I didn't go.", en_canonical: "I didn't go to school.", syntax_scaffold: { en_structure: "I didn't go to the museum.", uz_gloss: "Men muzeyga bormadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_helper", color: "red" }, { word: "go", role: "base_verb", color: "green" }, { word: "to the museum", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Inkor gapda qaysi to'g'ri?", choices: [{ text: "I didn't go", correct: true }, { text: "I didn't went", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "didn't go", form_focus: "didnt_base_not_past", why_prompt: "Nega 'didn't went' EMAS?", explanation_uz: "MUHIM QOIDA: didn't + ASOSIY fe'l! 'didn't' allaqachon o'tmishni ko'rsatadi. Shuning uchun: 'didn't GO' (to'g'ri), 'didn't WENT' (XATO!). Hech qachon 'didn't' dan keyin o'tmish shakl ishlatmang!", mini_rule: "didn't + BASE verb: didn't GO ✓ | didn't WENT ✗" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't go to the museum.", uz: "Men muzeyga bormadim.", is_anchor: true, anchor_sentence: "I didn't go to the museum.", source_dialogue: "U07_L03_D03", source_line: 1, speaker: "Timur" },
                            { en: "She didn't go to the party last night.", uz: "U kecha kechasi bazmga bormadi.", example_2: "t" },
                            { en: "We didn't go to the concert because we don't like loud music.", uz: "Biz konsertga bormadik chunki biz baland musiqani yoqtirmaymiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't go' ishlatib gap tuzing.", model_sentence: "I didn't go to the party.", hints: ["I didn't go to ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qayerga bormagansiz?", model_frame: "I didn't go to ___.", flexibleCheck: true, tags: ["past", "negative", "movement"] }
                    ]
                },
                {
                    id: "V_U07_L03_didnt_see",
                    en: "didn't see",
                    uz: "ko'rmadi (see → didn't see)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/didnt_see.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D06", line_index: 3, speaker: "Farhod", bubble_text: "I didn't see the movie." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha filmni ko'rdingmi? Kinoda edingmi?", audio: "/assets/audio/unit07/didnt_see.mp3", uz_mirror_answer: "Yo'q, men filmni ko'rmadim. Men uyda edim.", hybrid_answer: "No, I **didn't see** a movie yesterday. I didn't see it.", en_canonical: "I didn't see the movie.", syntax_scaffold: { en_structure: "I didn't see anything.", uz_gloss: "Men hech narsani ko'rmadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_helper", color: "red" }, { word: "see", role: "base_verb", color: "green" }, { word: "anything", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Inkor gapda qaysi to'g'ri?", choices: [{ text: "I didn't see", correct: true }, { text: "I didn't saw", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "didn't see", form_focus: "didnt_base_not_past", why_prompt: "Nega 'didn't saw' EMAS?", explanation_uz: "'Didn't' + asosiy fe'l: didn't SEE (to'g'ri). 'Saw' = o'tmish shakl, lekin 'didn't' allaqachon o'tmishni ko'rsatadi. Ikki marta o'tmish ishlatilmaydi!", mini_rule: "didn't + SEE ✓ | didn't + SAW ✗ (no double past!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't see the movie.", uz: "Men filmni ko'rmadim.", is_anchor: true, anchor_sentence: "I didn't see the movie.", source_dialogue: "U07_L03_D06", source_line: 3, speaker: "Farhod" },
                            { en: "He didn't see his friends at school.", uz: "U maktabda do'stlarini ko'rmadi.", example_2: "t" },
                            { en: "My brother didn't see the concert because he was tired.", uz: "Mening akam konsertni ko'rmadi chunki u charchagan edi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't see' ishlatib gap tuzing.", model_sentence: "He didn't see his friends.", hints: ["___ didn't see ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimani ko'rmagansiz?", model_frame: "I didn't see ___.", flexibleCheck: true, tags: ["past", "negative", "perception"] }
                    ]
                },
                {
                    id: "V_U07_L03_didnt_buy",
                    en: "didn't buy",
                    uz: "sotib olmadi (buy → didn't buy)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/didnt_buy.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D06", line_index: 1, speaker: "Farhod", bubble_text: "I didn't buy tickets." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha sovg'a sotib oldingmi? Xarid qildingmi?", audio: "/assets/audio/unit07/didnt_buy.mp3", uz_mirror_answer: "Yo'q, men sovg'a sotib olmadim. Men pulim yo'q edi.", hybrid_answer: "No, I **didn't buy** presents yesterday. I didn't buy them.", en_canonical: "I didn't buy presents.", syntax_scaffold: { en_structure: "I didn't buy anything.", uz_gloss: "Men hech narsa sotib olmadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_helper", color: "red" }, { word: "buy", role: "base_verb", color: "green" }, { word: "anything", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Inkor gapda qaysi to'g'ri?", choices: [{ text: "I didn't buy", correct: true }, { text: "I didn't bought", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "didn't buy", form_focus: "didnt_base_not_past", why_prompt: "Nega 'didn't bought' EMAS?", explanation_uz: "'Didn't' + BUY (asosiy shakl), BOUGHT emas! Qoida: didn't + hech qachon o'tmish shakl. 'Buy' to'g'ri, 'bought' xato!", mini_rule: "didn't + BUY ✓ | didn't + BOUGHT ✗" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't buy tickets.", uz: "Men chipta sotib olmadim.", is_anchor: true, anchor_sentence: "I didn't buy tickets.", source_dialogue: "U07_L03_D06", source_line: 1, speaker: "Farhod" },
                            { en: "She didn't buy new clothes.", uz: "U yangi kiyim sotib olmadi.", example_2: "t" },
                            { en: "We didn't buy biscuits because we don't have money.", uz: "Biz pechenye sotib olmadik chunki bizda pul yo'q.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't buy' ishlatib gap tuzing.", model_sentence: "She didn't buy new clothes.", hints: ["___ didn't buy ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimani sotib olmagansiz?", model_frame: "I didn't buy ___.", flexibleCheck: true, tags: ["past", "negative", "shopping"] }
                    ]
                },
                {
                    id: "V_U07_L03_didnt_eat",
                    en: "didn't eat",
                    uz: "yemadi (eat → didn't eat)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/didnt_eat.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D06", line_index: 3, speaker: "Farhod", bubble_text: "I didn't eat dinner either!" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ovqatlandingmi? Nonushta qildingmi?", audio: "/assets/audio/unit07/didnt_eat.mp3", uz_mirror_answer: "Yo'q, men ovqatlanmadim. Men och edim.", hybrid_answer: "No, I **didn't eat** yesterday. I didn't eat.", en_canonical: "I didn't eat anything.", syntax_scaffold: { en_structure: "I didn't eat anything.", uz_gloss: "Men hech narsa yemadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "didn't", role: "negative_helper", color: "red" }, { word: "eat", role: "base_verb", color: "green" }, { word: "anything", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Inkor gapda qaysi to'g'ri?", choices: [{ text: "I didn't eat", correct: true }, { text: "I didn't ate", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "didn't eat", form_focus: "didnt_base_not_past", why_prompt: "Nega 'didn't ate' EMAS?", explanation_uz: "'Didn't' + EAT (asosiy shakl). 'Ate' = o'tmish shakl, lekin 'didn't' bilan asosiy shakl kerak. Qoida bir xil: didn't + BASE!", mini_rule: "didn't + EAT ✓ | didn't + ATE ✗ (same rule always!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I didn't eat dinner either!", uz: "Kechki ovqat ham yemadim!", is_anchor: true, anchor_sentence: "I didn't eat dinner either!", source_dialogue: "U07_L03_D06", source_line: 3, speaker: "Farhod" },
                            { en: "He didn't eat breakfast this morning.", uz: "U bugun ertalab nonushta qilmadi.", example_2: "t" },
                            { en: "My sister didn't eat pizza because she doesn't like it.", uz: "Mening singlim pitsa yemadi chunki u uni yoqtirmaydi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'didn't eat' ishlatib gap tuzing.", model_sentence: "He didn't eat breakfast.", hints: ["___ didn't eat ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nimani yemagansiz?", model_frame: "I didn't eat ___.", flexibleCheck: true, tags: ["past", "negative", "food"] }
                    ]
                },
                {
                    id: "V_U07_L03_did_you_go",
                    en: "Did you go...?",
                    uz: "Bordingizmi? (Did you go?)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/did_you_go.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D03", line_index: 0, speaker: "Shoira", bubble_text: "Did you go to the museum?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha uyda edingmi? Dam oldingmi?", audio: "/assets/audio/unit07/did_you_go.mp3", uz_mirror_answer: "Men muzeyga bordimmi? Ha, men bilmoqchiman.", hybrid_answer: "**Did you go** to the museum yesterday? Did you go?", en_canonical: "Did you go to the museum?", syntax_scaffold: { en_structure: "Did you go to the museum?", uz_gloss: "Muzeyga bordingizmi?", tokens: [{ word: "Did", role: "question_helper", color: "orange" }, { word: "you", role: "subject", color: "blue" }, { word: "go", role: "base_verb", color: "green" }, { word: "to the museum", role: "destination", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Savol gapda qaysi to'g'ri?", choices: [{ text: "Did you go?", correct: true }, { text: "Did you went?", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "Did you go", form_focus: "did_base_question", why_prompt: "Nega 'Did you went?' EMAS?", explanation_uz: "MUHIM TUZOQ: 'Did you WENT?' deyish juda keng tarqalgan XATO! 'Did' allaqachon o'tmishni ko'rsatadi. Shuning uchun: Did + you + GO (asosiy shakl). HECH QACHON: Did + you + went!", mini_rule: "Did you GO? ✓ | Did you WENT? ✗ (COMMON TRAP!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you go to the museum on the weekend?", uz: "Hafta oxiri muzeyga bordingmi?", is_anchor: true, anchor_sentence: "Did you go to the museum on the weekend?", source_dialogue: "U07_L03_D03", source_line: 0, speaker: "Shoira" },
                            { en: "Did you go to the party last night?", uz: "Siz kecha kechasi bazmga bordingizmi?", example_2: "t" },
                            { en: "Did you go to the concert? I love concerts!", uz: "Siz konsertga bordingizmi? Men konsertlarni yaxshi ko'raman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did you go' ishlatib savol tuzing.", model_sentence: "Did you go to the party last night?", hints: ["Did you go to ___?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan so'rang.", model_frame: "Did you go to ___?", flexibleCheck: true, tags: ["past", "question", "movement"] }
                    ]
                },
                {
                    id: "V_U07_L03_did_you_see",
                    en: "Did you see...?",
                    uz: "Ko'rdingizmi? (Did you see?)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/did_you_see.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D06", line_index: 2, speaker: "Dilnoza", bubble_text: "Did you see the movie?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha eshitdingmi? Faqat eshitdingmi?", audio: "/assets/audio/unit07/did_you_see.mp3", uz_mirror_answer: "Men filmni ko'rdimmi? Ha, men bilmoqchiman.", hybrid_answer: "**Did you see** the movie yesterday? Did you see it?", en_canonical: "Did you see the movie?", syntax_scaffold: { en_structure: "Did you see the movie?", uz_gloss: "Filmni ko'rdingizmi?", tokens: [{ word: "Did", role: "question_helper", color: "orange" }, { word: "you", role: "subject", color: "blue" }, { word: "see", role: "base_verb", color: "green" }, { word: "the movie", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Savol gapda qaysi to'g'ri?", choices: [{ text: "Did you see?", correct: true }, { text: "Did you saw?", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "Did you see", form_focus: "did_base_question", why_prompt: "Nega 'Did you saw?' EMAS?", explanation_uz: "Xuddi shunday qoida: Did + you + SEE (asosiy shakl). 'Saw' emas! 'Did' o'tmishni bildiradi, shuning uchun fe'l asosiy shaklda qoladi.", mini_rule: "Did you SEE? ✓ | Did you SAW? ✗" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you see the movie?", uz: "Filmni ko'rdingizmi?", is_anchor: true, anchor_sentence: "Did you see the movie?", source_dialogue: "U07_L03_D06", source_line: 2, speaker: "Dilnoza" },
                            { en: "Did you see your friends at school?", uz: "Siz maktabda do'stlaringizni ko'rdingizmi?", example_2: "t" },
                            { en: "Did you see the singer at the concert? She was amazing!", uz: "Siz konsertda qo'shiqchini ko'rdingizmi? U ajoyib edi!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did you see' ishlatib savol tuzing.", model_sentence: "Did you see your friends?", hints: ["Did you see ___?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan nimani ko'rganini so'rang.", model_frame: "Did you see ___?", flexibleCheck: true, tags: ["past", "question", "perception"] }
                    ]
                },
                {
                    id: "V_U07_L03_did_you_buy",
                    en: "Did you buy...?",
                    uz: "Sotib oldingizmi? (Did you buy?)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/did_you_buy.jpg",
                    dialogue_ref: { dialogue_id: "U07_L02_D02", line_index: 6, speaker: "Madina", bubble_text: "Did you buy presents?" },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha sotdingmi? Narsalarni berdingmi?", audio: "/assets/audio/unit07/did_you_buy.mp3", uz_mirror_answer: "Men sovg'a sotib oldimmi? Ha, men bilmoqchiman.", hybrid_answer: "**Did you buy** presents yesterday? Did you buy them?", en_canonical: "Did you buy presents?", syntax_scaffold: { en_structure: "Did you buy presents?", uz_gloss: "Sovg'alar sotib oldingizmi?", tokens: [{ word: "Did", role: "question_helper", color: "orange" }, { word: "you", role: "subject", color: "blue" }, { word: "buy", role: "base_verb", color: "green" }, { word: "presents", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Savol gapda qaysi to'g'ri?", choices: [{ text: "Did you buy?", correct: true }, { text: "Did you bought?", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "Did you buy", form_focus: "did_base_question", why_prompt: "Nega 'Did you bought?' EMAS?", explanation_uz: "Qoida doim bir xil: Did + subject + BASE verb. 'Buy' to'g'ri, 'bought' xato. 'Did' o'zi o'tmishni ko'rsatadi!", mini_rule: "Did you BUY? ✓ | Did you BOUGHT? ✗" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you buy presents?", uz: "Sovg'alar sotib oldingizmi?", is_anchor: true, anchor_sentence: "Did you buy presents?", source_dialogue: "U07_L02_D02", source_line: 6, speaker: "Madina" },
                            { en: "Did you buy new clothes last week?", uz: "Siz o'tgan hafta yangi kiyim sotib oldingizmi?", example_2: "t" },
                            { en: "Did you buy cheese at the shop? I love cheese!", uz: "Siz do'konda pishloq sotib oldingizmi? Men pishloqni yaxshi ko'raman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did you buy' ishlatib savol tuzing.", model_sentence: "Did you buy new clothes?", hints: ["Did you buy ___?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan nima sotib olganini so'rang.", model_frame: "Did you buy ___?", flexibleCheck: true, tags: ["past", "question", "shopping"] }
                    ]
                },
                {
                    id: "V_U07_L03_did_you_eat",
                    en: "Did you eat...?",
                    uz: "Yedingizmi? (Did you eat?)",
                    pos: "verb_phrase",
                    type: "core",
                    priority: 1,
                    category: "grammar",
                    introduced_in: "U07_L03",
                    image: "/assets/images/unit07/did_you_eat.jpg",
                    dialogue_ref: { dialogue_id: "U07_L03_D03", line_index: 6, speaker: "Shoira", bubble_text: "We ate food." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha ichdingmi? Faqat suyuqlik ichdingmi?", audio: "/assets/audio/unit07/did_you_eat.mp3", uz_mirror_answer: "Men ovqat yedimmi? Ha, men bilmoqchiman.", hybrid_answer: "**Did you eat** food yesterday? Did you eat?", en_canonical: "Did you eat food?", syntax_scaffold: { en_structure: "Did you eat breakfast?", uz_gloss: "Nonushta qildingizmi?", tokens: [{ word: "Did", role: "question_helper", color: "orange" }, { word: "you", role: "subject", color: "blue" }, { word: "eat", role: "base_verb", color: "green" }, { word: "breakfast", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "Savol gapda qaysi to'g'ri?", choices: [{ text: "Did you eat?", correct: true }, { text: "Did you ate?", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "Did you eat", form_focus: "did_base_question", why_prompt: "Nega 'Did you ate?' EMAS?", explanation_uz: "Barcha savollar uchun bir qoida: Did + subject + BASE verb. 'Eat' to'g'ri, 'ate' xato. Bu qoidani yodlang — barcha noto'g'ri fe'llar uchun ishlaydi!", mini_rule: "Did you EAT? ✓ | Did you ATE? ✗ (universal rule!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "Did you eat food?", uz: "Ovqat yedingizmi?", is_anchor: true, anchor_sentence: "We talked a lot and ate food.", source_dialogue: "U07_L03_D03", source_line: 6, speaker: "Shoira" },
                            { en: "Did you eat breakfast this morning?", uz: "Siz bugun ertalab nonushta qildingizmi?", example_2: "t" },
                            { en: "Did you eat pizza at the party? I love pizza!", uz: "Siz bazmda pitsa yedingizmi? Men pitsani yaxshi ko'raman!", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'Did you eat' ishlatib savol tuzing.", model_sentence: "Did you eat breakfast?", hints: ["Did you eat ___?"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Do'stingizdan nima yeganini so'rang.", model_frame: "Did you eat ___?", flexibleCheck: true, tags: ["past", "question", "food"] }
                    ]
                }
            ]
        },
        "U07_L04": {
            lesson_id: "U07_L04",
            title: "Complex Irregular Past Narratives",
            flow_model: "sandwich",
            mastery_dialogue_id: "U07_L04_D04_1",
            items: [
                {
                    id: "V_U07_L04_made",
                    en: "made",
                    uz: "yasadi (make → made)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/made.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 4, speaker: "Gulnora", bubble_text: "I made food." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha sotib oldingmi? Faqat xarid qildingmi?", audio: "/assets/audio/unit07/made.mp3", uz_mirror_answer: "Yo'q, men sotib olmadim. Men o'zim yasadim!", hybrid_answer: "No, I **made** it myself yesterday. I made it!", en_canonical: "I made food.", syntax_scaffold: { en_structure: "I made food.", uz_gloss: "Men ovqat yasadim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "made", role: "irregular_past", color: "green" }, { word: "food", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Make' ning o'tmish shakli qaysi?", choices: [{ text: "made", correct: true }, { text: "maked", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "made", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'maked' emas, 'made'?", explanation_uz: "'Make' — noto'g'ri fe'l: make → made. 'K' tushib qoladi va 'e' saqlanadi. 'Made food' = ovqat tayyorladi, 'made a cake' = tort yasadi.", mini_rule: "make → made (k drops, very common verb)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I made food.", uz: "Men ovqat yasadim.", is_anchor: true, anchor_sentence: "I made food.", source_dialogue: "U07_L04_D04", source_line: 4, speaker: "Gulnora" },
                            { en: "She made a cake for the party.", uz: "U bazm uchun tort yasadi.", example_2: "t" },
                            { en: "My mother made plov yesterday because we love it.", uz: "Mening onam kecha palov yasadi chunki biz uni yaxshi ko'ramiz.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'made' ishlatib gap tuzing.", model_sentence: "She made a cake for the party.", hints: ["___ made ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima yasagansiz?", model_frame: "I made ___.", flexibleCheck: true, tags: ["past", "creation"] }
                    ]
                },
                {
                    id: "V_U07_L04_got",
                    en: "got",
                    uz: "oldi (get → got)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/got.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 3, speaker: "Jamshid", bubble_text: "I got a present." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha berdingmi? Narsalarni taqdim etdingmi?", audio: "/assets/audio/unit07/got.mp3", uz_mirror_answer: "Yo'q, men bermadim. Men oldim!", hybrid_answer: "No, I **got** a present yesterday. I got it!", en_canonical: "I got a present.", syntax_scaffold: { en_structure: "I got a present.", uz_gloss: "Men sovg'a oldim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "got", role: "irregular_past", color: "green" }, { word: "a present", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Get' ning o'tmish shakli qaysi?", choices: [{ text: "got", correct: true }, { text: "getted", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "got", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'getted' emas, 'got'?", explanation_uz: "'Get' — noto'g'ri fe'l: get → got. Juda ko'p ma'nolarda ishlatiladi: got a present (oldi), got home (uyga yetdi), got angry (jahllandi).", mini_rule: "get → got (one of the most common verbs!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I got a present.", uz: "Men sovg'a oldim.", is_anchor: true, anchor_sentence: "I got a present.", source_dialogue: "U07_L04_D04", source_line: 3, speaker: "Jamshid" },
                            { en: "He got a new bike last week.", uz: "U o'tgan hafta yangi velosiped oldi.", example_2: "t" },
                            { en: "My sister got a book for her birthday and she was very happy.", uz: "Mening singlim tug'ilgan kunida kitob oldi va u juda xursand edi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'got' ishlatib gap tuzing.", model_sentence: "He got a new bike last week.", hints: ["___ got ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima oldingiz?", model_frame: "I got ___.", flexibleCheck: true, tags: ["past", "receiving"] }
                    ]
                },
                {
                    id: "V_U07_L04_gave",
                    en: "gave",
                    uz: "berdi (give → gave)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/gave.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 4, speaker: "Gulnora", bubble_text: "I gave a present." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha oldingmi? Faqat oldingmi?", audio: "/assets/audio/unit07/gave.mp3", uz_mirror_answer: "Yo'q, men olmadim. Men berdim!", hybrid_answer: "No, I **gave** a present yesterday. I gave it!", en_canonical: "I gave a present.", syntax_scaffold: { en_structure: "I gave my mother a present.", uz_gloss: "Men onamga sovg'a berdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "gave", role: "irregular_past", color: "green" }, { word: "my mother", role: "indirect_object", color: "orange" }, { word: "a present", role: "direct_object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Give' ning o'tmish shakli qaysi?", choices: [{ text: "gave", correct: true }, { text: "gived", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "gave", form_focus: "irregular_past_vowel", why_prompt: "Nega 'gived' emas, 'gave'?", explanation_uz: "'Give' — noto'g'ri fe'l: give → gave. Unli o'zgaradi: i → a. 'Gave' ikki ob'ekt oladi: 'I gave HER a PRESENT' (kimga + nimani).", mini_rule: "give → gave (vowel i → a, takes two objects)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I gave my mother a present.", uz: "Men onamga sovg'a berdim.", is_anchor: true, anchor_sentence: "I gave my mother a present.", source_dialogue: "U07_L04_D04", source_line: 4, speaker: "Gulnora" },
                            { en: "She gave a concert last night.", uz: "U kecha kechasi konsert berdi.", example_2: "t" },
                            { en: "My favorite singer gave a concert and I went to it because I love music.", uz: "Mening sevimli qo'shiqchim konsert berdi va men uni ko'rdim chunki men musiqani yaxshi ko'raman.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'gave' ishlatib gap tuzing.", model_sentence: "She gave a concert last night.", hints: ["___ gave ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Kimga nima berdingiz?", model_frame: "I gave ___ a ___.", flexibleCheck: true, tags: ["past", "giving"] }
                    ]
                },
                {
                    id: "V_U07_L04_wrote",
                    en: "wrote",
                    uz: "yozdi (write → wrote)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/wrote.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 3, speaker: "Jamshid", bubble_text: "I wrote a diary." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha o'qidingmi? Faqat o'qidingmi?", audio: "/assets/audio/unit07/wrote.mp3", uz_mirror_answer: "Yo'q, men o'qimadim. Men yozdim!", hybrid_answer: "No, I **wrote** a diary yesterday. I wrote!", en_canonical: "I wrote a diary.", syntax_scaffold: { en_structure: "I wrote a diary.", uz_gloss: "Men kundalik yozdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "wrote", role: "irregular_past", color: "green" }, { word: "a diary", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Write' ning o'tmish shakli qaysi?", choices: [{ text: "wrote", correct: true }, { text: "writed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "wrote", form_focus: "irregular_past_vowel", why_prompt: "Nega 'writed' emas, 'wrote'?", explanation_uz: "'Write' — noto'g'ri fe'l: write → wrote. Unli o'zgaradi: i → o. 'Ride → rode' ga o'xshash naqsh! '-te' tushib qoladi.", mini_rule: "write → wrote (vowel i → o, like ride → rode)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I wrote a diary.", uz: "Men kundalik yozdim.", is_anchor: true, anchor_sentence: "I wrote a diary.", source_dialogue: "U07_L04_D04", source_line: 3, speaker: "Jamshid" },
                            { en: "He wrote a story last week.", uz: "U o'tgan hafta hikoya yozdi.", example_2: "t" },
                            { en: "My brother wrote a song because he loves music.", uz: "Mening akam qo'shiq yozdi chunki u musiqani yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'wrote' ishlatib gap tuzing.", model_sentence: "He wrote a story last week.", hints: ["___ wrote ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima yozgansiz?", model_frame: "I wrote ___.", flexibleCheck: true, tags: ["past", "writing"] }
                    ]
                },
                {
                    id: "V_U07_L04_read_past",
                    en: "read",
                    uz: "o'qidi (read → read, talaffuz o'zgaradi)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/read.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 3, speaker: "Jamshid", bubble_text: "I read a book." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha yozdingmi? Faqat yozdingmi?", audio: "/assets/audio/unit07/read_past.mp3", uz_mirror_answer: "Yo'q, men yozmadim. Men o'qidim!", hybrid_answer: "No, I **read** a book yesterday. I read!", en_canonical: "I read a book.", syntax_scaffold: { en_structure: "I read a book.", uz_gloss: "Men kitob o'qidim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "read", role: "irregular_past_same_spelling", color: "green" }, { word: "a book", role: "object", color: "purple" }] } },
                        { phase: "concept_check", question_uz: "'Read' o'tmishi qanday yoziladi?", choices: [{ text: "read (bir xil yoziladi, talaffuz farq qiladi!)", correct: true }, { text: "readed", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "read (past)", form_focus: "same_spelling_different_sound", why_prompt: "Nega yozilishi bir xil?", explanation_uz: "Maxsus fe'l! 'Read' hozirgi: /riːd/ (reed kabi). 'Read' o'tmishi: /rɛd/ (red kabi). Yozilishi BIR XIL, talaffuzi BOSHQA! Kontekstdan aniqlang.", mini_rule: "read → read (SAME spelling! Present: /riːd/, Past: /rɛd/ like 'red')" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I read a book.", uz: "Men kitob o'qidim.", is_anchor: true, anchor_sentence: "I read a book.", source_dialogue: "U07_L04_D04", source_line: 3, speaker: "Jamshid" },
                            { en: "She read a magazine last night.", uz: "U kecha kechasi jurnal o'qidi.", example_2: "t" },
                            { en: "My sister read a blog about music because she loves singers.", uz: "Mening singlim musiqa haqida blog o'qidi chunki u qo'shiqchilarni yaxshi ko'radi.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'read' (o'tmish) ishlatib gap tuzing.", model_sentence: "She read a magazine last night.", hints: ["___ read ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Nima o'qigansiz?", model_frame: "I read ___.", flexibleCheck: true, tags: ["past", "reading"] }
                    ]
                },
                {
                    id: "V_U07_L04_left",
                    en: "left",
                    uz: "ketdi (leave → left)",
                    pos: "verb",
                    type: "core",
                    priority: 2,
                    category: "grammar",
                    introduced_in: "U07_L04",
                    image: "/assets/images/unit07/left.jpg",
                    dialogue_ref: { dialogue_id: "U07_L04_D04", line_index: 7, speaker: "Jamshid", bubble_text: "I left home at eight." },
                    slides: [
                        { phase: "presentation", uz_context: "Sen kecha keldingmi? Keldingmi?", audio: "/assets/audio/unit07/left.mp3", uz_mirror_answer: "Yo'q, men kelmadim. Men ketdim!", hybrid_answer: "No, I **left** home yesterday. I left!", en_canonical: "I left home.", syntax_scaffold: { en_structure: "I left home at eight o'clock.", uz_gloss: "Men soat sakkizda uydan ketdim.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "left", role: "irregular_past", color: "green" }, { word: "home", role: "place", color: "purple" }, { word: "at eight o'clock", role: "time", color: "orange" }] } },
                        { phase: "concept_check", question_uz: "'Leave' ning o'tmish shakli qaysi?", choices: [{ text: "left", correct: true }, { text: "leaved", correct: false }], correct_index: 0 },
                        { phase: "discovery", grammar_token: "left", form_focus: "irregular_past_no_ed", why_prompt: "Nega 'leaved' emas, 'left'?", explanation_uz: "'Leave' — noto'g'ri fe'l: leave → left. '-eave' → '-eft' ga o'zgaradi. Ehtiyot: 'left' = chap tomon ham! Kontekstga qarang.", mini_rule: "leave → left (also means 'chap/left side' — context matters!)" },
                        { phase: "practice", type: "drill_list", en_examples: [
                            { en: "I left home at eight o'clock.", uz: "Men soat sakkizda uydan ketdim.", is_anchor: true, anchor_sentence: "I left home at eight o'clock.", source_dialogue: "U07_L04_D04", source_line: 7, speaker: "Jamshid" },
                            { en: "He left school early yesterday.", uz: "U kecha maktabdan erta ketdi.", example_2: "t" },
                            { en: "We left the party at night because we were tired.", uz: "Biz kechasi bazmdan ketdik chunki biz charchagan edik.", example_3: "t" }
                        ] },
                        { phase: "production", prompt_uz: "'left' ishlatib gap tuzing.", model_sentence: "He left school early yesterday.", hints: ["___ left ___"], input_type: "full_sentence" },
                        { phase: "personalization", prompt_uz: "Qachon ketgansiz?", model_frame: "I left ___ at ___.", flexibleCheck: true, tags: ["past", "departure"] }
                    ]
                }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // RECYCLING METADATA BLOCK
    // ═══════════════════════════════════════════════════════════════════════════
    recycling: {
        has_recycling_block: true,
        has_source_dialogue: true,
        has_priority: true,
        has_recycled_vocab: true,
        total_recycled_items: 24,
        distribution: {
            "U01": 3, "U02": 4, "U03": 3, "U04": 6, "U05": 5, "U06": 3
        },
        priority_coverage: { "HIGH": 100, "MEDIUM": 80, "LOW": 50 },
        priority_counts: { "high": 16, "medium": 10, "low": 4 }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GRAMMAR COVERAGE BLOCK
    // ═══════════════════════════════════════════════════════════════════════════
    grammar_coverage: {
        affirmative: ["I went to Italy.", "She saw many things.", "He took photos.", "We bought presents."],
        negative: ["I didn't go to the museum.", "She didn't see the movie.", "We didn't buy tickets.", "He didn't eat breakfast."],
        question: ["Did you go to the party?", "Did you see your friends?", "Did you buy presents?", "Did you eat breakfast?"]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER METHODS
    // ═══════════════════════════════════════════════════════════════════════════
    getCardsForLesson(lessonId) {
        const lesson = this.lessons[lessonId];
        return lesson ? lesson.items : [];
    },

    getLesson(lessonId) {
        return this.lessons[lessonId] || null;
    },

    getDialogue(dialogueId) {
        return this.dialogues[dialogueId] || null;
    },

    getCardById(cardId) {
        for (const lessonKey of Object.keys(this.lessons)) {
            const lesson = this.lessons[lessonKey];
            const card = lesson.items.find(item => item.id === cardId);
            if (card) return card;
        }
        return null;
    }
};

// Freeze object
Object.freeze(window.VOCAB_CARDS_U07);

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.VOCAB_CARDS_U07;
}
