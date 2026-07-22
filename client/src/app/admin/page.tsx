"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Coffee,
  Users,
  Star,
  Heart,
  Plus,
} from "lucide-react";

import { getDashboardStats } from "@/services/admin.service";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    cafes: 0,
    users: 0,
    reviews: 0,
    favorites: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your HangoutHub platform
          </p>
        </div>

        <Link
          href="/admin/cafes/new"
          className="flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-3 text-white hover:bg-amber-800"
        >
          <Plus size={18} />
          Add Cafe
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card
          icon={<Coffee size={34} />}
          value={stats.cafes}
          label="Cafes"
        />

        <Card
          icon={<Users size={34} />}
          value={stats.users}
          label="Users"
        />

        <Card
          icon={<Star size={34} />}
          value={stats.reviews}
          label="Reviews"
        />

        <Card
          icon={<Heart size={34} />}
          value={stats.favorites}
          label="Favorites"
        />
      </div>
    </div>
  );
}

function Card({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      {icon}

      <h2 className="mt-5 text-3xl font-bold">
        {value}
      </h2>

      <p className="text-gray-500">
        {label}
      </p>
    </div>
  );
}