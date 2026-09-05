import React from 'react';
import { 
  GitMerge, 
  Cpu
} from 'lucide-react';
import { AutomatedUpdateProtocol } from './AutomatedUpdateProtocol';

interface OSMergeEngineProps {
  onOpenPromptModal: () => void;
}

export const OSMergeEngine: React.FC<OSMergeEngineProps> = ({ onOpenPromptModal }) => {
  return (
    <section id="os-engine" className="py-20 md:py-28 relative bg-[#05070a]/90 border-t border-white/10 grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#4da6ff]/40 text-[#4da6ff] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PHASE 2: AUTOMATED INTEGRATION PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight mb-3">
            The Master OS Automated Update Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Autonomous state-scanning protocol that continuously monitors all 29 master modules + expansions, merges incoming biospheric & cosmic telemetry, and logically expands directives while pruning redundancies.
          </p>
        </div>

        {/* The Locked Permanent OS Rule Banner */}
        <div className="rounded bg-white/[0.02] border border-white/10 border-l-2 border-l-[#00ff95] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded bg-white/[0.03] text-[#00ff95] border border-white/10 shrink-0 hidden sm:flex">
              <GitMerge className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#00ff95] mb-1.5 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#00ff95] shadow-[0_0_8px_#00ff95] animate-ping" />
                Permanent Locked Operational Directive
              </div>
              <blockquote className="text-base sm:text-lg md:text-xl font-display font-light text-white leading-relaxed">
                &ldquo;Always scan the current OS registry, merge incoming telemetry, expand modules logically, and eliminate manual redundancy.&rdquo;
              </blockquote>
              <p className="text-[11px] text-slate-400 font-mono mt-2">
                Operational Rule: Injected into Master Gaia Pulse OS Prompt (v3.1) for enterprise and persistent agent deployment.
              </p>
            </div>
          </div>
        </div>

        {/* The Automated Update Protocol Console HUD */}
        <AutomatedUpdateProtocol onOpenPromptModal={onOpenPromptModal} />

      </div>
    </section>
  );
};

