import { Link } from '@tanstack/react-router'
import {
  Briefcase,
  Clock3,
  GraduationCap,
  MapPin,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABEL, type Job } from '@/lib/jobs'

export function JobCard({ job }: { job: Job }) {
  const isDocente = job.category === 'docente'

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant sm:p-6">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            isDocente
              ? 'bg-gradient-navy text-primary-foreground'
              : 'bg-gradient-gold text-accent-foreground'
          }`}
        >
          {isDocente ? (
            <GraduationCap className="h-5 w-5" />
          ) : (
            <Briefcase className="h-5 w-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {CATEGORY_LABEL[job.category]}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug text-foreground">
            <Link
              to="/vagas/$id"
              params={{ id: job.id }}
              className="transition-smooth hover:text-primary"
            >
              {job.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{job.faculty}</p>
        </div>

        {job.openedDaysAgo <= 5 && (
          <Badge className="shrink-0 border-accent/40 bg-accent/20 text-accent-foreground">
            Nova
          </Badge>
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip>{job.contract}</Chip>
        <Chip>{job.regime}</Chip>
        <Chip>{job.level}</Chip>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" /> há {job.openedDaysAgo} dias
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> {job.applicants} candidatos
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">
          Prazo:{' '}
          <span className="font-medium text-foreground">{job.deadline}</span>
        </p>
        <Button asChild size="sm" className="gap-2">
          <Link to="/vagas/$id" params={{ id: job.id }}>
            Ver vaga
          </Link>
        </Button>
      </div>
    </article>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-foreground/80">
      {children}
    </span>
  )
}
