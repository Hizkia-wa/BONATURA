"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Trash2,
  Printer,
  Copy,
  ChevronRight,
  ExternalLink,
  Info,
  Layers,
  Heart,
  Landmark,
  Scissors,
  Music,
  Utensils,
  Mountain,
  Users,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  Ticket,
  Plus,
  Eye,
  ArrowUp,
  ArrowDown,
  Edit3,
  Sliders,
  X,
  MessageCircle,
  DollarSign,
  Download,
  FileText,
  Send,
} from "lucide-react";
import {
  getDestinations,
  UnifiedDestination,
  exportJourneyViaBackend,
  saveJourneyViaBackend,
} from "@/lib/api";
import { TOBA_MAP_DESTINATIONS, TobaDestinationDetail } from "@/lib/data";
import BackendStatusBadge from "@/components/BackendStatusBadge";

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================

export interface CulturalInterestOption {
  id: string;
  name: string;
  categoryTag: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  recommendedKeywords: string[];
}

export interface ItineraryStop {
  id: string;
  stepNumber: number;
  timeSlot: string;
  timePeriod: "Pagi" | "Siang" | "Sore" | "Malam";
  destinationName: string;
  destinationId: string;
  destinationSlug?: string;
  area: string;
  subRegion: string;
  activityTitle: string;
  activityDescription: string;
  culturalPillar: string;
  durationMinutes: number;
  durationText: string;
  estimatedCost: string;
  costAmount: number;
  culturalEtiquette: string;
  transferNote?: string;
  imageUrl?: string;
  availableActivities?: Array<{
    id: string;
    title: string;
    description: string;
    durationMinutes: number;
    priceAmount: number;
    priceFormatted: string;
  }>;
}

export interface ItineraryDay {
  dayNumber: number;
  themeTitle: string;
  daySummary: string;
  stops: ItineraryStop[];
}

export interface SavedJourney {
  id: string;
  title: string;
  createdAt: string;
  durationDays: number;
  selectedInterests: string[];
  regionFocus: string;
  pace: "relaxed" | "standard" | "intensive";
  stopsCount: number;
  estimatedTotalCost: number;
  itineraryDays: ItineraryDay[];
}

// ==========================================
// CULTURAL INTERESTS DEFINITION
// ==========================================

const CULTURAL_INTERESTS: CulturalInterestOption[] = [
  {
    id: "ulos-tenun",
    name: "Kriya & Tenun Ulos Adat",
    categoryTag: "Arts & Crafts",
    icon: Scissors,
    description: "Mempelajari filosofi tenun gedogan manual, ragam motif sakral (Ragi Hotang, Mangiring), dan pewarna alami salaon.",
    recommendedKeywords: ["ulos", "huta raja", "meat", "tenun", "silalahi", "kriya"],
  },
  {
    id: "arsitektur-bolon",
    name: "Arsitektur Rumah Bolon & Gorga",
    categoryTag: "Traditional Village",
    icon: Landmark,
    description: "Mengagumi konstruksi pasak kayu anti-gempa, sopo godang, dan ukiran mistis Gorga Batak Toba.",
    recommendedKeywords: ["siallagan", "rumah bolon", "gorga", "huta raja", "tb silalahi", "bolon"],
  },
  {
    id: "megalitikum-sejarah",
    name: "Sejarah Megalitikum & Cagar Budaya",
    categoryTag: "Historical Heritage",
    icon: ShieldCheck,
    description: "Napak tilas peradilan batu kuno (Batu Parsidangan), sarkofagus megalitik Raja Sidabutar, dan benteng pertahanan huta.",
    recommendedKeywords: ["batu parsidangan", "sidabutar", "sarkofagus", "megalitikum", "tomok", "makam"],
  },
  {
    id: "tari-musik",
    name: "Seni Tari Tortor & Gondang",
    categoryTag: "Cultural Experience",
    icon: Music,
    description: "Menyaksikan tarian magis patung Sigale-gale, Tortor Somba sakral, dan orkestrasi ritmis Gondang Sabangunan.",
    recommendedKeywords: ["sigale-gale", "tortor", "gondang", "simanindo", "tipang", "musik"],
  },
  {
    id: "kuliner-rempah",
    name: "Kuliner Tradisional & Rempah Toba",
    categoryTag: "Local Culinary",
    icon: Utensils,
    description: "Mengecap cita rasa Dekke Naniura tanpa api, Ikan Mas Arsik harum serai, dan gigitan pedas merica andaliman.",
    recommendedKeywords: ["naniura", "arsik", "andaliman", "balige", "onan", "kuliner", "makanan"],
  },
  {
    id: "desa-komunitas",
    name: "Desa Wisata & Kearifan Komunitas",
    categoryTag: "Traditional Village",
    icon: Users,
    description: "Berbaur dengan tetua adat di perkampungan huta, berdialog kearifan lokal falsafah Dalihan Na Tolu.",
    recommendedKeywords: ["tipang", "meat", "siallagan", "huta raja", "komunitas", "desa"],
  },
  {
    id: "kaldera-spiritual",
    name: "Lanskap Kaldera & Geopark Spiritual",
    categoryTag: "Historical Heritage",
    icon: Mountain,
    description: "Ziarah gunung sakral Pusuk Buhit, Lembah Bakkara dinasti Sisingamangaraja, dan mata air keramat Aek Sipangolu.",
    recommendedKeywords: ["pusuk buhit", "bakkara", "aek sipangolu", "huta ginjang", "tele", "sipiso-piso"],
  },
];

const REGION_OPTIONS = [
  { id: "Semua", label: "Semua Kawasan Danau Toba" },
  { id: "Samosir", label: "Pulau Samosir & Sekitarnya" },
  { id: "Toba", label: "Balige & Kabupaten Toba" },
  { id: "Humbahas", label: "Lembah Bakkara (Humbang Hasundutan)" },
  { id: "Taput-Dairi", label: "Tapanuli Utara & Dairi" },
  { id: "Karo", label: "Tongging & Dataran Tinggi Karo" },
];

const PACE_OPTIONS = [
  { id: "relaxed", label: "Santai", stopsPerDay: 2, desc: "2 destinasi / hari, waktu luang lebih panjang" },
  { id: "standard", label: "Standar", stopsPerDay: 3, desc: "3 destinasi / hari, kombinasi seimbang" },
  { id: "intensive", label: "Intensif", stopsPerDay: 4, desc: "4 destinasi / hari, eksplorasi maksimal" },
];

// Synchronous default destination builder to ensure zero lag & immediate interactivity
function getSynchronousDestinations(): UnifiedDestination[] {
  return TOBA_MAP_DESTINATIONS.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.id,
    category: d.category,
    area: d.area,
    address: d.area,
    coordinates: d.coordinates,
    latitude: d.lat,
    longitude: d.lng,
    imageUrl: d.imageUrl,
    description: d.description,
    fullStory: d.fullStory,
    visitingHours: d.visitingHours,
    entryFee: d.entryFee,
    ticketPrice: parseInt(d.entryFee.replace(/[^0-9]/g, "")) || 15000,
    culturalElements: [],
    activities: d.activities.map((act, i) => ({
      id: `${d.id}-act-${i}`,
      name: act,
      description: act,
      durationMinutes: 90,
      price: 25000,
    })),
    isFromBackend: false,
  }));
}

// Synchronous Itinerary Generator Function
function buildItineraryArray(
  durationDays: number,
  pace: "relaxed" | "standard" | "intensive",
  pool: UnifiedDestination[],
  interests: string[],
  region: string
): ItineraryDay[] {
  if (!pool || pool.length === 0) return [];

  const paceConfig = PACE_OPTIONS.find((p) => p.id === pace) || PACE_OPTIONS[1];
  const stopsCountPerDay = paceConfig.stopsPerDay;

  // Filter & score pool based on interests
  const activeKeywords = interests.flatMap((intId) => {
    const item = CULTURAL_INTERESTS.find((i) => i.id === intId);
    return item ? item.recommendedKeywords : [];
  });

  const sortedPool = [...pool].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    const textA = `${a.name} ${a.description} ${a.area} ${a.category}`.toLowerCase();
    const textB = `${b.name} ${b.description} ${b.area} ${b.category}`.toLowerCase();

    activeKeywords.forEach((kw) => {
      if (textA.includes(kw.toLowerCase())) scoreA += 2;
      if (textB.includes(kw.toLowerCase())) scoreB += 2;
    });

    if (region !== "Semua") {
      if (a.area.toLowerCase().includes(region.toLowerCase())) scoreA += 5;
      if (b.area.toLowerCase().includes(region.toLowerCase())) scoreB += 5;
    }

    return scoreB - scoreA;
  });

  const timeSlotTemplates = [
    { slot: "08:30 – 11:00", period: "Pagi" as const },
    { slot: "11:30 – 14:00", period: "Siang" as const },
    { slot: "14:30 – 17:00", period: "Sore" as const },
    { slot: "18:00 – 20:30", period: "Malam" as const },
  ];

  const days: ItineraryDay[] = [];
  let poolIdx = 0;

  for (let day = 1; day <= durationDays; day++) {
    const dayStops: ItineraryStop[] = [];

    for (let s = 0; s < stopsCountPerDay; s++) {
      const dest = sortedPool[poolIdx % sortedPool.length];
      poolIdx++;

      const availableActs = (dest.activities && dest.activities.length > 0)
        ? dest.activities.map((a, aIdx) => ({
            id: a.id || `${dest.id}-act-${aIdx}`,
            title: a.name || `Aktivitas di ${dest.name}`,
            description: a.description || dest.description,
            durationMinutes: a.durationMinutes || 90,
            priceAmount: a.price || 20000,
            priceFormatted: a.price ? `Rp ${a.price.toLocaleString("id-ID")}` : "Donasi Adat Sukarela",
          }))
        : [
            {
              id: `${dest.id}-default-1`,
              title: `Tur Eksplorasi Warisan di ${dest.name}`,
              description: dest.description,
              durationMinutes: 90,
              priceAmount: dest.ticketPrice || 15000,
              priceFormatted: dest.entryFee || "Rp 15.000 / orang",
            },
          ];

      const act = availableActs[s % availableActs.length];
      const slot = timeSlotTemplates[s % timeSlotTemplates.length];

      let etiquette = "Kenakan pakaian sopan saat berada di area makam/huta dan sapa warga setempat dengan 'Horas!'";
      if (dest.category.toLowerCase().includes("village") || dest.category.toLowerCase().includes("tradisional")) {
        etiquette = "Minta izin sebelum memasuki halaman Rumah Bolon warga dan kenakan selendang ulos jika disediakan tetua.";
      } else if (dest.category.toLowerCase().includes("heritage") || dest.category.toLowerCase().includes("historical")) {
        etiquette = "Dilarang memanjat atau merusak formasi batu cagar budaya megalitikum.";
      } else if (dest.category.toLowerCase().includes("culinary")) {
        etiquette = "Bagi yang memiliki sensitivitas rasa pedas/kebas, tanyakan kadar bumbu rempah andaliman.";
      }

      dayStops.push({
        id: `stop-${day}-${s + 1}`,
        stepNumber: s + 1,
        timeSlot: slot.slot,
        timePeriod: slot.period,
        destinationName: dest.name,
        destinationId: dest.id,
        destinationSlug: dest.slug,
        area: dest.area,
        subRegion: dest.area.split(",")[0] || "Danau Toba",
        activityTitle: act.title,
        activityDescription: act.description,
        culturalPillar: dest.category,
        durationMinutes: act.durationMinutes,
        durationText: `${act.durationMinutes} Menit`,
        estimatedCost: act.priceFormatted,
        costAmount: act.priceAmount,
        culturalEtiquette: etiquette,
        transferNote: s < stopsCountPerDay - 1 ? "± 20–30 menit perjalanan darat" : undefined,
        imageUrl: dest.imageUrl,
        availableActivities: availableActs,
      });
    }

    let dayTheme = `Hari ${day}: Penjelajahan Warisan & Interaksi Tradisi Batak`;
    if (day === 1) dayTheme = `Hari 1: Peradaban Kuno, Arsitektur Huta & Napak Tilas Megalitik`;
    if (day === 2) dayTheme = `Hari 2: Kriya Tenun Ulos, Simfoni Gondang & Kuliner Resep Leluhur`;
    if (day === 3) dayTheme = `Hari 3: Lanskap Kaldera Vulkanik, Ziarah Spiritual & Puncak Geopark`;
    if (day >= 4) dayTheme = `Hari ${day}: Pendalaman Budaya Komunitas & Lanskap Tepi Danau`;

    days.push({
      dayNumber: day,
      themeTitle: dayTheme,
      daySummary: `Rangkaian ${dayStops.length} titik persinggahan budaya pilihan dengan fokus pada interaksi otentik dan pelestarian nilai tradisi.`,
      stops: dayStops,
    });
  }

  return days;
}

export default function PersonalizedJourneyPage() {
  // Synchronous initial data pool
  const initialPool = useMemo(() => getSynchronousDestinations(), []);

  // State
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "ulos-tenun",
    "arsitektur-bolon",
    "megalitikum-sejarah",
  ]);
  const [durationDays, setDurationDays] = useState<number>(2);
  const [regionFocus, setRegionFocus] = useState<string>("Semua");
  const [travelPace, setTravelPace] = useState<"relaxed" | "standard" | "intensive">("standard");
  const [customJourneyTitle, setCustomJourneyTitle] = useState<string>(
    "Jelajah Tenun Ulos & Cagar Megalitikum Samosir (2 Hari)"
  );

  // Destination Pool (initialized synchronously so there is zero freeze)
  const [destinationPool, setDestinationPool] = useState<UnifiedDestination[]>(initialPool);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Dynamic Interactive Itinerary Days (initialized synchronously)
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>(() =>
    buildItineraryArray(2, "standard", initialPool, [
      "ulos-tenun",
      "arsitektur-bolon",
      "megalitikum-sejarah",
    ], "Semua")
  );

  // Modals & Drawers
  const [selectedPreviewDest, setSelectedPreviewDest] = useState<UnifiedDestination | null>(null);
  const [addingStopToDayIndex, setAddingStopToDayIndex] = useState<number | null>(null);

  // Storage & Feedback
  const [savedJourneys, setSavedJourneys] = useState<SavedJourney[]>([]);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const [copiedShareNotice, setCopiedShareNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<"builder" | "saved">("builder");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  // ==========================================
  // BACKGROUND BACKEND DATA SYNC
  // ==========================================
  const fetchBackendData = useCallback(async () => {
    try {
      const res = await getDestinations({ perPage: 50 });
      if (res && res.destinations && res.destinations.length > 0) {
        setDestinationPool(res.destinations);
        setIsBackendConnected(res.isFromBackend);
      }
    } catch {
      // Keep using current pool
    }
  }, []);

  useEffect(() => {
    fetchBackendData();
  }, [fetchBackendData]);

  // Load saved journeys & active working draft from localStorage on mount
  useEffect(() => {
    try {
      // 1. Saved journeys list
      const stored = localStorage.getItem("bonatura_saved_journeys");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedJourneys(parsed);
        }
      }

      // 2. Active working draft (prevents reset when switching features)
      const activeDraftJson = localStorage.getItem("bonatura_active_journey_draft");
      if (activeDraftJson) {
        const draft = JSON.parse(activeDraftJson);
        if (draft && Array.isArray(draft.itineraryDays) && draft.itineraryDays.length > 0) {
          if (Array.isArray(draft.selectedInterests) && draft.selectedInterests.length > 0) {
            setSelectedInterests(draft.selectedInterests);
          }
          if (typeof draft.durationDays === "number") {
            setDurationDays(draft.durationDays);
          }
          if (draft.regionFocus) {
            setRegionFocus(draft.regionFocus);
          }
          if (draft.travelPace) {
            setTravelPace(draft.travelPace);
          }
          if (draft.customJourneyTitle) {
            setCustomJourneyTitle(draft.customJourneyTitle);
          }
          setItineraryDays(draft.itineraryDays);
        }
      }
    } catch (err) {
      console.warn("Could not load journey draft from storage:", err);
    } finally {
      setIsDraftLoaded(true);
    }
  }, []);

  // Auto-persist active working draft to localStorage so navigation doesn't reset user selections
  useEffect(() => {
    if (!isDraftLoaded) return;
    try {
      const draft = {
        selectedInterests,
        durationDays,
        regionFocus,
        travelPace,
        customJourneyTitle,
        itineraryDays,
        lastUpdated: Date.now(),
      };
      localStorage.setItem("bonatura_active_journey_draft", JSON.stringify(draft));
    } catch (err) {
      console.warn("Failed saving active draft:", err);
    }
  }, [
    isDraftLoaded,
    selectedInterests,
    durationDays,
    regionFocus,
    travelPace,
    customJourneyTitle,
    itineraryDays,
  ]);

  // Scored destinations for recommendation pool
  const scoredDestinations = useMemo(() => {
    const activeKeywords = selectedInterests.flatMap((intId) => {
      const interest = CULTURAL_INTERESTS.find((i) => i.id === intId);
      return interest ? interest.recommendedKeywords : [];
    });

    return [...destinationPool].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      const textA = `${a.name} ${a.description} ${a.area} ${a.category}`.toLowerCase();
      const textB = `${b.name} ${b.description} ${b.area} ${b.category}`.toLowerCase();

      activeKeywords.forEach((kw) => {
        if (textA.includes(kw.toLowerCase())) scoreA += 2;
        if (textB.includes(kw.toLowerCase())) scoreB += 2;
      });

      if (regionFocus !== "Semua") {
        if (a.area.toLowerCase().includes(regionFocus.toLowerCase())) scoreA += 5;
        if (b.area.toLowerCase().includes(regionFocus.toLowerCase())) scoreB += 5;
      }

      return scoreB - scoreA;
    });
  }, [destinationPool, selectedInterests, regionFocus]);

  // Toggle Interest Handler
  const toggleInterest = (id: string) => {
    let next: string[];
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        next = selectedInterests.filter((item) => item !== id);
      } else {
        next = selectedInterests;
      }
    } else {
      next = [...selectedInterests, id];
    }
    setSelectedInterests(next);

    // Regenerate itinerary immediately on interest change
    const updated = buildItineraryArray(durationDays, travelPace, destinationPool, next, regionFocus);
    setItineraryDays(updated);
  };

  // Change Duration Handler
  const handleDurationChange = (days: number) => {
    setDurationDays(days);
    const updated = buildItineraryArray(days, travelPace, destinationPool, selectedInterests, regionFocus);
    setItineraryDays(updated);
  };

  // Change Pace Handler
  const handlePaceChange = (pace: "relaxed" | "standard" | "intensive") => {
    setTravelPace(pace);
    const updated = buildItineraryArray(durationDays, pace, destinationPool, selectedInterests, regionFocus);
    setItineraryDays(updated);
  };

  // Change Region Handler
  const handleRegionChange = (reg: string) => {
    setRegionFocus(reg);
    const updated = buildItineraryArray(durationDays, travelPace, destinationPool, selectedInterests, reg);
    setItineraryDays(updated);
  };

  // ==========================================
  // TIMELINE MANIPULATION (UP, DOWN, DELETE, ACTIVITY)
  // ==========================================

  const handleMoveStopUp = (dayIndex: number, stopIndex: number) => {
    if (stopIndex === 0) return;
    setItineraryDays((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryDay[];
      const stops = copy[dayIndex].stops;
      const temp = stops[stopIndex];
      stops[stopIndex] = stops[stopIndex - 1];
      stops[stopIndex - 1] = temp;
      stops.forEach((s, idx) => {
        s.stepNumber = idx + 1;
      });
      return copy;
    });
  };

  const handleMoveStopDown = (dayIndex: number, stopIndex: number) => {
    setItineraryDays((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryDay[];
      const stops = copy[dayIndex].stops;
      if (stopIndex >= stops.length - 1) return prev;
      const temp = stops[stopIndex];
      stops[stopIndex] = stops[stopIndex + 1];
      stops[stopIndex + 1] = temp;
      stops.forEach((s, idx) => {
        s.stepNumber = idx + 1;
      });
      return copy;
    });
  };

  const handleDeleteStop = (dayIndex: number, stopIndex: number) => {
    setItineraryDays((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryDay[];
      copy[dayIndex].stops.splice(stopIndex, 1);
      copy[dayIndex].stops.forEach((s, idx) => {
        s.stepNumber = idx + 1;
      });
      return copy;
    });
  };

  const handleChangeStopActivity = (
    dayIndex: number,
    stopIndex: number,
    activityId: string
  ) => {
    setItineraryDays((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryDay[];
      const stop = copy[dayIndex].stops[stopIndex];
      const selectedAct = stop.availableActivities?.find((a) => a.id === activityId);
      if (selectedAct) {
        stop.activityTitle = selectedAct.title;
        stop.activityDescription = selectedAct.description;
        stop.durationMinutes = selectedAct.durationMinutes;
        stop.durationText = `${selectedAct.durationMinutes} Menit`;
        stop.costAmount = selectedAct.priceAmount;
        stop.estimatedCost = selectedAct.priceFormatted;
      }
      return copy;
    });
  };

  const handleAddStopToDay = (dayIndex: number, dest: UnifiedDestination) => {
    setItineraryDays((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryDay[];
      const currentStops = copy[dayIndex].stops;
      const stepNum = currentStops.length + 1;

      const availableActs = (dest.activities && dest.activities.length > 0)
        ? dest.activities.map((a, aIdx) => ({
            id: a.id || `${dest.id}-act-${aIdx}`,
            title: a.name || `Aktivitas di ${dest.name}`,
            description: a.description || dest.description,
            durationMinutes: a.durationMinutes || 90,
            priceAmount: a.price || 20000,
            priceFormatted: a.price ? `Rp ${a.price.toLocaleString("id-ID")}` : "Donasi Adat Sukarela",
          }))
        : [
            {
              id: `${dest.id}-default-1`,
              title: `Tur Eksplorasi di ${dest.name}`,
              description: dest.description,
              durationMinutes: 90,
              priceAmount: dest.ticketPrice || 15000,
              priceFormatted: dest.entryFee || "Rp 15.000 / orang",
            },
          ];

      const act = availableActs[0];

      currentStops.push({
        id: `stop-${dayIndex + 1}-${stepNum}-${Date.now()}`,
        stepNumber: stepNum,
        timeSlot: "17:30 – 19:30",
        timePeriod: "Sore",
        destinationName: dest.name,
        destinationId: dest.id,
        destinationSlug: dest.slug,
        area: dest.area,
        subRegion: dest.area.split(",")[0] || "Danau Toba",
        activityTitle: act.title,
        activityDescription: act.description,
        culturalPillar: dest.category,
        durationMinutes: act.durationMinutes,
        durationText: `${act.durationMinutes} Menit`,
        estimatedCost: act.priceFormatted,
        costAmount: act.priceAmount,
        culturalEtiquette: "Jaga kebersihan cagar budaya dan hormati kebiasaan warga lokal.",
        transferNote: "± 20 menit berkendara",
        imageUrl: dest.imageUrl,
        availableActivities: availableActs,
      });

      return copy;
    });
    setAddingStopToDayIndex(null);
  };

  const handleResetToAuto = () => {
    const updated = buildItineraryArray(durationDays, travelPace, destinationPool, selectedInterests, regionFocus);
    setItineraryDays(updated);
    showToast("Itinerary telah disetel ulang mengikuti algoritma rekomendasi terbaru!");
  };

  const handleResetToDefault = () => {
    try {
      localStorage.removeItem("bonatura_active_journey_draft");
    } catch {
      // ignore
    }
    const defInterests = ["ulos-tenun", "arsitektur-bolon", "megalitikum-sejarah"];
    const defDays = 2;
    const defRegion = "Semua";
    const defPace: "standard" = "standard";
    const defTitle = "Jelajah Kriya & Tenun Ulos Adat & Budaya Danau Toba (2 Hari)";
    const defItinerary = buildItineraryArray(defDays, defPace, destinationPool, defInterests, defRegion);

    setSelectedInterests(defInterests);
    setDurationDays(defDays);
    setRegionFocus(defRegion);
    setTravelPace(defPace);
    setCustomJourneyTitle(defTitle);
    setItineraryDays(defItinerary);
    showToast("Pilihan rencana perjalanan berhasil dikembalikan ke setelan awal.");
  };

  // Metrics calculation
  const totalStopsCount = useMemo(() => {
    return itineraryDays.reduce((acc, day) => acc + day.stops.length, 0);
  }, [itineraryDays]);

  const estimatedTotalCost = useMemo(() => {
    return itineraryDays.reduce((acc, day) => {
      const dayCost = day.stops.reduce((sAcc, stop) => sAcc + (stop.costAmount || 0), 0);
      return acc + dayCost;
    }, 0);
  }, [itineraryDays]);

  const totalExperienceHours = useMemo(() => {
    const totalMinutes = itineraryDays.reduce((acc, day) => {
      const dayMins = day.stops.reduce((sAcc, stop) => sAcc + (stop.durationMinutes || 90), 0);
      return acc + dayMins;
    }, 0);
    return (totalMinutes / 60).toFixed(1);
  }, [itineraryDays]);

  const showToast = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // ==========================================
  // CLIENT FALLBACK TEXT FORMATTER
  // ==========================================
  const buildFormattedTextClient = useCallback((): string => {
    const lines = [
      `🏛️ *BONATURA — PERSONALIZED CULTURAL JOURNEY*`,
      `📍 *${customJourneyTitle}*`,
      `⏱️ *Durasi:* ${durationDays} Hari (${totalStopsCount} Titik Persinggahan Budaya)`,
      `🗺️ *Fokus Wilayah:* ${regionFocus === "Semua" ? "Kawasan Danau Toba" : regionFocus}`,
      `💰 *Estimasi Total Biaya:* Rp ${estimatedTotalCost.toLocaleString("id-ID")}`,
      `────────────────────────────`,
      ``,
      ...itineraryDays.flatMap((day) => [
        `📅 *${day.themeTitle}*`,
        `_${day.daySummary}_`,
        ``,
        ...day.stops.flatMap((s) => [
          `  ${s.stepNumber}. [${s.timeSlot}] *${s.destinationName}* (${s.area})`,
          `     • *Aktivitas:* ${s.activityTitle}`,
          `     • *Estimasi Tiket/Aktivitas:* ${s.estimatedCost}`,
          `     • *Etika Adat:* ${s.culturalEtiquette}`,
          ...(s.transferNote ? [`     ↳ _Perjalanan: ${s.transferNote}_`] : []),
          ``,
        ]),
        `────────────────────────────`,
        ``,
      ]),
      `🌿 *Prinsip Pelestarian Budaya:*`,
      `Selalu hargai kearifan lokal masyarakat adat Batak, hormati situs megalitikum & makam leluhur, serta dukung perajin tenun & pemandu lokal.`,
      ``,
      `📲 Disusun secara cerdas melalui Platform Budaya *BONATURA*: ${typeof window !== "undefined" ? window.location.href : ""}`,
    ];
    return lines.join("\n");
  }, [customJourneyTitle, durationDays, totalStopsCount, regionFocus, estimatedTotalCost, itineraryDays]);

  // ==========================================
  // FEATURE REQ 1: KIRIM KE WHATSAPP (WITH BACKEND)
  // ==========================================
  const handleSendToWhatsApp = async () => {
    setIsActionLoading(true);
    let finalWhatsAppUrl = "";
    let finalFormattedText = "";

    try {
      // 1. Call Backend Export API
      const backendRes = await exportJourneyViaBackend({
        title: customJourneyTitle,
        duration_days: durationDays,
        selected_interests: selectedInterests,
        region_focus: regionFocus,
        pace: travelPace,
        estimated_total_cost: estimatedTotalCost,
        itinerary_days: itineraryDays.map((d) => ({
          day_number: d.dayNumber,
          theme_title: d.themeTitle,
          day_summary: d.daySummary,
          stops: d.stops.map((s) => ({
            id: s.id,
            step_number: s.stepNumber,
            time_slot: s.timeSlot,
            time_period: s.timePeriod,
            destination_name: s.destinationName,
            destination_id: s.destinationId,
            area: s.area,
            activity_title: s.activityTitle,
            activity_description: s.activityDescription,
            cultural_pillar: s.culturalPillar,
            duration_minutes: s.durationMinutes,
            duration_text: s.durationText,
            estimated_cost: s.estimatedCost,
            cost_amount: s.costAmount,
            cultural_etiquette: s.culturalEtiquette,
            transfer_note: s.transferNote || "",
          })),
        })),
      });

      if (backendRes.data && backendRes.data.whatsapp_url) {
        finalWhatsAppUrl = backendRes.data.whatsapp_url;
        finalFormattedText = backendRes.data.formatted_text;
      }
    } catch {
      // ignore, fallback
    }

    // 2. Client Fallback if backend offline
    if (!finalWhatsAppUrl) {
      finalFormattedText = buildFormattedTextClient();
      finalWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(finalFormattedText)}`;
    }

    // Also copy to clipboard for convenience
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(finalFormattedText);
      }
    } catch {
      // ignore
    }

    // Open WhatsApp
    window.open(finalWhatsAppUrl, "_blank");
    showToast("Membuka WhatsApp dan menyalin pesan rencana perjalanan!");
    setIsActionLoading(false);
  };

  // ==========================================
  // FEATURE REQ 2: SALIN TEKS (WITH BACKEND)
  // ==========================================
  const handleCopyText = async () => {
    setIsActionLoading(true);
    let textToCopy = "";

    try {
      // Try backend first
      const backendRes = await exportJourneyViaBackend({
        title: customJourneyTitle,
        duration_days: durationDays,
        selected_interests: selectedInterests,
        region_focus: regionFocus,
        pace: travelPace,
        estimated_total_cost: estimatedTotalCost,
        itinerary_days: itineraryDays.map((d) => ({
          day_number: d.dayNumber,
          theme_title: d.themeTitle,
          day_summary: d.daySummary,
          stops: d.stops.map((s) => ({
            id: s.id,
            step_number: s.stepNumber,
            time_slot: s.timeSlot,
            time_period: s.timePeriod,
            destination_name: s.destinationName,
            destination_id: s.destinationId,
            area: s.area,
            activity_title: s.activityTitle,
            activity_description: s.activityDescription,
            cultural_pillar: s.culturalPillar,
            duration_minutes: s.durationMinutes,
            duration_text: s.durationText,
            estimated_cost: s.estimatedCost,
            cost_amount: s.costAmount,
            cultural_etiquette: s.culturalEtiquette,
            transfer_note: s.transferNote || "",
          })),
        })),
      });

      if (backendRes.data && backendRes.data.formatted_text) {
        textToCopy = backendRes.data.formatted_text;
      }
    } catch {
      // fallback
    }

    if (!textToCopy) {
      textToCopy = buildFormattedTextClient();
    }

    // Copy to clipboard with fallback
    let copySucceeded = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copySucceeded = true;
      } catch {
        copySucceeded = false;
      }
    }

    if (!copySucceeded) {
      // Fallback using textarea execCommand
      try {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        copySucceeded = true;
      } catch {
        copySucceeded = false;
      }
    }

    setCopiedShareNotice(true);
    setTimeout(() => setCopiedShareNotice(false), 3000);
    showToast("Teks rencana perjalanan berhasil disalin ke clipboard!");
    setIsActionLoading(false);
  };

  // ==========================================
  // FEATURE REQ 3: CETAK / PDF & UNDUH DOKUMEN
  // ==========================================
  const handlePrintAndDownload = async () => {
    setIsActionLoading(true);
    let downloadContent = "";
    let downloadFileName = `BONATURA-${customJourneyTitle.replace(/[^a-zA-Z0-9]/g, "-")}.txt`;

    try {
      // Call backend
      const backendRes = await exportJourneyViaBackend({
        title: customJourneyTitle,
        duration_days: durationDays,
        selected_interests: selectedInterests,
        region_focus: regionFocus,
        pace: travelPace,
        estimated_total_cost: estimatedTotalCost,
        itinerary_days: itineraryDays.map((d) => ({
          day_number: d.dayNumber,
          theme_title: d.themeTitle,
          day_summary: d.daySummary,
          stops: d.stops.map((s) => ({
            id: s.id,
            step_number: s.stepNumber,
            time_slot: s.timeSlot,
            time_period: s.timePeriod,
            destination_name: s.destinationName,
            destination_id: s.destinationId,
            area: s.area,
            activity_title: s.activityTitle,
            activity_description: s.activityDescription,
            cultural_pillar: s.culturalPillar,
            duration_minutes: s.durationMinutes,
            duration_text: s.durationText,
            estimated_cost: s.estimatedCost,
            cost_amount: s.costAmount,
            cultural_etiquette: s.culturalEtiquette,
            transfer_note: s.transferNote || "",
          })),
        })),
      });

      if (backendRes.data) {
        downloadContent = backendRes.data.download_content;
        downloadFileName = backendRes.data.download_file_name;
      }
    } catch {
      // fallback
    }

    if (!downloadContent) {
      downloadContent = buildFormattedTextClient();
    }

    // 1. Download file directly to user's computer
    try {
      const blob = new Blob([downloadContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("File download error:", err);
    }

    // 2. Open browser print dialog for Save as PDF / Print
    showToast("Mengunduh dokumen rencana perjalanan & membuka dialog cetak/PDF!");
    setTimeout(() => {
      window.print();
      setIsActionLoading(false);
    }, 600);
  };

  // ==========================================
  // SAVE JOURNEY (BACKEND + LOCALSTORAGE)
  // ==========================================
  const handleSaveJourney = async () => {
    const newJourney: SavedJourney = {
      id: "journey-" + Date.now(),
      title: customJourneyTitle.trim() || `Rencana Perjalanan ${durationDays} Hari`,
      createdAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      durationDays: durationDays,
      selectedInterests: [...selectedInterests],
      regionFocus: regionFocus,
      pace: travelPace,
      stopsCount: totalStopsCount,
      estimatedTotalCost: estimatedTotalCost,
      itineraryDays: JSON.parse(JSON.stringify(itineraryDays)),
    };

    // 1. Save to Backend API
    try {
      await saveJourneyViaBackend({
        id: newJourney.id,
        title: newJourney.title,
        duration_days: newJourney.durationDays,
        selected_interests: newJourney.selectedInterests,
        region_focus: newJourney.regionFocus,
        pace: newJourney.pace,
        stops_count: newJourney.stopsCount,
        estimated_total_cost: newJourney.estimatedTotalCost,
        itinerary_days: newJourney.itineraryDays.map((d) => ({
          day_number: d.dayNumber,
          theme_title: d.themeTitle,
          day_summary: d.daySummary,
          stops: d.stops.map((s) => ({
            id: s.id,
            step_number: s.stepNumber,
            time_slot: s.timeSlot,
            time_period: s.timePeriod,
            destination_name: s.destinationName,
            destination_id: s.destinationId,
            area: s.area,
            activity_title: s.activityTitle,
            activity_description: s.activityDescription,
            cultural_pillar: s.culturalPillar,
            duration_minutes: s.durationMinutes,
            duration_text: s.durationText,
            estimated_cost: s.estimatedCost,
            cost_amount: s.costAmount,
            cultural_etiquette: s.culturalEtiquette,
            transfer_note: s.transferNote || "",
          })),
        })),
      });
    } catch {
      // fallback
    }

    // 2. Save to localStorage
    const updated = [newJourney, ...savedJourneys.filter((j) => j.title !== newJourney.title)];
    setSavedJourneys(updated);
    try {
      localStorage.setItem("bonatura_saved_journeys", JSON.stringify(updated));
    } catch {
      // ignore
    }

    showToast(`Rencana perjalanan "${newJourney.title}" berhasil disimpan!`);
  };

  const handleLoadSavedJourney = (saved: SavedJourney) => {
    setSelectedInterests(saved.selectedInterests);
    setDurationDays(saved.durationDays);
    setRegionFocus(saved.regionFocus);
    setTravelPace(saved.pace || "standard");
    setCustomJourneyTitle(saved.title);
    setItineraryDays(JSON.parse(JSON.stringify(saved.itineraryDays)));
    setActiveTab("builder");
    showToast(`Memuat rencana perjalanan: "${saved.title}"`);
  };

  const handleDeleteSavedJourney = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedJourneys.filter((j) => j.id !== id);
    setSavedJourneys(updated);
    try {
      localStorage.setItem("bonatura_saved_journeys", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#3E2723] pb-24">
      {/* Toast Notification */}
      {feedbackNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#795548] text-[#F8F5EF] px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#D6C4A8] animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#D6C4A8]" />
          <span className="text-xs sm:text-sm font-semibold">{feedbackNotice}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-12 bg-gradient-to-b from-[#F1EAE0] via-[#F8F5EF] to-[#F8F5EF] border-b border-[#D6C4A8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6C4A8]/60 border border-[#D6C4A8] text-[#2C1A14] text-xs font-bold uppercase tracking-wider self-start">
              <Route className="w-3.5 h-3.5 text-[#B85C38]" />
              Fitur 5: Dynamic Cultural Journey
            </div>
            {/* Live Backend & Persistent Draft Indicator */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#2C1A14] bg-[#D6C4A8]/50 border border-[#D6C4A8] rounded-xl shadow-xs"
                title="Aktivitas dan preferensi yang Anda pilih disimpan otomatis dan tidak akan hilang saat membuka fitur lain"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Pilihan Tersimpan Otomatis
              </span>
              <BackendStatusBadge onRefresh={fetchBackendData} />
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1A14] tracking-tight leading-tight">
              Rancang Perjalanan Budaya Pribadi
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#5D4333] leading-relaxed">
              Atur preferensi minat budaya secara dinamis, pilih aktivitas spesifik, sesuaikan urutan waktu, dan bagikan rencana perjalanan ke WhatsApp, salin teks, atau unduh cetak/PDF.
            </p>

            {/* Navigation Tabs */}
            <div className="mt-8 inline-flex p-1.5 bg-[#D6C4A8]/40 border border-[#D6C4A8] rounded-2xl">
              <button
                onClick={() => setActiveTab("builder")}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "builder"
                    ? "bg-[#795548] text-[#F8F5EF] shadow-md"
                    : "text-[#3E2723] hover:text-[#B85C38]"
                }`}
              >
                <Compass className="w-4 h-4" />
                Perancang Dinamis (Builder)
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "saved"
                    ? "bg-[#795548] text-[#F8F5EF] shadow-md"
                    : "text-[#3E2723] hover:text-[#B85C38]"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Rencana Tersimpan ({savedJourneys.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === "saved" ? (
          /* ============================================================== */
          /* SECTION: SAVED JOURNEYS LIST                                  */
          /* ============================================================== */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-[#2C1A14]">
                  Daftar Rencana Perjalanan Tersimpan
                </h2>
                <p className="text-xs sm:text-sm text-[#5D4333] mt-1">
                  Rencana perjalanan budaya yang Anda kustomisasi dan simpan ({savedJourneys.length} tersimpan).
                </p>
              </div>
              <button
                onClick={() => setActiveTab("builder")}
                className="px-4 py-2 text-xs font-bold text-[#F8F5EF] bg-[#B85C38] hover:bg-[#964728] rounded-xl flex items-center gap-2 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                Rancang Baru
              </button>
            </div>

            {savedJourneys.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#D6C4A8] space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#D6C4A8]/40 flex items-center justify-center text-[#795548]">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#2C1A14]">
                  Belum Ada Rencana Tersimpan
                </h3>
                <p className="text-xs text-[#5D4333] max-w-md mx-auto">
                  Kembali ke tab perancang dinamis untuk memilih minat budaya, menyusun urutan perjalanan, dan menyimpan rencana Anda.
                </p>
                <button
                  onClick={() => setActiveTab("builder")}
                  className="px-5 py-2.5 text-xs font-bold text-[#F8F5EF] bg-[#795548] hover:bg-[#5D3B2E] rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <Route className="w-4 h-4" />
                  Mulai Rancang Sekarang
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJourneys.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 text-[11px] font-bold text-[#2C1A14] bg-[#D6C4A8]/60 rounded-lg">
                          {item.durationDays} Hari Perjalanan
                        </span>
                        <span className="text-[11px] text-[#5D4333]">
                          {item.createdAt}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#2C1A14] leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#5D4333]">
                        Wilayah: <strong className="text-[#3E2723]">{item.regionFocus}</strong> • {item.stopsCount} Titik Kunjungan
                      </p>

                      <div className="text-xs font-semibold text-[#B85C38]">
                        Estimasi Biaya: Rp {item.estimatedTotalCost?.toLocaleString("id-ID") || "-"}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.selectedInterests.map((intId) => {
                          const interestObj = CULTURAL_INTERESTS.find((i) => i.id === intId);
                          return (
                            <span
                              key={intId}
                              className="px-2 py-0.5 text-[10px] font-medium text-[#2C1A14] bg-[#F8F5EF] border border-[#D6C4A8] rounded-md"
                            >
                              {interestObj?.name || intId}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#D6C4A8]/40 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleLoadSavedJourney(item)}
                        className="flex-1 py-2 px-3 text-xs font-bold text-[#F8F5EF] bg-[#795548] hover:bg-[#5D3B2E] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Buka & Edit
                      </button>
                      <button
                        onClick={(e) => handleDeleteSavedJourney(item.id, e)}
                        className="p-2 text-[#964728] hover:bg-[#964728]/10 rounded-xl transition-colors border border-transparent hover:border-[#964728]/30"
                        title="Hapus Rencana"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* SECTION: DYNAMIC BUILDER (4 CORE ACTIVITIES)                  */
          /* ============================================================== */
          <div className="space-y-8">
            {/* Real-time Dynamic Metrics Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#B85C38]/10 text-[#B85C38] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-[#5D4333]">Total Durasi</span>
                  <span className="text-base font-extrabold text-[#2C1A14]">
                    {durationDays} Hari ({durationDays > 1 ? `${durationDays - 1} Malam` : "1 Hari"})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#795548]/10 text-[#795548] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-[#5D4333]">Titik Budaya</span>
                  <span className="text-base font-extrabold text-[#2C1A14]">
                    {totalStopsCount} Persinggahan
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#D6C4A8]/40 text-[#2C1A14] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-[#5D4333]">Jam Interaksi</span>
                  <span className="text-base font-extrabold text-[#2C1A14]">
                    ± {totalExperienceHours} Jam Edukasi
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#B85C38]/10 text-[#B85C38] flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-[#5D4333]">Estimasi Biaya</span>
                  <span className="text-base font-extrabold text-[#B85C38]">
                    Rp {estimatedTotalCost.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ------------------------------------------------------------ */}
              {/* LEFT COLUMN: ACTIVITY 1 & 2 - PREFERENCES & RECOMMENDATIONS  */}
              {/* ------------------------------------------------------------ */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cultural Interests Selector */}
                <div className="p-6 sm:p-7 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85C38]">
                        Aktivitas 1: Preferensi Minat
                      </span>
                      <span className="text-xs font-bold text-[#795548]">
                        {selectedInterests.length} Minat Dipilih
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#2C1A14]">
                      Pilih Minat Budaya Anda
                    </h2>
                    <p className="text-xs text-[#5D4333] mt-1 leading-relaxed">
                      Pilihan minat secara otomatis mengubah destinasi dan aktivitas yang direkomendasikan secara real-time:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {CULTURAL_INTERESTS.map((interest) => {
                      const active = selectedInterests.includes(interest.id);
                      const Icon = interest.icon;
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-3.5 text-left rounded-2xl text-xs font-semibold border transition-all flex items-start justify-between gap-3 ${
                            active
                              ? "bg-[#D6C4A8]/40 border-[#B85C38] text-[#2C1A14] ring-1 ring-[#B85C38]/40 shadow-xs"
                              : "bg-[#F8F5EF]/60 border-[#D6C4A8] text-[#5D4333] hover:bg-[#D6C4A8]/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-xl mt-0.5 ${
                                active
                                  ? "bg-[#B85C38] text-[#F8F5EF]"
                                  : "bg-[#D6C4A8]/60 text-[#795548]"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block font-bold text-xs text-[#2C1A14]">
                                {interest.name}
                              </span>
                              <span className="block text-[11px] text-[#5D4333] mt-0.5 leading-snug">
                                {interest.description}
                              </span>
                            </div>
                          </div>

                          <div className="mt-1 shrink-0">
                            {active ? (
                              <div className="w-5 h-5 rounded-full bg-[#B85C38] text-[#F8F5EF] flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-[#D6C4A8]" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Duration, Pace & Region Dynamic Controls */}
                  <div className="pt-5 border-t border-[#D6C4A8]/40 space-y-4">
                    {/* Duration Buttons */}
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A14] mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#B85C38]" />
                        Lama Perjalanan:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((days) => (
                          <button
                            key={days}
                            onClick={() => handleDurationChange(days)}
                            className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                              durationDays === days
                                ? "bg-[#795548] text-[#F8F5EF] border-[#795548] shadow-sm"
                                : "bg-[#F8F5EF] border-[#D6C4A8] text-[#3E2723] hover:bg-[#D6C4A8]/30"
                            }`}
                          >
                            {days} Hari
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travel Pace Buttons */}
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A14] mb-2 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#B85C38]" />
                        Ritme Perjalanan (Pace):
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {PACE_OPTIONS.map((pace) => (
                          <button
                            key={pace.id}
                            onClick={() => handlePaceChange(pace.id as any)}
                            className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                              travelPace === pace.id
                                ? "bg-[#B85C38] text-[#F8F5EF] border-[#B85C38] shadow-sm"
                                : "bg-[#F8F5EF] border-[#D6C4A8] text-[#3E2723] hover:bg-[#D6C4A8]/30"
                            }`}
                          >
                            {pace.label} ({pace.stopsPerDay}/hari)
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Region Selector */}
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A14] mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                        Fokus Wilayah (Opsional):
                      </label>
                      <select
                        value={regionFocus}
                        onChange={(e) => handleRegionChange(e.target.value)}
                        className="w-full p-2.5 text-xs text-[#2C1A14] font-semibold bg-[#F8F5EF] border border-[#D6C4A8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B85C38]"
                      >
                        {REGION_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Recommendations Pool (Activity 2) */}
                <div className="p-6 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85C38]">
                        Aktivitas 2: Rekomendasi Destinasi
                      </span>
                      <h3 className="text-base font-bold text-[#2C1A14]">
                        Katalog Budaya Paling Relevan
                      </h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-[#D6C4A8]/50 text-[#2C1A14] font-bold rounded-lg">
                      {scoredDestinations.length} Ditemukan
                    </span>
                  </div>

                  <p className="text-xs text-[#5D4333]">
                    Klik salah satu destinasi untuk meninjau detail atau menambahkannya langsung ke hari yang diinginkan:
                  </p>

                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {scoredDestinations.map((dest, idx) => (
                      <div
                        key={dest.id}
                        className="p-3 bg-[#F8F5EF] rounded-2xl border border-[#D6C4A8] hover:border-[#B85C38]/60 transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3 text-xs">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-[#795548] text-[#F8F5EF] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                              {idx + 1}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-[#2C1A14] truncate">
                                {dest.name}
                              </h4>
                              <span className="text-[11px] text-[#5D4333] block truncate">
                                {dest.area} • {dest.category}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedPreviewDest(dest)}
                            className="shrink-0 p-1.5 text-[#B85C38] hover:bg-[#D6C4A8]/40 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold"
                            title="Tinjau Detail Destinasi"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </button>
                        </div>

                        {/* Quick Activities Preview */}
                        {dest.activities && dest.activities.length > 0 && (
                          <div className="pl-8 text-[11px] text-[#5D4333] flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#B85C38] shrink-0" />
                            <span className="truncate italic">
                              {dest.activities[0].name}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* RIGHT COLUMN: ACTIVITY 3 & 4 - INTERACTIVE TIMELINE & SAVE  */}
              {/* ------------------------------------------------------------ */}
              <div className="lg:col-span-7 space-y-6">
                {/* Itinerary Header, Title Edit & Action Buttons */}
                <div className="p-6 sm:p-7 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D6C4A8]/50">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85C38] block">
                        Aktivitas 3 & 4: Timeline Dinamis & Berbagi
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#2C1A14] mt-0.5">
                        Urutan Perjalanan Interaktif
                      </h3>
                      <p className="text-xs text-[#5D4333] mt-1">
                        Pilih aktivitas spesifik, atur urutan waktu (⬆️/⬇️), simpan rencana, atau ekspor langsung.
                      </p>
                    </div>

                    {/* Quick Reset Actions */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={handleResetToAuto}
                        className="p-2 text-xs font-semibold rounded-xl border border-[#D6C4A8] bg-[#F8F5EF] hover:bg-[#D6C4A8]/30 text-[#3E2723] flex items-center gap-1.5 transition-colors"
                        title="Setel Ulang Urutan ke Rekomendasi Otomatis"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#795548]" />
                        <span>Rekomendasi Ulang</span>
                      </button>
                      <button
                        onClick={handleResetToDefault}
                        className="p-2 text-xs font-semibold rounded-xl border border-[#D6C4A8] bg-[#F8F5EF] hover:bg-[#D6C4A8]/30 text-[#5D4333] hover:text-[#964728] transition-colors"
                        title="Kembalikan Seluruh Pengaturan ke Setelan Awal Pabrik"
                      >
                        <span>Reset Default</span>
                      </button>
                    </div>
                  </div>

                  {/* Title Form & Save Action */}
                  <div className="bg-[#F8F5EF] p-3.5 rounded-2xl border border-[#D6C4A8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-[#5D4333] uppercase tracking-wider mb-1">
                        Nama Rencana Perjalanan:
                      </label>
                      <input
                        type="text"
                        value={customJourneyTitle}
                        onChange={(e) => setCustomJourneyTitle(e.target.value)}
                        placeholder="Beri nama perjalanan Anda..."
                        className="w-full text-sm font-bold text-[#2C1A14] bg-transparent focus:outline-none placeholder-[#A8937D]"
                      />
                    </div>
                    <button
                      onClick={handleSaveJourney}
                      className="px-4 py-2 text-xs font-bold text-[#F8F5EF] bg-[#795548] hover:bg-[#5D3B2E] rounded-xl transition-all shadow-md shadow-[#795548]/20 flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <Bookmark className="w-4 h-4" />
                      Simpan Rencana
                    </button>
                  </div>

                  {/* ======================================================== */}
                  {/* USER REQUESTED ACTION BUTTONS: WA, SALIN, CETAK/PDF      */}
                  {/* ======================================================== */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-bold text-[#5D4333] uppercase tracking-wider mb-2">
                      Ekspor & Berbagi Rencana Perjalanan:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Button 1: Kirim ke WhatsApp */}
                      <button
                        onClick={handleSendToWhatsApp}
                        disabled={isActionLoading}
                        className="py-2.5 px-3 rounded-xl border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-[#F8F5EF] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                        title="Kirim Isi Pesan Itinerary ke WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Kirim ke WhatsApp</span>
                      </button>

                      {/* Button 2: Salin Teks */}
                      <button
                        onClick={handleCopyText}
                        disabled={isActionLoading}
                        className="py-2.5 px-3 rounded-xl border border-[#D6C4A8] bg-white hover:bg-[#D6C4A8]/30 text-[#2C1A14] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                        title="Salin Teks Lengkap ke Clipboard"
                      >
                        <Copy className="w-4 h-4 text-[#B85C38]" />
                        <span>{copiedShareNotice ? "Disalin!" : "Salin Teks"}</span>
                      </button>

                      {/* Button 3: Cetak/PDF & Unduh */}
                      <button
                        onClick={handlePrintAndDownload}
                        disabled={isActionLoading}
                        className="py-2.5 px-3 rounded-xl border border-[#B85C38] bg-[#B85C38] hover:bg-[#964728] text-[#F8F5EF] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                        title="Unduh File Dokumen & Buka Dialog Cetak/PDF"
                      >
                        <Download className="w-4 h-4" />
                        <span>Cetak / Unduh PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dynamic Chronological Timeline Days */}
                <div className="space-y-6">
                  {itineraryDays.map((day, dayIdx) => (
                    <div
                      key={day.dayNumber}
                      className="bg-white rounded-3xl border border-[#D6C4A8] shadow-sm overflow-hidden"
                    >
                      {/* Day Banner Header */}
                      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#D6C4A8]/40 via-[#F8F5EF] to-white border-b border-[#D6C4A8]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 text-[11px] font-bold text-[#F8F5EF] bg-[#795548] rounded-md">
                              Hari Ke-{day.dayNumber}
                            </span>
                            <span className="text-xs text-[#5D4333] font-medium">
                              {day.stops.length} Titik Perjalanan
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-[#2C1A14]">
                            {day.themeTitle}
                          </h4>
                        </div>

                        {/* Add Stop Button for this specific day */}
                        <button
                          onClick={() => setAddingStopToDayIndex(dayIdx)}
                          className="px-3 py-1.5 text-xs font-bold text-[#795548] bg-[#F8F5EF] border border-[#D6C4A8] hover:bg-[#D6C4A8]/40 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#B85C38]" />
                          Tambah Titik
                        </button>
                      </div>

                      {/* Timeline Stops */}
                      <div className="p-5 sm:p-6 space-y-6">
                        {day.stops.length === 0 ? (
                          <div className="p-6 text-center text-xs text-[#5D4333] border border-dashed border-[#D6C4A8] rounded-2xl">
                            Belum ada titik persinggahan pada hari ini. Klik "Tambah Titik" untuk memilih destinasi.
                          </div>
                        ) : (
                          day.stops.map((stop, sIdx) => (
                            <div key={stop.id} className="relative pl-12 sm:pl-14">
                              {/* Step Connector Line */}
                              {sIdx < day.stops.length - 1 && (
                                <div className="absolute left-[18px] sm:left-[21px] top-10 bottom-[-24px] w-0.5 bg-[#D6C4A8]" />
                              )}

                              {/* Step Number Circle Badge */}
                              <div className="absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#B85C38] text-[#F8F5EF] text-xs sm:text-sm font-extrabold flex items-center justify-center shadow-md shadow-[#B85C38]/20">
                                {stop.stepNumber}
                              </div>

                              <div className="p-4 sm:p-5 bg-[#F8F5EF] rounded-2xl border border-[#D6C4A8] space-y-3">
                                {/* Stop Header & Order Manipulation Controls */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#D6C4A8]/40">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-2 py-0.5 text-[10px] font-bold text-[#2C1A14] bg-[#D6C4A8]/70 rounded-md">
                                      {stop.timePeriod} • {stop.timeSlot}
                                    </span>
                                    <span className="px-2 py-0.5 text-[10px] font-bold text-[#F8F5EF] bg-[#795548] rounded-md">
                                      {stop.culturalPillar}
                                    </span>
                                    <span className="text-xs text-[#5D4333] font-medium flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-[#B85C38]" />
                                      {stop.area}
                                    </span>
                                  </div>

                                  {/* Re-order & Delete Controls */}
                                  <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                                    <button
                                      disabled={sIdx === 0}
                                      onClick={() => handleMoveStopUp(dayIdx, sIdx)}
                                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                        sIdx === 0
                                          ? "opacity-30 border-transparent cursor-not-allowed"
                                          : "hover:bg-[#D6C4A8]/40 border-[#D6C4A8] text-[#3E2723]"
                                      }`}
                                      title="Geser Naik (Lebih Awal)"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      disabled={sIdx === day.stops.length - 1}
                                      onClick={() => handleMoveStopDown(dayIdx, sIdx)}
                                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                        sIdx === day.stops.length - 1
                                          ? "opacity-30 border-transparent cursor-not-allowed"
                                          : "hover:bg-[#D6C4A8]/40 border-[#D6C4A8] text-[#3E2723]"
                                      }`}
                                      title="Geser Turun (Lebih Akhir)"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteStop(dayIdx, sIdx)}
                                      className="p-1.5 text-[#964728] hover:bg-[#964728]/10 rounded-lg border border-transparent hover:border-[#964728]/30 transition-colors"
                                      title="Hapus Titik Ini"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Destination Name */}
                                <div>
                                  <h5 className="text-base font-bold text-[#2C1A14]">
                                    {stop.destinationName}
                                  </h5>

                                  {/* Dynamic Activity Selector Dropdown */}
                                  <div className="mt-2 space-y-1">
                                    <label className="block text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">
                                      Pilihan Aktivitas Spesifik:
                                    </label>
                                    {stop.availableActivities && stop.availableActivities.length > 1 ? (
                                      <select
                                        value={
                                          stop.availableActivities.find((a) => a.title === stop.activityTitle)?.id || ""
                                        }
                                        onChange={(e) => handleChangeStopActivity(dayIdx, sIdx, e.target.value)}
                                        className="w-full p-2 text-xs font-semibold text-[#2C1A14] bg-white border border-[#D6C4A8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B85C38]"
                                      >
                                        {stop.availableActivities.map((act) => (
                                          <option key={act.id} value={act.id}>
                                            {act.title} ({act.durationMinutes} mnt • {act.priceFormatted})
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      <p className="text-xs font-semibold text-[#2C1A14]">
                                        {stop.activityTitle}
                                      </p>
                                    )}
                                  </div>

                                  <p className="text-xs text-[#5D4333] mt-1.5 leading-relaxed">
                                    {stop.activityDescription}
                                  </p>
                                </div>

                                {/* Info Badges (Cost & Duration) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                  <div className="flex items-center gap-2 text-[#5D4333]">
                                    <Clock className="w-3.5 h-3.5 text-[#795548] shrink-0" />
                                    <span>Estimasi Durasi: <strong>{stop.durationText}</strong></span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#5D4333]">
                                    <Ticket className="w-3.5 h-3.5 text-[#795548] shrink-0" />
                                    <span>Biaya Aktivitas/Tiket: <strong>{stop.estimatedCost}</strong></span>
                                  </div>
                                </div>

                                {/* Cultural Etiquette Notice */}
                                <div className="p-2.5 bg-[#D6C4A8]/20 rounded-xl border border-[#D6C4A8]/50 text-[11px] text-[#5D4333] flex items-start gap-2">
                                  <Info className="w-3.5 h-3.5 text-[#B85C38] shrink-0 mt-0.5" />
                                  <span>
                                    <strong>Etika Adat:</strong> {stop.culturalEtiquette}
                                  </span>
                                </div>

                                {/* Transfer Note between stops */}
                                {stop.transferNote && (
                                  <div className="text-[11px] text-[#795548] font-semibold flex items-center gap-1.5 pt-1">
                                    <ArrowRight className="w-3.5 h-3.5 text-[#B85C38]" />
                                    <span>Lanjut ke titik berikutnya: {stop.transferNote}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Community Guide CTA */}
                <div className="p-6 bg-white rounded-3xl border border-[#D6C4A8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-sm font-bold text-[#2C1A14]">
                      Perlu Pemandu Komunitas Adat untuk Rute Ini?
                    </h4>
                    <p className="text-xs text-[#5D4333]">
                      Hubungi sanggar dan pemandu budaya terverifikasi di kawasan Danau Toba untuk menemani perjalanan Anda.
                    </p>
                  </div>
                  <Link
                    href="/community"
                    className="px-4 py-2.5 text-xs font-bold text-[#F8F5EF] bg-[#795548] hover:bg-[#5D3B2E] rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
                  >
                    <Users className="w-4 h-4" />
                    Hubungi Komunitas
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: ADD STOP TO DAY SELECTOR                              */}
      {/* ============================================================== */}
      {addingStopToDayIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#F8F5EF] max-w-lg w-full rounded-3xl border border-[#D6C4A8] shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6C4A8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85C38]">
                  Hari Ke-{addingStopToDayIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-[#2C1A14]">
                  Pilih Destinasi untuk Ditambahkan
                </h3>
              </div>
              <button
                onClick={() => setAddingStopToDayIndex(null)}
                className="p-1.5 text-[#5D4333] hover:text-[#2C1A14] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
              {scoredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="p-3 bg-white rounded-2xl border border-[#D6C4A8] hover:border-[#B85C38] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <h5 className="font-bold text-[#2C1A14] truncate">
                      {dest.name}
                    </h5>
                    <span className="text-[11px] text-[#5D4333] block truncate">
                      {dest.area} • {dest.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddStopToDay(addingStopToDayIndex, dest)}
                    className="px-3 py-1.5 text-xs font-bold text-[#F8F5EF] bg-[#B85C38] hover:bg-[#964728] rounded-xl shrink-0 transition-colors"
                  >
                    + Tambahkan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: DESTINATION DETAIL PREVIEW                            */}
      {/* ============================================================== */}
      {selectedPreviewDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#F8F5EF] max-w-2xl w-full rounded-3xl border border-[#D6C4A8] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#D6C4A8]">
              <div>
                <span className="px-2.5 py-0.5 text-[11px] font-bold text-[#F8F5EF] bg-[#795548] rounded-md">
                  {selectedPreviewDest.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2C1A14] mt-1.5">
                  {selectedPreviewDest.name}
                </h3>
                <span className="text-xs text-[#5D4333] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                  {selectedPreviewDest.area}
                </span>
              </div>
              <button
                onClick={() => setSelectedPreviewDest(null)}
                className="p-2 text-[#5D4333] hover:text-[#2C1A14] rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview if available */}
            {selectedPreviewDest.imageUrl && (
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#D6C4A8]">
                <img
                  src={selectedPreviewDest.imageUrl}
                  alt={selectedPreviewDest.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-2 text-xs sm:text-sm text-[#3E2723] leading-relaxed">
              <h4 className="font-bold text-[#2C1A14] text-xs uppercase tracking-wider">
                Latar Belakang & Nilai Kultural:
              </h4>
              <p>{selectedPreviewDest.fullStory || selectedPreviewDest.description}</p>
            </div>

            {/* Activities List */}
            {selectedPreviewDest.activities && selectedPreviewDest.activities.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#D6C4A8]">
                <h4 className="font-bold text-[#2C1A14] text-xs uppercase tracking-wider">
                  Daftar Aktivitas Kultural di Lokasi Ini:
                </h4>
                <div className="space-y-2">
                  {selectedPreviewDest.activities.map((act, i) => (
                    <div
                      key={act.id || i}
                      className="p-3 bg-white rounded-xl border border-[#D6C4A8] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-[#2C1A14]">
                        <span>{act.name}</span>
                        <span className="text-[#B85C38]">
                          {act.price ? `Rp ${act.price.toLocaleString("id-ID")}` : "Donasi Adat"}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5D4333]">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Close */}
            <div className="pt-3 border-t border-[#D6C4A8] flex justify-end">
              <button
                onClick={() => setSelectedPreviewDest(null)}
                className="px-5 py-2.5 text-xs font-bold text-[#F8F5EF] bg-[#795548] hover:bg-[#5D3B2E] rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
