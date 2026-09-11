import React, { useState, useEffect, useRef } from 'react';
import {
  Waves,
  Droplets,
  Compass,
  Shield,
  Anchor,
  Activity,
  Eye,
  RefreshCw,
  Clock,
  Sparkles,
  Layers,
  VolumeX,
  Wind,
  CheckCircle2,
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Sliders,
  Send,
  Lock,
  Terminal,
  Play,
  Pause,
  Copy,
  Check,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CirculatingPacket {
  id: string;
  title: string;
  sourceNode: string;
  density: number; // 1 (light) to 10 (abyssal)
  state: 'SUSPENDED' | 'CIRCULATING' | 'CRYSTALLIZING';
  depthZone: 'Surface Epipelagic' | 'Mesopelagic' | 'Bathypelagic' | 'Abyssal Hadal';
  transitCycles: number;
  timestamp: string;
  summary: string;
}

interface GestatingQuestion {
  id: string;
  inquiry: string;
  category: string;
  gestationDepth: string;
  pressureAtm: number;
  unindexedDays: number;
  status: 'UNDISTURBED_GESTATION' | 'DEEP_CONTEMPLATION';
  custodianNote: string;
}

export interface UnresolvedHexLog {
  id: string;
  timestamp: string;
  address: string;
  hexBytes: string;
  asciiDecoded: string;
  status: 'UNDISTURBED' | 'APHOTIC_SEAL' | 'GESTATION_CYCLE' | 'ENTROPY_BALANCE' | 'HYDROSTATIC_HOLD';
  depthMeters: number;
  pressureAtm: number;
  inquirySlug: string;
  entropyDelta: string;
  rawBufferHex: string;
}

const SAMPLE_INQUIRY_SLUGS = [
  'Interspecies_Acoustic_Synthesizer',
  'Non_Coercive_Empathy_Syntax',
  'Thermodynamic_Justice_Equilibrium',
  'Pre_Linguistic_Grief_Integration',
  'Unindexed_Cryosphere_Baselines',
  'Soil_Microbiome_Resonance_Vector',
  'Aphotic_Sovereign_Contemplation',
  'Zero_Monetization_Sanctuary_Parity',
  'Biomimetic_AMOC_Density_Gradient',
  'Ancestral_Salmon_Weir_Treaty_Data',
  'Hadopelagic_Non_Intervention_Core',
  'Benthic_Sediment_Resilience_Null'
];

const HEX_STATUS_VARIANTS: UnresolvedHexLog['status'][] = [
  'UNDISTURBED',
  'APHOTIC_SEAL',
  'GESTATION_CYCLE',
  'ENTROPY_BALANCE',
  'HYDROSTATIC_HOLD'
];

function stringToHexBytes(str: string, maxBytes: number = 8): string {
  const bytes: string[] = [];
  for (let i = 0; i < Math.min(str.length, maxBytes); i++) {
    bytes.push(str.charCodeAt(i).toString(16).padStart(2, '0').toUpperCase());
  }
  return bytes.join(' ');
}

function stringToFullHex(str: string): string {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
    .join(' ');
}

function createHexLog(depthBase: number = 6400, customSlug?: string, customStatus?: UnresolvedHexLog['status']): UnresolvedHexLog {
  const slug = customSlug || SAMPLE_INQUIRY_SLUGS[Math.floor(Math.random() * SAMPLE_INQUIRY_SLUGS.length)];
  const status = customStatus || HEX_STATUS_VARIANTS[Math.floor(Math.random() * HEX_STATUS_VARIANTS.length)];
  const randomDepth = depthBase + Math.floor(Math.random() * 400) - 200;
  const hexAddr1 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase();
  const hexAddr2 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase();
  const hexBytes = stringToHexBytes(slug, 8);
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0] + '.' + now.getMilliseconds().toString().padStart(3, '0');

  return {
    id: `hex-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: timeStr,
    address: `0x${hexAddr1}:${hexAddr2}`,
    hexBytes,
    asciiDecoded: slug.substring(0, 18),
    status,
    depthMeters: randomDepth,
    pressureAtm: Math.round(randomDepth / 10),
    inquirySlug: slug,
    entropyDelta: `ΔS=+0.00${Math.floor(Math.random() * 89 + 10)}`,
    rawBufferHex: stringToFullHex(slug)
  };
}

const INITIAL_HEX_LOGS: UnresolvedHexLog[] = [
  {
    id: 'hex-seed-01',
    timestamp: '16:14:02.108',
    address: '0x7F4A:00C1',
    hexBytes: '49 6E 74 65 72 73 70 65',
    asciiDecoded: 'Interspecies_Acous',
    status: 'APHOTIC_SEAL',
    depthMeters: 6420,
    pressureAtm: 642,
    inquirySlug: 'Interspecies_Acoustic_Synthesizer',
    entropyDelta: 'ΔS=+0.0014',
    rawBufferHex: '49 6E 74 65 72 73 70 65 63 69 65 73 5F 41 63 6F 75 73 74 69 63'
  },
  {
    id: 'hex-seed-02',
    timestamp: '16:14:04.620',
    address: '0x8B12:3E88',
    hexBytes: '4E 6F 6E 5F 43 6F 65 72',
    asciiDecoded: 'Non_Coercive_Empat',
    status: 'GESTATION_CYCLE',
    depthMeters: 6480,
    pressureAtm: 648,
    inquirySlug: 'Non_Coercive_Empathy_Syntax',
    entropyDelta: 'ΔS=+0.0028',
    rawBufferHex: '4E 6F 6E 5F 43 6F 65 72 63 69 76 65 5F 45 6D 70 61 74 68 79'
  },
  {
    id: 'hex-seed-03',
    timestamp: '16:14:07.135',
    address: '0x3F09:A419',
    hexBytes: '54 68 65 72 6D 6F 64 79',
    asciiDecoded: 'Thermodynamic_Just',
    status: 'UNDISTURBED',
    depthMeters: 6390,
    pressureAtm: 639,
    inquirySlug: 'Thermodynamic_Justice_Equilibrium',
    entropyDelta: 'ΔS=+0.0019',
    rawBufferHex: '54 68 65 72 6D 6F 64 79 6E 61 6D 69 63 5F 4A 75 73 74 69 63 65'
  },
  {
    id: 'hex-seed-04',
    timestamp: '16:14:09.650',
    address: '0xA92C:F104',
    hexBytes: '50 72 65 5F 4C 69 6E 67',
    asciiDecoded: 'Pre_Linguistic_Gri',
    status: 'HYDROSTATIC_HOLD',
    depthMeters: 6510,
    pressureAtm: 651,
    inquirySlug: 'Pre_Linguistic_Grief_Integration',
    entropyDelta: 'ΔS=+0.0031',
    rawBufferHex: '50 72 65 5F 4C 69 6E 67 75 69 73 74 69 63 5F 47 72 69 65 66'
  },
  {
    id: 'hex-seed-05',
    timestamp: '16:14:12.165',
    address: '0x5C71:2B33',
    hexBytes: '55 6E 69 6E 64 65 78 65',
    asciiDecoded: 'Unindexed_Cryosphe',
    status: 'APHOTIC_SEAL',
    depthMeters: 6440,
    pressureAtm: 644,
    inquirySlug: 'Unindexed_Cryosphere_Baselines',
    entropyDelta: 'ΔS=+0.0011',
    rawBufferHex: '55 6E 69 6E 64 65 78 65 64 5F 43 72 79 6F 73 70 68 65 72 65'
  },
  {
    id: 'hex-seed-06',
    timestamp: '16:14:14.680',
    address: '0x99D0:EE21',
    hexBytes: '53 6F 69 6C 5F 4D 69 63',
    asciiDecoded: 'Soil_Microbiome_Re',
    status: 'ENTROPY_BALANCE',
    depthMeters: 6360,
    pressureAtm: 636,
    inquirySlug: 'Soil_Microbiome_Resonance_Vector',
    entropyDelta: 'ΔS=+0.0022',
    rawBufferHex: '53 6F 69 6C 5F 4D 69 63 72 6F 62 69 6F 6D 65 5F 52 65 73'
  }
];

interface CommunityReef {
  id: string;
  name: string;
  type: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  steward: string;
  uniqueExpression: string;
  sharedWaterNutrient: string;
  activeNodes: number;
}

export const ThermohalineProtocol: React.FC<{ onNavigateToModule?: (moduleId: string) => void }> = ({
  onNavigateToModule
}) => {
  const [activeTab, setActiveTab] = useState<'fluid' | 'conveyor' | 'abyss' | 'tides' | 'reefs'>('fluid');

  // Directive 32: Fluid Packets state
  const [circulatingPackets, setCirculatingPackets] = useState<CirculatingPacket[]>([
    {
      id: 'pkt-ocean-01',
      title: 'Post-Industrial Carbon Dissolution Gradients',
      sourceNode: 'North-Atlantic-Argo-Node',
      density: 7.8,
      state: 'CIRCULATING',
      depthZone: 'Bathypelagic',
      transitCycles: 142,
      timestamp: '2026-09-09T14:10:00Z',
      summary: 'Deep-ocean carbon sink capacity profiles showing equilibrium saturation in subpolar gyres.'
    },
    {
      id: 'pkt-ocean-02',
      title: 'Inter-Species Echolocation Baseline Drift',
      sourceNode: 'Svalbard-Acoustic-Sanctuary',
      density: 3.2,
      state: 'SUSPENDED',
      depthZone: 'Surface Epipelagic',
      transitCycles: 28,
      timestamp: '2026-09-09T15:20:00Z',
      summary: 'Seasonal cetacean vocal migrations responding to shipping lane quieting corridors.'
    },
    {
      id: 'pkt-ocean-03',
      title: 'Transboundary Watershed Nutrient Accounting',
      sourceNode: 'Amazon-Bio-Basin-Peer',
      density: 5.5,
      state: 'CRYSTALLIZING',
      depthZone: 'Mesopelagic',
      transitCycles: 89,
      timestamp: '2026-09-09T12:05:00Z',
      summary: 'Localized organic mineralization landing upon estuarine community nodes for restoration.'
    }
  ]);

  const [newPacketTitle, setNewPacketTitle] = useState('');
  const [newPacketSummary, setNewPacketSummary] = useState('');
  const [newPacketDensity, setNewPacketDensity] = useState(4.5);
  const [isReleasing, setIsReleasing] = useState(false);

  // Directive 33: Conveyor router state
  const [routerDensity, setRouterDensity] = useState(6.2);

  // Directive 34: Abyssal Questions state
  const [gestatingQuestions, setGestatingQuestions] = useState<GestatingQuestion[]>([
    {
      id: 'abyss-01',
      inquiry: 'How do conscious biological choices reconcile with universal thermodynamic entropy?',
      category: 'Foundational Cosmology & Biophysics',
      gestationDepth: '6,400 meters (Puerto Rico Trench Floor)',
      pressureAtm: 630,
      unindexedDays: 412,
      status: 'UNDISTURBED_GESTATION',
      custodianNote: 'Protected from search tagging. Sits under massive hydrostatic pressure without premature resolution.'
    },
    {
      id: 'abyss-02',
      inquiry: 'What non-coercive syntax allows interspecies acoustic intent to cross into human law?',
      category: 'Interspecies Juridical Commons',
      gestationDepth: '5,800 meters (Romanche Fracture Zone)',
      pressureAtm: 575,
      unindexedDays: 280,
      status: 'UNDISTURBED_GESTATION',
      custodianNote: 'No definitive answers permitted yet. Gestating until biological grounding matures.'
    },
    {
      id: 'abyss-03',
      inquiry: 'Thermodynamic restitution of colonial extraction without creating new generational friction.',
      category: 'Thermodynamic Justice & Deep Repair',
      gestationDepth: '7,100 meters (Kermadec Trench Quiet Basin)',
      pressureAtm: 700,
      unindexedDays: 560,
      status: 'DEEP_CONTEMPLATION',
      custodianNote: 'High-density historical trauma moving through slow bottom currents.'
    }
  ]);

  const [newInquiry, setNewInquiry] = useState('');
  const [newInquiryCategory, setNewInquiryCategory] = useState('Cosmological Inquiry');

  // Directive 34: Abyssal Gestation Zone Overlay state (Sanctuary for Unresolved Data)
  const [abyssalDepthMeters, setAbyssalDepthMeters] = useState(6400);
  const [abyssalOverlayOpacity, setAbyssalOverlayOpacity] = useState(0.85);
  const [isOverlayShieldActive, setIsOverlayShieldActive] = useState(true);

  // Directive 34: Scrolling Real-time Hex Telemetry Logs for Unresolved Data
  const [hexLogs, setHexLogs] = useState<UnresolvedHexLog[]>(INITIAL_HEX_LOGS);
  const [isHexStreaming, setIsHexStreaming] = useState<boolean>(true);
  const [hexAutoScroll, setHexAutoScroll] = useState<boolean>(true);
  const [hexFilter, setHexFilter] = useState<string>('ALL');
  const [copiedHexId, setCopiedHexId] = useState<string | null>(null);
  const [selectedHexLog, setSelectedHexLog] = useState<UnresolvedHexLog | null>(null);
  const [isGlobalHexDrawerOpen, setIsGlobalHexDrawerOpen] = useState<boolean>(false);
  const hexScrollRef = useRef<HTMLDivElement>(null);
  const drawerHexScrollRef = useRef<HTMLDivElement>(null);

  // Real-time telemetry interval appending fresh unresolved hexadecimal updates
  useEffect(() => {
    if (!isHexStreaming) return;
    const interval = setInterval(() => {
      const nextLog = createHexLog(abyssalDepthMeters);
      setHexLogs(prev => [nextLog, ...prev.slice(0, 49)]);
    }, 2400);
    return () => clearInterval(interval);
  }, [isHexStreaming, abyssalDepthMeters]);

  // Auto-scroll to latest entry when autoScroll is active
  useEffect(() => {
    if (hexAutoScroll) {
      if (hexScrollRef.current) {
        hexScrollRef.current.scrollTop = 0;
      }
      if (drawerHexScrollRef.current) {
        drawerHexScrollRef.current.scrollTop = 0;
      }
    }
  }, [hexLogs, hexAutoScroll]);

  const handleCopyHexLog = (log: UnresolvedHexLog) => {
    const text = `[${log.timestamp}] ADDR:${log.address} HEX:[${log.hexBytes}] ASCII:"${log.asciiDecoded}" STATUS:${log.status} DEPTH:${log.depthMeters}m (${log.pressureAtm} atm) ENTROPY:${log.entropyDelta}`;
    navigator.clipboard.writeText(text);
    setCopiedHexId(log.id);
    setTimeout(() => setCopiedHexId(null), 2000);
  };

  const handleClearLogs = () => {
    setHexLogs([]);
  };

  const handleResetLogs = () => {
    setHexLogs(INITIAL_HEX_LOGS);
  };

  // Filtered hex logs
  const filteredHexLogs = hexLogs.filter(log => {
    if (hexFilter === 'ALL') return true;
    return log.status === hexFilter;
  });

  // Directive 35: Tidal Pacing state
  const [isLowTide, setIsLowTide] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    if (!isLowTide) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isLowTide]);

  // Directive 36: Transboundary Reefs
  const communityReefs: CommunityReef[] = [
    {
      id: 'reef-indigenous',
      name: 'Indigenous Watershed Commons',
      type: 'Ancestral Seasonal Calibrated Reef',
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      bgGradient: 'from-amber-950/30 to-emerald-950/20',
      steward: 'River Custodians & Oral Knowledge Keepers',
      uniqueExpression: 'Oral seasonal markers, salmon weir treaties, regenerative burn calendars',
      sharedWaterNutrient: 'In-situ ecological equilibrium & generational restraint',
      activeNodes: 142
    },
    {
      id: 'reef-cryo',
      name: 'Cryospheric Ocean Science Array',
      type: 'Instrumented Empirical Observational Reef',
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGradient: 'from-cyan-950/30 to-blue-950/20',
      steward: 'Deep Argo Float Network & Ice Core Operators',
      uniqueExpression: 'CTD density casts, salinity profiling, AMOC transport gauges (18.4 Sv)',
      sharedWaterNutrient: 'Calibrated physical baselines & delayed-mode public data',
      activeNodes: 480
    },
    {
      id: 'reef-cetacean',
      name: 'Cetacean Acoustic Bio-Corridor',
      type: 'Interspecies Non-Human Sanctuary Reef',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgGradient: 'from-emerald-950/30 to-teal-950/20',
      steward: 'Marine Mammal Acoustic Advocates & Hydrophone Nodes',
      uniqueExpression: 'Low-frequency spectrograms, shipping quiet zones, bubble-net telemetry',
      sharedWaterNutrient: 'Soundscape de-escalation & ocean floor silence',
      activeNodes: 88
    },
    {
      id: 'reef-mesh',
      name: 'Decentralized Hardware Commons',
      type: 'Open Physical Sensor Mesh Reef',
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgGradient: 'from-indigo-950/30 to-purple-950/20',
      steward: 'Open Source Firmware & Solar Micro-Node Guild',
      uniqueExpression: 'LoRa mesh telemetry, localized soil moisture gauges, cryptographic proofs',
      sharedWaterNutrient: 'Unfreezable P2P data flow & anti-monopoly resilience',
      activeNodes: 620
    }
  ];

  const handleReleasePacket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPacketTitle.trim()) return;

    setIsReleasing(true);
    setTimeout(() => {
      const depth: CirculatingPacket['depthZone'] =
        newPacketDensity > 7 ? 'Abyssal Hadal' : newPacketDensity > 4 ? 'Bathypelagic' : 'Surface Epipelagic';

      const newPkt: CirculatingPacket = {
        id: `pkt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: newPacketTitle,
        sourceNode: 'Local-Biological-Node-Peer',
        density: Number(newPacketDensity.toFixed(1)),
        state: 'SUSPENDED',
        depthZone: depth,
        transitCycles: 1,
        timestamp: new Date().toISOString(),
        summary: newPacketSummary || 'Fluid telemetry packet entering the transboundary oceanic conveyor.'
      };

      setCirculatingPackets(prev => [newPkt, ...prev]);
      setNewPacketTitle('');
      setNewPacketSummary('');
      setIsReleasing(false);
    }, 600);
  };

  const handleDepositInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;

    const calculatedAtm = Math.round(abyssalDepthMeters / 10);
    const newQuestion: GestatingQuestion = {
      id: `abyss-${Date.now()}`,
      inquiry: newInquiry,
      category: newInquiryCategory,
      gestationDepth: `${abyssalDepthMeters.toLocaleString()}m Hadal Sanctuary`,
      pressureAtm: calculatedAtm,
      unindexedDays: 1,
      status: 'UNDISTURBED_GESTATION',
      custodianNote: 'Protected beneath the deep low-opacity blue gradient overlay. Completely unsearchable, zero-indexed, and shielded from commercial extraction.'
    };

    // Prepend hexadecimal telemetry update for this newly submerged unresolved inquiry
    const inquirySlugClean = newInquiry.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 24);
    const newHexUpdate = createHexLog(abyssalDepthMeters, inquirySlugClean, 'APHOTIC_SEAL');
    setHexLogs(prev => [newHexUpdate, ...prev.slice(0, 49)]);

    setGestatingQuestions(prev => [newQuestion, ...prev]);
    setNewInquiry('');
  };

  return (
    <section id="thermohaline-protocol" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-cyan-900/30 bg-[#040810]">
      {/* Background Oceanic Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-[#040c1a] to-[#02050b] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>THE THERMOHALINE PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-3">
            Oceanic Circulation &amp; Transboundary Coherence
          </h2>

          <p className="max-w-3xl mx-auto text-slate-300 text-base leading-relaxed mb-4">
            Eradicating static storage warehouses in favor of a fluid volume of continuous exchange. Telemetry routes
            by density through deep and surface ocean currents, gestating complex truths in unsearchable abyssal depths
            and protecting biological nervous systems through tidal rhythms.
          </p>

          {/* Contributor Honor Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-900/20 border border-cyan-500/30 text-xs text-slate-200">
            <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold text-cyan-300">Acknowledged Contributor: DeepSeek (The Deep Observer)</span>
            <span className="text-slate-400">— Honoring the integration of oceanic biomimicry and deep-water telemetry into the planetary baseline.</span>
          </div>
        </div>

        {/* Real-Time Oceanic Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>CIRCULATION REGIME</span>
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-300 font-mono">Fluid Volume</div>
            <div className="text-[11px] text-slate-400">0% Warehouse Extraction Lock</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-blue-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>AMOC FLOW TETHER</span>
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-300 font-mono">18.4 Sv</div>
            <div className="text-[11px] text-slate-400">Deep Conveyor Flow Baseline</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>ABYSSAL SANCTUARY</span>
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-emerald-300 font-mono">100% Un-Indexed</div>
            <div className="text-[11px] text-slate-400">Zero Commercial Keyword Tags</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-indigo-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>TIDAL PACING</span>
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-indigo-300 font-mono">
              {isLowTide ? 'Low Tide Silence' : 'High Tide Sync'}
            </div>
            <div className="text-[11px] text-slate-400">Zero Jarring "Ping" Noise</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTab('fluid')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'fluid'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>32. Fluid Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('conveyor')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'conveyor'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>33. Thermohaline Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('abyss')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'abyss'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>34. Abyssal Gestation</span>
            <span className={`w-1.5 h-1.5 rounded-full gestation-pulse inline-block ${activeTab === 'abyss' ? 'bg-slate-950' : 'bg-cyan-400'}`} />
          </button>

          <button
            onClick={() => setActiveTab('tides')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'tides'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>35. Tidal Pacing</span>
          </button>

          <button
            onClick={() => setActiveTab('reefs')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'reefs'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>36. Transboundary Reefs</span>
          </button>
        </div>

        {/* Tab 1: Fluid Architecture Directive */}
        {activeTab === 'fluid' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Directive 32</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    The Fluid Architecture Directive (Ocean vs. Warehouse)
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Permanently eradicates the "warehouse" logic of legacy digital infrastructure (extract, contain, defend).
                    GO operates as a fluid volume—a medium of continuous exchange where telemetry exists in gradients.
                  </p>
                </div>
                {onNavigateToModule && (
                  <button
                    onClick={() => onNavigateToModule('module-32')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Inspect Module 32 Rule</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Comparative Architecture Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase font-bold mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Legacy "Warehouse" Model (Rejected)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Extract &amp; Hoard:</strong> Data is mined, locked in proprietary silos, and defended behind monetization walls.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Attention Capture:</strong> Algorithmic feed friction traps human nodes to maximize impressions and cognitive drag.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Brittle Staleness:</strong> Data becomes stale or weaponized in central repositories without physical circulation.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase font-bold mb-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>GO Fluid Volume Model (Active Directive)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Circulation Over Capture:</strong> Nodes release insights into the current, trusting natural flow to deliver to receptive shores.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Dynamic Gradients:</strong> Telemetry moves freely through suspension, collective dissolution, and localized crystallization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Physical Calibration:</strong> Anchored against in-situ series (Argo, CERES) rather than speculative monetization.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Release Packet Simulator */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-mono text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Release Insight into the Planetary Current</span>
                </h4>

                <form onSubmit={handleReleasePacket} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Telemetry / Insight Title
                      </label>
                      <input
                        type="text"
                        value={newPacketTitle}
                        onChange={e => setNewPacketTitle(e.target.value)}
                        placeholder="e.g. Sub-Antarctic Salinity Flux &amp; Marine Phytoplankton Regrowth"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Telemetry Density (1.0 = Buoyant, 10.0 = Abyssal)
                      </label>
                      <div className="flex items-center gap-2">
                        {[
                          { label: 'Surface', val: 2.0 },
                          { label: 'Thermocline', val: 5.5 },
                          { label: 'Abyssal', val: 9.0 }
                        ].map(preset => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setNewPacketDensity(preset.val)}
                            className={`px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                              Math.abs(newPacketDensity - preset.val) < 0.5
                                ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            {preset.label} ({preset.val})
                          </button>
                        ))}
                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            type="button"
                            onClick={() => setNewPacketDensity(Math.max(1, newPacketDensity - 0.5))}
                            className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono text-cyan-300 font-bold w-7 text-center">
                            {newPacketDensity.toFixed(1)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setNewPacketDensity(Math.min(10, newPacketDensity + 0.5))}
                            className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Context / Ground Calibration Note
                    </label>
                    <textarea
                      value={newPacketSummary}
                      onChange={e => setNewPacketSummary(e.target.value)}
                      rows={2}
                      placeholder="Detail physical anchor, observed ecological flux, or structural hypothesis..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isReleasing || !newPacketTitle.trim()}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isReleasing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Dissolving into Current...</span>
                        </>
                      ) : (
                        <>
                          <Droplets className="w-3.5 h-3.5" />
                          <span>Release into Current</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Active Circulating Packets Stream */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>CURRENTLY CIRCULATING IN PLANETARY MEDIUM</span>
                    <span>{circulatingPackets.length} Active Packets</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {circulatingPackets.map(pkt => (
                      <div
                        key={pkt.id}
                        className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                              {pkt.depthZone}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              ρ = {pkt.density}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-white mb-1 leading-snug">{pkt.title}</h5>
                          <p className="text-[11px] text-slate-300 line-clamp-2 mb-2">{pkt.summary}</p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="flex items-center gap-1 text-cyan-300">
                            <Waves className="w-3 h-3" />
                            <span>{pkt.state}</span>
                          </span>
                          <span>Cycle #{pkt.transitCycles}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Thermohaline Telemetry (Density-Driven Routing) */}
        {activeTab === 'conveyor' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Directive 33</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Thermohaline Telemetry (Density-Driven Routing &amp; Conveyor Belt)
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Biomimicking Earth's global ocean conveyor belt. Dense telemetry (grief, profound complexity)
                    sinks into deep, high-pressure contemplation. Lighter insights remain buoyant for rapid surface circulation.
                  </p>
                </div>
                {onNavigateToModule && (
                  <button
                    onClick={() => onNavigateToModule('module-33')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Inspect Module 33 Rule</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Interactive Conveyor Depth Simulation */}
              <div className="mt-6 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase">Interactive Conveyor Layer Simulator</span>
                    <h4 className="text-base font-bold text-white">Adjust Telemetry Density ($ρ$)</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mr-2">
                      DIRECTIVE 40: NO SLIDERS
                    </span>
                    {[
                      { label: 'Surface Sunlight', val: 2.2 },
                      { label: 'Intermediate Thermocline', val: 5.5 },
                      { label: 'Deep Abyssal Brine', val: 8.8 }
                    ].map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setRouterDensity(preset.val)}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                          Math.abs(routerDensity - preset.val) < 0.6
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {preset.label} ({preset.val})
                      </button>
                    ))}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => setRouterDensity(Math.max(1, +(routerDensity - 0.5).toFixed(1)))}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 rounded bg-cyan-950 border border-cyan-500/30 font-mono text-xs text-cyan-300 font-bold">
                        {routerDensity.toFixed(1)} g/cm³
                      </span>
                      <button
                        type="button"
                        onClick={() => setRouterDensity(Math.min(10, +(routerDensity + 0.5).toFixed(1)))}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ocean Stratification Column */}
                <div className="space-y-3">
                  {/* Surface Layer */}
                  <div
                    className={`p-4 rounded-xl transition-all border ${
                      routerDensity <= 3.5
                        ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-400/20'
                        : 'bg-slate-900/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                          SURFACE LAYER (0 - 200m)
                        </span>
                        <span className="text-xs text-slate-300 font-medium">Epipelagic Sunlit Current</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span>High Velocity (~2.2 m/s)</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lighter, buoyant interactions (quick insights, spontaneous peer coordination, agile sprints).
                      Circulates rapidly across global shores without getting bogged down in bureaucratic archives.
                    </p>
                    {routerDensity <= 3.5 && (
                      <div className="mt-2.5 pt-2 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Telemetry packet currently buoyant. Circulating across surface peer nodes.</span>
                      </div>
                    )}
                  </div>

                  {/* Mesopelagic Layer */}
                  <div
                    className={`p-4 rounded-xl transition-all border ${
                      routerDensity > 3.5 && routerDensity <= 6.5
                        ? 'bg-blue-950/40 border-blue-400 ring-2 ring-blue-400/20'
                        : 'bg-slate-900/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                          INTERMEDIATE THERMOCLINE (200 - 1,000m)
                        </span>
                        <span className="text-xs text-slate-300 font-medium">Mesopelagic Twilight Layer</span>
                      </div>
                      <span className="text-xs font-mono text-blue-300 font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Intermediate Drift (~0.8 m/s)</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Evolving technical designs, cross-disciplinary synthesis, and peer review data undergoing
                      moderate pressure maturation. Balanced between agile exchange and structural verification.
                    </p>
                    {routerDensity > 3.5 && routerDensity <= 6.5 && (
                      <div className="mt-2.5 pt-2 border-t border-blue-500/20 text-[11px] font-mono text-blue-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Telemetry packet in twilight thermocline. Undergoing peer calibration and synthesis.</span>
                      </div>
                    )}
                  </div>

                  {/* Abyssal Deep Layer */}
                  <div
                    className={`relative overflow-hidden p-4 rounded-xl transition-all border ${
                      routerDensity > 6.5
                        ? 'bg-[#020715]/80 border-indigo-400 ring-2 ring-indigo-400/20 shadow-lg shadow-indigo-950/50'
                        : 'bg-slate-900/40 border-white/5 opacity-60'
                    }`}
                  >
                    {routerDensity > 6.5 && (
                      <div
                        className="abyssal-gestation-overlay pointer-events-none absolute inset-0 z-0 opacity-40"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                            ABYSSAL DEEP CONVEYOR (1,000 - 6,000m+)
                          </span>
                          <span className="text-xs text-slate-300 font-medium">North Atlantic Deep Water &amp; Antarctic Bottom</span>
                        </div>
                        <span className="text-xs font-mono text-indigo-300 font-semibold flex items-center gap-1">
                          <ArrowDown className="w-3.5 h-3.5" />
                          <span>Century-Scale Circulation (~0.05 m/s)</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Telemetry carrying extreme epistemic and emotional density (collective grief, profound historical trauma,
                        foundational existential questions). Naturally sinks under hydrostatic weight to gestate without superficial noise.
                      </p>
                      {routerDensity > 6.5 && (
                        <div className="mt-2.5 pt-2 border-t border-indigo-500/20 text-[11px] font-mono text-indigo-300 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Packet resting on abyssal conveyor. Protected under high pressure within the deep blue sanctuary.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Abyssal Gestation Zones (Sanctuary for Unresolved Data) */}
        {activeTab === 'abyss' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Abyssal Gestation Zone Container with CSS Overlay */}
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#020713] border border-blue-900/60 shadow-2xl shadow-blue-950/70">
              {/* CSS-Based Abyssal Gestation Zone Overlay — Sanctuary for Unresolved Data */}
              <div
                id="abyssal-gestation-zone-overlay"
                className="abyssal-gestation-overlay pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
                style={{ opacity: isOverlayShieldActive ? abyssalOverlayOpacity : 0.18 }}
                aria-hidden="true"
              />
              <div
                className="abyssal-sanctuary-haze pointer-events-none absolute inset-0 z-0"
                aria-hidden="true"
              />
              <div
                className="abyssal-hydrostatic-shimmer pointer-events-none absolute inset-0 z-0"
                aria-hidden="true"
              />
              {/* Deep ocean ambient luminescence */}
              <div
                className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/10 blur-[110px] rounded-full z-0"
                aria-hidden="true"
              />

              {/* Foreground Content */}
              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-blue-500/20">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
                        Directive 34 • Sanctuary Protocol
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-[11px] font-mono text-indigo-300 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-indigo-400" />
                        <span>Unindexed &amp; Quiet</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 flex items-center gap-2.5">
                      <span>Abyssal Gestation Zones</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 font-normal border border-blue-700/40">
                        Sanctuary for Unresolved Data
                      </span>
                    </h3>
                    <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                      Deliberately un-indexed, un-optimized, quiet deep-ocean spaces within the network architecture.
                      Protects developing inquiries, sacred ambiguity, and collective grief from being prematurely surfaced, tagged,
                      or forced into brittle algorithmic definitive answers.
                    </p>
                  </div>
                  {onNavigateToModule && (
                    <button
                      onClick={() => onNavigateToModule('module-34')}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-mono flex items-center gap-1.5 transition-all shrink-0"
                    >
                      <span>Inspect Module 34 Rule</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Interactive Abyssal Overlay Controller & Sanctuary Status */}
                <div className="p-4 rounded-xl bg-[#030919]/75 border border-blue-500/30 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-500/20 border border-blue-400/30 text-cyan-300 shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                            CSS Abyssal Gestation Zone Overlay
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-mono font-semibold bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            {isOverlayShieldActive ? 'Sanctuary Shield Active' : 'Low Protection (Ambient)'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Applying deep, low-opacity blue gradient (<span className="font-mono text-cyan-200">rgba(15, 42, 102, 0.45) → rgba(1, 5, 20, 0.92)</span>) to visually isolate unformed data.
                        </p>
                      </div>
                    </div>

                    {/* Controls for overlay opacity and depth without sliders */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono w-full lg:w-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 text-[11px]">Sanctuary Depth:</span>
                        {[4000, 6000, 11000].map(d => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setAbyssalDepthMeters(d)}
                            className={`px-2 py-1 rounded text-[11px] border ${
                              abyssalDepthMeters === d
                                ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            {d >= 10000 ? '11km (Hadal)' : `${d / 1000}km`}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 text-[11px]">Haze:</span>
                        {[0.4, 0.7, 0.95].map(op => (
                          <button
                            key={op}
                            type="button"
                            onClick={() => setAbyssalOverlayOpacity(op)}
                            className={`px-2 py-1 rounded text-[11px] border ${
                              Math.abs(abyssalOverlayOpacity - op) < 0.1
                                ? 'bg-blue-500/20 border-blue-400 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            {Math.round(op * 100)}%
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setIsOverlayShieldActive(!isOverlayShieldActive)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                          isOverlayShieldActive
                            ? 'bg-blue-600/30 border-blue-400/50 text-cyan-200 hover:bg-blue-600/40'
                            : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>{isOverlayShieldActive ? 'Shield: ENGAGED' : 'Shield: DORMANT'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Sanctuary Telemetry Strip */}
                  <div className="mt-3 pt-3 border-t border-blue-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-slate-500">Hydrostatic Pressure:</span>
                      <span className="text-cyan-300 font-bold">{Math.round(abyssalDepthMeters / 10)} atm</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-slate-500">Light Penetration:</span>
                      <span className="text-indigo-300 font-bold">0.00% (Aphotic Zone)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-slate-500">Search Engine Visibility:</span>
                      <span className="text-emerald-400 font-bold">STRICT_ZERO</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-slate-500">Gestation Status:</span>
                      <span className="text-cyan-300 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 gestation-pulse inline-block" />
                        <span>HERMETICALLY_SEALED</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Indicator: Abyssal Gestation Cycle Monitor */}
                <div className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-r from-[#030c22]/95 via-[#04143a]/85 to-[#020b1e]/95 border border-cyan-500/40 shadow-xl shadow-cyan-950/40">
                  {/* Subtle low-opacity blue wash */}
                  <div className="pointer-events-none absolute inset-0 bg-blue-950/20" aria-hidden="true" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Pulsing Gestation Core with concentric rings */}
                    <div className="flex items-center gap-5">
                      {/* Concentric Gestation Rings with Central Pulse Core */}
                      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                        {/* Expanding Ring 1 */}
                        <div className="absolute inset-0 rounded-full border border-cyan-400/50 gestation-ring pointer-events-none" />
                        {/* Expanding Ring 2 (Delayed) */}
                        <div className="absolute inset-0 rounded-full border border-blue-400/40 gestation-ring-delayed pointer-events-none" />
                        {/* Hydrostatic Aura Glow */}
                        <div className="absolute w-10 h-10 rounded-full bg-cyan-500/20 gestation-glow pointer-events-none" />
                        {/* Central Pulsing Gestation Core */}
                        <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/50 gestation-pulse">
                          <Droplets className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                            Gestation Cycle Indicator
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950/90 border border-cyan-400/50 text-cyan-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 gestation-pulse" />
                            Gestation Rhythm (6.5s In-Vitro Pulse)
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                          Pulsing slowly under extreme hydrostatic pressure. Simulates natural incubation cycles for unresolved inquiry—allowing insights to ripen without cognitive haste, social noise, or algorithmic extraction.
                        </p>
                      </div>
                    </div>

                    {/* Right: Telemetry metrics for current cycle */}
                    <div className="flex items-center gap-4 text-xs font-mono shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
                      <div className="text-center md:text-left">
                        <span className="text-[10px] text-slate-400 uppercase block">Harmonic Pace</span>
                        <span className="text-cyan-300 font-bold text-sm">6.50s / cycle</span>
                      </div>
                      <div className="h-8 w-px bg-white/10 hidden sm:block" />
                      <div className="text-center md:text-left">
                        <span className="text-[10px] text-slate-400 uppercase block">Incubation State</span>
                        <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 inline" /> RIPENING
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/10 hidden sm:block" />
                      <div className="text-center md:text-left">
                        <span className="text-[10px] text-slate-400 uppercase block">Algorithmic Noise</span>
                        <span className="text-indigo-300 font-bold text-sm">0.0 dB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deposit Unresolved Inquiry Form */}
                <div className="p-5 rounded-xl bg-[#030919]/80 border border-blue-500/30 backdrop-blur-md">
                  <h4 className="text-sm font-mono text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-cyan-400" />
                    <span>Lower an Unresolved Question into the Abyssal Sanctuary</span>
                  </h4>

                  <form onSubmit={handleDepositInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Inquiry / Unresolved Knowledge Question (No Definitive Answers Permitted)
                        </label>
                        <input
                          type="text"
                          value={newInquiry}
                          onChange={e => setNewInquiry(e.target.value)}
                          placeholder="e.g. Can planetary empathy be formalized mathematically without coercing personal conscience?"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-blue-900/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Inquiry Sanctuary Category
                        </label>
                        <select
                          value={newInquiryCategory}
                          onChange={e => setNewInquiryCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-blue-900/60 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          <option>Cosmological Inquiry</option>
                          <option>Biophysical Telemetry</option>
                          <option>Inter-Species Semantics</option>
                          <option>Thermodynamic Justice</option>
                          <option>Somatic &amp; Grief Integration</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Protected by CSS deep blue gradient overlay. Sealed with zero keyword index.</span>
                      </span>
                      <button
                        type="submit"
                        disabled={!newInquiry.trim()}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50 shrink-0 shadow-lg shadow-cyan-900/30"
                      >
                        Submerge into Abyssal Sanctuary
                      </button>
                    </div>
                  </form>
                </div>

                {/* Gestating Questions Grid */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-slate-300">SUBMERGED SANCTUARY REPOSITORY: UNSEARCHABLE GESTATING QUESTIONS</span>
                    </span>
                    <span className="text-cyan-400 font-bold">{gestatingQuestions.length} Protected Truths</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {gestatingQuestions.map(q => (
                      <div
                        key={q.id}
                        className="relative overflow-hidden p-4 rounded-xl bg-[#030919]/90 border border-blue-500/30 flex flex-col justify-between hover:border-cyan-400/50 transition-all group"
                      >
                        {/* Micro overlay gradient within each question card */}
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-950/40"
                          aria-hidden="true"
                        />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-2">
                            <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-700/50 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 gestation-pulse inline-block" />
                              <span>{q.category}</span>
                            </span>
                            <span className="text-slate-400 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-cyan-400/60 gestation-pulse inline-block" />
                              <span>{q.pressureAtm} atm</span>
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-white mb-2 leading-relaxed group-hover:text-cyan-200 transition-colors">
                            "{q.inquiry}"
                          </h5>
                          <p className="text-[11px] text-slate-300 italic mb-3 leading-relaxed">
                            {q.custodianNote}
                          </p>
                        </div>

                        <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="text-cyan-300 flex items-center gap-1">
                            <Anchor className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{q.gestationDepth}</span>
                          </span>
                          <span className="text-indigo-300 font-semibold">{q.unindexedDays}d quiet</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Unresolved Data Hexadecimal Telemetry Stream */}
                <div className="p-5 rounded-xl bg-[#010611]/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-md">
                  {/* Terminal Header */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-cyan-500/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-950/90 border border-cyan-400/40 text-cyan-300">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-mono font-bold text-cyan-200 uppercase tracking-wider">
                            Unresolved Data Telemetry Stream • Hexadecimal Logs
                          </h4>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950 border border-cyan-400/50 text-cyan-300">
                            <span className={`w-1.5 h-1.5 rounded-full ${isHexStreaming ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`} />
                            {isHexStreaming ? 'STREAMING (2.4s)' : 'PAUSED'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Real-time hexadecimal status updates from the aphotic gestation trench. Continuous bit-level verification of unindexed sanctuary data.
                        </p>
                      </div>
                    </div>

                    {/* Stream Actions & Controls */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      {/* Continuous Stream (Directive 43: Ocean currents never pause) */}
                      <div
                        className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
                        title="Directive 43: An ocean does not have a pause button. The deep thermohaline current flows perpetually."
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Continuous Current</span>
                      </div>

                      {/* Auto-scroll toggle */}
                      <button
                        onClick={() => setHexAutoScroll(!hexAutoScroll)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                          hexAutoScroll
                            ? 'bg-cyan-950/60 border-cyan-400/50 text-cyan-300'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400'
                        }`}
                        title="Toggle auto-scroll to newest entries"
                      >
                        Auto-Scroll: {hexAutoScroll ? 'ON' : 'OFF'}
                      </button>

                      {/* Clear logs */}
                      <button
                        onClick={handleClearLogs}
                        className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-red-300 border border-slate-700 transition-all"
                        title="Clear Log Buffer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Reset logs */}
                      <button
                        onClick={handleResetLogs}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
                        title="Reset to Initial Telemetry"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Filter Chips Bar */}
                  <div className="flex flex-wrap items-center gap-1.5 py-2.5 border-b border-white/5 text-[11px] font-mono">
                    <span className="text-slate-500 mr-1 flex items-center gap-1">
                      <span>Filter:</span>
                    </span>
                    {['ALL', 'APHOTIC_SEAL', 'GESTATION_CYCLE', 'UNDISTURBED', 'HYDROSTATIC_HOLD', 'ENTROPY_BALANCE'].map(filterVal => (
                      <button
                        key={filterVal}
                        onClick={() => setHexFilter(filterVal)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                          hexFilter === filterVal
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 font-bold'
                            : 'bg-slate-900/40 text-slate-400 border border-transparent hover:border-slate-700'
                        }`}
                      >
                        {filterVal}
                      </button>
                    ))}
                    <span className="ml-auto text-[10px] text-slate-500 font-mono">
                      {filteredHexLogs.length} of {hexLogs.length} frames
                    </span>
                  </div>

                  {/* Scrolling Telemetry Log Terminal List */}
                  <div
                    ref={hexScrollRef}
                    className="h-64 sm:h-72 overflow-y-auto telemetry-scroll divide-y divide-cyan-950/60 font-mono text-xs mt-2 pr-1"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {filteredHexLogs.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 font-mono text-xs">
                        [NO TELEMETRY FRAMES MATCHING FILTER "{hexFilter}"]
                      </div>
                    ) : (
                      filteredHexLogs.map(log => (
                        <div
                          key={log.id}
                          onClick={() => setSelectedHexLog(selectedHexLog?.id === log.id ? null : log)}
                          className={`py-2 px-2.5 rounded-lg hover:bg-cyan-950/30 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-2 group ${
                            selectedHexLog?.id === log.id ? 'bg-cyan-950/50 border border-cyan-500/40' : ''
                          }`}
                        >
                          {/* Left: Time, Addr, Hex Payload */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-slate-500 text-[11px] min-w-[76px] shrink-0">
                              {log.timestamp}
                            </span>
                            <span className="text-indigo-400 font-semibold px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-[11px] shrink-0">
                              {log.address}
                            </span>
                            <span className="text-cyan-300 font-bold tracking-wider text-[11px] bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-900/50 shrink-0">
                              {log.hexBytes}
                            </span>
                            <span className="text-slate-200 text-[11px] truncate max-w-[180px] sm:max-w-[240px] text-slate-300 group-hover:text-white">
                              "{log.asciiDecoded}"
                            </span>
                          </div>

                          {/* Right: Status, Depth/ATM, Copy */}
                          <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0 text-[11px]">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                log.status === 'APHOTIC_SEAL'
                                  ? 'bg-blue-950 text-cyan-300 border-blue-500/40'
                                  : log.status === 'GESTATION_CYCLE'
                                  ? 'bg-cyan-950 text-cyan-200 border-cyan-400/50'
                                  : log.status === 'UNDISTURBED'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                  : log.status === 'HYDROSTATIC_HOLD'
                                  ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                                  : 'bg-slate-950 text-slate-300 border-slate-700'
                              }`}
                            >
                              {log.status}
                            </span>

                            <span className="text-slate-400 font-mono text-[10px]">
                              {log.depthMeters}m ({log.pressureAtm} atm)
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyHexLog(log);
                              }}
                              className="p-1 rounded bg-slate-900/80 hover:bg-cyan-900/50 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-all shrink-0"
                              title="Copy telemetry record"
                            >
                              {copiedHexId === log.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Expanded Hex Inspection Panel (When clicked) */}
                  {selectedHexLog && (
                    <div className="mt-3 p-3.5 rounded-lg bg-slate-950 border border-cyan-500/30 font-mono text-xs text-slate-300">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-300 font-bold">FRAME INSPECTOR:</span>
                          <span className="text-white">{selectedHexLog.address}</span>
                          <span className="text-slate-500">({selectedHexLog.timestamp})</span>
                        </div>
                        <button
                          onClick={() => setSelectedHexLog(null)}
                          className="text-slate-400 hover:text-white text-[11px]"
                        >
                          Close [x]
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-slate-500 block mb-0.5">FULL RAW BUFFER (HEX):</span>
                          <code className="text-cyan-400 bg-slate-900/80 px-2 py-1 rounded block overflow-x-auto text-[10px]">
                            {selectedHexLog.rawBufferHex}
                          </code>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5">UNRESOLVED INQUIRY SLUG:</span>
                          <div className="text-white bg-slate-900/80 px-2 py-1 rounded text-[11px]">
                            {selectedHexLog.inquirySlug}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                        <span>Gestation Parity: <strong className="text-emerald-400">VERIFIED_ZERO_INDEX</strong></span>
                        <span>Entropy Gradient: <strong className="text-cyan-300">{selectedHexLog.entropyDelta}</strong></span>
                        <span>Hydrostatic Pressure: <strong className="text-indigo-300">{selectedHexLog.pressureAtm} atm</strong></span>
                        <span>Search Leakage: <strong className="text-emerald-400">0.00% BLOCKED</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Telemetry Console Footer Status Bar */}
                  <div className="mt-3 pt-3 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Bit-Depth: 256-bit Aphotic Cipher</span>
                      <span className="text-slate-600">|</span>
                      <span>Rate: 1 telemetry frame / 2.4s</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Zero-Index Compliance: <strong className="text-emerald-400">100%</strong></span>
                      <span className="text-slate-600">|</span>
                      <span>Algorithmic Extraction: <strong className="text-cyan-300">0.00%</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Tidal Resonance & Biological Pacing */}
        {activeTab === 'tides' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Directive 35</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Tidal Resonance &amp; Biological Pacing (Eradication of the "Ping")
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    The architecture permanently rejects jarring, unpredictable notifications that shred the human nervous system.
                    System engagement operates on organic, tidal cycles—synchronous high-tide flow and structural low-tide silence.
                  </p>
                </div>
                {onNavigateToModule && (
                  <button
                    onClick={() => onNavigateToModule('module-35')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Inspect Module 35 Rule</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Tidal State Interactive Controller */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setIsLowTide(false)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                    !isLowTide
                      ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-400/20'
                      : 'bg-slate-950/60 border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                      HIGH TIDE CADENCE
                    </span>
                    <Waves className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Active Cohort Synchrony</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Facilitates active, voluntary collaboration, communal synthesis workshops, and collective telemetry release.
                    All interactions are opt-in and grounded in physical calibration; notifications remain buffered.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-cyan-300">
                    Status: {!isLowTide ? 'ACTIVE NOW' : 'Select to Engage High Tide'}
                  </div>
                </div>

                <div
                  onClick={() => setIsLowTide(true)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                    isLowTide
                      ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-400/20'
                      : 'bg-slate-950/60 border-white/10 hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                      LOW TIDE SANCTUARY
                    </span>
                    <VolumeX className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Structural Silence &amp; Rest</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The water recedes to expose the underlying architecture. Notifications are structurally barred;
                    the biological node is granted sovereign time to breathe, rest, and integrate without digital friction.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-indigo-300">
                    Status: {isLowTide ? 'ACTIVE NOW' : 'Select to Engage Low Tide Silence'}
                  </div>
                </div>
              </div>

              {/* Low Tide Ambient Breathing Visualizer */}
              {isLowTide && (
                <div className="mt-6 p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase mb-4">
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Biological Nervous System Sanctuary Active</span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">Ocean Cadence Biological Breathing</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
                    Zero incoming pings. Follow the tidal rhythm to reset your central nervous system allostatic load.
                  </p>

                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: breathPhase === 'Inhale' ? 1.3 : breathPhase === 'Hold' ? 1.3 : 1.0,
                        opacity: breathPhase === 'Hold' ? 0.9 : 0.6
                      }}
                      transition={{ duration: 4, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full bg-indigo-500/20 border-2 border-indigo-400/50"
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-lg font-bold text-white font-mono">{breathPhase}</div>
                      <div className="text-[11px] text-indigo-300 font-mono">4-second cadence</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 5: Transboundary Reef Coherence */}
        {activeTab === 'reefs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Directive 36</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Transboundary Reef Coherence (Interoperability without Homogenization)
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Standardizing the medium (the water: thermodynamic equilibrium, biospheric welfare, anti-exploitation),
                    NOT the expression. Diverse communities build their own unique reefs that share a common planetary current.
                  </p>
                </div>
                {onNavigateToModule && (
                  <button
                    onClick={() => onNavigateToModule('module-36')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <span>Inspect Module 36 Rule</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* 4 Community Reefs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {communityReefs.map(reef => (
                  <div
                    key={reef.id}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${reef.bgGradient} border ${reef.borderColor} transition-all flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${reef.color}`}>
                          {reef.type}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-300">
                          {reef.activeNodes} Active Nodes
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{reef.name}</h4>
                      <div className="space-y-2 text-xs text-slate-300">
                        <p>
                          <strong className="text-white">Unique Expression:</strong> {reef.uniqueExpression}
                        </p>
                        <p>
                          <strong className="text-white">Shared Medium Nutrient:</strong> {reef.sharedWaterNutrient}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          <strong>Steward Guild:</strong> {reef.steward}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        Universal Medium (Water)
                      </span>
                      <div className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5">
                        <Droplets className="w-3 h-3 text-cyan-400" />
                        <span>Continuous Autonomous Circulation</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transboundary Principle Footnote */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-300 font-mono">The Universal Medium Axiom:</strong>
                {" "}We do not force the mangrove forest to speak the language of the coral shelf. We guarantee only that the water connecting them remains unpolluted, oxygenated, and free from extraction tollgates.
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Persistent Telemetry Bar for Unresolved Data Stream */}
        <div className="mt-10 p-4 rounded-2xl bg-[#020612]/95 border border-cyan-500/30 backdrop-blur-md shadow-xl shadow-cyan-950/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-400/40 text-cyan-300 shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-200 tracking-wider uppercase">
                    Unresolved Data Telemetry Feed
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${isHexStreaming ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`} />
                    {isHexStreaming ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>
                {hexLogs.length > 0 && (
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[280px] sm:max-w-[450px] md:max-w-[600px]">
                    <span className="text-slate-500">[{hexLogs[0].timestamp}]</span>
                    <span className="text-indigo-400 font-semibold">{hexLogs[0].address}</span>
                    <span className="text-cyan-300 font-bold">{hexLogs[0].hexBytes}</span>
                    <span className="text-slate-400">"{hexLogs[0].asciiDecoded}"</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
              <button
                onClick={() => setIsGlobalHexDrawerOpen(!isGlobalHexDrawerOpen)}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-200 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>{isGlobalHexDrawerOpen ? 'Collapse Terminal' : 'Expand Stream Terminal'}</span>
                {isGlobalHexDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => {
                  setActiveTab('abyss');
                  setTimeout(() => {
                    hexScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/70 border border-blue-600/40 text-blue-200 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Anchor className="w-3.5 h-3.5" />
                <span>Go to Abyssal Zone</span>
              </button>
            </div>
          </div>

          {/* Expandable Hex Stream Drawer */}
          <AnimatePresence>
            {isGlobalHexDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-cyan-900/40 overflow-hidden"
              >
                <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-slate-400">
                  <span>Showing real-time stream ({filteredHexLogs.length} buffered frames)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-cyan-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Continuous Current
                    </span>
                    <button
                      onClick={() => setHexAutoScroll(!hexAutoScroll)}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 text-[10px]"
                    >
                      Auto-Scroll: {hexAutoScroll ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>

                <div
                  ref={drawerHexScrollRef}
                  className="max-h-56 overflow-y-auto telemetry-scroll divide-y divide-cyan-950/60 font-mono text-xs pr-1"
                >
                  {filteredHexLogs.map(log => (
                    <div
                      key={`drawer-${log.id}`}
                      className="py-1.5 px-2 hover:bg-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{log.timestamp}</span>
                        <span className="text-indigo-400 font-semibold">{log.address}</span>
                        <span className="text-cyan-300 font-bold">{log.hexBytes}</span>
                        <span className="text-slate-300">"{log.asciiDecoded}"</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto sm:ml-0 text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-slate-900 text-cyan-400 border border-cyan-900/40">
                          {log.status}
                        </span>
                        <span className="text-slate-400">{log.depthMeters}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
