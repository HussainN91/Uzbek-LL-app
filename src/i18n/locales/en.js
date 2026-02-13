/**
 * English — UI Translations
 * ==========================
 * @module src/i18n/locales/en
 */

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
  'nav.backWriting': 'Back: Writing',
  'nav.backListenWrite': 'Back: Listen & Write',
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

  // ── Controlled Tile (Extended) ──
  'controlled.retryFindWord': 'Try again. Find the correct word.',
  'controlled.checkOrder': 'Check the order. Build the sentence correctly.',
  'controlled.minCorrect80': 'At least 80% must be correct.',
  'controlled.exerciseCount': '{count} exercises',
  'controlled.stageInstruction': 'Score ≥80% on each stage. Pass {total} stages.',
  'controlled.readFirst': '📖 Read first:',
  'controlled.readDone': 'Done reading ✓',
  'controlled.stageUnlocked': 'Good. Next stage unlocked.',
  'controlled.stageLocked': 'Pass this stage first (≥80%).',

  // ── Done Tile (Extended) ──
  'done.scoreTitle': '🏆 Final Score',
  'done.ratingExcellent': 'EXCELLENT!',
  'done.ratingOkay': 'SATISFACTORY',
  'done.ratingRetry': 'TRY AGAIN',
  'done.nextLessonBtn': '➡️ Next lesson ({name})',
  'done.unitCompleteMsg': '🎉 {unit} completed! Next unit unlocked.',
  'done.nextUnitBtn': '🚀 Next Unit ({name})',
  'done.completeAllFirst': 'Complete all lessons first. Incomplete lessons: {lessons}',
  'done.allLessonsRequired': 'All lessons must be completed',

  // ── Writing Tile (Extended) ──
  'writing.gateControlled': 'Complete all {total} CONTROLLED stages first. Current stage: {current}',
  'writing.writeMinSentences': 'Write at least 2 simple sentences (use lesson vocabulary).',
  'writing.successFull': '✓ Great, you\'re using the function fully.',
  'writing.needMoreSentences': 'Need at least 2 sentences. Write {count} more words.',
  'writing.useTheseWords': 'Use these words: \'{words}\'.',
  'writing.useMoreVocab': 'Use more lesson vocabulary.',
  'writing.retryWriting': 'Try again.',
  'writing.gateWritingSelf': 'Complete the WRITING tile first (meet requirements).',

  // ── Listen & Write Tile (Extended) ──
  'listenWrite.gateWriting': 'Complete the WRITING stage first.',
  'listenWrite.fullInstruction': 'Listen to the sentence and write it exactly. At least 60% match required per sentence.',
  'listenWrite.perItemLabel': '[{index}] Listen and write the sentence:',
  'listenWrite.successMsg': 'Great job! {correct} correct.',
  'listenWrite.failureMsg': 'At least 80% (4/5 sentences) must be correct. Currently: {current}',
  'listenWrite.gatePrev': 'Complete this exercise first (≥80%).',

  // ── Function Tile (Extended) ──
  'function.labelNew': '(New)',
  'function.labelPrevious': '(Previous)',
  'function.successDrag': '✓ Correct! ({correct}/{total}) Continue.',
  'function.failureDrag': '✗ At least {needed} must be correct. ({correct}/{total})',
  'function.categoryLabel': 'Category:',
  'function.functionLabel': 'Function:',
  'function.repeatLabel': 'Repeat:',
  'function.selectInstruction': 'Select the correct grammatical function for each sentence. Hover over options to see examples.',
  'function.minRequired': 'At least 66% required',
  'function.sectionTitle': 'Function Tasks',
  'function.gateAll': 'Pass all 3 tasks (≥66%).',
  'function.finish': 'Finish',

  // ── Unit Error Tile (Extended) ──
  'unitError.tileTitle': 'Unit Error Detection',
  'unitError.noData': 'Unit error detection data not found or invalid.',
  'unitError.defaultInstruction': 'Listen to or read each sentence and determine if it is correct or incorrect.',
  'unitError.selectPlaceholder': 'Select',
  'unitError.optionCorrect': 'Correct',
  'unitError.optionIncorrect': 'Incorrect',
  'unitError.success': 'Well done! Grand Tile unlocked.',
  'unitError.gate': 'Pass the error detection task first (≥{pct}%).',

  // ── Mistake Tile (Extended) ──
  'mistake.fallbackMeta': 'Possessive pronouns are not pluralized.',
  'mistake.gatePrev': 'Complete the LISTEN_WRITE tile first.',
  'mistake.labelWrong': 'Incorrect:',
  'mistake.labelCorrect': 'Correct:',

  // ── Pattern Tile (Extended) ──
  'pattern.grammarDefault': 'Grammar',
  'pattern.missingContent': 'Grammar/Form content not provided (required for lesson).',
  'pattern.listenRepeatTab': '🎧 Listen and Repeat',
  'pattern.allReviewedMsg': '✓ All content reviewed',
  'pattern.tapInstruction': '👆 Tap the important words in the sentences below!',
  'pattern.discoveryProgress': '✅ Correct! ({found}/{total})',
  'pattern.discoveryHint': '💡 Find the key words, then we\'ll see the rule.',
  'pattern.listenTip': '💡 Tip: Listen 2-3 times, then repeat aloud!',
  'pattern.steps': '1️⃣ <strong>Listen</strong> → 2️⃣ <strong>Repeat</strong> → 3️⃣ <strong>Compare</strong>',
  'pattern.listenBtn': '🔊 Listen',
  'pattern.slowBtn': '🐢 Slow',
  'pattern.compareTitle': 'English ↔ Uzbek',
  'pattern.awarenessTitle': '🧠 Pay Attention',

  // ── Grand Tile ──
  'grand.tileTitle': 'Unit Final Task',
  'grand.noData': 'Grand tile data not found.',
  'grand.completeUnit': 'Complete Unit',
  'grand.fallbackInstruction': 'Complete the unit task.',
  'grand.placeholder': 'Type here...',
  'grand.success': 'Great! Unit task completed successfully.',
  'grand.needMoreWords': 'Use more lesson vocabulary (at least {count} words).',
  'grand.failure': 'Not enough. Try again.',
  'grand.gate': 'Complete the Grand Tile task first.',

  // ── Intro Tile (Extended) ──
  'intro.functionLabel': 'Function (UZ): ',
  'intro.semanticLabel': 'Semantic Category (UZ): ',
  'intro.grammarLabel': 'Grammar: ',
  'intro.notSet': '(not set yet)',

  // ── Transformation Tile ──
  'transformation.scenario': '📖 Scenario:',
  'transformation.change': '🔄 Change:',
  'transformation.rewrite': '✏️ Rewrite the sentence:',
  'transformation.placeholder': 'Enter sentence...',
  'transformation.checkBtn': 'Check',
  'transformation.correct': '✓ Correct!',
  'transformation.incorrect': '✗ Try again',
  'transformation.correctAnswer': 'Correct answer: ',

  // ── Vocab Tile (Extended) ──
  'vocabTile.wordsProgress': 'Words: <strong>{completed}</strong> / {total}',
  'vocabTile.learnWords': 'Learn words ({completed}/{total})',
  'vocabTile.dialogueInstruction': '📖 Read the dialogue — tap words to learn',

  // ── Dialogue Tile (Extended) ──
  'dialogue.listenGrammar': '💬 Listen to the dialogue and pay attention to grammar:',
  'dialogue.listenFirstInstruction': '👂 Listen to the dialogue first, then practice speaking:',
  'dialogue.readGrammar': '📖 Read the dialogue and pay attention to grammar:',
  'dialogue.repeatLines': '🎤 Repeat the dialogue lines:',
  'dialogue.showUzTranslation': '👁️ Show Uzbek translation',

  // ── Dialogue Practice Tile (Extended) ──
  'dialoguePractice.uzTranslation': 'Uzbek translation',
  'dialoguePractice.inUzbek': 'In Uzbek',
  'dialoguePractice.readInUzbek': '💬 Read the same dialogue in Uzbek:',

  // ── Mission Briefing ──
  'missionBriefing.skip': 'Skip →',
  'missionBriefing.title': 'Dialogue Preparation',
  'missionBriefing.subtitle': 'Put the words in the correct order',
  'missionBriefing.checkBtn': 'Check ✓',
  'missionBriefing.translateInstruction': 'Translate the Uzbek sentence into English:',
  'missionBriefing.dropZone': 'Drag words here...',
  'missionBriefing.correct': '🎉 Correct! Great!',
  'missionBriefing.complete': '🏆 Preparation complete! Let\'s go to the dialogue!',
  'missionBriefing.incorrect': '❌ Try again',
  'missionBriefing.hint': '💡 First word: "{word}"',

  // ── XP Display ──
  'xpDisplay.level': 'Level',
  'xpDisplay.levelUp': 'LEVEL UP!',
  'xpDisplay.levelUpSubtitle': 'You\'ve reached a new level!',
  'xpDisplay.levelUpBtn': 'Great! Let\'s go',

  // ── Activity Context Card ──
  'activityCard.intro.label': 'Introduction',
  'activityCard.intro.desc': 'Learn what this lesson is about',
  'activityCard.vocab.label': 'Vocabulary',
  'activityCard.vocab.desc': 'Learn new words with flashcards',
  'activityCard.dialogue.label': 'Dialogue',
  'activityCard.dialogue.desc': 'Practice conversation with native speakers',
  'activityCard.pattern.label': 'Grammar Rule',
  'activityCard.pattern.desc': 'Recognize and use grammar rules',
  'activityCard.function.label': 'Check',
  'activityCard.function.desc': 'Test your understanding of grammatical functions',
  'activityCard.controlled.label': 'Controlled Practice',
  'activityCard.controlled.desc': 'Fill in blanks and reorder sentences',
  'activityCard.writing.label': 'Free Writing',
  'activityCard.writing.desc': 'Write your own sentences',
  'activityCard.listenWrite.label': 'Listen and Write',
  'activityCard.listenWrite.desc': 'Listen and write what you hear',
  'activityCard.mistake.label': 'Error Correction',
  'activityCard.mistake.desc': 'Find and correct mistakes',
  'activityCard.done.label': 'Completed!',
  'activityCard.done.desc': 'You\'ve finished this lesson!',
  'activityCard.startBtn': 'Start →',
  'activityCard.dismissHint': 'Or press Enter',
  'activityCard.minutes': '~{min} min',

  // ── Instruction Banner ──
  'instructionBanner.label': 'Instruction',

  // ── UI Builders ──
  'uiBuilders.completeUnitFirst': 'Complete Unit {unit} first.',
  'uiBuilders.completeLessonFirst': 'Complete Lesson {lesson} first.',

  // ── Grammar Helpers ──
  'helpers.articleNeeded': 'Article needed!',
  'helpers.checkArticle': 'Check which article is needed',
  'helpers.prepositionNeeded': 'A preposition is needed here',
  'helpers.checkWordOrder': 'Check the word order',

  // ── App ──
  'app.resetConfirm': '⚠️ This will erase all progress. Continue?',

  // ── UI Redesign ──
  'uiRedesign.instructionTitle': '💡 Instruction',

  // ── Instruction Banner (Extended) ──
  'instructionBanner.audioBtn': '🔊 Listen',
  'instructionBanner.audioTitle': 'Listen to the instruction',

  // ── Grammar PPP ──
  'grammarPpp.ccqHint': '🤔 Think again...',
  'grammarPpp.correct': '✅ Correct!',
  'grammarPpp.tryAgain': '❌ Try again',

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

  // ── Common Aliases (used by function-tile, grand-tile, unit-error-tile) ──
  'common.buttons.check': 'Check',
  'common.buttons.continue': 'Continue',
  'common.buttons.retry': 'Retry',
  'common.labels.dataNotFound': 'No data found',
  'common.placeholders.writeHere': 'Write here...',

  // ── Function Tile (Subtasks) ──
  'functionTile.subtask1.title': 'Task 1: Category Association',
  'functionTile.subtask1.instruction': 'Drag items to the correct category',
  'functionTile.subtask2.title': 'Task 2: Sentence-Function Match',
  'functionTile.subtask2.instruction': 'Match each sentence to its correct function',
  'functionTile.subtask3.title': 'Task 3: Recycled Function Recall',
  'functionTile.subtask3.instruction': 'Classify sentences as current or previous unit',
  'functionTile.feedback.summaryComplete': '\u2713 All tasks completed!',
  'functionTile.notSet': 'Function tasks not configured',

  // ── Error Detection Tile ──
  'errorDetectionTile.continueGrand': 'Continue to Grand Task',
  'errorDetectionTile.feedback.noQuestions': 'No questions available',
  'errorDetectionTile.feedback.someWrong': 'Some answers are incorrect.',
  'errorDetectionTile.options.correct': 'Correct',
  'errorDetectionTile.options.incorrect': 'Incorrect',

  // ── Grand Tile (Extended) ──
  'grandTile.samplesLabel': 'Sample answers:',
  'grandTile.feedback.tooShort': 'Too short. Write at least {min} words.',
  'grandTile.feedback.requiredMissing': 'Use the following required words: {words}',

  // ── VCR Fallbacks ──
  'vcr.discoveryDefault': 'Read the sentence and find the key words',
  'vcr.fallbackDiscovery': 'Find the pattern in this sentence',
  'vcr.fallbackFailure': 'Not quite right. Try again.',
  'feedback.tryUsingTarget': 'Try using the target pattern',

  // ── Dialogue Tile (Discovery) ──
  'dialogue.discoverPattern': '💡 Discover the Pattern',
  'dialogue.discoveryTitle': '💡 Discovery',
  'dialogue.stageLabel': 'Stage {stage}: {form}',
  'dialogue.audioTitle': 'Listen',

  // ── Pattern Tile (Extended) ──
  'pattern.examplesLabel': 'Examples:',

  // ── Listen-Write Tile (Extended) ──
  'listenWrite.noSentences': 'No sentences available for dictation.',
  'listenWrite.inputPlaceholder': 'Type the sentence you hear...',

  // ── Controlled Tile (Extended) ──
  'controlled.reorderInstruction': 'Reorder tokens to form a correct sentence:',
  'controlled.gapPlaceholder': 'Type the missing word...',
  'controlled.noItems': 'No controlled items available.',

  // ── Function Tile (MCQ / Debug) ──
  'function.mcqTitle': '📝 Function Check – MCQ',
  'function.checkResult': '✓ Function Check: {correct}/{total} ({pct}%)',
  'function.noCheckItems': 'Function check items not set.',
  'function.contextLabel': '💬 Context:',
  'function.conceptLabel': 'Concept subtasks (read-only):',

  // ── UI Redesign (Extended) ──
  'uiRedesign.selectUnit': 'Select unit to view lessons',
  'uiRedesign.lessonsAfterUnit': 'Lessons load after selecting unit',
  'uiRedesign.stepIndicator': 'STEP {current} OF {total}',
  'uiRedesign.completePrevUnit': 'Complete previous unit first.',

  // ── Navigation (Extended) ──
  'nav.backButton': '← Back',

  // ── Vocab Tile (Navigation) ──
  'vocab.backToVocab': 'Back to vocabulary',
  'vocab.nextDialoguePractice': 'Next: Dialogue practice',
  'vocab.dialogueNotFound': 'Dialogue not found for this lesson.',

  // ── Transformation Tile (Title) ──
  'transformation.tileTitle': 'Text Transformation — Form Responds to Meaning',

  // ── Unit Error Tile (Extended) ──
  'unitError.skipGrand': 'Skip to Grand Tile',
  'unitError.gapLabel': 'Sentence {index}: {text}',
  'unitError.sentenceLabel': 'Sentence {index}: {text}',
  'unitError.dataInvalid': 'Unit error detection data not found or invalid.',

  // ── UI ──
  'ui.selectLanguage': 'Select Your Language',

  // ── Grammar PPP (Extended) ──
  'grammarPpp.tryAgainFormat': '❌ Try again ({answer})',
  'grammarPpp.sentencePlaceholder': 'Type your sentence here...',
  'grammarPpp.buildPlaceholder': 'Build your sentence here...',
  'grammarPpp.conversationPlaceholder': 'Write your conversation here... (Use the grammar we learned!)',
  'grammarPpp.greatJob': '🎉 Great job!',
  'grammarPpp.submitSentence': 'Submit Sentence',
  'grammarPpp.practiceConversation': 'Practice Conversation',

  // ── Writing Tile (Extended) ──
  'writing.fallbackInstruction': 'Write at least 2 simple sentences (use words from the lesson).',

  // ── Grand Tile (Labels) ──
  'grand.finishUnit': 'Finish Unit',
  'grand.taskInstruction': 'Complete the unit task.',

  // ── Pattern (Extended) ──
  'pattern.crossLangNote': 'Cross-language note',

  // ── Grammar PPP (Extended) ──
  'grammarPpp.completeBtn': 'Complete ✅',
  'grammarPpp.nextBtn': 'Next ➡',
  'grammarPpp.wellDoneSummary': 'Well done! You practiced the grammar pattern!',
  'grammarPpp.wordBankTitle': 'Word Bank',
  'grammarPpp.yourSentences': 'Your Sentences:',

  // ── Mistake (Extended) ──
  'mistake.finishBtn': 'Finish',

  // ── Intro (EN tooltip labels) ──
  'intro.functionEnLabel': 'Function (EN): ',
  'intro.semanticEnLabel': 'Semantic Category (EN): ',
  'intro.grammarEnLabel': 'Grammar Spine: ',
  'intro.notSetLabel': 'Not set',

  // ── Transformation (Extended) ──
  'transformation.progressLabel': '{passed} / {total} completed',

  // ── Writing (Extended) ──
  'writing.checkConsoleMsg': 'Check console for details. You need more words or more lesson vocabulary.',

  // ── Dialogue (Pressure Mode) ──
  'dialogue.masteryChallenge': 'Mastery Challenge \u2014 Final Pass',
  'dialogue.pressureReplay': 'Dialogue Replay \u2014 Pressure Mode',
  'dialogue.pressureDesc': 'The same dialogue replays with audio. Text vanishes after 800ms \u2014 you have 2 seconds to produce each line from memory.',
  'dialogue.vanish': 'Vanish',
  'dialogue.deadline': 'Deadline',
  'dialogue.linesLabel': 'Lines',
  'dialogue.keyVocab': '\ud83d\udcda Key Vocabulary:',
  'dialogue.formA': 'Form A',
  'dialogue.formB': 'Form B',
  'dialogue.fallbackTitle': 'Dialogue Practice',

  // ── Vocab Exercises ──
  'vocabExercise.jumbleTitle': '\ud83e\udde9 <strong>Jumble</strong> \u2014 Tap words in the correct order',
  'vocabExercise.checkAnswer': '\u2713 Check Answer',
  'vocabExercise.correct': '\u2713 Correct!',
  'vocabExercise.tryAgain': '\u2717 Try again',
  'vocabExercise.trapTitle': '\ud83e\udea4 <strong>Trap</strong> \u2014 Spot the error',
  'vocabExercise.showExplanation': '\ud83d\udd0d Show Explanation',
  'vocabExercise.explanationShown': '\u2713 Explanation shown',
  'vocabExercise.scratchTitle': '\ud83c\udfaf <strong>Scratch</strong> \u2014 Tap to reveal hidden words',

  // ── Function Tile (dataset.translation) ──
  'function.mcqInstruction': 'Select the correct grammatical function for each sentence. Hover over options to see examples.',
  'function.tasksTitle': 'Functional Tasks',
  'function.passThreshold': 'Pass all 3 tasks (\u226566%).',
  'function.patternsLabel': 'Patterns:',
  'function.sentencesLabel': 'Sentences:',
  'function.optionsLabel': 'Options: ',
  'function.allCompleted': '\u2713 All tasks completed!',
  'function.failPrefix': '\u2717 Function Check: ',
  'function.atLeast66': 'At least 66% required',

  // ── Grammar PPP (Completion) ──
  'grammarPpp.congratulations': 'Congratulations!',
  'grammarPpp.completedLesson': 'You have successfully completed the PPP Grammar Lesson!',
  'grammarPpp.finalScore': 'Final Score: {score} \u2b50',
  'grammarPpp.closeContinue': 'Close & Continue',
  'grammarPpp.goodSentence': '\u2713 Good sentence!',
  'grammarPpp.writeLonger': 'Write a longer sentence',
  'grammarPpp.excellentConv': 'Excellent conversation! You used the grammar correctly.',
  'grammarPpp.allCorrectDrag': '\ud83c\udf89 Hammasi to\'g\'ri!',
  'grammarPpp.timelineCorrect': '\ud83c\udf89 To\'g\'ri! Keling, vaqt chizig\'ida ko\'ring...',

  // ── Vocab Tile (SRS + Misc) ──
  'vocab.reviewNow': '\ud83d\udd25 Review now',
  'vocab.dueTomorrow': '\u23f1 Due tomorrow',
  'vocab.sandwichDesc': 'Read the dialogue \u2014 tap highlighted lines to learn vocabulary',

  // ── Listen Write (Extended) ──
  'listenWrite.listenBtn': 'Listen',

  // ── Vocab Card Renderer ──
  'vcr.correctWellDone': '\u2014 Correct! Well done!',

  // \u2500\u2500 Controlled (Scaffold Hints) \u2500\u2500
  'controlled.hintStartsWith': '\ud83d\udca1 Hint: Starts with "{letter}"...',
  'controlled.hintWordLength': '\ud83d\udca1 Hint: Word length is {length} letters.',
  'controlled.hintCheckSpelling': '\ud83d\udca1 Hint: Check spelling.',
  'controlled.hintFirstWord': '\ud83d\udca1 Hint: The first word should be "{word}".',
  'controlled.hintLastWord': '\ud83d\udca1 Hint: The last word should be "{word}".',
  'controlled.hintMiddleWords': '\ud83d\udca1 Hint: Check the middle words.',

  // \u2500\u2500 Vocab (SRS Extended) \u2500\u2500
  'vocab.nextDue': '\u2713 Next: {date}',
  'vocab.linesMastered': '{mastered} of {total} lines mastered',

  // \u2500\u2500 Navigation (Breadcrumb) \u2500\u2500
  'nav.breadcrumb': '{unit} \u00b7 Lesson {lesson}',

  // \u2500\u2500 Dialogue (Extended) \u2500\u2500
  'dialogue.noticeDifference': 'Notice the difference',

  // ── POS Speed Game ──
  'posGame.wordTypes': 'Word types:',
  'posGame.score': 'Score: {score}',
  'posGame.answer': 'Answer:',
  'posGame.retry': 'Retry',
  'posGame.nextWord': 'Next word',
  'posGame.continue': 'Continue',
  'posGame.yourScore': 'Your score:',
  'posGame.percentCorrect': 'You got {percent}% correct!',
  'posGame.close': 'Close',

  // ── Pattern (Extended Tabs) ──
  'pattern.interactivePPP': 'Interactive PPP Lesson',
  'pattern.patternSpotting': '📍 Pattern Spotting',
  'pattern.meaningTab': '💡 Meaning',
  'pattern.compareTab': '🔄 Compare & Notice',
  'pattern.formRulesTab': '📝 Form Rules',

  // ── Vocab (Extended) ──
  'vocab.allCards': '📚 All Vocabulary Cards ({count})',
  'vocab.tapToReview': 'Tap to review',
  'vocab.rePractice': 'Re-practice this card',
  'vocab.cardsNotLoaded': 'Vocabulary cards not loaded',
  'vocab.cardsNotAvailable': 'Interactive vocab cards are not available in this build.',

  // ── Controlled (Extended) ──
  'controlled.translatePrefix': 'Translate: ',
  'controlled.repetitionPrefix': 'Repetition: ',

  // ── Done (Extended) ──
  'done.points': 'points',

  // ── Mistake (Extended) ──
  'mistake.locked': '(Locked)',

  // ── Dialogue Practice (Subtitle) ──
  'dialoguePractice.subtitle': '"Why This Form?"',

  // ── Listen-Write (Extended) ──
  'listenWrite.skipTeacher': '🎓 Skip (Teacher)',

  // ── UI Builders (Extended) ──
  'uiBuilders.lockedUnit': '🔒 Locked: Complete previous unit first',
  'uiBuilders.lockedLesson': '🔒 Locked',

  // ── Grammar PPP (data-translation) ──
  'grammarPpp.clickWordAction': 'Click the word that shows the action!',
  'grammarPpp.foundPattern': 'You found the pattern!',
  'grammarPpp.nowOrEveryDay': 'Is this happening NOW or EVERY DAY?',
  'grammarPpp.whenDoesHappen': 'When does this happen?',
  'grammarPpp.dragMarker': 'Drag the marker to show when the action happens',
  'grammarPpp.quickCheck': 'Quick Understanding Check',

  // ── Vocab Exercises (Extended) ──
  'vocabExercise.fixLabel': 'Fix:',

  // ── Function (Extended) ──
  'function.subtaskPrefix': 'Subtask ',

  // ── Mistake (data-translation fallback) ──
  'mistake.explanation': 'Explanation',

  // ── Grammar PPP (Progress/Timeline) ──
  'grammarPpp.foundProgress': '{found} / {total} found',
  'grammarPpp.timelineSuccess': '🎉 Correct! This is happening right now!',

  // ── Pattern (Fallbacks) ──
  'pattern.goalLabel': 'Goal:',
  'pattern.commonRuleQuestion': 'What is the common rule in these sentences?',
  'pattern.tapImportantDT': '👆 Tap the <u>important words</u> in the sentences below!',
  'pattern.noticeStructureHint': "💡 Notice the structure? Let's learn the rule.",
  'pattern.findImportantDT': "💡 Find the important words, then we'll see the rule.",

  // ── Grammar PPP (Nav/Practice) ──
  'grammarPpp.previousBtn': '⬅ Previous',
  'grammarPpp.scoreLabel': 'Score:',
  'grammarPpp.nextStepBtn': 'Next ➡',
  'grammarPpp.presentPhase': 'Present',
  'grammarPpp.practicePhase': 'Practice',
  'grammarPpp.producePhase': 'Produce',
  'grammarPpp.presentPhaseUz': 'Taqdim',
  'grammarPpp.practicePhaseUz': 'Mashq',
  'grammarPpp.producePhaseUz': 'Ishlab chiqarish',
  'grammarPpp.checkSentence': 'Check',
  'grammarPpp.dragInstruction': 'Drag or click the words to the correct places!',
  'grammarPpp.checkAllBtn': '🔍 Check all',
  'grammarPpp.wordBankLabel': 'Words:',

  // ── Vocab (Sandwich Mode) ──
  'vocab.nextDialogueComplete': 'Next: Dialogue ✓',
  'vocab.nextPatternComplete': 'Next: Pattern ✓',
  'vocab.sandwichTitle': 'Tile 2 – Dialogue (Sandwich)',
  'vocab.scriptLabel': 'Script:',
  'vocab.fluencyFull': 'Full',
  'vocab.fluencyFaded': 'Faded',
  'vocab.fluencyBlind': 'Blind',
  'vocab.contextOnly': 'Context only — no vocabulary for this line',
  'vocab.clickToLearn': 'Click or press Enter to learn vocabulary for this line',
  'vocab.wordsLearned': '✅ {count} word(s) learned',
  'vocab.wordsToLearn': '📝 {count} word(s) to learn',

  // ── UI Redesign (Extended) ──
  'uiRedesign.learnEnglish': 'Learn English',
  'uiRedesign.unitBreadcrumb': 'Unit {num}',
  'uiRedesign.lessonBreadcrumb': 'Lesson {num}',

  // ── UI Builders (Extended) ──
  'uiBuilders.unitLabel': '📚 Unit {num}: {name}',
  'uiBuilders.lessonLabel': 'Lesson {num}: {name}',

  // ── Pattern (Template) ──
  'pattern.templateLabel': 'Pattern template: ',

  // ── Tile Instructions ──
  'instr.intro.icon': '📋',
  'instr.intro.text': 'Read what you will learn in this lesson and get ready.',
  'instr.intro.pairWork': '',

  'instr.vocab.icon': '📚',
  'instr.vocab.text': 'Tap each card. Listen to the word, look at the picture, and practice. Complete all 6 stages.',
  'instr.vocab.pairWork': '👥 Take turns opening cards with your partner. One says the word, the other translates.',

  'instr.dialogue.icon': '💬',
  'instr.dialogue.text': 'Listen and read the dialogue. 3 stages: full text → faded text → blind. Master each line.',
  'instr.dialogue.pairWork': '👥 One person takes role "A", the other role "B". Practice the dialogue in real life.',

  'instr.pattern.icon': '🔍',
  'instr.pattern.text': 'Learn the grammar rule. Read examples, find the pattern, and tap "Understood".',
  'instr.pattern.pairWork': '👥 Read examples aloud to your partner. Explain the rule to each other.',

  'instr.function.icon': '🎯',
  'instr.function.text': 'Complete the tasks: match items or choose the correct answer. Use drag & drop.',
  'instr.function.pairWork': '👥 One person picks the draggable, the other places it correctly.',

  'instr.controlled.icon': '✏️',
  'instr.controlled.text': 'Practice: fill gaps and reorder words. You need at least 80% correct.',
  'instr.controlled.pairWork': '👥 Work together — one reads the sentence, the other finds the answer.',

  'instr.writing.icon': '📝',
  'instr.writing.text': 'Write sentences using the vocabulary words. Use at least the shown word count.',
  'instr.writing.pairWork': '👥 Each write sentences, then check each other\'s work.',

  'instr.listenWrite.icon': '🎧',
  'instr.listenWrite.text': 'Listen carefully and write what you hear. You can play the audio multiple times.',
  'instr.listenWrite.pairWork': '👥 One person writes, the other checks. Then switch.',

  'instr.mistake.icon': '🔎',
  'instr.mistake.text': 'Find the error and learn the correct form. Read the explanation for each mistake.',
  'instr.mistake.pairWork': '👥 One reads the wrong sentence, the other finds the error and explains.',

  'instr.done.icon': '🎉',
  'instr.done.text': 'You completed the lesson! See your score and move to the next lesson.',
  'instr.done.pairWork': '',

  'instr.unitError.icon': '📊',
  'instr.unitError.text': 'Check unit errors. Find and correct the mistake in each sentence.',
  'instr.unitError.pairWork': '👥 Take turns checking sentences.',

  'instr.grand.icon': '🏆',
  'instr.grand.text': 'Grand practice: write a longer response following the prompt. Use all learned words and rules.',
  'instr.grand.pairWork': '👥 Discuss and write the response together.',

  'instr.repractice.icon': '🔄',
  'instr.repractice.text': 'Re-practice the dialogue. Fill in missing words — it gets harder each stage.',
  'instr.repractice.pairWork': '👥 One reads the question line, the other fills in the answer line.',
};

export default EN;
