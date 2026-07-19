"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import CafeCard from "@/components/cards/CafeCard";

import {
  getAllCafes,
  searchCafes,
} from "@/services/cafe.service";

export default function Home() {
  const [cafes, setCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Hero />

      <SearchSection onSearch={handleSearch} />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            Featured Cafes
          </h2>

          <p className="mt-3 text-gray-600">
            Discover cafes based on your preferences.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            Loading cafes...
          </div>
        ) : cafes.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No cafes found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cafes.map((cafe) => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}