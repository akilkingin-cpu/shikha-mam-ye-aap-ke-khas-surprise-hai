import { UNLOCK_STORAGE_KEY } from "@/lib/gallery-data";

export const VISITOR_LOG_KEY = "rakhi-visitor-log";
export const VISITOR_ID_KEY = "rakhi-visitor-id";
export const OWNER_UNLOCK_KEY = "rakhi-owner-unlocked";
export const OWNER_PASSWORD = "ILOVEYOU";

export type VisitorEntry = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  mapsUrl: string;
  visitedAt: string;
  device: string;
  browser: string;
  userAgent: string;
  unlockedCount: number;
  totalCards: number;
};

function read(): VisitorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VISITOR_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as VisitorEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: VisitorEntry[]) {
  window.localStorage.setItem(VISITOR_LOG_KEY, JSON.stringify(entries));
}

export function getVisitorEntries(): VisitorEntry[] {
  return read().sort((a, b) => b.visitedAt.localeCompare(a.visitedAt));
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

export function saveVisitor(input: {
  name: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
}): VisitorEntry {
  const ua = window.navigator.userAgent;
  const { device, browser } = detectDevice(ua);
  const entry: VisitorEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    latitude: input.latitude,
    longitude: input.longitude,
    accuracy: input.accuracy,
    mapsUrl: `https://www.google.com/maps?q=${input.latitude},${input.longitude}`,
    visitedAt: new Date().toISOString(),
    device,
    browser,
    userAgent: ua,
    unlockedCount: getUnlockedCount(),
    totalCards: 52,
  };
  const entries = read();
  entries.push(entry);
  write(entries);
  window.localStorage.setItem(VISITOR_ID_KEY, entry.id);
  return entry;
}

export function syncCurrentVisitorProgress() {
  if (typeof window === "undefined") return;
  const id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) return;
  const entries = read();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return;
  entries[idx] = { ...entries[idx], unlockedCount: getUnlockedCount() };
  write(entries);
}

export function hasVisitorAccess(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(VISITOR_ID_KEY));
}
