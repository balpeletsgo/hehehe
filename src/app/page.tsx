import CreatePost from "@/components/features/posts/post-create";
import PostList from "@/components/features/posts/post-list";
import Logout from "@/components/form/authentication/logout";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center gap-4 pt-8 lg:max-w-xl">
      {session && <CreatePost />}
      {session && <Logout />}
      <PostList />
    </main>
  );
}
