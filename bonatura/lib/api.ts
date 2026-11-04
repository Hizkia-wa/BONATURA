/**
 * BONATURA API Client Library
 * Handles data fetching and synchronization with the Golang REST API backend (:8080).
 * Features automatic fallback to local verified datasets when the backend server is offline.
 */

import {
  CULTURAL_ELEMENTS,
  TOBA_CATEGORIES,
  TOBA_MAP_DESTINATIONS,
  CulturalElement,
  TobaDestinationDetail,
} from "./data";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// ==========================================
// BACKEND API CONTRACT TYPES
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: unknown;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
}

export interface BackendSource {
  id: string;
  title: string;
  source_type: string;
  publisher?: string;
  author?: string;
  url?: string;
  note?: string;
}

export interface BackendCulturalRelation {
  id: string;
  source_element_id: string;
  target_element_id: string;
  relation_type: string;
  description?: string;
  target_element_name?: string;
  target_element_slug?: string;
  target_cover_image?: string;
  source_title?: string;
}

export interface BackendDestinationSimple {
  id: string;
  name: string;
  slug: string;
  cover_image_url?: string;
  regency?: string;
  latitude: number;
  longitude: number;
  relationship_note?: string;
}

export interface BackendCulturalElement {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  history?: string;
  philosophy?: string;
  cultural_context?: string;
  region?: string;
  cover_image_url?: string;
  verification_status: string;
  publication_status: string;
  category?: BackendCategory;
  sources?: BackendSource[];
  relations?: BackendCulturalRelation[];
  destinations?: BackendDestinationSimple[];
}

export interface BackendCulturalElementSimple {
  id: string;
  name: string;
  slug: string;
  cover_image_url?: string;
  category_name: string;
  relationship_note?: string;
}

export interface BackendActivity {
  id: string;
  destination_id: string;
  name: string;
  slug: string;
  description?: string;
  activity_type?: string;
  price?: number;
  duration_minutes?: number;
  schedule_info?: string;
  contact?: string;
  status: string;
  destination_name?: string;
}

export interface BackendDestination {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  address?: string;
  village?: string;
  district?: string;
  regency?: string;
  province?: string;
  latitude: number;
  longitude: number;
  opening_hours?: Record<string, unknown> | string;
  ticket_price?: number;
  cover_image_url?: string;
  publication_status: string;
  cultural_elements?: BackendCulturalElementSimple[];
  activities?: BackendActivity[];
}

// Unified frontend models with source indicators
export interface UnifiedCulturalElement {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug?: string;
  region: string;
  imageUrl: string;
  shortDesc: string;
  description: string;
  history: string;
  philosophy: string;
  culturalContext: string;
  sources: { title: string; author?: string; publisher?: string; url?: string; note?: string }[];
  relatedElements: { id: string; name: string; slug?: string; relationType?: string; imageUrl?: string }[];
  destinations?: { id: string; name: string; slug?: string; note?: string }[];
  verificationStatus: string;
  isFromBackend: boolean;
}

export interface UnifiedDestination {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  address?: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  description: string;
  fullStory?: string;
  visitingHours?: string;
  entryFee?: string;
  ticketPrice?: number;
  culturalElements: { id: string; name: string; slug?: string; category?: string; note?: string; imageUrl?: string }[];
  activities: {
    id: string;
    name: string;
    slug?: string;
    description?: string;
    type?: string;
    price?: number;
    durationMinutes?: number;
    scheduleInfo?: string;
    contact?: string;
  }[];
  isFromBackend: boolean;
}

// ==========================================
// HEALTH CHECK
// ==========================================

export async function checkBackendHealth(): Promise<{
  isOnline: boolean;
  database: string;
  service: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Health check non-200");
    const json: ApiResponse<{
      service: string;
      status: string;
      database: string;
    }> = await res.json();
    return {
      isOnline: true,
      database: json.data?.database || "unknown",
      service: json.data?.service || "BONATURA API",
    };
  } catch {
    return {
      isOnline: false,
      database: "disconnected",
      service: "BONATURA API (Offline Mode)",
    };
  }
}

// ==========================================
// FEATURE 1: CULTURAL DISCOVERY API
// ==========================================

export async function getCulturalCategories(): Promise<{
  categories: { id: string; name: string; slug: string; description?: string }[];
  isFromBackend: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/culture/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json: ApiResponse<BackendCategory[]> = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return {
        categories: json.data.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        })),
        isFromBackend: true,
      };
    }
  } catch (err) {
    console.warn("Backend categories unavailable, using local data fallback:", err);
  }

  // Local fallback
  return {
    categories: TOBA_CATEGORIES.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
      description: cat.shortDesc,
    })),
    isFromBackend: false,
  };
}

export async function getCulturalElements(options?: {
  category?: string;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  elements: UnifiedCulturalElement[];
  total: number;
  isFromBackend: boolean;
}> {
  const { category, search, page = 1, perPage = 24 } = options || {};

  try {
    const query = new URLSearchParams();
    if (category && category !== "Semua") query.append("category", category);
    if (search) query.append("search", search);
    query.append("page", page.toString());
    query.append("per_page", perPage.toString());

    const res = await fetch(`${API_BASE_URL}/culture/elements?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json: ApiResponse<PaginatedData<BackendCulturalElement>> = await res.json();

    if (json.success && json.data && Array.isArray(json.data.items) && json.data.items.length > 0) {
      const mapped = json.data.items.map((item) => mapBackendElementToUnified(item, true));
      return {
        elements: mapped,
        total: json.data.total,
        isFromBackend: true,
      };
    }
  } catch (err) {
    console.warn("Backend cultural elements unavailable, using local data fallback:", err);
  }

  // Local fallback
  let localItems = [...CULTURAL_ELEMENTS];
  if (category && category !== "Semua") {
    localItems = localItems.filter(
      (item) =>
        item.category.toLowerCase().includes(category.toLowerCase()) ||
        category.toLowerCase().includes(item.category.toLowerCase())
    );
  }
  if (search) {
    const s = search.toLowerCase();
    localItems = localItems.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.shortDesc.toLowerCase().includes(s) ||
        item.region.toLowerCase().includes(s)
    );
  }

  return {
    elements: localItems.map((item) => mapLocalElementToUnified(item)),
    total: localItems.length,
    isFromBackend: false,
  };
}

export async function getCulturalElementDetail(
  slugOrId: string
): Promise<{
  element: UnifiedCulturalElement | null;
  isFromBackend: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/culture/elements/${slugOrId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json: ApiResponse<BackendCulturalElement> = await res.json();
      if (json.success && json.data) {
        return {
          element: mapBackendElementToUnified(json.data, true),
          isFromBackend: true,
        };
      }
    }
  } catch (err) {
    console.warn("Backend element detail unavailable, searching local fallback:", err);
  }

  // Local fallback lookup
  const localMatch = CULTURAL_ELEMENTS.find(
    (e) => e.slug === slugOrId || e.id === slugOrId
  );
  if (localMatch) {
    return {
      element: mapLocalElementToUnified(localMatch),
      isFromBackend: false,
    };
  }

  return { element: null, isFromBackend: false };
}

// ==========================================
// FEATURE 2: CULTURAL MAP API
// ==========================================

export async function getDestinations(options?: {
  regency?: string;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  destinations: UnifiedDestination[];
  total: number;
  isFromBackend: boolean;
}> {
  const { regency, search, page = 1, perPage = 30 } = options || {};

  try {
    const query = new URLSearchParams();
    if (regency && regency !== "Semua") query.append("regency", regency);
    if (search) query.append("search", search);
    query.append("page", page.toString());
    query.append("per_page", perPage.toString());

    const res = await fetch(`${API_BASE_URL}/destinations?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json: ApiResponse<PaginatedData<BackendDestination>> = await res.json();

    if (json.success && json.data && Array.isArray(json.data.items) && json.data.items.length > 0) {
      const mapped = json.data.items.map((d) => mapBackendDestinationToUnified(d, true));
      return {
        destinations: mapped,
        total: json.data.total,
        isFromBackend: true,
      };
    }
  } catch (err) {
    console.warn("Backend destinations unavailable, using local data fallback:", err);
  }

  // Local fallback
  let localItems = [...TOBA_MAP_DESTINATIONS];
  if (regency && regency !== "Semua") {
    localItems = localItems.filter((d) =>
      d.area.toLowerCase().includes(regency.toLowerCase())
    );
  }
  if (search) {
    const s = search.toLowerCase();
    localItems = localItems.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.description.toLowerCase().includes(s) ||
        d.area.toLowerCase().includes(s)
    );
  }

  return {
    destinations: localItems.map((d) => mapLocalDestinationToUnified(d)),
    total: localItems.length,
    isFromBackend: false,
  };
}

export async function getDestinationDetail(
  slugOrId: string
): Promise<{
  destination: UnifiedDestination | null;
  isFromBackend: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/destinations/${slugOrId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json: ApiResponse<BackendDestination> = await res.json();
      if (json.success && json.data) {
        return {
          destination: mapBackendDestinationToUnified(json.data, true),
          isFromBackend: true,
        };
      }
    }
  } catch (err) {
    console.warn("Backend destination detail unavailable, searching local fallback:", err);
  }

  // Local fallback lookup
  const localMatch = TOBA_MAP_DESTINATIONS.find(
    (d) => d.id === slugOrId || d.name.toLowerCase().replace(/\s+/g, "-") === slugOrId
  );
  if (localMatch) {
    return {
      destination: mapLocalDestinationToUnified(localMatch),
      isFromBackend: false,
    };
  }

  return { destination: null, isFromBackend: false };
}

// ==========================================
// DATA MAPPER HELPERS
// ==========================================

function mapBackendElementToUnified(
  item: BackendCulturalElement,
  isFromBackend = true
): UnifiedCulturalElement {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category?.name || "Kebudayaan Tradisional",
    categorySlug: item.category?.slug,
    region: item.region || "Kawasan Danau Toba",
    imageUrl:
      item.cover_image_url ||
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80",
    shortDesc: item.short_description || "",
    description: item.description || item.short_description || "",
    history: item.history || "Sejarah tradisi ini tercatat sejak masa leluhur masyarakat Batak Toba.",
    philosophy: item.philosophy || "Mengandung nilai luhur penghormatan kepada semesta dan kerukunan kekeluargaan.",
    culturalContext: item.cultural_context || "Dilaksanakan dalam ritus kehidupan adat Batak.",
    sources:
      item.sources && item.sources.length > 0
        ? item.sources.map((s) => ({
            title: s.title,
            author: s.author,
            publisher: s.publisher,
            url: s.url,
            note: s.note,
          }))
        : [
            {
              title: "Balai Pelestarian Kebudayaan Wilayah II Sumatera Utara",
              publisher: "Kemendikbudristek RI",
            },
          ],
    relatedElements:
      item.relations && item.relations.length > 0
        ? item.relations.map((r) => ({
            id: r.target_element_id,
            name: r.target_element_name || "Elemen Terkait",
            slug: r.target_element_slug,
            relationType: r.relation_type,
            imageUrl: r.target_cover_image,
          }))
        : [],
    destinations:
      item.destinations && item.destinations.length > 0
        ? item.destinations.map((d) => ({
            id: d.id,
            name: d.name,
            slug: d.slug,
            note: d.relationship_note,
          }))
        : [],
    verificationStatus: item.verification_status || "verified",
    isFromBackend,
  };
}

function mapLocalElementToUnified(item: CulturalElement): UnifiedCulturalElement {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug || item.id,
    category: item.category,
    region: `${item.subRegion || "Danau Toba"}, ${item.region || "Sumatera Utara"}`,
    imageUrl: item.imageUrl,
    shortDesc: item.shortDesc,
    description: item.description || item.shortDesc,
    history: item.history,
    philosophy: item.philosophy,
    culturalContext: item.culturalContext,
    sources: item.sources.map((src) => ({
      title: src,
      publisher: "Katalog Warisan Budaya Nasional",
    })),
    relatedElements: item.relatedElements.map((rel) => ({
      id: rel.id,
      name: rel.name,
      slug: rel.id,
      relationType: "Budaya Terkait",
    })),
    verificationStatus: item.verificationStatus,
    isFromBackend: false,
  };
}

function mapBackendDestinationToUnified(
  d: BackendDestination,
  isFromBackend = true
): UnifiedDestination {
  const coordString = `${d.latitude.toFixed(4)}° N, ${d.longitude.toFixed(4)}° E`;
  const feeString =
    d.ticket_price && d.ticket_price > 0
      ? `Rp ${Number(d.ticket_price).toLocaleString("id-ID")}`
      : "Gratis / Donasi Sukarela";

  return {
    id: d.id,
    name: d.name,
    slug: d.slug,
    category: "Cagar Budaya",
    area: [d.village, d.district, d.regency].filter(Boolean).join(", ") || "Kawasan Danau Toba",
    address: d.address,
    coordinates: coordString,
    latitude: d.latitude,
    longitude: d.longitude,
    imageUrl:
      d.cover_image_url ||
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    description: d.short_description || d.description || "",
    fullStory: d.description || d.short_description,
    visitingHours: "08.00 - 17.00 WIB (Buka Setiap Hari)",
    entryFee: feeString,
    ticketPrice: d.ticket_price,
    culturalElements:
      d.cultural_elements && d.cultural_elements.length > 0
        ? d.cultural_elements.map((ce) => ({
            id: ce.id,
            name: ce.name,
            slug: ce.slug,
            category: ce.category_name,
            note: ce.relationship_note,
            imageUrl: ce.cover_image_url,
          }))
        : [],
    activities:
      d.activities && d.activities.length > 0
        ? d.activities.map((a) => ({
            id: a.id,
            name: a.name,
            slug: a.slug,
            description: a.description,
            type: a.activity_type,
            price: a.price,
            durationMinutes: a.duration_minutes,
            scheduleInfo: a.schedule_info,
            contact: a.contact,
          }))
        : [
            {
              id: "act-default",
              name: "Jelajah Sejarah & Arsitektur Tradisional",
              type: "Tur Budaya",
              description: "Eksplorasi situs bersama pemandu lokal berpengetahuan adat.",
            },
          ],
    isFromBackend,
  };
}

function mapLocalDestinationToUnified(d: TobaDestinationDetail): UnifiedDestination {
  const parts = d.coordinates ? d.coordinates.split(",") : ["2.6713", "98.8322"];
  const lat = parseFloat(parts[0]) || 2.6713;
  const lng = parseFloat(parts[1]) || 98.8322;

  return {
    id: d.id,
    name: d.name,
    slug: d.id,
    category: d.category,
    area: d.area,
    coordinates: d.coordinates,
    latitude: lat,
    longitude: lng,
    imageUrl: d.imageUrl,
    description: d.description,
    fullStory: d.fullStory,
    visitingHours: d.visitingHours,
    entryFee: d.entryFee,
    culturalElements: [
      {
        id: "cul-1",
        name: "Arsitektur Rumah Bolon & Gorga",
        category: "Arsitektur Adat",
        note: "Struktur bangunan tradisional peninggalan leluhur",
      },
      {
        id: "cul-2",
        name: "Tradisi Seni Tortor & Musik Gondang",
        category: "Seni Pertunjukan",
        note: "Ritual pertunjukan penghormatan adat di lokasi ini",
      },
    ],
    activities: d.activities.map((actName, idx) => ({
      id: `act-${idx}`,
      name: actName,
      type: "Pengalaman Budaya",
      description: "Aktivitas interaktif langsung bersama pemandu adat dan komunitas warga.",
      scheduleInfo: d.visitingHours,
      contact: "+62 812-3456-7890",
    })),
    isFromBackend: false,
  };
}

// ==========================================
// FEATURE 5: PERSONALIZED JOURNEY API
// ==========================================

export interface BackendExportJourneyResponse {
  title: string;
  formatted_text: string;
  whatsapp_url: string;
  download_file_name: string;
  download_content: string;
}

export async function exportJourneyViaBackend(payload: {
  title: string;
  duration_days: number;
  selected_interests: string[];
  region_focus: string;
  pace: string;
  estimated_total_cost: number;
  itinerary_days: any[];
  target_phone_number?: string;
}): Promise<{
  data: BackendExportJourneyResponse | null;
  isFromBackend: boolean;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}/journeys/export`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json: ApiResponse<BackendExportJourneyResponse> = await res.json();
    if (json.success && json.data) {
      return { data: json.data, isFromBackend: true };
    }
  } catch (err) {
    console.warn("Backend journey export unavailable, using client generator:", err);
  }
  return { data: null, isFromBackend: false };
}

export async function saveJourneyViaBackend(payload: any): Promise<{
  data: any | null;
  isFromBackend: boolean;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}/journeys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return { data: json.data, isFromBackend: true };
    }
  } catch (err) {
    console.warn("Backend save journey unavailable, using local storage:", err);
  }
  return { data: null, isFromBackend: false };
}


