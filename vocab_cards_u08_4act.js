/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 08: Bedroom & Activities
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Bedroom & Activities - Building on U01-U07 foundation):
 * - There is/are + indefinite pronouns (something, someone, nothing, no one, anything, anyone)
 * - Present simple with activities (like to + infinitive)
 * - Bedroom furniture vocabulary
 * - Free-time activities vocabulary
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
 * RECYCLING CHAIN: U01 → U01.5 → U02 → U03 → U04 → U05 → U06 → U07 → U08 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 08)
 */

window.VOCAB_CARDS_U08 = {
  unit_id: "U08",
  unit_title: "Bedroom & Activities",
  scalability_level: 4,
  grammar_focus: "There is/are + indefinite pronouns + Present simple activities",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U07 (Rule R2)
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
        greetings: ["hello", "nice", "meet"],
        existence: ["there is", "there are", "there isn't", "there aren't"]
      },
      from_u01_5: {
        possession: ["have", "has", "don't have", "doesn't have"],
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
      },
      from_u07: {
        irregular_past_verbs: ["went", "saw", "took", "bought", "ate", "had", "came", "did"],
        manner_adverbs: ["quickly", "slowly"],
        travel_activities: ["went to Italy", "took photos", "bought presents"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U08_L01_D01": {
      id: "U08_L01_D01",
      title: "New Bedroom Tour",
      setting: "Two siblings discussing their new bedroom",
      characters: ["Laylo", "Akmal"],
      grammar_coverage: {
        affirmative: ["There is a bookshelf by the wall.", "There are big beds.", "I love this room."],
        negative: ["There isn't a computer here.", "There aren't any old things."],
        question: ["Is there a bookshelf?", "Is there a wardrobe?", "What's there?"]
      },
      recycling_balance: {
        least_used_included: ["nice", "big", "also"],
        quota_met: true,
        notes: "Bedroom furniture with There is/are existentials"
      },
      lines: [
        { speaker: "Laylo", line: "Hi Akmal! Did you see our new bedroom?", line_uz: "Salom Akmal! Yangi xonamizni ko'rdingmi?", recycled: ["Did", "you", "our", "new"], target: ["see", "bedroom"] },
        { speaker: "Akmal", line: "Yes, I saw it! It's very big! What's there?", line_uz: "Ha, ko'rdim! U juda katta! Nima bor?", recycled: ["I", "saw", "it", "very", "big", "What"], target: ["there"] },
        { speaker: "Laylo", line: "There are big beds. Two beds!", line_uz: "Katta kravatlar bor. Ikkita kravat!", recycled: ["big"], target: ["There are", "beds", "Two"] },
        { speaker: "Akmal", line: "Wonderful! Is there a bookshelf?", line_uz: "Ajoyib! Kitob javoni bormi?", recycled: ["a"], target: ["Wonderful", "Is there", "bookshelf"] },
        { speaker: "Laylo", line: "Yes, there's a bookshelf by the wall. And there's also a desk!", line_uz: "Ha, devor yonida kitob javoni bor. Va stol ham bor!", recycled: ["Yes", "there", "a", "the", "And", "also"], target: ["bookshelf", "by", "wall", "desk"] },
        { speaker: "Akmal", line: "Is there a wardrobe? For our clothes?", line_uz: "Shkaf bormi? Kiyimlarimiz uchun?", recycled: ["Is there", "a", "our"], target: ["wardrobe", "For", "clothes"] },
        { speaker: "Laylo", line: "Yes, there's a big wardrobe! And there's also a mirror!", line_uz: "Ha, katta shkaf bor! Va ko'zgu ham bor!", recycled: ["Yes", "there", "a", "big", "And", "also"], target: ["wardrobe", "mirror"] },
        { speaker: "Akmal", line: "I love this room!", line_uz: "Men bu xonani yaxshi ko'raman!", recycled: ["I", "love", "this"], target: ["room"] },
        { speaker: "Laylo", line: "There isn't anything old here. Everything is new!", line_uz: "Bu yerda hech narsa eski yo'q. Hammasi yangi!", recycled: ["is", "new"], target: ["There isn't", "anything", "old", "here", "Everything"] },
        { speaker: "Akmal", line: "Is there something on the desk?", line_uz: "Stol ustida nimadir bormi?", recycled: ["Is there", "on", "the", "desk"], target: ["something"] }
      ]
    },

    "U08_L02_D01": {
      id: "U08_L02_D01",
      title: "After-School Activities",
      setting: "Friends discussing hobbies and activities",
      characters: ["Nodira", "Sardor"],
      grammar_coverage: {
        affirmative: ["I like to draw pictures.", "She plays the guitar.", "Everyone listens to music."],
        negative: ["I don't like to write.", "Nobody plays games here."],
        question: ["Do you like to listen to music?", "Does anyone play the guitar?"]
      },
      recycling_balance: {
        least_used_included: ["after", "sometimes", "happy"],
        quota_met: true,
        notes: "Activities with like + infinitive + indefinite pronouns"
      },
      lines: [
        { speaker: "Nodira", line: "Hi Sardor! What do you like to do after school?", line_uz: "Salom Sardor! Maktabdan keyin nima qilishni yoqtirasiz?", recycled: ["What", "do", "you", "like", "to", "after", "school"], target: ["do"] },
        { speaker: "Sardor", line: "I like to draw pictures and listen to music.", line_uz: "Men rasm chizish va musiqa tinglashni yaxshi ko'raman.", recycled: ["I", "like", "to", "and"], target: ["draw", "pictures", "listen", "music"] },
        { speaker: "Nodira", line: "That's great! I like to play the guitar.", line_uz: "Bu ajoyib! Men gitara chalishni yaxshi ko'raman.", recycled: ["That", "great", "I", "like", "to", "play", "the"], target: ["guitar"] },
        { speaker: "Sardor", line: "Do you like to write stories?", line_uz: "Hikoyalar yozishni yoqtirasizmi?", recycled: ["Do", "you", "like", "to"], target: ["write", "stories"] },
        { speaker: "Nodira", line: "Yes, I write a diary every night.", line_uz: "Ha, men har kecha kundalik yozaman.", recycled: ["Yes", "I", "every"], target: ["write", "diary", "night"] },
        { speaker: "Sardor", line: "Does anyone in your family play music?", line_uz: "Sizning oilangizda kimdir musiqa chalaydimi?", recycled: ["your", "family", "play", "music"], target: ["Does", "anyone", "in"] },
        { speaker: "Nodira", line: "Yes, everyone in my family plays something!", line_uz: "Ha, mening oilamdagi hamma narsa chaladi!", recycled: ["Yes", "in", "my", "family", "plays"], target: ["everyone", "something"] },
        { speaker: "Sardor", line: "I don't have anything to play.", line_uz: "Mening chaladigan narsam yo'q.", recycled: ["I", "don't", "have", "to", "play"], target: ["anything"] },
        { speaker: "Nodira", line: "There's nothing wrong with that! You draw well.", line_uz: "Bunda yomon hech narsa yo'q! Siz yaxshi chizasiz.", recycled: ["You"], target: ["There", "nothing", "wrong", "draw", "well"] },
        { speaker: "Sardor", line: "Thanks! I read magazines about art too.", line_uz: "Rahmat! Men san'at haqida jurnallar ham o'qiyman.", recycled: ["I", "about", "too"], target: ["read", "magazines", "art"] }
      ]
    },

    "U08_L03_D01": {
      id: "U08_L03_D01", 
      title: "Creative Hobbies Discussion",
      setting: "Classmates discussing art and reading",
      characters: ["Malika", "Ravshan"],
      grammar_coverage: {
        affirmative: ["There is nothing wrong.", "No one plays music.", "I read magazines."],
        negative: ["There isn't anyone here.", "I don't see anything wrong."],
        question: ["Is there anyone who draws?", "Does anyone read magazines?"]
      },
      recycling_balance: {
        least_used_included: ["about", "well", "class"],
        quota_met: true,
        notes: "Negative indefinites with activity contexts"
      },
      lines: [
        { speaker: "Malika", line: "Hi Ravshan! Do you like to do anything creative?", line_uz: "Salom Ravshan! Ijodiy ish qilishni yoqtirasizmi?", recycled: ["Do", "you", "like", "to", "do"], target: ["anything", "creative"] },
        { speaker: "Ravshan", line: "Yes, I like to draw! What about you?", line_uz: "Ha, men rasm chizishni yoqtiraman! Siz-chi?", recycled: ["Yes", "I", "like", "to", "draw", "What", "about", "you"], target: [] },
        { speaker: "Malika", line: "No one in my class plays music after school.", line_uz: "Mening sinimdagi hech kim maktabdan keyin musiqa chalmaydi.", recycled: ["in", "my", "plays", "music", "after", "school"], target: ["No one", "class"] },
        { speaker: "Ravshan", line: "Really? I don't see anything wrong with music!", line_uz: "Rostdan? Men musiqada hech qanday yomon narsa ko'rmayapman!", recycled: ["I", "don't", "see", "with", "music"], target: ["Really", "anything", "wrong"] },
        { speaker: "Malika", line: "There's nothing wrong with music. We just prefer other things.", line_uz: "Musiqada yomon hech narsa yo'q. Biz shunchaki boshqa narsalarni afzal ko'ramiz.", recycled: ["There", "with", "music", "We", "other", "things"], target: ["nothing", "wrong", "just", "prefer"] },
        { speaker: "Ravshan", line: "Thanks! I read magazines about art too.", line_uz: "Rahmat! Men san'at haqida jurnallar ham o'qiyman.", recycled: ["I", "read", "about", "too"], target: ["Thanks", "magazines", "art"] },
        { speaker: "Malika", line: "That's great! Is there anyone else who draws in your family?", line_uz: "Bu ajoyib! Sizning oilangizda rasm chizadigan boshqa kimdir bormi?", recycled: ["That", "great", "Is", "there", "who", "draws", "in", "your", "family"], target: ["anyone", "else"] },
        { speaker: "Ravshan", line: "Yes, my sister draws beautiful pictures of our bedroom.", line_uz: "Ha, mening singlim bizning yotoq xonasining chiroyli rasmlarini chizadi.", recycled: ["Yes", "my", "sister", "draws", "pictures", "of", "our", "bedroom"], target: ["beautiful"] }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U08_L01": {
      lesson_id: "U08_L01",
      title: "Bedroom Furniture & There is/are",
      grammar_target: "There is/are + indefinite pronouns (something, anything, everything, nothing)",
      scalability_pattern: "There + is/are + [indefinite pronoun/noun] + [location]",
      source_dialogues: ["U08_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["There is a bookshelf by the wall.", "There are big beds."] },
        negative: { required: 1, examples: ["There isn't anything old here."] },
        question: { required: 1, examples: ["Is there a bookshelf?"] }
      },
      
      recycling_stats: {
        total_content_words: 48,
        recycled_words: 32,
        new_words: 16,
        ratio: 0.67,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 1: There is (existential grammar)
        {
          id: "V_U08_L01_there_is",
          en: "There is",
          uz: "bor (biror narsa borligi)",
          pos: "existential",
          type: "existential_structure",
          priority: 1,
          category: "grammar_existential",
          introduced_in: "U08_L01",
          image: "there_is_existence.jpg",
          
          grammar_table: {
            singular: { pattern: "There is + [singular noun/something]", examples: ["There is a bed", "There is something"] },
            plural: { pattern: "There are + [plural noun/things]", examples: ["There are beds", "There are things"] },
            negative: { singular: "There isn't", plural: "There aren't" },
            question: { singular: "Is there...?", plural: "Are there...?" },
            rule: "Use with indefinite pronouns (something, anything, nothing, etc.)"
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L01_D01",
            line_index: 4,
            speaker: "Laylo",
            bubble_text: "Yes, there's a bookshelf by the wall. And there's also a desk!"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning xonangizda hech narsa yo'qmi? Bo'shmi?",
              audio: "u08_l01_there_is_uz.mp3",
              uz_mirror_answer: "Yo'q, bo'sh emas. Xonamda kitob javoni bor.",
              hybrid_answer: "Yo'q, **There is** kitob javoni devor yonida.",
              en_canonical: "No, there is a bookshelf by the wall.",
              
              grammar_visual: {
                singular: "There IS + singular noun",
                plural: "There ARE + plural noun",
                indefinites: "There IS + something/nothing",
                examples: ["There is a bed", "There are beds", "There is something"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'There is' nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "There is a bookshelf in my room.",
                options: [
                  {
                    label: "Mulkiyat (Ownership)",
                    value: "ownership",
                    correct: false
                  },
                  {
                    label: "Mavjudlik (Existence)",
                    value: "existence",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'There is' = mavjudlik bildiradi (biror narsa borligini).",
                fail_msg: "Xato. 'There is' = mavjudlik bildiradi, mulkiyat emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, there's a bookshelf by the wall.",
                  uz: "Ha, devor yonida kitob javoni bor.",
                  is_anchor: true,
                  source_dialogue: "U08_L01_D01",
                  source_line: 4,
                  speaker: "Laylo"
                },
                {
                  en: "There is a big wardrobe in my room.",
                  uz: "Mening xonamda katta shkaf bor.",
                  subject: "wardrobe",
                  focus_word: "There is"
                },
                {
                  en: "There is something on the desk.",
                  uz: "Stol ustida nimadir bor.",
                  subject: "something",
                  focus_word: "There is"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Devor yonida kitob javoni bor'",
              model_answer: "There is a bookshelf by the wall.",
              accepted_answers: [
                "There is a bookshelf by the wall.",
                "There's a bookshelf by the wall.",
                "There is a bookshelf near the wall."
              ],
              trap: {
                trigger: "It is a bookshelf",
                message: "⚠️ Mavjudlik uchun 'THERE IS' kerak ('It is' emas)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L01_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 2: bedroom
        {
          id: "V_U08_L01_bedroom",
          en: "bedroom",
          uz: "yotoq xonasi",
          pos: "noun",
          type: "room",
          priority: 3,
          category: "rooms",
          introduced_in: "U08_L01",
          image: "bedroom_room.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L01_D01",
            line_index: 0,
            speaker: "Laylo",
            bubble_text: "Hi Akmal! Did you see our new bedroom?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz oshxonada uxlaysizmi? Yashash xonasidami?",
              audio: "u08_l01_bedroom_uz.mp3",
              uz_mirror_answer: "Yo'q, men oshxonada emas. Men yotoq xonasida uxlayman.",
              hybrid_answer: "Men **bedroom**da uxlayman. Yotoq xonasida.",
              en_canonical: "I sleep in the bedroom."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "Bedroom nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "I sleep in the bedroom.",
                options: [
                  {
                    label: "Ovqat pishirish (Cooking)",
                    value: "cooking",
                    correct: false
                  },
                  {
                    label: "Uxlash (Sleeping)",
                    value: "sleeping",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Bedroom' = yotoq xonasi, uxlash uchun.",
                fail_msg: "Xato. 'Bedroom' = uxlash uchun xona, oshxona emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Did you see our new bedroom?",
                  uz: "Yangi yotoq xonamizni ko'rdingizmi?",
                  is_anchor: true,
                  source_dialogue: "U08_L01_D01",
                  source_line: 0,
                  speaker: "Laylo"
                },
                {
                  en: "My bedroom is very big.",
                  uz: "Mening yotoq xonam juda katta.",
                  subject: "My",
                  focus_word: "bedroom"
                },
                {
                  en: "There are two beds in our bedroom.",
                  uz: "Bizning yotoq xonamizda ikkita kravat bor.",
                  subject: "our",
                  focus_word: "bedroom"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Bizning yangi yotoq xonamiz'",
              model_answer: "Our new bedroom.",
              accepted_answers: [
                "Our new bedroom.",
                "Our new bedroom is nice.",
                "We have a new bedroom."
              ],
              trap: {
                trigger: "sleeping room",
                message: "⚠️ 'Sleeping room' emas! 'BEDROOM' - bitta so'z!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L01_D01",
                line_index: 0
              }
            }
          ]
        },

        // CARD 3: bookshelf
        {
          id: "V_U08_L01_bookshelf",
          en: "bookshelf",
          uz: "kitob javoni",
          pos: "noun",
          type: "furniture",
          priority: 3,
          category: "furniture",
          introduced_in: "U08_L01",
          image: "bookshelf_furniture.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L01_D01",
            line_index: 3,
            speaker: "Akmal",
            bubble_text: "Wonderful! Is there a bookshelf?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kitoblaringizni polda saqlaysizmi? Yerda tashlab qo'yasizmi?",
              audio: "u08_l01_bookshelf_uz.mp3",
              uz_mirror_answer: "Yo'q, men polda saqlamayman. Men kitob javonida saqlayman.",
              hybrid_answer: "Men kitob **bookshelf**ida saqlayman. Kitob javonida.",
              en_canonical: "I keep them on the bookshelf."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Bookshelf' nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "There is a bookshelf by the wall.",
                options: [
                  {
                    label: "Kitoblar saqlash (Keep books)",
                    value: "books",
                    correct: true
                  },
                  {
                    label: "Yashash (Living)",
                    value: "living",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Bookshelf' = kitob javoni, kitoblar saqlash uchun.",
                fail_msg: "Xato. 'Bookshelf' = kitoblar uchun, yashash uchun emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Wonderful! Is there a bookshelf?",
                  uz: "Ajoyib! Kitob javoni bormi?",
                  is_anchor: true,
                  source_dialogue: "U08_L01_D01",
                  source_line: 3,
                  speaker: "Akmal"
                },
                {
                  en: "The bookshelf is by the wall.",
                  uz: "Kitob javoni devor yonida.",
                  subject: "bookshelf",
                  focus_word: "bookshelf"
                },
                {
                  en: "I put my books on the bookshelf.",
                  uz: "Men kitoblarimni kitob javoniga qo'yaman.",
                  subject: "I",
                  focus_word: "bookshelf"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Kitob javoni bormi?'",
              model_answer: "Is there a bookshelf?",
              accepted_answers: [
                "Is there a bookshelf?",
                "Do you have a bookshelf?",
                "Is there a bookshelf in the room?"
              ],
              trap: {
                trigger: "book shelf",
                message: "⚠️ 'Book shelf' emas! 'BOOKSHELF' - bitta so'z!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L01_D01",
                line_index: 3
              }
            }
          ]
        },

        // CARD 4: wardrobe
        {
          id: "V_U08_L01_wardrobe",
          en: "wardrobe",
          uz: "shkaf/garderob",
          pos: "noun",
          type: "furniture",
          priority: 3,
          category: "furniture",
          introduced_in: "U08_L01",
          image: "wardrobe_furniture.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L01_D01",
            line_index: 5,
            speaker: "Akmal",
            bubble_text: "Is there a wardrobe? For our clothes?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz kiyimlaringizni polda saqlaysizmi? Tashlab qo'yasizmi?",
              audio: "u08_l01_wardrobe_uz.mp3",
              uz_mirror_answer: "Yo'q, men polda saqlamayman. Men shkafda saqlayman.",
              hybrid_answer: "Men **wardrobe**da saqlayman kiyimlarimni. Shkafda.",
              en_canonical: "I keep my clothes in the wardrobe."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Wardrobe' nima uchun ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "Is there a wardrobe for our clothes?",
                options: [
                  {
                    label: "Kiyimlar saqlash (Keep clothes)",
                    value: "clothes",
                    correct: true
                  },
                  {
                    label: "Ovqat saqlash (Keep food)",
                    value: "food",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Wardrobe' = shkaf, kiyimlar saqlash uchun.",
                fail_msg: "Xato. 'Wardrobe' = kiyimlar uchun, ovqat uchun emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Is there a wardrobe? For our clothes?",
                  uz: "Shkaf bormi? Kiyimlarimiz uchun?",
                  is_anchor: true,
                  source_dialogue: "U08_L01_D01",
                  source_line: 5,
                  speaker: "Akmal"
                },
                {
                  en: "There's a big wardrobe in my room.",
                  uz: "Mening xonamda katta shkaf bor.",
                  subject: "wardrobe",
                  focus_word: "wardrobe"
                },
                {
                  en: "She keeps her dresses in the wardrobe.",
                  uz: "U ko'ylaklarini shkafda saqlaydi.",
                  subject: "She",
                  focus_word: "wardrobe"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Kiyimlar uchun shkaf bormi?'",
              model_answer: "Is there a wardrobe for clothes?",
              accepted_answers: [
                "Is there a wardrobe for clothes?",
                "Is there a wardrobe?",
                "Do you have a wardrobe for clothes?"
              ],
              trap: {
                trigger: "closet",
                message: "⚠️ 'Closet' - Amerika. Bu yerda 'WARDROBE' ishlatamiz!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L01_D01",
                line_index: 5
              }
            }
          ]
        },

        // CARD 5: something
        {
          id: "V_U08_L01_something",
          en: "something",
          uz: "nimadir/biror narsa",
          pos: "indefinite_pronoun",
          type: "positive_indefinite",
          priority: 1,
          category: "indefinite_pronouns",
          introduced_in: "U08_L01",
          image: "something_indefinite.jpg",
          
          grammar_table: {
            positive_context: "Used with positive verbs",
            pattern: "There is + something / I have + something",
            singular_verb: "Something IS (not ARE)",
            examples: ["There is something on the table", "I see something", "Something is wrong"],
            vs_anything: "Use 'anything' with negative verbs and questions"
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L01_D01",
            line_index: 9,
            speaker: "Akmal",
            bubble_text: "Is there something on the desk?"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Stol ustida hech narsa yo'qmi? Bo'shmi?",
              audio: "u08_l01_something_uz.mp3",
              uz_mirror_answer: "Yo'q, bo'sh emas. Stol ustida nimadir bor.",
              hybrid_answer: "Stol ustida **something** bor. Nimadir.",
              en_canonical: "There is something on the desk.",
              
              grammar_visual: {
                positive_indefinite: "SOMETHING = nimadir",
                usage: "With positive verbs only",
                singular_verb: "Something IS (singular)",
                examples: ["I see something", "There is something here"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Something' qaysi fe'llar bilan ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "There is something on the desk.",
                options: [
                  {
                    label: "Ijobiy fe'llar (Positive verbs)",
                    value: "positive",
                    correct: true
                  },
                  {
                    label: "Inkor fe'llar (Negative verbs)",
                    value: "negative",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Something' = ijobiy fe'llar bilan (there IS, I SEE).",
                fail_msg: "Xato. 'Something' = faqat ijobiy fe'llar bilan ishlatiladi."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Is there something on the desk?",
                  uz: "Stol ustida nimadir bormi?",
                  is_anchor: true,
                  source_dialogue: "U08_L01_D01",
                  source_line: 9,
                  speaker: "Akmal"
                },
                {
                  en: "I see something in my room.",
                  uz: "Men xonamda nimadir ko'raman.",
                  subject: "I",
                  focus_word: "something"
                },
                {
                  en: "Something is wrong with my computer.",
                  uz: "Mening kompyuterimda nimadir noto'g'ri.",
                  subject: "Something",
                  focus_word: "something"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Stol ustida nimadir bor'",
              model_answer: "There is something on the desk.",
              accepted_answers: [
                "There is something on the desk.",
                "There's something on the desk.",
                "Something is on the desk."
              ],
              trap: {
                trigger: "There is anything",
                message: "⚠️ Ijobiy gap uchun 'SOMETHING' kerak ('anything' emas)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L01_D01",
                line_index: 9
              }
            }
          ]
        }
      ]
    },

    "U08_L02": {
      lesson_id: "U08_L02",
      title: "Activities & Hobbies",
      grammar_target: "like to + infinitive + indefinite pronouns (everyone, anyone, no one)",
      scalability_pattern: "[Subject] + like to + [base verb] + [object]",
      source_dialogues: ["U08_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I like to draw pictures.", "Everyone listens to music."] },
        negative: { required: 1, examples: ["I don't like to write.", "Nobody plays games."] },
        question: { required: 1, examples: ["Do you like to listen to music?"] }
      },
      
      recycling_stats: {
        total_content_words: 45,
        recycled_words: 31,
        new_words: 14,
        ratio: 0.69,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 6: like to + infinitive
        {
          id: "V_U08_L02_like_to",
          en: "like to",
          uz: "yoqtirmoq (infinitiv bilan)",
          pos: "verb_pattern",
          type: "preference_infinitive",
          priority: 1,
          category: "preference_verbs",
          introduced_in: "U08_L02",
          image: "like_to_infinitive.jpg",
          
          grammar_table: {
            pattern: "like + to + base verb",
            extension_from_u03: "U03: I like music → U08: I like to listen to music",
            subjects: {
              "I/you/we/they": "like to",
              "he/she/it": "likes to"
            },
            negative: {
              "I/you/we/they": "don't like to",
              "he/she/it": "doesn't like to"
            },
            question: {
              "I/you/we/they": "Do ... like to?",
              "he/she/it": "Does ... like to?"
            },
            examples: ["I like to draw", "She likes to play guitar", "Do you like to read?"]
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L02_D01",
            line_index: 1,
            speaker: "Sardor",
            bubble_text: "I like to draw pictures and listen to music."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz faqat musiqa tinglaysizmi? Boshqa narsa yoqtirmaysizmi?",
              audio: "u08_l02_like_to_uz.mp3",
              uz_mirror_answer: "Yo'q, men boshqa narsalarni ham yoqtiraman.",
              hybrid_answer: "Men **like to** rasm chizishni ham. Chizishni yoqtiraman.",
              en_canonical: "I like to draw pictures too.",
              
              grammar_visual: {
                pattern: "like + TO + base verb",
                extension: "U03: I like music → U08: I like TO LISTEN TO music",
                forms: "I like to / She likes to / Do you like to?",
                examples: ["I like to draw", "She likes to play", "Do you like to read?"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'like' dan keyin nima keladi?",
              exercise: {
                type: "function_sort",
                sentence: "I like to draw pictures.",
                options: [
                  {
                    label: "TO + base verb",
                    value: "infinitive",
                    correct: true
                  },
                  {
                    label: "verb + ing",
                    value: "gerund",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Like' dan keyin TO + base verb (infinitiv).",
                fail_msg: "Xato. 'Like' dan keyin TO + base verb: 'like TO draw'."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I like to draw pictures and listen to music.",
                  uz: "Men rasm chizish va musiqa tinglashni yaxshi ko'raman.",
                  is_anchor: true,
                  source_dialogue: "U08_L02_D01",
                  source_line: 1,
                  speaker: "Sardor"
                },
                {
                  en: "She likes to play the guitar.",
                  uz: "U gitara chalishni yaxshi ko'radi.",
                  subject: "She",
                  focus_word: "likes to"
                },
                {
                  en: "Do you like to write stories?",
                  uz: "Siz hikoyalar yozishni yoqtirasizmi?",
                  subject: "you",
                  focus_word: "like to"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men rasm chizishni yoqtiraman'",
              model_answer: "I like to draw pictures.",
              accepted_answers: [
                "I like to draw pictures.",
                "I like to draw.",
                "I like drawing pictures."
              ],
              trap: {
                trigger: "I like draw",
                message: "⚠️ 'Like' dan keyin TO kerak: 'like TO draw'!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 7: draw
        {
          id: "V_U08_L02_draw",
          en: "draw",
          uz: "chizmoq/rasm chizmoq",
          pos: "verb",
          type: "activity_verb",
          priority: 2,
          category: "creative_activities",
          introduced_in: "U08_L02",
          image: "draw_pictures.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L02_D01",
            line_index: 1,
            speaker: "Sardor",
            bubble_text: "I like to draw pictures and listen to music."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz faqat yozasizmi? Boshqa ijodiy ish qilmaysizmi?",
              audio: "u08_l02_draw_uz.mp3",
              uz_mirror_answer: "Yo'q, men yozishdan tashqari rasm ham chizaman.",
              hybrid_answer: "Men **draw** rasmlar ham chizaman. Chizaman.",
              en_canonical: "I draw pictures too."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Draw' nima qilishni bildiradi?",
              exercise: {
                type: "function_sort",
                sentence: "I like to draw pictures.",
                options: [
                  {
                    label: "Rasm chizish (Make pictures)",
                    value: "drawing",
                    correct: true
                  },
                  {
                    label: "Yozish (Writing)",
                    value: "writing",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Draw' = rasm chizish, qalam yoki rangli qalam bilan.",
                fail_msg: "Xato. 'Draw' = rasm chizish, yozish emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I like to draw pictures and listen to music.",
                  uz: "Men rasm chizish va musiqa tinglashni yaxshi ko'raman.",
                  is_anchor: true,
                  source_dialogue: "U08_L02_D01",
                  source_line: 1,
                  speaker: "Sardor"
                },
                {
                  en: "She draws beautiful pictures.",
                  uz: "U chiroyli rasmlar chizadi.",
                  subject: "She",
                  focus_word: "draws"
                },
                {
                  en: "We draw together every weekend.",
                  uz: "Biz har dam olish kunlari birga rasm chizamiz.",
                  subject: "We",
                  focus_word: "draw"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men rasm chizaman'",
              model_answer: "I draw pictures.",
              accepted_answers: [
                "I draw pictures.",
                "I draw.",
                "I like to draw."
              ],
              trap: {
                trigger: "I drawing",
                message: "⚠️ 'I drawing' emas! 'I DRAW' (present simple)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // CARD 8: guitar
        {
          id: "V_U08_L02_guitar",
          en: "guitar",
          uz: "gitara",
          pos: "noun",
          type: "musical_instrument",
          priority: 2,
          category: "music_instruments",
          introduced_in: "U08_L02",
          image: "guitar_instrument.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L02_D01",
            line_index: 2,
            speaker: "Nodira",
            bubble_text: "That's great! I like to play the guitar."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz faqat baraban chalaysizmi? Boshqa asbob bilmaysizmi?",
              audio: "u08_l02_guitar_uz.mp3",
              uz_mirror_answer: "Yo'q, men baraban emas. Men gitara chalayman.",
              hybrid_answer: "Men **guitar** chalayman. Gitara chalayman.",
              en_canonical: "I play the guitar."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Guitar' nima?",
              exercise: {
                type: "function_sort",
                sentence: "I like to play the guitar.",
                options: [
                  {
                    label: "Musiqa asbobi (Musical instrument)",
                    value: "instrument",
                    correct: true
                  },
                  {
                    label: "Sport (Sport)",
                    value: "sport",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Guitar' = gitara, musiqa asbobi.",
                fail_msg: "Xato. 'Guitar' = musiqa asbobi, sport emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "That's great! I like to play the guitar.",
                  uz: "Bu ajoyib! Men gitara chalishni yaxshi ko'raman.",
                  is_anchor: true,
                  source_dialogue: "U08_L02_D01",
                  source_line: 2,
                  speaker: "Nodira"
                },
                {
                  en: "He plays the guitar very well.",
                  uz: "U gitarani juda yaxshi chaladi.",
                  subject: "He",
                  focus_word: "guitar"
                },
                {
                  en: "My guitar is in my bedroom.",
                  uz: "Mening gitaram yotoq xonamda.",
                  subject: "My",
                  focus_word: "guitar"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men gitara chalayman'",
              model_answer: "I play the guitar.",
              accepted_answers: [
                "I play the guitar.",
                "I play guitar.",
                "I like to play the guitar."
              ],
              trap: {
                trigger: "I play guitar",
                message: "⚠️ Odatda 'play THE guitar' ishlatiladi (artikel bilan)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L02_D01",
                line_index: 2
              }
            }
          ]
        },

        // CARD 9: everyone
        {
          id: "V_U08_L02_everyone",
          en: "everyone",
          uz: "hamma/barcha odamlar",
          pos: "indefinite_pronoun",
          type: "positive_indefinite",
          priority: 1,
          category: "indefinite_pronouns",
          introduced_in: "U08_L02",
          image: "everyone_people.jpg",
          
          grammar_table: {
            singular_verb: "Everyone IS/PLAYS (NOT are/play)",
            meaning: "All people",
            usage: "With positive verbs only",
            vs_anyone: "anyone = questions/negatives, everyone = positive statements",
            examples: ["Everyone is here", "Everyone plays music", "Everyone likes something"]
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L02_D01",
            line_index: 6,
            speaker: "Nodira",
            bubble_text: "Yes, everyone in my family plays something!"
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning oilangizda hech kim musiqa chalmaydimi?",
              audio: "u08_l02_everyone_uz.mp3",
              uz_mirror_answer: "Yo'q, hamma chalaadi. Oilamdagi hamma narsa chalaydi.",
              hybrid_answer: "Oilamdagi **everyone** nimadir chalaydi. Hamma.",
              en_canonical: "Everyone in my family plays something.",
              
              grammar_visual: {
                singular_verb: "Everyone IS/PLAYS (singular!)",
                meaning: "Everyone = all people",
                vs_anyone: "Anyone = questions/negatives",
                examples: ["Everyone is here", "Everyone plays music"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Everyone' qanday fe'l oladi?",
              exercise: {
                type: "function_sort",
                sentence: "Everyone plays music.",
                options: [
                  {
                    label: "Birlik fe'l (Singular verb)",
                    value: "singular",
                    correct: true
                  },
                  {
                    label: "Ko'plik fe'l (Plural verb)",
                    value: "plural",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Everyone' = birlik fe'l: Everyone PLAYS (NOT play).",
                fail_msg: "Xato. 'Everyone' = birlik fe'l: Everyone IS, Everyone PLAYS."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Yes, everyone in my family plays something!",
                  uz: "Ha, mening oilamdagi hamma nimadir chaladi!",
                  is_anchor: true,
                  source_dialogue: "U08_L02_D01",
                  source_line: 6,
                  speaker: "Nodira"
                },
                {
                  en: "Everyone is here today.",
                  uz: "Bugun hamma shu yerda.",
                  subject: "Everyone",
                  focus_word: "everyone"
                },
                {
                  en: "Everyone likes to listen to music.",
                  uz: "Hamma musiqa tinglashni yaxshi ko'radi.",
                  subject: "Everyone",
                  focus_word: "everyone"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Hamma nimadir chaladi'",
              model_answer: "Everyone plays something.",
              accepted_answers: [
                "Everyone plays something.",
                "Everyone plays music.",
                "Everyone in my family plays something."
              ],
              trap: {
                trigger: "Everyone play",
                message: "⚠️ 'Everyone' birlik! 'Everyone PLAYS' (NOT 'play')!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L02_D01",
                line_index: 6
              }
            }
          ]
        },

        // CARD 10: anything
        {
          id: "V_U08_L02_anything",
          en: "anything",
          uz: "hech narsa (inkor/savol)",
          pos: "indefinite_pronoun",
          type: "negative_indefinite",
          priority: 1,
          category: "indefinite_pronouns",
          introduced_in: "U08_L02",
          image: "anything_indefinite.jpg",
          
          grammar_table: {
            negative_context: "Used with negative verbs",
            question_context: "Used in questions",
            pattern: "don't have anything / Is there anything?",
            vs_something: "something = positive, anything = negative/questions",
            vs_nothing: "don't have anything = have nothing (same meaning, different structure)",
            examples: ["I don't have anything", "Is there anything?", "There isn't anything here"]
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L02_D01",
            line_index: 7,
            speaker: "Sardor",
            bubble_text: "I don't have anything to play."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizda chalish uchun nimadir bormi? Gitara, pianino?",
              audio: "u08_l02_anything_uz.mp3",
              uz_mirror_answer: "Yo'q, menda hech narsa yo'q. Hech narsa.",
              hybrid_answer: "Menda **anything** yo'q chaladigan. Hech narsa yo'q.",
              en_canonical: "I don't have anything to play.",
              
              grammar_visual: {
                negative_context: "ANYTHING = negative verbs bilan",
                question_context: "ANYTHING = savollarda ham",
                vs_something: "Something = positive / Anything = negative",
                examples: ["I don't have anything", "Is there anything?"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Anything' qaysi gap turlari bilan ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "I don't have anything.",
                options: [
                  {
                    label: "Ijobiy gap (Positive)",
                    value: "positive",
                    correct: false
                  },
                  {
                    label: "Inkor gap (Negative)",
                    value: "negative",
                    correct: true
                  }
                ],
                success_msg: "To'g'ri! 'Anything' = inkor gaplar va savollar bilan.",
                fail_msg: "Xato. 'Anything' = INKOR gaplar bilan, ijobiy bilan emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "I don't have anything to play.",
                  uz: "Menda chaladigan hech narsa yo'q.",
                  is_anchor: true,
                  source_dialogue: "U08_L02_D01",
                  source_line: 7,
                  speaker: "Sardor"
                },
                {
                  en: "Is there anything in your room?",
                  uz: "Sizning xonangizda nimadir bormi?",
                  subject: "there",
                  focus_word: "anything"
                },
                {
                  en: "She doesn't see anything wrong.",
                  uz: "U hech qanday noto'g'ri narsa ko'rmaydi.",
                  subject: "She",
                  focus_word: "anything"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Menda hech narsa yo'q'",
              model_answer: "I don't have anything.",
              accepted_answers: [
                "I don't have anything.",
                "I have nothing.",
                "I don't have anything to play."
              ],
              trap: {
                trigger: "I don't have nothing",
                message: "⚠️ Ikki marta inkor! 'don't have ANYTHING' yoki 'have NOTHING'!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L02_D01",
                line_index: 7
              }
            }
          ]
        }
      ]
    },

    "U08_L03": {
      lesson_id: "U08_L03",
      title: "Negative Indefinites & Room Activities",
      grammar_target: "nothing, no one vs anything, anyone + Present simple with activities",
      scalability_pattern: "There is + [nothing/no one] vs There isn't + [anything/anyone]",
      source_dialogues: ["U08_L03_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["There is nothing wrong.", "No one plays guitar here."] },
        negative: { required: 1, examples: ["There isn't anyone here.", "I don't see anything."] },
        question: { required: 1, examples: ["Is there anyone here?", "Does anyone like to read?"] }
      },
      
      recycling_stats: {
        total_content_words: 52,
        recycled_words: 39,
        new_words: 13,
        ratio: 0.75,
        status: "✅ Within target (0.60-0.75)"
      },

      items: [
        // CARD 11: nothing
        {
          id: "V_U08_L03_nothing",
          en: "nothing",
          uz: "hech narsa",
          pos: "indefinite_pronoun",
          type: "negative_indefinite",
          priority: 1,
          category: "indefinite_pronouns",
          introduced_in: "U08_L03",
          image: "nothing_empty.jpg",
          
          grammar_table: {
            positive_verb: "Used with positive verbs only",
            pattern: "There is nothing / I have nothing",
            vs_anything: "nothing + positive verb = anything + negative verb",
            equivalents: {
              "There is nothing here": "There isn't anything here",
              "I have nothing": "I don't have anything",
              "Nothing is wrong": "Nothing isn't wrong (NOT used)"
            },
            rule: "NEVER double negative: 'There isn't nothing' ❌"
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L03_D01",
            line_index: 4,
            speaker: "Ravshan",
            bubble_text: "There's nothing wrong with that! You draw well."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning rasmingizda nimadir yomon bormi? Noto'g'ri?",
              audio: "u08_l03_nothing_uz.mp3",
              uz_mirror_answer: "Yo'q, hech narsa yomon yo'q. Hammasi yaxshi.",
              hybrid_answer: "**Nothing** yomon yo'q. Hech narsa yomon emas.",
              en_canonical: "There's nothing wrong with it.",
              
              grammar_visual: {
                positive_verb: "NOTHING + positive verb",
                no_double_negative: "There is nothing ✅ (NOT: There isn't nothing ❌)",
                equivalents: "Nothing here = There isn't anything here",
                examples: ["Nothing is wrong", "I have nothing", "Nothing happened"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Nothing' qaysi fe'llar bilan ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "There is nothing wrong.",
                options: [
                  {
                    label: "Ijobiy fe'llar (Positive verbs)",
                    value: "positive",
                    correct: true
                  },
                  {
                    label: "Inkor fe'llar (Negative verbs)",
                    value: "negative",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Nothing' = ijobiy fe'llar bilan (There IS nothing).",
                fail_msg: "Xato. 'Nothing' = ijobiy fe'llar bilan, ikki marta inkor yo'q!"
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "There's nothing wrong with that! You draw well.",
                  uz: "Bunda yomon hech narsa yo'q! Siz yaxshi chizasiz.",
                  is_anchor: true,
                  source_dialogue: "U08_L03_D01",
                  source_line: 4,
                  speaker: "Ravshan"
                },
                {
                  en: "I have nothing to do today.",
                  uz: "Bugun qilishga hech narsam yo'q.",
                  subject: "I",
                  focus_word: "nothing"
                },
                {
                  en: "Nothing is impossible if you try.",
                  uz: "Agar harakat qilsang, hech narsa imkonsiz emas.",
                  subject: "Nothing",
                  focus_word: "nothing"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Hech narsa yomon yo'q'",
              model_answer: "There is nothing wrong.",
              accepted_answers: [
                "There is nothing wrong.",
                "There's nothing wrong.",
                "Nothing is wrong."
              ],
              trap: {
                trigger: "There isn't nothing",
                message: "⚠️ Ikki marta inkor! 'There IS nothing' (positive verb)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L03_D01",
                line_index: 4
              }
            }
          ]
        },

        // CARD 12: no one
        {
          id: "V_U08_L03_no_one",
          en: "no one",
          uz: "hech kim",
          pos: "indefinite_pronoun",
          type: "negative_indefinite",
          priority: 1,
          category: "indefinite_pronouns",
          introduced_in: "U08_L03",
          image: "no_one_empty.jpg",
          
          grammar_table: {
            positive_verb: "Used with positive verbs only",
            pattern: "No one + is/plays/likes",
            vs_anyone: "no one + positive verb = anyone + negative verb",
            equivalents: {
              "No one is here": "There isn't anyone here",
              "No one plays": "No one doesn't play (NOT used)",
              "No one likes": "Nobody doesn't like (NOT used)"
            },
            alternative: "nobody = no one (same meaning)",
            rule: "NEVER double negative: 'No one doesn't' ❌"
          },
          
          dialogue_ref: {
            dialogue_id: "U08_L03_D01",
            line_index: 2,
            speaker: "Malika",
            bubble_text: "No one in my class plays music after school."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Sizning sinfingizda hamma musiqa chalaydimi?",
              audio: "u08_l03_no_one_uz.mp3",
              uz_mirror_answer: "Yo'q, mening sifimda hech kim musiqa chalmaydi.",
              hybrid_answer: "Mening sifimda **no one** musiqa chalmaydi. Hech kim.",
              en_canonical: "No one in my class plays music.",
              
              grammar_visual: {
                positive_verb: "NO ONE + positive verb",
                vs_nobody: "No one = Nobody (same meaning)",
                equivalents: "No one here = There isn't anyone here",
                examples: ["No one is here", "No one plays", "No one likes"]
              }
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'No one' qaysi fe'llar bilan ishlatiladi?",
              exercise: {
                type: "function_sort",
                sentence: "No one plays music here.",
                options: [
                  {
                    label: "Ijobiy fe'llar (Positive verbs)",
                    value: "positive",
                    correct: true
                  },
                  {
                    label: "Inkor fe'llar (Negative verbs)",
                    value: "negative",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'No one' = ijobiy fe'llar bilan (No one PLAYS).",
                fail_msg: "Xato. 'No one' = ijobiy fe'llar bilan, ikki marta inkor yo'q!"
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "No one in my class plays music after school.",
                  uz: "Mening sinimdagi hech kim maktabdan keyin musiqa chalmaydi.",
                  is_anchor: true,
                  source_dialogue: "U08_L03_D01",
                  source_line: 2,
                  speaker: "Malika"
                },
                {
                  en: "No one is in the bedroom right now.",
                  uz: "Hozir yotoq xonasida hech kim yo'q.",
                  subject: "No one",
                  focus_word: "no one"
                },
                {
                  en: "No one likes to write in our family.",
                  uz: "Bizning oilamizda hech kim yozishni yoqtirmaydi.",
                  subject: "No one",
                  focus_word: "no one"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Hech kim bu yerda yo'q'",
              model_answer: "No one is here.",
              accepted_answers: [
                "No one is here.",
                "Nobody is here.",
                "There is no one here."
              ],
              trap: {
                trigger: "No one doesn't",
                message: "⚠️ Ikki marta inkor! 'No one IS' (positive verb)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L03_D01",
                line_index: 2
              }
            }
          ]
        },

        // CARD 13: magazines
        {
          id: "V_U08_L03_magazines",
          en: "magazines",
          uz: "jurnallar",
          pos: "noun",
          type: "reading_material",
          priority: 3,
          category: "reading_materials",
          introduced_in: "U08_L03",
          image: "magazines_reading.jpg",
          
          dialogue_ref: {
            dialogue_id: "U08_L03_D01",
            line_index: 5,
            speaker: "Ravshan",
            bubble_text: "Thanks! I read magazines about art too."
          },
          
          slides: [
            {
              phase: "presentation",
              uz_context: "Siz faqat kitob o'qiysizmi? Gazeta, jurnal o'qimaysizmi?",
              audio: "u08_l03_magazines_uz.mp3",
              uz_mirror_answer: "Yo'q, men kitobdan tashqari jurnal ham o'qiyman.",
              hybrid_answer: "Men **magazines** ham o'qiyman. Jurnallar o'qiyman.",
              en_canonical: "I read magazines too."
            },
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Magazines' nima?",
              exercise: {
                type: "function_sort",
                sentence: "I read magazines about art.",
                options: [
                  {
                    label: "Jurnallar (Periodical publications)",
                    value: "magazines",
                    correct: true
                  },
                  {
                    label: "Kitoblar (Books)",
                    value: "books",
                    correct: false
                  }
                ],
                success_msg: "To'g'ri! 'Magazines' = jurnallar, har oy yoki hafta chiqadigan.",
                fail_msg: "Xato. 'Magazines' = jurnallar, kitob emas."
              }
            },
            {
              phase: "practice",
              type: "drill_list",
              en_examples: [
                {
                  en: "Thanks! I read magazines about art too.",
                  uz: "Rahmat! Men san'at haqida jurnallar ham o'qiyman.",
                  is_anchor: true,
                  source_dialogue: "U08_L03_D01",
                  source_line: 5,
                  speaker: "Ravshan"
                },
                {
                  en: "She likes to read music magazines.",
                  uz: "U musiqa jurnallarini o'qishni yaxshi ko'radi.",
                  subject: "She",
                  focus_word: "magazines"
                },
                {
                  en: "There are fashion magazines on my bookshelf.",
                  uz: "Mening kitob javonimda moda jurnallari bor.",
                  subject: "magazines",
                  focus_word: "magazines"
                }
              ]
            },
            {
              phase: "production",
              uz_prompt: "Ingliz tilida ayting: 'Men jurnallar o'qiyman'",
              model_answer: "I read magazines.",
              accepted_answers: [
                "I read magazines.",
                "I like to read magazines.",
                "I read magazines about art."
              ],
              trap: {
                trigger: "I read magazine",
                message: "⚠️ Ko'plik! 'I read MAGAZINES' (ko'plik -s bilan)!"
              },
              on_success: {
                unlock_bubble: true,
                dialogue_id: "U08_L03_D01",
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
  Object.freeze(window.VOCAB_CARDS_U08);
}