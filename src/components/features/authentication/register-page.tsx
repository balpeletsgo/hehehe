"use client";

import { RegisterForm } from "@/components/form/authentication/register-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  registerSchema,
  type RegisterSchema,
} from "@/server/schema/auth-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: register } = api.auth.register.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async (response) => {
      toast.success(response.message, {
        description: "You can now login to your account",
      });
      form.reset();
      router.push("/login");
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      if (error.message === "Username is already taken") {
        form.setError("username", {
          type: "manual",
          message: "Username is already taken",
        });
      }
      if (error.message === "Email is already taken") {
        form.setError("email", {
          type: "manual",
          message: "Email is already taken",
        });
      }
    },
  });

  async function onRegisterSubmit(values: RegisterSchema) {
    try {
      await register(values);
    } catch (error) {
      console.error(error);
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
        <div className="mx-auto my-auto flex h-full max-h-5/6 w-full max-w-md flex-col items-center justify-between">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-balance">
              Create an account to get started
            </p>
          </div>
          <Form {...form}>
            <RegisterForm
              onRegisterSubmit={onRegisterSubmit}
              isLoading={isLoading}
            />
          </Form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
