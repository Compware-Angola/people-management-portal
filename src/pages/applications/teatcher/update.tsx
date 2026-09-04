import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMyCandidacies } from "@/hooks/application"
import type { CandidacyRelation } from "@/service/applications/applications.type"
import { BriefcaseBusiness, Building2, CalendarDays, Hash } from "lucide-react"

function getRelationLabel(relation?: CandidacyRelation | null) {
  return (
    relation?.description ??
    relation?.designation ??
    relation?.name ??
    relation?.acronym ??
    "-"
  )
}

function formatDate(date?: string | null) {
  if (!date) return "-"

  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function UpdateTeacherApplicationPage() {
  const {
    data: candidacies,
    isLoading,
    isError,
  } = useMyCandidacies({ page: 1, limit: 20 })

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
      </div>
    )
  }

  if (isError || !candidacies?.data.length) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-2xl border border-dashed bg-muted/30 p-6">
          <h1 className="text-xl font-semibold text-foreground">
            Ainda não possui candidatura submetida.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Quando submeter uma candidatura, os dados aparecerão nesta página
            para acompanhamento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Minhas Candidaturas
        </h1>
        <p className="text-sm text-muted-foreground">
          Consulte as candidaturas submetidas por si
        </p>
      </div>

      <div className="grid gap-4">
        {candidacies.data.map((candidacy) => (
          <Card key={candidacy.code}>
            <CardHeader className="gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <CardTitle>
                  {getRelationLabel(candidacy.vacancy?.position)}
                </CardTitle>
                <CardDescription>
                  Candidatura #{candidacy.code}
                </CardDescription>
              </div>
              <Badge variant="secondary">
                {candidacy.stateLabel ?? "Estado não informado"}
              </Badge>
            </CardHeader>

            <CardContent className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-primary" />
                <span>{candidacy.vacancy?.code ?? "-"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                <span>{getRelationLabel(candidacy.vacancy?.department)}</span>
              </div>

              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-primary" />
                <span>{getRelationLabel(candidacy.vacancy?.hiringType)}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                <span>{formatDate(candidacy.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
