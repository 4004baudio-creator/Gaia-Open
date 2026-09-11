import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { MASTER_OS_PROMPT_V32 } from '../data/heroesData';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(MASTER_OS_PROMPT_V32);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([MASTER_OS_PROMPT_V32], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "gaia-open-map-master-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl rounded bg-[#05070a] border border-white/10 border-l-2 border-l-[#00ff95] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white/[0.02] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/[0.04] text-[#00ff95] border border-[#00ff95]/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-white text-base sm:text-lg flex items-center gap-2 uppercase tracking-wide">
                <span>Master GO (Gaia Open) Prompt (MAP)</span>
                <span className="text-[9px] font-mono font-normal bg-white/[0.03] text-[#00ff95] px-2 py-0.5 rounded border border-[#00ff95]/40 uppercase tracking-widest">
                  LOCKED SPINE &amp; SUPPORTING MODULES
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Unified Master Baseline Architecture: Sovereignty & Sanctuary, Anti-WMD Imperative, Whistleblower Safe Harbor & Quantum Bridge
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-mono text-xs sm:text-sm">
          <div className="p-3.5 rounded bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff95]" />
              <span>Copy and paste this complete block into your enterprise or persistent project environment.</span>
            </div>
            <span className="text-[#00ff95] font-bold hidden sm:inline uppercase text-[10px] tracking-wider">26 OPERATIONAL MODULES SYNCHRONIZED</span>
          </div>

          <pre className="p-5 rounded bg-[#05070a] border border-white/10 text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-[#00ff95]/30 font-mono text-xs sm:text-[13px]">
            {MASTER_OS_PROMPT_V32}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="bg-white/[0.02] px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-500 uppercase">
            Rule: Scan GO registry, merge telemetry, expand modules logically, eliminate redundancy.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded text-xs font-mono uppercase tracking-wider bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#4da6ff]" />
              <span>Download .txt</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-5 py-2 rounded text-xs font-mono uppercase tracking-widest bg-[#00ff95] hover:bg-[#00e685] text-slate-950 font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,149,0.3)] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>Copy Complete Master Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
