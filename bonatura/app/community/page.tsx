"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  Sparkles,
  ShieldCheck,
  Building2,
  BookOpen,
} from "lucide-react";

export default function CommunityPage() {
  const [contributionTab, setContributionTab] = useState<"form" | "status">(
    "form"
  );
  const [subTitle, setSubTitle] = useState("");
  const [subCategory, setSubCategory] = useState("Seni Pertunjukan");
  const [subRegion, setSubRegion] = useState("");
  const [subCommunity, setSubCommunity] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const [submissions, setSubmissions] = useState([
    {
      id: "SUB-101",
      title: "Upacara Pasola Sumba Barat Daya",
      author: "Komunitas Marapu Sumba",
      date: "2 Nov 2026",
      status: "Menunggu",
    },
    {
      id: "SUB-102",
      title: "Motif Tenun Ikat Flores Sikka",
      author: "Sanggar Tenun Lepo Lorun",
      date: "1 Nov 2026",
      status: "Disetujui",
    },
    {
      id: "SUB-103",
      title: "Tari Perang Caci Manggarai",
      author: "Pemuda Adat Manggarai",
      date: "28 Okt 2026",
      status: "Menunggu",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: `SUB-${104 + submissions.length}`,
      title: subTitle,
      author: subCommunity || "Penggiat Budaya",
      date: "Hari Ini",
      status: "Menunggu",
    };
    setSubmissions([newEntry, ...submissions]);
    setSubSuccess(true);
    setSubTitle("");
    setSubRegion("");
    setSubCommunity("");
    setSubDesc("");
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-3 bg-amber-100/70 px-3 py-1 rounded-full">
            <Users className="w-4 h-4" />
            Fitur 4 — Community Contribution
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Keterlibatan Komunitas Penjaga Budaya
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Wadah partisipatif bagi sanggar seni, paguyuban adat, tetua desa, dan penggiat kebudayaan untuk mendaftarkan cerita tradisi lokal serta mengusulkan aktivitas budaya.
          </p>
        </div>

        {/* Main Card with Tabs */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-12">
          {/* Toggle Tab */}
          <div className="flex border-b border-stone-200">
            <button
              onClick={() => setContributionTab("form")}
              className={`flex-1 py-4 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
                contributionTab === "form"
                  ? "border-amber-700 text-amber-800 bg-amber-50/20"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              Form Pengiriman Cerita & Aktivitas
            </button>
            <button
              onClick={() => setContributionTab("status")}
              className={`flex-1 py-4 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
                contributionTab === "status"
                  ? "border-amber-700 text-amber-800 bg-amber-50/20"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              Pelacak Status Pengajuan ({submissions.length})
            </button>
          </div>

          {/* TAB CONTENT: FORM */}
          {contributionTab === "form" && (
            <div className="p-6 sm:p-8">
              {subSuccess ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">
                    Pengajuan Cerita Budaya Berhasil Dikirim!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Data Anda telah tercatat dan masuk ke antrean verifikasi tim kurator serta admin BONATURA. Anda dapat memantau statusnya di tab &quot;Pelacak Status Pengajuan&quot;.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={() => setSubSuccess(false)}
                      className="px-4 py-2.5 text-xs font-semibold bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition-colors"
                    >
                      Kirim Cerita Lainnya
                    </button>
                    <button
                      onClick={() => setContributionTab("status")}
                      className="px-4 py-2.5 text-xs font-semibold bg-white text-emerald-900 border border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      Buka Pelacak Status
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Nama Budaya / Tradisi Adat
                      </label>
                      <input
                        type="text"
                        required
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="Contoh: Upacara Nelayan Labuhan Merapi"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Kategori Budaya
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                      >
                        <option>Seni Pertunjukan</option>
                        <option>Tradisi & Ritual Adat</option>
                        <option>Kriya & Seni Rupa</option>
                        <option>Kuliner Warisan</option>
                        <option>Arsitektur Tradisional</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Asal Daerah (Kabupaten / Provinsi)
                      </label>
                      <input
                        type="text"
                        required
                        value={subRegion}
                        onChange={(e) => setSubRegion(e.target.value)}
                        placeholder="Contoh: Sleman, D.I. Yogyakarta"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Profil Komunitas / Sanggar Pengusul
                      </label>
                      <input
                        type="text"
                        required
                        value={subCommunity}
                        onChange={(e) => setSubCommunity(e.target.value)}
                        placeholder="Nama Sanggar Adat / Paguyuban Anda"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Narasi Sejarah, Makna Filosofis, & Usulan Aktivitas
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                      placeholder="Ceritakan latar belakang sejarah tradisi, filosofi yang terkandung, serta jenis kegiatan yang bisa diikuti masyarakat umum (seperti workshop, pagelaran terbuka, dll)..."
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-800/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Kirimkan Cerita Budaya untuk Ditinjau
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB CONTENT: STATUS TRACKER */}
          {contributionTab === "status" && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs text-stone-500">
                  Daftar pengajuan terkini dan status hasil verifikasi kurator:
                </span>
                <span className="text-xs font-bold text-amber-800">
                  Total: {submissions.length} Pengajuan
                </span>
              </div>

              <div className="space-y-3">
                {submissions.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                          {item.id}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-xs text-stone-500 mt-1 block">
                        Oleh: {item.author} • Diajukan: {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-3 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5 ${
                          item.status === "Disetujui"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Ditolak"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status === "Disetujui" && (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        {item.status === "Menunggu" && (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {item.status === "Ditolak" && (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-2">
            <Building2 className="w-6 h-6 text-amber-700" />
            <h4 className="text-sm font-bold text-stone-900">
              Pengakuan Komunitas Resmi
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Profil paguyuban dan sanggar Anda akan terdaftar sebagai penjaga resmi warisan budaya takbenda nusantara.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="text-sm font-bold text-stone-900">
              Perlindungan Hak Budaya
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Dokumentasi terstruktur mencegah klaim sepihak dan mendukung pengajuan inventarisasi resmi cagar budaya.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-2">
            <Sparkles className="w-6 h-6 text-amber-700" />
            <h4 className="text-sm font-bold text-stone-900">
              Dampak Ekonomi Wisata Adat
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Aktivitas budaya sanggar Anda dapat diakses dan dikunjungi langsung oleh para penjelajah dari berbagai penjuru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

