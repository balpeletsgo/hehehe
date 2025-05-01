"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Logout() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };
  return (
    <Button onClick={onSignOut} disabled={isSigningOut}>
      {isSigningOut ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Logging out...</span>
        </>
      ) : (
        <span>Logout</span>
      )}
    </Button>
  );
}
