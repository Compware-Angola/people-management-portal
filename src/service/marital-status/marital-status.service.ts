import { gaApi } from '@/lib/api/ga.api'
import type {
  MaritalStatusFilter,
  MaritalStatusResponse,
} from './marital-status.type'

export async function getMaritalStatus(filter?: MaritalStatusFilter) {
  const response = await gaApi
    .get('marital-status', { searchParams: filter })
    .json<MaritalStatusResponse>()
  return response.data
}
