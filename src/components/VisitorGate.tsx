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
    setError(null);

    if (!("geolocation" in navigator)) {
      await saveVisitor({ name: trimmed });
      setLoading(false);
      setOpen(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await saveVisitor({
            name: trimmed,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy ?? null,
          });
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
        setOpen(false);
      },
      async (err) => {
        console.warn("Location fetch error:", err);
        try {
          await saveVisitor({ name: trimmed });
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
        setOpen(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
