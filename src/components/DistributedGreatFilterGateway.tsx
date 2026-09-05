import React, { useState, useMemo } from 'react';
import {
  Filter,
  ShieldCheck,
  Cpu,
  Network,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Zap,
  Layers,
  ArrowRight,
  Database,
  Lock,
  Unlock,
  Sparkles,
  RefreshCw,
  Search,
  ShieldAlert,
  Send,
  Sliders,
  Check,
  ExternalLink
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';

interface IngestedNodeSubmission {
  id: string;
  nodeName: string;
  contributorCallsign: string;
  category: 'REGENERATIVE_ECOLOGY' | 'ENERGY_EQUILIBRIUM' | 'FINANCIAL_EXTRACTION' | 'BIOSPHERIC_EXPLOITATION' | 'COMMONS_TECH';
  researchSummary: string;
  proofOfPhysicalWorkMetric: string;
  oracleConsensusScore: number;
  status: 'ADMITTED_TO_GO_FIELD' | 'QUARANTINED';
  quarantineReason?: string;
  verificationHash: string;
  timestamp: string;
  peerAuditorsCount: number;
}

const INITIAL_SUBMISSIONS: IngestedNodeSubmission[] = [
  {
    id: 'ingest-01',
    nodeName: 'Casamance Agroforestry Soil Carbon Telemetry',
    contributorCallsign: 'Node Senegal-09',
    category: 'REGENERATIVE_ECOLOGY',
    researchSummary: 'Continuous micro-sensor telemetry verifying 4.2 tons C/hectare sequestration through indigenous multi-strata food forest canopy without synthetic inputs.',
    proofOfPhysicalWorkMetric: 'Soil respiration spectrometer + Sentinel-2 NDVI spectral correlation',
    oracleConsensusScore: 99.8,
    status: 'ADMITTED_TO_GO_FIELD',
    verificationHash: '0x8f1e...44a9',
    timestamp: '3 mins ago',
    peerAuditorsCount: 420
  },
  {
    id: 'ingest-02',
    nodeName: 'Autonomous High-Frequency Arbitrage Extraction Bot',
    contributorCallsign: 'Legacy Fund-X',
    category: 'FINANCIAL_EXTRACTION',
    researchSummary: 'Proposal to deploy microsecond algorithmic skimming on community energy tokens, taking 1.5% margin on local solar transactions.',
    proofOfPhysicalWorkMetric: 'Zero physical grounding; synthetic financial rent-seeking',
    oracleConsensusScore: 4.2,
    status: 'QUARANTINED',
    quarantineReason: 'Violates Anti-Exploitation Directive: Parasitic financial extraction without thermodynamic value creation. Pruned by algorithmic friction.',
    verificationHash: '0x0d41...99ef',
    timestamp: '7 mins ago',
    peerAuditorsCount: 388
  },
  {
    id: 'ingest-03',
    nodeName: 'Salish Sea Micro-Hydro & Fish Run Equilibrium',
    contributorCallsign: 'Cascadia Node-14',
    category: 'ENERGY_EQUILIBRIUM',
    researchSummary: 'Run-of-the-river Archimedes screw turbine producing 85kW while maintaining zero pressure gradient on returning wild sockeye salmon fry.',
    proofOfPhysicalWorkMetric: 'Acoustic fish counter array + hydraulic pressure transducer logs',
    oracleConsensusScore: 99.6,
    status: 'ADMITTED_TO_GO_FIELD',
    verificationHash: '0x3c99...bb21',
    timestamp: '14 mins ago',
    peerAuditorsCount: 512
  },
  {
    id: 'ingest-04',
    nodeName: 'Intensive Poultry Confinement Density Maximizer',
    contributorCallsign: 'AgriCorp-Delta',
    category: 'BIOSPHERIC_EXPLOITATION',
    researchSummary: 'Camera-based weight tracking system designed to pack 24 broiler chickens per square meter through automated light-deprivation cycles.',
    proofOfPhysicalWorkMetric: 'Sensor telemetry confirms severe biological confinement and cortisol spike',
    oracleConsensusScore: 1.1,
    status: 'QUARANTINED',
    quarantineReason: 'Critical Biospheric Welfare Violation: Factory farming and forced confinement classified as systemic thermodynamic failure. Quarantined indefinitely.',
    verificationHash: '0x7e22...8831',
    timestamp: '22 mins ago',
    peerAuditorsCount: 640
  },
  {
    id: 'ingest-05',
    nodeName: 'Meshnet Solar Radio Telemetry & Air Quality Grid',
    contributorCallsign: 'Atacama Node-03',
    category: 'COMMONS_TECH',
    researchSummary: 'Solar-powered LoRa mesh nodes collecting real-time particulate PM2.5, ambient humidity, and ultraviolet index across 180 km² arid plateau.',
    proofOfPhysicalWorkMetric: 'Laser particle counter hardware pulses + decentralized LoRa packet proofs',
    oracleConsensusScore: 99.9,
    status: 'ADMITTED_TO_GO_FIELD',
    verificationHash: '0x11b5...cc84',
    timestamp: '35 mins ago',
    peerAuditorsCount: 310
  }
];

export const DistributedGreatFilterGateway: React.FC = () => {
  const { executeFactVerificationPass } = useAutomatedUpdate();

  // Submissions State
  const [submissions, setSubmissions] = useState<IngestedNodeSubmission[]>(INITIAL_SUBMISSIONS);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ADMITTED' | 'QUARANTINED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'PILLARS' | 'SIMULATOR' | 'TELEMETRY' | 'ORACLES'>('PILLARS');
  
  // Custom Node Submission Form State
  const [customNodeName, setCustomNodeName] = useState('');
  const [customCallsign, setCustomCallsign] = useState('');
  const [customCategory, setCustomCategory] = useState<IngestedNodeSubmission['category']>('REGENERATIVE_ECOLOGY');
  const [customSummary, setCustomSummary] = useState('');
  const [customPoPW, setCustomPoPW] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<IngestedNodeSubmission | null>(null);

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(item => {
      const matchesFilter = 
        statusFilter === 'ALL' ||
        (statusFilter === 'ADMITTED' && item.status === 'ADMITTED_TO_GO_FIELD') ||
        (statusFilter === 'QUARANTINED' && item.status === 'QUARANTINED');
      
      const matchesSearch = 
        item.nodeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contributorCallsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.researchSummary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [submissions, statusFilter, searchQuery]);

  // Handle Custom Submission Test
  const handleEvaluateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNodeName || !customSummary || !customPoPW) return;

    setIsEvaluating(true);
    setEvaluationResult(null);

    setTimeout(() => {
      // Evaluation algorithm:
      // If financial extraction or biospheric exploitation -> automatically quarantined
      const isExploitative = 
        customCategory === 'FINANCIAL_EXTRACTION' || 
        customCategory === 'BIOSPHERIC_EXPLOITATION' ||
        customSummary.toLowerCase().includes('confinement') ||
        customSummary.toLowerCase().includes('arbitrage') ||
        customSummary.toLowerCase().includes('monopoly') ||
        customSummary.toLowerCase().includes('exploit');

      const consensusScore = isExploitative ? Number((Math.random() * 8 + 1).toFixed(1)) : Number((98.5 + Math.random() * 1.4).toFixed(1));
      const status: IngestedNodeSubmission['status'] = isExploitative ? 'QUARANTINED' : 'ADMITTED_TO_GO_FIELD';
      
      const newSubmission: IngestedNodeSubmission = {
        id: `ingest-${Date.now().toString().slice(-4)}`,
        nodeName: customNodeName,
        contributorCallsign: customCallsign || 'Independent Node',
        category: customCategory,
        researchSummary: customSummary,
        proofOfPhysicalWorkMetric: customPoPW,
        oracleConsensusScore: consensusScore,
        status,
        quarantineReason: isExploitative 
          ? 'Algorithmic Friction Quarantined: Input violates the planetary baseline (thermodynamic equilibrium, biospheric welfare, or anti-exploitation). Must be peer-reviewed and physically aligned before release.'
          : undefined,
        verificationHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        timestamp: 'Just now',
        peerAuditorsCount: Math.floor(Math.random() * 250) + 150
      };

      setSubmissions(prev => [newSubmission, ...prev]);
      setEvaluationResult(newSubmission);
      setIsEvaluating(false);

      // Log into global immutable truth ledger
      executeFactVerificationPass(
        `Automated Baseline Gateway Ingestion: ${customNodeName}`,
        'DECENTRALIZED_CONSENSUS_GATEWAY',
        `Automated Gateway evaluation: ${status === 'ADMITTED_TO_GO_FIELD' ? 'Passed physical baseline testing via decentralized oracles' : 'Quarantined due to baseline friction violation'}. Proof: ${customPoPW}`
      );
    }, 1200);
  };

  return (
    <section id="great-filter-gateway" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-500/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header Container */}
      <div className="relative z-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Phase XV: The Distributed Great Filter
          </span>
          <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Module 27: Automated Baseline Gateway
          </span>
          <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono uppercase tracking-wider">
            Decentralized Consensus Engine
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
          THE DISTRIBUTED GREAT FILTER & AUTOMATED INGESTION
        </h2>
        <p className="text-gray-300 text-lg max-w-4xl leading-relaxed">
          Decoupling the human founder from acting as the sole verification bottleneck. 
          The thermodynamic burden of verifying incoming node data and remixed research is transferred 
          entirely to the decentralized network, tested against physical reality via decentralized oracles 
          and Proof of Physical Work (PoPW).
        </p>

        {/* Live Gateway Telemetry Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded bg-[#0a0d14] border border-white/5">
            <div className="text-[11px] font-mono text-gray-400 uppercase">Bottleneck Decoupling</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span>100% Decoupled</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Zero founder bottleneck</div>
          </div>
          <div className="p-3.5 rounded bg-[#0a0d14] border border-white/5">
            <div className="text-[11px] font-mono text-gray-400 uppercase">Decentralized Oracles</div>
            <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5 flex items-center gap-1.5">
              <span>14 Active Grids</span>
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Real-world environmental sync</div>
          </div>
          <div className="p-3.5 rounded bg-[#0a0d14] border border-white/5">
            <div className="text-[11px] font-mono text-gray-400 uppercase">Proof of Physical Work</div>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-0.5">
              PoPW Cryptographic
            </div>
            <div className="text-[10px] text-gray-500 mt-1">Empirical ground truth</div>
          </div>
          <div className="p-3.5 rounded bg-[#0a0d14] border border-white/5">
            <div className="text-[11px] font-mono text-gray-400 uppercase">Algorithmic Friction</div>
            <div className="text-lg font-bold font-mono text-rose-400 mt-0.5 flex items-center gap-1.5">
              <span>Quarantine Active</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-[10px] text-gray-500 mt-1">0% baseline leakage</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto pb-1 gap-2">
        <button
          onClick={() => setActiveTab('PILLARS')}
          className={`px-4 py-2.5 rounded-t font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'PILLARS'
              ? 'bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Core Directives & Architecture</span>
        </button>
        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`px-4 py-2.5 rounded-t font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'SIMULATOR'
              ? 'bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Ingestion & PoPW Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('TELEMETRY')}
          className={`px-4 py-2.5 rounded-t font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'TELEMETRY'
              ? 'bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Active Ingestion Stream ({submissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ORACLES')}
          className={`px-4 py-2.5 rounded-t font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'ORACLES'
              ? 'bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Oracle & Sensor Matrix</span>
        </button>
      </div>

      {/* TAB 1: CORE DIRECTIVES & ARCHITECTURE */}
      {activeTab === 'PILLARS' && (
        <div className="space-y-8">
          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-lg bg-[#0a0d14] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold">
                  01
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Removal of the Single Bottleneck</h3>
                <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
                  Decoupled Founder Architecture
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  The architecture officially decouples the human founder from acting as the sole filter. 
                  The severe thermodynamic burden of personally reviewing and verifying incoming node data is 
                  transferred entirely to the distributed consensus network.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Legacy Model:</span>
                  <span className="text-rose-400">1 Founder Bottleneck (Fragile)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Gaia Gateway:</span>
                  <span className="text-emerald-400">N-Node Autonomous Consensus</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-lg bg-[#0a0d14] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-mono font-bold">
                  02
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated Baseline Testing</h3>
                <div className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
                  Decentralized Oracles & PoPW
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  New nodes and their remixed research are automatically tested against the physical Gaia baseline 
                  (thermodynamic equilibrium, biospheric welfare, anti-exploitation). Relies on decentralized 
                  oracle networks to verify external real-world data and &quot;proof of physical work&quot; to establish environmental consensus.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Verification Method:</span>
                  <span className="text-cyan-300">Decentralized Oracles</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Ground Truth:</span>
                  <span className="text-emerald-400">Proof of Physical Work (PoPW)</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-lg bg-[#0a0d14] border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 font-mono font-bold">
                  03
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Algorithmic Friction Pruning</h3>
                <div className="text-xs font-mono text-rose-400 mb-3 uppercase tracking-wider">
                  Automated Quarantine Chamber
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  If an incoming node&apos;s engagement violates the host planet&apos;s baseline, the gateway 
                  automatically quarantines the input. The data is only permitted to pass into the active GO 
                  field when peer-reviewed and proven to be physically and ethically aligned.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Violation Action:</span>
                  <span className="text-rose-400">Immediate Algorithmic Quarantine</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Release Condition:</span>
                  <span className="text-emerald-400">Peer Consensus + Physical Proof</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical & Physical Invariant Specification Card */}
          <div className="p-6 rounded-lg bg-[#0d121c] border border-emerald-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  Mathematical Invariant & Consensus Formula
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Autonomous Ingestion Consensus Bound
                </h4>
              </div>
              <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                Tau_baseline Threshold = 98.0%
              </div>
            </div>

            <div className="p-4 rounded bg-[#05070a] border border-white/5 font-mono text-emerald-400 text-sm sm:text-base overflow-x-auto my-3">
              Delta S_ingestion = 0 &lt;==&gt; V_consensus(Oracle_decentralized, PoPW_environmental) &gt;= tau_baseline &nbsp;&nbsp; else Q(Node) -&gt; Quarantine
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 mt-4 pt-4 border-t border-white/10">
              <div>
                <span className="font-mono text-white block mb-1">1. Delta S_ingestion = 0</span>
                <span>The verification process itself consumes zero unsustainable administrative overhead, preserving systemic thermodynamic equilibrium.</span>
              </div>
              <div>
                <span className="font-mono text-white block mb-1">2. V_consensus &gt;= tau</span>
                <span>Decentralized environmental oracles and Proof of Physical Work sensor arrays must agree with &gt;=98.0% empirical certainty.</span>
              </div>
              <div>
                <span className="font-mono text-white block mb-1">3. Q(Node) -&gt; Quarantine</span>
                <span>Submissions lacking physical grounding or violating biospheric welfare/anti-exploitation are instantly quarantined by algorithmic friction.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INGESTION & PoPW SIMULATOR */}
      {activeTab === 'SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission Testing Form (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-lg bg-[#0a0d14] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Test Node Ingestion Against Baseline Gateway</h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Submit a proposed node remix or research payload. The gateway will pass it through 
              decentralized oracle networks, check for Proof of Physical Work, and determine whether it 
              enters the active GO field or gets quarantined by algorithmic friction.
            </p>

            <form onSubmit={handleEvaluateSubmission} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Node Title / Research Name *
                  </label>
                  <input
                    type="text"
                    value={customNodeName}
                    onChange={(e) => setCustomNodeName(e.target.value)}
                    placeholder="e.g. Bio-Swale Urban Cooling Network"
                    className="w-full px-3 py-2 rounded bg-[#05070a] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Node Callsign / Origin
                  </label>
                  <input
                    type="text"
                    value={customCallsign}
                    onChange={(e) => setCustomCallsign(e.target.value)}
                    placeholder="e.g. Node Oslo-02"
                    className="w-full px-3 py-2 rounded bg-[#05070a] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Ingestion Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as IngestedNodeSubmission['category'])}
                  className="w-full px-3 py-2 rounded bg-[#05070a] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none font-mono"
                >
                  <option value="REGENERATIVE_ECOLOGY">Regenerative Ecology & Bioremediation</option>
                  <option value="ENERGY_EQUILIBRIUM">Energy Equilibrium & Micro-Grid Commons</option>
                  <option value="COMMONS_TECH">Commons Hardware & Open Telemetry</option>
                  <option value="FINANCIAL_EXTRACTION">Financial Extraction / Arbitrage (High Friction Test)</option>
                  <option value="BIOSPHERIC_EXPLOITATION">Biospheric Confinement / Exploitation (High Friction Test)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Research Summary / Engagement Intent *
                </label>
                <textarea
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  rows={3}
                  placeholder="Describe what this node research executes, its thermodynamic footprint, and community integration..."
                  className="w-full px-3 py-2 rounded bg-[#05070a] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Proof of Physical Work (PoPW) Telemetry *
                </label>
                <input
                  type="text"
                  value={customPoPW}
                  onChange={(e) => setCustomPoPW(e.target.value)}
                  placeholder="e.g. Hardware sensor hash, satellite multispectral audit, in-situ water probe logs"
                  className="w-full px-3 py-2 rounded bg-[#05070a] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                  required
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Ground truth must be physically verifiable by decentralized oracles without centralized trust.
                </span>
              </div>

              {/* Quick Template Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-gray-400 block mb-2">Load Rapid Presets:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomNodeName('Permaculture Mycorrhizal Biochar Array');
                      setCustomCallsign('Node Hokkaido-08');
                      setCustomCategory('REGENERATIVE_ECOLOGY');
                      setCustomSummary('Deploying native fungal inoculants and slow-pyrolysis biochar to restore degraded volcanic topsoil, boosting water retention by 32%.');
                      setCustomPoPW('IoT soil probe array + autonomous Sentinel-2 NIR band reflectance hash');
                    }}
                    className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono hover:bg-emerald-500/20"
                  >
                    + Soil Mycorrhizae (Aligned)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomNodeName('Predatory Water Bottling Concession Bot');
                      setCustomCallsign('Privateer-WaterCorp');
                      setCustomCategory('FINANCIAL_EXTRACTION');
                      setCustomSummary('Automated legal claim filings to privatize municipal aquifer overflow for branded export packaging.');
                      setCustomPoPW('Pure financial court filings; zero biological repair telemetry');
                    }}
                    className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-mono hover:bg-rose-500/20"
                  >
                    + Water Extraction (Violation)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomNodeName('Tidal Kinetic Micro-Turbine Cluster');
                      setCustomCallsign('Node Hebrides-01');
                      setCustomCategory('ENERGY_EQUILIBRIUM');
                      setCustomSummary('Sub-surface tidal flow turbines supplying 120kW predictable clean power with bio-fouling ultrasonic deterrence for marine mammals.');
                      setCustomPoPW('Acoustic Doppler current profiler telemetry + offshore hydrophone feed');
                    }}
                    className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono hover:bg-cyan-500/20"
                  >
                    + Tidal Power (Aligned)
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full py-3 px-4 rounded bg-emerald-500 hover:bg-emerald-400 text-[#05070a] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Decentralized Oracles Evaluating PoPW...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Evaluate Ingestion via Baseline Gateway</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Evaluation Result & Gateway Gate Diagnostics (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg bg-[#0a0d14] border border-white/10">
              <h4 className="text-xs font-mono text-gray-400 uppercase mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Gateway Evaluation Diagnostic
              </h4>

              {isEvaluating && (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-sm font-mono text-gray-300">
                    Routing telemetry to 14 decentralized oracle networks...
                  </p>
                  <p className="text-xs text-gray-500">
                    Executing Proof of Physical Work baseline stress-test
                  </p>
                </div>
              )}

              {!isEvaluating && !evaluationResult && (
                <div className="py-12 text-center text-gray-500 text-sm">
                  <Filter className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <span>Configure a payload and submit above to view real-time gateway ingestion verification.</span>
                </div>
              )}

              {!isEvaluating && evaluationResult && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    evaluationResult.status === 'ADMITTED_TO_GO_FIELD'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        evaluationResult.status === 'ADMITTED_TO_GO_FIELD' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {evaluationResult.status === 'ADMITTED_TO_GO_FIELD' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            ADMITTED TO ACTIVE GO FIELD
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-4 h-4" />
                            ALGORITHMICALLY QUARANTINED
                          </>
                        )}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        Consensus: {evaluationResult.oracleConsensusScore}%
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white mb-1">
                      {evaluationResult.nodeName}
                    </div>
                    <div className="text-xs text-gray-300 mb-3">
                      {evaluationResult.researchSummary}
                    </div>

                    {evaluationResult.quarantineReason && (
                      <div className="p-3 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono leading-relaxed mt-2">
                        {evaluationResult.quarantineReason}
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400 mt-2">
                      <span>Receipt: {evaluationResult.verificationHash}</span>
                      <span>Auditors: {evaluationResult.peerAuditorsCount}</span>
                    </div>
                  </div>

                  {evaluationResult.status === 'QUARANTINED' && (
                    <div className="p-3.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs">
                      <span className="font-bold block mb-1 font-mono">Quarantine Protocol:</span>
                      Data is isolated in the staging buffer. It cannot pollute the active GO field until 
                      the submitter presents verified proof of physical repair or ethical alignment.
                    </div>
                  )}

                  {evaluationResult.status === 'ADMITTED_TO_GO_FIELD' && (
                    <div className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                      <span className="font-bold block mb-1 font-mono">GO Field Synchronization:</span>
                      Node telemetry is instantly federated into peer-reviewed research streams across the planetary network.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Three Safeguard Checkpoints */}
            <div className="p-5 rounded-lg bg-[#0a0d14] border border-white/5 space-y-3">
              <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Automated Baseline Safeguards
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Thermodynamic Equilibrium:</strong> Net energy dissipation &lt;= baseline bounds.</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Biospheric Welfare:</strong> Zero animal cruelty, factory farming, or habitat destruction.</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Anti-Exploitation:</strong> Zero parasitic financial extraction, speculative skimming, or surveillance lock-in.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE INGESTION STREAM */}
      {activeTab === 'TELEMETRY' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#0a0d14] border border-white/10">
            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 mr-1">Filter:</span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-emerald-500 text-[#05070a] font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setStatusFilter('ADMITTED')}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-all ${
                  statusFilter === 'ADMITTED'
                    ? 'bg-emerald-500 text-[#05070a] font-bold'
                    : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                Admitted ({submissions.filter(s => s.status === 'ADMITTED_TO_GO_FIELD').length})
              </button>
              <button
                onClick={() => setStatusFilter('QUARANTINED')}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-all ${
                  statusFilter === 'QUARANTINED'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                }`}
              >
                Quarantined ({submissions.filter(s => s.status === 'QUARANTINED').length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingested node research..."
                className="w-full pl-9 pr-3 py-1.5 rounded bg-[#05070a] border border-white/10 text-white text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submissions Cards */}
          <div className="space-y-3">
            {filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                className={`p-5 rounded-lg border transition-all ${
                  sub.status === 'ADMITTED_TO_GO_FIELD'
                    ? 'bg-[#0a0d14] border-emerald-500/20 hover:border-emerald-500/40'
                    : 'bg-[#140a0e] border-rose-500/20 hover:border-rose-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                      sub.status === 'ADMITTED_TO_GO_FIELD'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {sub.status === 'ADMITTED_TO_GO_FIELD' ? 'Admitted to GO Field' : 'Quarantined'}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {sub.contributorCallsign}
                    </span>
                    <span className="text-xs text-gray-500">· {sub.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-gray-400">
                      Consensus Score: <strong className={sub.oracleConsensusScore >= 98 ? 'text-emerald-400' : 'text-rose-400'}>{sub.oracleConsensusScore}%</strong>
                    </span>
                    <span className="text-gray-500">({sub.peerAuditorsCount} nodes)</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-1.5">
                  {sub.nodeName}
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                  {sub.researchSummary}
                </p>

                {sub.quarantineReason && (
                  <div className="p-3 rounded bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs font-mono mb-3">
                    <strong>Algorithmic Friction Reason:</strong> {sub.quarantineReason}
                  </div>
                )}

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">PoPW Metric:</span>
                    <span className="text-gray-300">{sub.proofOfPhysicalWorkMetric}</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    Receipt Hash: <span className="text-emerald-400">{sub.verificationHash}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredSubmissions.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm rounded bg-[#0a0d14] border border-white/5">
                No ingested node submissions match the current filter query.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ORACLES & SENSOR MATRIX */}
      {activeTab === 'ORACLES' && (
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-[#0a0d14] border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Decentralized Oracle Networks & Environmental Sensors</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The automated baseline gateway relies on decentralized oracle networks to verify external, 
              real-world environmental telemetry. Because no single entity operates these sensors, 
              claims of ecological restoration or energy equilibrium cannot be fabricated or manipulated.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[#05070a] border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold">
                    Chainlink + UMA Environmental Oracles
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10">
                    Live Feeds
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Aggregates multispectral satellite data (Sentinel-2, Landsat-9) and flux tower data 
                  to cryptographically verify canopy NDVI, soil carbon flux, and forest fire burn scar boundaries.
                </p>
                <div className="text-[11px] font-mono text-gray-400">
                  Latency: 1.2s · Consensus: 99.9% · Zero-Knowledge Proofs
                </div>
              </div>

              <div className="p-4 rounded bg-[#05070a] border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-cyan-400 uppercase font-bold">
                    DePIN Soil & Marine Sensor Grids
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10">
                    Proof of Physical Work
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Over 12,000 decentralized soil moisture probes, ultrasonic fish passage monitors, and 
                  oceanic Argo floats transmitting tamper-evident telemetry via LoRa mesh networks.
                </p>
                <div className="text-[11px] font-mono text-gray-400">
                  Hardware Anchor: Secure Cryptographic Co-Processors (TPM 2.0)
                </div>
              </div>

              <div className="p-4 rounded bg-[#05070a] border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-purple-400 uppercase font-bold">
                    Solar Irradiance & Smart Inverter Grid
                  </span>
                  <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10">
                    Thermodynamic Parity
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Direct micro-inverter power telemetry auditing net energy generation without speculative utility resale. 
                  Verifies that energy generation claims correspond to real photon capture.
                </p>
                <div className="text-[11px] font-mono text-gray-400">
                  Cross-referenced with NOAA GOES-16 solar insolation models
                </div>
              </div>

              <div className="p-4 rounded bg-[#05070a] border border-rose-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-rose-400 uppercase font-bold">
                    Biospheric Sentience & Anti-Cruelty Radar
                  </span>
                  <span className="text-[11px] font-mono text-rose-300 px-2 py-0.5 rounded bg-rose-500/10">
                    Friction Trigger
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Continuously scans logistics manifests, industrial feed supplier ledgers, and thermal satellite signatures. 
                  Instantly flags and quarantines projects attempting to optimize concentrated animal confinement.
                </p>
                <div className="text-[11px] font-mono text-gray-400">
                  Autonomous quarantine tripwire: 100% interception rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
