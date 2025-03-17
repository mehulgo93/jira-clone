import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div>This is the home page</div>;
}

// await or asynchornous functions can only be used in the server components
