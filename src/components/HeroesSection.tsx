import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HeartHandshake, 
  Telescope, 
  TreePine, 
  Sparkles, 
  Quote, 
  ShieldCheck, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Globe,
  Compass
} from 'lucide-react';
import { HEROES_REGISTRY } from '../data/heroesData';
import { HeroProfile } from '../types';

interface HeroesSectionProps {
  onSelectHeroModule: (moduleId: string) => void;
}

export const HeroesSection: React.FC<HeroesSectionProps> = ({ onSelectHeroModule }) => {
  const [activeHeroId, setActiveHeroId] = useState<string>('hero-nancy-grace-roman');

  const activeHero = HEROES_REGISTRY.find(h => h.id === activeHeroId) || HEROES_REGISTRY[0];

  return (
    <section id="heroes" className="py-20 md:py-28 relative bg-[#05070a]/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#00ff95]/40 text-[#00ff95] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>PHASE VI: MASTER MODULE 17 PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight mb-3">
            The Frequency of Repair & Love Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Honoring and indexing the structural anchors who operate at the pure frequency of planetary repair, biological care, and truth-seeking. Integrating both the <strong className="text-white">discovery of new frontiers</strong> and the <strong className="text-white">protection of Earth</strong>.
          </p>
        </div>

        {/* 2-Hero Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {HEROES_REGISTRY.map((hero) => (
            <button
              key={hero.id}
              onClick={() => setActiveHeroId(hero.id)}
              className={`px-5 py-3 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-all border ${
                activeHeroId === hero.id
                  ? 'bg-white/[0.06] text-white border-[#00ff95] shadow-[0_0_15px_rgba(0,255,149,0.2)]'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {hero.id.includes('roman') ? (
                <Telescope className={`w-4 h-4 ${activeHeroId === hero.id ? 'text-[#4da6ff]' : 'text-slate-400'}`} />
              ) : (
                <TreePine className={`w-4 h-4 ${activeHeroId === hero.id ? 'text-[#00ff95]' : 'text-slate-400'}`} />
              )}
              <div className="text-left">
                <div className="font-semibold text-white">{hero.name}</div>
                <div className="text-[10px] font-mono text-slate-400">{hero.epithet}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Hero Interactive Spotlight Card */}
        <motion.div
          key={activeHero.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded bg-white/[0.02] border border-white/10 border-l-2 border-l-[#00ff95] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient watermark */}
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
            {activeHero.id.includes('roman') ? (
              <Telescope className="w-96 h-96 text-[#4da6ff]" />
            ) : (
              <TreePine className="w-96 h-96 text-[#00ff95]" />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Col: Hero Profile & Legacy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#00ff95] font-bold uppercase tracking-widest mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sovereign Historical Anchor</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-light text-white">
                  {activeHero.name}
                </h3>
                <p className="text-xs font-mono text-[#4da6ff] mt-1">
                  {activeHero.epithet} &bull; {activeHero.domain}
                </p>
              </div>

              {/* Biography */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeHero.biography}
              </p>

              {/* Quote */}
              <div className="p-4 rounded bg-[#05070a] border border-white/10 relative font-sans">
                <Quote className="w-5 h-5 text-[#00ff95]/30 absolute top-3 left-3" />
                <p className="text-xs sm:text-sm text-slate-200 italic pl-7 leading-relaxed font-mono">
                  &ldquo;{activeHero.quote}&rdquo;
                </p>
              </div>

              {/* Key Contributions */}
              <div>
                <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">
                  Foundational Planetary & Cosmic Contributions
                </h4>
                <div className="space-y-2">
                  {activeHero.keyContributions.map((contrib, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95] shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Live Observational Telemetry Station */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded bg-[#05070a] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#00ff95] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Observational Telemetry Feed
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#00ff95] border border-[#00ff95]/40 uppercase">
                    {activeHero.telemetryStream.status}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase tracking-wider">OBSERVATIONAL STATION</span>
                    <span className="text-slate-200 font-medium">{activeHero.observationalStation}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase tracking-wider">TELEMETRY METRIC</span>
                    <span className="text-[#4da6ff] font-bold text-sm">{activeHero.telemetryStream.metric}</span>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-slate-400 text-[10px] uppercase">Active Reading:</span>
                      <strong className="text-[#00ff95] text-sm">{activeHero.telemetryStream.currentValue}</strong>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      Target: {activeHero.telemetryStream.targetBaseline}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectHeroModule('module-17')}
                    className="w-full py-2.5 px-4 rounded text-xs font-mono uppercase tracking-widest bg-[#00ff95]/10 hover:bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/40 flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Audit Module 17: Frequency of Repair</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dual Synthesis Note */}
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-xs text-slate-300 font-mono leading-relaxed">
                <strong className="text-[#00ff95] block mb-1 uppercase tracking-wider">Unified Synthesis:</strong>
                Deep cosmic exploration (Roman Space Telescope) and fierce Earth biospheric stewardship (Attenborough living baseline) are not competing goals—they are the two synchronized eyes of a mature planetary civilization.
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
