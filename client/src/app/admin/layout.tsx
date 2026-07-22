"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Coffee,
  Users,
  Star,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-gray-100">

        <aside className="w-72 bg-white border-r shadow-sm">

          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-amber-700">
              HangoutHub
            </h1>

            <p className="text-gray-500">
              Admin Panel
            </p>
          </div>

          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-amber-50"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/admin/cafes"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-amber-50"
            >
              <Coffee size={20} />
              Cafes
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-amber-50"
            >
              <Users size={20} />
              Users
            </Link>

            <Link
              href="/admin/reviews"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-amber-50"
            >
              <Star size={20} />
              Reviews
            </Link>
          </nav>

        </aside>

        <main className="flex-1 p-10">
          {children}
        </main>

      </div>
    </AdminGuard>
  );
}