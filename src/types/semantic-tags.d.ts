/**
 * Type definitions for Semantic Tag System
 */

// ════════════════════════════════════════════════════════════════════════════
// ANIMACY & TRANSITIVITY TYPES
// ════════════════════════════════════════════════════════════════════════════

export type Animacy = 'animate' | 'inanimate' | 'both';
export type VerbAnimacyRequirement = 'animate_only' | 'both';
export type Transitivity = 'transitive' | 'transitive_fixed' | 'intransitive' | 'copula';

export interface SubjectVerbMergeRule {
  canUseVerbs: string[];  // Allow string[] for JS flexibility
  description: string;
}

export interface VerbObjectMergeRule {
  requiresObject: boolean | string;  // boolean or 'embedded' - flexible for JS
  objectAnimacy?: string[] | null;  // Made optional - copula doesn't have it
  takesComplement?: boolean;
  examples: string[];
}

export interface AnimacyRules {
  SUBJECT_VERB_MERGE: Record<Animacy, SubjectVerbMergeRule>;
  VERB_OBJECT_MERGE: Record<Transitivity, VerbObjectMergeRule>;
  ANIMATE_CATEGORIES: string[];
  INANIMATE_CATEGORIES: string[];
  MIXED_CATEGORIES: string[];
}

export interface VerbMergeRule {
  canMergeWith: string[];  // Allow string[] for JS flexibility
  requiresObjectCategory?: boolean;
  requiresComplement?: boolean;
  validObjectCategories?: string[];
  validComplementCategories?: string[];
  notes: string;
}

export interface TransitivityRules {
  VERB_MERGE_RULES: Record<string, VerbMergeRule>;  // Flexible keys for JS
  SENTENCE_PATTERNS: Record<string, string>;
  CATEGORY_TRANSITIVITY: Record<string, string>;  // Flexible values for JS
}

// ════════════════════════════════════════════════════════════════════════════
// SEMANTIC INSTANCE & CATEGORY TYPES
// ════════════════════════════════════════════════════════════════════════════

export interface SemanticInstance {
  en: string;
  uz: string;
  units: string[];
  // Animacy & Transitivity (new) - use string for JS flexibility
  animacy?: string;
  transitivity?: string;
  // Optional fields depending on category - use string for JS flexibility
  beForm?: string;
  verbEnding?: string;
  thirdPerson?: string;
  pastSimple?: string;
  frequency?: number;
  canStartSentence?: boolean;
  base?: string;
}

export interface SemanticCategory {
  id: string;
  label: string;
  description: string;
  position: string;  // Flexible string for JS compatibility
  introducedUnit: number;
  instances: Record<string, SemanticInstance>;
  // Animacy at category level (applies to all instances if not overridden)
  animacy?: Animacy | string;
  // Optional constraints
  specialPosition?: { afterBe?: boolean };
  triggersTense?: string;  // 'continuous' | 'past' - made flexible for JS
  requiresBe?: boolean;
  requiresThirdPerson?: boolean;
  isStative?: boolean;
  noContinuous?: boolean;
}

export interface UnitSemanticPool {
  introduced: string[];
  canRecycle: string[];
}

export interface SemanticCompatibilityRule {
  compatible: string[];
  incompatible: string[];
  notes: string;
}

export interface SemanticTag {
  slot: string;
  category: string;
  value: string;
}

export interface TaggedExample {
  sentence: string;
  priority?: 'P1_LESSON' | 'P2_UNIT' | 'P3_RECYCLE';
  grammarFocus?: string;
  recycledFrom?: string;
  semanticCategory?: string;
  originalValue?: string;
  semanticTags?: SemanticTag[];
}

export interface SemanticSubstitute extends SemanticInstance {
  id: string;
  categoryId: string;
}

export interface ValidationIssue {
  cardId: string;
  issue: string;
  value: string;
}

export interface CompatibilityReport {
  unitId?: string;
  availableCategories?: number;
  compatibilityMatrix?: Record<string, Record<string, boolean | 'self'>>;
  error?: string;
}

export interface SemanticTagEngineType {
  // Existing methods
  getCategory(categoryId: string): SemanticCategory | null;
  getInstancesForUnit(categoryId: string, unitId: string): Array<SemanticInstance & { id: string }>;
  getAvailableCategoriesForUnit(unitId: string): Array<SemanticCategory & { isIntroduced: boolean; isRecycled: boolean }>;
  areCompatible(categoryId1: string, categoryId2: string): boolean;
  getSemanticSubstitutes(instanceId: string, categoryId: string, unitId: string): SemanticSubstitute[];
  generateSemanticRecycleExample<T extends Record<string, any>>(baseExample: T, slotToVary: keyof T, unitId: string): (T & TaggedExample) | null;
  inferCategoryForSlot<T extends Record<string, any>>(slotName: keyof T, example: T): string | null;
  tagExamplesWithSemantics<T extends Record<string, any>>(examples: T[], unitId: string): Array<T & { semanticTags: SemanticTag[] }>;
  getRecyclableContentForUnit(unitId: string): Record<string, SemanticCategory>;
  
  // Swap group methods
  getSwapGroup(categoryId: string): SwapGroup | null;
  getSwappableCategories(categoryId: string): string[];
  getIntraCardSwaps(currentValue: string, categoryId: string, unitId: string): SwapCandidate[];
  generateIntraCardSwap<T extends Record<string, any>>(baseExample: T, slotToSwap: keyof T, unitId: string, options?: SwapOptions): (T & TaggedExample) | null;
  inferCategoryFromValue(value: string): string | null;
  generateCardExamples(cardData: CardData, unitId: string): TaggedExample[];
  conjugateForThirdPerson(phrase: string): string;
  
  // Animacy & Transitivity methods (new)
  getSubjectAnimacy(instanceId: string, categoryId: string): string;  // Returns Animacy or 'both'
  getVerbTransitivity(instanceId: string, categoryId: string): string | null;  // Returns Transitivity
  getVerbAnimacyRequirement(instanceId: string, categoryId: string): string;  // Returns VerbAnimacyRequirement
  canSubjectUseVerb(subject: InstanceRef, verb: InstanceRef): boolean;
  canVerbsMerge(verb1: InstanceRef, verb2: InstanceRef): boolean;
  getVerbsByTransitivity(categoryId: string, transitivity: string): VerbInstance[];
  getValidSubjectsForVerb(verb: InstanceRef, unitId: string): SubjectInstance[];
  getValidObjectsForVerb(verb: InstanceRef, unitId: string): ObjectInstance[];
  getValidSwaps(currentValue: string, categoryId: string, unitId: string, contextVerb?: InstanceRef): SwapCandidate[];
}

// Supporting types for new methods
export interface InstanceRef {
  instanceId: string;
  categoryId: string;
}

export interface VerbInstance extends SemanticInstance {
  id: string;
  categoryId: string;
}

export interface SubjectInstance extends SemanticInstance {
  id: string;
  categoryId: string;
}

export interface ObjectInstance extends SemanticInstance {
  id: string;
  categoryId: string;
}

export interface SwapCandidate extends SemanticInstance {
  id: string;
  categoryId: string;
  swapType: 'same_category' | 'cross_category';
  originalCategory: string;
}

export interface SwapOptions {
  preferCrossCategory?: boolean;
  excludeValues?: string[];
}

export interface SwapGroup {
  id: string;
  groupId?: string;  // Made optional since it's set dynamically in getSwapGroup
  label: string;
  description: string;
  categories: string[];
  position: string;
  swapRules: Record<string, string[]>;
  excludeFromSwap?: string[];
  internalSwapOnly?: boolean;
  grammarImpact?: string;
}

export interface CardData {
  anchor: string;
  baseSubject?: string;
  timeSlot?: string;
  placeSlot?: string;
  [key: string]: any;
}

export interface SemanticDebugType {
  logSubstitution(original: string, substitute: SemanticSubstitute, category: string, reason: string): void;
  validateUnitVocab(vocabCards: any[], unitId: string): ValidationIssue[];
  generateCompatibilityReport(unitId: string): CompatibilityReport;
}

declare global {
  interface Window {
    SEMANTIC_CATEGORIES: Record<string, SemanticCategory>;
    UNIT_SEMANTIC_POOLS: Record<string, UnitSemanticPool>;
    SEMANTIC_COMPATIBILITY: Record<string, SemanticCompatibilityRule>;
    SEMANTIC_SWAP_GROUPS: Record<string, SwapGroup>;
    ANIMACY_RULES: AnimacyRules;
    TRANSITIVITY_RULES: TransitivityRules;
    SemanticTagEngine: SemanticTagEngineType;
    SemanticDebug: SemanticDebugType;
  }
}
