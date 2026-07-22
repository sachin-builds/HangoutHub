"use client";

import { useState } from "react";

import { createReview } from "@/services/review.service";

interface Props {
  cafeId: string;
  refresh: () => void;
}

export default function AddReview({
  cafeId,
  refresh,
}: Props) {
  const [rating, setRating] = useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createReview({
        cafeId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      refresh();

      alert("Review added");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-6 mt-10"
    >
      <h2 className="text-2xl font-bold">
        Write Review
      </h2>

      <select
        className="border rounded-lg p-3 mt-4 w-full"
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r}>
            {r}
          </option>
        ))}
      </select>

      <textarea
        className="border rounded-lg p-3 mt-4 w-full"
        rows={4}
        value={comment}
        placeholder="Write review..."
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        disabled={loading}
        className="mt-5 rounded-xl bg-amber-700 px-6 py-3 text-white"
      >
        {loading
          ? "Posting..."
          : "Post Review"}
      </button>
    </form>
  );
}