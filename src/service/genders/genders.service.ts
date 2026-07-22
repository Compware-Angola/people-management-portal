import { gaApi } from '@/lib/api/ga.api'
import type { GenderFilter, GenderResponse } from './genders.type'

export async function getGenders(filter?: GenderFilter) {
  const response = await gaApi
    .get('genders', {
      searchParams: filter,
    })
    .json<GenderResponse>()

  return response.data
}
