import { TeatcherApplicationPage } from '@/pages/applications/teatcher/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/applications/teacher')({
  component: TeatcherApplicationPage,
})
