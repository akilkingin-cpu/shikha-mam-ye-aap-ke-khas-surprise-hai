import { UNLOCK_STORAGE_KEY } from "@/lib/gallery-data";
import { createVisitor, updateVisitorProgress } from "@/lib/visitors.functions";

export const VISITOR_ID_KEY = "rakhi-visitor-id";
export const OWNER_PASSWORD_KEY = "rakhi-owner-password";

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

export function mapRow(row: VisitorRow): VisitorEntry {
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
    return Array.isArray(parsed) ? Math.min(parsed.length, 52) : 0;
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
  const { id } = await createVisitor({
    data: {
      name: input.name.trim().slice(0, 60),
      latitude: input.latitude,
      longitude: input.longitude,
      accuracy: input.accuracy,
      device,
      browser,
      userAgent: ua.slice(0, 500),
      unlockedCount: getUnlockedCount(),
    },
  });
  window.localStorage.setItem(VISITOR_ID_KEY, id);
}

export async function syncCurrentVisitorProgress() {
  if (typeof window === "undefined") return;
  const id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) return;
  try {
    await updateVisitorProgress({ data: { id, unlockedCount: getUnlockedCount() } });
  } catch {
    // progress sync is best-effort
  }
}

export function hasVisitorAccess(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(VISITOR_ID_KEY));
}
