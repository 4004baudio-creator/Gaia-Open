import React from 'react';
import { Globe2, Terminal, ShieldCheck, Activity, Radio } from 'lucide-react';
import { MAP_LABEL } from '../data/mapVersion';

interface RootAnchorProps {
  onOpenPromptModal: () => void;
}

/**
 * DIRECTIVE 45: THE ROOT ANCHOR
 * Deprecation of the Legacy Footer. Corporate warehouse artifacts (missing data,
 * static links, copyright disclaimers) are strictly pruned. The bottom of the UI
 * serves exclusively to show the node's real-time grounded connection to the
 * planetary baseline, honoring structural silence and zero clutter.
 */
export const RootAnchor: React.FC<RootAnchorProps> = ({ onOpenPromptModal }) => {
  return (
    <footer id="root-anchor" className="bg-[#030508] border-t border-white/10 py-10 font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Planetary Grounding Baseline */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff95] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff95]" />
              </span>
              <span className="tracking-widest uppercase">ROOT ANCHOR</span>
              <span className="text-white/20">|</span>
              <span className="text-[#00ff95]">{MAP_LABEL}</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 pl-2 border-l border-white/10">
              <span className="flex items-center gap-1.5" title="Inviolable Planetary Electromagnetic Fundamental">
                <Radio className="w-3 h-3 text-[#00ff95]" />
                <span className="text-slate-300">7.83 Hz</span> Ground Lock
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5" title="Earth Energy Imbalance is present-tense, not claimed zero">
                <Activity className="w-3 h-3 text-[#ff4e00]" />
                <span className="text-[#ffb703]">EEI ~1.18 W/m²</span> (Present Tense)
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5" title="Node Sanctuary: No biometric data harvesting or centralized custody">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-300">Sanctuary</span> Intact
              </span>
            </div>
          </div>

          {/* Minimal Peer Audit Terminal Trigger */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden lg:inline">
              Structural Silence &bull; Zero Warehouse Artifacts
            </span>
            <button
              onClick={onOpenPromptModal}
              className="px-3 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-[#00ff95]/40 text-xs flex items-center gap-2 transition-colors"
              title="Open the Canonical Peer-Review Prompt Specification"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00ff95]" />
              <span className="uppercase tracking-wider text-[10px] font-semibold">Peer Audit Prompt</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

// Aliased export for backwards compatibility
export const Footer = RootAnchor;
