import Logout from "@/components/form/authentication/logout";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Hello {session.user.firstName} {session.user.lastName} !
      </h1>
      <Logout />
    </main>
  );
}
