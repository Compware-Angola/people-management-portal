import { useAppForm } from '@/components/forms'
import { z } from 'zod'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { CircleHelp, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { RecoverAccountRequestDialog } from './recover-account-request-dialog'
import { useCheckEmailMutation, useRequestPasswordResetMutation } from '@/hooks/auth/use-auth'
const recoverAccountSchema = z.object({
  username: z
    .string()
    .min(1, 'Introduza o seu nome de utilizador ou email'),
})
export type RecoverAccountFormValues = z.infer<typeof recoverAccountSchema>

type Step = 'search' | 'found' | 'manual'

export function RecoverAccountForm() {
  const [step, setStep] = useState<Step>('search')
  const [openRequestDialog, setOpenRequestDialog] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const checkEmailMutation = useCheckEmailMutation()
  const requestPasswordResetMutation = useRequestPasswordResetMutation()

  const handleSendRecovery = async () => {
    await requestPasswordResetMutation.mutateAsync({email:verifiedEmail})
  }

  const handleTryAgain = () => {
    setStep('search')
    setVerifiedEmail('')
    form.reset()
  }

  const form = useAppForm({
    defaultValues: {
      username: '',
    } as RecoverAccountFormValues,

    validators: {
      onChange: recoverAccountSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await checkEmailMutation.mutateAsync({
          email: value.username,
        })

        if (response.exists) {
          setVerifiedEmail(value.username)
          setStep('found')
          return
        }

        setStep('manual')
      } catch {
        // erro tratado pelo hook
      }
    },
  })

  return (
    <>
      {step === 'search' && (
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
              label="Continuar"
              className="w-full"
              disabled={checkEmailMutation.isPending}
            />
          </form.AppForm>
        </form>
      )}

      {step === 'found' && (
        <div className="space-y-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="text-sm font-medium text-green-900">
                Conta encontrada
              </h3>
              <p className="text-sm text-green-800">
                Encontrámos uma conta associada ao email{' '}
                <strong>{verifiedEmail}</strong>.
              </p>
            </div>
          </div>

          <Button
            className="w-full"
            disabled={requestPasswordResetMutation.isPending}
            onClick={handleSendRecovery}
          >
            {requestPasswordResetMutation.isPending
              ? 'A enviar...'
              : 'Enviar código de recuperação'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleTryAgain}
          >
            Usar outro email
          </Button>
        </div>
      )}

      {step === 'manual' && (
        <>
          <Separator className="my-6" />

          <div className="space-y-4 rounded-xl border border-dashed p-4">
            <div className="flex gap-3">
              <CircleHelp className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-medium">
                  Não encontrou a sua conta?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A sua conta pode precisar de uma atualização de dados
                  para estar disponível nesta plataforma. Solicite uma
                  atualização e um administrador irá analisar o seu pedido.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setOpenRequestDialog(true)}
            >
              Solicitar atualização da conta
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleTryAgain}
            >
              Usar outro email
            </Button>
          </div>
        </>
      )}

      <RecoverAccountRequestDialog
        open={openRequestDialog}
        onOpenChange={setOpenRequestDialog}
      />
    </>
  )
}