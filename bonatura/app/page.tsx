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
  ArrowRight
} from "lucide-react";
import { CULTURAL_ELEMENTS } from "@/lib/data";
import EntranceAnimation from "@/components/EntranceAnimation";

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
      gradient: "from-[#B85C38] to-[#964728]",
      stats: "Pusat Peradaban Toba",
    },
    {
      title: "Cultural Map",
      badge: "Peta Interaktif Spasial",
      description:
        "Jelajahi persebaran cagar budaya, desa wisata adat, dan situs bersejarah Indonesia berbasis koordinat geografis presisi.",
      icon: MapPin,
      href: "/map",
      gradient: "from-[#795548] to-[#5D3B2E]",
      stats: "38 Provinsi Nusantara",
    },
    {
      title: "AI Cultural Guide",
      badge: "Kecerdasan Ontologi Budaya",
      description:
        "Tanya jawab pintar seputar makna filosofis, pantangan adat, dan sejarah dengan sitasi resmi bebas halusinasi.",
      icon: Bot,
      href: "/ai-guide",
      gradient: "from-[#B85C38] to-[#795548]",
      stats: "100% Sumber Terverifikasi",
    },
    {
      title: "Personalized Journey",
      badge: "Perencana Rute Wisata",
      description:
        "Rancang itinerary perjalanan multi-hari berdasarkan minat budaya pribadi, mulai dari wisata relief candi hingga belajar membatik.",
      icon: Route,
      href: "/journey",
      gradient: "from-[#795548] to-[#3E2723]",
      stats: "Kustomisasi Hari & Aktivitas",
    },
    {
      title: "Community Contribution",
      badge: "Partisipasi Komunitas Adat",
      description:
        "Wadah terbuka bagi sanggar seni dan komunitas adat untuk mendaftarkan tradisi lokal dan memantau status kurasi verifikasi.",
      icon: Users,
      href: "/community",
      gradient: "from-[#964728] to-[#795548]",
      stats: "500+ Komunitas Terdaftar",
    },
    {
      title: "Admin Portal",
      badge: "Tata Kelola Kuratorial",
      description:
        "Dashboard verifikasi pengajuan komunitas, pemutakhiran master data kebudayaan nasional, dan manajemen katalog ilmiah.",
      icon: ShieldCheck,
      href: "/admin",
      gradient: "from-[#5D3B2E] to-[#2C1A14]",
      stats: "Panel Kurator & Admin",
    },
  ];

  return (
    <>
      <EntranceAnimation />
      <div className="space-y-20 pb-20 bg-[#F8F5EF] text-[#3E2723]">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F1EAE0] via-[#F8F5EF] to-[#F8F5EF]">
        {/* Subtle decorative background pattern in terracotta accent */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#B85C38_1.2px,transparent_1.2px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6C4A8]/70 border border-[#D6C4A8] text-[#2C1A14] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
            Platform Terpadu Warisan & Kebudayaan Nusantara
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1A14] tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Jelajahi Jiwa Tradisi, <br />
            <span className="bg-gradient-to-r from-[#B85C38] via-[#964728] to-[#795548] bg-clip-text text-transparent">
              Rasakan Kemegahan Budaya Indonesia
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#5D4333] max-w-2xl mx-auto leading-relaxed">
            BONATURA menghubungkan penjelajah, komunitas lokal, dan peneliti budaya melalui kurasi terverifikasi, peta interaktif, dan panduan AI berbasis pengetahuan terpercaya.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-[#795548]/10 border border-[#D6C4A8]"
            >
              <Search className="w-5 h-5 text-[#795548] ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tari tradisional, senjata pusaka, kuliner, upacara adat..."
                className="w-full px-4 py-3 text-sm text-[#3E2723] placeholder-[#A8937D] bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 text-xs font-bold text-[#F8F5EF] bg-[#B85C38] hover:bg-[#964728] rounded-xl transition-all shadow-md shadow-[#B85C38]/20 whitespace-nowrap flex items-center gap-1.5"
              >
                Cari Budaya
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-white/90 rounded-2xl border border-[#D6C4A8] shadow-sm">
              <span className="block text-2xl font-bold text-[#B85C38]">
                1.200+
              </span>
              <span className="text-xs text-[#5D4333] font-medium">
                Elemen Budaya Terdata
              </span>
            </div>
            <div className="p-4 bg-white/90 rounded-2xl border border-[#D6C4A8] shadow-sm">
              <span className="block text-2xl font-bold text-[#B85C38]">38</span>
              <span className="text-xs text-[#5D4333] font-medium">
                Provinsi Nusantara
              </span>
            </div>
            <div className="p-4 bg-white/90 rounded-2xl border border-[#D6C4A8] shadow-sm">
              <span className="block text-2xl font-bold text-[#B85C38]">
                500+
              </span>
              <span className="text-xs text-[#5D4333] font-medium">
                Komunitas Budaya
              </span>
            </div>
            <div className="p-4 bg-white/90 rounded-2xl border border-[#D6C4A8] shadow-sm">
              <span className="block text-2xl font-bold text-[#B85C38]">
                100%
              </span>
              <span className="text-xs text-[#5D4333] font-medium">
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C1A14] bg-[#D6C4A8]/70 px-3.5 py-1 rounded-full border border-[#D6C4A8]">
            Fitur & Navigasi Halaman
          </span>
          <h2 className="text-3xl font-extrabold text-[#2C1A14] tracking-tight mt-3">
            Pusat Penjelajahan Terpadu
          </h2>
          <p className="mt-2 text-[#5D4333] text-sm">
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
                className="group bg-white p-7 rounded-3xl border border-[#D6C4A8] shadow-sm hover:shadow-xl hover:border-[#B85C38] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-[#F8F5EF] shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Badge using dark brown on beige for high contrast */}
                    <span className="text-[11px] font-bold text-[#3E2723] bg-[#D6C4A8]/60 px-2.5 py-1 rounded-full border border-[#D6C4A8]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2C1A14] group-hover:text-[#B85C38] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#5D4333] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D6C4A8]/40 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#795548]">
                    {feat.stats}
                  </span>
                  <span className="text-xs font-bold text-[#B85C38] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <div className="bg-[#D6C4A8]/25 rounded-3xl p-6 sm:p-10 border border-[#D6C4A8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#795548]">
                Sorotan Budaya Unggulan
              </span>
              <h3 className="text-2xl font-extrabold text-[#2C1A14] mt-1">
                Karya Agung Warisan Leluhur
              </h3>
              <p className="text-xs text-[#5D4333] mt-1">
                Elemen budaya nusantara yang telah diakui dunia dan dilestarikan turun-temurun.
              </p>
            </div>
            <Link
              href="/discovery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B85C38] hover:text-[#964728] hover:underline"
            >
              Lihat Semua Elemen di Discovery →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURAL_ELEMENTS.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href="/discovery"
                className="group bg-white rounded-2xl overflow-hidden border border-[#D6C4A8] shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#F1EAE0]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#2C1A14]/80 backdrop-blur-sm text-[#F8F5EF] text-[10px] font-semibold rounded">
                    {item.region}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#2C1A14] group-hover:text-[#B85C38] transition-colors">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-xs text-[#5D4333] line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>
                  <div className="mt-3 text-xs font-bold text-[#B85C38] flex items-center gap-1">
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
        <div className="bg-gradient-to-br from-[#795548] via-[#5D3B2E] to-[#2C1A14] rounded-3xl p-8 sm:p-12 text-[#F8F5EF] relative overflow-hidden shadow-2xl border border-[#795548]">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#D6C4A8]/20 text-[#D6C4A8] rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-[#D6C4A8]/40">
              Gerakan Pelestarian Bersama
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F8F5EF]">
              Punya Cerita Budaya yang Belum Tercatat?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#D6C4A8]/90 leading-relaxed">
              Bergabunglah dengan ratusan komunitas adat, sanggar tari, dan pengrajin lokal untuk mendaftarkan dan memvalidasi khazanah budaya daerah Anda di BONATURA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/community"
                className="px-6 py-3.5 bg-[#B85C38] hover:bg-[#964728] text-[#F8F5EF] rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#2C1A14]/30 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Daftarkan Tradisi Komunitas
              </Link>
              <Link
                href="/ai-guide"
                className="px-6 py-3.5 bg-[#2C1A14]/70 hover:bg-[#2C1A14] text-[#D6C4A8] hover:text-[#F8F5EF] rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-[#D6C4A8]/30"
              >
                <Bot className="w-4 h-4" />
                Tanya AI Cultural Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}  
