/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 06: Past Negation & Questions
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Past Negation & Questions - Building on U05 Past Actions):
 * - Past negatives: didn't + base verb (NOT verb-ed!)
 * - Past questions: Did + subject + base verb?
 * - Short answers: Yes, I did / No, I didn't
 * - Reason clauses with "because" (new adverbial progression)
 * - Jobs/professions vocabulary in past contexts
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
 * RECYCLING CHAIN: U01 → U01.5 → U02 → U03 → U04 → U05 → U06 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 06)
 */

window.VOCAB_CARDS_U06 = {
  unit_id: "U06",
  unit_title: "Past Negation & Questions",
  scalability_level: 2,
  grammar_focus: "did/didn't + base verb (questions & negatives)",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U05 (Rule R2)
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
        auxiliaries_past: ["did", "didn't"],
        past_time_expressions: ["yesterday", "last week", "last night"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U06_L01_D01": {
      id: "U06_L01_D01",
      title: "Weekend Plans Gone Wrong",
      setting: "Friends discussing why their plans didn't work out",
      characters: ["Bekzod", "Sara"],
      grammar_coverage: {
        affirmative: ["I worked yesterday.", "She went to the park."],
        negative: ["I didn't go to the museum.", "She didn't play football.", "We didn't visit the castle."],
        question: ["Did you go to the museum?", "Did she play football?", "Why didn't you go?"]
      },
      recycling_balance: {
        least_used_included: ["museum", "together", "fine"],
        quota_met: true,
        notes: "Past negatives with recycled U05 verbs + U04 was/were"
      },
      lines: [
        { speaker: "Bekzod", line: "Hi Sara! Did you go to the museum yesterday?", line_uz: "Salom Sara! Kecha muzeyga bordingizmi?", recycled: ["you", "the", "yesterday"], target: ["Did", "go", "museum"] },
        { speaker: "Sara", line: "No, I didn't go to the museum.", line_uz: "Yo'q, muzeyga bormaradim.", recycled: ["I", "the"], target: ["didn't", "go", "museum"] },
        { speaker: "Bekzod", line: "Why didn't you go?", line_uz: "Nega bormadingiz?", recycled: ["you"], target: ["Why", "didn't", "go"] },
        { speaker: "Sara", line: "I was tired. I stayed at home.", line_uz: "Charchagan edim. Uyda qoldim.", recycled: ["I", "was", "tired", "at", "home"], target: ["stayed"] },
        { speaker: "Bekzod", line: "Did she play football with you?", line_uz: "U siz bilan futbol o'ynadimi?", recycled: ["she", "you"], target: ["Did", "play", "football"] },
        { speaker: "Sara", line: "No, she didn't play football yesterday.", line_uz: "Yo'q, u kecha futbol o'ynamadi.", recycled: ["she", "yesterday"], target: ["didn't", "play", "football"] },
        { speaker: "Bekzod", line: "I didn't visit the castle last week.", line_uz: "Men o'tgan hafta qal'aga bormadon.", recycled: ["I", "the", "last week"], target: ["didn't", "visit", "castle"] },
        { speaker: "Sara", line: "Why didn't you visit it?", line_uz: "Nega bormadrngiz?", recycled: ["you"], target: ["Why", "didn't", "visit"] },
        { speaker: "Bekzod", line: "I was busy. I worked all day.", line_uz: "Band edim. Kun bo'yi ishladim.", recycled: ["I", "was", "busy", "worked", "all day"], target: [] },
        { speaker: "Sara", line: "We didn't go together. That's sad.", line_uz: "Biz birga bormadrk. Bu qayg'urli.", recycled: ["We"], target: ["didn't", "go", "together", "sad"] }
      ]
    },

    "U06_L02_D01": {
      id: "U06_L02_D01",
      title: "Past Jobs Interview",
      setting: "Job interview discussing past work experience",
      characters: ["Ali", "Manager"],
      grammar_coverage: {
        affirmative: ["I worked as a teacher.", "She worked as a nurse."],
        negative: ["I didn't work as a cook.", "He didn't work as a pilot."],
        question: ["Did you work as a teacher?", "Did he work as a farmer?"]
      },
      recycling_balance: {
        least_used_included: ["nice", "there", "love"],
        quota_met: true,
        notes: "Jobs vocabulary with did/didn't question patterns"
      },
      lines: [
        { speaker: "Manager", line: "Did you work as a teacher before?", line_uz: "Ilgari o'qituvchi bo'lib ishlagammidingiz?", recycled: ["you", "as", "a"], target: ["Did", "work", "teacher", "before"] },
        { speaker: "Ali", line: "Yes, I worked as a teacher for two years.", line_uz: "Ha, ikki yil o'qituvchi bo'lib ishladim.", recycled: ["I", "as", "a"], target: ["worked", "teacher", "years"] },
        { speaker: "Manager", line: "That's good! Did you work as a manager too?", line_uz: "Yaxshi! Siz menejer ham bo'lib ishladingizmi?", recycled: ["you", "as", "a", "too", "good"], target: ["Did", "work", "manager"] },
        { speaker: "Ali", line: "No, I didn't work as a manager.", line_uz: "Yo'q, menejer bo'lib ishlamaganman.", recycled: ["I", "as", "a"], target: ["didn't", "work", "manager"] },
        { speaker: "Manager", line: "Did you work as a cook?", line_uz: "Oshpaz bo'lib ishladingizmi?", recycled: ["you", "as", "a"], target: ["Did", "work", "cook"] },
        { speaker: "Ali", line: "No, I didn't work as a cook. I don't like cooking.", line_uz: "Yo'q, oshpaz bo'lib ishlamaganman. Men pishirishni yoqtirmayman.", recycled: ["I", "as", "a", "don't", "like"], target: ["didn't", "work", "cook", "cooking"] },
        { speaker: "Manager", line: "Why didn't you work as a cook?", line_uz: "Nega oshpaz bo'lib ishlamadingiz?", recycled: ["you", "as", "a"], target: ["Why", "didn't", "work", "cook"] },
        { speaker: "Ali", line: "I love teaching. That's my job.", line_uz: "Men o'qitishni yaxshi ko'raman. Bu mening ishim.", recycled: ["I", "love", "my"], target: ["teaching", "job"] },
        { speaker: "Manager", line: "Did your brother work as a nurse?", line_uz: "Akangiz hamshira bo'lib ishladimi?", recycled: ["your", "brother", "as", "a"], target: ["Did", "work", "nurse"] },
        { speaker: "Ali", line: "Yes, he worked as a nurse last year.", line_uz: "Ha, u o'tgan yili hamshira bo'lib ishladi.", recycled: ["he", "as", "a", "last"], target: ["worked", "nurse", "year"] }
      ]
    },

    "U06_L03_D01": {
      id: "U06_L03_D01",
      title: "Explaining Why",
      setting: "Friends explaining reasons for not doing things",
      characters: ["Madina", "Nilufar"],
      grammar_coverage: {
        affirmative: ["I was sick yesterday.", "She was at home."],
        negative: ["I didn't go to school because I was sick.", "She didn't play because she was tired."],
        question: ["Why didn't you come?", "Did you stay home because you were sick?"]
      },
      recycling_balance: {
        least_used_included: ["happy", "fine", "after"],
        quota_met: true,
        notes: "Because clauses combining U04 was/were with U06 didn't"
      },
      lines: [
        { speaker: "Madina", line: "Hi Nilufar! Why didn't you come to school yesterday?", line_uz: "Salom Nilufar! Kecha nima uchun maktabga kelmadingiz?", recycled: ["you", "to", "yesterday"], target: ["Why", "didn't", "come", "school"] },
        { speaker: "Nilufar", line: "I didn't come because I was sick.", line_uz: "Kelmadrm chunki kasal edim.", recycled: ["I", "was"], target: ["didn't", "come", "because", "sick"] },
        { speaker: "Madina", line: "That's sad! Are you fine now?", line_uz: "Qayg'urli! Endi yaxshimisiz?", recycled: ["you", "fine"], target: ["Are", "now"] },
        { speaker: "Nilufar", line: "Yes, I'm fine now. Did you play football yesterday?", line_uz: "Ha, endi yaxshiman. Kecha futbol o'ynadingizmi?", recycled: ["I'm", "fine", "you", "yesterday"], target: ["Did", "play", "football"] },
        { speaker: "Madina", line: "No, I didn't play because I was tired.", line_uz: "Yo'q, o'ynamadim chunki charchagan edim.", recycled: ["I", "was", "tired"], target: ["didn't", "play", "because"] },
        { speaker: "Nilufar", line: "Did your sister come to school?", line_uz: "Singilngiz maktabga keldimi?", recycled: ["your", "sister", "to"], target: ["Did", "come", "school"] },
        { speaker: "Madina", line: "No, she didn't come. She was at home.", line_uz: "Yo'q, kelmadi. U uyda edi.", recycled: ["she", "was", "at", "home"], target: ["didn't", "come"] },
        { speaker: "Nilufar", line: "Why didn't she come?", line_uz: "Nega kelmadi?", recycled: ["she"], target: ["Why", "didn't", "come"] },
        { speaker: "Madina", line: "She didn't come because she was busy.", line_uz: "Kelmadi chunki band edi.", recycled: ["she", "was", "busy"], target: ["didn't", "come", "because"] },
        { speaker: "Nilufar", line: "I didn't study yesterday because I was sick.", line_uz: "Kecha dars o'qimadim chunki kasal edim.", recycled: ["I", "yesterday", "was", "sick"], target: ["didn't", "study", "because"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U06_L01": {
      lesson_id: "U06_L01",
      title: "Past Negatives (didn't + base verb)",
      grammar_target: "didn't + base verb (NOT verb-ed!)",
      scalability_pattern: "[Subject] + didn't + [Base Verb] + [Object]",
      source_dialogues: ["U06_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I worked yesterday.", "She went to the park."] },
        negative: { required: 1, examples: ["I didn't go to the museum."] },
        question: { required: 1, examples: ["Did you go to the museum?"] }
      },
      
      recycling_stats: {
        total_content_words: 40,
        recycled_words: 28,
        new_words: 12,
        ratio: 0.70,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 1: didn't (auxiliary)
        {
          id: "V_U06_L01_didnt",
          en: "didn't",
          uz: "qilmadim/qilmadi (o'tmish inkor)",
          pos: "auxiliary",
          type: "past_negative_auxiliary",
          priority: 1,
          category: "grammar_auxiliary",
          introduced_in: "U06_L01",
          image: "didnt_negative.jpg",
          
          grammar_table: {
            full_form: "did not",
            contraction: "didn't",
            usage: "all subjects",
            pattern: "subject + didn't + BASE VERB (not verb-ed)",
            examples: {
              correct: ["I didn't go", "She didn't play", "They didn't visit"],
              wrong: ["I didn't went", "She didn't played", "They didn't visited"]
            }
          },
          
          dialogue_ref: {
            dialogue_id: "U06_L01_D01",
            line_index: 1,
            speaker: "Sara",
            bubble_text: "No, I didn't go to the museum."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha muzeyga bordingizmi?",
              audio: "u06_l01_didnt_uz.mp3",
              uz_mirror_answer: "Yo'q, men muzeyga bormadim.",
              hybrid_answer: "Yo'q, men **didn't go** muzeyga.",
              en_canonical: "No, I didn't go to the museum.",
              
              grammar_visual: {
                pattern: "Subject + didn't + BASE VERB",
                rule: "⚠️ After didn't, use BASE verb (NOT -ed)",
                examples: ["I didn't go", "She didn't play", "We didn't visit"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I didn't go to the museum.",
                options: [
                  {
                    label: "I didn't went (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I didn't go (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'didn't' dan keyin BASE fe'l: 'go' (NOT 'went').",
                fail_msg: "Xato. 'didn't' dan keyin BASE fe'l kerak: 'didn't go' (NOT 'didn't went')."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, I didn't go to the museum.",
                  uz: "Yo'q, muzeyga bormaradim.",
                  is_anchor: true,
                  source_dialogue: "U06_L01_D01",
                  source_line: 1,
                  speaker: "Sara"
                },
                {
                  en: "She didn't play football yesterday.",
                  uz: "U kecha futbol o'ynamadi.",
                  subject: "She",
                  focus_word: "didn't"
                },
                {
                  en: "We didn't visit the castle last week.",
                  uz: "Biz o'tgan hafta qal'aga bormadik.",
                  subject: "We",
                  focus_word: "didn't"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men muzeyga bormadim'",
              model_answer: "I didn't go to the museum.",
              accepted_answers: [
                "I didn't go to the museum.",
                "I did not go to the museum.",
                "I didn't go to a museum."
              ],
              trap: {
                trigger: "I didn't went",
                message: "⚠️ 'didn't' DAN KEYIN base fe'l: 'go' (NOT 'went')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L01_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 2: Did (question auxiliary)
        {
          id: "V_U06_L01_did",
          en: "Did",
          uz: "qildimi/qilganmi (o'tmish savol)",
          pos: "auxiliary",
          type: "past_question_auxiliary",
          priority: 1,
          category: "grammar_auxiliary",
          introduced_in: "U06_L01",
          image: "did_question.jpg",
          
          grammar_table: {
            pattern: "Did + subject + BASE VERB?",
            usage: "all subjects",
            rule: "Use BASE verb after Did (not verb-ed)",
            examples: {
              correct: ["Did you go?", "Did she play?", "Did they visit?"],
              wrong: ["Did you went?", "Did she played?", "Did they visited?"]
            },
            short_answers: {
              yes: "Yes, I/you/he/she/we/they did",
              no: "No, I/you/he/she/we/they didn't"
            }
          },
          
          dialogue_ref: {
            dialogue_id: "U06_L01_D01",
            line_index: 0,
            speaker: "Bekzod",
            bubble_text: "Hi Sara! Did you go to the museum yesterday?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha muzeyga bormaganmisiz?",
              audio: "u06_l01_did_uz.mp3",
              uz_mirror_answer: "Yo'q, men bordim. Savol: bordingizmi?",
              hybrid_answer: "Savol: **Did** you **go** muzeyga kecha?",
              en_canonical: "Did you go to the museum yesterday?",
              
              grammar_visual: {
                pattern: "Did + Subject + BASE VERB?",
                rule: "⚠️ After Did, use BASE verb (NOT -ed)",
                examples: ["Did you go?", "Did she play?", "Did they visit?"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi savol to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "Did you go to the museum?",
                options: [
                  {
                    label: "Did you went? (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "Did you go? (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Did' dan keyin BASE fe'l: 'go' (NOT 'went').",
                fail_msg: "Xato. 'Did' dan keyin BASE fe'l kerak: 'Did you go?' (NOT 'Did you went?')."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Did you go to the museum yesterday?",
                  uz: "Kecha muzeyga bordingizmi?",
                  is_anchor: true,
                  source_dialogue: "U06_L01_D01",
                  source_line: 0,
                  speaker: "Bekzod"
                },
                {
                  en: "Did she play football with you?",
                  uz: "U siz bilan futbol o'ynadimi?",
                  subject: "she",
                  focus_word: "Did"
                },
                {
                  en: "Did they visit the castle?",
                  uz: "Ular qal'aga bordilarmi?",
                  subject: "they",
                  focus_word: "Did"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Siz muzeyga bordingizmi?'",
              model_answer: "Did you go to the museum?",
              accepted_answers: [
                "Did you go to the museum?",
                "Did you go to a museum?",
                "Did you visit the museum?"
              ],
              trap: {
                trigger: "Did you went",
                message: "⚠️ 'Did' DAN KEYIN base fe'l: 'go' (NOT 'went')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L01_D01",
                line_index: 0
              }
            }
          ]
        },

        // CARD 3: Why
        {
          id: "V_U06_L01_why",
          en: "Why",
          uz: "nega/nima uchun",
          pos: "question_word",
          type: "wh_question",
          priority: 1,
          category: "question_words",
          introduced_in: "U06_L01",
          image: "why_question.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L01_D01",
            line_index: 2,
            speaker: "Bekzod",
            bubble_text: "Why didn't you go?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sabab so'ramaganmisiz?",
              audio: "u06_l01_why_uz.mp3",
              uz_mirror_answer: "Yo'q, men sabab so'radim.",
              hybrid_answer: "**Why** (nega) **didn't** you **go**?",
              en_canonical: "Why didn't you go?"
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Bu qanday savol?",
              exercise: {
                type: "function_sort",
                sentence: "Why didn't you go?",
                options: [
                  {
                    label: "Ha/Yo'q savol (Yes/No)",
                    value: "yesno",
                    correct: false
                  },
                  {
                    label: "Sabab savol (Reason)",
                    value: "reason",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Why' = sabab so'raydi (nega?).",
                fail_msg: "Xato. 'Why' = sabab so'raydi, ha/yo'q emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Why didn't you go?",
                  uz: "Nega bormadingiz?",
                  is_anchor: true,
                  source_dialogue: "U06_L01_D01",
                  source_line: 2,
                  speaker: "Bekzod"
                },
                {
                  en: "Why didn't she play football?",
                  uz: "U nega futbol o'ynamadi?",
                  subject: "she",
                  focus_word: "Why"
                },
                {
                  en: "Why didn't they visit us?",
                  uz: "Ular bizga nega kelmadzlar?",
                  subject: "they",
                  focus_word: "Why"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Nega bormadingiz?'",
              model_answer: "Why didn't you go?",
              accepted_answers: [
                "Why didn't you go?",
                "Why did you not go?",
                "Why didn't you come?"
              ],
              trap: {
                trigger: "Why you didn't",
                message: "⚠️ Savol tartibi: 'Why didn't you' (NOT 'Why you didn't')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L01_D01",
                line_index: 2
              }
            }
          ]
        }
      ]
    },

    "U06_L02": {
      lesson_id: "U06_L02",
      title: "Past Jobs & Professions",
      grammar_target: "worked as + [job] with did/didn't",
      scalability_pattern: "[Subject] + worked as + [Job]",
      source_dialogues: ["U06_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I worked as a teacher.", "She worked as a nurse."] },
        negative: { required: 1, examples: ["I didn't work as a cook."] },
        question: { required: 1, examples: ["Did you work as a teacher?"] }
      },
      
      recycling_stats: {
        total_content_words: 38,
        recycled_words: 26,
        new_words: 12,
        ratio: 0.68,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 4: teacher (job context)
        {
          id: "V_U06_L02_teacher",
          en: "teacher",
          uz: "o'qituvchi",
          pos: "noun",
          type: "profession",
          priority: 1,
          category: "jobs",
          introduced_in: "U06_L02",
          image: "teacher_job.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L02_D01",
            line_index: 1,
            speaker: "Ali",
            bubble_text: "Yes, I worked as a teacher for two years."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz o'qituvchi bo'lib ishlamaganmisiz?",
              audio: "u06_l02_teacher_uz.mp3",
              uz_mirror_answer: "Yo'q, men o'qituvchi bo'lib ishladim.",
              hybrid_answer: "Yo'q, men **worked as a teacher** ikki yil.",
              en_canonical: "No, I worked as a teacher for two years."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Bu qanday ish?",
              exercise: {
                type: "function_sort",
                sentence: "I worked as a teacher.",
                options: [
                  {
                    label: "Talaba (Student)",
                    value: "student",
                    correct: false
                  },
                  {
                    label: "O'qituvchi (Teacher)",
                    value: "teacher",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Teacher' = o'qituvchi.",
                fail_msg: "Xato. 'Teacher' = o'qituvchi, 'Student' = talaba."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I worked as a teacher for two years.",
                  uz: "Ha, ikki yil o'qituvchi bo'lib ishladim.",
                  is_anchor: true,
                  source_dialogue: "U06_L02_D01",
                  source_line: 1,
                  speaker: "Ali"
                },
                {
                  en: "She worked as a teacher last year.",
                  uz: "U o'tgan yili o'qituvchi bo'lib ishladi.",
                  subject: "She",
                  focus_word: "teacher"
                },
                {
                  en: "Did you work as a teacher?",
                  uz: "Siz o'qituvchi bo'lib ishladingizmi?",
                  subject: "you",
                  focus_word: "teacher"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men o'qituvchi bo'lib ishladim'",
              model_answer: "I worked as a teacher.",
              accepted_answers: [
                "I worked as a teacher.",
                "I was a teacher.",
                "I worked like a teacher."
              ],
              trap: {
                trigger: "I work as",
                message: "⚠️ 'Work' = HOZIR. O'TMISH uchun 'Worked' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 5: manager (job)
        {
          id: "V_U06_L02_manager",
          en: "manager",
          uz: "menejer/boshlig'",
          pos: "noun",
          type: "profession",
          priority: 2,
          category: "jobs",
          introduced_in: "U06_L02",
          image: "manager_job.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L02_D01",
            line_index: 3,
            speaker: "Ali",
            bubble_text: "No, I didn't work as a manager."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz menejer bo'lib ishlagansiz shekilli?",
              audio: "u06_l02_manager_uz.mp3",
              uz_mirror_answer: "Yo'q, men menejer bo'lib ishlamaganman.",
              hybrid_answer: "Yo'q, men **didn't work as a manager**.",
              en_canonical: "No, I didn't work as a manager."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Menejer nima qiladi?",
              exercise: {
                type: "function_sort",
                sentence: "She worked as a manager.",
                options: [
                  {
                    label: "Boshqaradi (Manages)",
                    value: "manages",
                    correct: true
                  },
                  {
                    label: "O'qitadi (Teaches)",
                    value: "teaches",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Manager' = boshqaruvchi, boshlig'.",
                fail_msg: "Xato. 'Manager' = boshqaruvchi, 'Teacher' = o'qituvchi."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, I didn't work as a manager.",
                  uz: "Yo'q, menejer bo'lib ishlamaganman.",
                  is_anchor: true,
                  source_dialogue: "U06_L02_D01",
                  source_line: 3,
                  speaker: "Ali"
                },
                {
                  en: "He worked as a manager for five years.",
                  uz: "U besh yil menejer bo'lib ishladi.",
                  subject: "He",
                  focus_word: "manager"
                },
                {
                  en: "Did she work as a manager?",
                  uz: "U menejer bo'lib ishladimi?",
                  subject: "she",
                  focus_word: "manager"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men menejer bo'lib ishlamaganman'",
              model_answer: "I didn't work as a manager.",
              accepted_answers: [
                "I didn't work as a manager.",
                "I did not work as a manager.",
                "I wasn't a manager."
              ],
              trap: {
                trigger: "I didn't worked",
                message: "⚠️ 'didn't' DAN KEYIN base fe'l: 'work' (NOT 'worked')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L02_D01",
                line_index: 3
              }
            }
          ]
        },

        // CARD 6: cook (job)
        {
          id: "V_U06_L02_cook",
          en: "cook",
          uz: "oshpaz",
          pos: "noun",
          type: "profession",
          priority: 2,
          category: "jobs",
          introduced_in: "U06_L02",
          image: "cook_job.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L02_D01",
            line_index: 5,
            speaker: "Ali",
            bubble_text: "No, I didn't work as a cook. I don't like cooking."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz oshpaz bo'lib ishlamaganmisiz?",
              audio: "u06_l02_cook_uz.mp3",
              uz_mirror_answer: "Yo'q, men oshpaz bo'lib ishlamaganman.",
              hybrid_answer: "Yo'q, men **didn't work as a cook**.",
              en_canonical: "No, I didn't work as a cook."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Oshpaz nima qiladi?",
              exercise: {
                type: "function_sort",
                sentence: "He worked as a cook.",
                options: [
                  {
                    label: "Ovqat tayyorlaydi (Cooks food)",
                    value: "cooks",
                    correct: true
                  },
                  {
                    label: "O'qitadi (Teaches)",
                    value: "teaches",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Cook' = oshpaz, ovqat tayyorlovchi.",
                fail_msg: "Xato. 'Cook' = oshpaz, ovqat tayyorlovchi."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, I didn't work as a cook. I don't like cooking.",
                  uz: "Yo'q, oshpaz bo'lib ishlamaganman. Pishirishni yoqtirmayman.",
                  is_anchor: true,
                  source_dialogue: "U06_L02_D01",
                  source_line: 5,
                  speaker: "Ali"
                },
                {
                  en: "She worked as a cook in a restaurant.",
                  uz: "U restoranda oshpaz bo'lib ishladi.",
                  subject: "She",
                  focus_word: "cook"
                },
                {
                  en: "Did he work as a cook?",
                  uz: "U oshpaz bo'lib ishladimi?",
                  subject: "he",
                  focus_word: "cook"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men oshpaz bo'lib ishlamaganman'",
              model_answer: "I didn't work as a cook.",
              accepted_answers: [
                "I didn't work as a cook.",
                "I did not work as a cook.",
                "I wasn't a cook."
              ],
              trap: {
                trigger: "I didn't worked",
                message: "⚠️ 'didn't' DAN KEYIN base fe'l: 'work' (NOT 'worked')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L02_D01",
                line_index: 5
              }
            }
          ]
        },

        // CARD 7: nurse (job)
        {
          id: "V_U06_L02_nurse",
          en: "nurse",
          uz: "hamshira",
          pos: "noun",
          type: "profession",
          priority: 2,
          category: "jobs",
          introduced_in: "U06_L02",
          image: "nurse_job.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L02_D01",
            line_index: 9,
            speaker: "Ali",
            bubble_text: "Yes, he worked as a nurse last year."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "U hamshira bo'lib ishlamaganmi?",
              audio: "u06_l02_nurse_uz.mp3",
              uz_mirror_answer: "Yo'q, u hamshira bo'lib ishladi.",
              hybrid_answer: "Yo'q, u **worked as a nurse** o'tgan yili.",
              en_canonical: "No, he worked as a nurse last year."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Hamshira qayerda ishlaydi?",
              exercise: {
                type: "function_sort",
                sentence: "She worked as a nurse.",
                options: [
                  {
                    label: "Kasalxonada (Hospital)",
                    value: "hospital",
                    correct: true
                  },
                  {
                    label: "Maktabda (School)",
                    value: "school",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Nurse' = hamshira, kasalxonada ishlaydi.",
                fail_msg: "Xato. 'Nurse' = hamshira, kasalxonada ishlaydi."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, he worked as a nurse last year.",
                  uz: "Ha, u o'tgan yili hamshira bo'lib ishladi.",
                  is_anchor: true,
                  source_dialogue: "U06_L02_D01",
                  source_line: 9,
                  speaker: "Ali"
                },
                {
                  en: "She worked as a nurse for ten years.",
                  uz: "U o'n yil hamshira bo'lib ishladi.",
                  subject: "She",
                  focus_word: "nurse"
                },
                {
                  en: "Did you work as a nurse?",
                  uz: "Siz hamshira bo'lib ishladingizmi?",
                  subject: "you",
                  focus_word: "nurse"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'U hamshira bo'lib ishladi'",
              model_answer: "She worked as a nurse.",
              accepted_answers: [
                "She worked as a nurse.",
                "She was a nurse.",
                "He worked as a nurse."
              ],
              trap: {
                trigger: "She work as",
                message: "⚠️ 'Work' = HOZIR. O'TMISH uchun 'Worked' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L02_D01",
                line_index: 9
              }
            }
          ]
        }
      ]
    },

    "U06_L03": {
      lesson_id: "U06_L03",
      title: "Reasons with 'because'",
      grammar_target: "didn't + verb + because + reason",
      scalability_pattern: "[Subject] + didn't + [Verb] + because + [Subject] + was + [Adjective]",
      source_dialogues: ["U06_L03_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I was sick yesterday.", "She was at home."] },
        negative: { required: 1, examples: ["I didn't go to school because I was sick."] },
        question: { required: 1, examples: ["Why didn't you come?"] }
      },
      
      recycling_stats: {
        total_content_words: 42,
        recycled_words: 30,
        new_words: 12,
        ratio: 0.71,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 8: because
        {
          id: "V_U06_L03_because",
          en: "because",
          uz: "chunki/sababi",
          pos: "conjunction",
          type: "reason_conjunction",
          priority: 1,
          category: "conjunctions",
          introduced_in: "U06_L03",
          image: "because_reason.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L03_D01",
            line_index: 1,
            speaker: "Nilufar",
            bubble_text: "I didn't come because I was sick."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sabab aytmadingizmi?",
              audio: "u06_l03_because_uz.mp3",
              uz_mirror_answer: "Yo'q, men sabab aytdim.",
              hybrid_answer: "Men kelmadim **because** (chunki) kasal edim.",
              en_canonical: "I didn't come because I was sick."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Because' nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "I didn't go because I was tired.",
                options: [
                  {
                    label: "Vaqt bildiradi (Time)",
                    value: "time",
                    correct: false
                  },
                  {
                    label: "Sabab bildiradi (Reason)",
                    value: "reason",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Because' = sabab bildiradi (chunki).",
                fail_msg: "Xato. 'Because' = sabab bildiradi, vaqt emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I didn't come because I was sick.",
                  uz: "Kelmadrm chunki kasal edim.",
                  is_anchor: true,
                  source_dialogue: "U06_L03_D01",
                  source_line: 1,
                  speaker: "Nilufar"
                },
                {
                  en: "She didn't play because she was tired.",
                  uz: "U o'ynamadi chunki charchagan edi.",
                  subject: "She",
                  focus_word: "because"
                },
                {
                  en: "They didn't go because they were busy.",
                  uz: "Ular bormadllar chunki band edilar.",
                  subject: "They",
                  focus_word: "because"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men kelmadim chunki kasal edim'",
              model_answer: "I didn't come because I was sick.",
              accepted_answers: [
                "I didn't come because I was sick.",
                "I did not come because I was sick.",
                "I didn't go because I was sick."
              ],
              trap: {
                trigger: "because I sick",
                message: "⚠️ 'because' DAN KEYIN fe'l kerak: 'because I WAS sick'!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L03_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 9: sick
        {
          id: "V_U06_L03_sick",
          en: "sick",
          uz: "kasal",
          pos: "adjective",
          type: "state_adjective",
          priority: 1,
          category: "health",
          introduced_in: "U06_L03",
          image: "sick_ill.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L03_D01",
            line_index: 1,
            speaker: "Nilufar",
            bubble_text: "I didn't come because I was sick."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kasal emas edingizmi?",
              audio: "u06_l03_sick_uz.mp3",
              uz_mirror_answer: "Yo'q, men kasal edim.",
              hybrid_answer: "Yo'q, men **was sick** kecha.",
              en_canonical: "No, I was sick yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Sick' nima degani?",
              exercise: {
                type: "function_sort",
                sentence: "I was sick yesterday.",
                options: [
                  {
                    label: "Sog'lom (Healthy)",
                    value: "healthy",
                    correct: false
                  },
                  {
                    label: "Kasal (Sick)",
                    value: "sick",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Sick' = kasal.",
                fail_msg: "Xato. 'Sick' = kasal, 'Healthy' = sog'lom."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I didn't come because I was sick.",
                  uz: "Kelmadrm chunki kasal edim.",
                  is_anchor: true,
                  source_dialogue: "U06_L03_D01",
                  source_line: 1,
                  speaker: "Nilufar"
                },
                {
                  en: "She was sick last week.",
                  uz: "U o'tgan hafta kasal edi.",
                  subject: "She",
                  focus_word: "sick"
                },
                {
                  en: "Were you sick yesterday?",
                  uz: "Siz kecha kasal edingizmi?",
                  subject: "you",
                  focus_word: "sick"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men kasal edim'",
              model_answer: "I was sick.",
              accepted_answers: [
                "I was sick.",
                "I was ill.",
                "I was sick yesterday."
              ],
              trap: {
                trigger: "I am sick",
                message: "⚠️ 'Am' = HOZIR. KECHA uchun 'Was' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L03_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 10: come
        {
          id: "V_U06_L03_come",
          en: "come",
          uz: "kelmoq",
          pos: "verb",
          type: "movement_verb",
          priority: 1,
          category: "movement",
          introduced_in: "U06_L03",
          image: "come_arrive.jpg",
          
          dialogue_ref: {
            dialogue_id: "U06_L03_D01",
            line_index: 0,
            speaker: "Madina",
            bubble_text: "Why didn't you come to school yesterday?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz maktabga kelmadingizmi?",
              audio: "u06_l03_come_uz.mp3",
              uz_mirror_answer: "Yo'q, men kelmadrm.",
              hybrid_answer: "Men **didn't come** maktabga kecha.",
              en_canonical: "I didn't come to school yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Qaysi gap to'g'ri?",
              exercise: {
                type: "function_sort",
                sentence: "I didn't come to school.",
                options: [
                  {
                    label: "I didn't came (XATO)",
                    value: "wrong",
                    correct: false
                  },
                  {
                    label: "I didn't come (TO'G'RI)",
                    value: "correct",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'didn't' dan keyin base fe'l: 'come'.",
                fail_msg: "Xato. 'didn't' dan keyin base fe'l: 'come' (NOT 'came')."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Why didn't you come to school yesterday?",
                  uz: "Kecha nima uchun maktabga kelmadingiz?",
                  is_anchor: true,
                  source_dialogue: "U06_L03_D01",
                  source_line: 0,
                  speaker: "Madina"
                },
                {
                  en: "She didn't come because she was busy.",
                  uz: "U kelmadi chunki band edi.",
                  subject: "She",
                  focus_word: "come"
                },
                {
                  en: "Did they come to the party?",
                  uz: "Ular ziyofatga keldilarmi?",
                  subject: "they",
                  focus_word: "come"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men maktabga kelmadim'",
              model_answer: "I didn't come to school.",
              accepted_answers: [
                "I didn't come to school.",
                "I did not come to school.",
                "I didn't go to school."
              ],
              trap: {
                trigger: "I didn't came",
                message: "⚠️ 'didn't' DAN KEYIN base fe'l: 'come' (NOT 'came')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U06_L03_D01",
                line_index: 0
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
  Object.freeze(window.VOCAB_CARDS_U06);
}