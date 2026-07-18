"use client";

import { useEffect, useState } from "react";
import { Cafe, getCafeById } from "@/services/cafe.service";

export function useCafe(id: string) {
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCafe() {
      try {
        setLoading(true);

        const data = await getCafeById(id);

        setCafe(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load cafe.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCafe();
    }
  }, [id]);

  return {
    cafe,
    loading,
    error,
  };
}