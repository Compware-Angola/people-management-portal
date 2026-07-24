import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/auth/use-auth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 19) return 'Boa tarde'
  return 'Boa noite'
}

function getFirstName(fullName: string) {
  return fullName.split(' ')[0]
}

export function WelcomeHeader() {
  const { data, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
    )
  }

  const name = data?.user?.nome ? getFirstName(data.user.nome) : ''

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">
        {getGreeting()}{name ? `, ${name}` : ''} 👋
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Bem-vindo ao Portal do Colaborador. O que deseja fazer hoje?
      </p>
    </div>
  )
}