"use client";

import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);
  return <div className="flex gap-4">only visible to authenticated users</div>;
}
