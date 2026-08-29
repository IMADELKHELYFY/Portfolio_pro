import { Check, Trash2 } from "lucide-react";
import Link from "next/link";

import { approveComment, deleteComment } from "@/app/actions/comments";
import { ActionButton } from "@/components/admin/action-button";
import { ConfirmAction } from "@/components/admin/confirm-action";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Commentaires" };
export const dynamic = "force-dynamic";

type CommentWithProject = {
  id: string;
  content: string;
  authorName: string;
  approved: boolean;
  createdAt: Date;
  project: { title: string; slug: string };
};

function CommentCard({ comment }: { comment: CommentWithProject }): JSX.Element {
  return (
    <li className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm font-medium">{comment.authorName}</span>
        <Badge variant={comment.approved ? "accent" : "warning"}>
          {comment.approved ? "approuvé" : "en attente"}
        </Badge>
        <span className="font-mono text-2xs text-muted-foreground">
          {formatDate(comment.createdAt)}
        </span>
        <Link
          href={`/projects/${comment.project.slug}`}
          target="_blank"
          className="font-mono text-2xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          → {comment.project.title}
        </Link>
      </div>

      <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed">
        {comment.content}
      </p>

      <div className="mt-3 flex items-center gap-1.5">
        {comment.approved ? null : (
          <ActionButton action={approveComment.bind(null, comment.id)}>
            <Check className="h-3.5 w-3.5" />
            Approuver
          </ActionButton>
        )}
        <ConfirmAction
          action={deleteComment.bind(null, comment.id)}
          title="Supprimer ce commentaire ?"
          description="Action irréversible."
          trigger={
            <Button variant="destructive" size="sm">
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer
            </Button>
          }
        />
      </div>
    </li>
  );
}

export default async function CommentsPage(): Promise<JSX.Element> {
  const [pending, approved] = await Promise.all([
    prisma.comment.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
      include: { project: { select: { title: true, slug: true } } },
    }),
    prisma.comment.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { project: { select: { title: true, slug: true } } },
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label-mono">modération</p>
        <h1 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
          Commentaires
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:max-w-md">
        <StatCard
          label="En attente"
          value={String(pending.length)}
          accent={pending.length > 0}
        />
        <StatCard label="Approuvés" value={String(approved.length)} />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-sm font-semibold tracking-tight">
          File de modération
        </h2>
        {pending.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            Rien à modérer.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pending.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-sm font-semibold tracking-tight">
          Publiés{" "}
          <span className="text-muted-foreground">({approved.length})</span>
        </h2>
        {approved.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            Aucun commentaire publié.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {approved.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
