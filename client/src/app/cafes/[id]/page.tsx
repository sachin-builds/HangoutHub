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
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  if (error || !cafe) {
    return (
      <div className="flex justify-center py-20 text-red-500">
        Cafe not found.
      </div>
    );
  }

  return <CafeDetails cafe={cafe} />;
}