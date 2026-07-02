"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { loginUser } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

      const data = await loginUser(formData);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      router.push("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center">
        Welcome Back
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Login to your HangoutHub account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
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
              onClick={() =>
                setShowPassword(!showPassword)
              }
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

        <div className="text-right">
          <Link
            href="#"
            className="text-amber-700 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Don't have an account?

        <Link
          href="/register"
          className="text-amber-700 font-semibold ml-1"
        >
          Register
        </Link>
      </p>
    </div>
  );
}