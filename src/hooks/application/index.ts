import { QUERY_KEY } from '@/constants/query-key';
import { getApiErrorMessage } from '@/lib/api/get-api-error-message';
import {
  updateAcademicEducations,
  updateTeachingExperiences,
  uploadDocument,
} from '@/service/applications/applications.service'

import type {
  UpdateAcademicEducationPayload,
  UpdateTeachingExperiencePayload,
} from '@/service/applications/applications.type'
import { queryClient } from '@/lib/query-client';
import { createTeacherApplication, getMyApplication } from '@/service/applications/applications.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
const APPLICATION_QUERY_KEY = [ QUERY_KEY.applications, 'me']

export function useCreateTeacherApplication() {
  return useMutation({
    mutationFn: createTeacherApplication,
    onError:(error)=> {
        toast.error(getApiErrorMessage(error))
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