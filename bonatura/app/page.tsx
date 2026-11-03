"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  MapPin,
  Bot,
  Users,
  Route,
  ShieldCheck,
  Search,
  Sparkles,
  ChevronRight,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { CULTURAL_ELEMENTS } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/discovery");
  };

  const featureCards = [
    {
      title: "Discovery: The Soul of Toba",
      badge: "Eksplorasi Warisan Toba",
      description:
        "Jelajahi keindahan Danau Toba, tradisi Batak, tenun ulos, Rumah Bolon, falsafah Dalihan Na Tolu, serta cerita para penjaga budaya.",
      icon: Compass,
      href: "/discovery",
      gradient: "from-amber-600 to-amber-800",
      stats: "Pusat Peradaban Toba",
    },
    {
      title: "Cultural Map",
      badge: "Peta Interaktif Spasial",
      description:
        "Jelajahi persebaran cagar budaya, desa wisata adat, dan situs bersejarah Indonesia berbasis koordinat geografis presisi.",
      icon: MapPin,
      href: "/map",
      gradient: "from-stone-700 to-stone-900",
      stats: "38 Provinsi Nusantara",
    },
    {
      title: "AI Cultural Guide",
      badge: "Kecerdasan Ontologi Budaya",
      description:
        "Tanya jawab pintar seputar makna filosofis, pantangan adat, dan sejarah dengan sitasi resmi bebas halusinasi.",
      icon: Bot,
      href: "/ai-guide",
      gradient: "from-amber-700 to-amber-900",
      stats: "100% Sumber Terverifikasi",
    },
    {
      title: "Personalized Journey",
      badge: "Perencana Rute Wisata",
      description:
        "Rancang itinerary perjalanan multi-hari berdasarkan minat budaya pribadi, mulai dari wisata relief candi hingga belajar membatik.",
      icon: Route,
      href: "/journey",
      gradient: "from-stone-800 to-stone-950",
      stats: "Kustomisasi Hari & Aktivitas",
    },
    {
      title: "Community Contribution",
      badge: "Partisipasi Komunitas Adat",
      description:
        "Wadah terbuka bagi sanggar seni dan komunitas adat untuk mendaftarkan tradisi lokal dan memantau status kurasi verifikasi.",
      icon: Users,
      href: "/community",
      gradient: "from-amber-800 to-amber-950",
      stats: "500+ Komunitas Terdaftar",
    },
    {
      title: "Admin Portal",
      badge: "Tata Kelola Kuratorial",
      description:
        "Dashboard verifikasi pengajuan komunitas, pemutakhiran master data kebudayaan nasional, dan manajemen katalog ilmiah.",
      icon: ShieldCheck,
      href: "/admin",
      gradient: "from-stone-900 to-amber-950",
      stats: "Panel Kurator & Admin",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-amber-50/70 via-stone-50 to-[#FAFAF8]">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Platform Terpadu Warisan & Kebudayaan Nusantara
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Jelajahi Jiwa Tradisi, <br />
            <span className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 bg-clip-text text-transparent">
              Rasakan Kemegahan Budaya Indonesia
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            BONATURA menghubungkan penjelajah, komunitas lokal, dan peneliti budaya melalui kurasi terverifikasi, peta interaktif, dan panduan AI berbasis pengetahuan terpercaya.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200"
            >
              <Search className="w-5 h-5 text-stone-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tari tradisional, senjata pusaka, kuliner, upacara adat..."
                className="w-full px-4 py-3 text-sm text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
              />
              <Link
                href="/discovery"
                className="px-5 py-3 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-all shadow-md shadow-amber-800/20 whitespace-nowrap flex items-center gap-1.5"
              >
                Cari Budaya
                <ChevronRight className="w-4 h-4" />
              </Link>
            </form>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">
                1.200+
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Elemen Budaya Terdata
              </span>
            </div>
            <div className="p-4 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">38</span>
              <span className="text-xs text-stone-500 font-medium">
                Provinsi Nusantara
              </span>
            </div>
            <div className="p-4 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">
                500+
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Komunitas Budaya
              </span>
            </div>
            <div className="p-4 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">
                100%
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Sumber Terverifikasi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. FITUR UTAMA / PAGES DIRECTORY                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Fitur & Navigasi Halaman
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
            Pusat Penjelajahan Terpadu
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            Setiap modul dirancang khusus dengan fitur interaktif untuk mendampingi perjalanan pelestarian budaya Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.href}
                href={feat.href}
                className="group bg-white p-7 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400">
                    {feat.stats}
                  </span>
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Buka Halaman
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CULTURAL SPOTLIGHT PREVIEW                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/80 rounded-3xl p-6 sm:p-10 border border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Sorotan Budaya Unggulan
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                Karya Agung Warisan Leluhur
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Elemen budaya nusantara yang telah diakui dunia dan dilestarikan turun-temurun.
              </p>
            </div>
            <Link
              href="/discovery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline"
            >
              Lihat Semua Elemen di Discovery →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURAL_ELEMENTS.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href="/discovery"
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded">
                    {item.region}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>
                  <div className="mt-3 text-xs font-bold text-amber-800 flex items-center gap-1">
                    Pelajari Filosofi
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CALL TO ACTION BANNER                                       */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-amber-500/30">
              Gerakan Pelestarian Bersama
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Punya Cerita Budaya yang Belum Tercatat?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
              Bergabunglah dengan ratusan komunitas adat, sanggar tari, dan pengrajin lokal untuk mendaftarkan dan memvalidasi khazanah budaya daerah Anda di BONATURA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/community"
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Daftarkan Tradisi Komunitas
              </Link>
              <Link
                href="/ai-guide"
                className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-stone-700"
              >
                <Bot className="w-4 h-4" />
                Tanya AI Cultural Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
