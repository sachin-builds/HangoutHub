"use client";

import { AdminUser } from "@/types/user";

interface Props {
  users: AdminUser[];
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-amber-700 text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Reviews</th>
            <th className="p-4">Favorites</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b"
            >
              <td className="p-4">{user.name}</td>

              <td className="p-4">{user.email}</td>

              <td className="p-4 text-center">
                {user.role}
              </td>

              <td className="p-4 text-center">
                {user.reviews.length}
              </td>

              <td className="p-4 text-center">
                {user.favorites.length}
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onDelete(user.id)}
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