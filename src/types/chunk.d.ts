/**
 * Chunk System Type Definitions
 * =============================
 * Type definitions for the linguistic chunk system.
 * 
 * @module src/types/chunk
 * @version 1.0.0
 */

/**
 * Priority levels for examples in vocab cards
 * - P1_LESSON: Direct grammar target for current lesson
 * - P2_UNIT: Unit-level variation (e.g., 3rd person -s)
 * - P3_RECYCLE: Recycled content from previous units
 */
export type ExamplePriority = 'P1_LESSON' | 'P2_UNIT' | 'P3_RECYCLE' | string;

/**
 * Position where a chunk can appear in a sentence
 */
export type ChunkPosition = 'start' | 'end' | 'start_or_end' | 'before_main_verb' | 'after_verb' | string;

/**
 * Verb form for conjugation
 */
export type VerbForm = 'base' | 'third_s' | string;

/**
 * A single chunk instance (e.g., "at seven", "in the morning")
 */
export interface ChunkInstance {
  /** English text */
  en: string;
  /** Uzbek translation */
  uz: string;
  /** Preposition (for prepositional chunks) */
  prep?: string;
  /** Time/place/period noun */
  time?: string;
  place?: string;
  period?: string;
  /** Subject (for subject+be chunks) */
  subject?: string;
  /** BE verb form (am/is/are) */
  be?: string;
  /** Frequency percentage (for adverbs of frequency) */
  frequency?: number;
  /** Can this chunk start a sentence? */
  canStartSentence?: boolean;
  /** Position preference */
  position?: ChunkPosition;
  /** Countability (for quantifier phrases) */
  for?: 'countable' | 'uncountable' | 'both';
}

/**
 * Definition of a chunk type (e.g., TIME_ABSOLUTE, PLACE_ABSOLUTE)
 */
export interface ChunkType {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Description of the chunk type */
  description: string;
  /** Unit where this chunk is introduced */
  introducedUnit: number;
  /** Pattern template (e.g., "at {time}") */
  pattern: string;
  /** Whether the chunk should not be broken up */
  isIndivisible: boolean;
  /** Preferred position in sentence */
  position?: ChunkPosition;
  /** Special positioning rules */
  specialRule?: string;
  /** References to other chunk types this depends on */
  subChunks?: string[];
  /** All instances of this chunk type */
  instances: Record<string, ChunkInstance>;
}

/**
 * Unit chunk progression - what chunks are available/targeted per unit
 */
export interface UnitChunkProgression {
  /** Chunks actively being taught in this unit */
  targetChunks: string[];
  /** All chunks available for use (including previous units) */
  availableChunks: string[];
  /** Grammar points focused on in this unit */
  grammarFocus: string[];
}

/**
 * Subject with grammatical information
 */
export interface SubjectInfo {
  /** English subject */
  en: string;
  /** Uzbek translation */
  uz: string;
  /** Which verb form to use */
  verbForm: VerbForm;
  /** Unit where this subject was introduced (for recycling) */
  recycledFrom?: string;
}

/**
 * An example with priority and chunk metadata
 */
export interface PrioritizedExample {
  /** Full sentence with subject highlighted */
  sentence: string;
  /** Subject used in this example */
  subject: string;
  /** Priority level */
  priority: ExamplePriority;
  /** Grammar focus of this example */
  grammarFocus?: string;
  /** Uzbek translation */
  sentence_uz?: string;
  /** Source unit if recycled */
  recycledFrom?: string | null;
  /** Chunk used if varying chunks */
  chunk?: ChunkInstance;
  /** Chunk type if using chunk variation */
  chunkType?: string;
  /** Note about this example */
  note?: string;
}

/**
 * Result of tagging a sentence with chunks
 */
export interface TaggedSentence {
  /** Original sentence */
  original: string;
  /** Identified chunks */
  chunks: Array<{
    type: string;
    instance: string;
    text: string;
    position: ChunkPosition;
  }>;
  /** Parts not matched to any chunk */
  untagged: string;
}

/**
 * Chunk load analysis result
 */
export interface ChunkLoadAnalysis {
  /** Number of target chunks for this unit */
  targetChunkCount: number;
  /** Total available chunks */
  availableChunkCount: number;
  /** Cognitive load from chunks */
  chunkLoad: number;
  /** Recommendation for chunk focus */
  recommendation: string;
}

/**
 * Validation result for examples
 */
export interface ExampleValidation {
  /** Whether all examples are valid */
  valid: boolean;
  /** List of issues found */
  issues: string[];
}

/**
 * ChunkSystem interface
 */
export interface IChunkSystem {
  getChunkType(chunkTypeId: string): ChunkType | null;
  getChunkInstance(chunkTypeId: string, instanceId: string): ChunkInstance | null;
  getAvailableChunksForUnit(unitId: string): (ChunkType & { isTarget: boolean })[];
  getTargetChunksForUnit(unitId: string): ChunkType[];
  getVariationsForChunkType(chunkTypeId: string, unitId: string): (ChunkInstance & { id: string; chunkType: string })[];
  generateExampleVariations(baseExample: any, options?: any): PrioritizedExample[];
  mergeChunks(chunk1: ChunkInstance, chunk2: ChunkInstance, sentenceType?: string): string;
  canUseInPosition(chunkTypeId: string, position: string): boolean;
  getChunkLoad(chunkTypeId: string): number;
  tagSentenceChunks(sentence: string, unitId: string): TaggedSentence;
  calculateChunkLoad(lesson: any): ChunkLoadAnalysis;
}

/**
 * ExampleVariationEngine interface
 */
export interface IExampleVariationEngine {
  generateExamples(vocabCard: any, options?: any): PrioritizedExample[];
  createP1Example(vocabCard: any, anchor: string, baseVerb: string, options: any): PrioritizedExample;
  createP2Example(vocabCard: any, anchor: string, baseVerb: string, options: any): PrioritizedExample;
  createP3Example(vocabCard: any, anchor: string, baseVerb: string, options: any): PrioritizedExample;
  generateChunkVariations(vocabCard: any, chunkType: string, options?: any): PrioritizedExample[];
  extractVerb(anchor: string): string;
  getExamplesForLoad(vocabCard: any, loadLevel: string): PrioritizedExample[];
  validateExamples(examples: PrioritizedExample[], unitId: string): ExampleValidation;
}

/**
 * Verb conjugation utilities
 */
export interface IVerbConjugation {
  conjugate(verb: string, verbForm: VerbForm): string;
  addThirdPersonS(verb: string): string;
}

// Extend Window interface
declare global {
  interface Window {
    ChunkSystem?: IChunkSystem;
    ExampleVariationEngine?: IExampleVariationEngine;
    CHUNK_TYPES?: Record<string, ChunkType>;
    UNIT_CHUNK_PROGRESSION?: Record<string, UnitChunkProgression>;
    SUBJECT_LIBRARY?: {
      first: { singular: SubjectInfo[]; plural: SubjectInfo[] };
      second: { singular: SubjectInfo[]; plural: SubjectInfo[] };
      third: { singular: SubjectInfo[]; plural: SubjectInfo[] };
    };
    VERB_CONJUGATION?: IVerbConjugation;
  }
}

export {};
