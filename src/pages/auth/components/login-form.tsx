import { useAppForm } from '@/components/forms'
import { useLoginMutation } from '@/hooks/auth/use-auth'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Introduza o seu nome de usuário'),
  password: z
    .string()
    .min(1, 'Introduza a sua palavra-passe')
    .min(8, 'A palavra-passe deve ter pelo menos 8 caracteres'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/_public/_auth/login/' }) 
  const loginMutation = useLoginMutation()

  function handleSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate({ to: redirect ?? '/dashboard' })
      },
    })
  }
  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
    } as LoginFormValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      handleSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-5"
    >
      <form.AppField
        name="username"
        children={(field) => (
          <field.TextField label="Nome de usuário" placeholder="nome@exemplo.com" />
        )}
      />

      <div className="space-y-2">
        <form.AppField
          name="password"   
          children={(field) => (
            <field.PasswordField label="Palavra-passe" placeholder="••••••••" />
          )}
        />
        <div className="flex justify-end">
          <Link
            to="/recover-account"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Esqueceu-se da palavra-passe?
          </Link>
        </div>
      </div>

      <form.AppForm>
        <form.SubscribeButton
          label="Entrar"
          className="w-full"
          disabled={loginMutation.isPending}
        />
      </form.AppForm>
    </form>
  )
}