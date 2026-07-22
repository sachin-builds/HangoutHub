"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import {
  getAdminCafes,
  deleteCafe,
} from "@/services/admin-cafe.service";

export default function AdminCafesPage() {
  const [cafes, setCafes] = useState<any[]>([]);

  async function loadCafes() {
    const data = await getAdminCafes();
    setCafes(data);
  }

  useEffect(() => {
    loadCafes();
  }, []);

  async function handleDelete(id: string) {
    const ok = confirm(
      "Delete this cafe?"
    );

    if (!ok) return;

    await deleteCafe(id);

    loadCafes();
  }

  return (
    <div>

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold">
          Manage Cafes
        </h1>

        <Link
          href="/admin/cafes/new"
          className="flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-white"
        >
          <Plus size={18}/>
          Add Cafe
        </Link>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                City
              </th>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {cafes.map((cafe)=>(
              <tr
                key={cafe.id}
                className="border-t"
              >

                <td className="p-4">
                  {cafe.name}
                </td>

                <td className="p-4">
                  {cafe.city}
                </td>

                <td className="p-4">
                  {cafe.priceRange}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/cafes/${cafe.id}`}
                    >
                      <Pencil
                        size={18}
                      />
                    </Link>

                    <button
                      onClick={()=>handleDelete(cafe.id)}
                    >
                      <Trash2
                        size={18}
                        className="text-red-500"
                      />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}