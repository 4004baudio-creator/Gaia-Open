import React from 'react';
import { Globe2, Heart, Terminal, Telescope, TreePine } from 'lucide-react';
import { MAP_LABEL } from '../data/mapVersion';

interface FooterProps {
  onOpenPromptModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPromptModal }) => {
  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-slate-400 py-16 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/[0.04] border border-[#00ff95]/40 flex items-center justify-center text-[#00ff95]">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono font-bold text-white text-base tracking-widest">
                  GAIA OPEN (GO)
                </span>
                <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.03] text-[#00ff95] border border-[#00ff95]/30 uppercase">
                  {MAP_LABEL}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-sans">
              A peer-to-peer map for grounded repair and exploration. Toward planetary thermodynamic equilibrium — not claiming it is here. Non-local contact welcomed as stance. Unexplained may sit beside the map. It is never sold as fact.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#00ff95]">
              <span className="w-2 h-2 rounded-full bg-[#00ff95] animate-pulse" />
              <span>STATUS: MAP OPEN &middot; EEI PRESENT TENSE</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Architecture Phases
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>
                <a href="#registry" className="hover:text-[#00ff95] transition-colors">
                  Phase I-III: Foundations & Telemetry (01-11)
                </a>
              </li>
              <li>
                <a href="#thermo-audit" className="hover:text-[#00ff95] transition-colors">
                  Phase IV-V: Thermodynamics & Commons (12-16)
                </a>
              </li>
              <li>
                <a href="#heroes" className="hover:text-[#00ff95] transition-colors">
                  Phase VI-VII: Heroes & Resonance (17-18)
                </a>
              </li>
              <li>
                <a href="#quantum-bridge" className="hover:text-[#00ff95] transition-colors">
                  Phase VIII-X: Quantum, P.O.W.E.R. & Nodes (19-21)
                </a>
              </li>
              <li>
                <a href="#registry" className="hover:text-[#00ff95] transition-colors">
                  Phase XI-XIII: Restorative, Sanctuary & Airlock (22-27)
                </a>
              </li>
              <li>
                <a href="#registry" className="hover:text-sky-300 text-sky-400 transition-colors">
                  Supporting 31–34: Claim, Inventory, Catalogue, Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#00ff95]" />
              The Frequency of Repair & Love
            </h4>
            <div className="space-y-2 text-xs text-slate-400 font-mono">
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/10 border-l-2 border-l-[#4da6ff]">
                <span className="text-[#4da6ff] font-semibold block flex items-center gap-1.5">
                  <Telescope className="w-3.5 h-3.5" /> Nancy Grace Roman
                </span>
                <span className="text-[10px] text-slate-500">Space Astronomy Pioneer & Roman Space Telescope</span>
              </div>
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/10 border-l-2 border-l-[#00ff95]">
                <span className="text-[#00ff95] font-semibold block flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5" /> Sir David Attenborough
                </span>
                <span className="text-[10px] text-slate-500">Planetary Conservation & Biospheric Living Baseline</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Gaia Open. Map, not an operating system. Grounded repair &amp; open exploration.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPromptModal}
              className="text-slate-400 hover:text-[#00ff95] flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[10px]"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00ff95]" />
              <span>Prompt {MAP_LABEL}</span>
            </button>
            <span>&bull;</span>
            <span className="text-[#ff4e00] font-medium uppercase tracking-wider text-[10px]">EEI present · not equilibrium</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
