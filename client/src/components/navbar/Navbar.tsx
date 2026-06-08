"use client";

import Link from "next/link";
import { Coffee, Heart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl text-amber-700"
          >
            <Coffee size={30} />
            HangoutHub
          </Link>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="hover:text-amber-700 transition"
            >
              Home
            </Link>

            <Link
              href="/cafes"
              className="hover:text-amber-700 transition"
            >
              Cafes
            </Link>

            <Link
              href="/recommendations"
              className="hover:text-amber-700 transition"
            >
              Recommendations
            </Link>

            <Link
              href="/favorites"
              className="hover:text-amber-700 transition flex items-center gap-1"
            >
              <Heart size={18} />
              Favorites
            </Link>
          </div>

          {/* Desktop Buttons */}

          <div className="hidden md:flex items-center gap-3">

            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
            >
              Register
            </Link>

            <Link href="/profile">
              <User className="hover:text-amber-700 transition" />
            </Link>

          </div>

          {/* Mobile Button */}

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </button>

        </div>

        {/* Mobile Menu */}

        {isOpen && (

          <div className="md:hidden pb-5">

            <div className="flex flex-col gap-4">

              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/cafes" onClick={() => setIsOpen(false)}>
                Cafes
              </Link>

              <Link href="/recommendations" onClick={() => setIsOpen(false)}>
                Recommendations
              </Link>

              <Link href="/favorites" onClick={() => setIsOpen(false)}>
                Favorites
              </Link>

              <Link href="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              <Link
                href="/login"
                className="border rounded-lg p-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-amber-700 text-white rounded-lg p-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>

            </div>

          </div>

        )}

      </div>
    </nav>
  );
}