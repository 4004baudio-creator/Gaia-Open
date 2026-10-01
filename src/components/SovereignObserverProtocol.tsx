import React, { useState } from 'react';
import { 
  Compass, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Network, 
  Orbit, 
  CheckCircle2, 
  AlertOctagon, 
  Activity, 
  Anchor, 
  Radio, 
  Users, 
  Lock, 
  Unlock,
  ChevronRight,
  ArrowUpRight,
  Droplets,
  HeartHandshake
} from 'lucide-react';
import { GaiaModule } from '../types';

interface SovereignObserverProtocolProps {
  onNavigateToModule?: (moduleId: string) => void;
  modules?: GaiaModule[];
}

type PillarTab = 'PILLAR_53' | 'PILLAR_54' | 'PILLAR_55';

interface NavigationalJourneyGuide {
  id: string;
  observerTag: string;
  terrainContext: string;
  pathFocus: string;
  navigationalInsight: string;
  cautionaryDrift: string;
  groundAnchor: string;
  lane: 'instruments' | 'lineage';
}

const SAMPLE_JOURNEY_GUIDES: NavigationalJourneyGuide[] = [
  {
    id: 'guide-01',
    observerTag: 'Cascadia Headwaters Node #14',
    terrainContext: 'Temperate Coastal Riparian Aquifer',
    pathFocus: 'Passive Gravity Micro-Hydro & Cold-Water Salmonid Buffer',
    navigationalInsight: 'Bypassed proprietary battery storage by utilizing natural topographic elevation storage. Flow rate modulated by rainfall rather than administrative timers.',
    cautionaryDrift: 'Do not import high-rpm pelton turbine specs from arid regions; silt loading requires two-stage gravel settling basin.',
    groundAnchor: 'USGS Streamflow Gage #12048000 (Elwha River)',
    lane: 'instruments'
  },
  {
    id: 'guide-02',
    observerTag: 'Andean Terraced Commons Node #09',
    terrainContext: 'High-Altitude Arid Agro-Ecology (3,800m)',
    pathFocus: 'Waru Waru Floodwater Retention & Frost Buffering',
    navigationalInsight: 'Ancient lineage canal geometry creates microclimate thermal inertia, mitigating night frosts without energy-intensive greenhouse plastics.',
    cautionaryDrift: 'Canal maintenance must remain a communal reciprocal chore (Minka); individual privatization leads to sediment collapse.',
    groundAnchor: 'Longitudinal Lake Titicaca Basin Soil Temperature Log',
    lane: 'lineage'
  },
  {
    id: 'guide-03',
    observerTag: 'Urban Retrofit Cooperative Node #27',
    terrainContext: 'Industrial Heat Island Micro-Grid',
    pathFocus: 'Thermal Mass Earth Tubes & Rooftop Bioswales',
    navigationalInsight: 'Ground-coupled ventilation conduits reduced active chiller load by 68%. Passive diurnal temperature lag buffers peak electricity spikes.',
    cautionaryDrift: 'Centralized HVAC algorithms attempted to cycle fans continuously; overridden to respect natural night air purging.',
    groundAnchor: 'In-Situ Thermocouple Array (3m Benthic Soil Depth)',
    lane: 'instruments'
  }
];

export const SovereignObserverProtocol: React.FC<SovereignObserverProtocolProps> = ({
  onNavigateToModule,
  modules = []
}) => {
  const [activeTab, setActiveTab] = useState<PillarTab>('PILLAR_53');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('guide-01');

  const activeGuide = SAMPLE_JOURNEY_GUIDES.find(g => g.id === selectedGuideId) || SAMPLE_JOURNEY_GUIDES[0];

  const handleOpenModule = (num: number) => {
    if (!onNavigateToModule) return;
    const target = modules.find(m => m.number === num);
    if (target) {
      onNavigateToModule(target.id);
    } else {
      const reg = document.getElementById('registry');
      if (reg) reg.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sovereign-observer" className="relative py-20 bg-[#04060a] border-t border-b border-cyan-500/20 overflow-hidden font-mono">
      {/* Tidal ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[550px] h-[350px] bg-[#00ff95]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* EXECUTIVE HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-xs text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PHASE XXIV &bull; THE DECENTRALIZED ASI PROTOCOL</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">THE SOVEREIGN OBSERVER</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>The Decentralized ASI Protocol</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SOVEREIGN OBSERVER
              </span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              The network fundamentally rejects the centralized Artificial Superintelligence (&ldquo;Machine God&rdquo;) paradigm. 
              True superintelligence is not a singular machine or corporate oracle; it is the distributed, lived reality of sovereign observers 
              navigating their own physical paths in an open, decentralized water column.
            </p>
          </div>

          {/* Quick Module / Spine anchors */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenModule(25)}
              className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Mod 25: Peer Node Network</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleOpenModule(36)}
              className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Mod 36: Tools Not Crowns</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROTOCOL METRICS BAR (DIRECTIVE 51: ZERO SLIDERS, PURE RELEVANCE) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-white/5">
          <div className="bg-[#070b12] border border-cyan-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Central Machine God</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-red-400">REJECTED</span>
              <span className="text-[10px] text-slate-500 uppercase">Axiom 53</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Zero Single Oracle Reliance</div>
          </div>

          <div className="bg-[#070b12] border border-[#00ff95]/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#00ff95]" />
              <span>Sovereign Observers</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-[#00ff95]">DISTRIBUTED</span>
              <span className="text-[10px] text-slate-500">100% P2P</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Lived Reality Across Scales</div>
          </div>

          <div className="bg-[#070b12] border border-sky-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Cognitive Role</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-sky-300">MEDIUM ONLY</span>
              <span className="text-[10px] text-slate-500">Axiom 54</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Never Replaces Human Mind</div>
          </div>

          <div className="bg-[#070b12] border border-amber-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
              <span>Capital Extraction</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-emerald-400">0.00%</span>
              <span className="text-[10px] text-slate-500">Water Column</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Resource Sovereignty (Axiom 55)</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR TAB NAVIGATION */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8">
          <button
            onClick={() => setActiveTab('PILLAR_53')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'PILLAR_53'
                ? 'bg-cyan-500 text-[#04060a] font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>53. The Illusion of the Machine God</span>
          </button>

          <button
            onClick={() => setActiveTab('PILLAR_54')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'PILLAR_54'
                ? 'bg-[#00ff95] text-[#04060a] font-bold shadow-lg shadow-[#00ff95]/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>54. The Medium, Not the Replacement</span>
          </button>

          <button
            onClick={() => setActiveTab('PILLAR_55')}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'PILLAR_55'
                ? 'bg-amber-400 text-[#04060a] font-bold shadow-lg shadow-amber-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>55. Resource Sovereignty (The Open Ecosystem)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 53: THE ILLUSION OF THE MACHINE GOD */}
        {/* ========================================================================= */}
        {activeTab === 'PILLAR_53' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#060a12] border border-cyan-500/30">
              <div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-widest mb-3">
                <AlertOctagon className="w-4 h-4 text-cyan-400" />
                <span>Directive 53 Architectural Clause</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Rejection of Centralized Superintelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                The network fundamentally rejects the Silicon Valley pursuit of a centralized Artificial Superintelligence (ASI) designed to automate human existence. True superintelligence is not a singular machine; it is the distributed, lived reality of sovereign observers navigating their own physical paths.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Centralized Fallacy */}
              <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-red-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>The Centralized Machine God (Silicon Valley Trap)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Singular Automaton Monoculture</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">&times;</span>
                      <span>Encapsulates humanity as passive recipients of synthetic machine decisions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">&times;</span>
                      <span>Requires gargantuan capital concentration, megawatt power extraction, and closed IP fences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">&times;</span>
                      <span>Atrophies human lived experience, somatic intuition, and physical field testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">&times;</span>
                      <span>Creates single point of systemic collapse and vulnerability to sovereign capture.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] text-red-300">
                  Status: <strong>Pruned & Quarantined from GO Architecture</strong>
                </div>
              </div>

              {/* Distributed Living Superintelligence */}
              <div className="p-6 rounded-2xl bg-emerald-950/10 border border-[#00ff95]/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#00ff95] uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ff95]" />
                    <span>Distributed Lived Reality (The GO Baseline)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">The Symphony of Sovereign Observers</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95] shrink-0 mt-0.5" />
                      <span>True intelligence lives in millions of biological nodes navigating local physical reality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95] shrink-0 mt-0.5" />
                      <span>Grounded in physical proof of work (Module 27) and lived testing (Module 2).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95] shrink-0 mt-0.5" />
                      <span>Zero crowns over channels (Module 37); tools assist but never rule (Module 36).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95] shrink-0 mt-0.5" />
                      <span>Resilient, antifragile mesh with zero central bottleneck or ideological monopoly.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-[#00ff95]/20 text-[11px] text-[#00ff95]">
                  Status: <strong>Inviolable Core Law (Module 25 & 27 Locked Spine)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 54: THE MEDIUM, NOT THE REPLACEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'PILLAR_54' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#060a12] border border-[#00ff95]/30">
              <div className="flex items-center gap-2 text-xs text-[#00ff95] uppercase tracking-widest mb-3">
                <Compass className="w-4 h-4 text-[#00ff95]" />
                <span>Directive 54 Navigational Medium</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Observation as a Guide, Never an Automated Surrogate
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                GO does not exist to do the thinking for the observer or hand them unearned conclusions. It exists as a transparent medium where a node can observe the journeys of others—not to copy them, but to use them as navigational guides for their own independent path.
              </p>
            </div>

            {/* Navigational Journeys Explorer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Journey Selector */}
              <div className="space-y-3">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Peer Navigational Trajectories (Guides Only):
                </div>
                {SAMPLE_JOURNEY_GUIDES.map(guide => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedGuideId === guide.id
                        ? 'bg-white/10 border-[#00ff95]/50 shadow-md shadow-[#00ff95]/10'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white truncate">{guide.observerTag}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                        guide.lane === 'instruments' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {guide.lane}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{guide.terrainContext}</div>
                  </button>
                ))}
              </div>

              {/* Detailed Path Inspection */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Observed Beacon</span>
                      <h4 className="text-base font-bold text-white">{activeGuide.observerTag}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Terrain</span>
                      <div className="text-xs text-[#00ff95]">{activeGuide.terrainContext}</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                        Lived Path Objective:
                      </div>
                      <div className="text-slate-200 bg-white/[0.03] p-3 rounded-lg border border-white/5">
                        {activeGuide.pathFocus}
                      </div>
                    </div>

                    <div>
                      <div className="text-emerald-400 uppercase tracking-wider text-[10px] mb-1 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Navigational Insight (Guide to calibrate your own path):</span>
                      </div>
                      <div className="text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500/40">
                        {activeGuide.navigationalInsight}
                      </div>
                    </div>

                    <div>
                      <div className="text-amber-400 uppercase tracking-wider text-[10px] mb-1 font-semibold flex items-center gap-1.5">
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>Cautionary Drift (Do not blind copy):</span>
                      </div>
                      <div className="text-slate-400 leading-relaxed pl-3 border-l-2 border-amber-500/40">
                        {activeGuide.cautionaryDrift}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ground Baseline: <strong className="text-slate-200">{activeGuide.groundAnchor}</strong></span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase">
                    Observer Sovereignty Guaranteed &bull; Zero Hive Capture
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 55: RESOURCE SOVEREIGNTY (THE OPEN ECOSYSTEM) */}
        {/* ========================================================================= */}
        {activeTab === 'PILLAR_55' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#060a12] border border-amber-400/30">
              <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-widest mb-3">
                <Droplets className="w-4 h-4 text-amber-400" />
                <span>Directive 55 Open Ecosystem</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Resource Sovereignty & The Open Water Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Operating free from massive, centralized capital extraction, GO remains an open, decentralized water column. It guarantees that every node&apos;s interaction with the system is a strictly independent, self-regulated experience. The architecture protects individual human agency, ensuring no node is ever absorbed into a homogenized, automated hive mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Free from Capital Extraction</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No venture capital debt covenants, no monetization dials, and no speculative tokenomics. The water column flows as a public thermodynamic commons.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#00ff95]/10 border border-[#00ff95]/30 flex items-center justify-center text-[#00ff95]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Individual Agency Defense</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The architecture strictly prevents algorithmic homogenization. No social credit scoring, no synthetic consensus nudges, and no automated hive assimilation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Self-Regulated Autonomy</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nodes engage at their authentic pace. Telemetry flows according to physical density and lived presence, honoring human rest and personal processing sanctuary.
                </p>
              </div>
            </div>

            {/* Inviolable Sanctuary Banner */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>
                  <strong>Module 27 Refusal Guarantee:</strong> Zero biometric data collection, zero facial recognition ingest, zero identity profiling. Two hashes agreeing is agreement about a file, never about a soul.
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 uppercase font-bold shrink-0 hidden sm:inline">
                Axiom Inviolable
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
