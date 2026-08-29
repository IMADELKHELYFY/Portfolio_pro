"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import type { ActionState } from "@/lib/form";

type ConfirmActionProps = {
  action: () => Promise<ActionState>;
  title: string;
  description: string;
  confirmLabel?: string;
  trigger: ReactNode;
};

/** Bouton d'action destructive : confirmation en Dialog puis Server Action. */
export function ConfirmAction({
  action,
  title,
  description,
  confirmLabel = "Supprimer",
  trigger,
}: ConfirmActionProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  function run(): void {
    startTransition(async () => {
      const result = await action();
      toast({
        title: result.status === "error" ? "Échec" : "Fait",
        description: result.message,
        variant: result.status === "error" ? "destructive" : "success",
      });
      if (result.status !== "error") {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={pending}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={run} disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
