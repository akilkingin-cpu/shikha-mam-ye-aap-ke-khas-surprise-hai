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

    if (!("geolocation" in navigator)) {
      setError("Location access is compulsory to view the surprise. Please allow location!");
      alert("Location access is compulsory to view the surprise. Please allow location!");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await saveVisitor({
            name: trimmed,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy ?? null,
          });
          setLoading(false);
          setOpen(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
          setError("Kuch gadbad ho gayi, dobara try kijiye.");
        }
      },
      (err) => {
        console.warn("Location permission denied or timed out:", err);
        setLoading(false);
        setError("Location access is compulsory to view the surprise. Please allow location!");
        alert("Location access is compulsory to view the surprise. Please allow location!");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };
