import { TeatcherApplicationPage } from '@/pages/applications/teatcher/create'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const createApplicationSearchSchema = z.object({
  vacancyCode: z.string().optional(),
})

export const Route = createFileRoute('/_private/accounts/applications/create')({
  validateSearch: createApplicationSearchSchema,
  component: TeatcherApplicationPage,
})
