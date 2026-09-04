import { gpApi } from '@/lib/api/gp.api'
import type {
  CreateProfessionalExperiencePayload,
  ProfessionalExperiencesResponse,
} from './professional-experiences.type'

export function createMyProfessionalExperiences(
  payload: CreateProfessionalExperiencePayload[],
) {
  return gpApi
    .post('professional-experiences/me', {
      json: payload,
    })
    .json<ProfessionalExperiencesResponse>()
}

export function getMyProfessionalExperiences() {
  return gpApi
    .get('professional-experiences/me')
    .json<ProfessionalExperiencesResponse>()
}
