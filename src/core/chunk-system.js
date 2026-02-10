/**
 * Chunk System Module
 * ===================
 * Manages indivisible linguistic chunks for A1 curriculum.
 * Chunks are treated as atomic units that shouldn't be broken up.
 * 
 * @module src/core/chunk-system
 * @version 1.0.0
 * @since January 2026
 */

// ============================
// CHUNK TYPE DEFINITIONS
// ============================

/**
 * Chunk types with their properties and constraints
 */
const CHUNK_TYPES = {
  // ─── SUBJECT + BE (Unit 1+) ───
  SUBJECT_BE: {
    id: 'SUBJECT_BE',
    label: 'Subject + Be',
    description: 'Subject pronouns with their correct form of "be"',
    introducedUnit: 1,
    pattern: '{subject} {be}',
    isIndivisible: true,
    instances: {
      'I_AM': { en: 'I am', uz: 'Men', subject: 'I', be: 'am' },
      'YOU_ARE': { en: 'You are', uz: 'Siz', subject: 'You', be: 'are' },
      'HE_IS': { en: 'He is', uz: 'U', subject: 'He', be: 'is' },
      'SHE_IS': { en: 'She is', uz: 'U', subject: 'She', be: 'is' },
      'IT_IS': { en: 'It is', uz: 'U', subject: 'It', be: 'is' },
      'WE_ARE': { en: 'We are', uz: 'Biz', subject: 'We', be: 'are' },
      'THEY_ARE': { en: 'They are', uz: 'Ular', subject: 'They', be: 'are' }
    }
  },

  // ─── TIME CHUNKS (Unit 2+) ───
  TIME_ABSOLUTE: {
    id: 'TIME_ABSOLUTE',
    label: 'Absolute Time',
    description: 'Preposition + specific time (at + clock time)',
    introducedUnit: 2,
    pattern: 'at {time}',
    isIndivisible: true,
    position: 'end', // Usually at end of sentence
    instances: {
      'AT_SEVEN': { en: 'at seven', uz: 'soat yettida', prep: 'at', time: 'seven' },
      'AT_EIGHT': { en: 'at eight', uz: 'soat sakkizda', prep: 'at', time: 'eight' },
      'AT_NINE': { en: 'at nine', uz: 'soat to\'qqizda', prep: 'at', time: 'nine' },
      'AT_TEN': { en: 'at ten', uz: 'soat o\'nda', prep: 'at', time: 'ten' },
      'AT_NOON': { en: 'at noon', uz: 'tushda', prep: 'at', time: 'noon' },
      'AT_MIDNIGHT': { en: 'at midnight', uz: 'yarim kechada', prep: 'at', time: 'midnight' }
    }
  },

  TIME_PERIOD: {
    id: 'TIME_PERIOD',
    label: 'Time Period',
    description: 'Preposition + part of day (in the morning/evening)',
    introducedUnit: 2,
    pattern: 'in the {period}',
    isIndivisible: true,
    position: 'end',
    instances: {
      'IN_THE_MORNING': { en: 'in the morning', uz: 'ertalab', prep: 'in', period: 'morning' },
      'IN_THE_AFTERNOON': { en: 'in the afternoon', uz: 'tushdan keyin', prep: 'in', period: 'afternoon' },
      'IN_THE_EVENING': { en: 'in the evening', uz: 'kechqurun', prep: 'in', period: 'evening' },
      'AT_NIGHT': { en: 'at night', uz: 'kechasi', prep: 'at', period: 'night' } // Exception: uses 'at'
    }
  },

  TIME_FREQUENCY: {
    id: 'TIME_FREQUENCY',
    label: 'Frequency Expression',
    description: 'Time expressions for frequency/repetition',
    introducedUnit: 2,
    pattern: '{frequency}',
    isIndivisible: true,
    position: 'start_or_end', // Can be at start or end
    instances: {
      'EVERY_DAY': { en: 'every day', uz: 'har kuni', position: 'end' },
      'EVERY_MORNING': { en: 'every morning', uz: 'har kuni ertalab', position: 'end' },
      'EVERY_EVENING': { en: 'every evening', uz: 'har oqshom', position: 'end' },
      'ON_WEEKENDS': { en: 'on weekends', uz: 'dam olish kunlari', position: 'end' },
      'ON_WEEKDAYS': { en: 'on weekdays', uz: 'ish kunlari', position: 'end' }
    }
  },

  // ─── ADVERBS OF FREQUENCY (Unit 2+) - SPECIAL POSITION ───
  ADVERB_FREQUENCY: {
    id: 'ADVERB_FREQUENCY',
    label: 'Adverb of Frequency',
    description: 'Frequency adverbs (usually before main verb, after be)',
    introducedUnit: 2,
    pattern: '{adverb}',
    isIndivisible: true,
    position: 'before_main_verb', // Special: goes between subject and verb
    specialRule: 'after_be', // But goes AFTER "be" verb
    instances: {
      'ALWAYS': { en: 'always', uz: 'doim', frequency: 100 },
      'USUALLY': { en: 'usually', uz: 'odatda', frequency: 80 },
      'OFTEN': { en: 'often', uz: 'ko\'pincha', frequency: 60 },
      'SOMETIMES': { en: 'sometimes', uz: 'ba\'zan', frequency: 40, canStartSentence: true },
      'RARELY': { en: 'rarely', uz: 'kamdan-kam', frequency: 20 },
      'NEVER': { en: 'never', uz: 'hech qachon', frequency: 0 }
    }
  },

  // ─── PLACE CHUNKS (Unit 2+) ───
  PLACE_ABSOLUTE: {
    id: 'PLACE_ABSOLUTE',
    label: 'Absolute Place',
    description: 'Preposition + specific place',
    introducedUnit: 2,
    pattern: '{prep} {place}',
    isIndivisible: true,
    position: 'end',
    instances: {
      'AT_HOME': { en: 'at home', uz: 'uyda', prep: 'at', place: 'home' },
      'AT_SCHOOL': { en: 'at school', uz: 'maktabda', prep: 'at', place: 'school' },
      'AT_WORK': { en: 'at work', uz: 'ishda', prep: 'at', place: 'work' },
      'TO_SCHOOL': { en: 'to school', uz: 'maktabga', prep: 'to', place: 'school' },
      'TO_WORK': { en: 'to work', uz: 'ishga', prep: 'to', place: 'work' },
      'FROM_HOME': { en: 'from home', uz: 'uydan', prep: 'from', place: 'home' }
    }
  },

  // ─── MANNER ADVERBS (Unit 2+) ───
  ADVERB_MANNER: {
    id: 'ADVERB_MANNER',
    label: 'Manner Adverb',
    description: 'Adverbs describing how an action is done',
    introducedUnit: 2,
    pattern: '{adverb}',
    isIndivisible: true,
    position: 'after_verb', // Usually after verb or at end
    instances: {
      'QUICKLY': { en: 'quickly', uz: 'tez' },
      'SLOWLY': { en: 'slowly', uz: 'sekin' },
      'CAREFULLY': { en: 'carefully', uz: 'ehtiyotkorlik bilan' },
      'QUIETLY': { en: 'quietly', uz: 'jimgina' },
      'LOUDLY': { en: 'loudly', uz: 'baland ovozda' }
    }
  },

  // ─── WH + AUX + SUBJECT (Unit 3+) ───
  WH_QUESTION: {
    id: 'WH_QUESTION',
    label: 'WH Question Start',
    description: 'Question word + auxiliary + subject',
    introducedUnit: 3,
    pattern: '{wh} {aux} {subject}',
    isIndivisible: true,
    position: 'start',
    instances: {
      'WHAT_DO_YOU': { en: 'What do you', uz: 'Siz nima', wh: 'What', aux: 'do', subject: 'you' },
      'WHAT_DOES_HE': { en: 'What does he', uz: 'U nima', wh: 'What', aux: 'does', subject: 'he' },
      'WHAT_DOES_SHE': { en: 'What does she', uz: 'U nima', wh: 'What', aux: 'does', subject: 'she' },
      'WHERE_DO_YOU': { en: 'Where do you', uz: 'Siz qayerda', wh: 'Where', aux: 'do', subject: 'you' },
      'WHERE_DOES_HE': { en: 'Where does he', uz: 'U qayerda', wh: 'Where', aux: 'does', subject: 'he' },
      'WHEN_DO_YOU': { en: 'When do you', uz: 'Siz qachon', wh: 'When', aux: 'do', subject: 'you' },
      'WHY_DO_YOU': { en: 'Why do you', uz: 'Siz nega', wh: 'Why', aux: 'do', subject: 'you' },
      'HOW_DO_YOU': { en: 'How do you', uz: 'Siz qanday', wh: 'How', aux: 'do', subject: 'you' },
      // BE questions
      'WHAT_ARE_YOU': { en: 'What are you', uz: 'Siz nima', wh: 'What', aux: 'are', subject: 'you' },
      'WHERE_ARE_YOU': { en: 'Where are you', uz: 'Siz qayerdasiz', wh: 'Where', aux: 'are', subject: 'you' },
      'HOW_ARE_YOU': { en: 'How are you', uz: 'Qandaysiz', wh: 'How', aux: 'are', subject: 'you' }
    }
  },

  // ─── PRESENT CONTINUOUS (Unit 2+) ───
  SUBJECT_BE_VERB_ING: {
    id: 'SUBJECT_BE_VERB_ING',
    label: 'Present Continuous',
    description: 'Subject + be + verb-ing (action happening now)',
    introducedUnit: 2,
    pattern: '{subject} {be} {verb}ing',
    isIndivisible: false, // Partially divisible - subject+be is chunk, verb-ing varies
    position: 'start',
    subChunks: ['SUBJECT_BE'], // References SUBJECT_BE chunk
    instances: {
      // These are templates - verb will be inserted
    }
  },

  // ─── NOUN PHRASES (Units 3-5) ───
  NOUN_PHRASE_BASIC: {
    id: 'NOUN_PHRASE_BASIC',
    label: 'Basic Noun Phrase',
    description: 'Determiner/Possessive + Noun',
    introducedUnit: 3,
    pattern: '{det} {noun}',
    isIndivisible: true,
    instances: {
      'MY_FAMILY': { en: 'my family', uz: 'mening oilam', det: 'my', noun: 'family' },
      'MY_SISTER': { en: 'my sister', uz: 'mening singlim', det: 'my', noun: 'sister' },
      'MY_BROTHER': { en: 'my brother', uz: 'mening akam', det: 'my', noun: 'brother' },
      'MY_FATHER': { en: 'my father', uz: 'mening otam', det: 'my', noun: 'father' },
      'MY_MOTHER': { en: 'my mother', uz: 'mening onam', det: 'my', noun: 'mother' },
      'THE_FAMILY': { en: 'the family', uz: 'oila', det: 'the', noun: 'family' },
      'THE_CHILDREN': { en: 'the children', uz: 'bolalar', det: 'the', noun: 'children' }
    }
  },

  // ─── ADJECTIVE PHRASES (Units 3-5) ───
  ADJECTIVE_PHRASE: {
    id: 'ADJECTIVE_PHRASE',
    label: 'Adjective Phrase',
    description: 'Intensifier + Adjective',
    introducedUnit: 3,
    pattern: '{intensifier} {adjective}',
    isIndivisible: true,
    instances: {
      'VERY_HAPPY': { en: 'very happy', uz: 'juda xursand', intensifier: 'very', adjective: 'happy' },
      'REALLY_TIRED': { en: 'really tired', uz: 'juda charchagan', intensifier: 'really', adjective: 'tired' },
      'SO_HUNGRY': { en: 'so hungry', uz: 'juda och', intensifier: 'so', adjective: 'hungry' }
    }
  },

  // ─── QUANTIFIER PHRASES (Units 6-10) ───
  QUANTIFIER_PHRASE: {
    id: 'QUANTIFIER_PHRASE',
    label: 'Quantifier Phrase',
    description: 'Quantifier + Noun (countable/uncountable)',
    introducedUnit: 6,
    pattern: '{quantifier} {noun}',
    isIndivisible: true,
    countability: 'varies', // Some for countable, some for uncountable
    instances: {
      'A_LOT_OF': { en: 'a lot of', uz: 'ko\'p', quantifier: 'a lot of', for: 'both' },
      'SOME_MILK': { en: 'some milk', uz: 'bir oz sut', quantifier: 'some', noun: 'milk', for: 'uncountable' },
      'SOME_APPLES': { en: 'some apples', uz: 'bir nechta olma', quantifier: 'some', noun: 'apples', for: 'countable' },
      'MANY_PEOPLE': { en: 'many people', uz: 'ko\'p odamlar', quantifier: 'many', noun: 'people', for: 'countable' },
      'MUCH_WATER': { en: 'much water', uz: 'ko\'p suv', quantifier: 'much', noun: 'water', for: 'uncountable' },
      'A_FEW_BOOKS': { en: 'a few books', uz: 'bir nechta kitob', quantifier: 'a few', noun: 'books', for: 'countable' },
      'A_LITTLE_TIME': { en: 'a little time', uz: 'bir oz vaqt', quantifier: 'a little', noun: 'time', for: 'uncountable' }
    }
  }
};

// ============================
// UNIT CHUNK PROGRESSION
// ============================

/**
 * Which chunk types are active per unit
 * Builds progressively - later units include earlier chunks
 */
const UNIT_CHUNK_PROGRESSION = {
  'U01': {
    targetChunks: [], // No target chunks - basic SVO/S-Predicate
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC'], // Passive exposure only
    grammarFocus: ['be_verbs', 'subject_pronouns', 'possessives']
  },
  'U02': {
    targetChunks: ['TIME_ABSOLUTE', 'TIME_PERIOD', 'PLACE_ABSOLUTE', 'ADVERB_MANNER'],
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD', 
                      'TIME_FREQUENCY', 'ADVERB_FREQUENCY', 'PLACE_ABSOLUTE', 'ADVERB_MANNER'],
    grammarFocus: ['present_simple', 'third_person_s', 'adverbs_frequency']
  },
  'U03': {
    targetChunks: ['WH_QUESTION', 'NOUN_PHRASE_BASIC'],
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD',
                      'TIME_FREQUENCY', 'ADVERB_FREQUENCY', 'PLACE_ABSOLUTE', 'ADVERB_MANNER',
                      'WH_QUESTION', 'ADJECTIVE_PHRASE'],
    grammarFocus: ['like_love_hate', 'object_pronouns', 'wh_questions']
  },
  'U04': {
    targetChunks: ['ADJECTIVE_PHRASE'],
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD',
                      'TIME_FREQUENCY', 'PLACE_ABSOLUTE', 'WH_QUESTION', 'ADJECTIVE_PHRASE'],
    grammarFocus: ['was_were', 'past_adjectives']
  },
  'U05': {
    targetChunks: ['TIME_PAST'], // Would need to add past time chunks
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD',
                      'TIME_FREQUENCY', 'PLACE_ABSOLUTE', 'WH_QUESTION', 'ADJECTIVE_PHRASE'],
    grammarFocus: ['past_simple_regular', 'time_markers_past']
  },
  'U06': {
    targetChunks: ['QUANTIFIER_PHRASE'],
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD',
                      'TIME_FREQUENCY', 'PLACE_ABSOLUTE', 'WH_QUESTION', 'ADJECTIVE_PHRASE',
                      'QUANTIFIER_PHRASE'],
    grammarFocus: ['past_simple_irregular', 'negative_didnt']
  },
  // Units 7-10 follow same pattern with progressive additions
  'U07': {
    targetChunks: ['QUANTIFIER_PHRASE'],
    availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD',
                      'TIME_FREQUENCY', 'PLACE_ABSOLUTE', 'WH_QUESTION', 'ADJECTIVE_PHRASE',
                      'QUANTIFIER_PHRASE'],
    grammarFocus: ['future_will', 'future_going_to']
  },
  'U08': { targetChunks: ['QUANTIFIER_PHRASE'], availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD', 'QUANTIFIER_PHRASE'], grammarFocus: [] },
  'U09': { targetChunks: ['QUANTIFIER_PHRASE'], availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD', 'QUANTIFIER_PHRASE'], grammarFocus: [] },
  'U10': { targetChunks: ['QUANTIFIER_PHRASE'], availableChunks: ['SUBJECT_BE', 'NOUN_PHRASE_BASIC', 'TIME_ABSOLUTE', 'TIME_PERIOD', 'QUANTIFIER_PHRASE'], grammarFocus: [] }
};

// ============================
// SENTENCE POSITION RULES
// ============================

/**
 * Rules for chunk positions within sentences
 * Order of precedence for end-position chunks: PLACE → TIME → MANNER
 */
const POSITION_RULES = {
  // Standard word order
  declarative: {
    order: ['SUBJECT', 'ADVERB_FREQUENCY', 'VERB', 'OBJECT', 'ADVERB_MANNER', 'PLACE', 'TIME'],
    notes: {
      ADVERB_FREQUENCY: 'After BE verb, before other verbs',
      PLACE: 'Before TIME if both present',
      TIME: 'Usually last position'
    }
  },
  // Question word order
  interrogative: {
    order: ['WH', 'AUX', 'SUBJECT', 'VERB', 'OBJECT', 'PLACE', 'TIME'],
    notes: {
      WH_QUESTION: 'Entire chunk stays together at start'
    }
  }
};

// ============================
// CHUNK ENGINE
// ============================

const ChunkSystem = {
  /**
   * Get chunk type definition
   * @param {string} chunkTypeId - e.g., 'TIME_ABSOLUTE'
   * @returns {Object|null} Chunk type definition
   */
  getChunkType(chunkTypeId) {
    return CHUNK_TYPES[chunkTypeId] || null;
  },

  /**
   * Get specific chunk instance
   * @param {string} chunkTypeId - e.g., 'TIME_ABSOLUTE'
   * @param {string} instanceId - e.g., 'AT_SEVEN'
   * @returns {Object|null} Chunk instance
   */
  getChunkInstance(chunkTypeId, instanceId) {
    const type = CHUNK_TYPES[chunkTypeId];
    if (!type || !type.instances) return null;
    return type.instances[instanceId] || null;
  },

  /**
   * Get all chunks available for a unit
   * @param {string} unitId - e.g., 'U02'
   * @returns {Object[]} Array of available chunk types with their instances
   */
  getAvailableChunksForUnit(unitId) {
    const progression = UNIT_CHUNK_PROGRESSION[unitId];
    if (!progression) return [];

    return progression.availableChunks.map(chunkTypeId => ({
      ...CHUNK_TYPES[chunkTypeId],
      isTarget: progression.targetChunks.includes(chunkTypeId)
    })).filter(Boolean);
  },

  /**
   * Get target chunks for a unit (new chunks being taught)
   * @param {string} unitId - e.g., 'U02'
   * @returns {Object[]} Array of target chunk types
   */
  getTargetChunksForUnit(unitId) {
    const progression = UNIT_CHUNK_PROGRESSION[unitId];
    if (!progression) return [];

    return progression.targetChunks.map(chunkTypeId => CHUNK_TYPES[chunkTypeId]).filter(Boolean);
  },

  /**
   * Get chunk instances that can be used as variations
   * @param {string} chunkTypeId - e.g., 'TIME_ABSOLUTE'
   * @param {string} unitId - To check if chunk is available
   * @returns {Object[]} Array of usable instances
   */
  getVariationsForChunkType(chunkTypeId, unitId) {
    const type = CHUNK_TYPES[chunkTypeId];
    if (!type || !type.instances) return [];

    // Check if this chunk type is available for the unit
    const progression = UNIT_CHUNK_PROGRESSION[unitId];
    if (!progression || !progression.availableChunks.includes(chunkTypeId)) {
      return [];
    }

    return Object.entries(type.instances).map(([id, instance]) => ({
      id,
      ...instance,
      chunkType: chunkTypeId
    }));
  },

  /**
   * Generate example variations using different chunks
   * Core feature: Creates 3 varied examples for a vocab card
   * 
   * @param {Object} baseExample - Base sentence structure
   * @param {Object} options - Configuration options
   * @returns {Object[]} Array of 3 example variations
   */
  generateExampleVariations(baseExample, options = {}) {
    const {
      unitId = 'U02',
      preserveChunks = [], // Chunks that must stay the same
      varyChunks = [],     // Chunk types to vary
      targetGrammar = null, // Grammar point to reinforce
      includeSubjectVariation = true
    } = options;

    const variations = [];
    const availableChunks = this.getAvailableChunksForUnit(unitId);

    // Example 1: P1 - Target grammar focus
    variations.push({
      ...baseExample,
      priority: 'P1_LESSON',
      grammarFocus: targetGrammar,
      note: 'Target grammar demonstration'
    });

    // Example 2: P2 - Subject variation (3rd person for -s rule)
    if (includeSubjectVariation) {
      const subjectChunks = this.getVariationsForChunkType('NOUN_PHRASE_BASIC', unitId);
      const thirdPersonSubjects = ['My sister', 'My brother', 'My father', 'My mother', 'He', 'She'];
      const selectedSubject = thirdPersonSubjects[Math.floor(Math.random() * thirdPersonSubjects.length)];
      
      variations.push({
        ...baseExample,
        subject: selectedSubject,
        priority: 'P2_UNIT',
        grammarFocus: 'third_person_s',
        note: 'Subject variation for -s rule'
      });
    }

    // Example 3: P3 - Recycled chunk from previous unit
    if (varyChunks.length > 0) {
      const chunkToVary = varyChunks[0];
      const chunkVariations = this.getVariationsForChunkType(chunkToVary, unitId);
      if (chunkVariations.length > 0) {
        const randomChunk = chunkVariations[Math.floor(Math.random() * chunkVariations.length)];
        variations.push({
          ...baseExample,
          [chunkToVary.toLowerCase()]: randomChunk.en,
          priority: 'P3_RECYCLE',
          recycledChunk: randomChunk,
          note: `Varied ${chunkToVary} chunk`
        });
      }
    }

    // Ensure we have 3 examples
    while (variations.length < 3) {
      variations.push({
        ...baseExample,
        priority: 'P2_UNIT',
        note: 'Additional variation'
      });
    }

    return variations.slice(0, 3);
  },

  /**
   * Merge two chunks appropriately based on position rules
   * @param {Object} chunk1 - First chunk
   * @param {Object} chunk2 - Second chunk
   * @param {string} sentenceType - 'declarative' or 'interrogative'
   * @returns {string} Merged sentence fragment
   */
  mergeChunks(chunk1, chunk2, sentenceType = 'declarative') {
    const rules = POSITION_RULES[sentenceType];
    if (!rules) return `${chunk1.en} ${chunk2.en}`;

    const pos1 = rules.order.indexOf(chunk1.chunkType?.toUpperCase() || 'OTHER');
    const pos2 = rules.order.indexOf(chunk2.chunkType?.toUpperCase() || 'OTHER');

    // Order by position rules
    if (pos1 <= pos2) {
      return `${chunk1.en} ${chunk2.en}`;
    } else {
      return `${chunk2.en} ${chunk1.en}`;
    }
  },

  /**
   * Check if a chunk can be used in a given position
   * @param {string} chunkTypeId - Chunk type
   * @param {string} position - Desired position
   * @returns {boolean}
   */
  canUseInPosition(chunkTypeId, position) {
    const type = CHUNK_TYPES[chunkTypeId];
    if (!type) return false;

    if (type.position === position) return true;
    if (type.position === 'start_or_end' && (position === 'start' || position === 'end')) return true;

    return false;
  },

  /**
   * Get cognitive load for a chunk
   * @param {string} chunkTypeId - Chunk type
   * @returns {number} Load value (1-3)
   */
  getChunkLoad(chunkTypeId) {
    const type = CHUNK_TYPES[chunkTypeId];
    if (!type) return 1;

    // More complex chunks = higher load
    if (type.id === 'WH_QUESTION') return 2.5;
    if (type.id === 'QUANTIFIER_PHRASE') return 2;
    if (type.id === 'SUBJECT_BE_VERB_ING') return 2.5;
    if (type.isIndivisible) return 1.5;

    return 1;
  },

  /**
   * Tag a sentence with its chunk components
   * @param {string} sentence - English sentence
   * @param {string} unitId - Current unit
   * @returns {Object} Tagged sentence with chunks identified
   */
  tagSentenceChunks(sentence, unitId) {
    const tagged = {
      original: sentence,
      chunks: [],
      untagged: sentence
    };

    const availableChunks = this.getAvailableChunksForUnit(unitId);

    for (const chunkType of availableChunks) {
      if (!chunkType.instances) continue;

      for (const [instanceId, instance] of Object.entries(chunkType.instances)) {
        if (sentence.toLowerCase().includes(instance.en.toLowerCase())) {
          tagged.chunks.push({
            type: chunkType.id,
            instance: instanceId,
            text: instance.en,
            position: chunkType.position
          });
        }
      }
    }

    return tagged;
  },

  /**
   * Calculate chunk-aware cognitive load for a lesson
   * @param {Object} lesson - Lesson with vocab cards
   * @returns {Object} Load analysis with chunk information
   */
  calculateChunkLoad(lesson) {
    const unitId = lesson?.lesson_id?.split('_')[0] || 'U01';
    const targetChunks = this.getTargetChunksForUnit(unitId);
    const availableChunks = this.getAvailableChunksForUnit(unitId);

    let chunkLoad = 0;
    targetChunks.forEach(chunk => {
      chunkLoad += this.getChunkLoad(chunk.id);
    });

    return {
      targetChunkCount: targetChunks.length,
      availableChunkCount: availableChunks.length,
      chunkLoad,
      recommendation: chunkLoad > 5 ? 'Focus on 1-2 target chunks' : 'Good chunk balance'
    };
  }
};

// ============================
// EXPORTS
// ============================

// Browser global
if (typeof window !== 'undefined') {
  window.ChunkSystem = ChunkSystem;
  window.CHUNK_TYPES = CHUNK_TYPES;
  window.UNIT_CHUNK_PROGRESSION = UNIT_CHUNK_PROGRESSION;
}

// ES module export
export { ChunkSystem, CHUNK_TYPES, UNIT_CHUNK_PROGRESSION, POSITION_RULES };
export default ChunkSystem;
