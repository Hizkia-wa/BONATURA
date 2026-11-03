"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Compass,
  Navigation,
  Search,
  Bookmark,
  Share2,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  Ticket,
  Car,
  Route,
  CheckCircle2,
  Plus,
  Minus,
  RotateCcw,
  Eye,
  X,
  ExternalLink,
  Layers,
  Heart,
  Landmark,
  Building,
  Scissors,
  Music,
  Utensils,
  Award,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import {
  TOBA_MAP_CATEGORIES,
  TOBA_MAP_DESTINATIONS,
  TOBA_CULTURAL_ROUTES,
  TobaMapCategoryType,
  TobaDestinationDetail,
  TobaCulturalRoute,
} from "@/lib/data";

export default function CulturalMapPage() {
  // --- STATES ---
  const [selectedCategory, setSelectedCategory] = useState<TobaMapCategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>("huta-siallagan");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    "huta-siallagan",
    "tb-silalahi-center",
    "kampung-huta-raja",
  ]);
  const [modalDestination, setModalDestination] = useState<TobaDestinationDetail | null>(null);

  // Map Controls State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapPan, setMapPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSimulatingLocation, setIsSimulatingLocation] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered destinations based on category and search query
  const filteredDestinations = useMemo(() => {
    return TOBA_MAP_DESTINATIONS.filter((dest) => {
      const matchCategory =
        selectedCategory === "All" || dest.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.area.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active selected destination object
  const activeDestination = useMemo(() => {
    return (
      TOBA_MAP_DESTINATIONS.find((d) => d.id === selectedDestinationId) ||
      TOBA_MAP_DESTINATIONS[0]
    );
  }, [selectedDestinationId]);

  // Featured destinations (Section B)
  const featuredDestinations = useMemo(() => {
    return TOBA_MAP_DESTINATIONS.filter((d) => d.isFeatured);
  }, []);

  // Hidden cultural gems (Section D)
  const hiddenGems = useMemo(() => {
    return TOBA_MAP_DESTINATIONS.filter((d) => d.isHiddenGem);
  }, []);

  // Saved destinations objects (Section F)
  const savedDestinations = useMemo(() => {
    return TOBA_MAP_DESTINATIONS.filter((d) => bookmarkedIds.includes(d.id));
  }, [bookmarkedIds]);

  // Active Route Object
  const activeRoute = useMemo(() => {
    return TOBA_CULTURAL_ROUTES.find((r) => r.id === activeRouteId) || null;
  }, [activeRouteId]);

  // Helper for Category Color Badge
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Historical Heritage":
        return "bg-amber-600 text-white";
      case "Traditional Village":
        return "bg-emerald-600 text-white";
      case "Arts & Crafts":
        return "bg-indigo-600 text-white";
      case "Cultural Experience":
        return "bg-rose-600 text-white";
      case "Local Culinary":
        return "bg-orange-600 text-white";
      case "Museum":
        return "bg-blue-600 text-white";
      default:
        return "bg-stone-800 text-white";
    }
  };

  // Helper for Category Icon
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Historical Heritage":
        return <Landmark className="w-3.5 h-3.5" />;
      case "Traditional Village":
        return <Building className="w-3.5 h-3.5" />;
      case "Arts & Crafts":
        return <Scissors className="w-3.5 h-3.5" />;
      case "Cultural Experience":
        return <Music className="w-3.5 h-3.5" />;
      case "Local Culinary":
        return <Utensils className="w-3.5 h-3.5" />;
      case "Museum":
        return <Compass className="w-3.5 h-3.5" />;
      default:
        return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in") return Math.min(prev + 0.25, 2.0);
      return Math.max(prev - 0.25, 0.8);
    });
  };

  const handleResetMap = () => {
    setZoomLevel(1);
    setMapPan({ x: 0, y: 0 });
    setActiveRouteId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 pb-24">
      {/* ============================================================== */}
      {/* 1. HERO & EXPLORATION HEADER                                   */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-stone-950 via-teal-950 to-stone-900 text-white border-b border-teal-900/40">
        {/* Subtle Lake Toba topographical lines pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Compass className="w-4 h-4 text-teal-400" />
            BONATURA · CULTURAL EXPLORATION
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-300 uppercase mb-2">
            Discover the Stories Behind Every Place.
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Explore the Cultural Map of Toba
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Every place has a story. Find yours in the heart of Lake Toba. Jelajahi situs sejarah, perkampungan adat, sentra kriya ulos, dan kuliner autentik dalam satu peta digital interaktif.
          </p>

          {/* 4 Pillars Grid (Discover, Explore, Learn, Experience) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                1. Discover
              </span>
              <p className="text-[11px] text-stone-300 leading-snug">
                Temukan destinasi cagar budaya di sekeliling kaldera Toba.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                2. Explore
              </span>
              <p className="text-[11px] text-stone-300 leading-snug">
                Jelajahi titik lokasi spasial melalui navigasi peta interaktif.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                3. Learn
              </span>
              <p className="text-[11px] text-stone-300 leading-snug">
                Pahami riwayat sejarah, filosofi, dan keunikan di setiap lokasi.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                4. Experience
              </span>
              <p className="text-[11px] text-stone-300 leading-snug">
                Ikuti workshop tenun, pertunjukan tortor, dan kuliner pusaka.
              </p>
            </div>
          </div>

          {/* Search bar & quick category bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-xl shadow-black/40 border border-white/20">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, culture, or places..."
                className="w-full px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 mr-2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="text-xs text-stone-500 font-semibold px-3 py-1 bg-stone-100 rounded-xl mr-1 whitespace-nowrap">
                {filteredDestinations.length} Destinasi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CATEGORY FILTER TABS                                        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30">
        <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-lg flex items-center gap-2 overflow-x-auto">
          {TOBA_MAP_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-sm ring-2 ring-amber-500/50"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>{cat.label}</span>
                {cat.id !== "All" && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      cat.id === "Historical Heritage"
                        ? "bg-amber-500"
                        : cat.id === "Traditional Village"
                        ? "bg-emerald-500"
                        : cat.id === "Arts & Crafts"
                        ? "bg-indigo-500"
                        : cat.id === "Cultural Experience"
                        ? "bg-rose-500"
                        : cat.id === "Local Culinary"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE MAP SECTION (CORE FEATURE)                      */}
      {/* ============================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Visual Simulator (8 cols) */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            {/* Map Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-800">
                  Interactive Cultural Map of Lake Toba
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  (WGS84 Calibrated)
                </span>
              </div>

              {/* Map Action Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => setIsSimulatingLocation(!isSimulatingLocation)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    isSimulatingLocation
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                  title="Simulasikan lokasi GPS pengguna"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isSimulatingLocation ? "GPS Aktif (Tuktuk)" : "Lokasi Saya"}</span>
                </button>

                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => handleZoom("in")}
                    className="p-1.5 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Zoom in"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-[11px] font-mono font-bold text-stone-600">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => handleZoom("out")}
                    className="p-1.5 hover:bg-stone-200 text-stone-700 transition-colors"
                    title="Zoom out"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleResetMap}
                  className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200"
                  title="Reset Tampilan Peta"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Map Canvas Representation */}
            <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl bg-gradient-to-br from-stone-950 via-teal-950 to-stone-900 overflow-hidden shadow-inner flex flex-col justify-between p-6 select-none">
              {/* Caldera Topography & Water Contour */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#14b8a6_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

              {/* Graphical representation of Lake Toba water body & Samosir Island */}
              <div
                className="relative z-10 w-full h-full transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel}) translate(${mapPan.x}px, ${mapPan.y}px)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Visual Island Outline / Lake Toba shape */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Outer Caldera Rim */}
                  <ellipse cx="50" cy="50" rx="42" ry="40" fill="none" stroke="#2dd4bf" strokeWidth="0.75" strokeDasharray="2,2" />
                  {/* Samosir Island Contour in center */}
                  <path
                    d="M 38 32 Q 58 20 68 35 Q 72 52 64 62 Q 50 68 36 56 Q 30 45 38 32 Z"
                    fill="#134e4a"
                    stroke="#5eead4"
                    strokeWidth="0.8"
                  />
                  {/* Lake waters label */}
                  <text x="20" y="24" fill="#5eead4" fontSize="3" fontFamily="monospace">DANAU TOBA (UTARA)</text>
                  <text x="65" y="86" fill="#5eead4" fontSize="3" fontFamily="monospace">DANAU TOBA (SELATAN)</text>
                  <text x="44" y="46" fill="#fef08a" fontSize="3" fontWeight="bold">PULAU SAMOSIR</text>
                </svg>

                {/* Simulated Active Route Line if a route is selected */}
                {activeRoute && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      points="68,48 63,34 52,18"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                      strokeDasharray="2,2"
                      className="animate-pulse"
                    />
                  </svg>
                )}

                {/* User Simulated Location Pin */}
                {isSimulatingLocation && (
                  <div
                    className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "67%", top: "40%" }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-blue-500/30 animate-ping absolute" />
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center text-white" />
                      <span className="absolute top-5 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Lokasi Anda (Tuktuk Siadong)
                      </span>
                    </div>
                  </div>
                )}

                {/* Dynamic Destination Markers */}
                {filteredDestinations.map((dest) => {
                  const isSelected = selectedDestinationId === dest.id;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDestinationId(dest.id)}
                      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%` }}
                    >
                      <div className="relative flex flex-col items-center">
                        {/* Pin Bubble */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xl ${
                            isSelected
                              ? "bg-amber-400 text-stone-950 ring-4 ring-amber-400/50 scale-110 z-30 font-extrabold"
                              : `${getCategoryColor(dest.category)} hover:scale-105 border border-white/30`
                          }`}
                        >
                          {getCategoryIcon(dest.category)}
                          <span className="hidden sm:inline whitespace-nowrap">{dest.name.split(" ")[0]}</span>
                        </div>

                        {/* Interactive Tooltip on Hover */}
                        <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity absolute bottom-full mb-1.5 bg-stone-950/95 text-white text-[11px] p-2.5 rounded-xl border border-stone-700 shadow-2xl whitespace-nowrap z-40">
                          <span className="block font-bold text-amber-400">{dest.name}</span>
                          <span className="text-[10px] text-stone-300">{dest.category} • {dest.area}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Map Legend & Coordinates Bar */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-400 pt-3 border-t border-teal-900/60 bg-stone-950/60 -mx-6 -mb-6 p-4 rounded-b-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Desa Adat
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Situs Sejarah
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Sentra Kriya
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Museum
                  </span>
                </div>
                <div className="font-mono text-teal-300">
                  Lat: {activeDestination.coordinates}
                </div>
              </div>
            </div>

            {/* Quick Destination Selectors List */}
            <div className="pt-2">
              <span className="text-xs font-bold text-stone-500 block mb-2">
                Pilih Cepat Titik Lokasi ({filteredDestinations.length} ditemukan):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filteredDestinations.slice(0, 8).map((dest) => {
                  const isSelected = selectedDestinationId === dest.id;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => setSelectedDestinationId(dest.id)}
                      className={`p-2.5 text-left rounded-xl text-xs border transition-all ${
                        isSelected
                          ? "bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <span className="block truncate font-bold">{dest.name}</span>
                      <span className="text-[10px] text-stone-500 block truncate font-normal">
                        {dest.area}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Destination Detail Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              {/* Category & Bookmark */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-lg ${getCategoryColor(
                    activeDestination.category
                  )}`}
                >
                  {activeDestination.category}
                </span>
                <button
                  onClick={(e) => toggleBookmark(activeDestination.id, e)}
                  className={`p-2 rounded-xl border transition-all ${
                    bookmarkedIds.includes(activeDestination.id)
                      ? "bg-amber-100 border-amber-500 text-amber-900 font-bold"
                      : "bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                  }`}
                  title="Simpan ke Perjalanan Saya"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 leading-snug">
                {activeDestination.name}
              </h2>
              <span className="text-xs font-semibold text-stone-500 block mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {activeDestination.area}
              </span>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeDestination.description}
              </p>
            </div>

            {/* Photo preview */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={activeDestination.imageUrl}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-lg">
                Koordinat: {activeDestination.coordinates}
              </span>
            </div>

            {/* Highlights */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                What Can You Discover?
              </h3>
              <div className="space-y-2">
                {activeDestination.highlights.map((h, i) => (
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

            {/* Practical Visiting Info */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{activeDestination.visitingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{activeDestination.entryFee}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <button
                onClick={() => setModalDestination(activeDestination)}
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                Discover Its Story (Baca Kisah Lengkap)
              </button>
              <Link
                href="/journey"
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Route className="w-4 h-4" />
                Rancang Perjalanan Menuju Lokasi Ini
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. FEATURED CULTURAL DESTINATIONS (SECTION B)                  */}
      {/* ============================================================== */}
      <section className="py-16 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Featured Cultural Destinations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
                Destinasi Budaya Paling Bersejarah di Toba
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-xl">
                Tempat-tempat pilar yang menyimpan fondasi arsitektur, kriya, dan peninggalan megalitikum peradaban Batak.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-semibold">
              {featuredDestinations.length} Destinasi Pilihan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest) => {
              const isSaved = bookmarkedIds.includes(dest.id);
              return (
                <div
                  key={dest.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg ${getCategoryColor(
                          dest.category
                        )}`}
                      >
                        {dest.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(dest.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-amber-500 text-stone-950 font-bold"
                            : "bg-black/50 text-white hover:bg-black/70"
                        }`}
                        title="Simpan Tempat"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {dest.area}
                      </span>
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                        {dest.tagline}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedDestinationId(dest.id);
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                      className="text-xs font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      View on Map
                    </button>
                    <button
                      onClick={() => setModalDestination(dest)}
                      className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Discover Story
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. HIDDEN CULTURAL GEMS (SECTION D)                            */}
      {/* ============================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
            Hidden Cultural Gems
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
            Permata Budaya Tersembunyi di Sekeliling Toba
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Wisatawan diajak tidak hanya mengunjungi tempat yang sudah ramai, tetapi juga mengenal perkampungan hening, tradisi bertani purba, dan komunitas perbukitan yang autentik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hiddenGems.map((gem) => (
            <div
              key={gem.id}
              className="group bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-teal-100 text-teal-900 text-[10px] font-bold rounded-lg">
                    {gem.category}
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {gem.area}
                  </span>
                </div>

                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-stone-100">
                  <img
                    src={gem.imageUrl}
                    alt={gem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold rounded">
                    Permata Tersembunyi
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                  {gem.name}
                </h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {gem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setSelectedDestinationId(gem.id);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className="font-bold text-teal-800 hover:underline flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Tandai di Peta
                </button>
                <button
                  onClick={() => setModalDestination(gem)}
                  className="font-semibold text-stone-600 hover:text-stone-900"
                >
                  Lihat Riwayat →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CULTURAL ROUTES (SECTION E)                                 */}
      {/* ============================================================== */}
      <section className="py-16 bg-stone-900 text-white border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              Cultural Routes — Perjalanan Bertema Budaya
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Jelajahi Toba Berdasarkan Minat & Cerita
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-400 leading-relaxed">
              Panduan rute bertahap yang mengurutkan lokasi, estimasi jarak, dan pengalaman autentik dari satu destinasi ke destinasi lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOBA_CULTURAL_ROUTES.map((route) => {
              const isActive = activeRouteId === route.id;
              return (
                <div
                  key={route.id}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-stone-950 border-amber-400 ring-2 ring-amber-400/30"
                      : "bg-stone-950/70 border-stone-800 hover:border-stone-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg font-bold">
                        {route.category}
                      </span>
                      <span className="text-stone-400 font-mono">
                        {route.duration} • {route.distance}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {route.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-200/90 mb-3">
                      {route.subtitle}
                    </p>
                    <p className="text-xs text-stone-400 leading-relaxed mb-6">
                      {route.description}
                    </p>

                    {/* Timeline Stops */}
                    <div className="space-y-3 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Rangkaian Perjalanan:
                      </span>
                      {route.stops.map((stop, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 text-xs">
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {sIdx + 1}
                          </div>
                          <div>
                            <span className="font-bold text-white block">
                              {stop.name} <span className="font-normal text-stone-400">({stop.area})</span>
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {stop.highlight}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setActiveRouteId(route.id);
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Route className="w-3.5 h-3.5" />
                      {isActive ? "Rute Ditampilkan di Peta" : "Plot Rute pada Peta"}
                    </button>
                    <Link
                      href="/journey"
                      className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      Buka di Journey Planner →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. MY SAVED PLACES (SECTION F)                                 */}
      {/* ============================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-700" />
                <h3 className="text-xl font-bold text-stone-900">
                  My Toba Cultural Journey ({savedDestinations.length} Tempat Tersimpan)
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Koleksi tempat favorit yang Anda simpan untuk dikunjungi selama menjelajahi Danau Toba.
              </p>
            </div>

            <Link
              href="/journey"
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Route className="w-4 h-4" />
              Susun Itinerary dari Tempat Ini
            </Link>
          </div>

          {savedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedDestinations.map((place) => (
                <div
                  key={place.id}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="block text-xs font-bold text-stone-900 truncate max-w-[180px]">
                        {place.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {place.area}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedDestinationId(place.id);
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                      className="p-2 text-teal-800 hover:bg-teal-100 rounded-lg transition-colors"
                      title="Lihat di Peta"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleBookmark(place.id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                      title="Hapus dari Simpanan"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-400 text-xs">
              Belum ada tempat yang disimpan. Klik ikon bookmark pada destinasi untuk menambahkannya ke perjalanan Anda.
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. DESTINATION STORY & DETAIL MODAL                           */}
      {/* ============================================================== */}
      {modalDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            {/* Modal Image Header */}
            <div className="relative h-72 w-full">
              <img
                src={modalDestination.imageUrl}
                alt={modalDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(modalDestination.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                    bookmarkedIds.includes(modalDestination.id)
                      ? "bg-amber-500 text-stone-950 font-bold"
                      : "bg-black/50 text-white hover:bg-black/70"
                  }`}
                  title="Simpan Tempat"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalDestination(null)}
                  className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${getCategoryColor(
                      modalDestination.category
                    )}`}
                  >
                    {modalDestination.category}
                  </span>
                  <span className="px-2.5 py-1 bg-teal-500/90 text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Cagar Budaya Terverifikasi
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {modalDestination.name}
                </h3>
                <p className="text-xs text-stone-200 flex items-center gap-1.5 mt-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {modalDestination.area} ({modalDestination.coordinates})
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Sejarah & Latar Belakang */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  Sejarah & Latar Belakang Lokasi
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
                  {modalDestination.fullStory}
                </p>
              </div>

              {/* Makna Budaya & Keunikan */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Makna Budaya & Keunikan Lokasi
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {modalDestination.culturalSignificance}
                </p>
              </div>

              {/* What Can You Discover? */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                  Aktivitas Pengalaman Budaya yang Tersedia:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {modalDestination.activities.map((act, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-700" />
                    Jam Kunjungan & Tiket
                  </span>
                  <p className="text-stone-600">{modalDestination.visitingHours}</p>
                  <p className="font-semibold text-emerald-800">{modalDestination.entryFee}</p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-amber-700" />
                    Petunjuk Perjalanan & Rute
                  </span>
                  <p className="text-stone-600">{modalDestination.howToGetThere}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedDestinationId(modalDestination.id);
                  setModalDestination(null);
                  window.scrollTo({ top: 380, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                Tandai di Peta
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/journey"
                  className="w-full sm:w-auto px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <Route className="w-4 h-4" />
                  Rancang Rute Menuju Sini
                </Link>
                <button
                  onClick={() => setModalDestination(null)}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
