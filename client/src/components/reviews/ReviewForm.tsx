"use client";

import { useState } from "react";

import { Star } from "lucide-react";

import { createReview } from "@/services/review.service";

interface Props {
  cafeId: string;
  onSuccess: () => void;
}

export default function ReviewForm({
  cafeId,
  onSuccess,
}: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);

      await createReview({
        cafeId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      onSuccess();

      alert("Review Added!");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Unable to submit review."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-10 rounded-2xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold">
        Write a Review
      </h2>

      <div className="mt-5 flex gap-2">

        {[1, 2, 3, 4, 5].map((value) => (

          <button
            key={value}
            onClick={() => setRating(value)}
          >
            <Star
              size={30}
              className={
                value <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>

        ))}

      </div>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Share your experience..."
        className="mt-5 h-32 w-full rounded-xl border p-4"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="mt-5 rounded-xl bg-amber-700 px-6 py-3 text-white hover:bg-amber-800"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </div>
  );
}