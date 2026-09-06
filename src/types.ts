export type PhaseCategory = 'PHASE_I_III' | 'PHASE_IV_V' | 'PHASE_VI_VII' | 'PHASE_VI' | 'PHASE_VIII' | 'PHASE_IX' | 'PHASE_X' | 'PHASE_XI' | 'PHASE_XII' | 'PHASE_XIII' | 'PHASE_XIV' | 'PHASE_XV' | 'PHASE_XVI' | 'PHASE_XVII' | 'PHASE_EXPANSION';

export type SpineTier = 'LOCKED' | 'SUPPORTING' | 'EXPANSION';

export type ModuleStructureTier = 'LOCKED_SPINE' | 'SUPPORTING' | 'EXPANSION_LEAF';

export type KnowledgeLayer = 'ANCHORED' | 'PLAUSIBLE' | 'IMAGINED' | 'OPEN_FIELD';

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
  | 'Decentralized Consensus & Baseline Testing';

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
  nodeRole: 'Lead Auditor' | 'Telemetry Anchor' | 'Clinical Co-regulator' | 'Commons Steward' | 'Systems Validator';
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

export interface HeroProfile {
  id: string;
  name: string;
  epithet: string;
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

/** Locked spine module numbers from GO_SPINE.md */
export const LOCKED_SPINE_NUMBERS = [2, 11, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27] as const;
export const EXPANSION_NUMBERS = [50, 53] as const;
