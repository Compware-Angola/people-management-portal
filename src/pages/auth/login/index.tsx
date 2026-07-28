import { Link } from '@tanstack/react-router'
import { LoginForm } from '../components/login-form'
import { AuthLayout } from '../components/auth-layout'

export function LoginPage() {
return (
  <AuthLayout
  title="Entrar na Plataforma"
  footer={
    <>
      Ainda não tem conta?{' '}
      <Link to="/" hash="application">
        Ver tipos de candidatura
      </Link>
    </>
  }
>
  <LoginForm />
</AuthLayout>
  )
}