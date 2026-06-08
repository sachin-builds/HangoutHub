"use client";

import Link from "next/link";
import { Coffee, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-100">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">

              <Coffee size={18} />

              Discover Amazing Cafes

            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight">

              Find Your Perfect

              <span className="text-amber-700">
                {" "}Cafe Vibe
              </span>

            </h1>

            <p className="mt-6 text-lg text-stone-600 leading-8">

              Explore cafes based on budget,
              atmosphere and location.

              Whether you're studying,
              working remotely,
              meeting friends,
              or enjoying a quiet coffee,
              HangoutHub helps you discover
              the perfect place.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/cafes"
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Explore Cafes
              </Link>

              <Link
                href="/recommendations"
                className="border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Get Recommendations
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap gap-8">

              <div>

                <h2 className="text-3xl font-bold">
                  500+
                </h2>

                <p className="text-stone-600">
                  Cafes
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  20+
                </h2>

                <p className="text-stone-600">
                  Cities
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  4.9
                </h2>

                <p className="text-stone-600">
                  Rating
                </p>

              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <div className="h-72 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">

                <Coffee
                  size={120}
                  className="text-white"
                />

              </div>

              <div className="mt-6">

                <h2 className="text-2xl font-bold">

                  Brew & Books Cafe

                </h2>

                <div className="flex items-center gap-2 mt-2">

                  <MapPin size={18} />

                  <span>
                    Raipur
                  </span>

                </div>

                <div className="flex items-center gap-2 mt-2">

                  <Star
                    size={18}
                    className="fill-yellow-400"
                  />

                  <span>
                    4.9 Rating
                  </span>

                </div>

                <div className="mt-4 flex gap-2 flex-wrap">

                  <span className="bg-amber-100 px-3 py-1 rounded-full text-sm">

                    Cozy

                  </span>

                  <span className="bg-amber-100 px-3 py-1 rounded-full text-sm">

                    Study Friendly

                  </span>

                  <span className="bg-amber-100 px-3 py-1 rounded-full text-sm">

                    Budget

                  </span>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}