import { UNLOCK_STORAGE_KEY } from "@/lib/gallery-data";
import { supabase } from "@/integrations/supabase/client";

export const VISITOR_ID_KEY = "rakhi-visitor-id";
export const OWNER_UNLOCK_KEY = "rakhi-owner-unlocked";
export const OWNER_PASSWORD = "ILOVEYOU";

export type VisitorEntry = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  mapsUrl: string | null;
  visitedAt: string;
  device: string;
  browser: string;
  userAgent: string;
  unlockedCount: number;
  totalCards: number;
};

type VisitorRow = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  maps_url: string | null;
  visited_at: string;
  device: string | null;
  browser: string | null;
  user_agent: string | null;
  unlocked_count: number;
  total_cards: number;
};

function mapRow(row: VisitorRow): VisitorEntry {
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    accuracy: row.accuracy,
    mapsUrl: row.maps_url,
    visitedAt: row.visited_at,
    device: row.device ?? "Unknown",
    browser: row.browser ?? "Unknown browser",
    userAgent: row.user_agent ?? "",
    unlockedCount: row.unlocked_count,
    totalCards: row.total_cards,
  };
}

export async function getVisitorEntries(): Promise<VisitorEntry[]> {
  const { data, error } = await supabase
    .from("visitors")
    .select("*")
    .order("visited_at", { ascending: false });
  if (error || !data) return [];
  return (data as VisitorRow[]).map(mapRow);
}

export function detectDevice(ua: string) {
  const isTablet = /iPad|Tablet/i.test(ua);
  const isMobile = /Mobi|Android|iPhone/i.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  let browser = "Unknown browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os = "";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iOS/.test(ua)) os = "iOS";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { device, browser: os ? `${browser} · ${os}` : browser };
}

export function getUnlockedCount(): number {
  try {
    const raw = window.localStorage.getItem(UNLOCK_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export async function saveVisitor(input: {
  name: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
}): Promise<void> {
  const ua = window.navigator.userAgent;
  const { device, browser } = detectDevice(ua);
  const { data, error } = await supabase
    .from("visitors")
    .insert({
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      accuracy: input.accuracy,
      maps_url: `https://www.google.com/maps?q=${input.latitude},${input.longitude}`,
      device,
      browser,
      user_agent: ua,
      unlocked_count: getUnlockedCount(),
      total_cards: 52,
    })
    .select("id")
    .single();

  if (error || !data) throw error ?? new Error("Save failed");
  window.localStorage.setItem(VISITOR_ID_KEY, data.id);
}

export async function syncCurrentVisitorProgress() {
  if (typeof window === "undefined") return;
  const id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) return;
  await supabase
    .from("visitors")
    .update({ unlocked_count: getUnlockedCount() })
    .eq("id", id);
}

export function hasVisitorAccess(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(VISITOR_ID_KEY));
}
