"use client";

import Link from "next/link";
import { Coffee, Heart, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-16 items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl text-amber-700"
          >
            <Coffee size={30} />
            HangoutHub
          </Link>

          <div className="hidden md:flex items-center gap-8">

            <Link href="/" className="hover:text-amber-700">
              Home
            </Link>

            <Link href="/cafes" className="hover:text-amber-700">
              Cafes
            </Link>

            <Link
              href="/recommendations"
              className="hover:text-amber-700"
            >
              Recommendations
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-1 hover:text-amber-700"
            >
              <Heart size={18} />
              Favorites
            </Link>

          </div>

          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <>

                <span className="font-medium">
                  Hi, {user.name}
                </span>

                <Link href="/profile">
                  <User className="hover:text-amber-700" />
                </Link>

                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800"
                >
                  Register
                </Link>

              </>
            )}

          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </button>

        </div>

        {isOpen && (

          <div className="md:hidden pb-5">

            <div className="flex flex-col gap-4">

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/cafes"
                onClick={() => setIsOpen(false)}
              >
                Cafes
              </Link>

              <Link
                href="/recommendations"
                onClick={() => setIsOpen(false)}
              >
                Recommendations
              </Link>

              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
              >
                Favorites
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="border rounded-lg p-2"
                >
                  Logout
                </button>
              ) : (
                <>
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
                </>
              )}

            </div>

          </div>

        )}

      </div>
    </nav>
  );
}