import { useAppForm } from '@/components/forms'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useResetPasswordMutation } from '@/hooks/auth/use-auth'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Repita a nova senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

type ResetPasswordFormProps = {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const resetPasswordMutation = useResetPasswordMutation()

  const form = useAppForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },

    validators: {
      onChange: resetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await resetPasswordMutation.mutateAsync({
          token,
          newPassword: value.password,
        })
        setSuccess(true)
      } catch {
        // erro tratado pelo hook
      }
    },
  })

  if (success) {
    return (
      <div className="space-y-4 rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="text-sm font-medium text-green-900">
              Senha redefinida
            </h3>
            <p className="text-sm text-green-800">
              A sua senha foi alterada com sucesso.
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => navigate({ to: '/login' })}
        >
          Iniciar sessão
        </Button>
      </div>
    )
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.AppField
        name="password"
        children={(field) => (
          <field.PasswordField
            label="Nova senha"
            placeholder="••••••••"
          />
        )}
      />

      <form.AppField
        name="confirmPassword"
        children={(field) => (
          <field.PasswordField
            label="Repetir nova senha"
            placeholder="••••••••"
          />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton
          label="Redefinir senha"
          className="w-full"
          disabled={resetPasswordMutation.isPending}
        />
      </form.AppForm>
    </form>
  )
}