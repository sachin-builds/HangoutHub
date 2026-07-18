"use client";

import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import CafeCard from "@/components/cards/CafeCard";

import { useCafes } from "@/hooks/useCafes";

export default function Home() {
  const { cafes, loading, error } = useCafes();

  return (
    <>
      <Hero />

      <SearchSection />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Featured Cafes
          </h2>

          <p className="mt-3 text-gray-600">
            Handpicked cafes for every mood.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="py-20 text-center text-lg font-medium">
            Loading cafes...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="py-20 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && cafes.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No cafes available.
          </div>
        )}

        {/* Cafes */}

        {!loading && !error && cafes.length > 0 && (

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