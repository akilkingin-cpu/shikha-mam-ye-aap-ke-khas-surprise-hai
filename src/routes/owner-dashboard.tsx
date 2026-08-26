import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  OWNER_PASSWORD,
  OWNER_UNLOCK_KEY,
  getVisitorEntries,
  syncCurrentVisitorProgress,
  type VisitorEntry,
} from "@/lib/visitor-log";

export const Route = createFileRoute("/owner-dashboard")({
  head: () => ({
    meta: [
      { title: "Owner Dashboard — Rakhi Surprise Visitors" },
      {
        name: "description",
        content: "Private visitor log for the Rakhi Surprise portal: names, location, device and progress.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Owner Dashboard — Rakhi Surprise Visitors" },
      {
        property: "og:description",
        content: "Private visitor log for the Rakhi Surprise portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [entries, setEntries] = useState<VisitorEntry[]>([]);

  useEffect(() => {
    let ok = window.localStorage.getItem(OWNER_UNLOCK_KEY) === "1";
    if (!ok) {
      const input = window.prompt("Password daaliye:");
      ok = input === OWNER_PASSWORD;
      if (ok) window.localStorage.setItem(OWNER_UNLOCK_KEY, "1");
    }
    if (!ok) {
      navigate({ to: "/" });
      return;
    }
    setAllowed(true);

    const load = () => {
      getVisitorEntries().then(setEntries);
    };
    syncCurrentVisitorProgress().then(load);

    const channel = supabase
      .channel("visitors-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitors" }, load)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-foreground">Owner Dashboard</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Total visitors: {entries.length}
        </p>

        <div className="mt-8 space-y-4">
          {entries.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">Abhi koi visitor nahi hai.</p>
          )}
          {entries.map((v) => (
            <article
              key={v.id}
              className="rounded-2xl border border-primary/20 bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-foreground">👤 {v.name}</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {v.unlockedCount}/{v.totalCards} cards unlocked
                </span>
              </div>
              <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div>
                  📍 {v.latitude.toFixed(6)}, {v.longitude.toFixed(6)}
                  {v.accuracy ? ` (±${Math.round(v.accuracy)}m)` : ""} —{" "}
                  <a
                    href={v.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    Google Maps
                  </a>
                </div>
                <div>🕒 {new Date(v.visitedAt).toLocaleString()}</div>
                <div>
                  💻 {v.device} · {v.browser}
                </div>
                <div className="break-all text-xs opacity-70">{v.userAgent}</div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
