"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Join HangoutHub today.
      </p>

      <form className="mt-8 space-y-5">

        {/* Name */}

        <div>

          <label className="font-medium">
            Full Name
          </label>

          <div className="relative mt-2">

            <User
              size={20}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="font-medium">
            Email
          </label>

          <div className="relative mt-2">

            <Mail
              size={20}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="font-medium">
            Password
          </label>

          <div className="relative mt-2">

            <Lock
              size={20}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full border rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Button */}

        <button
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-semibold transition"
        >
          Create Account
        </button>

      </form>

      <p className="mt-6 text-center">

        Already have an account?

        <Link
          href="/login"
          className="text-amber-700 font-semibold ml-1"
        >
          Login
        </Link>

      </p>

    </div>
  );
}