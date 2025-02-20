import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = () => {
  //@ts-ignore
  return <SignInCard />;
};

export default SignInPage;

// 1. important to do default export because export const is not a react component
// 2. important to do export default because it is a react component
