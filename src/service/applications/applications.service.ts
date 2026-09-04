import type {
  CreateTeacherApplicationRequest,
  CreateTeacherApplicationResponse,
  MyApplication,
  MyCandidaciesResponse,
  MyCandidacy,
  MyCandidaciesFilter,
  UpdateAcademicEducationPayload,
  UpdateTeachingExperiencePayload
} from './applications.type'
import { gpApi } from '@/lib/api/gp.api'

function mapCandidacyToApplication(candidacy: MyCandidacy): MyApplication {
  return {
    id: candidacy.code,
    applicationDate: candidacy.createdAt,
    person: {
      id: 0,
      fullName: '',
      email: '',
    },
    applicationStatus: {
      id: candidacy.state,
      description: candidacy.stateLabel,
    },
    academicDegree: null,
    academicEducations: [],
    teachingExperiences: [],
    documents: [],
  }
}

export function createTeacherApplication({
  vacancyCode,
}: CreateTeacherApplicationRequest) {
  return gpApi
    .post('candidacy', {
      json: { vacancyCode },
    })
    .json<CreateTeacherApplicationResponse>();
}

export async function getMyApplication() {
  const response = await gpApi.get('candidacy/me').json<MyCandidaciesResponse>()
  const [latest] = response.data

  return latest ? mapCandidacyToApplication(latest) : undefined
}

export function getMyCandidacies(filter?: MyCandidaciesFilter) {
  return gpApi
    .get('candidacy/me', {
      searchParams: filter,
    })
    .json<MyCandidaciesResponse>()
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
