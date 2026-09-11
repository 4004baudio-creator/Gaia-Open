/**
 * GO (Gaia Open) — living map. Not an OS.
 * Layout law: STRUCTURE.md — Hero, Registry, four houses, Handshake.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroMission } from './components/HeroMission';
import { ModuleRegistry } from './components/ModuleRegistry';
import { HouseBand } from './components/HouseBand';
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
import { YarningCircle } from './components/YarningCircle';
import { ThermohalineProtocol } from './components/ThermohalineProtocol';
import { MirrorPitProtocol } from './components/MirrorPitProtocol';
import { AutonomicAlignmentProtocol } from './components/AutonomicAlignmentProtocol';
import { AcclimatizationPathway } from './components/AcclimatizationPathway';
import { ExperientialOntology } from './components/ExperientialOntology';
import { TangibleAnchor } from './components/TangibleAnchor';
import { PromptViewerModal } from './components/PromptViewerModal';
import { Footer } from './components/Footer';
import { DragonflyDriftContainer } from './components/DragonflyDriftContainer';
import { AutomatedUpdateProvider } from './context/AutomatedUpdateContext';
import { MASTER_MODULES } from './data/modulesIndex';
import { HOUSES } from './data/houses';
import { ExperientialCategory, ExperientialChildStructure } from './types';

export default function App() {
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [selectedAuditModuleId, setSelectedAuditModuleId] = useState<string | null>(null);
  const [gatewayTargetModuleId, setGatewayTargetModuleId] = useState<string | null>(null);
  const [adoptedChildInfo, setAdoptedChildInfo] = useState<{
    child: ExperientialChildStructure;
    category: ExperientialCategory;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<string>('thesis');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'thesis',
        'registry',
        'house-measure',
        'house-shelf',
        'house-care',
        'house-explore',
        'gateway'
      ];
      const scrollPosition = window.scrollY + 200;

      let current = 'thesis';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPosition >= el.offsetTop) {
          current = sectionId;
        }
      }
      setActiveSection(current);
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
    if (gatewayTargetModuleId === moduleId) {
      setGatewayTargetModuleId(null);
      requestAnimationFrame(() => setGatewayTargetModuleId(moduleId));
    } else {
      setGatewayTargetModuleId(moduleId);
    }
  };

  const handleAdoptChildStructure = (child: ExperientialChildStructure, category: ExperientialCategory) => {
    setAdoptedChildInfo({ child, category });
    const gatewayEl = document.getElementById('gateway');
    if (gatewayEl) {
      gatewayEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const measure = HOUSES.find((h) => h.id === 'measure')!;
  const shelf = HOUSES.find((h) => h.id === 'shelf')!;
  const care = HOUSES.find((h) => h.id === 'care')!;
  const explore = HOUSES.find((h) => h.id === 'explore')!;

  return (
    <AutomatedUpdateProvider>
      <div className="min-h-screen bg-[#05070a] text-slate-300 flex flex-col font-sans selection:bg-[#00ff95]/30 selection:text-[#00ff95] relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#00ff95]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4da6ff]/10 blur-[140px]" />
          <div className="absolute top-[25%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#ff4e00]/5 blur-[110px]" />
        </div>

        <Navbar
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
          activeSection={activeSection}
        />

        <main className="flex-1 relative z-10">
          <HeroMission
            onOpenPromptModal={() => setIsPromptModalOpen(true)}
            onOpenAuditModule={handleOpenAuditModule}
          />

          <DragonflyDriftContainer seed={1}>
            <ModuleRegistry
              selectedModuleIdForAudit={selectedAuditModuleId}
              onClearAuditSelection={() => setSelectedAuditModuleId(null)}
              onSelectForGateway={handleSelectForGateway}
            />
          </DragonflyDriftContainer>

          <HouseBand house={measure} />
          <DragonflyDriftContainer seed={5}>
            <ThermodynamicAuditor />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={12}>
            <ThermohalineProtocol onNavigateToModule={handleOpenAuditModule} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={9}>
            <DistributedGreatFilterGateway />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={3}>
            <OSMergeEngine onOpenPromptModal={() => setIsPromptModalOpen(true)} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={13}>
            <MirrorPitProtocol onNavigateToModule={handleOpenAuditModule} modules={MASTER_MODULES} />
          </DragonflyDriftContainer>

          <HouseBand house={shelf} />
          <DragonflyDriftContainer seed={11}>
            <YarningCircle onNavigateToModule={handleOpenAuditModule} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={17}>
            <ExperientialOntology
              onAdoptChildStructure={handleAdoptChildStructure}
              selectedChildId={adoptedChildInfo?.child.id}
            />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={18}>
            <TangibleAnchor onNavigateToModule={handleOpenAuditModule} modules={MASTER_MODULES} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={4}>
            <HeroesSection onSelectHeroModule={handleOpenAuditModule} />
          </DragonflyDriftContainer>

          <HouseBand house={care} />
          <DragonflyDriftContainer seed={6}>
            <SovereignSanctuaryShield onOpenModule={handleOpenAuditModule} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={7}>
            <InterSpeciesSanctuary />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={14}>
            <AutonomicAlignmentProtocol onNavigateToModule={handleOpenAuditModule} modules={MASTER_MODULES} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={16}>
            <AcclimatizationPathway onNavigateToModule={handleOpenAuditModule} modules={MASTER_MODULES} />
          </DragonflyDriftContainer>

          <HouseBand house={explore} />
          <DragonflyDriftContainer seed={2}>
            <QuantumBridgeVisualizer onNavigateToModule={handleOpenAuditModule} />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={8}>
            <GaiaOpenMultiScalarReality />
          </DragonflyDriftContainer>
          <DragonflyDriftContainer seed={10}>
            <WhistleblowerAirlock />
          </DragonflyDriftContainer>

          <DragonflyDriftContainer seed={15}>
            <SpecialistGateway
              preSelectedModuleId={gatewayTargetModuleId}
              adoptedChildStructure={adoptedChildInfo}
            />
          </DragonflyDriftContainer>
        </main>

        <PromptViewerModal
          isOpen={isPromptModalOpen}
          onClose={() => setIsPromptModalOpen(false)}
        />

        <Footer onOpenPromptModal={() => setIsPromptModalOpen(true)} />
      </div>
    </AutomatedUpdateProvider>
  );
}
