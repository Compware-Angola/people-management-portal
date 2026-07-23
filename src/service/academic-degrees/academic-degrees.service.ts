import { gaApi } from '@/lib/api/ga.api'
import type {
  AcademicDegreeFilter,
  AcademicDegreeResponse,
} from './academic-degrees.type'

export async function getAcademicDegrees(filter?: AcademicDegreeFilter) {
    const params = new URLSearchParams()
  if (filter?.search) {
    params.append('search', filter.search)
  }
  if (filter?.page) {
    params.append('page', String(filter.page))
  }
  if (filter?.limit) {
    params.append('limit', String(filter.limit))
  }
  filter?.ids?.forEach((id) => {
    params.append('ids', String(id))
  })
  if(filter?.status) {
    params.append('status', String(filter.status))
  }
  const response = await gaApi
    .get('academic-degrees', {
      searchParams: params,
    })
    .json<AcademicDegreeResponse>()

  return response.data
}
