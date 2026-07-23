import { Link } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'
import { LoginForm } from './login-form'

export function LoginPage() {


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
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
        <LoginForm/>
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