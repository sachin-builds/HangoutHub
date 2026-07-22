"use client";

import { useEffect, useState } from "react";

import { getRecommendations } from "@/services/recommendation.service";
import { getCafeById } from "@/services/cafe.service";

export function useRecommendations() {
  const [cafes, setCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const recommendations = await getRecommendations(
        "Recommend affordable cafes with good ambience, wifi, and student friendly environment"
      );

      const result = await Promise.all(
        recommendations.map(async (item: any) => {
          const cafe = await getCafeById(item.id);

          return {
            ...cafe,
            reason: item.reason,
          };
        })
      );

      setCafes(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    cafes,
    loading,
  };
}