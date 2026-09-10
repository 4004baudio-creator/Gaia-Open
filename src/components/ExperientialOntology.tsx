import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Layers, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  Heart, 
  Eye, 
  Cpu, 
  BookOpen, 
  Feather, 
  Search, 
  ShieldCheck, 
  RotateCcw, 
  Download, 
  Upload, 
  Trash2, 
  Tag, 
  Compass, 
  ExternalLink,
  Split,
  Workflow,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  ExperientialCategory, 
  ExperientialChildStructure, 
  KnowledgeLane 
} from '../types';
import { 
  INITIAL_EXPERIENTIAL_CATEGORIES, 
  loadStoredExperientialCategories, 
  saveStoredExperientialCategories 
} from '../data/experientialCategoriesData';

interface ExperientialOntologyProps {
  onAdoptChildStructure?: (child: ExperientialChildStructure, category: ExperientialCategory) => void;
  selectedChildId?: string;
  className?: string;
}

export const ExperientialOntology: React.FC<ExperientialOntologyProps> = ({
  onAdoptChildStructure,
  selectedChildId,
  className = ''
}) => {
  // Main state with persistence
  const [categories, setCategories] = useState<ExperientialCategory[]>(() => loadStoredExperientialCategories());
  
  // Navigation & Filtering
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [laneFilter, setLaneFilter] = useState<'ALL' | KnowledgeLane>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'CARDS' | 'DIALECTIC' | 'TREE'>('CARDS');

  // Expanded categories map
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Record<string, boolean>>({
    'cat-materialism': true,
    'cat-soul-spirituality': true,
    'cat-secularism': true,
    'cat-church-divine-rule': true,
    'cat-naturalism': true,
    'cat-supernatural-miracles': true
  });

  // Modal: Add Child Structure
  const [targetCategoryForChild, setTargetCategoryForChild] = useState<ExperientialCategory | null>(null);
  const [childFormName, setChildFormName] = useState('');
  const [childFormDescription, setChildFormDescription] = useState('');
  const [childFormLane, setChildFormLane] = useState<KnowledgeLane>('LINEAGE_WISDOM_LANE');
  const [childFormLineage, setChildFormLineage] = useState('');
  const [childFormSubComponents, setChildFormSubComponents] = useState('');
  const [childFormTags, setChildFormTags] = useState('');

  // Modal: Add Category
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [categoryFormName, setCategoryFormName] = useState('');
  const [categoryFormPremise, setCategoryFormPremise] = useState('');
  const [categoryFormLane, setCategoryFormLane] = useState<KnowledgeLane>('LINEAGE_WISDOM_LANE');
  const [categoryFormEpistemicRole, setCategoryFormEpistemicRole] = useState('');
  const [categoryFormDialecticalPair, setCategoryFormDialecticalPair] = useState('');

  // Save changes helper
  const handleUpdateCategories = (newCategories: ExperientialCategory[]) => {
    setCategories(newCategories);
    saveStoredExperientialCategories(newCategories);
  };

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategoryIds(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all categories and child structures to the original six foundational pillars? Custom entries will be removed.')) {
      handleUpdateCategories(INITIAL_EXPERIENTIAL_CATEGORIES);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(categories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gaia_open_experiential_ontology_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          handleUpdateCategories(parsed);
          alert(`Successfully imported ${parsed.length} categories!`);
        } else {
          alert('Invalid file format: Expected an array of categories.');
        }
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Submit new Child Structure
  const handleSubmitChildStructure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCategoryForChild || !childFormName.trim()) return;

    const subComponentsList = childFormSubComponents
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const tagsList = childFormTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newChild: ExperientialChildStructure = {
      id: `child-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: childFormName.trim(),
      description: childFormDescription.trim() || 'Custom child structure integrated under the Lineage & Wisdom Lane.',
      lane: childFormLane,
      lineageOrTradition: childFormLineage.trim() || undefined,
      subComponents: subComponentsList.length > 0 ? subComponentsList : undefined,
      tags: tagsList.length > 0 ? tagsList : ['Lineage', 'Wisdom', 'Ancient Heritage'],
      directive47Status: (childFormLane === 'LINEAGE_WISDOM_LANE' || (childFormLane as string) === 'EXPERIENTIAL_LANE')
        ? 'TIME_CAPSULE_VALIDATED' 
        : childFormLane === 'BINOCULAR_SYNTHESIS' 
        ? 'STEREOSCOPIC_RECONCILIATION' 
        : 'ANCHORED_BASELINE',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    const updated = categories.map(cat => {
      if (cat.id === targetCategoryForChild.id) {
        return {
          ...cat,
          childStructures: [...cat.childStructures, newChild]
        };
      }
      return cat;
    });

    handleUpdateCategories(updated);

    // Reset Form
    setChildFormName('');
    setChildFormDescription('');
    setChildFormLineage('');
    setChildFormSubComponents('');
    setChildFormTags('');
    setTargetCategoryForChild(null);
  };

  // Submit new Category
  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormName.trim() || !categoryFormPremise.trim()) return;

    const newCategory: ExperientialCategory = {
      id: `cat-custom-${Date.now()}`,
      name: categoryFormName.trim(),
      corePremise: categoryFormPremise.trim(),
      lane: categoryFormLane,
      epistemicRole: categoryFormEpistemicRole.trim() || 'Experiential & Ontological Inquiry',
      directive47Relation: 'Dynamically added ontological structure; protected under Directive 47 exemption.',
      dialecticalPair: categoryFormDialecticalPair.trim() || undefined,
      childStructures: [],
      isCustom: true
    };

    const updated = [...categories, newCategory];
    handleUpdateCategories(updated);
    setExpandedCategoryIds(prev => ({ ...prev, [newCategory.id]: true }));

    // Reset Form
    setCategoryFormName('');
    setCategoryFormPremise('');
    setCategoryFormEpistemicRole('');
    setCategoryFormDialecticalPair('');
    setIsAddCategoryOpen(false);
  };

  // Delete Child Structure
  const handleDeleteChildStructure = (categoryId: string, childId: string) => {
    if (!window.confirm('Delete this child structure?')) return;
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          childStructures: cat.childStructures.filter(c => c.id !== childId)
        };
      }
      return cat;
    });
    handleUpdateCategories(updated);
  };

  // Filtering
  const filteredCategories = useMemo(() => {
    return categories
      .filter(cat => {
        if (activeCategoryFilter !== 'ALL' && cat.id !== activeCategoryFilter && cat.name !== activeCategoryFilter) {
          return false;
        }
        return true;
      })
      .map(cat => {
        const matchingChildren = cat.childStructures.filter(child => {
          const matchesLane = laneFilter === 'ALL' || 
            child.lane === laneFilter || 
            (laneFilter === 'LINEAGE_WISDOM_LANE' && (child.lane as string) === 'EXPERIENTIAL_LANE');
          const query = searchQuery.toLowerCase().trim();
          if (!query) return matchesLane;

          const inName = child.name.toLowerCase().includes(query);
          const inDesc = child.description.toLowerCase().includes(query);
          const inLineage = child.lineageOrTradition ? child.lineageOrTradition.toLowerCase().includes(query) : false;
          const inTags = child.tags.some(t => t.toLowerCase().includes(query));
          const inSubs = child.subComponents ? child.subComponents.some(s => s.toLowerCase().includes(query)) : false;

          return matchesLane && (inName || inDesc || inLineage || inTags || inSubs);
        });

        const query = searchQuery.toLowerCase().trim();
        const catMatches = !query || (
          cat.name.toLowerCase().includes(query) ||
          cat.corePremise.toLowerCase().includes(query) ||
          cat.epistemicRole.toLowerCase().includes(query)
        );

        return {
          ...cat,
          matchingChildren,
          isMatch: catMatches || matchingChildren.length > 0
        };
      })
      .filter(cat => cat.isMatch);
  }, [categories, activeCategoryFilter, laneFilter, searchQuery]);

  // Pre-defined Dialectical pairs for dialectic view
  const dialecticalPairs = [
    {
      thesis: 'Materialism',
      antithesis: 'The Soul & Sacred Consciousness',
      thesisDesc: 'Only physical matter and mechanical conservation laws exist.',
      antithesisDesc: 'Consciousness, the soul, and living spirit are irreducible primordial realities with millennia of contemplative and architectural evidence.',
      synthesis: 'Embodied Spirit & Living Thermodynamics ("Neo Vision" Coexistence)'
    },
    {
      thesis: 'Secularism',
      antithesis: 'Ancient Customary Law & Sacred Covenants',
      thesisDesc: 'Public administration organized solely around contemporary civic mechanisms.',
      antithesisDesc: 'Enduring covenants, sacred texts, stone sanctuaries, and moral law that bound human societies together across epochs.',
      synthesis: 'Civic Commons with Sovereign Sacred Sanctuary & Moral Covenants'
    },
    {
      thesis: 'Naturalism',
      antithesis: 'The Supernatural, Miracles & Living Grace',
      thesisDesc: 'Continuous physical causality and mathematical regularities across cosmic scales.',
      antithesisDesc: 'Spontaneous remissions, acausal synchronicities, and trans-rational anomalies recorded across human history.',
      synthesis: 'Stereoscopic Natural Law & Trans-Rational Mystery (Directives 46–48)'
    }
  ];

  return (
    <section id="experiential-ontology" className={`py-12 sm:py-16 bg-[#040609] border-t border-b border-white/10 font-mono text-slate-300 relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Phase XXII: Directives 46, 47 & 48 &bull; Binocular Vision Protocol
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Directive 47 Time-Capsule Validated
                </span>
                <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Directive 48 "Neo Vision" Synthesis
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-amber-400 shrink-0" />
                <span>The Binocular Vision Protocol: Empirical & Ancestral Synthesis</span>
              </h2>
              
              <p className="text-sm text-slate-300 font-sans max-w-4xl mt-2 leading-relaxed">
                Formally establishing the <strong className="text-amber-300 font-semibold">Lineage & Wisdom Lane</strong> alongside the <strong className="text-emerald-400 font-semibold">Empirical Lane</strong> (Directive 46). These traditions represent massive civilizational weight—undeniable physical evidence (monuments, stone temples, scriptures, artifacts) and millennia of successful social cohesion. Under <strong className="text-amber-300">Directive 47 (The Time-Capsule Paradox)</strong>, the survival of ancient teachings constitutes their own proof of relevance without awaiting modern mechanical validation. Under <strong className="text-violet-300">Directive 48 (The 'Neo Vision' Synthesis)</strong>, physics and deep ancestral lineage coexist stereoscopically without collapsing into each other.
              </p>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsAddCategoryOpen(true)}
                className="px-3 py-1.5 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)] cursor-pointer"
                id="btn-add-ontology-category"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                title="Export current ontology to JSON"
                className="px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 text-xs transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <label 
                title="Import ontology from JSON"
                className="px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>

              <button
                type="button"
                onClick={handleResetDefaults}
                title="Reset to 6 Core Pillars"
                className="p-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Directive 47 & 48 Interactive Time-Capsule Paradox Banner */}
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/[0.08] via-purple-900/[0.08] to-emerald-500/[0.06] border border-amber-500/30 rounded-lg space-y-2">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="text-amber-300 font-mono text-xs uppercase tracking-wider">
                    Directive 47: The Time-Capsule Paradox (Eradication of Dismissal)
                  </strong>
                  <span className="text-[10px] text-violet-300 font-mono px-2 py-0.5 bg-violet-500/20 border border-violet-500/40 rounded">
                    Directive 48 Non-Collapsing Realities
                  </span>
                </div>
                <p className="text-xs font-sans text-slate-300 leading-relaxed">
                  <strong className="text-white font-medium">The Apollo 11 Paradox:</strong> If a cataclysm erased our current civilization, future humans finding an Apollo 11 flight manual might dismiss it as mystical myth simply because they lack the specific rocketry and computational tools to verify it. Dismissing ancient wisdom because it doesn't fit into contemporary mechanical parameters is the same systemic blind spot. The survival of sacred scriptures, megalithic architecture, and millennia of moral cohesion <em className="text-amber-200">is</em> their proof of relevance.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>Empirical Lane: Measurable physical baseline & thermodynamics</span>
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Feather className="w-3.5 h-3.5" />
                <span>Lineage & Wisdom Lane: Sacred texts, monuments, covenants & soul presence</span>
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="flex items-center gap-1.5 text-violet-300">
                <Eye className="w-3.5 h-3.5" />
                <span>"Neo Vision" Protocol: Simultaneous, non-cancelling stereoscopic vision</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter, Search & View Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search categories, child structures, traditions, tags (e.g. 'Soul', 'Miracles', 'Prana')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-md pl-9 pr-8 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
              id="input-experiential-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                &times;
              </button>
            )}
          </div>

          {/* View Mode & Lane Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode */}
            <div className="flex items-center bg-black/40 p-0.5 rounded border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('CARDS')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewMode === 'CARDS' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('DIALECTIC')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'DIALECTIC' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Split className="w-3 h-3 text-amber-400" />
                <span>Dialectics</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('TREE')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'TREE' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Workflow className="w-3 h-3 text-violet-400" />
                <span>Tree</span>
              </button>
            </div>

            {/* Lane Filter */}
            <div className="flex items-center bg-black/40 p-0.5 rounded border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setLaneFilter('ALL')}
                className={`px-2 py-1 rounded transition-colors ${
                  laneFilter === 'ALL' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Lanes
              </button>
              <button
                type="button"
                onClick={() => setLaneFilter('LINEAGE_WISDOM_LANE')}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  laneFilter === 'LINEAGE_WISDOM_LANE' || (laneFilter as string) === 'EXPERIENTIAL_LANE' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Lineage & Wisdom</span>
              </button>
              <button
                type="button"
                onClick={() => setLaneFilter('EMPIRICAL_LANE')}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  laneFilter === 'EMPIRICAL_LANE' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                <Cpu className="w-3 h-3 text-[#00ff95]" />
                <span>Empirical</span>
              </button>
              <button
                type="button"
                onClick={() => setLaneFilter('BINOCULAR_SYNTHESIS')}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  laneFilter === 'BINOCULAR_SYNTHESIS' ? 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30' : 'text-slate-400 hover:text-violet-300'
                }`}
              >
                <Eye className="w-3 h-3 text-violet-400" />
                <span>Neo Vision</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills (Direct Quick Nav) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-mono shrink-0 transition-all border ${
              activeCategoryFilter === 'ALL'
                ? 'bg-white text-black border-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/30'
            }`}
          >
            All Categories ({categories.length})
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategoryFilter === cat.id || activeCategoryFilter === cat.name;
            const isLineage = cat.lane === 'LINEAGE_WISDOM_LANE' || (cat.lane as string) === 'EXPERIENTIAL_LANE';
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono shrink-0 transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? isLineage
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-[0_0_10px_rgba(0,255,149,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/30 hover:text-slate-200'
                }`}
              >
                {isLineage ? (
                  <BookOpen className="w-2.5 h-2.5 text-amber-400" />
                ) : (
                  <Cpu className="w-2.5 h-2.5 text-[#00ff95]" />
                )}
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60">({cat.childStructures.length})</span>
              </button>
            );
          })}
        </div>

        {/* DIALECTICS VIEW (When selected) */}
        {viewMode === 'DIALECTIC' && (
          <div className="mb-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Split className="w-4 h-4 text-amber-400" />
              <span>Stereoscopic Dialectical Reconciliation (Phase XXII &bull; Directives 46–48)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dialecticalPairs.map((pair, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-black/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3 text-xs">
                      <span className="text-[#00ff95] font-bold">{pair.thesis}</span>
                      <span className="text-slate-500">&harr;</span>
                      <span className="text-amber-300 font-bold">{pair.antithesis}</span>
                    </div>
                    <div className="space-y-2 text-xs font-sans text-slate-400">
                      <div>
                        <strong className="text-slate-300 font-mono text-[10px] uppercase block">Empirical Thesis:</strong>
                        <p>{pair.thesisDesc}</p>
                      </div>
                      <div>
                        <strong className="text-amber-300/80 font-mono text-[10px] uppercase block">Lineage & Wisdom Reality:</strong>
                        <p>{pair.antithesisDesc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-violet-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>{pair.synthesis}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN CATEGORY & CHILD STRUCTURES DISPLAY */}
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-slate-500 border border-dashed border-white/10 rounded-lg">
            No categories or child structures match your search and filter criteria.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategoryIds[category.id] !== false;
              const isLineage = category.lane === 'LINEAGE_WISDOM_LANE' || (category.lane as string) === 'EXPERIENTIAL_LANE';
              const children = searchQuery.trim() || laneFilter !== 'ALL' 
                ? category.matchingChildren 
                : category.childStructures;

              return (
                <div
                  key={category.id}
                  className={`rounded-lg border transition-all overflow-hidden ${
                    isLineage 
                      ? 'bg-gradient-to-b from-[#090b10] to-[#040608] border-amber-500/20 hover:border-amber-500/40' 
                      : 'bg-gradient-to-b from-[#060a08] to-[#040608] border-[#00ff95]/20 hover:border-[#00ff95]/40'
                  }`}
                  id={`category-card-${category.id}`}
                >
                  {/* Category Card Header */}
                  <div
                    onClick={() => handleToggleExpand(category.id)}
                    className="p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-black/40 hover:bg-black/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        className="mt-1 text-slate-400 hover:text-white"
                        aria-label="Toggle expansion"
                      >
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-amber-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                      </button>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`text-base sm:text-lg font-bold tracking-wide ${
                            isLineage ? 'text-amber-300' : 'text-[#00ff95]'
                          }`}>
                            {category.name}
                          </h3>

                          <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-mono border ${
                            isLineage 
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {isLineage ? 'Lineage & Wisdom Lane' : 'Empirical Lane'}
                          </span>

                          {category.dialecticalPair && (
                            <span className="text-[10px] text-slate-400 font-sans italic flex items-center gap-1">
                              &bull; Paired with <strong className="text-slate-200 font-mono not-italic">{category.dialecticalPair}</strong>
                            </span>
                          )}

                          {category.isCustom && (
                            <span className="text-[8px] bg-sky-500/10 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded uppercase">
                              Custom Category
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-3xl">
                          {category.corePremise}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-400 font-mono">
                          <span>
                            <strong className="text-slate-300">Epistemic Role:</strong> {category.epistemicRole}
                          </span>
                          {category.associatedModules && category.associatedModules.length > 0 && (
                            <span>
                              <strong className="text-slate-300">Linked Modules:</strong> {category.associatedModules.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Header Action Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0" onClick={e => e.stopPropagation()}>
                      <span className="text-[11px] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded border border-white/10 font-mono">
                        {children.length} {children.length === 1 ? 'child structure' : 'child structures'}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setTargetCategoryForChild(category);
                          setChildFormLane(category.lane);
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          isLineage
                            ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,149,0.15)]'
                        }`}
                        id={`btn-add-child-${category.id}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Child Structure</span>
                      </button>
                    </div>
                  </div>

                  {/* Child Structures Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 bg-black/40 border-t border-white/5 space-y-4">
                      {children.length === 0 ? (
                        <div className="text-xs text-slate-500 py-4 text-center italic border border-dashed border-white/5 rounded">
                          No child structures found in this category. Click "+ Add Child Structure" to extend it dynamically.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {children.map((child) => {
                            const isChildLineage = child.lane === 'LINEAGE_WISDOM_LANE' || (child.lane as string) === 'EXPERIENTIAL_LANE';
                            const isChildBinocular = child.lane === 'BINOCULAR_SYNTHESIS';
                            const isSelected = selectedChildId === child.id;

                            return (
                              <div
                                key={child.id}
                                className={`p-4 rounded-lg border transition-all flex flex-col justify-between ${
                                  isSelected
                                    ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.25)]'
                                    : isChildLineage
                                    ? 'bg-[#0a0d14] border-white/10 hover:border-amber-400/40'
                                    : isChildBinocular
                                    ? 'bg-[#0d0a14] border-white/10 hover:border-violet-400/40'
                                    : 'bg-[#080d0a] border-white/10 hover:border-[#00ff95]/40'
                                }`}
                                id={`child-card-${child.id}`}
                              >
                                <div>
                                  {/* Title, lane & tradition */}
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className={`text-sm font-bold ${
                                          isChildLineage 
                                            ? 'text-amber-300' 
                                            : isChildBinocular 
                                            ? 'text-violet-300' 
                                            : 'text-[#00ff95]'
                                        }`}>
                                          {child.name}
                                        </h4>

                                        <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono border ${
                                          isChildLineage
                                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                            : isChildBinocular
                                            ? 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                        }`}>
                                          {isChildLineage ? 'Lineage & Wisdom' : isChildBinocular ? 'Neo Vision' : 'Empirical'}
                                        </span>

                                        {child.isCustom && (
                                          <span className="text-[8px] bg-sky-500/10 text-sky-300 border border-sky-500/30 px-1 py-0.2 rounded uppercase">
                                            Custom
                                          </span>
                                        )}
                                      </div>

                                      {child.lineageOrTradition && (
                                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 italic font-sans mb-1.5">
                                          <Feather className="w-3 h-3 text-amber-400 shrink-0" />
                                          <span>Lineage: <strong className="text-slate-300 font-normal">{child.lineageOrTradition}</strong></span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Action Buttons: Adopt or Delete */}
                                    <div className="flex items-center gap-1 shrink-0">
                                      {onAdoptChildStructure && (
                                        <button
                                          type="button"
                                          onClick={() => onAdoptChildStructure(child, category)}
                                          className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                                            isSelected
                                              ? 'bg-[#00ff95] text-black border-[#00ff95] font-bold'
                                              : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/10'
                                          }`}
                                          title="Adopt this structure into peer specialist onboarding form"
                                        >
                                          {isSelected ? (
                                            <>
                                              <CheckCircle2 className="w-3 h-3" />
                                              <span>Adopted</span>
                                            </>
                                          ) : (
                                            <>
                                              <Compass className="w-3 h-3 text-amber-400" />
                                              <span>Adopt</span>
                                            </>
                                          )}
                                        </button>
                                      )}

                                      {child.isCustom && (
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteChildStructure(category.id, child.id)}
                                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                          title="Delete custom structure"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                                    {child.description}
                                  </p>

                                  {/* Sub-Components */}
                                  {child.subComponents && child.subComponents.length > 0 && (
                                    <div className="mb-3 pl-2.5 border-l-2 border-white/10 space-y-1">
                                      <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider block">
                                        Vectors & Sub-Components:
                                      </span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {child.subComponents.map((sub, sIdx) => (
                                          <span
                                            key={sIdx}
                                            className="text-[10px] bg-white/[0.03] text-slate-300 border border-white/10 px-2 py-0.5 rounded font-mono"
                                          >
                                            &bull; {sub}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Footer info: Directive 47 & Tags */}
                                <div className="pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] mt-2">
                                  <span className={`flex items-center gap-1 font-mono ${
                                    isChildLineage ? 'text-amber-300/80' : isChildBinocular ? 'text-violet-300/80' : 'text-emerald-300/80'
                                  }`}>
                                    <ShieldCheck className="w-3 h-3 shrink-0" />
                                    <span>
                                      {child.directive47Status === 'TIME_CAPSULE_VALIDATED' || child.directive47Status === 'EXEMPT_NATIVE_FLOW'
                                        ? 'Directive 47 Time-Capsule Validated' 
                                        : child.directive47Status === 'STEREOSCOPIC_RECONCILIATION'
                                        ? 'Stereoscopic Reconciliation'
                                        : 'Anchored Physical Baseline'}
                                    </span>
                                  </span>

                                  {child.tags && child.tags.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Tag className="w-2.5 h-2.5 text-slate-500" />
                                      {child.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="bg-black/50 text-slate-400 px-1.5 py-0.5 rounded text-[9px] border border-white/5">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL: ADD CHILD STRUCTURE DYNAMICALLY */}
        {targetCategoryForChild && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b0f17] border border-amber-500/40 rounded-lg max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl font-mono text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Add Child Structure to '{targetCategoryForChild.name}'</span>
                  </h3>
                  <p className="text-[10px] text-amber-300 mt-0.5">
                    Extend this ontological category with new living branches, traditions, or sub-vectors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTargetCategoryForChild(null)}
                  className="text-slate-500 hover:text-white text-base font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitChildStructure} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase text-white mb-1 font-semibold">
                    Child Structure Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heart Torus Subtle Coherence, Indigenous Fire Custodianship, etc."
                    value={childFormName}
                    onChange={(e) => setChildFormName(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-amber-400 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                    id="input-child-title"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Knowledge Lane
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setChildFormLane('LINEAGE_WISDOM_LANE')}
                      className={`py-1.5 px-2 rounded border text-center text-xs transition-colors ${
                        childFormLane === 'LINEAGE_WISDOM_LANE' || (childFormLane as string) === 'EXPERIENTIAL_LANE'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Lineage & Wisdom
                    </button>
                    <button
                      type="button"
                      onClick={() => setChildFormLane('BINOCULAR_SYNTHESIS')}
                      className={`py-1.5 px-2 rounded border text-center text-xs transition-colors ${
                        childFormLane === 'BINOCULAR_SYNTHESIS'
                          ? 'bg-violet-500/20 border-violet-400 text-violet-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Neo Vision (Binocular)
                    </button>
                    <button
                      type="button"
                      onClick={() => setChildFormLane('EMPIRICAL_LANE')}
                      className={`py-1.5 px-2 rounded border text-center text-xs transition-colors ${
                        childFormLane === 'EMPIRICAL_LANE'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Empirical Lane
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Ancestral Lineage, Tradition or Scientific Discipline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayurveda, Celtic Oral Tradition, Hesychasm, Depth Psychology..."
                    value={childFormLineage}
                    onChange={(e) => setChildFormLineage(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Phenomenological Description & Core Premise
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the felt experience, somatic expression, sacred covenant, or operational methodology..."
                    value={childFormDescription}
                    onChange={(e) => setChildFormDescription(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Sub-Components & Vectors (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Diaphragmatic Loop, Vagal Coherence, Heart-Mind Resonance"
                    value={childFormSubComponents}
                    onChange={(e) => setChildFormSubComponents(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Taxonomy Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Subtle Body, Heart, Vagus, Biofield"
                    value={childFormTags}
                    onChange={(e) => setChildFormTags(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setTargetCategoryForChild(null)}
                    className="px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold"
                    id="btn-submit-child-structure"
                  >
                    Save Child Structure
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW CATEGORY DYNAMICALLY */}
        {isAddCategoryOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b0f17] border border-amber-500/40 rounded-lg max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl font-mono text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add New Ontological Category</span>
                  </h3>
                  <p className="text-[10px] text-amber-300 mt-0.5">
                    Define a new epistemic pillar to structure experiential or empirical inquiries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="text-slate-500 hover:text-white text-base font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitCategory} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase text-white mb-1 font-semibold">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Panpsychism, Determinism, Animist Kinship, etc."
                    value={categoryFormName}
                    onChange={(e) => setCategoryFormName(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-amber-400 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                    id="input-category-name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Knowledge Lane
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCategoryFormLane('LINEAGE_WISDOM_LANE')}
                      className={`py-1.5 px-2 rounded border text-center text-xs transition-colors ${
                        categoryFormLane === 'LINEAGE_WISDOM_LANE' || (categoryFormLane as string) === 'EXPERIENTIAL_LANE'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Lineage & Wisdom Lane
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryFormLane('EMPIRICAL_LANE')}
                      className={`py-1.5 px-2 rounded border text-center text-xs transition-colors ${
                        categoryFormLane === 'EMPIRICAL_LANE'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Empirical Lane
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-white mb-1 font-semibold">
                    Core Premise *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="State the core ontological or metaphysical premise of this category..."
                    value={categoryFormPremise}
                    onChange={(e) => setCategoryFormPremise(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-amber-400 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Epistemic Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Somatic Attunement & Non-Dual Insight, Physical Boundary..."
                    value={categoryFormEpistemicRole}
                    onChange={(e) => setCategoryFormEpistemicRole(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-slate-400 mb-1">
                    Dialectical Counterpart (Optional Pair)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Materialism, Reductionism, Physicalism..."
                    value={categoryFormDialecticalPair}
                    onChange={(e) => setCategoryFormDialecticalPair(e.target.value)}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-white/30 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddCategoryOpen(false)}
                    className="px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold"
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
