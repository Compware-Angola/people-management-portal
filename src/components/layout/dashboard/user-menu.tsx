import { Link, useNavigate } from '@tanstack/react-router'
import { BriefcaseBusiness, FileText, LogOut, User as UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentUser, useLogout } from '@/hooks/auth/use-auth'
import { Skeleton } from '@/components/ui/skeleton'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function UserMenu() {
  const { data, isLoading } = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/', hash: 'application' })
  }

  if (isLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />
  }

  if (!data?.isAuthenticated) {
    return null
  }

  const { user } = data

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => navigate({ to: '/', hash: 'application' })}
        aria-label="Ver vagas"
        title="Ver vagas"
      >
        <BriefcaseBusiness className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 gap-2 rounded-full px-2"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials(user.nome)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-40 truncate text-sm font-medium md:inline">
            {user.nome}
          </span>
        </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-medium leading-none">
            {user.nome}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/accounts/profile" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Meu perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/accounts/applications" className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            Minha Candidatura
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
