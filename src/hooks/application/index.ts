import { QUERY_KEY } from '@/constants/query-key';
import { getApiErrorMessage } from '@/lib/api/get-api-error-message';
import {
  updateAcademicEducations,
  updateTeachingExperiences,
  uploadDocument,
} from '@/service/applications/applications.service'

import type {
  MyCandidaciesFilter,
  UpdateAcademicEducationPayload,
  UpdateTeachingExperiencePayload,
} from '@/service/applications/applications.type'
import { queryClient } from '@/lib/query-client';
import {
  createTeacherApplication,
  getMyApplication,
  getMyCandidacies,
} from '@/service/applications/applications.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
const APPLICATION_QUERY_KEY = [ QUERY_KEY.applications, 'me']
const MY_CANDIDACIES_QUERY_KEY = [QUERY_KEY.applications, 'me', 'candidacies']

export function useCreateTeacherApplication() {
  return useMutation({
    mutationFn: createTeacherApplication,
    onError:(error)=> {
        toast.error(getApiErrorMessage(error))
    },
    onSuccess: () => {
        toast.success('Candidatura submetida com sucesso')
    }
  });
  
}export const myApplicationQueryOptions = () =>
  queryOptions({
    queryKey: APPLICATION_QUERY_KEY,
    queryFn: getMyApplication,
    staleTime: 60 * 1000,
  })

export function useMyApplication() {
  return useQuery(myApplicationQueryOptions())
}

export const myCandidaciesQueryOptions = (filter?: MyCandidaciesFilter) =>
  queryOptions({
    queryKey: [...MY_CANDIDACIES_QUERY_KEY, filter],
    queryFn: () => getMyCandidacies(filter),
    staleTime: 60 * 1000,
  })

export function useMyCandidacies(filter?: MyCandidaciesFilter) {
  return useQuery(myCandidaciesQueryOptions(filter))
}

export function useUpdateAcademicEducations(candidateId: number) {
  return useMutation({
    mutationFn: (items: UpdateAcademicEducationPayload[]) =>
      updateAcademicEducations(candidateId, items),
    onSuccess: (data) => {
      queryClient.setQueryData(APPLICATION_QUERY_KEY, data)
      toast.success('Formação académica atualizada com sucesso')
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })
}

export function useUpdateTeachingExperiences(candidateId: number) {
  return useMutation({
    mutationFn: (items: UpdateTeachingExperiencePayload[]) =>
      updateTeachingExperiences(candidateId, items),
    onSuccess: (data) => {
      queryClient.setQueryData(APPLICATION_QUERY_KEY, data)
      toast.success('Experiência docente atualizada com sucesso')
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })
}

export function useUploadDocument(candidateId: number) {
  return useMutation({
    mutationFn: ({
      documentTypeId,
      file,
    }: {
      documentTypeId: number
      file: File
    }) => uploadDocument(candidateId, documentTypeId, file),
    onSuccess: (data) => {
      queryClient.setQueryData(APPLICATION_QUERY_KEY, data)
      toast.success('Documento atualizado com sucesso')
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })
}
