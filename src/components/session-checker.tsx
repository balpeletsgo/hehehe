"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function SessionChecker() {
  const { status } = useSession();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasShownToast.current) {
      toast.error("You are not logged in!", {
        description: "Login to create a post",
        duration: 2000,
      });
      hasShownToast.current = true;
    }
  }, [status]);

  return null;
}
