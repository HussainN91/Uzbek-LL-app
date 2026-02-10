/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 04: Past States & Feelings
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ALIGNED TO: Master_Document.md (February 2026)
 * SCALABILITY LEVEL: Level 1 (Past State - was/were)
 * CORE PATTERN: [Subject] + was/were + [State/Location] + [Time]
 * 
 * STRUCTURE COMPLIANCE:
 * ✅ Constraint #1: All vocabulary appears in dialogues
 * ✅ Constraint #2: Anchor sentences extracted from dialogues
 * ✅ Constraint #3: Grammar forms (+), (-), (?) covered
 * ✅ Constraint #4: Recycling tracked with source units
 * ✅ Constraint #5: All 6 vocab card elements present
 * 
 * RECYCLING SOURCES:
 * - U01: Subject pronouns, TO BE (am/is/are), possessives, articles
 * - U02: Time markers (every day, in the morning), action verbs
 * - U03: Preference verbs (like, love), emotion adjectives
 * 
 * @version 3.0.0 - Master Document Aligned
 */

window.VOCAB_CARDS_U04 = {
  unit_id: "U04",
  unit_title: "Past States & Feelings",
  scalability_level: 1,
  grammar_focus: "was/were + adjective/location",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from previous units
  // ═══════════════════════════════════════════════════════════════════════════
  recycling: {
    mandatory: {
      from_u01: {
        subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
        to_be_present: ["am", "is", "are"],
        possessive_det: ["my", "your", "his", "her", "our", "their"],
        question_words: ["what", "where", "who", "how", "when", "why"],
        articles: ["a", "an", "the"],
        prepositions: ["in", "on", "at", "to", "from", "with"]
      },
      from_u02: {
        time_markers: ["every day", "in the morning", "in the evening", "at night"],
        action_verbs: ["wake up", "go", "work", "study", "play"],
        frequency: ["always", "usually", "sometimes"]
      },
      from_u03: {
        preference_verbs: ["like", "love", "hate"],
        emotion_adj: ["happy", "sad", "tired"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U04_L01_D01": {
      id: "U04_L01_D01",
      title: "How Was Your Day?",
      setting: "Two friends meeting after work",
      characters: ["Ali", "Bekzod"],
      grammar_coverage: {
        affirmative: ["I was tired yesterday.", "The weather was great.", "I was at home."],
        negative: ["I wasn't sad.", "It wasn't bad."],
        question: ["Were you happy?", "Was it good?"]
      },
      lines: [
        { speaker: "Ali", line: "Hi Bekzod! How are you today?", recycled: ["you", "today"] },
        { speaker: "Bekzod", line: "I'm fine, thanks. But I was tired yesterday.", recycled: ["I", "fine"], target: ["was", "tired", "yesterday"] },
        { speaker: "Ali", line: "Were you at work?", recycled: ["you", "at"], target: ["Were", "work"] },
        { speaker: "Bekzod", line: "Yes, I was. I was at the office all day.", recycled: ["I", "at", "the"], target: ["was", "office", "all day"] },
        { speaker: "Ali", line: "Was it busy?", target: ["Was", "busy"] },
        { speaker: "Bekzod", line: "Yes, it was very busy. But the weather was great!", recycled: ["very"], target: ["was", "great"] },
        { speaker: "Ali", line: "Were you happy after work?", recycled: ["you", "after"], target: ["Were", "happy"] },
        { speaker: "Bekzod", line: "Yes, I was happy. I wasn't sad at all.", recycled: ["I"], target: ["was", "happy", "wasn't", "sad"] },
        { speaker: "Ali", line: "That's good! I was at home yesterday.", recycled: ["I", "at"], target: ["was", "home", "yesterday"] },
        { speaker: "Bekzod", line: "Was it nice?", target: ["Was", "nice"] },
        { speaker: "Ali", line: "Yes, it wasn't bad. I was fine.", recycled: ["I"], target: ["wasn't", "bad", "was", "fine"] }
      ]
    },
    "U04_L01_D02": {
      id: "U04_L01_D02", 
      title: "At School Yesterday",
      setting: "Students talking about yesterday",
      characters: ["Madina", "Nilufar"],
      grammar_coverage: {
        affirmative: ["We were at school.", "She was nervous.", "They were excited."],
        negative: ["We weren't late.", "She wasn't calm."],
        question: ["Were you nervous?", "Was she happy?"]
      },
      lines: [
        { speaker: "Madina", line: "Hi Nilufar! Were you at school yesterday?", recycled: ["you", "at"], target: ["Were", "school", "yesterday"] },
        { speaker: "Nilufar", line: "Yes, I was. We were at school all morning.", recycled: ["I", "We", "at"], target: ["was", "were", "school", "all morning"] },
        { speaker: "Madina", line: "Were you nervous before the exam?", recycled: ["you", "the"], target: ["Were", "nervous", "before", "exam"] },
        { speaker: "Nilufar", line: "Yes, I was very nervous! I wasn't calm.", recycled: ["I", "very"], target: ["was", "nervous", "wasn't", "calm"] },
        { speaker: "Madina", line: "Was the exam difficult?", recycled: ["the"], target: ["Was", "exam", "difficult"] },
        { speaker: "Nilufar", line: "No, it wasn't difficult. It was OK.", target: ["wasn't", "difficult", "was", "OK"] },
        { speaker: "Madina", line: "Were you happy after the exam?", recycled: ["you", "after", "the"], target: ["Were", "happy"] },
        { speaker: "Nilufar", line: "Yes! We were excited. We weren't late for lunch.", recycled: ["We", "for"], target: ["were", "excited", "weren't", "late"] },
        { speaker: "Madina", line: "That's great! Was your sister there?", recycled: ["your", "there"], target: ["Was", "sister"] },
        { speaker: "Nilufar", line: "Yes, she was. She was happy too.", recycled: ["she", "too"], target: ["was", "happy"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    // ═══════════════════════════════════════════════════════════════
    // U04_L01 — Past States (was/were + Adjective)
    // Grammar Cycle: (+) Affirmative, (-) Negative, (?) Question
    // ═══════════════════════════════════════════════════════════════
    "U04_L01": {
      lesson_id: "U04_L01",
      title: "Past States (was/were + Adjective)",
      grammar_target: "was/were + adjective + time",
      scalability_pattern: "[Subject] + was/were + [Adjective] + [Time]",
      source_dialogues: ["U04_L01_D01", "U04_L01_D02"],
      
      // Grammar coverage verification for this lesson
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I was tired yesterday.", "She was happy."] },
        negative: { required: 1, examples: ["I wasn't sad."] },
        question: { required: 1, examples: ["Were you happy?"] }
      },
      
      // Recycling ratio for this lesson
      recycling_stats: {
        total_content_words: 45,
        recycled_words: 30,
        new_words: 15,
        ratio: 0.67,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 1: yesterday
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_yesterday",
          en: "yesterday",
          uz: "kecha",
          pos: "adverb",
          priority: 1, // HIGH - recycle every unit
          category: "time_expression",
          introduced_in: "U04_L01",
          image: "/images/U04/U04_L01/img_yesterday.png",
          
          // Constraint #5: All 6 elements
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Kecha nima qildingiz? Ahvolingiz qanday edi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Kecha men charchagan edim.",
            
            // Element 3: Hybrid Answer (Target highlighted)
            hybrid_answer: "**Yesterday** men **was tired**.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE - Constraint #2)
            anchor_sentence: {
              en: "I was tired yesterday.",
              source_dialogue: "U04_L01_D01",
              source_line: 2,
              speaker: "Bekzod"
            },
            
            // Element 5: Example 2 (Different subject/context)
            example_2: {
              en: "The weather was great yesterday.",
              uz: "Kecha ob-havo ajoyib edi.",
              subject: "The weather",
              context: "weather description"
            },
            
            // Element 6: Example 3 (With recycled vocabulary)
            example_3: {
              en: "We were at school yesterday.",
              uz: "Kecha biz maktabda edik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "at school": { from: "U01", category: "preposition + noun" }
              },
              new_vocab: ["yesterday", "were"]
            }
          },
          
          // Interactive exercises
          exercises: [
            {
              type: "jumble",
              instruction: "Arrange words in correct order",
              words: ["tired", "was", "I", "Yesterday"],
              correct: "Yesterday I was tired."
            },
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "The weather was great yesterday.",
              hidden: ["great", "yesterday"]
            }
          ],
          
          // Production task
          production: {
            uz_prompt: "Kecha charchagan ekanligingizni ayting.",
            en_target: "I was tired yesterday.",
            model_answer: "Yesterday I was tired."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 2: happy
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_happy",
          en: "happy",
          uz: "xursand",
          pos: "adjective",
          priority: 1, // HIGH - core emotion, recycle every unit
          category: "emotion_positive",
          introduced_in: "U01", // RECYCLED from U01
          image: "/images/U04/U04_L01/img_happy.png",
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Kecha kayfiyatingiz qanday edi? Xursand edingizmi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Ha, men juda xursand edim.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "Ha, men **was very happy** kecha.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "Yes, I was happy. I wasn't sad at all.",
              source_dialogue: "U04_L01_D01",
              source_line: 8,
              speaker: "Bekzod"
            },
            
            // Element 5: Example 2 (Different subject)
            example_2: {
              en: "She was happy after the exam.",
              uz: "Imtihondan keyin u xursand edi.",
              subject: "She",
              context: "exam result"
            },
            
            // Element 6: Example 3 (Recycled vocabulary)
            example_3: {
              en: "We were happy at school yesterday.",
              uz: "Kecha biz maktabda xursand edik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "at school": { from: "U01", category: "location" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["were", "happy"]
            }
          },
          
          exercises: [
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "I was very happy yesterday.",
              hidden: ["was", "happy"]
            },
            {
              type: "jumble",
              instruction: "Arrange words in correct order",
              words: ["happy", "was", "She", "exam", "the", "after"],
              correct: "She was happy after the exam."
            }
          ],
          
          production: {
            uz_prompt: "Kecha juda xursand ekanligingizni ayting.",
            en_target: "I was very happy yesterday.",
            model_answer: "I was very happy yesterday."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 3: tired
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_tired",
          en: "tired",
          uz: "charchagan",
          pos: "adjective",
          priority: 1, // HIGH - core state, recycle every unit
          category: "physical_state",
          introduced_in: "U02", // RECYCLED from U02
          image: "/images/U04/U04_L01/img_tired.png",
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Ishdan keyin ahvolingiz qanday edi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Men juda charchagan edim.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "Men **was very tired** ishdan keyin.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "But I was tired yesterday.",
              source_dialogue: "U04_L01_D01",
              source_line: 2,
              speaker: "Bekzod"
            },
            
            // Element 5: Example 2 (Different subject)
            example_2: {
              en: "She was tired after work.",
              uz: "Ishdan keyin u charchagan edi.",
              subject: "She",
              context: "after work"
            },
            
            // Element 6: Example 3 (Recycled vocabulary)
            example_3: {
              en: "They were tired after school yesterday.",
              uz: "Kecha maktabdan keyin ular charchagan edilar.",
              recycled_vocab: {
                "They": { from: "U01", category: "pronoun" },
                "after school": { from: "U02", category: "time expression" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["were", "tired"]
            }
          },
          
          exercises: [
            {
              type: "jumble",
              instruction: "Arrange words in correct order",
              words: ["work", "after", "tired", "very", "was", "I"],
              correct: "I was very tired after work."
            },
            {
              type: "trap",
              instruction: "Find and fix the error",
              wrong: "The children was tired.",
              correct: "The children were tired.",
              explanation: "Children (ko'plik) uchun 'were' ishlatiladi."
            }
          ],
          
          production: {
            uz_prompt: "Ishdan keyin charchagan ekanligingizni ayting.",
            en_target: "I was very tired after work.",
            model_answer: "I was very tired after work."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 4: nervous
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_nervous",
          en: "nervous",
          uz: "asabiy / hayajonlangan",
          pos: "adjective",
          priority: 2, // MEDIUM - recycle every 2-3 units
          category: "emotion_negative",
          introduced_in: "U04_L01", // NEW
          image: "/images/U04/U04_L01/img_nervous.png",
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Imtihondan oldin qanday his qildingiz?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Men juda hayajonlangan edim.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "Men **was very nervous** imtihondan oldin.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "Yes, I was very nervous! I wasn't calm.",
              source_dialogue: "U04_L01_D02",
              source_line: 4,
              speaker: "Nilufar"
            },
            
            // Element 5: Example 2 (Different subject)
            example_2: {
              en: "He was nervous before the interview.",
              uz: "Suhbatdan oldin u hayajonlangan edi.",
              subject: "He",
              context: "job interview"
            },
            
            // Element 6: Example 3 (Recycled vocabulary)
            example_3: {
              en: "We were nervous at school yesterday.",
              uz: "Kecha maktabda biz hayajonlangan edik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "at school": { from: "U01", category: "location" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["were", "nervous"]
            }
          },
          
          exercises: [
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "She was nervous before the exam.",
              hidden: ["was", "nervous"]
            },
            {
              type: "jumble",
              instruction: "Arrange words in correct order",
              words: ["nervous", "was", "She", "presentation", "the", "before"],
              correct: "She was nervous before the presentation."
            }
          ],
          
          production: {
            uz_prompt: "Imtihondan oldin hayajonlanganingizni ayting.",
            en_target: "I was nervous before the exam.",
            model_answer: "I was very nervous before the exam."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 5: was/were (GRAMMAR CARD)
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_was_were",
          en: "was / were",
          uz: "edi / edilar",
          pos: "verb (past of BE)",
          priority: 1, // HIGH - core grammar, recycle every unit
          category: "grammar_verb",
          introduced_in: "U04_L01", // NEW (past form)
          image: "/images/U04/U04_L01/img_was_were.png",
          
          // Grammar reference table
          grammar_table: {
            singular: { subjects: ["I", "he", "she", "it"], form: "was" },
            plural: { subjects: ["you", "we", "they"], form: "were" },
            negative: { was: "wasn't", were: "weren't" },
            question: { pattern: "Was/Were + subject + adjective?" }
          },
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "O'tgan zamonda 'bo'lmoq' qanday aytiladi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Men 'edi' - I was, Biz 'edik' - We were.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "I **was** = Men edim. We **were** = Biz edik.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "Yes, I was. I was at the office all day.",
              source_dialogue: "U04_L01_D01",
              source_line: 4,
              speaker: "Bekzod"
            },
            
            // Element 5: Example 2 (Plural form)
            example_2: {
              en: "We were at school all morning.",
              uz: "Ertalab biz maktabda edik.",
              subject: "We",
              context: "plural form - were"
            },
            
            // Element 6: Example 3 (Recycled + Question form)
            example_3: {
              en: "Were you happy at home yesterday?",
              uz: "Kecha uyda xursand edingizmi?",
              recycled_vocab: {
                "you": { from: "U01", category: "pronoun" },
                "happy": { from: "U01", category: "emotion" },
                "at home": { from: "U01", category: "location" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["Were"]
            }
          },
          
          exercises: [
            {
              type: "trap",
              instruction: "Find and fix the error",
              wrong: "They was happy.",
              correct: "They were happy.",
              explanation: "They (ko'plik) uchun 'were' ishlatiladi."
            },
            {
              type: "trap",
              instruction: "Find and fix the error",
              wrong: "I were tired.",
              correct: "I was tired.",
              explanation: "I uchun 'was' ishlatiladi."
            }
          ],
          
          production: {
            uz_prompt: "Kecha maktabda ekanligingizni ayting (was/were).",
            en_target: "I was at school yesterday.",
            model_answer: "I was at school yesterday."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 6: wasn't / weren't (NEGATIVE FORM)
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_wasnt_werent",
          en: "wasn't / weren't",
          uz: "emas edi",
          pos: "verb (negative past of BE)",
          priority: 1, // HIGH - core grammar
          category: "grammar_verb_negative",
          introduced_in: "U04_L01", // NEW
          image: "/images/U04/U04_L01/img_wasnt.png",
          
          grammar_table: {
            wasn_t: { full: "was not", subjects: ["I", "he", "she", "it"] },
            weren_t: { full: "were not", subjects: ["you", "we", "they"] }
          },
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Kecha g'amgin emas edingiz, to'g'rimi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "To'g'ri, men g'amgin emas edim.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "To'g'ri, men **wasn't sad** kecha.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "Yes, I was happy. I wasn't sad at all.",
              source_dialogue: "U04_L01_D01",
              source_line: 8,
              speaker: "Bekzod"
            },
            
            // Element 5: Example 2 (Different subject)
            example_2: {
              en: "It wasn't difficult. It was OK.",
              uz: "Qiyin emas edi. Yaxshi edi.",
              subject: "It",
              context: "exam difficulty"
            },
            
            // Element 6: Example 3 (Recycled + Plural negative)
            example_3: {
              en: "We weren't late for school yesterday.",
              uz: "Kecha biz maktabga kech qolmadik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "late": { from: "U02", category: "time state" },
                "for school": { from: "U02", category: "purpose" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["weren't"]
            }
          },
          
          exercises: [
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "I wasn't sad yesterday.",
              hidden: ["wasn't", "sad"]
            },
            {
              type: "trap",
              instruction: "Find and fix the error",
              wrong: "They wasn't at home.",
              correct: "They weren't at home.",
              explanation: "They uchun 'weren't' ishlatiladi."
            }
          ],
          
          production: {
            uz_prompt: "Kecha g'amgin emas ekanligingizni ayting.",
            en_target: "I wasn't sad yesterday.",
            model_answer: "I wasn't sad yesterday."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 7: at school / at home (LOCATION CHUNKS)
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_at_school_home",
          en: "at school / at home",
          uz: "maktabda / uyda",
          pos: "prepositional phrase",
          priority: 1, // HIGH - core location, recycle every unit
          category: "location",
          introduced_in: "U01", // RECYCLED
          image: "/images/U04/U04_L01/img_at_school.png",
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Kecha qayerda edingiz?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Kecha men maktabda edim.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "Kecha men **was at school**.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "I was at home yesterday.",
              source_dialogue: "U04_L01_D01",
              source_line: 9,
              speaker: "Ali"
            },
            
            // Element 5: Example 2 (Different subject + school)
            example_2: {
              en: "She was at school all morning.",
              uz: "Ertalab u maktabda edi.",
              subject: "She",
              context: "school location"
            },
            
            // Element 6: Example 3 (Recycled vocabulary)
            example_3: {
              en: "We were at home in the evening yesterday.",
              uz: "Kecha kechqurun biz uyda edik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "in the evening": { from: "U02", category: "time" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["were", "at home"]
            }
          },
          
          exercises: [
            {
              type: "jumble",
              instruction: "Arrange words in correct order",
              words: ["yesterday", "home", "at", "was", "I"],
              correct: "I was at home yesterday."
            },
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "They were at school all day.",
              hidden: ["at", "school"]
            }
          ],
          
          production: {
            uz_prompt: "Kecha uyda ekanligingizni ayting.",
            en_target: "I was at home yesterday.",
            model_answer: "I was at home yesterday."
          }
        },

        // ─────────────────────────────────────────────────────────────
        // VOCAB CARD 8: fine / OK (NEUTRAL STATES)
        // ─────────────────────────────────────────────────────────────
        {
          id: "V_U04_L01_fine_ok",
          en: "fine / OK",
          uz: "yaxshi / normall",
          pos: "adjective",
          priority: 2, // MEDIUM - recycle every 2-3 units
          category: "state_neutral",
          introduced_in: "U01", // RECYCLED
          image: "/images/U04/U04_L01/img_fine.png",
          
          card: {
            // Element 1: Uzbek Context Question
            uz_context_question: "Kecha ahvolingiz qanday edi?",
            
            // Element 2: Uzbek Mirror Answer
            uz_mirror_answer: "Yaxshi edim, rahmat.",
            
            // Element 3: Hybrid Answer
            hybrid_answer: "Men **was fine**, rahmat.",
            
            // Element 4: Anchor Sentence (FROM DIALOGUE)
            anchor_sentence: {
              en: "Yes, it wasn't bad. I was fine.",
              source_dialogue: "U04_L01_D01",
              source_line: 11,
              speaker: "Ali"
            },
            
            // Element 5: Example 2 (OK variant)
            example_2: {
              en: "Everything was OK yesterday.",
              uz: "Kecha hamma narsa yaxshi edi.",
              subject: "Everything",
              context: "general state"
            },
            
            // Element 6: Example 3 (Recycled vocabulary)
            example_3: {
              en: "We were fine at school yesterday.",
              uz: "Kecha maktabda yaxshi edik.",
              recycled_vocab: {
                "We": { from: "U01", category: "pronoun" },
                "at school": { from: "U01", category: "location" },
                "yesterday": { from: "U04_L01", category: "time" }
              },
              new_vocab: ["were", "fine"]
            }
          },
          
          exercises: [
            {
              type: "scratch",
              instruction: "Tap to reveal hidden words",
              sentence: "I was fine yesterday.",
              hidden: ["was", "fine"]
            },
            {
              type: "trap",
              instruction: "Find and fix the error",
              wrong: "The work was finely.",
              correct: "The work was fine.",
              explanation: "'Fine' sifat sifatida ishlatiladi, ravish emas."
            }
          ],
          
          production: {
            uz_prompt: "Yaxshi ekanligingizni ayting.",
            en_target: "I was fine.",
            model_answer: "I was fine, thanks."
          }
        }
      ]
    }
  }
};
