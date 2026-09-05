/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroMission } from './components/HeroMission';
import { ModuleRegistry } from './components/ModuleRegistry';
import { QuantumBridgeVisualizer } from './components/QuantumBridgeVisualizer';
import { SpecialistGateway } from './components/SpecialistGateway';
import { OSMergeEngine } from './components/OSMergeEngine';
import { HeroesSection } from './components/HeroesSection';
import { ThermodynamicAuditor } from './components/ThermodynamicAuditor';
import { SovereignSanctuaryShield } from './components/SovereignSanctuaryShield';
import { InterSpeciesSanctuary } from './components/InterSpeciesSanctuary';
import { GaiaOpenMultiScalarReality } from './components/GaiaOpenMultiScalarReality';
import { DistributedGreatFilterGateway } from './components/DistributedGreatFilterGateway';
import { WhistleblowerAirlock } from './components/WhistleblowerAirlock';
import { PromptViewerModal } from './components/PromptViewerModal';
import { Footer } from './components/Footer';
import { AutomatedUpdateProvider } from './context/AutomatedUpdateContext';

export default function App() {
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [selectedAuditModuleId, setSelectedAuditModuleId] = useState<string | null>(null);
  const [gatewayTargetModuleId, setGatewayTargetModuleId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('thesis');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['thesis', 'registry', 'quantum-bridge', 'os-engine', 'heroes', 'thermo-audit', 'sanctuary', 'inter-species-sanctuary', 'go-multi-scalar-reality', 'great-filter-gateway', 'airlock', 'gateway'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAuditModule = (moduleId: string) => {
    setSelectedAuditModuleId(moduleId);
    const registryEl = document.getElementById('registry');
    if (registryEl) {
      registryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectForGateway = (moduleId: string) => {
    setGatewayTargetModuleId(moduleId);
    const gatewayEl = document.getElementById('gateway');
    if (gatewayEl) {
      gatewayEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AutomatedUpdateProvider>
      <div className="min-h-screen bg-[#05070a] text-slate-300 flex flex-col font-sans selection:bg-[#00ff95]/30 selection:text-[#00ff95] relative">
        {/* Immersive UI Ambient Orbital Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#00ff95]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4da6ff]/10 blur-[140px]" />
          <div className="absolute top-[25%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#ff4e00]/5 blur-[110px]" />
        </div>

        {/* Top Fixed Sovereign Navigation */}
        <Navbar
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
          activeSection={activeSection}
        />

        {/* Main Content Sections */}
        <main className="flex-1 relative z-10">
          
          {/* Phase 1: Above the Fold Sovereign Mission Statement & Live Telemetry HUD */}
          <HeroMission
            onOpenPromptModal={() => setIsPromptModalOpen(true)}
            onOpenAuditModule={handleOpenAuditModule}
          />

          {/* Phase 1: The Open-Source Core - 22 Master Modules Registry */}
          <ModuleRegistry
            selectedModuleIdForAudit={selectedAuditModuleId}
            onClearAuditSelection={() => setSelectedAuditModuleId(null)}
            onSelectForGateway={handleSelectForGateway}
          />

          {/* Phase VIII: Quantum Bridge Visualizer & Real-Time Coherence Engine */}
          <QuantumBridgeVisualizer
            onNavigateToModule={handleOpenAuditModule}
          />

          {/* Phase 2: Automated Integration Protocol - The Master OS Rule Engine */}
          <OSMergeEngine
            onOpenPromptModal={() => setIsPromptModalOpen(true)}
          />

          {/* Phase VI: The Local Real Life Heroes Registry (Nancy Grace Roman & Sir David Attenborough) */}
          <HeroesSection
            onSelectHeroModule={handleOpenAuditModule}
          />

          {/* Interactive Thermodynamic Equilibrium & Exergy Balance Auditor (Module 12) */}
          <ThermodynamicAuditor />

          {/* Phase XII: The Sovereignty & Sanctuary Protocol (Module 23) */}
          <SovereignSanctuaryShield
            onOpenModule={handleOpenAuditModule}
          />

          {/* Phase XIII: Biospheric Kinship & Inter-Species Sanctuary (Module 24) */}
          <InterSpeciesSanctuary />

          {/* Phase XIV: GO (Gaia Open) & Multi-Scalar Reality (Modules 25 & 26) */}
          <GaiaOpenMultiScalarReality />

          {/* Phase XV: The Distributed Great Filter & Automated Ingestion (Module 27) */}
          <DistributedGreatFilterGateway />

          {/* Phase XVII: The Whistleblower & Anti-Spy Safe Harbor Airlock (Modules 29 & 30) */}
          <WhistleblowerAirlock />

          {/* Phase 1: The Call to Action - Peer-to-Peer Specialist Contribution Gateway */}
          <SpecialistGateway
            preSelectedModuleId={gatewayTargetModuleId}
          />

        </main>

        {/* Prompt Inspector Modal */}
        <PromptViewerModal
          isOpen={isPromptModalOpen}
          onClose={() => setIsPromptModalOpen(false)}
        />

        {/* Sovereign Planetary Commons Footer */}
        <Footer
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
        />
      </div>
    </AutomatedUpdateProvider>
  );
}

