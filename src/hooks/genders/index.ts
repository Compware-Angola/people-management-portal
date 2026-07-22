import { queryOptions, useQuery } from '@tanstack/react-query'

import { getGenders } from '@/service/genders'
import type { GenderFilter } from '@/service/genders'

import { QUERY_KEY } from '@/constants/query-key'

export function gendersQueryOptions(filter: GenderFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.gender, 'list', filter],
    queryFn: () => getGenders(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useGendersQuery(filter: GenderFilter) {
  return useQuery(gendersQueryOptions(filter))
}
