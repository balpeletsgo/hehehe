"use client";

import { LoginForm } from "@/components/form/authentication/login-form";
import { Form } from "@/components/ui/form";
import { loginSchema, type LoginSchema } from "@/server/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onLoginSubmit(values: LoginSchema) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        form.setError("email", {
          type: "manual",
          message:
            "Credentials provided are invalid, please check your credentials and try again.",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back!", {
        duration: 2000,
      });
      form.reset();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background h-dvh w-full">
      <div className="grid h-full w-full p-0 md:grid-cols-2">
        <div className="bg-muted relative hidden md:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="mx-auto my-auto flex h-full max-h-2/4 w-full max-w-sm flex-col items-center justify-between">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Acme Inc account
            </p>
          </div>
          <Form {...form}>
            <LoginForm onLogin={onLoginSubmit} isLoading={isLoading} />
          </Form>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
