"use client";

import ReviewsSection from "@/components/reviews/ReviewsSection";
import GoogleMapComponent from "@/components/map/GoogleMap";

import {
  MapPin,
  Clock,
  Wifi,
  Plug,
  Volume2,
  Coffee,
  Heart,
} from "lucide-react";

import { Cafe } from "@/services/cafe.service";

interface CafeDetailsProps {
  cafe: Cafe;
}

export default function CafeDetails({ cafe }: CafeDetailsProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl shadow-xl">

        {cafe.imageUrl ? (
          <img
            src={cafe.imageUrl}
            alt={cafe.name}
            className="h-[450px] w-full object-cover"
          />
        ) : (
          <div className="flex h-[450px] items-center justify-center bg-gradient-to-br from-amber-300 via-orange-400 to-amber-700">
            <Coffee size={120} className="text-white" />
          </div>
        )}

      </div>

      {/* Header */}

      <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row">

        <div>

          <h1 className="text-5xl font-bold">
            {cafe.name}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-gray-600">

            <MapPin size={20} />

            <span>
              {cafe.address}, {cafe.city}
            </span>

          </div>

        </div>

        <button className="flex h-fit items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white transition hover:bg-red-600">

          <Heart size={20} />

          Favorite

        </button>

      </div>

      {/* Description */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold">
          About this Cafe
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          {cafe.description || "No description available."}
        </p>

      </div>

      {/* Information Grid */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border p-6">

          <Wifi className="text-blue-600" />

          <h3 className="mt-4 font-semibold">
            WiFi
          </h3>

          <p className="text-gray-600">
            {cafe.wifi ? "Available" : "Not Available"}
          </p>

        </div>

        <div className="rounded-2xl border p-6">

          <Plug className="text-green-600" />

          <h3 className="mt-4 font-semibold">
            Power Sockets
          </h3>

          <p className="text-gray-600">
            {cafe.powerSockets ? "Available" : "Not Available"}
          </p>

        </div>

        <div className="rounded-2xl border p-6">

          <Volume2 className="text-orange-600" />

          <h3 className="mt-4 font-semibold">
            Noise Level
          </h3>

          <p className="text-gray-600">
            {cafe.noiseLevel}/5
          </p>

        </div>

        <div className="rounded-2xl border p-6">

          <Clock className="text-purple-600" />

          <h3 className="mt-4 font-semibold">
            Timing
          </h3>

          <p className="text-gray-600">
            {cafe.openingTime} - {cafe.closingTime}
          </p>

        </div>

      </div>

      {/* Price */}

      <div className="mt-10 rounded-2xl bg-amber-50 p-8">

        <h2 className="text-2xl font-bold">
          Price Range
        </h2>

        <p className="mt-3 text-xl font-semibold text-amber-700">
          {cafe.priceRange}
        </p>

      </div>

      {/* Google Maps Placeholder */}

      <div className="mt-10 rounded-2xl border p-8">

      <h2 className="text-2xl font-bold mb-6">
        Location
      </h2>

      <GoogleMapComponent
        latitude={cafe.latitude}
        longitude={cafe.longitude}
        name={cafe.name}
      />

      <div className="mt-6 flex gap-4">

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${cafe.latitude},${cafe.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-amber-700 px-6 py-3 text-white hover:bg-amber-800"
        >
          Open in Google Maps
        </a>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.latitude},${cafe.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border px-6 py-3 hover:bg-gray-100"
        >
          Get Directions
        </a>

      </div>

    </div>

      {/* Reviews */}

      <ReviewsSection cafeId={cafe.id} />

    </section>
  );
}