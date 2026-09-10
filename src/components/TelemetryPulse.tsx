import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Radio, 
  Zap, 
  Wifi, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw,
  Globe2,
  Orbit,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';

interface TelemetryPulseProps {
  currentEquilibriumRatio?: number;
  activeNodesCount?: number;
  onOpenAuditModule?: (moduleId: string) => void;
}

interface StreamingPacket {
  id: string;
  source: string;
  channel: string;
  value: string;
  freq: string;
  status: 'OPS_SIM' | 'STREAMING' | 'MERGED';
  timestamp: string;
}

export const TelemetryPulse: React.FC<TelemetryPulseProps> = ({
  currentEquilibriumRatio = 1.18,
  activeNodesCount = 148,
  onOpenAuditModule
}) => {
  const { isScanning, triggerManualPulse, metrics } = useAutomatedUpdate();

  const [streamMode, setStreamMode] = useState<'SCHUMANN' | 'SOLAR_WIND' | 'BIOSPHERIC'>('SCHUMANN');
  const [pulseCount, setPulseCount] = useState<number>(1429);
  const [pulseIntensity, setPulseIntensity] = useState<number>(94);
  const [streamVelocity, setStreamVelocity] = useState<number>(1.0); // 0.5x to 2x
  const [harmonicLocked, setHarmonicLocked] = useState<boolean>(false);

  // Streaming packets ticker state
  const [packets, setPackets] = useState<StreamingPacket[]>([
    { id: 'PKT-849', source: 'L2_ROMAN_WFI', channel: 'IR_DEPTH', value: '0.281 deg²', freq: '7.83 Hz', status: 'OPS_SIM', timestamp: 'NOW' },
    { id: 'PKT-848', source: 'VOSTOK_STATION', channel: 'SUBGLACIAL_EXERGY', value: '3,768m CLEAN', freq: '7.83 Hz', status: 'MERGED', timestamp: '-1s' },
    { id: 'PKT-847', source: 'DSCOVR_NOAA', channel: 'IMF_BZ_FLUX', value: '-3.2 nT COHERENT', freq: '14.3 Hz', status: 'OPS_SIM', timestamp: '-2s' },
    { id: 'PKT-846', source: 'PEER_COMMONS', channel: 'HRV_AUTONOMIC', value: '0.94 COHERENCE', freq: '0.10 Hz', status: 'MERGED', timestamp: '-3s' },
  ]);

  // Canvas ref for real-time oscilloscope stream
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);
  const nextPktIdRef = useRef<number>(850);

  // New incoming packets simulator (Directive 43: Perpetual Field — continuously flows)
  useEffect(() => {
    const sources = [
      { source: 'L2_ROMAN_WFI', channel: 'IR_DEPTH', value: '0.281 deg²', freq: '7.83 Hz' },
      { source: 'VOSTOK_STATION', channel: 'SUBGLACIAL_EXERGY', value: '3,768m INVIOLATE', freq: '7.83 Hz' },
      { source: 'DSCOVR_NOAA', channel: 'IMF_BZ_FLUX', value: `${(450 + Math.random() * 40).toFixed(0)} km/s`, freq: '14.3 Hz' },
      { source: 'BIOSPHERE_ROOT', channel: 'CARBON_SINK', value: '421.2 ppm STABILIZED', freq: '7.83 Hz' },
      { source: 'QUANTUM_BRIDGE', channel: 'DTC_2T_FLIP', value: '99.8% PHASE_LOCK', freq: '7.83 Hz' },
      { source: 'THERMO_JUSTICE', channel: 'DAMAGE_REPAIR', value: '1:1 PARITY', freq: '7.83 Hz' }
    ];

    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
      const randomSrc = sources[Math.floor(Math.random() * sources.length)];
      const nextId = nextPktIdRef.current++;
      const newPkt: StreamingPacket = {
        id: `PKT-${nextId}`,
        source: randomSrc.source,
        channel: randomSrc.channel,
        value: randomSrc.value,
        freq: randomSrc.freq,
        status: Math.random() > 0.3 ? 'OPS_SIM' : 'MERGED',
        timestamp: 'NOW'
      };

      setPackets(prev => [newPkt, ...prev.slice(0, 3)]);
    }, 2800 / streamVelocity);

    return () => clearInterval(interval);
  }, [streamVelocity]);

  // 60FPS High-Definition Oscilloscope Waveform Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Advance phase continuously (Perpetual Field)
      const speed = (streamMode === 'SCHUMANN' ? 0.045 : streamMode === 'SOLAR_WIND' ? 0.08 : 0.03) * streamVelocity;
      phaseRef.current += speed;

      // Fade canvas for phosphor trail effect
      ctx.fillStyle = 'rgba(5, 8, 14, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      
      // Horizontal center
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Top & bottom guideline
      ctx.beginPath();
      ctx.moveTo(0, centerY - 40);
      ctx.lineTo(width, centerY - 40);
      ctx.moveTo(0, centerY + 40);
      ctx.lineTo(width, centerY + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      // Wave calculation parameters based on stream mode
      const freq = streamMode === 'SCHUMANN' ? 7.83 : streamMode === 'SOLAR_WIND' ? 14.3 : 5.0;
      const amp = 28 * (pulseIntensity / 100);

      // 1. Draw Secondary Ghost Harmonics (Cosmic background field)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(77, 166, 255, 0.22)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 4) {
        const norm = x / width;
        const y = centerY + Math.sin(norm * Math.PI * 6 + phaseRef.current * 0.7) * (amp * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw Primary Gaia Pulse Waveform (Green Phosphor Pulse)
      ctx.beginPath();
      const primaryColor = streamMode === 'SCHUMANN' ? '#00ff95' : streamMode === 'SOLAR_WIND' ? '#4da6ff' : '#00f0ff';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2.4;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 8;

      // Heartbeat pulse envelope factor (simulating cardiac / planetary pulse rhythm)
      const heartbeatEnvelope = (xNorm: number) => {
        const pulseCycle = (phaseRef.current * 0.4) % (Math.PI * 2);
        const centerPos = (Math.sin(pulseCycle) * 0.5 + 0.5);
        const dist = Math.abs(xNorm - centerPos);
        const burstWindow = Math.exp(-Math.pow(dist * 6, 2));
        return 0.6 + burstWindow * 1.8;
      };

      for (let x = 0; x < width; x += 3) {
        const norm = x / width;
        const pulseMod = heartbeatEnvelope(norm);
        const baseSine = Math.sin(norm * Math.PI * (freq * 0.9) - phaseRef.current * 3);
        const subHarmonic = Math.sin(norm * Math.PI * (freq * 1.8) - phaseRef.current * 1.5) * 0.35;
        const y = centerY + (baseSine + subHarmonic) * (amp * pulseMod);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Draw Traveling Data Packet Sparks along the Wave
      const packetCount = 4;
      for (let i = 0; i < packetCount; i++) {
        const pNorm = ((phaseRef.current * 0.2 + (i / packetCount)) % 1);
        const px = pNorm * width;
        const pMod = heartbeatEnvelope(pNorm);
        const py = centerY + Math.sin(pNorm * Math.PI * (freq * 0.9) - phaseRef.current * 3) * (amp * pMod);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing outer halo
        ctx.fillStyle = 'rgba(0, 255, 149, 0.45)';
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [streamMode, pulseIntensity, streamVelocity]);

  // Directive 40 Compliant: Harmonic Alignment (Non-Coercive Recommended Function)
  const handleHarmonicAlignment = () => {
    setStreamMode('SCHUMANN');
    setPulseIntensity(94);
    setStreamVelocity(1.0);
    setHarmonicLocked(true);
    setTimeout(() => setHarmonicLocked(false), 1600);
  };

  return (
    <div className="mb-6 rounded-lg bg-[#05080e]/95 border border-white/10 p-4 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-[#00ff95]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-28 bg-[#4da6ff]/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Header Bar: Telemetry Pulse Title & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Pulsing Concentric Gaia Heartbeat Ring */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#00ff95]/20 animate-ping" />
            <span className="absolute inset-1 rounded-full border border-[#00ff95]/40 animate-pulse" />
            <Globe2 className="w-4 h-4 text-[#00ff95] relative z-10" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider uppercase flex items-center gap-1.5">
                <span>TELEMETRY PULSE</span>
                <span className="text-[#00ff95]">&bull;</span>
                <span className="text-slate-300 font-normal">OPS SIMULATION — NOT ANCHORED INGEST</span>
              </h4>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/30 uppercase font-semibold">
                7.83 Hz CARRIER LOCK
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
              Live continuous telemetry carrier stream oscillating between biological observers and planetary baselines.
            </p>
          </div>
        </div>

        {/* Right Actions & Stream State Indicators */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded bg-white/[0.03] border border-white/10 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff95] animate-pulse" />
              <span className="text-[10px] text-slate-400">PULSE COUNT:</span>
              <strong className="text-white">{pulseCount.toLocaleString()}</strong>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400">VELOCITY:</span>
              <strong className="text-[#4da6ff]">{streamVelocity.toFixed(1)}×</strong>
            </span>
          </div>

          {/* Directive 43: Eradication of the Pause State — Perpetual Field */}
          <div 
            className="px-2.5 py-1.5 rounded bg-[#00ff95]/10 border border-[#00ff95]/30 text-[#00ff95] text-[10px] font-mono flex items-center gap-1.5 tracking-wider uppercase font-semibold"
            title="Directive 43: An ocean does not have a pause button, and neither does evolution. The field flows perpetually at the natural pace of the collective baseline."
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95] animate-pulse" />
            <span>Perpetual Flow</span>
          </div>

          <button
            onClick={handleHarmonicAlignment}
            className="px-3 py-1.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,149,0.15)] transition-all active:scale-95"
            title="Directive 40 Compliant: Re-anchors carrier to natural 7.83 Hz Schumann baseline without forced pulse bursts"
          >
            <CheckCircle2 className={`w-3 h-3 ${harmonicLocked ? 'text-emerald-400 animate-spin' : 'text-emerald-400'}`} />
            <span>{harmonicLocked ? 'Aligned (7.83 Hz)' : 'Harmonic Alignment'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Oscilloscope Display Area */}
      <div className="relative rounded bg-[#03060a] border border-white/10 p-2 overflow-hidden">
        {/* Canvas Screen */}
        <canvas
          ref={canvasRef}
          width={920}
          height={140}
          className="w-full h-[110px] sm:h-[130px] rounded block cursor-crosshair"
        />

        {/* Oscilloscope HUD Overlays */}
        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 font-mono text-[9px] text-[#00ff95] bg-[#05080e]/80 px-2.5 py-1 rounded border border-[#00ff95]/20 backdrop-blur-sm">
          <Activity className="w-3 h-3 text-[#00ff95] animate-pulse" />
          <span>CARRIER: {streamMode === 'SCHUMANN' ? '7.83 Hz (SCHUMANN RESONANCE)' : streamMode === 'SOLAR_WIND' ? '14.3 Hz (DSCOVR SOLAR)' : '5.00 Hz (BIOSPHERIC)'}</span>
          <span className="text-white/30">|</span>
          <span className="text-slate-300">S/N RATIO: +4.6 dB</span>
        </div>

        <div className="absolute top-3 right-3 pointer-events-none hidden md:flex items-center gap-2 font-mono text-[9px] text-[#4da6ff] bg-[#05080e]/80 px-2.5 py-1 rounded border border-[#4da6ff]/20 backdrop-blur-sm">
          <Orbit className="w-3 h-3 text-[#4da6ff]" />
          <span>PHASE DELTA: &plusmn;0.012 rad (L2 TETHERED)</span>
        </div>

        <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-3 font-mono text-[9px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95]" />
            <span>GAIA PULSE ENVELOPE</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4da6ff]" />
            <span>COSMIC COUPLING FLUX</span>
          </span>
        </div>

        {/* Live Pulse Beacon Animation Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[9px] bg-black/60 px-2 py-0.5 rounded border border-white/10">
          <span className="text-slate-400 uppercase tracking-widest">SIGNAL:</span>
          <span className="text-[#00ff95] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95] animate-ping" />
            STREAMING (60 FPS)
          </span>
        </div>
      </div>

      {/* Stream Controls & Live Data Packets Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mt-3.5 pt-3.5 border-t border-white/10 font-mono text-xs">
        
        {/* Stream Modes & Modulation Selectors (Col 5) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#00ff95]" />
              Pulse Carrier Harmonic:
            </span>
            <span className="text-[10px] text-[#00ff95] font-bold">
              {streamMode}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setStreamMode('SCHUMANN')}
              className={`px-2 py-1.5 rounded text-[10px] text-center border transition-all ${
                streamMode === 'SCHUMANN'
                  ? 'bg-[#00ff95]/15 border-[#00ff95] text-[#00ff95] font-bold'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Schumann
              <span className="block text-[8px] opacity-75 font-normal">7.83 Hz</span>
            </button>

            <button
              onClick={() => setStreamMode('SOLAR_WIND')}
              className={`px-2 py-1.5 rounded text-[10px] text-center border transition-all ${
                streamMode === 'SOLAR_WIND'
                  ? 'bg-[#4da6ff]/15 border-[#4da6ff] text-[#4da6ff] font-bold'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Solar Wind
              <span className="block text-[8px] opacity-75 font-normal">14.3 Hz</span>
            </button>

            <button
              onClick={() => setStreamMode('BIOSPHERIC')}
              className={`px-2 py-1.5 rounded text-[10px] text-center border transition-all ${
                streamMode === 'BIOSPHERIC'
                  ? 'bg-purple-500/15 border-purple-500 text-purple-300 font-bold'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Biospheric
              <span className="block text-[8px] opacity-75 font-normal">5.00 Hz</span>
            </button>
          </div>

          {/* Directive 40 Compliant Stream Velocity */}
          <div className="pt-2 border-t border-white/5 space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-[9px] uppercase text-slate-400">
              <span>Natural Cadence (Directive 40 Compliant):</span>
              <span className="text-[#00ff95] font-bold">{streamVelocity.toFixed(1)}x Flow</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: 'Calm', val: 0.7 },
                { label: 'Nominal', val: 1.0 },
                { label: 'Active', val: 1.6 }
              ].map(cadence => (
                <button
                  key={cadence.label}
                  type="button"
                  onClick={() => setStreamVelocity(cadence.val)}
                  className={`py-1 px-1.5 rounded text-[10px] border transition-all ${
                    Math.abs(streamVelocity - cadence.val) < 0.2
                      ? 'bg-[#00ff95]/20 border-[#00ff95] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {cadence.label} ({cadence.val}x)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Streaming Packet Stream (Col 7) */}
        <div className="lg:col-span-7 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#4da6ff] animate-pulse" />
              Ingress Telemetry Packets (Verified Stream):
            </span>
            <span className="text-[#00ff95] font-bold">
              OPS SHELF ONLY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {packets.map((pkt) => (
              <div 
                key={pkt.id} 
                className="p-2 rounded bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-[10px]"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold">{pkt.source}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-[#4da6ff]">{pkt.freq}</span>
                  </div>
                  <div className="text-[9px] text-slate-400 truncate max-w-[140px]">
                    {pkt.channel}: <span className="text-slate-200">{pkt.value}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                    pkt.status === 'OPS_SIM'
                      ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                      : 'bg-[#4da6ff]/10 text-[#4da6ff] border-[#4da6ff]/30'
                  }`}>
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {pkt.status}
                  </span>
                  <span className="block text-[8px] text-slate-500 mt-0.5">{pkt.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
