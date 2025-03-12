import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";
const SignInPage = async () => {
  const user = await getCurrent();
  if (user) {
    redirect("/");
  }
  return <SignInCard />;
};

export default SignInPage;

// 1. important to do default export because export const is not a react component
// 2. important to do export default because it is a react component
