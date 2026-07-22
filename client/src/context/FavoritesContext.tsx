"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "@/services/favorites.service";

interface Favorite {
  id: string;
  cafeId: string;
  cafe?: any;
}

interface FavoritesContextType {
  favorites: Favorite[];
  loading: boolean;
  isFavorite: (cafeId: string) => boolean;
  toggleFavorite: (cafeId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFavorites([]);
      return;
    }

    try {
      setLoading(true);

      const data = await getFavorites();

      setFavorites(data);
    } catch (error) {
      console.error(error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  const isFavorite = (cafeId: string) => {
    return favorites.some(
      (favorite) => favorite.cafeId === cafeId
    );
  };

  const toggleFavorite = async (cafeId: string) => {
    const token = localStorage.getItem("token");
    console.log("Cafe ID:", cafeId);

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      if (isFavorite(cafeId)) {
        await removeFavorite(cafeId);
      } else {
        await addFavorite(cafeId);
      }

      await refreshFavorites();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}