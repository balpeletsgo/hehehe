import RegisterPage from "@/components/features/authentication/register-page";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return <RegisterPage />;
}
