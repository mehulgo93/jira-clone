import { UserButton } from "@/features/auth/components/user-button";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <UserButton />
    </div>
  );
}

// await or asynchornous functions can only be used in the server components
