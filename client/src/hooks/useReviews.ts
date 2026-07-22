"use client";

import { useEffect, useState } from "react";

import {
  getAverageRating,
  getCafeReviews,
} from "@/services/review.service";

export function useReviews(cafeId: string) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] =
    useState(0);
  const [totalReviews, setTotalReviews] =
    useState(0);
  const [loading, setLoading] = useState(true);

  const refreshReviews = async () => {
    try {
      setLoading(true);

      const [reviewsData, ratingData] =
        await Promise.all([
          getCafeReviews(cafeId),
          getAverageRating(cafeId),
        ]);

      setReviews(reviewsData);

      setAverageRating(
        ratingData.averageRating ?? 0
      );

      setTotalReviews(
        ratingData.totalReviews ?? 0
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, [cafeId]);

  return {
    reviews,
    averageRating,
    totalReviews,
    loading,
    refreshReviews,
  };
}