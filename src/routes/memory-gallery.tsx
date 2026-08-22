import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/memory-gallery")({
  head: () => ({
    meta: [
      { title: "Shikha Mam — Yaadon Ka Gallery" },
      {
        name: "description",
        content: "Shikha Mam ke liye yaadon aur khaas palon ka gallery.",
      },
      {
        property: "og:title",
        content: "Shikha Mam — Yaadon Ka Gallery",
      },
      {
        property: "og:description",
        content: "Shikha Mam ke liye yaadon aur khaas palon ka gallery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemoryGallery,
});

function MemoryGallery() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-festive">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary md:text-base">
            ✨ Step 4: Shikha Mam — Yaadon Ka Gallery ✨
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
            💖 Aapki Yaadein, Hamesha Ke Liye 💖
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground">
            Yahan aapki sabse khaas yaadein sajengi... 🌸
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur-sm md:p-10">
          <div className="space-y-4 text-center text-base leading-relaxed text-foreground md:text-lg">
            <p>
              Abhi is gallery mein aapki photos add honi hain.
            </p>
            <p>
              Aap mujhe <span className="font-semibold text-primary">3-4 photos</span> aur unke
              <span className="font-semibold text-primary"> captions</span> bhejiye, main yahan ek khoobsurat
              memory gallery bana dunga.
            </p>
            <p className="text-2xl">✨ 📸 💖 🎞️ 💖 📸 ✨</p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard2"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              ← Gift Box Dashboard pe wapas
            </Link>
          </div>
        </div>

        {/* Decorative hearts */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span className="float-slow absolute left-[10%] top-[15%] text-2xl text-primary/30">💖</span>
          <span className="float-medium absolute right-[12%] top-[20%] text-3xl text-accent/30">✨</span>
          <span className="float-fast absolute left-[8%] bottom-[25%] text-2xl text-primary/25">🌸</span>
          <span className="float-slow absolute right-[10%] bottom-[18%] text-3xl text-accent/25">🎁</span>
          <span className="float-medium absolute left-[45%] top-[8%] text-xl text-primary/20">❤️</span>
        </div>
      </div>
    </div>
  );
}
