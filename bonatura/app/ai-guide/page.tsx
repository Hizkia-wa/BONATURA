"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Send,
  HelpCircle,
  Lightbulb,
  Compass,
} from "lucide-react";
import { AI_KNOWLEDGE_BASE, AIAssistantDemo } from "@/lib/data";

export default function AIGuidePage() {
  const [aiQueryKey, setAiQueryKey] = useState<string>("megamendung");
  const [userCustomQuery, setUserCustomQuery] = useState<string>("");
  const [customAnswer, setCustomAnswer] = useState<AIAssistantDemo | null>(null);

  const handleAskAI = (key: string) => {
    setAiQueryKey(key);
    setCustomAnswer(null);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCustomQuery.trim()) return;

    setCustomAnswer({
      question: userCustomQuery,
      answer: `Berdasarkan database ontologi budaya BONATURA: Pertanyaan Anda mengenai "${userCustomQuery}" berkaitan erat dengan khazanah kearifan lokal Nusantara. Informasi ini diverifikasi dari katalog Balai Pelestarian Kebudayaan Kemendikbud dan dokumentasi kurator komunitas adat.`,
      sources: [
        "Database Pengetahuan Budaya BONATURA Terverifikasi",
        "Katalog Warisan Budaya Takbenda Nasional Kemendikbud",
      ],
      relatedReadings: [
        "Eksplorasi Lebih Lanjut di Peta Budaya Terkait",
        "Jelajah Sejarah Adat Daerah Bersangkutan",
      ],
    });
    setUserCustomQuery("");
  };

  const currentAIDisplay =
    customAnswer ||
    AI_KNOWLEDGE_BASE[aiQueryKey] ||
    AI_KNOWLEDGE_BASE.megamendung;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-3 bg-amber-100/70 px-3 py-1 rounded-full">
            <Bot className="w-4 h-4" />
            Fitur 3 — AI Cultural Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Tanya Jawab Pintar Berbasis Ontologi Budaya
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dapatkan pemahaman budaya yang mendalam, akurat, dan terhubung langsung dengan sumber rujukan sejarah yang tervalidasi serta rekomendasi bacaan ilmiah.
          </p>
        </div>

        {/* Main AI Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Preset question pills */}
          <div className="bg-stone-50 p-4 sm:p-5 border-b border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Pilih Topik Pertanyaan Populer:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskAI("megamendung")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiQueryKey === "megamendung" && !customAnswer
                    ? "bg-amber-700 text-white shadow-sm"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Makna Filosofis Batik Mega Mendung
              </button>
              <button
                onClick={() => handleAskAI("karapan")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiQueryKey === "karapan" && !customAnswer
                    ? "bg-amber-700 text-white shadow-sm"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Asal-usul Karapan Sapi Madura
              </button>
              <button
                onClick={() => handleAskAI("borobudur")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiQueryKey === "borobudur" && !customAnswer
                    ? "bg-amber-700 text-white shadow-sm"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Rencana 2 Hari di Candi Borobudur
              </button>
            </div>
          </div>

          {/* Chat QA Simulation Display */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* User Query bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-amber-800 text-white p-4 rounded-2xl rounded-tr-none text-xs sm:text-sm max-w-lg shadow-sm">
                <p className="font-semibold leading-relaxed">
                  {currentAIDisplay.question}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 text-xs font-bold shrink-0">
                Anda
              </div>
            </div>

            {/* AI Response Card */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 bg-stone-50 border border-stone-200 p-5 sm:p-7 rounded-2xl rounded-tl-none space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    BONATURA Cultural Intelligence
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Terverifikasi Ontologi
                  </span>
                </div>

                {/* Main textual answer */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {currentAIDisplay.answer}
                </p>

                {/* Referensi Sumber Jawaban */}
                <div className="pt-3 border-t border-stone-200/70">
                  <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Referensi Sumber Jawaban:
                  </span>
                  <div className="space-y-1.5">
                    {currentAIDisplay.sources.map((src, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{src}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rekomendasi Bacaan Terkait */}
                <div className="pt-2">
                  <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Rekomendasi Bacaan & Eksplorasi Terkait:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentAIDisplay.relatedReadings.map((reading, i) => (
                      <Link
                        key={i}
                        href="/discovery"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-[11px] text-amber-900 font-semibold hover:border-amber-400 hover:bg-amber-50/50 transition-colors shadow-xs"
                      >
                        <BookOpen className="w-3 h-3 text-amber-600" />
                        {reading}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Question Input Form */}
          <form
            onSubmit={handleCustomSubmit}
            className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={userCustomQuery}
              onChange={(e) => setUserCustomQuery(e.target.value)}
              placeholder="Ajukan pertanyaan seputar sejarah, filosofi, pantangan, atau makna tradisi..."
              className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              Tanyakan ke AI
            </button>
          </form>
        </div>

        {/* Feature Explainer Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Bebas Halusinasi
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Jawaban dibatasi pada korpus pengetahuan budaya yang divalidasi oleh balai pelestarian adat resmi.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <BookOpen className="w-5 h-5 text-amber-700 mb-2" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Transparansi Sitasi
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Setiap klaim sejarah menyertakan sitasi katalog WBTb atau arsip naskah kuno terkait.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <Compass className="w-5 h-5 text-amber-700 mb-2" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Terkoneksi Peta
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Bisa langsung mengarahkan Anda ke titik geografis tempat tradisi tersebut dipraktikkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

