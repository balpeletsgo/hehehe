"use client";

import { RegisterForm } from "@/components/form/authentication/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  registerSchema,
  type RegisterSchema,
} from "@/server/schema/auth-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: register } = api.auth.register.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async (response) => {
      toast.success(response.message);
      form.reset();
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <div className="flex flex-col items-center gap-6">
          <Card className="w-full overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/placeholder.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-col gap-6">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
