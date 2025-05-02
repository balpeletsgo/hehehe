"use client";

import { CreatePostForm } from "@/components/form/posts/create-post-form";
import { Form } from "@/components/ui/form";
import { postSchema, type PostSchema } from "@/server/schema/post-schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const trpc = api.useUtils();

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      post: "",
    },
  });

  const { mutateAsync: createPost } = api.post.create.useMutation({
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
      form.reset();
      void trpc.post.getPosts.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onCreatePost(values: PostSchema) {
    try {
      await createPost(values);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <CreatePostForm onCreatePost={onCreatePost} isLoading={isLoading} />
    </Form>
  );
}
