import { useAppForm } from '@/components/forms'
import { z } from 'zod'

const recoverAccountSchema = z.object({
  username: z
    .string()
    .min(1, 'Introduza o seu nome de utilizador ou email'),
})

export type RecoverAccountFormValues = z.infer<
  typeof recoverAccountSchema
>

export function RecoverAccountForm() {
  const form = useAppForm({
    defaultValues: {
      username: '',
    } as RecoverAccountFormValues,

    validators: {
      onChange: recoverAccountSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value)

      // chamar mutation
      // recoverAccountMutation.mutate(value)
    },
  })

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
        name="username"
        children={(field) => (
          <field.TextField
            label="Nome de utilizador ou email"
            placeholder="nome@exemplo.com"
          />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton
          label="Enviar código de recuperação"
          className="w-full"
        />
      </form.AppForm>
    </form>
  )
}