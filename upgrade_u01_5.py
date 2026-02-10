#!/usr/bin/env python3
"""
Transform vocab_cards_u01_5_4act.js from old 4-Act to new 4+2 Act schema.
Adds: mission metadata, contrastive_turns, mastery_key, syntax_scaffold,
      discovery slides, personalization slides, flow_model on lessons.
"""

import re

INPUT_FILE = r"d:\New folder\vocab_cards_u01_5_4act.js"

# ═══════════════════════════════════════════════════════════════════════════
# STEP 1: Read the file
# ═══════════════════════════════════════════════════════════════════════════
with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ═══════════════════════════════════════════════════════════════════════════
# STEP 2: Header update — 4-Act → 4+2 Act
# ═══════════════════════════════════════════════════════════════════════════
OLD_HEADER = """ * VOCAB CARDS — UNIT 01.5: Possession, Existence & Extended Questions
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4-Act Slide Structure (Renderer V2.4+)
 *
 * UNIT SCOPE (A1+ Extensions - Building on U01 Foundation):
 * - HAVE/HAS possession patterns
 * - THERE IS/ARE existence patterns
 * - Complex WH-questions (where, how, when, why)
 * - Prepositions (in, on, at)
 * - Addition marker (too)
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
 * RECYCLING CHAIN: U01 (Foundation) → U01.5 (This Unit)
 *
 * @version 1.0.0 - Initial creation (Unit 01.5)"""

NEW_HEADER = """ * VOCAB CARDS — UNIT 01.5: Possession, Existence & Extended Questions
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ALIGNED TO: Master_Document.md (February 2026) — FULL OBEDIENCE
 * RENDERER FORMAT: 4+2 Act Slide Structure (Renderer V2.5+)
 * MISSION FLOW: 3×2 Successive Mastery Cycle (Sandwich Technique)
 *
 * UNIT SCOPE (A1+ Extensions - Building on U01 Foundation):
 * - HAVE/HAS possession patterns
 * - THERE IS/ARE existence patterns
 * - Complex WH-questions (where, how, when, why)
 * - Prepositions (in, on, at)
 * - Addition marker (too)
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
 * MASTER DOCUMENT COMPLIANCE:
 * ✅ CONSTRAINT 1: 100% Core vocabulary in dialogues
 * ✅ CONSTRAINT 2: Anchor sentence = exact sentence from dialogue
 * ✅ CONSTRAINT 3: Target grammar in (+), (-), (?) in dialogues
 * ✅ CONSTRAINT 4: Recycling through dialogues; recycling_balance tracked
 * ✅ CONSTRAINT 5: All 6 content elements per card (4+2 Act)
 * ✅ CONSTRAINT 6: Mission Flow Model compliance (3×2 cycle)
 * ✅ RULE D7: Every dialogue line has line_uz (Uzbek translation)
 * ✅ RULE E1: Presentation uz_context = polarity/friction
 * ✅ RULE E11: Syntactic Mirroring (syntax_scaffold on presentations)
 *
 * RECYCLING CHAIN: U01 (Foundation) → U01.5 (This Unit)
 *
 * @version 2.0.0 - 4+2 Act + Mission Flow + Contrastive Turns"""

content = content.replace(OLD_HEADER, NEW_HEADER)

# ═══════════════════════════════════════════════════════════════════════════
# STEP 3: Insert Mission Metadata + Contrastive Turns after recycling block
# ═══════════════════════════════════════════════════════════════════════════
RECYCLING_END = """    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES"""

RECYCLING_END_WITH_MISSION = """    ratio_target: { min: 0.60, max: 0.75 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSION METADATA (3×2 Successive Mastery Cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  mission: {
    mission_id: "U01_5_M01",
    flow_model: "sandwich",
    target_vocab: ["have", "has", "don't have", "doesn't have", "there is", "there are", "there isn't", "there aren't", "where", "how", "when", "why", "in", "on", "at", "too"],
    stages: [
      {
        stage: 1,
        form: "affirmative",
        target_vocab: ["have", "has"],
        dialogue_id: "U01_5_L01_D01",
        pressure_id: "U01_5_L01_D01_1",
        mirror_mode: true
      },
      {
        stage: 2,
        form: "negative",
        target_vocab: ["don't have", "doesn't have", "there isn't", "there aren't"],
        dialogue_id: "U01_5_L02_D01",
        pressure_id: "U01_5_L02_D01_1",
        mirror_mode: true
      },
      {
        stage: 3,
        form: "interrogative",
        target_vocab: ["where", "how", "when", "why"],
        dialogue_id: "U01_5_L03_D01",
        pressure_id: "U01_5_L03_D01_1",
        mirror_mode: false
      }
    ],
    mastery_dialogue_id: "U01_5_L03_D01_1"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTRASTIVE TURNS (Grammar Gap Solution — one per stage)
  // ═══════════════════════════════════════════════════════════════════════════
  contrastive_turns: [
    {
      stage: 1,
      focus: "have_vs_has",
      dialogue_id: "U01_5_L01_D01",
      speaker_a: { text: "I have a brother.", speaker: "Malika" },
      speaker_b: { text: "He has a book.", speaker: "Malika" },
      highlights: [
        {
          blue: { text: "have", type: "base_verb" },
          red: { text: "has", marker: "s", type: "third_person_verb" }
        }
      ]
    },
    {
      stage: 2,
      focus: "existence_affirmative_vs_negative",
      dialogue_id: "U01_5_L02_D01",
      speaker_a: { text: "There is a teacher.", speaker: "Bekzod" },
      speaker_b: { text: "There isn't a car.", speaker: "Bekzod" },
      highlights: [
        {
          blue: { text: "There is", type: "existence_affirmative" },
          red: { text: "There isn't", type: "existence_negative" }
        }
      ]
    },
    {
      stage: 3,
      focus: "statement_vs_wh_question",
      dialogue_id: "U01_5_L03_D01",
      speaker_a: { text: "Ali is in the class.", speaker: "Karim" },
      speaker_b: { text: "Where is Ali?", speaker: "Sara" },
      highlights: [
        {
          blue: { text: "Ali is", type: "statement_order" },
          red: { text: "Where is Ali?", marker: "Where", type: "wh_question_inversion" }
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DIALOGUES"""

content = content.replace(RECYCLING_END, RECYCLING_END_WITH_MISSION)

# ═══════════════════════════════════════════════════════════════════════════
# STEP 4: Add mastery_key to ALL dialogue lines
# ═══════════════════════════════════════════════════════════════════════════

# Dialogue U01_5_L01_D01 (10 lines, indices 0-9)
dialogue_lines_d01 = [
    ('{ speaker: "Ali", line: "Hello Malika! Do you have a brother?", line_uz: "Salom Malika! Akangiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "brother"] }',
     '{ speaker: "Ali", line: "Hello Malika! Do you have a brother?", line_uz: "Salom Malika! Akangiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "brother"], mastery_key: "U01_5_L01_D01_0" }'),
    ('{ speaker: "Malika", line: "Yes, I have a brother. His name is Karim.", line_uz: "Ha, akam bor. Uning ismi Karim.", recycled: ["I", "a", "His", "name", "is"], target: ["have", "brother"] }',
     '{ speaker: "Malika", line: "Yes, I have a brother. His name is Karim.", line_uz: "Ha, akam bor. Uning ismi Karim.", recycled: ["I", "a", "His", "name", "is"], target: ["have", "brother"], mastery_key: "U01_5_L01_D01_1" }'),
    ('{ speaker: "Ali", line: "Does he have a book?", line_uz: "Uning kitobi bormi?", recycled: ["he", "a"], target: ["Does", "have", "book"] }',
     '{ speaker: "Ali", line: "Does he have a book?", line_uz: "Uning kitobi bormi?", recycled: ["he", "a"], target: ["Does", "have", "book"], mastery_key: "U01_5_L01_D01_2" }'),
    ('{ speaker: "Malika", line: "Yes, he has a book. This is his book.", line_uz: "Ha, kitobi bor. Bu uning kitobi.", recycled: ["he", "a", "This", "is", "his"], target: ["has", "book"] }',
     '{ speaker: "Malika", line: "Yes, he has a book. This is his book.", line_uz: "Ha, kitobi bor. Bu uning kitobi.", recycled: ["he", "a", "This", "is", "his"], target: ["has", "book"], mastery_key: "U01_5_L01_D01_3" }'),
    ('{ speaker: "Ali", line: "Do you have a sister?", line_uz: "Sizning singlingiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "sister"] }',
     '{ speaker: "Ali", line: "Do you have a sister?", line_uz: "Sizning singlingiz bormi?", recycled: ["you", "a"], target: ["Do", "have", "sister"], mastery_key: "U01_5_L01_D01_4" }'),
    ('{ speaker: "Malika", line: "No, I don\'t have a sister. I have a brother.", line_uz: "Yo\'q, singlim yo\'q. Akam bor.", recycled: ["I", "a"], target: ["don\'t have", "sister", "have", "brother"] }',
     '{ speaker: "Malika", line: "No, I don\'t have a sister. I have a brother.", line_uz: "Yo\'q, singlim yo\'q. Akam bor.", recycled: ["I", "a"], target: ["don\'t have", "sister", "have", "brother"], mastery_key: "U01_5_L01_D01_5" }'),
    ('{ speaker: "Ali", line: "I have a sister. Her name is Sara.", line_uz: "Mening singlim bor. Uning ismi Sara.", recycled: ["I", "a", "Her", "name", "is"], target: ["have", "sister"] }',
     '{ speaker: "Ali", line: "I have a sister. Her name is Sara.", line_uz: "Mening singlim bor. Uning ismi Sara.", recycled: ["I", "a", "Her", "name", "is"], target: ["have", "sister"], mastery_key: "U01_5_L01_D01_6" }'),
    ('{ speaker: "Malika", line: "That is nice! Does your father have a car?", line_uz: "Zo\'r! Dadangizning mashinasi bormi?", recycled: ["That", "is", "your", "father"], target: ["Does", "have", "car"] }',
     '{ speaker: "Malika", line: "That is nice! Does your father have a car?", line_uz: "Zo\'r! Dadangizning mashinasi bormi?", recycled: ["That", "is", "your", "father"], target: ["Does", "have", "car"], mastery_key: "U01_5_L01_D01_7" }'),
    ('{ speaker: "Ali", line: "No, he doesn\'t have a car.", line_uz: "Yo\'q, uning mashinasi yo\'q.", recycled: ["he", "a"], target: ["doesn\'t have", "car"] }',
     '{ speaker: "Ali", line: "No, he doesn\'t have a car.", line_uz: "Yo\'q, uning mashinasi yo\'q.", recycled: ["he", "a"], target: ["doesn\'t have", "car"], mastery_key: "U01_5_L01_D01_8" }'),
    ('{ speaker: "Malika", line: "We have a nice teacher. Our teacher is good.", line_uz: "Bizning ajoyib o\'qituvchimiz bor. O\'qituvchimiz yaxshi.", recycled: ["We", "a", "teacher", "is"], target: ["have", "Our"] }',
     '{ speaker: "Malika", line: "We have a nice teacher. Our teacher is good.", line_uz: "Bizning ajoyib o\'qituvchimiz bor. O\'qituvchimiz yaxshi.", recycled: ["We", "a", "teacher", "is"], target: ["have", "Our"], mastery_key: "U01_5_L01_D01_9" }'),
]

for old, new in dialogue_lines_d01:
    content = content.replace(old, new, 1)

# Dialogue U01_5_L02_D01 (10 lines, indices 0-9)
dialogue_lines_d02 = [
    ('{ speaker: "Nilufar", line: "Is there a teacher in the class?", line_uz: "Sinfda o\'qituvchi bormi?", recycled: ["a", "teacher", "the"], target: ["Is there", "in", "class"] }',
     '{ speaker: "Nilufar", line: "Is there a teacher in the class?", line_uz: "Sinfda o\'qituvchi bormi?", recycled: ["a", "teacher", "the"], target: ["Is there", "in", "class"], mastery_key: "U01_5_L02_D01_0" }'),
    ('{ speaker: "Bekzod", line: "Yes, there is a teacher. She is my teacher.", line_uz: "Ha, o\'qituvchi bor. U mening o\'qituvchim.", recycled: ["a", "teacher", "She", "is", "my"], target: ["there is"] }',
     '{ speaker: "Bekzod", line: "Yes, there is a teacher. She is my teacher.", line_uz: "Ha, o\'qituvchi bor. U mening o\'qituvchim.", recycled: ["a", "teacher", "She", "is", "my"], target: ["there is"], mastery_key: "U01_5_L02_D01_1" }'),
    ('{ speaker: "Nilufar", line: "Are there students in the class?", line_uz: "Sinfda talabalar bormi?", recycled: ["the"], target: ["Are there", "students", "in", "class"] }',
     '{ speaker: "Nilufar", line: "Are there students in the class?", line_uz: "Sinfda talabalar bormi?", recycled: ["the"], target: ["Are there", "students", "in", "class"], mastery_key: "U01_5_L02_D01_2" }'),
    ('{ speaker: "Bekzod", line: "Yes, there are students. There are five students.", line_uz: "Ha, talabalar bor. Besh talaba bor.", recycled: [], target: ["there are", "students", "five"] }',
     '{ speaker: "Bekzod", line: "Yes, there are students. There are five students.", line_uz: "Ha, talabalar bor. Besh talaba bor.", recycled: [], target: ["there are", "students", "five"], mastery_key: "U01_5_L02_D01_3" }'),
    ('{ speaker: "Nilufar", line: "Is there a book on the table?", line_uz: "Stolda kitob bormi?", recycled: ["a", "the"], target: ["Is there", "book", "on", "table"] }',
     '{ speaker: "Nilufar", line: "Is there a book on the table?", line_uz: "Stolda kitob bormi?", recycled: ["a", "the"], target: ["Is there", "book", "on", "table"], mastery_key: "U01_5_L02_D01_4" }'),
    ('{ speaker: "Bekzod", line: "Yes, there is a book on the table. That is your book.", line_uz: "Ha, stolda kitob bor. Bu sizning kitobingiz.", recycled: ["a", "the", "That", "is", "your"], target: ["there is", "book", "on", "table"] }',
     '{ speaker: "Bekzod", line: "Yes, there is a book on the table. That is your book.", line_uz: "Ha, stolda kitob bor. Bu sizning kitobingiz.", recycled: ["a", "the", "That", "is", "your"], target: ["there is", "book", "on", "table"], mastery_key: "U01_5_L02_D01_5" }'),
    ('{ speaker: "Nilufar", line: "Is there a car at school?", line_uz: "Maktabda mashina bormi?", recycled: ["a"], target: ["Is there", "car", "at", "school"] }',
     '{ speaker: "Nilufar", line: "Is there a car at school?", line_uz: "Maktabda mashina bormi?", recycled: ["a"], target: ["Is there", "car", "at", "school"], mastery_key: "U01_5_L02_D01_6" }'),
    ('{ speaker: "Bekzod", line: "No, there isn\'t a car at school.", line_uz: "Yo\'q, maktabda mashina yo\'q.", recycled: ["a"], target: ["there isn\'t", "car", "at", "school"] }',
     '{ speaker: "Bekzod", line: "No, there isn\'t a car at school.", line_uz: "Yo\'q, maktabda mashina yo\'q.", recycled: ["a"], target: ["there isn\'t", "car", "at", "school"], mastery_key: "U01_5_L02_D01_7" }'),
    ('{ speaker: "Nilufar", line: "Are there books in the bag?", line_uz: "Sumkada kitoblar bormi?", recycled: ["the"], target: ["Are there", "books", "in", "bag"] }',
     '{ speaker: "Nilufar", line: "Are there books in the bag?", line_uz: "Sumkada kitoblar bormi?", recycled: ["the"], target: ["Are there", "books", "in", "bag"], mastery_key: "U01_5_L02_D01_8" }'),
    ('{ speaker: "Bekzod", line: "No, there aren\'t books in the bag. The bag is at home.", line_uz: "Yo\'q, sumkada kitoblar yo\'q. Sumka uyda.", recycled: ["the", "is"], target: ["there aren\'t", "books", "in", "bag", "at", "home"] }',
     '{ speaker: "Bekzod", line: "No, there aren\'t books in the bag. The bag is at home.", line_uz: "Yo\'q, sumkada kitoblar yo\'q. Sumka uyda.", recycled: ["the", "is"], target: ["there aren\'t", "books", "in", "bag", "at", "home"], mastery_key: "U01_5_L02_D01_9" }'),
]

for old, new in dialogue_lines_d02:
    content = content.replace(old, new, 1)

# Dialogue U01_5_L03_D01 (10 lines)
dialogue_lines_d03_01 = [
    ('{ speaker: "Sara", line: "Hello Karim! How are you?", line_uz: "Salom Karim! Qandaysiz?", recycled: ["you"], target: ["How", "are"] }',
     '{ speaker: "Sara", line: "Hello Karim! How are you?", line_uz: "Salom Karim! Qandaysiz?", recycled: ["you"], target: ["How", "are"], mastery_key: "U01_5_L03_D01_0" }'),
    ('{ speaker: "Karim", line: "I am fine, thank you. How are you?", line_uz: "Yaxshiman, rahmat. Siz-chi?", recycled: ["I", "am", "you"], target: ["How", "are", "fine"] }',
     '{ speaker: "Karim", line: "I am fine, thank you. How are you?", line_uz: "Yaxshiman, rahmat. Siz-chi?", recycled: ["I", "am", "you"], target: ["How", "are", "fine"], mastery_key: "U01_5_L03_D01_1" }'),
    ('{ speaker: "Sara", line: "I am happy today. Where is Ali?", line_uz: "Bugun xursandman. Ali qayerda?", recycled: ["I", "am", "is"], target: ["happy", "Where"] }',
     '{ speaker: "Sara", line: "I am happy today. Where is Ali?", line_uz: "Bugun xursandman. Ali qayerda?", recycled: ["I", "am", "is"], target: ["happy", "Where"], mastery_key: "U01_5_L03_D01_2" }'),
    ('{ speaker: "Karim", line: "Ali is in the class. He has a book.", line_uz: "Ali sinfda. Uning kitobi bor.", recycled: ["is", "the", "He", "has", "a", "book"], target: ["in", "class"] }',
     '{ speaker: "Karim", line: "Ali is in the class. He has a book.", line_uz: "Ali sinfda. Uning kitobi bor.", recycled: ["is", "the", "He", "has", "a", "book"], target: ["in", "class"], mastery_key: "U01_5_L03_D01_3" }'),
    ('{ speaker: "Sara", line: "Where is the book?", line_uz: "Kitob qayerda?", recycled: ["is", "the", "book"], target: ["Where"] }',
     '{ speaker: "Sara", line: "Where is the book?", line_uz: "Kitob qayerda?", recycled: ["is", "the", "book"], target: ["Where"], mastery_key: "U01_5_L03_D01_4" }'),
    ('{ speaker: "Karim", line: "The book is on the table.", line_uz: "Kitob stolda.", recycled: ["The", "book", "is", "the"], target: ["on", "table"] }',
     '{ speaker: "Karim", line: "The book is on the table.", line_uz: "Kitob stolda.", recycled: ["The", "book", "is", "the"], target: ["on", "table"], mastery_key: "U01_5_L03_D01_5" }'),
    ('{ speaker: "Sara", line: "When is the class?", line_uz: "Dars qachon?", recycled: ["is", "the"], target: ["When", "class"] }',
     '{ speaker: "Sara", line: "When is the class?", line_uz: "Dars qachon?", recycled: ["is", "the"], target: ["When", "class"], mastery_key: "U01_5_L03_D01_6" }'),
    ('{ speaker: "Karim", line: "The class is at nine. It is in the morning.", line_uz: "Dars to\'qqizda. Ertalab.", recycled: ["The", "is", "It", "in", "the"], target: ["class", "at", "nine", "morning"] }',
     '{ speaker: "Karim", line: "The class is at nine. It is in the morning.", line_uz: "Dars to\'qqizda. Ertalab.", recycled: ["The", "is", "It", "in", "the"], target: ["class", "at", "nine", "morning"], mastery_key: "U01_5_L03_D01_7" }'),
    ('{ speaker: "Sara", line: "This is good! Why are you happy?", line_uz: "Zo\'r! Nega xursandsiz?", recycled: ["This", "is", "you"], target: ["Why", "are", "happy"] }',
     '{ speaker: "Sara", line: "This is good! Why are you happy?", line_uz: "Zo\'r! Nega xursandsiz?", recycled: ["This", "is", "you"], target: ["Why", "are", "happy"], mastery_key: "U01_5_L03_D01_8" }'),
    ('{ speaker: "Karim", line: "I have a sister too. She is at home.", line_uz: "Mening ham singlim bor. U uyda.", recycled: ["I", "have", "a", "sister", "She", "is"], target: ["too", "at", "home"] }',
     '{ speaker: "Karim", line: "I have a sister too. She is at home.", line_uz: "Mening ham singlim bor. U uyda.", recycled: ["I", "have", "a", "sister", "She", "is"], target: ["too", "at", "home"], mastery_key: "U01_5_L03_D01_9" }'),
]

for old, new in dialogue_lines_d03_01:
    content = content.replace(old, new, 1)

# Dialogue U01_5_L03_D02 (10 lines)
dialogue_lines_d03_02 = [
    ('{ speaker: "Madina", line: "Where are the students?", line_uz: "Talabalar qayerda?", recycled: ["the"], target: ["Where", "are", "students"] }',
     '{ speaker: "Madina", line: "Where are the students?", line_uz: "Talabalar qayerda?", recycled: ["the"], target: ["Where", "are", "students"], mastery_key: "U01_5_L03_D02_0" }'),
    ('{ speaker: "Vali", line: "They are in the class. Their teacher is there too.", line_uz: "Ular sinfda. O\'qituvchilari ham u yerda.", recycled: ["They", "are", "in", "the", "teacher", "is"], target: ["class", "Their", "there", "too"] }',
     '{ speaker: "Vali", line: "They are in the class. Their teacher is there too.", line_uz: "Ular sinfda. O\'qituvchilari ham u yerda.", recycled: ["They", "are", "in", "the", "teacher", "is"], target: ["class", "Their", "there", "too"], mastery_key: "U01_5_L03_D02_1" }'),
    ('{ speaker: "Madina", line: "Where is my bag?", line_uz: "Sumkam qayerda?", recycled: ["is", "my"], target: ["Where", "bag"] }',
     '{ speaker: "Madina", line: "Where is my bag?", line_uz: "Sumkam qayerda?", recycled: ["is", "my"], target: ["Where", "bag"], mastery_key: "U01_5_L03_D02_2" }'),
    ('{ speaker: "Vali", line: "Your bag is on the table.", line_uz: "Sumkangiz stolda.", recycled: ["Your", "is", "the"], target: ["bag", "on", "table"] }',
     '{ speaker: "Vali", line: "Your bag is on the table.", line_uz: "Sumkangiz stolda.", recycled: ["Your", "is", "the"], target: ["bag", "on", "table"], mastery_key: "U01_5_L03_D02_3" }'),
    ('{ speaker: "Madina", line: "How is your father?", line_uz: "Dadangiz qalaysiz?", recycled: ["is", "your", "father"], target: ["How"] }',
     '{ speaker: "Madina", line: "How is your father?", line_uz: "Dadangiz qalaysiz?", recycled: ["is", "your", "father"], target: ["How"], mastery_key: "U01_5_L03_D02_4" }'),
    ('{ speaker: "Vali", line: "He is fine. He is at home now.", line_uz: "U yaxshi. Hozir uyda.", recycled: ["He", "is"], target: ["fine", "at", "home"] }',
     '{ speaker: "Vali", line: "He is fine. He is at home now.", line_uz: "U yaxshi. Hozir uyda.", recycled: ["He", "is"], target: ["fine", "at", "home"], mastery_key: "U01_5_L03_D02_5" }'),
    ('{ speaker: "Madina", line: "Why is your sister at school?", line_uz: "Nega singlingiz maktabda?", recycled: ["is", "your", "sister"], target: ["Why", "at", "school"] }',
     '{ speaker: "Madina", line: "Why is your sister at school?", line_uz: "Nega singlingiz maktabda?", recycled: ["is", "your", "sister"], target: ["Why", "at", "school"], mastery_key: "U01_5_L03_D02_6" }'),
    ('{ speaker: "Vali", line: "She has a class. There is an exam.", line_uz: "Uning darsi bor. Imtihon bor.", recycled: ["She", "has", "a", "is", "an"], target: ["class", "There", "exam"] }',
     '{ speaker: "Vali", line: "She has a class. There is an exam.", line_uz: "Uning darsi bor. Imtihon bor.", recycled: ["She", "has", "a", "is", "an"], target: ["class", "There", "exam"], mastery_key: "U01_5_L03_D02_7" }'),
    ('{ speaker: "Madina", line: "Why are you happy?", line_uz: "Nega xursandsiz?", recycled: ["you"], target: ["Why", "are", "happy"] }',
     '{ speaker: "Madina", line: "Why are you happy?", line_uz: "Nega xursandsiz?", recycled: ["you"], target: ["Why", "are", "happy"], mastery_key: "U01_5_L03_D02_8" }'),
    ('{ speaker: "Vali", line: "I am happy. I have a book. The book is good.", line_uz: "Xursandman. Kitobim bor. Kitob yaxshi.", recycled: ["I", "am", "have", "a", "book", "The", "is"], target: ["happy"] }',
     '{ speaker: "Vali", line: "I am happy. I have a book. The book is good.", line_uz: "Xursandman. Kitobim bor. Kitob yaxshi.", recycled: ["I", "am", "have", "a", "book", "The", "is"], target: ["happy"], mastery_key: "U01_5_L03_D02_9" }'),
]

for old, new in dialogue_lines_d03_02:
    content = content.replace(old, new, 1)

# ═══════════════════════════════════════════════════════════════════════════
# STEP 5: Add flow_model + mastery_dialogue_id to all 3 lessons
# ═══════════════════════════════════════════════════════════════════════════

# Lesson L01
content = content.replace(
    '''      lesson_id: "U01_5_L01",
      title: "Possession with HAVE/HAS",''',
    '''      lesson_id: "U01_5_L01",
      title: "Possession with HAVE/HAS",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L01_D01_1",''',
    1
)

# Lesson L02
content = content.replace(
    '''      lesson_id: "U01_5_L02",
      title: "Existence with THERE IS/ARE",''',
    '''      lesson_id: "U01_5_L02",
      title: "Existence with THERE IS/ARE",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L02_D01_1",''',
    1
)

# Lesson L03
content = content.replace(
    '''      lesson_id: "U01_5_L03",
      title: "WH-Questions & Prepositions",''',
    '''      lesson_id: "U01_5_L03",
      title: "WH-Questions & Prepositions",
      flow_model: "sandwich",
      mastery_dialogue_id: "U01_5_L03_D01_1",''',
    1
)

# ═══════════════════════════════════════════════════════════════════════════
# STEP 6: Card upgrades — syntax_scaffold + discovery + personalization
# Each card needs:
#   A) syntax_scaffold added to presentation slide (before closing })
#   B) discovery slide inserted after concept_check
#   C) personalization slide inserted after production
# ═══════════════════════════════════════════════════════════════════════════

# Helper: Define card upgrade data
CARD_UPGRADES = {
    # ── CARD 1: have ──
    "V_U01_5_L01_have": {
        "scaffold_old": '''              en_canonical: "I have a brother."
            },''',
        "scaffold_new": '''              en_canonical: "I have a brother.",
              syntax_scaffold: { en_structure: "I have a brother.", uz_gloss: "Mening akam bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a brother", role: "object", color: "purple" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Have' — I, You, We, They uchun. He/She/It uchun 'Has' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Have' — I, You, We, They uchun. He/She/It uchun 'Has' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "have", form_focus: "subject_agreement", why_prompt: "Nega 'have' va 'has' farqi bor?", explanation_uz: "'Have' — I, You, We, They bilan. 'Has' — He, She, It bilan. Uchinchi shaxs birlikda 'has' kerak.", mini_rule: "I/you/we/they + HAVE | he/she/it + HAS" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 1
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 2: has''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 1
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizda nima bor? Ayting.", model_frame: "I have ___.", flexibleCheck: true, tags: ["possession", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 2: has'''
    },
    # ── CARD 2: has ──
    "V_U01_5_L01_has": {
        "scaffold_old": '''              en_canonical: "He has a book."
            },''',
        "scaffold_new": '''              en_canonical: "He has a book.",
              syntax_scaffold: { en_structure: "He has a book.", uz_gloss: "Uning kitobi bor.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "has", role: "verb", color: "green" }, { word: "a book", role: "object", color: "purple" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Has' — He/She/It uchun. I/You/We/They uchun 'Have' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Has' — He/She/It uchun. I/You/We/They uchun 'Have' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "has", form_focus: "third_person_s", why_prompt: "Nega 'has' faqat uchinchi shaxs uchun?", explanation_uz: "'Has' — He, She, It (uchinchi shaxs birlik) uchun maxsus shakl. Boshqa shaxslar uchun 'have' ishlatiladi.", mini_rule: "he/she/it + HAS (NOT have)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 3
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 3: don't have''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning do'stingizda nima bor?", model_frame: "My friend has ___.", flexibleCheck: true, tags: ["possession", "third_person"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 3: don't have'''
    },
    # ── CARD 3: don't have ──
    "V_U01_5_L01_dont_have": {
        "scaffold_old": '''              en_canonical: "I don't have a sister."
            },''',
        "scaffold_new": '''              en_canonical: "I don't have a sister.",
              syntax_scaffold: { en_structure: "I don't have a sister.", uz_gloss: "Mening singlim yo'q.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "don't", role: "negative", color: "red" }, { word: "have", role: "verb", color: "green" }, { word: "a sister", role: "object", color: "purple" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Don't' = inkor. 'Don't have' = egalik YO'Q!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Don't' = inkor. 'Don't have' = egalik YO'Q!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "don't have", form_focus: "negation", why_prompt: "Inkor qanday hosil bo'ladi?", explanation_uz: "'Don't' = do + not. I/You/We/They bilan 'don't have' ishlatiladi. He/She/It uchun 'doesn't have' kerak.", mini_rule: "I/you/we/they + DON'T HAVE | he/she/it + DOESN'T HAVE" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 5
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 4: doesn't have''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 5
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizda nima yo'q?", model_frame: "I don't have ___.", flexibleCheck: true, tags: ["possession", "negation"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 4: doesn't have'''
    },
    # ── CARD 4: doesn't have ──
    "V_U01_5_L01_doesnt_have": {
        "scaffold_old": '''              en_canonical: "He doesn't have a car."
            },''',
        "scaffold_new": '''              en_canonical: "He doesn't have a car.",
              syntax_scaffold: { en_structure: "He doesn't have a car.", uz_gloss: "Uning mashinasi yo'q.", tokens: [{ word: "He", role: "subject", color: "blue" }, { word: "doesn't", role: "negative", color: "red" }, { word: "have", role: "verb", color: "green" }, { word: "a car", role: "object", color: "purple" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Doesn't' — He/She/It uchun. I/You/We/They uchun 'Don't' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Doesn't' — He/She/It uchun. I/You/We/They uchun 'Don't' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "doesn't have", form_focus: "third_person_negation", why_prompt: "Nega 'doesn't have' da 'has' yo'q?", explanation_uz: "'Doesn't' = does + not. 'Does' allaqachon uchinchi shaxs. Shuning uchun 'have' (HAS emas!) kerak: 'doesn't HAVE'.", mini_rule: "he/she/it + DOESN'T HAVE (NOT doesn't has)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 8
              }
            }
          ]
        }
      ]
    },''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L01_D01",
                line_index: 8
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning sinfdoshingizda nima yo'q?", model_frame: "My classmate doesn't have ___.", flexibleCheck: true, tags: ["possession", "third_person_negation"] }
          ]
        }
      ]
    },'''
    },
    # ── CARD 5: there is ──
    "V_U01_5_L02_there_is": {
        "scaffold_old": '''              en_canonical: "There is a teacher in the class."
            },''',
        "scaffold_new": '''              en_canonical: "There is a teacher in the class.",
              syntax_scaffold: { en_structure: "There is a teacher in the class.", uz_gloss: "Sinfda o'qituvchi bor.", tokens: [{ word: "There is", role: "existence", color: "blue" }, { word: "a teacher", role: "subject", color: "green" }, { word: "in the class", role: "location", color: "orange" }] }
            },''',
        "discovery_after": '''                fail_msg: "'There is' — birlik uchun. Ko'plik uchun 'There are' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'There is' — birlik uchun. Ko'plik uchun 'There are' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there is", form_focus: "existence_singular", why_prompt: "Nega 'there is' va 'there are' farqi bor?", explanation_uz: "'There is' = BITTA narsa mavjud. 'There are' = KO'P narsa mavjud. Sonni qarang!", mini_rule: "There IS + singular (a book) | There ARE + plural (books)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 1
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 6: there are''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 1
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning xonangizda nima bor?", model_frame: "There is ___ in my room.", flexibleCheck: true, tags: ["existence", "place"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 6: there are'''
    },
    # ── CARD 6: there are ──
    "V_U01_5_L02_there_are": {
        "scaffold_old": '''              en_canonical: "There are students in the class."
            },''',
        "scaffold_new": '''              en_canonical: "There are students in the class.",
              syntax_scaffold: { en_structure: "There are students in the class.", uz_gloss: "Sinfda talabalar bor.", tokens: [{ word: "There are", role: "existence", color: "blue" }, { word: "students", role: "subject", color: "green" }, { word: "in the class", role: "location", color: "orange" }] }
            },''',
        "discovery_after": '''                fail_msg: "'There are' — ko'plik uchun. Birlik uchun 'There is' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'There are' — ko'plik uchun. Birlik uchun 'There is' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there are", form_focus: "existence_plural", why_prompt: "Nega 'are' ko'plik uchun?", explanation_uz: "'Are' = ko'plik uchun TO BE shakli. Students, books, teachers = ko'plik → 'There ARE'.", mini_rule: "There ARE + plural noun (students, books, teachers)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 3
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 7: there isn't''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sinfingizda nimalar bor?", model_frame: "There are ___ in my class.", flexibleCheck: true, tags: ["existence", "plural"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 7: there isn't'''
    },
    # ── CARD 7: there isn't ──
    "V_U01_5_L02_there_isnt": {
        "scaffold_old": '''              en_canonical: "There isn't a car at school."
            },''',
        "scaffold_new": '''              en_canonical: "There isn't a car at school.",
              syntax_scaffold: { en_structure: "There isn't a car at school.", uz_gloss: "Maktabda mashina yo'q.", tokens: [{ word: "There isn't", role: "negative_existence", color: "red" }, { word: "a car", role: "subject", color: "green" }, { word: "at school", role: "location", color: "orange" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Isn't' = inkor. 'There isn't' = mavjud EMAS!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Isn't' = inkor. 'There isn't' = mavjud EMAS!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there isn't", form_focus: "negative_existence", why_prompt: "Inkor qanday hosil bo'ladi?", explanation_uz: "'There is' + 'not' → 'There isn't'. Birlik uchun inkor shakl.", mini_rule: "There is + not → There ISN'T (singular negative)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 7
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 8: there aren't''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 7
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning xonangizda nima yo'q?", model_frame: "There isn't ___ in my room.", flexibleCheck: true, tags: ["existence", "negation"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 8: there aren't'''
    },
    # ── CARD 8: there aren't ──
    "V_U01_5_L02_there_arent": {
        "scaffold_old": '''              en_canonical: "There aren't books in the bag."
            },''',
        "scaffold_new": '''              en_canonical: "There aren't books in the bag.",
              syntax_scaffold: { en_structure: "There aren't books in the bag.", uz_gloss: "Sumkada kitoblar yo'q.", tokens: [{ word: "There aren't", role: "negative_existence", color: "red" }, { word: "books", role: "subject", color: "green" }, { word: "in the bag", role: "location", color: "orange" }] }
            },''',
        "discovery_after": '''                fail_msg: "'Aren't' — ko'plik uchun. Birlik uchun 'Isn't' kerak!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Aren't' — ko'plik uchun. Birlik uchun 'Isn't' kerak!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "there aren't", form_focus: "plural_negative_existence", why_prompt: "Ko'plik inkor qanday farq qiladi?", explanation_uz: "'There are' + 'not' → 'There aren't'. Ko'plik uchun inkor shakl. Birlik uchun 'isn't' ishlatiladi.", mini_rule: "There are + not → There AREN'T (plural negative)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 9
              }
            }
          ]
        }
      ]
    },''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L02_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sinfingizda nimalar yo'q?", model_frame: "There aren't ___ in my class.", flexibleCheck: true, tags: ["existence", "plural_negation"] }
          ]
        }
      ]
    },'''
    },
    # ── CARD 9: where ──
    "V_U01_5_L03_where": {
        "scaffold_old": '''              en_canonical: "Where is Ali?"
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Where' qanday savol so'zi?",''',
        "scaffold_new": '''              en_canonical: "Where is Ali?",
              syntax_scaffold: { en_structure: "Where is Ali?", uz_gloss: "Ali qayerda?", tokens: [{ word: "Where", role: "wh_question", color: "red" }, { word: "is", role: "verb", color: "green" }, { word: "Ali", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Where' qanday savol so'zi?",''',
        "discovery_after": '''                fail_msg: "'Where' = QAYERDA. Bu joy haqida savoldir!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Where' = QAYERDA. Bu joy haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "where", form_focus: "wh_question_location", why_prompt: "Savol so'zlari qanday ishlaydi?", explanation_uz: "'Where' = joy haqida savol. Savol tartibi: WHERE + IS/ARE + Subject? Darak gapdan farqli tartib!", mini_rule: "WHERE + is/are + subject? (question word order)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 2
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 10: how''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 2
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning eng yaqin do'stingiz qayerda?", model_frame: "My best friend is in/at ___.", flexibleCheck: true, tags: ["location", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 10: how'''
    },
    # ── CARD 10: how ──
    "V_U01_5_L03_how": {
        "scaffold_old": '''              en_canonical: "How are you?"
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'How are you?' nima haqida so'raydi?",''',
        "scaffold_new": '''              en_canonical: "How are you?",
              syntax_scaffold: { en_structure: "How are you?", uz_gloss: "Siz qandaysiz?", tokens: [{ word: "How", role: "wh_question", color: "red" }, { word: "are", role: "verb", color: "green" }, { word: "you", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'How are you?' nima haqida so'raydi?",''',
        "discovery_after": '''                fail_msg: "'How' = QANDAY. Bu holat haqida savoldir!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'How' = QANDAY. Bu holat haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "how", form_focus: "wh_question_manner", why_prompt: "How qachon ishlatiladi?", explanation_uz: "'How' = holat yoki usul. 'How are you?' = Qanday ekansiz? 'How' bilan turli savollar tuzish mumkin.", mini_rule: "HOW + is/are + subject? = state/manner question" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 0
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 11: when''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 0
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Bugun o'zingizni qanday his qilyapsiz?", model_frame: "I am ___ today.", flexibleCheck: true, tags: ["state", "feeling"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 11: when'''
    },
    # ── CARD 11: when ──
    "V_U01_5_L03_when": {
        "scaffold_old": '''              en_canonical: "When is the class?"
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'When' qanday savol so'zi?",''',
        "scaffold_new": '''              en_canonical: "When is the class?",
              syntax_scaffold: { en_structure: "When is the class?", uz_gloss: "Dars qachon?", tokens: [{ word: "When", role: "wh_question", color: "red" }, { word: "is", role: "verb", color: "green" }, { word: "the class", role: "subject", color: "blue" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'When' qanday savol so'zi?",''',
        "discovery_after": '''                fail_msg: "'When' = QACHON. Bu vaqt haqida savoldir!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'When' = QACHON. Bu vaqt haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "when", form_focus: "wh_question_time", why_prompt: "When savol so'zi nima uchun?", explanation_uz: "'When' = vaqt haqida savol. 'When + is/are + subject?' — vaqtni so'rash uchun.", mini_rule: "WHEN + is/are + subject? = time question" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 6
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 12: why''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 6
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning darslaringiz qachon?", model_frame: "My class is at ___.", flexibleCheck: true, tags: ["time", "schedule"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 12: why'''
    },
    # ── CARD 12: why ──
    "V_U01_5_L03_why": {
        "scaffold_old": '''              en_canonical: "Why are you happy?"
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Why' qanday savol so'zi?",''',
        "scaffold_new": '''              en_canonical: "Why are you happy?",
              syntax_scaffold: { en_structure: "Why are you happy?", uz_gloss: "Nega siz xursandsiz?", tokens: [{ word: "Why", role: "wh_question", color: "red" }, { word: "are", role: "verb", color: "green" }, { word: "you", role: "subject", color: "blue" }, { word: "happy", role: "adjective", color: "purple" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Why' qanday savol so'zi?",''',
        "discovery_after": '''                fail_msg: "'Why' = NEGA. Bu sabab haqida savoldir!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Why' = NEGA. Bu sabab haqida savoldir!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "why", form_focus: "wh_question_reason", why_prompt: "Why nima uchun?", explanation_uz: "'Why' = sabab/sababni so'rash. 'Why + are/is + subject + adjective?' — sababni aniqlash.", mini_rule: "WHY + is/are + subject + state? = reason question" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 8
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 13: in''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 8
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz nega ingliz tilini o'rganasiz?", model_frame: "I study English because ___.", flexibleCheck: true, tags: ["reason", "personal"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 13: in'''
    },
    # ── CARD 13: in ──
    "V_U01_5_L03_in": {
        "scaffold_old": '''              en_canonical: "Ali is in the class."
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'In' qachon ishlatiladi?",''',
        "scaffold_new": '''              en_canonical: "Ali is in the class.",
              syntax_scaffold: { en_structure: "Ali is in the class.", uz_gloss: "Ali sinfda.", tokens: [{ word: "Ali", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "in", role: "preposition", color: "red" }, { word: "the class", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'In' qachon ishlatiladi?",''',
        "discovery_after": '''                fail_msg: "'In' = ICHIDA. 'In the class' = sinf ICHIDA!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'In' = ICHIDA. 'In the class' = sinf ICHIDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "in", form_focus: "preposition_enclosed", why_prompt: "In, On, At — farqi nima?", explanation_uz: "IN = ichida (in the room, in the bag). ON = ustida (on the table). AT = aniq joy (at school). Uch xil joy ko'rsatish!", mini_rule: "IN = inside | ON = surface | AT = specific point" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 3
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 14: on''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 3
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz hozir qayerdasiz?", model_frame: "I am in ___.", flexibleCheck: true, tags: ["location", "preposition"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 14: on'''
    },
    # ── CARD 14: on ──
    "V_U01_5_L03_on": {
        "scaffold_old": '''              en_canonical: "The book is on the table."
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'On' qachon ishlatiladi?",''',
        "scaffold_new": '''              en_canonical: "The book is on the table.",
              syntax_scaffold: { en_structure: "The book is on the table.", uz_gloss: "Kitob stolda.", tokens: [{ word: "The book", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "on", role: "preposition", color: "red" }, { word: "the table", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'On' qachon ishlatiladi?",''',
        "discovery_after": '''                fail_msg: "'On' = USTIDA. 'On the table' = stol USTIDA!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'On' = USTIDA. 'On the table' = stol USTIDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "on", form_focus: "preposition_surface", why_prompt: "On qachon ishlatiladi?", explanation_uz: "'On' = sirt ustida. On the table, on the wall, on the floor — narsa sirt USTIDA tursa 'on' kerak.", mini_rule: "ON = on a surface (table, wall, floor)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 5
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 15: at''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 5
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Sizning stolingizda nimalar bor?", model_frame: "There is ___ on my table.", flexibleCheck: true, tags: ["location", "surface"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 15: at'''
    },
    # ── CARD 15: at ──
    "V_U01_5_L03_at": {
        "scaffold_old": '''              en_canonical: "She is at home."
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'At' qachon ishlatiladi?",''',
        "scaffold_new": '''              en_canonical: "She is at home.",
              syntax_scaffold: { en_structure: "She is at home.", uz_gloss: "U uyda.", tokens: [{ word: "She", role: "subject", color: "blue" }, { word: "is", role: "verb", color: "green" }, { word: "at", role: "preposition", color: "red" }, { word: "home", role: "location", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'At' qachon ishlatiladi?",''',
        "discovery_after": '''                fail_msg: "'At' = aniq joy uchun. 'At home' = UYDA!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'At' = aniq joy uchun. 'At home' = UYDA!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "at", form_focus: "preposition_point", why_prompt: "At qachon ishlatiladi?", explanation_uz: "'At' = aniq belgilangan joy. At home, at school, at work — bu joylarning NOMI bilan 'at' kerak.", mini_rule: "AT = specific point (at home, at school, at work)" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 16: too''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz hozir qayerdasiz?", model_frame: "I am at ___.", flexibleCheck: true, tags: ["location", "specific_place"] }
          ]
        },

        // ═══════════════════════════════════════════════════════════════
        // CARD 16: too'''
    },
    # ── CARD 16: too ──
    "V_U01_5_L03_too": {
        "scaffold_old": '''              en_canonical: "I have a sister too."
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Too' nimani bildiradi?",''',
        "scaffold_new": '''              en_canonical: "I have a sister too.",
              syntax_scaffold: { en_structure: "I have a sister too.", uz_gloss: "Mening ham singlim bor.", tokens: [{ word: "I", role: "subject", color: "blue" }, { word: "have", role: "verb", color: "green" }, { word: "a sister", role: "object", color: "purple" }, { word: "too", role: "addition", color: "orange" }] }
            },

            // ACT 2: CONCEPT CHECK
            {
              phase: "practice",
              type: "concept_check",
              instruction: "'Too' nimani bildiradi?",''',
        "discovery_after": '''                fail_msg: "'Too' = HAM. Bu qo'shimcha qilish uchun ishlatiladi!"
              }
            },

            // ACT 3: DRILL LIST''',
        "discovery_new": '''                fail_msg: "'Too' = HAM. Bu qo'shimcha qilish uchun ishlatiladi!"
              }
            },

            // ★ DISCOVERY
            { phase: "discovery", grammar_token: "too", form_focus: "addition_marker", why_prompt: "Too qayerda keladi?", explanation_uz: "'Too' = ham. Gap OXIRIDA keladi: 'I am happy TOO.' 'Also' esa gap o'rtasida: 'I also have...'", mini_rule: "TOO = end of sentence | ALSO = middle of sentence" },

            // ACT 3: DRILL LIST''',
        "personal_after": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            }
          ]
        }
      ]
    }
  },''',
        "personal_new": '''              on_success: {
                unlock_bubble: true,
                dialogue_id: "U01_5_L03_D01",
                line_index: 9
              }
            },

            // ★ PERSONALIZATION
            { phase: "personalization", prompt_uz: "Siz ham nimaga qiziqasiz?", model_frame: "I like ___ too.", flexibleCheck: true, tags: ["addition", "preference"] }
          ]
        }
      ]
    }
  },'''
    },
}

# Apply all card upgrades
for card_id, upgrades in CARD_UPGRADES.items():
    # 1. Add syntax_scaffold to presentation
    old = upgrades["scaffold_old"]
    new = upgrades["scaffold_new"]
    if old in content:
        content = content.replace(old, new, 1)
        print(f"  ✅ {card_id}: syntax_scaffold added")
    else:
        print(f"  ❌ {card_id}: syntax_scaffold FAILED - pattern not found")

    # 2. Insert discovery slide
    old = upgrades["discovery_after"]
    new = upgrades["discovery_new"]
    if old in content:
        content = content.replace(old, new, 1)
        print(f"  ✅ {card_id}: discovery slide added")
    else:
        print(f"  ❌ {card_id}: discovery FAILED - pattern not found")

    # 3. Insert personalization slide
    old = upgrades["personal_after"]
    new = upgrades["personal_new"]
    if old in content:
        content = content.replace(old, new, 1)
        print(f"  ✅ {card_id}: personalization slide added")
    else:
        print(f"  ❌ {card_id}: personalization FAILED - pattern not found")

# ═══════════════════════════════════════════════════════════════════════════
# STEP 7: Write the upgraded file
# ═══════════════════════════════════════════════════════════════════════════
with open(INPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"✅ UPGRADE COMPLETE: {INPUT_FILE}")
print(f"{'='*60}")
