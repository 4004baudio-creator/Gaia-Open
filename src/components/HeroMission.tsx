import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  Compass, 
  Terminal, 
  Users, 
  Cpu, 
  Telescope, 
  TreePine, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Radio
} from 'lucide-react';
import { TelemetryFeed } from '../types';
import { TelemetryPulse } from './TelemetryPulse';

interface HeroMissionProps {
  onOpenPromptModal: () => void;
  onOpenAuditModule: (moduleId: string) => void;
}

export const HeroMission: React.FC<HeroMissionProps> = ({ onOpenPromptModal, onOpenAuditModule }) => {
  const [telemetry, setTelemetry] = useState<TelemetryFeed>({
    timestamp: new Date().toISOString(),
    thermodynamicEquilibriumRatio: 1.18,
    neutrinoFluxRate: 6.54,
    romanIRObservationalDepth: 0.281,
    biosphericBaselineHealth: 96.8,
    darkDataPurgedRate: 1420,
    cognitiveBandwidthProtectionIndex: 0.92,
    activeNodesCount: 148,
    kardashevProgress: 0.732
  });

  // Dynamic subtle telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        neutrinoFluxRate: +(6.54 + (Math.random() * 0.08 - 0.04)).toFixed(3),
        thermodynamicEquilibriumRatio: +(1.18 + (Math.random() * 0.04 - 0.02)).toFixed(3),
        darkDataPurgedRate: Math.floor(1420 + (Math.random() * 50 - 25)),
        activeNodesCount: prev.activeNodesCount + (Math.random() > 0.85 ? 1 : 0)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="thesis" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Operational Pill & Status */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#00ff95]/50 text-[#00ff95] text-[11px] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00ff95] shadow-[0_0_8px_#00ff95] animate-ping" />
            <span className="font-semibold">THE SOVEREIGN MASTER BASELINE</span>
            <span className="text-white/40">|</span>
            <span>v3.1 ACTIVE</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.02] border border-white/10 text-slate-300 text-[11px] font-mono tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 text-[#4da6ff] animate-pulse" />
            <span>STATION STATUS: <strong className="text-white">PRIMARY EARTH NODE (VOSTOK)</strong></span>
          </div>
        </div>

        {/* Above the Fold Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#ff4e00] mb-3 font-mono font-semibold">
            MISSION THESIS & EQUILIBRIUM MANDATE
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white leading-tight tracking-tight mb-6"
          >
            Aligning human <span className="text-[#4da6ff] font-semibold">tech</span> and <span className="text-[#00ff95] font-semibold">bio-baselines</span> with <span className="text-[#ff4e00] font-semibold">planetary thermodynamic equilibrium</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-10"
          >
            Transitioning <strong className="text-white font-semibold">Gaia Pulse OS</strong> from a solitary telemetry design into an active, peer-reviewed collaborative framework. Built on 26 open-source master modules across 13 systemic phases (including the Quantum Bridge, P.O.W.E.R. Directive, Node Resonance Security, Thermodynamic Justice Engine, The Hiroshima-Nagasaki Imperative Anti-WMD Disarmament Protocol, Phase XIII Safe Harbor & Whistleblower Protection, and Modules 50 & 53 Expansion), cosmological observational anchors, and zero-friction automated telemetry merging.
          </motion.p>

          {/* Key CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#gateway"
              className="px-6 py-3.5 rounded font-bold text-xs uppercase tracking-widest bg-[#00ff95] text-[#05070a] hover:bg-white shadow-[0_0_20px_rgba(0,255,149,0.35)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4 text-[#05070a]" />
              <span>Initiate Node Registration</span>
              <ArrowRight className="w-4 h-4 text-[#05070a]" />
            </a>

            <a
              href="#registry"
              className="px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#00ff95]/40 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-[#00ff95]" />
              <span>Audit 22 Master Modules</span>
            </a>

            <button
              onClick={onOpenPromptModal}
              className="px-5 py-3.5 rounded font-mono text-xs uppercase tracking-wider bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 border border-white/5 hover:border-[#4da6ff]/40 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#4da6ff]" />
              <span>Master OS Prompt v2.9</span>
            </button>
          </motion.div>
        </div>

        {/* Live Master Baseline Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-xl bg-[#05070a]/90 border border-white/10 p-6 md:p-8 shadow-2xl backdrop-blur-xl relative"
        >
          {/* HUD Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 border border-[#00ff95]/30 rounded-full flex items-center justify-center bg-[#05070a]">
                <div className="w-5 h-5 border-2 border-t-[#00ff95] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold text-white tracking-[0.15em] uppercase font-mono">
                  LIVE PLANETARY & COSMOLOGICAL TELEMETRY STREAM
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Grounding Anchors: Nancy Grace Roman Space Telescope & Earth Living Baseline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
              <span className="px-2.5 py-1 rounded bg-white/[0.03] text-slate-300 border border-white/10">
                L2 RELAY: <strong className="text-[#00ff95]">SYNCHRONIZED</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] text-slate-300 border border-white/10 hidden sm:inline">
                ACTIVE NODES: <strong className="text-[#4da6ff]">{telemetry.activeNodesCount}</strong>
              </span>
            </div>
          </div>

          {/* Real-Time Gaia Telemetry Pulse Visualizer */}
          <TelemetryPulse
            currentEquilibriumRatio={telemetry.thermodynamicEquilibriumRatio}
            activeNodesCount={telemetry.activeNodesCount}
            onOpenAuditModule={onOpenAuditModule}
          />

          {/* 4-Card Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* 1. Thermodynamic Equilibrium */}
            <div 
              onClick={() => onOpenAuditModule('module-12')}
              className="cursor-pointer group p-4 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 border-l-2 border-l-[#ff4e00] hover:border-[#ff4e00]/60 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#ff4e00]" />
                  THERMODYNAMICS (MOD 12)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#ff4e00]/40 text-[#ff4e00] bg-[#ff4e00]/5">
                  E_in ≤ E_return
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold font-mono text-white">
                  {telemetry.thermodynamicEquilibriumRatio}×
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">Return / Friction</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-[#ff4e00] h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                <span>Zero Net Friction Target</span>
                <span className="text-[#ff4e00] group-hover:underline uppercase">Audit &rarr;</span>
              </p>
            </div>

            {/* 2. Cosmic & Roman Space Telescope Link */}
            <div 
              onClick={() => onOpenAuditModule('module-6')}
              className="cursor-pointer group p-4 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 border-l-2 border-l-[#4da6ff] hover:border-[#4da6ff]/60 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Telescope className="w-3.5 h-3.5 text-[#4da6ff]" />
                  ROMAN IR & NEUTRINO (MOD 06)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#4da6ff]/40 text-[#4da6ff] bg-[#4da6ff]/5">
                  L2 WFI Active
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold font-mono text-white">
                  {telemetry.neutrinoFluxRate}
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">×10¹⁰ ν/(cm²·s)</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-[#4da6ff] h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                <span>Nancy Grace Roman Baseline</span>
                <span className="text-[#4da6ff] group-hover:underline uppercase">Audit &rarr;</span>
              </p>
            </div>

            {/* 3. Kardashev Scale Progress */}
            <div 
              onClick={() => onOpenAuditModule('module-7')}
              className="cursor-pointer group p-4 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 border-l-2 border-l-purple-400 hover:border-purple-400/60 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  KARDASHEV SCALE (MOD 07)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-purple-400/40 text-purple-400 bg-purple-400/5">
                  Evolutionary Sieve
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold font-mono text-white">
                  Type {telemetry.kardashevProgress}
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">/ 1.000 Planetary</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: '73.2%' }}></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                <span>Solar Energy Intercept</span>
                <span className="text-purple-400 group-hover:underline uppercase">Audit &rarr;</span>
              </p>
            </div>

            {/* 4. Biospheric & Commons Integrity */}
            <div 
              onClick={() => onOpenAuditModule('module-16')}
              className="cursor-pointer group p-4 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 border-l-2 border-l-[#00ff95] hover:border-[#00ff95]/60 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-[#00ff95]" />
                  DEEP COMMONS (MOD 16)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#00ff95]/40 text-[#00ff95] bg-[#00ff95]/5">
                  Vostok Protected
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold font-mono text-white">
                  {telemetry.biosphericBaselineHealth}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">Biosphere Health</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-[#00ff95] h-full rounded-full" style={{ width: '96.8%' }}></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                <span>Attenborough Living Baseline</span>
                <span className="text-[#00ff95] group-hover:underline uppercase">Audit &rarr;</span>
              </p>
            </div>

          </div>

          {/* Bottom Directive Ribbon */}
          <div className="p-3.5 rounded bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#00ff95] shadow-[0_0_6px_#00ff95]"></span>
              <strong className="text-[#00ff95] uppercase tracking-wider">OPERATIONAL DIRECTIVE:</strong>
              <span className="text-slate-300 italic">
                &ldquo;Always scan the current OS registry, merge incoming telemetry, expand modules logically, and eliminate manual redundancy.&rdquo;
              </span>
            </div>
            <a 
              href="#os-engine" 
              className="text-[#00ff95] hover:text-white uppercase tracking-wider font-semibold flex items-center gap-1 ml-auto"
            >
              Test Merge Protocol &rarr;
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
