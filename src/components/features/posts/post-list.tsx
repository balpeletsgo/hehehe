"use client";

import { api } from "@/trpc/react";
import PostItem from "@/components/features/posts/post-item";

export default function PostList() {
  const { data: posts, isLoading } = api.post.getPosts.useQuery();

  console.log({ posts });

  return (
    <div className="flex w-full flex-col gap-2">
      {isLoading ? (
        <p>Loading...</p>
      ) : posts?.data && posts.data.length > 0 ? (
        posts.data.map((post) => (
          <PostItem
            key={post.id}
            post={post.post}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
