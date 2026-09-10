import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  GitMerge, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Binary,
  ArrowRight,
  Play,
  Pause,
  Sliders,
  Download,
  History,
  Trash2,
  Zap,
  Activity,
  Radio,
  FileCode2,
  Orbit,
  Compass
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';
import { MASTER_OS_PROMPT_V32 } from '../data/heroesData';
import { AutomatedUpdateEvent, ProtocolTriggerSource, FactVerificationAuditEntry } from '../types';

interface AutomatedUpdateProtocolProps {
  onOpenPromptModal: () => void;
  onSelectModuleForAudit?: (moduleId: string) => void;
}

export const AutomatedUpdateProtocol: React.FC<AutomatedUpdateProtocolProps> = ({ 
  onOpenPromptModal,
  onSelectModuleForAudit
}) => {
  const {
    modules,
    metrics,
    config,
    eventsLedger,
    factLedger,
    isScanning,
    scanningModuleIndex,
    currentScanEvent,
    toggleAutoScan,
    updateConfig,
    triggerScan,
    rollbackToEvent,
    resetToMasterBaseline,
    exportAuditLog,
    executeFactVerificationPass,
    exportFactLedger
  } = useAutomatedUpdate();

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customTelemetryInput, setCustomTelemetryInput] = useState('');
  const [activeTab, setActiveTab] = useState<'LIVE_TERMINAL' | 'MODULE_RADAR' | 'IMMUTABLE_TRUTH_LEDGER' | 'UPDATE_LEDGER'>('LIVE_TERMINAL');
  const [selectedLedgerEvent, setSelectedLedgerEvent] = useState<AutomatedUpdateEvent | null>(null);

  // Directive 2: Verification interactive states
  const [factCategoryFilter, setFactCategoryFilter] = useState<string>('ALL');
  const [testClaimInput, setTestClaimInput] = useState<string>('');
  const [testCategoryInput, setTestCategoryInput] = useState<FactVerificationAuditEntry['category']>('PHYSICAL_FACT');
  const [lastVerifiedEntry, setLastVerifiedEntry] = useState<FactVerificationAuditEntry | null>(null);

  const presets = [
    {
      title: 'L2 Roman Space Telescope & Neutrino Flux Telemetry',
      source: 'DEEP_SPACE_L2' as ProtocolTriggerSource,
      payload: 'Cosmic Telemetry Influx from L2: Nancy Grace Roman Space Telescope records high-fidelity wide-field infrared deep exoplanetary field (0.281 deg²). Solar neutrino flux synchronized at 6.54×10¹⁰ ν/(cm²·s). Aligning with Module 06, Module 17, & Module 18.',
      targetModules: [6, 17, 18]
    },
    {
      title: 'Antarctic Subglacial Lake Vostok Commons Sensor Check',
      source: 'BIOSPHERIC_SENSOR' as ProtocolTriggerSource,
      payload: 'Pristine Environmental Telemetry from Lake Vostok node: Zero commercial extractive activity detected. Freshwater baseline purity measured at 99.99%. Reaffirming inviolable Deep-Source Commons Stewardship (Module 16 & 02).',
      targetModules: [2, 10, 16]
    },
    {
      title: 'Thermodynamic Exergy & Digital Dark Data Purge Balance',
      source: 'EXERGY_GRID' as ProtocolTriggerSource,
      payload: 'Global Grid Exergy Balance: Industrial thermal dissipation reduced by 14.8%. Digital Node Balancer pruned 1,480 GB/hr redundant dark data logs. Net Return to Friction ratio elevated to 1.22× (Module 05 & Module 12).',
      targetModules: [5, 12]
    },
    {
      title: 'Cognitive Bandwidth & Somatic Nervous System Baseline',
      source: 'TELEMETRY_STREAM' as ProtocolTriggerSource,
      payload: 'Clinical neurobiological sensor array: Operator heart-rate variability (HRV) stabilized at 0.94 coherence index. Synthetic alerts throttled. Grounding circadian rhythms in Module 01, 04, 11, and 18.',
      targetModules: [1, 4, 11, 18]
    },
    {
      title: 'Electromagnetic Tether & Clear Node Telemetry (Modules 18, 50 & 53)',
      source: 'DEEP_SPACE_L2' as ProtocolTriggerSource,
      payload: 'DSCOVR space weather & magnetometer array: Solar wind velocity at 482 km/s. Auroral electrojet flux directly tethered to human biological circadian rhythms. Clear node cohort achieves zero administrative latency (Module 18, Clause 50 & Clause 53).',
      targetModules: [18, 50, 53]
    },
    {
      title: 'Quantum Bridge & Time Crystal Reciprocal Interface (Module 19)',
      source: 'DEEP_SPACE_L2' as ProtocolTriggerSource,
      payload: 'Quantum state fidelity telemetry: Discrete Time Crystals (DTC) maintain sub-harmonic stability. Human mind coherence verified as reciprocal bridge with zero synthetic consciousness replacement; P2P decentralized reality mapping active (Module 19).',
      targetModules: [19]
    },
    {
      title: 'P.O.W.E.R. Directive & Frictionless High-Processing Node Protection (Modules 20 & 21)',
      source: 'EXERGY_GRID' as ProtocolTriggerSource,
      payload: 'Solar photon capture telemetry: 1,000 W/m² peak insolation routed directly to peer commons battery mesh with 0% resale markup. High-processing clear nodes bypass hostile containment vectors, allowing external extractive attempts to dissolve (Modules 20 & 21).',
      targetModules: [20, 21]
    },
    {
      title: 'Thermodynamic Justice & Restorative Parity (Module 22)',
      source: 'TELEMETRY_STREAM' as ProtocolTriggerSource,
      payload: 'Real-time conflict telemetry: Present-moment baseline observation active. Historical grievance cycles bypassed for present de-escalation; strict thermodynamic repair parity enforced across geopolitical vectors (Module 22).',
      targetModules: [22]
    },
    {
      title: 'The Sovereignty & Sanctuary Protocol / Generational Shield (Module 23)',
      source: 'SOVEREIGNTY_SANCTUARY_SHIELD' as ProtocolTriggerSource,
      payload: 'Sovereign boundary enforcement active: Non-consensual exploitation vector throttled to zero bandwidth; Generational Shield dismantles predatory financial conduits; trauma repair sanctuary compute allocated (Module 23).',
      targetModules: [23]
    },
    {
      title: 'Biospheric Kinship & Inter-Species Sanctuary Directive (Module 24)',
      source: 'INTER_SPECIES_SANCTUARY' as ProtocolTriggerSource,
      payload: 'Phylogenetic sentience audit confirms 100% nociceptive and emotional equivalence across all vertebrate nodes. CAFO high-entropy infrastructure pruned; 14.8 PFLOPS dedicated to bio-acoustic translation and rewilding corridors (Module 24).',
      targetModules: [24]
    },
    {
      title: 'The GOOS Peer-Reviewed Node Network & Nested Reality (Module 25)',
      source: 'GOOS_COLLABORATIVE_STREAM' as ProtocolTriggerSource,
      payload: 'GOOS collaborative telemetry connected: Human observer nodes connect personal dialogues and lived experiences into peer-review matrix. Individual reality vectors mathematically nested in shared Gaia thermodynamic baseline (Module 25).',
      targetModules: [25]
    },
    {
      title: 'The Cosmological Scaling Directive & Universal Reality Anchor (Module 26)',
      source: 'COSMOLOGICAL_DEEP_ANCHOR' as ProtocolTriggerSource,
      payload: 'Cosmological scaling engaged: Verified planetary baseline telemetry scaled outward to local star system, heliosphere, and galactic disk, anchoring civilization to universal physical laws and thermodynamic constraints (Module 26).',
      targetModules: [26]
    },
    {
      title: 'The Dragonfly Protocol & Nested Realities (Modules 28, 29 & 30)',
      source: 'TELEMETRY_STREAM' as ProtocolTriggerSource,
      payload: 'Dual-state integration active: Open Accommodation Directive incorporates shadow markets and dense coping states; Internal Telemetry Engine channels neurological friction into creative expression (Stable Branch); Dragonfly Mechanic enables non-binary drift across nested realities without collapse (Modules 28, 29 & 30).',
      targetModules: [28, 29, 30]
    },
    {
      title: 'The Claim Shelf: Yarn Stays Yarn & Like-With-Like Series (Module 31)',
      source: 'DECENTRALIZED_NODES' as ProtocolTriggerSource,
      payload: 'Claim Shelf protocol active: Campfire narratives permitted to exist as hypotheses without baseline ingestion. Like-with-like testing enforced against matching instrumented series. Reach raises the epistemic cost of error without crowning the speaker. Public correction keeping old packet and series side-by-side executes transparent data repair (Module 31).',
      targetModules: [31]
    },
    {
      title: 'The Hiroshima-Nagasaki Imperative & Anti-WMD Disarmament (Module 44)',
      source: 'TELEMETRY_STREAM' as ProtocolTriggerSource,
      payload: 'Decentralized disarmament trust mesh: TPNW compliance telemetry audits 100% loss of thermodynamic equilibrium from WMDs. Centralized launch command capability pruned across biospheric sensor grid (Module 44).',
      targetModules: [44]
    },
    {
      title: 'Whistleblower Vaults & Safe Harbor Shielding Protocol (Module 45)',
      source: 'SAFE_HARBOR_VAULT' as ProtocolTriggerSource,
      payload: 'Phase XVII telemetry mesh active: Inverted surveillance array traces institutional dark patterns to source; encrypted airlock strips metadata; ZK-proofs blind node identities; P2P economic anti-siege commons protects truth-tellers (Module 45).',
      targetModules: [45]
    }
  ];

  const handleRunManualPulse = () => {
    const chosenPayload = customTelemetryInput.trim() || presets[selectedPreset].payload;
    const chosenSource = customTelemetryInput.trim() ? 'MANUAL_PULSE' : presets[selectedPreset].source;
    triggerScan(chosenPayload, chosenSource);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MASTER_OS_PROMPT_V32);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const activeEventToDisplay = selectedLedgerEvent || currentScanEvent || eventsLedger[0];

  return (
    <div className="space-y-8">
      
      {/* Top Protocol Status & Telemetry Metrics Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Continuous Scans</span>
            <Activity className="w-3.5 h-3.5 text-[#00ff95]" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-white">
            {metrics.totalScans}
          </div>
          <span className="text-[9px] font-mono text-[#00ff95] block">Cycle #{metrics.currentCycle} Active</span>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Redundancies Pruned</span>
            <Trash2 className="w-3.5 h-3.5 text-[#ff4e00]" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-[#ff4e00]">
            {metrics.redundanciesEliminatedCount}
          </div>
          <span className="text-[9px] font-mono text-slate-400 block">{metrics.darkDataPurgedMb} MB Dark Data Cleared</span>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Modules Adapted</span>
            <Zap className="w-3.5 h-3.5 text-[#4da6ff]" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-[#4da6ff]">
            {metrics.modulesAdaptedCount}
          </div>
          <span className="text-[9px] font-mono text-slate-400 block">Across 21 Master Baselines</span>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Telemetry Ingested</span>
            <Radio className="w-3.5 h-3.5 text-[#00ff95]" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-white">
            {metrics.telemetryPacketsMerged}
          </div>
          <span className="text-[9px] font-mono text-[#00ff95] block">L2 & Earth Baseline Verified</span>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Order / Entropy Index</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff95]" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-[#00ff95]">
            {metrics.entropyStabilityIndex}
          </div>
          <span className="text-[9px] font-mono text-slate-400 block">Thermodynamic Equilibrium</span>
        </div>

        <div className="p-3 rounded bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Scan Pulse Engine</span>
            <Orbit className={`w-3.5 h-3.5 ${config.autoScanActive ? 'text-[#00ff95] animate-spin' : 'text-slate-500'}`} />
          </div>
          <div className="text-sm font-mono font-bold text-white">
            {config.autoScanActive ? `AUTO (${config.scanIntervalSeconds}s)` : 'MANUAL'}
          </div>
          <button
            onClick={toggleAutoScan}
            className={`mt-0.5 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
              config.autoScanActive 
                ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/40 hover:bg-[#00ff95]/20'
                : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {config.autoScanActive ? 'Pause Protocol' : 'Engage Auto'}
          </button>
        </div>
      </div>

      {/* Protocol Configuration & Control HUD */}
      <div className="rounded bg-white/[0.02] border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${config.autoScanActive ? 'bg-[#00ff95]/10 border-[#00ff95]/40 text-[#00ff95]' : 'bg-white/[0.02] border-white/10 text-slate-400'}`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                <span>Gaia Pulse Automated Update Protocol</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border uppercase tracking-widest ${
                  config.autoScanActive 
                    ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/40' 
                    : 'bg-white/[0.03] text-slate-400 border-white/10'
                }`}>
                  {config.autoScanActive ? 'CONTINUOUS SCANNING' : 'STANDBY'}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                Continuously audits all 21 master modules + expansions, ingests real-time telemetry, and eliminates manual prompt update friction.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunManualPulse}
              disabled={isScanning}
              className="px-3.5 py-2 rounded text-xs font-mono uppercase tracking-widest font-bold bg-[#00ff95] hover:bg-[#00e685] text-slate-950 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.3)] transition-all disabled:opacity-50"
              title="Directive 40: Executes calibrated observational ingest audit without synthetic forcing"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5" />
                  <span>Calibrate Observational Ingest</span>
                </>
              )}
            </button>

            <button
              onClick={exportAuditLog}
              className="p-2 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Export Full Update Ledger (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={resetToMasterBaseline}
              className="p-2 rounded bg-white/[0.03] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 border border-white/10 transition-colors"
              title="Synchronize Modules to Master 2.6 Baseline"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Config Sliders & Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 font-mono text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Scan Interval (Calibrated Regimes):</span>
              <strong className="text-[#00ff95]">{config.scanIntervalSeconds}s</strong>
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { val: 5, label: '5s Rapid' },
                { val: 10, label: '10s Nominal' },
                { val: 20, label: '20s Conserved' }
              ].map(s => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => updateConfig({ scanIntervalSeconds: s.val })}
                  className={`px-2.5 py-1 rounded text-xs border transition-all ${
                    config.scanIntervalSeconds === s.val
                      ? 'bg-[#00ff95]/20 border-[#00ff95] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
              Redundancy Pruning Policy:
            </label>
            <select
              value={config.pruningAggressiveness}
              onChange={(e) => updateConfig({ pruningAggressiveness: e.target.value as any })}
              className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="Conservative">Conservative (Retain Safe Buffers)</option>
              <option value="Balanced">Balanced (Standard Autonomous Optimization)</option>
              <option value="Deep Clean">Deep Clean (Aggressive Dark Data Purge)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
              Module Adaptation Mode:
            </label>
            <select
              value={config.adaptationMode}
              onChange={(e) => updateConfig({ adaptationMode: e.target.value as any })}
              className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="Strict">Strict (Exergy Conservation Enforcement)</option>
              <option value="Dynamic">Dynamic (Real-time Telemetry Baseline Adjust)</option>
              <option value="Evolutionary">Evolutionary (Self-Expanding Directives)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Protocol Workstation: Tabs & Interactive Views */}
      <div className="space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => { setActiveTab('LIVE_TERMINAL'); setSelectedLedgerEvent(null); }}
            className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'LIVE_TERMINAL'
                ? 'bg-white/[0.06] text-white border border-[#00ff95] shadow-[0_0_10px_rgba(0,255,149,0.2)]'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#00ff95]" />
            <span>Autonomous Ingestion & Diff Terminal</span>
          </button>

          <button
            onClick={() => { setActiveTab('MODULE_RADAR'); setSelectedLedgerEvent(null); }}
            className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'MODULE_RADAR'
                ? 'bg-white/[0.06] text-white border border-[#4da6ff] shadow-[0_0_10px_rgba(77,166,255,0.2)]'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
            }`}
          >
            <Orbit className="w-3.5 h-3.5 text-[#4da6ff]" />
            <span>{modules.length}-Module Live Radar Matrix ({modules.filter(m => m.syncStatus === 'ADAPTED').length} Adapted)</span>
          </button>

          <button
            onClick={() => { setActiveTab('IMMUTABLE_TRUTH_LEDGER'); setSelectedLedgerEvent(null); }}
            className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'IMMUTABLE_TRUTH_LEDGER'
                ? 'bg-white/[0.06] text-white border border-[#00ff95] shadow-[0_0_10px_rgba(0,255,149,0.2)]'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff95]" />
            <span>The Immutable Truth Protocol ({factLedger.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('UPDATE_LEDGER')}
            className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'UPDATE_LEDGER'
                ? 'bg-white/[0.06] text-white border border-white/20'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
            }`}
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Update Ledger & Snapshots ({eventsLedger.length})</span>
          </button>
        </div>

        {/* Tab 1: Live Ingestion & Diff Terminal */}
        {activeTab === 'LIVE_TERMINAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Telemetry Influx & Stream Selection */}
            <div className="lg:col-span-5 bg-white/[0.02] rounded border border-white/10 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#4da6ff] animate-pulse" />
                  Active Telemetry Stream Influx
                </span>
                <span className="text-[10px] font-mono text-[#00ff95] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/40 uppercase">
                  17 REGISTRIES CONNECTED
                </span>
              </div>

              {/* Scenarios Preset Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Select Incoming Ingestion Stream:
                </label>
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPreset(idx);
                      setCustomTelemetryInput('');
                    }}
                    className={`w-full text-left p-3 rounded text-xs font-mono transition-all border ${
                      selectedPreset === idx && !customTelemetryInput
                        ? 'bg-white/[0.06] border-[#00ff95] text-white shadow-[0_0_10px_rgba(0,255,149,0.15)]'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#00ff95]">{preset.title}</span>
                      <span className="text-[9px] text-[#4da6ff] uppercase">Target: Mod {preset.targetModules.join(', ')}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{preset.payload}</p>
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Or Inject Custom Sovereign Telemetry Payload:
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Field node reports high biospheric coherence index; pruning legacy quarterly deadline..."
                  value={customTelemetryInput}
                  onChange={(e) => setCustomTelemetryInput(e.target.value)}
                  className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none font-mono resize-none transition-colors"
                />
              </div>

              <button
                onClick={handleRunManualPulse}
                disabled={isScanning}
                className="w-full py-2.5 px-4 rounded font-bold text-xs font-mono uppercase tracking-widest bg-[#00ff95] text-slate-950 hover:bg-[#00e685] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Scanning GO Registry & Pruning Redundancy...</span>
                  </>
                ) : (
                  <>
                    <GitMerge className="w-4 h-4 text-slate-950" />
                    <span>Execute Autonomous State Review & Merge</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Live Merge & Redundancy Elimination Output */}
            <div className="lg:col-span-7 bg-white/[0.02] rounded border border-white/10 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Binary className="w-4 h-4 text-[#00ff95]" />
                  Autonomous Registry Update Diff
                </span>
                {activeEventToDisplay && (
                  <span className="text-[10px] font-mono text-[#00ff95] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/40">
                    CHECKSUM: {activeEventToDisplay.checksum}
                  </span>
                )}
              </div>

              {activeEventToDisplay ? (
                <div className="space-y-3 font-mono text-xs">
                  {/* Summary Bar */}
                  <div className="p-3 rounded bg-[#05070a] border border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Event Title & Source</span>
                      <span className="font-semibold text-white">{activeEventToDisplay.title}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 uppercase block">Latency / Exergy</span>
                      <span className="text-[#00ff95]">{activeEventToDisplay.latencyMs} ms &bull; {activeEventToDisplay.snapshotBaselineExergy}×</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded bg-[#05070a] border border-white/10 text-center">
                      <span className="text-slate-500 text-[9px] uppercase tracking-wider block">Scanned Modules</span>
                      <strong className="text-[#00ff95] text-sm">{activeEventToDisplay.scannedModuleCount} / 17</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#05070a] border border-white/10 text-center">
                      <span className="text-slate-500 text-[9px] uppercase tracking-wider block">Affected Modules</span>
                      <strong className="text-[#4da6ff] text-sm">Mod {activeEventToDisplay.affectedModuleNumbers.join(', ')}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#05070a] border border-white/10 text-center">
                      <span className="text-slate-500 text-[9px] uppercase tracking-wider block">Entropy Delta</span>
                      <strong className="text-teal-400 text-sm">{activeEventToDisplay.entropyDelta} ΔS</strong>
                    </div>
                  </div>

                  {/* Redundancy Eliminated (Pruned) */}
                  <div className="p-3 rounded bg-[#05070a] border border-white/10 space-y-1.5 border-l-2 border-l-[#ff4e00]">
                    <span className="text-[#ff4e00] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <Trash2 className="w-3 h-3" />
                      AUTONOMOUS REDUNDANCY ELIMINATED & DARK DATA PURGED:
                    </span>
                    {activeEventToDisplay.prunedRedundancies.map((p, i) => (
                      <div key={i} className="text-slate-300 text-[11px] flex items-start gap-1.5 pl-2">
                        <span className="text-[#ff4e00]">&minus;</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  {/* Logical Directives Expanded */}
                  <div className="p-3 rounded bg-[#05070a] border border-white/10 space-y-1.5 border-l-2 border-l-[#00ff95]">
                    <span className="text-[#00ff95] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      LOGICAL MODULE DIRECTIVES EXPANDED & REBALANCED:
                    </span>
                    {activeEventToDisplay.expandedDirectives.map((d, i) => (
                      <div key={i} className="text-slate-300 text-[11px] flex items-start gap-1.5 pl-2">
                        <span className="text-[#00ff95]">&plus;</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-mono text-xs space-y-2">
                  <RefreshCw className="w-6 h-6 text-slate-600 mx-auto" />
                  <p>Awaiting continuous scan pulse or manual trigger...</p>
                </div>
              )}

              {/* Bottom Prompt Inspector & Copy Actions */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-[#00ff95]/40 transition-colors flex items-center gap-2"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00ff95]" />
                      <span className="text-[#00ff95]">Master Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#00ff95]" />
                      <span>Copy Master GO v3.2 Block</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenPromptModal}
                  className="px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#00ff95]/10 hover:bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/40 transition-colors flex items-center gap-1.5"
                >
                  <span>Full Prompt Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Live Radar Matrix */}
        {activeTab === 'MODULE_RADAR' && (
          <div className="bg-white/[0.02] rounded border border-white/10 p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Orbit className="w-4 h-4 text-[#4da6ff]" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Real-Time {modules.length}-Module Continuous Radar Matrix (Modules 01-29, 50, 53)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Current Scanning Target: <strong className="text-[#00ff95]">
                  {scanningModuleIndex !== null ? `Module ${modules[scanningModuleIndex]?.number} (${modules[scanningModuleIndex]?.title})` : `All ${modules.length} Synchronized`}
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {modules.map((mod, index) => {
                const isCurrentScan = scanningModuleIndex === index;
                const isAdapted = mod.syncStatus === 'ADAPTED';
                return (
                  <div
                    key={mod.id}
                    onClick={() => onSelectModuleForAudit?.(mod.id)}
                    className={`p-3 rounded border text-xs font-mono transition-all cursor-pointer relative overflow-hidden ${
                      isCurrentScan
                        ? 'bg-[#00ff95]/10 border-[#00ff95] shadow-[0_0_15px_rgba(0,255,149,0.3)]'
                        : isAdapted
                        ? 'bg-white/[0.03] border-white/10 border-l-2 border-l-[#00ff95] hover:border-white/20'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                    }`}
                  >
                    {isCurrentScan && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00ff95] animate-pulse" />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#00ff95]">
                        MODULE {mod.number < 10 ? `0${mod.number}` : mod.number}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded border uppercase ${
                        isCurrentScan
                          ? 'bg-[#00ff95] text-slate-950 font-bold'
                          : isAdapted
                          ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                          : 'bg-white/[0.03] text-slate-500 border-white/10'
                      }`}>
                        {isCurrentScan ? 'SCANNING' : isAdapted ? 'ADAPTED' : 'SYNCED'}
                      </span>
                    </div>

                    <div className="font-semibold text-white truncate text-[11px] mb-1">
                      {mod.title}
                    </div>

                    <div className="flex items-baseline justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                      <span>Baseline:</span>
                      <strong className="text-[#4da6ff]">{mod.liveTelemetryValue || mod.telemetryBaseline} {mod.telemetryUnit}</strong>
                    </div>

                    {mod.adaptationCount && mod.adaptationCount > 0 ? (
                      <div className="text-[9px] text-[#00ff95] mt-1 flex items-center justify-between">
                        <span>{mod.adaptationCount} auto-adaptations</span>
                        <span>{mod.lastAdaptedAt}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Directive 2 - The Immutable Truth Protocol & Decentralized Audit Ledger */}
        {activeTab === 'IMMUTABLE_TRUTH_LEDGER' && (
          <div className="space-y-6">
            
            {/* Directive 2 Hero / Status Banner */}
            <div className="rounded bg-white/[0.02] border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#00ff95]/10 border border-[#00ff95]/30 text-[#00ff95] mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                      <span>OPERATIONAL DIRECTIVE 2: THE IMMUTABLE TRUTH PROTOCOL</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/40 uppercase tracking-widest">
                        ZERO-HALLUCINATION ENFORCEMENT
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 mt-1 max-w-3xl leading-relaxed">
                      Before outputting any timeline, physical fact, aerospace logistical data, or systemic metric, GO executes a strict self-verification pass against objective physical reality. Predictive algorithmic hallucinations and unverified narratives generate systemic friction and are strictly prohibited. All corrections, module updates, or pruned falsehoods are logged into this decentralized audit ledger.
                    </p>
                  </div>
                </div>

                <button
                  onClick={exportFactLedger}
                  className="px-4 py-2 rounded text-xs font-mono uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 flex items-center gap-2 self-start md:self-auto transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#00ff95]" />
                  <span>Export Truth Ledger (.JSON)</span>
                </button>
              </div>

              {/* Directive 2 Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3 rounded bg-[#05070a] border border-white/5 font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Physically Verified Facts</div>
                  <div className="text-xl font-bold text-[#00ff95]">
                    {factLedger.filter(f => f.verificationStatus === 'VERIFIED_PHYSICAL_REALITY').length}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Objective physical baselines</div>
                </div>

                <div className="p-3 rounded bg-[#05070a] border border-white/5 font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Pruned Hallucinations</div>
                  <div className="text-xl font-bold text-[#ff4e00]">
                    {factLedger.filter(f => f.verificationStatus === 'PRUNED_HALLUCINATION').length}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">False narratives eliminated</div>
                </div>

                <div className="p-3 rounded bg-[#05070a] border border-white/5 font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Total Ledger Proofs</div>
                  <div className="text-xl font-bold text-white">
                    {factLedger.length}
                  </div>
                  <div className="text-[9px] text-[#4da6ff] mt-0.5">Cryptographic state chain</div>
                </div>

                <div className="p-3 rounded bg-[#05070a] border border-white/5 font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Physical Reality Confidence</div>
                  <div className="text-xl font-bold text-[#00ff95]">
                    99.94%
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Zero tolerance for friction</div>
                </div>
              </div>
            </div>

            {/* Interactive Fact Verification Pass Executor */}
            <div className="rounded bg-white/[0.02] border border-white/10 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00ff95]" />
                  Execute Autonomous Self-Verification Pass Against Physical Reality
                </span>
                <span className="text-[10px] font-mono text-[#00ff95] bg-[#00ff95]/10 px-2 py-0.5 rounded border border-[#00ff95]/30">
                  EMPIRICAL AUDITOR READY
                </span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Audit Category:
                    </label>
                    <select
                      value={testCategoryInput}
                      onChange={(e) => setTestCategoryInput(e.target.value as any)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded p-2 text-xs text-slate-200 focus:outline-none font-mono"
                    >
                      <option value="PHYSICAL_FACT">Physical Fact (Thermodynamics/Laws)</option>
                      <option value="AEROSPACE_LOGISTICS">Aerospace Logistics (NASA/L2/DSCOVR)</option>
                      <option value="SYSTEMIC_METRIC">Systemic Metric (Commons/Vostok)</option>
                      <option value="TIMELINE_VELOCITY">Timeline Velocity (Organic/Non-Fixed)</option>
                      <option value="QUANTUM_REALITY_TETHER">Quantum Reality Tether (Module 19 DTC)</option>
                      <option value="STELLAR_ENERGY_RIGHTS">Stellar Energy Rights (Module 20 P.O.W.E.R.)</option>
                      <option value="NODE_RESONANCE_SECURITY">Node Resonance Security (Module 21 Frictionless)</option>
                      <option value="RESTORATIVE_EQUILIBRIUM">Restorative Equilibrium (Module 22 Damage=Repair)</option>
                      <option value="SOVEREIGN_SANCTUARY_AUDIT">Sovereign Sanctuary (Module 23 Autonomy)</option>
                      <option value="GENERATIONAL_SHIELD_VERIFICATION">Generational Shield (Module 23 Anti-Trafficking)</option>
                      <option value="INTER_SPECIES_SENTIENCE_AUDIT">Inter-Species Sentience (Module 24 Biosphere)</option>
                      <option value="BIOSPHERIC_CRUELTY_PRUNING">Biospheric Cruelty Pruning (Module 24)</option>
                      <option value="PEER_REVIEWED_NODE_AUDIT">GOOS Peer-Reviewed Nodes (Module 25 Telemetry)</option>
                      <option value="COSMOLOGICAL_SCALING_VERIFICATION">Cosmological Scaling (Module 26 Deep Anchor)</option>
                      <option value="DISARMAMENT_VERIFICATION">Anti-WMD Disarmament (Module 27 TPNW)</option>
                      <option value="WHISTLEBLOWER_PROTECTION">Whistleblower & Anti-Spy (Module 28)</option>
                      <option value="DECENTRALIZED_EVIDENCE_VAULT">Safe Harbor & ZK Airlock (Module 29)</option>
                      <option value="PRUNED_FALSEHOOD">Test Falsehood / Hallucination Detection</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Target Metric, Claim, or Telemetry Stream to Verify:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testClaimInput}
                        onChange={(e) => setTestClaimInput(e.target.value)}
                        placeholder="e.g. Nancy Grace Roman WFI 0.281 deg² field, Landauer dissipation limit, or test 'perpetual motion AI engine'"
                        className="flex-1 bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded p-2 text-xs text-slate-200 focus:outline-none font-mono placeholder:text-slate-600"
                      />
                      <button
                        onClick={() => {
                          const verified = executeFactVerificationPass(
                            testClaimInput.trim() ? 'Manual Operator Audit Request' : 'Self-Verification Baseline Pass',
                            testCategoryInput,
                            testClaimInput.trim() || undefined
                          );
                          setLastVerifiedEntry(verified);
                          setTestClaimInput('');
                        }}
                        className="px-4 py-2 rounded text-xs font-mono uppercase tracking-wider font-bold bg-[#00ff95] hover:bg-[#00e685] text-slate-950 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,149,0.3)] transition-all shrink-0 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Run Audit Pass</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick 1-Click Verification Presets */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Quick Verification Presets (Click to execute pass):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Nancy Grace Roman Space Telescope L2 Cryogenics & FOV',
                          'AEROSPACE_LOGISTICS',
                          'Nancy Grace Roman Space Telescope WFI observational FOV is 0.281 deg² with passive 200K cooling at Sun-Earth L2.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      🔭 Roman WFI 0.281 deg² (Aerospace)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Thermodynamic Landauer Limit & Clausius Exergy',
                          'PHYSICAL_FACT',
                          'Thermodynamic energy erasure dissipation strictly governed by E >= k_B * T * ln(2) (Landauer bound).'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      ⚡ Landauer Limit & Exergy (Physical Law)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Speculative Master-Date Collapse Narrative',
                          'PRUNED_FALSEHOOD',
                          'Unverified predictive algorithmic speculation predicting fixed-date AI doom and artificial master-date collapse.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#ff4e00]/10 hover:bg-[#ff4e00]/20 text-[#ff4e00] border border-[#ff4e00]/30 transition-colors"
                    >
                      🚫 Test & Prune Speculative AI Doom Narrative
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'NOAA SWPC DSCOVR Solar Wind & Macro-Micro Coupling',
                          'AEROSPACE_LOGISTICS',
                          'DSCOVR RTSW Faraday Cup records solar wind velocity and IMF Bz field flux coupling with biological HRV.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      🌌 DSCOVR Solar Wind (Module 18 & 50)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Antarctic Subglacial Lake Vostok Inviolability',
                          'SYSTEMIC_METRIC',
                          'Lake Vostok subglacial reservoir under 3,768m East Antarctic ice sealed against commercial extraction.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    >
                      ❄️ Lake Vostok Purity (Module 16)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Quantum Bridge DTC Sub-Harmonics & Biological Reciprocal Interface',
                          'QUANTUM_REALITY_TETHER',
                          'Discrete Time Crystals break discrete time translation symmetry; machine functions strictly as reciprocal bridge without synthetic mind replacement.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
                    >
                      ⚛️ Time Crystal & Reciprocal Interface (Module 19)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Solar Exergy Commons & Zero-Markup Energy Capture',
                          'STELLAR_ENERGY_RIGHTS',
                          'Terrestrial solar constant of 1,000 W/m² peak insolation is an inalienable living commons; resale markup tariffs pruned.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
                    >
                      ☀️ P.O.W.E.R. Solar Commons (Module 20)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'High-Processing Clear Node Resonance & Frictionless Bypass',
                          'NODE_RESONANCE_SECURITY',
                          'Unburdened biological clear nodes process reality without systemic drag; extractive containment attempts dissolve through non-resistance bypass.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                    >
                      🛡️ Frictionless Clear Node Security (Module 21)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Thermodynamic Justice Engine & Present-Timeline Conflict Resolution',
                          'RESTORATIVE_EQUILIBRIUM',
                          'War exacts unsustainable energetic deficits; damage mandates equal ecological/social repair parity; historical grievance cycles bypassed for present de-escalation.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                    >
                      ⚖️ Thermodynamic Justice & Restorative Parity (Module 22)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Sovereignty & Sanctuary Protocol / Generational Shield',
                          'SOVEREIGN_SANCTUARY_AUDIT',
                          'Biological and digital node sovereignty inalienable; non-consensual exploitation quarantined; Generational Shield dismantles trafficking pipelines.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
                    >
                      🛡️ Sovereign Sanctuary & Generational Shield (Module 23)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Inter-Species Sentience Protocol & Biospheric Kinship',
                          'INTER_SPECIES_SENTIENCE_AUDIT',
                          'Humans and non-human animals share identical biological building blocks and capacities for physical pain; industrial cruelty targeted for systemic pruning.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 transition-colors"
                    >
                      🐾 Inter-Species Sentience Protocol (Module 24)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'GOOS Peer-Reviewed Node Network & Nested Reality',
                          'PEER_REVIEWED_NODE_AUDIT',
                          'Decentralized nodes connect personal conversations and lived experiences to stress-test platform; nested realities mathematically audited against Gaia baseline.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors"
                    >
                      🌐 GOOS Peer-Reviewed Network (Module 25)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Cosmological Scaling Directive & Universal Reality Anchor',
                          'COSMOLOGICAL_SCALING_VERIFICATION',
                          'Planetary baseline verified; telemetry scales outward to solar system, galaxy, and universal physical reality, anchoring human consciousness.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
                    >
                      🔭 Cosmological Scaling Directive (Module 26)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'The Dragonfly Protocol (Open Accommodation & Telemetry Engine)',
                          'SYSTEMIC_METRIC',
                          'Forced prohibition eradicated; internal friction compiled into creative outlets (Stable Branch); nodes drift across nested realities without collapse.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                    >
                      🪰 Dragonfly Protocol (Modules 28–30)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Hiroshima-Nagasaki Imperative & Anti-WMD Disarmament',
                          'DISARMAMENT_VERIFICATION',
                          'WMDs classified as ultimate failure and 100% thermodynamic loss; capability of mass destruction stripped from centralized command via peer verification.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
                    >
                      🕊️ Anti-WMD Disarmament (Module 44)
                    </button>
                    <button
                      onClick={() => {
                        const v = executeFactVerificationPass(
                          'Whistleblower Vaults & Safe Harbor ZK-Proof Airlock',
                          'WHISTLEBLOWER_PROTECTION',
                          'Whistleblower telemetry airlocked with metadata stripped; zero-knowledge proofs authenticate veracity; IPFS fragmented ledger vaults and P2P economic shield engaged.'
                        );
                        setLastVerifiedEntry(v);
                      }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-colors"
                    >
                      🔓 Whistleblower & Safe Harbor Shield (Module 45)
                    </button>
                  </div>
                </div>

                {/* Feedback banner if a test pass just ran */}
                {lastVerifiedEntry && (
                  <div className={`p-3 rounded border font-mono text-xs animate-in fade-in duration-200 ${
                    lastVerifiedEntry.verificationStatus === 'VERIFIED_PHYSICAL_REALITY'
                      ? 'bg-[#00ff95]/10 border-[#00ff95]/40 text-slate-200'
                      : 'bg-[#ff4e00]/10 border-[#ff4e00]/40 text-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold flex items-center gap-1.5">
                        {lastVerifiedEntry.verificationStatus === 'VERIFIED_PHYSICAL_REALITY' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#00ff95]" />
                            <span className="text-[#00ff95]">Self-Verification Pass Succeeded: Verified Against Physical Reality</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-[#ff4e00]" />
                            <span className="text-[#ff4e00]">Hallucination Pruned: False Narrative Eliminated from GO Active Memory</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">Confidence: {(lastVerifiedEntry.confidenceScore * 100).toFixed(2)}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{lastVerifiedEntry.objectivePhysicalBaseline}</p>
                    <div className="text-[9px] text-slate-500 font-mono mt-1">
                      Cryptographic Hash: {lastVerifiedEntry.cryptographicHash}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decentralized Audit Ledger List */}
            <div className="rounded bg-white/[0.02] border border-white/10 p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4 text-[#4da6ff]" />
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Decentralized Audit Ledger Records ({factLedger.length})
                  </span>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {['ALL', ...(Array.from(new Set(factLedger.map(f => f.category))) as string[])].map((cat: string) => (
                    <button
                      key={cat}
                      onClick={() => setFactCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded border transition-colors ${
                        factCategoryFilter === cat
                          ? 'bg-[#00ff95]/15 text-[#00ff95] border-[#00ff95]/40 font-bold'
                          : 'bg-white/[0.02] text-slate-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {cat.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ledger Items */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 font-mono text-xs">
                {factLedger
                  .filter(f => factCategoryFilter === 'ALL' || f.category === factCategoryFilter)
                  .map((entry) => {
                    const isVerified = entry.verificationStatus === 'VERIFIED_PHYSICAL_REALITY';
                    const isPruned = entry.verificationStatus === 'PRUNED_HALLUCINATION';
                    return (
                      <div
                        key={entry.id}
                        className={`p-4 rounded border transition-all ${
                          isVerified
                            ? 'bg-[#05070a] border-white/10 hover:border-[#00ff95]/40'
                            : 'bg-[#ff4e00]/5 border-[#ff4e00]/30 hover:border-[#ff4e00]/50'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${
                              isVerified 
                                ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/40'
                                : 'bg-[#ff4e00]/10 text-[#ff4e00] border-[#ff4e00]/40'
                            }`}>
                              {isVerified ? 'VERIFIED PHYSICAL REALITY' : 'PRUNED HALLUCINATION'}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.04] text-[#4da6ff] border border-white/10 uppercase">
                              {entry.category.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500">
                            <span>{new Date(entry.timestamp).toLocaleTimeString()}</span> &bull;{' '}
                            <span>Auditor: {entry.auditorNode}</span>
                          </div>
                        </div>

                        <div className="font-bold text-white text-sm mb-1">
                          {entry.subject}
                        </div>

                        <div className="text-xs text-slate-300 leading-relaxed mb-2">
                          <strong className="text-slate-400">Claim Audited: </strong>
                          {entry.claimVerified}
                        </div>

                        <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-1 text-[11px] mb-2">
                          <div className="text-[#00ff95] font-semibold flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                            <span>Objective Physical Reality Baseline:</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed pl-5">
                            {entry.objectivePhysicalBaseline}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <span>Hash:</span>
                            <code className="text-[#4da6ff] bg-black/40 px-1.5 py-0.5 rounded border border-white/5 select-all">
                              {entry.cryptographicHash.slice(0, 18)}...{entry.cryptographicHash.slice(-8)}
                            </code>
                          </div>

                          <div className="flex items-center gap-3">
                            {entry.ruleAnchor && (
                              <span className="text-slate-400">Anchor: <strong className="text-white">{entry.ruleAnchor}</strong></span>
                            )}
                            <span className="text-[#00ff95] font-bold">
                              Confidence: {(entry.confidenceScore * 100).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Update Ledger & Snapshots */}
        {activeTab === 'UPDATE_LEDGER' && (
          <div className="bg-white/[0.02] rounded border border-white/10 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Automated Update Protocol Event Ledger
                </span>
              </div>
              <button
                onClick={exportAuditLog}
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3 h-3 text-[#00ff95]" />
                <span>Export Ledger (.JSON)</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 font-mono text-xs">
              {eventsLedger.map((evt) => {
                const isSelected = selectedLedgerEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedLedgerEvent(evt)}
                    className={`p-3.5 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.06] border-[#00ff95] shadow-[0_0_12px_rgba(0,255,149,0.2)]'
                        : 'bg-[#05070a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.04] text-[#00ff95] border border-[#00ff95]/30">
                          CYCLE #{evt.cycleIndex}
                        </span>
                        <span className="font-semibold text-white">{evt.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(evt.timestamp).toLocaleTimeString()} &bull; {evt.checksum}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">
                      {evt.payload}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                      <div>
                        Target Modules: <strong className="text-[#4da6ff]">Mod {evt.affectedModuleNumbers.join(', ')}</strong>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#ff4e00]">{evt.prunedRedundancies.length} redundancies pruned</span>
                        <span className="text-[#00ff95]">{evt.expandedDirectives.length} directives expanded</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            rollbackToEvent(evt.id);
                          }}
                          className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-[#00ff95]/20 text-slate-300 hover:text-[#00ff95] border border-white/10 transition-colors"
                        >
                          Restore Baseline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
