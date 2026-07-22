export type CourseTrainingArea = {
  id: number
  description: string
  trainingAreaId: number
  status: number
}
type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}
export interface CourseTrainingAreaResponse {
  data: CourseTrainingArea[]
  pagination: Pagination
}

export type CourseTrainingAreaFilter = {
  page?: number
  limit?: number
  search?: string
  status?: number
}
