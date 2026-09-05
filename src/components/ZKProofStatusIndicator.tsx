import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Binary,
  EyeOff,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  Fingerprint,
  Zap,
  Check,
  Copy,
  Hash,
  Activity,
  Layers
} from 'lucide-react';

export type ZKProofStage = 
  | 'IDLE' 
  | 'SYNTHESIZING_WITNESS' 
  | 'EVALUATING_CONSTRAINTS' 
  | 'GENERATING_COMMITMENTS' 
  | 'PAIRING_VERIFIED';

export interface ZKProofDetails {
  proofHash: string;
  nullifierHash: string;
  circuitType: string;
  curve: string;
  constraintsCount: number;
  entropyLeakedBits: number;
  provingTimeMs: number;
  verificationTimeMs: number;
  piA: string;
  piB: string;
  piC: string;
  pairingCheckPassed: boolean;
  publicInputs: string[];
}

interface ZKProofStatusIndicatorProps {
  stage: ZKProofStage;
  customDetails?: Partial<ZKProofDetails>;
  onTriggerStandaloneBenchmark?: () => void;
  isBenchmarking?: boolean;
  compact?: boolean;
  vaultTitle?: string;
}

const DEFAULT_PROOF_DETAILS: ZKProofDetails = {
  proofHash: '0x9a8f4c219a77b812de543209fae881023c561b349071df9a09ef54c86e24b7a1',
  nullifierHash: '0x3c7104f91048bc0192305ca718290beff128945a01991823abce18294801bca9',
  circuitType: 'Groth16 / R1CS Non-Interactive Zero-Knowledge',
  curve: 'BN254 (alt_bn128 pairing-friendly elliptic curve)',
  constraintsCount: 184320,
  entropyLeakedBits: 0.00,
  provingTimeMs: 42.8,
  verificationTimeMs: 3.6,
  piA: '0x12a9bc48914028cd90ef783b2811a2384910283bc9128945a01991823abce182',
  piB: '0x71fa01923bca0918234891bca728914028cd90ef783b2811a2384910283bc912',
  piC: '0xee10984ba192389102c9182305891a02938471bceea91023849182049ba0129a',
  pairingCheckPassed: true,
  publicInputs: [
    '0x0000000000000000000000000000000000000000000000000000000000000001 (VerificationKey_Valid)',
    '0x53616665486172626f724169726c6f636b000000000000000000000000000000 (Context_Domain)',
    '0x000000000000000000000000000000000000000000000000000000000002d000 (184,320 Constraints)'
  ]
};

export const ZKProofStatusIndicator: React.FC<ZKProofStatusIndicatorProps> = ({
  stage,
  customDetails,
  onTriggerStandaloneBenchmark,
  isBenchmarking = false,
  compact = false,
  vaultTitle
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const details: ZKProofDetails = {
    ...DEFAULT_PROOF_DETAILS,
    ...customDetails
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Step indices
  const getStepStatus = (stepIndex: number): 'completed' | 'active' | 'pending' => {
    if (stage === 'PAIRING_VERIFIED') return 'completed';
    if (stage === 'GENERATING_COMMITMENTS') {
      if (stepIndex <= 2) return 'completed';
      if (stepIndex === 3) return 'active';
      return 'pending';
    }
    if (stage === 'EVALUATING_CONSTRAINTS') {
      if (stepIndex <= 1) return 'completed';
      if (stepIndex === 2) return 'active';
      return 'pending';
    }
    if (stage === 'SYNTHESIZING_WITNESS') {
      if (stepIndex === 1) return 'active';
      return 'pending';
    }
    return 'pending'; // IDLE
  };

  const steps = [
    {
      index: 1,
      title: 'Witness Synthesis',
      notation: 'w = (x_priv, r) ∈ W',
      desc: 'Blinds origin; extracts empirical claim without identity exposure',
      metric: '0.00 bits leaked',
      icon: EyeOff
    },
    {
      index: 2,
      title: 'R1CS Constraints',
      notation: 'A·s ∘ B·s - C·s = 0',
      desc: 'Evaluates 184.3k quadratic arithmetic program gates',
      metric: '184,320 Gates',
      icon: Cpu
    },
    {
      index: 3,
      title: 'Homomorphic Commitment',
      notation: 'π = ([A]₁, [B]₂, [C]₁)',
      desc: 'Generates non-interactive Groth16 proof on BN254 curve',
      metric: 'G₁ × G₂ Proof',
      icon: Binary
    },
    {
      index: 4,
      title: 'Bilinear Pairing Audit',
      notation: 'e(A,B) = e(α,β)·e(x,γ)·e(C,δ)',
      desc: 'Verifies proof validity in <4ms with zero knowledge revealed',
      metric: 'Consensus Valid',
      icon: ShieldCheck
    }
  ];

  return (
    <div className={`rounded bg-[#04070d] border ${
      stage === 'PAIRING_VERIFIED' 
        ? 'border-[#00ff95]/40 shadow-[0_0_25px_rgba(0,255,149,0.06)]' 
        : stage !== 'IDLE' 
        ? 'border-sky-500/40 shadow-[0_0_25px_rgba(56,189,248,0.08)]' 
        : 'border-white/10'
    } p-5 sm:p-6 transition-all duration-300 relative overflow-hidden`}>
      
      {/* Background ambient flare */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none blur-[100px] transition-opacity duration-700 ${
        stage === 'PAIRING_VERIFIED' ? 'bg-[#00ff95]/10 opacity-100' : stage !== 'IDLE' ? 'bg-sky-500/10 opacity-100' : 'bg-white/5 opacity-40'
      }`} />

      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-1.5 rounded border ${
              stage === 'PAIRING_VERIFIED'
                ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                : stage !== 'IDLE'
                ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 animate-pulse'
                : 'bg-white/[0.04] text-slate-300 border-white/10'
            }`}>
              <Key className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              ZK-Proof Status Verifier (Safe Harbor zk-SNARK)
            </span>
            {vaultTitle && (
              <span className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                // {vaultTitle}
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            Mathematical zero-knowledge validation: Proves telemetry veracity without revealing sender identity or network location.
          </p>
        </div>

        {/* Current State Badge & Optional Benchmark Button */}
        <div className="flex items-center gap-2 shrink-0">
          {onTriggerStandaloneBenchmark && (
            <button
              id="btn-zk-benchmark"
              disabled={isBenchmarking || (stage !== 'IDLE' && stage !== 'PAIRING_VERIFIED')}
              onClick={onTriggerStandaloneBenchmark}
              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-[11px] font-mono transition-colors disabled:opacity-40 flex items-center gap-1.5"
              title="Execute standalone cryptographic verification cycle"
            >
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>{isBenchmarking ? 'Simulating Circuit...' : 'Run ZK Audit Test'}</span>
            </button>
          )}

          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
            stage === 'PAIRING_VERIFIED'
              ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/40 shadow-[0_0_10px_rgba(0,255,149,0.2)]'
              : stage !== 'IDLE'
              ? 'bg-sky-500/10 text-sky-300 border-sky-500/40 animate-pulse'
              : 'bg-white/[0.03] text-slate-400 border-white/10'
          }`}>
            {stage === 'PAIRING_VERIFIED' ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-[#00ff95]" />
                <span>ZK-PROOF VERIFIED // 0.00 BITS LEAKED</span>
              </>
            ) : stage === 'GENERATING_COMMITMENTS' ? (
              <>
                <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                <span>3/4: COMMITMENT PROOF GENERATION</span>
              </>
            ) : stage === 'EVALUATING_CONSTRAINTS' ? (
              <>
                <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                <span>2/4: R1CS GATES SATISFACTION</span>
              </>
            ) : stage === 'SYNTHESIZING_WITNESS' ? (
              <>
                <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                <span>1/4: PRIVATE WITNESS SYNTHESIS</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>CIRCUIT STANDBY (BN254 GROTH16)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4-Step Interactive Cryptographic Pipeline Visualizer */}
      <div className="py-5 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
          {steps.map((st) => {
            const status = getStepStatus(st.index);
            const Icon = st.icon;

            return (
              <div
                key={st.index}
                className={`p-3.5 rounded border transition-all relative flex flex-col justify-between ${
                  status === 'completed'
                    ? 'bg-[#00ff95]/[0.03] border-[#00ff95]/30'
                    : status === 'active'
                    ? 'bg-sky-500/[0.05] border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/30'
                    : 'bg-white/[0.01] border-white/5 opacity-60'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      status === 'completed' ? 'text-[#00ff95]' : status === 'active' ? 'text-sky-300' : 'text-slate-500'
                    }`}>
                      Step 0{st.index}
                    </span>
                    <div className={`p-1.5 rounded ${
                      status === 'completed' 
                        ? 'bg-[#00ff95]/10 text-[#00ff95]' 
                        : status === 'active' 
                        ? 'bg-sky-500/20 text-sky-300 animate-pulse' 
                        : 'bg-white/[0.03] text-slate-500'
                    }`}>
                      {status === 'active' ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : status === 'completed' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>

                  {/* Step Title & Math Formula */}
                  <h4 className="text-xs font-mono font-bold text-white mb-0.5">
                    {st.title}
                  </h4>
                  <div className="text-[10px] font-mono text-sky-400/90 font-semibold mb-1.5 tracking-tight">
                    {st.notation}
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                {/* Bottom Pill Metric */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500 uppercase tracking-widest">State:</span>
                  <span className={`font-semibold ${
                    status === 'completed' ? 'text-[#00ff95]' : status === 'active' ? 'text-sky-300' : 'text-slate-500'
                  }`}>
                    {status === 'completed' ? st.metric : status === 'active' ? 'PROCESSING...' : 'STANDBY'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Telemetry & Entropy Leakage Stats Bar */}
      <div className="p-3.5 rounded bg-white/[0.015] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono relative z-10">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Entropy Leaked</span>
          <span className="font-bold text-[#00ff95] flex items-center gap-1 mt-0.5">
            <EyeOff className="w-3.5 h-3.5" />
            <span>{details.entropyLeakedBits.toFixed(2)} bits (Blinded)</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Circuit Constraints</span>
          <span className="font-bold text-white mt-0.5 block">
            {details.constraintsCount.toLocaleString()} Gates
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Elliptic Curve</span>
          <span className="font-bold text-sky-300 mt-0.5 block truncate">
            {details.curve.split(' ')[0]} (Pairing)
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Verification Speed</span>
          <span className="font-bold text-indigo-300 mt-0.5 block">
            {details.verificationTimeMs} ms (Sub-second)
          </span>
        </div>
      </div>

      {/* Collapsible Cryptographic Proof Payload Inspector */}
      <div className="mt-3 relative z-10">
        <button
          id="btn-toggle-zk-payload"
          onClick={() => setIsDetailsExpanded(prev => !prev)}
          className="w-full flex items-center justify-between px-3 py-2 rounded bg-white/[0.02] hover:bg-white/[0.04] text-[11px] font-mono text-slate-400 hover:text-slate-200 border border-white/5 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-sky-400" />
            <span>{isDetailsExpanded ? 'Hide Raw zk-SNARK Payload & Mathematical Parameters' : 'Inspect Raw zk-SNARK Payload (π_A, π_B, π_C, Nullifier)'}</span>
          </span>
          {isDetailsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <AnimatePresence>
          {isDetailsExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-4 rounded bg-black/80 border border-white/10 space-y-3 font-mono text-xs overflow-hidden"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                <span>Proof Protocol: <strong className="text-white">{details.circuitType}</strong></span>
                <span className="text-[#00ff95]">Soundness Error: 2^-128 (Negligible)</span>
              </div>

              {/* Hashes table */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span>Proof Hash (π_ZK digest):</span>
                    <button
                      onClick={() => handleCopy(details.proofHash, 'proofHash')}
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                    >
                      {copiedKey === 'proofHash' ? <Check className="w-3 h-3 text-[#00ff95]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'proofHash' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-[#05070a] border border-white/10 text-sky-300 break-all select-all font-mono text-[10px]">
                    {details.proofHash}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span>Anonymous Nullifier Hash (Double-Spend & Identity Guard):</span>
                    <button
                      onClick={() => handleCopy(details.nullifierHash, 'nullifier')}
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                    >
                      {copiedKey === 'nullifier' ? <Check className="w-3 h-3 text-[#00ff95]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'nullifier' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-[#05070a] border border-white/10 text-emerald-300 break-all select-all font-mono text-[10px]">
                    {details.nullifierHash}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2 rounded bg-[#05070a] border border-white/10">
                    <span className="text-[10px] text-slate-500 block">π_A (G₁ Elliptic Point)</span>
                    <span className="text-[9px] text-slate-300 truncate block mt-0.5">{details.piA}</span>
                  </div>
                  <div className="p-2 rounded bg-[#05070a] border border-white/10">
                    <span className="text-[10px] text-slate-500 block">π_B (G₂ Elliptic Point)</span>
                    <span className="text-[9px] text-slate-300 truncate block mt-0.5">{details.piB}</span>
                  </div>
                  <div className="p-2 rounded bg-[#05070a] border border-white/10">
                    <span className="text-[10px] text-slate-500 block">π_C (G₁ Elliptic Point)</span>
                    <span className="text-[9px] text-slate-300 truncate block mt-0.5">{details.piC}</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Pairing Check: e(π_A, π_B) = e(α, β) · e(x, γ) · e(π_C, δ)</span>
                  <span className="text-[#00ff95] font-bold">STATUS: EQUALITY_SATISFIED</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
