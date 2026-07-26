import type { ApplicationFormData } from '../schemas/application-schema'


export function buildApplicationFormData(
  data: ApplicationFormData,
): FormData {

  const formData = new FormData()


  formData.append(
    'personal',
    JSON.stringify(data.personal),
  )


  formData.append(
    'academic',
    JSON.stringify(data.academic),
  )


  formData.append(
    'experience',
    JSON.stringify(data.experience),
  )



  formData.append(
    'cv',
    data.documents.cv,
  )


  formData.append(
    'identificationDocument',
    data.documents.identificationDocument,
  )


  formData.append(
    'courseCertificate',
    data.documents.courseCertificate,
  )


  formData.append(
    'pedagogicalAggregation',
    data.documents.pedagogicalAggregation,
  )


  data.documents.certificates.forEach(
    file => {

      formData.append(
        'certificates',
        file,
      )

    },
  )


  return formData
}