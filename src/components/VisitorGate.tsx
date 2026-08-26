import { useEffect, useState } from "react";
import { hasVisitorAccess, saveVisitor, syncCurrentVisitorProgress } from "@/lib/visitor-log";

export function VisitorGate() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasVisitorAccess()) {
      syncCurrentVisitorProgress();
    } else {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

const handleUnlock = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Kripya apna naam likhiye.");
      return;
    }
    setLoading(true);
    try {
      await saveVisitor({ name: trimmed });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-primary/20 bg-card p-6 text-center shadow-2xl">
        <div className="text-4xl">🎀</div>
        <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
          Enter your name to unlock your Rakhi Surprise!
        </h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          maxLength={60}
          placeholder="Visitor Name"
          className="mt-5 w-full rounded-full border border-primary/30 bg-background px-5 py-3 text-center text-base text-foreground outline-none focus:border-primary"
        />
        {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="mt-5 w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Location le rahe hain..." : "📍 Allow Location & Unlock"}
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Location access compulsory hai surprise dekhne ke liye.
        </p>
      </div>
    </div>
  );
}
