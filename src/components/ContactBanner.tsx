import { useNavigate } from "@tanstack/react-router";


const WA_URL =
  "https://wa.me/919026218560?text=Hi%20Akil,%20maine%20aapka%20Rakhi%20Surprise%20portal%20dekha!%20Mujhe%20aapse%20baat%20karni%20hai.";

export function ContactBanner() {
  const navigate = useNavigate();

  const openOwner = () => {
    navigate({ to: "/owner-dashboard" });
  };

  return (
    <div className="fixed right-2 top-2 z-50 flex max-w-[95vw] flex-wrap items-center justify-end gap-2 rounded-full border border-primary/20 bg-card/90 px-3 py-1.5 text-xs shadow-md backdrop-blur sm:text-sm">
      <span className="font-semibold text-foreground">Made by Akil</span>
      <a href="tel:9026218560" className="font-medium text-primary hover:underline">
        9026218560
      </a>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Akil"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.19-1.36a9.94 9.94 0 0 0 4.85 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.24.68-1.4 1.32-1.94 1.36-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.12-.14-.18-1.12-1.49-1.12-2.84 0-1.35.71-2.02.96-2.29.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.49-.09.18-.14.29-.28.45-.14.16-.29.35-.41.47-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.92 1.06.94 1.95 1.23 2.23 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.81.86.27.14.44.2.51.31.07.11.07.64-.17 1.32Z" />
        </svg>
      </a>
      <button
        onClick={openOwner}
        className="text-[10px] font-medium text-muted-foreground hover:text-primary sm:text-xs"
      >
        Akil
      </button>
    </div>
  );
}
