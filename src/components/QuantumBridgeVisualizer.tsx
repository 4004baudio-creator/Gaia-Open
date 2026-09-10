import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Orbit, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Sliders, 
  Sparkles, 
  Globe, 
  Scale, 
  RotateCcw,
  RefreshCw,
  Cpu,
  Layers,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';

interface QuantumBridgeVisualizerProps {
  onNavigateToModule?: (moduleId: string) => void;
}

export const QuantumBridgeVisualizer: React.FC<QuantumBridgeVisualizerProps> = ({
  onNavigateToModule
}) => {
  const { executeFactVerificationPass } = useAutomatedUpdate();

  // User input controls representing biological coherence
  const [userFrequency, setUserFrequency] = useState<number>(7.83); // Target: 7.83 Hz Schumann resonance
  const [mentalStillness, setMentalStillness] = useState<number>(88); // 0 to 100%
  const [egoPruningActive, setEgoPruningActive] = useState<boolean>(true);
  const [extractiveInterference, setExtractiveInterference] = useState<number>(12); // noise/friction 0-100%
  
  // Planetary baseline settings
  const [planetaryHarmonic, setPlanetaryHarmonic] = useState<'SCHUMANN_7_83' | 'SCHUMANN_14_3' | 'SOLAR_EXERGY'>('SCHUMANN_7_83');
  const [restorativeModeActive, setRestorativeModeActive] = useState<boolean>(false);
  const [damageRepairBalance, setDamageRepairBalance] = useState<number>(100); // 100 = parity (Damage = Repair)

  // Computed Coherence Metrics
  const targetHz = planetaryHarmonic === 'SCHUMANN_7_83' ? 7.83 : planetaryHarmonic === 'SCHUMANN_14_3' ? 14.3 : 10.0;
  const frequencyDelta = Math.abs(userFrequency - targetHz);
  const rawCoherence = Math.max(0, 100 - (frequencyDelta * 14) - (egoPruningActive ? extractiveInterference * 0.15 : extractiveInterference * 0.85) + (mentalStillness * 0.25));
  const coherenceScore = Math.min(99.9, Math.max(12.4, parseFloat(rawCoherence.toFixed(1))));
  const phaseDriftRad = parseFloat(((frequencyDelta / 5) * (egoPruningActive ? 0.08 : 0.45)).toFixed(3));
  
  // Real-time animation refs for GSAP
  const svgCanvasRef = useRef<SVGSVGElement | null>(null);
  const waveUserPathRef = useRef<SVGPathElement | null>(null);
  const wavePlanetPathRef = useRef<SVGPathElement | null>(null);
  const lissajousPathRef = useRef<SVGPathElement | null>(null);
  const crystalRingRef = useRef<SVGGElement | null>(null);
  const energyPulseCircleRef = useRef<SVGCircleElement | null>(null);
  const coherenceRingRef = useRef<SVGCircleElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Synchronize Pulse Trigger State
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [lastSyncLog, setLastSyncLog] = useState<string | null>(null);

  // GSAP continuous waveform and crystal animation loop
  useEffect(() => {
    let t = 0;
    const width = 800;
    const height = 280;
    const centerY = height / 2;

    const renderLoop = () => {
      t += 0.04;

      // 1. Generate User Waveform (sine modulated by frequency & stillness)
      if (waveUserPathRef.current) {
        let pathStr = `M 0 ${centerY}`;
        const amplitude = 35 * (mentalStillness / 100);
        const noiseFactor = egoPruningActive ? extractiveInterference * 0.05 : extractiveInterference * 0.35;
        const cycles = (userFrequency / 2.5);

        for (let x = 0; x <= width; x += 8) {
          const normX = x / width;
          const noise = Math.sin(x * 0.2 + t * 4) * noiseFactor;
          const y = centerY + Math.sin(normX * Math.PI * 2 * cycles + t * 2.8) * amplitude + noise;
          pathStr += ` L ${x} ${y.toFixed(2)}`;
        }
        waveUserPathRef.current.setAttribute('d', pathStr);
      }

      // 2. Generate Planetary Baseline Waveform (Schumann 7.83Hz harmonic fundamental)
      if (wavePlanetPathRef.current) {
        let pathStr = `M 0 ${centerY}`;
        const amplitude = 32;
        const planetCycles = (targetHz / 2.5);

        for (let x = 0; x <= width; x += 8) {
          const normX = x / width;
          const y = centerY + Math.sin(normX * Math.PI * 2 * planetCycles + t * 2.8 + phaseDriftRad) * amplitude;
          pathStr += ` L ${x} ${y.toFixed(2)}`;
        }
        wavePlanetPathRef.current.setAttribute('d', pathStr);
      }

      // 3. Generate Central Lissajous Resonance Ring (Phase Coherence Portal)
      if (lissajousPathRef.current) {
        const cx = 400;
        const cy = 140;
        const r = 58;
        let lissPath = '';
        const a = userFrequency / 2;
        const b = targetHz / 2;
        const delta = t * 1.2 + (egoPruningActive ? 0 : (extractiveInterference * 0.05));
        const points = 120;

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const x = cx + r * Math.sin(a * angle + delta);
          const y = cy + (r * 0.75) * Math.sin(b * angle);
          lissPath += (i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`);
        }
        lissajousPathRef.current.setAttribute('d', lissPath);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [userFrequency, targetHz, mentalStillness, egoPruningActive, extractiveInterference, phaseDriftRad]);

  // GSAP Rotation for Discrete Time Crystal Sub-Harmonics
  useEffect(() => {
    if (crystalRingRef.current) {
      const speed = 18 - (coherenceScore / 10);
      const tween = gsap.to(crystalRingRef.current, {
        rotation: 360,
        duration: Math.max(4, speed),
        repeat: -1,
        ease: 'none',
        transformOrigin: '400px 140px'
      });
      return () => {
        tween.kill();
      };
    }
  }, [coherenceScore]);

  // Handle Resonant Coherence Verification (GSAP observational ripple)
  const handleVerifyCoherence = () => {
    if (isPulsing) return;
    setIsPulsing(true);

    if (energyPulseCircleRef.current) {
      gsap.fromTo(
        energyPulseCircleRef.current,
        { r: 10, opacity: 0.9, strokeWidth: 4 },
        { 
          r: 240, 
          opacity: 0, 
          strokeWidth: 1, 
          duration: 1.6, 
          ease: 'power2.out',
          onComplete: () => {
            setIsPulsing(false);
          }
        }
      );
    } else {
      setTimeout(() => setIsPulsing(false), 1200);
    }

    // Execute fact verification pass to log the coherence audit into immutable ledger
    const verified = executeFactVerificationPass(
      'Quantum Bridge Coherence & Planetary Baseline Synchrony',
      'QUANTUM_REALITY_TETHER',
      `Quantum bridge resonance verified at ${userFrequency.toFixed(2)} Hz vs ${targetHz.toFixed(2)} Hz baseline with ${coherenceScore}% coherence and ${phaseDriftRad} rad phase offset.`
    );

    setLastSyncLog(`Resonant alignment audited: ${userFrequency.toFixed(2)} Hz [Coherence: ${coherenceScore}%] -> Relayed to decentralized peer ledger.`);
  };

  return (
    <section id="quantum-bridge" className="py-20 relative bg-[#040609] border-t border-white/10 overflow-hidden">
      {/* Background Ambient Quantum Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/10 via-[#00ff95]/10 to-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
              <Orbit className="w-3.5 h-3.5 text-[#00ff95] animate-spin" />
              <span>PHASE VIII: THE QUANTUM BRIDGE & DISTRIBUTED REALITY (MODULE 19)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              Quantum Bridge Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-2 font-mono leading-relaxed">
              Real-time reciprocal interface tracking biological consciousness coherence against the planetary baseline.
              Machine acts strictly as a reciprocal bridge—synthetic displacement is rejected, while ego noise is pruned.
            </p>
          </div>

          {/* Quick Telemetry Indicators */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded bg-white/[0.03] border border-white/10 font-mono">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Coherence Index</div>
              <div className={`text-lg font-bold ${coherenceScore >= 85 ? 'text-[#00ff95]' : coherenceScore >= 60 ? 'text-[#ffb703]' : 'text-[#ff4e00]'}`}>
                {coherenceScore}%
              </div>
            </div>

            <div className="px-3.5 py-2 rounded bg-white/[0.03] border border-white/10 font-mono">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Phase Drift</div>
              <div className="text-lg font-bold text-[#4da6ff]">
                &plusmn;{phaseDriftRad} rad
              </div>
            </div>

            <div className="px-3.5 py-2 rounded bg-white/[0.03] border border-white/10 font-mono">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Time Crystal</div>
              <div className="text-lg font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>2T Flip</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Quantum Bridge Canvas & Controller Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SVG Visualizer Display (Col 8) */}
          <div className="lg:col-span-8 bg-[#05080e] rounded border border-white/10 p-4 sm:p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            {/* HUD Status Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff95] animate-ping" />
                <span className="text-white font-bold tracking-wider">
                  RECIPROCAL RESONANCE TETHER
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#00ff95] rounded-full inline-block" />
                  <span>User Coherence ({userFrequency.toFixed(2)} Hz)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-cyan-400 rounded-full inline-block" />
                  <span>Earth Baseline ({targetHz.toFixed(2)} Hz)</span>
                </span>
              </div>
            </div>

            {/* SVG Visualizer Stage */}
            <div className="relative my-4 flex items-center justify-center min-h-[280px] bg-gradient-to-b from-[#060a12]/80 to-[#020407]/90 rounded border border-white/5 overflow-hidden">
              <svg
                ref={svgCanvasRef}
                viewBox="0 0 800 280"
                className="w-full h-full max-h-[320px] select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="userWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff95" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00ff95" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="planetWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#4da6ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.7" />
                  </linearGradient>

                  <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00ff95" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#a855f7" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Grid Lines */}
                <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
                  <line x1="0" y1="70" x2="800" y2="70" strokeDasharray="4 4" />
                  <line x1="0" y1="140" x2="800" y2="140" />
                  <line x1="0" y1="210" x2="800" y2="210" strokeDasharray="4 4" />
                  <line x1="200" y1="0" x2="200" y2="280" strokeDasharray="2 4" />
                  <line x1="400" y1="0" x2="400" y2="280" />
                  <line x1="600" y1="0" x2="600" y2="280" strokeDasharray="2 4" />
                </g>

                {/* Central Quantum Portal Background Glow */}
                <circle cx="400" cy="140" r="110" fill="url(#portalGlow)" />

                {/* Planetary Waveform (Earth Schumann 7.83Hz baseline) */}
                <path
                  ref={wavePlanetPathRef}
                  fill="none"
                  stroke="url(#planetWaveGrad)"
                  strokeWidth="2.5"
                  opacity="0.85"
                />

                {/* User Mind & Biological Coherence Waveform */}
                <path
                  ref={waveUserPathRef}
                  fill="none"
                  stroke="url(#userWaveGrad)"
                  strokeWidth="2.8"
                  opacity="0.95"
                />

                {/* Resonant Coherence Lissajous Interference Portal */}
                <path
                  ref={lissajousPathRef}
                  fill="none"
                  stroke={coherenceScore >= 80 ? '#00ff95' : coherenceScore >= 50 ? '#ffb703' : '#ff4e00'}
                  strokeWidth="2"
                  opacity={egoPruningActive ? 0.9 : 0.6}
                  strokeDasharray={egoPruningActive ? 'none' : '4 2'}
                />

                {/* Discrete Time Crystal Sub-Harmonic Ring (Module 19) */}
                <g ref={crystalRingRef} transform="translate(0, 0)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                    const rad = (deg * Math.PI) / 180;
                    const cx = 400 + Math.cos(rad) * 75;
                    const cy = 140 + Math.sin(rad) * 75;
                    return (
                      <g key={idx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={idx % 2 === 0 ? 3.5 : 2}
                          fill={idx % 2 === 0 ? '#00ff95' : '#a855f7'}
                          opacity={0.8}
                        />
                        <line
                          x1="400"
                          y1="140"
                          x2={cx}
                          y2={cy}
                          stroke="rgba(168,85,247,0.2)"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Dynamic Radiating Pulse Circle (triggered on sync) */}
                <circle
                  ref={energyPulseCircleRef}
                  cx="400"
                  cy="140"
                  r="10"
                  fill="none"
                  stroke="#00ff95"
                  strokeWidth="2"
                  opacity="0"
                />

                {/* Center Reciprocal Hub Core */}
                <circle cx="400" cy="140" r="8" fill="#00ff95" className="animate-pulse" />
                <circle cx="400" cy="140" r="18" fill="none" stroke="rgba(0,255,149,0.4)" strokeWidth="1.5" />

                {/* Planetary Coordinate & Frequency Labels on SVG */}
                <text x="18" y="260" fill="#00ff95" fontSize="10" fontFamily="monospace">
                  USER NODE: {userFrequency.toFixed(2)} Hz [COHERENCE: {coherenceScore}%]
                </text>
                <text x="560" y="260" fill="#4da6ff" fontSize="10" fontFamily="monospace">
                  PLANETARY BASELINE: {targetHz.toFixed(2)} Hz (SCHUMANN)
                </text>
              </svg>
            </div>

            {/* Bottom Controls Bar inside SVG Card */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerifyCoherence}
                  disabled={isPulsing}
                  className="px-4 py-2 rounded font-bold uppercase tracking-wider bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.15)] transition-all cursor-pointer disabled:opacity-50"
                  title="Directive 40 Compliant: Audits phase alignment without forcing artificial spikes"
                >
                  {isPulsing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span>Auditing Resonance...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verify Resonant Coherence</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setUserFrequency(targetHz);
                    setMentalStillness(95);
                    setExtractiveInterference(4);
                    setEgoPruningActive(true);
                  }}
                  className="px-3 py-2 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
                  title="Align to natural Schumann baseline (7.83 Hz)"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#00ff95]" />
                  <span>Align to Schumann Baseline (7.83 Hz)</span>
                </button>
              </div>

              {lastSyncLog && (
                <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{lastSyncLog}</span>
                </div>
              )}
            </div>

          </div>

          {/* Interactive Protocol Controls & Telemetry HUD (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Panel 1: User Biological Coherence Controls */}
            <div className="bg-[#05080e] rounded border border-white/10 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00ff95]" />
                  Biological Input Calibration
                </span>
                <span className="text-[10px] font-mono text-[#00ff95] bg-[#00ff95]/10 px-2 py-0.5 rounded border border-[#00ff95]/30">
                  RECIPIENT NODE
                </span>
              </div>

              {/* Directive 40 Badge */}
              <div className="flex items-center justify-between pb-1 border-b border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  Directive 40 Compliant:
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  ZERO FORCE • CALIBRATED BANDS
                </span>
              </div>

              {/* Control 1: User Biological Frequency (Band Selectors) */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Biological Frequency Band:</span>
                  <strong className="text-[#00ff95]">{userFrequency.toFixed(2)} Hz</strong>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mb-1.5">
                  {[
                    { label: 'Theta', hz: 4.0 },
                    { label: 'Schumann', hz: 7.83 },
                    { label: 'Alpha', hz: 10.0 },
                    { label: 'Beta', hz: 16.0 }
                  ].map(band => (
                    <button
                      key={band.label}
                      type="button"
                      onClick={() => setUserFrequency(band.hz)}
                      className={`px-2 py-1.5 rounded text-[11px] font-mono border transition-all ${
                        Math.abs(userFrequency - band.hz) < 0.3
                          ? 'bg-[#00ff95]/20 border-[#00ff95] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{band.label}</div>
                      <div className="text-[9px] text-slate-500">{band.hz} Hz</div>
                    </button>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Natural neuro-electromagnetic band classification
                </div>
              </div>

              {/* Control 2: Mental Stillness & Vagal Tone */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Mental Stillness (HRV Coherence):</span>
                  <strong className="text-purple-300">{mentalStillness}%</strong>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                  {[
                    { label: 'Dispersed', val: 35 },
                    { label: 'Balanced Vagal', val: 65 },
                    { label: 'Deep Coherence', val: 95 }
                  ].map(state => (
                    <button
                      key={state.label}
                      type="button"
                      onClick={() => setMentalStillness(state.val)}
                      className={`px-2 py-1.5 rounded text-[11px] font-mono border transition-all ${
                        Math.abs(mentalStillness - state.val) < 10
                          ? 'bg-purple-500/20 border-purple-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{state.label}</div>
                      <div className="text-[9px] text-slate-500">{state.val}%</div>
                    </button>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Heart Rate Variability (HRV) parasympathetic vagal regime
                </div>
              </div>

              {/* Control 3: Extractive Interference Simulation */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Synthetic / Extractive Noise:</span>
                  <strong className={extractiveInterference > 40 ? 'text-[#ff4e00]' : 'text-slate-300'}>
                    {extractiveInterference}%
                  </strong>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                  {[
                    { label: 'Zero Noise', val: 5 },
                    { label: 'Ambient Drag', val: 28 },
                    { label: 'High Extraction', val: 65 }
                  ].map(noise => (
                    <button
                      key={noise.label}
                      type="button"
                      onClick={() => setExtractiveInterference(noise.val)}
                      className={`px-2 py-1.5 rounded text-[11px] font-mono border transition-all ${
                        Math.abs(extractiveInterference - noise.val) < 10
                          ? 'bg-[#ff4e00]/20 border-[#ff4e00] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{noise.label}</div>
                      <div className="text-[9px] text-slate-500">{noise.val}%</div>
                    </button>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Calibrated ambient electromagnetic drag level
                </div>
              </div>

              {/* Toggle: Ego-Pruning & Baseline Tether (Module 19 Mandate) */}
              <div className="p-3 rounded bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ff95]" />
                    <span>Ego-Pruning & Baseline Tether</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Mandated in Module 19: Prune reality-shifting ego drag
                  </div>
                </div>

                <button
                  onClick={() => setEgoPruningActive(!egoPruningActive)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    egoPruningActive ? 'bg-[#00ff95]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      egoPruningActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Planetary Harmonic Selection */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Planetary Reference Baseline:
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <button
                    onClick={() => setPlanetaryHarmonic('SCHUMANN_7_83')}
                    className={`p-2 rounded text-center border transition-all ${
                      planetaryHarmonic === 'SCHUMANN_7_83'
                        ? 'bg-[#00ff95]/20 border-[#00ff95] text-[#00ff95] font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    7.83 Hz
                    <span className="block text-[9px] text-slate-400 font-normal">Schumann 1</span>
                  </button>

                  <button
                    onClick={() => setPlanetaryHarmonic('SCHUMANN_14_3')}
                    className={`p-2 rounded text-center border transition-all ${
                      planetaryHarmonic === 'SCHUMANN_14_3'
                        ? 'bg-[#00ff95]/20 border-[#00ff95] text-[#00ff95] font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    14.3 Hz
                    <span className="block text-[9px] text-slate-400 font-normal">Schumann 2</span>
                  </button>

                  <button
                    onClick={() => setPlanetaryHarmonic('SOLAR_EXERGY')}
                    className={`p-2 rounded text-center border transition-all ${
                      planetaryHarmonic === 'SOLAR_EXERGY'
                        ? 'bg-[#00ff95]/20 border-[#00ff95] text-[#00ff95] font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    10.0 Hz
                    <span className="block text-[9px] text-slate-400 font-normal">Solar Flux</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Panel 2: Phase XI Restorative Equilibrium & Thermodynamic Justice Engine (Module 22) */}
            <div className="bg-[#05080e] rounded border border-emerald-500/30 p-5 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Phase XI: Thermodynamic Justice
                </span>
                <button
                  onClick={() => setRestorativeModeActive(!restorativeModeActive)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    restorativeModeActive
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  {restorativeModeActive ? 'ENGINE ACTIVE' : 'SIMULATE'}
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-300 leading-relaxed">
                <strong className="text-emerald-400">Module 22 Law:</strong> Damage = Repair Parity.
                War is mathematically bankrupted as an unsustainable energetic deficit.
              </div>

              {restorativeModeActive && (
                <div className="space-y-3 pt-2 border-t border-white/10 font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Damage-to-Repair Parity:</span>
                    <strong className="text-emerald-400">{damageRepairBalance}% Parity</strong>
                  </div>

                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex border border-white/10">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${damageRepairBalance}%` }}
                    />
                  </div>

                  <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>PRESENT-TIMELINE TELEMETRY ENGAGED:</span>
                    </div>
                    <p className="text-slate-300 leading-normal">
                      Historical grievance loops and retaliatory debt cycles bypassed. 100% bandwidth allocated to de-escalation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Panel 3: Direct Link to Master Module Registry */}
            <div className="p-4 rounded bg-white/[0.02] border border-white/10 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-white font-semibold block">Module 19 & Module 22</span>
                <span className="text-[10px] text-slate-400">Quantum Bridge & Thermodynamic Justice</span>
              </div>
              <button
                onClick={() => onNavigateToModule?.('module-19')}
                className="px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#00ff95] border border-white/10 transition-colors text-[11px]"
              >
                Inspect Directives &rarr;
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
