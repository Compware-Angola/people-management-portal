import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type {  User } from '@/service/auth/type'


function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-primary/10 text-xl font-medium text-primary">
          {getInitials(user.nome)}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          {user.nome}
        </h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          <Badge variant={user.estado === 1 ? 'default' : 'secondary'}>
            {user.estado === 1 ? 'Conta ativa' : 'Conta inativa'}
          </Badge>
          {user.precisa_mudar_senha === 1 && (
            <Badge variant="destructive">Alteração de senha pendente</Badge>
          )}
        </div>
      </div>
    </div>
  )
}