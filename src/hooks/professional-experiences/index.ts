import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { QUERY_KEY } from '@/constants/query-key'
import { getApiErrorMessage } from '@/lib/api/get-api-error-message'
import { queryClient } from '@/lib/query-client'
import {
  createMyProfessionalExperiences,
  getMyProfessionalExperiences,
} from '@/service/professional-experiences'
import type { CreateProfessionalExperiencePayload } from '@/service/professional-experiences'

export const myProfessionalExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEY.professionalExperiences, 'me'],
    queryFn: getMyProfessionalExperiences,
    staleTime: 60 * 1000,
  })

export function useMyProfessionalExperiences() {
  return useQuery(myProfessionalExperiencesQueryOptions())
}

export function useCreateMyProfessionalExperiences() {
  return useMutation({
    mutationFn: (payload: CreateProfessionalExperiencePayload[]) =>
      createMyProfessionalExperiences(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.professionalExperiences, 'me'],
      })
      toast.success('Experiência profissional registada com sucesso')
    },
    onError: async (error) => {
      toast.error(await getApiErrorMessage(error))
    },
  })
}
