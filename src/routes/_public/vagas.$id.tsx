import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  FileText,
  GraduationCap,
  MapPin,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABEL, getJob, JOBS } from '@/lib/jobs'
import { HomeHeader } from '@/pages/home/components/home-header'
import { SiteFooter } from '@/pages/home/components/site-footer'

export const Route = createFileRoute('/_public/vagas/$id')({
  loader: ({ params }) => {
    const job = getJob(params.id)

    if (!job) throw notFound()

    return { job }
  },
  component: JobDetail,
})

function JobDetail() {
  const { job } = Route.useLoaderData()
  const isDocente = job.category === 'docente'
  const related = JOBS.filter(
    (item) => item.category === job.category && item.id !== job.id,
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <div className="border-b border-border bg-hero">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às vagas
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                  isDocente
                    ? 'bg-gradient-navy text-primary-foreground'
                    : 'bg-gradient-gold text-accent-foreground'
                }`}
              >
                {isDocente ? (
                  <GraduationCap className="h-6 w-6" />
                ) : (
                  <Briefcase className="h-6 w-6" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {CATEGORY_LABEL[job.category]}
                </p>
                <h1 className="mt-1 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                  {job.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.faculty} · Universidade Metodista de Angola
                </p>
              </div>
            </div>

            <Button asChild size="lg" className="gap-2 shadow-elegant">
              <Link to="/dashboard">
                <Send className="h-4 w-4" />
                Candidatar-me
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline">{job.contract}</Badge>
            <Badge variant="outline">{job.regime}</Badge>
            <Badge variant="outline">{job.level}</Badge>
            <Badge className="border-accent/40 bg-accent/20 text-accent-foreground">
              {job.applicants} candidatos
            </Badge>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-10">
          <Section title="Sobre a vaga">
            {job.description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </Section>

          <Section title="Requisitos">
            <List items={job.requirements} />
          </Section>

          <Section title="O que oferecemos">
            <List items={job.benefits} />
          </Section>

          <Section title="Documentos exigidos">
            <ul className="grid gap-2 sm:grid-cols-2">
              {job.documents.map((document) => (
                <li
                  key={document}
                  className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-sm text-foreground/85"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {document}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg text-foreground">Resumo</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <Info
                icon={<MapPin className="h-4 w-4" />}
                label="Local"
                value={job.location}
              />
              <Info
                icon={<CalendarClock className="h-4 w-4" />}
                label="Prazo de candidatura"
                value={job.deadline}
              />
              <Info
                icon={<Users className="h-4 w-4" />}
                label="Candidaturas recebidas"
                value={`${job.applicants}`}
              />
              <Info
                icon={<Sparkles className="h-4 w-4" />}
                label="Publicada"
                value={`há ${job.openedDaysAgo} dias`}
              />
            </dl>
            <Button asChild className="mt-6 w-full gap-2">
              <Link to="/dashboard">
                <Send className="h-4 w-4" />
                Candidatar-me
              </Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Processo 100% online e confidencial.
            </p>
          </div>

          {related.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
              <h2 className="font-display text-lg text-foreground">
                Vagas semelhantes
              </h2>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="/vagas/$id"
                      params={{ id: item.id }}
                      className="block rounded-xl border border-transparent p-2 transition-smooth hover:border-border hover:bg-muted"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.faculty}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </main>

      <SiteFooter />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm text-foreground/85"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}
