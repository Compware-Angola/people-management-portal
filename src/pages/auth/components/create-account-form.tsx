import { useAppForm } from '@/components/forms'
import { useCreateUserCollaborator } from '@/hooks/user-collaborators'
import { Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

const createAccountSchema = z.object({
  fullName: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .regex(/^[A-Za-z ]+$/, 'O nome deve conter apenas letras'),
  email: z.email('Informe um email válido'),
  password: z
    .string()
    .min(8, 'A palavra-passe deve ter pelo menos 8 caracteres')
    .regex(/[a-z]/, 'A palavra-passe deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'A palavra-passe deve conter pelo menos uma letra maiúscula')
    .regex(/\d/, 'A palavra-passe deve conter pelo menos um número')
    .regex(
      /[@$!%*?&]/,
      'A palavra-passe deve conter pelo menos um caractere especial',
    ),
})

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>

export function CreateAccountForm() {
  const navigate = useNavigate()
  const createUserCollaborator = useCreateUserCollaborator()

  const form = useAppForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    } as CreateAccountFormValues,
    validators: {
      onChange: createAccountSchema,
    },
    onSubmit: async ({ value }) => {
      await createUserCollaborator.mutateAsync(value)
      navigate({ to: '/login' })
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
      <form.AppField name="fullName">
        {(field) => (
          <field.TextField
            label="Nome completo"
            placeholder="João Manuel"
          />
        )}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.TextField
            label="Email"
            placeholder="nome@exemplo.com"
          />
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.PasswordField
            label="Palavra-passe"
            placeholder="••••••••"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton
          label="Criar conta"
          className="w-full"
          disabled={createUserCollaborator.isPending}
        />
      </form.AppForm>

      <div className="text-center text-sm text-muted-foreground">
        Já tem conta?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </div>
    </form>
  )
}

