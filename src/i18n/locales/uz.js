/**
 * Uzbek (O'zbekcha) — UI Translations
 * =====================================
 * Source language for the app. All other locales
 * mirror this key set.
 *
 * @module src/i18n/locales/uz
 */

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
  'nav.backWriting': 'Qaytish: Yozish',
  'nav.backListenWrite': 'Qaytish: Tinglash va yozish',
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

  // ── Controlled Tile (Extended) ──
  'controlled.retryFindWord': 'Qayta urinib ko\'ring. To\'g\'ri so\'zni toping.',
  'controlled.checkOrder': 'Tartibni tekshiring. Gapni to\'g\'ri tuzing.',
  'controlled.minCorrect80': 'Kamida 80% to\'g\'ri bo\'lishi kerak.',
  'controlled.exerciseCount': '{count} ta mashq',
  'controlled.stageInstruction': 'Har bosqich ≥80% to\'plang. {total} bosqichni o\'ting.',
  'controlled.readFirst': '📖 Avval o\'qing:',
  'controlled.readDone': 'O\'qib bo\'ldim ✓',
  'controlled.stageUnlocked': 'Yaxshi. Keyingi bosqich ochildi.',
  'controlled.stageLocked': 'Oldin bu bosqichdan o\'ting (≥80%).',

  // ── Done Tile (Extended) ──
  'done.scoreTitle': '🏆 Yakuniy natija',
  'done.ratingExcellent': 'YAXSHI!',
  'done.ratingOkay': 'QONIQARLI',
  'done.ratingRetry': 'QAYTA URINIB KO\'RING',
  'done.nextLessonBtn': '➡️ Keyingi dars ({name})',
  'done.unitCompleteMsg': '🎉 {unit} yakunlandi! Keyingi unit ochildi.',
  'done.nextUnitBtn': '🚀 Keyingi Unit ({name})',
  'done.completeAllFirst': 'Oldin barcha darslarni yakunlang. Tugallanmagan darslar: {lessons}',
  'done.allLessonsRequired': 'Barcha darslar tugallanishi kerak',

  // ── Writing Tile (Extended) ──
  'writing.gateControlled': 'Oldin CONTROLLED barcha {total} bosqichini yakunlang. Hozirgi bosqich: {current}',
  'writing.writeMinSentences': 'Kamida 2 ta sodda gap yozing (darsdan so\'zlar ishlating).',
  'writing.successFull': '✓ Yaxshi, funksiyani to\'liq ishlatyapsiz.',
  'writing.needMoreSentences': 'Kamida 2 ta gap kerak. Yana {count} ta so\'z yozing.',
  'writing.useTheseWords': 'Bu so\'zlardan ishlating: \'{words}\'.',
  'writing.useMoreVocab': 'Darsdan ko\'proq so\'zlar ishlating.',
  'writing.retryWriting': 'Qayta urinib ko\'ring.',
  'writing.gateWritingSelf': 'Oldin WRITING tile\'dan o\'ting (shartlar bajarilsin).',

  // ── Listen & Write Tile (Extended) ──
  'listenWrite.gateWriting': 'Oldin WRITING bosqichini yakunlang.',
  'listenWrite.fullInstruction': 'Gapni eshiting va aynan shu gapni yozing. Har gapda kamida 60% mos kelishi kerak.',
  'listenWrite.perItemLabel': '[{index}] Gapni eshiting va yozing:',
  'listenWrite.successMsg': 'Juda yaxshi! {correct} to\'g\'ri.',
  'listenWrite.failureMsg': 'Kamida 80% (4/5 gap) to\'g\'ri bo\'lishi kerak. Hozir: {current}',
  'listenWrite.gatePrev': 'Oldin bu mashqni yakunlang (≥80%).',

  // ── Function Tile (Extended) ──
  'function.labelNew': '(Yangi)',
  'function.labelPrevious': '(Oldingi)',

  'function.successDrag': '✓ To\'g\'ri! ({correct}/{total}) Davom eting.',
  'function.failureDrag': '✗ Kamida {needed} to\'g\'ri bo\'lishi kerak. ({correct}/{total})',
  'function.categoryLabel': 'Kategoriya:',
  'function.functionLabel': 'Funksiya:',
  'function.repeatLabel': 'Takror:',
  'function.selectInstruction': 'Har bir gap uchun to\'g\'ri grammatik funksiyani tanlang. Variantlar ustiga kursorni olib boring — misollar ko\'rinadi.',
  'function.minRequired': 'Kamida 66% kerak',
  'function.sectionTitle': 'Funksiya topshiriqlari',
  'function.gateAll': 'Barcha 3 ta topshiriqdan o\'ting (≥66%).',
  'function.finish': 'Tugallash',

  // ── Unit Error Tile (Extended) ──
  'unitError.tileTitle': 'Birlik Xatolarni Aniqlash',
  'unitError.noData': 'Unit error detection ma\'lumotlari topilmadi yoki noto\'g\'ri.',
  'unitError.defaultInstruction': 'Har bir gapni tinglang yoki o\'qing va to\'g\'ri yoki noto\'g\'ri ekanligini aniqlang.',
  'unitError.selectPlaceholder': 'Tanlang',
  'unitError.optionCorrect': 'To\'g\'ri',
  'unitError.optionIncorrect': 'Noto\'g\'ri',
  'unitError.success': 'Yaxshi! Grand Tile ochildi.',
  'unitError.gate': 'Oldin xatolarni aniqlash topshirig\'idan o\'ting (≥{pct}%).',

  // ── Mistake Tile (Extended) ──
  'mistake.fallbackMeta': 'Possessive pronoun ko\'plik qilinmaydi.',
  'mistake.gatePrev': 'Oldin LISTEN_WRITE tile\'ni bajaring.',
  'mistake.labelWrong': 'Noto\'g\'ri:',
  'mistake.labelCorrect': 'To\'g\'ri:',

  // ── Pattern Tile (Extended) ──
  'pattern.grammarDefault': 'Grammatika',
  'pattern.missingContent': 'Grammar/Form mazmuni kiritilmagan (dars uchun talab etiladi).',
  'pattern.listenRepeatTab': '🎧 Tinglang va Takrorlang',
  'pattern.allReviewedMsg': '✓ Barcha ma\'lumotlar ko\'rib chiqildi',
  'pattern.tapInstruction': '👆 Quyidagi gaplardagi muhim so\'zlarni bosing!',
  'pattern.discoveryProgress': '✅ To\'g\'ri! ({found}/{total})',
  'pattern.discoveryHint': '💡 Muhim so\'zlarni toping, keyin qoidani ko\'ramiz.',
  'pattern.listenTip': '💡 Maslahat: 2-3 marta eshiting, keyin ovoz chiqarib takrorlang!',
  'pattern.steps': '1️⃣ <strong>Eshiting</strong> → 2️⃣ <strong>Qaytaring</strong> → 3️⃣ <strong>Taqqoslang</strong>',
  'pattern.listenBtn': '🔊 Eshiting',
  'pattern.slowBtn': '🐢 Sekin',
  'pattern.compareTitle': 'Inglizcha ↔ O\'zbekcha',
  'pattern.awarenessTitle': '🧠 E\'tibor bering',

  // ── Grand Tile ──
  'grand.tileTitle': 'Birlik Yakuniy Topshiriq',
  'grand.noData': 'Grand tile ma\'lumotlari topilmadi.',
  'grand.completeUnit': 'Birlikni yakunlash',
  'grand.fallbackInstruction': 'Birlik topshirig\'ini bajaring.',
  'grand.placeholder': 'Bu yerda yozing...',
  'grand.success': 'Yaxshi! Birlik topshirig\'i muvaffaqiyatli bajarildi.',
  'grand.needMoreWords': 'Dars so\'zlarini ko\'proq ishlating (kamida {count} ta so\'z).',
  'grand.failure': 'Yetarli emas. Qayta urinib ko\'ring.',
  'grand.gate': 'Oldin Grand Tile topshirig\'ini bajaring.',

  // ── Intro Tile (Extended) ──
  'intro.functionLabel': 'Funksiya (UZ): ',
  'intro.semanticLabel': 'Semantik toifa (UZ): ',
  'intro.grammarLabel': 'Grammatika: ',
  'intro.notSet': '(hali o\'rnatilmagan)',

  // ── Transformation Tile ──
  'transformation.scenario': '📖 Vaziyat:',
  'transformation.change': '🔄 O\'zgarish:',
  'transformation.rewrite': '✏️ Gapni qayta yozing:',
  'transformation.placeholder': 'Gapni kiriting...',
  'transformation.checkBtn': 'Tekshirish',
  'transformation.correct': '✓ To\'g\'ri!',
  'transformation.incorrect': '✗ Qayta urinib ko\'ring',
  'transformation.correctAnswer': 'To\'g\'ri javob: ',

  // ── Vocab Tile (Extended) ──
  'vocabTile.wordsProgress': 'So\'zlar: <strong>{completed}</strong> / {total}',
  'vocabTile.learnWords': 'So\'zlarni o\'rganing ({completed}/{total})',
  'vocabTile.dialogueInstruction': '📖 Suhbatni o\'qing — so\'zlarni bosib o\'rganing',

  // ── Dialogue Tile (Extended) ──
  'dialogue.listenGrammar': '💬 Suhbatni tinglang va grammatikaga e\'tibor bering:',
  'dialogue.listenFirstInstruction': '👂 Avval suhbatni tinglang, keyin gapirishga o\'ting:',
  'dialogue.readGrammar': '📖 Suhbatni o\'qing va grammatikaga e\'tibor bering:',
  'dialogue.repeatLines': '🎤 Dialogdagi gaplarni takrorlang:',
  'dialogue.showUzTranslation': '👁️ O\'zbek tarjimasini ko\'rish',

  // ── Dialogue Practice Tile (Extended) ──
  'dialoguePractice.uzTranslation': 'O\'zbek tarjimasi',
  'dialoguePractice.inUzbek': 'O\'zbek tilida',
  'dialoguePractice.readInUzbek': '💬 Xuddi shu suhbatni o\'zbek tilida o\'qing:',

  // ── Mission Briefing ──
  'missionBriefing.skip': 'O\'tkazib yuborish →',
  'missionBriefing.title': 'Dialogga tayyorgarlik',
  'missionBriefing.subtitle': 'So\'zlarni to\'g\'ri tartibga qo\'ying',
  'missionBriefing.checkBtn': 'Tekshirish ✓',
  'missionBriefing.translateInstruction': 'O\'zbek tilidagi gapni ingliz tiliga tarjima qiling:',
  'missionBriefing.dropZone': 'So\'zlarni shu yerga torting...',
  'missionBriefing.correct': '🎉 To\'g\'ri! Zo\'r!',
  'missionBriefing.complete': '🏆 Tayyorgarlik tugadi! Dialogga o\'taylik!',
  'missionBriefing.incorrect': '❌ Qaytadan urinib ko\'ring',
  'missionBriefing.hint': '💡 Birinchi so\'z: "{word}"',

  // ── XP Display ──
  'xpDisplay.level': 'Daraja',
  'xpDisplay.levelUp': 'DARAJA KO\'TARILDI!',
  'xpDisplay.levelUpSubtitle': 'Siz yangi darajaga yetdingiz!',
  'xpDisplay.levelUpBtn': 'Zo\'r! Davom etamiz',

  // ── Activity Context Card ──
  'activityCard.intro.label': 'Kirish',
  'activityCard.intro.desc': 'Ushbu dars nimaga bag\'ishlangan ekanligini bilib oling',
  'activityCard.vocab.label': 'Lug\'at',
  'activityCard.vocab.desc': 'Kartochkalar bilan yangi so\'zlarni o\'rganing',
  'activityCard.dialogue.label': 'Suhbat',
  'activityCard.dialogue.desc': 'Ona tilida so\'zlashuvchilar bilan suhbat mashq qiling',
  'activityCard.pattern.label': 'Grammatik qoida',
  'activityCard.pattern.desc': 'Grammatik qoidalarni taniw va ishlating',
  'activityCard.function.label': 'Tekshirish',
  'activityCard.function.desc': 'Grammatik funksiyalarni tushunishingizni tekshiring',
  'activityCard.controlled.label': 'Nazorat mashqi',
  'activityCard.controlled.desc': 'Bo\'shliqlarni to\'ldiring va gaplarni tartiblang',
  'activityCard.writing.label': 'Erkin yozish',
  'activityCard.writing.desc': 'O\'zingizning gapingizni yozing',
  'activityCard.listenWrite.label': 'Eshiting va yozing',
  'activityCard.listenWrite.desc': 'Tinglang va eshitganingizni yozing',
  'activityCard.mistake.label': 'Xatolarni tuzatish',
  'activityCard.mistake.desc': 'Xatolarni toping va tuzating',
  'activityCard.done.label': 'Tugallandi!',
  'activityCard.done.desc': 'Siz bu darsni tugatdingiz!',
  'activityCard.startBtn': 'Boshlash →',
  'activityCard.dismissHint': 'Yoki Enter bosing',
  'activityCard.minutes': '~{min} daqiqa',

  // ── Instruction Banner ──
  'instructionBanner.label': 'Ko\'rsatma',

  // ── UI Builders ──
  'uiBuilders.completeUnitFirst': 'Oldin Unit {unit} ni yakunlang.',
  'uiBuilders.completeLessonFirst': 'Oldin Lesson {lesson} ni yakunlang.',

  // ── Grammar Helpers ──
  'helpers.articleNeeded': 'Artikl kerak!',
  'helpers.checkArticle': 'Qaysi artikl kerakligini tekshiring',
  'helpers.prepositionNeeded': 'Bu yerda predlog kerak',
  'helpers.checkWordOrder': 'So\'z tartibini tekshiring',

  // ── App ──
  'app.resetConfirm': '⚠️ Bu barcha progressni o\'chiradi. Davom etasizmi?',

  // ── UI Redesign ──
  'uiRedesign.instructionTitle': '💡 Ko\'rsatma (Instruction)',

  // ── Instruction Banner (Extended) ──
  'instructionBanner.audioBtn': '🔊 Tinglash',
  'instructionBanner.audioTitle': 'Ko\'rsatmani tinglash',

  // ── Grammar PPP ──
  'grammarPpp.ccqHint': '🤔 Yana o\'ylab ko\'ring...',
  'grammarPpp.correct': '✅ To\'g\'ri!',
  'grammarPpp.tryAgain': '❌ Qaytadan o\'ylab ko\'ring',

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

  // ── Common Aliases (used by function-tile, grand-tile, unit-error-tile) ──
  'common.buttons.check': 'Tekshirish',
  'common.buttons.continue': 'Davom etish',
  'common.buttons.retry': 'Qayta urinish',
  'common.labels.dataNotFound': 'Ma\'lumot topilmadi',
  'common.placeholders.writeHere': 'Shu yerga yozing...',

  // ── Function Tile (Subtasks) ──
  'functionTile.subtask1.title': '1-topshiriq: Kategoriya moslashtirish',
  'functionTile.subtask1.instruction': 'Elementlarni tegishli kategoriyaga torting',
  'functionTile.subtask2.title': '2-topshiriq: Gap-funksiya moslashtirish',
  'functionTile.subtask2.instruction': 'Har bir gapni to\'g\'ri funksiyaga moslang',
  'functionTile.subtask3.title': '3-topshiriq: Takroriy funksiya esga tushirish',
  'functionTile.subtask3.instruction': 'Gaplarni hozirgi yoki oldingi birlik bo\'yicha tasniflang',
  'functionTile.feedback.summaryComplete': '✓ Barcha topshiriqlar bajarildi!',
  'functionTile.notSet': 'Funksiya topshiriqlari sozlanmagan',

  // ── Error Detection Tile ──
  'errorDetectionTile.continueGrand': 'Katta mashqqa o\'tish',
  'errorDetectionTile.feedback.noQuestions': 'Savollar topilmadi',
  'errorDetectionTile.feedback.someWrong': 'Ba\'zi javoblar noto\'g\'ri.',
  'errorDetectionTile.options.correct': 'To\'g\'ri',
  'errorDetectionTile.options.incorrect': 'Noto\'g\'ri',

  // ── Grand Tile (Extended) ──
  'grandTile.samplesLabel': 'Namuna javoblar:',
  'grandTile.feedback.tooShort': 'Juda qisqa. Kamida {min} ta so\'z yozing.',
  'grandTile.feedback.requiredMissing': 'Quyidagi so\'zlarni ishlating: {words}',

  // ── VCR Fallbacks ──
  'vcr.discoveryDefault': 'Gapni o\'qing va muhim so\'zlarni toping',
  'vcr.fallbackDiscovery': 'Bu gapda qoidani toping',
  'vcr.fallbackFailure': 'To\'g\'ri emas. Qayta urinib ko\'ring.',
  'feedback.tryUsingTarget': 'Maqsadli shaklni ishlating',

  // ── Dialogue Tile (Discovery) ──
  'dialogue.discoverPattern': '💡 Namunani toping',
  'dialogue.discoveryTitle': '💡 Kashfiyot',
  'dialogue.stageLabel': 'Bosqich {stage}: {form}',
  'dialogue.audioTitle': 'Tinglash',

  // ── Pattern Tile (Extended) ──
  'pattern.examplesLabel': 'Misollar:',

  // ── Listen-Write Tile (Extended) ──
  'listenWrite.noSentences': 'Diktant uchun gaplar topilmadi.',
  'listenWrite.inputPlaceholder': 'Eshitgan gapingizni yozing...',

  // ── Controlled Tile (Extended) ──
  'controlled.reorderInstruction': 'To\'g\'ri gapni tuzish uchun so\'zlarni tartiblang:',
  'controlled.gapPlaceholder': 'Tushirilgan so\'zni yozing...',
  'controlled.noItems': 'Mashq elementlari topilmadi.',

  // ── Function Tile (MCQ / Debug) ──
  'function.mcqTitle': '📝 Funksiya tekshiruvi – MCQ',
  'function.checkResult': '✓ Funksiya tekshiruvi: {correct}/{total} ({pct}%)',
  'function.noCheckItems': 'Funksiya tekshiruv savollari sozlanmagan.',
  'function.contextLabel': '💬 Kontekst:',
  'function.conceptLabel': 'Konsept topshiriqlari (faqat o\'qish):',

  // ── UI Redesign (Extended) ──
  'uiRedesign.selectUnit': 'Darslarni ko\'rish uchun birlikni tanlang',
  'uiRedesign.lessonsAfterUnit': 'Birlik tanlagandan keyin darslar yuklanadi',
  'uiRedesign.stepIndicator': 'QADAM {current} / {total}',
  'uiRedesign.completePrevUnit': 'Avval oldingi birlikni yakunlang.',

  // ── Navigation (Extended) ──
  'nav.backButton': '← Ortga',

  // ── Vocab Tile (Navigation) ──
  'vocab.backToVocab': 'Lug\'atga qaytish',
  'vocab.nextDialoguePractice': 'Keyingisi: Suhbat mashqi',
  'vocab.dialogueNotFound': 'Bu dars uchun suhbat topilmadi.',

  // ── Transformation Tile (Title) ──
  'transformation.tileTitle': 'Matnni o\'zgartirish — Shakl Ma\'noga javob beradi',

  // ── Unit Error Tile (Extended) ──
  'unitError.skipGrand': 'Grand Tile ga o\'tish',
  'unitError.gapLabel': 'Gap {index}: {text}',
  'unitError.sentenceLabel': 'Gap {index}: {text}',
  'unitError.dataInvalid': 'Xato aniqlash ma\'lumotlari topilmadi yoki noto\'g\'ri.',

  // ── UI ──
  'ui.selectLanguage': 'Tilni tanlang',

  // ── Grammar PPP (Extended) ──
  'grammarPpp.tryAgainFormat': '❌ Qayta urinib ko\'ring ({answer})',
  'grammarPpp.sentencePlaceholder': 'Gapingizni yozing...',
  'grammarPpp.buildPlaceholder': 'Gapingizni shu yerda yarating...',
  'grammarPpp.conversationPlaceholder': 'Suhbatingizni yozing... (O\'rgangan grammatikamizdan foydalaning!)',
  'grammarPpp.greatJob': '🎉 Ajoyib!',
  'grammarPpp.submitSentence': 'Gapni yuborish',
  'grammarPpp.practiceConversation': 'Suhbatni mashq qilish',

  // ── Writing Tile (Extended) ──
  'writing.fallbackInstruction': 'Kamida 2 ta oddiy gap yozing (dars so\'zlarini ishlating).',

  // ── Grand Tile (Labels) ──
  'grand.finishUnit': 'Birlikni yakunlash',
  'grand.taskInstruction': 'Birlik topshirig\'ini bajaring.',

  // ── Pattern (Kengaytirilgan) ──
  'pattern.crossLangNote': 'Tillararo eslatma',

  // ── Grammar PPP (Kengaytirilgan) ──
  'grammarPpp.completeBtn': 'Yakunlash ✅',
  'grammarPpp.nextBtn': 'Keyingisi ➡',
  'grammarPpp.wellDoneSummary': 'Ajoyib! Siz grammatik namunani mashq qildingiz!',
  'grammarPpp.wordBankTitle': "So'z banki",
  'grammarPpp.yourSentences': 'Sizning jumlalaringiz:',

  // ── Mistake (Kengaytirilgan) ──
  'mistake.finishBtn': 'Yakunlash',

  // ── Intro (EN tooltip yorliqlari) ──
  'intro.functionEnLabel': 'Funksiya (EN): ',
  'intro.semanticEnLabel': 'Semantik kategoriya (EN): ',
  'intro.grammarEnLabel': 'Grammatik tuzilma: ',
  'intro.notSetLabel': 'Belgilanmagan',

  // ── Transformation (Kengaytirilgan) ──
  'transformation.progressLabel': '{passed} / {total} bajarildi',

  // ── Writing (Kengaytirilgan) ──
  'writing.checkConsoleMsg': "Konsolni tekshiring. Sizga ko'proq so'zlar yoki dars lug'ati kerak.",

  // ── Suhbat (Bosim rejimi) ──
  'dialogue.masteryChallenge': 'Ustash sinovi \u2014 Yakuniy urinish',
  'dialogue.pressureReplay': 'Suhbat takrori \u2014 Bosim rejimi',
  'dialogue.pressureDesc': 'Xuddi shu suhbat audioli takrorlanadi. Matn 800ms dan keyin yo\'qoladi \u2014 har bir qatorni xotiradan aytish uchun 2 soniyangiz bor.',
  'dialogue.vanish': "O'chirish",
  'dialogue.deadline': 'Muddat',
  'dialogue.linesLabel': 'Qatorlar',
  'dialogue.keyVocab': "\ud83d\udcda Asosiy lug'at:",
  'dialogue.formA': 'A shakli',
  'dialogue.formB': 'B shakli',
  'dialogue.fallbackTitle': 'Suhbat mashqi',

  // ── Lug'at mashqlari ──
  'vocabExercise.jumbleTitle': "\ud83e\udde9 <strong>Aralash</strong> \u2014 So'zlarni to'g'ri tartibda bosing",
  'vocabExercise.checkAnswer': '\u2713 Javobni tekshirish',
  'vocabExercise.correct': "\u2713 To'g'ri!",
  'vocabExercise.tryAgain': "\u2717 Qayta urinib ko'ring",
  'vocabExercise.trapTitle': '\ud83e\udea4 <strong>Tuzoq</strong> \u2014 Xatoni toping',
  'vocabExercise.showExplanation': "\ud83d\udd0d Tushuntirishni ko'rsatish",
  'vocabExercise.explanationShown': "\u2713 Tushuntirish ko'rsatildi",
  'vocabExercise.scratchTitle': "\ud83c\udfaf <strong>Qirish</strong> \u2014 Yashirin so'zlarni ochish uchun bosing",

  // ── Funksiya plitasi (dataset.translation) ──
  'function.mcqInstruction': "Har bir gap uchun to'g'ri grammatik funksiyani tanlang. Misollarni ko'rish uchun variantlar ustiga olib boring.",
  'function.tasksTitle': 'Funksional topshiriqlar',
  'function.passThreshold': '3 ta topshiriqni bajaring (\u226566%).',
  'function.patternsLabel': 'Namunalar:',
  'function.sentencesLabel': 'Gaplar:',
  'function.optionsLabel': 'Variantlar: ',
  'function.allCompleted': '\u2713 Barcha topshiriqlar bajarildi!',
  'function.failPrefix': '\u2717 Funksiya tekshiruvi: ',
  'function.atLeast66': 'Kamida 66% talab qilinadi',

  // ── Grammar PPP (Yakunlash) ──
  'grammarPpp.congratulations': 'Tabriklaymiz!',
  'grammarPpp.completedLesson': 'Siz PPP Grammatika darsini muvaffaqiyatli yakunladingiz!',
  'grammarPpp.finalScore': 'Yakuniy ball: {score} \u2b50',
  'grammarPpp.closeContinue': 'Yopish va davom etish',
  'grammarPpp.goodSentence': "\u2713 Yaxshi gap!",
  'grammarPpp.writeLonger': 'Uzunroq gap yozing',
  'grammarPpp.excellentConv': "Ajoyib suhbat! Siz grammatikani to'g'ri ishlatdingiz.",
  'grammarPpp.allCorrectDrag': "\ud83c\udf89 Hammasi to'g'ri!",
  'grammarPpp.timelineCorrect': "\ud83c\udf89 To'g'ri! Keling, vaqt chizig'ida ko'ring...",

  // ── Vocab plitasi (SRS + Boshqa) ──
  'vocab.reviewNow': '\ud83d\udd25 Hozir takrorlang',
  'vocab.dueTomorrow': '\u23f1 Ertaga',
  'vocab.sandwichDesc': "Suhbatni o'qing \u2014 so'zlarni o'rganish uchun ajratilgan qatorlarni bosing",

  // ── Eshitish-Yozish (Kengaytirilgan) ──
  'listenWrite.listenBtn': 'Tinglash',

  // ── Lug'at karta renderlash ──
  'vcr.correctWellDone': "\u2014 To'g'ri! Ajoyib!",

  // \u2500\u2500 Controlled (Maslahatlar) \u2500\u2500
  'controlled.hintStartsWith': '\ud83d\udca1 Maslahat: "{letter}" bilan boshlanadi...',
  'controlled.hintWordLength': "\ud83d\udca1 Maslahat: So'z uzunligi {length} harf.",
  'controlled.hintCheckSpelling': '\ud83d\udca1 Maslahat: Imloni tekshiring.',
  'controlled.hintFirstWord': "\ud83d\udca1 Maslahat: Birinchi so'z \"{word}\" bo'lishi kerak.",
  'controlled.hintLastWord': "\ud83d\udca1 Maslahat: Oxirgi so'z \"{word}\" bo'lishi kerak.",
  'controlled.hintMiddleWords': "\ud83d\udca1 Maslahat: O'rtadagi so'zlarni tekshiring.",

  // \u2500\u2500 Lug'at (SRS kengaytirilgan) \u2500\u2500
  'vocab.nextDue': '\u2713 Keyingisi: {date}',
  'vocab.linesMastered': "{mastered} / {total} qatorlar o'zlashtirildi",

  // \u2500\u2500 Navigatsiya (Breadcrumb) \u2500\u2500
  'nav.breadcrumb': '{unit} \u00b7 {lesson}-dars',

  // \u2500\u2500 Suhbat (Kengaytirilgan) \u2500\u2500
  'dialogue.noticeDifference': 'Farqni sezib oling',

  // ── POS tezlik o'yini ──
  'posGame.wordTypes': "So'z turlari:",
  'posGame.score': 'Ball: {score}',
  'posGame.answer': 'Javob:',
  'posGame.retry': "Qayta urinib ko'rish",
  'posGame.nextWord': "Keyingi so'z",
  'posGame.continue': 'Davom etish',
  'posGame.yourScore': 'Sizning ballingiz:',
  'posGame.percentCorrect': "Siz {percent}% to'g'ri javob berdingiz!",
  'posGame.close': 'Yopish',

  // ── Namuna (Kengaytirilgan tablar) ──
  'pattern.interactivePPP': 'Interaktiv PPP dars',
  'pattern.patternSpotting': '📍 Namunani topish',
  'pattern.meaningTab': "💡 Ma'no",
  'pattern.compareTab': "🔄 Taqqoslash va E'tibor",
  'pattern.formRulesTab': '📝 Shakl qoidalari',

  // ── Lug'at (Kengaytirilgan) ──
  'vocab.allCards': "📚 Barcha lug'at kartalari ({count})",
  'vocab.tapToReview': "Ko'rish uchun bosing",
  'vocab.rePractice': 'Bu kartani qayta mashq qilish',
  'vocab.cardsNotLoaded': "Lug'at kartalari yuklanmagan",
  'vocab.cardsNotAvailable': "Interaktiv lug'at kartalari bu versiyada mavjud emas.",

  // ── Nazorat (Kengaytirilgan) ──
  'controlled.translatePrefix': 'Tarjima qiling: ',
  'controlled.repetitionPrefix': 'Takrorlash: ',

  // ── Yakunlash (Kengaytirilgan) ──
  'done.points': 'ball',

  // ── Xato (Kengaytirilgan) ──
  'mistake.locked': '(Qulflangan)',

  // ── Suhbat mashqi (Sarlavha) ──
  'dialoguePractice.subtitle': '"Nima uchun bu shakl?"',

  // ── Tinglash-Yozish (Kengaytirilgan) ──
  'listenWrite.skipTeacher': "🎓 O'tkazib yuborish (O'qituvchi)",

  // ── UI quruvchilar (Kengaytirilgan) ──
  'uiBuilders.lockedUnit': "🔒 Qulflangan: Avval oldingi bo'limni yakunlang",
  'uiBuilders.lockedLesson': '🔒 Qulflangan',

  // ── Grammatika PPP (data-translation) ──
  'grammarPpp.clickWordAction': "Harakatni ko'rsatadigan so'zni bosing!",
  'grammarPpp.foundPattern': 'Siz namunani topdingiz!',
  'grammarPpp.nowOrEveryDay': "Bu HOZIR sodir bo'lyaptimi yoki HAR KUNI?",
  'grammarPpp.whenDoesHappen': "Bu qachon sodir bo'ladi?",
  'grammarPpp.dragMarker': "Markerni sudrab, harakat qachon sodir bo'lishini ko'rsating",
  'grammarPpp.quickCheck': "Tushunishni tez tekshirish",

  // ── Lug'at mashqlari (Kengaytirilgan) ──
  'vocabExercise.fixLabel': "To'g'rilash:",

  // ── Funktsiya (Kengaytirilgan) ──
  'function.subtaskPrefix': 'Topshiriq ',

  // ── Xato (data-translation) ──
  'mistake.explanation': 'Tushuntirish',

  // ── Grammatika PPP (Progress/Timeline) ──
  'grammarPpp.foundProgress': '{found} / {total} topildi',
  'grammarPpp.timelineSuccess': "🎉 To'g'ri! Bu hozir sodir bo'lyapti!",

  // ── Namuna (Zaxira) ──
  'pattern.goalLabel': 'Maqsad:',
  'pattern.commonRuleQuestion': 'Quyidagi gaplarda qanday umumiy qoida bor?',
  'pattern.tapImportantDT': "👆 Quyidagi gaplardagi <u>muhim so'zlarni</u> bosing!",
  'pattern.noticeStructureHint': "💡 Tuzilmani sezdingizmi? Qoidani o'rganamiz.",
  'pattern.findImportantDT': "💡 Muhim so'zlarni toping, keyin qoidani ko'ramiz.",

  // ── Grammatika PPP (Nav/Mashq) ──
  'grammarPpp.previousBtn': '⬅ Oldingi',
  'grammarPpp.scoreLabel': 'Ball:',
  'grammarPpp.nextStepBtn': 'Keyingi ➡',
  'grammarPpp.presentPhase': 'Present',
  'grammarPpp.practicePhase': 'Practice',
  'grammarPpp.producePhase': 'Produce',
  'grammarPpp.presentPhaseUz': 'Taqdim',
  'grammarPpp.practicePhaseUz': 'Mashq',
  'grammarPpp.producePhaseUz': 'Ishlab chiqarish',
  'grammarPpp.checkSentence': 'Tekshirish',
  'grammarPpp.dragInstruction': "So'zlarni to'g'ri joyga suring yoki bosing!",
  'grammarPpp.checkAllBtn': '🔍 Barchasini tekshiring',
  'grammarPpp.wordBankLabel': "So'zlar:",

  // ── Lug'at (Sendvich rejimi) ──
  'vocab.nextDialogueComplete': 'Keyingi: Suhbat ✓',
  'vocab.nextPatternComplete': 'Keyingi: Namuna ✓',
  'vocab.sandwichTitle': "2-qadam – Suhbat (Sendvich)",
  'vocab.scriptLabel': 'Matn:',
  'vocab.fluencyFull': "To'liq",
  'vocab.fluencyFaded': "So'ngan",
  'vocab.fluencyBlind': "Ko'r",
  'vocab.contextOnly': "Faqat kontekst — bu satr uchun lug'at yo'q",
  'vocab.clickToLearn': "Bu satr uchun lug'atni o'rganish uchun bosing yoki Enter tugmasini bosing",
  'vocab.wordsLearned': "✅ {count} so'z o'rganildi",
  'vocab.wordsToLearn': "📝 {count} so'z o'rganish kerak",

  // ── UI qayta dizayn (Kengaytirilgan) ──
  'uiRedesign.learnEnglish': "Ingliz tilini o'rganing",
  'uiRedesign.unitBreadcrumb': "{num}-bo'lim",
  'uiRedesign.lessonBreadcrumb': '{num}-dars',

  // ── UI quruvchilar (Kengaytirilgan) ──
  'uiBuilders.unitLabel': "📚 {num}-bo'lim: {name}",
  'uiBuilders.lessonLabel': '{num}-dars: {name}',

  // ── Namuna (Shablon) ──
  'pattern.templateLabel': 'Namuna shabloni: ',

  // ── Tile Ko'rsatmalari ──
  'instr.intro.icon': '📋',
  'instr.intro.text': "Bu darsda nima o'rganasiz — o'qib chiqing va tayyorlaning.",
  'instr.intro.pairWork': '',

  'instr.vocab.icon': '📚',
  'instr.vocab.text': "Har bir kartani bosing. So'zni tinglang, rasmga qarang, va mashq qiling. Barcha 6 bosqichni yakunlang.",
  'instr.vocab.pairWork': "👥 Sherigingiz bilan navbatma-navbat kartalarni oching. Bir kishi so'zni aytadi, ikkinchisi tarjima qiladi.",

  'instr.dialogue.icon': '💬',
  'instr.dialogue.text': "Suhbatni tinglang va o'qing. 3 bosqich bor: to'liq matn → xiralashgan matn → ko'rinmaydigan matn.",
  'instr.dialogue.pairWork': '👥 Bir kishi "A" rolini, boshqasi "B" rolini olsin. Suhbatni real holda amalda qiling.',

  'instr.pattern.icon': '🔍',
  'instr.pattern.text': "Grammatika qoidasini o'rganing. Misollarni o'qing, qoidani toping, va \"Tushundim\" tugmasini bosing.",
  'instr.pattern.pairWork': "👥 Misollarni sherigingizga ovoz chiqarib o'qing. Qoidani bir-biringizga tushuntiring.",

  'instr.function.icon': '🎯',
  'instr.function.text': "Vazifalarni bajaring: elementlarni moslang yoki to'g'ri javobni tanlang.",
  'instr.function.pairWork': "👥 Bir kishi draggable elementni ko'rsatadi, ikkinchisi to'g'ri joyga qo'yadi.",

  'instr.controlled.icon': '✏️',
  'instr.controlled.text': "Mashq qiling: bo'sh joylarni to'ldiring va so'zlarni to'g'ri tartibga qo'ying. Kamida 80% to'g'ri bo'lishi kerak.",
  'instr.controlled.pairWork': "👥 Birgalikda ishlang — bir kishi gapni o'qiydi, ikkinchisi javob topadi.",

  'instr.writing.icon': '📝',
  'instr.writing.text': "O'rganilgan so'zlarni ishlatib gaplar yozing. Kamida ko'rsatilgan miqdorda so'z ishlating.",
  'instr.writing.pairWork': '👥 Har biringiz gaplar yozing, keyin bir-biringizning gaplarini tekshiring.',

  'instr.listenWrite.icon': '🎧',
  'instr.listenWrite.text': 'Diqqat bilan tinglang va eshitganingizni yozing. Audio tugmasini bir necha marta bosishingiz mumkin.',
  'instr.listenWrite.pairWork': '👥 Bir kishi audio yozadi, ikkinchisi tekshiradi. Keyin almashtirasiz.',

  'instr.mistake.icon': '🔎',
  'instr.mistake.text': "Xatoni toping va to'g'ri shaklini bilib oling. Har bir xatoning tushuntirishini o'qing.",
  'instr.mistake.pairWork': '👥 Bir kishi xato gapni o\'qiydi, ikkinchisi xatoni topadi va tushuntiradi.',

  'instr.done.icon': '🎉',
  'instr.done.text': "Darsni yakunladingiz! Natijangizni ko'ring va keyingi darsga o'ting.",
  'instr.done.pairWork': '',

  'instr.unitError.icon': '📊',
  'instr.unitError.text': "Bo'lim xatolarini tekshiring. Har bir gapda xatoni toping va to'g'rilang.",
  'instr.unitError.pairWork': '👥 Navbatma-navbat gaplarni tekshiring.',

  'instr.grand.icon': '🏆',
  'instr.grand.text': "Katta mashq: ko'rsatmaga qarab uzun javob yozing. O'rganilgan barcha so'z va qoidalarni ishlating.",
  'instr.grand.pairWork': '👥 Birgalikda javobni muhokama qilib yozing.',

  'instr.repractice.icon': '🔄',
  'instr.repractice.text': "Suhbatni qayta mashq qiling. Yo'qolgan so'zlarni toping — har bosqichda qiyinlashadi.",
  'instr.repractice.pairWork': "👥 Bir kishi savol satrini o'qiydi, ikkinchisi javob satrini to'ldiradi.",
};

export default UZ;
