"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignOutButton(): JSX.Element {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => void signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="h-3.5 w-3.5" />
      Déconnexion
    </Button>
  );
}
