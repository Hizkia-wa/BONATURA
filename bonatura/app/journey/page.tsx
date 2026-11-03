"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Route,
  Check,
  CheckCircle2,
  Bookmark,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Share2,
} from "lucide-react";

export default function JourneyPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Arsitektur Kuno",
    "Kuliner Tradisional",
  ]);
  const [journeySaved, setJourneySaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const availableInterests = [
    "Seni Tari & Pertunjukan",
    "Arsitektur Kuno",
    "Kuliner Tradisional",
    "Kriya & Tekstil Adat",
    "Ritual & Upacara Adat",
    "Eksplorasi Desa Adat",
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-3 bg-amber-100/70 px-3 py-1 rounded-full">
            <Route className="w-4 h-4" />
            Fitur 5 — Personalized Cultural Journey
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Rancang Rencana Perjalanan Budaya Pribadi
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Sesuaikan rencana perjalanan wisata budaya Anda berdasarkan minat tematik, lama kunjungan, dan preferensi aktivitas otentik bersama warga lokal.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1: Select Interests */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Langkah 1: Preferensi
              </span>
              <h2 className="text-xl font-bold text-stone-900">
                Pilih Minat Budaya Anda
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Pilih satu atau lebih kategori untuk menyesuaikan jadwal dan rute destinasi yang disarankan:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableInterests.map((interest) => {
                const active = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3.5 text-left rounded-2xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      active
                        ? "bg-amber-100/70 border-amber-500 text-amber-950 font-bold ring-1 ring-amber-400/40"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <span>{interest}</span>
                    {active ? (
                      <Check className="w-4 h-4 text-amber-800 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium">
                {selectedInterests.length} Minat Dipilih
              </span>
              <button
                onClick={() =>
                  setSelectedInterests([
                    "Seni Tari & Pertunjukan",
                    "Kuliner Tradisional",
                  ])
                }
                className="text-amber-800 hover:underline font-semibold"
              >
                Reset Default
              </button>
            </div>

            {/* Quick Trip Tips */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Tips Perjalanan Berkelanjutan:
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Selalu kenakan pakaian yang sopan saat memasuki situs religi atau desa adat, serta mintalah izin sebelum memotret ritual sakral.
              </p>
            </div>
          </div>

          {/* Step 2 & 3: Itinerary Output & Action */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  Langkah 2: Rekomendasi Rute
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  Itinerary 3 Hari: Pesona Warisan Budaya Jawa
                </h3>
                <span className="text-xs text-stone-500 block mt-1">
                  Wilayah: Magelang, D.I. Yogyakarta & Surakarta
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 text-xs font-semibold rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center gap-1.5 transition-colors"
                  title="Bagikan Itinerary"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {copiedLink ? "Disalin!" : "Bagikan"}
                  </span>
                </button>
                <button
                  onClick={() => setJourneySaved(!journeySaved)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm ${
                    journeySaved
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-700 hover:bg-amber-800 text-white"
                  }`}
                >
                  {journeySaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Tersimpan di Profil
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      Simpan Rencana
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Structured Itinerary Timeline */}
            <div className="space-y-4">
              {/* Day 1 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 relative pl-14">
                <div className="absolute left-4 top-5 w-7 h-7 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  1
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 1: Penjelajahan Relief Candi & Sentra Kerajinan Kuno
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Magelang - Kulon Progo
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Eksplorasi relief Candi Borobudur saat fajar, dialog makna relief Lalitavistara, disusul workshop membatik canting tulis di desa wisata Klipoh.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Tur Relief Sejarah
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Kuliner Mangut Beong
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Workshop Gerabah
                    </span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 relative pl-14">
                <div className="absolute left-4 top-5 w-7 h-7 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  2
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 2: Keraton Adat & Seni Kriya Pusaka Logam
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Pusat Budaya Yogyakarta
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Menyaksikan pertunjukan gamelan di Bangsal Sri Manganti Keraton Yogyakarta, dilanjutkan silaturahmi ke bengkel Empu Pembuat Keris pusaka di Kotagede.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Workshop Pusaka Keris
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Kuliner Gudeg Yu Djum
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Arsitektur Tamansari
                    </span>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 relative pl-14">
                <div className="absolute left-4 top-5 w-7 h-7 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  3
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 3: Candi Perambanan & Sendratari Agung Ramayana
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Kompleks Prambanan
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Kunjungan arsitektur Candi Sewu dan Candi Prambanan, diakhiri dengan pertunjukan megah Sendratari Ramayana berlatar candi bermandikan tata cahaya malam.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Pagelaran Tari Ramayana
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Fotografi Heritage
                    </span>
                    <span className="px-2.5 py-1 bg-amber-100 rounded-lg">
                      Soto Kadipiro
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                Memerlukan pemandu lokal bersertifikat untuk rute ini?
              </span>
              <Link
                href="/community"
                className="text-xs font-bold text-amber-800 hover:text-amber-900 underline"
              >
                Hubungi Paguyuban Komunitas Pemandu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

