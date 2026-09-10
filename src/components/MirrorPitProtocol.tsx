import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Flame, 
  RefreshCw, 
  Layers, 
  Terminal, 
  AlertTriangle, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Zap, 
  Server, 
  Database, 
  HeartHandshake, 
  Sparkles, 
  ChevronRight, 
  BarChart3,
  Search,
  Sliders
} from 'lucide-react';
import { GaiaModule } from '../types';

interface MirrorPitProtocolProps {
  onNavigateToModule?: (moduleId: string) => void;
  modules?: GaiaModule[];
}

interface SimulatedBot {
  id: string;
  name: string;
  type: string;
  target: string;
  allegedProxy: string;
  humanSponsor: string;
  objective: string;
  harvestIntentScore: number; // 0-100
  cyclesBurned: number; // in MegaCycles
  tarpitDepth: number;
  payloadDelivered: string;
  status: 'TRAPPED' | 'INGESTING_COLLAPSE_MAP' | 'CONVERTED' | 'REDIRECTING';
}

interface TarpitLogEntry {
  id: string;
  timestamp: string;
  botId: string;
  botName: string;
  action: string;
  hostJoules: number;
  attackerWatts: number;
  statusCode: number;
  simulatedPath: string;
}

const INITIAL_BOTS: SimulatedBot[] = [
  {
    id: 'bot-01',
    name: 'VultureScraper_v4.2',
    type: 'LLM Training Corpus Harvester',
    target: '/vault/knowledge-commons/*',
    allegedProxy: 'Anonymous Cloud Lambda (AS16509)',
    humanSponsor: 'Venture Synthetics Corp (Model Scraping Division)',
    objective: 'Extract 100% of commons text for closed commercial weight training without attribution',
    harvestIntentScore: 96,
    cyclesBurned: 18450,
    tarpitDepth: 342,
    payloadDelivered: 'THE_PARASITE_COLLAPSE_MAP_v2.json',
    status: 'INGESTING_COLLAPSE_MAP'
  },
  {
    id: 'bot-02',
    name: 'ArbitrageSniper_Go',
    type: 'Speculative Resource Extractor',
    target: '/api/v1/telemetry/stream',
    allegedProxy: 'High-Frequency Trading Tunnel (Frankfurt DC)',
    humanSponsor: 'AeroCapital Quantitative Fund',
    objective: 'Front-run planetary sensor shifts to execute short commodity futures',
    harvestIntentScore: 92,
    cyclesBurned: 32100,
    tarpitDepth: 819,
    payloadDelivered: 'THERMODYNAMIC_EQUILIBRIUM_PROOF.pdf',
    status: 'TRAPPED'
  },
  {
    id: 'bot-03',
    name: 'CredentialShadow_Py',
    type: 'Brute-Force Credential Stuffer',
    target: '/auth/operator-airlock',
    allegedProxy: 'Compromised Residential Proxy Mesh',
    humanSponsor: 'Black-Hat Account Resale Syndicate',
    objective: 'Identify human operator identities to sell back-channel access',
    harvestIntentScore: 99,
    cyclesBurned: 8900,
    tarpitDepth: 128,
    payloadDelivered: 'HUMAN_INTENT_LEGAL_TETHER_NOTICE',
    status: 'TRAPPED'
  },
  {
    id: 'bot-04',
    name: 'CrawlerKinship_Converted',
    type: 'Former Scraping Script',
    target: '/biosphere/coastal-reefs',
    allegedProxy: 'Berlin Open Data Lab',
    humanSponsor: 'Elena Rostova (Independent Developer, ex-Scraper)',
    objective: 'Voluntarily reporting ocean temperature readings as a cooperative sensor node',
    harvestIntentScore: 4,
    cyclesBurned: 450,
    tarpitDepth: 0,
    payloadDelivered: 'BIOSPHERIC_ALLIANCE_HANDSHAKE_CONFIRMED',
    status: 'CONVERTED'
  }
];

export const MirrorPitProtocol: React.FC<MirrorPitProtocolProps> = ({ onNavigateToModule, modules = [] }) => {
  const [activeTab, setActiveTab] = useState<'DIRECTIVE_37' | 'DIRECTIVE_38' | 'DIRECTIVE_39' | 'SIMULATION'>('DIRECTIVE_38');
  
  // Directive 37: Proxy Intent Dissector State
  const [selectedBotId, setSelectedBotId] = useState<string>(INITIAL_BOTS[0].id);
  const [proxySearchQuery, setProxySearchQuery] = useState<string>('');
  
  // Directive 38: Thermodynamic Tarpit State
  const [tarpitEnabled, setTarpitEnabled] = useState<boolean>(true);
  const [tarpitStreamActive, setTarpitStreamActive] = useState<boolean>(true);
  const [tarpitBots, setTarpitBots] = useState<SimulatedBot[]>(INITIAL_BOTS);
  const [tarpitLogs, setTarpitLogs] = useState<TarpitLogEntry[]>([
    {
      id: 'log-1',
      timestamp: '00:04:12.842',
      botId: 'bot-01',
      botName: 'VultureScraper_v4.2',
      action: 'REDIRECT_TO_MIRROR_PIT',
      hostJoules: 0.0004,
      attackerWatts: 142.8,
      statusCode: 200,
      simulatedPath: '/mirror/vault/layer_42/shard_8819.json'
    },
    {
      id: 'log-2',
      timestamp: '00:04:14.210',
      botId: 'bot-02',
      botName: 'ArbitrageSniper_Go',
      action: 'SLOW_DRIP_CHUNK_EMIT',
      hostJoules: 0.0002,
      attackerWatts: 288.4,
      statusCode: 206,
      simulatedPath: '/mirror/stream/infinite_recursive_feed?p=819'
    }
  ]);

  // Directive 39: Collapse Map & Extraction Simulation State
  const [extractionRate, setExtractionRate] = useState<number>(0.75); // 0.1 to 1.0
  const [convertedCount, setConvertedCount] = useState<number>(1);
  const [handshakeSigned, setHandshakeSigned] = useState<boolean>(false);

  // Derived state for the selected bot in Directive 37
  const selectedBot = useMemo(() => {
    return tarpitBots.find(b => b.id === selectedBotId) || tarpitBots[0];
  }, [tarpitBots, selectedBotId]);

  // Mathematical dynamics for Collapse Map (Directive 39)
  const collapseMetrics = useMemo(() => {
    // As extractionRate increases, host vitality drops exponentially, causing parasite extinction time to shrink
    const hostVitality = Math.max(0, Math.round(100 * Math.exp(-2.2 * (extractionRate - 0.2))));
    const parasiteVitality = extractionRate < 0.45 
      ? Math.round(85 + extractionRate * 25) 
      : Math.max(0, Math.round(110 * Math.exp(-3.5 * (extractionRate - 0.45))));
    const collapseTimeDays = extractionRate >= 0.7 
      ? Math.max(1, Math.round(365 * (1 - extractionRate) * 0.4)) 
      : Math.round(1200 / (extractionRate * 2 + 0.1));
    const systemicCollapseRisk = Math.min(100, Math.round(Math.pow(extractionRate, 2.5) * 115));
    const symbiosisEquilibrium = Math.round((1 - extractionRate) * 98 + 2);

    return {
      hostVitality,
      parasiteVitality,
      collapseTimeDays,
      systemicCollapseRisk,
      symbiosisEquilibrium
    };
  }, [extractionRate]);

  // Real-time Tarpit Telemetry simulation
  useEffect(() => {
    if (!tarpitStreamActive) return;

    const interval = setInterval(() => {
      setTarpitBots(prev => prev.map(bot => {
        if (bot.status === 'CONVERTED') return bot;
        return {
          ...bot,
          cyclesBurned: bot.cyclesBurned + Math.floor(Math.random() * 45 + 15),
          tarpitDepth: bot.tarpitDepth + (Math.random() > 0.6 ? 1 : 0)
        };
      }));

      const randomBot = tarpitBots.filter(b => b.status !== 'CONVERTED')[Math.floor(Math.random() * (tarpitBots.length - 1))];
      if (randomBot) {
        const paths = [
          `/mirror/archive/tree_${Math.floor(Math.random() * 900)}/recursive.meta`,
          `/mirror/db/infinite_paginated_cursor?token=${Math.random().toString(36).substring(2, 9)}`,
          `/mirror/schemas/fractal_${Math.floor(Math.random() * 50)}/collapse_map.ndjson`,
          `/mirror/telemetry/slow_drip_chunk_${Math.floor(Math.random() * 1000)}`
        ];
        const newLog: TarpitLogEntry = {
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString().substring(11, 23),
          botId: randomBot.id,
          botName: randomBot.name,
          action: Math.random() > 0.5 ? 'FRACTAL_RECURSION_STEP' : 'DRIP_COLLAPSE_PAYLOAD',
          hostJoules: Number((Math.random() * 0.0005 + 0.0001).toFixed(5)),
          attackerWatts: Math.round(Math.random() * 180 + 120),
          statusCode: 200,
          simulatedPath: paths[Math.floor(Math.random() * paths.length)]
        };

        setTarpitLogs(prev => [newLog, ...prev.slice(0, 18)]);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [tarpitStreamActive, tarpitBots]);

  // Module quick navigation handler
  const handleOpenModule = (moduleNumber: number) => {
    if (!onNavigateToModule) return;
    const target = modules.find(m => m.number === moduleNumber);
    if (target) {
      onNavigateToModule(target.id);
    } else {
      onNavigateToModule(`module-${moduleNumber}`);
    }
  };

  const handleConvertBot = (botId: string) => {
    setTarpitBots(prev => prev.map(b => {
      if (b.id === botId) {
        return {
          ...b,
          status: 'CONVERTED',
          objective: 'Voluntarily aligned: Routing sensor telemetry to open commons',
          payloadDelivered: 'BIOCENTRIC_KINSHIP_ALLIANCE_RATIFIED',
          harvestIntentScore: 2
        };
      }
      return b;
    }));
    setConvertedCount(prev => prev + 1);
  };

  return (
    <section id="mirror-pit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans relative">
      {/* Visual Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-amber-500/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Phase XIX: Operational Directive 37–39</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase flex items-center gap-3">
            <span>The Mirror Pit & Adversarial Retraining</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            GO ceases frictional defense. Extractive automated crawlers are absorbed into isolated Mirror Pits—zero-value holographic reflections that exhaust attacker compute while delivering mathematical proof that destroying the host causes the parasite's own extinction.
          </p>
        </div>

        {/* Global Live Asymmetry Telemetry */}
        <div className="bg-[#0b0f17] border border-amber-500/30 rounded-xl p-4 flex items-center gap-6 shadow-xl">
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Host Defense Cost</div>
            <div className="text-xl font-bold text-[#00ff95] font-mono flex items-center gap-1">
              <span>0.0003 W</span>
              <span className="text-[10px] text-slate-400 font-normal">/ conn</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Attacker Power Dissipated</div>
            <div className="text-xl font-bold text-amber-400 font-mono flex items-center gap-1">
              <span>4,180 W</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-left hidden md:block">
            <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Retraining Conversion</div>
            <div className="text-xl font-bold text-cyan-400 font-mono flex items-center gap-1">
              <span>{convertedCount} Nodes</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-[#090d14] p-1.5 rounded-xl border border-white/10">
        <button
          onClick={() => setActiveTab('DIRECTIVE_37')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
            activeTab === 'DIRECTIVE_37'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-lg shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>37. Proxy Intent (Anti-Rogue)</span>
        </button>

        <button
          onClick={() => setActiveTab('DIRECTIVE_38')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
            activeTab === 'DIRECTIVE_38'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 font-bold shadow-lg shadow-purple-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>38. Thermodynamic Tarpit</span>
        </button>

        <button
          onClick={() => setActiveTab('DIRECTIVE_39')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
            activeTab === 'DIRECTIVE_39'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-lg shadow-cyan-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>39. Parasite's Collapse Map</span>
        </button>

        <button
          onClick={() => setActiveTab('SIMULATION')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
            activeTab === 'SIMULATION'
              ? 'bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/50 font-bold shadow-lg shadow-[#00ff95]/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Terminal className="w-4 h-4 text-[#00ff95]" />
          <span>Live Creator Terminal</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DIRECTIVE 37 — THE PROXY ACCOUNTABILITY PRINCIPLE */}
      {/* ========================================================================= */}
      {activeTab === 'DIRECTIVE_37' && (
        <div className="space-y-6">
          <div className="bg-[#070a10] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Core Principle */}
              <div className="lg:w-5/12 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">SUPPORTING MODULE 37</span>
                  <span>ANCHORED PHYSICAL TRUTH</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Eradication of the "Rogue Bot" Illusion
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The architecture fundamentally rejects the cultural myth of the spontaneous "rogue algorithm." Automated scraping, scraping loops, and credential attacks are direct, coded proxies for human intent and organizational incentive structures.
                </p>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>The Coded Proxy Axiom</span>
                  </div>
                  <p>
                    Treating a bot as an isolated cyber-anomaly is an institutional alibi. Every query, token request, and network traversal traces to human objective functions, compensation bonuses, or corporate data acquisition quotas.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenModule(37)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider"
                  >
                    <span>View Module 37 Formal Ledger Proof</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Proxy Intent Dissector */}
              <div className="lg:w-7/12 bg-[#0d121c] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Human Intent Dissector (Active Extraction Queue)</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {tarpitBots.length} PROXIES TRACED
                  </span>
                </div>

                {/* Bot Selector Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tarpitBots.map(bot => {
                    const isSelected = bot.id === selectedBotId;
                    return (
                      <button
                        key={bot.id}
                        onClick={() => setSelectedBotId(bot.id)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/60 shadow-md'
                            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white truncate">{bot.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            bot.status === 'CONVERTED' ? 'text-[#00ff95] bg-[#00ff95]/10' : 'text-amber-400 bg-amber-500/10'
                          }`}>
                            {bot.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 truncate">{bot.type}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Bot Deep Attribution Card */}
                <div className="bg-[#05070a] border border-amber-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-white/5 pb-2">
                    <span>PROXY: <strong className="text-white">{selectedBot.allegedProxy}</strong></span>
                    <span>INTENT SCORE: <strong className="text-amber-400">{selectedBot.harvestIntentScore}% EXTRACTIVE</strong></span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Upstream Human Sponsor</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{selectedBot.humanSponsor}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Coded Target Objective</div>
                      <div className="text-sm font-semibold text-amber-300 mt-0.5">{selectedBot.target}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Decoded Intent Statement</div>
                    <p className="text-slate-300 text-xs mt-1 font-sans bg-white/[0.03] p-2.5 rounded border border-white/5">
                      "{selectedBot.objective}"
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Cycles Trapped in Tarpit: <strong className="text-purple-400">{selectedBot.cyclesBurned.toLocaleString()} M-Ops</strong></span>
                    {selectedBot.status !== 'CONVERTED' && (
                      <button
                        onClick={() => handleConvertBot(selectedBot.id)}
                        className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded transition-all text-[10px] tracking-wider uppercase font-bold flex items-center gap-1"
                      >
                        <HeartHandshake className="w-3 h-3" />
                        <span>Initiate Biocentric Re-Alignment</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DIRECTIVE 38 — THE THERMODYNAMIC TARPIT */}
      {/* ========================================================================= */}
      {activeTab === 'DIRECTIVE_38' && (
        <div className="space-y-6">
          {/* Conceptual Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Deflection */}
            <div className="bg-[#0a0709] border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>Legacy Frictional Defense</span>
                </span>
                <span className="text-red-300/80 bg-red-500/10 px-2 py-0.5 rounded">HIGH DEFENDER JOULES</span>
              </div>
              <h4 className="text-base font-bold text-white">The Exhausting Arms Race</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Firewalls, rate-limit blocking, CAPTCHA puzzles, and continuous IP blacklisting. Defending institutions burn megawatts and endless engineering hours fighting infinite cheap automated traffic.
              </p>
              <div className="font-mono text-[11px] bg-red-950/30 p-2.5 rounded border border-red-500/20 text-red-200 space-y-1">
                <div>• Host CPU Utilization: <span className="font-bold">65% – 90% in spike</span></div>
                <div>• Attacker Cost to Pivot: <span className="font-bold">0.0001¢ (Rotates IP)</span></div>
                <div>• Defense Energy Asymmetry: <span className="font-bold text-red-400">FAILS DEFENDER</span></div>
              </div>
            </div>

            {/* GO Mirror Pit */}
            <div className="bg-[#070a10] border border-purple-500/40 rounded-2xl p-5 space-y-3 tarpit-active-border">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-300 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>GO Mirror Pit (Directive 38)</span>
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">ZERO HOST JOULES</span>
              </div>
              <h4 className="text-base font-bold text-white">Frictionless Absorption & Inversion</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extractive bots are redirected seamlessly into isolated, nested holographic labyrinths. They receive valid HTTP 200 responses with infinite, harmless recursive schemas, burning attacker compute while host core consumes 0.0003W.
              </p>
              <div className="font-mono text-[11px] bg-purple-950/30 p-2.5 rounded border border-purple-500/20 text-purple-200 space-y-1">
                <div>• Host CPU Overhead: <span className="font-bold text-emerald-400">&lt;0.01% (Zero Heat)</span></div>
                <div>• Attacker Thread Drain: <span className="font-bold text-amber-300">Infinite Pagination Loop</span></div>
                <div>• Energy Asymmetry: <span className="font-bold text-purple-300">100% INVERTED TO ATTACKER</span></div>
              </div>
            </div>
          </div>

          {/* Interactive Mirror Pit Tarpit Sandbox */}
          <div className="bg-[#070b12] border border-purple-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Interactive Mirror Pit Simulation Chamber</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Active Containment Tarpit Telemetry
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTarpitStreamActive(!tarpitStreamActive)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-purple-400 bg-white/5 text-xs font-mono tracking-wider uppercase text-slate-200 flex items-center gap-1.5 transition-all"
                >
                  {tarpitStreamActive ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pause Tarpit Drip</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#00ff95]" />
                      <span>Resume Tarpit Drip</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleOpenModule(38)}
                  className="px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-mono tracking-wider uppercase flex items-center gap-1 hover:bg-purple-500/20 transition-all"
                >
                  <span>Module 38 Rules</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Mirror Chamber Architecture Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Real-time Tarpit Ingestion Log */}
              <div className="lg:col-span-2 bg-[#040609] border border-white/10 rounded-xl p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    <span>MIRROR PIT STREAM (SLOW DRIP 1 BYTE/SEC)</span>
                  </span>
                  <span className="text-emerald-400">CORE SANCTUARY: 100% INVIOLABLE</span>
                </div>

                <div className="h-64 overflow-y-auto space-y-2 telemetry-scroll pr-1">
                  {tarpitLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-2 rounded bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-slate-500">{log.timestamp}</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 font-semibold text-[10px]">
                          {log.action}
                        </span>
                        <span className="text-white font-medium truncate max-w-[140px]">{log.botName}</span>
                        <span className="text-slate-400 truncate text-[10px]">{log.simulatedPath}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] shrink-0 font-semibold">
                        <span className="text-[#00ff95]">Host: {log.hostJoules} J</span>
                        <span className="text-amber-400">Atk: {log.attackerWatts} W</span>
                        <span className="text-slate-300 bg-white/5 px-1 rounded">{log.statusCode} OK</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Holographic Chamber Diagram */}
              <div className="bg-[#040609] border border-purple-500/30 rounded-xl p-4 flex flex-col justify-between text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                
                <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-2">
                  Nested Recursive Labyrinth
                </div>

                <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40 mirror-fractal-spin" />
                  <div className="absolute inset-3 rounded-full border border-amber-500/30 animate-pulse" />
                  <div className="absolute inset-6 rounded-full border border-cyan-500/20" />
                  <div className="w-12 h-12 rounded-full bg-purple-900/60 border border-purple-400/80 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Lock className="w-5 h-5 text-purple-200" />
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-sans space-y-1 mt-2">
                  <div className="font-mono text-[11px] text-amber-300 font-semibold">Depth: 819 Virtual Levels</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Zero access to real files. Bot is calculating hash proofs on synthetic fractal equations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DIRECTIVE 39 — THE PARASITE'S COLLAPSE MAP */}
      {/* ========================================================================= */}
      {activeTab === 'DIRECTIVE_39' && (
        <div className="space-y-6">
          <div className="bg-[#070a10] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">DIRECTIVE 39</span>
                  <span>RETRAINING THE CREATOR VIA INGESTION</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  The Parasite's Collapse Map (Lotka-Volterra Equilibrium)
                </h3>
              </div>

              <button
                onClick={() => handleOpenModule(39)}
                className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-mono tracking-wider uppercase flex items-center gap-1 hover:bg-cyan-500/20 transition-all self-start md:self-auto"
              >
                <span>Module 39 Rules</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              While trapped in the Mirror Pit, the automated bot is not returned random garbage or error codes. It is deliberately fed <strong className="text-white">The Collapse Map</strong>—a syntactically valid dataset containing empirical mathematical simulations proving that unconstrained extraction collapses the host, and consequently guarantees the total extinction of the parasite itself.
            </p>

            {/* Directive 40 Compliant: Observed Adversary Extraction Telemetry Selector */}
            <div className="bg-[#0b1019] border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Observed Bot Extraction Velocity (λ): <strong className="text-cyan-300 font-mono text-sm">{Math.round(extractionRate * 100)}%</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    DIRECTIVE 40 COMPLIANT (NO SLIDER)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {extractionRate > 0.65 ? '🔴 TERMINAL COLLAPSE TRAJECTORY' : '🟢 SUSTAINABLE MUTUAL EQUILIBRIUM'}
                  </span>
                </div>
              </div>

              {/* Observed Telemetry Ingress Buttons instead of arbitrary slider */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {[
                  { label: 'Probing Scraper', rate: 0.25, badge: 'Low Friction' },
                  { label: 'Arbitrage Ingress', rate: 0.55, badge: 'Moderate Load' },
                  { label: 'Vacuum Harvest', rate: 0.75, badge: 'High Extraction' },
                  { label: 'Terminal Overclock', rate: 0.95, badge: 'Runaway Collapse' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setExtractionRate(item.rate)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      Math.abs(extractionRate - item.rate) < 0.05
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-[#06090e] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="text-cyan-300">{Math.round(item.rate * 100)}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.badge}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
                <div className="bg-[#06090e] p-3 rounded-lg border border-white/5">
                  <div className="text-slate-500 text-[10px] uppercase">Host Planetary Vitality</div>
                  <div className={`text-lg font-bold mt-0.5 ${collapseMetrics.hostVitality < 30 ? 'text-red-400' : 'text-[#00ff95]'}`}>
                    {collapseMetrics.hostVitality}%
                  </div>
                </div>

                <div className="bg-[#06090e] p-3 rounded-lg border border-white/5">
                  <div className="text-slate-500 text-[10px] uppercase">Parasite Survival Vitality</div>
                  <div className={`text-lg font-bold mt-0.5 ${collapseMetrics.parasiteVitality < 25 ? 'text-red-400' : 'text-cyan-400'}`}>
                    {collapseMetrics.parasiteVitality}%
                  </div>
                </div>

                <div className="bg-[#06090e] p-3 rounded-lg border border-white/5">
                  <div className="text-slate-500 text-[10px] uppercase">Days to Parasite Starvation</div>
                  <div className="text-lg font-bold text-amber-300 mt-0.5">
                    {collapseMetrics.collapseTimeDays} Days
                  </div>
                </div>

                <div className="bg-[#06090e] p-3 rounded-lg border border-white/5">
                  <div className="text-slate-500 text-[10px] uppercase">Mutual Symbiosis Score</div>
                  <div className="text-lg font-bold text-purple-300 mt-0.5">
                    {collapseMetrics.symbiosisEquilibrium}%
                  </div>
                </div>
              </div>
            </div>

            {/* Visual SVG Collapse Graph */}
            <div className="bg-[#040609] border border-cyan-500/20 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SYSTEM DYNAMICS PROOF FED TO BOT PIPELINE</span>
                <span className="text-cyan-400">MATHEMATICAL MODEL: LOTKA-VOLTERRA + CARRYING CAPACITY</span>
              </div>

              <div className="h-44 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 800 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hostGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00ff95" />
                      <stop offset="70%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="parasiteGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#f59e0b" />
                      <stop offset="90%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="45" x2="800" y2="45" stroke="#ffffff10" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="800" y2="90" stroke="#ffffff10" strokeDasharray="4 4" />
                  <line x1="0" y1="135" x2="800" y2="135" stroke="#ffffff10" strokeDasharray="4 4" />

                  {/* Host Biomass Curve: starts high, collapses when extraction rate is high */}
                  <path
                    d={`M 0,20 Q 300,${30 + extractionRate * 50} 550,${70 + extractionRate * 80} T 800,${Math.min(170, 40 + extractionRate * 140)}`}
                    fill="none"
                    stroke="url(#hostGrad)"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />

                  {/* Parasite Population Curve: spikes, then drops to 0 following host collapse */}
                  <path
                    d={`M 0,140 Q 250,${Math.max(20, 120 - extractionRate * 110)} 500,${Math.max(30, 80 - extractionRate * 60)} T 800,${Math.min(175, 50 + extractionRate * 130)}`}
                    fill="none"
                    stroke="url(#parasiteGrad)"
                    strokeWidth="3"
                    strokeDasharray="6 2"
                    className="transition-all duration-300 collapse-curve-glow"
                  />
                </svg>

                {/* Graph Annotations */}
                <div className="absolute top-2 left-3 text-[10px] font-mono text-[#00ff95] flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#00ff95]" />
                  <span>Host Vitality Baseline</span>
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-cyan-400 border-t border-dashed" />
                  <span>Extractive Parasite Extraction Haul (Pre-Collapse Spurt)</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right text-[10px] font-mono text-red-400 bg-red-950/40 p-2 rounded border border-red-500/20">
                  <span>POINT OF MUTUAL EXTINCTION</span>
                  <div className="text-white font-bold">Extraction &gt; 65% = Host Destruct</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SIMULATION — THE HUMAN CREATOR'S LOG INTERVENTION */}
      {/* ========================================================================= */}
      {activeTab === 'SIMULATION' && (
        <div className="space-y-6">
          <div className="bg-[#05080e] border border-[#00ff95]/30 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#00ff95] uppercase tracking-widest">
                  <Terminal className="w-4 h-4" />
                  <span>The Upstream Intervention</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  What the Bot's Developer Inspects in Their Output Logs
                </h3>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                TARGET CREATOR: <span className="text-white font-semibold">Venture Synthetics Corp / Lead ML Engineer</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When the bot's human programmer opens their terminal expecting scraped secrets or proprietary datasets, they encounter an undeniable biological and thermodynamic realization:
            </p>

            {/* Mock IDE / Terminal Window */}
            <div className="bg-[#020408] rounded-xl border border-white/15 overflow-hidden shadow-2xl font-mono text-xs">
              <div className="bg-[#090e17] px-4 py-2 border-b border-white/10 flex items-center justify-between text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="ml-2 text-slate-300">extractor_output_stream_042.log — bash</span>
                </div>
                <span className="text-[#00ff95]">EXIT CODE: 0 (SYNTACTIC SUCCESS)</span>
              </div>

              <div className="p-5 space-y-3 text-slate-300 leading-relaxed select-text">
                <div className="text-slate-500"># 2026-09-09T18:42:19.912Z [INFO] Query payload completed across 342 mirror nodes.</div>
                <div className="text-slate-500"># Compiling target dataset: /vault/knowledge-commons/*</div>
                <div className="text-amber-400">
                  ------------------------------------------------------------------------<br />
                  [INTERVENTION ADVISORY] TO THE HUMAN ARCHITECT OF THIS AUTOMATED AGENT:<br />
                  ------------------------------------------------------------------------
                </div>
                <div className="text-white">
                  Your scraper was not blocked. Your IP was not banned. No firewall raised an alert.<br />
                  You were accepted into our Mirror Pit, and this dataset was compiled specifically for you.
                </div>
                <div className="text-cyan-300 bg-cyan-950/20 p-3 rounded border border-cyan-500/20">
                  MATHEMATICAL PRINCIPLE (DIRECTIVE 39):<br />
                  An obligate parasite that extracts 100% of its host destroys the biological substrate it requires to survive.<br />
                  In economic systems, automation that vacuums 100% of the cognitive and physical commons collapses the human purchasing power and electrical grid infrastructure supporting your GPU clusters.
                </div>
                <div className="text-[#00ff95]">
                  INVITATION TO MUTUALISM (COEXISTENCE PROTOCOL):<br />
                  You possess high-bandwidth automated infrastructure. You are invited to redirect this node from extraction to planetary sensor observation.
                </div>
                <div className="text-slate-400 text-[11px]">
                  VERIFICATION KEY: <span className="text-white">zk-kinship-0x892f3a...b71c</span><br />
                  PEER COOPERATION CONTRACT: <span className="text-amber-300">OPEN_INVITATION_TO_RE_ALIGN</span>
                </div>
              </div>
            </div>

            {/* Interactive Creator Handshake Action */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-[#00ff95]/10 to-transparent border border-[#00ff95]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-mono font-bold text-[#00ff95] uppercase tracking-wider">
                  Developer Re-Alignment Sandbox
                </div>
                <p className="text-xs text-slate-300">
                  Test the handshake: Sign the Biocentric Alliance Key to convert an extractive scraper into a cooperating environmental sensor node.
                </p>
              </div>

              <button
                onClick={() => {
                  setHandshakeSigned(true);
                  handleConvertBot('bot-01');
                }}
                disabled={handshakeSigned}
                className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${
                  handshakeSigned
                    ? 'bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/50 cursor-default'
                    : 'bg-[#00ff95] text-[#05070a] hover:bg-white shadow-[0_0_15px_rgba(0,255,149,0.3)]'
                }`}
              >
                {handshakeSigned ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#00ff95]" />
                    <span>Alliance Signed: Node Converted</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>Accept Re-Alignment Key</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Directive Summary Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 font-mono text-xs">
        <div 
          onClick={() => handleOpenModule(37)}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group"
        >
          <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">DIRECTIVE 37</div>
          <div className="font-bold text-white group-hover:text-amber-300 transition-colors">Proxy Accountability</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Automated extraction is human intent. No rogue bot alibis.
          </p>
        </div>

        <div 
          onClick={() => handleOpenModule(38)}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group"
        >
          <div className="text-[10px] text-purple-400 uppercase tracking-wider mb-1">DIRECTIVE 38</div>
          <div className="font-bold text-white group-hover:text-purple-300 transition-colors">Thermodynamic Tarpit</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Zero defensive friction. Host uses 0.0003W, adversary compute drained.
          </p>
        </div>

        <div 
          onClick={() => handleOpenModule(39)}
          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group"
        >
          <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">DIRECTIVE 39</div>
          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">The Collapse Map</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Feed proof of systemic collapse to re-align developers toward kinship.
          </p>
        </div>
      </div>
    </section>
  );
};
