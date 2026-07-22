import { gaApi } from '@/lib/api/ga.api'
import type {
  AcademicDegreeFilter,
  AcademicDegreeResponse,
} from './academic-degrees.type'

export async function getAcademicDegrees(filter?: AcademicDegreeFilter) {
  const response = await gaApi
    .get('academic-degrees', {
      searchParams: filter,
    })
    .json<AcademicDegreeResponse>()

  return response.data
}
