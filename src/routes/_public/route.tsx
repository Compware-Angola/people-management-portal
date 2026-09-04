import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
   beforeLoad: ({ context, location }) => {
    const isVacancyFlow =
      location.pathname === '/' || location.pathname.startsWith('/vagas')

    if (context.authStorage.isAuthenticated() && !isVacancyFlow) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: () => <Outlet />,

})
