import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Mail, User, GraduationCap, ClipboardCheck, RefreshCw } from 'lucide-react'
import type { MyApplication } from '@/service/applications/applications.type'
import { useRenewApplication } from '@/hooks/application'

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3">
      <div className="mt-0.5 shrink-0 text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

interface ApplicationStatusTabProps {
  application: MyApplication
}

export function ApplicationStatusTab({
  application,
}: ApplicationStatusTabProps) {
  const { mutate: renewApplication, isPending } = useRenewApplication()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            Candidatura #{application.id}
          </Badge>
          {application.applicationStatus && (
            <Badge>{application.applicationStatus.description}</Badge>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => renewApplication(application.id)}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Renovar Candidatura
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoRow
          icon={<User className="h-4 w-4" />}
          label="Candidato"
          value={application.person.fullName}
        />
        <InfoRow
          icon={<Mail className="h-4 w-4" />}
          label="E-mail"
          value={application.person.email}
        />
        <InfoRow
          icon={<GraduationCap className="h-4 w-4" />}
          label="Grau académico pretendido"
          value={application.academicDegree?.designation}
        />
        <InfoRow
          icon={<ClipboardCheck className="h-4 w-4" />}
          label="Estado da candidatura"
          value={application.applicationStatus?.description}
        />
      </div>
    </div>
  )
}