import type { User } from '@/service/auth/type'
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Building2,
} from 'lucide-react'

interface ProfileInfoCardProps {
  user: User
}

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

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="mb-2 text-lg font-semibold text-foreground">
        Dados pessoais
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Informações associadas à sua conta
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoRow
          icon={<Mail className="h-4 w-4" />}
          label="E-mail"
          value={user.email}
        />
        <InfoRow
          icon={<CreditCard className="h-4 w-4" />}
          label="Bilhete de identidade"
          value={user.bi}
        />
        <InfoRow
          icon={<CreditCard className="h-4 w-4" />}
          label="NIF"
          value={user.nif}
        />
        <InfoRow
          icon={<Phone className="h-4 w-4" />}
          label="Telefone"
          value={user.telefone}
        />
        <InfoRow
          icon={<Phone className="h-4 w-4" />}
          label="Telefone alternativo"
          value={user.telefone_alternativo}
        />
        <InfoRow
          icon={<MapPin className="h-4 w-4" />}
          label="Morada"
          value={user.morada}
        />
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="Província"
          value={user.provincia}
        />
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="Município"
          value={user.municipio}
        />
        <InfoRow
          icon={<Calendar className="h-4 w-4" />}
          label="Conta criada em"
          value={
            user.criado_em
              ? new Date(user.criado_em).toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : null
          }
        />
      </div>
    </div>
  )
}