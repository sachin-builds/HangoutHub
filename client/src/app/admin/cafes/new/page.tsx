"use client";

import { useRouter } from "next/navigation";

import CafeForm from "@/components/admin/CafeForm";

import { createCafe } from "@/services/admin-cafe.service";

export default function NewCafePage() {
  const router = useRouter();

  async function handleSubmit(data: any) {
    try {
      await createCafe(data);

      alert("Cafe created successfully!");

      router.push("/admin/cafes");
    } catch (error) {
      console.error(error);
      alert("Failed to create cafe.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="mb-8 text-4xl font-bold">
        Add New Cafe
      </h1>

      <CafeForm onSubmit={handleSubmit} />

    </div>
  );
}