import {
  Award,
  GraduationCap,
  Languages as LanguagesIcon,
  Link2,
  Mail,
  MapPin,
  Phone,
  Terminal,
} from "lucide-react";

import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import {
  certifications,
  education,
  experiences,
  languages,
  method,
  profile,
  stack,
} from "@/lib/profile";

export const metadata = {
  title: "À propos",
  description: `${profile.name} — ${profile.role}. Parcours, compétences et contact.`,
};

export const dynamic = "force-dynamic";

function ContactChip({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof Mail;
  label: string;
  href?: string;
}): JSX.Element {
  const className =
    "inline-flex items-center gap-2 rounded-sm border border-border bg-card px-2.5 py-1.5 font-mono text-2xs transition-colors hover:border-primary/40 hover:text-primary";

  const content = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
      {label}
    </>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

export default async function AboutPage(): Promise<JSX.Element> {
  const [projectCount, categoryCount, commentCount] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.comment.count({ where: { approved: true } }),
  ]);

  return (
    <>
      <section className="border-b border-border bg-dot-grid">
        <div className="container py-14">
          <p className="label-mono">à propos</p>
          <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-primary">{profile.role}</p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.intro}
          </p>

          <p className="mt-4 inline-block rounded-sm border border-primary/30 bg-primary/5 px-2.5 py-1.5 font-mono text-2xs text-primary">
            {profile.availability}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <ContactChip
              icon={Mail}
              label={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactChip
              icon={Phone}
              label={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            />
            <ContactChip icon={MapPin} label={profile.location} />
            <ContactChip icon={Link2} label="LinkedIn" href={profile.linkedin} />
            <ContactChip icon={Terminal} label="GitHub" href={profile.github} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg">
            <StatCard label="Projets" value={String(projectCount)} accent />
            <StatCard label="Domaines" value={String(categoryCount)} />
            <StatCard label="Retours" value={String(commentCount)} />
          </div>
        </div>
      </section>

      <div className="container grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">
              Expériences
            </h2>
            <ol className="flex flex-col gap-3">
              {experiences.map((experience) => (
                <li
                  key={`${experience.company}-${experience.period}`}
                  className="rounded-md border border-border bg-card p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-sm font-medium">
                      {experience.role}
                      {experience.current ? (
                        <Badge variant="accent" className="ml-2 align-middle">
                          en cours
                        </Badge>
                      ) : null}
                    </p>
                    <span className="font-mono text-2xs text-muted-foreground">
                      {experience.period}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-2xs text-primary">
                    {experience.company}
                  </p>

                  <ul className="mt-3 flex flex-col gap-1.5">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {experience.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
              <GraduationCap className="h-4 w-4 text-primary" />
              Formation
            </h2>
            <ul className="overflow-hidden rounded-md border border-border">
              {education.map((item) => (
                <li
                  key={item.degree}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-4 py-3 last:border-0"
                >
                  <div>
                    <p className="font-mono text-sm">{item.degree}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.school} — {item.place}
                    </p>
                  </div>
                  <span className="font-mono text-2xs text-muted-foreground">
                    {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">
              Méthode
            </h2>
            <ol className="grid gap-3 sm:grid-cols-3">
              {method.map((item) => (
                <li
                  key={item.step}
                  className="rounded-md border border-border bg-card p-4"
                >
                  <span className="font-mono text-sm font-semibold text-primary">
                    {item.step}
                  </span>
                  <p className="mt-1 font-mono text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">Stack</h2>
            <dl className="flex flex-col gap-3">
              {Object.entries(stack).map(([group, items]) => (
                <div key={group} className="flex flex-col gap-1.5">
                  <dt className="label-mono">{group}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
              <Award className="h-4 w-4 text-primary" />
              Certifications
            </h2>
            <ul className="flex flex-col gap-1.5">
              {certifications.map((certification) => (
                <li
                  key={certification.title}
                  className="rounded-sm border border-border bg-card px-3 py-2"
                >
                  <p className="font-mono text-2xs text-primary">
                    {certification.issuer}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug">{certification.title}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
              <LanguagesIcon className="h-4 w-4 text-primary" />
              Langues
            </h2>
            <dl className="overflow-hidden rounded-md border border-border">
              {languages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-baseline justify-between gap-2 border-b border-border px-3 py-2 last:border-0"
                >
                  <dt className="font-mono text-xs">{language.name}</dt>
                  <dd className="font-mono text-2xs text-muted-foreground">
                    {language.level}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-col gap-3 rounded-md border border-primary/30 bg-primary/5 p-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">
              Me contacter
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Ouvert aux opportunités d&apos;alternance en data, à partir de
              septembre 2026.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild size="sm">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-3.5 w-3.5" />
                  Écrire un mail
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Link2 className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
