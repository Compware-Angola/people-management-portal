import { useAppForm } from '@/components/forms'
import { useSendRenewDataRequest } from '@/hooks/auth/use-auth'
import { z } from 'zod'

const recoverAccountRequestSchema = z.object({
    fullName: z
        .string()
        .min(3, 'Introduza o seu nome completo'),

    email: z.email('Introduza um email válido'),

    documentNumber: z
        .string()
        .min(5, 'Introduza o seu número do documento'),

    phone: z.string().optional(),

    reason: z
        .string()
        .min(10, 'Explique o motivo da recuperação da sua conta'),
})

export type RecoverAccountRequestFormValues = z.infer<
    typeof recoverAccountRequestSchema
>

export function RecoverAccountRequestForm() {
    const sendRenewDataRequestMutation = useSendRenewDataRequest()

    const form = useAppForm({
        defaultValues: {
            fullName: '',
            email: '',
            documentNumber: '',
            phone: '',
            reason: '',
        } as RecoverAccountRequestFormValues,

        validators: {
            onChange: recoverAccountRequestSchema,
        },

        onSubmit: async ({ value }) => {
            await sendRenewDataRequestMutation.mutateAsync({
                fullName: value.fullName,
                email: value.email,
                documentNumber: value.documentNumber,
                phone: value.phone,
                details: value.reason,
            })
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
                        label="Email para contacto"
                        placeholder="nome@exemplo.com"
                    />
                )}
            </form.AppField>

            <form.AppField name="documentNumber">
                {(field) => (
                    <field.TextField
                        label="Número do documento"
                        placeholder="000000000LA000"
                    />
                )}
            </form.AppField>

            <form.AppField name="phone">
                {(field) => (
                    <field.TextField
                        label="Telefone (opcional)"
                        placeholder="+244 900 000 000"
                    />
                )}
            </form.AppField>

            <form.AppField name="reason">
                {(field) => (
                    <field.TextareaField
                        label="Motivo da recuperação"
                        placeholder="Explique porque não consegue aceder ao Portal de Candidaturas."
                    />
                )}
            </form.AppField>

            <form.AppForm>
                <form.SubscribeButton
                    className="w-full"
                    label="Enviar pedido de recuperação"
                />
            </form.AppForm>
        </form>
    )
}