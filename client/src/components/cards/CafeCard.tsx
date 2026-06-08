"use client";

import { Heart, MapPin, Star } from "lucide-react";

export default function CafeCard() {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

      {/* Image */}

      <div className="relative">

        <div className="h-56 bg-gradient-to-br from-amber-300 via-orange-400 to-amber-600 flex items-center justify-center">

          <span className="text-7xl">
            ☕
          </span>

        </div>

        <button className="absolute top-4 right-4 rounded-full bg-white p-2 shadow hover:bg-red-50 transition">

          <Heart
            size={20}
            className="text-red-500"
          />

        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">

            Brew & Books

          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

            Open

          </span>

        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-600">

          <MapPin size={18} />

          <span>
            Raipur
          </span>

        </div>

        <div className="mt-3 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">

            4.9

          </span>

          <span className="text-gray-500">

            (245 Reviews)

          </span>

        </div>

        {/* Tags */}

        <div className="mt-4 flex flex-wrap gap-2">

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm">

            Cozy

          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">

            Study

          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm">

            Budget

          </span>

        </div>

        {/* Price */}

        <div className="mt-5 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">

              Average Cost

            </p>

            <h3 className="font-bold text-amber-700">

              ₹200 for two

            </h3>

          </div>

          <button className="rounded-xl bg-amber-700 px-5 py-2 text-white transition hover:bg-amber-800">

            View

          </button>

        </div>

      </div>

    </div>
  );
}