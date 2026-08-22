import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import giftBox from "@/assets/gift-box.png";

const SHAYARI_TEXT =
  "Aapki har ek sikh aur hansi hamare dil me basti hai. Aapki mithi yaadon se hi zindagi me khushiyan khilti hain. Raho me na aaye kabhi koi bhi gam ka saaya, Har pal aapki yaadon ne hume aage badhna sikhaya!";

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
  const [speaking, setSpeaking] = useState(false);
  const [ttsReady, setTtsReady] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  // Prepare the browser's text-to-speech engine and voices.
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setTtsReady(true);
    const synth = window.speechSynthesis;
    const update = () => setVoicesReady(synth.getVoices().length > 0);
    update();
    synth.addEventListener("voiceschanged", update);
    return () => synth.removeEventListener("voiceschanged", update);
  }, []);

  const speakShayari = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(SHAYARI_TEXT);
    utter.lang = "hi-IN";
    utter.rate = 0.9;
    utter.pitch = 1;
    const voices = synth.getVoices();
    const hindiVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en-in"));
    if (hindiVoice) utter.voice = hindiVoice;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synth.speak(utter);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-festive">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        {/* Top heading */}
        <div className="mt-2 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary md:text-base">
            💖 ✨ Shikha Mam Ke Liye Dashboard 2 (Video Ke Baad Ka Khas Paigham) ✨ 💖
          </p>
        </div>

        {/* Shayari card */}
        <div className="mt-5 rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
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

          <button
            type="button"
            onClick={speakShayari}
            disabled={!ttsReady}
            aria-label="Shayari sunne ke liye click karein"
            className="mx-auto mt-5 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            {speaking ? "🔊 Bol raha hai..." : "🔊 Shayari Sunein"}
          </button>
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
