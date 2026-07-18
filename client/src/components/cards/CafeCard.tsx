"use client";

import Link from "next/link";
import { Heart, MapPin, Wifi, Plug, Coffee } from "lucide-react";
import { Cafe } from "@/services/cafe.service";

interface CafeCardProps {
  cafe: Cafe;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <div className="relative">

        {cafe.imageUrl ? (
          <img
            src={cafe.imageUrl}
            alt={cafe.name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-300 via-orange-400 to-amber-600">
            <Coffee size={70} className="text-white" />
          </div>
        )}

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-red-50">
          <Heart size={20} className="text-red-500" />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold truncate">
            {cafe.name}
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Open
          </span>

        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-600">

          <MapPin size={18} />

          <span>
            {cafe.city}
          </span>

        </div>

        {/* Description */}

        <p className="mt-3 line-clamp-2 text-sm text-gray-500">
          {cafe.description || "No description available."}
        </p>

        {/* Amenities */}

        <div className="mt-4 flex flex-wrap gap-2">

          {cafe.wifi && (
            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm">
              <Wifi size={14} />
              WiFi
            </span>
          )}

          {cafe.powerSockets && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm">
              <Plug size={14} />
              Power
            </span>
          )}

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm">
            {cafe.priceRange}
          </span>

        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Noise Level
            </p>

            <h3 className="font-bold text-amber-700">
              {cafe.noiseLevel}/5
            </h3>

          </div>

          <Link
            href={`/cafes/${cafe.id}`}
            className="rounded-xl bg-amber-700 px-5 py-2 text-white transition hover:bg-amber-800"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}