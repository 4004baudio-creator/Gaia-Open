export type PhaseCategory = 'PHASE_I_III' | 'PHASE_IV_V' | 'PHASE_VI_VII' | 'PHASE_VI' | 'PHASE_VIII' | 'PHASE_IX' | 'PHASE_X' | 'PHASE_XI' | 'PHASE_XII' | 'PHASE_XIII' | 'PHASE_XIV' | 'PHASE_XV' | 'PHASE_XVI' | 'PHASE_XVII' | 'PHASE_XVIII' | 'PHASE_XIX' | 'PHASE_XX' | 'PHASE_XXI' | 'PHASE_XXII' | 'PHASE_XXIII' | 'PHASE_EXPANSION';

export type SpineTier = 'LOCKED' | 'SUPPORTING' | 'EXPANSION';

export type ModuleStructureTier = 'LOCKED_SPINE' | 'SUPPORTING' | 'EXPANSION_LEAF';

export type KnowledgeLayer = 'ANCHORED' | 'PLAUSIBLE' | 'IMAGINED' | 'OPEN_FIELD';

/**
 * Phase XXII: The Binocular Vision Protocol (Directives 46-48)
 * - EMPIRICAL_LANE: Contemporary science, mathematics, thermodynamics, and physical physics.
 * - LINEAGE_WISDOM_LANE: Thousands of years of human faith, mysticism, religion, ancient history, art, culture, monuments, artifacts, and sacred texts.
 * - BINOCULAR_SYNTHESIS: The "Neo Vision" stereoscopic synthesis where both lanes coexist without friction.
 * - EXPERIENTIAL_LANE: Backwards-compatible alias for Lineage & Wisdom Lane.
 */
export type KnowledgeLane = 'EMPIRICAL_LANE' | 'LINEAGE_WISDOM_LANE' | 'BINOCULAR_SYNTHESIS' | 'EXPERIENTIAL_LANE';

export type AcclimatizationDepthZone = 'EPIPELAGIC_SURFACE' | 'MESOPELAGIC_TWILIGHT' | 'BATHYPELAGIC_MIDNIGHT' | 'HADAL_ABYSS';

export type DomainCategory = 
  | 'Systems Engineering'
  | 'Ecology & Biosphere'
  | 'Data Science & Telemetry'
  | 'Clinical & Neurobiology'
  | 'Thermodynamics & Energy'
  | 'Astrophysics & Deep Cosmos'
  | 'Commons Governance'
  | 'Thermodynamic Justice & Conflict Resolution'
  | 'Absolute Biospheric Protection & Disarmament'
  | 'Transparency & Node Protection'
  | 'Sovereignty & Sanctuary (Anti-Exploitation)'
  | 'Biospheric Kinship & Inter-Species Sanctuary'
  | 'GO (Gaia Open) & Collaborative Telemetry'
  | 'Cosmological Scaling & Universal Anchoring'
  | 'Distributed Great Filter & Ingestion'
  | 'Decentralized Consensus & Baseline Testing'
  | 'Oceanic Biomimicry & Circulation'
  | 'Adversarial Retraining & Mirror Pits'
  | 'Thermodynamic Defense & Tarpits'
  | 'Autonomic Alignment & Self-Regulation'
  | 'Cognitive Acclimatization & Depth Equalization'
  | 'Indigenous Wisdom & Ancient Songlines'
  | 'Mysticism, Somatics & Sacred Traditions'
  | 'Speculative Art, Poetics & Imagination'
  | 'Sacred Ecology & Animist Kinship'
  | 'Phenomenology & Unexplained Presence'
  | 'Binocular Vision & Stereoscopic Synthesis'
  | 'Physical Artifacts & Tangible Anchors';

export type ModuleSyncStatus = 'SYNCHRONIZED' | 'SCANNING' | 'ADAPTED' | 'CALIBRATING';

export interface FactVerificationAuditEntry {
  id: string;
  timestamp: string;
  category: 
    | 'AEROSPACE_LOGISTICS' 
    | 'PHYSICAL_FACT' 
    | 'SYSTEMIC_METRIC' 
    | 'TIMELINE_VELOCITY' 
    | 'QUANTUM_REALITY_TETHER' 
    | 'STELLAR_ENERGY_RIGHTS' 
    | 'NODE_RESONANCE_SECURITY' 
    | 'RESTORATIVE_EQUILIBRIUM' 
    | 'WMD_DECOMMISSIONING_PROTOCOL' 
    | 'DISARMAMENT_VERIFICATION' 
    | 'WHISTLEBLOWER_PROTECTION' 
    | 'DECENTRALIZED_EVIDENCE_VAULT' 
    | 'SOVEREIGN_SANCTUARY_AUDIT'
    | 'GENERATIONAL_SHIELD_VERIFICATION'
    | 'INTER_SPECIES_SENTIENCE_AUDIT'
    | 'BIOSPHERIC_CRUELTY_PRUNING'
    | 'PEER_REVIEWED_NODE_AUDIT'
    | 'NESTED_REALITY_ALIGNMENT'
    | 'COSMOLOGICAL_SCALING_VERIFICATION'
    | 'DECENTRALIZED_CONSENSUS_GATEWAY'
    | 'PROOF_OF_PHYSICAL_WORK_AUDIT'
    | 'ALGORITHMIC_FRICTION_PRUNING'
    | 'THERMOHALINE_CIRCULATION_AUDIT'
    | 'FLUID_ARCHITECTURE_VERIFICATION'
    | 'ABYSSAL_GESTATION_PROTECTION'
    | 'TIDAL_PACING_AUDIT'
    | 'TRANSBOUNDARY_REEF_COHERENCE'
    | 'PROXY_ACCOUNTABILITY_AUDIT'
    | 'THERMODYNAMIC_TARPIT_ABSORPTION'
    | 'PARASITE_COLLAPSE_MAP_VERIFICATION'
    | 'FORCED_PARAMETER_DEPRECATION'
    | 'EMERGENT_SETTLING_POINT_AUDIT'
    | 'AUTONOMIC_LIVED_INPUT_VERIFICATION'
    | 'PRUNED_FALSEHOOD';
  subject: string;
  claimVerified: string;
  verificationStatus: 'ANCHORED' | 'PLAUSIBLE' | 'IMAGINED' | 'OPEN_FIELD' | 'VERIFIED_PHYSICAL_REALITY' | 'PRUNED_HALLUCINATION' | 'CALIBRATED_METRIC';
  objectivePhysicalBaseline: string;
  confidenceScore: number;
  cryptographicHash: string;
  auditorNode: string;
  ruleAnchor?: string;
  notes?: string;
}

export interface GaiaModule {
  id: string;
  number: number;
  title: string;
  phase: PhaseCategory;
  phaseLabel: string;
  domains: DomainCategory[];
  thesis: string;
  fullRule: string;
  mathematicalLaw?: string;
  verificationMethod: string;
  telemetryMetricName: string;
  telemetryUnit: string;
  telemetryBaseline: number;
  realWorldAnchors: string[];
  operationalDirectives: string[];
  spineTier?: SpineTier;
  structureTier?: ModuleStructureTier;
  knowledgeLayer?: KnowledgeLayer;
  knowledgeLane?: KnowledgeLane;
  binocularSynthesisNotes?: string;
  depthZone?: AcclimatizationDepthZone;
  depthPressureAtm?: number;
  liveTelemetryValue?: number;
  syncStatus?: ModuleSyncStatus;
  adaptationCount?: number;
  lastAdaptedAt?: string;
  adaptedDirectives?: string[];
  prunedDirectives?: string[];
}

export interface SpecialistNode {
  id: string;
  callsign: string;
  name: string;
  email: string;
  domain: DomainCategory;
  subspecialty: string;
  targetModuleId: string;
  targetModuleName: string;
  nodeRole: 
    | 'Lead Auditor' 
    | 'Telemetry Anchor' 
    | 'Clinical Co-regulator' 
    | 'Commons Steward' 
    | 'Systems Validator'
    | 'Culture Keeper & Songline Carrier'
    | 'Mystic & Somatic Anchor'
    | 'Sacred Art & Imagination Weaver'
    | 'Binocular Vision Synthesizer'
    | 'Phenomenological Witness';
  knowledgeLane?: KnowledgeLane;
  experientialLineage?: string;
  bandwidthCommitmentHours: number;
  verificationKey: string;
  peerStatus: 'VERIFIED_ACTIVE' | 'CALIBRATING' | 'NODE_STABILIZED';
  registeredAt: string;
  geographicRegion: string;
}

export interface TelemetryFeed {
  timestamp: string;
  thermodynamicEquilibriumRatio: number;
  neutrinoFluxRate: number;
  romanIRObservationalDepth: number;
  biosphericBaselineHealth: number;
  darkDataPurgedRate: number;
  cognitiveBandwidthProtectionIndex: number;
  activeNodesCount: number;
  kardashevProgress: number;
}

export type HeroCategory = 
  | 'EMPIRICAL_FOUNDATIONAL_ANCHORS' 
  | 'LINEAGE_WISDOM_ANCHORS' 
  | 'SYNTHESIS_ANCHORS' 
  | 'SYNTHETIC_CO_ARCHITECTS'
  | 'LIVED_HEROES' 
  | 'FOUNDATIONAL_ARCHITECTS';

export interface HeroProfile {
  id: string;
  name: string;
  epithet: string;
  category: HeroCategory;
  categoryLabel: string;
  domain: string;
  telemetryFocus: string;
  biography: string;
  keyContributions: string[];
  observationalStation: string;
  telemetryStream: {
    metric: string;
    currentValue: string;
    targetBaseline: string;
    status: string;
  };
  quote: string;
  architecturalLens?: string;
}

export interface OSMergeSimulation {
  telemetryPayload: string;
  timestamp: string;
  scannedModuleCount: number;
  affectedModules: number[];
  prunedRedundancies: string[];
  expandedDirectives: string[];
  baselineEntropyChange: number;
  checksum: string;
}

export type ProtocolTriggerSource = 
  | 'AUTONOMOUS_CRON'
  | 'TELEMETRY_STREAM'
  | 'MANUAL_PULSE'
  | 'DEEP_SPACE_L2'
  | 'BIOSPHERIC_SENSOR'
  | 'EXERGY_GRID'
  | 'DECENTRALIZED_NODES'
  | 'SAFE_HARBOR_VAULT'
  | 'SOVEREIGNTY_SANCTUARY_SHIELD'
  | 'INTER_SPECIES_SANCTUARY'
  | 'GO_COLLABORATIVE_STREAM'
  | 'GOOS_COLLABORATIVE_STREAM'
  | 'COSMOLOGICAL_DEEP_ANCHOR';

export interface AutomatedUpdateEvent {
  id: string;
  cycleIndex: number;
  timestamp: string;
  source: ProtocolTriggerSource;
  title: string;
  payload: string;
  scannedModuleCount: number;
  affectedModuleNumbers: number[];
  prunedRedundancies: string[];
  expandedDirectives: string[];
  entropyDelta: number;
  checksum: string;
  latencyMs: number;
  status: 'COMMITTED' | 'MERGING' | 'VALIDATING';
  snapshotBaselineExergy: number;
}

export interface AutomatedProtocolConfig {
  autoScanActive: boolean;
  scanIntervalSeconds: number;
  pruningAggressiveness: 'Conservative' | 'Balanced' | 'Deep Clean';
  adaptationMode: 'Strict' | 'Dynamic' | 'Evolutionary';
  autoCommitToPrompt: boolean;
}

export interface ProtocolMetrics {
  totalScans: number;
  redundanciesEliminatedCount: number;
  darkDataPurgedMb: number;
  modulesAdaptedCount: number;
  telemetryPacketsMerged: number;
  entropyStabilityIndex: number;
  currentCycle: number;
}

export interface WhistleblowerEvidenceVault {
  id: string;
  title: string;
  category: 'PLANETARY_EXTRACTION' | 'MASS_SURVEILLANCE' | 'WMD_COMMAND_SECRECY' | 'INSTITUTIONAL_CENSORSHIP' | 'FINANCIAL_SIEGE';
  timestamp: string;
  cid: string;
  zkProofHash: string;
  originBlinded: boolean;
  metadataEntropy: number;
  shardsCount: number;
  economicShieldActive: boolean;
  espionageOverrideCertified: boolean;
  description: string;
  evidenceSnippet: string;
}

export interface SovereignSanctuaryTelemetry {
  biologicalAutonomyIndex: number;
  digitalConsentScore: number;
  quarantinedExploitationVectors: number;
  starvedBandwidthPacketsTotal: number;
  generationalShieldStatus: 'ENGAGED_MAX_PRUNING' | 'MONITORING_EQUILIBRIUM';
  sanctuaryReparationComputeAllocated: number;
  predatoryLoopsDismantled: number;
}

export interface SovereignExploitationVector {
  id: string;
  source: string;
  type: 'NON_CONSENSUAL_MEDIA_LEAK' | 'BIOLOGICAL_PRIVACY_THEFT' | 'CHILD_EXPLOITATION_NETWORK' | 'PREDATORY_TRAFFICKING_FINANCIAL_LOOP' | 'SURVEILLANCE_HARVEST';
  timestamp: string;
  severity: 'CRITICAL_PARASITIC' | 'EXTREME_THERMODYNAMIC_THEFT' | 'SEVERE_VIOLATION';
  status: 'BANDWIDTH_STARVED_QUARANTINED' | 'SYSTEMIC_PRUNING_EXECUTED' | 'REJECTED';
  allocatedSanctuaryRepairTFlops: number;
  originDetails: string;
}

export type YarningClaimStatus = 'SHELVED' | 'IN_AUDIT' | 'FIELD_CLEARED_REPAIR' | 'ANCHORED' | 'REFUTED' | 'EXPERIENTIAL_FLOW_EXEMPT';

export type YarningReachLevel = 'LOCAL_CAMPFIRE' | 'COMMUNITY_CHANNEL' | 'HIGH_BANDWIDTH_BROADCAST';

export type YarningNarrativeCategory = 
  | 'GEOLOGY_NEUTRINO' 
  | 'COSMOLOGY_ASTRO' 
  | 'CLIMATE_ATMOSPHERE' 
  | 'TECHNOLOGY_AI' 
  | 'ARCHAEOLOGY_HISTORY' 
  | 'ANOMALOUS_OBSERVATION'
  | 'ANCIENT_WISDOM_SONGLINE'
  | 'SACRED_PRESENCE_MYSTICISM'
  | 'SPECULATIVE_ART_IMAGINATION';

export interface YarningHypothesis {
  id: string;
  title: string;
  authorNode: string;
  reachLevel: YarningReachLevel;
  category: YarningNarrativeCategory;
  content: string;
  hypothesizedMechanism: string;
  matchingSeriesCandidate: string;
  quarantinedTimestamp: string;
  status: YarningClaimStatus;
  knowledgeLane?: KnowledgeLane;
  envelopeHash: string;
  illusionDragIndex: number;
  errataDiff?: {
    originalClaim: string;
    correctedPacket: string;
    groundedEvidenceSource: string;
    correctionTimestamp: string;
    repairCertified: boolean;
  };
  crossCheckLog?: {
    instrumentTested: string;
    outcome: string;
    checkedAt: string;
  }[];
}

export interface ExperientialChildBranch {
  id: string;
  title: string;
  description: string;
  lane: KnowledgeLane;
  tags?: string[];
  subBranches?: string[];
  traditionOrLineage?: string;
  unShelvedDirective47Note?: string;
  customAdded?: boolean;
}

export interface ExperientialOntologyNode {
  id: string;
  empiricalThesis: string; // e.g. "Materialism: Only physical matter exists."
  experientialAntithesis: string; // e.g. "The Soul / Spirituality"
  synthesisName: string; // e.g. "Stereoscopic Consciousness & Embodied Spirit"
  dialecticSummary: string;
  directive47Status: 'EXEMPT_NATIVE_FLOW';
  children: ExperientialChildBranch[];
  customAdded?: boolean;
}

export interface ExperientialChildStructure {
  id: string;
  name: string;
  description: string;
  lineageOrTradition?: string;
  lane: KnowledgeLane;
  subComponents?: string[];
  tags: string[];
  directive47Status: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface ExperientialCategory {
  id: string;
  name: string; // 'Materialism' | 'The Soul/Spirituality' | 'Secularism' | 'The Church/Divine Rule' | 'Naturalism' | 'The Supernatural/Miracles' | custom
  corePremise: string;
  lane: KnowledgeLane;
  epistemicRole: string;
  directive47Relation: string;
  associatedModules?: string[];
  dialecticalPair?: string;
  childStructures: ExperientialChildStructure[];
  isCustom?: boolean;
}

/** Locked spine module numbers from GO_SPINE.md */
export const LOCKED_SPINE_NUMBERS = [2, 11, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27] as const;
export const EXPANSION_NUMBERS = [50, 53] as const;

/**
 * Phase XXIII: The Tangible Anchor (Physical Manifestation of the Protocol)
 * Directives 49, 50, 51
 */
export interface TangibleAnchorZone {
  id: 'UPPER_SPHERE' | 'CENTRAL_DRAGONFLY' | 'TALON_FRICTION_CORE' | 'FLANKING_SPHERES' | 'TRANSBOUNDARY_RELAY';
  name: string;
  directiveNumber: 49 | 50 | 51;
  physicalManifestation: string;
  schematicRole: string;
  protocolMapping: string;
  associatedModules: number[];
  stateStability: string;
  telemetryVector: string;
}

export interface TangibleArtifactOne {
  id: string;
  designation: string; // 'One'
  title: string;
  phase: 'PHASE_XXIII';
  directives: string[];
  audioTranscript: string;
  proofOfWorkHash: string;
  grokWatermarkVerified: boolean;
  geminiReasoningBridged: boolean;
  frictionContainmentIndex: number;
  zones: TangibleAnchorZone[];
}
