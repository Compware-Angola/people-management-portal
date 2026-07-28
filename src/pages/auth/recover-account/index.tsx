import { Link } from '@tanstack/react-router'
import { RecoverAccountForm } from '../components/recover-account-form'
import { AuthLayout } from '../components/auth-layout'

export function RecoverAccountPage() {
  return (
    <AuthLayout
      title="Recuperar Conta"
      description="Introduza o seu nome de utilizador para receber um código."
      footer={
        <>
          <Link to="/login">
            Voltar ao login
          </Link>
        </>
      }
    >
      <RecoverAccountForm />
    </AuthLayout>
  )
}