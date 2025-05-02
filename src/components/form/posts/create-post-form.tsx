"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type PostSchema } from "@/server/schema/post-schema";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface CreatePostFormProps {
  onCreatePost: (values: PostSchema) => void;
  isLoading: boolean;
}

export function CreatePostForm({
  onCreatePost,
  isLoading,
}: CreatePostFormProps) {
  const form = useFormContext<PostSchema>();

  return (
    <form
      onSubmit={form.handleSubmit(onCreatePost)}
      className="flex w-full flex-col gap-2"
    >
      <FormField
        control={form.control}
        name="post"
        render={({ field }) => (
          <FormItem>
            <Textarea
              placeholder="How was your day?"
              className="h-24 max-h-36 resize-none"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span className="flex items-center gap-2">Creating...</span>
          </>
        ) : (
          "Create Post"
        )}
      </Button>
    </form>
  );
}
