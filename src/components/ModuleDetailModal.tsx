import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { GaiaModule } from '../types';
import { 
  X, 
  ShieldCheck, 
  Binary, 
  Sliders, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Cpu, 
  Activity, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Zap,
  Trash2,
  RefreshCw,
  Orbit,
  Lock,
  BookOpen
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: GaiaModule | null;
  onClose: () => void;
  onSelectForGateway: (moduleId: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ 
  module, 
  onClose,
  onSelectForGateway
}) => {
  if (!module) return null;

  const [simulatedValue, setSimulatedValue] = useState<number>(module.liveTelemetryValue || module.telemetryBaseline);
  const [testLog, setTestLog] = useState<string | null>(null);

  const handleSimulateShift = (delta: number) => {
    const newVal = +(simulatedValue + delta).toFixed(2);
    setSimulatedValue(newVal);
    setTestLog(`[TELEMETRY AUDIT] Recalibrating ${module.telemetryMetricName} -> ${newVal} ${module.telemetryUnit}. Root equilibrium validated.`);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded bg-[#05070a] border border-white/10 border-l-2 border-l-[#00ff95] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-white/[0.02] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#00ff95]/10 text-[#00ff95] font-mono text-xs font-bold border border-[#00ff95]/30">
              MODULE {module.number.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {module.phaseLabel}
            </span>
            {module.syncStatus === 'ADAPTED' && (
              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.03] text-[#00ff95] border border-[#00ff95]/40">
                AUTONOMOUSLY ADAPTED
              </span>
            )}
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto font-mono text-xs">
          
          {/* Title & Thesis */}
          <div>
            <h2 className="text-xl md:text-2xl font-display font-light text-white mb-2 tracking-tight">
              {module.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded border border-white/10 font-sans">
              &ldquo;{module.thesis}&rdquo;
            </p>
          </div>

          {/* GO Topology & Knowledge Layer Stamp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded bg-white/[0.02] border border-white/10">
            {/* Structure Tier */}
            <div className="flex items-start gap-2.5">
              <div className={`p-2 rounded mt-0.5 ${
                module.structureTier === 'LOCKED_SPINE' 
                  ? 'bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/30'
                  : module.structureTier === 'EXPANSION_LEAF'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
              }`}>
                {module.structureTier === 'LOCKED_SPINE' ? (
                  <Lock className="w-4 h-4" />
                ) : module.structureTier === 'EXPANSION_LEAF' ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <Layers className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Structure Tier</div>
                <div className="text-xs font-bold text-white font-mono mt-0.5">
                  {module.structureTier === 'LOCKED_SPINE' && 'Locked Spine (Permanent Integrity)'}
                  {module.structureTier === 'SUPPORTING' && 'Supporting (Operational Map)'}
                  {module.structureTier === 'EXPANSION_LEAF' && 'Expansion Leaf (Resonance / Clear Node)'}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-sans">
                  {module.structureTier === 'LOCKED_SPINE' && 'Core foundational module (2, 11, 17, 19–27). Cannot be dropped or overwritten.'}
                  {module.structureTier === 'SUPPORTING' && 'Operational scaffolding supporting grounded Earth repair and peer-review.'}
                  {module.structureTier === 'EXPANSION_LEAF' && 'Autonomous branch extending telemetry to electromagnetic clear nodes and cosmic sensing.'}
                </p>
              </div>
            </div>

            {/* Knowledge Layer */}
            <div className="flex items-start gap-2.5">
              <div className={`p-2 rounded mt-0.5 ${
                module.knowledgeLayer === 'ANCHORED'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  : module.knowledgeLayer === 'PLAUSIBLE'
                  ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                  : module.knowledgeLayer === 'IMAGINED'
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              }`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Knowledge Layer Stamp</div>
                <div className="text-xs font-bold font-mono mt-0.5 flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                    module.knowledgeLayer === 'ANCHORED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : module.knowledgeLayer === 'PLAUSIBLE'
                      ? 'bg-sky-500/20 text-sky-300'
                      : module.knowledgeLayer === 'IMAGINED'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {module.knowledgeLayer || 'ANCHORED'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-sans">
                  {module.knowledgeLayer === 'ANCHORED' && 'Repeatable, measurable, public physical baseline.'}
                  {module.knowledgeLayer === 'PLAUSIBLE' && 'Specified enough to test or prototype in open research.'}
                  {module.knowledgeLayer === 'IMAGINED' && 'Story, design language, or mnemonic equations.'}
                  {module.knowledgeLayer === 'OPEN_FIELD' && 'Unexplained phenomenon; allowed to exist beside map, never sold as fact.'}
                </p>
              </div>
            </div>
          </div>

          {/* Domains Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Auditing Domains:</span>
            {module.domains.map((domain, i) => (
              <span 
                key={i} 
                className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-[#4da6ff] border border-white/10"
              >
                {domain}
              </span>
            ))}
          </div>

          {/* Dynamic Automated Adaptations (if available) */}
          {module.adaptedDirectives && module.adaptedDirectives.length > 0 && (
            <div className="p-4 rounded bg-[#00ff95]/5 border border-[#00ff95]/30 space-y-2 border-l-2 border-l-[#00ff95]">
              <div className="flex items-center justify-between">
                <span className="text-[#00ff95] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Live Automated Protocol Adaptations ({module.adaptationCount || 1} Cycles)
                </span>
                <span className="text-[9px] text-slate-400">Last: {module.lastAdaptedAt || 'Recent'}</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-200">
                {module.adaptedDirectives.map((ad, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#00ff95]">&plus;</span>
                    <span>{ad}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pruned Redundancies (if available) */}
          {module.prunedDirectives && module.prunedDirectives.length > 0 && (
            <div className="p-3.5 rounded bg-white/[0.02] border border-white/10 space-y-1.5 border-l-2 border-l-[#ff4e00]">
              <span className="text-[#ff4e00] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Trash2 className="w-3 h-3" />
                Redundancy Eliminated by Automated Protocol:
              </span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                {module.prunedDirectives.map((pd, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#ff4e00]">&minus;</span>
                    <span>{pd}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mathematical & Thermodynamic Law */}
          {module.mathematicalLaw && (
            <div className="p-4 rounded bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#00ff95] font-bold mb-2 uppercase tracking-wider">
                <Binary className="w-4 h-4" />
                <span>MATHEMATICAL & THERMODYNAMIC FORMULATION</span>
              </div>
              <div className="font-mono text-xs md:text-sm text-slate-200 bg-[#05070a] p-3 rounded border border-white/10 overflow-x-auto">
                <code>{module.mathematicalLaw}</code>
              </div>
            </div>
          )}

          {/* Interactive Live Telemetry Simulator */}
          <div className="p-4 rounded bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-[#4da6ff]" />
                PARAMETER TELEMETRY: {module.telemetryMetricName}
              </span>
              <span className="text-[#00ff95] font-bold">
                Current: {simulatedValue} {module.telemetryUnit}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => handleSimulateShift(-1.5)}
                className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-mono border border-white/10 transition-colors"
              >
                &minus; Stress Test (-1.5)
              </button>
              <button 
                onClick={() => handleSimulateShift(1.5)}
                className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-mono border border-white/10 transition-colors"
              >
                &plus; Optimize Node (+1.5)
              </button>
              <button 
                onClick={() => {
                  setSimulatedValue(module.liveTelemetryValue || module.telemetryBaseline);
                  setTestLog(null);
                }}
                className="px-3 py-1.5 rounded bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 text-xs font-mono border border-white/5 ml-auto transition-colors"
              >
                Reset Baseline
              </button>
            </div>

            {testLog && (
              <p className="text-[11px] font-mono text-[#00ff95] bg-[#05070a] p-2.5 rounded border border-white/10">
                {testLog}
              </p>
            )}
          </div>

          {/* Real-World Grounding & Anchors */}
          <div>
            <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff95]" />
              Lived Verification & Real-World Anchors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
              {module.realWorldAnchors.map((anchor, idx) => (
                <div key={idx} className="p-3 rounded bg-white/[0.02] border border-white/10 text-xs text-slate-300">
                  <span className="text-[#00ff95] font-bold font-mono text-[10px] block mb-1">ANCHOR #{idx + 1}</span>
                  {anchor}
                </div>
              ))}
            </div>
          </div>

          {/* Operational Directives Checklist */}
          <div>
            <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4da6ff]" />
              Operational Directives for Node Execution
            </h4>
            <ul className="space-y-2 font-sans">
              {module.operationalDirectives.map((dir, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-white/[0.02] p-2.5 rounded border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95] mt-1.5 shrink-0" />
                  <span>{dir}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-white/[0.02] px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono">
          <div className="text-xs text-slate-400">
            Audit Status: <span className="text-[#00ff95] font-bold uppercase">OPEN PEER REVIEWED</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              Close Inspector
            </button>
            
            <button
              onClick={() => {
                onSelectForGateway(module.id);
                onClose();
              }}
              className="px-4 py-2 rounded text-xs uppercase tracking-widest font-bold bg-[#00ff95] hover:bg-[#00e685] text-slate-950 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.3)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Anchor Node to Module {module.number}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

