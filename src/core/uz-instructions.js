/**
 * Uzbek Instructions Module
 * ==========================
 * Provides contextual Uzbek instructions for every tile.
 * Each tile gets a brief, age-appropriate instruction explaining
 * what students should do — in their native language.
 *
 * Research backing:
 * - Scaffolding (Vygotsky ZPD): L1 instructions reduce cognitive load
 * - Desirable Difficulty (Bjork 1994): Instructions in L1, tasks in L2
 *
 * @module src/core/uz-instructions
 * @version 1.0.0
 */

// ============================
// TILE INSTRUCTIONS
// ============================

/**
 * @typedef {Object} TileInstruction
 * @property {string} uz - Uzbek instruction text
 * @property {string} en - English translation (for teacher mode)
 * @property {string} icon - Emoji icon for visual identification
 * @property {string} [pairWork] - Pair work instruction if applicable (UZ)
 * @property {string} [pairWorkEn] - Pair work instruction EN
 */

/** @type {Record<string, TileInstruction>} */
const TILE_INSTRUCTIONS = {
  intro: {
    icon: '📋',
    uz: 'Bu darsda nima o\'rganasiz — o\'qib chiqing va tayyorlaning.',
    en: 'Read what you will learn in this lesson and get ready.',
    pairWork: null,
    pairWorkEn: null,
  },

  vocab: {
    icon: '📚',
    uz: 'Har bir kartani bosing. So\'zni tinglang, rasmga qarang, va mashq qiling. Barcha 6 bosqichni yakunlang.',
    en: 'Tap each card. Listen to the word, look at the picture, and practice. Complete all 6 stages.',
    pairWork: '👥 Sherigingiz bilan navbatma-navbat kartalarni oching. Bir kishi so\'zni aytadi, ikkinchisi tarjima qiladi.',
    pairWorkEn: 'Take turns opening cards with your partner. One says the word, the other translates.',
  },

  dialogue: {
    icon: '💬',
    uz: 'Suhbatni tinglang va o\'qing. 3 bosqich bor: to\'liq matn → xiralashgan matn → ko\'rinmaydigan matn. Har bir satrni o\'zlashtiring.',
    en: 'Listen and read the dialogue. 3 stages: full text → faded text → blind. Master each line.',
    pairWork: '👥 Bir kishi "A" rolini, boshqasi "B" rolini olsin. Suhbatni real holda amalda qiling.',
    pairWorkEn: 'One person takes role "A", the other role "B". Practice the dialogue in real life.',
  },

  pattern: {
    icon: '🔍',
    uz: 'Grammatika qoidasini o\'rganing. Misollarni o\'qing, qoidani toping, va "Tushundim" tugmasini bosing.',
    en: 'Learn the grammar rule. Read examples, find the pattern, and tap "Understood".',
    pairWork: '👥 Misollarni sherigingizga ovoz chiqarib o\'qing. Qoidani bir-biringizga tushuntiring.',
    pairWorkEn: 'Read examples aloud to your partner. Explain the rule to each other.',
  },

  function: {
    icon: '🎯',
    uz: 'Vazifalarni bajaring: elementlarni moslang yoki to\'g\'ri javobni tanlang. Drag & drop ishlating.',
    en: 'Complete the tasks: match items or choose the correct answer. Use drag & drop.',
    pairWork: '👥 Bir kishi draggable elementni ko\'rsatadi, ikkinchisi to\'g\'ri joyga qo\'yadi.',
    pairWorkEn: 'One person picks the draggable, the other places it correctly.',
  },

  controlled: {
    icon: '✏️',
    uz: 'Mashq qiling: bo\'sh joylarni to\'ldiring va so\'zlarni to\'g\'ri tartibga qo\'ying. Kamida 80% to\'g\'ri bo\'lishi kerak.',
    en: 'Practice: fill gaps and reorder words. You need at least 80% correct.',
    pairWork: '👥 Birgalikda ishlang — bir kishi gapni o\'qiydi, ikkinchisi javob topadi.',
    pairWorkEn: 'Work together — one reads the sentence, the other finds the answer.',
  },

  writing: {
    icon: '📝',
    uz: 'O\'rganilgan so\'zlarni ishlatib gaplar yozing. Kamida ko\'rsatilgan miqdorda so\'z ishlating.',
    en: 'Write sentences using the vocabulary words. Use at least the shown word count.',
    pairWork: '👥 Har biringiz gaplar yozing, keyin bir-biringizning gaplarini tekshiring.',
    pairWorkEn: 'Each write sentences, then check each other\'s work.',
  },

  listen_write: {
    icon: '🎧',
    uz: 'Diqqat bilan tinglang va eshitganingizni yozing. Audio tugmasini bir necha marta bosishingiz mumkin.',
    en: 'Listen carefully and write what you hear. You can play the audio multiple times.',
    pairWork: '👥 Bir kishi audio yozadi, ikkinchisi tekshiradi. Keyin almashtirasiz.',
    pairWorkEn: 'One person writes, the other checks. Then switch.',
  },

  mistake: {
    icon: '🔎',
    uz: 'Xatoni toping va to\'g\'ri shaklini bilib oling. Har bir xatoning tushuntirishini o\'qing.',
    en: 'Find the error and learn the correct form. Read the explanation for each mistake.',
    pairWork: '👥 Bir kishi xato gapni o\'qiydi, ikkinchisi xatoni topadi va tushuntiradi.',
    pairWorkEn: 'One reads the wrong sentence, the other finds the error and explains.',
  },

  done: {
    icon: '🎉',
    uz: 'Darsni yakunladingiz! Natijangizni ko\'ring va keyingi darsga o\'ting.',
    en: 'You completed the lesson! See your score and move to the next lesson.',
    pairWork: null,
    pairWorkEn: null,
  },

  unit_error_detection: {
    icon: '📊',
    uz: 'Bo\'lim xatolarini tekshiring. Har bir gapda xatoni toping va to\'g\'rilang.',
    en: 'Check unit errors. Find and correct the mistake in each sentence.',
    pairWork: '👥 Navbatma-navbat gaplarni tekshiring.',
    pairWorkEn: 'Take turns checking sentences.',
  },

  grand_tile: {
    icon: '🏆',
    uz: 'Katta mashq: ko\'rsatmaga qarab uzun javob yozing. O\'rganilgan barcha so\'z va qoidalarni ishlating.',
    en: 'Grand practice: write a longer response following the prompt. Use all learned words and rules.',
    pairWork: '👥 Birgalikda javobni muhokama qilib yozing.',
    pairWorkEn: 'Discuss and write the response together.',
  },

  // Re-practice (post-dialogue cloze)
  repractice: {
    icon: '🔄',
    uz: 'Suhbatni qayta mashq qiling. Yo\'qolgan so\'zlarni toping — har bosqichda qiyinlashadi.',
    en: 'Re-practice the dialogue. Fill in missing words — it gets harder each stage.',
    pairWork: '👥 Bir kishi savol satrini o\'qiydi, ikkinchisi javob satrini to\'ldiradi.',
    pairWorkEn: 'One reads the question line, the other fills in the answer line.',
  },
};

// ============================
// PUBLIC API
// ============================

/**
 * Get instruction for a tile state
 * @param {string} tileState - Tile state key (e.g. 'dialogue', 'vocab')
 * @returns {TileInstruction|null}
 */
export function getInstructionForTile(tileState) {
  const normalizedKey = String(tileState || '').toLowerCase().replace(/\s+/g, '_');
  return TILE_INSTRUCTIONS[normalizedKey] || null;
}

/**
 * Get all tile instructions
 * @returns {Record<string, TileInstruction>}
 */
export function getAllInstructions() {
  return { ...TILE_INSTRUCTIONS };
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.getInstructionForTile = getInstructionForTile;
}
