"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
      return;
    }

    const parsed = JSON.parse(user);

    if (parsed.role !== "ADMIN") {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}