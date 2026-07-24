export type CreateTeacherApplicationRequest = {
  data: FormData;
}

export type CreateTeacherApplicationResponse ={
  id: number;
  message: string;
}


export type ApplicationPerson= {
  id: number
  fullName: string
  email: string
}

export type ApplicationStatus= {
  id: number
  description: string | null
}

export type ApplicationAcademicDegree= {
  id: number
  designation: string | null
  acronym: string | null
}

export type AcademicEducation = {
  id: number
  academicDegreeId: number | null
  trainingArea: string | null
  graduationYear: number | null
  institution: string | null
  finalAverage: number | null
  candidateId: number
  trainingAreaId: number | null
  courseTrainingAreaId: number | null
}

export type TeachingExperience= {
  id: number
  title: string | null
  course: string | null
  institution: string | null
  discipline: string | null
  startYear: string | null
  endYear: string | null
  candidateId: number
}

export type ApplicationDocument= {
  id: number
  candidateId: number
  documentTypeId: number
  fileName: string
  createdAt: string
  updatedAt: string
}

export type MyApplication= {
  id: number
  applicationDate?: string
  person: ApplicationPerson
  applicationStatus: ApplicationStatus | null
  academicDegree: ApplicationAcademicDegree | null
  academicEducations: AcademicEducation[]
  teachingExperiences: TeachingExperience[]
  documents: ApplicationDocument[]
}



export type UpdateAcademicEducationPayload= {
  id?: number 
  course: string
  academicLevel: string
  institution: string
  completionYear: string
}

export type UpdateTeachingExperiencePayload= {
  id?: number
  course: string
  institution: string
  discipline: string
  startYear: string
  endYear: string
}