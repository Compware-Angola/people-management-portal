import { Link } from '@tanstack/react-router'
import { AuthLayout } from '../components/auth-layout'
import { CreateAccountForm } from '../components/create-account-form'

export function CreateAccountPage() {
  return (
    <AuthLayout
      title="Criar Conta"
      description="Crie uma conta para aceder ao Portal de Candidaturas."
      footer={
        <>
          Já tem conta? <Link to="/login">Entrar na plataforma</Link>
        </>
      }
    >
      <CreateAccountForm />
    </AuthLayout>
  )
}

