import { useAppForm } from '@/components/forms'
import { z } from 'zod'

const recoverAccountRequestSchema = z.object({
    fullName: z
        .string()
        .min(3, 'Introduza o seu nome completo'),

    email: z.email('Introduza o seu email válido'),
    documentNumber: z
        .string()
        .min(5, 'Introduza o seu número do documento'),
    phone: z
        .string()
        .optional(),
    reason: z
        .string()
        .min(10, 'Explique o motivo da recuperação da sua conta'),
})


export type RecoverAccountRequestFormValues = z.infer<
    typeof recoverAccountRequestSchema
>


export function RecoverAccountRequestForm() {

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
                name="fullName"
                children={(field) => (
                    <field.TextField
                        label="Nome completo"
                        placeholder="João Manuel"
                    />
                )}
            />
            <form.AppField
                name="email"
                children={(field) => (
                    <field.TextField
                        label="Email para contacto"
                        placeholder="nome@exemplo.com"
                    />
                )}
            />
            <form.AppField
                name="documentNumber"
                children={(field) => (
                    <field.TextField
                        label="Número do documento"
                        placeholder="000000000LA000"
                    />
                )}
            />
            <form.AppField
                name="phone"
                children={(field) => (
                    <field.TextField
                        label="Telefone (opcional)"
                        placeholder="+244 900 000 000"
                    />
                )}
            />
            <form.AppField
                name="reason"
                children={(field) => (
                    <field.TextareaField
                        label="Motivo da recuperação"
                        placeholder="Explique porque precisa recuperar a sua conta..."
                    />
                )}
            />
            <form.AppForm>
                <form.SubscribeButton
                    label="Enviar pedido de recuperação"
                    className="w-full"
                />
            </form.AppForm>

        </form>
    )
}