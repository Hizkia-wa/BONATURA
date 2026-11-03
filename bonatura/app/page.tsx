"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Bot,
  Users,
  Route,
  ShieldCheck,
  Search,
  Sparkles,
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  Bookmark,
  Share2,
  Info,
  Check,
  ChevronDown,
  Layers,
  Heart,
  Eye,
  SlidersHorizontal,
  X,
} from "lucide-react";

// --- DUMMY DATA SEED ---
interface CulturalElement {
  id: string;
  name: string;
  category: string;
  region: string;
  imageUrl: string;
  shortDesc: string;
  history: string;
  philosophy: string;
  sources: string[];
  relatedElements: { id: string; name: string; region: string }[];
}

const CULTURAL_ELEMENTS: CulturalElement[] = [
  {
    id: "tari-saman",
    name: "Tari Saman Gayo",
    category: "Seni Tari & Pertunjukan",
    region: "Aceh (Gayo Lues)",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Tarian ritmis serentak yang memadukan kekompakan gerakan tepukan dada dan tangan tanpa alat musik.",
    history:
      "Dikembangkan oleh Syekh Saman pada abad ke-14 Masehi sebagai media dakwah Islam. Diakui sebagai Warisan Budaya Takbenda UNESCO pada tahun 2011.",
    philosophy:
      "Melambangkan tingginya nilai kebersamaan, persatuan, kedisiplinan, ketundukan spiritual, serta penghormatan mendalam terhadap adat dan agama.",
    sources: [
      "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (WBTb No. Reg: 20110001)",
      "UNESCO Representative List of the Intangible Cultural Heritage of Humanity",
    ],
    relatedElements: [
      { id: "seudati", name: "Tari Seudati", region: "Aceh" },
      { id: "didong", name: "Kesenian Didong Gayo", region: "Aceh Tengah" },
    ],
  },
  {
    id: "rumah-gadang",
    name: "Arsitektur Rumah Gadang",
    category: "Arsitektur & Rumah Adat",
    region: "Sumatera Barat (Minangkabau)",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Rumah adat Minangkabau dengan atap gonjong menjulang melengkung menyerupai tanduk kerbau.",
    history:
      "Arsitektur vernakular yang dirancang tahan gempa dengan sistem sambungan pasak kayu elastis tanpa paku logam, telah ada sejak berabad-abad lalu.",
    philosophy:
      "Konsep gonjong merefleksikan aspirasi menjangkau Tuhan dan penghormatan pada kerbau sebagai simbol kegigihan serta garis kekerabatan matrilineal.",
    sources: [
      "Balai Pelestarian Kebudayaan Wilayah III Sumatera Barat",
      "Kajian Arsitektur Tradisional Minangkabau (Puslitbang Kemendikbud)",
    ],
    relatedElements: [
      { id: "songket-pandai-sikek", name: "Songket Pandai Sikek", region: "Sumatera Barat" },
      { id: "randai", name: "Teater Tradisional Randai", region: "Sumatera Barat" },
    ],
  },
  {
    id: "keris-nusantara",
    name: "Keris Jawa Tradisional",
    category: "Kriya & Senjata Tradisional",
    region: "Jawa Tengah & D.I. Yogyakarta",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Senjata tikam berbilah asimetris bermotif pamor yang sarat muatan spiritual dan seni metalurgi kuno.",
    history:
      "Jejak pembuatan keris telah terlihat sejak abad ke-9 pada relief Candi Prambanan dan Candi Sukuh. Ditetapkan UNESCO sebagai Karya Agung Warisan Lisan dan Takbenda Manusia pada 2005.",
    philosophy:
      "Pamor keris merupakan doa dan simbol harapan sang Empu untuk pemiliknya. Keris melambangkan kearifan, kepemimpinan, dan keseimbangan mikrokosmos-makrokosmos.",
    sources: [
      "UNESCO Masterpiece of Oral and Intangible Heritage of Humanity (2005)",
      "Museum Keris Nusantara Surakarta",
    ],
    relatedElements: [
      { id: "batik-tulis", name: "Batik Tulis Klasik", region: "Yogyakarta & Surakarta" },
      { id: "gamelan", name: "Ensembel Gamelan", region: "Jawa & Bali" },
    ],
  },
  {
    id: "upacara-rambu-solo",
    name: "Rambu Solo' Tana Toraja",
    category: "Tradisi & Ritual Adat",
    region: "Sulawesi Selatan (Tana Toraja)",
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Upacara pemakaman adat adiluhung suku Toraja untuk menghantarkan arwah leluhur menuju Puya.",
    history:
      "Telah dipertahankan secara turun-temurun berabad-abad dalam keyakinan Aluk Todolo, melibatkan ritual persembahan kerbau belang (Tedong Bonga) dan tari Ma'badong.",
    philosophy:
      "Bagi masyarakat Toraja, kematian bukanlah akhir perpisahan melainkan peralihan status roh menuju alam kesempurnaan dan menjaga martabat ikatan kekerabatan keluarga.",
    sources: [
      "Dinas Kebudayaan dan Kepariwisataan Kabupaten Tana Toraja",
      "Inventarisasi Komunitas Adat Aluk Todolo",
    ],
    relatedElements: [
      { id: "tongkonan", name: "Rumah Adat Tongkonan", region: "Toraja" },
      { id: "tenun-toraja", name: "Kain Tenun Sa'dan Toraja", region: "Toraja Utara" },
    ],
  },
  {
    id: "rendang-minang",
    name: "Rendang Daging Tradisional",
    category: "Kuliner Tradisional",
    region: "Sumatera Barat",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Sajian kuliner daging rempah perlahan dengan santan kelapa yang dimasak berjam-jam hingga hitam pekat.",
    history:
      "Catatan musafir abad ke-16 telah mencatat makanan awet yang dibawa para saudagar Minang berlayar mengarungi Selat Malaka.",
    philosophy:
      "Rendang mengandung 4 pilar filosofis Minangkabau: D'lima (daging/niniak mamak), Karambia (kelapa/cadiak pandai), Lado (cabai/alim ulama), dan Pemasak (rempah/kesatuan masyarakat).",
    sources: [
      "Warisan Budaya Takbenda Indonesia 2013 (Kemendikbud)",
      "Buku Gastronomi Tradisional Minangkabau",
    ],
    relatedElements: [
      { id: "makan-bajamba", name: "Tradisi Makan Bajamba", region: "Minangkabau" },
    ],
  },
];

interface DestinationPin {
  id: string;
  name: string;
  province: string;
  coordinates: string;
  description: string;
  culturalElements: string[];
  activities: string[];
}

const DESTINATION_PINS: DestinationPin[] = [
  {
    id: "borobudur",
    name: "Kawasan Candi Borobudur",
    province: "Jawa Tengah (Magelang)",
    coordinates: "7.6079° S, 110.2038° E",
    description:
      "Mahakarya candi Buddha terbesar di dunia dari dinasti Syailendra abad ke-8, dikelilingi perbukitan Menoreh dan desa-desa pengrajin gerabah.",
    culturalElements: ["Arsitektur Pahatan Relief Karmawibhangga", "Penyulingan Minyak Atsiri Desa Klipoh", "Batik Motif Borobudur"],
    activities: [
      "Tur Filosofi Relief bersama Pemandu Budaya",
      "Workshop Pembuatan Gerabah Tradisional Klipoh",
      "Meditasi Fajar Borobudur & Jelajah Desa Candirejo",
    ],
  },
  {
    id: "penglipuran",
    name: "Desa Adat Penglipuran",
    province: "Bali (Bangli)",
    coordinates: "8.4526° S, 115.3584° E",
    description:
      "Desa adat Bali pemenang penghargaan lingkungan dunia yang mempertahankan tata ruang Tri Hita Karana dan hutan bambu sakral.",
    culturalElements: ["Tata Ruang Tradisional Sanga Mandala", "Arsitektur Angkul-angkul Bambu", "Tradisi Loloh Cemcem"],
    activities: [
      "Menginap di Rumah Warga (Live-in Adat)",
      "Eksplorasi Hutan Bambu Lindung",
      "Praktik Meracik Jamu Loloh Cemcem Tradisional",
    ],
  },
  {
    id: "kete-kesu",
    name: "Desa Adat Kete Kesu",
    province: "Sulawesi Selatan (Toraja)",
    coordinates: "2.9866° S, 119.9145° E",
    description:
      "Kawasan cagar budaya Toraja tertua dengan deretan rumah Tongkonan megah berukir, lumbung padi kuno, dan makam gantung tebing batu karang.",
    culturalElements: ["Arsitektur Tongkonan & Alang Sura", "Seni Ukir Pa'ssura", "Makam Gantung Erong & Patung Tau-Tau"],
    activities: [
      "Belajar Seni Ukir Kayu Motif Toraja Pa'tedong",
      "Menyaksikan Ritual Musik Bambu Pa'pompang",
      "Jelajah Arkeologi Kubur Batu Kuno",
    ],
  },
  {
    id: "danau-toba",
    name: "Lembah Bakkara & Samosir",
    province: "Sumatera Utara",
    coordinates: "2.6121° N, 98.6638° E",
    description:
      "Pusat peradaban luhur suku Batak Toba dan tanah kelahiran Raja Sisingamangaraja, kaya akan tenun ulos dan arsitektur Ruma Bolon.",
    culturalElements: ["Tenun Ulos Huta Raja", "Arsitektur Rumah Adat Bolon", "Seni Musik Tradisional Gondang Sabangunan"],
    activities: [
      "Mengikuti Tenun Ulos Tradisional bersama Maestro Penenun",
      "Menari Bersama Patung Sigale-gale di Tomok",
      "Ziarah Sejarah Lembah Bakkara & Mata Air Aek Sipangolu",
    ],
  },
];

interface AIAssistantDemo {
  question: string;
  answer: string;
  sources: string[];
  relatedReadings: string[];
}

const AI_KNOWLEDGE_BASE: Record<string, AIAssistantDemo> = {
  megamendung: {
    question: "Apa makna filosofis motif Batik Mega Mendung dari Cirebon?",
    answer:
      "Motif Mega Mendung melambangkan bentuk awan yang bergradasi 7 lapisan warna. Filosofi utamanya adalah tentang kesabaran, kepala dingin, dan ketenangan jiwa manusia dalam menghadapi gejolak emosi—sebagaimana awan pembawa hujan yang menyejukkan bumi yang tandus. Motif ini juga mencerminkan asimilasi harmonis antara kebudayaan Tiongkok (awan Taois) dengan nilai spiritual Kesultanan Cirebon.",
    sources: [
      "Kajian Batik Tradisional Pesisir (Balai Besar Kerajinan dan Batik)",
      "Inventarisasi Budaya Keraton Kasepuhan Cirebon (Kemendikbud)",
    ],
    relatedReadings: [
      "Sejarah Akulturasi Budaya Tiongkok-Jawa di Pesisir Utara",
      "Teknik Pewarnaan Alami Indigofera pada Batik Trusmi",
    ],
  },
  karapan: {
    question: "Bagaimana asal-usul dan aturan adat dalam Karapan Sapi Madura?",
    answer:
      "Karapan Sapi berakar dari kearifan bertani masyarakat Madura untuk membajak sawah gersang secara efisien yang dirintis oleh Kyai Katandur pada abad ke-13. Seiring waktu, tradisi ini bertransformasi menjadi pesta rakyat adu pacu sepasang sapi jantan yang dihias (Sapi Sono') sebagai simbol harga diri, kerja keras, dan martabat peternak Madura.",
    sources: [
      "Dinas Pariwisata dan Kebudayaan Provinsi Jawa Timur",
      "Warisan Budaya Takbenda Indonesia Kemendikbud",
    ],
    relatedReadings: [
      "Ritual Doa dan Jamu Herbal untuk Pemeliharaan Sapi Karapan",
      "Alat Musik Sronen Pengiring Lomba Karapan",
    ],
  },
  borobudur: {
    question: "Rekomendasikan destinasi budaya di sekitar Borobudur untuk 2 hari.",
    answer:
      "Hari 1: Kunjungi Kompleks Candi Pawon dan Candi Mendut di pagi hari, lalu ikuti tur interpretasi filosofi relief Lalitavistara di Candi Borobudur saat senja. Malam hari nikmati seni musik gamelan desa.\nHari 2: Sambangi Desa Wisata Candirejo dengan andong lokal, ikuti workshop pembuatan gerabah di Desa Klipoh, dan akhiri dengan menikmati panorama perbukitan Menoreh di Punthuk Setumbu.",
    sources: [
      "Balai Konservasi Borobudur",
      "Pola Perjalanan Wisata Budaya Kawasan Strategis Pariwisata Nasional Borobudur",
    ],
    relatedReadings: [
      "Menelusuri Desa-Desa Pengrajin Penyangga Borobudur",
      "Makna Kamadhatu, Rupadhatu, dan Arupadhatu Candi Borobudur",
    ],
  },
};

export default function HomePage() {
  // --- STATES ---
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCultureModal, setActiveCultureModal] = useState<CulturalElement | null>(null);
  const [selectedPin, setSelectedPin] = useState<DestinationPin>(DESTINATION_PINS[0]);

  // AI Assistant States
  const [aiQueryKey, setAiQueryKey] = useState<string>("megamendung");
  const [userCustomQuery, setUserCustomQuery] = useState<string>("");
  const [customAnswer, setCustomAnswer] = useState<AIAssistantDemo | null>(null);

  // Community Submission Form States
  const [subTitle, setSubTitle] = useState("");
  const [subCategory, setSubCategory] = useState("Seni Pertunjukan");
  const [subRegion, setSubRegion] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);
  const [contributionTab, setContributionTab] = useState<"form" | "status">("form");

  // Personalized Journey Planner States
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Arsitektur Kuno", "Kuliner Tradisional"]);
  const [journeySaved, setJourneySaved] = useState(false);

  // Admin Modal Preview
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<"verify" | "content" | "community">("verify");
  const [mockContributions, setMockContributions] = useState([
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

  // --- FILTERED DATA ---
  const categories = ["Semua", "Seni Tari & Pertunjukan", "Arsitektur & Rumah Adat", "Kriya & Senjata Tradisional", "Tradisi & Ritual Adat", "Kuliner Tradisional"];

  const filteredElements = CULTURAL_ELEMENTS.filter((item) => {
    const matchesCat = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle AI Submission
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
      sources: ["Database Pengetahuan Budaya BONATURA Terverifikasi", "Katalog Warisan Budaya Takbenda Nasional"],
      relatedReadings: ["Eksplorasi Lebih Lanjut di Peta Budaya Terkait", "Jelajah Sejarah Adat Daerah Bersangkutan"],
    });
    setUserCustomQuery("");
  };

  // Handle Interest Toggle
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Handle Admin Review
  const handleReviewAction = (id: string, newStatus: string) => {
    setMockContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const currentAIDisplay = customAnswer || AI_KNOWLEDGE_BASE[aiQueryKey] || AI_KNOWLEDGE_BASE.megamendung;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* ============================================================== */}
      {/* 1. NAVBAR                                                     */}
      {/* ============================================================== */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/10">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-stone-900">
                  BONA<span className="text-amber-700">TURA</span>
                </span>
                <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-amber-800/80 uppercase">
                  Discover Culture, Experience Heritage
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
              <a href="#discovery" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                Discovery
              </a>
              <a href="#map" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                Cultural Map
              </a>
              <a href="#ai-guide" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-amber-600" />
                AI Guide
              </a>
              <a href="#journey" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <Route className="w-4 h-4 text-amber-600" />
                Journey
              </a>
              <a href="#community" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                Komunitas
              </a>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 border border-stone-200"
              >
                <ShieldCheck className="w-4 h-4 text-stone-600" />
                Admin Portal
              </button>
              <a
                href="#discovery"
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm shadow-amber-800/20 transition-all flex items-center gap-1.5"
              >
                Mulai Eksplorasi
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                                */}
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
            <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200">
              <Search className="w-5 h-5 text-stone-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tari tradisional, senjata pusaka, kuliner, upacara adat..."
                className="w-full px-4 py-3 text-sm text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => {
                  const el = document.getElementById("discovery");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-3 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-all shadow-md shadow-amber-800/20 whitespace-nowrap"
              >
                Cari Budaya
              </button>
            </div>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-white/80 rounded-xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">1.200+</span>
              <span className="text-xs text-stone-500 font-medium">Elemen Budaya Terdata</span>
            </div>
            <div className="p-4 bg-white/80 rounded-xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">38</span>
              <span className="text-xs text-stone-500 font-medium">Provinsi Nusantara</span>
            </div>
            <div className="p-4 bg-white/80 rounded-xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">500+</span>
              <span className="text-xs text-stone-500 font-medium">Komunitas Budaya</span>
            </div>
            <div className="p-4 bg-white/80 rounded-xl border border-stone-200 shadow-sm">
              <span className="block text-2xl font-bold text-amber-800">100%</span>
              <span className="text-xs text-stone-500 font-medium">Sumber Terverifikasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FITUR 1: CULTURAL DISCOVERY                                 */}
      {/* ============================================================== */}
      <section id="discovery" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
              <Compass className="w-4 h-4" />
              Fitur 1 — Cultural Discovery
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Eksplorasi Budaya Nusantara
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Telusuri ragam seni tari, arsitektur pusaka, tradisi sakral, dan kuliner otentik lengkap dengan sejarah mendalam serta filosofi aslinya.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-800 text-white shadow-sm"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElements.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold rounded-md">
                  {item.category}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-900/90 backdrop-blur-sm text-white text-[11px] font-semibold rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.region}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveCultureModal(item)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 group/btn"
                  >
                    Lihat Detail & Filosofi
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {item.relatedElements.length} Budaya Terkait
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAIL MODAL FOR CULTURAL DISCOVERY */}
      {activeCultureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="relative h-64 w-full">
              <img
                src={activeCultureModal.imageUrl}
                alt={activeCultureModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveCultureModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 bg-amber-600 text-white text-xs font-bold rounded-md">
                  {activeCultureModal.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeCultureModal.name}
                </h3>
                <p className="text-xs text-stone-200 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {activeCultureModal.region}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Sejarah */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-4 h-4" />
                  Sejarah & Asal-usul
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                  {activeCultureModal.history}
                </p>
              </div>

              {/* Filosofi */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4" />
                  Makna & Filosofi Mendalam
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                  {activeCultureModal.philosophy}
                </p>
              </div>

              {/* Sumber Referensi */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                  <Info className="w-4 h-4" />
                  Sumber & Rujukan Resmi
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {activeCultureModal.sources.map((src, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rekomendasi Budaya Terkait */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  Rekomendasi Budaya Terkait
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCultureModal.relatedElements.map((rel) => (
                    <div
                      key={rel.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="block text-xs font-bold text-stone-800">{rel.name}</span>
                        <span className="text-[11px] text-stone-500">{rel.region}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. FITUR 2: CULTURAL MAP                                       */}
      {/* ============================================================== */}
      <section id="map" className="py-20 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
              <MapPin className="w-4 h-4" />
              Fitur 2 — Cultural Map
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Peta Lokasi Budaya & Destinasi
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              Temukan titik lokasi situs budaya nusantara, pelajari latar belakang historisnya, serta eksplorasi aktivitas budaya yang dapat diikuti secara langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Map Visual Simulator */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-stone-700">Peta Interaktif Destinasi Terverifikasi</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">Pilih titik destinasi</span>
              </div>

              {/* Map Canvas Representation */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* SVG Archipelago map background contour */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Simulated Pins */}
                <div className="relative z-10 w-full h-full">
                  {DESTINATION_PINS.map((pin, idx) => {
                    const isSelected = selectedPin.id === pin.id;
                    const positions = [
                      "top-1/4 left-1/4",
                      "bottom-1/3 left-1/2",
                      "top-1/2 right-1/3",
                      "top-1/6 left-1/6",
                    ];
                    return (
                      <button
                        key={pin.id}
                        onClick={() => setSelectedPin(pin)}
                        className={`absolute ${positions[idx % positions.length]} transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none`}
                      >
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg ${
                            isSelected
                              ? "bg-amber-500 text-stone-950 ring-4 ring-amber-400/40 scale-110"
                              : "bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600"
                          }`}
                        >
                          <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-stone-950" : "text-amber-400"}`} />
                          <span>{pin.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="relative z-10 flex items-center justify-between text-stone-400 text-[11px] pt-4 border-t border-stone-700/50">
                  <span>Sistem Koordinat Geografis WGS84</span>
                  <span>4 Destinasi Unggulan Terpilih</span>
                </div>
              </div>

              {/* Destination selector chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {DESTINATION_PINS.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className={`p-2.5 text-left rounded-xl text-xs font-semibold border transition-all ${
                      selectedPin.id === pin.id
                        ? "bg-amber-50 border-amber-400 text-amber-900 shadow-sm"
                        : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span className="block truncate">{pin.name}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{pin.province.split("(")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Detail Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-md">
                  {selectedPin.province}
                </span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2">
                  {selectedPin.name}
                </h3>
                <span className="text-xs font-mono text-stone-400 block mt-1">
                  Koordinat: {selectedPin.coordinates}
                </span>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {selectedPin.description}
                </p>
              </div>

              {/* Budaya Terkait Lokasi */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2.5">
                  <Compass className="w-3.5 h-3.5" />
                  Budaya Terkait Lokasi Ini
                </h4>
                <div className="space-y-1.5">
                  {selectedPin.culturalElements.map((elem, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{elem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aktivitas Terkait Lokasi */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Aktivitas Pengalaman Budaya
                </h4>
                <div className="space-y-1.5">
                  {selectedPin.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FITUR 3: AI CULTURAL GUIDE                                  */}
      {/* ============================================================== */}
      <section id="ai-guide" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
            <Bot className="w-4 h-4" />
            Fitur 3 — AI Cultural Guide
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Tanya Jawab Pintar Berbasis Pengetahuan
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            Dapatkan pemahaman budaya yang komprehensif, terhubung langsung dengan sumber rujukan sejarah yang tervalidasi dan rekomendasi bacaan terpercaya.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Preset question pills */}
          <div className="bg-stone-50 p-4 border-b border-stone-200">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Pertanyaan Cepat Rekomendasi:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskAI("megamendung")}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  aiQueryKey === "megamendung" && !customAnswer
                    ? "bg-amber-700 text-white"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Makna Batik Mega Mendung
              </button>
              <button
                onClick={() => handleAskAI("karapan")}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  aiQueryKey === "karapan" && !customAnswer
                    ? "bg-amber-700 text-white"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Asal-usul Karapan Sapi
              </button>
              <button
                onClick={() => handleAskAI("borobudur")}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  aiQueryKey === "borobudur" && !customAnswer
                    ? "bg-amber-700 text-white"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                Rencana 2 Hari di Borobudur
              </button>
            </div>
          </div>

          {/* Chat QA Simulation Display */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* User Query bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-amber-700 text-white p-4 rounded-2xl rounded-tr-none text-xs sm:text-sm max-w-lg shadow-sm">
                <p className="font-medium">{currentAIDisplay.question}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 text-xs font-bold shrink-0">
                Anda
              </div>
            </div>

            {/* AI Response Card */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 bg-stone-50 border border-stone-200 p-5 sm:p-6 rounded-2xl rounded-tl-none space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    BONATURA Cultural Intelligence
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">Validasi Ontologi Budaya</span>
                </div>

                {/* Main textual answer */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {currentAIDisplay.answer}
                </p>

                {/* Referensi Sumber Jawaban */}
                <div className="pt-3 border-t border-stone-200/60">
                  <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Referensi Sumber Jawaban:
                  </span>
                  <div className="space-y-1">
                    {currentAIDisplay.sources.map((src, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{src}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rekomendasi Bacaan Terkait */}
                <div className="pt-2">
                  <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Rekomendasi Bacaan & Eksplorasi:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentAIDisplay.relatedReadings.map((reading, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[11px] text-amber-900 font-medium hover:border-amber-400 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-3 h-3 text-amber-600" />
                        {reading}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Question Input */}
          <form onSubmit={handleCustomSubmit} className="p-4 bg-stone-50 border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={userCustomQuery}
              onChange={(e) => setUserCustomQuery(e.target.value)}
              placeholder="Ajukan pertanyaan lain seputar sejarah, filosofi, atau tradisi adat..."
              className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Tanya
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FITUR 4: COMMUNITY CONTRIBUTION                             */}
      {/* ============================================================== */}
      <section id="community" className="py-20 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
              <Users className="w-4 h-4" />
              Fitur 4 — Community Contribution
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Keterlibatan Komunitas Penjaga Budaya
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              Wadah partisipatif bagi sanggar seni, paguyuban adat, dan pegiat kebudayaan untuk mendaftarkan cerita budaya serta mengusulkan aktivitas lokal.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
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
                Pelacak Status Pengajuan (3)
              </button>
            </div>

            {/* TAB CONTENT: FORM */}
            {contributionTab === "form" && (
              <div className="p-6 sm:p-8">
                {subSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900">
                      Pengajuan Cerita Budaya Berhasil Dikirim!
                    </h4>
                    <p className="text-xs text-emerald-700 max-w-md mx-auto">
                      Data Anda telah masuk ke antrean verifikasi tim kurator & admin BONATURA. Anda dapat memantau statusnya di tab &quot;Pelacak Status Pengajuan&quot;.
                    </p>
                    <button
                      onClick={() => setSubSuccess(false)}
                      className="mt-2 px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
                    >
                      Kirim Cerita Lainnya
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubSuccess(true);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Nama Budaya / Tradisi
                        </label>
                        <input
                          type="text"
                          required
                          value={subTitle}
                          onChange={(e) => setSubTitle(e.target.value)}
                          placeholder="Contoh: Upacara Nelayan Labuhan Merapi"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Kategori Budaya
                        </label>
                        <select
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
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
                          Asal Daerah (Kabupaten/Provinsi)
                        </label>
                        <input
                          type="text"
                          required
                          value={subRegion}
                          onChange={(e) => setSubRegion(e.target.value)}
                          placeholder="Contoh: Sleman, D.I. Yogyakarta"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Profil Komunitas Pengusul
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Sanggar Adat / Komunitas Anda"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Narasi Sejarah, Makna, & Usulan Aktivitas Budaya
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={subDesc}
                        onChange={(e) => setSubDesc(e.target.value)}
                        placeholder="Jelaskan sejarah, filosofi, serta bentuk aktivitas yang bisa diikuti publik (workshop, pertunjukan, dll)..."
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-800/20 transition-colors"
                    >
                      Kirimkan Cerita Budaya untuk Ditinjau
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB CONTENT: STATUS TRACKER */}
            {contributionTab === "status" && (
              <div className="p-6 sm:p-8 space-y-4">
                <span className="text-xs text-stone-500 block mb-2">
                  Daftar pengajuan terkini dan status verifikasi kurator:
                </span>
                {mockContributions.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-800">{item.id}</span>
                        <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                      </div>
                      <span className="text-xs text-stone-500 mt-1 block">
                        Oleh: {item.author} • Diajukan: {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 ${
                          item.status === "Disetujui"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Ditolak"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status === "Disetujui" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {item.status === "Menunggu" && <Clock className="w-3.5 h-3.5" />}
                        {item.status === "Ditolak" && <XCircle className="w-3.5 h-3.5" />}
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. FITUR 5: PERSONALIZED CULTURAL JOURNEY                      */}
      {/* ============================================================== */}
      <section id="journey" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
            <Route className="w-4 h-4" />
            Fitur 5 — Personalized Cultural Journey
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Rancang Rencana Perjalanan Budaya Pribadi
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            Pilih preferensi minat budaya Anda, dan dapatkan kurasi rencana perjalanan sederhana hari demi hari lengkap dengan rekomendasi aktivitas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1: Select Interests */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Langkah 1
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                Pilih Minat Budaya Anda
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Klik satu atau beberapa minat di bawah ini untuk menyesuaikan itinerary:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Seni Tari & Pertunjukan",
                "Arsitektur Kuno",
                "Kuliner Tradisional",
                "Kriya & Tekstil Adat",
                "Ritual & Upacara Adat",
                "Eksplorasi Desa Adat",
              ].map((interest) => {
                const active = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      active
                        ? "bg-amber-100/70 border-amber-500 text-amber-950 font-bold"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <span>{interest}</span>
                    {active ? (
                      <Check className="w-4 h-4 text-amber-800" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{selectedInterests.length} Minat Dipilih</span>
              <button
                onClick={() => setSelectedInterests(["Seni Tari & Pertunjukan", "Kuliner Tradisional"])}
                className="text-amber-800 hover:underline font-semibold"
              >
                Reset Default
              </button>
            </div>
          </div>

          {/* Step 2 & 3: Itinerary Output & Save Button */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  Langkah 2: Rekomendasi Rute
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  Itinerary 3 Hari: Pesona Warisan Budaya Jawa
                </h3>
              </div>
              <button
                onClick={() => setJourneySaved(true)}
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
                    Simpan Rencana Perjalanan
                  </>
                )}
              </button>
            </div>

            {/* Structured Itinerary Timeline */}
            <div className="space-y-4">
              {/* Day 1 */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative pl-12">
                <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 1: Penjelajahan Candi & Kerajinan Kuno
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">Magelang - Yogyakarta</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Eksplorasi relief Candi Borobudur di pagi hari, disusul workshop membatik canting di desa sekitar candi.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Tur Relief Sejarah</span>
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Kuliner Mangut Beong</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative pl-12">
                <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 2: Keraton & Kriya Pusaka Logam
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">Pusat Budaya Yogyakarta</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Menyaksikan pertunjukan gamelan di Bangsal Sri Manganti Keraton, dilanjutkan dialog dengan Empu Pembuat Keris di Kotagede.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Workshop Keris Logam</span>
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Kuliner Gudeg Yu Djum</span>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative pl-12">
                <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900">
                      Hari 3: Sendratari Agung Ramayana
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">Kompleks Candi Prambanan</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Kunjungan arsitektur Candi Sewu dan Candi Prambanan, diakhiri dengan pertunjukan megah Sendratari Ramayana berlatar candi bermandikan cahaya.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-amber-900 font-medium">
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Pagelaran Seni Tari</span>
                    <span className="px-2 py-0.5 bg-amber-100 rounded-md">Fotografi Heritage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FITUR 6: ADMIN DASHBOARD MODAL/PREVIEW                      */}
      {/* ============================================================== */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-stone-200 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-600 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Admin Portal BONATURA</h3>
                  <span className="text-[11px] text-stone-400">Pusat Tata Kelola Data & Kurasi Budaya Nasional</span>
                </div>
              </div>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-stone-100 border-b border-stone-200 px-6 pt-3 gap-3">
              <button
                onClick={() => setAdminTab("verify")}
                className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                  adminTab === "verify"
                    ? "border-amber-700 text-amber-800"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Verifikasi Kontribusi ({mockContributions.filter((c) => c.status === "Menunggu").length})
              </button>
              <button
                onClick={() => setAdminTab("content")}
                className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                  adminTab === "content"
                    ? "border-amber-700 text-amber-800"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Kelola Data Budaya & Destinasi
              </button>
              <button
                onClick={() => setAdminTab("community")}
                className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                  adminTab === "community"
                    ? "border-amber-700 text-amber-800"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Kelola Komunitas & Referensi
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {adminTab === "verify" && (
                <div className="space-y-4">
                  <span className="text-xs text-stone-600 block">
                    Tinjau pengajuan baru dari kontributor komunitas untuk menjaga akurasi & integritas data:
                  </span>
                  <div className="space-y-3">
                    {mockContributions.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-800">{item.id}</span>
                            <span className="text-sm font-bold text-stone-900">{item.title}</span>
                          </div>
                          <span className="text-xs text-stone-500 mt-0.5 block">
                            Pengusul: {item.author} • Diajukan: {item.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.status === "Menunggu" ? (
                            <>
                              <button
                                onClick={() => handleReviewAction(item.id, "Disetujui")}
                                className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Setujui
                              </button>
                              <button
                                onClick={() => handleReviewAction(item.id, "Ditolak")}
                                className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Tolak
                              </button>
                            </>
                          ) : (
                            <span
                              className={`px-3 py-1 text-xs font-bold rounded-full ${
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

              {adminTab === "content" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <span className="text-xs font-bold text-stone-700">Database Master Elemen Budaya (1.240 Entri)</span>
                    <button className="px-3 py-1 text-xs font-bold bg-amber-700 text-white rounded-lg hover:bg-amber-800">
                      + Tambah Budaya Baru
                    </button>
                  </div>
                  <div className="space-y-2">
                    {CULTURAL_ELEMENTS.map((el) => (
                      <div key={el.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-stone-900">{el.name}</span>
                          <span className="text-stone-500 ml-2">({el.region})</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-amber-800 hover:underline font-semibold">Edit Data</button>
                          <span className="text-stone-300">|</span>
                          <button className="text-stone-600 hover:underline">Graf Relasi</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === "community" && (
                <div className="space-y-3">
                  <span className="text-xs text-stone-600 block">
                    Manajemen Komunitas Mitra & Sumber Rujukan Terverifikasi:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-xs font-bold text-stone-900 block">Mitra Lembaga Adat</span>
                      <span className="text-2xl font-bold text-amber-800 block mt-1">128</span>
                      <span className="text-[11px] text-stone-500">MOU & Kemitraan Pelestarian Budaya</span>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-xs font-bold text-stone-900 block">Katalog Rujukan Ilmiah</span>
                      <span className="text-2xl font-bold text-amber-800 block mt-1">3.450</span>
                      <span className="text-[11px] text-stone-500">Buku, Jurnal & Dokumen Cagar Budaya</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl"
              >
                Tutup Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  BONA<span className="text-amber-500">TURA</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-stone-400">
                Platform inovatif pelestarian dan penjelajahan budaya nusantara berbasis kecerdasan buatan, data spasial, dan partisipasi komunitas adat Indonesia.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Fitur MVP</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#discovery" className="hover:text-amber-400 transition-colors">1. Cultural Discovery</a></li>
                <li><a href="#map" className="hover:text-amber-400 transition-colors">2. Cultural Map</a></li>
                <li><a href="#ai-guide" className="hover:text-amber-400 transition-colors">3. AI Cultural Guide</a></li>
                <li><a href="#community" className="hover:text-amber-400 transition-colors">4. Community Contribution</a></li>
                <li><a href="#journey" className="hover:text-amber-400 transition-colors">5. Personalized Journey</a></li>
                <li><button onClick={() => setIsAdminOpen(true)} className="hover:text-amber-400 transition-colors">6. Admin Dashboard</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Integrasi Backend</h5>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>REST API Golang (Gin) :8080</span>
                </li>
                <li>
                  <a href="http://localhost:8080/api/v1/health" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                    API Health Check
                  </a>
                </li>
                <li>PostgreSQL Knowledge Graph</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} BONATURA. Discover Culture, Experience Heritage. All rights reserved.</p>
            <p>Dibangun untuk melestarikan dan memajukan kebudayaan Nusantara.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
