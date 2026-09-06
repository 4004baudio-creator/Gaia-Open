import { GaiaModule } from '../types';

/** Supporting modules 31–33. Not spine. */
export const AUDIT_SUPPORT_MODULES: GaiaModule[] = [
  {
    id: 'module-31',
    number: 31,
    title: 'THE CLAIM SHELF (MEDIA PACKET AUDIT)',
    phase: 'PHASE_XVII',
    phaseLabel: 'Phase XVII: The Transparency & Node Protection Protocol',
    domains: ['Transparency & Node Protection', 'Data Science & Telemetry', 'Commons Governance', 'GO (Gaia Open) & Collaborative Telemetry'],
    thesis: 'A verified account is not a verified sentence. Stories enter as claim packets with rival variants, an open challenge channel, and a versioned diff. Weight is reproducibility plus evidence rank plus failed predictions — not clicks or fear.',
    fullRule: `The Claim Shelf (Media Packet Audit):
1. Packet, not crown: raw cut → story variant → rival variants → external audit → shelf (ANCHORED | DISPUTED | BESIDE | REFUSED).
2. Tethered mark requires named claims with URLs or hashes, time and place, at least one independent packet, an open challenge channel, versioning, and no inner-state harvest.
3. Refuse the badge when the only proof is a platform tick, a model sold as a sensor, a single season sold as the ledger, or rivals deleted instead of scored.
4. Technology scores variants. It does not silence people. Quarantine packets.`,
    mathematicalLaw: '\\text{Weight}(v) \\propto R_{\\text{hash}} \\cdot \\rho_{\\text{rank}} \\cdot (1 - F_{\\text{miss}}) \\quad \\text{never } \\propto \\text{clicks}',
    verificationMethod: 'Two nodes pull the cited URL, agree on a hash, and can point to a second packet. See MEDIA_CLAIM_AUDIT.md.',
    telemetryMetricName: 'Claim Tether Rate',
    telemetryUnit: 'tethered sentences / published sentences',
    telemetryBaseline: 0,
    realWorldAnchors: [
      'Climate TRACE public changelogs and methodology-documents repository',
      'Argo delayed-mode adjustment files carrying PSAL_ADJUSTED_ERROR',
      'Newsroom correction diffs that leave the prior cut visible'
    ],
    operationalDirectives: [
      'Do not render a media tick as VERIFIED_PHYSICAL_REALITY',
      'Keep rival variants visible and scored',
      'Drop weight when the next series window contradicts the sentence; keep the diff'
    ]
  },
  {
    id: 'module-32',
    number: 32,
    title: 'THE INVENTORY TETHER (SECOND LEDGER RANK)',
    phase: 'PHASE_I_III',
    phaseLabel: 'Phase I-III: Foundations, Telemetry, & Bandwidth',
    domains: ['Data Science & Telemetry', 'Thermodynamics & Energy', 'GO (Gaia Open) & Collaborative Telemetry', 'Commons Governance'],
    thesis: 'Tonnes estimates are not thermometers. Rank inventories under calibrated instruments. Climate TRACE and peers may challenge a national self-report; they do not overwrite Argo or CERES-class series.',
    fullRule: `The Inventory Tether:
1. Rank high to low: delayed-mode in-situ → public flux/inventory with named instrument → national GHG inventory → independent second inventory (Climate TRACE-class) → national-mean downscale → unsigned model → story.
2. A lower rank may challenge a higher rank. It may not overwrite it.
3. A TRACE row needs sector method, release version, time window, and carried uncertainty before ANCHORED. Uncertainty on request is PLAUSIBLE.
4. Repair claims on REPAIR_PIVOT_MAP.md need an instrumented series at ranks 1–4.`,
    mathematicalLaw: '\\text{rank}(I) < \\text{rank}(S_{\\text{in-situ}}) \\implies I \\text{ may challenge } S,\\; I \\nrightarrow S',
    verificationMethod: 'Same URL, same version tag, two hashes. Method doc present. See MODULE_32_INVENTORY_TETHER.md.',
    telemetryMetricName: 'Inventory Rank Compliance',
    telemetryUnit: 'rows with method+version+window',
    telemetryBaseline: 0,
    realWorldAnchors: [
      'Climate TRACE methodology-documents and monthly v5.x changelogs',
      'UNFCCC national inventory submissions',
      'Argo GDAC delayed-mode files; NASA CERES TOA flux products'
    ],
    operationalDirectives: [
      'Never headline satellite-proved when the row is a national-average model',
      'Edge CH4/CO2 nodes still pass EDGE_DEVICE_AUDIT.md before arguing with TRACE or UNFCCC',
      'Keep external disputes (e.g. inventory comparison papers) on the shelf as rival packets'
    ]
  },
  {
    id: 'module-33',
    number: 33,
    title: 'THE EXPLORATION CATALOGUE (PUBLIC SKY FILES)',
    phase: 'PHASE_XIV',
    phaseLabel: 'Phase XIV: Cosmological Scaling & Universal Anchoring',
    domains: ['Astrophysics & Deep Cosmos', 'Data Science & Telemetry', 'Cosmological Scaling & Universal Anchoring', 'GO (Gaia Open) & Collaborative Telemetry'],
    thesis: 'Exploration uses the same honesty as ground repair. Public mission pages and survey catalogues may enter the anchored shelf. Design language and unexplained sky experience stay beside the map. In-app lock percentages are OPS_SIM until a catalogue version is cited.',
    fullRule: `The Exploration Catalogue:
1. May ingest: named agency mission status, public survey catalogues with version and licence, published ephemerides.
2. May sit beside: Module 19 bridge language, mnemonic equations, a node’s unexplained sky experience.
3. Must refuse: synthetic mission lock % labelled as Roman IR or Earth depth; closed military feeds; HRV sold as sky or climate fact.
4. Exploration does not wait for EEI = 0. It also does not fake equilibrium chrome.`,
    mathematicalLaw: '\\text{ANCHORED}_{\\text{sky}} \\iff \\exists\\; (\\text{catalogue version},\\; \\text{licence},\\; \\text{hash})',
    verificationMethod: 'Two nodes, same catalogue version, same hash. See MODULE_33_EXPLORATION_CATALOGUE.md.',
    telemetryMetricName: 'Catalogue Ingest Coverage',
    telemetryUnit: 'public catalogue versions on shelf',
    telemetryBaseline: 0,
    realWorldAnchors: [
      'ESA Gaia data releases (astrometric catalogue versions)',
      'NASA / ESA public mission status pages',
      'Planck / WMAP public CMB map releases'
    ],
    operationalDirectives: [
      'Do not stamp OPS chrome (Roman IR %, Kardashev bars) as catalogue ingest',
      'Do not force unexplained sky experience through Module 27',
      'Graft (Module 2): a new sky branch does not rewrite the locked spine'
    ]
  },
];
