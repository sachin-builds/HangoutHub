"use client";

import { useEffect, useMemo, useState } from "react";

import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import CafeCard from "@/components/cards/CafeCard";

import {
  getAllCafes,
  searchCafes,
} from "@/services/cafe.service";

import { useLocation } from "@/hooks/useLocation";
import { calculateDistance } from "@/utils/distance";

export default function Home() {
  const [cafes, setCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { location } = useLocation();

  const [sortNearest, setSortNearest] =
    useState(false);

  useEffect(() => {
    loadCafes();
  }, []);

  async function loadCafes() {
    try {
      const data = await getAllCafes();
      setCafes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(filters: {
    search: string;
    address: string;
    priceRange: string;
  }) {
    try {
      setLoading(true);

      const data = await searchCafes(filters);

      setCafes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const displayedCafes = useMemo(() => {
    if (!location) return cafes;

    const withDistance = cafes.map((cafe) => ({
      ...cafe,
      distance: calculateDistance(
        location.lat,
        location.lng,
        cafe.latitude,
        cafe.longitude
      ),
    }));

    if (sortNearest) {
      withDistance.sort(
        (a, b) => a.distance - b.distance
      );
    }

    return withDistance;
  }, [cafes, location, sortNearest]);

  return (
    <>
      <Hero />

      <SearchSection onSearch={handleSearch} />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              Featured Cafes
            </h2>

            <p className="mt-3 text-gray-600">
              Discover cafes based on your preferences.
            </p>

          </div>

          {location && (

            <button
              onClick={() =>
                setSortNearest(!sortNearest)
              }
              className="rounded-xl bg-amber-700 px-6 py-3 text-white hover:bg-amber-800"
            >
              {sortNearest
                ? "Default Order"
                : "Near Me"}
            </button>

          )}

        </div>

        {loading ? (
          <div className="py-16 text-center">
            Loading cafes...
          </div>
        ) : displayedCafes.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No cafes found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {displayedCafes.map((cafe) => (

              <div key={cafe.id}>

                {location && cafe.distance && (

                  <div className="mb-2 font-semibold text-amber-700">
                    📍 {cafe.distance} km away
                  </div>

                )}

                <CafeCard cafe={cafe} />

              </div>

            ))}

          </div>
        )}

      </section>
    </>
  );
}