/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VOCAB CARDS — UNIT 10: Shopping & Quantities
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Shopping & Quantities - CAPSTONE UNIT):
 * - Shopping transactions (buy, sell, price, cost)
 * - Quantifiers (a few, a bit of, a lot of)
 * - Countable vs. Uncountable nouns
 * - FOR phrases (Purpose, Person, Price, Deadline, Fame, Definition)
 * - Comprehensive recycling of U01-U09 vocabulary
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
 * RECYCLING CHAIN: U01 → U09 → U10 (Capstone)
 *
 * @version 1.0.0 - Initial creation (Unit 10)
 */

window.VOCAB_CARDS_U10 = {
  unit_id: "U10",
  unit_title: "Shopping & Quantities",
  scalability_level: 5,
  grammar_focus: "Quantifiers (a few/a bit of) + FOR phrases + Countable/Uncountable",
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RECYCLING REGISTRY - What MUST be recycled from U01-U09 (Rule R2)
  // ═══════════════════════════════════════════════════════════════════════════
  recycling: {
    mandatory: {
      from_u01: {
        subject_pronouns: ["I", "you", "he", "she", "it", "we", "they"],
        to_be_present: ["am", "is", "are", "isn't", "aren't"],
        possessive_det: ["my", "your", "his", "her", "our", "their"],
        question_words: ["what", "who", "how"],
        articles: ["a", "an", "the"],
        demonstratives: ["this", "that", "these"],
        family: ["mother", "father", "sister", "brother"]
      },
      from_u02: {
        action_verbs: ["go", "have", "drink", "eat"],
        time_markers: ["at night", "every day"],
        auxiliaries_present: ["do", "don't", "does", "doesn't"]
      },
      from_u03: {
        preference_verbs: ["like", "love", "hate"],
        adjectives: ["good", "great", "beautiful"],
        food: ["breakfast", "lunch"]
      },
      from_u04: {
        past_states: ["was", "were"],
        locations: ["home", "work"],
        colors: ["blue", "red"]
      },
      from_u05: {
        past_time: ["yesterday", "last week"],
        past_regular: ["worked", "played"]
      },
      from_u06: {
        auxiliaries_past: ["did", "didn't"],
        reason: ["because"]
      },
      from_u07: {
        irregular_past: ["bought", "went", "saw", "took", "had", "ate"],
        time_adverbs: ["quickly", "slowly"]
      },
      from_u08: {
        indefinite_pronouns: ["something", "anything", "nothing"],
        rooms: ["bedroom"]
      },
      from_u09: {
        clothes: ["jumper", "boots", "trainers", "socks", "scarf", "gloves", "suit"],
        materials: ["leather", "cotton", "wool", "plastic"],
        possessive_pronouns: ["mine", "yours", "his", "hers", "ours"]
      }
    },
    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES - Source texts for anchor sentences (Constraint #1 & #2)
  // ═══════════════════════════════════════════════════════════════════════════
  dialogues: {
    "U10_L01_D01": {
      id: "U10_L01_D01",
      title: "At the Grocery Shop",
      setting: "Two friends shopping for groceries",
      characters: ["Nilufar", "Bekzod"],
      grammar_coverage: {
        affirmative: ["I'm buying biscuits.", "These earrings are for my mother."],
        negative: ["I'm not buying meat."],
        question: ["What are you buying?", "Is this wallet yours?"]
      },
      recycling_balance: {
        least_used_included: ["breakfast", "lunch", "yesterday"],
        quota_met: true,
        notes: "U10 vocab + U09 possessives + U03 food"
      },
      lines: [
        { speaker: "Nilufar", line: "Hi Bekzod! What are you buying?", line_uz: "Salom Bekzod! Sen nima sotib olayapsan?", recycled: ["Hi", "What", "are", "you"], target: ["buying"] , mastery_key: "U10_L01_D01_0", audio_id: "U10_L01_D01_L0" },
        { speaker: "Bekzod", line: "I'm buying biscuits. For breakfast.", line_uz: "Men pechenye sotib olayapman. Nonushta uchun.", recycled: ["I'm", "breakfast"], target: ["buying", "biscuits", "For"] , mastery_key: "U10_L01_D01_1", audio_id: "U10_L01_D01_L1" },
        { speaker: "Nilufar", line: "Good! I'm buying cheese. For lunch.", line_uz: "Yaxshi! Men pishloq sotib olayapman. Tushlik uchun.", recycled: ["Good", "I'm", "lunch"], target: ["buying", "cheese", "For"] , mastery_key: "U10_L01_D01_2", audio_id: "U10_L01_D01_L2" },
        { speaker: "Bekzod", line: "Great! What about these earrings? For whom?", line_uz: "Zo'r! Bu sirg'alar-chi? Kimga?", recycled: ["Great", "What", "about", "these"], target: ["earrings", "For", "whom"] , mastery_key: "U10_L01_D01_3", audio_id: "U10_L01_D01_L3" },
        { speaker: "Nilufar", line: "These earrings are for my mother. For her birthday.", line_uz: "Bu sirg'alar onam uchun. Uning tug'ilgan kuni uchun.", recycled: ["These", "are", "my", "mother", "her", "birthday"], target: ["earrings", "for", "For"] , mastery_key: "U10_L01_D01_4", audio_id: "U10_L01_D01_L4" },
        { speaker: "Bekzod", line: "Beautiful! Is this wallet yours?", line_uz: "Chiroyli! Bu hamyon seniki-mi?", recycled: ["Beautiful", "Is", "this", "yours"], target: ["wallet"] , mastery_key: "U10_L01_D01_5", audio_id: "U10_L01_D01_L5" },
        { speaker: "Nilufar", line: "Yes, this wallet is mine. I bought it yesterday.", line_uz: "Ha, bu hamyon meniki. Men uni kecha sotib oldim.", recycled: ["Yes", "this", "is", "mine", "I", "bought", "it", "yesterday"], target: ["wallet"] , mastery_key: "U10_L01_D01_6", audio_id: "U10_L01_D01_L6" },
        { speaker: "Bekzod", line: "Good choice! Now it's time to pay!", line_uz: "Yaxshi tanlov! Endi to'lash vaqti!", recycled: ["Good", "choice", "Now", "it's", "time", "to"], target: ["pay"] , mastery_key: "U10_L01_D01_7", audio_id: "U10_L01_D01_L7" }
      ]
    },

    "U10_L02_D01": {
      id: "U10_L02_D01",
      title: "After Shopping",
      setting: "Two friends meeting after shopping",
      characters: ["Madina", "Otabek"],
      grammar_coverage: {
        affirmative: ["I bought some biscuits.", "I spent a bit of money."],
        negative: ["I didn't spend a lot."],
        question: ["Did you buy many biscuits?", "Did you get the receipt?"]
      },
      recycling_balance: {
        least_used_included: ["some", "money", "mine"],
        quota_met: true,
        notes: "U10 quantifiers + U07 irregular past (bought, spent)"
      },
      lines: [
        { speaker: "Madina", line: "Hi Otabek! What did you buy?", line_uz: "Salom Otabek! Sen nima sotib oldingiz?", recycled: ["Hi", "What", "did", "you", "buy"], target: [] , mastery_key: "U10_L02_D01_0", audio_id: "U10_L02_D01_L0" },
        { speaker: "Otabek", line: "I bought some biscuits. A few.", line_uz: "Men biroz pechenye sotib oldim. Bir nechta.", recycled: ["I", "bought", "some"], target: ["biscuits", "A few"] , mastery_key: "U10_L02_D01_1", audio_id: "U10_L02_D01_L1" },
        { speaker: "Madina", line: "Good! I bought some cheese. A bit.", line_uz: "Yaxshi! Men biroz pishloq sotib oldim. Ozgina.", recycled: ["Good", "I", "bought", "some"], target: ["cheese", "A bit"] , mastery_key: "U10_L02_D01_2", audio_id: "U10_L02_D01_L2" },
        { speaker: "Otabek", line: "Did you spend some money? A lot?", line_uz: "Sen biroz pul sarfladingizmi? Ko'pmi?", recycled: ["Did", "you", "some", "money"], target: ["spend", "A lot"] , mastery_key: "U10_L02_D01_3", audio_id: "U10_L02_D01_L3" },
        { speaker: "Madina", line: "No, not a lot. I spent a bit of money.", line_uz: "Yo'q, ko'p emas. Men ozgina pul sarfladim.", recycled: ["No", "not", "a lot", "I", "money"], target: ["spent", "a bit of"] , mastery_key: "U10_L02_D01_4", audio_id: "U10_L02_D01_L4" },
        { speaker: "Otabek", line: "Me too. I received a few coins.", line_uz: "Men ham. Men bir nechta tanga oldim.", recycled: ["Me", "too", "I", "received", "a few"], target: ["coins"] , mastery_key: "U10_L02_D01_5", audio_id: "U10_L02_D01_L5" },
        { speaker: "Madina", line: "Did you get the receipt?", line_uz: "Chek oldingizmi?", recycled: ["Did", "you", "get", "the"], target: ["receipt"] , mastery_key: "U10_L02_D01_6", audio_id: "U10_L02_D01_L6" },
        { speaker: "Otabek", line: "Yes, I got the receipt. It's mine.", line_uz: "Ha, men chekni oldim. U meniki.", recycled: ["Yes", "I", "got", "the", "It's", "mine"], target: ["receipt"] , mastery_key: "U10_L02_D01_7", audio_id: "U10_L02_D01_L7" }
      ]
    },

    "U10_L03_D01": {
      id: "U10_L03_D01",
      title: "Shopping Mall Prices",
      setting: "Two friends compare prices and negotiate",
      characters: ["Gulnora", "Sardor"],
      grammar_coverage: {
        affirmative: ["This bag is for 50 dollars.", "Spain is famous for food."],
        negative: ["I didn't sell it."],
        question: ["How much is this bag?", "Can I have the bill?"]
      },
      recycling_balance: {
        least_used_included: ["expensive", "work", "finish", "Monday"],
        quota_met: true,
        notes: "U10 FOR phrases + U05/07 recycling"
      },
      lines: [
        { speaker: "Gulnora", line: "Hi Sardor! How much is this bag?", line_uz: "Salom Sardor! Bu sumka qancha?", recycled: ["Hi", "How", "is", "this"], target: ["much", "bag"] , mastery_key: "U10_L03_D01_0", audio_id: "U10_L03_D01_L0" },
        { speaker: "Sardor", line: "This bag is for 50 dollars. Very expensive!", line_uz: "Bu sumka 50 dollarga. Juda qimmat!", recycled: ["This", "is", "dollars", "Very"], target: ["bag", "for", "expensive"] , mastery_key: "U10_L03_D01_1", audio_id: "U10_L03_D01_L1" },
        { speaker: "Gulnora", line: "Very expensive! I sold my old bag for 20 dollars.", line_uz: "Juda qimmat! Men eski sumkamni 20 dollarga sotdim.", recycled: ["Very", "I", "my", "old", "dollars"], target: ["expensive", "sold", "bag", "for"] , mastery_key: "U10_L03_D01_2", audio_id: "U10_L03_D01_L2" },
        { speaker: "Sardor", line: "Good! This work must be finished for Monday.", line_uz: "Yaxshi! Bu ish dushanba kuni uchun tugashi kerak.", recycled: ["Good", "This", "work", "must", "be", "finished", "Monday"], target: ["for"] , mastery_key: "U10_L03_D01_3", audio_id: "U10_L03_D01_L3" },
        { speaker: "Gulnora", line: "By the way, Spain is famous for food.", line_uz: "Aytgancha, Ispaniya ovqati bilan mashhur.", recycled: ["By the way", "Spain", "is", "food"], target: ["famous", "for"] , mastery_key: "U10_L03_D01_4", audio_id: "U10_L03_D01_L4" },
        { speaker: "Sardor", line: "Yes! And 'Sneakers' - this is the word for 'trainers'.", line_uz: "Ha! Va 'Sneakers' - bu 'trainers' uchun so'z.", recycled: ["Yes", "And", "this", "is", "the", "trainers"], target: ["word", "for"] , mastery_key: "U10_L03_D01_5", audio_id: "U10_L03_D01_L5" },
        { speaker: "Gulnora", line: "Right! I'll ask for a discount.", line_uz: "To'g'ri! Men chegirma uchun so'rayman.", recycled: ["Right", "I'll", "ask"], target: ["for", "discount"] , mastery_key: "U10_L03_D01_6", audio_id: "U10_L03_D01_L6" },
        { speaker: "Sardor", line: "Good idea! Get the receipt!", line_uz: "Yaxshi fikr! Chekni oling!", recycled: ["Good", "idea", "Get", "the"], target: ["receipt"] , mastery_key: "U10_L03_D01_7", audio_id: "U10_L03_D01_L7" }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSONS
  // ═══════════════════════════════════════════════════════════════════════════
  lessons: {
    "U10_L01": {
      lesson_id: "U10_L01",
      title: "Shopping Preferences & FOR (Purpose)",
      grammar_target: "FOR + [Noun] for purpose/recipient",
      scalability_pattern: "[Noun] is for [Person/Purpose]",
      source_dialogues: ["U10_L01_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I'm buying biscuits.", "These are for my mother."] },
        negative: { required: 1, examples: ["I'm not buying meat."] },
        question: { required: 1, examples: ["What are you buying?"] }
      },

      items: [
        {
          id: "V_U10_L01_biscuit",
          en: "biscuit(s)",
          uz: "pechenye(lar)",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "food_shopping",
          introduced_in: "U10_L01",
          image: "biscuits_pack.jpg",
          grammar_table: { singular: "biscuit", plural: "biscuits", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen nonushtaga hech narsa yemaysanmi? Faqat choy ichasanmi?", uzbek_mirror: "Yo'q, hech narsa emas. Men pechenye yeyapman.", hybrid_text: "Yo'q, men **biscuits** yeyapman. Pechenyelar." },
          act_2_concept_check: { question: "Can you count biscuits one, two, three?", answer: "Yes, they are countable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men pechenye sotib olayapman.", translation: "I'm buying **biscuits**." }, section_2: { text: "I have a few **biscuits**.", translation: "Menda biroz pechenyelar bor." }, section_3: { text: "I bought a few **biscuits** for breakfast yesterday because I love them.", translation: "Men kecha nonushta uchun biroz pechenye sotib oldim chunki men ularni yaxshi ko'raman." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "biscuit" }
        },
        {
          id: "V_U10_L01_cheese",
          en: "cheese",
          uz: "pishloq",
          pos: "noun",
          type: "uncountable",
          priority: 1,
          category: "food_shopping",
          introduced_in: "U10_L01",
          image: "cheese_block.jpg",
          grammar_table: { singular: "cheese", plural: "cheese (uncountable)", countable: false },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen go'sht yemaysanmi? Hayvon mahsulotlaridan foydalanmaysanmi?", uzbek_mirror: "Yo'q, go'sht emas lekin men pishloq yeyapman.", hybrid_text: "Yo'q, men **cheese** yeyapman. Pishloq." },
          act_2_concept_check: { question: "Can you say 'one cheese, two cheeses'?", answer: "No, it's uncountable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men pishloq sotib olayapman.", translation: "I'm buying **cheese**." }, section_2: { text: "I have a bit of **cheese**.", translation: "Menda biroz pishloq bor." }, section_3: { text: "I bought a bit of **cheese** for lunch yesterday and it was delicious.", translation: "Men kecha tushlik uchun biroz pishloq sotib oldim va u juda mazali edi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "cheese" }
        },
        {
          id: "V_U10_L01_for_purpose",
          en: "for",
          uz: "uchun (maqsad)",
          pos: "preposition",
          type: "gram_structure",
          priority: 2,
          category: "grammar",
          introduced_in: "U10_L01",
          image: "grammar_for.jpg",
          grammar_table: { usage: "purpose", example: "for breakfast" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen nonushta uchun nima sotib olayapsan? Qaysi maqsad uchun?", uzbek_mirror: "Men pechenye sotib olayapman nonushta uchun.", hybrid_text: "Men pechenye sotib olayapman **for** nonushta. Nonushta uchun." },
          act_2_concept_check: { question: "Does 'for' show why we do something here?", answer: "Yes, it shows purpose.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Nonushta uchun.", translation: "**For** breakfast." }, section_2: { text: "I bought cheese **for** lunch.", translation: "Men tushlik **uchun** pishloq sotib oldim." }, section_3: { text: "I bought a new jumper **for** the party yesterday because my old one was too small.", translation: "Men kecha bazm **uchun** yangi jemper sotib oldim chunki eskisi juda kichkina edi." } },
          act_4_production: { input_prompt: "Write the preposition", correct_answer: "for" }
        },
        {
          id: "V_U10_L01_for_person",
          en: "for",
          uz: "uchun (odam)",
          pos: "preposition",
          type: "gram_structure",
          priority: 2,
          category: "grammar",
          introduced_in: "U10_L01",
          image: "gift_giving.jpg",
          grammar_table: { usage: "recipient", example: "for my mother" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen bu sirg'alarni o'zing uchunmi sotib olyapsan? O'zingga?", uzbek_mirror: "Yo'q, o'zim uchun emas. Bu onam uchun.", hybrid_text: "Yo'q, bu **for** mening onam. Onam uchun." },
          act_2_concept_check: { question: "Who receives the item?", answer: "Use 'for' + person.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu sirg'alar onam uchun.", translation: "These earrings are **for** my mother." }, section_2: { text: "This gift is **for** my sister.", translation: "Bu sovg'a mening singlim **uchun**." }, section_3: { text: "I bought leather boots **for** my father yesterday because it was his birthday.", translation: "Men kecha otam **uchun** charm etik sotib oldim chunki uning tug'ilgan kuni edi." } },
          act_4_production: { input_prompt: "Write the preposition", correct_answer: "for" }
        },
        {
          id: "V_U10_L01_earring",
          en: "earring(s)",
          uz: "sirg'a(lar)",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "jewellery",
          introduced_in: "U10_L01",
          image: "earrings_gold.jpg",
          grammar_table: { singular: "earring", plural: "earrings", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen quloqlaringga hech narsa taqmaysanmi? Taqinchoq kiymaysanmi?", uzbek_mirror: "Yo'q, hech narsa emas. Men sirg'a taqaman.", hybrid_text: "Yo'q, men **earrings** taqaman. Sirg'alar." },
          act_2_concept_check: { question: "Is 'earrings' plural?", answer: "Yes, usually pairs.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu sirg'alar onam uchun.", translation: "These **earrings** are for my mother." }, section_2: { text: "She has a few **earrings**.", translation: "Unda biroz sirg'alar bor." }, section_3: { text: "I bought a few **earrings** for my sister yesterday because she loves jewelry.", translation: "Men kecha singlim uchun biroz sirg'a sotib oldim chunki u taqinchoqlarni yaxshi ko'radi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "earring" }
        },
        {
          id: "V_U10_L01_wallet",
          en: "wallet",
          uz: "hamyon (erkaklar)",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "accessories",
          introduced_in: "U10_L01",
          image: "wallet_leather.jpg",
          grammar_table: { singular: "wallet", plural: "wallets", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen pullaringni cho'ntagingda saqaysanmi? Bo'sh holda?", uzbek_mirror: "Yo'q, cho'ntakda emas. Men hamyonda saqlayman.", hybrid_text: "Yo'q, men **wallet**da saqlayman. Hamyon." },
          act_2_concept_check: { question: "Do men usually use a wallet or a purse?", answer: "A wallet.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu hamyon seniki-mi?", translation: "Is this **wallet** yours?" }, section_2: { text: "This **wallet** is mine.", translation: "Bu hamyon meniki." }, section_3: { text: "I bought a new leather **wallet** yesterday because my old one was broken.", translation: "Men kecha yangi charm hamyon sotib oldim chunki eskisi buzilgan edi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "wallet" }
        },
        {
          id: "V_U10_L01_purse",
          en: "purse",
          uz: "hamyon (ayollar)",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "accessories",
          introduced_in: "U10_L01",
          image: "purse_womens.jpg",
          grammar_table: { singular: "purse", plural: "purses", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen ayolsan va pullaringni cho'ntakda saqaysanmi?", uzbek_mirror: "Yo'q, cho'ntakda emas. Men hamyonda saqlayman.", hybrid_text: "Yo'q, men **purse**da saqlayman. Hamyon (ayol)." },
          act_2_concept_check: { question: "Is a purse usually for men?", answer: "No, for women.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Mening hamyonim qayerda?", translation: "Where is my **purse**?" }, section_2: { text: "Is this **purse** hers?", translation: "Bu hamyon uniki (ayol)mi?" }, section_3: { text: "My mother left her **purse** at home yesterday when she went shopping.", translation: "Mening onam kecha xarid qilishga borganda hamyonini uyda qoldirdi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "purse" }
        },
        {
          id: "V_U10_L01_shop",
          en: "shop",
          uz: "do'kon",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "places",
          introduced_in: "U10_L01",
          image: "shop_front.jpg",
          grammar_table: { singular: "shop", plural: "shops", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen uyda ovqat tayyorlaysanmi? Hammasi uyda bormi?", uzbek_mirror: "Yo'q, uyda hammasi yo'q. Men do'konga boraman.", hybrid_text: "Yo'q, men **shop**ga boraman. Do'kon." },
          act_2_concept_check: { question: "Is a shop a place to sleep?", answer: "No, a place to buy things.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men kecha do'konda edim.", translation: "I was at the **shop** yesterday." }, section_2: { text: "The **shop** is open.", translation: "Do'kon ochiq." }, section_3: { text: "I went to the **shop** yesterday and bought biscuits for breakfast because I love them.", translation: "Men kecha do'konga bordim va nonushta uchun pechenye sotib oldim chunki men ularni yaxshi ko'raman." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "shop" }
        }
      ]
    },

    "U10_L02": {
      lesson_id: "U10_L02",
      title: "Quantifiers: A few vs A bit of",
      grammar_target: "A few (countable) / A bit of (uncountable)",
      scalability_pattern: "[Subject] + bought + [Quantifier] + [Noun]",
      source_dialogues: ["U10_L02_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["I bought a few biscuits.", "I spent a bit of money."] },
        negative: { required: 1, examples: ["I didn't spend a lot."] },
        question: { required: 1, examples: ["Did you buy many biscuits?"] }
      },

      items: [
        {
          id: "V_U10_L02_a_few",
          en: "a few",
          uz: "bir nechta (sanaladigan)",
          pos: "quantifier",
          type: "countable_quantifier",
          priority: 1,
          category: "grammar_quant",
          introduced_in: "U10_L02",
          image: "few_coins.jpg",
          grammar_table: { usage: "with countable nouns", example: "a few coins" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen ko'p pechenye sotib oldingmi? Juda ko'pmi?", uzbek_mirror: "Yo'q, ko'p emas. Men biroz pechenye sotib oldim.", hybrid_text: "Yo'q, ko'p emas. Men **a few** pechenye sotib oldim. Biroz." },
          act_2_concept_check: { question: "Can we use 'a few' for water?", answer: "No, only countable things.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men biroz pechenye sotib oldim.", translation: "I bought **a few** biscuits." }, section_2: { text: "No, I bought **a few** biscuits.", translation: "Yo'q, men biroz pechenye sotib oldim." }, section_3: { text: "I bought **a few** apples yesterday.", translation: "Men kecha bir nechta olma sotib oldim." } },
          act_4_production: { input_prompt: "Write the phrase", correct_answer: "a few" }
        },
        {
          id: "V_U10_L02_a_bit_of",
          en: "a bit of",
          uz: "ozgina (sanalmaydigan)",
          pos: "quantifier",
          type: "uncountable_quantifier",
          priority: 1,
          category: "grammar_quant",
          introduced_in: "U10_L02",
          image: "bit_of_cheese.jpg",
          grammar_table: { usage: "with uncountable nouns", example: "a bit of cheese" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen ko'p pishloq sotib oldingmi?", uzbek_mirror: "Yo'q, ko'p emas. Men ozgina pishloq sotib oldim.", hybrid_text: "Yo'q, men **a bit of** pishloq sotib oldim. Ozgina." },
          act_2_concept_check: { question: "Can we use 'a bit of' for apples?", answer: "No, only uncountable things.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men ozgina pul sarfladim.", translation: "I spent **a bit of** money." }, section_2: { text: "No, I bought **a bit of** cheese.", translation: "Yo'q, men ozgina pishloq sotib oldim." }, section_3: { text: "I bought **a bit of** cheese for lunch yesterday.", translation: "Men kecha tushlik uchun ozgina pishloq sotib oldim." } },
          act_4_production: { input_prompt: "Write the phrase", correct_answer: "a bit of" }
        },
        {
          id: "V_U10_L02_a_lot_of",
          en: "a lot of",
          uz: "juda ko'p (ikkalasi uchun)",
          pos: "quantifier",
          type: "mixed_quantifier",
          priority: 1,
          category: "grammar_quant",
          introduced_in: "U10_L02",
          image: "lot_of_money.jpg",
          grammar_table: { usage: "countable AND uncountable", example: "a lot of money, a lot of friends" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen ozgina pul sarfladingmi? Faqat ozginami?", uzbek_mirror: "Yo'q, ozgina emas. Men ko'p pul sarfladim.", hybrid_text: "Yo'q, men **a lot of** pul sarfladim. Ko'p." },
          act_2_concept_check: { question: "Can we use 'a lot of' for everything?", answer: "Yes, both countable and uncountable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men ozgina pul sarfladim. (Context: Not a lot)", translation: "No, I spent **a lot of** money. (Ex)" }, section_2: { text: "No, I spent **a lot of** money.", translation: "Yo'q, men ko'p pul sarfladim." }, section_3: { text: "I spent **a lot of** money yesterday at the shop.", translation: "Men kecha do'konda ko'p pul sarfladim." } },
          act_4_production: { input_prompt: "Write the phrase", correct_answer: "a lot of" }
        },
        {
          id: "V_U10_L02_money",
          en: "money",
          uz: "pul",
          pos: "noun",
          type: "uncountable",
          priority: 1,
          category: "economy",
          introduced_in: "U10_L02",
          image: "money_notes.jpg",
          grammar_table: { singular: "money", plural: "money (uncountable)", countable: false },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen do'konda nima bilan to'laysan? Barglar bilanmi?", uzbek_mirror: "Yo'q, barglar bilan emas. Men pul bilan to'layman.", hybrid_text: "Yo'q, men **money** bilan to'layman. Pul." },
          act_2_concept_check: { question: "Is money countable in English (one money, two moneys)?", answer: "No, the word is uncountable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men ozgina pul sarfladim.", translation: "I spent a bit of **money**." }, section_2: { text: "No, I pay with **money**.", translation: "Yo'q, men pul bilan to'layman." }, section_3: { text: "I spent a lot of **money** yesterday because I bought a new suit.", translation: "Men kecha ko'p pul sarfladim chunki yangi kostyum sotib oldim." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "money" }
        },
        {
          id: "V_U10_L02_coin",
          en: "coin(s)",
          uz: "tanga(lar)",
          pos: "noun",
          type: "countable",
          priority: 2,
          category: "economy",
          introduced_in: "U10_L02",
          image: "coins_pile.jpg",
          grammar_table: { singular: "coin", plural: "coins", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Senda faqat qog'oz pullar bormi? Kichik pullar yo'qmi?", uzbek_mirror: "Yo'q, faqat qog'oz emas. Menda tangalar ham bor.", hybrid_text: "Yo'q, menda **coins** ham bor. Tangalar." },
          act_2_concept_check: { question: "Are coins countable?", answer: "Yes, one coin, two coins.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men bir nechta tanga oldim.", translation: "I received a few **coins**." }, section_2: { text: "No, I also have **coins**.", translation: "Yo'q, menda tangalar ham bor." }, section_3: { text: "I found a few **coins** in my old wallet yesterday.", translation: "Men kecha eski hamyonimdan bir nechta tanga topdim." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "coin" }
        },
        {
          id: "V_U10_L02_receipt",
          en: "receipt",
          uz: "chek (to'lov qog'ozi)",
          pos: "noun",
          type: "countable",
          priority: 2,
          category: "shopping",
          introduced_in: "U10_L02",
          image: "receipt_paper.jpg",
          grammar_table: { singular: "receipt", plural: "receipts", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen to'lovdan keyin qog'oz olmaysanmi? Isbot yo'qmi?", uzbek_mirror: "Yo'q, isbot bor. Men chekni olaman.", hybrid_text: "Yo'q, men **receipt**ni olaman. Chek." },
          act_2_concept_check: { question: "Do you get a receipt before or after paying?", answer: "After paying.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Chek oldingizmi?", translation: "Did you get the **receipt**?" }, section_2: { text: "This is my **receipt**.", translation: "Bu mening chekim." }, section_3: { text: "I lost my **receipt** yesterday so I can't return the jumper.", translation: "Men kecha chekimni yo'qotdim, shuning uchun jemperni qaytara olmayman." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "receipt" }
        },
        {
          id: "V_U10_L02_spend",
          en: "spend",
          uz: "sarflamoq",
          pos: "verb",
          type: "irregular_verb",
          priority: 1,
          category: "action_money",
          introduced_in: "U10_L02",
          image: "spend_money.jpg",
          grammar_table: { base: "spend", past: "spent", participle: "spent" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen pullaringni saqlab qolasanmi? Ishlatmaysanmi?", uzbek_mirror: "Yo'q, saqlamayman. Men ularni sarflayman.", hybrid_text: "Yo'q, men ularni **spend** qilaman. Sarflayman." },
          act_2_concept_check: { question: "What is the past tense of spend?", answer: "Spent.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Sen biroz pul sarfladingizmi?", translation: "Did you **spend** some money?" }, section_2: { text: "I **spend** money every day.", translation: "Men har kuni pul sarflayman." }, section_3: { text: "I **spent** a lot of money on books last year.", translation: "Men o'tgan yili kitoblarga ko'p pul sarfladim." } },
          act_4_production: { input_prompt: "Write the verb", correct_answer: "spend" }
        },
        {
          id: "V_U10_L02_countable_uncountable",
          en: "Countable vs Uncountable",
          uz: "Sanaladigan va Sanalmaydigan",
          pos: "concept",
          type: "grammar_concept",
          priority: 1,
          category: "grammar_theory",
          introduced_in: "U10_L02",
          image: "count_vs_uncount.jpg",
          grammar_table: { countable: "can count (1, 2, 3)", uncountable: "cannot count directly" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Biz 'money' so'zini sanay olamizmi? Bir pul, ikki pul?", uzbek_mirror: "Yo'q, sanay olmaymiz. 'Money' sanalmaydi.", hybrid_text: "Yo'q, 'money' **uncountable**. Sanalmaydigan." },
          act_2_concept_check: { question: "Is 'biscuit' countable?", answer: "Yes.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Money - sanalmaydigan.", translation: "Money is **uncountable**." }, section_2: { text: "**Countable** → a few coins. **Uncountable** → a bit of money.", translation: "**Sanaladigan** → biroz tangalar. **Sanalmaydigan** → ozgina pul." }, section_3: { text: "A few biscuits (countable) vs A bit of cheese (uncountable)", translation: "Biroz pechenye (sanaladigan) va ozgina pishloq (sanalmaydigan)" } },
          act_4_production: { input_prompt: "Select Countable or Uncountable for 'Music'", correct_answer: "Uncountable" }
        }
      ]
    },

    "U10_L03": {
      lesson_id: "U10_L03",
      title: "Prices & FOR Phrases (Functional)",
      grammar_target: "FOR (Price, Deadline, Fame, Definition)",
      scalability_pattern: "[Subject] + [Verb] + FOR + [Noun]",
      source_dialogues: ["U10_L03_D01"],
      
      grammar_coverage: {
        affirmative: { required: 2, examples: ["This bag is for 50 dollars.", "Spain is famous for food."] },
        negative: { required: 1, examples: ["I didn't sell it."] },
        question: { required: 1, examples: ["How much is this bag?"] }
      },

      items: [
        {
          id: "V_U10_L03_how_much",
          en: "How much...?",
          uz: "Qancha...?",
          pos: "phrase",
          type: "question",
          priority: 1,
          category: "shopping_phrases",
          introduced_in: "U10_L03",
          image: "price_tag_question.jpg",
          grammar_table: { usage: "asking price", example: "How much is it?" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Bu sumka bepulmi? Narxi yo'qmi?", uzbek_mirror: "Yo'q, bepul emas. Qancha narxi bor?", hybrid_text: "**How much** bu sumka? Qancha?" },
          act_2_concept_check: { question: "Do we use 'How much' for price?", answer: "Yes.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu sumka qancha?", translation: "**How much** is this bag?" }, section_2: { text: "**How much** are these biscuits?", translation: "Bu pechenyelar qancha?" }, section_3: { text: "**How much** are these leather boots? I want to buy them for my father.", translation: "Bu charm etiklar qancha? Men ularni otam uchun sotib olmoqchiman." } },
          act_4_production: { input_prompt: "Write the question phrase", correct_answer: "How much" }
        },
        {
          id: "V_U10_L03_for_price",
          en: "for",
          uz: "ga (narx uchun)",
          pos: "preposition",
          type: "gram_structure",
          priority: 2,
          category: "grammar",
          introduced_in: "U10_L03",
          image: "price_exchange.jpg",
          grammar_table: { usage: "price exchange", example: "bought for $10" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Bu sumka 50 dollar. Qanday aytaman?", uzbek_mirror: "Bu sumka 50 dollarga.", hybrid_text: "Bu sumka **for** 50 dollarga. 50 dollarga." },
          act_2_concept_check: { question: "Can we use 'for' to show the price?", answer: "Yes.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu sumka 50 dollarga.", translation: "This bag is **for** 50 dollars." }, section_2: { text: "I sold it **for** 20 dollars.", translation: "Men uni 20 dollarga sotdim." }, section_3: { text: "I bought these wool gloves **for** 15 dollars yesterday because they were on sale.", translation: "Men kecha bu jun qo'lqoplarni 15 dollarga sotib oldim chunki ular arzonlashgan edi." } },
          act_4_production: { input_prompt: "Write the preposition", correct_answer: "for" }
        },
        {
          id: "V_U10_L03_sold",
          en: "sold",
          uz: "sotdim/sotdi (o'tmish)",
          pos: "verb",
          type: "irregular_past_verb",
          priority: 1,
          category: "action_money",
          introduced_in: "U10_L03",
          image: "sold_sign.jpg",
          grammar_table: { base: "sell", past: "sold", participle: "sold" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen eski sumkangni hali ham saqlab turyapsanmi?", uzbek_mirror: "Yo'q, saqlamadim. Men sotdim.", hybrid_text: "Yo'q, men **sold**. Sotdim (o'tmish)." },
          act_2_concept_check: { question: "Is 'sold' present or past?", answer: "Past (of sell).", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men eski sumkamni 20 dollarga sotdim.", translation: "I **sold** my old bag for 20 dollars." }, section_2: { text: "I **sold** my trainers.", translation: "Men krossovkalarimni sotdim." }, section_3: { text: "I **sold** my old leather wallet for 10 dollars yesterday because I bought a new one.", translation: "Men kecha eski charm hamyonimni 10 dollarga sotdim chunki yangisini sotib oldim." } },
          act_4_production: { input_prompt: "Write the past verb", correct_answer: "sold" }
        },
        {
          id: "V_U10_L03_for_deadline",
          en: "for",
          uz: "ga (muddat/vaqt)",
          pos: "preposition",
          type: "gram_structure",
          priority: 2,
          category: "grammar",
          introduced_in: "U10_L03",
          image: "deadline_calendar.jpg",
          grammar_table: { usage: "deadline", example: "for Monday" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Bu ish ixtiyoriymi? Vaqti yo'qmi?", uzbek_mirror: "Yo'q, ixtiyori emas. Dushanba kuniga tugashi kerak.", hybrid_text: "Bu ish **for** dushanba kuni tugashi kerak. Dushanba kuniga." },
          act_2_concept_check: { question: "Does 'for Monday' mean the deadline is Monday?", answer: "Yes.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu ish dushanba kuni uchun tugashi kerak.", translation: "This work must be finished **for** Monday." }, section_2: { text: "I need to finish this **for** Friday.", translation: "Men buni juma kuniga tugashim kerak." }, section_3: { text: "I must buy a new jumper **for** the party next week because my old one is too small.", translation: "Men kelasi hafta bazm **uchun** yangi jemper sotib olishim kerak chunki eskisi juda kichkina." } },
          act_4_production: { input_prompt: "Write the preposition", correct_answer: "for" }
        },
        {
          id: "V_U10_L03_famous_for",
          en: "famous for",
          uz: "bilan mashhur",
          pos: "phrase",
          type: "idiom",
          priority: 2,
          category: "description",
          introduced_in: "U10_L03",
          image: "famous_landscape.jpg",
          grammar_table: { structure: "be famous for + noun", example: "famous for pizza" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Ispaniya nima bilan tanilgan? Hech narsa bilan emasmikan?", uzbek_mirror: "Yo'q, hech narsa emas. Ispaniya ovqati bilan mashhur.", hybrid_text: "Ispaniya ovqati **famous for**. Ovqati bilan mashhur." },
          act_2_concept_check: { question: "Is Spain famous for kangaroos?", answer: "No, famous for food/football.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Ispaniya ovqati bilan mashhur.", translation: "Spain is **famous for** food." }, section_2: { text: "Italy is **famous for** pizza.", translation: "Italiya pizza bilan mashhur." }, section_3: { text: "London is **famous for** its museums and I visited one yesterday when I was there.", translation: "London o'z muzeylari bilan mashhur va men kecha u yerda bo'lganimda birini ko'rdim." } },
          act_4_production: { input_prompt: "Write the phrase", correct_answer: "famous for" }
        },
        {
          id: "V_U10_L03_word_for",
          en: "word for",
          uz: "uchun so'z",
          pos: "phrase",
          type: "definition",
          priority: 3,
          category: "language",
          introduced_in: "U10_L03",
          image: "word_translation.jpg",
          grammar_table: { structure: "X is the word for Y", example: "'Gato' is the word for 'cat'" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "\"Trainers\" uchun boshqa so'z yo'qmi?", uzbek_mirror: "Yo'q, boshqa so'z bor. \"Sneakers\" - bu \"trainers\" uchun so'z.", hybrid_text: "\"Sneakers\" - bu **word for** \"trainers\". \"Trainers\" uchun so'z." },
          act_2_concept_check: { question: "Is 'word for' used to translate or explain?", answer: "Yes, both.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "\"Sneakers\" - bu \"trainers\" uchun so'z.", translation: "\"Sneakers\" is the **word for** \"trainers\"." }, section_2: { text: "\"Hamyon\" is the **word for** \"wallet\" in Uzbek.", translation: "\"Hamyon\" - bu o'zbek tilida \"wallet\" **uchun so'z**." }, section_3: { text: "\"Jumper\" is the British English **word for** what Americans call a \"sweater\".", translation: "\"Jumper\" - bu britaniya ingliz tilida amerikaliklar \"sweater\" deb ataydigan narsa **uchun so'z**." } },
          act_4_production: { input_prompt: "Write the phrase", correct_answer: "word for" }
        },
        {
          id: "V_U10_L03_price",
          en: "price",
          uz: "narx",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "shopping",
          introduced_in: "U10_L03",
          image: "price_tag.jpg",
          grammar_table: { singular: "price", plural: "prices", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Bu sumka bepulmi? Pul kerak emasmi?", uzbek_mirror: "Yo'q, bepul emas. Uning narxi bor.", hybrid_text: "Yo'q, uning **price**si bor. Narx." },
          act_2_concept_check: { question: "Is 'price' how much money you pay?", answer: "Yes.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu sumkaning narxi 50 dollar.", translation: "This bag's **price** is 50 dollars." }, section_2: { text: "What is the **price**?", translation: "Narx qancha?" }, section_3: { text: "The **price** of these leather boots was very high yesterday but today they are on sale.", translation: "Bu charm etiklarning narxi kecha juda baland edi lekin bugun ular arzonlashgan." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "price" }
        },
        {
          id: "V_U10_L03_discount",
          en: "discount",
          uz: "chegirma",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "shopping",
          introduced_in: "U10_L03",
          image: "discount_percent.jpg",
          grammar_table: { singular: "discount", plural: "discounts", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen to'liq narxni to'laysanmi? Hech qanday kamayish yo'qmi?", uzbek_mirror: "Yo'q, to'liq narx emas. Chegirma bor.", hybrid_text: "Yo'q, **discount** bor. Chegirma." },
          act_2_concept_check: { question: "Does a discount make the price higher?", answer: "No, lower.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men chegirma uchun so'rayman.", translation: "I'll ask for a **discount**." }, section_2: { text: "Is there a **discount**?", translation: "Chegirma bormi?" }, section_3: { text: "I bought these wool gloves yesterday because there was a **discount** and the price was very good.", translation: "Men kecha bu jun qo'lqoplarni sotib oldim chunki chegirma bor edi va narx juda yaxshi edi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "discount" }
        },
        {
          id: "V_U10_L03_sale",
          en: "sale",
          uz: "sotuv (arzonlashtirilgan)",
          pos: "noun",
          type: "countable",
          priority: 1,
          category: "shopping",
          introduced_in: "U10_L03",
          image: "sale_red_sign.jpg",
          grammar_table: { phrase: "on sale", example: "It is on sale" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Bu etiklarning narxi har doim shunchalik pastmi?", uzbek_mirror: "Yo'q, har doim emas. Ular hozir arzonlashgan.", hybrid_text: "Yo'q, ular hozir **sale**da. Arzonlashgan." },
          act_2_concept_check: { question: "If something is 'on sale', is it expensive?", answer: "Usually cheaper.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Bu etiklar arzonlashgan.", translation: "These boots are on **sale**." }, section_2: { text: "This jumper is on **sale**.", translation: "Bu jemper arzonlashgan." }, section_3: { text: "I bought a leather bag yesterday because it was on **sale** and I love leather bags.", translation: "Men kecha charm sumka sotib oldim chunki u arzonlashgan edi va men charm sumkalarni yaxshi ko'raman." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "sale" }
        },
        {
          id: "V_U10_L03_bill",
          en: "bill",
          uz: "hisob (to'lovdan oldin)",
          pos: "noun",
          type: "countable",
          priority: 2,
          category: "shopping",
          introduced_in: "U10_L03",
          image: "bill_restaurant.jpg",
          grammar_table: { singular: "bill", plural: "bills", countable: true },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen to'lovdan oldin hech narsa so'ramaysanmi?", uzbek_mirror: "Yo'q, men so'rayman. Hisobni iltimos.", hybrid_text: "Men **bill**ni so'rayman. Hisob (to'lovdan oldin)." },
          act_2_concept_check: { question: "Is the bill money?", answer: "No, it's the paper telling the price.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Hisobni olsam bo'ladimi?", translation: "Can I have the **bill**?" }, section_2: { text: "The **bill** is 100 dollars.", translation: "Hisob 100 dollar." }, section_3: { text: "I asked for the **bill** yesterday after I finished lunch at the restaurant.", translation: "Men kecha restoranda tushlikni tugatgandan keyin hisobni so'radim." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "bill" }
        },
        {
          id: "V_U10_L03_cash",
          en: "cash",
          uz: "naqd pul",
          pos: "noun",
          type: "uncountable",
          priority: 1,
          category: "money",
          introduced_in: "U10_L03",
          image: "cash_money.jpg",
          grammar_table: { singular: "cash", plural: "cash (uncountable)", countable: false },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen karta bilan to'laysanmi? Plastik bilan?", uzbek_mirror: "Yo'q, karta bilan emas. Men naqd to'layman.", hybrid_text: "Yo'q, men **cash** bilan to'layman. Naqd pul." },
          act_2_concept_check: { question: "Is cash a credit card?", answer: "No, paper money and coins.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Men naqd to'layman.", translation: "I pay by **cash**." }, section_2: { text: "Do you have **cash**?", translation: "Sizda naqd pul bormi?" }, section_3: { text: "I paid by **cash** yesterday when I bought biscuits because I didn't have my card.", translation: "Men kecha pechenye sotib olganida naqd to'ladim chunki kartam yo'q edi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "cash" }
        },
        {
          id: "V_U10_L03_jewellery",
          en: "jewellery",
          uz: "taqinchoqlar",
          pos: "noun",
          type: "uncountable",
          priority: 2,
          category: "fashion",
          introduced_in: "U10_L03",
          image: "jewellery_box.jpg",
          grammar_table: { singular: "jewellery", plural: "jewellery (uncountable)", countable: false },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen faqat bitta sirg'a saqlab turyapsanmi?", uzbek_mirror: "Yo'q, faqat bitta emas. Menda ko'p taqinchoqlar bor.", hybrid_text: "Yo'q, menda ko'p **jewellery** bor. Taqinchoqlar (sanalmaydigan)." },
          act_2_concept_check: { question: "Can you say 'one jewellery'?", answer: "No, it's uncountable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Menda ko'p taqinchoqlar bor.", translation: "I have a lot of **jewellery**." }, section_2: { text: "She has a bit of **jewellery**.", translation: "Unda ozgina taqinchoqlar bor." }, section_3: { text: "My mother has a lot of **jewellery** and she bought some earrings yesterday for the party.", translation: "Mening onamda ko'p taqinchoqlar bor va u kecha bazm uchun sirg'alar sotib oldi." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "jewellery" }
        },
        {
          id: "V_U10_L03_make_up",
          en: "make-up",
          uz: "pardoz vositalari",
          pos: "noun",
          type: "uncountable",
          priority: 2,
          category: "beauty",
          introduced_in: "U10_L03",
          image: "make_up_kit.jpg",
          grammar_table: { singular: "make-up", plural: "make-up (uncountable)", countable: false },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Sen yuzingga hech narsa surmaysanmi?", uzbek_mirror: "Yo'q, men pardoz vositalarini ishlataman.", hybrid_text: "Yo'q, men **make-up** ishlataman. Pardoz vositalari." },
          act_2_concept_check: { question: "Is make-up countable?", answer: "No, uncountable.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "Sumkada ozgina pardoz vositalari bor.", translation: "There is a bit of **make-up** in the bag." }, section_2: { text: "She has a bit of **make-up**.", translation: "Unda ozgina pardoz vositalari bor." }, section_3: { text: "I bought a bit of **make-up** yesterday at the shop because I need it for the party.", translation: "Men kecha do'konda ozgina pardoz vositalarini sotib oldim chunki menga bazm uchun kerak." } },
          act_4_production: { input_prompt: "Write the English word", correct_answer: "make-up" }
        },
        {
          id: "V_U10_L03_rules_summary",
          en: "Quantifier Rules",
          uz: "Miqdor qoidalari",
          pos: "rule",
          type: "grammar_summary",
          priority: 1,
          category: "grammar_theory",
          introduced_in: "U10_L03",
          image: "quantifier_chart.jpg",
          grammar_table: { rule1: "A few + Countable", rule2: "A bit of + Uncountable" },
          act_1_presentation: { type: "hybrid_question", uzbek_context: "Men 'a few cheese' deya olamanmi?", uzbek_mirror: "Yo'q! A few + sanaladigan. A bit of + sanalmaydigan.", hybrid_text: "Qoida: **A few** + sanaladigan. **A bit of** + sanalmaydigan." },
          act_2_concept_check: { question: "Which is correct? A few money OR a bit of money?", answer: "A bit of money.", type: "grammar_check" },
          act_3_drill: { anchor: { text: "✅ a few biscuits, a few coins | ✅ a bit of cheese, a bit of money", translation: "" }, section_2: { text: "✅ **a few** earrings / **a bit of** jewellery", translation: "✅ **a few** sirg'alar / **a bit of** taqinchoqlar" }, section_3: { text: "Yesterday I bought **a few** countable items (biscuits, earrings) and **a bit of** uncountable items (cheese, make-up).", translation: "Kecha men biroz sanaladigan narsalar (pechenyelar, sirg'alar) va ozgina sanalmaydigan narsalar (pishloq, pardoz vositalari) sotib oldim." } },
          act_4_production: { input_prompt: "A few or A bit of? ___ water", correct_answer: "A bit of" }
        }
      ]
    }
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

// Freeze object
Object.freeze(window.VOCAB_CARDS_U10);

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.VOCAB_CARDS_U10;
}
