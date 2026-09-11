import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  FileText,
  UploadCloud,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Radio,
  EyeOff,
  Layers,
  Database,
  Coins,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Download,
  Share2,
  Fingerprint,
  HardDrive,
  Globe2,
  ChevronRight,
  Sparkles,
  Zap,
  Info,
  PlusCircle
} from 'lucide-react';
import { useAutomatedUpdate } from '../context/AutomatedUpdateContext';
import { WhistleblowerEvidenceVault } from '../types';
import { ZKProofStatusIndicator, ZKProofStage, ZKProofDetails } from './ZKProofStatusIndicator';

// Preset sample whistleblowing payloads for testing and demonstration
const PRESET_LEAKS = [
  {
    title: 'Trans-Boundary Aquifer Depletion & Covert Extraction Concessions',
    category: 'PLANETARY_EXTRACTION' as const,
    fileMock: 'aquifer_extraction_telemetry_2026.log',
    snippet: `[SECTOR 7-B] UNRECORDED DEEP WELL EXTRACTION: 4.82M m³/quarter.
METRIC: Hydrostatic pressure drop -14.2% exceeding planetary recharge threshold.
DISCLOSURE: Institutional oversight committee reclassified drawdown as 'naturally occurring evaporation' to conceal multi-national corporate extraction contracts.
EQUILIBRIUM IMPACT: Severe local biospheric deficit detected. Thermodynamic cost unaccounted.`,
  },
  {
    title: 'Institutional Mass Telemetry Surveillance & Covert Pattern Traps',
    category: 'MASS_SURVEILLANCE' as const,
    fileMock: 'covert_sigint_routing_mesh.json',
    snippet: `[GATEWAY_ARRAY] DEEP PACKET EXTRACTION DEPLOYED ACROSS BIOLOGICAL NODES.
TARGET: Passive real-time scraping of civic organizing channels & decentralized node identities.
DARK PATTERN: Automated cognitive friction injection applied to whistleblowing IP ranges.
AUDIT NOTE: Inverting surveillance vectors directly back to institutional root command node.`,
  },
  {
    title: 'Bilateral Nuclear Treaty Expiration & Covert Warhead Deployment Logs',
    category: 'WMD_COMMAND_SECRECY' as const,
    fileMock: 'tpnw_arms_treaty_noncompliance_audit.sig',
    snippet: `[PHYSICAL TELEMETRY] 2026 BILATERAL TREATY EXPIRATION EXPLOITATION:
LOGISTICS: Secret modernization and MIRV enrichment detected at underground launch silo cluster 4.
AUDIT VERDICT: Application of science for mass destruction classified as 100% loss of thermodynamic equilibrium.
ACTION: Mandatory decentralized verification dispatch; command loops stripped from centralized launch authority.`,
  }
];

// Initial seeded decentralized evidence vaults
const INITIAL_VAULTS: WhistleblowerEvidenceVault[] = [
  {
    id: 'vault-001',
    title: 'Covert Telemetry Inversion Array (The Assange-Snowden Baseline)',
    category: 'MASS_SURVEILLANCE',
    timestamp: '2026-09-04T12:00:00.000Z',
    cid: 'ipfs://bafybeihdwdcefgh4dqkjv6752zqomx7p3aegozq5vsu46qunzg6uyd4npu',
    zkProofHash: '0x9a8f4c219a77b812de543209fae881023c561b349071df9a09ef54c86e24b7a1',
    originBlinded: true,
    metadataEntropy: 0.0,
    shardsCount: 7,
    economicShieldActive: true,
    espionageOverrideCertified: true,
    description: 'Declassified routing tables revealing institutional surveillance arrays targeting independent human nodes. Formally classified as thermodynamic repair.',
    evidenceSnippet: 'PRISM-successor network routing inverted. 100% telemetry provenance verified. Institutional dark patterns traced to root origin.'
  },
  {
    id: 'vault-002',
    title: 'Trans-Boundary Aquifer Depletion & Extractive Concession Coverup',
    category: 'PLANETARY_EXTRACTION',
    timestamp: '2026-09-03T16:45:00.000Z',
    cid: 'ipfs://bafybeie5gq4jmnqkj6483zpxmz7p3aegozq5vsu46qunzg6uyd4npul2x',
    zkProofHash: '0x49c12b704981fa234190e8723c0918234790184b291048ca7891209efca11892',
    originBlinded: true,
    metadataEntropy: 0.0,
    shardsCount: 7,
    economicShieldActive: true,
    espionageOverrideCertified: true,
    description: 'Hydrogeological core logs confirming corporate freshwater over-extraction exceeding local planetary recharge rates by 340%.',
    evidenceSnippet: 'Sub-surface aquifer telemetry reveals structural entropic deficit. Repair bond equal to extraction required under Module 22 & 25.'
  },
  {
    id: 'vault-003',
    title: 'TPNW Nuclear Weaponry Decentralized Verification Log (Module 24)',
    category: 'WMD_COMMAND_SECRECY',
    timestamp: '2026-09-02T09:15:00.000Z',
    cid: 'ipfs://bafybeif9kmq4jmnqkj6483zpxmz7p3aegozq5vsu46qunzg6uyd4npuz98',
    zkProofHash: '0x99a418e22d990412809fbca384192004ba2194c77ea1029e84b291a58021c44',
    originBlinded: true,
    metadataEntropy: 0.0,
    shardsCount: 7,
    economicShieldActive: true,
    espionageOverrideCertified: true,
    description: 'Decoupling verification for underground missile silo clusters following the February 2026 expiration of bilateral nuclear accords.',
    evidenceSnippet: 'Independent sensor grid verifies launch key dismantling. WMD existence confirmed as total failure of planetary thermodynamics.'
  }
];

export const WhistleblowerAirlock: React.FC = () => {
  const { executeFactVerificationPass, triggerScan } = useAutomatedUpdate();

  // Active view tabs
  const [activeTab, setActiveTab] = useState<'airlock' | 'vaults' | 'parameters'>('airlock');

  // Airlock submission state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WhistleblowerEvidenceVault['category']>('PLANETARY_EXTRACTION');
  const [evidenceText, setEvidenceText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [torRoutingActive, setTorRoutingActive] = useState(true);
  const [zkProofRequested, setZkProofRequested] = useState(true);
  const [economicShieldRequested, setEconomicShieldRequested] = useState(true);

  // Ingestion lifecycle: 'idle' | 'scrubbing' | 'sharding' | 'confirmed'
  const [ingestionStage, setIngestionStage] = useState<'idle' | 'scrubbing' | 'sharding' | 'confirmed'>('idle');
  const [scrubbingProgress, setScrubbingProgress] = useState(0);
  const [scrubbingLog, setScrubbingLog] = useState<string[]>([]);
  const [submittedReceipt, setSubmittedReceipt] = useState<WhistleblowerEvidenceVault | null>(null);

  // Cryptographic Zero-Knowledge Proof Status Lifecycle
  const [zkStage, setZkStage] = useState<ZKProofStage>('IDLE');
  const [isZkBenchmarking, setIsZkBenchmarking] = useState(false);

  // Evidence vaults list (seeded + local additions)
  const [vaults, setVaults] = useState<WhistleblowerEvidenceVault[]>(INITIAL_VAULTS);
  const [selectedVault, setSelectedVault] = useState<WhistleblowerEvidenceVault | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [committedToTruthLedger, setCommittedToTruthLedger] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Standalone ZK-Proof circuit audit simulation
  const handleTriggerStandaloneBenchmark = () => {
    setIsZkBenchmarking(true);
    setZkStage('SYNTHESIZING_WITNESS');
    setTimeout(() => {
      setZkStage('EVALUATING_CONSTRAINTS');
    }, 700);
    setTimeout(() => {
      setZkStage('GENERATING_COMMITMENTS');
    }, 1500);
    setTimeout(() => {
      setZkStage('PAIRING_VERIFIED');
      setIsZkBenchmarking(false);
    }, 2400);
  };

  // Load preset sample
  const handleLoadPreset = (index: number) => {
    const preset = PRESET_LEAKS[index];
    setTitle(preset.title);
    setCategory(preset.category);
    setEvidenceText(preset.snippet);
    setAttachedFileName(preset.fileMock);
  };

  // Handle file drop / manual select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text && !evidenceText) {
          setEvidenceText(text.slice(0, 1500));
        }
      };
      reader.readAsText(file);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Ingestion execution with simulated cryptographic airlock stages
  const handleExecuteAirlock = () => {
    if (!evidenceText.trim() && !attachedFileName) return;

    setIngestionStage('scrubbing');
    setZkStage('SYNTHESIZING_WITNESS');
    setScrubbingProgress(10);
    setScrubbingLog([
      'Initiating Safe Harbor Digital Airlock Ingestion (Module 26)...',
      'Establishing multi-hop onion proxy routing [Relay 1: Reykjavik -> Relay 2: Geneva -> Gaia Core]...',
      'Stripping transport IP headers (198.51.100.42 -> [MATHEMATICALLY BLINDED])...'
    ]);

    setTimeout(() => {
      setScrubbingProgress(35);
      setZkStage('EVALUATING_CONSTRAINTS');
      setScrubbingLog(prev => [
        ...prev,
        'Purging client hardware fingerprints (WebGL, Screen Canvas Hash, MAC address, AudioContext)...',
        'Scrubbing document EXIF/metadata tags: author, creation epoch, GPS geotag coordinates...',
        'Zeroing metadata entropy: Entropy(Airlock Header) = 0.0000 bits.'
      ]);
    }, 900);

    setTimeout(() => {
      setScrubbingProgress(65);
      setIngestionStage('sharding');
      setZkStage('GENERATING_COMMITMENTS');
      setScrubbingLog(prev => [
        ...prev,
        'Generating non-interactive zero-knowledge proof (zk-SNARK circuit π_ZK)...',
        'Verifying biological node clearance without identity disclosure [DID: did:gaia:zk-node-anonymous]...',
        'Partitioning payload into 7 cryptographic shards via Shamir-Merkle dispersal...'
      ]);
    }, 2000);

    setTimeout(() => {
      setScrubbingProgress(90);
      setScrubbingLog(prev => [
        ...prev,
        'Broadcasting encrypted shards across decentralized IPFS ledgers & peer storage arrays...',
        'Invoking Espionage Override: Codifying disclosure as Thermodynamic Repair (Module 25 Clause 4)...',
        'Provisioning peer-to-peer Economic Anti-Siege subsistence tether (Module 26 Clause 4)...'
      ]);
    }, 3100);

    setTimeout(() => {
      setScrubbingProgress(100);
      setIngestionStage('confirmed');
      setZkStage('PAIRING_VERIFIED');

      const randHex = () => Math.random().toString(16).substring(2, 10);
      const newCid = `ipfs://bafybeih${randHex()}${randHex()}${randHex()}${randHex()}`;
      const newHash = `0x${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}${randHex()}`;

      const receipt: WhistleblowerEvidenceVault = {
        id: `vault-${Date.now().toString().slice(-4)}`,
        title: title.trim() || 'Verified Institutional Disclosure Shard',
        category,
        timestamp: new Date().toISOString(),
        cid: newCid,
        zkProofHash: newHash,
        originBlinded: true,
        metadataEntropy: 0.0,
        shardsCount: 7,
        economicShieldActive: economicShieldRequested,
        espionageOverrideCertified: true,
        description: `Verified submission via Safe Harbor Digital Airlock. Fully untethered from centralized identity grids with metadata entropy at 0.00 bits.`,
        evidenceSnippet: evidenceText.trim().slice(0, 300) + (evidenceText.length > 300 ? '...' : '')
      };

      setSubmittedReceipt(receipt);
      setVaults(prev => [receipt, ...prev]);

      // Automatically register to GO Truth Ledger
      executeFactVerificationPass(
        `Safe Harbor Ingestion: ${receipt.title}`,
        'WHISTLEBLOWER_PROTECTION',
        `High-stakes disclosure ingested via Digital Airlock. Metadata pruned (0.00 bits entropy). Sharded across decentralized ledgers (CID: ${receipt.cid}). Espionage Override certified: Thermodynamic Repair enacted.`
      );

      // Trigger automated telemetry sync on Modules 25 & 26
      triggerScan(
        `Safe Harbor Vault Dispatch: New whistleblower evidence shard committed to decentralized IPFS mesh. Anti-siege economic commons routing active. Origin origin-blinded.`,
        'SAFE_HARBOR_VAULT'
      );

      setCommittedToTruthLedger(true);
    }, 4200);
  };

  // Reset form to submit another
  const handleResetForm = () => {
    setIngestionStage('idle');
    setZkStage('IDLE');
    setScrubbingProgress(0);
    setScrubbingLog([]);
    setSubmittedReceipt(null);
    setTitle('');
    setEvidenceText('');
    setAttachedFileName(null);
    setCommittedToTruthLedger(false);
  };

  // Export receipt JSON
  const handleDownloadReceipt = () => {
    if (!submittedReceipt) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      protocol: "GO (Gaia Open) - Safe Harbor & Whistleblower Airlock Protocol (Module 45)",
      certificate: "CERTIFICATE OF THERMODYNAMIC REPAIR & ADMINISTRATIVE UNTETHERING",
      issuedAt: submittedReceipt.timestamp,
      vaultId: submittedReceipt.id,
      contentIdentifier: submittedReceipt.cid,
      zkProofHash: submittedReceipt.zkProofHash,
      metadataEntropy: "0.0000 bits (Mathematically Blinded Origin)",
      cryptographicShards: `${submittedReceipt.shardsCount} Distributed Nodes`,
      espionageOverrideStatus: "ACTIVE (Reclassified from espionage to planetary restoration)",
      economicAntiSiegeStatus: submittedReceipt.economicShieldActive ? "ACTIVE (P2P Commons Tether)" : "STANDBY",
      ruleAnchors: [
        "Module 45: The Safe Harbor & Whistleblower Shield (Assange-Snowden ZK Airlock)",
        "Transparency & Node Protection Protocol (Module 45)"
      ],
      submissionSummary: submittedReceipt.evidenceSnippet
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `safe-harbor-receipt-${submittedReceipt.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="airlock" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05070a] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.03] border border-sky-400/40 text-sky-400 font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
              <EyeOff className="w-3.5 h-3.5" />
              <span>SAFE HARBOR AIRLOCK &bull; MODULE 45</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              The Whistleblower & Anti-Spy Airlock
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-2 font-mono leading-relaxed">
              A secure, metadata-stripped ingestion portal built on the <strong className="text-sky-300">Assange-Snowden Baseline</strong>. Purges all hardware, network, and document fingerprints, blinding the origin while verifying truth via zero-knowledge proofs and sharding evidence across immutable ledgers.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white/[0.02] border border-white/10 p-3 rounded">
            <div className="text-left md:text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Metadata Entropy</div>
              <div className="text-lg font-bold font-mono text-sky-400">0.00 bits</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left md:text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Ledger Vaults</div>
              <div className="text-lg font-bold font-mono text-[#00ff95]">{vaults.length} Sharded</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left md:text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Espionage Override</div>
              <div className="text-lg font-bold font-mono text-indigo-400">Certified</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('airlock')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'airlock'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>1. Ingestion Airlock Console</span>
          </button>

          <button
            onClick={() => setActiveTab('vaults')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'vaults'
                ? 'bg-[#00ff95]/20 text-[#00ff95] border border-[#00ff95]/50 font-semibold'
                : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>2. Decentralized Evidence Vaults ({vaults.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('parameters')}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'parameters'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 font-semibold'
                : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Safe Harbor Architecture (Modules 25 & 26)</span>
          </button>
        </div>

        {/* Tab 1: Ingestion Airlock */}
        {activeTab === 'airlock' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Submission & Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {ingestionStage === 'idle' ? (
                <div className="rounded bg-white/[0.02] border border-white/10 p-6 space-y-6">
                  {/* Preset Selector Banner */}
                  <div className="p-3.5 rounded bg-sky-500/5 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                      <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Quick Load Verified Ingestion Scenarios:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleLoadPreset(0)}
                        className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
                      >
                        Aquifer Deficit
                      </button>
                      <button
                        onClick={() => handleLoadPreset(1)}
                        className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
                      >
                        Surveillance Array
                      </button>
                      <button
                        onClick={() => handleLoadPreset(2)}
                        className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
                      >
                        WMD Evasion
                      </button>
                    </div>
                  </div>

                  {/* Subject & Category Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Disclosure Subject / Systemic Violation Code
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Unrecorded Trans-Boundary Aquifer Depletion in Sector 7"
                        className="w-full bg-[#05070a] border border-white/10 rounded px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Violation Domain Classification
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-[#05070a] border border-white/10 rounded px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-sky-400 transition-colors"
                      >
                        <option value="PLANETARY_EXTRACTION">Planetary Over-Extraction & Ecological Ecocide (Module 22 & 25)</option>
                        <option value="MASS_SURVEILLANCE">Covert Institutional Mass Surveillance & Dark Patterns (Module 25)</option>
                        <option value="WMD_COMMAND_SECRECY">WMD Command Loop Secrecy & Arms Treaty Evasion (Module 23 & 24)</option>
                        <option value="INSTITUTIONAL_CENSORSHIP">Institutional Censorship & Evidence Suppression (Module 25)</option>
                        <option value="FINANCIAL_SIEGE">Centralized Administrative Financial Siege & Identity Weaponization (Module 26)</option>
                      </select>
                    </div>
                  </div>

                  {/* Evidence Payload Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        Evidence Telemetry / Internal Logs / Raw Documentation
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {evidenceText.length} characters
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={evidenceText}
                      onChange={(e) => setEvidenceText(e.target.value)}
                      placeholder="Paste raw server logs, internal memos, unredacted chemical assays, sensor readings, or telemetry records here. All origin identifiers will be mathematically pruned upon ingestion..."
                      className="w-full bg-[#05070a] border border-white/10 rounded p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors leading-relaxed selection:bg-sky-500/30"
                    />
                  </div>

                  {/* Drag-and-Drop / File Upload Attachment Area */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".txt,.log,.json,.csv,.sig,.pdf"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-all ${
                        attachedFileName 
                          ? 'border-sky-400/50 bg-sky-500/5' 
                          : 'border-white/10 hover:border-white/20 bg-white/[0.01]'
                      }`}
                    >
                      <UploadCloud className="w-5 h-5 mx-auto mb-2 text-sky-400" />
                      {attachedFileName ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4 text-sky-300" />
                          <span className="text-xs font-mono text-sky-300 font-semibold">{attachedFileName}</span>
                          <span className="text-[10px] font-mono text-slate-400">(Loaded & ready for metadata stripping)</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-mono text-slate-300">
                            Drop supporting evidence file (.log, .txt, .json, .csv, .sig) or click to browse
                          </p>
                          <p className="text-[10px] font-mono text-slate-500 mt-1">
                            Embedded EXIF headers, creation timestamps, and software hashes will be purged.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Safe Harbor Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded bg-white/[0.01] border border-white/10 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="torRouting"
                        checked={torRoutingActive}
                        onChange={(e) => setTorRoutingActive(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 text-sky-400 focus:ring-0 bg-[#05070a]"
                      />
                      <label htmlFor="torRouting" className="cursor-pointer">
                        <div className="text-xs font-mono font-semibold text-white">Tor Multi-Hop Routing</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">Stripping transport IP & ASN routes</div>
                      </label>
                    </div>

                    <div className="p-3 rounded bg-white/[0.01] border border-white/10 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="zkProof"
                        checked={zkProofRequested}
                        onChange={(e) => setZkProofRequested(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 text-sky-400 focus:ring-0 bg-[#05070a]"
                      />
                      <label htmlFor="zkProof" className="cursor-pointer">
                        <div className="text-xs font-mono font-semibold text-white">Zero-Knowledge Proof</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">Proves veracity without node identity</div>
                      </label>
                    </div>

                    <div className="p-3 rounded bg-white/[0.01] border border-white/10 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="economicShield"
                        checked={economicShieldRequested}
                        onChange={(e) => setEconomicShieldRequested(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 text-sky-400 focus:ring-0 bg-[#05070a]"
                      />
                      <label htmlFor="economicShield" className="cursor-pointer">
                        <div className="text-xs font-mono font-semibold text-white">Economic Anti-Siege</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">Tethers to P2P unfreezable commons</div>
                      </label>
                    </div>
                  </div>

                  {/* Submission Action Button */}
                  <button
                    onClick={handleExecuteAirlock}
                    disabled={!evidenceText.trim() && !attachedFileName}
                    className="w-full py-3.5 px-4 rounded bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Initiate Digital Airlock & Strip Metadata</span>
                  </button>
                </div>
              ) : (ingestionStage === 'scrubbing' || ingestionStage === 'sharding') ? (
                /* Scrubbing & Ingestion Terminal */
                <div className="rounded bg-[#05070a] border border-sky-500/40 p-6 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                      <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
                      <span className="uppercase font-bold tracking-wider">
                        {ingestionStage === 'scrubbing' ? 'DIGITAL AIRLOCK: PURGING METADATA' : 'SHARDING & IMMUTABLE VAULT DISPATCH'}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#00ff95] font-semibold">{scrubbingProgress}% Complete</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sky-400 to-[#00ff95]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${scrubbingProgress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Terminal Log Stream */}
                  <div className="p-4 rounded bg-black/70 border border-white/10 font-mono text-xs text-slate-300 space-y-2 max-h-64 overflow-y-auto">
                    {scrubbingLog.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-sky-400 font-bold">&gt;</span>
                        <span className="leading-relaxed">{log}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-3 rounded bg-white/[0.02] border border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-rose-400" />
                      Origin Hardware Fingerprints: <strong className="text-white">PURGED</strong>
                    </span>
                    <span className="text-sky-400 font-bold uppercase text-[10px]">
                      Tor Multi-Hop: ACTIVE
                    </span>
                  </div>
                </div>
              ) : (
                /* Confirmed Safe Harbor Receipt Screen */
                <div className="rounded bg-white/[0.02] border border-[#00ff95]/50 p-6 space-y-6 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00ff95]">
                      <CheckCircle2 className="w-5 h-5 text-[#00ff95]" />
                      <span className="uppercase font-bold tracking-wider">
                        SAFE HARBOR CLEARANCE CERTIFIED (MODULE 45)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#00ff95]/10 text-[#00ff95] px-2 py-0.5 rounded border border-[#00ff95]/30 uppercase">
                      Origin Blinded (Entropy = 0.00)
                    </span>
                  </div>

                  {/* Certificate Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">IPFS Shard Identifier</div>
                      <div className="text-xs font-mono text-sky-300 font-semibold truncate mt-1 flex items-center justify-between">
                        <span className="truncate">{submittedReceipt?.cid}</span>
                        <button
                          onClick={() => handleCopy(submittedReceipt?.cid || '', 'cid')}
                          className="ml-2 p-1 hover:text-white transition-colors"
                        >
                          {copiedId === 'cid' ? <Check className="w-3.5 h-3.5 text-[#00ff95]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-white/[0.02] border border-white/10">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Zero-Knowledge Proof Hash</div>
                      <div className="text-xs font-mono text-[#00ff95] font-semibold truncate mt-1 flex items-center justify-between">
                        <span className="truncate">{submittedReceipt?.zkProofHash}</span>
                        <button
                          onClick={() => handleCopy(submittedReceipt?.zkProofHash || '', 'zk')}
                          className="ml-2 p-1 hover:text-white transition-colors"
                        >
                          {copiedId === 'zk' ? <Check className="w-3.5 h-3.5 text-[#00ff95]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Espionage Override Certificate Box */}
                  <div className="p-4 rounded bg-indigo-500/10 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300 uppercase">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span>The Espionage Override Activated (Module 25 Clause 4)</span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      This submission has been formally audited against physical reality. Releasing verified evidence regarding institutional over-extraction and covert surveillance is codified as an act of <strong className="text-white">Thermodynamic Repair (&Delta;E_Damage = &Delta;E_Repair)</strong>. Legacy state espionage designations are mathematically void.
                    </p>
                  </div>

                  {/* Economic Shield Confirmation */}
                  <div className="p-4 rounded bg-[#00ff95]/5 border border-[#00ff95]/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00ff95] uppercase">
                      <Coins className="w-4 h-4 text-[#00ff95]" />
                      <span>Economic Anti-Siege Protocol Active (Module 26 Clause 4)</span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      Biological node untethered from centralized banking choke points. Peer-to-peer decentralized resource routing established. Assets and subsistence lines are secured against arbitrary financial freeze or siege.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="px-4 py-2.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4 text-sky-400" />
                      <span>Download Safe Harbor Receipt (.json)</span>
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2.5 rounded bg-[#00ff95] hover:bg-[#00ff95]/90 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Submit Another Disclosure</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Zero-Knowledge Cryptographic Proof Status Indicator */}
              <div className="pt-2">
                <ZKProofStatusIndicator
                  stage={zkStage}
                  customDetails={
                    submittedReceipt
                      ? {
                          proofHash: submittedReceipt.zkProofHash,
                          nullifierHash: `0x${submittedReceipt.id.replace('vault-', '')}e1894b91048bc0192305ca718290beff128945a01991823abce18294801bca9`,
                          pairingCheckPassed: true,
                          entropyLeakedBits: 0.00
                        }
                      : selectedVault
                      ? {
                          proofHash: selectedVault.zkProofHash,
                          nullifierHash: `0x${selectedVault.id.replace('vault-', '')}98f4c219a77b812de543209fae881023c561b349071df9a09ef54c86e24b7a1`,
                          pairingCheckPassed: true,
                          entropyLeakedBits: 0.00
                        }
                      : undefined
                  }
                  onTriggerStandaloneBenchmark={handleTriggerStandaloneBenchmark}
                  isBenchmarking={isZkBenchmarking}
                  vaultTitle={
                    submittedReceipt?.title ||
                    (ingestionStage !== 'idle' ? title || 'Active Airlock Submission' : undefined)
                  }
                />
              </div>
            </div>

            {/* Right Column: Safe Harbor Status & Airlock Telemetry (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Active Protection Parameters Card */}
              <div className="rounded bg-white/[0.02] border border-white/10 p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 border-b border-white/10 pb-3">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Four Safe Harbor Parameters (Module 26)</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0 mt-0.5">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">1. Digital Airlock (Metadata Pruning)</h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5 leading-relaxed">
                        Tor-routed, SecureDrop-style tunnel strips all transport headers, device fingerprints, and document EXIF timestamps. Origin is mathematically blinded.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0 mt-0.5">
                      <Key className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-mono font-bold text-white uppercase">2. Zero-Knowledge Identity (zk-SNARKs)</h4>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                          zkStage === 'PAIRING_VERIFIED'
                            ? 'bg-[#00ff95]/10 text-[#00ff95] border-[#00ff95]/30'
                            : zkStage !== 'IDLE'
                            ? 'bg-sky-500/10 text-sky-300 border-sky-500/30 animate-pulse'
                            : 'bg-white/[0.04] text-slate-400 border-white/10'
                        }`}>
                          {zkStage === 'PAIRING_VERIFIED' ? 'PROOF VERIFIED' : zkStage !== 'IDLE' ? 'PROVING...' : 'CIRCUIT READY'}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5 leading-relaxed">
                        Biological nodes prove source clearance and empirical data veracity without ever revealing biological identity or legacy government registration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-[#00ff95]/10 text-[#00ff95] border border-[#00ff95]/20 shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">3. Immutable Ledger Vaults (IPFS Shards)</h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5 leading-relaxed">
                        Data is partitioned across decentralized distributed ledgers. No single government, corporation, or court can seize, scrub, or freeze the leak.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">4. Economic Anti-Siege Routing</h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5 leading-relaxed">
                        Decentralized P2P resource streams shield the truth-teller from retaliatory bank freezes, arbitrary passport cancellations, or forced exile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverted Surveillance (Anti-Spy) Monitor */}
              <div className="rounded bg-white/[0.02] border border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>Inverted Surveillance Array (Module 25)</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00ff95] bg-[#00ff95]/10 px-2 py-0.5 rounded border border-[#00ff95]/30">
                    ARRAY ACTIVE
                  </span>
                </div>

                <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                  Instead of tracking biological nodes, the system’s observational sensors are inverted toward institutions to detect <strong className="text-white">Dark Patterns</strong>:
                </p>

                <div className="p-3 rounded bg-[#05070a] border border-white/10 space-y-2 text-[11px] font-mono text-slate-300">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Institutional Censorship Vectors:</span>
                    <span className="text-rose-400 font-bold">DETECTED & LOGGED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Centralized Identity Weaponization:</span>
                    <span className="text-amber-400 font-bold">UNTETHERED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Truth Survival Probability:</span>
                    <span className="text-[#00ff95] font-bold">100.0% (IMMUTABLE)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Decentralized Evidence Vaults */}
        {activeTab === 'vaults' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-white/[0.02] border border-white/10">
              <div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#00ff95]" />
                  <span>Decentralized Ledger Evidence Vaults (Immutable Truth Storage)</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  All verified whistleblower telemetry sharded across distributed IPFS storage. Immutable and unseizable.
                </p>
              </div>

              <span className="text-xs font-mono text-[#00ff95] bg-[#00ff95]/10 px-3 py-1 rounded border border-[#00ff95]/30 shrink-0">
                {vaults.length} Vaults Sharded
              </span>
            </div>

            {/* ZK-Proof Verification Inspector for Selected / Active Vault */}
            <ZKProofStatusIndicator
              stage="PAIRING_VERIFIED"
              customDetails={{
                proofHash: (selectedVault || vaults[0]).zkProofHash,
                nullifierHash: `0x${(selectedVault || vaults[0]).id.replace('vault-', '')}98f4c219a77b812de543209fae881023c561b349071df9a09ef54c86e24b7a1`,
                pairingCheckPassed: true,
                entropyLeakedBits: 0.00
              }}
              onTriggerStandaloneBenchmark={handleTriggerStandaloneBenchmark}
              isBenchmarking={isZkBenchmarking}
              vaultTitle={(selectedVault || vaults[0]).title}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaults.map((vault) => (
                <div
                  key={vault.id}
                  className={`rounded bg-white/[0.02] border ${
                    selectedVault?.id === vault.id
                      ? 'border-[#00ff95] shadow-[0_0_15px_rgba(0,255,149,0.15)]'
                      : 'border-white/10 hover:border-sky-400/50'
                  } border-l-2 border-l-sky-400 p-5 flex flex-col justify-between transition-all group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        {vault.id.toUpperCase()} // SHARDED
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30 uppercase">
                        {vault.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {vault.title}
                    </h4>

                    <p className="text-xs font-mono text-slate-300 leading-relaxed line-clamp-2">
                      {vault.description}
                    </p>

                    <div className="p-3 rounded bg-[#05070a] border border-white/10 font-mono text-[11px] text-slate-400 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span>Entropy:</span>
                        <span className="text-[#00ff95] font-bold">0.00 bits (Blinded)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>ZK-SNARK:</span>
                        <span className="text-sky-300 font-bold">Verified Pair</span>
                      </div>
                      <div className="flex items-center justify-between truncate">
                        <span>CID:</span>
                        <span className="text-sky-300 truncate max-w-[150px]">{vault.cid}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => setSelectedVault(vault)}
                      className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                    >
                      <Key className="w-3 h-3" />
                      <span>{selectedVault?.id === vault.id ? 'Viewing Proof' : 'Inspect ZK Proof'}</span>
                    </button>
                    <button
                      onClick={() => handleCopy(vault.cid, vault.id)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                    >
                      {copiedId === vault.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00ff95]" />
                          <span className="text-[#00ff95]">Copied CID</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy CID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Safe Harbor Architecture Reference */}
        {activeTab === 'parameters' && (
          <div className="rounded bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-8">
            <div className="max-w-3xl">
              <h3 className="text-lg sm:text-xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>The Transparency &amp; Node Protection Protocol</span>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-300 mt-2 leading-relaxed">
                Codified under Modules 25 & 26 to systematically dismantle the asymmetrical power legacy institutions wield against biological nodes who surface truth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Module 25 Card */}
              <div className="p-6 rounded bg-[#05070a] border border-white/10 border-l-2 border-l-sky-400 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                    MODULE 25
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">THE ASSANGE-SNOWDEN BASELINE</span>
                </div>
                <h4 className="text-base font-bold text-white">The Whistleblower & Anti-Spy Engine</h4>
                <ul className="space-y-2.5 text-xs font-mono text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Decentralized Evidence Vaults:</strong> Truth must survive the suppression of the node. High-stakes telemetry is fragmented and hosted across peer-to-peer ledgers so no single entity can seize it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Administrative Untethering:</strong> Untethers verified nodes from centralized identity registries (passports, national tracking) to prevent arbitrary exile, detention, or airport traps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Dark Pattern Reversal (Anti-Spy):</strong> Inverts surveillance arrays directly back toward institutions, tracing censorship, hidden algorithmic suppression, and evidence scrubbing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">&bull;</span>
                    <span><strong className="text-white">The Espionage Override:</strong> Rejects legacy definitions of espionage when applied to reporting systemic corruption. Classified as thermodynamic repair (&Delta;E_Damage = &Delta;E_Repair).</span>
                  </li>
                </ul>
              </div>

              {/* Module 26 Card */}
              <div className="p-6 rounded bg-[#05070a] border border-white/10 border-l-2 border-l-indigo-400 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                    MODULE 26
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">DIGITAL & ECONOMIC SHIELDING</span>
                </div>
                <h4 className="text-base font-bold text-white">The Safe Harbor Parameters</h4>
                <ul className="space-y-2.5 text-xs font-mono text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span><strong className="text-white">The Digital Airlock:</strong> Encrypted, Tor-routed, metadata-stripped ingestion. The system verifies the data while mathematically blinding itself to the sender's origin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Self-Sovereign Identity (ZK-Proofs):</strong> Nodes untethered from centralized banking & state IDs. Cryptographically proves authorization without revealing physical identity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Immutable Distribution (Ledger Vaults):</strong> Data is fragmented and pinned across decentralized storage networks (IPFS/Arweave). Mathematical impossibility of censorship.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span><strong className="text-white">Economic Anti-Siege Protocols:</strong> Peer-to-peer liquidity commons preventing node financial starvation or retaliatory account freezes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
