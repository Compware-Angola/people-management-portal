export type DocumentType = {
  id: number
  description: string
}

export type DocumentTypeResponse = {
  data: DocumentType[]
  pagination: Pagination
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type DocumentTypeFilter = {
  search?: string
  page?: number
  limit?: number
  ids?: number[]
}
