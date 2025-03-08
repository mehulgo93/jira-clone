import { Schema, z } from "zod";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/api/use-login";
export const SignInCard = () => {
  const { mutate: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login({ json: values });
    form.reset();
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center p-7">
        <CardTitle className="text-2xl"> Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      {...field}
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                      min={8}
                      max={256}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size="lg" className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Don't have an account?</p>

        <Link href="/sign-up">
          <span className="text-blue-700">&nbsp;Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
};
