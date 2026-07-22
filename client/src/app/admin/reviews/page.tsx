"use client";

import { useEffect, useState } from "react";

import ReviewTable from "@/components/admin/ReviewTable";

import {
  getReviews,
  deleteReview,
  AdminReview,
} from "@/services/admin-review.service";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [search, setSearch] = useState("");

  async function loadReviews() {
    const data = await getReviews(search);
    setReviews(data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadReviews();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?"))
      return;

    try {
      await deleteReview(id);
      loadReviews();
    } catch (error) {
      console.error(error);
      alert("Failed to delete review.");
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Reviews
        </h1>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-xl border px-4 py-2"
        />
      </div>

      <ReviewTable
        reviews={reviews}
        onDelete={handleDelete}
      />
    </div>
  );
}