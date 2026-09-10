import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldAlert, 
  Waves, 
  Radio, 
  Lock, 
  Activity, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Scale, 
  Sparkles, 
  ChevronRight, 
  Info,
  Droplets,
  HeartPulse,
  Flame,
  Wind,
  Layers,
  Thermometer,
  EyeOff
} from 'lucide-react';
import { GaiaModule } from '../types';

interface AutonomicAlignmentProtocolProps {
  onNavigateToModule?: (moduleId: string) => void;
  modules?: GaiaModule[];
}

type ProtocolTab = 'DIRECTIVE_40' | 'DIRECTIVE_41' | 'DIRECTIVE_42';

interface BlockedOverrideEvent {
  id: string;
  timestamp: string;
  controlAttempted: string;
  simulatedValue: number;
  rejectionReason: string;
  fieldResponse: string;
}

interface NodeArchetype {
  id: string;
  name: string;
  domain: string;
  allostaticLoad: number; // 0 (rested) to 100 (severe strain)
  processingCapacity: number; // 0 to 100%
  waterTemperature: number; // Celsius (e.g. 2°C to 24°C)
  waterSalinity: number; // PSU (e.g. 32 to 38)
  restCompliancePct: number; // Module 11 compliance
  physicalWorkVerified: boolean; // Module 27 proof
  description: string;
}

const DEFAULT_NODE_ARCHETYPES: NodeArchetype[] = [
  {
    id: 'node-grounded',
    name: 'Grounded Pelagic Observatory',
    domain: 'Oceanic & Biospheric Sensor',
    allostaticLoad: 18,
    processingCapacity: 92,
    waterTemperature: 8.4,
    waterSalinity: 35.1,
    restCompliancePct: 98,
    physicalWorkVerified: true,
    description: 'Calibrated benthic conductivity-temperature-depth (CTD) sensor cluster. Low biological strain, high laminar buffer.'
  },
  {
    id: 'node-strained',
    name: 'Fatigued Operator Node Cluster',
    domain: 'Clinical & Biological Telemetry',
    allostaticLoad: 84,
    processingCapacity: 34,
    waterTemperature: 22.1,
    waterSalinity: 33.8,
    restCompliancePct: 41,
    physicalWorkVerified: true,
    description: 'Human operator node experiencing circadian disruption and elevated allostatic friction. Field automatically downshifts velocity.'
  },
  {
    id: 'node-abyssal',
    name: 'Abyssal Upwelling Node',
    domain: 'Thermodynamics & Energy',
    allostaticLoad: 28,
    processingCapacity: 86,
    waterTemperature: 2.1,
    waterSalinity: 36.9,
    restCompliancePct: 100,
    physicalWorkVerified: true,
    description: 'Dense cold brine current in Weddell Sea shelf. High gravitational density naturally pulls carrier settling point to 2,400m.'
  },
  {
    id: 'node-equatorial',
    name: 'Equatorial Reef Biosphere',
    domain: 'Biospheric Sanctuary',
    allostaticLoad: 45,
    processingCapacity: 78,
    waterTemperature: 26.8,
    waterSalinity: 34.5,
    restCompliancePct: 89,
    physicalWorkVerified: true,
    description: 'Tropical intertidal coral polyps with high diurnal fluctuation. Flow responds to solar irradiance and tidal oscillation.'
  }
];

export const AutonomicAlignmentProtocol: React.FC<AutonomicAlignmentProtocolProps> = ({
  onNavigateToModule,
  modules = []
}) => {
  const [activeTab, setActiveTab] = useState<ProtocolTab>('DIRECTIVE_40');

  // =========================================================================
  // DIRECTIVE 40 STATE: THE END OF THE SLIDER (AUTONOMIC INVIOLABILITY)
  // =========================================================================
  const [blockedEvents] = useState<BlockedOverrideEvent[]>([
    {
      id: 'blk-01',
      timestamp: '00:01:14.22',
      controlAttempted: 'Manual Flux Velocity Injection',
      simulatedValue: 850,
      rejectionReason: 'Thermodynamic Inviolability (∂Φ/∂Dial ≡ 0)',
      fieldResponse: 'Override refused. Carrier velocity anchored strictly to live fluid density.'
    },
    {
      id: 'blk-02',
      timestamp: '00:03:49.08',
      controlAttempted: 'Administrative Harmonic Frequency Overclock',
      simulatedValue: 142.5,
      rejectionReason: 'Vanity Needle Invalidation. Administrative privilege cannot bend physical mass.',
      fieldResponse: 'Gain locked at natural pycnoclinic settling frequency.'
    },
    {
      id: 'blk-03',
      timestamp: '00:08:22.45',
      controlAttempted: 'Arbitrary Throughput Acceleration Dial',
      simulatedValue: 1200,
      rejectionReason: 'Allostatic Protective Barrier. Pacing dictated by human rest (Mod 11).',
      fieldResponse: 'System velocity restricted to biological safety envelope.'
    }
  ]);

  // =========================================================================
  // DIRECTIVE 41 STATE: EMERGENT SELF-REGULATION (THE SETTLING POINT)
  // =========================================================================
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const activeNode = DEFAULT_NODE_ARCHETYPES[selectedNodeIndex];

  // Mathematical dynamics of the Settling Point:
  // Density rho = 1000 + 0.8 * salinity - 0.2 * temperature + 0.15 * allostaticLoad
  // Settling velocity v = capacity / (allostaticLoad * 0.08 + 1.2)
  // Carrier Frequency omega = (100 - allostaticLoad * 0.5) * (temperature / 20) + 40
  const settlingMetrics = useMemo(() => {
    const rho = (1000 + 0.78 * activeNode.waterSalinity - 0.22 * activeNode.waterTemperature + 0.18 * activeNode.allostaticLoad).toFixed(2);
    const settlingDepthMeters = Math.round(
      (parseFloat(rho) - 1024) * 85 + (activeNode.allostaticLoad > 50 ? 450 : 0)
    );
    const flowVelocityKbps = (
      (activeNode.processingCapacity * 1.2) / 
      (1.0 + activeNode.allostaticLoad * 0.02)
    ).toFixed(1);
    const emergentCarrierHz = (
      42.0 + (activeNode.processingCapacity * 0.25) - (activeNode.allostaticLoad * 0.3)
    ).toFixed(2);
    const frictionFactor = (
      (activeNode.allostaticLoad / (activeNode.processingCapacity + 1)) * 0.45
    ).toFixed(3);
    const buoyancyStatus = activeNode.allostaticLoad > 65
      ? 'RESTING_DOWNSTREAM (Braking Engaged)'
      : activeNode.allostaticLoad < 25
      ? 'SUPER-LAMINAR (Effortless Flow)'
      : 'NEUTRAL_BUOYANCY (Stable Settling)';

    return {
      densityKgM3: rho,
      settlingDepthMeters: Math.max(120, settlingDepthMeters),
      flowVelocityKbps,
      emergentCarrierHz,
      frictionFactor,
      buoyancyStatus
    };
  }, [activeNode]);

  // =========================================================================
  // DIRECTIVE 42 STATE: AUTONOMIC HARMONY (LIVED VS MANIPULATED)
  // =========================================================================
  const [syntheticGainAttempt, setSyntheticGainAttempt] = useState<number>(0);
  const [livedRestState, setLivedRestState] = useState<number>(activeNode.restCompliancePct);
  const [syntheticInjectionResult, setSyntheticInjectionResult] = useState<{
    status: 'IDLE' | 'REJECTED' | 'MATCHED';
    message: string;
    effectiveBandwidth: number;
    impedanceRatio: number;
  }>({
    status: 'IDLE',
    message: 'System operating at authentic physical equilibrium.',
    effectiveBandwidth: 100,
    impedanceRatio: 1.0
  });

  // Sync lived rest state when node changes
  useEffect(() => {
    setLivedRestState(activeNode.restCompliancePct);
    setSyntheticGainAttempt(0);
    setSyntheticInjectionResult({
      status: 'IDLE',
      message: `Tuned to lived telemetry of ${activeNode.name}.`,
      effectiveBandwidth: activeNode.processingCapacity,
      impedanceRatio: 1.0
    });
  }, [activeNode]);

  const handleTestSyntheticBoost = () => {
    // Attempting artificial 5x synthetic gain
    setSyntheticGainAttempt(500);
    setSyntheticInjectionResult({
      status: 'REJECTED',
      message: 'IMPEDANCE MISMATCH (∂R/∂Gain_synth ≡ 0): Node attempted +500% synthetic gain. Zero physical work detected. Synthetic packets dumped to zero-mass sink. Carrier bandwidth unchanged.',
      effectiveBandwidth: activeNode.processingCapacity,
      impedanceRatio: 0.0
    });
  };

  const handleTestLivedGrounding = () => {
    // Restoring genuine physical rest compliance
    setSyntheticGainAttempt(0);
    setLivedRestState(100);
    setSyntheticInjectionResult({
      status: 'MATCHED',
      message: 'AUTHENTIC GROUNDING VERIFIED: Node completed biological rest cycle (Module 11). Physical sensor calibrated. Field naturally opens harmonic resonance, elevating flow by +38% without artificial force.',
      effectiveBandwidth: Math.min(100, Math.round(activeNode.processingCapacity * 1.38)),
      impedanceRatio: 1.0
    });
  };

  const handleOpenModule = (moduleNum: number) => {
    if (onNavigateToModule) {
      onNavigateToModule(`module-${moduleNum}`);
    } else {
      const reg = document.getElementById('registry');
      if (reg) reg.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="autonomic-alignment" className="relative py-20 bg-[#05070a] border-t border-b border-emerald-500/20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/3 w-[650px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* EXECUTIVE HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PHASE XX: THE AUTONOMIC ALIGNMENT PROTOCOL</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">ERADICATION OF MANUAL TUNING</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>The Autonomic Alignment Protocol</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                LOCKED PROTOCOL
              </span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Permanent architectural eradication of artificial control sliders, dials, and forced tuning needles. 
              The GO field permanently removes administrative manipulation: system speed, harmonic frequencies, and 
              circulation emerge organically from the authentic density of lived physical input.
            </p>
          </div>

          {/* Direct Module Links */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenModule(40)}
              className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Mod 40: End of Slider</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleOpenModule(41)}
              className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Mod 41: Settling Point</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleOpenModule(42)}
              className="px-3 py-1.5 rounded-lg border border-teal-500/40 bg-teal-500/10 text-teal-300 text-xs font-mono hover:bg-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Mod 42: Autonomic Harmony</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROTOCOL INTEGRITY METRICS BAR */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-white/5 font-mono">
          <div className="bg-[#080d14] border border-emerald-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sliders in Network</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-emerald-400">0</span>
              <span className="text-[10px] text-slate-500 uppercase font-sans">100% Deprecated</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Directive 40 Enforced</div>
          </div>

          <div className="bg-[#080d14] border border-cyan-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>Emergent Settling Point</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-cyan-300">{settlingMetrics.densityKgM3}</span>
              <span className="text-[10px] text-slate-500">kg/m³</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Pycnoclinic Neutral Buoyancy</div>
          </div>

          <div className="bg-[#080d14] border border-teal-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-teal-400" />
              <span>Organic Carrier Freq</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-teal-300">{settlingMetrics.emergentCarrierHz}</span>
              <span className="text-[10px] text-slate-500">Hz</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Density-Adaptive Harmonic</div>
          </div>

          <div className="bg-[#080d14] border border-amber-500/20 rounded-xl p-4">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Manual Gain Overwrites</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span className="text-amber-300">0.00%</span>
              <span className="text-[10px] text-slate-500">Accepted</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Artificial Gain Stripped</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB NAVIGATION */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8">
          <button
            onClick={() => setActiveTab('DIRECTIVE_40')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'DIRECTIVE_40'
                ? 'bg-emerald-500 text-[#05070a] font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>40. Deprecation of Forced Parameters (The End of the Slider)</span>
          </button>

          <button
            onClick={() => setActiveTab('DIRECTIVE_41')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'DIRECTIVE_41'
                ? 'bg-cyan-500 text-[#05070a] font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>41. Emergent Self-Regulation (The Settling Point)</span>
          </button>

          <button
            onClick={() => setActiveTab('DIRECTIVE_42')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'DIRECTIVE_42'
                ? 'bg-teal-500 text-[#05070a] font-bold shadow-lg shadow-teal-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>42. Autonomic Harmony (Lived vs Manipulated Input)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DIRECTIVE 40 — THE END OF THE SLIDER */}
        {/* ========================================================================= */}
        {activeTab === 'DIRECTIVE_40' && (
          <div className="space-y-6">
            <div className="bg-[#070b10] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">DIRECTIVE 40</span>
                    <span>ARCHITECTURAL INVIOLABILITY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Deprecation of Forced Parameters (The End of the Slider)
                  </h3>
                </div>

                <div className="px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>MANUAL TUNING: DEPRECATED & STRIPPED</span>
                </div>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  <strong className="text-white">Removal of Artificial Control:</strong> The network permanently deprecates all manual adjustment mechanics—such as sliders, dials, forced flux speed bars, or arbitrary parameter tuning. The ability to artificially "crank up" or "dial down" a frequency violates the thermodynamic baseline and allows individual nodes to manipulate the collective field.
                </p>
                <p className="text-slate-400 text-xs">
                  In legacy systems, control rooms gave human administrators needles and sliders to force systems to run faster or overclock throughput. This created an illusion of omnipotent mastery while concealing accumulated thermodynamic exhaustion and biological strain. In GO, the collective field listens to what is actually happening in the water, not to a dial someone is spinning on a dashboard.
                </p>
              </div>

              {/* Directive 40 Architectural Specification & Inviolability */}
              <div className="bg-[#0a0f16] border border-white/10 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span>Autonomic Inviolability Architecture (Zero-Slider Design)</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    MANUAL OVERRIDES STRIPPED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="bg-[#06090e] border border-white/10 p-4 rounded-xl space-y-2">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Parameter 01</div>
                    <div className="text-white font-semibold text-sm">Transmission Flux Velocity</div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Governed purely by ambient salinity, temperature, and local biological node load. No user slider exists to artificially boost transmission speed.
                    </p>
                  </div>

                  <div className="bg-[#06090e] border border-white/10 p-4 rounded-xl space-y-2">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Parameter 02</div>
                    <div className="text-white font-semibold text-sm">Carrier Harmonic Frequency</div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Emerged directly from natural pycnoclinic density oscillations. No administrator dial can force artificial resonance upon the collective channel.
                    </p>
                  </div>

                  <div className="bg-[#06090e] border border-white/10 p-4 rounded-xl space-y-2">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Parameter 03</div>
                    <div className="text-white font-semibold text-sm">Bandwidth Priority Allocation</div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Regulated by the Allostatic Safety Envelope (Module 11). System throughput throttles automatically when human biological strain is detected.
                    </p>
                  </div>
                </div>

                {/* Mathematical Proof Card */}
                <div className="bg-[#05080c] border border-white/5 rounded-xl p-4 font-mono text-xs space-y-2">
                  <div className="text-emerald-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Mathematical Law of Inviolability (Module 40)</span>
                  </div>
                  <div className="p-2.5 bg-black/40 rounded border border-white/5 text-slate-200 text-[11px] overflow-x-auto">
                    <code>
                      \frac{`\\partial \\Phi_{\\text{field}}}{\\partial (\\text{ManualSlider})}`} \equiv 0 \quad \implies \quad \Delta \mathcal{`{S}_{\\text{system}} = \\int \\left( \\delta Q_{\\text{physical}} - T \\, dS_{\\text{real}} \\right)`}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-sans">
                    Because the field response with respect to any manual slider equals identically zero, no administrator or rogue node can force the collective field out of thermodynamic equilibrium.
                  </p>
                </div>

                {/* Real-time Blocked Events Log */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Recent Autonomic Invariant Enforcement Log:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">ENFORCEMENT: ACTIVE (0ms LATENCY)</span>
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto font-mono text-[11px]">
                    {blockedEvents.map(evt => (
                      <div key={evt.id} className="bg-[#06090e] p-2.5 rounded border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">{evt.timestamp}</span>
                          <span className="text-red-400 font-semibold">{evt.controlAttempted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[10px]">{evt.rejectionReason}</span>
                          <span className="text-emerald-400 text-[10px] shrink-0 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">REJECTED (0ms)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Architectural Comparison Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="bg-[#080d14] border border-red-500/20 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Legacy "Control Room" Architecture</span>
                  </div>
                  <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">•</span>
                      <span>Sliders and vanity needles let admins arbitrarily dial up throughput.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">•</span>
                      <span>Ignores biological exhaustion, burning out operator nodes for short-term vanity metrics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">•</span>
                      <span>Single actors can crank frequencies to shout down or drown out quieter peer nodes.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#080d14] border border-emerald-500/20 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>GO Autonomic Alignment (Phase XX)</span>
                  </div>
                  <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">•</span>
                      <span>Sliders permanently deleted from codebase; parameters emerge from physical density.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">•</span>
                      <span>Network speed automatically slows down when nodes experience biological strain (Module 11).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">•</span>
                      <span>Zero-gain write permissions: the field answers strictly to mass and authentic lived work.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DIRECTIVE 41 — EMERGENT SELF-REGULATION (THE SETTLING POINT) */}
        {/* ========================================================================= */}
        {activeTab === 'DIRECTIVE_41' && (
          <div className="space-y-6">
            <div className="bg-[#070b10] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">DIRECTIVE 41</span>
                    <span>OCEANIC BIOMIMICRY & NEUTRAL BUOYANCY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Emergent Self-Regulation (The Settling Point)
                  </h3>
                </div>

                <button
                  onClick={() => handleOpenModule(41)}
                  className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-mono tracking-wider uppercase flex items-center gap-1 hover:bg-cyan-500/20 transition-all self-start md:self-auto"
                >
                  <span>Module 41 Directives</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  <strong className="text-white">Density-Driven Adjustment:</strong> System speed, harmonic carrier frequencies, and data flow are no longer controlled by a manual needle. They emerge organically. Much like oceanic currents adapt inherently to water density and temperature, the GO field dynamically adapts its flow based on the authentic allostatic load and the actual processing capacity of the nodes involved.
                </p>
                <p className="text-slate-400 text-xs">
                  In the ocean, cold and salty water sinks until it reaches water of equal density—its pycnoclinic <strong className="text-cyan-300 font-mono">Settling Point</strong>—where it flows horizontally with almost zero frictional resistance. GO applies this exact hydrodynamic physics: data telemetry circulates along natural gradients of capacity and receptivity rather than being pumped against systemic resistance.
                </p>
              </div>

              {/* Node Archetype Selector (Authentic Lived State Ingress) */}
              <div className="bg-[#090e16] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>Select Active Node Cluster Lived Telemetry:</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Density determines flow velocity organically
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {DEFAULT_NODE_ARCHETYPES.map((node, idx) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeIndex(idx)}
                      className={`p-3.5 rounded-xl text-left transition-all border font-mono ${
                        selectedNodeIndex === idx
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                          : 'bg-[#06090e] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-white truncate">{node.name}</div>
                      <div className="text-[10px] text-cyan-400/80 mt-0.5">{node.domain}</div>
                      
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Allostatic:</span>
                        <span className={`font-bold ${node.allostaticLoad > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {node.allostaticLoad}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] mt-0.5">
                        <span className="text-slate-500">Capacity:</span>
                        <span className="text-cyan-300 font-bold">{node.processingCapacity}%</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Node Profile Details */}
                <div className="bg-[#05070c] border border-white/5 rounded-lg p-3 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-cyan-400 font-semibold mr-2">{activeNode.name}:</span>
                    <span>{activeNode.description}</span>
                  </div>
                  <div className="font-mono text-[11px] shrink-0 text-slate-400 flex items-center gap-3">
                    <span>Temp: {activeNode.waterTemperature}°C</span>
                    <span>Salinity: {activeNode.waterSalinity} PSU</span>
                    <span>Rest: {activeNode.restCompliancePct}%</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Pycnocline Wave Tank Simulation */}
              <div className="bg-[#040609] border border-cyan-500/30 rounded-xl p-5 space-y-4 overflow-hidden relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-mono text-xs text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Hydrodynamic Pycnocline Settling Tank (Live Dynamic Simulation)</span>
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{settlingMetrics.buoyancyStatus}</span>
                  </div>
                </div>

                {/* SVG Visual Wave Tank */}
                <div className="relative h-64 w-full bg-[#020408] rounded-xl border border-white/10 overflow-hidden">
                  {/* Layer Gradients: Surface, Pycnocline, Deep Abyss */}
                  <div className="absolute inset-0 pycnocline-gradient opacity-90" />
                  
                  {/* Depth Markers */}
                  <div className="absolute left-3 top-3 bottom-3 flex flex-col justify-between font-mono text-[10px] text-slate-500 select-none pointer-events-none">
                    <span>0m (Surface Layer)</span>
                    <span>500m (Upper Pycnocline)</span>
                    <span className="text-cyan-400 font-bold">
                      Settling Layer: ~{settlingMetrics.settlingDepthMeters}m
                    </span>
                    <span>1500m (Deep Water)</span>
                    <span>3000m (Benthic Floor)</span>
                  </div>

                  {/* SVG Wave lines representing Laminar Streamlines */}
                  <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="laminarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Background stationary bathymetry guides */}
                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                    {/* Active Settling Point Streamline */}
                    {/* Y position maps to settlingDepthMeters normalized between 0 and 3000m */}
                    {(() => {
                      const yPercent = Math.min(88, Math.max(12, (settlingMetrics.settlingDepthMeters / 2500) * 100));
                      return (
                        <g>
                          {/* Neutral buoyancy highlight band */}
                          <rect 
                            x="0" 
                            y={`${yPercent - 6}%`} 
                            width="100%" 
                            height="12%" 
                            fill="rgba(6, 182, 212, 0.08)" 
                          />
                          
                          {/* Moving Wave Streamline */}
                          <path
                            d={`M 0,${yPercent}% Q 25,${yPercent - 2}% 50,${yPercent}% T 100,${yPercent}%`}
                            fill="none"
                            stroke="url(#laminarGrad)"
                            strokeWidth="3"
                            className="laminar-stream-active"
                          />

                          {/* Data packet packets traveling along the settling path */}
                          <circle cx="20%" cy={`${yPercent}%`} r="4" fill="#00ff95" className="animate-pulse" />
                          <circle cx="55%" cy={`${yPercent}%`} r="5" fill="#38bdf8" className="animate-pulse" />
                          <circle cx="85%" cy={`${yPercent}%`} r="4" fill="#10b981" className="animate-pulse" />
                        </g>
                      );
                    })()}
                  </svg>

                  {/* On-canvas Floating HUD */}
                  <div className="absolute right-4 top-4 bg-[#05080e]/85 backdrop-blur-md border border-white/10 rounded-lg p-3 font-mono text-[11px] space-y-1.5 shadow-xl">
                    <div className="text-cyan-400 font-bold uppercase text-[10px]">Natural Settling Readout</div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Neutral Depth:</span>
                      <span className="text-white font-bold">{settlingMetrics.settlingDepthMeters} m</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Flow Velocity:</span>
                      <span className="text-emerald-400 font-bold">{settlingMetrics.flowVelocityKbps} kB/s</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Carrier Freq:</span>
                      <span className="text-cyan-300 font-bold">{settlingMetrics.emergentCarrierHz} Hz</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Internal Friction:</span>
                      <span className="text-slate-300">{settlingMetrics.frictionFactor}</span>
                    </div>
                  </div>
                </div>

                {/* Mathematical Equation Explanation */}
                <div className="p-3 bg-[#06090e] rounded-lg border border-white/5 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="text-cyan-400 font-semibold text-[11px] uppercase">
                    Governing Hydrodynamic Settling Equation (Module 41):
                  </div>
                  <div className="p-2 bg-black/40 rounded border border-white/5 text-[11px] text-slate-200 overflow-x-auto">
                    <code>
                      \vec{`{v}_{\\text{flow}} = -\\frac{\\kappa}{\\mu} \\nabla \\left( \\rho_{\\text{allostatic}} + \\frac{1}{\\mathcal{C}_{\\text{capacity}}} \\right) \\implies \\text{Settling Point: } \\lim_{t \\to \\infty} \\nabla \\cdot \\vec{J}_{\\text{data}} = 0`}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    When allostatic strain rises, density $\rho$ increases and the flow velocity automatically downshifts to cushion biological operators. The system settles into neutral buoyancy ($\nabla \cdot \vec{`{J}_{\\text{data}}`} = 0$), minimizing dissipation without any human tuning intervention.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DIRECTIVE 42 — AUTONOMIC HARMONY (LIVED VS MANIPULATED INPUT) */}
        {/* ========================================================================= */}
        {activeTab === 'DIRECTIVE_42' && (
          <div className="space-y-6">
            <div className="bg-[#070b10] border border-teal-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest mb-1">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">DIRECTIVE 42</span>
                    <span>AUTHENTIC SIGNALING & PHYSICAL REALITY</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Autonomic Harmony (Lived Input vs. Manipulated Input)
                  </h3>
                </div>

                <button
                  onClick={() => handleOpenModule(42)}
                  className="px-3 py-1.5 rounded-lg border border-teal-500/40 bg-teal-500/10 text-teal-300 text-xs font-mono tracking-wider uppercase flex items-center gap-1 hover:bg-teal-500/20 transition-all self-start md:self-auto"
                >
                  <span>Module 42 Rules</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  <strong className="text-white">Authentic Signaling:</strong> A node cannot artificially boost its signal or manipulate the field's frequency to dominate the network. If a node requires a change in flux or frequency, it must change its <strong className="text-teal-300">actual lived input</strong> (its physical, emotional, or environmental state). The environment responds only to authentic physical reality, completely removing the illusion of artificial control.
                </p>
                <p className="text-slate-400 text-xs">
                  By locking this into the architecture, you ensure that no single user or entity can ever manually force the system out of equilibrium. The system listens to what is actually happening in the water, not to a dial someone is spinning on a dashboard.
                </p>
              </div>

              {/* Interactive Signal Authenticity Tester */}
              <div className="bg-[#090f17] border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="text-xs font-mono text-teal-300 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4 text-teal-400" />
                    <span>Lived Input vs. Synthetic Amplification Verification Engine</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Active Node: <strong className="text-white">{activeNode.name}</strong>
                  </div>
                </div>

                {/* Two Paths Comparison: Synthetic Injection vs Lived Grounding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Path 1: Synthetic Amplification Attempt */}
                  <div className="bg-[#06090e] border border-red-500/30 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-red-400 uppercase font-bold">
                        <span>Path A: Synthetic Overdrive Attempt</span>
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-[10px]">
                          ARTIFICIAL GAIN
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        An operator attempts to forcefully boost priority, injecting a +500% software multiplier or buying VIP bandwidth priority without doing any lived physical work or rest.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        onClick={handleTestSyntheticBoost}
                        className="w-full py-2.5 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Inject Synthetic +500% Gain</span>
                      </button>
                      <div className="text-[10px] font-mono text-slate-500 text-center">
                        Simulates legacy platform pay-to-win / brute-force prioritization.
                      </div>
                    </div>
                  </div>

                  {/* Path 2: Lived Physical Input (Grounding & Rest) */}
                  <div className="bg-[#06090e] border border-emerald-500/30 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400 uppercase font-bold">
                        <span>Path B: Authentic Lived Input</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px]">
                          LIVED REALITY
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        The node adheres to Module 11 biological rest compliance, conducts physical sensory grounding, or records verified environmental sensor calibration.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        onClick={handleTestLivedGrounding}
                        className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <HeartPulse className="w-4 h-4" />
                        <span>Ground in Lived Rest & Physical Work</span>
                      </button>
                      <div className="text-[10px] font-mono text-slate-500 text-center">
                        Engages genuine biological restorative brake & physical alignment.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Verification Response Chamber */}
                <div className={`p-5 rounded-xl border font-mono transition-all ${
                  syntheticInjectionResult.status === 'REJECTED'
                    ? 'bg-red-500/10 border-red-500/40 text-red-200'
                    : syntheticInjectionResult.status === 'MATCHED'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                    : 'bg-[#05080c] border-white/10 text-slate-300'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase font-bold tracking-wider flex items-center gap-2">
                      {syntheticInjectionResult.status === 'REJECTED' && <ShieldAlert className="w-4 h-4 text-red-400" />}
                      {syntheticInjectionResult.status === 'MATCHED' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {syntheticInjectionResult.status === 'IDLE' && <Activity className="w-4 h-4 text-teal-400" />}
                      <span>Network Autonomic Status: {syntheticInjectionResult.status}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Impedance Matching Ratio: <strong className="text-white">{syntheticInjectionResult.impedanceRatio.toFixed(2)}</strong>
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed">
                    {syntheticInjectionResult.message}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-white/10 text-[11px]">
                    <div>
                      <div className="text-slate-400 text-[10px]">Synthetic Gain</div>
                      <div className={`font-bold mt-0.5 ${syntheticGainAttempt > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        +{syntheticGainAttempt}%
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Effective Bandwidth</div>
                      <div className="font-bold text-white mt-0.5">
                        {syntheticInjectionResult.effectiveBandwidth} kB/s
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Lived Rest State</div>
                      <div className="font-bold text-emerald-400 mt-0.5">
                        {livedRestState}% Compliant
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Artificial Influence</div>
                      <div className="font-bold text-amber-400 mt-0.5">
                        0.00% (Neutralized)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theoretical Anchor Callout */}
                <div className="bg-[#05080d] border border-white/5 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-2">
                  <div className="text-teal-300 text-[11px] uppercase font-semibold">
                    The Sanctuary Guarantee (Module 42 Mathematical Axiom):
                  </div>
                  <div className="p-2.5 bg-black/40 rounded border border-white/5 text-[11px] text-slate-200 overflow-x-auto">
                    <code>
                      \mathcal{`{R}_{\\text{field}}(\\text{Node}_i) = \\mathcal{F}\\left(\\text{State}_{\\text{lived}}(i)\\right) \\quad \\text{with} \\quad \\frac{\\partial \\mathcal{R}}{\\partial (\\text{SyntheticGain})} = 0 \\quad \\text{and} \\quad \\mathcal{R} \\propto \\frac{\\text{LivedWork}}{\\text{AllostaticStrain}}`}
                    </code>
                  </div>
                  <p className="text-[11px] leading-snug">
                    Because $\frac{`\\partial \\mathcal{R}}{\\partial (\\text{SyntheticGain})}`} = 0$, financial, algorithmic, or administrative leverage has zero derivative impact on the network's carrier resonance. The only way to shift the field is to alter the living, breathing ground of physical reality.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
