import { RecoverAccountPage } from '@/pages/auth/recover-account'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'


const loginSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/_public/_auth/recover-account/')({
  validateSearch: loginSearchSchema,
  component: RecoverAccountPage,
})