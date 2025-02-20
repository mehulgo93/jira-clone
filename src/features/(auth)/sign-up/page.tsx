import { SignUpCard } from "@/features/auth/components/sign-up-card";

const SignUpPage = () => {
  //@ts-ignore
  return <SignUpCard />;
};

export default SignUpPage;

// 1. important to do default export because export const is not a react component
// 2. important to do export default because it is a react component
