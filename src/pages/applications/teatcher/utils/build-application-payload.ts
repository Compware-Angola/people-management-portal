import type { ApplicationFormData } from '../schemas/application-schema'
import type { CreateTeacherApplicationRequest } from '@/service/applications/applications.type'

export function buildApplicationPayload(
  data: ApplicationFormData,
): CreateTeacherApplicationRequest['data'] {
  return {
    personal: data.personal,
    academic: data.academic,
    experience: data.experience,
    identificationDocument: data.documents.identificationDocument,
    cv: data.documents.cv,
    courseCertificate: data.documents.courseCertificate,
    pedagogicalAggregation: data.documents.pedagogicalAggregation,
    certificates: data.documents.certificates,
  }
}
