import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth')({
   beforeLoad: ({ context }) => {
    if (context.authStorage.isAuthenticated()) {
      throw redirect({ to: "/admins" })
    }
  },
  component: () => <Outlet />,

})
