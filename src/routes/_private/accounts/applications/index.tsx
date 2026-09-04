import { UpdateTeacherApplicationPage } from '@/pages/applications/teatcher/update'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/accounts/applications/')({
  component: UpdateTeacherApplicationPage,
})
