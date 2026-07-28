
import { AuthLayout } from '@/pages/auth/components/auth-layout'
import { ResetPasswordForm } from '@/pages/auth/reset-password/reset-password-form'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'


const tokenParamsSchema = z.object({
  token: z.jwt(),
})

export const Route = createFileRoute('/_public/_auth/reset-password/$token')({
  params: {
    parse: (rawParams) => tokenParamsSchema.parse(rawParams),
    stringify: ({ token }) => ({ token }),
  },
  beforeLoad: ({ params }) => {
    
    return { token: params.token }
  },
  onError: () => {
    throw redirect({ to: '/login' })
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { token } = Route.useParams()

  return <AuthLayout
      title="Redefinir senha"
      description="Escolha uma nova senha para a sua conta."
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
}