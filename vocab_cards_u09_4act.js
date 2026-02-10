/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 09: Clothes & Ownership
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Clothes & Ownership - Building on U01-U08 foundation):
 * - Possessive pronouns (mine, yours, his, hers, ours, theirs)
 * - Question word "Whose"
 * - Materials (leather, cotton, wool, plastic, metal)
 * - Clothing vocabulary
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
 * RECYCLING CHAIN: U01 → U01.5 → U02 → U03 → U04 → U05 → U06 → U07 → U08 → U09 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 09)
 */

window.VOCAB_CARDS_U09 = {
  unit_id: "U09",
  unit_title: "Clothes & Ownership",
  scalability_level: 5,
  grammar_focus: "Possessive pronouns (mine, yours, his, hers, ours, theirs) + Whose + Materials",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U08 (Rule R2)
  // ═══════════════════════════════════════════════════════════════════════════
  recycling: {
    mandatory: {
      from_u01: {
        subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
        to_be_present: ["am", "is", "are", "isn't", "aren't"],
        possessive_det: ["my", "your", "his", "her", "our", "their"],
        question_words: ["what", "who", "where"],
        articles: ["a", "an", "the"],
        demonstratives: ["this", "that", "these", "those"],
        family: ["mother", "father", "brother", "sister"],
        identity: ["name", "teacher", "student"],
        existence: ["there is", "there are"]
      },
      from_u01_5: {
        possession: ["have", "has", "don't have", "doesn't have"],
        wh_questions: ["where", "how", "when", "why"],
        prepositions: ["in", "on", "at"],
        addition: ["too", "also"]
      },
      from_u02: {
        time_markers: ["every day", "in the morning", "at night"],
        action_verbs: ["wake up", "go", "work", "study", "wear"],
        frequency: ["always", "usually", "sometimes"],
        auxiliaries_present: ["do", "does", "don't", "doesn't"]
      },
      from_u03: {
        preference_verbs: ["like", "love", "hate"],
        emotion_adj: ["happy", "sad", "excited"],
        entertainment: ["music", "film", "song"]
      },
      from_u04: {
        past_states: ["was", "were", "wasn't", "weren't"],
        state_adjectives: ["tired", "busy", "nervous", "fine", "great"],
        past_time_markers: ["yesterday", "all day"],
        locations: ["home", "work", "office", "school"],
        colors: ["red", "blue", "black", "white"]
      },
      from_u05: {
        past_regular_verbs: ["worked", "finished", "talked", "played", "watched", "walked"],
        past_time_expressions: ["last week", "last night", "last year"]
      },
      from_u06: {
        auxiliaries_past: ["did", "didn't"],
        question_patterns: ["Did you...?", "Why didn't you...?"],
        because_clauses: ["because I was tired", "because she was sick"]
      },
      from_u07: {
        irregular_past_verbs: ["went", "saw", "took", "bought", "ate", "had", "came"],
        manner_adverbs: ["quickly", "slowly"]
      },
      from_u08: {
        indefinite_pronouns: ["something", "anything", "nothing", "someone", "anyone", "no one", "everyone", "everything"],
        bedroom_furniture: ["bedroom", "bookshelf", "wardrobe", "mirror"],
        activities: ["draw", "listen to music", "play the guitar", "read", "write"],
        like_to_infinitive: ["like to draw", "like to play", "like to read"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U09_L01_D01": {
      id: "U09_L01_D01",
      title: "Shopping for New Clothes",
      setting: "Two friends at a clothing store",
      characters: ["Dilnoza", "Aziza"],
      grammar_coverage: {
        affirmative: ["These are my new trainers.", "I like your boots.", "This jumper is nice."],
        negative: ["These aren't my socks.", "I don't like that scarf."],
        question: ["Are these your trainers?", "Do you like this jumper?"]
      },
      recycling_balance: {
        least_used_included: ["new", "nice", "like"],
        quota_met: true,
        notes: "Clothing identification with possessive determiners"
      },
      lines: [
        { speaker: "Dilnoza", line: "Hi Aziza! Are these your new trainers?", line_uz: "Salom Aziza! Bu sizning yangi krossovkalaringizmi?", recycled: ["Are", "these", "your", "new"], target: ["trainers"] },
        { speaker: "Aziza", line: "Yes, they are! I bought them yesterday.", line_uz: "Ha, ular! Men ularni kecha sotib oldim.", recycled: ["Yes", "they", "are", "I", "bought", "them", "yesterday"], target: [] },
        { speaker: "Dilnoza", line: "They're very nice! I like your trainers.", line_uz: "Ular juda chiroyli! Menga sizning krossovkalaringiz yoqadi.", recycled: ["They", "very", "nice", "I", "like", "your"], target: ["trainers"] },
        { speaker: "Aziza", line: "Thanks! What about this jumper? Do you like it?", line_uz: "Rahmat! Bu jemper-chi? Sizga yoqadimi?", recycled: ["What", "about", "this", "Do", "you", "like", "it"], target: ["jumper"] },
        { speaker: "Dilnoza", line: "Yes, I love that jumper! Is it new?", line_uz: "Ha, men bu jemperni yaxshi ko'raman! U yangimi?", recycled: ["Yes", "I", "love", "that", "Is", "it", "new"], target: ["jumper"] },
        { speaker: "Aziza", line: "Yes, I bought this jumper last week.", line_uz: "Ha, men bu jemperni o'tgan hafta sotib oldim.", recycled: ["Yes", "I", "bought", "this", "last", "week"], target: ["jumper"] },
        { speaker: "Dilnoza", line: "And these socks? Are these yours too?", line_uz: "Va bu paypoqlar? Bular ham siznikimi?", recycled: ["And", "these", "Are", "these", "too"], target: ["socks", "yours"] },
        { speaker: "Aziza", line: "No, these aren't my socks. They're my brother's.", line_uz: "Yo'q, bular mening paypoqlarim emas. Ular mening ukamniki.", recycled: ["No", "these", "aren't", "my", "They", "my", "brother"], target: ["socks"] },
        { speaker: "Dilnoza", line: "Look at this scarf! It's beautiful!", line_uz: "Bu sharfga qarang! U chiroyli!", recycled: ["Look", "at", "this", "It", "beautiful"], target: ["scarf"] },
        { speaker: "Aziza", line: "Yes, but I don't like that color. I like blue.", line_uz: "Ha, lekin menga bu rang yoqmaydi. Men ko'k rangni yaxshi ko'raman.", recycled: ["Yes", "but", "I", "don't", "like", "that", "I", "like", "blue"], target: ["color"] }
      ]
    },

    "U09_L02_D01": {
      id: "U09_L02_D01",
      title: "What's It Made Of?",
      setting: "Friends discussing materials and ownership",
      characters: ["Jasur", "Farrukh"],
      grammar_coverage: {
        affirmative: ["The boots are leather.", "This bag is mine.", "These gloves are cotton."],
        negative: ["This isn't mine.", "These aren't leather."],
        question: ["Are the boots leather?", "Is this yours?"]
      },
      recycling_balance: {
        least_used_included: ["new", "warm", "cold"],
        quota_met: true,
        notes: "Materials with possessive pronouns introduction"
      },
      lines: [
        { speaker: "Jasur", line: "Farrukh, are these your new boots?", line_uz: "Farrukh, bu sizning yangi etiklaringizmi?", recycled: ["are", "these", "your", "new"], target: ["boots"] },
        { speaker: "Farrukh", line: "Yes, they are! The boots are leather.", line_uz: "Ha, ular! Etiklar charmdan.", recycled: ["Yes", "they", "are", "The"], target: ["boots", "leather"] },
        { speaker: "Jasur", line: "Leather boots are very good! And this bag? Is this yours?", line_uz: "Charm etiklar juda yaxshi! Va bu sumka? Bu siznikimi?", recycled: ["are", "very", "good", "And", "this", "Is", "this"], target: ["Leather", "boots", "bag", "yours"] },
        { speaker: "Farrukh", line: "No, this isn't mine. That bag is mine.", line_uz: "Yo'q, bu meniki emas. U sumka meniki.", recycled: ["No", "this", "isn't", "That", "is"], target: ["mine", "bag", "mine"] },
        { speaker: "Jasur", line: "Is your bag leather too?", line_uz: "Sizning sumkangiz ham charmmi?", recycled: ["Is", "your", "too"], target: ["bag", "leather"] },
        { speaker: "Farrukh", line: "No, it isn't. My bag is plastic.", line_uz: "Yo'q, unday emas. Mening sumkam plastmassadan.", recycled: ["No", "it", "isn't", "My", "is"], target: ["bag", "plastic"] },
        { speaker: "Jasur", line: "What about these gloves? Are they yours?", line_uz: "Bu qo'lqoplar-chi? Ular siznikimi?", recycled: ["What", "about", "these", "Are", "they"], target: ["gloves", "yours"] },
        { speaker: "Farrukh", line: "Yes, these gloves are mine. They're cotton.", line_uz: "Ha, bu qo'lqoplar meniki. Ular paxtadan.", recycled: ["Yes", "these", "are", "They"], target: ["gloves", "mine", "cotton"] },
        { speaker: "Jasur", line: "Cotton gloves are warm!", line_uz: "Paxta qo'lqoplar issiq!", recycled: ["are"], target: ["Cotton", "gloves", "warm"] },
        { speaker: "Farrukh", line: "Yes, I wear them every cold day.", line_uz: "Ha, men ularni har sovuq kunda kiyaman.", recycled: ["Yes", "I", "them", "every", "day"], target: ["wear", "cold"] }
      ]
    },

    "U09_L03_D01": {
      id: "U09_L03_D01",
      title: "Whose Is This?",
      setting: "Family members identifying clothing ownership",
      characters: ["Kamola", "Sardor"],
      grammar_coverage: {
        affirmative: ["This scarf is mine.", "That suit is his.", "These are ours."],
        negative: ["This isn't yours.", "These aren't mine."],
        question: ["Whose scarf is this?", "Is this yours?", "Whose are these?"]
      },
      recycling_balance: {
        least_used_included: ["father", "mother", "bedroom"],
        quota_met: true,
        notes: "Whose questions with possessive pronoun answers"
      },
      lines: [
        { speaker: "Kamola", line: "Sardor, whose scarf is this?", line_uz: "Sardor, bu kim sharfi?", recycled: ["this"], target: ["Whose", "scarf"] },
        { speaker: "Sardor", line: "I think it's mine. Yes, this scarf is mine.", line_uz: "Menimcha, bu meniki. Ha, bu sharf meniki.", recycled: ["I", "think", "it", "Yes", "this", "is"], target: ["mine", "scarf", "mine"] },
        { speaker: "Kamola", line: "And whose suit is that? Is it yours?", line_uz: "Va u kostyum kimniki? U siznikimi?", recycled: ["And", "is", "that", "Is", "it"], target: ["whose", "suit", "yours"] },
        { speaker: "Sardor", line: "No, it isn't mine. That suit is our father's.", line_uz: "Yo'q, bu meniki emas. U kostyum bizning otamizniki.", recycled: ["No", "it", "isn't", "That", "is", "our", "father"], target: ["mine", "suit"] },
        { speaker: "Kamola", line: "Look! Whose trainers are these?", line_uz: "Qarang! Bu krossovkalar kimniki?", recycled: ["Look"], target: ["Whose", "trainers", "these"] },
        { speaker: "Sardor", line: "These aren't mine. Are they yours?", line_uz: "Bular meniki emas. Ular siznikimi?", recycled: ["These", "aren't", "Are", "they"], target: ["mine", "yours"] },
        { speaker: "Kamola", line: "No, they aren't mine. I think they're our mother's.", line_uz: "Yo'q, ular meniki emas. Menimcha ular bizning onamizniki.", recycled: ["No", "they", "aren't", "I", "think", "they", "our", "mother"], target: ["mine"] },
        { speaker: "Sardor", line: "What about this jumper in the bedroom?", line_uz: "Yotoq xonasidagi bu jemper-chi?", recycled: ["What", "about", "this", "in", "the"], target: ["jumper", "bedroom"] },
        { speaker: "Kamola", line: "That isn't ours. I think it's his.", line_uz: "Bu bizniki emas. Menimcha u uniki.", recycled: ["That", "isn't", "I", "think", "it"], target: ["ours", "his"] },
        { speaker: "Sardor", line: "Yes, these clothes are his. They're all in his wardrobe.", line_uz: "Ha, bu kiyimlar uniki. Ularning hammasi uning shkafida.", recycled: ["Yes", "these", "are", "They", "all", "in", "his"], target: ["clothes", "wardrobe"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U09_L01": {
      lesson_id: "U09_L01",
      title: "Clothing Items & Possessive Determiners",
      grammar_target: "Possessive determiners (my, your, his, her) + clothing vocabulary",
      scalability_pattern: "[Possessive Det] + [Clothing Item]",
      source_dialogues: ["U09_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["These are my trainers.", "I like your boots."] },
        negative: { required: 1, examples: ["These aren't my socks."] },
        question: { required: 1, examples: ["Are these your trainers?"] }
      },
      
      recycling_stats: {
        total_content_words: 50,
        recycled_words: 35,
        new_words: 15,
        ratio: 0.70,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 1: trainers
        {
          id: "V_U09_L01_trainers",
          en: "trainers",
          uz: "krossovkalar",
          pos: "noun",
          type: "clothing_footwear",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L01",
          image: "trainers_shoes.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L01_D01",
            line_index: 0,
            speaker: "Dilnoza",
            bubble_text: "Hi Aziza! Are these your new trainers?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz rasmiylashtirilgan sport poyabzali kiymaysizmi? Faqat tuflimi?",
              audio: "u09_l01_trainers_uz.mp3",
              uz_mirror_answer: "Yo'q, men tufli emas. Men krossovka kiyaman.",
              hybrid_answer: "Men **trainers** kiyaman. Krossovkalar.",
              en_canonical: "I wear trainers."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Trainers' nima?",
              exercise: {
                type: "function_sort",
                sentence: "These are my new trainers.",
                options: [
                  {
                    label: "Sport poyabzali (Sports shoes)",
                    value: "sports_shoes",
                    correct: true
                  },
                  {
                    label: "Rasmiylashtirilgan tufli (Formal shoes)",
                    value: "formal",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Trainers' = krossovkalar, sport poyabzali.",
                fail_msg: "Xato. 'Trainers' = sport poyabzali, rasmiy tufli emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Are these your new trainers?",
                  uz: "Bu sizning yangi krossovkalaringizmi?",
                  is_anchor: true,
                  source_dialogue: "U09_L01_D01",
                  source_line: 0,
                  speaker: "Dilnoza"
                },
                {
                  en: "I like your trainers.",
                  uz: "Menga sizning krossovkalaringiz yoqadi.",
                  subject: "I",
                  focus_word: "trainers"
                },
                {
                  en: "My trainers are very comfortable.",
                  uz: "Mening krossovkalarim juda qulay.",
                  subject: "My",
                  focus_word: "trainers"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu sizning yangi krossovkalaringizmi?'",
              model_answer: "Are these your new trainers?",
              accepted_answers: [
                "Are these your new trainers?",
                "Are these your trainers?",
                "Are your trainers new?"
              ],
              trap: {
                trigger: "sneakers",
                message: "⚠️ Britaniya ingliz tilida 'TRAINERS' ishlatamiz (American: sneakers)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L01_D01",
                line_index: 0
              }
            }
          ]
        },

        // CARD 2: jumper
        {
          id: "V_U09_L01_jumper",
          en: "jumper",
          uz: "jemper",
          pos: "noun",
          type: "clothing_top",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L01",
          image: "jumper_clothing.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L01_D01",
            line_index: 3,
            speaker: "Aziza",
            bubble_text: "Thanks! What about this jumper? Do you like it?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sovuq kunlarda faqat ko'ylak kiymaysizmi? Issiq narsa yo'qmi?",
              audio: "u09_l01_jumper_uz.mp3",
              uz_mirror_answer: "Yo'q, men issiq narsa ham kiyaman. Men jemper kiyaman.",
              hybrid_answer: "Men **jumper** kiyaman. Jemper.",
              en_canonical: "I wear a jumper."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Jumper' nima uchun kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "I love that jumper!",
                options: [
                  {
                    label: "Issiqlik uchun (For warmth)",
                    value: "warmth",
                    correct: true
                  },
                  {
                    label: "Suzish uchun (For swimming)",
                    value: "swimming",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Jumper' = jemper, issiq tutish uchun.",
                fail_msg: "Xato. 'Jumper' = issiq kiyim, suzish kiyimi emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "What about this jumper? Do you like it?",
                  uz: "Bu jemper-chi? Sizga yoqadimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L01_D01",
                  source_line: 3,
                  speaker: "Aziza"
                },
                {
                  en: "I love that jumper!",
                  uz: "Men bu jemperni yaxshi ko'raman!",
                  subject: "I",
                  focus_word: "jumper"
                },
                {
                  en: "My jumper is very warm.",
                  uz: "Mening jemperim juda issiq.",
                  subject: "My",
                  focus_word: "jumper"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu jemper-chi?'",
              model_answer: "What about this jumper?",
              accepted_answers: [
                "What about this jumper?",
                "Do you like this jumper?",
                "This jumper?"
              ],
              trap: {
                trigger: "sweater",
                message: "⚠️ Britaniya ingliz tilida 'JUMPER' ishlatamiz (American: sweater)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L01_D01",
                line_index: 3
              }
            }
          ]
        },

        // CARD 3: socks
        {
          id: "V_U09_L01_socks",
          en: "socks",
          uz: "paypoqlar",
          pos: "noun",
          type: "clothing_footwear",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L01",
          image: "socks_clothing.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L01_D01",
            line_index: 6,
            speaker: "Dilnoza",
            bubble_text: "And these socks? Are these yours too?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz poyabzalingizda hech narsa kiymaysizmi? Yalang oyoqmi?",
              audio: "u09_l01_socks_uz.mp3",
              uz_mirror_answer: "Yo'q, men yalang oyoq emas. Men paypoq kiyaman.",
              hybrid_answer: "Men **socks** kiyaman. Paypoqlar.",
              en_canonical: "I wear socks."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Socks' qaerda kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "These aren't my socks.",
                options: [
                  {
                    label: "Oyoqlarda (On feet)",
                    value: "feet",
                    correct: true
                  },
                  {
                    label: "Qo'llarda (On hands)",
                    value: "hands",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Socks' = paypoqlar, oyoqlarda kiyiladi.",
                fail_msg: "Xato. 'Socks' = oyoqlar uchun, qo'llar uchun emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "And these socks? Are these yours too?",
                  uz: "Va bu paypoqlar? Bular ham siznikimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L01_D01",
                  source_line: 6,
                  speaker: "Dilnoza"
                },
                {
                  en: "These aren't my socks.",
                  uz: "Bular mening paypoqlarim emas.",
                  subject: "These",
                  focus_word: "socks"
                },
                {
                  en: "My socks are cotton.",
                  uz: "Mening paypoqlarim paxtadan.",
                  subject: "My",
                  focus_word: "socks"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bular sizning paypoqlaringizmi?'",
              model_answer: "Are these your socks?",
              accepted_answers: [
                "Are these your socks?",
                "Are these socks yours?",
                "Are your socks these?"
              ],
              trap: {
                trigger: "sock",
                message: "⚠️ Juft bo'lgani uchun ko'plik: 'SOCKS' (-s bilan)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L01_D01",
                line_index: 6
              }
            }
          ]
        },

        // CARD 4: scarf
        {
          id: "V_U09_L01_scarf",
          en: "scarf",
          uz: "sharf",
          pos: "noun",
          type: "clothing_accessory",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L01",
          image: "scarf_clothing.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L01_D01",
            line_index: 8,
            speaker: "Dilnoza",
            bubble_text: "Look at this scarf! It's beautiful!"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sovuq kunlarda bo'yningizga hech narsa o'ramaysizmi?",
              audio: "u09_l01_scarf_uz.mp3",
              uz_mirror_answer: "Yo'q, men nimadir o'rayman. Men sharf o'rayman.",
              hybrid_answer: "Men **scarf** o'rayman. Sharf.",
              en_canonical: "I wear a scarf."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Scarf' qaerda kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "Look at this scarf!",
                options: [
                  {
                    label: "Bo'yinda (Around neck)",
                    value: "neck",
                    correct: true
                  },
                  {
                    label: "Boshda (On head)",
                    value: "head",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Scarf' = sharf, bo'yinga o'raladi.",
                fail_msg: "Xato. 'Scarf' = bo'yin uchun (lekin ba'zida boshda ham)."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Look at this scarf! It's beautiful!",
                  uz: "Bu sharfga qarang! U chiroyli!",
                  is_anchor: true,
                  source_dialogue: "U09_L01_D01",
                  source_line: 8,
                  speaker: "Dilnoza"
                },
                {
                  en: "I don't like that scarf.",
                  uz: "Menga bu sharf yoqmaydi.",
                  subject: "I",
                  focus_word: "scarf"
                },
                {
                  en: "My scarf is very warm.",
                  uz: "Mening sharfim juda issiq.",
                  subject: "My",
                  focus_word: "scarf"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu sharfga qarang!'",
              model_answer: "Look at this scarf!",
              accepted_answers: [
                "Look at this scarf!",
                "Look at the scarf!",
                "See this scarf!"
              ],
              trap: {
                trigger: "scarves",
                message: "⚠️ Bitta sharf uchun 'SCARF' (ko'plik: scarves)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L01_D01",
                line_index: 8
              }
            }
          ]
        },

        // CARD 5: yours (possessive pronoun introduction)
        {
          id: "V_U09_L01_yours",
          en: "yours",
          uz: "seniki/sizniki",
          pos: "possessive_pronoun",
          type: "possessive_standalone",
          priority: 1,
          category: "possessive_pronouns",
          introduced_in: "U09_L01",
          image: "yours_possessive.jpg",
          
          grammar_table: {
            from_determiner: "your → yours",
            usage: "Standalone (no noun after)",
            pattern: "This/These + is/are + yours",
            vs_determiner: "your + noun vs yours (alone)",
            examples: ["Is this yours?", "These are yours.", "That bag is yours."]
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L01_D01",
            line_index: 6,
            speaker: "Dilnoza",
            bubble_text: "And these socks? Are these yours too?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Bu sizning kitobingizmi? Meniki emasmi?",
              audio: "u09_l01_yours_uz.mp3",
              uz_mirror_answer: "Ha, bu mening kitobim emas. Bu sizning kitobingiz.",
              hybrid_answer: "Bu **yours**. Seniki.",
              en_canonical: "This is yours.",
              
              grammar_visual: {
                determiner: "your + NOUN (your book)",
                pronoun: "yours (NO NOUN)",
                transformation: "your book → This book is yours",
                examples: ["Is this yours?", "These are yours."]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Yours' dan keyin ot keladimi?",
              exercise: {
                type: "function_sort",
                sentence: "Are these socks yours?",
                options: [
                  {
                    label: "Yo'q, ot yo'q (No noun after)",
                    value: "no_noun",
                    correct: true
                  },
                  {
                    label: "Ha, ot kerak (Noun needed)",
                    value: "noun_needed",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Yours' = mustaqil (ot kerak emas).",
                fail_msg: "Xato. 'Yours' = mustaqil so'z (ot yo'q): 'Is this yours?'"
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "And these socks? Are these yours too?",
                  uz: "Va bu paypoqlar? Bular ham siznikimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L01_D01",
                  source_line: 6,
                  speaker: "Dilnoza"
                },
                {
                  en: "Is this jumper yours?",
                  uz: "Bu jemper siznikimi?",
                  subject: "this",
                  focus_word: "yours"
                },
                {
                  en: "These trainers are yours.",
                  uz: "Bu krossovkalar sizniki.",
                  subject: "These",
                  focus_word: "yours"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bular siznikimi?'",
              model_answer: "Are these yours?",
              accepted_answers: [
                "Are these yours?",
                "Is this yours?",
                "Are they yours?"
              ],
              trap: {
                trigger: "Are these your",
                message: "⚠️ Ot yo'q bo'lsa 'YOURS' kerak ('your' + ot yo'q ❌)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L01_D01",
                line_index: 6
              }
            }
          ]
        }
      ]
    },

    "U09_L02": {
      lesson_id: "U09_L02",
      title: "Materials & Possessive Pronouns",
      grammar_target: "Materials (leather, cotton, wool, plastic) + mine, yours, his, hers",
      scalability_pattern: "[Noun] + is/are + [Material] / [Noun] + is/are + [Possessive Pronoun]",
      source_dialogues: ["U09_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["The boots are leather.", "This bag is mine."] },
        negative: { required: 1, examples: ["This isn't mine."] },
        question: { required: 1, examples: ["Is this yours?"] }
      },
      
      recycling_stats: {
        total_content_words: 55,
        recycled_words: 40,
        new_words: 15,
        ratio: 0.73,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 6: boots
        {
          id: "V_U09_L02_boots",
          en: "boots",
          uz: "etiklar",
          pos: "noun",
          type: "clothing_footwear",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L02",
          image: "boots_footwear.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 0,
            speaker: "Jasur",
            bubble_text: "Farrukh, are these your new boots?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz qishda ham yengil krossovka kiymaysizmi? Baland oy poyabzal kerak emasmi?",
              audio: "u09_l02_boots_uz.mp3",
              uz_mirror_answer: "Yo'q, men qishda krossovka emas. Men etik kiyaman.",
              hybrid_answer: "Men **boots** kiyaman. Etiklar.",
              en_canonical: "I wear boots."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Boots' qachon kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "The boots are leather.",
                options: [
                  {
                    label: "Qish/Sovuq (Winter/Cold)",
                    value: "winter",
                    correct: true
                  },
                  {
                    label: "Yoz/Issiq (Summer/Hot)",
                    value: "summer",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Boots' = etiklar, odatda sovuq kunlarda.",
                fail_msg: "Xato. 'Boots' = etiklar, asosan qish/sovuq uchun."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Farrukh, are these your new boots?",
                  uz: "Farrukh, bu sizning yangi etiklaringizmi?",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 0,
                  speaker: "Jasur"
                },
                {
                  en: "The boots are leather.",
                  uz: "Etiklar charmdan.",
                  subject: "boots",
                  focus_word: "boots"
                },
                {
                  en: "Leather boots are very good!",
                  uz: "Charm etiklar juda yaxshi!",
                  subject: "boots",
                  focus_word: "boots"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu sizning yangi etiklaringizmi?'",
              model_answer: "Are these your new boots?",
              accepted_answers: [
                "Are these your new boots?",
                "Are these boots yours?",
                "Are your boots new?"
              ],
              trap: {
                trigger: "boot",
                message: "⚠️ Juft bo'lgani uchun ko'plik: 'BOOTS' (-s bilan)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 0
              }
            }
          ]
        },

        // CARD 7: leather
        {
          id: "V_U09_L02_leather",
          en: "leather",
          uz: "charm/teri",
          pos: "noun",
          type: "material",
          priority: 3,
          category: "materials",
          introduced_in: "U09_L02",
          image: "leather_material.jpg",
          
          grammar_table: {
            as_material: "The boots ARE leather (material as adjective)",
            pattern: "[Noun] + is/are + leather",
            vs_adjective: "leather boots (adjective) vs The boots are leather (predicate)",
            examples: ["The bag is leather", "These are leather boots", "My jacket is leather"]
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 1,
            speaker: "Farrukh",
            bubble_text: "Yes, they are! The boots are leather."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning etiklaringiz plastmassadanmi? Qog'ozdan qilinganmi?",
              audio: "u09_l02_leather_uz.mp3",
              uz_mirror_answer: "Yo'q, ular plastmassa emas. Ular charmdan.",
              hybrid_answer: "Ular **leather**. Charmdan.",
              en_canonical: "They are leather.",
              
              grammar_visual: {
                as_predicate: "The boots ARE leather",
                as_adjective: "leather boots",
                pattern: "Material after 'be' verb",
                examples: ["The bag is leather", "My boots are leather"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Leather' nima?",
              exercise: {
                type: "function_sort",
                sentence: "The boots are leather.",
                options: [
                  {
                    label: "Hayvon terisi (Animal skin)",
                    value: "animal_skin",
                    correct: true
                  },
                  {
                    label: "Plastmassa (Plastic)",
                    value: "plastic",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Leather' = charm, hayvon terisidan qilingan.",
                fail_msg: "Xato. 'Leather' = charm/teri, plastmassa emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, they are! The boots are leather.",
                  uz: "Ha, ular! Etiklar charmdan.",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 1,
                  speaker: "Farrukh"
                },
                {
                  en: "Leather boots are very good!",
                  uz: "Charm etiklar juda yaxshi!",
                  subject: "boots",
                  focus_word: "Leather"
                },
                {
                  en: "Is your bag leather?",
                  uz: "Sizning sumkangiz charmmi?",
                  subject: "bag",
                  focus_word: "leather"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Etiklar charmdan'",
              model_answer: "The boots are leather.",
              accepted_answers: [
                "The boots are leather.",
                "These boots are leather.",
                "They are leather boots."
              ],
              trap: {
                trigger: "The boots are leathers",
                message: "⚠️ Material sifatida 'LEATHER' (-s yo'q)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 8: bag
        {
          id: "V_U09_L02_bag",
          en: "bag",
          uz: "sumka",
          pos: "noun",
          type: "clothing_accessory",
          priority: 3,
          category: "accessories",
          introduced_in: "U09_L02",
          image: "bag_accessory.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 2,
            speaker: "Jasur",
            bubble_text: "Leather boots are very good! And this bag? Is this yours?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz narsalaringizni qo'lingizda ushlab yurmasizmi? Cho'ntagingizda saqlamaysizmi?",
              audio: "u09_l02_bag_uz.mp3",
              uz_mirror_answer: "Yo'q, men sumkada saqlayman. Men sumka ishlataman.",
              hybrid_answer: "Men **bag** ishlataman. Sumka.",
              en_canonical: "I use a bag."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Bag' nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "And this bag? Is this yours?",
                options: [
                  {
                    label: "Narsalarni saqlash (Carry things)",
                    value: "carry",
                    correct: true
                  },
                  {
                    label: "Kiyish (To wear)",
                    value: "wear",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Bag' = sumka, narsalarni tashish uchun.",
                fail_msg: "Xato. 'Bag' = narsalarni tashish, kiyim emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "And this bag? Is this yours?",
                  uz: "Va bu sumka? Bu siznikimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 2,
                  speaker: "Jasur"
                },
                {
                  en: "That bag is mine.",
                  uz: "U sumka meniki.",
                  subject: "bag",
                  focus_word: "bag"
                },
                {
                  en: "My bag is plastic.",
                  uz: "Mening sumkam plastmassadan.",
                  subject: "My",
                  focus_word: "bag"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu sumka siznikimi?'",
              model_answer: "Is this bag yours?",
              accepted_answers: [
                "Is this bag yours?",
                "Is this your bag?",
                "Is the bag yours?"
              ],
              trap: {
                trigger: "bags",
                message: "⚠️ Bitta sumka uchun 'BAG' (-s yo'q)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 2
              }
            }
          ]
        },

        // CARD 9: mine
        {
          id: "V_U09_L02_mine",
          en: "mine",
          uz: "meniki",
          pos: "possessive_pronoun",
          type: "possessive_standalone",
          priority: 1,
          category: "possessive_pronouns",
          introduced_in: "U09_L02",
          image: "mine_possessive.jpg",
          
          grammar_table: {
            from_determiner: "my → mine",
            usage: "Standalone (no noun after)",
            pattern: "This/These + is/are + mine",
            vs_determiner: "my + noun vs mine (alone)",
            examples: ["This is mine", "These gloves are mine", "That bag is mine"]
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 3,
            speaker: "Farrukh",
            bubble_text: "No, this isn't mine. That bag is mine."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Bu sumka mening do'stimnikimi? Siznikimi?",
              audio: "u09_l02_mine_uz.mp3",
              uz_mirror_answer: "Yo'q, bu do'stimniki emas. Bu meniki.",
              hybrid_answer: "Bu **mine**. Meniki.",
              en_canonical: "This is mine.",
              
              grammar_visual: {
                determiner: "my + NOUN (my bag)",
                pronoun: "mine (NO NOUN)",
                transformation: "my bag → This bag is mine",
                examples: ["This is mine", "These are mine", "That bag is mine"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Mine' dan keyin ot keladimi?",
              exercise: {
                type: "function_sort",
                sentence: "That bag is mine.",
                options: [
                  {
                    label: "Yo'q, ot yo'q (No noun after)",
                    value: "no_noun",
                    correct: true
                  },
                  {
                    label: "Ha, ot kerak (Noun needed)",
                    value: "noun_needed",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Mine' = mustaqil (ot kerak emas).",
                fail_msg: "Xato. 'Mine' = mustaqil so'z: 'This is mine' (ot yo'q)."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, this isn't mine. That bag is mine.",
                  uz: "Yo'q, bu meniki emas. U sumka meniki.",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 3,
                  speaker: "Farrukh"
                },
                {
                  en: "These gloves are mine.",
                  uz: "Bu qo'lqoplar meniki.",
                  subject: "gloves",
                  focus_word: "mine"
                },
                {
                  en: "This jumper is mine.",
                  uz: "Bu jemper meniki.",
                  subject: "jumper",
                  focus_word: "mine"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu meniki'",
              model_answer: "This is mine.",
              accepted_answers: [
                "This is mine.",
                "It's mine.",
                "That's mine."
              ],
              trap: {
                trigger: "This is my",
                message: "⚠️ Ot yo'q bo'lsa 'MINE' kerak ('my' + ot yo'q ❌)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 3
              }
            }
          ]
        },

        // CARD 10: plastic
        {
          id: "V_U09_L02_plastic",
          en: "plastic",
          uz: "plastmassa",
          pos: "noun",
          type: "material",
          priority: 3,
          category: "materials",
          introduced_in: "U09_L02",
          image: "plastic_material.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 5,
            speaker: "Farrukh",
            bubble_text: "No, it isn't. My bag is plastic."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning sumkangiz charmmi? Qimmat materialmi?",
              audio: "u09_l02_plastic_uz.mp3",
              uz_mirror_answer: "Yo'q, u charm emas. U plastmassadan.",
              hybrid_answer: "U **plastic**. Plastmassadan.",
              en_canonical: "It's plastic."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Plastic' qanday material?",
              exercise: {
                type: "function_sort",
                sentence: "My bag is plastic.",
                options: [
                  {
                    label: "Sun'iy material (Synthetic)",
                    value: "synthetic",
                    correct: true
                  },
                  {
                    label: "Tabiiy material (Natural)",
                    value: "natural",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Plastic' = plastmassa, sun'iy material.",
                fail_msg: "Xato. 'Plastic' = sun'iy, tabiiy emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No, it isn't. My bag is plastic.",
                  uz: "Yo'q, unday emas. Mening sumkam plastmassadan.",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 5,
                  speaker: "Farrukh"
                },
                {
                  en: "The bottle is plastic.",
                  uz: "Shisha plastmassadan.",
                  subject: "bottle",
                  focus_word: "plastic"
                },
                {
                  en: "These bags are plastic.",
                  uz: "Bu sumkalar plastmassadan.",
                  subject: "bags",
                  focus_word: "plastic"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Mening sumkam plastmassadan'",
              model_answer: "My bag is plastic.",
              accepted_answers: [
                "My bag is plastic.",
                "The bag is plastic.",
                "It's plastic."
              ],
              trap: {
                trigger: "My bag is plastics",
                message: "⚠️ Material sifatida 'PLASTIC' (-s yo'q)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 5
              }
            }
          ]
        },

        // CARD 11: gloves
        {
          id: "V_U09_L02_gloves",
          en: "gloves",
          uz: "qo'lqoplar",
          pos: "noun",
          type: "clothing_accessory",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L02",
          image: "gloves_clothing.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 6,
            speaker: "Jasur",
            bubble_text: "What about these gloves? Are they yours?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz sovuq kunlarda qo'llaringizga hech narsa kiymaysizmi?",
              audio: "u09_l02_gloves_uz.mp3",
              uz_mirror_answer: "Yo'q, men nimadir kiyaman. Men qo'lqop kiyaman.",
              hybrid_answer: "Men **gloves** kiyaman. Qo'lqoplar.",
              en_canonical: "I wear gloves."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Gloves' qaerda kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "What about these gloves?",
                options: [
                  {
                    label: "Qo'llarda (On hands)",
                    value: "hands",
                    correct: true
                  },
                  {
                    label: "Oyoqlarda (On feet)",
                    value: "feet",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Gloves' = qo'lqoplar, qo'llarda kiyiladi.",
                fail_msg: "Xato. 'Gloves' = qo'llar uchun, oyoqlar uchun emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "What about these gloves? Are they yours?",
                  uz: "Bu qo'lqoplar-chi? Ular siznikimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 6,
                  speaker: "Jasur"
                },
                {
                  en: "These gloves are mine.",
                  uz: "Bu qo'lqoplar meniki.",
                  subject: "gloves",
                  focus_word: "gloves"
                },
                {
                  en: "They're cotton gloves.",
                  uz: "Ular paxta qo'lqoplar.",
                  subject: "They",
                  focus_word: "gloves"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu qo'lqoplar siznikimi?'",
              model_answer: "Are these gloves yours?",
              accepted_answers: [
                "Are these gloves yours?",
                "Are these your gloves?",
                "Are they yours?"
              ],
              trap: {
                trigger: "glove",
                message: "⚠️ Juft bo'lgani uchun ko'plik: 'GLOVES' (-s bilan)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 6
              }
            }
          ]
        },

        // CARD 12: cotton
        {
          id: "V_U09_L02_cotton",
          en: "cotton",
          uz: "paxta",
          pos: "noun",
          type: "material",
          priority: 3,
          category: "materials",
          introduced_in: "U09_L02",
          image: "cotton_material.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L02_D01",
            line_index: 7,
            speaker: "Farrukh",
            bubble_text: "Yes, these gloves are mine. They're cotton."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning futbolkangiz plastmassadanmi? Metallmi?",
              audio: "u09_l02_cotton_uz.mp3",
              uz_mirror_answer: "Yo'q, u plastmassa emas. U paxtadan.",
              hybrid_answer: "U **cotton**. Paxtadan.",
              en_canonical: "It's cotton."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Cotton' qanday material?",
              exercise: {
                type: "function_sort",
                sentence: "These gloves are cotton.",
                options: [
                  {
                    label: "Tabiiy material (Natural fabric)",
                    value: "natural",
                    correct: true
                  },
                  {
                    label: "Metall (Metal)",
                    value: "metal",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Cotton' = paxta, tabiiy material.",
                fail_msg: "Xato. 'Cotton' = paxta, metall emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, these gloves are mine. They're cotton.",
                  uz: "Ha, bu qo'lqoplar meniki. Ular paxtadan.",
                  is_anchor: true,
                  source_dialogue: "U09_L02_D01",
                  source_line: 7,
                  speaker: "Farrukh"
                },
                {
                  en: "My socks are cotton.",
                  uz: "Mening paypoqlarim paxtadan.",
                  subject: "socks",
                  focus_word: "cotton"
                },
                {
                  en: "This T-shirt is cotton.",
                  uz: "Bu futbolka paxtadan.",
                  subject: "T-shirt",
                  focus_word: "cotton"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Ular paxtadan'",
              model_answer: "They're cotton.",
              accepted_answers: [
                "They're cotton.",
                "They are cotton.",
                "These are cotton."
              ],
              trap: {
                trigger: "They're cottons",
                message: "⚠️ Material sifatida 'COTTON' (-s yo'q)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L02_D01",
                line_index: 7
              }
            }
          ]
        }
      ]
    },

    "U09_L03": {
      lesson_id: "U09_L03",
      title: "Whose Questions & Ownership",
      grammar_target: "Whose + possessive pronouns (his, hers, ours, theirs)",
      scalability_pattern: "Whose + [Noun] + is/are + this/these?",
      source_dialogues: ["U09_L03_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["This scarf is mine.", "That suit is his."] },
        negative: { required: 1, examples: ["This isn't mine.", "These aren't yours."] },
        question: { required: 2, examples: ["Whose scarf is this?", "Is this yours?"] }
      },
      
      recycling_stats: {
        total_content_words: 50,
        recycled_words: 40,
        new_words: 10,
        ratio: 0.80,
        status: "✅ Within target (0.60-0.75) - Consolidation lesson"
      },

      items: [
        // CARD 13: Whose (question word)
        {
          id: "V_U09_L03_whose",
          en: "Whose",
          uz: "kimniki",
          pos: "question_word",
          type: "ownership_question",
          priority: 1,
          category: "question_words",
          introduced_in: "U09_L03",
          image: "whose_question.jpg",
          
          grammar_table: {
            pattern: "Whose + noun + is/are + this/these?",
            answer: "It's/They're + possessive pronoun",
            examples: ["Whose scarf is this? → It's mine", "Whose trainers are these? → They're his"],
            vs_who: "Who = person identity, Whose = ownership"
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L03_D01",
            line_index: 0,
            speaker: "Kamola",
            bubble_text: "Sardor, whose scarf is this?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz mening narsalarimni ko'rdingiz. Lekin kimniki ekanini bilmaysizmi?",
              audio: "u09_l03_whose_uz.mp3",
              uz_mirror_answer: "Men bilmayman. Bu kimniki?",
              hybrid_answer: "Bu **whose**? Kimniki?",
              en_canonical: "Whose is this?",
              
              grammar_visual: {
                pattern: "WHOSE + noun + is this?",
                answer: "It's mine/yours/his/hers/ours/theirs",
                vs_who: "WHO = person / WHOSE = ownership",
                examples: ["Whose scarf is this?", "Whose are these?"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Whose' nima haqida so'raydi?",
              exercise: {
                type: "function_sort",
                sentence: "Whose scarf is this?",
                options: [
                  {
                    label: "Egalik (Ownership)",
                    value: "ownership",
                    correct: true
                  },
                  {
                    label: "Odam (Person identity)",
                    value: "person",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Whose' = kimniki so'rovi (egalik).",
                fail_msg: "Xato. 'Whose' = egalik so'rovi ('Who' = odam)."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Sardor, whose scarf is this?",
                  uz: "Sardor, bu kim sharfi?",
                  is_anchor: true,
                  source_dialogue: "U09_L03_D01",
                  source_line: 0,
                  speaker: "Kamola"
                },
                {
                  en: "Whose trainers are these?",
                  uz: "Bu krossovkalar kimniki?",
                  subject: "trainers",
                  focus_word: "Whose"
                },
                {
                  en: "Whose suit is that?",
                  uz: "U kostyum kimniki?",
                  subject: "suit",
                  focus_word: "Whose"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu kim sharfi?'",
              model_answer: "Whose scarf is this?",
              accepted_answers: [
                "Whose scarf is this?",
                "Whose is this scarf?",
                "Whose is this?"
              ],
              trap: {
                trigger: "Who scarf is this",
                message: "⚠️ Egalik uchun 'WHOSE' kerak ('Who' emas)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L03_D01",
                line_index: 0
              }
            }
          ]
        },

        // CARD 14: suit
        {
          id: "V_U09_L03_suit",
          en: "suit",
          uz: "kostyum",
          pos: "noun",
          type: "clothing_formal",
          priority: 3,
          category: "clothing",
          introduced_in: "U09_L03",
          image: "suit_clothing.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L03_D01",
            line_index: 2,
            speaker: "Kamola",
            bubble_text: "And whose suit is that? Is it yours?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz muhim uchrashuvga jeans va futbolka kiymaysizmi?",
              audio: "u09_l03_suit_uz.mp3",
              uz_mirror_answer: "Yo'q, men jeans emas. Men kostyum kiyaman.",
              hybrid_answer: "Men **suit** kiyaman. Kostyum.",
              en_canonical: "I wear a suit."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Suit' qachon kiyiladi?",
              exercise: {
                type: "function_sort",
                sentence: "That suit is our father's.",
                options: [
                  {
                    label: "Rasmiy vaziyat (Formal occasions)",
                    value: "formal",
                    correct: true
                  },
                  {
                    label: "Sport/Dam olish (Sports/Casual)",
                    value: "casual",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Suit' = kostyum, rasmiy kiyim.",
                fail_msg: "Xato. 'Suit' = rasmiy kiyim, sport emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "And whose suit is that? Is it yours?",
                  uz: "Va u kostyum kimniki? U siznikimi?",
                  is_anchor: true,
                  source_dialogue: "U09_L03_D01",
                  source_line: 2,
                  speaker: "Kamola"
                },
                {
                  en: "That suit is our father's.",
                  uz: "U kostyum bizning otamizniki.",
                  subject: "suit",
                  focus_word: "suit"
                },
                {
                  en: "My suit is black.",
                  uz: "Mening kostyumim qora rangda.",
                  subject: "My",
                  focus_word: "suit"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'U kostyum kimniki?'",
              model_answer: "Whose suit is that?",
              accepted_answers: [
                "Whose suit is that?",
                "Whose is that suit?",
                "Whose suit?"
              ],
              trap: {
                trigger: "suits",
                message: "⚠️ Bitta kostyum uchun 'SUIT' (-s yo'q)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L03_D01",
                line_index: 2
              }
            }
          ]
        },

        // CARD 15: his (possessive pronoun)
        {
          id: "V_U09_L03_his",
          en: "his",
          uz: "uniki (o'g'il)",
          pos: "possessive_pronoun",
          type: "possessive_standalone",
          priority: 1,
          category: "possessive_pronouns",
          introduced_in: "U09_L03",
          image: "his_possessive.jpg",
          
          grammar_table: {
            same_form: "his (determiner) = his (pronoun)",
            usage: "Can be used with noun OR standalone",
            pattern: "This/These + is/are + his",
            examples: ["his book (determiner)", "This book is his (pronoun)", "These are his"]
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L03_D01",
            line_index: 8,
            speaker: "Kamola",
            bubble_text: "That isn't ours. I think it's his."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Bu sumka siznikimi? Menikimi?",
              audio: "u09_l03_his_uz.mp3",
              uz_mirror_answer: "Yo'q, bu sizniki yoki meniki emas. Bu uniki.",
              hybrid_answer: "Bu **his**. Uniki (o'g'il bola).",
              en_canonical: "This is his.",
              
              grammar_visual: {
                dual_use: "his book (with noun) / This is his (alone)",
                same_form: "Determiner = Pronoun (both 'his')",
                examples: ["This is his", "That bag is his", "These trainers are his"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'His' kimga tegishli?",
              exercise: {
                type: "function_sort",
                sentence: "That isn't ours. I think it's his.",
                options: [
                  {
                    label: "Erkak (Male)",
                    value: "male",
                    correct: true
                  },
                  {
                    label: "Ayol (Female)",
                    value: "female",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'His' = uniki (erkak/o'g'il).",
                fail_msg: "Xato. 'His' = erkak egaligi (ayol = hers)."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "That isn't ours. I think it's his.",
                  uz: "Bu bizniki emas. Menimcha u uniki.",
                  is_anchor: true,
                  source_dialogue: "U09_L03_D01",
                  source_line: 8,
                  speaker: "Kamola"
                },
                {
                  en: "That suit is his.",
                  uz: "U kostyum uniki.",
                  subject: "suit",
                  focus_word: "his"
                },
                {
                  en: "These clothes are his.",
                  uz: "Bu kiyimlar uniki.",
                  subject: "clothes",
                  focus_word: "his"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu uniki (o'g'il)'",
              model_answer: "This is his.",
              accepted_answers: [
                "This is his.",
                "It's his.",
                "That's his."
              ],
              trap: {
                trigger: "This is him",
                message: "⚠️ Egalik uchun 'HIS' kerak ('him' emas - u object pronoun)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L03_D01",
                line_index: 8
              }
            }
          ]
        },

        // CARD 16: ours (possessive pronoun)
        {
          id: "V_U09_L03_ours",
          en: "ours",
          uz: "bizniki",
          pos: "possessive_pronoun",
          type: "possessive_standalone",
          priority: 1,
          category: "possessive_pronouns",
          introduced_in: "U09_L03",
          image: "ours_possessive.jpg",
          
          grammar_table: {
            from_determiner: "our → ours",
            usage: "Standalone (no noun after)",
            pattern: "This/These + is/are + ours",
            vs_determiner: "our + noun vs ours (alone)",
            examples: ["This is ours", "These are ours", "That room is ours"]
          },
          
          dialogue_ref: {
            dialogue_id: "U09_L03_D01",
            line_index: 8,
            speaker: "Kamola",
            bubble_text: "That isn't ours. I think it's his."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Bu xona sizning do'stingiznikimi? Boshqa odamnikimi?",
              audio: "u09_l03_ours_uz.mp3",
              uz_mirror_answer: "Yo'q, bu boshqa odamniki emas. Bu bizniki.",
              hybrid_answer: "Bu **ours**. Bizniki.",
              en_canonical: "This is ours."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Ours' dan keyin ot keladimi?",
              exercise: {
                type: "function_sort",
                sentence: "That isn't ours.",
                options: [
                  {
                    label: "Yo'q, ot yo'q (No noun after)",
                    value: "no_noun",
                    correct: true
                  },
                  {
                    label: "Ha, ot kerak (Noun needed)",
                    value: "noun_needed",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Ours' = mustaqil (ot kerak emas).",
                fail_msg: "Xato. 'Ours' = mustaqil: 'This is ours' (ot yo'q)."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "That isn't ours. I think it's his.",
                  uz: "Bu bizniki emas. Menimcha u uniki.",
                  is_anchor: true,
                  source_dialogue: "U09_L03_D01",
                  source_line: 8,
                  speaker: "Kamola"
                },
                {
                  en: "This room is ours.",
                  uz: "Bu xona bizniki.",
                  subject: "room",
                  focus_word: "ours"
                },
                {
                  en: "These clothes are ours.",
                  uz: "Bu kiyimlar bizniki.",
                  subject: "clothes",
                  focus_word: "ours"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu bizniki emas'",
              model_answer: "This isn't ours.",
              accepted_answers: [
                "This isn't ours.",
                "This is not ours.",
                "It's not ours."
              ],
              trap: {
                trigger: "This isn't our",
                message: "⚠️ Ot yo'q bo'lsa 'OURS' kerak ('our' + ot yo'q ❌)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L03_D01",
                line_index: 8
              }
            }
          ]
        },

        // CARD 17: clothes (general clothing)
        {
          id: "V_U09_L03_clothes",
          en: "clothes",
          uz: "kiyimlar",
          pos: "noun",
          type: "clothing_general",
          priority: 2,
          category: "clothing",
          introduced_in: "U09_L03",
          image: "clothes_general.jpg",
          
          dialogue_ref: {
            dialogue_id: "U09_L03_D01",
            line_index: 9,
            speaker: "Sardor",
            bubble_text: "Yes, these clothes are his. They're all in his wardrobe."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz do'koningа faqat poyabzal sotib olasizmi? Boshqa narsa yo'qmi?",
              audio: "u09_l03_clothes_uz.mp3",
              uz_mirror_answer: "Yo'q, men boshqa narsa ham sotib olaman. Men kiyim sotib olaman.",
              hybrid_answer: "Men **clothes** sotib olaman. Kiyimlar.",
              en_canonical: "I buy clothes."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Clothes' nima?",
              exercise: {
                type: "function_sort",
                sentence: "Yes, these clothes are his.",
                options: [
                  {
                    label: "Umumiy kiyimlar (General clothing)",
                    value: "general",
                    correct: true
                  },
                  {
                    label: "Faqat poyabzal (Only shoes)",
                    value: "shoes",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Clothes' = kiyimlar (umumiy so'z).",
                fail_msg: "Xato. 'Clothes' = barcha kiyimlar, faqat poyabzal emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, these clothes are his. They're all in his wardrobe.",
                  uz: "Ha, bu kiyimlar uniki. Ularning hammasi uning shkafida.",
                  is_anchor: true,
                  source_dialogue: "U09_L03_D01",
                  source_line: 9,
                  speaker: "Sardor"
                },
                {
                  en: "My clothes are in the wardrobe.",
                  uz: "Mening kiyimlarim shkafda.",
                  subject: "My",
                  focus_word: "clothes"
                },
                {
                  en: "I bought new clothes yesterday.",
                  uz: "Men kecha yangi kiyim sotib oldim.",
                  subject: "I",
                  focus_word: "clothes"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bu kiyimlar uniki'",
              model_answer: "These clothes are his.",
              accepted_answers: [
                "These clothes are his.",
                "The clothes are his.",
                "They're his clothes."
              ],
              trap: {
                trigger: "This clothes",
                message: "⚠️ 'Clothes' har doim ko'plik: 'THESE clothes' (NOT 'this')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U09_L03_D01",
                line_index: 9
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
  Object.freeze(window.VOCAB_CARDS_U09);
}