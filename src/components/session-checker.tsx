"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function SessionChecker() {
  const { status } = useSession();
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasShownToast.current) {
      toast.error("You are not logged in!", {
        description: "Please login to continue",
        duration: 2000,
      });
      hasShownToast.current = true;
      router.push("/login");
    }
  }, [status, router]);

  return null;
}
