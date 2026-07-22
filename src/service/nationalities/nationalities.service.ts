import { gaApi } from '@/lib/api/ga.api'
import type {
  NationalityFilter,
  NationalityResponse,
} from './nationalities.type'

export async function getNationalities(filter?: NationalityFilter) {
  const response = await gaApi
    .get('nacionalities', {
      searchParams: filter,
    })
    .json<NationalityResponse>()

  return response.data
}
