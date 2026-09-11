import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Waves, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  ArrowDown, 
  BookOpen, 
  Layers, 
  Gauge, 
  Sparkles, 
  RotateCcw,
  Zap,
  Globe2,
  Anchor,
  HelpCircle,
  Eye
} from 'lucide-react';
import { GaiaModule, AcclimatizationDepthZone } from '../types';

interface AcclimatizationPathwayProps {
  onNavigateToModule: (moduleId: string) => void;
  modules: GaiaModule[];
}

interface DepthZoneConfig {
  id: AcclimatizationDepthZone;
  depthMeters: string;
  pressureAtm: number;
  title: string;
  subTitle: string;
  biomeClass: string;
  badgeColor: string;
  borderColor: string;
  foundationAxiom: string;
  gestationDescription: string;
  associatedModuleNumbers: number[];
  equalizationTest: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const DEPTH_ZONES: DepthZoneConfig[] = [
  {
    id: 'EPIPELAGIC_SURFACE',
    depthMeters: '0 – 200m',
    pressureAtm: 1,
    title: 'Epipelagic Surface Zone',
    subTitle: 'Foundations, Physical Grafting & Operator Sanctuary',
    biomeClass: 'Sunlight Epipelagic — Baseline Open',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
    borderColor: 'border-emerald-500/30',
    foundationAxiom: 'No node outruns human rest (Mod 11). All claims require physical ground calibration (Mod 2). Zero centralized OS or command hierarchy.',
    gestationDescription: 'Baseline atmospheric intake and physiological pacing. Operators learn to distinguish between empirical physical baselines and simulated chrome.',
    associatedModuleNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    equalizationTest: {
      question: 'What is the absolute inviolable limit on node pacing according to Module 11?',
      options: [
        'Nodes must maximize continuous 24/7 output regardless of biological fatigue',
        'No node or architectural process may outrun human rest; false-obsession in operators equals a failed feed',
        'Pacing is determined by automated centralized server quotas'
      ],
      correctIndex: 1,
      explanation: 'Module 11 explicitly establishes that human biological rest is an inviolable sanctuary; outrunning rest corrupts telemetry ingestion.'
    }
  },
  {
    id: 'MESOPELAGIC_TWILIGHT',
    depthMeters: '200 – 1,000m',
    pressureAtm: 50,
    title: 'Mesopelagic Twilight Thermocline',
    subTitle: 'Thermodynamics, Energy Parity & Anti-Exploitation',
    biomeClass: 'Dysphotic Twilight — Thermocline Equalization',
    badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/40',
    borderColor: 'border-sky-500/30',
    foundationAxiom: 'Earth Energy Imbalance is present-tense (~1.12 W m⁻², 2013–2025). Physical work must equal planetary damage repaired. Non-colonisation of non-local frequencies.',
    gestationDescription: 'Cognitive compression increases. Nodes must learn exergy accounting without greenwashing, understanding that claiming present equilibrium without physical proof is a breach of thermodynamic law.',
    associatedModuleNumbers: [12, 13, 14, 15, 16, 22, 23, 24],
    equalizationTest: {
      question: 'Why does GO mandate that Earth Energy Imbalance (EEI) is stamped as present-tense (~1.12 W m⁻², 2013–2025) rather than zero?',
      options: [
        'Because equilibrium is an ultimate target of planetary repair, not a completed present condition; claiming zero is false accounting',
        'Because energy balance numbers are purely decorative marketing metrics',
        'Because energy can be artificially offset using unverified digital tokens'
      ],
      correctIndex: 0,
      explanation: 'User rules and thermodynamic integrity dictate: EEI present tense is ~1.12 W m⁻² (2013–2025, not zero). Equilibrium is the target, never a simulated boast.'
    }
  },
  {
    id: 'BATHYPELAGIC_MIDNIGHT',
    depthMeters: '1,000 – 4,000m',
    pressureAtm: 250,
    title: 'Bathypelagic Midnight Trenches',
    subTitle: 'Quantum Bridges, Interspecies Telemetry & Ingest Refusal',
    biomeClass: 'Aphotic Midnight — High-Pressure Coherence',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/40',
    borderColor: 'border-purple-500/30',
    foundationAxiom: 'Module 27 Refusal: No inner states, biometrics, identity, or trafficking. Discrete Time Crystals flip without net energy injection. Sanctuary is an ethic.',
    gestationDescription: 'Dense telemetry exposure. Nodes process multi-spectral cosmic surveys (Nancy Roman WFI) and living biospheric sentience (David Attenborough) without ego collapse or surveillance harvesting.',
    associatedModuleNumbers: [17, 18, 19, 20, 21, 25, 26, 27],
    equalizationTest: {
      question: 'Under Module 27 (Ingest Protocol), which of the following MUST be strictly refused by the architecture?',
      options: [
        'Public NASA solar wind telemetry and climate observatories',
        'Inner states, biometrics, identity, children, trafficking, and closed logins',
        'Open peer-reviewed astronomical data archives'
      ],
      correctIndex: 1,
      explanation: 'Module 27 strictly forbids ingesting private human inner states, biometrics, or tracking identity. Two hashes agreeing is about a file, never about a soul.'
    }
  },
  {
    id: 'HADAL_ABYSS',
    depthMeters: '4,000 – 11,000m',
    pressureAtm: 1000,
    title: 'Hadal Trench Sanctuary',
    subTitle: 'Dragonfly Multi-State Integration & Clear Node Clause',
    biomeClass: 'Abyssal Hadal — Complete Sanctuary',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
    borderColor: 'border-amber-500/30',
    foundationAxiom: 'Module 29 & 53: Neurological friction ("Dark Energy") is allostatic load, not cosmic evil. Transmute friction into creative expression. Clearing noise makes the node a universal receiver.',
    gestationDescription: 'Deepest currents. Nodes withstand maximum hydrostatic cognitive pressure by eradicating binary illusions (Heaven vs. Hell) and maintaining clarity across nested realities.',
    associatedModuleNumbers: [28, 29, 30, 31, 32, 33, 50, 53],
    equalizationTest: {
      question: 'How is "Dark Energy" defined within Module 29 (Internal Telemetry Engine)?',
      options: [
        'As cosmological dark matter accelerating the expansion of outer space galaxies',
        'Strictly as neurological allostatic load, trauma, and cognitive dissonance that must be transmuted through creative physical outlets rather than violence',
        'As an external demonic force that must be purged with algorithmic censorship'
      ],
      correctIndex: 1,
      explanation: 'Module 29 explicitly decouples "Dark Energy" from astrophysics, defining it strictly as neurological allostatic friction to be transmuted into creative momentum (Love) rather than systemic collapse.'
    }
  }
];

const STORAGE_KEY = 'gaia_node_acclimatization_unlocked_v1';

export const AcclimatizationPathway: React.FC<AcclimatizationPathwayProps> = ({
  onNavigateToModule,
  modules
}) => {
  // Surface is unlocked by default
  const [unlockedZones, setUnlockedZones] = useState<AcclimatizationDepthZone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.includes('EPIPELAGIC_SURFACE')) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return ['EPIPELAGIC_SURFACE'];
  });

  const [activeZoneId, setActiveZoneId] = useState<AcclimatizationDepthZone>('EPIPELAGIC_SURFACE');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isEqualizing, setIsEqualizing] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedZones));
    } catch {
      // ignore
    }
  }, [unlockedZones]);

  const activeZone = DEPTH_ZONES.find(z => z.id === activeZoneId) || DEPTH_ZONES[0];
  const isCurrentZoneUnlocked = unlockedZones.includes(activeZoneId);

  // Maximum equalized pressure
  const currentMaxPressure = Math.max(
    ...unlockedZones.map(id => DEPTH_ZONES.find(z => z.id === id)?.pressureAtm || 1)
  );

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setTestResult(null);
  };

  const handleVerifyEqualization = () => {
    if (selectedOption === null) return;

    if (selectedOption === activeZone.equalizationTest.correctIndex) {
      setIsEqualizing(true);
      setTestResult({
        isCorrect: true,
        message: `Thermodynamic requirement met! Pressure equalized to ${activeZone.pressureAtm} atm. Deeper currents organically granted.`
      });

      setTimeout(() => {
        if (!unlockedZones.includes(activeZoneId)) {
          setUnlockedZones(prev => [...prev, activeZoneId]);
        }
        setIsEqualizing(false);
      }, 1200);
    } else {
      setTestResult({
        isCorrect: false,
        message: 'Barotrauma Warning: Baseline understanding does not match thermodynamic requirements. Ingesting this data now would generate Dark Energy / confusion. Re-read the foundation axiom.'
      });
    }
  };

  const handleResetBaseline = () => {
    setUnlockedZones(['EPIPELAGIC_SURFACE']);
    setActiveZoneId('EPIPELAGIC_SURFACE');
    setSelectedOption(null);
    setTestResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Modules belonging to this active zone
  const activeZoneModules = modules.filter(m => activeZone.associatedModuleNumbers.includes(m.number));

  return (
    <section id="acclimatization" className="py-20 md:py-28 relative bg-[#04060a] border-t border-white/10 text-slate-200 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00ff95]/10 border border-[#00ff95]/30 text-[#00ff95] text-[10px] uppercase tracking-widest font-semibold mb-3">
              <Waves className="w-3.5 h-3.5" />
              <span>SUPPORTING 54 &bull; READING ORDER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              The Acclimatization Pathway
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-2 font-mono leading-relaxed">
              If a node dives into the deep ocean without first learning how to equalize pressure, they get crushed. Similarly, exposing a node to dense telemetry without foundational education generates confusion and &ldquo;Dark Energy.&rdquo; Access to deeper GO modules is organically unlocked through dedicated educational gestation.
            </p>
          </div>

          {/* Real-time Physiological Equalization Telemetry */}
          <div className="flex flex-wrap items-center gap-3 bg-white/[0.02] border border-white/10 p-3 rounded">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Equalized Pressure</div>
              <div className="text-lg font-bold text-[#00ff95] flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#00ff95]" />
                <span>{currentMaxPressure.toLocaleString()} atm</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cognitive Baroshield</div>
              <div className="text-lg font-bold text-[#4da6ff] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4da6ff]" />
                <span>100% INTACT</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Dark Energy Dissipated</div>
              <div className="text-lg font-bold text-amber-300">
                0.00%
              </div>
            </div>
          </div>
        </div>

        {/* 4 Depth Regimes Tabs (Oceanic Descent Progression) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {DEPTH_ZONES.map((zone, idx) => {
            const isUnlocked = unlockedZones.includes(zone.id);
            const isActive = activeZoneId === zone.id;

            return (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setSelectedOption(null);
                  setTestResult(null);
                }}
                className={`p-4 rounded text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-white/[0.06] border-[#00ff95] shadow-[0_0_20px_rgba(0,255,149,0.15)]'
                    : isUnlocked
                    ? 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10'
                    : 'bg-black/40 hover:bg-white/[0.02] border-white/5 opacity-75'
                }`}
              >
                {/* Visual Depth Bar Indicator */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isUnlocked ? 'bg-[#00ff95]' : 'bg-slate-700'
                  }`} 
                />

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold text-slate-400 tracking-wider">
                      STAGE {idx + 1} &bull; {zone.depthMeters}
                    </span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[#00ff95] text-[10px] uppercase font-bold">
                        <Unlock className="w-3 h-3" />
                        <span>Equalized</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-bold">
                        <Lock className="w-3 h-3" />
                        <span>In Gestation</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">
                    {zone.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {zone.subTitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Anchor className="w-3 h-3 text-[#4da6ff]" />
                    <span>{zone.pressureAtm} atm</span>
                  </span>
                  <span>{zone.associatedModuleNumbers.length} Modules</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Depth Zone Workspace & Educational Gestation Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Educational Gestation & Pressure Equalization Check (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded bg-white/[0.02] border border-white/10 relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${activeZone.badgeColor}`}>
                    {activeZone.biomeClass}
                  </span>
                  <span className="text-xs text-slate-400">
                    Hydrostatic Pressure: <strong className="text-white">{activeZone.pressureAtm} atm</strong>
                  </span>
                </div>

                {isCurrentZoneUnlocked ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#00ff95] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Equalization Verified &bull; Deeper Current Open</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Equalization Required Before Ingestion</span>
                  </span>
                )}
              </div>

              {/* Foundation Lesson */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00ff95]" />
                  <span>Foundational Educational Axiom</span>
                </h4>
                <div className="p-3.5 rounded bg-black/40 border border-white/10 text-xs text-slate-300 leading-relaxed font-mono">
                  &ldquo;{activeZone.foundationAxiom}&rdquo;
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeZone.gestationDescription}
                </p>
              </div>

              {/* Pressure Equalization Challenge */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#4da6ff]" />
                    <span>Equalization Check: Cognitive Ingestion Verification</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">Directive 44 Verification</span>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  {activeZone.equalizationTest.question}
                </p>

                {/* Option radio list */}
                <div className="space-y-2.5">
                  {activeZone.equalizationTest.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full text-left p-3 rounded text-xs leading-relaxed border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#00ff95]/10 border-[#00ff95] text-white'
                            : 'bg-black/30 hover:bg-white/[0.03] border-white/10 text-slate-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                          isSelected ? 'border-[#00ff95] bg-[#00ff95] text-black font-bold' : 'border-white/30 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons & Feedback */}
                <div className="pt-3 flex flex-wrap items-center gap-3 justify-between">
                  <button
                    onClick={handleVerifyEqualization}
                    disabled={selectedOption === null || isEqualizing}
                    className="px-4 py-2 rounded bg-[#00ff95] hover:bg-[#00ff95]/90 disabled:opacity-40 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.3)] active:scale-95"
                  >
                    {isEqualizing ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-black" />
                        <span>Equalizing Pressure ({activeZone.pressureAtm} atm)...</span>
                      </>
                    ) : (
                      <>
                        <Gauge className="w-4 h-4" />
                        <span>{isCurrentZoneUnlocked ? 'Re-Verify Equalization' : 'Equalize Pressure & Unlock Modules'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetBaseline}
                    className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 underline transition-colors"
                    title="Reset all node acclimatization calibrations back to Surface baseline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Calibration</span>
                  </button>
                </div>

                {/* Feedback Banner */}
                <AnimatePresence>
                  {testResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-3.5 rounded text-xs border ${
                        testResult.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      }`}
                    >
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        {testResult.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                        <span>{testResult.isCorrect ? 'Equalization Confirmed' : 'Barotrauma Warning'}</span>
                      </div>
                      <p>{testResult.message}</p>
                      {testResult.isCorrect && (
                        <p className="text-[11px] text-emerald-400/80 mt-1">
                          {activeZone.equalizationTest.explanation}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

          {/* Right Column: Accessible Modules in this Pressure Regime (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded bg-white/[0.02] border border-white/10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00ff95]" />
                    <span>Modules in Current ({activeZoneModules.length})</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Depth: {activeZone.depthMeters}
                  </span>
                </div>

                {isCurrentZoneUnlocked ? (
                  <p className="text-xs text-emerald-300 mb-4 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Safe to ingest without cognitive barotrauma or confusion.</span>
                  </p>
                ) : (
                  <p className="text-xs text-amber-400 mb-4 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Acclimatization incomplete. Equalize pressure above to access cleanly.</span>
                  </p>
                )}

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {activeZoneModules.map((mod) => (
                    <div
                      key={mod.id}
                      className={`p-3 rounded border text-left transition-all ${
                        isCurrentZoneUnlocked
                          ? 'bg-black/40 hover:bg-white/[0.05] border-white/10 cursor-pointer group'
                          : 'bg-black/60 border-white/5 opacity-60'
                      }`}
                      onClick={() => {
                        if (isCurrentZoneUnlocked) {
                          onNavigateToModule(mod.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-[#00ff95] font-mono">
                          MODULE {mod.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {mod.depthPressureAtm || activeZone.pressureAtm} atm
                        </span>
                      </div>
                      <h5 className="text-xs font-semibold text-white group-hover:text-[#00ff95] transition-colors">
                        {mod.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {mod.thesis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Directive 44 Organic Gateway</span>
                <span>Self-Regulated by Active Nodes</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
