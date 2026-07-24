import { Link } from '@tanstack/react-router'
import { FileText, ArrowRight, GraduationCap, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useMyApplication } from '@/hooks/application'


const STATUS_VARIANT: Record<number, 'default' | 'secondary' | 'destructive'> = {
  6: 'default', // Aprovado
  7: 'destructive', // Rejeitado
  10: 'destructive', // Eliminado
}

function getStatusVariant(statusId: number | undefined) {
  if (!statusId) return 'secondary'
  return STATUS_VARIANT[statusId] ?? 'secondary'
}

export function ApplicationStatusCard() {
  const { data: application, isLoading } = useMyApplication()

  if (isLoading) {
    return <Skeleton className="h-32 w-full rounded-2xl" />
  }

  if (!application) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/30 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Ainda não tem uma candidatura
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Submeta a sua candidatura para começar o processo
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      to="/accounts/applications"
      className="group block rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                Candidatura #{application.id}
              </h3>
              {application.applicationStatus && (
                <Badge variant={getStatusVariant(application.applicationStatus.id)}>
                  {application.applicationStatus.description}
                </Badge>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
              {application.academicDegree && (
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {application.academicDegree.designation}
                </span>
              )}
              {application.applicationDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Submetida em{' '}
                  {new Date(application.applicationDate).toLocaleDateString(
                    'pt-PT',
                    { day: '2-digit', month: 'long', year: 'numeric' },
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}