"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Star, Wifi } from "lucide-react";

interface CafeCardProps {
  cafe: any;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  const avgRating =
    cafe.reviews.length > 0
      ? (
          cafe.reviews.reduce(
            (sum: number, review: any) => sum + review.rating,
            0
          ) / cafe.reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}

      <div className="relative h-56">

        {cafe.imageUrl ? (
          <Image
            src={cafe.imageUrl}
            alt={cafe.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-amber-200 text-6xl">
            ☕
          </div>
        )}

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow">
          <Heart className="text-red-500" size={20} />
        </button>

      </div>

      <div className="p-5">

        <div className="flex justify-between">

          <h2 className="text-xl font-bold">
            {cafe.name}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              cafe.isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {cafe.isOpen ? "Open" : "Closed"}
          </span>

        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-600">

          <MapPin size={18} />

          {cafe.city}

        </div>

        <div className="mt-3 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>{avgRating}</span>

          <span className="text-gray-500">
            ({cafe.reviews.length} Reviews)
          </span>

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">
            {cafe.priceRange}
          </span>

          {cafe.wifi && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm">
              <Wifi size={14} />
              WiFi
            </span>
          )}

        </div>

        <div className="mt-5 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Average Cost
            </p>

            <h3 className="font-bold text-amber-700">
              ₹{cafe.averageCost} for two
            </h3>

          </div>

          <Link
            href={`/cafes/${cafe.id}`}
            className="rounded-xl bg-amber-700 px-5 py-2 text-white hover:bg-amber-800"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}