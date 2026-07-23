import { useAppForm } from '@/components/forms'
import { Link } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'
import { z } from 'zod'


const loginSchema = z.object({
  email: z
    .email('Introduza um e-mail válido'),
  password: z
    .string()
    .min(1, 'Introduza a sua palavra-passe')
    .min(8, 'A palavra-passe deve ter pelo menos 8 caracteres'),
})

export function LoginPage() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: ligar à autenticação
      console.log(value)
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* decorative rings, iguais ao hero da landing */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-primary/10" />
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-primary/5" />
      </div>

      <div className="w-full max-w-md">
        {/* Logótipo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">
            Entrar na Plataforma
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe o estado da sua candidatura
          </p>
        </div>

        {/* Cartão de login */}
        <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-5"
          >
            <form.AppField
              name="email"
              children={(field) => (
                <field.EmailField
                  label="E-mail"
                  placeholder="nome@exemplo.com"
                />
              )}
            />

            <div className="space-y-2">
              <form.AppField
                name="password"
                children={(field) => (
                  <field.PasswordField
                    label="Palavra-passe"
                    placeholder="••••••••"
                   
                  />
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
              <form.SubscribeButton label="Entrar" className="w-full" />
            </form.AppForm>
          </form>
        </div>

        {/* Rodapé do cartão */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem conta?{' '}
          <Link
            to="/"
            hash="application"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Ver tipos de candidatura
          </Link>
        </p>
      </div>
    </div>
  )
}