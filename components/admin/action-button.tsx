"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { ActionState } from "@/lib/form";

type ActionButtonProps = {
  action: () => Promise<ActionState>;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

/** Déclenche une Server Action sans confirmation, avec état de chargement. */
export function ActionButton({
  action,
  children,
  variant = "outline",
  size = "sm",
  className,
}: ActionButtonProps): JSX.Element {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await action();
          toast({
            title: result.status === "error" ? "Échec" : "Fait",
            description: result.message,
            variant: result.status === "error" ? "destructive" : "success",
          });
          router.refresh();
        })
      }
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
      {children}
    </Button>
  );
}
