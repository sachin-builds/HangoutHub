"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchSectionProps {
  onSearch: (filters: {
    search: string;
    address: string;
    priceRange: string;
  }) => void;
}

export default function SearchSection({
  onSearch,
}: SearchSectionProps) {
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    onSearch({
      search,
      address,
      priceRange,
    });
  };

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
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Location"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Budget */}
            <select
              value={priceRange}
              onChange={(e) =>
                setPriceRange(e.target.value)
              }
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <option value="">Budget</option>
              <option value="BUDGET">Budget</option>
              <option value="MID">Mid</option>
              <option value="PREMIUM">Premium</option>
            </select>

            {/* Placeholder for future vibe filter */}
            <select
              disabled
              className="border rounded-xl px-4 py-3 bg-gray-100"
            >
              <option>Vibe (Coming Soon)</option>
            </select>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Search Cafes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}