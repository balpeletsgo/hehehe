import LoginPage from "@/components/features/authentication/login-page";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
}
