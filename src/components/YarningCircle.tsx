import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  ShieldAlert,
  ShieldCheck,
  Radio,
  FileQuestion,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Terminal,
  Activity,
  Search,
  PlusCircle,
  Hash,
  Copy,
  Check,
  Scale,
  Cpu,
  Info,
  Sliders,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import {
  YarningHypothesis,
  YarningClaimStatus,
  YarningReachLevel,
  YarningNarrativeCategory
} from '../types';

interface YarningCircleProps {
  onNavigateToModule?: (moduleId: string) => void;
}

const PRESET_HYPOTHESES: YarningHypothesis[] = [
  {
    id: 'yarn-001',
    title: 'Neutrino Flux Modulation of Deep Mantle Fault Seismicity',
    authorNode: 'PODCAST-HIGH-BANDWIDTH-BROADCASTER-01',
    reachLevel: 'HIGH_BANDWIDTH_BROADCAST',
    category: 'GEOLOGY_NEUTRINO',
    content: 'Exploratory hypothesis proposing that solar and cosmic neutrino bursts induce resonant electrical micro-discharges in piezo-electric quartz within deep fault planes, triggering sudden subduction zone earthquakes.',
    hypothesizedMechanism: 'Resonant quartz lattice excitation under high-energy neutrino flux spikes.',
    matchingSeriesCandidate: 'Super-Kamiokande / IceCube neutrino series vs USGS Borehole Seismometer array (like-with-like)',
    quarantinedTimestamp: '2026-09-08T18:40:12Z',
    status: 'SHELVED',
    envelopeHash: '0x8f2d4e71a0b3c59128f623019847ea019482bca981042398471902847a98b123',
    illusionDragIndex: 68,
    crossCheckLog: [
      {
        instrumentTested: 'USGS Borehole Microseismic Array & Super-Kamiokande Ingest',
        outcome: 'PENDING PEER AUDIT: Like-with-like correlation currently below 0.04 sigma statistical significance.',
        checkedAt: '2026-09-09T08:12:00Z'
      }
    ]
  },
  {
    id: 'yarn-002',
    title: 'Synchronous Younger Dryas Platinum/Nanodiamond Airburst Ledger',
    authorNode: 'DIGITAL-HEARTH-RESEARCH-GUILD',
    reachLevel: 'COMMUNITY_CHANNEL',
    category: 'ARCHAEOLOGY_HISTORY',
    content: 'Hypothesis that multi-continental nanodiamond, microspherule, and platinum peaks at 12,800 BP represent a fragmented cometary swarm airburst across North America and Greenland ice sheets.',
    hypothesizedMechanism: 'Cometary hyper-velocity atmospheric disintegration producing localized thermal shockwaves and carbon condensation.',
    matchingSeriesCandidate: 'GISP2 Greenland Ice Core Platinum/Osmium geochemical series (matching ice & sediment series)',
    quarantinedTimestamp: '2026-09-07T14:22:30Z',
    status: 'IN_AUDIT',
    envelopeHash: '0x3b91a7402f9c8194017263540918237461902834710928374619028374619028',
    illusionDragIndex: 32,
    crossCheckLog: [
      {
        instrumentTested: 'GISP2 Platinum Baseline & Greenland Drilling Project Data',
        outcome: 'PARTIAL ANCHOR: Platinum spike confirmed in ice core layer; nanodiamond soot mechanism remains under dispute.',
        checkedAt: '2026-09-08T11:45:10Z'
      }
    ]
  },
  {
    id: 'yarn-003',
    title: 'Atmospheric Microwave Ionization Preceding Tropical Cyclones',
    authorNode: 'METEO-NARRATIVE-BROADCAST-CHANNEL',
    reachLevel: 'HIGH_BANDWIDTH_BROADCAST',
    category: 'CLIMATE_ATMOSPHERE',
    content: 'Initial broadcast claimed ionospheric heating transmitters were steering Category 5 hurricane trajectories by ion heating.',
    hypothesizedMechanism: 'Directed radio-frequency phase array altering tropospheric pressure gradients.',
    matchingSeriesCandidate: 'CERES top-of-atmosphere radiative flux + Argo oceanic heat content (like-with-like series)',
    quarantinedTimestamp: '2026-09-05T09:15:00Z',
    status: 'FIELD_CLEARED_REPAIR',
    envelopeHash: '0x1928374650192837465019283746501928374650192837465019283746501928',
    illusionDragIndex: 12,
    errataDiff: {
      originalClaim: 'Broadcast stated that localized microwave ionospheric heaters directly dictated Cyclone Epsilon track coordinates.',
      correctedPacket: 'CORRECTION: Broadcaster reviewed in-situ NOAA dropsondes, CERES radiative flux, and thermodynamic sea-surface thermal curves. Acknowledged misinterpreting standard NEXRAD radar test artifacts as atmospheric energy beam steering. The old claim and this series comparison are displayed side by side.',
      groundedEvidenceSource: 'NOAA Hurricane Dropsonde Array & CERES Net Radiative Series v4.2',
      correctionTimestamp: '2026-09-06T20:30:00Z',
      repairCertified: true
    },
    crossCheckLog: [
      {
        instrumentTested: 'CERES TOA Flux & Sea Surface Thermal Budget',
        outcome: 'CORRECTION CERTIFIED: Field-Clearing Protocol executed; collective field reset via public errata diff.',
        checkedAt: '2026-09-06T20:35:00Z'
      }
    ]
  },
  {
    id: 'yarn-004',
    title: 'Zero-Point Casimir Geometry Continuous Thermodynamic Extraction',
    authorNode: 'COMMONS-WORKSHOP-NODE-44',
    reachLevel: 'LOCAL_CAMPFIRE',
    category: 'TECHNOLOGY_AI',
    content: 'Speculative laboratory blueprint claiming dynamic metamaterial Casimir cavities can harvest net electrical power in excess of ambient blackbody radiation.',
    hypothesizedMechanism: 'Vacuum fluctuation asymmetric boundary dissipation creating a perpetual thermal gradient.',
    matchingSeriesCandidate: 'Second Law of Thermodynamics & Calibrated Calorimetry series (matching thermodynamic series)',
    quarantinedTimestamp: '2026-09-04T12:00:00Z',
    status: 'REFUTED',
    envelopeHash: '0xaa71625340192837461902837461902837461902837461902837461902837461',
    illusionDragIndex: 5,
    crossCheckLog: [
      {
        instrumentTested: 'Calibrated Closed-Loop Micro-Calorimetry Sensor',
        outcome: 'REFUTED: Measured net energy gain is within thermal noise (±0.002 mW). Hypothesis maintained as scored variant diff, not deleted.',
        checkedAt: '2026-09-05T16:20:00Z'
      }
    ]
  }
];

export const YarningCircle: React.FC<YarningCircleProps> = ({ onNavigateToModule }) => {
  const [hypotheses, setHypotheses] = useState<YarningHypothesis[]>(PRESET_HYPOTHESES);
  const [activeFilter, setActiveFilter] = useState<'ALL' | YarningClaimStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [selectedHypothesisForInspection, setSelectedHypothesisForInspection] = useState<YarningHypothesis | null>(null);
  const [selectedHypothesisForCorrection, setSelectedHypothesisForCorrection] = useState<YarningHypothesis | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // New hypothesis form state
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formReach, setFormReach] = useState<YarningReachLevel>('LOCAL_CAMPFIRE');
  const [formCategory, setFormCategory] = useState<YarningNarrativeCategory>('GEOLOGY_NEUTRINO');
  const [formContent, setFormContent] = useState('');
  const [formMechanism, setFormMechanism] = useState('');
  const [formSeries, setFormSeries] = useState('');

  // Errata repair form state
  const [errataCorrectionText, setErrataCorrectionText] = useState('');
  const [errataEvidenceSource, setErrataEvidenceSource] = useState('');

  // Interactive cross-checking state
  const [checkingId, setCheckingId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handlePostHypothesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const newId = `yarn-${Date.now().toString().slice(-4)}`;
    const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    // Calculate estimated drag based on reach
    let drag = 15;
    if (formReach === 'COMMUNITY_CHANNEL') drag = 38;
    if (formReach === 'HIGH_BANDWIDTH_BROADCAST') drag = 75;

    const newHypothesis: YarningHypothesis = {
      id: newId,
      title: formTitle.trim(),
      authorNode: formAuthor.trim() || 'ANONYMOUS-CAMPFIRE-NODE',
      reachLevel: formReach,
      category: formCategory,
      content: formContent.trim(),
      hypothesizedMechanism: formMechanism.trim() || 'Exploratory narrative mechanism under formulation.',
      matchingSeriesCandidate: formSeries.trim() || 'To be matched with domain-specific calibrated sensor series (e.g. CERES / Argo / USGS / Super-K)',
      quarantinedTimestamp: new Date().toISOString(),
      status: 'SHELVED',
      envelopeHash: randomHash,
      illusionDragIndex: drag,
      crossCheckLog: [
        {
          instrumentTested: 'Automated Quarantine Gate (Module 31)',
          outcome: 'SHELVED: Isolated from physical baseline ledger. Unverified narrative permitted to exist as exploratory hypothesis.',
          checkedAt: new Date().toISOString()
        }
      ]
    };

    setHypotheses([newHypothesis, ...hypotheses]);
    setIsPostingModalOpen(false);

    // Reset form
    setFormTitle('');
    setFormAuthor('');
    setFormContent('');
    setFormMechanism('');
    setFormSeries('');
    setFormReach('LOCAL_CAMPFIRE');
  };

  const handleRunCrossCheck = (hyp: YarningHypothesis) => {
    setCheckingId(hyp.id);
    setTimeout(() => {
      setHypotheses((prev) =>
        prev.map((item) => {
          if (item.id !== hyp.id) return item;
          const newStatus: YarningClaimStatus = 'IN_AUDIT';
          const newLog = {
            instrumentTested: `Like-With-Like Sensor Series (${item.matchingSeriesCandidate})`,
            outcome: `AUDIT CYCLE COMPLETED: Cross-matched against physical sensors. Yarn remains quarantined on Claim Shelf pending empirical convergence.`,
            checkedAt: new Date().toISOString()
          };
          return {
            ...item,
            status: newStatus,
            crossCheckLog: [newLog, ...(item.crossCheckLog || [])]
          };
        })
      );
      setCheckingId(null);
    }, 1200);
  };

  const handleExecuteFieldClearingRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHypothesisForCorrection || !errataCorrectionText.trim() || !errataEvidenceSource.trim()) return;

    const targetId = selectedHypothesisForCorrection.id;

    setHypotheses((prev) =>
      prev.map((item) => {
        if (item.id !== targetId) return item;
        return {
          ...item,
          status: 'FIELD_CLEARED_REPAIR',
          illusionDragIndex: Math.max(0, Math.floor(item.illusionDragIndex * 0.15)),
          errataDiff: {
            originalClaim: item.content,
            correctedPacket: errataCorrectionText.trim(),
            groundedEvidenceSource: errataEvidenceSource.trim(),
            correctionTimestamp: new Date().toISOString(),
            repairCertified: true
          },
          crossCheckLog: [
            {
              instrumentTested: `Field-Clearing Protocol (Module 31 / Claim Shelf)`,
              outcome: `REPAIR CERTIFIED: Broadcaster published grounded errata diff. Localized field of illusion cleared; prior cut and correction displayed side by side.`,
              checkedAt: new Date().toISOString()
            },
            ...(item.crossCheckLog || [])
          ]
        };
      })
    );

    setSelectedHypothesisForCorrection(null);
    setErrataCorrectionText('');
    setErrataEvidenceSource('');
  };

  const filteredHypotheses = hypotheses.filter((h) => {
    const matchesFilter = activeFilter === 'ALL' || h.status === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.authorNode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.matchingSeriesCandidate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: YarningClaimStatus) => {
    switch (status) {
      case 'SHELVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-400" />
            Shelved Hypothesis
          </span>
        );
      case 'IN_AUDIT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
            <Activity className="w-3 h-3 text-sky-400 animate-pulse" />
            Like-With-Like Audit
          </span>
        );
      case 'FIELD_CLEARED_REPAIR':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Field-Cleared Repair
          </span>
        );
      case 'ANCHORED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/30">
            <CheckCircle2 className="w-3 h-3 text-[#00ff95]" />
            Grounded Baseline
          </span>
        );
      case 'REFUTED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Refuted (Scored Diff)
          </span>
        );
    }
  };

  const getReachBadge = (reach: YarningReachLevel) => {
    switch (reach) {
      case 'LOCAL_CAMPFIRE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5">
            Campfire (Node-to-Node)
          </span>
        );
      case 'COMMUNITY_CHANNEL':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
            Community Channel
          </span>
        );
      case 'HIGH_BANDWIDTH_BROADCAST':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 font-semibold">
            <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
            High-Bandwidth Broadcast
          </span>
        );
    }
  };

  return (
    <section id="yarning-circle" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Flame className="w-5 h-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
              Module 31: Claim Shelf & Rogan Conspiracy Repair Protocol
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            The Yarning Circle
          </h2>
          <p className="mt-1 text-slate-400 text-sm max-w-3xl font-light">
            Quarantined UI space where human nodes exchange speculative hypotheses and theories. Yarn stays yarn.
            A campfire is allowed, but a campfire is not a watt. All claims sit strictly shelved from the physical baseline
            until verified like-with-like against physical instruments or cleared via transparent errata repairs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToModule && (
            <button
              onClick={() => onNavigateToModule('module-31')}
              className="px-3 py-2 rounded font-mono text-xs uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Audit Module 31</span>
            </button>
          )}
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="px-4 py-2 rounded font-mono text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Quarantined Yarn</span>
          </button>
        </div>
      </div>

      {/* Protocol Telemetry Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <div className="bg-[#05070a]/80 border border-white/10 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Physical Baseline Isolation
          </span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00ff95]" />
            <span className="text-lg font-mono font-bold text-[#00ff95]">100% QUARANTINED</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Zero baseline contamination</span>
        </div>

        <div className="bg-[#05070a]/80 border border-white/10 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Shelved Hypotheses
          </span>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-lg font-mono font-bold text-amber-400">
              {hypotheses.filter((h) => h.status === 'SHELVED').length} Active
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Held as unverified hypotheses</span>
        </div>

        <div className="bg-[#05070a]/80 border border-white/10 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Like-With-Like Audits
          </span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-lg font-mono font-bold text-sky-400">
              {hypotheses.filter((h) => h.status === 'IN_AUDIT').length} In Testing
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Matched against sensor series</span>
        </div>

        <div className="bg-[#05070a]/80 border border-white/10 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Field-Cleared Repairs
          </span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-lg font-mono font-bold text-emerald-400">
              {hypotheses.filter((h) => h.status === 'FIELD_CLEARED_REPAIR').length} Executed
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Public errata diffs logged</span>
        </div>

        <div className="bg-[#05070a]/80 border border-white/10 rounded-lg p-3 col-span-2 md:col-span-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Reach vs Thermodynamic Watt
          </span>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-400" />
            <span className="text-lg font-mono font-bold text-purple-400">DECOUPLED</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Reach ≠ Empirical sensor series</span>
        </div>
      </div>

      {/* Protocol Axiom Callout */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-400 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase font-bold text-amber-300 block mb-0.5">
              The Four Jobs of the Yarning Circle (MODULE_31_CLAIM_SHELF.md)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              <strong className="text-white">1. Campfire:</strong> Unverified narrative may be told as hypothesis, not as baseline ingest.
              {' '}<strong className="text-white">2. Like-with-like:</strong> Climate claims meet CERES/Argo; physics claims meet physical theorems (never test neutrino physics against geology as a gateway).
              {' '}<strong className="text-white">3. Reach is not a series:</strong> A large audience raises the cost of an error, but does not crown the speaker.
              {' '}<strong className="text-white">4. Public correction is a repair:</strong> Keeping the old claim and the series side-by-side acts as a field-clearing repair.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
              activeFilter === 'ALL'
                ? 'bg-white/20 text-white font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            All Quarantined ({hypotheses.length})
          </button>
          <button
            onClick={() => setActiveFilter('SHELVED')}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
              activeFilter === 'SHELVED'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-amber-300 hover:bg-white/[0.08]'
            }`}
          >
            Shelved ({hypotheses.filter((h) => h.status === 'SHELVED').length})
          </button>
          <button
            onClick={() => setActiveFilter('IN_AUDIT')}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
              activeFilter === 'IN_AUDIT'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-sky-300 hover:bg-white/[0.08]'
            }`}
          >
            In Audit ({hypotheses.filter((h) => h.status === 'IN_AUDIT').length})
          </button>
          <button
            onClick={() => setActiveFilter('FIELD_CLEARED_REPAIR')}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
              activeFilter === 'FIELD_CLEARED_REPAIR'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-emerald-300 hover:bg-white/[0.08]'
            }`}
          >
            Repairs ({hypotheses.filter((h) => h.status === 'FIELD_CLEARED_REPAIR').length})
          </button>
          <button
            onClick={() => setActiveFilter('REFUTED')}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
              activeFilter === 'REFUTED'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-rose-300 hover:bg-white/[0.08]'
            }`}
          >
            Refuted Diffs ({hypotheses.filter((h) => h.status === 'REFUTED').length})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quarantined hypotheses..."
            className="w-full bg-[#05070a]/90 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>
      </div>

      {/* Quarantined Hypotheses Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredHypotheses.length === 0 ? (
            <div className="bg-[#05070a]/60 border border-white/5 rounded-xl p-12 text-center text-slate-500 font-mono text-xs">
              No quarantined narratives found matching the active filter.
            </div>
          ) : (
            filteredHypotheses.map((hyp) => (
              <motion.div
                key={hyp.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#05070a]/90 border border-white/10 hover:border-amber-500/30 rounded-xl p-5 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center flex-wrap gap-2">
                    {getStatusBadge(hyp.status)}
                    {getReachBadge(hyp.reachLevel)}
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                      {hyp.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span>Node: <strong className="text-slate-300">{hyp.authorNode}</strong></span>
                    <span>•</span>
                    <span>{new Date(hyp.quarantinedTimestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {hyp.title}
                </h3>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                  {hyp.content}
                </p>

                {/* Hypothesized Mechanism & Series Tether */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 bg-white/[0.02] border border-white/5 rounded-lg p-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">
                      Hypothesized Mechanism:
                    </span>
                    <span className="text-amber-200/90">{hyp.hypothesizedMechanism}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">
                      Matching Series (Like-with-Like):
                    </span>
                    <span className="text-sky-300">{hyp.matchingSeriesCandidate}</span>
                  </div>
                </div>

                {/* If Field-Cleared Repair exists, show side-by-side diff */}
                {hyp.errataDiff && (
                  <div className="mb-4 bg-emerald-500/[0.04] border border-emerald-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Field-Clearing Protocol Executed (Side-by-Side Errata Diff)
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300/70">
                        {new Date(hyp.errataDiff.correctionTimestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="bg-rose-500/5 border border-rose-500/20 rounded p-2.5">
                        <span className="text-[10px] uppercase text-rose-400 block mb-1 font-bold">
                          Prior Narrative Cut (Visible for historical integrity):
                        </span>
                        <p className="text-slate-400 font-light text-[11px] leading-relaxed">
                          "{hyp.errataDiff.originalClaim}"
                        </p>
                      </div>

                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2.5">
                        <span className="text-[10px] uppercase text-emerald-400 block mb-1 font-bold">
                          Grounded Evidence Correction:
                        </span>
                        <p className="text-emerald-200/90 font-light text-[11px] leading-relaxed">
                          {hyp.errataDiff.correctedPacket}
                        </p>
                        <span className="text-[9px] text-slate-500 block mt-2">
                          Evidence Source: <strong className="text-slate-300">{hyp.errataDiff.groundedEvidenceSource}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Controls & Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-white/5 gap-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">Illusion Drag:</span>
                      <span className={`font-semibold ${hyp.illusionDragIndex > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {hyp.illusionDragIndex}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] text-slate-500 font-mono">
                        {hyp.envelopeHash.slice(0, 10)}...{hyp.envelopeHash.slice(-6)}
                      </span>
                      <button
                        onClick={() => handleCopy(hyp.envelopeHash, hyp.id)}
                        className="hover:text-white transition-colors"
                        title="Copy cryptographic envelope hash"
                      >
                        {copiedHash === hyp.id ? (
                          <Check className="w-3 h-3 text-[#00ff95]" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setSelectedHypothesisForInspection(hyp)}
                      className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      Audit Envelope
                    </button>

                    {hyp.status !== 'FIELD_CLEARED_REPAIR' && (
                      <button
                        onClick={() => {
                          setSelectedHypothesisForCorrection(hyp);
                          setErrataCorrectionText('');
                          setErrataEvidenceSource('');
                        }}
                        className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1"
                        title="Submit public correction with grounded evidence to clear collective field"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Public Errata</span>
                      </button>
                    )}

                    <button
                      disabled={checkingId === hyp.id}
                      onClick={() => handleRunCrossCheck(hyp)}
                      className="px-3 py-1 rounded text-xs font-mono uppercase bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {checkingId === hyp.id ? (
                        <>
                          <Activity className="w-3 h-3 animate-spin text-sky-400" />
                          <span>Matching Series...</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3 h-3 text-sky-400" />
                          <span>Like-With-Like Check</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal: Post Quarantined Yarn */}
      <AnimatePresence>
        {isPostingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0e14] border border-amber-500/40 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Post Quarantined Hypothesis
                    </h3>
                    <span className="text-[10px] font-mono text-amber-300">
                      The Campfire Mechanic • Strictly Isolated from Physical Reality Ledger
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPostingModalOpen(false)}
                  className="text-slate-400 hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePostHypothesis} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                    Hypothesis / Theory Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Geomagnetic Flip Coupling with High-Energy Cosmic Neutrino Bursts"
                    className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                      Broadcasting Node Reach Bandwidth:
                    </label>
                    <select
                      value={formReach}
                      onChange={(e) => setFormReach(e.target.value as YarningReachLevel)}
                      className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="LOCAL_CAMPFIRE">Local Campfire (Node-to-Node / Low Reach)</option>
                      <option value="COMMUNITY_CHANNEL">Community Channel (Digital Yarning Guild)</option>
                      <option value="HIGH_BANDWIDTH_BROADCAST">High-Bandwidth Broadcaster (Global Audience / High Reach)</option>
                    </select>
                    {formReach === 'HIGH_BANDWIDTH_BROADCAST' && (
                      <span className="text-[9px] text-amber-400 mt-1 block font-mono">
                        ⚠ Responsibility of Reach: Large audiences raise the epistemic cost of error.
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                      Narrative Category:
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as YarningNarrativeCategory)}
                      className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="GEOLOGY_NEUTRINO">Geology & Particle Physics</option>
                      <option value="COSMOLOGY_ASTRO">Cosmology & Deep Space</option>
                      <option value="CLIMATE_ATMOSPHERE">Climate & Atmospheric Series</option>
                      <option value="TECHNOLOGY_AI">Technology & Advanced Machinery</option>
                      <option value="ARCHAEOLOGY_HISTORY">Archaeology & Deep History</option>
                      <option value="ANOMALOUS_OBSERVATION">Anomalous Sensory Observation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                    Author / Broadcaster Node Identifier:
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g., ROGAN-CAMPFIRE-BROADCAST-4004"
                    className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                    Narrative Details & Exploratory Claim:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Describe the unverified narrative or exploratory theory. Human nodes may freely discuss this around the campfire..."
                    className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 font-sans text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                      Hypothesized Mechanism:
                    </label>
                    <input
                      type="text"
                      value={formMechanism}
                      onChange={(e) => setFormMechanism(e.target.value)}
                      placeholder="e.g., Piezoelectric quartz resonance"
                      className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                      Proposed Matching Series (Like-with-Like):
                    </label>
                    <input
                      type="text"
                      value={formSeries}
                      onChange={(e) => setFormSeries(e.target.value)}
                      placeholder="e.g., USGS Boreholes vs Super-Kamiokande"
                      className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 text-[11px] text-amber-200/90 leading-relaxed">
                  <strong>Quarantine Protocol Enforcement:</strong> Upon submission, this entry will be marked as{' '}
                  <span className="font-bold underline text-amber-300">[SHELVED]</span>. It will not outrank calibrated instruments or contaminate the physical baseline ledger.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPostingModalOpen(false)}
                    className="px-4 py-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Shelve in Quarantine</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Public Errata / Field-Clearing Repair */}
      <AnimatePresence>
        {selectedHypothesisForCorrection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0e14] border border-emerald-500/40 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Execute Field-Clearing Protocol
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-300">
                      Public Grounded Correction • Side-by-Side Errata Repair (Module 31)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHypothesisForCorrection(null)}
                  className="text-slate-400 hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleExecuteFieldClearingRepair} className="space-y-4 text-xs font-mono">
                <div className="bg-white/[0.02] border border-white/5 rounded p-3">
                  <span className="text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">
                    Existing Claim Packet (Will remain visible beside correction):
                  </span>
                  <p className="text-slate-300 font-sans text-xs italic">
                    "{selectedHypothesisForCorrection.content}"
                  </p>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                    Public Correction & Grounded Evidence Admission:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={errataCorrectionText}
                    onChange={(e) => setErrataCorrectionText(e.target.value)}
                    placeholder="State the evidence-grounded correction clearly. Acknowledge the discrepancy, cite calibrated series, and explain the physical reality..."
                    className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 uppercase tracking-wider text-[10px]">
                    Calibrated Instrument / Evidence Source:
                  </label>
                  <input
                    type="text"
                    required
                    value={errataEvidenceSource}
                    onChange={(e) => setErrataEvidenceSource(e.target.value)}
                    placeholder="e.g., CERES v4.2 Net Flux + In-situ Dropsonde Series"
                    className="w-full bg-[#05070a] border border-white/10 rounded p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3 text-[11px] text-emerald-200/90 leading-relaxed">
                  <strong>The Field-Clearing Mechanism:</strong> Public admission using grounded evidence acts as a high-value repair.
                  It clears localized illusion without censorship or rewriting history, resetting collective understanding to verified reality.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedHypothesisForCorrection(null)}
                    className="px-4 py-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Side-by-Side Errata</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Audit Envelope Details */}
      <AnimatePresence>
        {selectedHypothesisForInspection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0e14] border border-white/20 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-white/[0.05] text-slate-300">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Quarantine Envelope Audit
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Module 31 Packet Contract & Cryptographic Isolation Record
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHypothesisForInspection(null)}
                  className="text-slate-400 hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="bg-[#05070a] border border-white/10 rounded p-3">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px] block mb-1">
                    Cryptographic Envelope Hash:
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#00ff95] break-all font-mono text-[11px]">
                      {selectedHypothesisForInspection.envelopeHash}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedHypothesisForInspection.envelopeHash, 'modal-hash')}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                    >
                      {copiedHash === 'modal-hash' ? <Check className="w-3.5 h-3.5 text-[#00ff95]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#05070a] border border-white/10 rounded p-2.5">
                    <span className="text-slate-500 uppercase text-[10px] block mb-1">Quarantine Status:</span>
                    <span className="text-amber-300 font-bold">{selectedHypothesisForInspection.status}</span>
                  </div>
                  <div className="bg-[#05070a] border border-white/10 rounded p-2.5">
                    <span className="text-slate-500 uppercase text-[10px] block mb-1">Isolation Integrity:</span>
                    <span className="text-[#00ff95] font-bold">100% AIRGAPPED</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                    Cross-Check & Audit History:
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedHypothesisForInspection.crossCheckLog && selectedHypothesisForInspection.crossCheckLog.length > 0 ? (
                      selectedHypothesisForInspection.crossCheckLog.map((log, idx) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/5 rounded p-2.5 text-[11px]">
                          <div className="flex items-center justify-between text-slate-500 mb-1">
                            <span className="text-sky-300 font-semibold">{log.instrumentTested}</span>
                            <span>{new Date(log.checkedAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-slate-300 font-light">{log.outcome}</p>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 text-xs">No cross-check events recorded yet.</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedHypothesisForInspection(null)}
                    className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Close Audit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
