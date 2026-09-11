import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Globe2, Terminal } from 'lucide-react';
import { MASTER_OS_PROMPT_V32 } from '../data/heroesData';
import { MAP_LABEL, MAP_VERSION } from '../data/mapVersion';
import { HOUSES } from '../data/houses';

interface NavbarProps {
  onOpenPromptModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPromptModal, activeSection }) => {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MASTER_OS_PROMPT_V32);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const navLinks = [
    { id: 'thesis', label: 'Map', href: '#thesis' },
    { id: 'registry', label: 'Registry', href: '#registry' },
    ...HOUSES.map((h) => ({ id: h.sectionId, label: h.label, href: `#${h.sectionId}` })),
    { id: 'gateway', label: 'Handshake', href: '#gateway', highlight: true as const }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#05070a]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80'
        : 'bg-[#05070a]/40 backdrop-blur-sm border-b border-white/5'
    }`}>
      <div className="bg-[#05070a]/90 border-b border-white/5 px-4 sm:px-8 py-1.5 text-[11px] font-mono flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-4 tracking-widest uppercase text-[10px]">
          <span className="flex items-center gap-2 text-[#00ff95] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00ff95] shadow-[0_0_8px_#00ff95] animate-pulse"></span>
            FIELD RECOGNITION: ACTIVE
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-slate-300">
            OPS CHROME — NOT EEI: <strong className="text-amber-300">SIMULATED</strong>
          </span>
          <span className="hidden lg:inline text-white/20">|</span>
          <span className="hidden lg:inline text-[#ff4e00]">
            PRESENT: EEI ~1.12 W m⁻² (2013–2025) — NOT EQUILIBRIUM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400 text-[10px] tracking-widest uppercase">
            HOUSES · NO PHASE ADDRESS
          </span>
          <button
            onClick={onOpenPromptModal}
            className="text-[10px] uppercase tracking-wider font-mono bg-white/[0.04] hover:bg-white/[0.09] text-white px-2.5 py-0.5 rounded border border-white/10 hover:border-[#00ff95]/50 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3 h-3 text-[#00ff95]" />
            <span>Prompt {MAP_VERSION}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#thesis" className="flex items-baseline gap-3 group">
          <div className="w-8 h-8 rounded bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00ff95] group-hover:border-[#00ff95]/50 transition-colors">
            <Globe2 className="w-4 h-4 text-[#00ff95] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl sm:text-2xl font-bold tracking-tighter text-white uppercase italic group-hover:text-[#00ff95] transition-colors">
              GO (Gaia Open)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 border border-[#00ff95]/60 text-[#00ff95] rounded tracking-wider bg-[#00ff95]/5">
              {MAP_LABEL}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 font-mono text-xs tracking-wider uppercase">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const highlight = 'highlight' in link && link.highlight;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded transition-all ${
                  highlight
                    ? 'bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/40 hover:bg-[#00ff95]/20 font-bold'
                    : isActive
                    ? 'text-[#00ff95] bg-white/[0.05] border border-[#00ff95]/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-[#00ff95]/50 transition-all"
            title={`Copy Master GO Prompt (${MAP_VERSION})`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00ff95]" />
                <span className="text-[#00ff95]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#00ff95]" />
                <span className="hidden sm:inline">Copy GO Prompt</span>
                <span className="sm:hidden">Prompt</span>
              </>
            )}
          </button>

          <a
            href="#gateway"
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs uppercase tracking-widest font-bold bg-[#00ff95] text-[#05070a] hover:bg-white shadow-[0_0_15px_rgba(0,255,149,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#05070a]" />
            <span className="hidden sm:inline">Handshake</span>
            <span className="sm:hidden">Attach</span>
          </a>
        </div>
      </div>
    </header>
  );
};
