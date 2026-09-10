import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Layers, 
  Binary, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Compass, 
  Cpu, 
  Telescope, 
  Flame, 
  TreePine, 
  HeartHandshake, 
  SlidersHorizontal,
  Zap,
  Radio,
  Orbit,
  Lock,
  BookOpen
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';
import { GaiaModule, PhaseCategory, DomainCategory, ModuleStructureTier, KnowledgeLayer } from '../types';
import { ModuleDetailModal } from './ModuleDetailModal';

interface ModuleRegistryProps {
  onSelectForGateway: (moduleId: string) => void;
  selectedModuleIdForAudit: string | null;
  onClearAuditSelection: () => void;
}

export const ModuleRegistry: React.FC<ModuleRegistryProps> = ({ 
  onSelectForGateway,
  selectedModuleIdForAudit,
  onClearAuditSelection
}) => {
  const { modules, scanningModuleIndex } = useAutomatedUpdate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<ModuleStructureTier | 'ALL'>('ALL');
  const [selectedLayer, setSelectedLayer] = useState<KnowledgeLayer | 'ALL'>('ALL');
  const [selectedPhase, setSelectedPhase] = useState<PhaseCategory | 'ALL'>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<DomainCategory | 'ALL'>('ALL');
  const [activeModalModule, setActiveModalModule] = useState<GaiaModule | null>(null);

  // Auto-open modal if prop selectedModuleIdForAudit is passed
  React.useEffect(() => {
    if (selectedModuleIdForAudit) {
      const found = modules.find(m => m.id === selectedModuleIdForAudit);
      if (found) {
        setActiveModalModule(found);
      }
    }
  }, [selectedModuleIdForAudit, modules]);

  const allDomains: DomainCategory[] = [
    'Systems Engineering',
    'Ecology & Biosphere',
    'Data Science & Telemetry',
    'Clinical & Neurobiology',
    'Thermodynamics & Energy',
    'Astrophysics & Deep Cosmos',
    'Commons Governance',
    'Thermodynamic Justice & Conflict Resolution',
    'Absolute Biospheric Protection & Disarmament',
    'Transparency & Node Protection',
    'Sovereignty & Sanctuary (Anti-Exploitation)',
    'Biospheric Kinship & Inter-Species Sanctuary',
    'GO (Gaia Open) & Collaborative Telemetry',
    'Cosmological Scaling & Universal Anchoring',
    'Distributed Great Filter & Ingestion',
    'Decentralized Consensus & Baseline Testing'
  ];

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.thesis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.number.toString().includes(searchQuery) ||
        module.domains.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPhase = selectedPhase === 'ALL' || module.phase === selectedPhase;
      const matchesDomain = selectedDomain === 'ALL' || module.domains.includes(selectedDomain as DomainCategory);
      const matchesTier = selectedTier === 'ALL' || module.structureTier === selectedTier;
      const matchesLayer = selectedLayer === 'ALL' || module.knowledgeLayer === selectedLayer;

      return matchesSearch && matchesPhase && matchesDomain && matchesTier && matchesLayer;
    });
  }, [modules, searchQuery, selectedPhase, selectedDomain, selectedTier, selectedLayer]);

  const getLayerBadgeStyle = (layer?: KnowledgeLayer) => {
    switch (layer) {
      case 'ANCHORED':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40';
      case 'PLAUSIBLE':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/40';
      case 'IMAGINED':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/40';
      case 'OPEN_FIELD':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/40';
      default:
        return 'bg-white/[0.03] text-slate-400 border-white/10';
    }
  };

  return (
    <section id="registry" className="py-20 md:py-28 relative bg-[#05070a]/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#00ff95]/40 text-[#00ff95] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>THE OPEN MAP // LOCKED SPINE & MODULE REGISTRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              Locked Spine & Peer-Review Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-2 font-mono">
              Theoretical Design Map: 12-Module Locked Spine (permanent physical & architectural integrity) + 18 Supporting Modules + 2 Expansion Leaves. Every claim stamped with verifiable knowledge layers.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 p-3 rounded font-mono">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Locked Spine</div>
              <div className="text-lg font-bold text-[#00ff95]">12 Modules</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Supporting</div>
              <div className="text-lg font-bold text-[#4da6ff]">18 Modules</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Expansion</div>
              <div className="text-lg font-bold text-[#f59e0b]">2 Leaves</div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="p-4 rounded bg-white/[0.02] border border-white/10 shadow-xl mb-10 space-y-4">
          
          {/* Structure Tier Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 mr-1 flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#00ff95]" />
              Structure:
            </span>
            <button
              onClick={() => setSelectedTier('ALL')}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                selectedTier === 'ALL'
                  ? 'bg-white text-slate-950 font-bold shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              All Structure ({modules.length})
            </button>
            <button
              onClick={() => setSelectedTier('LOCKED_SPINE')}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                selectedTier === 'LOCKED_SPINE'
                  ? 'bg-[#00ff95] text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,149,0.35)]'
                  : 'bg-[#00ff95]/10 text-[#00ff95] hover:bg-[#00ff95]/20 border border-[#00ff95]/40'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Locked Spine (12)</span>
            </button>
            <button
              onClick={() => setSelectedTier('SUPPORTING')}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                selectedTier === 'SUPPORTING'
                  ? 'bg-[#4da6ff] text-slate-950 font-bold shadow-[0_0_12px_rgba(77,166,255,0.35)]'
                  : 'bg-[#4da6ff]/10 text-[#4da6ff] hover:bg-[#4da6ff]/20 border border-[#4da6ff]/40'
              }`}
            >
              Supporting (18)
            </button>
            <button
              onClick={() => setSelectedTier('EXPANSION_LEAF')}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1 ${
                selectedTier === 'EXPANSION_LEAF'
                  ? 'bg-[#f59e0b] text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                  : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/40'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Expansion Leaves (2)</span>
            </button>
          </div>

          {/* Knowledge Layer Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#4da6ff]" />
              Knowledge Layer:
            </span>
            <button
              onClick={() => setSelectedLayer('ALL')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                selectedLayer === 'ALL'
                  ? 'bg-[#4da6ff]/20 text-[#4da6ff] border border-[#4da6ff]/60 font-semibold'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setSelectedLayer('ANCHORED')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1 ${
                selectedLayer === 'ANCHORED'
                  ? 'bg-[#00ff95] text-slate-950 font-bold'
                  : 'bg-[#00ff95]/10 text-[#00ff95] hover:bg-[#00ff95]/20 border border-[#00ff95]/30'
              }`}
              title="Repeatable / measurable / public physical baseline"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95]" />
              <span>ANCHORED (Physical Baseline)</span>
            </button>
            <button
              onClick={() => setSelectedLayer('PLAUSIBLE')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1 ${
                selectedLayer === 'PLAUSIBLE'
                  ? 'bg-[#38bdf8] text-slate-950 font-bold'
                  : 'bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 border border-sky-500/30'
              }`}
              title="Specified enough to try or prototype"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>PLAUSIBLE (Prototypable)</span>
            </button>
            <button
              onClick={() => setSelectedLayer('IMAGINED')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1 ${
                selectedLayer === 'IMAGINED'
                  ? 'bg-[#a855f7] text-white font-bold'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
              }`}
              title="Story, design language, mnemonic equations"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>IMAGINED (Design Lang)</span>
            </button>
            <button
              onClick={() => setSelectedLayer('OPEN_FIELD')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1 ${
                selectedLayer === 'OPEN_FIELD'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
              title="Unexplained; allowed to exist; not ingested as fact"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>OPEN_FIELD (Unexplained)</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search module by title, thesis, domain (e.g. Electromagnetic, Clear Node, Roman, Lake Vostok)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded pl-10 pr-4 py-2.5 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Phase Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedPhase('ALL')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'ALL'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                All Phases ({modules.length})
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_I_III')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_I_III'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                Phase I-III (01-11)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_IV_V')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_IV_V'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                Phase IV-V (12-16)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_VI_VII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_VI_VII'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                Phase VI-VII: Resonance (17-18)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_VIII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_VIII'
                    ? 'bg-[#a855f7] text-[#05070a] font-bold'
                    : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Phase VIII: Quantum Bridge (19)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_IX')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_IX'
                    ? 'bg-[#ffb703] text-[#05070a] font-bold'
                    : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                Phase IX: P.O.W.E.R. (20)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_X')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_X'
                    ? 'bg-[#00f0ff] text-[#05070a] font-bold'
                    : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30'
                }`}
              >
                Phase X: Node Security (21)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XI')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XI'
                    ? 'bg-[#10b981] text-[#05070a] font-bold'
                    : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                }`}
              >
                Phase XI: Restorative Justice (22)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XII'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-[#00ff95]/10 text-[#00ff95] hover:bg-[#00ff95]/20 border border-[#00ff95]/30'
                }`}
              >
                Phase XII: Sovereign Boundaries (23)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XIII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XIII'
                    ? 'bg-[#10b981] text-[#05070a] font-bold'
                    : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                }`}
              >
                Phase XIII: Biospheric Kinship (24)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XIV')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XIV'
                    ? 'bg-[#8b5cf6] text-[#05070a] font-bold'
                    : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Phase XIV: GO & Multi-Scalar Reality (25-26)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XV')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XV'
                    ? 'bg-[#10b981] text-[#05070a] font-bold'
                    : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                }`}
              >
                Phase XV: Distributed Great Filter (27)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XVI')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XVI'
                    ? 'bg-[#f43f5e] text-[#05070a] font-bold'
                    : 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30'
                }`}
              >
                Phase XVI: The Dragonfly Protocol (28-30)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XVII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XVII'
                    ? 'bg-[#38bdf8] text-[#05070a] font-bold'
                    : 'bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 border border-sky-500/30'
                }`}
              >
                Claim Shelf: Yarn Stays Yarn (31)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XVIII')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XVIII'
                    ? 'bg-[#06b6d4] text-[#05070a] font-bold'
                    : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30'
                }`}
              >
                Phase XVIII: The Thermohaline Protocol (32-36)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XIX')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XIX'
                    ? 'bg-[#a855f7] text-[#05070a] font-bold'
                    : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Phase XIX: The Mirror Pit (37-39)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_XX')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 ${
                  selectedPhase === 'PHASE_XX'
                    ? 'bg-[#10b981] text-[#05070a] font-bold'
                    : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                }`}
              >
                Phase XX: Autonomic Alignment (40-42)
              </button>
              <button
                onClick={() => setSelectedPhase('PHASE_EXPANSION')}
                className={`px-3 py-2 rounded text-[11px] font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedPhase === 'PHASE_EXPANSION'
                    ? 'bg-[#00ff95] text-[#05070a] font-bold'
                    : 'bg-[#00ff95]/10 text-[#00ff95] hover:bg-[#00ff95]/20 border border-[#00ff95]/40'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Expansion: Mod 50 & 53</span>
              </button>
            </div>
          </div>

          {/* Domain Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#00ff95]" />
              Domain Filter:
            </span>
            <button
              onClick={() => setSelectedDomain('ALL')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                selectedDomain === 'ALL'
                  ? 'bg-[#4da6ff]/20 text-[#4da6ff] border border-[#4da6ff]/60 font-semibold'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Domains
            </button>
            {allDomains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  selectedDomain === dom
                    ? 'bg-[#4da6ff]/20 text-[#4da6ff] border border-[#4da6ff]/60 font-semibold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid - Immersive UI node cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((module, index) => {
            const isScanning = scanningModuleIndex !== null && modules[scanningModuleIndex]?.id === module.id;
            const isAdapted = module.syncStatus === 'ADAPTED';

            // Determine left border accent color based on category/phase
            const getBorderAccent = () => {
              if (isScanning) return 'border-l-2 border-l-[#00ff95] shadow-[0_0_15px_rgba(0,255,149,0.3)]';
              if (isAdapted) return 'border-l-2 border-l-[#00ff95]';
              if (module.number === 19) return 'border-l-2 border-l-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.25)]';
              if (module.number === 20) return 'border-l-2 border-l-[#ffb703] shadow-[0_0_12px_rgba(255,183,3,0.25)]';
              if (module.number === 21) return 'border-l-2 border-l-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]';
              if (module.number === 22) return 'border-l-2 border-l-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.25)]';
              if (module.number === 23) return 'border-l-2 border-l-[#14b8a6] shadow-[0_0_12px_rgba(20,184,166,0.25)]';
              if (module.number === 24) return 'border-l-2 border-l-[#f43f5e] shadow-[0_0_15px_rgba(244,63,94,0.3)]';
              if (module.number === 25) return 'border-l-2 border-l-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]';
              if (module.number === 26) return 'border-l-2 border-l-[#6366f1] shadow-[0_0_15px_rgba(99,102,241,0.3)]';
              if (module.number === 27) return 'border-l-2 border-l-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.25)]';
              if (module.number === 28) return 'border-l-2 border-l-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.25)]';
              if (module.number === 29) return 'border-l-2 border-l-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.25)]';
              if (module.number === 30) return 'border-l-2 border-l-[#00ff95] shadow-[0_0_12px_rgba(0,255,149,0.25)]';
              if (module.number === 31) return 'border-l-2 border-l-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.25)]';
              if ([50, 53].includes(module.number)) return 'border-l-2 border-l-[#00ff95] shadow-[0_0_12px_rgba(0,255,149,0.15)]';
              if ([2, 3, 16, 17, 18].includes(module.number)) return 'border-l-2 border-l-[#00ff95]';
              if ([6, 7, 8, 11].includes(module.number)) return 'border-l-2 border-l-[#4da6ff]';
              if ([12, 14, 15].includes(module.number)) return 'border-l-2 border-l-[#ff4e00]';
              return 'border-l-2 border-l-white/20';
            };

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                onClick={() => setActiveModalModule(module)}
                className={`group cursor-pointer rounded bg-white/[0.03] border ${isScanning ? 'border-[#00ff95] bg-[#00ff95]/5' : 'border-white/10'} ${getBorderAccent()} hover:border-[#00ff95]/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:bg-white/[0.06] relative overflow-hidden`}
              >
                {isScanning && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00ff95] animate-pulse" />
                )}

                <div>
                  {/* Module Number & Phase */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-white/40 tracking-wider">
                        MOD {module.number.toString().padStart(2, '0')}
                      </span>
                      {module.structureTier === 'LOCKED_SPINE' && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#00ff95]/15 text-[#00ff95] border border-[#00ff95]/40 font-semibold flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>LOCKED SPINE</span>
                        </span>
                      )}
                      {module.structureTier === 'EXPANSION_LEAF' && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" />
                          <span>EXPANSION</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      {module.depthPressureAtm && (
                        <span 
                          className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-semibold"
                          title={`Directive 44: Acclimatization Depth Pressure ${module.depthPressureAtm} atm`}
                        >
                          {module.depthPressureAtm} atm
                        </span>
                      )}
                      {module.knowledgeLayer && (
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider font-semibold ${getLayerBadgeStyle(module.knowledgeLayer)}`}>
                          {module.knowledgeLayer}
                        </span>
                      )}
                      {isScanning ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00ff95] text-slate-950 font-bold uppercase">
                          SCANNING
                        </span>
                      ) : isAdapted ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/30 uppercase">
                          ADAPTED ({module.adaptationCount || 1})
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono uppercase tracking-widest text-slate-400">
                          {module.phaseLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Module Title */}
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#00ff95] transition-colors mb-2 leading-snug">
                    {module.title}
                  </h3>

                  {/* Thesis Statement */}
                  <p className="text-[11px] text-slate-300 opacity-80 leading-relaxed mb-3 line-clamp-3">
                    {module.thesis}
                  </p>

                  {/* Domain Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {module.domains.map((d, i) => (
                      <span 
                        key={i} 
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Telemetry Baseline Card */}
                <div className="pt-2.5 border-t border-white/5 mt-2 flex items-center justify-between text-[10px] font-mono">
                  <div>
                    <span className="text-slate-500 text-[9px] block uppercase">{module.telemetryMetricName}</span>
                    <span className="text-[#00ff95] font-semibold">
                      {module.liveTelemetryValue !== undefined ? module.liveTelemetryValue : module.telemetryBaseline} {module.telemetryUnit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-[#00ff95] font-mono text-[10px] uppercase">
                    <span>Audit Logic</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] rounded border border-white/10 p-8">
            <p className="text-slate-400 text-xs font-mono mb-3 uppercase tracking-wider">No master modules match the selected filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPhase('ALL');
                setSelectedDomain('ALL');
              }}
              className="px-4 py-2 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/40 text-xs font-mono uppercase tracking-widest hover:bg-[#00ff95]/20"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {activeModalModule && (
        <ModuleDetailModal
          module={activeModalModule}
          onClose={() => {
            setActiveModalModule(null);
            onClearAuditSelection();
          }}
          onSelectForGateway={(modId) => {
            onSelectForGateway(modId);
            setActiveModalModule(null);
            onClearAuditSelection();
          }}
        />
      )}
    </section>
  );
};

