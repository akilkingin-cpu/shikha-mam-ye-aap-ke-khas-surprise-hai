import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { GALLERY_CARDS, UNLOCK_STORAGE_KEY, type GalleryCard } from "@/lib/gallery-data";

export const Route = createFileRoute("/memory-gallery")({
  head: () => ({
    meta: [
      { title: "Shikha Mam — Yaadon Ka Gallery (52 Cards)" },
      {
        name: "description",
        content:
          "Shikha Mam ke liye 52 cards ka memory gallery — har card par shayari aur unlock karke photo ya video dekhein.",
      },
      { property: "og:title", content: "Shikha Mam — Yaadon Ka Gallery" },
      {
        property: "og:description",
        content: "52 khaas cards, har card me ek shayari aur ek yaad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemoryGallery,
});

function MemoryGallery() {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = window.localStorage.getItem(UNLOCK_STORAGE_KEY);
      if (raw) setUnlocked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        window.localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const unlockedCount = Object.values(unlocked).filter(Boolean).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-festive">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary md:text-base">
            ✨ Step 4: Shikha Mam — Yaadon Ka Gallery ✨
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
            💖 52 Cards, 52 Yaadein 💖
          </h1>
          <p className="mt-3 text-base font-semibold text-foreground md:text-lg">
            Meri pyaari Di, isme aapki khoobsurat yaadein hain... Ek-ek karke saare cards unlock karke zaroor dekhiyega! ✨💖
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {hydrated ? `${unlockedCount} / ${GALLERY_CARDS.length} cards unlock ho chuke hain` : "\u00a0"}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_CARDS.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              index={index + 1}
              unlocked={hydrated && !!unlocked[card.id]}
              onUnlock={() => unlock(card.id)}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/dashboard2"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            ← Gift Box Dashboard pe wapas
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="float-slow absolute left-[6%] top-[12%] text-2xl text-primary/25">💖</span>
        <span className="float-medium absolute right-[8%] top-[18%] text-3xl text-accent/25">✨</span>
        <span className="float-fast absolute left-[10%] bottom-[20%] text-2xl text-primary/20">🌸</span>
      </div>
    </div>
  );
}

function MemoryCard({
  card,
  index,
  unlocked,
  onUnlock,
}: {
  card: GalleryCard;
  index: number;
  unlocked: boolean;
  onUnlock: () => void;
}) {
  const hasMedia = card.url !== null;

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card/85 p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Card #{index}</span>
        <span>{card.kind === "video" ? "🎬 Video" : "📸 Photo"}</span>
      </div>

      <p className="mt-3 min-h-14 text-center text-sm font-medium leading-relaxed text-foreground md:text-base">
        {card.shayari}
      </p>

      {unlocked && hasMedia ? (
        <div className="mt-4 flex flex-col gap-3">
          {card.kind === "video" ? (
            <video
              src={card.url!}
              controls
              playsInline
              className="w-full rounded-2xl border border-border object-cover"
            />
          ) : (
            <img
              src={card.url!}
              alt={`Shikha Mam ki yaad ${index}`}
              loading="lazy"
              className="w-full rounded-2xl border border-border object-cover"
            />
          )}
          <a
            href={card.url!}
            download={card.filename}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            📥 Download
          </a>
        </div>
      ) : unlocked ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/50 p-6 text-center text-sm font-medium text-muted-foreground">
          Ye yaad jaldi add hogi... 🌸
        </div>
      ) : (
        <button
          type="button"
          onClick={onUnlock}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          ✨ Click to Unlock ✨
        </button>
      )}
    </article>
  );
}
