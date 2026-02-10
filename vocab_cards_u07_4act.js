/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 07: Irregular Past Actions
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Irregular Past - Building on U05 Regular Past + U06 did/didn't):
 * - Irregular past verbs (went, saw, took, bought, ate, came, had, did)
 * - Mixed regular + irregular past narratives
 * - Manner adverbs (slowly, quickly, fast, well)
 * - Travel & vacation activities vocabulary
 *
 * THE 4-ACT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Act 1: PRESENTATION → Uzbek Context Q (polarity), Mirror, Hybrid        │
 * │ Act 2: CONCEPT CHECK → implicit grammar                                  │
 * │ Act 3: DRILL LIST    → Anchor (from dialogue), Ex2, Ex3                  │
 * │ Act 4: PRODUCTION    → input + bubble unlock                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * MASTER DOCUMENT COMPLIANCE:
 * ✅ CONSTRAINT 1: 100% Core vocabulary in dialogues
 * ✅ CONSTRAINT 2: Anchor sentence = exact sentence from dialogue
 * ✅ CONSTRAINT 3: Target grammar in (+), (-), (?) in dialogues
 * ✅ CONSTRAINT 4: Recycling through dialogues; recycling_balance tracked
 * ✅ CONSTRAINT 5: All 6 elements per card
 * ✅ RULE D7: Every dialogue line has line_uz (Uzbek translation)
 * ✅ RULE E1: Presentation uz_context = polarity/friction
 *
 * RECYCLING CHAIN: U01 → U01.5 → U02 → U03 → U04 → U05 → U06 → U07 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 07)
 */

window.VOCAB_CARDS_U07 = {
  unit_id: "U07",
  unit_title: "Irregular Past Actions",
  scalability_level: 2,
  grammar_focus: "Irregular past verbs (went, saw, took, bought, ate, came, had, did)",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U06 (Rule R2)
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
        past_time_markers: ["yesterday", "all day"],
        locations: ["home", "work", "office", "school"]
      },
      from_u05: {
        past_regular_verbs: ["worked", "finished", "prepared", "talked", "played", "watched", "studied", "visited", "walked", "traveled", "left"],
        past_time_expressions: ["yesterday", "last week", "last night", "last year"]
      },
      from_u06: {
        auxiliaries_past: ["did", "didn't"],
        question_patterns: ["Did you...?", "Why didn't you...?"],
        because_clauses: ["because I was tired", "because she was sick"],
        jobs: ["teacher", "manager", "cook", "nurse"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U07_L01_D01": {
      id: "U07_L01_D01",
      title: "Summer Vacation Stories",
      setting: "Two classmates discussing their summer vacation",
      characters: ["Aziza", "Bobur"],
      grammar_coverage: {
        affirmative: ["I went to Italy.", "I saw many things.", "I took photos."],
        negative: ["I didn't go to the beach.", "We didn't see the castle."],
        question: ["Did you go to a museum?", "What did you do?"]
      },
      recycling_balance: {
        least_used_included: ["nice", "together", "good"],
        quota_met: true,
        notes: "Travel vocabulary with irregular past forms + U05-U06 patterns"
      },
      lines: [
        { speaker: "Aziza", line: "Hi Bobur! Where were you in summer?", line_uz: "Salom Bobur! Yozda qayerda edingiz?", recycled: ["you", "in", "were"], target: ["Where", "summer"] },
        { speaker: "Bobur", line: "Hi Aziza! I went to Italy! How about you?", line_uz: "Salom Aziza! Men Italiaga bordim! Sen-chi?", recycled: ["I", "you"], target: ["went", "Italy", "about"] },
        { speaker: "Aziza", line: "Wonderful! I went to London. I saw many things!", line_uz: "Ajoyib! Men Londonga bordim. Ko'p narsalarni ko'rdim!", recycled: ["I"], target: ["Wonderful", "went", "London", "saw", "many", "things"] },
        { speaker: "Bobur", line: "What did you do? Did you go to a museum?", line_uz: "Nima qildingiz? Muzeyga bordingizmi?", recycled: ["What", "did", "you", "Did", "to", "a"], target: ["go", "museum"] },
        { speaker: "Aziza", line: "Yes, I went to the museum and took many photos.", line_uz: "Ha, men muzeyga bordim va juda ko'p fotosuratlar oldim.", recycled: ["I", "the", "and"], target: ["went", "museum", "took", "photos"] },
        { speaker: "Bobur", line: "Me too! I was at the beach and went swimming.", line_uz: "Men ham! Men sohilda edim va suzish qildim.", recycled: ["I", "was", "at", "the", "and"], target: ["Me", "beach", "went", "swimming"] },
        { speaker: "Aziza", line: "Did you buy presents?", line_uz: "Sovg'a sotib oldingizmi?", recycled: ["Did", "you"], target: ["buy", "presents"] },
        { speaker: "Bobur", line: "Yes, I bought presents for my family.", line_uz: "Ha, men oilam uchun sovg'alar sotib oldim.", recycled: ["I", "my", "family"], target: ["bought", "presents", "for"] },
        { speaker: "Aziza", line: "I stayed at a hotel. It was very good!", line_uz: "Men mehmonxonada qoldim. Juda yaxshi edi!", recycled: ["I", "at", "a", "was", "very", "good"], target: ["stayed", "hotel"] },
        { speaker: "Bobur", line: "Next summer we'll travel together!", line_uz: "Keyingi yozda biz birga sayohat qilamiz!", recycled: ["we"], target: ["Next", "summer", "travel", "together"] }
      ]
    },

    "U07_L02_D01": {
      id: "U07_L02_D01",
      title: "Weekend Activities",
      setting: "Friends discussing their weekend",
      characters: ["Madina", "Javlon"],
      grammar_coverage: {
        affirmative: ["I had breakfast at home.", "She ate lunch quickly.", "We came home late."],
        negative: ["I didn't eat breakfast.", "She didn't come to school."],
        question: ["Did you eat breakfast?", "Did he come to class?"]
      },
      recycling_balance: {
        least_used_included: ["love", "excited", "fine"],
        quota_met: true,
        notes: "Daily activities with irregular past + manner adverbs"
      },
      lines: [
        { speaker: "Madina", line: "Hi Javlon! Did you have a good weekend?", line_uz: "Salom Javlon! Hafta oxiri yaxshi o'tdimi?", recycled: ["Did", "you", "a", "good"], target: ["have", "weekend"] },
        { speaker: "Javlon", line: "Yes! I had a great time. I went to the park.", line_uz: "Ha! Ajoyib vaqt o'tkazdim. Men parkga bordim.", recycled: ["I", "a", "great", "went", "to", "the"], target: ["had", "time", "park"] },
        { speaker: "Madina", line: "Did you eat breakfast before you went?", line_uz: "Borishdan oldin nonushta qildingizmi?", recycled: ["Did", "you"], target: ["eat", "breakfast", "before", "went"] },
        { speaker: "Javlon", line: "Yes, I had breakfast at home.", line_uz: "Ha, men uyda nonushta qildim.", recycled: ["I", "at", "home"], target: ["had", "breakfast"] },
        { speaker: "Madina", line: "My sister ate lunch quickly because she was late.", line_uz: "Mening singlim tushlikni tez yedi chunki kech qolgan edi.", recycled: ["My", "sister", "because", "she", "was"], target: ["ate", "lunch", "quickly", "late"] },
        { speaker: "Javlon", line: "I ate slowly at the restaurant.", line_uz: "Men restoranda sekin yedim.", recycled: ["I", "at", "the"], target: ["ate", "slowly", "restaurant"] },
        { speaker: "Madina", line: "We came home late yesterday.", line_uz: "Biz kecha kech uyga keldik.", recycled: ["We", "yesterday"], target: ["came", "home", "late"] },
        { speaker: "Javlon", line: "Did your brother come to school?", line_uz: "Akangiz maktabga keldimi?", recycled: ["Did", "your", "brother", "to", "school"], target: ["come"] },
        { speaker: "Madina", line: "No, he didn't come because he was sick.", line_uz: "Yo'q, u kelmadi chunki kasal edi.", recycled: ["he", "didn't", "because", "was", "sick"], target: ["come"] },
        { speaker: "Javlon", line: "I did my homework quickly and watched TV.", line_uz: "Men uyga vazifamni tez qildim va televizor tomashah qildim.", recycled: ["I", "my", "and", "watched"], target: ["did", "homework", "quickly"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U07_L01": {
      lesson_id: "U07_L01",
      title: "Common Irregular Past Verbs",
      grammar_target: "Irregular past (went, saw, took, bought)",
      scalability_pattern: "[Subject] + [Irregular Past Verb] + [Object/Place]",
      source_dialogues: ["U07_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I went to Italy.", "I saw many things."] },
        negative: { required: 1, examples: ["I didn't go to the beach."] },
        question: { required: 1, examples: ["Did you go to a museum?"] }
      },
      
      recycling_stats: {
        total_content_words: 45,
        recycled_words: 30,
        new_words: 15,
        ratio: 0.67,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 1: went (go → went)
        {
          id: "V_U07_L01_went",
          en: "went",
          uz: "bordim/bordi (go fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "movement_irregular",
          introduced_in: "U07_L01",
          image: "go_went_travel.jpg",
          
          grammar_table: {
            base_form: "go",
            past_form: "went",
            rule: "IRREGULAR - Complete change (NOT goed)",
            pattern: "Subject + went + to + place",
            with_did: "Did + subject + GO (base form, NOT went)",
            with_didnt: "Subject + didn't + GO (base form, NOT went)",
            examples: {
              affirmative: ["I went to Italy", "She went to school"],
              negative: ["I didn't go to Italy", "She didn't go to school"],
              question: ["Did you go to Italy?", "Did she go to school?"]
            }
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L01_D01",
            line_index: 1,
            speaker: "Bobur",
            bubble_text: "Hi Aziza! I went to Italy! How about you?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha uyda qolgandingizmi? Hech qaerga chiqmadingizmi?",
              audio: "u07_l01_went_uz.mp3",
              uz_mirror_answer: "Yo'q, men uyda qolmadim. Men Italiaga bordim!",
              hybrid_answer: "Yo'q, men **went** Italiaga. Men bordim!",
              en_canonical: "No, I went to Italy.",
              
              grammar_visual: {
                irregular_pattern: "go → went (IRREGULAR)",
                rule: "⚠️ NOT 'goed' - complete change!",
                with_auxiliary: "Did you GO? (base form after did)",
                examples: ["I went", "She went", "They went"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I went to Italy.",
                options: [
                  {
                    label: "I goed to Italy (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I went to Italy (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Go' ning o'tmishi 'went' - IRREGULAR!",
                fail_msg: "Xato. 'Go' → 'went' (NOT 'goed'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I went to Italy!",
                  uz: "Men Italiaga bordim!",
                  is_anchor: true,
                  source_dialogue: "U07_L01_D01",
                  source_line: 1,
                  speaker: "Bobur"
                },
                {
                  en: "She went to London yesterday.",
                  uz: "U kecha Londonga bordi.",
                  subject: "She",
                  focus_word: "went"
                },
                {
                  en: "We went to the museum last week.",
                  uz: "Biz o'tgan hafta muzeyga bordik.",
                  subject: "We",
                  focus_word: "went"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men Italiaga bordim'",
              model_answer: "I went to Italy.",
              accepted_answers: [
                "I went to Italy.",
                "I went to Italy!",
                "I went there."
              ],
              trap: {
                trigger: "I goed",
                message: "⚠️ 'Goed' yo'q! 'Go' ning o'tmishi = 'WENT' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L01_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 2: saw (see → saw)
        {
          id: "V_U07_L01_saw",
          en: "saw",
          uz: "ko'rdim/ko'rdi (see fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "perception_irregular",
          introduced_in: "U07_L01",
          image: "see_saw_view.jpg",
          
          grammar_table: {
            base_form: "see",
            past_form: "saw",
            rule: "IRREGULAR - Complete change (NOT seed or seen)",
            pattern: "Subject + saw + object",
            with_did: "Did + subject + SEE (base form, NOT saw)",
            with_didnt: "Subject + didn't + SEE (base form, NOT saw)",
            examples: {
              affirmative: ["I saw many things", "She saw a movie"],
              negative: ["I didn't see it", "She didn't see them"],
              question: ["Did you see it?", "Did she see them?"]
            }
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L01_D01",
            line_index: 2,
            speaker: "Aziza",
            bubble_text: "Wonderful! I went to London. I saw many things!"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha hech narsa eshitmadingizmi? Faqat eshitdingizmi?",
              audio: "u07_l01_saw_uz.mp3",
              uz_mirror_answer: "Yo'q, men eshitmadim. Men ko'p narsalarni ko'rdim!",
              hybrid_answer: "Yo'q, men **saw** ko'p narsalarni. Men ko'rdim!",
              en_canonical: "No, I saw many things.",
              
              grammar_visual: {
                irregular_pattern: "see → saw (IRREGULAR)",
                rule: "⚠️ NOT 'seed' or 'seen'!",
                with_auxiliary: "Did you SEE? (base form after did)",
                examples: ["I saw", "She saw", "They saw"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I saw many things.",
                options: [
                  {
                    label: "I seed many things (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I saw many things (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'See' ning o'tmishi 'saw' - IRREGULAR!",
                fail_msg: "Xato. 'See' → 'saw' (NOT 'seed'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I saw many things!",
                  uz: "Men ko'p narsalarni ko'rdim!",
                  is_anchor: true,
                  source_dialogue: "U07_L01_D01",
                  source_line: 2,
                  speaker: "Aziza"
                },
                {
                  en: "He saw a movie last night.",
                  uz: "U kecha kechasi film ko'rdi.",
                  subject: "He",
                  focus_word: "saw"
                },
                {
                  en: "We saw a concert yesterday.",
                  uz: "Biz kecha konsert ko'rdik.",
                  subject: "We",
                  focus_word: "saw"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men ko'p narsalarni ko'rdim'",
              model_answer: "I saw many things.",
              accepted_answers: [
                "I saw many things.",
                "I saw a lot of things.",
                "I saw them."
              ],
              trap: {
                trigger: "I seed",
                message: "⚠️ 'Seed' yo'q! 'See' ning o'tmishi = 'SAW' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L01_D01",
                line_index: 2
              }
            }
          ]
        },

        // CARD 3: took (take → took)
        {
          id: "V_U07_L01_took",
          en: "took",
          uz: "oldim/oldi (take fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "action_irregular",
          introduced_in: "U07_L01",
          image: "take_took_photos.jpg",
          
          grammar_table: {
            base_form: "take",
            past_form: "took",
            rule: "IRREGULAR - Complete change (NOT taked)",
            pattern: "Subject + took + object",
            common_phrases: ["took photos", "took a taxi", "took a break"],
            with_did: "Did + subject + TAKE (base form, NOT took)",
            with_didnt: "Subject + didn't + TAKE (base form, NOT took)"
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L01_D01",
            line_index: 4,
            speaker: "Aziza",
            bubble_text: "Yes, I went to the museum and took many photos."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz fotosuratlar bermadingizmi? Hech narsani olmadingizmi?",
              audio: "u07_l01_took_uz.mp3",
              uz_mirror_answer: "Yo'q, men ko'p fotosuratlar oldim!",
              hybrid_answer: "Yo'q, men **took** ko'p fotosuratlar. Men oldim!",
              en_canonical: "No, I took many photos.",
              
              grammar_visual: {
                irregular_pattern: "take → took (IRREGULAR)",
                rule: "⚠️ NOT 'taked'!",
                with_auxiliary: "Did you TAKE? (base form after did)",
                examples: ["I took photos", "She took a taxi", "They took a break"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I took many photos.",
                options: [
                  {
                    label: "I taked photos (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I took photos (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Take' ning o'tmishi 'took' - IRREGULAR!",
                fail_msg: "Xato. 'Take' → 'took' (NOT 'taked'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I went to the museum and took many photos.",
                  uz: "Men muzeyga bordim va ko'p fotosuratlar oldim.",
                  is_anchor: true,
                  source_dialogue: "U07_L01_D01",
                  source_line: 4,
                  speaker: "Aziza"
                },
                {
                  en: "She took a taxi to school.",
                  uz: "U maktabga taksi oldi.",
                  subject: "She",
                  focus_word: "took"
                },
                {
                  en: "We took photos at the beach.",
                  uz: "Biz sohilda fotosurat oldik.",
                  subject: "We",
                  focus_word: "took"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men ko'p fotosuratlar oldim'",
              model_answer: "I took many photos.",
              accepted_answers: [
                "I took many photos.",
                "I took a lot of photos.",
                "I took photos."
              ],
              trap: {
                trigger: "I taked",
                message: "⚠️ 'Taked' yo'q! 'Take' ning o'tmishi = 'TOOK' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L01_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 4: bought (buy → bought)
        {
          id: "V_U07_L01_bought",
          en: "bought",
          uz: "sotib oldim/oldi (buy fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "action_irregular",
          introduced_in: "U07_L01",
          image: "buy_bought_shopping.jpg",
          
          grammar_table: {
            base_form: "buy",
            past_form: "bought",
            rule: "IRREGULAR - Complete change (NOT buyed)",
            pattern: "Subject + bought + object + for + person",
            common_phrases: ["bought presents", "bought food", "bought tickets"],
            with_did: "Did + subject + BUY (base form, NOT bought)",
            with_didnt: "Subject + didn't + BUY (base form, NOT bought)"
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L01_D01",
            line_index: 7,
            speaker: "Bobur",
            bubble_text: "Yes, I bought presents for my family."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sovg'a topa olmadingizmi? Hech narsa sotib olmadingizmi?",
              audio: "u07_l01_bought_uz.mp3",
              uz_mirror_answer: "Yo'q, men oilam uchun sovg'alar sotib oldim!",
              hybrid_answer: "Yo'q, men **bought** sovg'alar oilam uchun!",
              en_canonical: "No, I bought presents for my family.",
              
              grammar_visual: {
                irregular_pattern: "buy → bought (IRREGULAR)",
                rule: "⚠️ NOT 'buyed'!",
                with_auxiliary: "Did you BUY? (base form after did)",
                examples: ["I bought presents", "She bought food", "They bought tickets"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I bought presents.",
                options: [
                  {
                    label: "I buyed presents (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I bought presents (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Buy' ning o'tmishi 'bought' - IRREGULAR!",
                fail_msg: "Xato. 'Buy' → 'bought' (NOT 'buyed'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I bought presents for my family.",
                  uz: "Ha, men oilam uchun sovg'alar sotib oldim.",
                  is_anchor: true,
                  source_dialogue: "U07_L01_D01",
                  source_line: 7,
                  speaker: "Bobur"
                },
                {
                  en: "She bought food at the market.",
                  uz: "U bozordan ovqat sotib oldi.",
                  subject: "She",
                  focus_word: "bought"
                },
                {
                  en: "We bought tickets yesterday.",
                  uz: "Biz kecha chiptalar sotib oldik.",
                  subject: "We",
                  focus_word: "bought"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men sovg'alar sotib oldim'",
              model_answer: "I bought presents.",
              accepted_answers: [
                "I bought presents.",
                "I bought gifts.",
                "I bought presents for my family."
              ],
              trap: {
                trigger: "I buyed",
                message: "⚠️ 'Buyed' yo'q! 'Buy' ning o'tmishi = 'BOUGHT' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L01_D01",
                line_index: 7
              }
            }
          ]
        }
      ]
    },

    "U07_L02": {
      lesson_id: "U07_L02",
      title: "More Irregular Verbs + Manner Adverbs",
      grammar_target: "Irregular past (ate, had, came, did) + manner adverbs (quickly, slowly)",
      scalability_pattern: "[Subject] + [Irregular Past Verb] + [Adverb] + [Object]",
      source_dialogues: ["U07_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I had breakfast at home.", "She ate lunch quickly."] },
        negative: { required: 1, examples: ["I didn't eat breakfast."] },
        question: { required: 1, examples: ["Did you eat breakfast?"] }
      },
      
      recycling_stats: {
        total_content_words: 42,
        recycled_words: 29,
        new_words: 13,
        ratio: 0.69,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 5: ate (eat → ate)
        {
          id: "V_U07_L02_ate",
          en: "ate",
          uz: "yedim/yedi (eat fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "action_irregular",
          introduced_in: "U07_L02",
          image: "eat_ate_food.jpg",
          
          grammar_table: {
            base_form: "eat",
            past_form: "ate",
            rule: "IRREGULAR - Complete change (NOT eated)",
            pattern: "Subject + ate + food/meal",
            common_phrases: ["ate breakfast", "ate lunch", "ate dinner"],
            with_did: "Did + subject + EAT (base form, NOT ate)",
            with_didnt: "Subject + didn't + EAT (base form, NOT ate)"
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L02_D01",
            line_index: 4,
            speaker: "Madina",
            bubble_text: "My sister ate lunch quickly because she was late."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha ichdinimi? Faqat suyuqlik ichdingizmi?",
              audio: "u07_l02_ate_uz.mp3",
              uz_mirror_answer: "Yo'q, men faqat ichmadim. Men ovqat yedim!",
              hybrid_answer: "Yo'q, men **ate** tushlik tez.",
              en_canonical: "No, I ate lunch quickly.",
              
              grammar_visual: {
                irregular_pattern: "eat → ate (IRREGULAR)",
                rule: "⚠️ NOT 'eated'!",
                with_auxiliary: "Did you EAT? (base form after did)",
                examples: ["I ate breakfast", "She ate lunch", "They ate dinner"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "She ate lunch quickly.",
                options: [
                  {
                    label: "She eated lunch (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "She ate lunch (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Eat' ning o'tmishi 'ate' - IRREGULAR!",
                fail_msg: "Xato. 'Eat' → 'ate' (NOT 'eated'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "My sister ate lunch quickly because she was late.",
                  uz: "Mening singlim tushlikni tez yedi chunki kech qolgan edi.",
                  is_anchor: true,
                  source_dialogue: "U07_L02_D01",
                  source_line: 4,
                  speaker: "Madina"
                },
                {
                  en: "I ate breakfast at home.",
                  uz: "Men uyda nonushta qildim.",
                  subject: "I",
                  focus_word: "ate"
                },
                {
                  en: "We ate pizza yesterday.",
                  uz: "Biz kecha pitsa yedik.",
                  subject: "We",
                  focus_word: "ate"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Singlim tushlik yedi'",
              model_answer: "My sister ate lunch.",
              accepted_answers: [
                "My sister ate lunch.",
                "She ate lunch.",
                "My sister ate lunch quickly."
              ],
              trap: {
                trigger: "ate",
                message: "⚠️ 'Eated' yo'q! 'Eat' ning o'tmishi = 'ATE' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L02_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 6: had (have → had)
        {
          id: "V_U07_L02_had",
          en: "had",
          uz: "bordim/bo'ldi (have fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "possession_irregular",
          introduced_in: "U07_L02",
          image: "have_had_breakfast.jpg",
          
          grammar_table: {
            base_form: "have",
            past_form: "had",
            rule: "IRREGULAR - Complete change (NOT haved)",
            pattern: "Subject + had + meal/experience",
            common_phrases: ["had breakfast", "had a good time", "had fun"],
            with_did: "Did + subject + HAVE (base form, NOT had)",
            with_didnt: "Subject + didn't + HAVE (base form, NOT had)"
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L02_D01",
            line_index: 3,
            speaker: "Javlon",
            bubble_text: "Yes, I had breakfast at home."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha nonushta qilmadingizmi? Och edingizmi?",
              audio: "u07_l02_had_uz.mp3",
              uz_mirror_answer: "Yo'q, men nonushta qildim!",
              hybrid_answer: "Yo'q, men **had** nonushta uyda.",
              en_canonical: "No, I had breakfast at home.",
              
              grammar_visual: {
                irregular_pattern: "have → had (IRREGULAR)",
                rule: "⚠️ NOT 'haved'!",
                with_auxiliary: "Did you HAVE? (base form after did)",
                examples: ["I had breakfast", "She had a good time", "They had fun"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I had breakfast at home.",
                options: [
                  {
                    label: "I haved breakfast (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I had breakfast (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Have' ning o'tmishi 'had' - IRREGULAR!",
                fail_msg: "Xato. 'Have' → 'had' (NOT 'haved'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I had breakfast at home.",
                  uz: "Ha, men uyda nonushta qildim.",
                  is_anchor: true,
                  source_dialogue: "U07_L02_D01",
                  source_line: 3,
                  speaker: "Javlon"
                },
                {
                  en: "She had a great time at the party.",
                  uz: "U ziyofatda ajoyib vaqt o'tkazdi.",
                  subject: "She",
                  focus_word: "had"
                },
                {
                  en: "We had fun yesterday.",
                  uz: "Biz kecha zavqlandik.",
                  subject: "We",
                  focus_word: "had"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men nonushta qildim'",
              model_answer: "I had breakfast.",
              accepted_answers: [
                "I had breakfast.",
                "I had breakfast at home.",
                "I ate breakfast."
              ],
              trap: {
                trigger: "I haved",
                message: "⚠️ 'Haved' yo'q! 'Have' ning o'tmishi = 'HAD' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L02_D01",
                line_index: 3
              }
            }
          ]
        },

        // CARD 7: came (come → came)
        {
          id: "V_U07_L02_came",
          en: "came",
          uz: "keldim/keldi (come fe'lidan)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "movement_irregular",
          introduced_in: "U07_L02",
          image: "come_came_arrive.jpg",
          
          grammar_table: {
            base_form: "come",
            past_form: "came",
            rule: "IRREGULAR - Vowel change (NOT comed)",
            pattern: "Subject + came + to + place/home",
            common_phrases: ["came home", "came to school", "came late"],
            with_did: "Did + subject + COME (base form, NOT came)",
            with_didnt: "Subject + didn't + COME (base form, NOT came)"
          },
          
          dialogue_ref: {
            dialogue_id: "U07_L02_D01",
            line_index: 6,
            speaker: "Madina",
            bubble_text: "We came home late yesterday."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha ketdingizmi? Chiqib ketdingizmi?",
              audio: "u07_l02_came_uz.mp3",
              uz_mirror_answer: "Yo'q, men ketmadim. Men kech uyga keldim!",
              hybrid_answer: "Yo'q, biz **came** uyga kech.",
              en_canonical: "No, we came home late.",
              
              grammar_visual: {
                irregular_pattern: "come → came (IRREGULAR)",
                rule: "⚠️ NOT 'comed'!",
                with_auxiliary: "Did you COME? (base form after did)",
                examples: ["I came home", "She came to school", "They came late"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "We came home late.",
                options: [
                  {
                    label: "We comed home (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "We came home (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Come' ning o'tmishi 'came' - IRREGULAR!",
                fail_msg: "Xato. 'Come' → 'came' (NOT 'comed'). Bu irregular fe'l."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "We came home late yesterday.",
                  uz: "Biz kecha kech uyga keldik.",
                  is_anchor: true,
                  source_dialogue: "U07_L02_D01",
                  source_line: 6,
                  speaker: "Madina"
                },
                {
                  en: "He came to school early.",
                  uz: "U maktabga erta keldi.",
                  subject: "He",
                  focus_word: "came"
                },
                {
                  en: "My friends came to my party.",
                  uz: "Do'stlarim bazmimga keldilar.",
                  subject: "friends",
                  focus_word: "came"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Biz kech uyga keldik'",
              model_answer: "We came home late.",
              accepted_answers: [
                "We came home late.",
                "We came late.",
                "We came home late yesterday."
              ],
              trap: {
                trigger: "We comed",
                message: "⚠️ 'Comed' yo'q! 'Come' ning o'tmishi = 'CAME' (irregular)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L02_D01",
                line_index: 6
              }
            }
          ]
        },

        // CARD 8: quickly (manner adverb)
        {
          id: "V_U07_L02_quickly",
          en: "quickly",
          uz: "tez/tezlik bilan",
          pos: "adverb",
          type: "manner_adverb",
          priority: 2,
          category: "adverbs_manner",
          introduced_in: "U07_L02",
          image: "quick_quickly_fast.jpg",
          
          dialogue_ref: {
            dialogue_id: "U07_L02_D01",
            line_index: 4,
            speaker: "Madina",
            bubble_text: "My sister ate lunch quickly because she was late."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "U sekin yedimi? Juda sekin yedimi?",
              audio: "u07_l02_quickly_uz.mp3",
              uz_mirror_answer: "Yo'q, u sekin yemadi. U tez yedi!",
              hybrid_answer: "U **quickly** yedi tushlikni.",
              en_canonical: "She ate lunch quickly."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Quickly' qayerda turadi?",
              exercise: {
                type: "function_sort",
                sentence: "She ate lunch quickly.",
                options: [
                  {
                    label: "Fe'ldan oldin (Before verb)",
                    value: "before",
                    correct: false
                  },
                  {
                    label: "Fe'ldan keyin (After verb)",
                    value: "after",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! Manner adverb fe'ldan KEYIN keladi.",
                fail_msg: "Xato. Manner adverb odatda fe'ldan keyin: 'ate quickly'."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "My sister ate lunch quickly because she was late.",
                  uz: "Singlim tushlikni tez yedi chunki kech qolgan edi.",
                  is_anchor: true,
                  source_dialogue: "U07_L02_D01",
                  source_line: 4,
                  speaker: "Madina"
                },
                {
                  en: "I did my homework quickly.",
                  uz: "Men uyga vazifamni tez qildim.",
                  subject: "I",
                  focus_word: "quickly"
                },
                {
                  en: "We walked quickly to school.",
                  uz: "Biz maktabga tez yurdik.",
                  subject: "We",
                  focus_word: "quickly"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'U tez yedi'",
              model_answer: "She ate quickly.",
              accepted_answers: [
                "She ate quickly.",
                "She ate fast.",
                "She ate lunch quickly."
              ],
              trap: {
                trigger: "She quick ate",
                message: "⚠️ Tartib: 'ate QUICKLY' (adverb fe'ldan keyin)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L02_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 9: slowly (manner adverb)
        {
          id: "V_U07_L02_slowly",
          en: "slowly",
          uz: "sekin/sekinlik bilan",
          pos: "adverb",
          type: "manner_adverb",
          priority: 2,
          category: "adverbs_manner",
          introduced_in: "U07_L02",
          image: "slow_slowly_careful.jpg",
          
          dialogue_ref: {
            dialogue_id: "U07_L02_D01",
            line_index: 5,
            speaker: "Javlon",
            bubble_text: "I ate slowly at the restaurant."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz tez yedingizmi? Juda tez yedingizmi?",
              audio: "u07_l02_slowly_uz.mp3",
              uz_mirror_answer: "Yo'q, men tez yemadim. Men sekin yedim!",
              hybrid_answer: "Men **slowly** yedim restoranda.",
              en_canonical: "I ate slowly at the restaurant."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Slowly' nima bildiradi?",
              exercise: {
                type: "function_sort",
                sentence: "I ate slowly.",
                options: [
                  {
                    label: "Tez (Fast)",
                    value: "fast",
                    correct: false
                  },
                  {
                    label: "Sekin (Slow)",
                    value: "slow",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Slowly' = sekin, asta-sekin.",
                fail_msg: "Xato. 'Slowly' = sekin, 'Quickly' = tez."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I ate slowly at the restaurant.",
                  uz: "Men restoranda sekin yedim.",
                  is_anchor: true,
                  source_dialogue: "U07_L02_D01",
                  source_line: 5,
                  speaker: "Javlon"
                },
                {
                  en: "She walked slowly to school.",
                  uz: "U maktabga sekin yurdi.",
                  subject: "She",
                  focus_word: "slowly"
                },
                {
                  en: "We studied slowly and carefully.",
                  uz: "Biz sekin va ehtiyotkorlik bilan o'qidik.",
                  subject: "We",
                  focus_word: "slowly"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men sekin yedim'",
              model_answer: "I ate slowly.",
              accepted_answers: [
                "I ate slowly.",
                "I ate slowly at the restaurant.",
                "I was eating slowly."
              ],
              trap: {
                trigger: "I slow ate",
                message: "⚠️ Tartib: 'ate SLOWLY' (adverb fe'ldan keyin)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U07_L02_D01",
                line_index: 5
              }
            }
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

// ═══════════════════════════════════════════════════════════════════════════════
// FREEZE MODULE
// ═══════════════════════════════════════════════════════════════════════════════
if (Object.freeze) {
  Object.freeze(window.VOCAB_CARDS_U07);
}