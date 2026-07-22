"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import CafeForm from "@/components/admin/CafeForm";

import {
  getCafeById,
} from "@/services/cafe.service";

import {
  updateCafe,
} from "@/services/admin-cafe.service";

export default function EditCafePage() {
  const params = useParams();

  const router = useRouter();

  const [cafe, setCafe] = useState<any>(null);

  useEffect(() => {
    loadCafe();
  }, []);

  async function loadCafe() {
    const data = await getCafeById(
      params.id as string
    );

    setCafe(data);
  }

  async function handleSubmit(data: any) {
    try {
      await updateCafe(
        params.id as string,
        data
      );

      alert("Cafe updated successfully!");

      router.push("/admin/cafes");
    } catch (error) {
      console.error(error);
      alert("Failed to update cafe.");
    }
  }

  if (!cafe) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="mb-8 text-4xl font-bold">
        Edit Cafe
      </h1>

      <CafeForm
        initialData={cafe}
        onSubmit={handleSubmit}
      />

    </div>
  );
}