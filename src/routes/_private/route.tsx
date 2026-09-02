import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/layout/dashboard'
import { authStorage } from '@/lib/auth/auth-storage'
import { currentUserQueryOptions } from '@/hooks/auth/use-auth'
import { myUserCollaboratorCompletionQueryOptions } from '@/hooks/user-collaborators'

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({ context, location }) => {
    if (!authStorage.isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    let authenticatedUser

    try {
      const { isAuthenticated, user } = await context.queryClient.ensureQueryData(
        currentUserQueryOptions(),
      )
      if (!isAuthenticated) {
        authStorage.clear()
        throw redirect({ to: '/login', search: { redirect: location.href } })
      }
      authenticatedUser = user
    } catch (error) {
      authStorage.clear()
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }

    const completion = await context.queryClient.ensureQueryData(
      myUserCollaboratorCompletionQueryOptions(),
    )

    if (!completion.isComplete && location.pathname !== '/profile-completion') {
      throw redirect({ to: '/profile-completion' })
    }

    return { user: authenticatedUser }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPrivate />,
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

function NotFoundPrivate() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">
        Página não encontrada dentro do painel.
      </p>
      <Link to="/" className="text-primary underline">
        Voltar ao início
      </Link>
    </div>
  )
}
