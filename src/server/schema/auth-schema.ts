import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
  .extend({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(1, "First name is required")
      .max(255, "First name cannot be longer than 255 characters"),
    lastName: z
      .string()
      .max(255, "Last name cannot be longer than 255 characters")
      .optional(),
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username is required")
      .max(255, "Username cannot be longer than 255 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
