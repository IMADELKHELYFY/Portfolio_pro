"use client";

import { Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { submitComment } from "@/app/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { idleState } from "@/lib/form";
import { formatDate } from "@/lib/utils";

export type PublicComment = {
  id: string;
  authorName: string;
  content: string;
  createdAt: Date;
};

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="self-start">
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      {pending ? "Envoi…" : "Publier"}
    </Button>
  );
}

export function CommentSection({
  projectId,
  comments,
}: {
  projectId: string;
  comments: PublicComment[];
}): JSX.Element {
  const [state, formAction] = useFormState(submitComment, idleState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-mono text-sm font-semibold tracking-tight">
        Commentaires{" "}
        <span className="text-muted-foreground">({comments.length})</span>
      </h2>

      {comments.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          Aucun commentaire pour l&apos;instant.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-md border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium">
                  {comment.authorName}
                </span>
                <span className="font-mono text-2xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-4 rounded-md border border-border bg-card p-4"
      >
        <p className="label-mono">laisser un commentaire</p>
        <input type="hidden" name="projectId" value={projectId} />

        {/* Honeypot : masqué aux humains, rempli par les bots */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Site web (ne pas remplir)</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="authorName">Nom</Label>
          <Input
            id="authorName"
            name="authorName"
            required
            maxLength={60}
            placeholder="Ton prénom"
            className="max-w-xs"
          />
          {state.fieldErrors?.authorName ? (
            <p role="alert" className="font-mono text-2xs text-destructive">
              {state.fieldErrors.authorName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="content">Commentaire</Label>
          <Textarea
            id="content"
            name="content"
            required
            maxLength={1000}
            placeholder="Une question, une remarque sur la méthode…"
          />
          {state.fieldErrors?.content ? (
            <p role="alert" className="font-mono text-2xs text-destructive">
              {state.fieldErrors.content}
            </p>
          ) : null}
        </div>

        {state.status !== "idle" ? (
          <p
            role="status"
            className={
              state.status === "error"
                ? "rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-2xs text-destructive"
                : "rounded-sm border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-2xs text-primary"
            }
          >
            {state.message}
          </p>
        ) : null}

        <p className="font-mono text-2xs text-muted-foreground">
          Les commentaires sont publiés après modération.
        </p>

        <SubmitButton />
      </form>
    </section>
  );
}
