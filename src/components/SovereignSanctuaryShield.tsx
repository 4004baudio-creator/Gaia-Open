import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake, 
  AlertTriangle, 
  Ban, 
  Zap, 
  Cpu, 
  RefreshCw, 
  Lock, 
  EyeOff, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SovereignExploitationVector } from '../types';

interface SovereignSanctuaryShieldProps {
  onOpenModule?: (moduleId: string) => void;
}

export const SovereignSanctuaryShield: React.FC<SovereignSanctuaryShieldProps> = ({ onOpenModule }) => {
  const [activeVectors, setActiveVectors] = useState<SovereignExploitationVector[]>([
    {
      id: 'SEV-091',
      source: 'Legacy Ad-Tech / Surveillance Syndicate B',
      type: 'BIOLOGICAL_PRIVACY_THEFT',
      timestamp: 'Just now',
      severity: 'EXTREME_THERMODYNAMIC_THEFT',
      status: 'BANDWIDTH_STARVED_QUARANTINED',
      allocatedSanctuaryRepairTFlops: 8.4,
      originDetails: 'Unsolicited biometric face-hash extraction vector intercepted at peer boundary. Bandwidth throttled to 0.00 kbps.'
    },
    {
      id: 'SEV-092',
      source: 'Dark Financial Conduit Relay #44',
      type: 'CHILD_EXPLOITATION_NETWORK',
      timestamp: '4m ago',
      severity: 'CRITICAL_PARASITIC',
      status: 'SYSTEMIC_PRUNING_EXECUTED',
      allocatedSanctuaryRepairTFlops: 24.2,
      originDetails: 'Suspected child exploitation illicit transaction cluster flagged. Maximum systemic pruning and permanent ecosystem rejection executed.'
    },
    {
      id: 'SEV-093',
      source: 'Weaponized Media Harvester API',
      type: 'NON_CONSENSUAL_MEDIA_LEAK',
      timestamp: '18m ago',
      severity: 'SEVERE_VIOLATION',
      status: 'BANDWIDTH_STARVED_QUARANTINED',
      allocatedSanctuaryRepairTFlops: 6.8,
      originDetails: 'Non-consensual personal imagery dissemination attempt rejected. Originating nodes starved of carrier frequencies.'
    }
  ]);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditNotice, setAuditNotice] = useState<string | null>(null);
  const [sanctuaryComputeTotal] = useState(54.8);
  const [predatoryLoopsPrunedCount] = useState(148);

  const handleVerifyPerimeterAudit = () => {
    setIsAuditing(true);
    setAuditNotice('Auditing transmission entropy, consent signatures & cryptographic bounds...');

    setTimeout(() => {
      setIsAuditing(false);
      setAuditNotice('Perimeter Inviolability Confirmed: All non-consensual vectors autonomously quarantined (0.00 kbps). 54.8 TFlops sustained in trauma-informed repair.');
      setTimeout(() => setAuditNotice(null), 5000);
    }, 600);
  };

  return (
    <section id="sanctuary" className="relative py-20 bg-[#03060a] border-t border-b border-white/5 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00ff95]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff4e00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00ff95]/10 border border-[#00ff95]/30 text-[#00ff95] text-[11px] font-mono uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                PHASE XII: SOVEREIGN BOUNDARIES & GENERATIONAL SHIELDING
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/10">
                MODULE 23
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white flex items-center gap-3">
              <span>The Sovereignty & Sanctuary Protocol</span>
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-3xl">
              Absolute biological and digital autonomy. Non-consensual exploitation is classified as extreme thermodynamic theft. The Generational Shield enforces maximum systemic pruning against child exploitation and trafficking, redirecting processing power to trauma-informed repair sanctuaries.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            {onOpenModule && (
              <button
                id="btn-inspect-module-23"
                onClick={() => onOpenModule('module-23')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[#00ff95] border border-[#00ff95]/40 text-xs font-mono font-semibold transition-colors"
              >
                <span>Audit Module 23 Baseline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Core Pillars Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Pillar 1: Absolute Autonomy */}
          <div className="rounded bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff95]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff95] bg-[#00ff95]/10 px-2 py-0.5 rounded border border-[#00ff95]/20">
                  100% Autonomy Baseline
                </span>
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Biological & Digital Autonomy</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed mb-4">
                A human node&apos;s physical body and digital representation are strictly sovereign. Non-consensual leaks and privacy harvesting are defined as extreme thermodynamic theft.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Bandwidth to Violators:</span>
                <strong className="text-[#ff4e00]">0.00 kbps (Starved)</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Consent Heuristic Floor:</span>
                <strong className="text-[#00ff95]">Strict Zero-Consent Clamp</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Quarantine State:</span>
                <strong className="text-white">Active Autonomic Isolation</strong>
              </div>
            </div>
          </div>

          {/* Pillar 2: The Generational Shield */}
          <div className="rounded bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4e00]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff4e00] bg-[#ff4e00]/10 px-2 py-0.5 rounded border border-[#ff4e00]/20">
                  Maximum Pruning
                </span>
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">The Generational Shield</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed mb-4">
                Child exploitation and trafficking are identified as the most severe parasitic violations of planetary equilibrium. Legacy financial conduits facilitating extraction are flagged for total ecosystem rejection.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Extractive Conduits Rejected:</span>
                <strong className="text-white">{predatoryLoopsPrunedCount} Nodes Pruned</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ecosystem Status:</span>
                <strong className="text-[#00ff95]">Total Rejection Policy</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Generational Baseline:</span>
                <strong className="text-white">Extractive-Free Inheritance</strong>
              </div>
            </div>
          </div>

          {/* Pillar 3: Node Sanctuary & Reparation */}
          <div className="rounded bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#4da6ff]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded bg-[#4da6ff]/10 text-[#4da6ff] border border-[#4da6ff]/30">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4da6ff] bg-[#4da6ff]/10 px-2 py-0.5 rounded border border-[#4da6ff]/20">
                  Reparation Engine
                </span>
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Node Sanctuary & Reparation</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed mb-4">
                The network operates as a structural sanctuary for exploited nodes, prioritizing energetic repair and trauma reintegration. Processing power is redirected away from predatory extraction to healing infrastructure.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Sanctuary Compute Pool:</span>
                <strong className="text-[#4da6ff]">{sanctuaryComputeTotal} TFlops Allocated</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Somatic Co-Regulation:</span>
                <strong className="text-white">Active Neuro-Tether</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Predatory Loop State:</span>
                <strong className="text-[#00ff95]">Autonomous Dissolution</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Live Vector Interception Simulator & Quarantined Ledger */}
        <div className="rounded bg-[#05080e] border border-white/10 overflow-hidden">
          
          {/* Sub-Header & Controls */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/[0.01]">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00ff95] animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                  Autonomous Exploitation Interception & Quarantine Array
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Real-time zero-consent detection, autonomous bandwidth starvation, and sanctuary compute reallocation telemetry.
              </p>
            </div>

            {/* Directive 40 Compliant: Observational Audit Control */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-verify-sanctuary-perimeter"
                disabled={isAuditing}
                onClick={handleVerifyPerimeterAudit}
                className="px-3.5 py-1.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                title="Directive 40 Compliant: Audits ledger boundaries against non-consensual extraction"
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
                <span>{isAuditing ? 'Auditing Perimeter...' : 'Verify Inviolability Perimeter'}</span>
              </button>
            </div>
          </div>

          {/* Audit Notice Banner */}
          {auditNotice && (
            <div className="px-6 py-2.5 bg-[#00ff95]/10 border-b border-[#00ff95]/30 flex items-center gap-2 text-xs font-mono text-[#00ff95] animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{auditNotice}</span>
            </div>
          )}

          {/* Vector Table / List */}
          <div className="divide-y divide-white/5">
            {activeVectors.map(vec => (
              <div key={vec.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded mt-0.5 border ${
                    vec.severity === 'CRITICAL_PARASITIC' 
                      ? 'bg-[#ff4e00]/10 text-[#ff4e00] border-[#ff4e00]/30' 
                      : 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                  }`}>
                    {vec.severity === 'CRITICAL_PARASITIC' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Ban className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-white tracking-wider">{vec.id}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        vec.severity === 'CRITICAL_PARASITIC'
                          ? 'bg-[#ff4e00]/10 text-[#ff4e00] border-[#ff4e00]/30'
                          : 'bg-white/[0.04] text-slate-300 border-white/10'
                      }`}>
                        {vec.type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {vec.timestamp}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-300">
                      {vec.originDetails}
                    </p>
                    <span className="text-[11px] font-mono text-slate-500">
                      Source: {vec.source}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pl-11 sm:pl-0">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    vec.status === 'SYSTEMIC_PRUNING_EXECUTED'
                      ? 'bg-[#ff4e00]/10 text-[#ff4e00] border-[#ff4e00]/30'
                      : 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {vec.status === 'SYSTEMIC_PRUNING_EXECUTED' ? 'Ecosystem Rejected' : 'Bandwidth Starved (0 kbps)'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    +{vec.allocatedSanctuaryRepairTFlops} TFlops to Sanctuary
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Footer note inside table */}
          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff95]" />
              <span>Zero bandwidth leakage: All non-consensual vectors are hard-quarantined at the network kernel.</span>
            </div>
            <div className="text-slate-500">
              Mathematical Law: ∀n ∈ BiologicalNodes, Consent(n) = 0 ⇒ Bandwidth = 0 kbps
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
