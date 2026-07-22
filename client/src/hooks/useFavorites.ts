"use client";

import { useEffect, useState } from "react";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "@/services/favorites.service";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function isFavorite(cafeId: string) {
    return favorites.some(
      (favorite) => favorite.cafeId === cafeId
    );
  }

  async function toggleFavorite(cafeId: string) {
    try {
      if (isFavorite(cafeId)) {
        await removeFavorite(cafeId);

        setFavorites((prev) =>
          prev.filter(
            (favorite) => favorite.cafeId !== cafeId
          )
        );
      } else {
        const favorite = await addFavorite(cafeId);

        setFavorites((prev) => [...prev, favorite]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refreshFavorites: loadFavorites,
  };
}