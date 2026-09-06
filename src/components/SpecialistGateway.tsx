import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Layers
} from 'lucide-react';
import { SpecialistNode, DomainCategory } from '../types';
import { MASTER_MODULES } from '../data/modulesData';
import { INITIAL_SPECIALIST_NODES } from '../data/initialSpecialists';

interface SpecialistGatewayProps {
  preSelectedModuleId?: string | null;
}

export const SpecialistGateway: React.FC<SpecialistGatewayProps> = ({ preSelectedModuleId }) => {
  const [nodes, setNodes] = useState<SpecialistNode[]>(INITIAL_SPECIALIST_NODES);
  
  // Form State
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState<DomainCategory>('Systems Engineering');
  const [subspecialty, setSubspecialty] = useState('');
  const [targetModuleId, setTargetModuleId] = useState<string>(preSelectedModuleId || 'module-12');
  const [nodeRole, setNodeRole] = useState<SpecialistNode['nodeRole']>('Lead Auditor');
  const [bandwidthHours, setBandwidthHours] = useState<number>(10);
  const [geographicRegion, setGeographicRegion] = useState('');
  
  // Submission State
  const [registeredNode, setRegisteredNode] = useState<SpecialistNode | null>(null);
  const [copiedCert, setCopiedCert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update target module if prop changes
  React.useEffect(() => {
    if (preSelectedModuleId) {
      setTargetModuleId(preSelectedModuleId);
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

      const newNode: SpecialistNode = {
        id: `node-${Date.now()}`,
        callsign: generatedCallsign,
        name: name.trim(),
        email: email.trim(),
        domain,
        subspecialty: subspecialty.trim() || 'General Domain Calibration',
        targetModuleId,
        targetModuleName: selectedModule ? `${selectedModule.number.toString().padStart(2, '0')}. ${selectedModule.title}` : 'Universal Telemetry',
        nodeRole,
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
          colors: ['#10b981', '#06b6d4', '#14b8a6', '#6366f1']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const handleCopyCertificate = () => {
    if (!registeredNode) return;
    const certText = `=== GAIA PULSE SOVEREIGN NODE CERTIFICATE (v2.6) ===
Callsign: ${registeredNode.callsign}
Domain Specialist: ${registeredNode.name}
Domain Expertise: ${registeredNode.domain}
Subspecialty: ${registeredNode.subspecialty}
Target Module Anchor: ${registeredNode.targetModuleName}
Role: ${registeredNode.nodeRole}
Bandwidth Allocation: ${registeredNode.bandwidthCommitmentHours} hrs/week
Geographic Anchor: ${registeredNode.geographicRegion}
Verification Key: ${registeredNode.verificationKey}
Status: ${registeredNode.peerStatus}
Registered At: ${registeredNode.registeredAt}
Directive: Aligning human technology with planetary thermodynamic equilibrium.
===================================================`;

    navigator.clipboard.writeText(certText);
    setCopiedCert(true);
    setTimeout(() => setCopiedCert(false), 2500);
  };

  return (
    <section id="gateway" className="py-20 md:py-28 relative bg-[#05070a] border-t border-white/10">
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

                {/* Name & Callsign */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Name / Academic Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Chen, PE"
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
                      placeholder="e.g. GAIA-THERMO-PACIFIC"
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
                      Geographic Region / Sensor Base
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nordic Interconnect / Atacama Relay"
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
                      <option value="Systems Engineering">Systems Engineering & Architecture</option>
                      <option value="Ecology & Biosphere">Ecology, Forestry & Biosphere</option>
                      <option value="Thermodynamics & Energy">Thermodynamics & Energy Balance</option>
                      <option value="Data Science & Telemetry">Data Science & Telemetry Pipelines</option>
                      <option value="Clinical & Neurobiology">Clinical Neurobiology & Somatics</option>
                      <option value="Astrophysics & Deep Cosmos">Astrophysics & Cosmological Instrumentation</option>
                      <option value="Commons Governance">Planetary Commons & Treaties</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Subspecialty Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Closed-loop Exergy Audits"
                      value={subspecialty}
                      onChange={(e) => setSubspecialty(e.target.value)}
                      className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Target Module Anchor */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Target Baseline Module to Anchor & Stabilize *
                  </label>
                  <select
                    value={targetModuleId}
                    onChange={(e) => setTargetModuleId(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-[#00ff95] rounded px-3 py-2 text-xs font-mono text-[#00ff95] focus:outline-none transition-colors"
                  >
                    {MASTER_MODULES.map((m) => (
                      <option key={m.id} value={m.id}>
                        Module {m.number.toString().padStart(2, '0')}: {m.title}
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
                      <option value="Lead Auditor">Lead Auditor (Structural Review)</option>
                      <option value="Telemetry Anchor">Telemetry Anchor (Sensor Feeds)</option>
                      <option value="Clinical Co-regulator">Clinical Co-regulator (Health/HRV)</option>
                      <option value="Commons Steward">Commons Steward (Lake Vostok / Oceans)</option>
                      <option value="Systems Validator">Systems Validator (Pruning & Ration)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Bandwidth Commitment:</span>
                      <strong className="text-[#00ff95]">{bandwidthHours} hrs/wk</strong>
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={40}
                      step={1}
                      value={bandwidthHours}
                      onChange={(e) => setBandwidthHours(Number(e.target.value))}
                      className="w-full accent-[#00ff95] mt-1"
                    />
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
                    <span>SOVEREIGN NODE CERTIFICATE (v2.6)</span>
                    <span className="text-[9px] bg-white/[0.03] px-2 py-0.5 rounded border border-[#00ff95]/40 uppercase tracking-wider">
                      STATUS: ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
                    <div><span className="text-slate-500 uppercase text-[10px]">Callsign:</span> {registeredNode.callsign}</div>
                    <div><span className="text-slate-500 uppercase text-[10px]">Specialist:</span> {registeredNode.name}</div>
                    <div><span className="text-slate-500 uppercase text-[10px]">Domain:</span> {registeredNode.domain}</div>
                    <div><span className="text-slate-500 uppercase text-[10px]">Role:</span> {registeredNode.nodeRole}</div>
                    <div className="col-span-2"><span className="text-slate-500 uppercase text-[10px]">Anchor:</span> {registeredNode.targetModuleName}</div>
                    <div className="col-span-2 truncate"><span className="text-slate-500 uppercase text-[10px]">Seed:</span> {registeredNode.verificationKey}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyCertificate}
                    className="flex-1 py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 flex items-center justify-center gap-2 transition-colors"
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
                    }}
                    className="py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-[#00ff95]/10 hover:bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/40 transition-colors"
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

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 border-l-2 border-l-[#4da6ff] hover:border-white/20 transition-all font-mono"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#00ff95] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff95] animate-pulse" />
                      {node.callsign}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/10 uppercase">
                      {node.nodeRole}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white mb-0.5">
                    {node.name}
                  </div>

                  <div className="text-[11px] text-slate-400 mb-2">
                    {node.domain} &bull; <span className="text-slate-300">{node.subspecialty}</span>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[200px] text-[#4da6ff]">
                      {node.targetModuleName}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {node.bandwidthCommitmentHours} hrs/wk
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Sovereign Verification */}
            <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-xs text-slate-400 font-mono leading-relaxed">
              <span className="text-[#00ff95] font-bold block mb-1 uppercase tracking-wider">SOVEREIGN NETWORK DIRECTIVE:</span>
              Domain specialists operate as independent peer verifiers. No single central authority can revoke or alter peer telemetry without cryptographic node consensus.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
