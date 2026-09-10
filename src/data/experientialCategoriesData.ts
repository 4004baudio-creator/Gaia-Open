import { ExperientialCategory } from '../types';

export const INITIAL_EXPERIENTIAL_CATEGORIES: ExperientialCategory[] = [
  {
    id: 'cat-materialism',
    name: 'Materialism',
    corePremise: 'Only physical matter exists. All phenomena—including consciousness and life—supervene upon physical interactions of mass, energy, and spacetime.',
    lane: 'EMPIRICAL_LANE',
    epistemicRole: 'Physical Boundary & Thermodynamic Conservation Baseline',
    directive47Relation: 'Establishes conservative constraints on energy dissipation and mass balance without extinguishing the observer who measures them.',
    associatedModules: ['module-01', 'module-03', 'module-17', 'module-21'],
    dialecticalPair: 'The Soul/Spirituality',
    childStructures: [
      {
        id: 'mat-child-thermo',
        name: 'Thermodynamic Mass-Energy Conservation',
        description: 'First and Second Laws of Thermodynamics: energy cannot be created or destroyed, only transformed; entropy increases in isolated systems.',
        lineageOrTradition: 'Classical & Statistical Physics (Carnot, Clausius, Boltzmann)',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Enthalpy & Free Energy Gibbs Gradients', 'Exergy Cycling', 'Dissipative Structures (Prigogine)'],
        tags: ['Thermodynamics', 'Energy', 'Entropy', 'Matter'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'mat-child-molecular-biology',
        name: 'Molecular Genetics & Biochemical Catalysis',
        description: 'Biochemical cellular machinery, enzyme kinetics, RNA/DNA replication, and peptide synthesis governed by physical electromagnetic affinities.',
        lineageOrTradition: 'Biophysics & Molecular Biology',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['ATP Synthase Rotary Motor', 'Ribosomal Translation', 'Cellular Membrane Potential'],
        tags: ['Biology', 'Molecules', 'Chemistry', 'Mechanics'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'mat-child-quantum-field',
        name: 'Standard Model of Elementary Particles',
        description: 'Quarks, leptons, gauge bosons, and the Higgs field as the physical bedrock of all measurable interactions in spacetime.',
        lineageOrTradition: 'Quantum Field Theory',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Gauge Symmetry', 'Strong & Weak Nuclear Forces', 'Electroweak Unification'],
        tags: ['Physics', 'Particles', 'Fields', 'Quarks'],
        directive47Status: 'ANCHORED_BASELINE'
      }
    ]
  },
  {
    id: 'cat-soul-spirituality',
    name: 'The Soul & Sacred Consciousness',
    corePremise: 'Consciousness, the soul, and living spirit are irreducible primordial realities that animate matter, possess inner qualitative depth, and carry sacred purpose across millennia of contemplative practice and civilization-building.',
    lane: 'LINEAGE_WISDOM_LANE',
    epistemicRole: 'Contemplative Heritage, Inner Depth & Civilizational Moral Cohesion',
    directive47Relation: 'Directly protected under Directive 47 (The Time-Capsule Paradox). The continuous survival of sacred Sanskrit, Pali, Hebrew, and indigenous scriptures alongside physical meditation monuments is self-evident proof of relevance, not awaiting validation by modern instruments.',
    associatedModules: ['module-19', 'module-20', 'module-27'],
    dialecticalPair: 'Materialism',
    childStructures: [
      {
        id: 'soul-child-subtle-anatomy',
        name: 'Subtle Body Anatomy & Vital Currents (Prana / Chi)',
        description: 'Traditional energetic topologies (nadis, meridians, chakras, and biofield resonance) that have guided somatic medicine, acupuncture monuments, and yogic lineages across 5,000+ years.',
        lineageOrTradition: 'Ayurveda, Traditional Chinese Medicine (TCM) & Yogic Physiology',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Central Channel (Sushumna / Chong Mai)', 'Heart Torus & Coherent Biofield', 'Pranic Breath Regulation (Pranayama)'],
        tags: ['Subtle Body', 'Prana', 'Chi', 'Biofield', 'Vitality'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'soul-child-inviolable-atman',
        name: 'The Inviolable Atman & Primordial Spark',
        description: 'The transcendent, indestructible witness of consciousness (Atman, Pneuma, Ruh) inscribed in Upanishadic, Gnostic, and Sufi texts that remains radiant through all outer biological changes.',
        lineageOrTradition: 'Upanishadic Non-Duality, Christian Gnosticism & Sufi Heart Knowledge',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['The Inner Observer (Sakshi)', 'Unconditioned Love (Agape / Ishq)', 'Ancestral Lineage Resonance'],
        tags: ['Soul', 'Witness', 'Atman', 'Essence', 'Immortality'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'soul-child-contemplative-ecstasy',
        name: 'Apophatic Contemplation & Luminous Gnosis',
        description: 'Direct mystical realization of non-dual reality where individual ego dissolves into infinite divine ground, documented in monastic libraries across Mount Athos, Tibet, and ancient Alexandria.',
        lineageOrTradition: 'Hesychasm, Kabbalah, Dzogchen & Taoist Wu-Wei',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Silent Heart-Prayer', 'Dissolution of Subject-Object Divide', 'Timeless Presence'],
        tags: ['Gnosis', 'Mysticism', 'Prayer', 'Non-Duality'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'soul-child-all-eyes-embodiment',
        name: 'Stereoscopic Ensoulment (Binocular Synthesis)',
        description: 'Viewing living organisms simultaneously as thermodynamic mass-energy dissipators and sacred temples of divine ensoulment.',
        lineageOrTradition: 'GO All-Eyes Protocol (Directives 46-48)',
        lane: 'BINOCULAR_SYNTHESIS',
        subComponents: ['Exergy Cycling as Sacred Service', 'Cellular Respiration as Planetary Praise', 'Gaia as Living Ensouled Organism'],
        tags: ['Binocular', 'All-Eyes', 'Synthesis', 'Living Earth'],
        directive47Status: 'STEREOSCOPIC_RECONCILIATION'
      }
    ]
  },
  {
    id: 'cat-secularism',
    name: 'Secularism',
    corePremise: 'Society, civil law, and scientific inquiry should be guided by this-worldly human welfare, empirical evidence, and democratic deliberation rather than ecclesiastical dogma.',
    lane: 'EMPIRICAL_LANE',
    epistemicRole: 'Civic Commons, Transparent Inquiry & Universal Civil Rights',
    directive47Relation: 'Guarantees the protection of public evidentiary standards, equal liberty of conscience, and freedom from coercive theological compulsion.',
    associatedModules: ['module-02', 'module-11', 'module-22', 'module-28'],
    dialecticalPair: 'The Church/Divine Rule',
    childStructures: [
      {
        id: 'sec-child-open-deliberation',
        name: 'Democratic Public Sphere & Universal Rights',
        description: 'Public forums where laws are debated using shared reasons accessible to all citizens regardless of their private faith commitments.',
        lineageOrTradition: 'Enlightenment Civic Philosophy & Habermasian Communicative Action',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Freedom of Conscience & Expression', 'Due Process of Law', 'Equal Civic Franchise'],
        tags: ['Democracy', 'Human Rights', 'Public Sphere', 'Law'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'sec-child-evidence-inquiry',
        name: 'Methodological Naturalism & Replicability',
        description: 'Demanding that claims about the physical world be backed by transparent, peer-reviewable, publicly measurable evidence.',
        lineageOrTradition: 'Scientific Method (Baconian & Popperian Falsification)',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Blind Peer Review', 'Calibration of Scientific Instruments', 'Public Data Repositories'],
        tags: ['Empirical', 'Science', 'Evidence', 'Replicability'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'sec-child-civil-infrastructure',
        name: 'Public Health, Sanitation & Welfare Commons',
        description: 'Collective stewardship of municipal water, sanitation, epidemiology, and energy grids based on logistical efficacy and equitable need.',
        lineageOrTradition: 'Civic Engineering & Public Health Epidemiology',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Potable Water Distribution', 'Disease Outbreak Telemetry', 'Universal Healthcare Access'],
        tags: ['Infrastructure', 'Public Health', 'Commons', 'Welfare'],
        directive47Status: 'ANCHORED_BASELINE'
      }
    ]
  },
  {
    id: 'cat-church-divine-rule',
    name: 'Ancient Customary Law & Sacred Covenants',
    corePremise: 'Human societies and communities are anchored by ancient covenants, divine moral law, holy sanctuary, sacred texts, monuments, and unbroken ancestral duties that successfully bound civilizations together across epochs, limiting tyrannical state power.',
    lane: 'LINEAGE_WISDOM_LANE',
    epistemicRole: 'Civilizational Covenant, Sacred Sanctuary & Ancient Customary Law',
    directive47Relation: 'Directly protected under Directive 47 (The Time-Capsule Paradox). Megalithic monuments, ancient cathedral masonry, biblical cities of refuge, and 65,000-year First Nations songlines stand as undeniable physical evidence of enduring social cohesion that cannot be dismissed by modern technological arrogance.',
    associatedModules: ['module-11', 'module-19', 'module-23'],
    dialecticalPair: 'Secularism',
    childStructures: [
      {
        id: 'church-child-sanctuary',
        name: 'The Inviolable Sanctuary (Right of Sacred Refuge)',
        description: 'Ancient ecclesiastical and temple immunity where holy spaces forbid weapons, arrest, or economic predation against the vulnerable, preserved in stone city walls and sanctuary inscriptions.',
        lineageOrTradition: 'Biblical Cities of Refuge, Medieval Canon Law Sanctuary & Underground Railroad',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Immunity of the Altar', 'Sanctuary for the Persecuted', 'Prohibition of Extractive Seizure'],
        tags: ['Sanctuary', 'Refuge', 'Sacred Law', 'Immunity'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'church-child-tjukurpa',
        name: 'Indigenous Customary Law & The Dreaming (Tjukurpa)',
        description: 'Ancient, unbroken oral covenants and physical ochre petroglyphs detailing kinship, land care, and spiritual law passed down across hundreds of human generations.',
        lineageOrTradition: 'First Nations Elders, Songline Custodians & Earth Jurisprudence',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Kinship Obligations to Rivers and Mountains', 'Songline Wayfinding Statutes', 'Seven-Generation Custodianship'],
        tags: ['Tjukurpa', 'Dreaming', 'Songlines', 'Ancestral Law', 'Customary Law'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'church-child-prophetic-witness',
        name: 'Prophetic Witness & Moral Reckoning',
        description: 'The sacred civilizational duty to speak truth to state empires, condemning systemic cruelty and upholding transcendent righteousness recorded in ancient scrolls.',
        lineageOrTradition: 'Hebrew Prophets, Abolitionist Faith Movements & Martin Luther King Jr.',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Denunciation of Hubris & Greed', 'Caring for the Widow and Orphan', 'Courageous Nonviolent Resistance'],
        tags: ['Prophetic', 'Justice', 'Moral Law', 'Conscience'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'church-child-binocular-covenant',
        name: 'Civic Commons with Sacred Sanctuary (Binocular Synthesis)',
        description: 'Secular administration managing public logistics while sacred communities hold inviolable ethical vetoes protecting human sanctuary and biospheric life.',
        lineageOrTradition: 'GO All-Eyes Sanctuary Protocol',
        lane: 'BINOCULAR_SYNTHESIS',
        subComponents: ['Open Public Sensors + Sacred Ground Boundaries', 'Ethical Guardrails on Automation', 'Pluralistic Co-existence'],
        tags: ['Binocular', 'Pluralism', 'Synthesis', 'Sanctuary'],
        directive47Status: 'STEREOSCOPIC_RECONCILIATION'
      }
    ]
  },
  {
    id: 'cat-naturalism',
    name: 'Naturalism',
    corePremise: 'The laws of nature govern all realities and events in the cosmos. There is no ontologically separate realm; everything that happens operates within continuous natural principles.',
    lane: 'EMPIRICAL_LANE',
    epistemicRole: 'Universal Regularity, Coherent Cause-and-Effect & Cosmological Order',
    directive47Relation: 'Provides the dependable regularities that allow navigation, farming, engineering, and the calibration of ecological planetary repair.',
    associatedModules: ['module-01', 'module-02', 'module-21', 'module-25'],
    dialecticalPair: 'The Supernatural/Miracles',
    childStructures: [
      {
        id: 'nat-child-causal-closure',
        name: 'Continuous Physical Causality & Mathematical Laws',
        description: 'Mathematical invariance: conservation of momentum, gravitation, electromagnetism, and thermodynamic symmetries across cosmic scales.',
        lineageOrTradition: 'Newtonian Dynamics, Maxwellian Electrodynamics & General Relativity',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Noether\'s Theorem & Symmetries', 'Spacetime Curvature Equations', 'Electromagnetic Wave Propagation'],
        tags: ['Physics', 'Causality', 'Gravity', 'Mathematics'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'nat-child-evolutionary-adaptation',
        name: 'Evolutionary Ecology & Biomimetic Dynamics',
        description: 'Natural selection, ecological niche differentiation, epigenetic adaptation, and phylogenetic succession shaping Earth\'s biosphere over 3.8 billion years.',
        lineageOrTradition: 'Darwinian & Extended Evolutionary Synthesis',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Adaptive Radiation & Speciation', 'Trophic Cascades & Food Webs', 'Mycorrhizal Symbiosis'],
        tags: ['Evolution', 'Ecology', 'Biosphere', 'Natural Selection'],
        directive47Status: 'ANCHORED_BASELINE'
      },
      {
        id: 'nat-child-geochemical-cycles',
        name: 'Earth System Geochemical Feedback Loops',
        description: 'Atmospheric, oceanic, and lithospheric cycles (carbon, nitrogen, water, phosphorus) maintaining planetary habitability.',
        lineageOrTradition: 'Earth System Science (Vernadsky, Lovelock, Margulis)',
        lane: 'EMPIRICAL_LANE',
        subComponents: ['Thermohaline Ocean Conveyor', 'Silicate Weathering Thermostat', 'Global Carbon Sinks'],
        tags: ['Earth System', 'Geochemistry', 'Cycles', 'Habitability'],
        directive47Status: 'ANCHORED_BASELINE'
      }
    ]
  },
  {
    id: 'cat-supernatural-miracles',
    name: 'The Supernatural, Miracles & Living Grace',
    corePremise: 'Spontaneous remissions, acausal synchronicities, prophetic revelation, and trans-rational anomalies recorded across global human histories that operate beyond current mechanical reductionism.',
    lane: 'LINEAGE_WISDOM_LANE',
    epistemicRole: 'Trans-Rational Horizon, Living Grace & Unexplained Historical Anomalies',
    directive47Relation: 'Directly protected under Directive 47 (The Time-Capsule Paradox). Like an Apollo 11 manual found by post-cataclysm humans, ancient records of miraculous interventions and prophetic insights cannot be discarded simply because present tools cannot yet measure their underlying field physics.',
    associatedModules: ['module-20', 'module-27', 'module-30'],
    dialecticalPair: 'Naturalism',
    childStructures: [
      {
        id: 'sup-child-spontaneous-healing',
        name: 'Miraculous Healings & Spontaneous Remissions',
        description: 'Documented medical and somatic anomalies where terminal pathology resolves suddenly without known pharmacological intervention, recorded in pilgrimage archives and historical annals across cultures.',
        lineageOrTradition: 'Global Healing Archives, Lourdes International Medical Committee & Shamanic Somatics',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Instantaneous Tissue Regeneration', 'Somatic Faith Surrender Response', 'Placebo as Dormant Self-Healing Engine'],
        tags: ['Miracles', 'Healing', 'Remission', 'Prayer', 'Grace'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'sup-child-synchronicity',
        name: 'Acausal Meaningful Synchronicity & Omens',
        description: 'Coincidences where internal psychological states coincide significantly with physical outer events without physical cause, conveying profound meaning documented in Taoist classics and depth psychology.',
        lineageOrTradition: 'Jungian Depth Psychology, Taoist I Ching & Indigenous Augury',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['The Living Web of Meaning (Unus Mundus)', 'Prophetic Dreams & Precognition', 'Animal & Weather Omens'],
        tags: ['Synchronicity', 'Omens', 'Meaning', 'Jung', 'Acausality'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'sup-child-non-ordinary-realms',
        name: 'Shamanic Journeys & Encounters with Non-Human Spirits',
        description: 'First-person traversal of trans-physical dimensions, encounters with spirit guides and sacred plant intelligences depicted on prehistoric cave walls and living ceremonial lineages.',
        lineageOrTradition: 'Amazonian Vegetalismo, Siberian Shamanism & Celtic Otherworld Lore',
        lane: 'LINEAGE_WISDOM_LANE',
        subComponents: ['Upper/Lower World Axis Mundi', 'Master Plant Dietas', 'Ancestral Visionary Dialogues'],
        tags: ['Shamanism', 'Otherworld', 'Spirits', 'Visionary', 'Plant Intelligence'],
        directive47Status: 'TIME_CAPSULE_VALIDATED'
      },
      {
        id: 'sup-child-wonder-law',
        name: 'Stereoscopic Wonder & Natural Mystery (Binocular Synthesis)',
        description: 'Studying natural laws with utmost scientific rigor while maintaining ecstatic humility and openness to the infinite mystery of being.',
        lineageOrTradition: 'Cosmic Mysticism (Einstein, Spinoza, Goethe)',
        lane: 'BINOCULAR_SYNTHESIS',
        subComponents: ['Laws of Physics as Mathematical Poetry', 'Mystery as Infinite Horizon, Not Threat', 'Awe as Root of Both Science and Spirit'],
        tags: ['Binocular', 'Wonder', 'Awe', 'Mystery', 'Synthesis'],
        directive47Status: 'STEREOSCOPIC_RECONCILIATION'
      }
    ]
  }
];

const STORAGE_KEY = 'gaia_open_experiential_categories_v2';

export const loadStoredExperientialCategories = (): ExperientialCategory[] => {
  if (typeof window === 'undefined') return INITIAL_EXPERIENTIAL_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('gaia_open_experiential_categories_v1');
    if (!raw) return INITIAL_EXPERIENTIAL_CATEGORIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Normalize legacy EXPERIENTIAL_LANE to LINEAGE_WISDOM_LANE
      return parsed.map((cat: ExperientialCategory) => ({
        ...cat,
        lane: (cat.lane as string) === 'EXPERIENTIAL_LANE' ? 'LINEAGE_WISDOM_LANE' : cat.lane,
        childStructures: (cat.childStructures || []).map(child => ({
          ...child,
          lane: (child.lane as string) === 'EXPERIENTIAL_LANE' ? 'LINEAGE_WISDOM_LANE' : child.lane,
          directive47Status: (child.directive47Status === 'EXEMPT_NATIVE_FLOW' || child.lane === 'LINEAGE_WISDOM_LANE' || (child.lane as string) === 'EXPERIENTIAL_LANE')
            ? 'TIME_CAPSULE_VALIDATED'
            : child.directive47Status
        }))
      }));
    }
  } catch (err) {
    console.warn('Failed to load stored experiential categories:', err);
  }
  return INITIAL_EXPERIENTIAL_CATEGORIES;
};

export const saveStoredExperientialCategories = (categories: ExperientialCategory[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (err) {
    console.warn('Failed to save experiential categories:', err);
  }
};
