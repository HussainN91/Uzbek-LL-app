/**
 * Semantic Tag System
 * ====================
 * Context-specific semantic categories per unit vocabulary.
 * Enables intelligent recycling of semantically compatible words.
 * 
 * DESIGN PRINCIPLE:
 * Tags are derived from actual unit vocabulary, NOT abstract categories.
 * This ensures compatibility checking is grounded in real content.
 * 
 * @module src/core/semantic-tags
 * @version 1.0.0
 * @since January 2026
 */

// ════════════════════════════════════════════════════════════════════════════
// SEMANTIC CATEGORIES BY DOMAIN
// ════════════════════════════════════════════════════════════════════════════

/**
 * Master list of semantic categories with their instances per unit
 * Each category can contain words from multiple units
 */
const SEMANTIC_CATEGORIES = {

  // ═══════════════════════════════════════════════════════════════
  // TIME SEMANTICS (When things happen)
  // ═══════════════════════════════════════════════════════════════
  
  TIME_CLOCK: {
    id: 'TIME_CLOCK',
    label: 'Clock Times',
    description: 'Specific clock times (at + number)',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'at_seven': { en: 'at seven', uz: 'soat yettida', units: ['U02'] },
      'at_eight': { en: 'at eight', uz: 'soat sakkizda', units: ['U02'] },
      'at_nine': { en: 'at nine', uz: 'soat to\'qqizda', units: ['U02'] },
      'at_ten': { en: 'at ten', uz: 'soat o\'nda', units: ['U02'] },
      'at_seven_oclock': { en: "at 7 o'clock", uz: 'soat yettida', units: ['U07'] },
      'at_noon': { en: 'at noon', uz: 'tushda', units: ['U02'] }
    }
  },

  TIME_DAY_PART: {
    id: 'TIME_DAY_PART',
    label: 'Parts of Day',
    description: 'Periods within a day (morning/evening/night)',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'in_the_morning': { en: 'in the morning', uz: 'ertalab', units: ['U02'] },
      'in_the_afternoon': { en: 'in the afternoon', uz: 'tushdan keyin', units: ['U02'] },
      'in_the_evening': { en: 'in the evening', uz: 'kechqurun', units: ['U02'] },
      'at_night': { en: 'at night', uz: 'kechasi', units: ['U02'] }
    }
  },

  TIME_ADVERB: {
    id: 'TIME_ADVERB',
    label: 'Time Adverbs',
    description: 'Adverbs modifying when (early/late as adverbs)',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'early_adv': { en: 'early', uz: 'erta', function: 'adverb', units: ['U02', 'U03'] },
      'late_adv': { en: 'late', uz: 'kech', function: 'adverb', units: ['U02', 'U04'] }
    }
  },

  TIME_FREQUENCY_PHRASE: {
    id: 'TIME_FREQUENCY_PHRASE',
    label: 'Frequency Phrases',
    description: 'How often (every day, on weekends)',
    position: 'start_or_end',
    introducedUnit: 2,
    instances: {
      'every_day': { en: 'every day', uz: 'har kuni', units: ['U02'] },
      'every_morning': { en: 'every morning', uz: 'har kuni ertalab', units: ['U02'] },
      'every_evening': { en: 'every evening', uz: 'har oqshom', units: ['U02'] },
      'on_weekends': { en: 'on weekends', uz: 'dam olish kunlari', units: ['U02'] },
      'on_weekdays': { en: 'on weekdays', uz: 'ish kunlari', units: ['U02'] },
      'every_week': { en: 'every week', uz: 'har hafta', units: ['U03'] }
    }
  },

  TIME_SEQUENCE: {
    id: 'TIME_SEQUENCE',
    label: 'Time Sequences',
    description: 'Before/after relationships',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'after_school': { en: 'after school', uz: 'maktabdan keyin', units: ['U02'] },
      'after_work': { en: 'after work', uz: 'ishdan keyin', units: ['U04'] },
      'before_breakfast': { en: 'before breakfast', uz: 'nonushtadan oldin', units: ['U02'] },
      'after_breakfast': { en: 'after breakfast', uz: 'nonushtadan keyin', units: ['U02'] }
    }
  },

  TIME_NOW: {
    id: 'TIME_NOW',
    label: 'Present Moment',
    description: 'Markers for "happening now"',
    position: 'end',
    introducedUnit: 2,
    triggersTense: 'continuous',
    instances: {
      'now': { en: 'now', uz: 'hozir', units: ['U02'] },
      'right_now': { en: 'right now', uz: 'hozir', units: ['U02'] },
      'at_the_moment': { en: 'at the moment', uz: 'hozirgi paytda', units: ['U02'] }
    }
  },

  TIME_PAST: {
    id: 'TIME_PAST',
    label: 'Past Time Markers',
    description: 'Markers for past events',
    position: 'start_or_end',
    introducedUnit: 4,
    triggersTense: 'past',
    instances: {
      'yesterday': { en: 'yesterday', uz: 'kecha', units: ['U04', 'U05'] },
      'last_night': { en: 'last night', uz: 'kecha kechqurun', units: ['U04', 'U05'] },
      'last_week': { en: 'last week', uz: 'o\'tgan hafta', units: ['U05', 'U07'] },
      'last_summer': { en: 'last summer', uz: 'o\'tgan yoz', units: ['U07'] },
      'ago': { en: 'ago', uz: 'oldin', units: ['U05'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // FREQUENCY ADVERBS (How often - special position)
  // ═══════════════════════════════════════════════════════════════

  FREQUENCY_ADVERB: {
    id: 'FREQUENCY_ADVERB',
    label: 'Frequency Adverbs',
    description: 'Adverbs of frequency (position: before verb, after BE)',
    position: 'before_main_verb',
    specialPosition: { afterBe: true },
    introducedUnit: 2,
    instances: {
      'always': { en: 'always', uz: 'doim', frequency: 100, units: ['U02'] },
      'usually': { en: 'usually', uz: 'odatda', frequency: 80, units: ['U02'] },
      'often': { en: 'often', uz: 'ko\'pincha', frequency: 60, units: ['U02'] },
      'sometimes': { en: 'sometimes', uz: 'ba\'zan', frequency: 40, units: ['U02'], canStartSentence: true },
      'rarely': { en: 'rarely', uz: 'kamdan-kam', frequency: 20, units: ['U02'] },
      'never': { en: 'never', uz: 'hech qachon', frequency: 0, units: ['U02'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // PLACE SEMANTICS (Where things happen)
  // ═══════════════════════════════════════════════════════════════

  PLACE_BUILDING: {
    id: 'PLACE_BUILDING',
    label: 'Buildings/Locations',
    description: 'Named locations (at + building)',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'at_home': { en: 'at home', uz: 'uyda', units: ['U02'] },
      'at_school': { en: 'at school', uz: 'maktabda', units: ['U02'] },
      'at_work': { en: 'at work', uz: 'ishda', units: ['U02'] },
      'at_the_cinema': { en: 'at the cinema', uz: 'kinoteatrda', units: ['U07'] },
      'at_a_restaurant': { en: 'at a restaurant', uz: 'restoranda', units: ['U07', 'U10'] }
    }
  },

  PLACE_ROOM: {
    id: 'PLACE_ROOM',
    label: 'Rooms',
    description: 'Rooms in a house',
    position: 'end',
    introducedUnit: 8,
    instances: {
      'in_the_bedroom': { en: 'in the bedroom', uz: 'yotoq xonasida', units: ['U08'] },
      'in_the_kitchen': { en: 'in the kitchen', uz: 'oshxonada', units: ['U08'] },
      'in_the_living_room': { en: 'in the living room', uz: 'yashash xonasida', units: ['U08'] }
    }
  },

  PLACE_DIRECTION: {
    id: 'PLACE_DIRECTION',
    label: 'Direction/Movement',
    description: 'Movement to/from places',
    position: 'after_verb',
    introducedUnit: 2,
    instances: {
      'to_school': { en: 'to school', uz: 'maktabga', units: ['U02'] },
      'to_work': { en: 'to work', uz: 'ishga', units: ['U02'] },
      'from_home': { en: 'from home', uz: 'uydan', units: ['U02'] },
      'to_the_cinema': { en: 'to the cinema', uz: 'kinoteatrga', units: ['U07'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MANNER ADVERBS (How things are done)
  // ═══════════════════════════════════════════════════════════════

  MANNER_SPEED: {
    id: 'MANNER_SPEED',
    label: 'Speed/Pace',
    description: 'How fast/slow',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'quickly': { en: 'quickly', uz: 'tez', units: ['U02'] },
      'slowly': { en: 'slowly', uz: 'sekin', units: ['U02'] },
      'fast': { en: 'fast', uz: 'tez', units: ['U02'] }
    }
  },

  MANNER_QUALITY: {
    id: 'MANNER_QUALITY',
    label: 'Quality/Care',
    description: 'How carefully/well',
    position: 'end',
    introducedUnit: 2,
    instances: {
      'carefully': { en: 'carefully', uz: 'ehtiyotkorlik bilan', units: ['U02'] },
      'quietly': { en: 'quietly', uz: 'jimgina', units: ['U02'] },
      'loudly': { en: 'loudly', uz: 'baland ovozda', units: ['U02'] },
      'well': { en: 'well', uz: 'yaxshi', units: ['U03'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ROUTINE ACTIONS (What we do regularly)
  // ═══════════════════════════════════════════════════════════════

  ROUTINE_MORNING: {
    id: 'ROUTINE_MORNING',
    label: 'Morning Routine',
    description: 'Actions typically done in morning',
    position: 'verb',
    introducedUnit: 2,
    instances: {
      'wake_up': { en: 'wake up', uz: 'uyg\'onmoq', thirdPerson: 'wakes up', transitivity: 'intransitive', animacy: 'animate_only', units: ['U02'] },
      'get_up': { en: 'get up', uz: 'turmoq', thirdPerson: 'gets up', transitivity: 'intransitive', animacy: 'animate_only', units: ['U02'] },
      'get_dressed': { en: 'get dressed', uz: 'kiyinmoq', thirdPerson: 'gets dressed', transitivity: 'intransitive', animacy: 'animate_only', units: ['U02'] },
      'brush_teeth': { en: 'brush my teeth', uz: 'tish yuvmoq', thirdPerson: 'brushes his/her teeth', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02'] },
      'leave_house': { en: 'leave the house', uz: 'uydan chiqmoq', thirdPerson: 'leaves the house', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02'] },
      'take_shower': { en: 'take a shower', uz: 'dush qabul qilmoq', thirdPerson: 'takes a shower', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02'] }
    }
  },

  ROUTINE_DAILY: {
    id: 'ROUTINE_DAILY',
    label: 'Daily Activities',
    description: 'General daily activities',
    position: 'verb',
    introducedUnit: 2,
    instances: {
      'go_to_school': { en: 'go to school', uz: 'maktabga bormoq', thirdPerson: 'goes to school', transitivity: 'intransitive', animacy: 'animate_only', units: ['U02'] },
      'do_homework': { en: 'do homework', uz: 'uy vazifasini qilmoq', thirdPerson: 'does homework', transitivity: 'transitive', animacy: 'animate_only', units: ['U02', 'U03'] },
      'watch_tv': { en: 'watch TV', uz: 'televizor ko\'rmoq', thirdPerson: 'watches TV', transitivity: 'transitive', animacy: 'animate_only', units: ['U02'] },
      'play_games': { en: 'play games', uz: 'o\'yin o\'ynamoq', thirdPerson: 'plays games', transitivity: 'transitive', animacy: 'animate_only', units: ['U02'] },
      'read_books': { en: 'read books', uz: 'kitob o\'qimoq', thirdPerson: 'reads books', transitivity: 'transitive', animacy: 'animate_only', units: ['U02', 'U03'] },
      'study': { en: 'study', uz: 'o\'qimoq', thirdPerson: 'studies', transitivity: 'intransitive', animacy: 'animate_only', units: ['U02', 'U05'] }
    }
  },

  ROUTINE_EATING: {
    id: 'ROUTINE_EATING',
    label: 'Eating Activities',
    description: 'Meals and eating',
    position: 'verb',
    introducedUnit: 2,
    instances: {
      'have_breakfast': { en: 'have breakfast', uz: 'nonushta qilmoq', thirdPerson: 'has breakfast', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02'] },
      'have_lunch': { en: 'have lunch', uz: 'tushlik qilmoq', thirdPerson: 'has lunch', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02'] },
      'have_dinner': { en: 'have dinner', uz: 'kechki ovqat yemoq', thirdPerson: 'has dinner', transitivity: 'transitive_fixed', animacy: 'animate_only', units: ['U02', 'U07'] },
      'eat': { en: 'eat', uz: 'yemoq', thirdPerson: 'eats', pastSimple: 'ate', transitivity: 'transitive', animacy: 'animate_only', units: ['U02', 'U07'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // SUBJECTS (Who does the action)
  // ═══════════════════════════════════════════════════════════════

  SUBJECT_PRONOUN: {
    id: 'SUBJECT_PRONOUN',
    label: 'Subject Pronouns',
    description: 'Personal pronouns as subjects',
    position: 'start',
    introducedUnit: 1,
    instances: {
      'i': { en: 'I', uz: 'Men', beForm: 'am', verbEnding: '', animacy: 'animate', units: ['U01'] },
      'you': { en: 'You', uz: 'Siz', beForm: 'are', verbEnding: '', animacy: 'animate', units: ['U01'] },
      'he': { en: 'He', uz: 'U', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'she': { en: 'She', uz: 'U', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'it': { en: 'It', uz: 'U', beForm: 'is', verbEnding: 's', animacy: 'inanimate', units: ['U01'] },
      'we': { en: 'We', uz: 'Biz', beForm: 'are', verbEnding: '', animacy: 'animate', units: ['U01'] },
      'they': { en: 'They', uz: 'Ular', beForm: 'are', verbEnding: '', animacy: 'both', units: ['U01'] }
    }
  },

  SUBJECT_FAMILY: {
    id: 'SUBJECT_FAMILY',
    label: 'Family Members',
    description: 'Family as subjects (3rd person)',
    position: 'start',
    introducedUnit: 1,
    requiresThirdPerson: true,
    animacy: 'animate',  // All family members are animate
    instances: {
      'my_father': { en: 'My father', uz: 'Mening otam', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'my_mother': { en: 'My mother', uz: 'Mening onam', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'my_sister': { en: 'My sister', uz: 'Mening singlim', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'my_brother': { en: 'My brother', uz: 'Mening akam', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] },
      'my_parents': { en: 'My parents', uz: 'Mening ota-onam', beForm: 'are', verbEnding: '', animacy: 'animate', units: ['U01'] },
      'my_family': { en: 'My family', uz: 'Mening oilam', beForm: 'is', verbEnding: 's', animacy: 'animate', units: ['U01'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // STATES & FEELINGS (Adjectives with BE)
  // ═══════════════════════════════════════════════════════════════

  STATE_FEELING: {
    id: 'STATE_FEELING',
    label: 'Feelings/Emotions',
    description: 'Emotional states (used with BE)',
    position: 'after_be',
    introducedUnit: 4,
    requiresBe: true,
    instances: {
      'happy': { en: 'happy', uz: 'xursand', units: ['U02', 'U04'] },
      'tired': { en: 'tired', uz: 'charchagan', units: ['U02', 'U04'] },
      'hungry': { en: 'hungry', uz: 'och', units: ['U03', 'U04'] },
      'busy': { en: 'busy', uz: 'band', units: ['U02', 'U04'] },
      'fine': { en: 'fine', uz: 'yaxshi', units: ['U01', 'U04'] }
    }
  },

  STATE_TEMPORAL: {
    id: 'STATE_TEMPORAL',
    label: 'Temporal States',
    description: 'Time-related states (early/late)',
    position: 'after_be',
    introducedUnit: 2,
    requiresBe: true,
    instances: {
      'late': { en: 'late', uz: 'kech', units: ['U02', 'U04'] },
      'early': { en: 'early', uz: 'erta', units: ['U02'] },
      'on_time': { en: 'on time', uz: 'vaqtida', units: ['U02'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // PREFERENCE VERBS (Stative - no continuous)
  // ═══════════════════════════════════════════════════════════════

  PREFERENCE_VERB: {
    id: 'PREFERENCE_VERB',
    label: 'Preference Verbs',
    description: 'Verbs of liking/wanting (STATIVE - no -ing)',
    position: 'verb',
    introducedUnit: 3,
    isStative: true,
    noContinuous: true,
    instances: {
      'like': { en: 'like', uz: 'yoqtirmoq', thirdPerson: 'likes', transitivity: 'transitive', animacy: 'animate_only', units: ['U03'] },
      'love': { en: 'love', uz: 'sevmoq', thirdPerson: 'loves', transitivity: 'transitive', animacy: 'animate_only', units: ['U03'] },
      'hate': { en: 'hate', uz: 'yomon ko\'rmoq', thirdPerson: 'hates', transitivity: 'transitive', animacy: 'animate_only', units: ['U03'] },
      'want': { en: 'want', uz: 'xohlamoq', thirdPerson: 'wants', transitivity: 'transitive', animacy: 'animate_only', units: ['U03'] },
      'need': { en: 'need', uz: 'kerak', thirdPerson: 'needs', transitivity: 'transitive', animacy: 'animate_only', units: ['U03', 'U08'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // OBJECTS (What we act upon)
  // ═══════════════════════════════════════════════════════════════

  OBJECT_FOOD: {
    id: 'OBJECT_FOOD',
    label: 'Food Items',
    description: 'Food as objects',
    position: 'after_verb',
    introducedUnit: 3,
    animacy: 'inanimate',  // All food is inanimate
    instances: {
      'pizza': { en: 'pizza', uz: 'pitsa', animacy: 'inanimate', units: ['U03', 'U07'] },
      'breakfast': { en: 'breakfast', uz: 'nonushta', animacy: 'inanimate', units: ['U02'] },
      'lunch': { en: 'lunch', uz: 'tushlik', animacy: 'inanimate', units: ['U02'] },
      'dinner': { en: 'dinner', uz: 'kechki ovqat', animacy: 'inanimate', units: ['U02', 'U07'] }
    }
  },

  OBJECT_ENTERTAINMENT: {
    id: 'OBJECT_ENTERTAINMENT',
    label: 'Entertainment Objects',
    description: 'Things for entertainment',
    position: 'after_verb',
    introducedUnit: 2,
    animacy: 'inanimate',  // All entertainment objects are inanimate
    instances: {
      'tv': { en: 'TV', uz: 'televizor', animacy: 'inanimate', units: ['U02'] },
      'games': { en: 'games', uz: 'o\'yinlar', animacy: 'inanimate', units: ['U02'] },
      'music': { en: 'music', uz: 'musiqa', animacy: 'inanimate', units: ['U03'] },
      'book': { en: 'a book', uz: 'kitob', animacy: 'inanimate', units: ['U02', 'U03'] },
      'movie': { en: 'a movie', uz: 'film', animacy: 'inanimate', units: ['U06', 'U07'] }
    }
  },

  OBJECT_FURNITURE: {
    id: 'OBJECT_FURNITURE',
    label: 'Furniture Items',
    description: 'Furniture and room objects',
    position: 'after_verb',
    introducedUnit: 8,
    animacy: 'inanimate',  // All furniture is inanimate
    instances: {
      'bed': { en: 'bed', uz: 'karavot', animacy: 'inanimate', units: ['U08'] },
      'chair': { en: 'chair', uz: 'stul', animacy: 'inanimate', units: ['U08'] },
      'armchair': { en: 'armchair', uz: 'kreslo', animacy: 'inanimate', units: ['U08'] },
      'table': { en: 'table', uz: 'stol', animacy: 'inanimate', units: ['U08'] },
      'bookshelf': { en: 'bookshelf', uz: 'kitob javoni', animacy: 'inanimate', units: ['U08'] }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // PAST VERBS (Irregular forms)
  // ═══════════════════════════════════════════════════════════════

  PAST_IRREGULAR: {
    id: 'PAST_IRREGULAR',
    label: 'Irregular Past Verbs',
    description: 'Irregular past tense verbs',
    position: 'verb',
    introducedUnit: 7,
    instances: {
      'went': { en: 'went', uz: 'bordi', base: 'go', transitivity: 'intransitive', animacy: 'animate_only', units: ['U07'] },
      'ate': { en: 'ate', uz: 'yedi', base: 'eat', transitivity: 'transitive', animacy: 'animate_only', units: ['U07'] },
      'saw': { en: 'saw', uz: 'ko\'rdi', base: 'see', transitivity: 'transitive', animacy: 'animate_only', units: ['U06', 'U07'] },
      'had': { en: 'had', uz: 'edi/bor edi', base: 'have', transitivity: 'transitive', animacy: 'animate_only', units: ['U07'] },
      'was': { en: 'was', uz: 'edi', base: 'be', transitivity: 'copula', animacy: 'both', units: ['U04'] },
      'were': { en: 'were', uz: 'edi (ko\'plik)', base: 'be', transitivity: 'copula', animacy: 'both', units: ['U04'] }
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// UNIT-SPECIFIC SEMANTIC POOLS
// ════════════════════════════════════════════════════════════════════════════

/**
 * What semantic categories are available for each unit
 * This controls what can be recycled WHERE
 */
const UNIT_SEMANTIC_POOLS = {
  'U01': {
    introduced: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING'],
    canRecycle: [] // Nothing to recycle yet
  },
  'U02': {
    introduced: [
      'TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'TIME_NOW', 'TIME_ADVERB',
      'FREQUENCY_ADVERB',
      'PLACE_BUILDING', 'PLACE_DIRECTION',
      'MANNER_SPEED', 'MANNER_QUALITY',
      'ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING',
      'STATE_TEMPORAL',
      'OBJECT_ENTERTAINMENT'
    ],
    canRecycle: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING']
  },
  'U03': {
    introduced: ['PREFERENCE_VERB', 'OBJECT_FOOD'],
    canRecycle: [
      'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING',
      'TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE',
      'FREQUENCY_ADVERB', 'PLACE_BUILDING',
      'ROUTINE_DAILY', 'OBJECT_ENTERTAINMENT'
    ]
  },
  'U04': {
    introduced: ['TIME_PAST', 'PAST_IRREGULAR'],
    canRecycle: [
      'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING',
      'TIME_CLOCK', 'TIME_DAY_PART', 'FREQUENCY_ADVERB',
      'PLACE_BUILDING', 'ROUTINE_DAILY'
    ]
  },
  'U05': {
    introduced: [],
    canRecycle: [
      'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING', 'TIME_PAST',
      'PLACE_BUILDING', 'ROUTINE_DAILY'
    ]
  },
  'U06': {
    introduced: [],
    canRecycle: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_PAST', 'PLACE_BUILDING']
  },
  'U07': {
    introduced: ['PAST_IRREGULAR'],
    canRecycle: [
      'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_PAST', 'TIME_CLOCK',
      'PLACE_BUILDING', 'OBJECT_FOOD'
    ]
  },
  'U08': {
    introduced: ['PLACE_ROOM', 'OBJECT_FURNITURE'],
    canRecycle: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING']
  },
  'U09': {
    introduced: [],
    canRecycle: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'STATE_FEELING']
  },
  'U10': {
    introduced: [],
    canRecycle: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING', 'OBJECT_FOOD']
  }
};

// ════════════════════════════════════════════════════════════════════════════
// SEMANTIC COMPATIBILITY MATRIX
// ════════════════════════════════════════════════════════════════════════════

/**
 * Which semantic categories can co-occur in the same sentence
 * Prevents nonsensical combinations
 */
const SEMANTIC_COMPATIBILITY = {
  // ─── TIME CATEGORIES ───
  TIME_CLOCK: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'PLACE_BUILDING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'MANNER_SPEED', 'MANNER_QUALITY'],
    incompatible: ['TIME_DAY_PART', 'TIME_NOW', 'TIME_PAST'], // Don't mix "at seven" with "in the morning"
    notes: 'Use clock time OR day part, not both'
  },
  TIME_DAY_PART: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'PLACE_BUILDING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_SEQUENCE', 'MANNER_SPEED'],
    incompatible: ['TIME_CLOCK'], // "in the morning at seven" is redundant
    notes: 'Day parts are broader than clock times'
  },
  TIME_FREQUENCY_PHRASE: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'PLACE_BUILDING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'FREQUENCY_ADVERB'],
    incompatible: ['TIME_NOW', 'TIME_PAST'], // Frequency phrases are for present habits
    notes: 'Every day/week patterns for routines'
  },
  TIME_SEQUENCE: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'TIME_DAY_PART', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY'],
    incompatible: ['TIME_NOW'], // After school is not "now"
    notes: 'Before/after sequences for routine ordering'
  },
  TIME_NOW: {
    compatible: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING', 'PLACE_ROOM'], // Present continuous only
    incompatible: ['TIME_PAST', 'TIME_CLOCK', 'TIME_FREQUENCY_PHRASE', 'FREQUENCY_ADVERB', 'ROUTINE_MORNING', 'ROUTINE_DAILY'],
    notes: 'NOW triggers continuous tense, not routines'
  },
  TIME_PAST: {
    compatible: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PAST_IRREGULAR', 'PLACE_BUILDING', 'TIME_CLOCK'],
    incompatible: ['TIME_NOW', 'ROUTINE_MORNING', 'ROUTINE_DAILY', 'FREQUENCY_ADVERB'], // Past doesn't use routine verbs
    notes: 'Past markers require past tense verbs'
  },
  TIME_ADVERB: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_DAY_PART'],
    incompatible: ['TIME_NOW'], // "wake up early" is routine, not happening now
    notes: 'Early/late as adverbs modify when action happens'
  },

  // ─── FREQUENCY CATEGORY ───
  FREQUENCY_ADVERB: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'PLACE_BUILDING'],
    incompatible: ['TIME_NOW', 'TIME_PAST'], // Frequency is for habits, not moments
    notes: 'Frequency adverbs go with present simple (routines)'
  },

  // ─── PLACE CATEGORIES ───
  PLACE_BUILDING: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_CLOCK', 'TIME_DAY_PART', 'TIME_PAST', 'FREQUENCY_ADVERB', 'MANNER_SPEED'],
    incompatible: [], // Buildings compatible with most things
    notes: 'At home/school/work - location context'
  },
  PLACE_ROOM: {
    compatible: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_NOW', 'STATE_FEELING', 'OBJECT_FURNITURE'],
    incompatible: ['ROUTINE_MORNING'], // Morning routines are more general
    notes: 'In the bedroom/kitchen - indoor locations (Unit 8+)'
  },
  PLACE_DIRECTION: {
    compatible: ['ROUTINE_DAILY', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_CLOCK', 'TIME_DAY_PART'],
    incompatible: ['TIME_NOW', 'STATE_FEELING'], // To school implies motion, not static state
    notes: 'To/from places - movement verbs'
  },

  // ─── MANNER CATEGORIES ───
  MANNER_SPEED: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_CLOCK', 'TIME_DAY_PART', 'PLACE_BUILDING'],
    incompatible: ['STATE_FEELING', 'STATE_TEMPORAL'], // Quickly/slowly don't go with BE+adjective
    notes: 'How fast an action is performed'
  },
  MANNER_QUALITY: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING'],
    incompatible: ['STATE_FEELING', 'STATE_TEMPORAL'], // Carefully/quietly don't go with states
    notes: 'Quality of how action is performed'
  },

  // ─── VERB CATEGORIES ───
  ROUTINE_MORNING: {
    compatible: ['TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'TIME_ADVERB', 'FREQUENCY_ADVERB', 'MANNER_SPEED', 'MANNER_QUALITY', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING'],
    incompatible: ['TIME_NOW', 'TIME_PAST', 'STATE_FEELING', 'PREFERENCE_VERB'],
    notes: 'Morning routines are present simple actions'
  },
  ROUTINE_DAILY: {
    compatible: ['TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'TIME_ADVERB', 'FREQUENCY_ADVERB', 'MANNER_SPEED', 'MANNER_QUALITY', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING', 'PLACE_DIRECTION', 'OBJECT_ENTERTAINMENT'],
    incompatible: ['TIME_NOW', 'TIME_PAST', 'STATE_FEELING'],
    notes: 'Daily activities - can take objects (watch TV, play games)'
  },
  ROUTINE_EATING: {
    compatible: ['TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'FREQUENCY_ADVERB', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING', 'OBJECT_FOOD'],
    incompatible: ['TIME_NOW', 'TIME_PAST', 'STATE_FEELING', 'MANNER_SPEED'], // Don't eat "quickly" in A1
    notes: 'Eating activities with fixed objects'
  },
  PREFERENCE_VERB: {
    compatible: ['OBJECT_FOOD', 'OBJECT_ENTERTAINMENT', 'OBJECT_FURNITURE', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'FREQUENCY_ADVERB'],
    incompatible: ['TIME_NOW', 'TIME_PAST', 'ROUTINE_MORNING', 'ROUTINE_DAILY'], // Stative verbs can't be continuous
    notes: 'Like/love/hate are STATIVE - never use -ing'
  },
  PAST_IRREGULAR: {
    compatible: ['TIME_PAST', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'PLACE_BUILDING', 'OBJECT_FOOD', 'OBJECT_ENTERTAINMENT'],
    incompatible: ['TIME_NOW', 'FREQUENCY_ADVERB', 'ROUTINE_MORNING', 'ROUTINE_DAILY'], // Past doesn't mix with present
    notes: 'Irregular past verbs require past time markers'
  },

  // ─── SUBJECT CATEGORIES ───
  SUBJECT_PRONOUN: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'PREFERENCE_VERB', 'PAST_IRREGULAR', 'TIME_CLOCK', 'TIME_DAY_PART', 'TIME_NOW', 'TIME_PAST', 'FREQUENCY_ADVERB', 'PLACE_BUILDING', 'PLACE_ROOM', 'STATE_FEELING', 'STATE_TEMPORAL'],
    incompatible: [],
    notes: 'Pronouns are universal subjects'
  },
  SUBJECT_FAMILY: {
    compatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'ROUTINE_EATING', 'PREFERENCE_VERB', 'PAST_IRREGULAR', 'TIME_CLOCK', 'TIME_DAY_PART', 'TIME_NOW', 'TIME_PAST', 'FREQUENCY_ADVERB', 'PLACE_BUILDING', 'STATE_FEELING'],
    incompatible: [],
    notes: 'Family members require 3rd person -s on verbs'
  },

  // ─── STATE CATEGORIES ───
  STATE_FEELING: {
    compatible: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_NOW', 'TIME_PAST', 'FREQUENCY_ADVERB', 'PLACE_BUILDING', 'PLACE_ROOM'],
    incompatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'MANNER_SPEED', 'MANNER_QUALITY'], // States use BE, not action verbs
    notes: 'Happy/tired/hungry require BE verb'
  },
  STATE_TEMPORAL: {
    compatible: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_NOW', 'TIME_DAY_PART', 'PLACE_BUILDING'],
    incompatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'MANNER_SPEED', 'MANNER_QUALITY'], // Late/early as adjectives use BE
    notes: 'I am late/early - temporal states with BE'
  },

  // ─── OBJECT CATEGORIES ───
  OBJECT_FOOD: {
    compatible: ['PREFERENCE_VERB', 'ROUTINE_EATING', 'PAST_IRREGULAR', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY'],
    incompatible: ['ROUTINE_MORNING', 'TIME_NOW'], // Food as object, not with morning verbs
    notes: 'Food items as objects of transitive verbs'
  },
  OBJECT_ENTERTAINMENT: {
    compatible: ['ROUTINE_DAILY', 'PREFERENCE_VERB', 'PAST_IRREGULAR', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY', 'TIME_DAY_PART', 'FREQUENCY_ADVERB'],
    incompatible: ['ROUTINE_MORNING', 'STATE_FEELING'], // Entertainment is activity, not state
    notes: 'TV/games/books as objects'
  },
  OBJECT_FURNITURE: {
    compatible: ['PREFERENCE_VERB', 'PLACE_ROOM', 'SUBJECT_PRONOUN', 'SUBJECT_FAMILY'],
    incompatible: ['ROUTINE_MORNING', 'ROUTINE_DAILY', 'TIME_NOW'], // Furniture is U8+, specific context
    notes: 'Furniture items for describing rooms'
  }
};

// ════════════════════════════════════════════════════════════════════════════
// ANIMACY RULES (What can act on what)
// ════════════════════════════════════════════════════════════════════════════

/**
 * Animacy values:
 * - 'animate': Living beings (people, animals)
 * - 'inanimate': Non-living things (objects, food, furniture)
 * - 'both': Can be either (they, was/were)
 * - 'animate_only': Verb requires animate subject (wake_up, eat, like)
 */
const ANIMACY_RULES = {
  // What subjects can merge with what verbs
  SUBJECT_VERB_MERGE: {
    'animate': {
      canUseVerbs: ['animate_only', 'both'],  // Animate subjects can use all verbs
      description: 'Living beings can do any action'
    },
    'inanimate': {
      canUseVerbs: ['both'],  // Inanimate can only use verbs that allow both
      description: 'Objects can\'t wake up, eat, or like things'
    },
    'both': {
      canUseVerbs: ['animate_only', 'both'],  // "They" can be people or things
      description: 'Ambiguous subject depends on context'
    }
  },

  // What verbs can take what objects
  VERB_OBJECT_MERGE: {
    'transitive': {
      requiresObject: true,
      objectAnimacy: ['animate', 'inanimate', 'both'],  // Can take any object
      examples: ['I like pizza', 'I see my friend']
    },
    'transitive_fixed': {
      requiresObject: 'embedded',  // Object is part of verb phrase
      objectAnimacy: null,  // "have breakfast" - object is fixed
      examples: ['I have breakfast', 'I brush my teeth']
    },
    'intransitive': {
      requiresObject: false,
      objectAnimacy: null,  // No object allowed
      examples: ['I wake up', 'I go to school']
    },
    'copula': {
      requiresObject: false,
      takesComplement: true,  // Takes adjective/noun complement
      examples: ['I am happy', 'She is a teacher']
    }
  },

  // Categories by animacy for quick lookup
  // NOTE: SUBJECT_PRONOUN is MIXED (contains animate he/she/I + inanimate it + both they)
  ANIMATE_CATEGORIES: ['SUBJECT_FAMILY'],  // All family members are animate
  INANIMATE_CATEGORIES: ['OBJECT_FOOD', 'OBJECT_ENTERTAINMENT', 'OBJECT_FURNITURE'],
  MIXED_CATEGORIES: ['SUBJECT_PRONOUN'],  // Contains animate (I/you/he/she/we), inanimate (it), both (they)

  // Per-instance animacy lookup helper
  // Use SemanticTagEngine.getSubjectAnimacy() for actual lookups
  PRONOUN_ANIMACY_MAP: {
    'i': 'animate',
    'you': 'animate',
    'he': 'animate',
    'she': 'animate',
    'it': 'inanimate',
    'we': 'animate',
    'they': 'both'
  }
};

// ════════════════════════════════════════════════════════════════════════════
// TRANSITIVITY RULES (Verb patterns)
// ════════════════════════════════════════════════════════════════════════════

/**
 * Transitivity controls sentence structure:
 * - transitive: Subject + Verb + Object (I like pizza)
 * - transitive_fixed: Subject + Verb-Phrase (I have breakfast)
 * - intransitive: Subject + Verb (+ optional adverb/place) (I wake up early)
 * - copula: Subject + BE + Complement (I am happy)
 */
const TRANSITIVITY_RULES = {
  // Which verb categories can merge together
  VERB_MERGE_RULES: {
    'transitive': {
      canMergeWith: ['transitive'],  // "I like..." can swap with "I love..."
      requiresObjectCategory: true,
      validObjectCategories: ['OBJECT_FOOD', 'OBJECT_ENTERTAINMENT', 'OBJECT_FURNITURE'],
      notes: 'Transitive verbs can swap if they take same object types'
    },
    'transitive_fixed': {
      canMergeWith: ['transitive_fixed', 'intransitive'],  // "I have breakfast" ↔ "I wake up"
      requiresObjectCategory: false,  // Object is embedded
      notes: 'Fixed transitives act like intransitives for swapping'
    },
    'intransitive': {
      canMergeWith: ['intransitive', 'transitive_fixed'],  // "I wake up" ↔ "I get dressed"
      requiresObjectCategory: false,
      notes: 'Intransitives can swap freely (same sentence structure)'
    },
    'copula': {
      canMergeWith: ['copula'],  // "I am happy" ↔ "I am tired"
      requiresComplement: true,
      validComplementCategories: ['STATE_FEELING', 'STATE_TEMPORAL'],
      notes: 'Copula verbs require adjective/noun complement'
    }
  },

  // Sentence patterns by transitivity
  SENTENCE_PATTERNS: {
    'transitive': '[SUBJECT] [VERB] [OBJECT] ([ADVERB/TIME])',
    'transitive_fixed': '[SUBJECT] [VERB-PHRASE] ([ADVERB/TIME])',
    'intransitive': '[SUBJECT] [VERB] ([ADVERB]) ([PLACE]) ([TIME])',
    'copula': '[SUBJECT] [BE] [COMPLEMENT] ([ADVERB/TIME])'
  },

  // Category transitivity lookup
  CATEGORY_TRANSITIVITY: {
    'ROUTINE_MORNING': 'mixed',  // Contains both trans and intrans
    'ROUTINE_DAILY': 'mixed',
    'ROUTINE_EATING': 'transitive_fixed',
    'PREFERENCE_VERB': 'transitive',
    'PAST_IRREGULAR': 'mixed'
  }
};

// ════════════════════════════════════════════════════════════════════════════
// SEMANTIC SWAP GROUPS (Intra-Card Substitution)
// ════════════════════════════════════════════════════════════════════════════

/**
 * Categories that can be swapped WITHIN a single vocab card's examples
 * These share the same semantic "slot" in a sentence
 * 
 * Example: "I wake up at seven" → "I wake up in the morning"
 * Both fill the TIME slot at end of sentence
 */
const SEMANTIC_SWAP_GROUPS = {
  // TIME group - all answer "when?"
  TIME: {
    id: 'TIME',
    label: 'Time Expressions',
    description: 'Any expression answering "when?"',
    categories: ['TIME_CLOCK', 'TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'TIME_ADVERB'],
    position: 'end',
    swapRules: {
      // FULLY SYMMETRIC swap rules
      'TIME_CLOCK': ['TIME_DAY_PART', 'TIME_FREQUENCY_PHRASE'], // at seven ↔ in the morning / every day
      'TIME_DAY_PART': ['TIME_CLOCK', 'TIME_FREQUENCY_PHRASE', 'TIME_SEQUENCE', 'TIME_ADVERB'], // in the morning ↔ all others
      'TIME_FREQUENCY_PHRASE': ['TIME_CLOCK', 'TIME_DAY_PART', 'TIME_SEQUENCE'], // every day ↔ all others
      'TIME_SEQUENCE': ['TIME_FREQUENCY_PHRASE', 'TIME_DAY_PART'], // after school ↔ every day / in the afternoon
      'TIME_ADVERB': ['TIME_DAY_PART'] // early/late ↔ in the morning
    },
    excludeFromSwap: ['TIME_NOW', 'TIME_PAST'] // These change tense, don't swap freely
  },

  // PLACE group - all answer "where?"
  PLACE: {
    id: 'PLACE',
    label: 'Place Expressions',
    description: 'Any expression answering "where?"',
    categories: ['PLACE_BUILDING', 'PLACE_ROOM', 'PLACE_DIRECTION'],
    position: 'end',
    swapRules: {
      'PLACE_BUILDING': ['PLACE_ROOM'], // at home → in the bedroom
      'PLACE_ROOM': ['PLACE_BUILDING'], // in the bedroom → at home
      'PLACE_DIRECTION': [] // to school can't swap easily (different meaning)
    }
  },

  // FREQUENCY group - all answer "how often?" (position: before verb)
  FREQUENCY: {
    id: 'FREQUENCY',
    label: 'Frequency Expressions',
    description: 'Adverbs of frequency (before main verb)',
    categories: ['FREQUENCY_ADVERB'],
    position: 'before_main_verb',
    swapRules: {
      'FREQUENCY_ADVERB': ['FREQUENCY_ADVERB'] // always → usually → often → sometimes
    },
    internalSwapOnly: true // Only swap within same category
  },

  // MANNER group - all answer "how?"
  MANNER: {
    id: 'MANNER',
    label: 'Manner Expressions',
    description: 'Adverbs of manner (how something is done)',
    categories: ['MANNER_SPEED', 'MANNER_QUALITY'],
    position: 'end',
    swapRules: {
      'MANNER_SPEED': ['MANNER_QUALITY'], // quickly → carefully
      'MANNER_QUALITY': ['MANNER_SPEED'] // carefully → quickly
    }
  },

  // SUBJECT group - who does the action
  SUBJECT: {
    id: 'SUBJECT',
    label: 'Subject Expressions',
    description: 'Who performs the action',
    categories: ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY'],
    position: 'start',
    swapRules: {
      'SUBJECT_PRONOUN': ['SUBJECT_FAMILY'], // I → My sister
      'SUBJECT_FAMILY': ['SUBJECT_PRONOUN'] // My sister → She
    },
    grammarImpact: 'third_person_s' // Swapping may require verb conjugation
  }
};

// ════════════════════════════════════════════════════════════════════════════
// SEMANTIC TAG ENGINE
// ════════════════════════════════════════════════════════════════════════════

const SemanticTagEngine = {
  /**
   * Get all instances of a semantic category
   */
  getCategory(categoryId) {
    return SEMANTIC_CATEGORIES[categoryId] || null;
  },

  /**
   * Get instances available for a specific unit
   */
  getInstancesForUnit(categoryId, unitId) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category) return [];

    return Object.entries(category.instances)
      .filter(([_, instance]) => instance.units.includes(unitId))
      .map(([id, instance]) => ({ id, ...instance }));
  },

  /**
   * Get all semantic categories available for a unit (introduced + recyclable)
   */
  getAvailableCategoriesForUnit(unitId) {
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return [];

    const available = [...pool.introduced, ...pool.canRecycle];
    return available.map(catId => ({
      id: catId,
      ...SEMANTIC_CATEGORIES[catId],
      isIntroduced: pool.introduced.includes(catId),
      isRecycled: pool.canRecycle.includes(catId)
    })).filter(cat => cat.label); // Filter out undefined
  },

  /**
   * Check if two semantic categories can co-occur
   */
  areCompatible(categoryId1, categoryId2) {
    const compat1 = SEMANTIC_COMPATIBILITY[categoryId1];
    const compat2 = SEMANTIC_COMPATIBILITY[categoryId2];

    // If no rules, assume compatible
    if (!compat1 && !compat2) return true;

    // Check incompatibility from both sides
    if (compat1?.incompatible?.includes(categoryId2)) return false;
    if (compat2?.incompatible?.includes(categoryId1)) return false;

    return true;
  },

  /**
   * Get compatible substitutes for a semantic instance
   * Key function for semantic recycling
   */
  getSemanticSubstitutes(instanceId, categoryId, unitId) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category) return [];

    // Get all other instances in same category available for this unit
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return [];

    const availableCategories = [...pool.introduced, ...pool.canRecycle];
    if (!availableCategories.includes(categoryId)) return [];

    return Object.entries(category.instances)
      .filter(([id, instance]) => {
        if (id === instanceId) return false; // Exclude self
        return instance.units.some(u => {
          const unitNum = parseInt(u.replace('U', ''));
          const currentUnitNum = parseInt(unitId.replace('U', ''));
          return unitNum <= currentUnitNum; // Only from current or earlier units
        });
      })
      .map(([id, instance]) => ({
        id,
        ...instance,
        categoryId
      }));
  },

  /**
   * Generate a P3_RECYCLE example using semantic substitution
   */
  generateSemanticRecycleExample(baseExample, slotToVary, unitId) {
    const categoryId = this.inferCategoryForSlot(slotToVary, baseExample);
    if (!categoryId) return null;

    const substitutes = this.getSemanticSubstitutes(
      baseExample[slotToVary],
      categoryId,
      unitId
    );

    if (substitutes.length === 0) return null;

    const substitute = substitutes[Math.floor(Math.random() * substitutes.length)];

    return {
      ...baseExample,
      [slotToVary]: substitute.en,
      priority: 'P3_RECYCLE',
      recycledFrom: substitute.units[0],
      semanticCategory: categoryId,
      originalValue: baseExample[slotToVary]
    };
  },

  /**
   * Infer semantic category from a slot in an example
   */
  inferCategoryForSlot(slotName, example) {
    const slotValue = example[slotName];
    if (!slotValue) return null;

    // Search all categories for this value
    for (const [catId, category] of Object.entries(SEMANTIC_CATEGORIES)) {
      for (const [instanceId, instance] of Object.entries(category.instances)) {
        if (instance.en.toLowerCase() === slotValue.toLowerCase()) {
          return catId;
        }
      }
    }

    return null;
  },

  /**
   * Tag a vocab card's examples with semantic categories
   */
  tagExamplesWithSemantics(examples, unitId) {
    return examples.map(example => {
      const tags = [];

      // Check each known slot
      for (const [slotName, slotValue] of Object.entries(example)) {
        if (typeof slotValue !== 'string') continue;

        const categoryId = this.inferCategoryForSlot(slotName, example);
        if (categoryId) {
          tags.push({
            slot: slotName,
            category: categoryId,
            value: slotValue
          });
        }
      }

      return {
        ...example,
        semanticTags: tags
      };
    });
  },

  // ═══════════════════════════════════════════════════════════════
  // INTRA-CARD SEMANTIC SWAPPING
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get the swap group for a category
   * @param {string} categoryId - e.g., 'TIME_CLOCK'
   * @returns {Object|null} Swap group definition
   */
  getSwapGroup(categoryId) {
    for (const [groupId, group] of Object.entries(SEMANTIC_SWAP_GROUPS)) {
      if (group.categories.includes(categoryId)) {
        return { groupId, ...group };
      }
    }
    return null;
  },

  /**
   * Get categories that can substitute for a given category (intra-card)
   * @param {string} categoryId - Source category
   * @returns {string[]} Array of swappable category IDs
   */
  getSwappableCategories(categoryId) {
    const group = this.getSwapGroup(categoryId);
    if (!group) return [];

    const swapRules = group.swapRules[categoryId];
    if (!swapRules) return [];

    return swapRules;
  },

  /**
   * Get all possible swaps for a semantic value within a card
   * Returns instances from OTHER categories in the same swap group
   * 
   * @param {string} currentValue - e.g., 'at seven'
   * @param {string} categoryId - e.g., 'TIME_CLOCK'
   * @param {string} unitId - Current unit for availability check
   * @returns {Object[]} Array of swap options with category info
   */
  getIntraCardSwaps(currentValue, categoryId, unitId) {
    const swappableCategories = this.getSwappableCategories(categoryId);
    if (swappableCategories.length === 0) return [];

    const swaps = [];
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return [];

    const availableCategories = [...pool.introduced, ...pool.canRecycle];

    for (const swapCategoryId of swappableCategories) {
      // Check if swap category is available for this unit
      if (!availableCategories.includes(swapCategoryId)) continue;

      const category = SEMANTIC_CATEGORIES[swapCategoryId];
      if (!category) continue;

      // Get instances from this category available for the unit
      for (const [instanceId, instance] of Object.entries(category.instances)) {
        // Skip if same as current value
        if (instance.en.toLowerCase() === currentValue.toLowerCase()) continue;

        // Check unit availability
        const isAvailable = instance.units.some(u => {
          const unitNum = parseInt(u.replace('U', ''));
          const currentUnitNum = parseInt(unitId.replace('U', ''));
          return unitNum <= currentUnitNum;
        });

        if (isAvailable) {
          swaps.push({
            id: instanceId,
            ...instance,
            categoryId: swapCategoryId,
            swapType: categoryId === swapCategoryId ? 'same_category' : 'cross_category',
            originalCategory: categoryId
          });
        }
      }
    }

    return swaps;
  },

  /**
   * Generate intra-card variation by swapping time/place semantics
   * Core function for semantic recycling within a single card
   * 
   * @param {Object} baseExample - Original example
   * @param {string} slotToSwap - Which slot to vary (e.g., 'time', 'place')
   * @param {string} unitId - Current unit
   * @param {Object} options - Configuration options
   * @returns {Object|null} New example with swapped semantics
   */
  generateIntraCardSwap(baseExample, slotToSwap, unitId, options = {}) {
    const {
      preferCrossCategory = true, // Prefer swaps to different categories
      excludeValues = []          // Values to exclude from selection
    } = options;

    // Find what's in the slot
    const currentValue = baseExample[slotToSwap];
    if (!currentValue) return null;

    // Infer category
    const categoryId = this.inferCategoryFromValue(currentValue);
    if (!categoryId) return null;

    // Get swap options
    let swaps = this.getIntraCardSwaps(currentValue, categoryId, unitId);

    // Filter exclusions
    swaps = swaps.filter(s => !excludeValues.includes(s.en));

    if (swaps.length === 0) return null;

    // Prefer cross-category swaps if option enabled
    if (preferCrossCategory) {
      const crossCategorySwaps = swaps.filter(s => s.swapType === 'cross_category');
      if (crossCategorySwaps.length > 0) {
        swaps = crossCategorySwaps;
      }
    }

    // Select random swap
    const selectedSwap = swaps[Math.floor(Math.random() * swaps.length)];

    return {
      ...baseExample,
      [slotToSwap]: selectedSwap.en,
      [`${slotToSwap}_uz`]: selectedSwap.uz,
      priority: 'P3_RECYCLE',
      semanticSwap: {
        original: currentValue,
        swapped: selectedSwap.en,
        fromCategory: categoryId,
        toCategory: selectedSwap.categoryId,
        swapType: selectedSwap.swapType
      }
    };
  },

  /**
   * Infer category from a value string (searches all categories)
   */
  inferCategoryFromValue(value) {
    if (!value) return null;
    const normalized = value.toLowerCase();

    for (const [catId, category] of Object.entries(SEMANTIC_CATEGORIES)) {
      for (const [_, instance] of Object.entries(category.instances)) {
        if (instance.en.toLowerCase() === normalized) {
          return catId;
        }
      }
    }
    return null;
  },

  /**
   * Generate all 3 priority examples for a card with semantic swapping
   * 
   * @param {Object} cardData - Card with anchor, slot info
   * @param {string} unitId - Current unit
   * @returns {Object[]} Array of 3 examples: P1, P2, P3
   */
  generateCardExamples(cardData, unitId) {
    const { anchor, baseSubject = 'I', timeSlot, placeSlot } = cardData;
    const examples = [];

    // P1: Target grammar - first person, base form
    examples.push({
      sentence: `**${baseSubject}** ${anchor}.`,
      subject: baseSubject,
      priority: 'P1_LESSON',
      grammarFocus: 'target_structure'
    });

    // P2: Grammar variation - 3rd person
    const thirdPersonSubjects = ['She', 'He', 'My sister', 'My brother', 'My father'];
    const p2Subject = thirdPersonSubjects[Math.floor(Math.random() * thirdPersonSubjects.length)];
    examples.push({
      sentence: `**${p2Subject}** ${this.conjugateForThirdPerson(anchor)}.`,
      subject: p2Subject,
      priority: 'P2_UNIT',
      grammarFocus: 'third_person_s'
    });

    // P3: Semantic swap - vary time OR place
    const slotToSwap = timeSlot || placeSlot;
    if (slotToSwap) {
      const p3Example = this.generateIntraCardSwap(
        { [slotToSwap]: cardData[slotToSwap], anchor, subject: baseSubject },
        slotToSwap,
        unitId
      );
      if (p3Example) {
        examples.push({
          sentence: `**${baseSubject}** ${anchor.replace(cardData[slotToSwap], p3Example[slotToSwap])}.`,
          subject: baseSubject,
          priority: 'P3_RECYCLE',
          semanticSwap: p3Example.semanticSwap
        });
      }
    }

    // Fallback if P3 failed
    if (examples.length < 3) {
      examples.push({
        sentence: `**They** ${anchor}.`,
        subject: 'They',
        priority: 'P2_UNIT',
        grammarFocus: 'plural_subject'
      });
    }

    return examples;
  },

  /**
   * Simple 3rd person conjugation helper
   */
  conjugateForThirdPerson(phrase) {
    // Handle common irregular verbs
    if (phrase.startsWith('have ')) return phrase.replace('have ', 'has ');
    if (phrase.startsWith('do ')) return phrase.replace('do ', 'does ');
    if (phrase.startsWith('go ')) return phrase.replace('go ', 'goes ');
    if (phrase.startsWith('watch ')) return phrase.replace('watch ', 'watches ');
    if (phrase.startsWith('brush ')) return phrase.replace('brush ', 'brushes ');

    // Find the first verb and add -s/-es
    const words = phrase.split(' ');
    if (words.length > 0) {
      const verb = words[0];
      if (verb.endsWith('s') || verb.endsWith('x') || verb.endsWith('sh') || verb.endsWith('ch')) {
        words[0] = verb + 'es';
      } else if (verb.endsWith('y') && !['a','e','i','o','u'].includes(verb[verb.length-2])) {
        words[0] = verb.slice(0, -1) + 'ies';
      } else {
        words[0] = verb + 's';
      }
    }
    return words.join(' ');
  },

  /**
   * Get all recyclable content for a unit
   */
  getRecyclableContentForUnit(unitId) {
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return {};

    const recyclable = {};

    for (const categoryId of pool.canRecycle) {
      const category = SEMANTIC_CATEGORIES[categoryId];
      if (!category) continue;

      recyclable[categoryId] = {
        ...category,
        instances: Object.entries(category.instances)
          .filter(([_, instance]) => {
            // Only include from earlier units
            return instance.units.some(u => {
              const unitNum = parseInt(u.replace('U', ''));
              const currentUnitNum = parseInt(unitId.replace('U', ''));
              return unitNum < currentUnitNum;
            });
          })
          .reduce((acc, [id, instance]) => {
            acc[id] = instance;
            return acc;
          }, {})
      };
    }

    return recyclable;
  },

  // ═══════════════════════════════════════════════════════════════
  // ANIMACY & TRANSITIVITY CHECKING
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get animacy of a subject instance
   * @param {string} instanceId - e.g., 'he', 'my_father'
   * @param {string} categoryId - e.g., 'SUBJECT_PRONOUN'
   * @returns {string} 'animate', 'inanimate', or 'both'
   */
  getSubjectAnimacy(instanceId, categoryId) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category?.instances?.[instanceId]) {
      return 'both'; // Default if unknown
    }
    return category.instances[instanceId].animacy || category.animacy || 'both';
  },

  /**
   * Get transitivity of a verb instance
   * @param {string} instanceId - e.g., 'wake_up', 'like'
   * @param {string} categoryId - e.g., 'ROUTINE_MORNING'
   * @returns {string} 'transitive', 'transitive_fixed', 'intransitive', or 'copula'
   */
  getVerbTransitivity(instanceId, categoryId) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category?.instances?.[instanceId]) {
      return null;
    }
    return category.instances[instanceId].transitivity || null;
  },

  /**
   * Get animacy requirement of a verb (what subjects it allows)
   * @param {string} instanceId - e.g., 'wake_up'
   * @param {string} categoryId - e.g., 'ROUTINE_MORNING'
   * @returns {string} 'animate_only' or 'both'
   */
  getVerbAnimacyRequirement(instanceId, categoryId) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category?.instances?.[instanceId]) {
      return 'both';
    }
    return category.instances[instanceId].animacy || 'both';
  },

  /**
   * Check if a subject can use a verb (animacy compatibility)
   * @param {Object} subject - { instanceId, categoryId }
   * @param {Object} verb - { instanceId, categoryId }
   * @returns {boolean}
   */
  canSubjectUseVerb(subject, verb) {
    const subjectAnimacy = this.getSubjectAnimacy(subject.instanceId, subject.categoryId);
    const verbRequirement = this.getVerbAnimacyRequirement(verb.instanceId, verb.categoryId);

    // Look up rule
    const rule = ANIMACY_RULES.SUBJECT_VERB_MERGE[subjectAnimacy];
    if (!rule) return true; // Default allow

    return rule.canUseVerbs.includes(verbRequirement);
  },

  /**
   * Check if two verbs can be swapped (transitivity compatibility)
   * @param {Object} verb1 - { instanceId, categoryId }
   * @param {Object} verb2 - { instanceId, categoryId }
   * @returns {boolean}
   */
  canVerbsMerge(verb1, verb2) {
    const trans1 = this.getVerbTransitivity(verb1.instanceId, verb1.categoryId);
    const trans2 = this.getVerbTransitivity(verb2.instanceId, verb2.categoryId);

    if (!trans1 || !trans2) return false;

    // Look up merge rules
    const rule = TRANSITIVITY_RULES.VERB_MERGE_RULES[trans1];
    if (!rule) return false;

    return rule.canMergeWith.includes(trans2);
  },

  /**
   * Get all verbs of a specific transitivity from a category
   * @param {string} categoryId - e.g., 'ROUTINE_MORNING'
   * @param {string} transitivity - e.g., 'intransitive'
   * @returns {Object[]} Array of matching verb instances
   */
  getVerbsByTransitivity(categoryId, transitivity) {
    const category = SEMANTIC_CATEGORIES[categoryId];
    if (!category) return [];

    return Object.entries(category.instances)
      .filter(([_, instance]) => instance.transitivity === transitivity)
      .map(([id, instance]) => ({ id, categoryId, ...instance }));
  },

  /**
   * Get all subjects that can use a specific verb (by animacy)
   * @param {Object} verb - { instanceId, categoryId }
   * @param {string} unitId - Current unit for availability check
   * @returns {Object[]} Array of valid subjects
   */
  getValidSubjectsForVerb(verb, unitId) {
    const verbRequirement = this.getVerbAnimacyRequirement(verb.instanceId, verb.categoryId);
    const validAnimacies = verbRequirement === 'animate_only' 
      ? ['animate', 'both'] 
      : ['animate', 'inanimate', 'both'];

    const validSubjects = [];
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return [];

    const subjectCategories = ['SUBJECT_PRONOUN', 'SUBJECT_FAMILY'];
    const availableCategories = [...pool.introduced, ...pool.canRecycle];

    for (const categoryId of subjectCategories) {
      if (!availableCategories.includes(categoryId)) continue;

      const category = SEMANTIC_CATEGORIES[categoryId];
      if (!category) continue;

      for (const [instanceId, instance] of Object.entries(category.instances)) {
        const subjectAnimacy = instance.animacy || category.animacy || 'both';
        if (validAnimacies.includes(subjectAnimacy)) {
          validSubjects.push({
            id: instanceId,
            categoryId,
            ...instance
          });
        }
      }
    }

    return validSubjects;
  },

  /**
   * Get valid objects for a transitive verb
   * @param {Object} verb - { instanceId, categoryId }
   * @param {string} unitId - Current unit
   * @returns {Object[]} Array of valid objects
   */
  getValidObjectsForVerb(verb, unitId) {
    const transitivity = this.getVerbTransitivity(verb.instanceId, verb.categoryId);
    
    // Only transitive verbs take free objects
    if (transitivity !== 'transitive') return [];

    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return [];

    const availableCategories = [...pool.introduced, ...pool.canRecycle];
    const objectCategories = ANIMACY_RULES.INANIMATE_CATEGORIES;
    const validObjects = [];

    for (const categoryId of objectCategories) {
      if (!availableCategories.includes(categoryId)) continue;

      const category = SEMANTIC_CATEGORIES[categoryId];
      if (!category) continue;

      for (const [instanceId, instance] of Object.entries(category.instances)) {
        validObjects.push({
          id: instanceId,
          categoryId,
          ...instance
        });
      }
    }

    return validObjects;
  },

  /**
   * Filter swap candidates by animacy/transitivity rules
   * Enhanced version of getIntraCardSwaps that respects grammar rules
   */
  getValidSwaps(currentValue, categoryId, unitId, contextVerb = null) {
    // Get base swaps
    let swaps = this.getIntraCardSwaps(currentValue, categoryId, unitId);

    // If no verb context, return all swaps
    if (!contextVerb) return swaps;

    // Filter by animacy if swapping subjects
    const swapGroup = this.getSwapGroup(categoryId);
    if (swapGroup?.id === 'SUBJECT') {
      const verbRequirement = this.getVerbAnimacyRequirement(
        contextVerb.instanceId, 
        contextVerb.categoryId
      );
      
      if (verbRequirement === 'animate_only') {
        swaps = swaps.filter(swap => {
          const animacy = swap.animacy || 'both';
          return animacy === 'animate' || animacy === 'both';
        });
      }
    }

    return swaps;
  }
};

// ════════════════════════════════════════════════════════════════════════════
// DEBUG & TRACING
// ════════════════════════════════════════════════════════════════════════════

const SemanticDebug = {
  /**
   * Log semantic substitution decision
   */
  logSubstitution(original, substitute, category, reason) {
    if (typeof console !== 'undefined' && console.debug) {
      console.debug(`[SemanticTag] ${original} → ${substitute.en} (${category}): ${reason}`);
    }
  },

  /**
   * DEEP AUDIT: Validate entire semantic tag system for consistency
   * Run this to check for issues in tag definitions
   * @returns {Object} Audit report with all issues found
   */
  auditTagSystem() {
    const audit = {
      timestamp: new Date().toISOString(),
      issues: [],
      warnings: [],
      stats: {
        totalCategories: 0,
        totalInstances: 0,
        verbsWithTransitivity: 0,
        verbsWithoutTransitivity: 0,
        subjectsWithAnimacy: 0,
        objectsWithAnimacy: 0,
        swapRulesSymmetric: 0,
        swapRulesAsymmetric: 0,
        compatibilityRules: 0,
        categoriesMissingCompatibility: []
      }
    };

    // ─── 1. Check all categories for required fields ───
    for (const [catId, category] of Object.entries(SEMANTIC_CATEGORIES)) {
      audit.stats.totalCategories++;

      if (!category.id) {
        audit.issues.push({ type: 'MISSING_ID', category: catId });
      }
      if (!category.position) {
        audit.issues.push({ type: 'MISSING_POSITION', category: catId });
      }
      if (!category.instances || Object.keys(category.instances).length === 0) {
        audit.issues.push({ type: 'NO_INSTANCES', category: catId });
      }

      // Count instances
      const instanceCount = Object.keys(category.instances || {}).length;
      audit.stats.totalInstances += instanceCount;

      // ─── 2. Check verb categories for transitivity ───
      if (category.position === 'verb') {
        for (const [instId, instance] of Object.entries(category.instances || {})) {
          if (instance.transitivity) {
            audit.stats.verbsWithTransitivity++;
            // Validate transitivity value
            if (!['transitive', 'transitive_fixed', 'intransitive', 'copula'].includes(instance.transitivity)) {
              audit.issues.push({
                type: 'INVALID_TRANSITIVITY',
                category: catId,
                instance: instId,
                value: instance.transitivity
              });
            }
          } else {
            audit.stats.verbsWithoutTransitivity++;
            audit.warnings.push({
              type: 'VERB_MISSING_TRANSITIVITY',
              category: catId,
              instance: instId
            });
          }

          // Check animacy requirement for verbs
          if (!instance.animacy) {
            audit.warnings.push({
              type: 'VERB_MISSING_ANIMACY',
              category: catId,
              instance: instId
            });
          }
        }
      }

      // ─── 3. Check subject categories for animacy ───
      if (category.position === 'start' && (catId.includes('SUBJECT') || catId.includes('PRONOUN'))) {
        for (const [instId, instance] of Object.entries(category.instances || {})) {
          if (instance.animacy) {
            audit.stats.subjectsWithAnimacy++;
            // Validate animacy value
            if (!['animate', 'inanimate', 'both'].includes(instance.animacy)) {
              audit.issues.push({
                type: 'INVALID_ANIMACY',
                category: catId,
                instance: instId,
                value: instance.animacy
              });
            }
          } else {
            audit.warnings.push({
              type: 'SUBJECT_MISSING_ANIMACY',
              category: catId,
              instance: instId
            });
          }
        }
      }

      // ─── 4. Check object categories for animacy ───
      if (catId.includes('OBJECT')) {
        for (const [instId, instance] of Object.entries(category.instances || {})) {
          if (instance.animacy) {
            audit.stats.objectsWithAnimacy++;
          } else if (!category.animacy) { // Category-level animacy counts
            audit.warnings.push({
              type: 'OBJECT_MISSING_ANIMACY',
              category: catId,
              instance: instId
            });
          }
        }
      }

      // ─── 5. Check for duplicate instances across categories ───
      for (const [instId, instance] of Object.entries(category.instances || {})) {
        const enValue = instance.en?.toLowerCase();
        for (const [otherCatId, otherCat] of Object.entries(SEMANTIC_CATEGORIES)) {
          if (otherCatId === catId) continue;
          for (const [otherInstId, otherInst] of Object.entries(otherCat.instances || {})) {
            if (otherInst.en?.toLowerCase() === enValue && instId !== otherInstId) {
              // Only warn if they're in the same semantic domain
              if (catId.split('_')[0] === otherCatId.split('_')[0]) {
                audit.warnings.push({
                  type: 'DUPLICATE_VALUE',
                  value: enValue,
                  categories: [catId, otherCatId],
                  instances: [instId, otherInstId]
                });
              }
            }
          }
        }
      }
    }

    // ─── 6. Check SEMANTIC_COMPATIBILITY for all categories ───
    audit.stats.compatibilityRules = Object.keys(SEMANTIC_COMPATIBILITY).length;
    for (const catId of Object.keys(SEMANTIC_CATEGORIES)) {
      if (!SEMANTIC_COMPATIBILITY[catId]) {
        audit.stats.categoriesMissingCompatibility.push(catId);
      }
    }

    // ─── 7. Check swap rules for symmetry ───
    for (const [groupId, group] of Object.entries(SEMANTIC_SWAP_GROUPS)) {
      for (const [fromCat, toCats] of Object.entries(group.swapRules || {})) {
        for (const toCat of toCats) {
          const reverseRules = group.swapRules[toCat] || [];
          if (reverseRules.includes(fromCat)) {
            audit.stats.swapRulesSymmetric++;
          } else {
            audit.stats.swapRulesAsymmetric++;
            audit.warnings.push({
              type: 'ASYMMETRIC_SWAP_RULE',
              group: groupId,
              from: fromCat,
              to: toCat,
              message: `${fromCat} → ${toCat} exists, but ${toCat} → ${fromCat} does not`
            });
          }
        }
      }
    }

    // ─── 8. Check UNIT_SEMANTIC_POOLS references ───
    for (const [unitId, pool] of Object.entries(UNIT_SEMANTIC_POOLS)) {
      const allCats = [...(pool.introduced || []), ...(pool.canRecycle || [])];
      for (const catId of allCats) {
        if (!SEMANTIC_CATEGORIES[catId]) {
          audit.issues.push({
            type: 'INVALID_CATEGORY_REFERENCE',
            unit: unitId,
            category: catId,
            message: `Unit ${unitId} references non-existent category ${catId}`
          });
        }
      }
    }

    // ─── Summary ───
    audit.summary = {
      criticalIssues: audit.issues.length,
      warnings: audit.warnings.length,
      passed: audit.issues.length === 0,
      message: audit.issues.length === 0
        ? '✅ Semantic tag system is valid'
        : `❌ Found ${audit.issues.length} critical issues and ${audit.warnings.length} warnings`
    };

    return audit;
  },

  /**
   * Validate that a unit's vocab uses only valid semantic categories
   */
  validateUnitVocab(vocabCards, unitId) {
    const issues = [];
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    const availableCategories = [...(pool?.introduced || []), ...(pool?.canRecycle || [])];

    // Check each card's examples
    for (const card of vocabCards) {
      if (!card.slides) continue;

      for (const slide of card.slides) {
        if (!slide.practice?.en_examples) continue;

        for (const example of slide.practice.en_examples) {
          // Check semantic tags if present
          if (example.semanticTags) {
            for (const tag of example.semanticTags) {
              if (!availableCategories.includes(tag.category)) {
                issues.push({
                  cardId: card.id,
                  issue: `Uses ${tag.category} but not available in ${unitId}`,
                  value: tag.value
                });
              }
            }
          }
        }
      }
    }

    return issues;
  },

  /**
   * Generate compatibility report for a unit
   */
  generateCompatibilityReport(unitId) {
    const pool = UNIT_SEMANTIC_POOLS[unitId];
    if (!pool) return { error: 'Unknown unit' };

    const available = [...pool.introduced, ...pool.canRecycle];
    const report = {
      unitId,
      availableCategories: available.length,
      compatibilityMatrix: {}
    };

    for (const cat1 of available) {
      report.compatibilityMatrix[cat1] = {};
      for (const cat2 of available) {
        if (cat1 === cat2) {
          report.compatibilityMatrix[cat1][cat2] = 'self';
        } else {
          report.compatibilityMatrix[cat1][cat2] = SemanticTagEngine.areCompatible(cat1, cat2);
        }
      }
    }

    return report;
  }
};

// ════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════════════════════

// Browser global
if (typeof window !== 'undefined') {
  window.SEMANTIC_CATEGORIES = SEMANTIC_CATEGORIES;
  window.UNIT_SEMANTIC_POOLS = UNIT_SEMANTIC_POOLS;
  window.SEMANTIC_COMPATIBILITY = SEMANTIC_COMPATIBILITY;
  window.SEMANTIC_SWAP_GROUPS = SEMANTIC_SWAP_GROUPS;
  window.ANIMACY_RULES = ANIMACY_RULES;
  window.TRANSITIVITY_RULES = TRANSITIVITY_RULES;
  window.SemanticTagEngine = SemanticTagEngine;
  window.SemanticDebug = SemanticDebug;
}

// ES module export
export {
  SEMANTIC_CATEGORIES,
  UNIT_SEMANTIC_POOLS,
  SEMANTIC_COMPATIBILITY,
  SEMANTIC_SWAP_GROUPS,
  ANIMACY_RULES,
  TRANSITIVITY_RULES,
  SemanticTagEngine,
  SemanticDebug
};

export default SemanticTagEngine;
