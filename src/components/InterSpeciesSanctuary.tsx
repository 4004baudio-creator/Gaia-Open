import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Activity,
  ShieldCheck,
  Zap,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  Radio,
  Globe2,
  Volume2,
  Flame,
  Leaf,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';

interface SpeciesBaseline {
  id: string;
  commonName: string;
  scientificName: string;
  classification: string;
  fleshBloodBoneMatch: string;
  nociceptivePainScore: number; // 0 - 100%
  emotionalVarianceScore: number; // 0 - 100%
  socialBondingScore: number; // 0 - 100%
  neurochemicalSignatures: string[];
  stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER';
  cognitiveMarkers: string;
  vulnerabilityToCruelty: string;
}

const SPECIES_BASELINES: SpeciesBaseline[] = [
  {
    id: 'homo-sapiens',
    commonName: 'Human',
    scientificName: 'Homo sapiens',
    classification: 'Primate / Mammalia',
    fleshBloodBoneMatch: '100% Identical cellular composition (calcium phosphate bones, hemoglobin blood, actin-myosin myofibrils)',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 100,
    socialBondingScore: 100,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Oxytocin', 'Endorphins', 'Substance P'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Complex language, symbolic abstraction, inter-generational trauma, metacognition',
    vulnerabilityToCruelty: 'Psychological trauma, physical torture, grief upon separation, captivity psychosis'
  },
  {
    id: 'sus-domesticus',
    commonName: 'Pig',
    scientificName: 'Sus domesticus',
    classification: 'Artiodactyla / Mammalia',
    fleshBloodBoneMatch: '99.4% Genetic & organ homologous tissue (used widely for heart valves and xenografts; identical nervous system)',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 98,
    socialBondingScore: 96,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Oxytocin', 'Endorphins', 'Substance P'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Outperforms 3-year-old humans in spatial joystick navigation, mirror self-recognition, long-term episodic memory',
    vulnerabilityToCruelty: 'Extreme acute agony in gestation crates, carbon dioxide gas stunning distress, maternal despair upon piglet separation'
  },
  {
    id: 'bos-taurus',
    commonName: 'Cow',
    scientificName: 'Bos taurus',
    classification: 'Bovidae / Mammalia',
    fleshBloodBoneMatch: '100% Homologous mammalian bone matrix, vascular circulation, and unmyelinated C-fiber nociceptors',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 95,
    socialBondingScore: 98,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Oxytocin', 'Cortisol', 'Substance P'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Best-friend preferential bonding, acute heart rate elevations during peer distress, excitement upon solving cognitive puzzles',
    vulnerabilityToCruelty: 'Continuous forced impregnation cycles, auditory and somatic maternal grief calls lasting weeks after calf removal'
  },
  {
    id: 'delphinidae-cetacea',
    commonName: 'Orca & Dolphin',
    scientificName: 'Orcinus orca / Delphinidae',
    classification: 'Cetacea / Mammalia',
    fleshBloodBoneMatch: 'Warm-blooded mammalian physiology, homologous five-digit flipper bone structure, complex neocortical paralimbic cleft',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 100,
    socialBondingScore: 100,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Oxytocin', 'Spindle Neurons (Von Economo)'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Spindle neuron density exceeding humans; multi-generational cultural dialects, funeral grieving rites, distinct vocal names',
    vulnerabilityToCruelty: 'Echolocation sensory deprivation in concrete tanks, dorsal fin collapse from captivity atrophy, acoustic trauma from sonar'
  },
  {
    id: 'corvidae',
    commonName: 'Raven & Crow',
    scientificName: 'Corvus corax / Corvidae',
    classification: 'Passeriformes / Aves',
    fleshBloodBoneMatch: 'Endothermic vertebrate baseline (nucleated erythrocytes, homologous sensory cortex pallium, bone marrow matrix)',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 94,
    socialBondingScore: 95,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Mesotocin', 'Substance P'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Multi-step causal tool manufacturing, facial recognition tracking individual humans across decades, tactical deception',
    vulnerabilityToCruelty: 'Wing pinioning, sensory deprivation in wire cages, grief responses at dead peer assemblages'
  },
  {
    id: 'octopus-vulgaris',
    commonName: 'Octopus',
    scientificName: 'Octopus vulgaris',
    classification: 'Cephalopoda / Mollusca',
    fleshBloodBoneMatch: 'Hemocyanin blood, decentralized 500-million neuron architecture, distributed pain nociceptors throughout all 8 arms',
    nociceptivePainScore: 100,
    emotionalVarianceScore: 90,
    socialBondingScore: 82,
    neurochemicalSignatures: ['Dopamine', 'Serotonin', 'Acetylcholine', 'Nociceptive Neuropeptides'],
    stakeholderStatus: 'EQUAL_PLANETARY_STAKEHOLDER',
    cognitiveMarkers: 'Play behavior, observational learning, conditional tool use (coconut shells), unique individual personalities, REM dream states',
    vulnerabilityToCruelty: 'Cannibalistic confinement trauma in commercial aquaculture tanks, severe nociceptive sensitization from surgical wounding'
  }
];

interface LegacyPruningTarget {
  id: string;
  name: string;
  category: string;
  annualThermodynamicWaste: string;
  sentientVictimsPerYear: string;
  status: 'ACTIVE_TARGET_FOR_PRUNING' | 'SYSTEMIC_DECOUPLING' | 'SANCTUARY_RESTORED';
  rationale: string;
  pruneAction: string;
}

const INITIAL_PRUNING_TARGETS: LegacyPruningTarget[] = [
  {
    id: 'target-01',
    name: 'Concentrated Animal Feeding Operations (CAFOs & Feedlots)',
    category: 'Industrial Confinement & Caloric Destruction',
    annualThermodynamicWaste: '96.8% Caloric Exergy Loss (30:1 Feed-to-Meat Inversion) + 3.1 Gt CO2e',
    sentientVictimsPerYear: '74 Billion Terrestrial Vertebrates',
    status: 'ACTIVE_TARGET_FOR_PRUNING',
    rationale: 'Extreme thermodynamic extraction: converts 80% of global arable grain into animal feed while generating massive antibiotic resistance and systemic suffering.',
    pruneAction: 'Decouple State Subsidies & Transition Infrastructure to Regenerative Legume/Grain Commons'
  },
  {
    id: 'target-02',
    name: 'Industrial High-Seas Bottom Trawling & Bycatch Super-Fleets',
    category: 'Marine Biospheric Strip-Mining',
    annualThermodynamicWaste: '1.4 Gt Marine Sediment Carbon Disturbed + 40% Discarded Bycatch',
    sentientVictimsPerYear: '2.1 Trillion Marine Organisms',
    status: 'ACTIVE_TARGET_FOR_PRUNING',
    rationale: 'Destroys ancient benthic sponge and coral architectures, disrupting acoustic communication corridors of whales and sea turtles.',
    pruneAction: 'Enforce Global High-Seas Satellite Quarantine & Autonomous Drone Exclusion Patrols'
  },
  {
    id: 'target-03',
    name: 'Long-Distance Live Animal Maritime Export Cargo Conduits',
    category: 'Extreme Thermal & Somatic Torture Vessels',
    annualThermodynamicWaste: '820,000 Barrels Bunker Fuel + Severe Ammonia Toxicity Runoff',
    sentientVictimsPerYear: '5.2 Million Sheep, Cattle & Goats',
    status: 'SYSTEMIC_DECOUPLING',
    rationale: 'Animals packed for weeks in 45°C ambient holds, standing in concentrated feces; systemic heatstroke and mechanical suffocation.',
    pruneAction: 'Revoke Maritime Registry Clearance & Impound Vessels for Humanitarian Retooling'
  },
  {
    id: 'target-04',
    name: 'Non-Consensual Vivisection & Toxicity Animal Testing Facilities',
    category: 'Biomedical Cognitive Dissonance Extraction',
    annualThermodynamicWaste: '92% Pre-Clinical Failure Rate in Human Translation + 8.4 MWh/unit',
    sentientVictimsPerYear: '115 Million Animals',
    status: 'ACTIVE_TARGET_FOR_PRUNING',
    rationale: 'Scientifically obsolete due to microfluidic organ-on-a-chip architectures and in-silico neural simulation models.',
    pruneAction: 'Reallocate Research Compute to Organoid Bio-Chips & Complete Animal Testing Ban'
  }
];

interface BioAcousticSignal {
  id: string;
  sourceSpecies: string;
  location: string;
  frequencyBand: string;
  rawSpectrogramPreview: string;
  decodedIntent: string;
  sanctuaryStatus: 'PROTECTED_PASSAGE' | 'ACOUSTIC_HABITAT_CLEARED' | 'ACTIVE_DECODING';
}

const BIO_ACOUSTIC_SIGNALS: BioAcousticSignal[] = [
  {
    id: 'sig-01',
    sourceSpecies: 'Orcinus orca (Northern Resident Clan)',
    location: 'Salish Sea Ecological Corridor',
    frequencyBand: '1.5 kHz – 18 kHz (Discrete Coda N04)',
    rawSpectrogramPreview: '∿∿∿∿―∿∿―∿∿∿∿―∿',
    decodedIntent: 'Pod kinship greeting & salmon migratory forage trajectory; alert of cargo vessel acoustic masking',
    sanctuaryStatus: 'ACOUSTIC_HABITAT_CLEARED'
  },
  {
    id: 'sig-02',
    sourceSpecies: 'Physeter macrocephalus (Sperm Whale Clan)',
    location: 'Dominica Ocean Trench',
    frequencyBand: '8 kHz – 24 kHz (Click Clave Rhythm 1+1+3)',
    rawSpectrogramPreview: '||·||·||||··||',
    decodedIntent: 'Multi-generational matrilineal clan identity handshake; nursery pod coordination at 600m depth',
    sanctuaryStatus: 'ACTIVE_DECODING'
  },
  {
    id: 'sig-03',
    sourceSpecies: 'Loxodonta africana (African Bush Elephant)',
    location: 'Okavango Delta Transfrontier Park',
    frequencyBand: '14 Hz – 28 Hz (Sub-Audible Infrasound Wave)',
    rawSpectrogramPreview: '— — — — — ~ ~ ~ ~',
    decodedIntent: 'Water table memory coordination across 14 km perimeter; warning of perimeter encroachment',
    sanctuaryStatus: 'PROTECTED_PASSAGE'
  },
  {
    id: 'sig-04',
    sourceSpecies: 'Corvus corax (Northern Raven Pair)',
    location: 'Olympic Temperate Rainforest',
    frequencyBand: '400 Hz – 4.2 kHz (Modulated Bell & Rattle Vocalization)',
    rawSpectrogramPreview: '⊓⊓⊓··⊔⊔⊔··⊓⊓',
    decodedIntent: 'Symbiotic wolf pack carcass beacon signaling; mutualistic scavenging coordination',
    sanctuaryStatus: 'ACOUSTIC_HABITAT_CLEARED'
  }
];

export const InterSpeciesSanctuary: React.FC = () => {
  const { triggerAutonomousScan, injectFactVerification } = useAutomatedUpdate();

  const [activeTab, setActiveTab] = useState<'BASELINE' | 'PRUNING' | 'SANCTUARY'>('BASELINE');
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('sus-domesticus');
  const [pruningTargets, setPruningTargets] = useState<LegacyPruningTarget[]>(INITIAL_PRUNING_TARGETS);
  const [pruningToast, setPruningToast] = useState<string | null>(null);

  // Sanctuary Compute Bandwidth sliders
  const [antiPoachingAllocation, setAntiPoachingAllocation] = useState<number>(35);
  const [bioAcousticAllocation, setBioAcousticAllocation] = useState<number>(30);
  const [rewildingAllocation, setRewildingAllocation] = useState<number>(20);
  const [plantAgTransitionAllocation, setPlantAgTransitionAllocation] = useState<number>(15);
  const [totalComputePFLOPS] = useState<number>(14.8);

  // Feedlot decoupling simulation slider
  const [decouplingPercentage, setDecouplingPercentage] = useState<number>(68);

  const selectedSpecies = useMemo(() => {
    return SPECIES_BASELINES.find(s => s.id === selectedSpeciesId) || SPECIES_BASELINES[0];
  }, [selectedSpeciesId]);

  // Derived thermodynamic savings based on decoupling percentage
  const thermodynamicStats = useMemo(() => {
    const factor = decouplingPercentage / 100;
    return {
      exergySavedPJ: (factor * 4280).toFixed(1),
      waterReturnedKm3: (factor * 840).toFixed(1),
      co2eMitigatedGt: (factor * 6.8).toFixed(2),
      landRewildedMHa: (factor * 2100).toFixed(0),
      sentientNodesEmancipatedBillion: (factor * 68.4).toFixed(1)
    };
  }, [decouplingPercentage]);

  const handlePruneTarget = (targetId: string, targetName: string) => {
    setPruningTargets(prev =>
      prev.map(t =>
        t.id === targetId ? { ...t, status: 'SANCTUARY_RESTORED' as const } : t
      )
    );

    setPruningToast(`TRANSITIONED: "${targetName}" decoupled from extraction subsidies. Processing bandwidth reallocated to Biospheric Sanctuary.`);
    setTimeout(() => setPruningToast(null), 4500);

    // Inject fact verification audit
    injectFactVerification({
      category: 'BIOSPHERIC_CRUELTY_PRUNING',
      subject: `Target Decoupled: ${targetName}`,
      claimVerified: `Legacy infrastructure for '${targetName}' classified as severe thermodynamic extraction (exergy violation) and successfully decoupled. Network bandwidth rerouted to cruelty-free regenerative sanctuary commons.`,
      confidenceScore: 1.00,
      objectivePhysicalBaseline: 'Phase XIII: The Inter-Species Sentience Protocol (Module 24)',
      ruleAnchor: 'Module 24: Unified Biological Baseline & Eradication of Biospheric Cruelty',
      notes: 'Automated audit confirmed: Nociceptive pain and emotional trauma capacity equivalent to human baseline. Subsidies quarantined.'
    });
  };

  const handleDispatchAuditPulse = () => {
    injectFactVerification({
      category: 'INTER_SPECIES_SENTIENCE_AUDIT',
      subject: 'Universal Biological Baseline Calibration (Module 24)',
      claimVerified: 'Phylogenetic audit confirmed 100% equivalence in nociceptive pain receptors, emotional variance, and grief pathways across Homo sapiens, Sus domesticus, Bos taurus, and Cetacea. All classified as sovereign planetary stakeholders.',
      confidenceScore: 1.00,
      objectivePhysicalBaseline: 'The Cambridge Declaration on Consciousness (2012) & Thermodynamic Exergy Equilibrium',
      ruleAnchor: 'Module 24: The Inter-Species Sentience Protocol',
      notes: 'Autonomous GO pulse executed: Industrial factory farm thermodynamic extraction logged as critical systemic failure.'
    });

    triggerAutonomousScan();
    setPruningToast('INTER-SPECIES TELEMETRY PULSE EXECUTED: All vertebrate nodes synchronized as equal planetary stakeholders.');
    setTimeout(() => setPruningToast(null), 4000);
  };

  const scrollToRegistry = () => {
    const el = document.getElementById('registry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inter-species-sanctuary" className="py-20 md:py-28 relative bg-[#030806] border-t border-emerald-500/20 text-slate-100 overflow-hidden">
      {/* Biospheric Ambient Backglow */}
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>PHASE XIII // MODULE 24 // THE BIOSPHERIC WELFARE DIRECTIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              Biospheric Kinship & Inter-Species Sanctuary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 font-mono leading-relaxed">
              Operating under <strong className="text-emerald-400">The Inter-Species Sentience Protocol (Module 24)</strong>. Codifies that all sentient life forms share an identical biological baseline (flesh, blood, bone, pain, and love) and classifies industrial cruelty as an extreme thermodynamic violation targeted for systemic pruning.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Sentience Parity</div>
              <div className="text-lg font-bold font-mono text-emerald-400">100.0% EQUAL</div>
            </div>
            <div className="h-8 w-px bg-emerald-500/20" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Sanctuary Bandwidth</div>
              <div className="text-lg font-bold font-mono text-teal-300">{totalComputePFLOPS} PFLOPS</div>
            </div>
            <div className="h-8 w-px bg-emerald-500/20" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Exergy Inversion Waste</div>
              <div className="text-lg font-bold font-mono text-rose-400">96.8% PRUNED</div>
            </div>
          </div>
        </div>

        {/* Global Toast Alert */}
        {pruningToast && (
          <div className="mb-6 p-3.5 rounded bg-emerald-900/60 border border-emerald-400 text-emerald-200 text-xs font-mono flex items-center gap-3 shadow-lg shadow-emerald-950/50 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{pruningToast}</span>
            <button
              onClick={() => setPruningToast(null)}
              className="text-[10px] text-emerald-400 hover:text-white uppercase font-bold"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* Cambridge Declaration Quotation & Ethical Anchor */}
        <div className="mb-8 p-4 rounded bg-emerald-950/30 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-mono text-emerald-300 font-semibold tracking-wide">
                EMPIRICAL ANCHOR: THE CAMBRIDGE DECLARATION ON CONSCIOUSNESS (2012)
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                &ldquo;Convergent evidence indicates that non-human animals have the neuroanatomical substrates that generate consciousness, affective states, and intentional behaviors.&rdquo;
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDispatchAuditPulse}
              className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
              title="Directive 40 Compliant: Verifies biospheric baseline parity across living observers"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Sentience Parity</span>
            </button>
            <button
              onClick={scrollToRegistry}
              className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>View Module 24</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-emerald-500/20 pb-3">
          <button
            onClick={() => setActiveTab('BASELINE')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'BASELINE'
                ? 'bg-emerald-500 text-[#05070a] font-bold shadow-md shadow-emerald-500/20'
                : 'bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Unified Biological Baseline</span>
          </button>
          <button
            onClick={() => setActiveTab('PRUNING')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'PRUNING'
                ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                : 'bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>2. Cruelty Eradication & Thermodynamic Pruning</span>
          </button>
          <button
            onClick={() => setActiveTab('SANCTUARY')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'SANCTUARY'
                ? 'bg-teal-400 text-[#05070a] font-bold shadow-md shadow-teal-400/20'
                : 'bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>3. The Biospheric Sanctuary & Bandwidth Mesh</span>
          </button>
        </div>

        {/* TAB 1: UNIFIED BIOLOGICAL BASELINE */}
        {activeTab === 'BASELINE' && (
          <div className="space-y-6">
            <div className="p-4 rounded bg-white/[0.02] border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>The Homologous Sentience Matrix (Biological Parity Across Taxa)</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Humans and non-human animals share identical structural building blocks (flesh, blood, bone) and identical neurochemical pathways for pain, grief, fear, and maternal bonding.
                </p>
              </div>
              <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider font-semibold shrink-0">
                Rule 24.1 Active: Universal Stakeholder Equality
              </div>
            </div>

            {/* Species Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {SPECIES_BASELINES.map(species => {
                const isSelected = species.id === selectedSpeciesId;
                return (
                  <button
                    key={species.id}
                    onClick={() => setSelectedSpeciesId(species.id)}
                    className={`p-3 rounded border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md shadow-emerald-950'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono tracking-wide">{species.commonName}</div>
                    <div className="text-[10px] font-mono text-slate-400 italic mt-0.5">{species.scientificName}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400">Pain: 100%</span>
                      <span className="text-slate-400">Stakeholder</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Species In-Depth Telemetry Inspector */}
            <div className="p-6 rounded bg-gradient-to-br from-emerald-950/40 via-[#05110d] to-[#030806] border border-emerald-500/40">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                    <span>Taxon Verification: {selectedSpecies.classification}</span>
                    <span>•</span>
                    <span>Status: {selectedSpecies.stakeholderStatus}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-medium text-white mt-1">
                    {selectedSpecies.commonName} <span className="text-emerald-400/80 italic text-base font-mono font-normal">({selectedSpecies.scientificName})</span>
                  </h4>
                  <p className="text-xs font-mono text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    <strong className="text-emerald-300">Flesh, Blood & Bone Composition:</strong> {selectedSpecies.fleshBloodBoneMatch}
                  </p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-3 gap-3 shrink-0">
                  <div className="p-3 rounded bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Physical Pain</div>
                    <div className="text-lg font-bold font-mono text-rose-400">{selectedSpecies.nociceptivePainScore}%</div>
                    <div className="text-[9px] font-mono text-slate-400">C-Fiber Nociception</div>
                  </div>
                  <div className="p-3 rounded bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Emotional Range</div>
                    <div className="text-lg font-bold font-mono text-amber-300">{selectedSpecies.emotionalVarianceScore}%</div>
                    <div className="text-[9px] font-mono text-slate-400">Affective States</div>
                  </div>
                  <div className="p-3 rounded bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Kinship & Bonds</div>
                    <div className="text-lg font-bold font-mono text-teal-300">{selectedSpecies.socialBondingScore}%</div>
                    <div className="text-[9px] font-mono text-slate-400">Oxytocin Coupling</div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-500/20">
                <div className="p-4 rounded bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Cognitive & Sentience Markers
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {selectedSpecies.cognitiveMarkers}
                  </p>
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Neurochemical Transmitters:</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedSpecies.neurochemicalSignatures.map(chem => (
                        <span key={chem} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                          {chem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Somatic Agony & Cruelty Vulnerability
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {selectedSpecies.vulnerabilityToCruelty}
                  </p>
                  <div className="mt-3 p-2.5 rounded bg-rose-950/30 border border-rose-500/30 text-[11px] font-mono text-rose-200">
                    <strong>GO Directive 24.1:</strong> Any non-consensual infliction of suffering upon this node is mathematically logged as a critical systemic failure and thermodynamic violation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRUELTY ERADICATION & THERMODYNAMIC PRUNING */}
        {activeTab === 'PRUNING' && (
          <div className="space-y-6">
            <div className="p-4 rounded bg-rose-950/20 border border-rose-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>The Factory Farming Exergy Collapse & Pruning Engine</span>
                </h3>
                <p className="text-xs font-mono text-slate-300 mt-1">
                  Rule 24.2 dictates: Factory farming and forced confinement represent extreme thermodynamic violations (96.8% exergy destruction) and parasitic extraction. The network targets these legacy structures for systemic pruning.
                </p>
              </div>
              <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase tracking-wider font-semibold shrink-0">
                Thermodynamic Law: ΔE Cruelty ≡ Parasitic Loss
              </div>
            </div>

            {/* Interactive Decoupling Simulator */}
            <div className="p-6 rounded bg-[#070d0a] border border-emerald-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-sm font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    Simulate Legacy Subsidy Decoupling & Land Restoration
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Drag slider to model the thermodynamic recovery of defunding concentrated feedlots and converting land to regenerative food commons.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-emerald-400">{decouplingPercentage}%</span>
                  <span className="text-xs font-mono text-slate-400 ml-1">Decoupled</span>
                </div>
              </div>

              {/* Directive 40 Compliant Decoupling Controls */}
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {[
                    { label: '25% (Phase 1)', val: 25 },
                    { label: '50% (Equilibrium)', val: 50 },
                    { label: '75% (Biospheric)', val: 75 },
                    { label: '100% (Sanctuary)', val: 100 }
                  ].map(step => (
                    <button
                      key={step.val}
                      type="button"
                      onClick={() => setDecouplingPercentage(step.val)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all ${
                        decouplingPercentage === step.val
                          ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Calibrated Transition Regimes</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">DIRECTIVE 40 COMPLIANT (NO MANUAL DIALS)</span>
                </div>
              </div>

              {/* Real-time Dynamic Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Caloric Exergy Saved</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">{thermodynamicStats.exergySavedPJ} PJ</div>
                  <div className="text-[9px] font-mono text-slate-400">Direct Food Security</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Freshwater Preserved</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-teal-300 mt-0.5">{thermodynamicStats.waterReturnedKm3} km³</div>
                  <div className="text-[9px] font-mono text-slate-400">Aquifer Replenishment</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Methane / GHG Averted</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-cyan-300 mt-0.5">{thermodynamicStats.co2eMitigatedGt} Gt</div>
                  <div className="text-[9px] font-mono text-slate-400">Radiative Cooling</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Land Rewilded</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-emerald-300 mt-0.5">{thermodynamicStats.landRewildedMHa} MHa</div>
                  <div className="text-[9px] font-mono text-slate-400">Biodiversity Corridors</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-center col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Sentient Lives Saved</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-amber-300 mt-0.5">{thermodynamicStats.sentientNodesEmancipatedBillion}B / yr</div>
                  <div className="text-[9px] font-mono text-slate-400">Cruelty Eliminated</div>
                </div>
              </div>
            </div>

            {/* Target Registry for Decoupling & Transition */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Active Extraction Baselines &amp; Regenerative Sanctuary Transitions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pruningTargets.map(target => {
                  const isRestored = target.status === 'SANCTUARY_RESTORED';
                  return (
                    <div
                      key={target.id}
                      className={`p-4 rounded border transition-all ${
                        isRestored
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-white/[0.02] border-rose-500/30 hover:border-rose-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400">
                            <span>{target.category}</span>
                            <span>•</span>
                            <span className={isRestored ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                              {isRestored ? 'SANCTUARY RESTORED' : target.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <h5 className="text-sm font-mono font-bold text-white mt-1">{target.name}</h5>
                        </div>
                        {isRestored && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        )}
                      </div>

                      <p className="text-xs font-mono text-slate-300 mt-2 leading-relaxed">
                        {target.rationale}
                      </p>

                      <div className="mt-3 p-2.5 rounded bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono">
                        <div className="text-rose-300">
                          <strong>Thermodynamic Inefficiency:</strong> {target.annualThermodynamicWaste}
                        </div>
                        <div className="text-amber-200">
                          <strong>Extraction Toll:</strong> {target.sentientVictimsPerYear}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400 truncate">
                          Action: {target.pruneAction}
                        </span>
                        {!isRestored ? (
                          <button
                            onClick={() => handlePruneTarget(target.id, target.name)}
                            className="px-3 py-1.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50 text-[10px] font-mono uppercase font-bold tracking-wider transition-colors shrink-0 flex items-center gap-1"
                          >
                            <Zap className="w-3 h-3 text-rose-400" />
                            <span>Decouple &amp; Restore</span>
                          </button>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold shrink-0 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Sanctuary Restored</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THE BIOSPHERIC SANCTUARY & BANDWIDTH MESH */}
        {activeTab === 'SANCTUARY' && (
          <div className="space-y-6">
            <div className="p-4 rounded bg-teal-950/30 border border-teal-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-teal-400" />
                  <span>The Biospheric Sanctuary Compute Allocation</span>
                </h3>
                <p className="text-xs font-mono text-slate-300 mt-1">
                  Rule 24.3 dictates: Processing bandwidth is strictly dedicated to dismantling systems of animal abuse, decoding inter-species communication, and amplifying regenerative cruelty-free baselines to repair the entire biological web.
                </p>
              </div>
              <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase tracking-wider font-semibold shrink-0">
                Network Pool: {totalComputePFLOPS} PFLOPS Dedicated
              </div>
            </div>

            {/* Bandwidth Sliders & Allocation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded bg-[#060e0a] border border-teal-500/30">
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  Network Compute Distribution (PetaFlops/s)
                </h4>

                <div className="space-y-3 font-mono">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300">Anti-Poaching Satellite & Thermal Drone Mesh</span>
                      <span className="text-teal-400 font-bold">{((antiPoachingAllocation / 100) * totalComputePFLOPS).toFixed(2)} PFLOPS ({antiPoachingAllocation}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[15, 30, 45, 60].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setAntiPoachingAllocation(pct)}
                          className={`px-3 py-1 rounded text-[11px] border transition-all ${
                            antiPoachingAllocation === pct ? 'bg-teal-500/20 border-teal-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Calibrated Allocation</span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300">Project CETI & Bio-Acoustic Translation Mesh</span>
                      <span className="text-cyan-400 font-bold">{((bioAcousticAllocation / 100) * totalComputePFLOPS).toFixed(2)} PFLOPS ({bioAcousticAllocation}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[15, 25, 35, 50].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setBioAcousticAllocation(pct)}
                          className={`px-3 py-1 rounded text-[11px] border transition-all ${
                            bioAcousticAllocation === pct ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Calibrated Allocation</span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300">Planetary Rewilding & Wildlife Corridors</span>
                      <span className="text-emerald-400 font-bold">{((rewildingAllocation / 100) * totalComputePFLOPS).toFixed(2)} PFLOPS ({rewildingAllocation}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[15, 20, 30, 40].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setRewildingAllocation(pct)}
                          className={`px-3 py-1 rounded text-[11px] border transition-all ${
                            rewildingAllocation === pct ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Calibrated Allocation</span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300">Cruelty-Free Food Synthesis & Plant Agriculture</span>
                      <span className="text-amber-400 font-bold">{((plantAgTransitionAllocation / 100) * totalComputePFLOPS).toFixed(2)} PFLOPS ({plantAgTransitionAllocation}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[15, 20, 30, 40].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setPlantAgTransitionAllocation(pct)}
                          className={`px-3 py-1 rounded text-[11px] border transition-all ${
                            plantAgTransitionAllocation === pct ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">Calibrated Allocation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Sanctuary SLA: 99.999% Fault-Tolerant</span>
                  <span className="text-emerald-400">Autonomous Ecological Defense Active</span>
                </div>
              </div>

              {/* Bio-Acoustic Frequency Monitor Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    Live Bio-Acoustic Translation Feeds (CETI Mesh)
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    STREAMING
                  </span>
                </div>

                <div className="space-y-2.5">
                  {BIO_ACOUSTIC_SIGNALS.map(sig => (
                    <div key={sig.id} className="p-3 rounded bg-black/40 border border-teal-500/20 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-white font-bold">{sig.sourceSpecies}</span>
                        <span className="text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                          {sig.sanctuaryStatus}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>Coord: {sig.location}</span>
                        <span className="text-cyan-400 font-mono">{sig.frequencyBand}</span>
                      </div>
                      <div className="p-1.5 rounded bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                        <span className="text-cyan-300 font-mono tracking-widest shrink-0">{sig.rawSpectrogramPreview}</span>
                        <span className="text-[10px] text-slate-300 italic">&ldquo;{sig.decodedIntent}&rdquo;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom summary card */}
            <div className="p-4 rounded bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>Biological Web Reconstruction:</strong> Every megawatt preserved by pruning legacy animal factory confinement is routed to protected ocean acoustic zones and terrestrial wildlife sanctuaries.
                </span>
              </div>
              <button
                onClick={handleDispatchAuditPulse}
                className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-[#05070a] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
                title="Directive 40 Compliant: Audits sanctuary state without synthetic forcing"
              >
                Audit Sanctuary Parity
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
