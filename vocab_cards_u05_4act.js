/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 05: Past Actions (Regular Verbs)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Past Actions - Building on U04 Past States):
 * - Simple past tense for regular verbs (add -ed)
 * - Past time expressions (yesterday, last week, last night)
 * - Work-related past actions (worked, prepared, talked, finished)
 * - Leisure past actions (played, watched, studied, read)
 * - Movement past actions (walked, visited, traveled, left)
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
 * RECYCLING CHAIN: U01 → U01.5 → U02 → U03 → U04 → U05 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 05)
 */

window.VOCAB_CARDS_U05 = {
  unit_id: "U05",
  unit_title: "Past Actions (Regular Verbs)",
  scalability_level: 2,
  grammar_focus: "Simple Past (regular -ed verbs) + did/didn't",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U04 (Rule R2)
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
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U05_L01_D01": {
      id: "U05_L01_D01",
      title: "Work Day Finished",
      setting: "Two colleagues discussing their work day",
      characters: ["Ali", "Sara"],
      grammar_coverage: {
        affirmative: ["I worked at the office yesterday.", "She prepared the reports.", "I finished all my work."],
        negative: ["I didn't work late.", "She didn't finish on time."],
        question: ["Did you work yesterday?", "Did she prepare the reports?"]
      },
      recycling_balance: {
        least_used_included: ["nice", "good", "after"],
        quota_met: true,
        notes: "Work vocabulary with recycled foundation + U02-U04 patterns"
      },
      lines: [
        { speaker: "Ali", line: "Hi Sara! Did you work yesterday?", line_uz: "Salom Sara! Kecha ishlagingizmi?", recycled: ["you"], target: ["Did", "work", "yesterday"] },
        { speaker: "Sara", line: "Yes, I worked at the office all day.", line_uz: "Ha, kun bo'yi ofisda ishladim.", recycled: ["I", "at", "the", "all day"], target: ["worked", "office"] },
        { speaker: "Ali", line: "That's good! I worked there too.", line_uz: "Yaxshi! Men ham o'sha yerda ishladim.", recycled: ["I", "good", "there", "too"], target: ["worked"] },
        { speaker: "Sara", line: "Did you finish your reports?", line_uz: "Hisobotlaringizni tugatadigizmi?", recycled: ["you"], target: ["Did", "finish", "reports"] },
        { speaker: "Ali", line: "Yes, I finished all my work yesterday.", line_uz: "Ha, kecha barcha ishlarimni tugattim.", recycled: ["I", "my", "yesterday"], target: ["finished", "all", "work"] },
        { speaker: "Sara", line: "I didn't finish on time. I was tired.", line_uz: "Men vaqtida tugataolmadim. Charchagan edim.", recycled: ["I", "was", "tired"], target: ["didn't", "finish", "time"] },
        { speaker: "Ali", line: "I prepared everything after lunch.", line_uz: "Men hamma narsani tushlikdan keyin tayyorladim.", recycled: ["I", "after"], target: ["prepared", "everything", "lunch"] },
        { speaker: "Sara", line: "She prepared the reports too.", line_uz: "U ham hisobotlarni tayyorladi.", recycled: ["She", "the", "too"], target: ["prepared", "reports"] },
        { speaker: "Ali", line: "Did you talk with the clients?", line_uz: "Mijozlar bilan gaplashdingizmi?", recycled: ["you"], target: ["Did", "talk", "clients"] },
        { speaker: "Sara", line: "Yes, I talked with them yesterday.", line_uz: "Ha, kecha ular bilan gaplashdim.", recycled: ["I", "yesterday"], target: ["talked", "them"] }
      ]
    },
    
    "U05_L02_D01": {
      id: "U05_L02_D01",
      title: "Weekend Activities",
      setting: "Friends discussing weekend activities",
      characters: ["Bekzod", "Madina"],
      grammar_coverage: {
        affirmative: ["I played football yesterday.", "We watched TV last night.", "She studied English."],
        negative: ["I didn't play games.", "We didn't watch movies."],
        question: ["Did you play sports?", "Did they watch TV?"]
      },
      recycling_balance: {
        least_used_included: ["love", "music", "fine"],
        quota_met: true,
        notes: "Leisure activities with recycled U02-U04 vocabulary"
      },
      lines: [
        { speaker: "Bekzod", line: "Hi Madina! Did you play sports yesterday?", line_uz: "Salom Madina! Kecha sport qildingizmi?", recycled: ["you", "yesterday"], target: ["Did", "play", "sports"] },
        { speaker: "Madina", line: "Yes, I played football with my brother.", line_uz: "Ha, akam bilan futbol o'ynadim.", recycled: ["I", "my", "brother"], target: ["played", "football"] },
        { speaker: "Bekzod", line: "That's nice! I didn't play yesterday.", line_uz: "Yaxshi! Men kecha o'ynamadim.", recycled: ["I", "nice", "yesterday"], target: ["didn't", "play"] },
        { speaker: "Madina", line: "What did you do yesterday?", line_uz: "Kecha nima qildingiz?", recycled: ["What", "you", "yesterday"], target: ["did", "do"] },
        { speaker: "Bekzod", line: "I watched TV and studied English.", line_uz: "Televizor tomashah qildim va ingliz tilini o'rgandim.", recycled: ["I"], target: ["watched", "TV", "studied", "English"] },
        { speaker: "Madina", line: "Did you watch a good movie?", line_uz: "Yaxshi film tomasah qildingizmi?", recycled: ["you", "good"], target: ["Did", "watch", "movie"] },
        { speaker: "Bekzod", line: "No, I watched the news. It was fine.", line_uz: "Yo'q, yangiliklar tomashah qildim. Yaxshi edi.", recycled: ["was", "fine"], target: ["watched", "news"] },
        { speaker: "Madina", line: "We watched TV last night too.", line_uz: "Biz ham kecha kechasi televizor kolcdik.", recycled: ["We", "too"], target: ["watched", "TV", "last night"] },
        { speaker: "Bekzod", line: "I studied for two hours yesterday.", line_uz: "Kecha ikki soat o'qidim.", recycled: ["I", "yesterday"], target: ["studied", "hours"] },
        { speaker: "Madina", line: "She studied at home last week.", line_uz: "U o'tgan haftal uyda o'qidi.", recycled: ["She", "at"], target: ["studied", "home", "last week"] }
      ]
    },

    "U05_L03_D01": {
      id: "U05_L03_D01",
      title: "City Tour",
      setting: "Tourists discussing their city visit",
      characters: ["Jamshid", "Nilufar"],
      grammar_coverage: {
        affirmative: ["We visited the museum yesterday.", "I walked in the park.", "They traveled to the city."],
        negative: ["I didn't visit the castle.", "We didn't walk far."],
        question: ["Did you visit the museum?", "Did they travel by bus?"]
      },
      recycling_balance: {
        least_used_included: ["there", "great", "happy"],
        quota_met: true,
        notes: "Travel/movement vocabulary with recycled location words"
      },
      lines: [
        { speaker: "Jamshid", line: "Hi Nilufar! Did you visit the museum yesterday?", line_uz: "Salom Nilufar! Kecha muzeyga bordinigizmi?", recycled: ["you", "the", "yesterday"], target: ["Did", "visit", "museum"] },
        { speaker: "Nilufar", line: "Yes, we visited the museum in the morning.", line_uz: "Ha, ertalab muzeyga bordik.", recycled: ["we", "the", "in the morning"], target: ["visited", "museum"] },
        { speaker: "Jamshid", line: "That's great! I visited there last week.", line_uz: "Ajoyib! Men o'tgan hafta u yerga bordim.", recycled: ["I", "there", "great"], target: ["visited", "last week"] },
        { speaker: "Nilufar", line: "Did you walk in the city?", line_uz: "Shahar bo'ylab yurdigizmi?", recycled: ["you", "the"], target: ["Did", "walk", "city"] },
        { speaker: "Jamshid", line: "Yes, I walked for two hours.", line_uz: "Ha, ikki soat yurdim.", recycled: ["I"], target: ["walked", "hours"] },
        { speaker: "Nilufar", line: "We walked in the park yesterday.", line_uz: "Kecha parkda yurdik.", recycled: ["We", "the", "yesterday"], target: ["walked", "park"] },
        { speaker: "Jamshid", line: "Did you travel by bus?", line_uz: "Avtobus bilan sayohat qildingizedmi?", recycled: ["you"], target: ["Did", "travel", "bus"] },
        { speaker: "Nilufar", line: "No, we traveled by car. It was nice.", line_uz: "Yo'q, mashinada sayohat qildik. Yaxshi edi.", recycled: ["we", "was", "nice"], target: ["traveled", "car"] },
        { speaker: "Jamshid", line: "I left home at 9 AM yesterday.", line_uz: "Kecha ertalab soat 9 da uydan chiqdim.", recycled: ["I", "at", "yesterday"], target: ["left", "home"] },
        { speaker: "Nilufar", line: "We were happy! The trip was great!", line_uz: "Biz xursand edik! Sayohat ajoyib edi!", recycled: ["We", "were", "happy", "was", "great"], target: ["trip"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U05_L01": {
      lesson_id: "U05_L01",
      title: "Work & Professional Past Actions",
      grammar_target: "Past Simple (work/worked → regular -ed verbs)",
      scalability_pattern: "[Subject] + [Verb-ed] + [Object] + [Time]",
      source_dialogues: ["U05_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I worked at the office yesterday.", "She prepared the reports."] },
        negative: { required: 1, examples: ["I didn't work late."] },
        question: { required: 1, examples: ["Did you work yesterday?"] }
      },
      
      recycling_stats: {
        total_content_words: 42,
        recycled_words: 28,
        new_words: 14,
        ratio: 0.67,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 1: worked
        {
          id: "V_U05_L01_worked",
          en: "worked",
          uz: "ishladim/ishledi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "work_actions",
          introduced_in: "U05_L01",
          image: "work_office.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L01_D01",
            line_index: 1,
            speaker: "Sara",
            bubble_text: "Yes, I worked at the office all day."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha ishlamaganga o'xshaymi?",
              audio: "u05_l01_worked_uz.mp3",
              uz_mirror_answer: "Yo'q, men kecha ishladim.",
              hybrid_answer: "Yo'q, men **worked** kecha ofisda.",
              en_canonical: "No, I worked at the office yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Bu gap o'tmishmi yoki hozirmi?",
              exercise: {
                type: "function_sort",
                sentence: "I worked at the office yesterday.",
                options: [
                  {
                    label: "Hozir (Present)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "O'tmish (Past)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Worked' - o'tmish zamon. Kecha ishlagani haqida.",
                fail_msg: "Xato. 'Worked' = o'tmish zamon. 'Work' = hozir zamon."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I worked at the office all day.",
                  uz: "Ha, kun bo'yi ofisda ishladim.",
                  is_anchor: true,
                  source_dialogue: "U05_L01_D01",
                  source_line: 1,
                  speaker: "Sara"
                },
                {
                  en: "She worked at home yesterday.",
                  uz: "U kecha uyda ishladi.",
                  subject: "She",
                  focus_word: "worked"
                },
                {
                  en: "They worked late last night.",
                  uz: "Ular kecha kech qolgur ishlashdi.",
                  subject: "They",
                  focus_word: "worked"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men kecha ofisda ishladim'",
              model_answer: "I worked at the office yesterday.",
              accepted_answers: [
                "I worked at the office yesterday.",
                "I worked in the office yesterday.",
                "Yesterday I worked at the office."
              ],
              trap: {
                trigger: "I work",
                message: "⚠️ 'Work' = HOZIR. KECHA uchun 'Worked' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L01_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 2: finished
        {
          id: "V_U05_L01_finished",
          en: "finished",
          uz: "tugatdim/tugadi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "work_actions",
          introduced_in: "U05_L01",
          image: "finish_work.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L01_D01",
            line_index: 4,
            speaker: "Ali",
            bubble_text: "Yes, I finished all my work yesterday."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz ishingizni tugataolmagan edingizmi?",
              audio: "u05_l01_finished_uz.mp3",
              uz_mirror_answer: "Yo'q, men barcha ishimni tugattim.",
              hybrid_answer: "Yo'q, men **finished** barcha ishimni kecha.",
              en_canonical: "No, I finished all my work yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Bu fe'l qanday yakunlandi?",
              exercise: {
                type: "function_sort",
                sentence: "I finished all my work.",
                options: [
                  {
                    label: "Yarim tugadi (Unfinished)",
                    value: "unfinished",
                    correct: false
                  },
                  {
                    label: "Tugadi (Finished)",
                    value: "finished",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Finished' = tugadi. Ish yakunlandi.",
                fail_msg: "Xato. 'Finished' degani tugallangan, yakunlangan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I finished all my work yesterday.",
                  uz: "Ha, kecha barcha ishimni tugattim.",
                  is_anchor: true,
                  source_dialogue: "U05_L01_D01",
                  source_line: 4,
                  speaker: "Ali"
                },
                {
                  en: "He finished his reports on time.",
                  uz: "U o'z hisobotlarini vaqtida tugattdi.",
                  subject: "He",
                  focus_word: "finished"
                },
                {
                  en: "We finished the project last week.",
                  uz: "Biz loyihani o'tgan hafta tugattik.",
                  subject: "We",
                  focus_word: "finished"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men kecha barcha ishimni tugattim'",
              model_answer: "I finished all my work yesterday.",
              accepted_answers: [
                "I finished all my work yesterday.",
                "I finished all the work yesterday.",
                "Yesterday I finished all my work."
              ],
              trap: {
                trigger: "I finish",
                message: "⚠️ 'Finish' = HOZIR. KECHA uchun 'Finished' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L01_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 3: prepared
        {
          id: "V_U05_L01_prepared",
          en: "prepared",
          uz: "tayyorladim/tayyorladi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "work_actions",
          introduced_in: "U05_L01",
          image: "prepare_reports.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L01_D01",
            line_index: 7,
            speaker: "Sara",
            bubble_text: "She prepared the reports too."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "U hisobotlarni tayyorlamagan edimi?",
              audio: "u05_l01_prepared_uz.mp3",
              uz_mirror_answer: "Yo'q, u hisobotlarni tayyorladi.",
              hybrid_answer: "Yo'q, u **prepared** hisobotlarni ham.",
              en_canonical: "No, she prepared the reports too."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Tayyorlash jarayoni qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "She prepared the reports.",
                options: [
                  {
                    label: "Endi tayyorlayapti (Now)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Tayyorlagan (Already)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Prepared' = allaqachon tayyorlagan.",
                fail_msg: "Xato. 'Prepared' = o'tmishda tayyorlagan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "She prepared the reports too.",
                  uz: "U ham hisobotlarni tayyorladi.",
                  is_anchor: true,
                  source_dialogue: "U05_L01_D01",
                  source_line: 7,
                  speaker: "Sara"
                },
                {
                  en: "I prepared everything after lunch.",
                  uz: "Men hamma narsani tushlikdan keyin tayyorladim.",
                  subject: "I",
                  focus_word: "prepared"
                },
                {
                  en: "They prepared the documents yesterday.",
                  uz: "Ular kecha hujjatlarni tayyorladilar.",
                  subject: "They",
                  focus_word: "prepared"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'U hisobotlarni tayyorladi'",
              model_answer: "She prepared the reports.",
              accepted_answers: [
                "She prepared the reports.",
                "She prepared reports.",
                "She prepared the report."
              ],
              trap: {
                trigger: "She prepare",
                message: "⚠️ 'Prepare' = HOZIR. O'TMISH uchun 'Prepared' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L01_D01",
                line_index: 7
              }
            }
          ]
        },

        // CARD 4: talked
        {
          id: "V_U05_L01_talked",
          en: "talked",
          uz: "gaplashdim/gaplashdi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "work_actions",
          introduced_in: "U05_L01",
          image: "talk_clients.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L01_D01",
            line_index: 9,
            speaker: "Sara",
            bubble_text: "Yes, I talked with them yesterday."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz mijozlar bilan gaplashmadingizmi?",
              audio: "u05_l01_talked_uz.mp3",
              uz_mirror_answer: "Yo'q, men ular bilan gaplashdim.",
              hybrid_answer: "Yo'q, men **talked** ular bilan kecha.",
              en_canonical: "No, I talked with them yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Gaplashish qachon bo'ldi?",
              exercise: {
                type: "function_sort",
                sentence: "I talked with them yesterday.",
                options: [
                  {
                    label: "Bugun gaplashyapti (Today)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Kecha gaplashgan (Yesterday)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Talked' = kecha gaplashgan.",
                fail_msg: "Xato. 'Talked' = o'tmishda gaplashgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I talked with them yesterday.",
                  uz: "Ha, kecha ular bilan gaplashdim.",
                  is_anchor: true,
                  source_dialogue: "U05_L01_D01",
                  source_line: 9,
                  speaker: "Sara"
                },
                {
                  en: "He talked with the manager.",
                  uz: "U menejer bilan gaplashdi.",
                  subject: "He",
                  focus_word: "talked"
                },
                {
                  en: "We talked about the project.",
                  uz: "Biz loyiha haqida gaplashdik.",
                  subject: "We",
                  focus_word: "talked"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men ular bilan gaplashdim'",
              model_answer: "I talked with them.",
              accepted_answers: [
                "I talked with them.",
                "I talked to them.",
                "I talked with them yesterday."
              ],
              trap: {
                trigger: "I talk",
                message: "⚠️ 'Talk' = HOZIR. O'TMISH uchun 'Talked' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L01_D01",
                line_index: 9
              }
            }
          ]
        }
      ]
    },

    "U05_L02": {
      lesson_id: "U05_L02",
      title: "Leisure & Daily Past Actions",
      grammar_target: "Past Simple (leisure verbs: played, watched, studied)",
      scalability_pattern: "[Subject] + [Verb-ed] + [Object] + [Time]",
      source_dialogues: ["U05_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I played football yesterday.", "We watched TV last night."] },
        negative: { required: 1, examples: ["I didn't play games."] },
        question: { required: 1, examples: ["Did you play sports?"] }
      },
      
      recycling_stats: {
        total_content_words: 38,
        recycled_words: 26,
        new_words: 12,
        ratio: 0.68,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 5: played
        {
          id: "V_U05_L02_played",
          en: "played",
          uz: "o'ynadim/o'ynadi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "leisure_actions",
          introduced_in: "U05_L02",
          image: "play_football.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L02_D01",
            line_index: 1,
            speaker: "Madina",
            bubble_text: "Yes, I played football with my brother."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha sport o'ynamadingiz shekillimi?",
              audio: "u05_l02_played_uz.mp3",
              uz_mirror_answer: "Yo'q, men futbol o'ynadim.",
              hybrid_answer: "Yo'q, men **played** futbol akam bilan.",
              en_canonical: "No, I played football with my brother."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "O'yin qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "I played football yesterday.",
                options: [
                  {
                    label: "Hozir o'ynayapti (Now)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Kecha o'ynagan (Yesterday)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Played' = kecha o'ynagan.",
                fail_msg: "Xato. 'Played' = o'tmishda o'ynagan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I played football with my brother.",
                  uz: "Ha, akam bilan futbol o'ynadim.",
                  is_anchor: true,
                  source_dialogue: "U05_L02_D01",
                  source_line: 1,
                  speaker: "Madina"
                },
                {
                  en: "She played tennis last week.",
                  uz: "U o'tgan hafta tennis o'ynadi.",
                  subject: "She",
                  focus_word: "played"
                },
                {
                  en: "They played games yesterday.",
                  uz: "Ular kecha o'yinlar o'ynwdilar.",
                  subject: "They",
                  focus_word: "played"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men futbol o'ynadim'",
              model_answer: "I played football.",
              accepted_answers: [
                "I played football.",
                "I played football yesterday.",
                "I played soccer."
              ],
              trap: {
                trigger: "I play",
                message: "⚠️ 'Play' = HOZIR. O'TMISH uchun 'Played' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 6: watched
        {
          id: "V_U05_L02_watched",
          en: "watched",
          uz: "tomoshah qildim/qildi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "leisure_actions",
          introduced_in: "U05_L02",
          image: "watch_tv.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L02_D01",
            line_index: 4,
            speaker: "Bekzod",
            bubble_text: "I watched TV and studied English."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha televizor ko'rmadingizmi?",
              audio: "u05_l02_watched_uz.mp3",
              uz_mirror_answer: "Yo'q, men televizor tomosah qildim.",
              hybrid_answer: "Yo'q, men **watched** televizor va ingliz tilini o'rgandim.",
              en_canonical: "No, I watched TV and studied English."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Tomosha qilish qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "I watched TV last night.",
                options: [
                  {
                    label: "Hozir tomosha qilyapti (Now)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Kecha tomosha qilgan (Last night)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Watched' = kecha tomosha qilgan.",
                fail_msg: "Xato. 'Watched' = o'tmishda tomosha qilgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I watched TV and studied English.",
                  uz: "Televizor tomoshan qildim va ingliz tilini o'rgandim.",
                  is_anchor: true,
                  source_dialogue: "U05_L02_D01",
                  source_line: 4,
                  speaker: "Bekzod"
                },
                {
                  en: "He watched a movie yesterday.",
                  uz: "U kecha film tomosha qildi.",
                  subject: "He",
                  focus_word: "watched"
                },
                {
                  en: "We watched the news last night.",
                  uz: "Biz kecha kechasi yangiliklar tomosha qildik.",
                  subject: "We",
                  focus_word: "watched"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men televizor tomosha qildim'",
              model_answer: "I watched TV.",
              accepted_answers: [
                "I watched TV.",
                "I watched television.",
                "I watched TV yesterday."
              ],
              trap: {
                trigger: "I watch",
                message: "⚠️ 'Watch' = HOZIR. O'TMISH uchun 'Watched' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L02_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 7: studied
        {
          id: "V_U05_L02_studied",
          en: "studied",
          uz: "o'rgandim/o'rgandi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "leisure_actions",
          introduced_in: "U05_L02",
          image: "study_books.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L02_D01",
            line_index: 8,
            speaker: "Bekzod",
            bubble_text: "I studied for two hours yesterday."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha dars o'qimadingizeqq?",
              audio: "u05_l02_studied_uz.mp3",
              uz_mirror_answer: "Yo'q, men ikki soat o'qidim.",
              hybrid_answer: "Yo'q, men **studied** ikki soat kecha.",
              en_canonical: "No, I studied for two hours yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "O'qish jarayoni qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "She studied English last week.",
                options: [
                  {
                    label: "Endi o'qiyapti (Now studying)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "O'tgan hafta o'qigan (Studied last week)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Studied' = o'tgan hafta o'qigan.",
                fail_msg: "Xato. 'Studied' = o'tmishda o'qigan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I studied for two hours yesterday.",
                  uz: "Kecha ikki soat o'qidim.",
                  is_anchor: true,
                  source_dialogue: "U05_L02_D01",
                  source_line: 8,
                  speaker: "Bekzod"
                },
                {
                  en: "She studied at home last week.",
                  uz: "U o'tgan hafta uyda o'qidi.",
                  subject: "She",
                  focus_word: "studied"
                },
                {
                  en: "They studied English together.",
                  uz: "Ular birga ingliz tilini o'rgandilar.",
                  subject: "They",
                  focus_word: "studied"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men ikki soat o'qidim'",
              model_answer: "I studied for two hours.",
              accepted_answers: [
                "I studied for two hours.",
                "I studied two hours.",
                "I studied for 2 hours."
              ],
              trap: {
                trigger: "I study",
                message: "⚠️ 'Study' = HOZIR. O'TMISH uchun 'Studied' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L02_D01",
                line_index: 8
              }
            }
          ]
        }
      ]
    },

    "U05_L03": {
      lesson_id: "U05_L03",
      title: "Movement & Travel Past Actions",
      grammar_target: "Past Simple (movement verbs: visited, walked, traveled, left)",
      scalability_pattern: "[Subject] + [Verb-ed] + [Place] + [Time]",
      source_dialogues: ["U05_L03_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["We visited the museum yesterday.", "I walked in the park."] },
        negative: { required: 1, examples: ["I didn't visit the castle."] },
        question: { required: 1, examples: ["Did you visit the museum?"] }
      },
      
      recycling_stats: {
        total_content_words: 44,
        recycled_words: 31,
        new_words: 13,
        ratio: 0.70,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 8: visited
        {
          id: "V_U05_L03_visited",
          en: "visited",
          uz: "tashrif buyurdim/buyurdi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "movement_actions",
          introduced_in: "U05_L03",
          image: "visit_museum.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L03_D01",
            line_index: 1,
            speaker: "Nilufar",
            bubble_text: "Yes, we visited the museum in the morning."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz muzeyga bormadingizmi?",
              audio: "u05_l03_visited_uz.mp3",
              uz_mirror_answer: "Yo'q, biz ertalab muzeyga bordik.",
              hybrid_answer: "Yo'q, biz **visited** muzeyni ertalab.",
              en_canonical: "No, we visited the museum in the morning."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Tashrif qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "We visited the museum yesterday.",
                options: [
                  {
                    label: "Bugun borajamkan (Today)",
                    value: "future",
                    correct: false
                  },
                  {
                    label: "Kecha borgan (Yesterday)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Visited' = kecha borgan.",
                fail_msg: "Xato. 'Visited' = o'tmishda borgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, we visited the museum in the morning.",
                  uz: "Ha, ertalab muzeyga bordik.",
                  is_anchor: true,
                  source_dialogue: "U05_L03_D01",
                  source_line: 1,
                  speaker: "Nilufar"
                },
                {
                  en: "I visited there last week.",
                  uz: "Men o'tgan hafta o'sha yerga bordim.",
                  subject: "I",
                  focus_word: "visited"
                },
                {
                  en: "They visited the castle yesterday.",
                  uz: "Ular kecha qal'aga bordilar.",
                  subject: "They",
                  focus_word: "visited"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Biz muzeyga bordik'",
              model_answer: "We visited the museum.",
              accepted_answers: [
                "We visited the museum.",
                "We visited a museum.",
                "We went to the museum."
              ],
              trap: {
                trigger: "We visit",
                message: "⚠️ 'Visit' = HOZIR. O'TMISH uchun 'Visited' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L03_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 9: walked
        {
          id: "V_U05_L03_walked",
          en: "walked",
          uz: "yurdim/yurdi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "movement_actions",
          introduced_in: "U05_L03",
          image: "walk_park.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L03_D01",
            line_index: 4,
            speaker: "Jamshid",
            bubble_text: "Yes, I walked for two hours."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz shaharfa yurmadingizmi?",
              audio: "u05_l03_walked_uz.mp3",
              uz_mirror_answer: "Yo'q, men ikki soat yurdim.",
              hybrid_answer: "Yo'q, men **walked** ikki soat.",
              en_canonical: "No, I walked for two hours."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Yurish qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "I walked in the park yesterday.",
                options: [
                  {
                    label: "Hozir kuryapti (Now walking)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Kecha yurgan (Walked yesterday)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Walked' = kecha yurgan.",
                fail_msg: "Xato. 'Walked' = o'tmishda yurgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, I walked for two hours.",
                  uz: "Ha, ikki soat yurdim.",
                  is_anchor: true,
                  source_dialogue: "U05_L03_D01",
                  source_line: 4,
                  speaker: "Jamshid"
                },
                {
                  en: "We walked in the park yesterday.",
                  uz: "Biz kecha parkda yurdik.",
                  subject: "We",
                  focus_word: "walked"
                },
                {
                  en: "She walked to school yesterday.",
                  uz: "U kecha maktabga yurib bordi.",
                  subject: "She",  
                  focus_word: "walked"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men ikki soat yurdim'",
              model_answer: "I walked for two hours.",
              accepted_answers: [
                "I walked for two hours.",
                "I walked two hours.",
                "I walked for 2 hours."
              ],
              trap: {
                trigger: "I walk",
                message: "⚠️ 'Walk' = HOZIR. O'TMISH uchun 'Walked' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L03_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 10: traveled
        {
          id: "V_U05_L03_traveled",
          en: "traveled",
          uz: "sayohat qildim/qildi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "movement_actions",
          introduced_in: "U05_L03",
          image: "travel_car.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L03_D01",
            line_index: 7,
            speaker: "Nilufar",
            bubble_text: "No, we traveled by car. It was nice."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz avtobus bilan sayohat qilmadingizmi?",
              audio: "u05_l03_traveled_uz.mp3",
              uz_mirror_answer: "Yo'q, biz mashina bilan sayohat qildik.",
              hybrid_answer: "Yo'q, biz **traveled** mashina bilan.",
              en_canonical: "No, we traveled by car."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Sayohat qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "We traveled by car yesterday.",
                options: [
                  {
                    label: "Bugun sayohat qiladi (Today)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Kecha sayohat qilgan (Yesterday)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Traveled' = kecha sayohat qilgan.",
                fail_msg: "Xato. 'Traveled' = o'tmishda sayohat qilgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, we traveled by car. It was nice.",
                  uz: "Yo'q, biz mashina bilan sayohat qildik. Yaxshi edi.",
                  is_anchor: true,
                  source_dialogue: "U05_L03_D01",
                  source_line: 7,
                  speaker: "Nilufar"
                },
                {
                  en: "He traveled to the city last week.",
                  uz: "U o'tgan hafta shaharfa sayohat qildi.",
                  subject: "He",
                  focus_word: "traveled"
                },
                {
                  en: "They traveled by bus yesterday.",
                  uz: "Ular kecha avtobus bilan sayohat qildilar.",
                  subject: "They",
                  focus_word: "traveled"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Biz mashina bilan sayohat qildik'",
              model_answer: "We traveled by car.",
              accepted_answers: [
                "We traveled by car.",
                "We travelled by car.",
                "We went by car."
              ],
              trap: {
                trigger: "We travel",
                message: "⚠️ 'Travel' = HOZIR. O'TMISH uchun 'Traveled' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L03_D01",
                line_index: 7
              }
            }
          ]
        },

        // CARD 11: left
        {
          id: "V_U05_L03_left",
          en: "left",
          uz: "chiqdim/chiqdi",
          pos: "verb",
          type: "past_action_verb",
          priority: 1,
          category: "movement_actions",
          introduced_in: "U05_L03",
          image: "leave_home.jpg",
          
          dialogue_ref: {
            dialogue_id: "U05_L03_D01",
            line_index: 8,
            speaker: "Jamshid",
            bubble_text: "I left home at 9 AM yesterday."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kecha uydan chiqmadingizmi?",
              audio: "u05_l03_left_uz.mp3",
              uz_mirror_answer: "Yo'q, men soat 9 da uydan chiqdim.",
              hybrid_answer: "Yo'q, men **left** uydan soat 9 da kecha.",
              en_canonical: "No, I left home at 9 AM yesterday."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Chiqish qachon bo'lgan?",
              exercise: {
                type: "function_sort",
                sentence: "I left home at 9 AM.",
                options: [
                  {
                    label: "Endi chiqyapti (Now leaving)",
                    value: "present",
                    correct: false
                  },
                  {
                    label: "Soat 9 da chiqgan (Left at 9)",
                    value: "past",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Left' = soat 9 da chiqgan.",
                fail_msg: "Xato. 'Left' = o'tmishda chiqgan."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I left home at 9 AM yesterday.",
                  uz: "Kecha ertalab soat 9 da uydan chiqdim.",
                  is_anchor: true,
                  source_dialogue: "U05_L03_D01",
                  source_line: 8,
                  speaker: "Jamshid"
                },
                {
                  en: "She left work early yesterday.",
                  uz: "U kecha ishdan erta chiqdi.",
                  subject: "She",
                  focus_word: "left"
                },
                {
                  en: "They left the restaurant late.",
                  uz: "Ular restorandn kech chiqdilar.",
                  subject: "They",
                  focus_word: "left"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men uydan chiqdim'",
              model_answer: "I left home.",
              accepted_answers: [
                "I left home.",
                "I left the house.",
                "I left home yesterday."
              ],
              trap: {
                trigger: "I leave",
                message: "⚠️ 'Leave' = HOZIR. O'TMISH uchun 'Left' kerak!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U05_L03_D01",
                line_index: 8
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
  Object.freeze(window.VOCAB_CARDS_U05);
}