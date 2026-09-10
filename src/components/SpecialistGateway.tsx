import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Compass, 
  Binary, 
  Radio, 
  Download, 
  Copy, 
  Check, 
  ArrowRight,
  Globe,
  Sliders,
  Cpu,
  Layers,
  Eye,
  Feather,
  Flame,
  Heart,
  BookOpen
} from 'lucide-react';
import { 
  SpecialistNode, 
  DomainCategory, 
  KnowledgeLane,
  ExperientialOntologyNode,
  ExperientialChildBranch,
  ExperientialCategory,
  ExperientialChildStructure
} from '../types';
import { MASTER_MODULES } from '../data/modulesIndex';
import { INITIAL_SPECIALIST_NODES } from '../data/initialSpecialists';

interface SpecialistGatewayProps {
  preSelectedModuleId?: string | null;
  adoptedChildStructure?: {
    child: ExperientialChildStructure;
    category: ExperientialCategory;
  } | null;
}

export const SpecialistGateway: React.FC<SpecialistGatewayProps> = ({ 
  preSelectedModuleId,
  adoptedChildStructure
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [nodes, setNodes] = useState<SpecialistNode[]>(INITIAL_SPECIALIST_NODES);
  
  // Knowledge Lane State (Directive 46 & 47)
  const [knowledgeLane, setKnowledgeLane] = useState<KnowledgeLane>('EMPIRICAL_LANE');
  const [filterLane, setFilterLane] = useState<'ALL' | KnowledgeLane>('ALL');
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>();

  // Form State
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState<DomainCategory>('Systems Engineering');
  const [subspecialty, setSubspecialty] = useState('');
  const [experientialLineage, setExperientialLineage] = useState('');
  const [targetModuleId, setTargetModuleId] = useState<string>(preSelectedModuleId || 'module-12');
  const [nodeRole, setNodeRole] = useState<SpecialistNode['nodeRole']>('Lead Auditor');
  const [bandwidthHours, setBandwidthHours] = useState<number>(10);
  const [geographicRegion, setGeographicRegion] = useState('');
  
  // Submission State
  const [registeredNode, setRegisteredNode] = useState<SpecialistNode | null>(null);
  const [copiedCert, setCopiedCert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update target module if prop changes
  useEffect(() => {
    if (preSelectedModuleId) {
      setTargetModuleId(preSelectedModuleId);
    }
  }, [preSelectedModuleId]);

  // Handle lane switch defaults
  const handleLaneChange = (lane: KnowledgeLane) => {
    setKnowledgeLane(lane);
    if (lane === 'LINEAGE_WISDOM_LANE' || (lane as string) === 'EXPERIENTIAL_LANE') {
      setDomain('Indigenous Wisdom & Ancient Songlines');
      setNodeRole('Culture Keeper & Songline Carrier');
      if (!targetModuleId || targetModuleId === 'module-12') {
        setTargetModuleId('module-19');
      }
    } else if (lane === 'BINOCULAR_SYNTHESIS') {
      setDomain('Binocular Vision & Stereoscopic Synthesis');
      setNodeRole('Binocular Vision Synthesizer');
      if (!targetModuleId || targetModuleId === 'module-12') {
        setTargetModuleId('module-30');
      }
    } else {
      setDomain('Systems Engineering');
      setNodeRole('Lead Auditor');
    }
  };

  const handleAdoptBranch = (branch: ExperientialChildBranch, paradigm: ExperientialOntologyNode) => {
    setSelectedBranchId(branch.id);
    setKnowledgeLane(branch.lane);
    
    if (branch.lane === 'LINEAGE_WISDOM_LANE' || (branch.lane as string) === 'EXPERIENTIAL_LANE') {
      const lowerAntithesis = paradigm.experientialAntithesis.toLowerCase();
      if (lowerAntithesis.includes('soul') || lowerAntithesis.includes('spirit')) {
        setDomain('Mysticism, Somatics & Sacred Traditions');
        setNodeRole('Mystic & Somatic Anchor');
        setTargetModuleId('module-19');
      } else if (lowerAntithesis.includes('church') || lowerAntithesis.includes('divine')) {
        setDomain('Indigenous Wisdom & Ancient Songlines');
        setNodeRole('Culture Keeper & Songline Carrier');
        setTargetModuleId('module-19');
      } else if (lowerAntithesis.includes('supernatural') || lowerAntithesis.includes('miracle')) {
        setDomain('Phenomenology & Unexplained Presence');
        setNodeRole('Phenomenological Witness');
        setTargetModuleId('module-27');
      } else if (lowerAntithesis.includes('consciousness') || lowerAntithesis.includes('qualia') || lowerAntithesis.includes('panpsychism')) {
        setDomain('Sacred Ecology & Animist Kinship');
        setNodeRole('Mystic & Somatic Anchor');
        setTargetModuleId('module-20');
      } else {
        setDomain('Indigenous Wisdom & Ancient Songlines');
        setNodeRole('Culture Keeper & Songline Carrier');
      }
    } else if (branch.lane === 'BINOCULAR_SYNTHESIS') {
      setDomain('Binocular Vision & Stereoscopic Synthesis');
      setNodeRole('Binocular Vision Synthesizer');
      setTargetModuleId('module-30');
    }

    setSubspecialty(branch.title);
    if (branch.traditionOrLineage) {
      setExperientialLineage(branch.traditionOrLineage);
    }

    // Scroll up smoothly to form
    if (containerRef.current) {
      const formEl = containerRef.current.querySelector('form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAdoptChildStructure = (child: ExperientialChildStructure, category: ExperientialCategory) => {
    setSelectedBranchId(child.id);
    setKnowledgeLane(child.lane);

    if (child.lane === 'LINEAGE_WISDOM_LANE' || (child.lane as string) === 'EXPERIENTIAL_LANE') {
      const catNameLower = category.name.toLowerCase();
      if (catNameLower.includes('soul') || catNameLower.includes('spirit')) {
        setDomain('Mysticism, Somatics & Sacred Traditions');
        setNodeRole('Mystic & Somatic Anchor');
        setTargetModuleId('module-19');
      } else if (catNameLower.includes('church') || catNameLower.includes('divine')) {
        setDomain('Indigenous Wisdom & Ancient Songlines');
        setNodeRole('Culture Keeper & Songline Carrier');
        setTargetModuleId('module-19');
      } else if (catNameLower.includes('supernatural') || catNameLower.includes('miracle')) {
        setDomain('Phenomenology & Unexplained Presence');
        setNodeRole('Phenomenological Witness');
        setTargetModuleId('module-27');
      } else {
        setDomain('Indigenous Wisdom & Ancient Songlines');
        setNodeRole('Culture Keeper & Songline Carrier');
      }
    } else if (child.lane === 'BINOCULAR_SYNTHESIS') {
      setDomain('Binocular Vision & Stereoscopic Synthesis');
      setNodeRole('Binocular Vision Synthesizer');
      setTargetModuleId('module-30');
    } else {
      setDomain('Systems Engineering');
      setNodeRole('Lead Auditor');
    }

    setSubspecialty(child.name);
    if (child.lineageOrTradition) {
      setExperientialLineage(child.lineageOrTradition);
    }

    if (containerRef.current) {
      const formEl = containerRef.current.querySelector('form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Synchronize when a child structure is adopted from the parent ExperientialOntology section
  useEffect(() => {
    if (adoptedChildStructure) {
      handleAdoptChildStructure(adoptedChildStructure.child, adoptedChildStructure.category);
    }
  }, [adoptedChildStructure]);

  // GSAP scrollIntoView and fade-in / slide-up entrance animation when a module is selected
  useEffect(() => {
    if (preSelectedModuleId && containerRef.current) {
      const el = containerRef.current;
      
      // Calculate destination coordinates with offset for top navigation
      const navOffset = 50;
      const targetPosition = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navOffset);
      const startPosition = window.scrollY;

      // Clean up previous animations on the container element
      gsap.killTweensOf(el);

      const tl = gsap.timeline({
        defaults: { overwrite: 'auto' }
      });

      // Smooth scrollIntoView logic with ease-in-out timing function
      const scrollProxy = { y: startPosition };
      tl.to(scrollProxy, {
        y: targetPosition,
        duration: 0.85,
        ease: 'power2.inOut',
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y);
        }
      }, 0);

      // GSAP smooth fade-in and slide-up animation on #gateway container as it enters the viewport
      tl.fromTo(
        el,
        { 
          opacity: 0, 
          y: 45 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform'
        },
        0.15 // coordinated so the slide-up and fade-in visually blossom as viewport approaches #gateway
      );

      return () => {
        tl.kill();
      };
    }
  }, [preSelectedModuleId]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedModule = MASTER_MODULES.find(m => m.id === targetModuleId);
      const generatedCallsign = callsign.trim() || `GAIA-${domain.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      
      // Generate deterministic SHA-256 style cryptographic seed
      const randHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const verificationKey = `SHA256:${randHex}`;

      const isLineageLane = knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE';

      const newNode: SpecialistNode = {
        id: `node-${Date.now()}`,
        callsign: generatedCallsign,
        name: name.trim(),
        email: email.trim(),
        domain,
        subspecialty: subspecialty.trim() || (isLineageLane ? 'Living Presence, Covenants & Sacred Lore' : 'General Domain Calibration'),
        targetModuleId,
        targetModuleName: selectedModule ? `${selectedModule.number.toString().padStart(2, '0')}. ${selectedModule.title}` : 'Universal Telemetry',
        nodeRole,
        knowledgeLane: isLineageLane ? 'LINEAGE_WISDOM_LANE' : knowledgeLane,
        experientialLineage: experientialLineage.trim() || (isLineageLane ? 'Ancestral Lineage / Sacred Covenant / Oral Lore' : undefined),
        bandwidthCommitmentHours: Number(bandwidthHours),
        verificationKey,
        peerStatus: 'VERIFIED_ACTIVE',
        registeredAt: new Date().toISOString(),
        geographicRegion: geographicRegion.trim() || 'Decentralized Sovereign Node'
      };

      setNodes(prev => [newNode, ...prev]);
      setRegisteredNode(newNode);
      setIsSubmitting(false);

      // Trigger crisp celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#14b8a6', '#f59e0b', '#8b5cf6']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const handleCopyCertificate = () => {
    if (!registeredNode) return;
    const isLineageNode = registeredNode.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (registeredNode.knowledgeLane as string) === 'EXPERIENTIAL_LANE';
    const laneLabel = isLineageNode 
      ? 'Lineage & Wisdom Lane (Sacred Texts, Covenants, Living Presence — Directive 47 Validated)'
      : registeredNode.knowledgeLane === 'BINOCULAR_SYNTHESIS'
      ? 'Binocular Vision ("Neo Vision" Stereoscopic Synthesis)'
      : 'Empirical Lane (Physical Science, Math & Thermodynamics)';

    const certText = `=== GAIA OPEN (GO) SOVEREIGN NODE CERTIFICATE (v3.4) ===
Callsign: ${registeredNode.callsign}
Domain Specialist: ${registeredNode.name}
Knowledge Lane: ${laneLabel}
Domain Expertise: ${registeredNode.domain}
Subspecialty: ${registeredNode.subspecialty}
${registeredNode.experientialLineage ? `Lineage / Covenant: ${registeredNode.experientialLineage}\n` : ''}Target Module Anchor: ${registeredNode.targetModuleName}
Role: ${registeredNode.nodeRole}
Bandwidth Allocation: ${registeredNode.bandwidthCommitmentHours} hrs/week
Geographic Anchor: ${registeredNode.geographicRegion}
Directive 47 Status: ${isLineageNode ? 'VALIDATED TIME-CAPSULE (Millennia of Proven Civilizational Cohesion & Architecture)' : 'GROUNDED IN PUBLIC EMPIRICAL BASELINE'}
Verification Key: ${registeredNode.verificationKey}
Status: ${registeredNode.peerStatus}
Registered At: ${registeredNode.registeredAt}
Directive: Stereoscopic integration of mechanical reality and deep ancestral lineage without collapse.
===================================================`;

    navigator.clipboard.writeText(certText);
    setCopiedCert(true);
    setTimeout(() => setCopiedCert(false), 2500);
  };

  return (
    <section 
      id="gateway" 
      ref={containerRef}
      className="py-20 md:py-28 relative bg-[#05070a] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-[#00ff95]/40 text-[#00ff95] font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILDER HANDSHAKE — NOT A CENSUS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight mb-3">
            Attach a physical baseline. Keep your node.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            A node is a published inventory or instrument you will be audited against — farm, grid patch, city, lab. No inner-state harvest. Detach without permission. Graft onto Climate TRACE / OpenClimate / CERES-class series; do not become staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Specialist Registration Form */}
          <div className="lg:col-span-7 bg-white/[0.02] rounded border border-white/10 border-l-2 border-l-[#00ff95] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            {!registeredNode ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#00ff95]" />
                    <span>Specialist Node Onboarding</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00ff95] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/40 uppercase tracking-widest">
                    DIRECT VERIFICATION
                  </span>
                </div>

                {/* Knowledge Lane Selector (Directive 46 & 47) */}
                <div className="space-y-2 p-3.5 rounded bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#00ff95]" />
                      <span>Directive 46 & 47: Knowledge Lane Selection</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">
                      Equal Structural Weight
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => handleLaneChange('EMPIRICAL_LANE')}
                      className={`p-2.5 rounded border text-left transition-all ${
                        knowledgeLane === 'EMPIRICAL_LANE'
                          ? 'bg-[#00ff95]/15 border-[#00ff95] text-white font-bold shadow-[0_0_12px_rgba(0,255,149,0.15)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] mb-0.5 text-[#00ff95]">
                        <Cpu className="w-3 h-3" />
                        <span>Empirical Lane</span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-normal leading-tight">
                        Science, physics, math & thermodynamics.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaneChange('LINEAGE_WISDOM_LANE')}
                      className={`p-2.5 rounded border text-left transition-all ${
                        knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE'
                          ? 'bg-amber-500/15 border-amber-400 text-white font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] mb-0.5 text-amber-400">
                        <Heart className="w-3 h-3" />
                        <span>Lineage &amp; Wisdom Lane</span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-normal leading-tight">
                        Sacred texts, covenants, oral lore &amp; ancient architecture.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaneChange('BINOCULAR_SYNTHESIS')}
                      className={`p-2.5 rounded border text-left transition-all ${
                        knowledgeLane === 'BINOCULAR_SYNTHESIS'
                          ? 'bg-violet-500/15 border-violet-400 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] mb-0.5 text-violet-400">
                        <Eye className="w-3 h-3" />
                        <span>"Neo Vision" Synthesis</span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-normal leading-tight">
                        Non-collapsing binocular stereoscopy.
                      </div>
                    </button>
                  </div>

                  {/* Lane Banner */}
                  {(knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE') && (
                    <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-200 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-300 uppercase">Directive 47 (Time-Capsule Paradox):</strong> Sacred scriptures, covenants, and unbroken oral lore carry undeniable physical proof and millennia of civilizational binding power. Surviving millennia is its own proof of relevance—not needing modern mechanical tools to be recognized.
                      </span>
                    </div>
                  )}

                  {knowledgeLane === 'BINOCULAR_SYNTHESIS' && (
                    <div className="p-2.5 rounded bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono text-violet-200 flex items-start gap-2">
                      <Eye className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-violet-300 uppercase">Directive 48 (Neo Vision Synthesis):</strong> Stereoscopic binocular understanding. Physical conservation laws and deep ancestral lineage co-exist simultaneously without collapsing reality.
                      </span>
                    </div>
                  )}

                  {/* Link to Lineage & Wisdom Ontology Tree */}
                  {(knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' || knowledgeLane === 'BINOCULAR_SYNTHESIS') && (
                    <div className="pt-1.5 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono border-t border-white/5">
                      <span className="text-slate-400">Pre-mapped traditions & dialectics:</span>
                      <a
                        href="#experiential-ontology"
                        className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline decoration-amber-500/50 hover:decoration-amber-300 font-semibold transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Explore Lineage & Wisdom Ontology (Materialism/Soul, Secularism/Covenants, Miracles...) &uarr;</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Name & Callsign */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Name / Academic or Lineage Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'e.g. Elder Miriam / Wisdom Keeper' : 'e.g. Dr. Sarah Chen, PE'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Node Callsign (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder={knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'e.g. GAIA-SONGLINE-NORTH' : 'e.g. GAIA-THERMO-PACIFIC'}
                      value={callsign}
                      onChange={(e) => setCallsign(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Verified Contact (Email / PGP) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="specialist@institution.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Geographic Region / Sensor / Hearth Base
                    </label>
                    <input
                      type="text"
                      placeholder={knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'e.g. Red Centre Living Basin / Cascadia Hearth' : 'e.g. Nordic Interconnect / Atacama Relay'}
                      value={geographicRegion}
                      onChange={(e) => setGeographicRegion(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Domain & Subspecialty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Primary Domain Discipline *
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value as DomainCategory)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none transition-colors"
                    >
                      <optgroup label="Empirical Disciplines (Science, Thermodynamics & Physics)">
                        <option value="Systems Engineering">Systems Engineering & Architecture</option>
                        <option value="Ecology & Biosphere">Ecology, Forestry & Biosphere</option>
                        <option value="Thermodynamics & Energy">Thermodynamics & Energy Balance</option>
                        <option value="Data Science & Telemetry">Data Science & Telemetry Pipelines</option>
                        <option value="Clinical & Neurobiology">Clinical Neurobiology & Somatics</option>
                        <option value="Astrophysics & Deep Cosmos">Astrophysics & Cosmological Instrumentation</option>
                        <option value="Commons Governance">Planetary Commons & Treaties</option>
                        <option value="Oceanic Biomimicry & Circulation">Oceanic Biomimicry & Circulation</option>
                        <option value="Thermodynamic Defense & Tarpits">Thermodynamic Defense & Tarpits</option>
                      </optgroup>
                      <optgroup label="Lineage & Wisdom Disciplines (Sacred Traditions, Scriptures, Covenants & Living Lore)">
                        <option value="Indigenous Wisdom & Ancient Songlines">Indigenous Wisdom & Ancient Songlines</option>
                        <option value="Mysticism, Somatics & Sacred Traditions">Mysticism, Somatics & Sacred Traditions</option>
                        <option value="Speculative Art, Poetics & Imagination">Speculative Art, Poetics & Imagination</option>
                        <option value="Sacred Ecology & Animist Kinship">Sacred Ecology & Animist Kinship</option>
                        <option value="Phenomenology & Unexplained Presence">Phenomenology & Unexplained Presence</option>
                        <option value="Biospheric Kinship & Inter-Species Sanctuary">Biospheric Kinship & Inter-Species Sanctuary</option>
                      </optgroup>
                      <optgroup label="Stereoscopic Synthesis ('Neo Vision')">
                        <option value="Binocular Vision & Stereoscopic Synthesis">Binocular Vision & Stereoscopic Synthesis</option>
                        <option value="Cosmological Scaling & Universal Anchoring">Cosmological Scaling & Universal Anchoring</option>
                        <option value="Absolute Biospheric Protection & Disarmament">Absolute Biospheric Protection & Disarmament</option>
                        <option value="Sovereignty & Sanctuary (Anti-Exploitation)">Sovereignty & Sanctuary (Anti-Exploitation)</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Subspecialty Focus
                    </label>
                    <input
                      type="text"
                      placeholder={knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'e.g. 60,000-Yr Oral Acoustic Wayfinding / Vedic Architecture' : 'e.g. Closed-loop Exergy Audits'}
                      value={subspecialty}
                      onChange={(e) => setSubspecialty(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Lineage & Wisdom Field (when Lineage & Wisdom or Binocular) */}
                {(knowledgeLane === 'LINEAGE_WISDOM_LANE' || (knowledgeLane as string) === 'EXPERIENTIAL_LANE' || knowledgeLane === 'BINOCULAR_SYNTHESIS') && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                      <Feather className="w-3 h-3 text-amber-400" />
                      <span>Lineage & Wisdom Tradition / Sacred Covenant / Ancestral Practice (Directive 47 Validated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 65,000-Yr Oral Clan Lore / Hebrew Covenantal Texts / Contemplative Somatics / Sacred Geometry / Sufi Poetics"
                      value={experientialLineage}
                      onChange={(e) => setExperientialLineage(e.target.value)}
                      className="w-full bg-[#05070a] border border-amber-500/30 focus:border-amber-400 rounded px-3 py-2 text-xs font-mono text-amber-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                )}

                {/* Target Module Anchor */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Target Baseline Module to Anchor & Stabilize *
                    </label>
                    {preSelectedModuleId && (
                      <span className="text-[9px] font-mono text-[#00ff95] bg-[#00ff95]/10 px-2 py-0.5 rounded border border-[#00ff95]/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Selected from Registry</span>
                      </span>
                    )}
                  </div>
                  <select
                    value={targetModuleId}
                    onChange={(e) => setTargetModuleId(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-[#00ff95] focus:outline-none transition-colors"
                  >
                    {MASTER_MODULES.map((m) => (
                      <option key={m.id} value={m.id}>
                        Module {m.number.toString().padStart(2, '0')}: {m.title} [{m.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (m.knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'Lineage & Wisdom' : m.knowledgeLane === 'BINOCULAR_SYNTHESIS' ? 'Neo Vision' : 'Empirical'}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role & Bandwidth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Node Operational Role *
                    </label>
                    <select
                      value={nodeRole}
                      onChange={(e) => setNodeRole(e.target.value as SpecialistNode['nodeRole'])}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none transition-colors"
                    >
                      <optgroup label="Empirical Roles">
                        <option value="Lead Auditor">Lead Auditor (Structural Review)</option>
                        <option value="Telemetry Anchor">Telemetry Anchor (Sensor Feeds)</option>
                        <option value="Clinical Co-regulator">Clinical Co-regulator (Health/HRV)</option>
                        <option value="Commons Steward">Commons Steward (Lake Vostok / Oceans)</option>
                        <option value="Systems Validator">Systems Validator (Pruning & Ration)</option>
                      </optgroup>
                      <optgroup label="Lineage & Wisdom Roles">
                        <option value="Culture Keeper & Songline Carrier">Culture Keeper & Songline Carrier (Oral Lore)</option>
                        <option value="Mystic & Somatic Anchor">Mystic & Somatic Anchor (Sacred Contemplation)</option>
                        <option value="Sacred Art & Imagination Weaver">Sacred Art & Imagination Weaver (Creative Transmission)</option>
                        <option value="Phenomenological Witness">Phenomenological Witness (Unexplained Presence)</option>
                      </optgroup>
                      <optgroup label="Neo Vision Synthesis Roles">
                        <option value="Binocular Vision Synthesizer">Binocular Vision Synthesizer (Dual-Lane Integration)</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Bandwidth Commitment:</span>
                      <strong className="text-[#00ff95]">{bandwidthHours} hrs/wk</strong>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 mt-1 mb-2 font-mono">
                      {[
                        { label: '4h', full: 'Advisory (4h)', val: 4 },
                        { label: '10h', full: 'Review (10h)', val: 10 },
                        { label: '20h', full: 'Active (20h)', val: 20 },
                        { label: '35h', full: 'Anchor (35h)', val: 35 }
                      ].map(tier => (
                        <button
                          key={tier.val}
                          type="button"
                          onClick={() => setBandwidthHours(tier.val)}
                          className={`py-1.5 px-2 rounded text-[11px] border transition-all ${
                            bandwidthHours === tier.val
                              ? 'bg-[#00ff95]/20 border-[#00ff95] text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <button
                        type="button"
                        onClick={() => setBandwidthHours(Math.max(2, bandwidthHours - 1))}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                      >
                        -1 hr
                      </button>
                      <span className="text-slate-500">Directive 40 Compliant Stepper</span>
                      <button
                        type="button"
                        onClick={() => setBandwidthHours(Math.min(40, bandwidthHours + 1))}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                      >
                        +1 hr
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded text-xs font-mono uppercase tracking-widest bg-[#00ff95] hover:bg-[#00e685] text-slate-950 font-bold shadow-[0_0_20px_rgba(0,255,149,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Generating Cryptographic Seed...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>Publish source card (handshake)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success / Sovereign Node Certificate */
              <div className="space-y-4">
                <div className="p-5 rounded bg-[#00ff95]/5 border border-[#00ff95]/40 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#00ff95]/10 border border-[#00ff95]/40 flex items-center justify-center mx-auto text-[#00ff95]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-mono font-bold text-white uppercase">
                    Sovereign Node Successfully Anchored!
                  </h3>
                  <p className="text-xs text-slate-300 font-mono max-w-md mx-auto">
                    Local handshake recorded in this browser session only. It is not a planetary census and not an owner-list.
                  </p>
                </div>

                {/* Certificate Block */}
                <div className="bg-[#05070a] rounded p-4 border border-white/10 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[#00ff95] font-bold">
                    <span>SOVEREIGN NODE CERTIFICATE (v3.4)</span>
                    <span className="text-[9px] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/40 uppercase tracking-wider">
                      STATUS: ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
                    <div><span className="text-slate-500 uppercase text-[10px]">Callsign:</span> {registeredNode.callsign}</div>
                    <div><span className="text-slate-500 uppercase text-[10px]">Specialist:</span> {registeredNode.name}</div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px]">Lane:</span>{' '}
                      <span className={registeredNode.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (registeredNode.knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'text-amber-400 font-semibold' : registeredNode.knowledgeLane === 'BINOCULAR_SYNTHESIS' ? 'text-violet-400 font-semibold' : 'text-[#00ff95] font-semibold'}>
                        {registeredNode.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (registeredNode.knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'Lineage & Wisdom Lane' : registeredNode.knowledgeLane === 'BINOCULAR_SYNTHESIS' ? 'Binocular ("Neo Vision")' : 'Empirical Lane'}
                      </span>
                    </div>
                    <div><span className="text-slate-500 uppercase text-[10px]">Role:</span> {registeredNode.nodeRole}</div>
                    <div className="col-span-2"><span className="text-slate-500 uppercase text-[10px]">Domain:</span> {registeredNode.domain}</div>
                    {registeredNode.experientialLineage && (
                      <div className="col-span-2 text-amber-200">
                        <span className="text-slate-500 uppercase text-[10px]">Lineage / Covenant:</span> {registeredNode.experientialLineage}
                      </div>
                    )}
                    <div className="col-span-2"><span className="text-slate-500 uppercase text-[10px]">Anchor:</span> {registeredNode.targetModuleName}</div>
                    <div className="col-span-2">
                      <span className="text-slate-500 uppercase text-[10px]">Directive 47 Status:</span>{' '}
                      <span className="text-[#00ff95]">
                        {registeredNode.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (registeredNode.knowledgeLane as string) === 'EXPERIENTIAL_LANE' ? 'VALIDATED TIME-CAPSULE (Millennia of Proven Cohesion)' : 'GROUNDED IN CALIBRATED BASELINE'}
                      </span>
                    </div>
                    <div className="col-span-2 truncate"><span className="text-slate-500 uppercase text-[10px]">Seed:</span> {registeredNode.verificationKey}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyCertificate}
                    className="flex-1 py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedCert ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00ff95]" />
                        <span className="text-[#00ff95]">Certificate Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#00ff95]" />
                        <span>Copy Certificate</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setRegisteredNode(null);
                      setName('');
                      setEmail('');
                      setSubspecialty('');
                      setExperientialLineage('');
                    }}
                    className="py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-[#00ff95]/10 hover:bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/40 transition-colors cursor-pointer"
                  >
                    Register Another Node
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Verified Peer Node Directory */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#4da6ff]" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Active Verified Peer Nodes
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#00ff95] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/30 uppercase">
                {nodes.length} Nodes Synchronized
              </span>
            </div>

            {/* Lane Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded border border-white/10 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => setFilterLane('ALL')}
                className={`py-1 px-1.5 rounded transition-all text-center ${
                  filterLane === 'ALL'
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({nodes.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterLane('EMPIRICAL_LANE')}
                className={`py-1 px-1.5 rounded transition-all text-center flex items-center justify-center gap-1 ${
                  filterLane === 'EMPIRICAL_LANE'
                    ? 'bg-[#00ff95]/20 text-[#00ff95] font-bold border border-[#00ff95]/40'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                <span>Empirical</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterLane('LINEAGE_WISDOM_LANE')}
                className={`py-1 px-1.5 rounded transition-all text-center flex items-center justify-center gap-1 ${
                  filterLane === 'LINEAGE_WISDOM_LANE' || (filterLane as string) === 'EXPERIENTIAL_LANE'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <span>Lineage &amp; Wisdom</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterLane('BINOCULAR_SYNTHESIS')}
                className={`py-1 px-1.5 rounded transition-all text-center flex items-center justify-center gap-1 ${
                  filterLane === 'BINOCULAR_SYNTHESIS'
                    ? 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/40'
                    : 'text-slate-400 hover:text-violet-300'
                }`}
              >
                <span>Neo Vision</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {nodes
                .filter(node => {
                  if (filterLane === 'ALL') return true;
                  if (filterLane === 'LINEAGE_WISDOM_LANE') {
                    return node.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (node.knowledgeLane as string) === 'EXPERIENTIAL_LANE';
                  }
                  return (node.knowledgeLane || 'EMPIRICAL_LANE') === filterLane;
                })
                .map((node) => {
                  const isLineage = node.knowledgeLane === 'LINEAGE_WISDOM_LANE' || (node.knowledgeLane as string) === 'EXPERIENTIAL_LANE';
                  const isBinocular = node.knowledgeLane === 'BINOCULAR_SYNTHESIS';

                  return (
                    <div
                      key={node.id}
                      className={`p-3.5 rounded bg-white/[0.02] hover:bg-white/[0.04] border transition-all font-mono ${
                        isLineage
                          ? 'border-white/10 border-l-2 border-l-amber-400 hover:border-amber-400/40'
                          : isBinocular
                          ? 'border-white/10 border-l-2 border-l-violet-400 hover:border-violet-400/40'
                          : 'border-white/10 border-l-2 border-l-[#4da6ff] hover:border-[#4da6ff]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${
                          isLineage ? 'text-amber-400' : isBinocular ? 'text-violet-400' : 'text-[#00ff95]'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            isLineage ? 'bg-amber-400' : isBinocular ? 'bg-violet-400' : 'bg-[#00ff95]'
                          }`} />
                          {node.callsign}
                        </span>
                        <div className="flex items-center gap-1">
                          {isLineage && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                              LINEAGE &amp; WISDOM
                            </span>
                          )}
                          {isBinocular && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/30 uppercase tracking-wider">
                              NEO VISION
                            </span>
                          )}
                          {!isLineage && !isBinocular && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                              EMPIRICAL
                            </span>
                          )}
                          <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/10 uppercase">
                            {node.nodeRole}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-white mb-0.5">
                        {node.name}
                      </div>

                      <div className="text-[11px] text-slate-400 mb-1.5">
                        {node.domain} &bull; <span className="text-slate-300">{node.subspecialty}</span>
                      </div>

                      {node.experientialLineage && (
                        <div className="text-[10px] text-amber-300/90 italic mb-2 flex items-center gap-1.5 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/20">
                          <Feather className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">{node.experientialLineage}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                        <span className={`truncate max-w-[200px] ${
                          isLineage ? 'text-amber-400/90' : isBinocular ? 'text-violet-400/90' : 'text-[#4da6ff]'
                        }`}>
                          {node.targetModuleName}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {isLineage && (
                            <span className="text-[9px] text-amber-400/80">Directive 47 Validated</span>
                          )}
                          <span className="text-slate-400">
                            {node.bandwidthCommitmentHours} hrs/wk
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Note on Sovereign Verification & Binocular Synthesis */}
            <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-xs text-slate-400 font-mono leading-relaxed space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#00ff95] font-bold uppercase tracking-wider">SOVEREIGN NETWORK DIRECTIVE:</span>
                <span className="text-[9px] text-amber-400 uppercase font-semibold">DIRECTIVE 46/47/48</span>
              </div>
              <p>
                Domain specialists and lived presence keepers operate as independent peer anchors. Science calibrates physical energy and planetary bounds; living presence, songlines, and art maintain the unbounded native flow of the human field.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
