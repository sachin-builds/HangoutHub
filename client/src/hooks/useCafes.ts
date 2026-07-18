"use client";

import { useEffect, useState } from "react";
import { Cafe, getAllCafes } from "@/services/cafe.service";

export function useCafes() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCafes() {
      try {
        setLoading(true);

        const data = await getAllCafes();

        setCafes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cafes.");
      } finally {
        setLoading(false);
      }
    }

    fetchCafes();
  }, []);

  return {
    cafes,
    loading,
    error,
  };
}