"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { registerUser } from "@/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      alert("Registration Successful!");

      router.push("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Join HangoutHub today.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

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
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
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
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
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
          type="submit"
          disabled={loading}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
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