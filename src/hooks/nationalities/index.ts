import { queryOptions, useQuery } from '@tanstack/react-query'

import { getNationalities } from '@/service/nationalities'
import type { NationalityFilter } from '@/service/nationalities'

import { QUERY_KEY } from '@/constants/query-key'

export function nationalitiesQueryOptions(filter: NationalityFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.nationalities, 'list', filter],
    queryFn: () => getNationalities(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useNationalitiesQuery(filter: NationalityFilter) {
  return useQuery(nationalitiesQueryOptions(filter))
}
