"use client";

import { Star, MessageSquare } from "lucide-react";

import { useReviews } from "@/hooks/useReviews";

interface Props {
  cafeId: string;
}

export default function ReviewsSection({ cafeId }: Props) {
  const {
    reviews,
    averageRating,
    totalReviews,
    loading,
  } = useReviews(cafeId);

  if (loading) {
    return (
      <div className="rounded-2xl border p-8 mt-10">
        Loading reviews...
      </div>
    );
  }

  return (
    <section className="mt-12">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Reviews
          </h2>

          <p className="text-gray-500 mt-2">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-xl bg-yellow-100 px-5 py-3">

          <Star
            className="fill-yellow-400 text-yellow-400"
            size={22}
          />

          <span className="text-xl font-bold">
            {averageRating.toFixed(1)}
          </span>

        </div>

      </div>

      {/* Empty */}

      {reviews.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">

          <MessageSquare
            className="mx-auto mb-4 text-gray-400"
            size={42}
          />

          <h3 className="text-xl font-semibold">
            No reviews yet
          </h3>

          <p className="mt-2 text-gray-500">
            Be the first person to review this cafe.
          </p>

        </div>
      )}

      {/* Reviews */}

      <div className="mt-8 space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-lg">
                  {review.user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />

                ))}

              </div>

            </div>

            {review.comment && (

              <p className="mt-5 text-gray-700 leading-7">
                {review.comment}
              </p>

            )}

          </div>

        ))}

      </div>

    </section>
  );
}