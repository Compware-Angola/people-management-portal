import { queryOptions, useQuery } from '@tanstack/react-query'

import { getAcademicDegrees } from '@/service/academic-degrees'
import type { AcademicDegreeFilter } from '@/service/academic-degrees'

import { QUERY_KEY } from '@/constants/query-key'

export function academicDegreesQueryOptions(filter: AcademicDegreeFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.academicDegrees, 'list', filter],
    queryFn: () => getAcademicDegrees(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAcademicDegreesQuery(filter: AcademicDegreeFilter) {
  return useQuery(academicDegreesQueryOptions(filter))
}
