"use client";

import { useEffect, useState } from "react";

import CafeCard from "@/components/cards/CafeCard";

import { getFavorites } from "@/services/favorites.service";

import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const data = await getFavorites();

      setFavorites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center">
        Loading favorites...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="mb-12">

        <h1 className="flex items-center gap-3 text-5xl font-bold">

          <Heart
            className="fill-red-500 text-red-500"
          />

          My Favorite Cafes

        </h1>

        <p className="mt-4 text-gray-600">
          Cafes you've saved for later.
        </p>

      </div>

      {favorites.length === 0 ? (

        <div className="rounded-3xl border border-dashed py-24 text-center">

          <Heart
            size={70}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-6 text-3xl font-bold">
            No Favorites Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Tap the ❤️ icon on any cafe to save it.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {favorites.map((favorite) => (

            <CafeCard
              key={favorite.id}
              cafe={favorite.cafe}
            />

          ))}

        </div>

      )}

    </section>
  );
}