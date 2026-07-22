import { queryOptions, useQuery } from '@tanstack/react-query'

import { getMaritalStatus } from '@/service/marital-status'
import type { MaritalStatusFilter } from '@/service/marital-status'
import { QUERY_KEY } from '@/constants/query-key'

export function maritalStatusQueryOptions(filter: MaritalStatusFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.maritalStatus, 'list', filter],
    queryFn: () => getMaritalStatus(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
export function useMaritalStatusQuery(filter: MaritalStatusFilter) {
  return useQuery(maritalStatusQueryOptions(filter))
}
