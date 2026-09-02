import { CreateAccountPage } from '@/pages/auth/create-account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth/create-account/')({
  component: CreateAccountPage,
})

