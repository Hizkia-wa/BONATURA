"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Database,
  Users,
  BookOpen,
  ArrowLeft,
  Plus,
  Compass,
} from "lucide-react";
import { CULTURAL_ELEMENTS } from "@/lib/data";

export default function AdminPage() {
  const [adminTab, setAdminTab] = useState<"verify" | "content" | "community">(
    "verify"
  );
  const [contributions, setContributions] = useState([
    {
      id: "SUB-101",
      title: "Upacara Pasola Sumba Barat Daya",
      author: "Komunitas Marapu Sumba",
      date: "2 Nov 2026",
      status: "Menunggu",
      region: "Nusa Tenggara Timur",
    },
    {
      id: "SUB-102",
      title: "Motif Tenun Ikat Flores Sikka",
      author: "Sanggar Tenun Lepo Lorun",
      date: "1 Nov 2026",
      status: "Disetujui",
      region: "Flores, NTT",
    },
    {
      id: "SUB-103",
      title: "Tari Perang Caci Manggarai",
      author: "Pemuda Adat Manggarai",
      date: "28 Okt 2026",
      status: "Menunggu",
      region: "Manggarai, NTT",
    },
  ]);

  const handleReviewAction = (id: string, newStatus: string) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const pendingCount = contributions.filter((c) => c.status === "Menunggu").length;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Link & Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-800 text-white rounded-2xl shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Admin Portal BONATURA
                </h1>
                <p className="text-xs sm:text-sm text-stone-500">
                  Pusat Tata Kelola Data Kebudayaan, Verifikasi Kuratorial, & Mitigasi Pengetahuan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Sistem Aktif & Terlindungi
            </span>
          </div>
        </div>

        {/* Dashboard Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex bg-stone-100/70 border-b border-stone-200 px-6 pt-4 gap-4 overflow-x-auto">
            <button
              onClick={() => setAdminTab("verify")}
              className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                adminTab === "verify"
                  ? "border-amber-700 text-amber-800"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Verifikasi Kontribusi ({pendingCount})
            </button>
            <button
              onClick={() => setAdminTab("content")}
              className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                adminTab === "content"
                  ? "border-amber-700 text-amber-800"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              <Database className="w-4 h-4" />
              Kelola Master Data Budaya
            </button>
            <button
              onClick={() => setAdminTab("community")}
              className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                adminTab === "community"
                  ? "border-amber-700 text-amber-800"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              <Users className="w-4 h-4" />
              Komunitas & Referensi
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            {/* TAB 1: VERIFIKASI */}
            {adminTab === "verify" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="text-xs sm:text-sm text-stone-600">
                    Tinjau pengajuan baru dari kontributor komunitas untuk menjaga akurasi & integritas data:
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    {pendingCount} Menunggu Tindakan
                  </span>
                </div>

                <div className="space-y-3">
                  {contributions.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                            {item.id}
                          </span>
                          <h3 className="text-sm font-bold text-stone-900">
                            {item.title}
                          </h3>
                        </div>
                        <span className="text-xs text-stone-500 mt-1 block">
                          Pengusul: {item.author} ({item.region}) • Diajukan: {item.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.status === "Menunggu" ? (
                          <>
                            <button
                              onClick={() => handleReviewAction(item.id, "Disetujui")}
                              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Setujui
                            </button>
                            <button
                              onClick={() => handleReviewAction(item.id, "Ditolak")}
                              className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Tolak
                            </button>
                          </>
                        ) : (
                          <span
                            className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                              item.status === "Disetujui"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            Status: {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MASTER DATA */}
            {adminTab === "content" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      Database Master Elemen Budaya (1.240 Entri Terdaftar)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Data tersinkronisasi dengan relasi graf ontologi PostgreSQL.
                    </p>
                  </div>
                  <button className="px-4 py-2 text-xs font-bold bg-amber-700 text-white rounded-xl hover:bg-amber-800 flex items-center gap-1.5 shadow-xs">
                    <Plus className="w-4 h-4" />
                    Tambah Elemen Budaya
                  </button>
                </div>

                <div className="space-y-2.5">
                  {CULTURAL_ELEMENTS.map((el) => (
                    <div
                      key={el.id}
                      className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={el.imageUrl}
                          alt={el.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-stone-900 text-sm block">
                            {el.name}
                          </span>
                          <span className="text-stone-500">
                            {el.category} • {el.region}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg">
                          Edit Data
                        </button>
                        <button className="px-3 py-1.5 text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg">
                          Lihat Graf Relasi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: KOMUNITAS & REFERENSI */}
            {adminTab === "community" && (
              <div className="space-y-6">
                <p className="text-xs sm:text-sm text-stone-600">
                  Manajemen kemitraan komunitas adat serta sitasi katalog rujukan ilmiah:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-700 block">
                      Mitra Lembaga Adat
                    </span>
                    <span className="text-3xl font-extrabold text-amber-800 block">
                      128
                    </span>
                    <span className="text-xs text-stone-500 block">
                      MOU & Kemitraan Pelestarian Budaya
                    </span>
                  </div>

                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-700 block">
                      Katalog Rujukan Ilmiah
                    </span>
                    <span className="text-3xl font-extrabold text-amber-800 block">
                      3.450
                    </span>
                    <span className="text-xs text-stone-500 block">
                      Buku, Jurnal & Dokumen Cagar Budaya
                    </span>
                  </div>

                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-stone-700 block">
                      Kurator Terverifikasi
                    </span>
                    <span className="text-3xl font-extrabold text-amber-800 block">
                      42
                    </span>
                    <span className="text-xs text-stone-500 block">
                      Pakar Antropologi & Tetua Adat
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

