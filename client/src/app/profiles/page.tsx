"use client";

import { useEffect, useState } from "react";
import { User, Mail, Heart, Star } from "lucide-react";

import { getProfile } from "@/services/user.service";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-amber-700 flex items-center justify-center">

            <User
              size={55}
              className="text-white"
            />

          </div>

          <h1 className="text-3xl font-bold mt-6">
            {user.name}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-gray-600">

            <Mail size={18} />

            {user.email}

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div className="rounded-2xl bg-red-50 p-6">

            <div className="flex items-center gap-3">

              <Heart className="text-red-500" />

              <h2 className="font-bold text-xl">

                Favorites

              </h2>

            </div>

            <p className="text-5xl font-bold mt-5">

              {user.favorites.length}

            </p>

          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">

            <div className="flex items-center gap-3">

              <Star className="text-yellow-500" />

              <h2 className="font-bold text-xl">

                Reviews

              </h2>

            </div>

            <p className="text-5xl font-bold mt-5">

              {user.reviews.length}

            </p>

          </div>

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">

            Favorite Cafes

          </h2>

          {user.favorites.length === 0 ? (
            <p>No favorite cafes yet.</p>
          ) : (
            <div className="space-y-3">
              {user.favorites.map((favorite: any) => (
                <div
                  key={favorite.id}
                  className="border rounded-xl p-4"
                >
                  {favorite.cafe.name}
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">

            Recent Reviews

          </h2>

          {user.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {user.reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border rounded-xl p-4"
                >
                  <div className="font-semibold">
                    {review.cafe.name}
                  </div>

                  <div className="text-yellow-500">
                    ⭐ {review.rating}/5
                  </div>

                  <p className="text-gray-600 mt-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}