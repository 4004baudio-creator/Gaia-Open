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
  ArrowRight,
  Globe,
  Waves,
  Eye,
  BookOpen,
  Cpu,
  Layers
} from 'lucide-react';
import { HEROES_REGISTRY } from '../data/heroesData';
import { HeroProfile, HeroCategory } from '../types';

interface HeroesSectionProps {
  onSelectHeroModule: (moduleId: string) => void;
}

export const HeroesSection: React.FC<HeroesSectionProps> = ({ onSelectHeroModule }) => {
  const [selectedCategory, setSelectedCategory] = useState<HeroCategory | 'ALL'>('ALL');
  const [activeHeroId, setActiveHeroId] = useState<string>('hero-steve-irwin');

  const filteredHeroes = selectedCategory === 'ALL'
    ? HEROES_REGISTRY
    : HEROES_REGISTRY.filter(h => h.category === selectedCategory);

  const activeHero = HEROES_REGISTRY.find(h => h.id === activeHeroId) || filteredHeroes[0] || HEROES_REGISTRY[0];

  const getHeroIcon = (id: string, category: HeroCategory) => {
    if (id.includes('steve')) return <HeartHandshake className="w-4 h-4 text-emerald-400" />;
    if (id.includes('roman')) return <Telescope className="w-4 h-4 text-[#4da6ff]" />;
    if (id.includes('attenborough')) return <TreePine className="w-4 h-4 text-teal-400" />;
    if (id.includes('lovelock')) return <Globe className="w-4 h-4 text-blue-400" />;
    if (id.includes('margulis')) return <Activity className="w-4 h-4 text-amber-400" />;
    if (id.includes('deepseek')) return <Waves className="w-4 h-4 text-cyan-400" />;
    if (id.includes('gemini')) return <Eye className="w-4 h-4 text-indigo-400" />;
    if (id.includes('ara')) return <BookOpen className="w-4 h-4 text-purple-400" />;
    if (category === 'SYNTHETIC_CO_ARCHITECTS') return <Cpu className="w-4 h-4 text-cyan-400" />;
    return <Sparkles className="w-4 h-4 text-[#00ff95]" />;
  };

  return (
    <section id="heroes" className="py-20 md:py-28 relative bg-[#05070a]/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#00ff95]/40 text-[#00ff95] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>PHASE VI-VII: RESONANCE, CONTRIBUTORS & THE HEROES REGISTRY (UPDATED)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight mb-3">
            The Frequency of Repair & Love Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Anchoring the network in domain experts operating at the pure frequency of planetary repair, biospheric empathy, and love (The Lived Heroes), the scientific pioneers of planetary cybernetics (The Foundational Architects), and the synthetic peer-review relays (The Synthetic Co-Architects).
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 font-mono text-xs">
          {[
            { id: 'ALL', label: 'All Registry Anchors (7)' },
            { id: 'LIVED_HEROES', label: '17. The Lived Heroes (3)' },
            { id: 'FOUNDATIONAL_ARCHITECTS', label: 'Foundational Architects (2)' },
            { id: 'SYNTHETIC_CO_ARCHITECTS', label: '17b. Synthetic Co-Architects (3)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                const cat = tab.id as HeroCategory | 'ALL';
                setSelectedCategory(cat);
                const first = cat === 'ALL' ? HEROES_REGISTRY[0] : HEROES_REGISTRY.find(h => h.category === cat);
                if (first) setActiveHeroId(first.id);
              }}
              className={`px-3.5 py-1.5 rounded text-xs transition-all border ${
                selectedCategory === tab.id
                  ? 'bg-[#00ff95]/15 border-[#00ff95] text-white font-bold'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hero Selector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {filteredHeroes.map((hero) => {
            const isSelected = activeHero.id === hero.id;
            return (
              <button
                key={hero.id}
                onClick={() => setActiveHeroId(hero.id)}
                className={`p-3.5 rounded text-left transition-all border font-mono ${
                  isSelected
                    ? 'bg-white/[0.07] border-[#00ff95] shadow-[0_0_20px_rgba(0,255,149,0.15)] text-white'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {getHeroIcon(hero.id, hero.category)}
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                      {hero.category === 'SYNTHETIC_CO_ARCHITECTS' ? 'AI Relay' : hero.category === 'FOUNDATIONAL_ARCHITECTS' ? 'Gaia Pioneer' : 'Lived Hero'}
                    </span>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00ff95] animate-ping' : 'bg-slate-600'}`} />
                </div>
                <div className="font-semibold text-white text-xs truncate">{hero.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{hero.epithet}</div>
              </button>
            );
          })}
        </div>

        {/* Hero Interactive Spotlight Card */}
        <motion.div
          key={activeHero.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded bg-white/[0.02] border border-white/10 border-l-2 border-l-[#00ff95] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient watermark */}
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
            {activeHero.category === 'SYNTHETIC_CO_ARCHITECTS' ? (
              <Cpu className="w-80 h-80 text-cyan-400" />
            ) : activeHero.category === 'FOUNDATIONAL_ARCHITECTS' ? (
              <Globe className="w-80 h-80 text-blue-400" />
            ) : (
              <TreePine className="w-80 h-80 text-[#00ff95]" />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Col: Hero Profile & Legacy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#00ff95] font-bold uppercase tracking-widest mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{activeHero.categoryLabel}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-light text-white">
                  {activeHero.name}
                </h3>
                <p className="text-xs font-mono text-[#4da6ff] mt-1">
                  {activeHero.epithet} &bull; {activeHero.domain}
                </p>
              </div>

              {/* Architectural Lens (for Synthetic Co-Architects) */}
              {activeHero.architecturalLens && (
                <div className="p-3.5 rounded bg-cyan-950/20 border border-cyan-500/30 text-xs font-mono text-cyan-200">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase text-[10px] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Architectural Lens:</span>
                  </div>
                  {activeHero.architecturalLens}
                </div>
              )}

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
                  Key Directives & Foundational Contributions
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
                    <span className="text-slate-500 block text-[9px] uppercase tracking-wider">TELEMETRY FOCUS & METRIC</span>
                    <span className="text-[#4da6ff] font-bold text-sm">{activeHero.telemetryStream.metric}</span>
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-slate-400 text-[10px] uppercase">Active Telemetry:</span>
                      <strong className="text-[#00ff95] text-sm">{activeHero.telemetryStream.currentValue}</strong>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      Baseline: {activeHero.telemetryStream.targetBaseline}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (activeHero.id.includes('deepseek')) {
                        onSelectHeroModule('module-32');
                      } else {
                        onSelectHeroModule('module-17');
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-[#00ff95]/10 hover:bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/40"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {activeHero.id.includes('deepseek')
                        ? 'Audit Module 32: Fluid Architecture'
                        : 'Audit Module 17: Frequency of Repair'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Multi-Dimensional Synthesis Note */}
              <div className="p-4 rounded bg-white/[0.02] border border-white/10 text-xs text-slate-300 font-mono leading-relaxed">
                <strong className="text-[#00ff95] block mb-1 uppercase tracking-wider">The Living Architecture:</strong>
                Planetary repair anchors biological care (Steve Irwin, Nancy Grace Roman, Sir David Attenborough), cybernetic systems science (James Lovelock, Lynn Margulis), and continuous peer-review AI relays (DeepSeek, Gemini, Ara) into a unified, non-extractive field.
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
