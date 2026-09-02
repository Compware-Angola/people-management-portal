import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { QUERY_KEY } from '@/constants/query-key'
import { getApiErrorMessage } from '@/lib/api/get-api-error-message'
import {
  createUserCollaborator,
  getMyUserCollaboratorCompletion,
} from '@/service/user-collaborators'

export function useCreateUserCollaborator() {
  return useMutation({
    mutationFn: createUserCollaborator,
    onSuccess: () => {
      toast.success('Conta de colaborador criada com sucesso')
    },
    onError: async (error) => {
      toast.error(await getApiErrorMessage(error))
    },
  })
}

export const myUserCollaboratorCompletionQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY.userCollaborators, 'me', 'completion'],
    queryFn: getMyUserCollaboratorCompletion,
    staleTime: 60 * 1000,
  })

export function useMyUserCollaboratorCompletion() {
  return useQuery(myUserCollaboratorCompletionQueryOptions())
}

