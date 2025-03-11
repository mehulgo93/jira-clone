"use client";

import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useEffect } from "react";
import { useLogout } from "@/features/auth/api/use-logout";
import { Button } from "@/components/ui/button";
export default function Home() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  const { mutate: logout } = useLogout();
  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);
  return (
    <div className="flex gap-4">
      only visible to authenticated users
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
