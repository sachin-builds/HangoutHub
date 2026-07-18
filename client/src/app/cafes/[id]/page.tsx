"use client";

import { useParams } from "next/navigation";

import { useCafe } from "@/hooks/useCafe";
import CafeDetails from "@/components/cafe/CafeDetails";

export default function CafePage() {
  const params = useParams();

  const id = params.id as string;

  const { cafe, loading, error } = useCafe(id);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-xl font-semibold">
        Loading cafe...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Cafe not found.
      </div>
    );
  }

  return <CafeDetails cafe={cafe} />;
}