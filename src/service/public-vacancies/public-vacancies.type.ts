export type PublicVacancyFilter = {
  search?: string
  positionId?: number
  departmentId?: number
  hiringTypeId?: number
  publicationStart?: string
  publicationEnd?: string
  closingStart?: string
  closingEnd?: string
  page?: number
  limit?: number
}

export type PublicVacancyState = {
  code: number
  acronym: string
} | null

export type PublicVacancyDocument = {
  type: string | null
  originalName: string | null
  description: string | null
}

export type PublicVacancy = {
  code: string
  numberOfVacancies: number
  publicationDate: string | null
  closingDate: string | null
  state: PublicVacancyState
  position: Record<string, unknown> | null
  department: Record<string, unknown> | null
  hiringType: Record<string, unknown> | null
  documents: PublicVacancyDocument[]
}

export type PublicVacanciesResponse = {
  data: PublicVacancy[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
