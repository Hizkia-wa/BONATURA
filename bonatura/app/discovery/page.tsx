"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Search,
  BookOpen,
  Sparkles,
  Info,
  ChevronRight,
  ChevronDown,
  X,
  Filter,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Music,
  Home,
  Scissors,
  Utensils,
  ShieldCheck,
  Network,
  Eye,
  Map as MapIcon,
  Users,
  Route,
  Clock,
  Heart,
  Flame,
  Award,
} from "lucide-react";
import {
  CULTURAL_ELEMENTS,
  TOBA_CATEGORIES,
  GET_TO_KNOW_TOBA,
  DALIHAN_NA_TOLU_VALUES,
  TOBA_STORIES,
  TOBA_MAP_LOCATIONS,
  TOBA_CULINARY,
  TOBA_HERITAGE_KEEPERS,
  CULTURAL_KNOWLEDGE_GRAPH,
  CulturalElement,
  GetToKnowCard,
  TobaStory,
  TobaMapLocation,
  TobaCulinaryItem,
  TobaHeritageKeeper,
} from "@/lib/data";
import {
  getCulturalCategories,
  getCulturalElements,
  getCulturalElementDetail,
  UnifiedCulturalElement,
} from "@/lib/api";
import BackendStatusBadge from "@/components/BackendStatusBadge";
import { ExternalLink } from "lucide-react";

export default function DiscoveryPage() {
  // --- SEARCH & HERO STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // --- CATALOGUE STATES (SECTION 2) ---
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedSubRegion, setSelectedSubRegion] = useState("Semua");
  const [sortBy, setSortBy] = useState<"recommended" | "az" | "za">("recommended");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["ulos-batak-toba"]);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // --- INTERACTIVE SECTION STATES ---
  const [activeDalihanIndex, setActiveDalihanIndex] = useState(0);
  const [activeMapLocId, setActiveMapLocId] = useState("huta-raja");
  const [activeGraphNodeId, setActiveGraphNodeId] = useState("ulos-batak-toba");

  // --- MODAL STATES ---
  const [modalCulture, setModalCulture] = useState<any | null>(null);
  const [backendCategories, setBackendCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [liveElements, setLiveElements] = useState<UnifiedCulturalElement[]>([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const loadBackendDiscovery = async () => {
    try {
      const [catRes, elemRes] = await Promise.all([
        getCulturalCategories(),
        getCulturalElements({
          category: selectedCategory === "Semua" ? undefined : selectedCategory,
          search: searchQuery || undefined,
        }),
      ]);
      if (catRes.categories && catRes.categories.length > 0) {
        setBackendCategories(catRes.categories);
      }
      if (elemRes.elements && elemRes.elements.length > 0) {
        setLiveElements(elemRes.elements);
        setIsBackendConnected(elemRes.isFromBackend);
      }
    } catch (err) {
      console.warn("Backend discovery fetch:", err);
    }
  };

  useEffect(() => {
    loadBackendDiscovery();
  }, [selectedCategory, searchQuery]);

  const handleOpenCultureDetail = async (
    item: any
  ) => {
    const fullMatch = CULTURAL_ELEMENTS.find(
      (e) => e.id === item.id || e.slug === item.slug
    );
    if (fullMatch) {
      setModalCulture(fullMatch);
    } else {
      setModalCulture(item);
    }

    try {
      const slugOrId = item.slug || item.id;
      if (slugOrId) {
        const res = await getCulturalElementDetail(slugOrId);
        if (res.element) {
          setModalCulture(res.element);
        }
      }
    } catch (e) {
      console.warn("Error fetching element detail from backend:", e);
    }
  };
  const [modalGetToKnow, setModalGetToKnow] = useState<GetToKnowCard | null>(null);
  const [modalStory, setModalStory] = useState<TobaStory | null>(null);
  const [modalCulinary, setModalCulinary] = useState<TobaCulinaryItem | null>(null);
  const [modalKeeper, setModalKeeper] = useState<TobaHeritageKeeper | null>(null);

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick Chips
  const heroChips = [
    { label: "Batak Heritage", query: "Batak" },
    { label: "Lake Toba", query: "Danau Toba" },
    { label: "Local Stories", query: "Legenda" },
    { label: "Kain Ulos", query: "Ulos" },
    { label: "Rumah Bolon", query: "Rumah Bolon" },
    { label: "Tortor", query: "Tortor" },
  ];

  // Search Results for Autocomplete
  const searchResultsSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return CULTURAL_ELEMENTS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.subRegion.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  // Catalog filtering for Section 2
  const filteredElements = useMemo(() => {
    return CULTURAL_ELEMENTS.filter((item) => {
      const matchCat =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchSub =
        selectedSubRegion === "Semua" || item.subRegion === selectedSubRegion;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.subRegion.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const matchSaved = !showOnlyBookmarked || bookmarkedIds.includes(item.id);
      return matchCat && matchSub && matchSearch && matchSaved;
    }).sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "za") return b.name.localeCompare(a.name);
      return 0;
    });
  }, [selectedCategory, selectedSubRegion, searchQuery, showOnlyBookmarked, bookmarkedIds, sortBy]);

  // Active Map Location object
  const activeMapLocation = useMemo(() => {
    return (
      TOBA_MAP_LOCATIONS.find((loc) => loc.id === activeMapLocId) ||
      TOBA_MAP_LOCATIONS[0]
    );
  }, [activeMapLocId]);

  // Active Knowledge Graph Node
  const activeGraphNode = useMemo(() => {
    return (
      CULTURAL_KNOWLEDGE_GRAPH.nodes.find((n) => n.id === activeGraphNodeId) ||
      CULTURAL_KNOWLEDGE_GRAPH.nodes[0]
    );
  }, [activeGraphNodeId]);

  // Active Knowledge Graph Edges
  const activeGraphEdges = useMemo(() => {
    return CULTURAL_KNOWLEDGE_GRAPH.edges.filter(
      (e) => e.source === activeGraphNodeId || e.target === activeGraphNodeId
    );
  }, [activeGraphNodeId]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800">
      {/* ============================================================== */}
      {/* HERO: DISCOVER THE HEART OF TOBA                               */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 text-white">
        {/* Background photo of Lake Toba caldera & overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Identity */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <Compass className="w-4 h-4 text-amber-400" />
            BONATURA · DISCOVERY
          </div>

          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400/90 mb-2">
            More Than a Lake. A Land Full of Stories.
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
            Discover the Heart of Toba.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            From the beauty of Lake Toba to the traditions of Batak communities, discover the stories, people, and heritage that make this land unique.
          </p>

          {/* Interactive Search Bar & Suggestions */}
          <div className="mt-10 max-w-2xl mx-auto relative z-30">
            <div className="relative flex items-center bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-2xl shadow-black/60 border border-white/20">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Toba culture, traditions, places..."
                className="w-full px-4 py-3 text-sm text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 mr-2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => scrollToSection("explore-heritage")}
                className="px-5 py-3 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20 whitespace-nowrap flex items-center gap-1.5 shrink-0"
              >
                Cari Budaya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Suggestions Dropdown */}
            {searchFocused && (
              <div
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 text-left p-4 text-stone-800 z-50 animate-fadeIn"
              >
                {searchResultsSuggestions.length > 0 ? (
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                      Hasil Pencarian Cepat Toba:
                    </span>
                    <div className="space-y-1">
                      {searchResultsSuggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setModalCulture(item);
                            setSearchFocused(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <span className="text-xs font-bold text-stone-900 group-hover:text-amber-800 block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {item.category} • {item.subRegion}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="pt-2 border-t border-stone-100 mt-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    Topik Populer Kawasan Toba:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {heroChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => {
                          setSearchQuery(chip.query);
                          setSearchFocused(false);
                          scrollToSection("explore-heritage");
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 rounded-lg text-xs font-medium transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Chips below input */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-300">
              <span className="text-stone-400 text-[11px]">Popular:</span>
              {heroChips.map((c) => (
                <button
                  key={c.label}
                  onClick={() => {
                    setSearchQuery(c.query);
                    scrollToSection("explore-heritage");
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 text-xs transition-colors"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll prompt */}
          <div className="mt-12">
            <button
              onClick={() => scrollToSection("get-to-know-toba")}
              className="text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 animate-bounce"
            >
              Scroll to begin your journey ↓
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 1 — GET TO KNOW TOBA                                   */}
      {/* ============================================================== */}
      <section id="get-to-know-toba" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            UNESCO Global Geopark 2020
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            A Land Shaped by Nature and Heritage.
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Danau Toba bukan hanya danau yang indah. Kawasan ini terbentuk melalui aktivitas vulkanik dahsyat sekitar 74.000 tahun lalu dan kini menjadi rumah bagi berbagai komunitas dengan kekayaan budaya yang beragam. Di tengah danau terdapat Pulau Samosir, tempat pengunjung dapat menemukan perkampungan tradisional, peninggalan sejarah, dan kehidupan masyarakat Batak Toba.
          </p>
        </div>

        {/* 4 Information Cards (Geological, Samosir, Batak, Living Traditions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GET_TO_KNOW_TOBA.map((item) => (
            <div
              key={item.id}
              onClick={() => setModalGetToKnow(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold rounded-lg border border-amber-400/30">
                    {item.badge}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    {item.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Baca Narasi Lengkap</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2 — EXPLORE BATAK TOBA HERITAGE                        */}
      {/* ============================================================== */}
      <section id="explore-heritage" className="py-20 bg-amber-50/40 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Core Cultural Discovery
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                The Heritage That Lives in Toba.
              </h2>
              <BackendStatusBadge onRefresh={loadBackendDiscovery} />
            </div>
            
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore the traditions, art, architecture, and values that have shaped Batak Toba identity across generations.
            </p>
          </div>

          {/* Category Filter Pills (Toba Specialized) */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm mb-8 space-y-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-stone-400 mr-2 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Kategori Toba:
              </span>
              <button
                onClick={() => setSelectedCategory("Semua")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === "Semua"
                    ? "bg-amber-800 text-white font-bold shadow-xs"
                    : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                Semua Warisan
              </button>
              {TOBA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.name
                      ? "bg-amber-800 text-white font-bold shadow-xs"
                      : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sub-region and bookmark filters */}
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-semibold">Wilayah Toba:</span>
                <select
                  value={selectedSubRegion}
                  onChange={(e) => setSelectedSubRegion(e.target.value)}
                  className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none"
                >
                  <option value="Semua">Semua Wilayah</option>
                  <option value="Samosir">Pulau Samosir</option>
                  <option value="Toba">Kabupaten Toba (Balige)</option>
                  <option value="Humbang Hasundutan">Humbang Hasundutan (Bakkara)</option>
                  <option value="Tapanuli Utara">Tapanuli Utara (Tarutung)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-semibold transition-colors ${
                    showOnlyBookmarked
                      ? "bg-amber-100 border-amber-500 text-amber-950 font-bold"
                      : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Disimpan ({bookmarkedIds.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Elements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElements.slice(0, visibleCount).map((item) => {
              const isSaved = bookmarkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-amber-500 text-stone-950 font-bold"
                            : "bg-black/50 text-white hover:bg-black/70"
                        }`}
                        title={isSaved ? "Tersimpan" : "Simpan Budaya"}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-900/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-300" />
                        {item.subRegion}, Danau Toba
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setModalCulture(item)}
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 group/btn"
                    >
                      Pelajari Filosofi & Kisah
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      WBTb Terverifikasi
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {filteredElements.length > visibleCount && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-2xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Muat Warisan Lainnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3 — UNDERSTAND THE VALUES OF TOBA (DALIHAN NA TOLU)    */}
      {/* ============================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Falsafah Hidup Masyarakat Batak
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            More Than Traditions, A Way of Life.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dalihan Na Tolu merupakan sistem kekerabatan dalam masyarakat Batak yang menjadi pedoman hubungan sosial dan pelaksanaan adat. Konsep ini dikenal melalui tiga unsur hubungan: Somba Marhula-hula, Manat Mardongan Tubu, dan Elek Marboru.
          </p>
        </div>

        {/* 3 Interactive Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {DALIHAN_NA_TOLU_VALUES.map((val, idx) => {
            const isActive = activeDalihanIndex === idx;
            return (
              <div
                key={val.number}
                onClick={() => setActiveDalihanIndex(idx)}
                className={`p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-amber-900 text-white border-amber-800 shadow-xl scale-[1.02]"
                    : "bg-white text-stone-800 border-stone-200 hover:border-amber-300 hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl font-black font-mono ${
                        isActive ? "text-amber-300" : "text-amber-800"
                      }`}
                    >
                      {val.number}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {val.name}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight mb-2 ${
                      isActive ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {val.aphorism}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-medium mb-3 ${
                      isActive ? "text-amber-200" : "text-amber-900"
                    }`}
                  >
                    {val.meaning}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? "text-stone-200" : "text-stone-600"
                    }`}
                  >
                    {val.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t text-xs font-bold flex items-center justify-between ${
                    isActive ? "border-white/20 text-amber-300" : "border-stone-100 text-amber-800"
                  }`}
                >
                  <span>Lihat Contoh Penerapan</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Application Box for selected Dalihan Na Tolu */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Penerapan Adat Harian: {DALIHAN_NA_TOLU_VALUES[activeDalihanIndex].aphorism}
              </span>
              <h4 className="text-lg font-bold text-stone-900">
                Bagaimana Nilai Ini Diterapkan dalam Upacara & Kehidupan?
              </h4>
            </div>
            <span className="text-xs text-stone-400">
              Rujukan Resmi: Direktorat Kebudayaan Kemendikdasmen
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            {DALIHAN_NA_TOLU_VALUES[activeDalihanIndex].practiceExample}
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4 — DISCOVER THE STORIES OF TOBA                       */}
      {/* ============================================================== */}
      <section className="py-20 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Warisan Narasi & Sejarah
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
              Every Place Holds a Story.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Jelajahi kisah sejarah, mitos sakral, dan peninggalan masa lampau yang tersimpan di situs-situs bersejarah sekeliling Danau Toba.
            </p>
          </div>

          {/* 4 Stories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOBA_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setModalStory(story)}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold rounded-lg border border-amber-400/30">
                      {story.location}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-[11px] rounded-xl flex items-center justify-between">
                      <span>{story.historicalContext}</span>
                      <span className="text-amber-300">Klik untuk baca narasi</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                      {story.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Buka Riwayat Sejarah Lengkap
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5 — EXPLORE TOBA ON THE MAP                            */}
      {/* ============================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Koneksi Ruang & Budaya
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Explore the Heritage Across Toba.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover the villages, historical sites, and cultural landmarks that preserve the stories of Toba.
          </p>
        </div>

        {/* Map Simulator + Location Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Visual (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-amber-700" />
                Peta Destinasi Cagar Budaya Danau Toba
              </span>
              <span className="font-mono text-stone-400">Pilih titik lokasi</span>
            </div>

            {/* Simulated Interactive Lake Toba Canvas */}
            <div className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg">
                  {/* Pin 1: Tomok */}
                  <button
                    onClick={() => setActiveMapLocId("tomok")}
                    className={`absolute top-1/2 right-12 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                      activeMapLocId === "tomok"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tomok</span>
                  </button>

                  {/* Pin 2: Huta Siallagan */}
                  <button
                    onClick={() => setActiveMapLocId("huta-siallagan")}
                    className={`absolute top-1/3 right-20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                      activeMapLocId === "huta-siallagan"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Huta Siallagan</span>
                  </button>

                  {/* Pin 3: Kampung Ulos Huta Raja */}
                  <button
                    onClick={() => setActiveMapLocId("huta-raja")}
                    className={`absolute top-1/2 left-12 -translate-y-1/2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xl flex items-center gap-1.5 ${
                      activeMapLocId === "huta-raja"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Huta Raja (Tenun)</span>
                  </button>

                  {/* Pin 4: Simanindo */}
                  <button
                    onClick={() => setActiveMapLocId("simanindo")}
                    className={`absolute top-6 left-1/3 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                      activeMapLocId === "simanindo"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Museum Simanindo</span>
                  </button>

                  {/* Pin 5: Lembah Bakkara */}
                  <button
                    onClick={() => setActiveMapLocId("bakkara")}
                    className={`absolute bottom-6 left-8 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                      activeMapLocId === "bakkara"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lembah Bakkara</span>
                  </button>

                  {/* Pin 6: Balige */}
                  <button
                    onClick={() => setActiveMapLocId("balige")}
                    className={`absolute bottom-6 right-8 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                      activeMapLocId === "balige"
                        ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-110 z-20"
                        : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Balige</span>
                  </button>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-800">
                <span>Danau Toba Caldera Landscape</span>
                <span>Klik pin atau tombol di bawah untuk melihat</span>
              </div>
            </div>

            {/* Quick Location Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {TOBA_MAP_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveMapLocId(loc.id)}
                  className={`p-2.5 text-left rounded-xl text-xs border transition-all ${
                    activeMapLocId === loc.id
                      ? "bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs"
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <span className="block truncate font-bold">{loc.name}</span>
                  <span className="text-[10px] text-stone-500 block truncate font-normal">
                    {loc.area}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold inline-block mb-2">
                {activeMapLocation.area}
              </span>
              <h3 className="text-2xl font-bold text-stone-900">
                {activeMapLocation.name}
              </h3>
              <span className="text-xs font-mono text-stone-400 block mt-1">
                Koordinat: {activeMapLocation.coordinates}
              </span>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeMapLocation.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Warisan Budaya di Lokasi Ini:
              </h4>
              <div className="space-y-2">
                {activeMapLocation.culturalHighlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/map"
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Buka di Peta Wisata Interaktif (Cultural Map)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6 — TASTE OF TOBA                                      */}
      {/* ============================================================== */}
      <section className="py-20 bg-amber-50/30 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Gastronomi Warisan Leluhur
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
              A Taste of Toba&apos;s Heritage.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Discover the culinary traditions of Toba through local ingredients, traditional recipes, and the stories behind its flavors.
            </p>
          </div>

          {/* 4 Culinary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOBA_CULINARY.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setModalCulinary(dish)}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold rounded-lg">
                      Kuliner Tradisi
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                      {dish.indonesianName}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dish.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Lihat Bahan & Filosofi</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7 — MEET THE PEOPLE BEHIND THE HERITAGE               */}
      {/* ============================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Penjaga Warisan yang Hidup
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            The People Who Keep Toba Alive.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Behind every tradition are people who continue to preserve, practice, and pass down the heritage of Toba.
          </p>
        </div>

        {/* 4 People/Keepers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOBA_HERITAGE_KEEPERS.map((keeper) => (
            <div
              key={keeper.id}
              onClick={() => setModalKeeper(keeper)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={keeper.imageUrl}
                    alt={keeper.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold rounded-lg">
                    {keeper.role}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {keeper.location}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    {keeper.community}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {keeper.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {keeper.mission}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Kenali Profil & Aktivitas</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bridge to Community Contributor Feature */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-amber-800" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900">
                Apakah Anda Bagian dari Komunitas Adat di Kawasan Toba?
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xl">
                Daftarkan sanggar tari, kelompok penenun, atau cerita lokal Anda untuk diverifikasi dan ditampilkan di BONATURA.
              </p>
            </div>
          </div>
          <Link
            href="/community"
            className="px-5 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Gabung Jadi Kontributor Komunitas
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SIGNATURE FEATURE: TOBA CULTURAL KNOWLEDGE GRAPH               */}
      {/* ============================================================== */}
      <section className="py-20 bg-stone-900 text-white border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-3">
              <Network className="w-4 h-4 text-amber-400" />
              Signature Feature: Toba Cultural Knowledge Graph
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Culture Is Connected.
            </h2>
            <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
              Explore how traditions, stories, art, and cultural values connect with one another across the Toba ecosystem.
            </p>
          </div>

          <div className="bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
            {/* Left Graph Node Network Visual (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 relative min-h-[420px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-6">
                {/* Center Core Node: Ulos */}
                <button
                  onClick={() => setActiveGraphNodeId("ulos-batak-toba")}
                  className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all duration-300 shadow-2xl flex items-center gap-2 mb-8 ${
                    activeGraphNodeId === "ulos-batak-toba"
                      ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/50 scale-110"
                      : "bg-amber-800 text-white hover:bg-amber-700"
                  }`}
                >
                  <Scissors className="w-4 h-4" />
                  <span>Kain Tenun Ulos (Inti)</span>
                </button>

                {/* Satellite Connected Nodes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
                  {CULTURAL_KNOWLEDGE_GRAPH.nodes
                    .filter((n) => n.id !== "ulos-batak-toba")
                    .map((node) => {
                      const isSelected = activeGraphNodeId === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setActiveGraphNodeId(node.id)}
                          className={`p-3 rounded-xl text-left text-xs transition-all border ${
                            isSelected
                              ? "bg-amber-500 text-stone-950 font-bold border-amber-300 ring-2 ring-amber-300 shadow-lg scale-105"
                              : "bg-stone-900 text-stone-300 hover:bg-stone-800 border-stone-800"
                          }`}
                        >
                          <span className="block text-[10px] font-mono text-amber-400/90 uppercase">
                            {node.category}
                          </span>
                          <span className="font-semibold block truncate mt-0.5">
                            {node.label}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-800">
                <span>Relasi Ontologi Budaya Berbasis Praktik Adat Toba</span>
                <span>{CULTURAL_KNOWLEDGE_GRAPH.edges.length} Hubungan Terhubung</span>
              </div>
            </div>

            {/* Right Graph Inspector Panel (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold inline-block mb-2 border border-amber-400/30">
                  {activeGraphNode.category}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {activeGraphNode.label}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeGraphNode.description}
                </p>

                {/* Connected Relationships Explanation */}
                <div className="mt-6 pt-4 border-t border-stone-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Keterkaitan Antarbudaya Toba:
                  </span>
                  {activeGraphEdges.map((edge) => (
                    <div
                      key={edge.id}
                      className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-1"
                    >
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded inline-block border border-amber-900">
                        {edge.relation}
                      </span>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {edge.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Verified Source Citations */}
                <div className="mt-4 pt-3 border-t border-stone-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Sitasi Rujukan Resmi:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-1">
                    {activeGraphNode.sources.map((src, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <button
                  onClick={() => {
                    const match = CULTURAL_ELEMENTS.find(
                      (e) => e.id === activeGraphNode.id || e.id === "ulos-batak-toba"
                    );
                    if (match) setModalCulture(match);
                  }}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Explore Related Culture Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8 — START YOUR JOURNEY THROUGH TOBA                    */}
      {/* ============================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#FAFAF8] to-amber-50/60 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Langkah Selanjutnya
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
              Toba Is More Than a Destination. <br />
              It Is a Heritage Worth Discovering.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore its culture, connect with its people, and discover the stories that make Toba special.
            </p>
          </div>

          {/* 3 Call to Actions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/map"
              className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Explore Destinations
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Temukan tempat, desa adat berbenteng, situs megalitikum, dan koordinat geografis di sekeliling Danau Toba.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Buka Cultural Map</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/community"
              className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Meet Communities
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Kenali sanggar tenun Huta Raja, penabuh gondang, dan paguyuban adat yang menjaga warisan Toba tetap hidup.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Gabung Komunitas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/journey"
              className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Route className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Plan Your Journey
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Susun rute perjalanan multi-hari berdasarkan minat budaya, desa tenun, arsitektur, dan gastronomi Toba.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Rancang Itinerary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* GEOPARK ACCORD NOTE (ETHICAL CULTURAL SCOPE)                   */}
      {/* ============================================================== */}
      <div className="py-6 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500 px-4">
        <p className="max-w-4xl mx-auto leading-relaxed">
          <strong>Catatan Inklusivitas Budaya:</strong> Kawasan <em>Toba Caldera UNESCO Global Geopark</em> merupakan rumah bagi keberagaman masyarakat Batak Toba, Simalungun, Karo, dan Pakpak. BONATURA berfokus mengawali kurasi mendalam pada budaya Batak Toba dan secara bertahap memperluas cakupan ke seluruh khazanah budaya suku bersaudara di lingkar kaldera.
        </p>
      </div>

      {/* ============================================================== */}
      {/* MODALS SECTION                                                 */}
      {/* ============================================================== */}

      {/* 1. Modal Cultural Element Detail */}
      {modalCulture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            <div className="relative h-72 w-full">
              <img
                src={modalCulture.imageUrl}
                alt={modalCulture.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(modalCulture.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                    bookmarkedIds.includes(modalCulture.id)
                      ? "bg-amber-500 text-stone-950 font-bold"
                      : "bg-black/50 text-white hover:bg-black/70"
                  }`}
                  title="Simpan Cerita"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalCulture(null)}
                  className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs">
                    {modalCulture.category}
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/90 text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Status: {modalCulture.verificationStatus}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {modalCulture.name}
                </h3>
                <p className="text-xs text-stone-200 flex items-center gap-1.5 mt-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {modalCulture.subRegion}, Kawasan Danau Toba
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  Narasi Cerita Budaya
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
                  {modalCulture.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <Compass className="w-4 h-4 text-amber-700" />
                  Sejarah & Asal-usul Tradisi
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {modalCulture.history}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Makna & Filosofi Luhur
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/20 p-4 rounded-2xl border border-amber-100">
                  {modalCulture.philosophy}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2">
                  <Layers className="w-4 h-4 text-stone-500" />
                  Konteks Sosial & Pelaksanaan Adat
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {modalCulture.culturalContext}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#795548] flex items-center gap-1.5 mb-2">
                  <Info className="w-4 h-4 text-[#B85C38]" />
                  Sumber Referensi & Kuratorial Resmi
                </h4>
                <ul className="space-y-2 text-xs text-[#5D4333] bg-[#F8F5EF] p-4 rounded-2xl border border-[#D6C4A8]">
                  {modalCulture.sources && modalCulture.sources.map((src: any, i: number) => {
                    const isObj = typeof src === "object" && src !== null;
                    const title = isObj ? src.title : src;
                    const author = isObj ? src.author : undefined;
                    const publisher = isObj ? src.publisher : undefined;
                    const url = isObj ? src.url : undefined;
                    const note = isObj ? src.note : undefined;
                    return (
                      <li key={i} className="flex flex-col gap-0.5 pb-2 border-b border-[#D6C4A8]/40 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] mt-1.5 shrink-0" />
                          <span className="font-semibold text-[#2C1A14]">{title}</span>
                        </div>
                        {(author || publisher) && (
                          <span className="text-[11px] text-[#795548] pl-3.5">
                            {[author, publisher].filter(Boolean).join(" • ")}
                          </span>
                        )}
                        {note && (
                          <span className="text-[11px] text-[#5D4333] italic pl-3.5">Catatan: {note}</span>
                        )}
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-[#B85C38] hover:underline pl-3.5 flex items-center gap-1 mt-0.5"
                          >
                            <span>Buka Dokumen Rujukan Resmi</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Related Elements */}
              <div className="pt-4 border-t border-[#D6C4A8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1A14] mb-3 flex items-center justify-between">
                  <span>Rekomendasi Budaya Terkait (Knowledge Graph)</span>
                  <span className="text-[11px] font-normal text-[#795548]">
                    {modalCulture.relatedElements?.length || 0} Terhubung
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modalCulture.relatedElements && modalCulture.relatedElements.map((rel: any) => (
                    <button
                      key={rel.id}
                      onClick={() => handleOpenCultureDetail(rel)}
                      className="p-3 bg-[#F8F5EF] hover:bg-[#D6C4A8]/30 rounded-xl border border-[#D6C4A8] hover:border-[#B85C38] flex items-center justify-between text-left transition-colors group"
                    >
                      <div>
                        <span className="block text-xs font-bold text-[#2C1A14] group-hover:text-[#B85C38]">
                          {rel.name}
                        </span>
                        <span className="text-[11px] text-[#795548]">{rel.relationType || rel.region || "Relasi Budaya"}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#795548] group-hover:text-[#B85C38] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Connected Destinations */}
              {modalCulture.destinations && modalCulture.destinations.length > 0 && (
                <div className="pt-4 border-t border-[#D6C4A8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C1A14] mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#B85C38]" />
                    Destinasi Terkait di Peta Budaya
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {modalCulture.destinations.map((dest: any) => (
                      <Link
                        key={dest.id}
                        href="/map"
                        className="p-3 bg-[#F8F5EF] hover:bg-[#D6C4A8]/30 rounded-xl border border-[#D6C4A8] hover:border-[#B85C38] flex items-center justify-between text-left transition-colors"
                      >
                        <div>
                          <span className="block text-xs font-bold text-[#2C1A14]">{dest.name}</span>
                          <span className="text-[11px] text-[#795548]">{dest.note || "Kunjungi di Peta Budaya"}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#B85C38]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Diverifikasi oleh Balai Pelestarian Kebudayaan & Komunitas Adat Toba.
              </span>
              <button
                onClick={() => setModalCulture(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Section 1: Get to Know Toba */}
      {modalGetToKnow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            <div className="relative h-64 w-full">
              <img
                src={modalGetToKnow.imageUrl}
                alt={modalGetToKnow.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setModalGetToKnow(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-amber-500 text-stone-950 font-bold text-xs rounded-lg inline-block mb-1">
                  {modalGetToKnow.badge}
                </span>
                <h3 className="text-2xl font-bold">{modalGetToKnow.title}</h3>
                <p className="text-xs text-amber-200">{modalGetToKnow.tagline}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                {modalGetToKnow.fullStory}
              </p>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                  Fakta Kunci & Keistimewaan:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {modalGetToKnow.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setModalGetToKnow(null)}
                className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Section 4: Stories of Toba */}
      {modalStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            <div className="relative h-64 w-full">
              <img
                src={modalStory.imageUrl}
                alt={modalStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setModalStory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs text-amber-300 font-bold block">
                  {modalStory.location}
                </span>
                <h3 className="text-2xl font-bold">{modalStory.title}</h3>
                <p className="text-xs text-stone-200">{modalStory.subtitle}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Konteks Sejarah: {modalStory.historicalContext}
                </span>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  {modalStory.summary}
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-700 block mb-1">
                  Catatan Tradisi Lisan & Variasi Cerita:
                </span>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  &ldquo;{modalStory.oralTraditionNote}&rdquo;
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Sumber & Rujukan Sejarah:
                </span>
                <ul className="text-xs text-stone-600 space-y-1">
                  {modalStory.sources.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setModalStory(null)}
                className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
              >
                Tutup Cerita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Section 6: Taste of Toba */}
      {modalCulinary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            <div className="relative h-64 w-full">
              <img
                src={modalCulinary.imageUrl}
                alt={modalCulinary.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setModalCulinary(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs text-amber-300 font-bold block">
                  {modalCulinary.indonesianName}
                </span>
                <h3 className="text-2xl font-bold">{modalCulinary.name}</h3>
                <p className="text-xs text-stone-200">{modalCulinary.tagline}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                  Bahan Utama & Rempah Khas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalCulinary.keyIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Proses Pengolahan Tradisional:
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {modalCulinary.cookingProcess}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Konteks Penyajian Adat:
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  {modalCulinary.culturalContext}
                </p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-500 italic">
                Catatan Komunitas: {modalCulinary.communityNote}
              </div>
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setModalCulinary(null)}
                className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
              >
                Tutup Kuliner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Section 7: Heritage Keeper Profile */}
      {modalKeeper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            <div className="relative h-64 w-full">
              <img
                src={modalKeeper.imageUrl}
                alt={modalKeeper.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setModalKeeper(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs text-amber-300 font-bold block">
                  {modalKeeper.role} • {modalKeeper.location}
                </span>
                <h3 className="text-2xl font-bold">{modalKeeper.name}</h3>
                <p className="text-xs text-stone-200">{modalKeeper.community}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Misi Pelestarian:
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  {modalKeeper.mission}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {modalKeeper.description}
              </p>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                  Aktivitas Bersama Komunitas:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {modalKeeper.activities.map((act, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <Link
                href="/community"
                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
              >
                Hubungi atau Dukung Komunitas Ini →
              </Link>
              <button
                onClick={() => setModalKeeper(null)}
                className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
