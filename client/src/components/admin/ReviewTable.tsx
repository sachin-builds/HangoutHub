"use client";

import { AdminReview } from "@/services/admin-review.service";

interface Props {
  reviews: AdminReview[];
  onDelete: (id: string) => void;
}

export default function ReviewTable({
  reviews,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-amber-700 text-white">
          <tr>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Cafe</th>
            <th className="p-4 text-center">Rating</th>
            <th className="p-4 text-left">Comment</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="border-b"
            >
              <td className="p-4">
                {review.user.name}
              </td>

              <td className="p-4">
                {review.cafe.name}
              </td>

              <td className="p-4 text-center">
                ⭐ {review.rating}
              </td>

              <td className="p-4">
                {review.comment}
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() =>
                    onDelete(review.id)
                  }
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}