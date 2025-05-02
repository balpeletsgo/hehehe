import { z } from "zod";

export const postSchema = z.object({
  post: z
    .string({ required_error: "Post cannot be empty" })
    .min(1, "Post cannot be empty"),
});

export type PostSchema = z.infer<typeof postSchema>;
