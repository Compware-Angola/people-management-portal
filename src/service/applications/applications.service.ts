import type {
  CheckPersonalUniquenessPayload,
  CheckPersonalUniquenessResponse,
  CreateTeacherApplicationRequest,
  CreateTeacherApplicationResponse,
  MyApplication,
  UpdateAcademicEducationPayload,
  UpdateTeachingExperiencePayload
} from './applications.type'
import { gpApi } from '@/lib/api/gp.api'

export function createTeacherApplication({ data }: CreateTeacherApplicationRequest) {
  return gpApi
    .post('applications/teachers', {
      json: data,
    })
    .json<CreateTeacherApplicationResponse>();
}

export function checkPersonalUniqueness(personal: CheckPersonalUniquenessPayload) {
  return gpApi
    .post('applications/teachers/check-personal', {
      json: personal,
    })
    .json<CheckPersonalUniquenessResponse>()
}

export function getMyApplication() {
  return gpApi.get('applications/me').json<MyApplication>()
}

export function updateAcademicEducations(
  candidateId: number,
  payload: UpdateAcademicEducationPayload[],
) {
  return gpApi
    .put(`applications/${candidateId}/academic-educations`, {
      json: { items: payload },
    })
    .json<MyApplication>()
}

export function updateTeachingExperiences(
  candidateId: number,
  payload: UpdateTeachingExperiencePayload[],
) {
  return gpApi
    .put(`applications/${candidateId}/teaching-experiences`, {
      json: { items: payload },
    })
    .json<MyApplication>()
}

export function uploadDocument(
  candidateId: number,
  documentTypeId: number,
  file: File,
) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('documentTypeId', String(documentTypeId))

  return gpApi
    .post(`applications/${candidateId}/documents`, { body: formData })
    .json<MyApplication>()
}

export type RegisterDocumentPayload = {
  candidateId: number
  documentTypeId: number
  key: string
}

export function registerDocument({ candidateId, documentTypeId, key }: RegisterDocumentPayload) {
  return gpApi.post(`applications/${candidateId}/documents/register`, {
    json: { documentTypeId, key }
  }).json<MyApplication>()
}

export function renewApplication(candidateId: number) {
  return gpApi.post(`applications/${candidateId}/renew`).json<MyApplication>()
}