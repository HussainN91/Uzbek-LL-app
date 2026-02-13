/**
 * Arabic (العربية) — UI Translations
 * =====================================
 * @module src/i18n/locales/ar
 */

const AR = {
  // ── Navigation & Common Buttons ──
  'buttons.next': 'التالي',
  'buttons.back': 'عودة',
  'buttons.check': 'تحقق',
  'buttons.continue': 'استمر',
  'buttons.retry': 'أعد المحاولة',
  'buttons.start': 'ابدأ',
  'buttons.stop': 'قف',
  'buttons.close': 'إغلاق',
  'buttons.submit': 'إرسال',
  'buttons.skip': 'تخطي',
  'buttons.done': 'تم',
  'buttons.play': 'تشغيل',
  'buttons.playAll': 'تشغيل الكل',
  'buttons.playAgain': 'تشغيل مرة أخرى',
  'buttons.showAnswer': 'إظهار الجواب',
  'buttons.understood': 'فهمت',
  'buttons.gotIt': 'فهمت!',
  'buttons.tryAgain': 'حاول مرة أخرى',
  'buttons.restart': 'إعادة تشغيل',
  'buttons.review': 'مراجعة',
  'buttons.confirm': 'تأكيد',

  // ── Tile Navigation Buttons ──
  'nav.nextVocab': 'التالي: المفردات',
  'nav.nextDialogue': 'التالي: الحوار',
  'nav.nextPattern': 'التالي: القواعد',
  'nav.nextFunction': 'التالي: التطبيق',
  'nav.nextControlled': 'التالي: ممارسة',
  'nav.nextWriting': 'التالي: الكتابة',
  'nav.nextListenWrite': 'التالي: الاستماع والكتابة',
  'nav.nextMistake': 'التالي: الأخطاء',
  'nav.nextDone': 'التالي: إكمال',
  'nav.backControlled': 'رجوع: ممارسة',
  'nav.backWriting': 'رجوع: الكتابة',
  'nav.backListenWrite': 'رجوع: الاستماع والكتابة',
  'nav.stepOf': 'الخطوة {current} من {total}',
  'nav.stage': 'المرحلة',

  // ── Tile Titles ──
  'tiles.intro': 'مقدمة',
  'tiles.vocab': 'كلمات المفردات',
  'tiles.dialogue': 'ممارسة الحوار',
  'tiles.pattern': 'القواعد في العمل',
  'tiles.function': 'تطبيق عملي',
  'tiles.controlled': 'ممارسة موجهة',
  'tiles.writing': 'ممارسة الكتابة',
  'tiles.listenWrite': 'الاستماع والكتابة',
  'tiles.mistake': 'الوعي بالأخطاء',
  'tiles.done': 'اكتمل الدرس',
  'tiles.unitError': 'فحص خطأ الوحدة',
  'tiles.grand': 'ممارسة شاملة',

  // ── Vocab Card Modal ──
  'vocab.presentation': 'عرض',
  'vocab.conceptCheck': 'نقق من المفهوم',
  'vocab.discovery': 'اكتشاف',
  'vocab.drill': 'تمرين',
  'vocab.production': 'إنتاج',
  'vocab.personalization': 'تخصيص',
  'vocab.stage': 'المرحلة {current} من {total}',
  'vocab.tapToFlip': 'انقر لقلب البطاقة',
  'vocab.typeAnswer': 'اكتب إجابتك...',
  'vocab.chooseCorrect': 'اختر الإجابة الصحيحة',
  'vocab.fillBlank': 'املأ الفراغ',
  'vocab.makeASentence': 'كون جملة باستخدام هذه الكلمة',
  'vocab.writeYourSentence': 'اكتب جملتك...',
  'vocab.correct': 'صحيح! ✓',
  'vocab.incorrect': 'خطأ ✗',
  'vocab.tryAgain': 'حاول مرة أخرى',
  'vocab.nextCard': 'البطاقة التالية',
  'vocab.prevCard': 'البطاقة السابقة',
  'vocab.complete': 'أحسنت! اكتملت جميع البطاقات!',
  'vocab.exampleSentence': 'جملة مثال',
  'vocab.definition': 'تعريف',
  'vocab.partOfSpeech': 'جزء من الكلام',
  'vocab.pronunciation': 'نطق',
  'vocab.image': 'صورة',
  'vocab.listenAndRepeat': 'استمع وكرر',
  'vocab.wordMeaning': 'معنى الكلمة',
  'vocab.contextClue': 'دليل السياق',
  'vocab.yourTurn': 'دورك!',
  'vocab.wellDone': 'أحسنت!',
  'vocab.keepGoing': 'استمر!',
  'vocab.almostThere': 'أوشكت على الانتهاء!',

  // ── Vocab Tile Grid ──
  'vocabTile.title': 'كلمات المفردات',
  'vocabTile.cardsComplete': '{count} بطاقات مكتملة',
  'vocabTile.tapToOpen': 'انقر للفتح',
  'vocabTile.allComplete': 'اكتملت جميع البطاقات!',
  'vocabTile.learnedBadge': 'تم تعلمها',
  'vocabTile.newBadge': 'جديد',

  // ── Dialogue Tile ──
  'dialogue.title': 'ممارسة الحوار',
  'dialogue.listen': 'استمع',
  'dialogue.read': 'اقرأ',
  'dialogue.practice': 'ممارسة',
  'dialogue.full': 'كامل',
  'dialogue.faded': 'باهت',
  'dialogue.blind': 'أعمى',
  'dialogue.startPressure': 'ابدأ وضع الضغط',
  'dialogue.pressureMode': 'ضغط لغوي',
  'dialogue.masterLine': 'أتقن هذا السطر',
  'dialogue.mastered': 'تم الإتقان ✓',
  'dialogue.savol': 'سؤال',
  'dialogue.javob': 'إجابة',
  'dialogue.speakerA': 'المتحدث أ',
  'dialogue.speakerB': 'المتحدث ب',
  'dialogue.contrastive': 'مراجعة مقارنة',
  'dialogue.discovery': 'اكتشاف',
  'dialogue.naturalUz': 'أوزبكي طبيعي',
  'dialogue.mirror': 'مرآة',
  'dialogue.english': 'الإنجليزية',

  // ── Dialogue Re-Practice (Cloze) ──
  'repractice.title': 'إعادة ممارسة الحوار',
  'repractice.subtitle': 'املأ الكلمات المفقودة',
  'repractice.stage1': 'المرحلة 1: سهل (1-2 كلمة مفقودة)',
  'repractice.stage2': 'المرحلة 2: متوسط (3-4 كلمات مفقودة)',
  'repractice.stage3': 'المرحلة 3: صعب (الكلمات الرئيسية فقط)',
  'repractice.fillGaps': 'املأ الفراغات',
  'repractice.tapWord': 'انقر فوق كلمة أو اكتبها',
  'repractice.allCorrect': 'كله صحيح! ممتاز!',
  'repractice.someWrong': '{count} خطأ. حاول مرة أخرى.',
  'repractice.nextStage': 'المرحلة التالية',
  'repractice.complete': 'اكتملت إعادة الممارسة!',

  // ── Pattern Tile ──
  'pattern.title': 'القواعد في العمل',
  'pattern.spotting': 'اكتشاف النمط',
  'pattern.listenRepeat': 'استمع وكرر',
  'pattern.meaning': 'المعنى',
  'pattern.compare': 'قارن ولاحظ',
  'pattern.formRules': 'قواعد الشكل',
  'pattern.iSeeIt': 'أنا أرى ذلك! ←',
  'pattern.understood': 'فهمت ←',
  'pattern.allReviewed': '✓ تمت مراجعة جميع المعلومات',
  'pattern.reviewRules': 'مراجعة القواعد ↺',
  'pattern.nextFunction': 'التالي: التطبيق ←',

  // ── Function Tile ──
  'function.title': 'تطبيق عملي',
  'function.dragHere': 'أفلت هنا',
  'function.correct': 'صحيح!',
  'function.wrong': 'خطأ، حاول مرة أخرى',
  'function.matchItems': 'طابق العناصر',
  'function.chooseAnswer': 'اختر الإجابة',

  // ── Controlled Tile ──
  'controlled.title': 'ممارسة موجهة',
  'controlled.gap': 'ملء الفراغ',
  'controlled.reorder': 'إعادة ترتيب',
  'controlled.pickWord': 'اختر الكلمة الصحيحة',
  'controlled.reorderTokens': 'رتب الكلمات بالترتيب الصحيح...',
  'controlled.stageProgress': 'المرحلة {current}/{total}',
  'controlled.passed': 'نجحت! 80% على الأقل صحيح.',
  'controlled.failed': 'يجب أن يكون 80% على الأقل. حاول مرة أخرى.',
  'controlled.score': 'النتيجة: {score}/{max} ({pct}%)',

  // ── Writing Tile ──
  'writing.title': 'ممارسة الكتابة',
  'writing.locked': 'الكتابة (مقفل)',
  'writing.unlockMsg': 'اكمل جميع مراحل الممارسة أولاً.',
  'writing.prompt': 'اكتب {count} جمل باستخدام هذه الكلمات:',
  'writing.placeholder': 'اكتب جملتك هنا...',
  'writing.wordCount': 'عدد الكلمات: {count}',
  'writing.minWords': 'اكتب {min} كلمات على الأقل',
  'writing.submitted': 'تم تقديم الكتابة!',
  'writing.feedback': 'ردود الفعل',
  'writing.useVocab': 'استخدم كلمات المفردات',

  // ── Listen & Write Tile ──
  'listenWrite.title': 'استمع واكتب',
  'listenWrite.locked': 'استمع واكتب (مقفل)',
  'listenWrite.unlockMsg': 'أكمل تمرين الكتابة أولاً.',
  'listenWrite.listenCarefully': 'استمع بعناية واكتب ما تسمعه',
  'listenWrite.placeholder': 'اكتب ما تسمعه...',
  'listenWrite.playAudio': 'تشغيل الصوت',
  'listenWrite.attempts': 'المحاولات: {count}',

  // ── Mistake Tile ──
  'mistake.title': 'الوعي بالأخطاء',
  'mistake.wrong': '❌ خطأ',
  'mistake.correct': '✅ صحيح',
  'mistake.findError': 'جد الخطأ',
  'mistake.noMistakes': 'لا توجد أخطاء لهذا الدرس',

  // ── Done Tile ──
  'done.title': '🎉 اكتمل الدرس!',
  'done.finalScore': '🏆 النتيجة النهائية',
  'done.score': '{score} / {max} ({pct}%)',
  'done.excellent': 'ممتاز! 🌟',
  'done.good': 'عمل جيد! 👍',
  'done.okay': 'جهد جيد! 💪',
  'done.needsWork': 'استمر في الممارسة! 📚',
  'done.xpEarned': '+{xp} XP مكتسبة',
  'done.streakDays': '🔥 {days} خط يوم',
  'done.nextLesson': 'الدرس التالي',
  'done.lessonSelect': 'قائمة الدروس',
  'done.unitComplete': '🎉 اكتملت الوحدة!',
  'done.nextUnit': 'الوحدة التالية: {unit}',
  'done.restartLesson': '🔄 إعادة تشغيل الدرس',
  'done.errorCheck': '📊 فحص خطأ الوحدة',
  'done.tileBreakdown': 'تفاصيل البطاقة',
  'done.completionMessage': 'اكتملت مرحلة الإتقان لهذا الدرس. في التطبيق الكامل، يفتح هذا مراحل الدرس أو الوحدة التالية.',
  'done.newBest': '🎉 رقم قياسي شخصي جديد! (السابق: {pct}%)',
  'done.yourBest': 'أفضل ما لديك: {pct}% ({date})',

  // ── Gamification ──
  'gamification.level': 'مستوى {level}',
  'gamification.levelUp': '🎉 مستوى أعلى: {level}!',
  'gamification.xp': '{xp} XP',
  'gamification.streak': '🔥 {days} أيام',
  'gamification.badgeEarned': '🏆 حصلت على شارة!',
  'gamification.points': '{pts} نقاط',

  // ── Pair Work ──
  'pairWork.title': '👥 العمل الثنائي',
  'pairWork.instruction': 'اعمل مع شريكك',
  'pairWork.studentA': 'الطالب أ',
  'pairWork.studentB': 'الطالب ب',
  'pairWork.switch': 'تبديل الأدوار',
  'pairWork.askPartner': 'اسأل شريكك',
  'pairWork.answerPartner': 'أجب شريكك',

  // ── Classroom Mode ──
  'classroom.title': '🏫 وضع الفصل',
  'classroom.autoAdvance': 'تقدم تلقائي',
  'classroom.paceControl': 'التحكم في الوتيرة',
  'classroom.allTogether': 'الجميع معاً',
  'classroom.readAloud': 'اقرأ بصوت عالٍ',
  'classroom.listenFirst': 'استمع أولاً',
  'classroom.repeatAfterMe': 'كرر بعدي',
  'classroom.yourTurn': 'دورك',
  'classroom.wellDone': 'أحسنت!',
  'classroom.tryAgain': 'حاول مرة أخرى',
  'classroom.louder': 'بصوت أعلى',
  'classroom.showOnScreen': 'عرض على الشاشة',

  // ── Feedback & Encouragement ──
  'feedback.correct': 'صحيح! ✓',
  'feedback.incorrect': 'خطأ ✗',
  'feedback.almostRight': 'تقريبا صحيح!',
  'feedback.tryAgain': 'حاول مرة أخرى',
  'feedback.excellent': 'ممتاز!',
  'feedback.goodJob': 'عمل جيد!',
  'feedback.keepPracticing': 'استمر في الممارسة!',
  'feedback.perfectScore': 'درجة كاملة!',
  'feedback.needsImprovement': 'يحتاج إلى تحسين',

  // ── Vocab Card Renderer (Internal Labels) ──
  'vcr.done': 'تم',
  'vcr.completeCard': '✓ إكمال البطاقة',
  'vcr.continueBtn': 'استمرار →',
  'vcr.backBtn': '← رجوع',
  'vcr.stageFailed': 'فشل تحميل المرحلة',
  'vcr.stageFailedHint': 'جرب المرحلة التالية أو أغلق وأعد الفتح.',
  'vcr.tapToSeeEnglish': '↕ اضغط لرؤية الإنجليزية بالكامل',
  'vcr.tapToFlipBack': '↕ اضغط للقلب للخلف',
  'vcr.hybridBridge': '🔀 جسر هجين',
  'vcr.fullEnglish': 'إنجليزية كاملة',
  'vcr.negative': 'نفي',
  'vcr.questionForm': 'سؤال',
  'vcr.grammarRef': '📊 مرجع القواعد',
  'vcr.inContext': 'في السياق',
  'vcr.unlockMore': '🔒 أكمل بطاقات المفردات لفتح المزيد من الخطوط',
  'vcr.justUnlocked': '— تم فتحه للتو',
  'vcr.listenEnglish': 'استمع · إنجليزي',
  'vcr.listenInEnglish': 'استمع باللغة الإنجليزية',
  'vcr.cardNotReady': 'هذه البطاقة قيد الإنشاء أو بيانات الممارسة مفقودة.',
  'vcr.discoveryLabel': '🔍 اكتشاف',
  'vcr.tapSeeRule': '👆 اضغط لرؤية القاعدة',
  'vcr.syntaxScaffold': '🔀 هيكل بناء الجملة (وضع المرآة)',
  'vcr.ruleLabel': '📏 قاعدة',
  'vcr.answerPersonally': 'دورك - أجب شخصياً:',
  'vcr.typeAnswerEnglish': 'اكتب إجابتك باللغة الإنجليزية...',
  'vcr.checkAnswer': 'تحقق من الإجابة',
  'vcr.noPractice': 'لا توجد أمثلة ممارسة متاحة لهذه المرحلة.',
  'vcr.tapRevealEnglish': 'اضغط على كل بطاقة للكشف عن الترجمة الإنجليزية',
  'vcr.anchor': 'الأساس',
  'vcr.tapReveal': '👆 اضغط للكشف عن الإنجليزية',
  'vcr.englishLabel': '🇬🇧 الإنجليزية',
  'vcr.exercisePractice': 'ممارسة',
  'vcr.arrangeChunks': 'رتب القطع',
  'vcr.conceptCheckEx': 'فحص المفهوم',
  'vcr.spotError': 'اكتشف الخطأ',
  'vcr.revealWords': 'اكشف الكلمات',
  'vcr.exerciseLabel': '📝 تمرين',
  'vcr.noExercise': 'لا يوجد تمرين متاح',
  'vcr.noExerciseData': 'لا توجد بيانات تمرين متاحة',
  'vcr.categorize': 'صنف هذه الجملة:',
  'vcr.tapToOrder': 'اضغط على القطع لبناء الجملة',
  'vcr.tryAgainCorrect': 'حاول مرة أخرى. الصحيح:',
  'vcr.productionLabel': '✏️ إنتاج',
  'vcr.sayInEnglish': 'قل بالإنجليزية:',
  'vcr.typeHere': 'اكتب إجابتك هنا...',
  'vcr.trapDetected': '⚠️ تم الكشف عن فخ!',
  'vcr.notQuiteReveal': 'ليس تماما. حاول مرة أخرى أو اكشف الإجابة.',
  'vcr.modelAnswer': 'إجابة نموذجية:',
  'vcr.dialogueUnlocked': '🔓 تم فتح سطر الحوار!',
  'vcr.personalizationLabel': '🎯 تخصيص',
  'vcr.noDiscovery': 'لا يوجد تمرين اكتشاف لهذه البطاقة.',
  'vcr.show': 'عرض',
  'vcr.hide': 'إخفاء',
  'vcr.stagePresentation': '📖 عرض',
  'vcr.stageConceptCheck': '🧠 فحص المفهوم',
  'vcr.stageDiscovery': '🔍 اكتشاف',
  'vcr.stageDrill': '🏋 تمرين',
  'vcr.stageProduction': '✍ إنتاج',
  'vcr.stagePersonalization': '🎯 تخصيص',

  // ── Controlled Tile (Extended) ──
  'controlled.retryFindWord': 'حاول مرة أخرى. اعثر على الكلمة الصحيحة.',
  'controlled.checkOrder': 'تحقق من الترتيب. أنشئ الجملة بشكل صحيح.',
  'controlled.minCorrect80': 'يجب أن تكون 80% على الأقل صحيحة.',
  'controlled.exerciseCount': '{count} تمرين',
  'controlled.stageInstruction': 'احصل على ≥80% في كل مرحلة. اجتز {total} مراحل.',
  'controlled.readFirst': '📖 اقرأ أولاً:',
  'controlled.readDone': 'انتهيت من القراءة ✓',
  'controlled.stageUnlocked': 'جيد. المرحلة التالية مفتوحة.',
  'controlled.stageLocked': 'اجتز هذه المرحلة أولاً (≥80%).',

  // ── Done Tile (Extended) ──
  'done.scoreTitle': '🏆 النتيجة النهائية',
  'done.ratingExcellent': 'ممتاز!',
  'done.ratingOkay': 'مقبول',
  'done.ratingRetry': 'حاول مرة أخرى',
  'done.nextLessonBtn': '➡️ الدرس التالي ({name})',
  'done.unitCompleteMsg': '🎉 {unit} اكتمل! الوحدة التالية مفتوحة.',
  'done.nextUnitBtn': '🚀 الوحدة التالية ({name})',
  'done.completeAllFirst': 'أكمل جميع الدروس أولاً. الدروس غير المكتملة: {lessons}',
  'done.allLessonsRequired': 'يجب إكمال جميع الدروس',

  // ── Writing Tile (Extended) ──
  'writing.gateControlled': 'أكمل جميع مراحل CONTROLLED ({total}) أولاً. المرحلة الحالية: {current}',
  'writing.writeMinSentences': 'اكتب جملتين بسيطتين على الأقل (استخدم مفردات الدرس).',
  'writing.successFull': '✓ أحسنت، أنت تستخدم الوظيفة بالكامل.',
  'writing.needMoreSentences': 'تحتاج جملتين على الأقل. اكتب {count} كلمات إضافية.',
  'writing.useTheseWords': 'استخدم هذه الكلمات: \'{words}\'.',
  'writing.useMoreVocab': 'استخدم المزيد من مفردات الدرس.',
  'writing.retryWriting': 'حاول مرة أخرى.',
  'writing.gateWritingSelf': 'أكمل مرحلة WRITING أولاً (استوفِ المتطلبات).',

  // ── Listen & Write Tile (Extended) ──
  'listenWrite.gateWriting': 'أكمل مرحلة WRITING أولاً.',
  'listenWrite.fullInstruction': 'استمع للجملة واكتبها بالضبط. يجب أن تتطابق بنسبة 60% على الأقل لكل جملة.',
  'listenWrite.perItemLabel': '[{index}] استمع واكتب الجملة:',
  'listenWrite.successMsg': 'أحسنت! {correct} صحيحة.',
  'listenWrite.failureMsg': 'يجب أن تكون 80% (4/5 جمل) صحيحة على الأقل. الآن: {current}',
  'listenWrite.gatePrev': 'أكمل هذا التمرين أولاً (≥80%).',

  // ── Function Tile (Extended) ──
  'function.labelNew': '(جديد)',
  'function.labelPrevious': '(سابق)',
  'function.successDrag': '✓ صحيح! ({correct}/{total}) استمر.',
  'function.failureDrag': '✗ يجب أن تكون {needed} صحيحة على الأقل. ({correct}/{total})',
  'function.categoryLabel': 'النوع:',
  'function.functionLabel': 'الاستخدام:',
  'function.repeatLabel': 'تكرار:',
  'function.selectInstruction': 'اختر الإجابة الصحيحة لكل جملة. مرر المؤشر لرؤية الأمثلة.',
  'function.minRequired': 'يجب 66% على الأقل',
  'function.sectionTitle': 'مهام الوظائف',
  'function.gateAll': 'اجتز جميع المهام الثلاث (≥66%).',
  'function.finish': 'إنهاء',

  // ── Unit Error Tile (Extended) ──
  'unitError.tileTitle': 'كشف أخطاء الوحدة',
  'unitError.noData': 'لم يتم العثور على بيانات كشف الأخطاء أو أنها غير صالحة.',
  'unitError.defaultInstruction': 'استمع إلى كل جملة أو اقرأها وحدد ما إذا كانت صحيحة أم خاطئة.',
  'unitError.selectPlaceholder': 'اختر',
  'unitError.optionCorrect': 'صحيح',
  'unitError.optionIncorrect': 'خطأ',
  'unitError.success': 'أحسنت! Grand Tile مفتوح.',
  'unitError.gate': 'اجتز مهمة كشف الأخطاء أولاً (≥{pct}%).',

  // ── Mistake Tile (Extended) ──
  'mistake.fallbackMeta': 'ضمائر الملكية لا تُجمع.',
  'mistake.gatePrev': 'أكمل مرحلة LISTEN_WRITE أولاً.',
  'mistake.labelWrong': 'خطأ:',
  'mistake.labelCorrect': 'صحيح:',

  // ── Pattern Tile (Extended) ──
  'pattern.grammarDefault': 'القواعد',
  'pattern.missingContent': 'لم يتم توفير محتوى القواعد/النموذج (مطلوب للدرس).',
  'pattern.listenRepeatTab': '🎧 استمع وكرر',
  'pattern.allReviewedMsg': '✓ تمت مراجعة جميع المحتوى',
  'pattern.tapInstruction': '👆 انقر على الكلمات المهمة في الجمل أدناه!',
  'pattern.discoveryProgress': '✅ صحيح! ({found}/{total})',
  'pattern.discoveryHint': '💡 اعثر على الكلمات المفتاحية، ثم سنرى القاعدة.',
  'pattern.listenTip': '💡 نصيحة: استمع 2-3 مرات، ثم كرر بصوت عالٍ!',
  'pattern.steps': '1️⃣ <strong>استمع</strong> → 2️⃣ <strong>كرر</strong> → 3️⃣ <strong>قارن</strong>',
  'pattern.listenBtn': '🔊 استمع',
  'pattern.slowBtn': '🐢 بطيء',
  'pattern.compareTitle': 'الإنجليزية ↔ الأوزبكية',
  'pattern.awarenessTitle': '🧠 انتبه',

  // ── Grand Tile ──
  'grand.tileTitle': 'المهمة النهائية للوحدة',
  'grand.noData': 'لم يتم العثور على بيانات Grand tile.',
  'grand.completeUnit': 'إكمال الوحدة',
  'grand.fallbackInstruction': 'أكمل مهمة الوحدة.',
  'grand.placeholder': 'اكتب هنا...',
  'grand.success': 'أحسنت! تم إكمال مهمة الوحدة بنجاح.',
  'grand.needMoreWords': 'استخدم المزيد من مفردات الدرس ({count} كلمة على الأقل).',
  'grand.failure': 'غير كافٍ. حاول مرة أخرى.',
  'grand.gate': 'أكمل مهمة Grand Tile أولاً.',

  // ── Intro Tile (Extended) ──
  'intro.functionLabel': 'ماذا ستتعلم: ',
  'intro.semanticLabel': 'الموضوع: ',
  'intro.grammarLabel': 'القواعد: ',
  'intro.notSet': '(لم يتم تعيينه بعد)',

  // ── Transformation Tile ──
  'transformation.scenario': '📖 الموقف:',
  'transformation.change': '🔄 التغيير:',
  'transformation.rewrite': '✏️ أعد كتابة الجملة:',
  'transformation.placeholder': 'أدخل الجملة...',
  'transformation.checkBtn': 'تحقق',
  'transformation.correct': '✓ صحيح!',
  'transformation.incorrect': '✗ حاول مرة أخرى',
  'transformation.correctAnswer': 'الإجابة الصحيحة: ',

  // ── Vocab Tile (Extended) ──
  'vocabTile.wordsProgress': 'الكلمات: <strong>{completed}</strong> / {total}',
  'vocabTile.learnWords': 'تعلم الكلمات ({completed}/{total})',
  'vocabTile.dialogueInstruction': '📖 اقرأ الحوار — انقر على الكلمات للتعلم',

  // ── Dialogue Tile (Extended) ──
  'dialogue.listenGrammar': '💬 استمع إلى الحوار وانتبه للقواعد:',
  'dialogue.listenFirstInstruction': '👂 استمع إلى الحوار أولاً، ثم تدرب على التحدث:',
  'dialogue.readGrammar': '📖 اقرأ الحوار وانتبه للقواعد:',
  'dialogue.repeatLines': '🎤 كرر عبارات الحوار:',
  'dialogue.showUzTranslation': '👁️ عرض الترجمة الأوزبكية',

  // ── Dialogue Practice Tile (Extended) ──
  'dialoguePractice.uzTranslation': 'الترجمة الأوزبكية',
  'dialoguePractice.inUzbek': 'بالأوزبكية',
  'dialoguePractice.readInUzbek': '💬 اقرأ نفس الحوار بالأوزبكية:',

  // ── Mission Briefing ──
  'missionBriefing.skip': 'تخطي →',
  'missionBriefing.title': 'التحضير للحوار',
  'missionBriefing.subtitle': 'رتب الكلمات بالترتيب الصحيح',
  'missionBriefing.checkBtn': 'تحقق ✓',
  'missionBriefing.translateInstruction': 'ترجم الجملة الأوزبكية إلى الإنجليزية:',
  'missionBriefing.dropZone': 'اسحب الكلمات هنا...',
  'missionBriefing.correct': '🎉 صحيح! رائع!',
  'missionBriefing.complete': '🏆 اكتمل التحضير! لننتقل إلى الحوار!',
  'missionBriefing.incorrect': '❌ حاول مرة أخرى',
  'missionBriefing.hint': '💡 الكلمة الأولى: "{word}"',

  // ── XP Display ──
  'xpDisplay.level': 'المستوى',
  'xpDisplay.levelUp': 'ارتفع المستوى!',
  'xpDisplay.levelUpSubtitle': 'وصلت إلى مستوى جديد!',
  'xpDisplay.levelUpBtn': 'رائع! لنستمر',

  // ── Activity Context Card ──
  'activityCard.intro.label': 'مقدمة',
  'activityCard.intro.desc': 'تعرف على موضوع هذا الدرس',
  'activityCard.vocab.label': 'المفردات',
  'activityCard.vocab.desc': 'تعلم كلمات جديدة بالبطاقات التعليمية',
  'activityCard.dialogue.label': 'الحوار',
  'activityCard.dialogue.desc': 'تدرب على المحادثة مع متحدثين أصليين',
  'activityCard.pattern.label': 'القاعدة النحوية',
  'activityCard.pattern.desc': 'تعرف على القواعد النحوية واستخدمها',
  'activityCard.function.label': 'اختبار',
  'activityCard.function.desc': 'اختبر فهمك للوظائف النحوية',
  'activityCard.controlled.label': 'التمرين المضبوط',
  'activityCard.controlled.desc': 'املأ الفراغات ورتب الجمل',
  'activityCard.writing.label': 'الكتابة الحرة',
  'activityCard.writing.desc': 'اكتب جملك الخاصة',
  'activityCard.listenWrite.label': 'استمع واكتب',
  'activityCard.listenWrite.desc': 'استمع واكتب ما تسمعه',
  'activityCard.mistake.label': 'تصحيح الأخطاء',
  'activityCard.mistake.desc': 'اعثر على الأخطاء وصححها',
  'activityCard.done.label': 'اكتمل!',
  'activityCard.done.desc': 'أنهيت هذا الدرس!',
  'activityCard.startBtn': 'ابدأ →',
  'activityCard.dismissHint': 'أو اضغط Enter',
  'activityCard.minutes': '~{min} دقيقة',

  // ── Instruction Banner ──
  'instructionBanner.label': 'تعليمات',

  // ── UI Builders ──
  'uiBuilders.completeUnitFirst': 'أكمل الوحدة {unit} أولاً.',
  'uiBuilders.completeLessonFirst': 'أكمل الدرس {lesson} أولاً.',

  // ── Grammar Helpers ──
  'helpers.articleNeeded': 'أداة التعريف مطلوبة!',
  'helpers.checkArticle': 'تحقق من أداة التعريف المطلوبة',
  'helpers.prepositionNeeded': 'حرف جر مطلوب هنا',
  'helpers.checkWordOrder': 'تحقق من ترتيب الكلمات',

  // ── App ──
  'app.resetConfirm': '⚠️ سيؤدي هذا إلى مسح جميع التقدم. هل تريد المتابعة؟',

  // ── UI Redesign ──
  'uiRedesign.instructionTitle': '💡 تعليمات',

  // ── Instruction Banner (Extended) ──
  'instructionBanner.audioBtn': '🔊 استمع',
  'instructionBanner.audioTitle': 'استمع إلى التعليمات',

  // ── Grammar PPP ──
  'grammarPpp.ccqHint': '🤔 فكر مرة أخرى...',
  'grammarPpp.correct': '✅ صحيح!',
  'grammarPpp.tryAgain': '❌ حاول مرة أخرى',

  // ── General UI ──
  'ui.loading': 'جار التحميل...',
  'ui.error': 'حدث خطأ',
  'ui.noData': 'لم يتم العثور على بيانات',
  'ui.score': 'النتيجة',
  'ui.progress': 'التقدم',
  'ui.of': 'من',
  'ui.or': 'أو',
  'ui.and': 'و',
  'ui.yes': 'نعم',
  'ui.no': 'لا',

  // ── Common Aliases (used by function-tile, grand-tile, unit-error-tile) ──
  'common.buttons.check': 'تحقق',
  'common.buttons.continue': 'استمر',
  'common.buttons.retry': 'أعد المحاولة',
  'common.labels.dataNotFound': 'لم يتم العثور على بيانات',
  'common.placeholders.writeHere': 'اكتب هنا...',

  // ── Function Tile (Subtasks) ──
  'functionTile.subtask1.title': 'المهمة 1: ربط الفئات',
  'functionTile.subtask1.instruction': 'اسحب العناصر إلى الفئة الصحيحة',
  'functionTile.subtask2.title': 'المهمة 2: مطابقة الجملة والوظيفة',
  'functionTile.subtask2.instruction': 'طابق كل جملة مع وظيفتها الصحيحة',
  'functionTile.subtask3.title': 'المهمة 3: استرجاع الوظائف المعاد تدويرها',
  'functionTile.subtask3.instruction': 'صنف الجمل حسب الوحدة الحالية أو السابقة',
  'functionTile.feedback.summaryComplete': '✓ اكتملت جميع المهام!',
  'functionTile.notSet': 'لم يتم تكوين مهام الوظيفة',

  // ── Error Detection Tile ──
  'errorDetectionTile.continueGrand': 'الانتقال إلى المهمة الكبرى',
  'errorDetectionTile.feedback.noQuestions': 'لا توجد أسئلة متاحة',
  'errorDetectionTile.feedback.someWrong': 'بعض الإجابات غير صحيحة.',
  'errorDetectionTile.options.correct': 'صحيح',
  'errorDetectionTile.options.incorrect': 'خطأ',

  // ── Grand Tile (Extended) ──
  'grandTile.samplesLabel': 'إجابات نموذجية:',
  'grandTile.feedback.tooShort': 'قصير جداً. اكتب {min} كلمة على الأقل.',
  'grandTile.feedback.requiredMissing': 'استخدم الكلمات المطلوبة التالية: {words}',

  // ── VCR Fallbacks ──
  'vcr.discoveryDefault': 'اقرأ الجملة واعثر على الكلمات المفتاحية',
  'vcr.fallbackDiscovery': 'اعثر على النمط في هذه الجملة',
  'vcr.fallbackFailure': 'ليس صحيحاً تماماً. حاول مرة أخرى.',
  'feedback.tryUsingTarget': 'حاول استخدام النمط المستهدف',

  // ── Dialogue Tile (Discovery) ──
  'dialogue.discoverPattern': '💡 اكتشف النمط',
  'dialogue.discoveryTitle': '💡 اكتشاف',
  'dialogue.stageLabel': 'المرحلة {stage}: {form}',
  'dialogue.audioTitle': 'استمع',

  // ── Pattern Tile (Extended) ──
  'pattern.examplesLabel': 'أمثلة:',

  // ── Listen-Write Tile (Extended) ──
  'listenWrite.noSentences': 'لا توجد جمل متاحة للإملاء.',
  'listenWrite.inputPlaceholder': 'اكتب الجملة التي تسمعها...',

  // ── Controlled Tile (Extended) ──
  'controlled.reorderInstruction': 'رتب الكلمات لتكوين جملة صحيحة:',
  'controlled.gapPlaceholder': 'اكتب الكلمة المفقودة...',
  'controlled.noItems': 'لا توجد عناصر تدريب متاحة.',

  // ── Function Tile (MCQ / Debug) ──
  'function.mcqTitle': '📝 فحص الوظيفة – MCQ',
  'function.checkResult': '✓ فحص الوظيفة: {correct}/{total} ({pct}%)',
  'function.noCheckItems': 'لم يتم تعيين عناصر فحص الوظيفة.',
  'function.contextLabel': '💬 سياق:',
  'function.conceptLabel': 'المهام الفرعية المفاهيمية (للقراءة فقط):',

  // ── UI Redesign (Extended) ──
  'uiRedesign.selectUnit': 'اختر الوحدة لعرض الدروس',
  'uiRedesign.lessonsAfterUnit': 'تحميل الدروس بعد اختيار الوحدة',
  'uiRedesign.stepIndicator': 'الخطوة {current} من {total}',
  'uiRedesign.completePrevUnit': 'أكمل الوحدة السابقة أولاً.',

  // ── Navigation (Extended) ──
  'nav.backButton': '← رجوع',

  // ── Vocab Tile (Navigation) ──
  'vocab.backToVocab': 'العودة إلى المفردات',
  'vocab.nextDialoguePractice': 'التالي: ممارسة الحوار',
  'vocab.dialogueNotFound': 'لم يتم العثور على حوار لهذا الدرس.',

  // ── Transformation Tile (Title) ──
  'transformation.tileTitle': 'تحويل النص — الشكل يستجيب للمعنى',

  // ── Unit Error Tile (Extended) ──
  'unitError.skipGrand': 'تخطي إلى المهمة الكبرى',
  'unitError.gapLabel': 'جملة {index}: {text}',
  'unitError.sentenceLabel': 'جملة {index}: {text}',
  'unitError.dataInvalid': 'لم يتم العثور على بيانات اكتشاف الأخطاء أو غير صالحة.',

  // ── UI ──
  'ui.selectLanguage': 'اختر لغتك',

  // ── Grammar PPP (Extended) ──
  'grammarPpp.tryAgainFormat': '❌ حاول مرة أخرى ({answer})',
  'grammarPpp.sentencePlaceholder': 'اكتب جملتك هنا...',
  'grammarPpp.buildPlaceholder': 'ابنِ جملتك هنا...',
  'grammarPpp.conversationPlaceholder': 'اكتب محادثتك هنا... (استخدم القواعد التي تعلمناها!)',
  'grammarPpp.greatJob': '🎉 عمل رائع!',
  'grammarPpp.submitSentence': 'إرسال الجملة',
  'grammarPpp.practiceConversation': 'ممارسة المحادثة',

  // ── Writing Tile (Extended) ──
  'writing.fallbackInstruction': 'اكتب جملتين بسيطتين على الأقل (استخدم كلمات الدرس).',

  // ── Grand Tile (Labels) ──
  'grand.finishUnit': 'إنهاء الوحدة',
  'grand.taskInstruction': 'أكمل مهمة الوحدة.',

  // ── Pattern (موسّع) ──
  'pattern.crossLangNote': 'ملاحظة عبر اللغات',

  // ── Grammar PPP (موسّع) ──
  'grammarPpp.completeBtn': 'إكمال ✅',
  'grammarPpp.nextBtn': 'التالي ➡',
  'grammarPpp.wellDoneSummary': 'أحسنت! لقد تدربت على نمط القواعد!',
  'grammarPpp.wordBankTitle': 'بنك الكلمات',
  'grammarPpp.yourSentences': 'جملك:',

  // ── Mistake (موسّع) ──
  'mistake.finishBtn': 'إنهاء',

  // ── Intro (تسميات tooltip بالإنجليزية) ──
  'intro.functionEnLabel': '(EN) ماذا ستتعلم: ',
  'intro.semanticEnLabel': '(EN) الموضوع: ',
  'intro.grammarEnLabel': 'البنية النحوية: ',
  'intro.notSetLabel': 'غير محدد',

  // ── Transformation (موسّع) ──
  'transformation.progressLabel': '{passed} / {total} مكتمل',

  // ── Writing (موسّع) ──
  'writing.checkConsoleMsg': 'تحقق من وحدة التحكم للتفاصيل. تحتاج إلى المزيد من الكلمات أو مفردات الدرس.',

  // ── الحوار (وضع الضغط) ──
  'dialogue.masteryChallenge': 'تحدي الإتقان — المحاولة الأخيرة',
  'dialogue.pressureReplay': 'إعادة الحوار — وضع الضغط',
  'dialogue.pressureDesc': 'يتم إعادة تشغيل نفس الحوار مع الصوت. يختفي النص بعد 800ملي ثانية — لديك ثانيتان لإنتاج كل سطر من الذاكرة.',
  'dialogue.vanish': 'اختفاء',
  'dialogue.deadline': 'المهلة',
  'dialogue.linesLabel': 'السطور',
  'dialogue.keyVocab': '📚 المفردات الرئيسية:',
  'dialogue.formA': 'الشكل A',
  'dialogue.formB': 'الشكل B',
  'dialogue.fallbackTitle': 'ممارسة الحوار',

  // ── تمارين المفردات ──
  'vocabExercise.jumbleTitle': '🧩 <strong>خلط</strong> — اضغط على الكلمات بالترتيب الصحيح',
  'vocabExercise.checkAnswer': '✓ تحقق من الإجابة',
  'vocabExercise.correct': '✓ صحيح!',
  'vocabExercise.tryAgain': '✗ حاول مرة أخرى',
  'vocabExercise.trapTitle': '🪤 <strong>فخ</strong> — اكتشف الخطأ',
  'vocabExercise.showExplanation': '🔍 عرض التفسير',
  'vocabExercise.explanationShown': '✓ تم عرض التفسير',
  'vocabExercise.scratchTitle': '🎯 <strong>خدش</strong> — اضغط لكشف الكلمات المخفية',

  // ── بلاط الوظيفة ──
  'function.mcqInstruction': 'حدد الوظيفة النحوية الصحيحة لكل جملة. مرر على الخيارات لرؤية الأمثلة.',
  'function.tasksTitle': 'المهام الوظيفية',
  'function.passThreshold': 'أكمل 3 مهام (≥66٪).',
  'function.patternsLabel': 'الأنماط:',
  'function.sentencesLabel': 'الجمل:',
  'function.optionsLabel': 'الخيارات: ',
  'function.allCompleted': '✓ اكتملت جميع المهام!',
  'function.failPrefix': '✗ فحص الوظيفة: ',
  'function.atLeast66': 'يجب 66٪ على الأقل',

  // ── Grammar PPP (إكمال) ──
  'grammarPpp.congratulations': 'تهانينا!',
  'grammarPpp.completedLesson': 'لقد أكملت درس قواعد PPP بنجاح!',
  'grammarPpp.finalScore': 'النتيجة النهائية: {score} ⭐',
  'grammarPpp.closeContinue': 'إغلاق ومتابعة',
  'grammarPpp.goodSentence': '✓ جملة جيدة!',
  'grammarPpp.writeLonger': 'اكتب جملة أطول',
  'grammarPpp.excellentConv': 'محادثة ممتازة! لقد استخدمت القواعد بشكل صحيح.',
  'grammarPpp.allCorrectDrag': '🎉 كلها صحيحة!',
  'grammarPpp.timelineCorrect': '🎉 صحيح! دعنا نرى في الجدول الزمني...',

  // ── بلاط المفردات ──
  'vocab.reviewNow': '🔥 راجع الآن',
  'vocab.dueTomorrow': '⏱ غدًا',
  'vocab.sandwichDesc': 'اقرأ الحوار — اضغط على السطور المميزة لتعلم المفردات',

  // ── الاستماع والكتابة ──
  'listenWrite.listenBtn': 'استمع',

  // ── عارض بطاقات المفردات ──
  'vcr.correctWellDone': '— صحيح! أحسنت!',

  // ── مراقب (تلميحات) ──
  'controlled.hintStartsWith': '💡 تلميح: يبدأ بـ "{letter}"...',
  'controlled.hintWordLength': '💡 تلميح: طول الكلمة {length} أحرف.',
  'controlled.hintCheckSpelling': '💡 تلميح: تحقق من الإملاء.',
  'controlled.hintFirstWord': '💡 تلميح: الكلمة الأولى يجب أن تكون "{word}".',
  'controlled.hintLastWord': '💡 تلميح: الكلمة الأخيرة يجب أن تكون "{word}".',
  'controlled.hintMiddleWords': '💡 تلميح: تحقق من الكلمات الوسطى.',

  // ── مفردات (SRS) ──
  'vocab.nextDue': '✓ التالي: {date}',
  'vocab.linesMastered': '{mastered} من {total} سطور متقنة',

  // ── تنقل ──
  'nav.breadcrumb': '{unit} · الدرس {lesson}',

  // ── حوار ──
  'dialogue.noticeDifference': 'لاحظ الفرق',

  // ── لعبة أنواع الكلمات ──
  'posGame.wordTypes': 'أنواع الكلمات:',
  'posGame.score': 'النتيجة: {score}',
  'posGame.answer': 'الإجابة:',
  'posGame.retry': 'حاول مرة أخرى',
  'posGame.nextWord': 'الكلمة التالية',
  'posGame.continue': 'متابعة',
  'posGame.yourScore': 'نتيجتك:',
  'posGame.percentCorrect': 'أجبت بشكل صحيح {percent}%!',
  'posGame.close': 'إغلاق',

  // ── النمط (علامات تبويب) ──
  'pattern.interactivePPP': 'درس PPP تفاعلي',
  'pattern.patternSpotting': '📍 اكتشاف النمط',
  'pattern.meaningTab': '💡 المعنى',
  'pattern.compareTab': '🔄 المقارنة والملاحظة',
  'pattern.formRulesTab': '📝 قواعد الشكل',

  // ── المفردات (موسع) ──
  'vocab.allCards': '📚 جميع بطاقات المفردات ({count})',
  'vocab.tapToReview': 'اضغط للمراجعة',
  'vocab.rePractice': 'أعد ممارسة هذه البطاقة',
  'vocab.cardsNotLoaded': 'لم يتم تحميل بطاقات المفردات',
  'vocab.cardsNotAvailable': 'بطاقات المفردات التفاعلية غير متوفرة في هذا الإصدار.',

  // ── مراقب (موسع) ──
  'controlled.translatePrefix': 'ترجم: ',
  'controlled.repetitionPrefix': 'تكرار: ',

  // ── إتمام (موسع) ──
  'done.points': 'نقاط',

  // ── خطأ (موسع) ──
  'mistake.locked': '(مقفل)',

  // ── ممارسة الحوار ──
  'dialoguePractice.subtitle': '"لماذا هذا الشكل؟"',

  // ── الاستماع والكتابة (موسع) ──
  'listenWrite.skipTeacher': '🎓 تخطي (معلم)',

  // ── بناء الواجهة (موسع) ──
  'uiBuilders.lockedUnit': '🔒 مقفل: أكمل الوحدة السابقة أولاً',
  'uiBuilders.lockedLesson': '🔒 مقفل',

  // ── قواعد PPP (data-translation) ──
  'grammarPpp.clickWordAction': 'انقر على الكلمة التي تظهر الفعل!',
  'grammarPpp.foundPattern': 'لقد وجدت النمط!',
  'grammarPpp.nowOrEveryDay': 'هل هذا يحدث الآن أم كل يوم؟',
  'grammarPpp.whenDoesHappen': 'متى يحدث هذا؟',
  'grammarPpp.dragMarker': 'اسحب العلامة لتظهر متى يحدث الفعل',
  'grammarPpp.quickCheck': 'فحص سريع للفهم',

  // ── تمارين المفردات (موسع) ──
  'vocabExercise.fixLabel': 'التصحيح:',

  // ── وظيفة (موسع) ──
  'function.subtaskPrefix': 'المهمة الفرعية ',

  // ── خطأ (data-translation) ──
  'mistake.explanation': 'شرح',

  // ── قواعد PPP (التقدم/الخط الزمني) ──
  'grammarPpp.foundProgress': '{found} / {total} تم العثور عليه',
  'grammarPpp.timelineSuccess': '🎉 صحيح! هذا يحدث الآن!',

  // ── النمط (احتياطي) ──
  'pattern.goalLabel': 'الهدف:',
  'pattern.commonRuleQuestion': 'ما هي القاعدة المشتركة في هذه الجمل؟',
  'pattern.tapImportantDT': '👆 انقر على <u>الكلمات المهمة</u> في الجمل أدناه!',
  'pattern.noticeStructureHint': '💡 لاحظت التركيب؟ لنتعلم القاعدة.',
  'pattern.findImportantDT': '💡 جد الكلمات المهمة، ثم نرى القاعدة.',

  // ── قواعد PPP (التنقل/التمرين) ──
  'grammarPpp.previousBtn': '⬅ السابق',
  'grammarPpp.scoreLabel': 'النتيجة:',
  'grammarPpp.nextStepBtn': 'التالي ➡',
  'grammarPpp.presentPhase': 'Present',
  'grammarPpp.practicePhase': 'Practice',
  'grammarPpp.producePhase': 'Produce',
  'grammarPpp.presentPhaseUz': 'تقديم',
  'grammarPpp.practicePhaseUz': 'تمرين',
  'grammarPpp.producePhaseUz': 'إنتاج',
  'grammarPpp.checkSentence': 'تحقق',
  'grammarPpp.dragInstruction': 'اسحب أو انقر الكلمات إلى المكان الصحيح!',
  'grammarPpp.checkAllBtn': '🔍 تحقق من الكل',
  'grammarPpp.wordBankLabel': 'الكلمات:',

  // ── المفردات (وضع الساندويتش) ──
  'vocab.nextDialogueComplete': 'التالي: الحوار ✓',
  'vocab.nextPatternComplete': 'التالي: النمط ✓',
  'vocab.sandwichTitle': 'الخطوة 2 – الحوار (ساندويتش)',
  'vocab.scriptLabel': 'النص:',
  'vocab.fluencyFull': 'كامل',
  'vocab.fluencyFaded': 'باهت',
  'vocab.fluencyBlind': 'أعمى',
  'vocab.contextOnly': 'سياق فقط — لا مفردات لهذا السطر',
  'vocab.clickToLearn': 'انقر أو اضغط Enter لتعلم مفردات هذا السطر',
  'vocab.wordsLearned': '✅ تم تعلم {count} كلمة',
  'vocab.wordsToLearn': '📝 {count} كلمة للتعلم',

  // ── إعادة تصميم الواجهة ──
  'uiRedesign.learnEnglish': 'تعلم الإنجليزية',
  'uiRedesign.unitBreadcrumb': 'الوحدة {num}',
  'uiRedesign.lessonBreadcrumb': 'الدرس {num}',

  // ── بناء الواجهة ──
  'uiBuilders.unitLabel': '📚 الوحدة {num}: {name}',
  'uiBuilders.lessonLabel': 'الدرس {num}: {name}',

  // ── النمط (القالب) ──
  'pattern.templateLabel': 'قالب النمط: ',

  // ── تعليمات الأنشطة ──
  'instr.intro.icon': '📋',
  'instr.intro.text': 'اقرأ ماذا ستتعلم في هذا الدرس واستعد.',
  'instr.intro.pairWork': '',

  'instr.vocab.icon': '📚',
  'instr.vocab.text': 'اضغط على كل بطاقة. استمع للكلمة، انظر للصورة، وتدرب. أكمل المراحل الست.',
  'instr.vocab.pairWork': '👥 تناوب مع شريكك في فتح البطاقات. واحد يقول الكلمة، الآخر يترجم.',

  'instr.dialogue.icon': '💬',
  'instr.dialogue.text': 'استمع واقرأ الحوار. 3 مراحل: النص الكامل → النص الباهت → بدون نص.',
  'instr.dialogue.pairWork': '👥 واحد يأخذ دور "أ"، الآخر دور "ب". تدرب على الحوار فعلياً.',

  'instr.pattern.icon': '🔍',
  'instr.pattern.text': 'تعلم القاعدة. اقرأ الأمثلة، اكتشف النمط، واضغط "فهمت".',
  'instr.pattern.pairWork': '👥 اقرأ الأمثلة بصوت عالٍ لشريكك. اشرحوا القاعدة لبعضكم.',

  'instr.function.icon': '🎯',
  'instr.function.text': 'أكمل المهام: طابق العناصر أو اختر الإجابة الصحيحة.',
  'instr.function.pairWork': '👥 واحد يختار العنصر، الآخر يضعه في المكان الصحيح.',

  'instr.controlled.icon': '✏️',
  'instr.controlled.text': 'تدرب: املأ الفراغات ورتب الكلمات. يجب 80% على الأقل.',
  'instr.controlled.pairWork': '👥 اعملوا معاً — واحد يقرأ الجملة، الآخر يجد الإجابة.',

  'instr.writing.icon': '📝',
  'instr.writing.text': 'اكتب جملاً باستخدام الكلمات الجديدة. استخدم على الأقل العدد المطلوب.',
  'instr.writing.pairWork': '👥 كل واحد يكتب جملاً، ثم راجعوا عمل بعضكم.',

  'instr.listenWrite.icon': '🎧',
  'instr.listenWrite.text': 'استمع جيداً واكتب ما تسمع. يمكنك تشغيل الصوت عدة مرات.',
  'instr.listenWrite.pairWork': '👥 واحد يكتب، الآخر يراجع. ثم تبادلوا.',

  'instr.mistake.icon': '🔎',
  'instr.mistake.text': 'اعثر على الخطأ وتعلم الشكل الصحيح. اقرأ التفسير لكل خطأ.',
  'instr.mistake.pairWork': '👥 واحد يقرأ الجملة الخاطئة، الآخر يجد الخطأ ويفسر.',

  'instr.done.icon': '🎉',
  'instr.done.text': 'أكملت الدرس! شاهد نتيجتك وانتقل للدرس التالي.',
  'instr.done.pairWork': '',

  'instr.unitError.icon': '📊',
  'instr.unitError.text': 'راجع أخطاء الوحدة. اعثر على الخطأ في كل جملة وصححه.',
  'instr.unitError.pairWork': '👥 تناوبوا في مراجعة الجمل.',

  'instr.grand.icon': '🏆',
  'instr.grand.text': 'التمرين الكبير: اكتب إجابة أطول حسب التعليمات. استخدم كل الكلمات والقواعد.',
  'instr.grand.pairWork': '👥 ناقشوا واكتبوا الإجابة معاً.',

  'instr.repractice.icon': '🔄',
  'instr.repractice.text': 'أعد تدريب الحوار. املأ الكلمات الناقصة — يصعب كل مرحلة.',
  'instr.repractice.pairWork': '👥 واحد يقرأ سطر السؤال، الآخر يملأ سطر الإجابة.',
};

export default AR;
