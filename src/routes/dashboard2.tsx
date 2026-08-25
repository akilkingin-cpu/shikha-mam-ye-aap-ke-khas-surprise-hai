import { createFileRoute, Link } from "@tanstack/react-router";

import giftBox from "@/assets/gift-box.png";

export const Route = createFileRoute("/dashboard2")({
  head: () => ({
    meta: [
      { title: "Shikha Mam — Gift Box Dashboard" },
      {
        name: "description",
        content: "Shikha Mam ke liye video ke baad ka khaas gift box paigham.",
      },
      {
        property: "og:title",
        content: "Shikha Mam — Gift Box Dashboard",
      },
      {
        property: "og:description",
        content: "Shikha Mam ke liye video ke baad ka khaas gift box paigham.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GiftBoxDashboard,
});

function GiftBoxDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-festive">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        {/* Shayari card */}
        <div className="mt-2 rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
          <h2 className="text-center text-xl font-bold text-foreground md:text-2xl">
            🌸 Aapki Yaadon Ke Liye Pyaari Shayari 🌸
          </h2>
          <div className="mt-5 space-y-4 text-center text-base leading-relaxed text-foreground md:text-lg">
            <p>
              Aapki har ek sikh aur hansi hamare dil me basti hai,
              <br />
              Aapki mithi yaadon se hi zindagi me khushiyan khilti hain.
            </p>
            <p>
              Raho me na aaye kabhi koi bhi gam ka saaya,
              <br />
              Har pal aapki yaadon ne hume aage badhna sikhaya! ✨💐
            </p>
          </div>
          <p className="mt-5 text-center text-2xl text-primary md:text-3xl">
            ✨ 💖 🎁 💖 ✨
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-muted-foreground md:text-base">
            👇 Surprise Gift Box 👇
          </p>
        </div>

        {/* Text above gift box */}
        <p className="mt-6 text-center text-base font-semibold text-foreground md:text-lg">
          Shikha Mam, aapke liye ek khas gift niche hai... Is Gift Box par click kijiye aur apna surprise dekhiye!
        </p>

        {/* Center Gift Box button */}
        <div className="flex flex-1 items-center justify-center py-6">
          <Link
            to="/memory-gallery"
            className="gift-box-button group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Gift Box par click karke apna surprise dekhein"
          >
            <img
              src={giftBox}
              alt="Khaas Gift Box"
              width={256}
              height={256}
              loading="eager"
              className="h-52 w-52 rounded-full object-cover drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-60 md:w-60"
            />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow md:text-sm">
              Gift Box kholiye
            </span>
          </Link>
        </div>

        {/* Bottom instruction */}
        <p className="pb-4 text-center text-base font-semibold text-foreground md:text-lg">
          🎁 "Shikha Mam, aapke liye ek khas gift hai... Is Gift Box par click kijiye aur apna surprise dekhiye!" 🎁
        </p>
      </div>

      {/* Floating decorative hearts */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="float-slow absolute left-[10%] top-[15%] text-2xl text-primary/30">💖</span>
        <span className="float-medium absolute right-[12%] top-[20%] text-3xl text-accent/30">✨</span>
        <span className="float-fast absolute left-[8%] bottom-[25%] text-2xl text-primary/25">🌸</span>
        <span className="float-slow absolute right-[10%] bottom-[18%] text-3xl text-accent/25">🎁</span>
        <span className="float-medium absolute left-[45%] top-[8%] text-xl text-primary/20">❤️</span>
      </div>
    </div>
  );
}
