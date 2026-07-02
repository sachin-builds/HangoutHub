"use client";

import Link from "next/link";
import { Coffee, Heart, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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

            <Link href="/recommendations" className="hover:text-amber-700">
              Recommendations
            </Link>

            {user && (
              <Link
                href="/favorites"
                className="flex items-center gap-1 hover:text-amber-700"
              >
                <Heart size={18} />
                Favorites
              </Link>
            )}

          </div>

          <div className="hidden md:flex items-center gap-4">

            {!user ? (
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
            ) : (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2"
                >
                  <User />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={18} />
                  Logout
                </button>
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

              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/cafes" onClick={() => setIsOpen(false)}>
                Cafes
              </Link>

              <Link href="/recommendations" onClick={() => setIsOpen(false)}>
                Recommendations
              </Link>

              {user && (
                <>
                  <Link href="/favorites" onClick={() => setIsOpen(false)}>
                    Favorites
                  </Link>

                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      router.push("/login");
                      setIsOpen(false);
                    }}
                    className="text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="border rounded-lg p-2 text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-amber-700 text-white rounded-lg p-2 text-center"
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