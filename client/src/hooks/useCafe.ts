"use client";

import { useEffect, useState } from "react";

import { getCafeById } from "@/services/cafe.service";

export function useCafe(id: string) {
  const [cafe, setCafe] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const data = await getCafeById(id);

        setCafe(data);
      } catch {
        setError("Failed to load cafe");
      } finally {
        setLoading(false);
      }
    };

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