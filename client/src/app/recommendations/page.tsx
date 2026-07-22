"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

import { useRecommendations } from "@/hooks/useRecommendations";

export default function RecommendationsPage() {
  const { cafes, loading } = useRecommendations();

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-xl">
        Finding the best cafes for you...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-12">

        <div className="flex items-center gap-3">

          <Sparkles className="text-amber-600" />

          <h1 className="text-5xl font-bold">
            AI Recommendations
          </h1>

        </div>

        <p className="mt-4 text-lg text-gray-600">
          Cafes selected specially for you based on
          affordability, study environment, WiFi,
          and overall experience.
        </p>

      </div>

      {cafes.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-20 text-center">

          <Sparkles
            className="mx-auto mb-5 text-gray-400"
            size={50}
          />

          <h2 className="text-2xl font-semibold">
            No recommendations available
          </h2>

          <p className="mt-3 text-gray-500">
            Try adding more cafes or reviews.
          </p>

        </div>
      ) : (
        <div className="space-y-10">

          {cafes.map((cafe) => {

            const rating =
              cafe.reviews.length > 0
                ? (
                    cafe.reviews.reduce(
                      (sum: number, review: any) =>
                        sum + review.rating,
                      0
                    ) / cafe.reviews.length
                  ).toFixed(1)
                : "N/A";

            return (

              <div
                key={cafe.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
              >

                <div className="grid lg:grid-cols-3">

                  <div className="relative h-72">

                    <Image
                      src={cafe.imageUrl}
                      alt={cafe.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="col-span-2 p-8">

                    <div className="flex items-center gap-3">

                      <Sparkles
                        className="text-amber-600"
                        size={22}
                      />

                      <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        AI Pick
                      </span>

                    </div>

                    <h2 className="mt-5 text-3xl font-bold">
                      {cafe.name}
                    </h2>

                    <div className="mt-4 flex items-center gap-2 text-gray-600">

                      <MapPin size={18} />

                      {cafe.city}

                    </div>

                    <div className="mt-4 flex items-center gap-2">

                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">
                        {rating}
                      </span>

                      <span className="text-gray-500">
                        ({cafe.reviews.length} Reviews)
                      </span>

                    </div>

                    <div className="mt-6 rounded-2xl bg-amber-50 p-5">

                      <h3 className="font-semibold text-amber-700">
                        Why AI Recommended This
                      </h3>

                      <p className="mt-2 leading-7 text-gray-700">
                        {cafe.reason}
                      </p>

                    </div>

                    <div className="mt-8 flex items-center justify-between">

                      <div>

                        <p className="text-gray-500">
                          Average Cost
                        </p>

                        <h3 className="text-2xl font-bold text-amber-700">
                          ₹{cafe.averageCost}
                        </h3>

                      </div>

                      <Link
                        href={`/cafes/${cafe.id}`}
                        className="flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-3 text-white hover:bg-amber-800"
                      >
                        View Cafe

                        <ArrowRight size={18} />

                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            );
          })}

        </div>
      )}

    </section>
  );
}