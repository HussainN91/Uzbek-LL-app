/**
 * Vocab Type Definitions
 * ======================
 * Type definitions for vocabulary data structures.
 * 
 * @module src/types/vocab
 * @version 1.0.0 (Phase 5)
 */

/**
 * Practice example for vocabulary items
 * Supports flexible slot keys (subject, action, time, activity, trigger, etc.)
 */
export interface PracticeExample {
  /** English sentence with target word */
  en?: string;
  /** Legacy sentence field */
  sentence?: string;
  /** Target token in the sentence */
  target?: string;
  /** Full English sentence */
  en_full?: string;
  /** Scenario note for context */
  scenario_note?: string;
  /** Uzbek translation */
  uz?: string;
  /** Audio ID for this example */
  audio_id?: string;
  /** Uzbek situation/context description */
  uz_situation?: string;
  /** Subject/actor for slot-substitution (U02) */
  subject?: string;
  /** Subject with be verb (U02) */
  subject_be?: string;
  /** Priority level (P1_LESSON, P2_UNIT, P3_RECYCLE) (U02) */
  priority?: string;
  /** Grammar focus area (U02) */
  grammarFocus?: string;
  /** Uzbek translation of sentence (U02) */
  sentence_uz?: string;
  /** Which unit this is recycled from (U02) */
  recycledFrom?: string;
  /** Flexible slot keys for slot-substitution pedagogy (U02) */
  [key: string]: any;
}

/**
 * Presentation data for vocabulary introduction
 * Supports both uz_context (U01/U03/U04) and polarity format (U02)
 */
export interface VocabPresentation {
  /** Uzbek context sentences (U01/U03/U04 format) */
  uz_context?: string[];
  /** English context sentences */
  en_context?: string[];
  /** Visual/image reference */
  image_ref?: string;
  /** Uzbek polar question - wrong assumption (U02 polarity format) */
  uz_polar_question?: string;
  /** Uzbek mirror answer - correction (U02 polarity format) */
  uz_mirror_answer?: string;
  /** Syntax scaffold for Mirror Mode (RULE E11) — Uzbek words in English SVO order */
  syntax_scaffold?: string;
}

/**
 * Practice exercises for Hybrid Chunking format
 */
export interface VocabExercises {
  /** Jumble exercise - array of words to arrange */
  jumble?: string[];
  /** Trap exercise - error correction */
  trap?: {
    /** Wrong sentence with error */
    wrong: string;
    /** Explanation/fix for the error */
    fix: string;
  };
  /** Scratch exercise - words to reveal */
  scratch?: string[];
}

/**
 * Single exercise definition for Carousel format
 */
export interface CarouselExercise {
  /** Exercise type: jumble, trap, or scratch */
  type: 'jumble' | 'trap' | 'scratch';
  /** Exercise data - depends on type */
  data: string[] | { wrong: string; fix: string };
}

/**
 * Single slide in the practice_loop carousel
 */
export interface PracticeLoopSlide {
  /** Uzbek clarifying question for this slide */
  context_question?: string;
  /** Mixed Uzbek-English sentence with **target** highlighted */
  hybrid_bridge: string;
  /** Correct English sentence */
  en_canonical: string;
  /** Single exercise for this slide */
  exercise: CarouselExercise;
}

/**
 * Practice data for vocabulary exercises
 * Supports multiple formats: OLD (en_examples), Hybrid Chunking, Slot-Substitution, Tense Toggle
 */
export interface VocabPractice {
  /** English example sentences (OLD format) */
  en_examples?: PracticeExample[];
  /** Gap-fill exercises (OLD format) */
  gap_fill?: string[];
  
  // NEW Hybrid Chunking format fields
  /** Uzbek clarifying question */
  context_question?: string;
  /** Mixed Uzbek-English sentence with **target** highlighted */
  hybrid_bridge?: string;
  /** Correct English sentence */
  en_canonical?: string;
  /** Exercise types for Hybrid Chunking */
  exercises?: VocabExercises;
  
  // U02 Slot-Substitution format fields
  /** Fixed anchor phrase */
  anchor?: string;
  /** Slot type being substituted (SUBJECT, ACTION, TIME, etc.) */
  slot?: string;
  /** Chunks used in this practice (chunk IDs) */
  chunks_used?: string[];
  
  // U02 Tense Toggle format fields (for integration lessons)
  /** Toggle trigger word that switches tense */
  toggle_trigger?: string;
  /** Simple tense form of the sentence */
  simple_form?: string;
  /** Continuous tense form of the sentence */
  continuous_form?: string;
  /** Examples for tense toggle (U02_INT) with extended properties */
  examples?: Array<{
    trigger: string;
    response: string;
    priority?: string;
    grammarFocus?: string;
  }>;
  
  // Single exercise for carousel/practice loop
  /** Exercise for current slide (carousel format) */
  exercise?: { type: 'jumble' | 'trap' | 'scratch'; data: string[] | { wrong: string; fix: string } };
  
  [key: string]: any;
}

/**
 * Production data for active recall exercises
 */
export interface VocabProduction {
  /** Uzbek prompt for production */
  uz_prompt: string;
  /** Expected English target */
  en_target: string;
  /** Acceptable alternatives */
  alternatives?: string[];
  /** Production variant type (legacy) */
  type?: string;
}

/**
 * Reproduction data for sentence reconstruction
 */
export interface VocabReproduction {
  /** Canonical English sentence */
  en_canonical: string;
  /** Uzbek translation */
  uz_translation?: string;
}

/**
 * Individual vocabulary item
 */
export interface VocabItem {
  /** Unique identifier (e.g., "U01_wake_up") */
  id: string;
  /** Reference ID for cross-unit vocabulary */
  ref_id?: string;
  /** English word/phrase */
  en: string;
  /** Alternative English form */
  word?: string;
  /** Uzbek translation */
  uz?: string;
  /** Part of speech */
  pos?: string;
  /** Part of speech in Uzbek */
  pos_uz?: string;
  /** Whether this is a chunk/phrase */
  is_chunk?: boolean;
  /** Whether this is a primary target chunk (U02) */
  is_primary_target?: boolean;
  /** Required grammar pattern */
  requires_grammar?: string;
  /** Can be tested productively */
  can_be_tested_productively?: boolean;
  /** Story position in narrative sequence (U02) */
  story_position?: number;
  /** Tags for categorization (U02) */
  tags?: string[];
  /** Presentation phase data */
  presentation?: VocabPresentation;
  /** Practice phase data (legacy format) */
  practice?: VocabPractice;
  /** Practice loop for Carousel format (old) */
  practice_loop?: PracticeLoopSlide[];
  /** Deep Carousel slides (new) */
  slides?: import('./vocab_slide').VocabSlide[];
  /** Production phase data */
  production?: VocabProduction;
  /** Production variants (legacy) */
  production_variants?: VocabProduction[];
  /** Reproduction phase data */
  reproduction?: VocabReproduction;
  /** Uzbek situation/context */
  uz_situation?: string;
  /** References to other items for integration (U02_INT) */
  reuses?: string[];
  /** Card type (e.g., "action_verb", "state_adjective") */
  type?: string;
  /** Card category grouping */
  category?: string;
  /** Priority level (1 = high, 2 = medium) */
  priority?: number;
  /** Unit where first taught (e.g., "U01", "U04_L01") */
  introduced_in?: string;
  /** Image path */
  image?: string;
  /** Dialogue reference linking card to dialogue bubble */
  dialogue_ref?: import('./vocab_slide').DialogueRef;
  /** Grammar table for grammar cards */
  grammar_table?: Record<string, any>;
  [key: string]: any;
}

/**
 * Vocabulary lesson structure
 */
export interface VocabLesson {
  /** Lesson identifier */
  lesson_id: string;
  /** Lesson title */
  title: string;
  /** Vocabulary items in this lesson */
  items: VocabItem[];
  /** Story theme for narrative-based lessons (U02) */
  story_theme?: string;
  /** Grammar target for the lesson */
  grammar_target?: string;
  /** Flow model (e.g., "sandwich" for 3×2 Successive Mastery Cycle) */
  flow_model?: string;
  /** Source dialogue IDs this lesson draws from */
  source_dialogues?: string[];
  /** Mastery dialogue ID for Phase C check */
  mastery_dialogue_id?: string;
}

/**
 * Vocabulary unit structure (root of vocab_cards_uXX.js)
 */
export interface VocabUnit {
  /** Unit identifier (e.g., "U01") */
  unit_id: string;
  /** Unit title */
  unit_title?: string;
  /** Grammar focus for the unit */
  grammar_focus?: string;
  /** Scalability level (1-5) */
  scalability_level?: number;
  /** Lessons in this unit */
  lessons: Record<string, VocabLesson>;
  /** Dialogues for the unit */
  dialogues?: Record<string, any>;
  /** Cross-unit vocabulary entries */
  cross_unit_vocab?: VocabItem[];
  /** Recycling registry */
  recycling?: {
    mandatory: Record<string, Record<string, string[]>>;
    ratio_target: { min: number; max: number };
  };
  /** Mission metadata (3×2 Successive Mastery Cycle) */
  mission?: import('./vocab_slide').MissionMetadata;
  /** Contrastive turns (grammar gap solution) */
  contrastive_turns?: import('./vocab_slide').ContrastiveTurn[];
  /** Get a vocabulary card by its ID */
  getCardById?(id: string): VocabItem | undefined;
  /** Get all cards for a lesson */
  getCardsForLesson?(lessonId: string): VocabItem[];
  /** Resolve reference item */
  resolveRef?(item: VocabItem): VocabItem;
  /** Get all vocabulary cards */
  getAllCards?(): VocabItem[];
  /** Get total number of lessons */
  getLessonCount?(): number;
  /** Get total number of vocabulary cards */
  getCardCount?(): number;
  /** Get cards by tag (U02 story-based) */
  getCardsByTag?(tag: string): VocabItem[];
  /** Get story sequence for a lesson (U02) */
  getStorySequence?(lessonId: string): VocabItem[];
}

/**
 * Vocabulary card for display
 */
export interface VocabCard {
  /** Vocab item ID */
  id: string;
  /** English word/phrase */
  en: string;
  /** Uzbek translation */
  uz?: string;
  /** Part of speech */
  pos?: string;
  /** Whether completed */
  completed?: boolean;
  /** Familiarity status */
  status?: 'new' | 'familiar' | 'mastered';
}
