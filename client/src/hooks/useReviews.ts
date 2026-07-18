"use client";

import { useEffect, useState } from "react";

import {
  Review,
  getReviews,
  getAverageRating,
} from "@/services/review.service";

export function useReviews(cafeId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    try {
      setLoading(true);

      const reviewsData = await getReviews(cafeId);
      setReviews(reviewsData);

      const avg = await getAverageRating(cafeId);

      setAverageRating(avg.averageRating);
      setTotalReviews(avg.totalReviews);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cafeId) {
      loadReviews();
    }
  }, [cafeId]);

  return {
    reviews,
    averageRating,
    totalReviews,
    loading,
    refresh: loadReviews,
  };
}