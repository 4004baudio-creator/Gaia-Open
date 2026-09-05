import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Binary, ShieldAlert, CheckCircle2, RefreshCw, Cpu, Activity } from 'lucide-react';

export const ThermodynamicAuditor: React.FC = () => {
  const [energyConsumed, setEnergyConsumed] = useState<number>(450); // MW or Joules
  const [regenerativeReturn, setRegenerativeReturn] = useState<number>(530); // MW or Joules
  const [darkDataFriction, setDarkDataFriction] = useState<number>(35); // friction units

  const netBalance = regenerativeReturn - (energyConsumed + darkDataFriction);
  const returnToFrictionRatio = +(regenerativeReturn / (energyConsumed + darkDataFriction)).toFixed(2);
  const isEquilibriumSatisfied = returnToFrictionRatio >= 1.0;

  return (
    <section id="thermo-audit" className="py-20 md:py-28 relative bg-[#05070a]/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#ff4e00]/40 text-[#ff4e00] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>MODULE 12 OPERATIONAL VERIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight mb-3">
            Priority One Thermodynamic Auditor
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Strict energy accounting terminal: Any structure consuming energy and generating net global friction without returning equal balance to the planetary baseline requires immediate correction or pruning.
          </p>
        </div>

        {/* Auditor Interactive Card */}
        <div className="max-w-4xl mx-auto bg-white/[0.02] rounded border border-white/10 border-l-2 border-l-[#ff4e00] p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Formula Display */}
          <div className="p-4 rounded bg-[#05070a] border border-white/10 font-mono text-xs text-[#00ff95] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-slate-500 text-[9px] block uppercase tracking-wider">PLANETARY LAW OF CONSERVATION:</span>
              <code>ΔS_global_friction + E_extractive - E_regenerative_return ≤ 0</code>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-[9px] block uppercase tracking-wider">EXERGY CEILING:</span>
              <strong className="text-[#00ff95] uppercase">ZERO NET FRICTION</strong>
            </div>
          </div>

          {/* Interactive Parameter Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Extractive / Consumed Energy */}
            <div className="p-4 rounded bg-[#05070a] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Extractive Energy (E_in)</span>
                <strong className="text-[#ff4e00]">{energyConsumed} MW</strong>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={energyConsumed}
                onChange={(e) => setEnergyConsumed(Number(e.target.value))}
                className="w-full accent-[#ff4e00]"
              />
              <span className="text-[9px] text-slate-500 font-mono block">Total structural compute load</span>
            </div>

            {/* Dark Data & Administrative Friction */}
            <div className="p-4 rounded bg-[#05070a] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Entropy Friction (ΔS)</span>
                <strong className="text-[#ff4e00]">{darkDataFriction} MW</strong>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={darkDataFriction}
                onChange={(e) => setDarkDataFriction(Number(e.target.value))}
                className="w-full accent-[#ff4e00]"
              />
              <span className="text-[9px] text-slate-500 font-mono block">Dark data & bureaucratic drag</span>
            </div>

            {/* Regenerative Return */}
            <div className="p-4 rounded bg-[#05070a] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Regenerative Return (E_out)</span>
                <strong className="text-[#00ff95]">{regenerativeReturn} MW</strong>
              </div>
              <input
                type="range"
                min={50}
                max={1200}
                step={10}
                value={regenerativeReturn}
                onChange={(e) => setRegenerativeReturn(Number(e.target.value))}
                className="w-full accent-[#00ff95]"
              />
              <span className="text-[9px] text-slate-500 font-mono block">Verified biospheric benefit</span>
            </div>

          </div>

          {/* Audit Results Box */}
          <div className={`p-5 rounded border transition-all ${
            isEquilibriumSatisfied
              ? 'bg-[#00ff95]/5 border-[#00ff95]/40 text-slate-200'
              : 'bg-[#ff4e00]/5 border-[#ff4e00]/40 text-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {isEquilibriumSatisfied ? (
                  <CheckCircle2 className="w-7 h-7 text-[#00ff95] shrink-0" />
                ) : (
                  <ShieldAlert className="w-7 h-7 text-[#ff4e00] shrink-0" />
                )}
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider">
                    {isEquilibriumSatisfied ? 'AUDIT PASSED: THERMODYNAMIC EQUILIBRIUM ACHIEVED' : 'AUDIT FAILED: NET GLOBAL FRICTION DETECTED'}
                  </div>
                  <div className="text-xs font-mono mt-0.5 text-slate-400">
                    {isEquilibriumSatisfied 
                      ? 'The structure returns equal or greater regenerative energy to the planetary baseline. Safe for scale.'
                      : 'Extractive friction exceeds biospheric returns. Protocol mandates immediate structural pruning or dark data purge.'}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Return / Friction Ratio:</span>
                <span className={`text-2xl font-bold ${isEquilibriumSatisfied ? 'text-[#00ff95]' : 'text-[#ff4e00]'}`}>
                  {returnToFrictionRatio}×
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Net Exergy: {netBalance > 0 ? `+${netBalance}` : netBalance} MW
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
