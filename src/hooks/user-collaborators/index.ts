import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { QUERY_KEY } from '@/constants/query-key'
import { getApiErrorMessage } from '@/lib/api/get-api-error-message'
import { queryClient } from '@/lib/query-client'
import {
  createUserCollaborator,
  getMyUserCollaborator,
  getMyUserCollaboratorCompletion,
  updateMyUserCollaborator,
} from '@/service/user-collaborators'
import type { UpdateUserCollaboratorPayload } from '@/service/user-collaborators'

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

export const myUserCollaboratorQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY.userCollaborators, 'me'],
    queryFn: getMyUserCollaborator,
    staleTime: 60 * 1000,
  })

export function useMyUserCollaborator() {
  return useQuery(myUserCollaboratorQueryOptions())
}

export function useUpdateMyUserCollaborator() {
  return useMutation({
    mutationFn: (payload: UpdateUserCollaboratorPayload) =>
      updateMyUserCollaborator(payload),
    onSuccess: async (data) => {
      queryClient.setQueryData([QUERY_KEY.userCollaborators, 'me'], data)
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEY.userCollaborators, 'me', 'completion'],
      })
      await queryClient.invalidateQueries({
        queryKey: ['auth', 'current-user'],
      })
      toast.success('Perfil atualizado com sucesso')
    },
    onError: async (error) => {
      toast.error(await getApiErrorMessage(error))
    },
  })
}
