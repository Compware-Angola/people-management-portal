// routes/_public/_auth/login/index.tsx (ou onde quer que esteja)
import { LoginPage } from '@/pages/auth/login'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'


const loginSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/_public/_auth/login/')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
})