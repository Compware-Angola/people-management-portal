import { formOptions } from '@tanstack/react-form'
import type { AcademicItem } from '../schemas/academic.schema'
import type { TeachingExperienceSchema } from '../schemas/teaching-experience.schema'

export const wizardFormOpts = formOptions({
  defaultValues: {
    personal: {
      fullName: '',
      maritalStatus: '',
      gender: '',
      birthDate: '',
      documentType: '',
      documentNumber: '',
      documentExpiration: '',
      nationality: '',
      phone: '',
      email: '',
      address: '',
      alternativePhone: "",
    },

    academic: [
      {
        course: '',
        academicLevel: '',
        institution: '',
        completionYear: '',
      },
    ] as AcademicItem[],

    experience: [{course:"",discipline:"",endYear:"", institution:"",startYear:""}] as TeachingExperienceSchema,
    documents: {
      cv: '' as string,
      identificationDocument: '' as string,
      certificates: [] as string[],
      courseCertificate: '' as string,
      pedagogicalAggregation: '' as string,
    },
  },
})
