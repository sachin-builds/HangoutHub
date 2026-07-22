"use client";

import Image from "next/image";
import { User, Heart, Star, Mail } from "lucide-react";

import { useProfile } from "@/hooks/useProfile";
import CafeCard from "@/components/cards/CafeCard";

export default function ProfilePage() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-20">
        Failed to load profile.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="rounded-3xl bg-white shadow-lg p-8">

        <div className="flex items-center gap-6">

          <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
            <User size={50} className="text-amber-700" />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {profile.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-600">

              <Mail size={18} />

              {profile.email}

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-red-50 p-6">

          <Heart className="text-red-500" />

          <h2 className="mt-4 text-3xl font-bold">
            {profile.favorites.length}
          </h2>

          <p>Favorite Cafes</p>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-6">

          <Star className="text-yellow-500" />

          <h2 className="mt-4 text-3xl font-bold">
            {profile.reviews.length}
          </h2>

          <p>Reviews Written</p>

        </div>

        <div className="rounded-2xl bg-blue-50 p-6">

          <User className="text-blue-500" />

          <h2 className="mt-4 text-3xl font-bold">
            Active
          </h2>

          <p>Account Status</p>

        </div>

      </div>

      <div className="mt-14">

        <h2 className="text-3xl font-bold">
          Favorite Cafes
        </h2>

        {profile.favorites.length === 0 ? (

          <p className="mt-5 text-gray-500">
            No favorite cafes yet.
          </p>

        ) : (

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {profile.favorites.map((favorite: any) => (

              <CafeCard
                key={favorite.id}
                cafe={favorite.cafe}
              />

            ))}

          </div>

        )}

      </div>

    </section>
  );
}