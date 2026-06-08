"use client";

import { Search, MapPin } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="bg-stone-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-stone-900">
            Find Your Perfect Cafe
          </h2>

          <p className="mt-4 text-gray-600">
            Search by location, budget and your favourite vibe.
          </p>

        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

          <div className="grid lg:grid-cols-4 gap-4">

            {/* Search */}

            <div className="relative">

              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search cafes..."
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

            </div>

            {/* Location */}

            <div className="relative">

              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Location"
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

            </div>

            {/* Budget */}

            <select className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600">

              <option>Budget</option>

              <option>Budget</option>

              <option>Mid</option>

              <option>Premium</option>

            </select>

            {/* Vibe */}

            <select className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600">

              <option>Vibe</option>

              <option>Study Friendly</option>

              <option>Cozy</option>

              <option>Romantic</option>

              <option>Lively</option>

            </select>

          </div>

          <div className="mt-6 flex justify-center">

            <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold transition">

              Search Cafes

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}