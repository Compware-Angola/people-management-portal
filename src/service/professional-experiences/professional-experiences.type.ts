export type CreateProfessionalExperiencePayload = {
  institution: string
  area: string
  function: string
  position: string
  startYear: number
  endYear?: number
}

export type ProfessionalExperience = {
  id: number
  institution: string | null
  area: string | null
  function: string | null
  position: string | null
  startYear: number | null
  endYear: number | null
  personId: number
}

export type ProfessionalExperiencesResponse = {
  experiences: ProfessionalExperience[]
}
