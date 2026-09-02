import { TeatcherApplicationPage } from '@/pages/applications/teatcher/create'
import { myUserCollaboratorCompletionQueryOptions } from '@/hooks/user-collaborators'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/profile-completion')({
  beforeLoad: async ({ context }) => {
    const completion = await context.queryClient.ensureQueryData(
      myUserCollaboratorCompletionQueryOptions(),
    )

    if (completion.isComplete) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: TeatcherApplicationPage,
})

