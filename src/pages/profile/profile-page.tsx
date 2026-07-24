import { useCurrentUser } from '@/hooks/auth/use-auth'
import { ProfileHeader } from './profile-header'
import { ProfileInfoCard } from './profile-info-card'
import { ProfileLoading } from './profile-loading'

export function ProfilePage() {
  const { data, isLoading, isError } = useCurrentUser()

  if (isLoading) {
    return <ProfileLoading />
  }

  if (isError || !data?.isAuthenticated) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar os dados do perfil.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <ProfileHeader user={data.user} />
      <ProfileInfoCard user={data.user} />
    </div>
  )
}