/**
 * Internationalization (i18n) Module
 * ====================================
 * Centralized Uzbek / English translation dictionary.
 * Every user-facing string in the app routes through uz() / en().
 *
 * Usage:
 *   import { uz, en } from '../core/i18n.js';
 *   button.textContent = uz('buttons.next');          // "Keyingisi"
 *   button.dataset.translation = en('buttons.next');  // "Next"
 *
 * @module src/core/i18n
 * @version 1.0.1
 */

import { getCurrentLanguage } from '../utils/language.js';

// ============================
// TRANSLATION DICTIONARIES
// ============================

const UZ = {
  // ── Navigation & Common Buttons ──
  'buttons.next': 'Keyingisi',
  'buttons.back': 'Ortga',
  'buttons.check': 'Tekshirish',
  'buttons.continue': 'Davom etish',
  'buttons.retry': 'Qayta urinish',
  'buttons.start': 'Boshlash',
  'buttons.stop': 'To\'xtatish',
  'buttons.close': 'Yopish',
  'buttons.submit': 'Yuborish',
  'buttons.skip': 'O\'tkazib yuborish',
  'buttons.done': 'Tayyor',
  'buttons.play': 'Tinglash',
  'buttons.playAll': 'Hammasini tinglash',
  'buttons.playAgain': 'Yana tinglash',
  'buttons.showAnswer': 'Javobni ko\'rsatish',
  'buttons.understood': 'Tushundim',
  'buttons.gotIt': 'Tushunarli!',
  'buttons.tryAgain': 'Qayta urinib ko\'ring',
  'buttons.restart': 'Qayta boshlash',
  'buttons.review': 'Qayta ko\'rish',
  'buttons.confirm': 'Tasdiqlash',

  // ── Tile Navigation Buttons ──
  'nav.nextVocab': 'Keyingisi: Lug\'at',
  'nav.nextDialogue': 'Keyingisi: Suhbat',
  'nav.nextPattern': 'Keyingisi: Grammatika',
  'nav.nextFunction': 'Keyingisi: Funksiya',
  'nav.nextControlled': 'Keyingisi: Mashq',
  'nav.nextWriting': 'Keyingisi: Yozish',
  'nav.nextListenWrite': 'Keyingisi: Tinglash va yozish',
  'nav.nextMistake': 'Keyingisi: Xatolar',
  'nav.nextDone': 'Keyingisi: Yakunlash',
  'nav.backControlled': 'Qaytish: Mashq',
  'nav.stepOf': 'Qadam {current} / {total}',
  'nav.stage': 'Bosqich',

  // ── Tile Titles ──
  'tiles.intro': 'Kirish',
  'tiles.vocab': 'Lug\'at so\'zlari',
  'tiles.dialogue': 'Suhbat mashqi',
  'tiles.pattern': 'Grammatika amalda',
  'tiles.function': 'Funksiya tekshiruvi',
  'tiles.controlled': 'Boshqariladigan mashq',
  'tiles.writing': 'Yozish mashqi',
  'tiles.listenWrite': 'Tinglash va yozish',
  'tiles.mistake': 'Xatolarni aniqlash',
  'tiles.done': 'Dars yakunlandi',
  'tiles.unitError': 'Bo\'lim xatolarini tekshirish',
  'tiles.grand': 'Katta mashq',

  // ── Vocab Card Modal ──
  'vocab.presentation': 'Taqdimot',
  'vocab.conceptCheck': 'Tushunchani tekshirish',
  'vocab.discovery': 'Kashfiyot',
  'vocab.drill': 'Mashq',
  'vocab.production': 'Ishlab chiqarish',
  'vocab.personalization': 'Shaxsiylashtirish',
  'vocab.stage': '{current}-bosqich ({total} dan)',
  'vocab.tapToFlip': 'Kartani o\'girish uchun bosing',
  'vocab.typeAnswer': 'Javobingizni yozing...',
  'vocab.chooseCorrect': 'To\'g\'ri javobni tanlang',
  'vocab.fillBlank': 'Bo\'sh joyni to\'ldiring',
  'vocab.makeASentence': 'Shu so\'z bilan gap tuzing',
  'vocab.writeYourSentence': 'O\'z gapingizni yozing...',
  'vocab.correct': 'To\'g\'ri! ✓',
  'vocab.incorrect': 'Noto\'g\'ri ✗',
  'vocab.tryAgain': 'Qayta urinib ko\'ring',
  'vocab.nextCard': 'Keyingi karta',
  'vocab.prevCard': 'Oldingi karta',
  'vocab.complete': 'Barakalla! Hammasini yakunladingiz!',
  'vocab.exampleSentence': 'Misol gap',
  'vocab.definition': 'Ta\'rif',
  'vocab.partOfSpeech': 'So\'z turkumi',
  'vocab.pronunciation': 'Talaffuz',
  'vocab.image': 'Rasm',
  'vocab.listenAndRepeat': 'Tinglang va takrorlang',
  'vocab.wordMeaning': 'So\'z ma\'nosi',
  'vocab.contextClue': 'Kontekst uchun maslahat',
  'vocab.yourTurn': 'Sizning navbatingiz!',
  'vocab.wellDone': 'Ajoyib!',
  'vocab.keepGoing': 'Davom eting!',
  'vocab.almostThere': 'Deyarli tayyor!',

  // ── Vocab Tile Grid ──
  'vocabTile.title': 'Lug\'at so\'zlari',
  'vocabTile.cardsComplete': '{count} ta karta yakunlandi',
  'vocabTile.tapToOpen': 'Ochish uchun bosing',
  'vocabTile.allComplete': 'Barcha kartalar yakunlandi!',
  'vocabTile.learnedBadge': 'O\'rganildi',
  'vocabTile.newBadge': 'Yangi',

  // ── Dialogue Tile ──
  'dialogue.title': 'Suhbat mashqi',
  'dialogue.listen': 'Tinglash',
  'dialogue.read': 'O\'qish',
  'dialogue.practice': 'Amaliyot',
  'dialogue.full': 'To\'liq',
  'dialogue.faded': 'Xiralashgan',
  'dialogue.blind': 'Ko\'rinmaydi',
  'dialogue.startPressure': 'Bosim rejimini boshlang',
  'dialogue.pressureMode': 'LINGVISTIK BOSIM',
  'dialogue.masterLine': 'Bu satrni o\'zlashtiring',
  'dialogue.mastered': 'O\'zlashtirildi ✓',
  'dialogue.savol': 'SAVOL',
  'dialogue.javob': 'JAVOB',
  'dialogue.speakerA': 'Gapiruvchi A',
  'dialogue.speakerB': 'Gapiruvchi B',
  'dialogue.contrastive': 'Qiyosiy tahlil',
  'dialogue.discovery': 'Kashfiyot',
  'dialogue.naturalUz': 'Tabiiy UZ',
  'dialogue.mirror': 'Oyna',
  'dialogue.english': 'Inglizcha',

  // ── Dialogue Re-Practice (Cloze) ──
  'repractice.title': 'Suhbatni qayta mashq qilish',
  'repractice.subtitle': 'Yo\'qolgan so\'zlarni toping',
  'repractice.stage1': '1-bosqich: Oson (1-2 so\'z yo\'q)',
  'repractice.stage2': '2-bosqich: O\'rta (3-4 so\'z yo\'q)',
  'repractice.stage3': '3-bosqich: Qiyin (faqat kalit so\'zlar)',
  'repractice.fillGaps': 'Bo\'sh joylarni to\'ldiring',
  'repractice.tapWord': 'So\'zni bosing yoki yozing',
  'repractice.allCorrect': 'Barchasi to\'g\'ri! Ajoyib!',
  'repractice.someWrong': '{count} ta xato. Qayta urinib ko\'ring.',
  'repractice.nextStage': 'Keyingi bosqich',
  'repractice.complete': 'Qayta mashq yakunlandi!',

  // ── Pattern Tile ──
  'pattern.title': 'Grammatika amalda',
  'pattern.spotting': 'Namunani toping',
  'pattern.listenRepeat': 'Tinglang va takrorlang',
  'pattern.meaning': 'Ma\'no',
  'pattern.compare': 'Taqqoslash va e\'tibor',
  'pattern.formRules': 'Shakl qoidalari',
  'pattern.iSeeIt': 'Ko\'rdim! →',
  'pattern.understood': 'Tushundim →',
  'pattern.allReviewed': '✓ Barcha ma\'lumotlar ko\'rib chiqildi',
  'pattern.reviewRules': 'Qoidalarni qayta ko\'rish ↺',
  'pattern.nextFunction': 'Keyingisi: Funksiya →',

  // ── Function Tile ──
  'function.title': 'Funksiya tekshiruvi',
  'function.dragHere': 'Bu yerga tashlang',
  'function.correct': 'To\'g\'ri!',
  'function.wrong': 'Noto\'g\'ri, qayta urinib ko\'ring',
  'function.matchItems': 'Elementlarni moslang',
  'function.chooseAnswer': 'Javobni tanlang',

  // ── Controlled Tile ──
  'controlled.title': 'Boshqariladigan mashq',
  'controlled.gap': 'Bo\'sh joy to\'ldirish',
  'controlled.reorder': 'Tartiblash',
  'controlled.pickWord': 'To\'g\'ri so\'zni tanlang',
  'controlled.reorderTokens': 'So\'zlarni to\'g\'ri tartibga qo\'ying...',
  'controlled.stageProgress': 'Bosqich {current}/{total}',
  'controlled.passed': 'O\'tdingiz! Kamida 80% to\'g\'ri.',
  'controlled.failed': 'Kamida 80% bo\'lishi kerak. Qayta urining.',
  'controlled.score': 'Natija: {score}/{max} ({pct}%)',

  // ── Writing Tile ──
  'writing.title': 'Yozish mashqi',
  'writing.locked': 'Yozish (Qulflangan)',
  'writing.unlockMsg': 'Oldin mashq barcha bosqichlarini yakunlang.',
  'writing.prompt': 'Quyidagi so\'zlarni ishlatib, {count} ta gap yozing:',
  'writing.placeholder': 'Gapingizni shu yerga yozing...',
  'writing.wordCount': 'So\'zlar soni: {count}',
  'writing.minWords': 'Kamida {min} ta so\'z yozing',
  'writing.submitted': 'Yozish topshirildi!',
  'writing.feedback': 'Fikr-mulohaza',
  'writing.useVocab': 'Lug\'at so\'zlarini ishlating',

  // ── Listen & Write Tile ──
  'listenWrite.title': 'Tinglash va yozish',
  'listenWrite.locked': 'Tinglash va yozish (Qulflangan)',
  'listenWrite.unlockMsg': 'Oldin yozish mashqini yakunlang.',
  'listenWrite.listenCarefully': 'Diqqat bilan tinglang va eshitganingizni yozing',
  'listenWrite.placeholder': 'Eshitganingizni yozing...',
  'listenWrite.playAudio': 'Audioni tinglang',
  'listenWrite.attempts': 'Urinishlar: {count}',

  // ── Mistake Tile ──
  'mistake.title': 'Xatolarni aniqlash',
  'mistake.wrong': '❌ Noto\'g\'ri',
  'mistake.correct': '✅ To\'g\'ri',
  'mistake.explanation': 'Tushuntirish',
  'mistake.findError': 'Xatoni toping',
  'mistake.noMistakes': 'Bu dars uchun xatolar yo\'q',

  // ── Done Tile ──
  'done.title': '🎉 Dars yakunlandi!',
  'done.finalScore': '🏆 Yakuniy natija',
  'done.score': '{score} / {max} ({pct}%)',
  'done.excellent': 'Ajoyib natija! 🌟',
  'done.good': 'Yaxshi natija! 👍',
  'done.okay': 'Yaxshi urinish! 💪',
  'done.needsWork': 'Ko\'proq mashq qiling! 📚',
  'done.xpEarned': '+{xp} XP qo\'shildi',
  'done.streakDays': '🔥 {days} kun ketma-ket',
  'done.nextLesson': 'Keyingi dars',
  'done.lessonSelect': 'Darslar ro\'yxati',
  'done.unitComplete': '🎉 Bo\'lim yakunlandi!',
  'done.nextUnit': 'Keyingi bo\'lim: {unit}',
  'done.restartLesson': '🔄 Darsni qayta boshlash',
  'done.errorCheck': '📊 Bo\'lim xatolarini tekshirish',
  'done.tileBreakdown': 'Bosqichlar natijasi',
  'done.completionMessage': 'Bu dars uchun master bosqichi yakunlandi. To\'liq ilovada bu keyingi darsni yoki bo\'lim bosqichlarini ochadi.',
  'done.newBest': '🎉 Yangi shaxsiy rekord! (Avvalgi: {pct}%)',
  'done.yourBest': 'Sizning eng yaxshi natijangiz: {pct}% ({date})',

  // ── Gamification ──
  'gamification.level': 'Daraja {level}',
  'gamification.levelUp': '🎉 Yangi daraja: {level}!',
  'gamification.xp': '{xp} XP',
  'gamification.streak': '🔥 {days} kun',
  'gamification.badgeEarned': '🏆 Nishon olindi!',
  'gamification.points': '{pts} ball',

  // ── Pair Work ──
  'pairWork.title': '👥 Juftlikda ishlash',
  'pairWork.instruction': 'Sherigingiz bilan birga ishlang',
  'pairWork.studentA': 'A o\'quvchi',
  'pairWork.studentB': 'B o\'quvchi',
  'pairWork.switch': 'Rollarni almashtiring',
  'pairWork.askPartner': 'Sherigingizdan so\'rang',
  'pairWork.answerPartner': 'Sherigingizga javob bering',

  // ── Classroom Mode ──
  'classroom.title': '🏫 Sinf rejimi',
  'classroom.autoAdvance': 'Avtomatik o\'tish',
  'classroom.paceControl': 'Tezlikni boshqarish',
  'classroom.allTogether': 'Hammasi birga',
  'classroom.readAloud': 'Ovoz chiqarib o\'qing',
  'classroom.listenFirst': 'Avval tinglang',
  'classroom.repeatAfterMe': 'Mendan keyin takrorlang',
  'classroom.yourTurn': 'Sizning navbatingiz',
  'classroom.wellDone': 'Barakalla!',
  'classroom.tryAgain': 'Yana urinib ko\'ring',
  'classroom.louder': 'Balandroq',
  'classroom.showOnScreen': 'Ekranda ko\'rsatish',

  // ── Feedback & Encouragement ──
  'feedback.correct': 'To\'g\'ri! ✓',
  'feedback.incorrect': 'Noto\'g\'ri ✗',
  'feedback.almostRight': 'Deyarli to\'g\'ri!',
  'feedback.tryAgain': 'Qayta urinib ko\'ring',
  'feedback.excellent': 'Ajoyib!',
  'feedback.goodJob': 'Yaxshi ish!',
  'feedback.keepPracticing': 'Mashq qilishda davom eting!',
  'feedback.perfectScore': 'Mukammal natija!',
  'feedback.needsImprovement': 'Yaxshilash kerak',

  // ── Vocab Card Renderer (Internal Labels) ──
  'vcr.done': 'Tayyor',
  'vcr.completeCard': '✓ Kartani yakunlash',
  'vcr.continueBtn': 'Davom etish →',
  'vcr.backBtn': '← Ortga',
  'vcr.stageFailed': 'Bosqichni yuklash imkoni bo\'lmadi',
  'vcr.stageFailedHint': 'Keyingi bosqichga o\'ting yoki qayta oching.',
  'vcr.tapToSeeEnglish': '↕ Ingliz tiliga o\'tish',
  'vcr.tapToFlipBack': '↕ Orqaga qaytish',
  'vcr.hybridBridge': '🔀 Aralash ko\'prik',
  'vcr.fullEnglish': 'To\'liq inglizcha',
  'vcr.negative': 'Inkor',
  'vcr.questionForm': 'So\'roq',
  'vcr.grammarRef': '📊 Grammatika ma\'lumoti',
  'vcr.inContext': 'Kontekstda',
  'vcr.unlockMore': '🔒 Qolgan satrlarni ochish uchun lug\'at kartalarini yakunlang',
  'vcr.justUnlocked': '— Yangi ochildi',
  'vcr.listenEnglish': 'Tinglash · Inglizcha',
  'vcr.listenInEnglish': 'Ingliz tilida tinglash',
  'vcr.cardNotReady': 'Bu karta tayyorlanmoqda yoki ma\'lumot yo\'q.',
  'vcr.discoveryLabel': '🔍 KASHFIYOT',
  'vcr.tapSeeRule': '👆 Qoidani ko\'rish uchun bosing',
  'vcr.syntaxScaffold': '🔀 Sintaksis tuzilmasi (Ko\'zgu rejimi)',
  'vcr.ruleLabel': '📏 Qoida',
  'vcr.answerPersonally': 'Sizning navbatingiz — shaxsiy javob bering:',
  'vcr.typeAnswerEnglish': 'Javobingizni ingliz tilida yozing...',
  'vcr.checkAnswer': 'Javobni tekshirish',
  'vcr.noPractice': 'Bu bosqich uchun mashq mavjud emas.',
  'vcr.tapRevealEnglish': 'Inglizchani ko\'rish uchun kartani bosing',
  'vcr.anchor': 'ASOSIY',
  'vcr.tapReveal': '👆 Inglizchani ko\'rish',
  'vcr.englishLabel': '🇬🇧 INGLIZCHA',
  'vcr.exercisePractice': 'MASHQ',
  'vcr.arrangeChunks': 'Bo\'laklarni joylashtiring',
  'vcr.conceptCheckEx': 'Tushunishni tekshirish',
  'vcr.spotError': 'Xatoni toping',
  'vcr.revealWords': 'So\'zlarni oching',
  'vcr.exerciseLabel': '📝 MASHQ',
  'vcr.noExercise': 'Mashq mavjud emas',
  'vcr.noExerciseData': 'Mashq ma\'lumoti mavjud emas',
  'vcr.categorize': 'Bu gapni turkumlang:',
  'vcr.tapToOrder': 'Gap tuzish uchun bo\'laklarni bosing',
  'vcr.correctWellDone': 'To\'g\'ri! Barakalla!',
  'vcr.tryAgainCorrect': 'Qayta urinib ko\'ring. To\'g\'ri javob:',
  'vcr.productionLabel': '✏️ ISHLAB CHIQARISH',
  'vcr.sayInEnglish': 'Ingliz tilida ayting:',
  'vcr.typeHere': 'Javobingizni yozing...',
  'vcr.trapDetected': '⚠️ Tuzoq topildi!',
  'vcr.notQuiteReveal': 'Aniq emas. Qayta urinib ko\'ring yoki javobni ko\'ring.',
  'vcr.modelAnswer': 'Namuna javob:',
  'vcr.dialogueUnlocked': '🔓 Suhbat qatori ochildi!',
  'vcr.personalizationLabel': '🎯 SHAXSIYLASHTIRISH',
  'vcr.noDiscovery': 'Bu karta uchun kashfiyot mashqi yo\'q.',
  'vcr.show': 'Ko\'rsatish',
  'vcr.hide': 'Yashirish',
  'vcr.stagePresentation': '📖 Taqdimot',
  'vcr.stageConceptCheck': '🧠 Tushunchani tekshirish',
  'vcr.stageDiscovery': '🔍 Kashfiyot',
  'vcr.stageDrill': '🏋 Mashq',
  'vcr.stageProduction': '✍ Ishlab chiqarish',
  'vcr.stagePersonalization': '🎯 Shaxsiylashtirish',

  // ── General UI ──
  'ui.loading': 'Yuklanmoqda...',
  'ui.error': 'Xatolik yuz berdi',
  'ui.noData': 'Ma\'lumot topilmadi',
  'ui.score': 'Ball',
  'ui.progress': 'Taraqqiyot',
  'ui.of': 'dan',
  'ui.or': 'yoki',
  'ui.and': 'va',
  'ui.yes': 'Ha',
  'ui.no': 'Yo\'q',
};

const EN = {
  // ── Navigation & Common Buttons ──
  'buttons.next': 'Next',
  'buttons.back': 'Back',
  'buttons.check': 'Check',
  'buttons.continue': 'Continue',
  'buttons.retry': 'Retry',
  'buttons.start': 'Start',
  'buttons.stop': 'Stop',
  'buttons.close': 'Close',
  'buttons.submit': 'Submit',
  'buttons.skip': 'Skip',
  'buttons.done': 'Done',
  'buttons.play': 'Play',
  'buttons.playAll': 'Play All',
  'buttons.playAgain': 'Play Again',
  'buttons.showAnswer': 'Show Answer',
  'buttons.understood': 'Understood',
  'buttons.gotIt': 'Got it!',
  'buttons.tryAgain': 'Try Again',
  'buttons.restart': 'Restart',
  'buttons.review': 'Review',
  'buttons.confirm': 'Confirm',

  // ── Tile Navigation Buttons ──
  'nav.nextVocab': 'Next: Vocabulary',
  'nav.nextDialogue': 'Next: Dialogue',
  'nav.nextPattern': 'Next: Grammar',
  'nav.nextFunction': 'Next: Function',
  'nav.nextControlled': 'Next: Practice',
  'nav.nextWriting': 'Next: Writing',
  'nav.nextListenWrite': 'Next: Listen & Write',
  'nav.nextMistake': 'Next: Mistakes',
  'nav.nextDone': 'Next: Complete',
  'nav.backControlled': 'Back: Practice',
  'nav.stepOf': 'Step {current} of {total}',
  'nav.stage': 'Stage',

  // ── Tile Titles ──
  'tiles.intro': 'Introduction',
  'tiles.vocab': 'Vocabulary',
  'tiles.dialogue': 'Dialogue Practice',
  'tiles.pattern': 'Grammar in Action',
  'tiles.function': 'Function Check',
  'tiles.controlled': 'Controlled Practice',
  'tiles.writing': 'Writing Practice',
  'tiles.listenWrite': 'Listen & Write',
  'tiles.mistake': 'Mistake Awareness',
  'tiles.done': 'Lesson Completed',
  'tiles.unitError': 'Unit Error Check',
  'tiles.grand': 'Grand Practice',

  // ── Vocab Card Modal ──
  'vocab.presentation': 'Presentation',
  'vocab.conceptCheck': 'Concept Check',
  'vocab.discovery': 'Discovery',
  'vocab.drill': 'Drill',
  'vocab.production': 'Production',
  'vocab.personalization': 'Personalization',
  'vocab.stage': 'Stage {current} of {total}',
  'vocab.tapToFlip': 'Tap to flip the card',
  'vocab.typeAnswer': 'Type your answer...',
  'vocab.chooseCorrect': 'Choose the correct answer',
  'vocab.fillBlank': 'Fill in the blank',
  'vocab.makeASentence': 'Make a sentence using this word',
  'vocab.writeYourSentence': 'Write your sentence...',
  'vocab.correct': 'Correct! ✓',
  'vocab.incorrect': 'Incorrect ✗',
  'vocab.tryAgain': 'Try again',
  'vocab.nextCard': 'Next Card',
  'vocab.prevCard': 'Previous Card',
  'vocab.complete': 'Well done! All cards completed!',
  'vocab.exampleSentence': 'Example sentence',
  'vocab.definition': 'Definition',
  'vocab.partOfSpeech': 'Part of speech',
  'vocab.pronunciation': 'Pronunciation',
  'vocab.image': 'Image',
  'vocab.listenAndRepeat': 'Listen and repeat',
  'vocab.wordMeaning': 'Word meaning',
  'vocab.contextClue': 'Context clue',
  'vocab.yourTurn': 'Your turn!',
  'vocab.wellDone': 'Well done!',
  'vocab.keepGoing': 'Keep going!',
  'vocab.almostThere': 'Almost there!',

  // ── Vocab Tile Grid ──
  'vocabTile.title': 'Vocabulary Words',
  'vocabTile.cardsComplete': '{count} cards complete',
  'vocabTile.tapToOpen': 'Tap to open',
  'vocabTile.allComplete': 'All cards complete!',
  'vocabTile.learnedBadge': 'Learned',
  'vocabTile.newBadge': 'New',

  // ── Dialogue Tile ──
  'dialogue.title': 'Dialogue Practice',
  'dialogue.listen': 'Listen',
  'dialogue.read': 'Read',
  'dialogue.practice': 'Practice',
  'dialogue.full': 'Full',
  'dialogue.faded': 'Faded',
  'dialogue.blind': 'Blind',
  'dialogue.startPressure': 'Start Pressure Mode',
  'dialogue.pressureMode': 'LINGUISTIC PRESSURE',
  'dialogue.masterLine': 'Master this line',
  'dialogue.mastered': 'Mastered ✓',
  'dialogue.savol': 'QUESTION',
  'dialogue.javob': 'ANSWER',
  'dialogue.speakerA': 'Speaker A',
  'dialogue.speakerB': 'Speaker B',
  'dialogue.contrastive': 'Contrastive Review',
  'dialogue.discovery': 'Discovery',
  'dialogue.naturalUz': 'Natural UZ',
  'dialogue.mirror': 'Mirror',
  'dialogue.english': 'English',

  // ── Dialogue Re-Practice (Cloze) ──
  'repractice.title': 'Dialogue Re-Practice',
  'repractice.subtitle': 'Fill in the missing words',
  'repractice.stage1': 'Stage 1: Easy (1-2 words missing)',
  'repractice.stage2': 'Stage 2: Medium (3-4 words missing)',
  'repractice.stage3': 'Stage 3: Hard (keywords only)',
  'repractice.fillGaps': 'Fill in the gaps',
  'repractice.tapWord': 'Tap a word or type it',
  'repractice.allCorrect': 'All correct! Excellent!',
  'repractice.someWrong': '{count} wrong. Try again.',
  'repractice.nextStage': 'Next Stage',
  'repractice.complete': 'Re-practice complete!',

  // ── Pattern Tile ──
  'pattern.title': 'Grammar in Action',
  'pattern.spotting': 'Pattern Spotting',
  'pattern.listenRepeat': 'Listen & Repeat',
  'pattern.meaning': 'Meaning',
  'pattern.compare': 'Compare & Notice',
  'pattern.formRules': 'Form Rules',
  'pattern.iSeeIt': 'I see it! →',
  'pattern.understood': 'Understood →',
  'pattern.allReviewed': '✓ All information reviewed',
  'pattern.reviewRules': 'Review Rules ↺',
  'pattern.nextFunction': 'Next: Function →',

  // ── Function Tile ──
  'function.title': 'Function Check',
  'function.dragHere': 'Drop here',
  'function.correct': 'Correct!',
  'function.wrong': 'Wrong, try again',
  'function.matchItems': 'Match the items',
  'function.chooseAnswer': 'Choose the answer',

  // ── Controlled Tile ──
  'controlled.title': 'Controlled Practice',
  'controlled.gap': 'Gap Fill',
  'controlled.reorder': 'Reorder',
  'controlled.pickWord': 'Pick the correct word',
  'controlled.reorderTokens': 'Put the words in order...',
  'controlled.stageProgress': 'Stage {current}/{total}',
  'controlled.passed': 'Passed! At least 80% correct.',
  'controlled.failed': 'Must be at least 80%. Try again.',
  'controlled.score': 'Score: {score}/{max} ({pct}%)',

  // ── Writing Tile ──
  'writing.title': 'Writing Practice',
  'writing.locked': 'Writing (Locked)',
  'writing.unlockMsg': 'Complete all practice stages first.',
  'writing.prompt': 'Write {count} sentences using these words:',
  'writing.placeholder': 'Write your sentence here...',
  'writing.wordCount': 'Word count: {count}',
  'writing.minWords': 'Write at least {min} words',
  'writing.submitted': 'Writing submitted!',
  'writing.feedback': 'Feedback',
  'writing.useVocab': 'Use the vocabulary words',

  // ── Listen & Write Tile ──
  'listenWrite.title': 'Listen & Write',
  'listenWrite.locked': 'Listen & Write (Locked)',
  'listenWrite.unlockMsg': 'Complete the writing exercise first.',
  'listenWrite.listenCarefully': 'Listen carefully and type what you hear',
  'listenWrite.placeholder': 'Type what you hear...',
  'listenWrite.playAudio': 'Play audio',
  'listenWrite.attempts': 'Attempts: {count}',

  // ── Mistake Tile ──
  'mistake.title': 'Mistake Awareness',
  'mistake.wrong': '❌ Wrong',
  'mistake.correct': '✅ Correct',
  'mistake.explanation': 'Explanation',
  'mistake.findError': 'Find the error',
  'mistake.noMistakes': 'No mistakes for this lesson',

  // ── Done Tile ──
  'done.title': '🎉 Lesson Completed!',
  'done.finalScore': '🏆 Final Score',
  'done.score': '{score} / {max} ({pct}%)',
  'done.excellent': 'Excellent! 🌟',
  'done.good': 'Good job! 👍',
  'done.okay': 'Good effort! 💪',
  'done.needsWork': 'Keep practicing! 📚',
  'done.xpEarned': '+{xp} XP earned',
  'done.streakDays': '🔥 {days} day streak',
  'done.nextLesson': 'Next Lesson',
  'done.lessonSelect': 'Lesson List',
  'done.unitComplete': '🎉 Unit Complete!',
  'done.nextUnit': 'Next Unit: {unit}',
  'done.restartLesson': '🔄 Restart Lesson',
  'done.errorCheck': '📊 Unit Error Check',
  'done.tileBreakdown': 'Tile Breakdown',
  'done.completionMessage': 'Mastery stage completed for this lesson. In the full app this unlocks the next lesson or unit stages.',
  'done.newBest': '🎉 New personal best! (Previous: {pct}%)',
  'done.yourBest': 'Your best: {pct}% ({date})',

  // ── Gamification ──
  'gamification.level': 'Level {level}',
  'gamification.levelUp': '🎉 Level Up: {level}!',
  'gamification.xp': '{xp} XP',
  'gamification.streak': '🔥 {days} days',
  'gamification.badgeEarned': '🏆 Badge Earned!',
  'gamification.points': '{pts} points',

  // ── Pair Work ──
  'pairWork.title': '👥 Pair Work',
  'pairWork.instruction': 'Work with your partner',
  'pairWork.studentA': 'Student A',
  'pairWork.studentB': 'Student B',
  'pairWork.switch': 'Switch roles',
  'pairWork.askPartner': 'Ask your partner',
  'pairWork.answerPartner': 'Answer your partner',

  // ── Classroom Mode ──
  'classroom.title': '🏫 Classroom Mode',
  'classroom.autoAdvance': 'Auto advance',
  'classroom.paceControl': 'Pace control',
  'classroom.allTogether': 'All together',
  'classroom.readAloud': 'Read aloud',
  'classroom.listenFirst': 'Listen first',
  'classroom.repeatAfterMe': 'Repeat after me',
  'classroom.yourTurn': 'Your turn',
  'classroom.wellDone': 'Well done!',
  'classroom.tryAgain': 'Try again',
  'classroom.louder': 'Louder',
  'classroom.showOnScreen': 'Show on screen',

  // ── Feedback & Encouragement ──
  'feedback.correct': 'Correct! ✓',
  'feedback.incorrect': 'Incorrect ✗',
  'feedback.almostRight': 'Almost right!',
  'feedback.tryAgain': 'Try again',
  'feedback.excellent': 'Excellent!',
  'feedback.goodJob': 'Good job!',
  'feedback.keepPracticing': 'Keep practicing!',
  'feedback.perfectScore': 'Perfect score!',
  'feedback.needsImprovement': 'Needs improvement',

  // ── Vocab Card Renderer (Internal Labels) ──
  'vcr.done': 'Done',
  'vcr.completeCard': '✓ Complete Card',
  'vcr.continueBtn': 'Continue →',
  'vcr.backBtn': '← Back',
  'vcr.stageFailed': 'Stage failed to load',
  'vcr.stageFailedHint': 'Try the next stage or close and reopen.',
  'vcr.tapToSeeEnglish': '↕ Tap to see full English',
  'vcr.tapToFlipBack': '↕ Tap to flip back',
  'vcr.hybridBridge': '🔀 Hybrid Bridge',
  'vcr.fullEnglish': 'Full English',
  'vcr.negative': 'Negative',
  'vcr.questionForm': 'Question',
  'vcr.grammarRef': '📊 Grammar Reference',
  'vcr.inContext': 'In context',
  'vcr.unlockMore': '🔒 Complete vocab cards to unlock more lines',
  'vcr.justUnlocked': '— Just unlocked',
  'vcr.listenEnglish': 'Listen · English',
  'vcr.listenInEnglish': 'Listen in English',
  'vcr.cardNotReady': 'This card is under construction or missing practice data.',
  'vcr.discoveryLabel': '🔍 DISCOVERY',
  'vcr.tapSeeRule': '👆 Tap to see the rule',
  'vcr.syntaxScaffold': '🔀 Syntax Scaffold (Mirror Mode)',
  'vcr.ruleLabel': '📏 Rule',
  'vcr.answerPersonally': 'Your turn — answer personally:',
  'vcr.typeAnswerEnglish': 'Type your answer in English...',
  'vcr.checkAnswer': 'Check Answer',
  'vcr.noPractice': 'No practice examples available for this stage.',
  'vcr.tapRevealEnglish': 'Tap each card to reveal the English translation',
  'vcr.anchor': 'ANCHOR',
  'vcr.tapReveal': '👆 Tap to reveal English',
  'vcr.englishLabel': '🇬🇧 ENGLISH',
  'vcr.exercisePractice': 'PRACTICE',
  'vcr.arrangeChunks': 'Arrange the chunks',
  'vcr.conceptCheckEx': 'Concept Check',
  'vcr.spotError': 'Spot the Error',
  'vcr.revealWords': 'Reveal Words',
  'vcr.exerciseLabel': '📝 EXERCISE',
  'vcr.noExercise': 'No exercise available',
  'vcr.noExerciseData': 'No exercise data available',
  'vcr.categorize': 'Categorize this sentence:',
  'vcr.tapToOrder': 'Tap chunks to build the sentence',
  'vcr.correctWellDone': 'Correct! Well done!',
  'vcr.tryAgainCorrect': 'Try again. Correct:',
  'vcr.productionLabel': '✏️ PRODUCTION',
  'vcr.sayInEnglish': 'Say in English:',
  'vcr.typeHere': 'Type your answer here...',
  'vcr.trapDetected': '⚠️ Trap Detected!',
  'vcr.notQuiteReveal': 'Not quite. Try again or reveal the answer.',
  'vcr.modelAnswer': 'Model Answer:',
  'vcr.dialogueUnlocked': '🔓 Dialogue Line Unlocked!',
  'vcr.personalizationLabel': '🎯 PERSONALIZATION',
  'vcr.noDiscovery': 'No discovery exercise for this card.',
  'vcr.show': 'Show',
  'vcr.hide': 'Hide',
  'vcr.stagePresentation': '📖 Presentation',
  'vcr.stageConceptCheck': '🧠 Concept Check',
  'vcr.stageDiscovery': '🔍 Discovery',
  'vcr.stageDrill': '🏋 Drill',
  'vcr.stageProduction': '✍ Production',
  'vcr.stagePersonalization': '🎯 Personalization',

  // ── General UI ──
  'ui.loading': 'Loading...',
  'ui.error': 'An error occurred',
  'ui.noData': 'No data found',
  'ui.score': 'Score',
  'ui.progress': 'Progress',
  'ui.of': 'of',
  'ui.or': 'or',
  'ui.and': 'and',
  'ui.yes': 'Yes',
  'ui.no': 'No',
};

// ============================
// LOOKUP FUNCTIONS
// ============================

/**
 * Get Uzbek translation string.
// ── Arabic Dictionary (Partial/Placeholder) ──
const AR = {
  'buttons.next': 'التالي',
  'buttons.back': 'عودة',
  'buttons.check': 'تحقق',
  'buttons.continue': 'استمر',
  'buttons.retry': 'أعد المحاولة',
  'buttons.start': 'ابدأ',
  'buttons.close': 'إغلاق',
  'vocab.correct': 'صحيح! ✓',
  'vocab.incorrect': 'خطأ ✗',
  // Add more as needed. Fallback to Uzbek/English handles gaps.
};

/**
 * Get localized translation string.
 * (Named 'uz' for backward compatibility, but behaves as 't')
 * Supports {placeholder} interpolation.
 * @param {string} key - Dot-separated key (e.g. 'buttons.next')
 * @param {Record<string, string|number>} [params] - Interpolation values
 * @returns {string} Localized string, or key if missing
 */
export function uz(key, params) {
  const lang = getCurrentLanguage();
  let dict = UZ;
  if (lang === 'ar') dict = AR;
  // Add other languages here
  
  let text = dict[key];
  
  // Fallback to Uzbek if missing in target lang
  if (text === undefined && lang !== 'uz') {
     text = UZ[key];
     // Optional: Mark as untranslated? e.g. text = "[AR] " + text;
  }

  if (text === undefined) {
    console.warn(`[i18n] Missing key for ${lang}: "${key}"`);
    return key;
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}

/**
 * Get English translation string.
 * Supports {placeholder} interpolation.
 * @param {string} key - Dot-separated key (e.g. 'buttons.next')
 * @param {Record<string, string|number>} [params] - Interpolation values
 * @returns {string} English string, or key if missing
 */
export function en(key, params) {
  let text = EN[key];
  if (text === undefined) {
    console.warn(`[i18n] Missing EN key: "${key}"`);
    return key;
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}

/**
 * Create a bilingual element — text in Uzbek with English data-translation.
 * @param {string} tag - HTML tag name
 * @param {string} key - i18n key
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLElement}
 */
export function uzEl(tag, key, params) {
  const el = document.createElement(tag);
  el.textContent = uz(key, params);
  el.classList.add('tl-uz');
  el.dataset.translation = en(key, params);
  return el;
}

/**
 * Set an existing element to bilingual Uzbek/English text.
 * @param {HTMLElement} el - Target element
 * @param {string} key - i18n key
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLElement} The same element for chaining
 */
export function uzify(el, key, params) {
  el.textContent = uz(key, params);
  el.classList.add('tl-uz');
  el.dataset.translation = en(key, params);
  return el;
}

/**
 * Create a bilingual button — text in Uzbek with English data-translation.
 * @param {string} key - i18n key
 * @param {Function} onClick - Click handler
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLButtonElement}
 */
export function uzBtn(key, onClick, params) {
  const btn = document.createElement('button');
  btn.className = 'tile-btn primary tl-uz';
  btn.textContent = uz(key, params);
  btn.dataset.translation = en(key, params);
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

// ============================
// BACKWARD COMPATIBILITY — expose as window.getUz / window.getEn
// This fixes the live bug where getUz() returns raw key strings
// ============================
if (typeof window !== 'undefined') {
  window.getUz = uz;
  window.getEn = en;
  window.i18n = { uz, en, uzEl, uzify, uzBtn, UZ, EN };
}
