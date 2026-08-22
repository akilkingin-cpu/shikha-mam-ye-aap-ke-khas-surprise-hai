import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import rakhiButton from "@/assets/rakhi-button.png";
import rakhiVideo from "@/assets/rakhi-video.mp4.asset.json";

const SHAYARI_TEXT =
  "Badi behan ka farz aapne har mod par nibhaya hai. Apne dhyan aur pyar se har din ko khas banaya hai. Dua hai meri ki aapki zindagi me har khushi beshumar ho. Is Rakhi par aapke liye mera beinteha pyar aur samman ho!";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shikha Mam ke liye Rakhi Surprise" },
      {
        name: "description",
        content:
          "Ek khaas Rakhi paigham Shikha Mam ke liye — pyaar, shayari aur ek surprise video.",
      },
      {
        property: "og:title",
        content: "Shikha Mam ke liye Rakhi Surprise",
      },
      {
        property: "og:description",
        content:
          "Ek khaas Rakhi paigham Shikha Mam ke liye — pyaar, shayari aur ek surprise video.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate({ from: "/" });
  const [started, setStarted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ttsReady, setTtsReady] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleStart = () => {
    if (started) return;
    // Stop any ongoing speech before the video starts.
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setStarted(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      // Start unmuted because the click is a user gesture; if the browser still
      // blocks audio, try muted first and then unmute once playback begins.
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video
            .play()
            .then(() => {
              video.muted = false;
            })
            .catch(() => {});
        });
      }
    }

    const container = containerRef.current;
    if (container && document.fullscreenEnabled) {
      container.requestFullscreen().catch(() => {
        // Some devices/browsers block fullscreen requests; the video still fills
        // the viewport via CSS.
      });
    }
  };

  const handleVideoEnded = () => {
    navigate({ to: "/dashboard2" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-festive">
      {/* Intro layer: visible until the Rakhi button is clicked */}
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8 transition-opacity duration-700",
          started ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {/* Top heading */}
        <div className="mt-2 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary md:text-base">
            💖 ✨ Shikha Mam aapke Liye Khas Rakhi Paigham ✨ 💖
          </p>
        </div>

        {/* Shayari card */}
        <div className="mt-5 rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
          <h2 className="text-center text-xl font-bold text-foreground md:text-2xl">
            🌹 Aapke Liye Pyaari Shayari 🌹
          </h2>
          <div className="mt-5 space-y-4 text-center text-base leading-relaxed text-foreground md:text-lg">
            <p>
              Badi behan ka farz aapne har mod par nibhaya hai,
              <br />
              Apne dhyan aur pyar se har din ko khas banaya hai.
            </p>
            <p>
              Dua hai meri ki aapki zindagi me har khushi beshumar ho,
              <br />
              Is Rakhi par aapke liye mera beinteha pyar aur samman ho! 🌸✨
            </p>
          </div>
          <p className="mt-5 text-center text-2xl text-primary md:text-3xl">
            ❤️ 💖 💖 💖 ❤️
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-muted-foreground md:text-base">
            👇 Khas Paigham 👇
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

        {/* Center Rakhi button */}
        <div className="flex flex-1 items-center justify-center py-6">
          <button
            type="button"
            onClick={handleStart}
            className="rakhi-button group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Rakhi par click karke surprise video dekhein"
          >
            <img
              src={rakhiButton}
              alt="Khaas Rakhi Button"
              width={192}
              height={192}
              loading="eager"
              className="h-44 w-44 rounded-full object-cover drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-52 md:w-52"
            />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow md:text-sm">
              Rakhi par click kijiye
            </span>
          </button>
        </div>

        {/* Bottom instruction */}
        <p className="pb-4 text-center text-base font-semibold text-foreground md:text-lg">
          🎁 "Shikha Mam, ye di gayi Rakhi par click kijiye aur apna khas surprise
          dekhiye!" 🎁
        </p>
      </div>

      {/* Floating decorative hearts (subtle) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700",
          started ? "opacity-0" : "opacity-100"
        )}
      >
        <span className="float-slow absolute left-[10%] top-[15%] text-2xl text-primary/30">💖</span>
        <span className="float-medium absolute right-[12%] top-[20%] text-3xl text-accent/30">✨</span>
        <span className="float-fast absolute left-[8%] bottom-[25%] text-2xl text-primary/25">🌸</span>
        <span className="float-slow absolute right-[10%] bottom-[18%] text-3xl text-accent/25">🎁</span>
        <span className="float-medium absolute left-[45%] top-[8%] text-xl text-primary/20">❤️</span>
      </div>

      {/* Fullscreen video player layer */}
      <div
        ref={containerRef}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
          started ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <video
          ref={videoRef}
          src={rakhiVideo.url}
          className="h-full w-full object-contain"
          preload="auto"
          playsInline
          muted={false}
          controls={false}
          onEnded={handleVideoEnded}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
