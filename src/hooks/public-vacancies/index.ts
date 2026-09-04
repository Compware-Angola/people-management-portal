import { queryOptions, useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/constants/query-key'
import {
  getPublicVacancies,
  getPublicVacancy,
} from '@/service/public-vacancies'
import type { PublicVacancyFilter } from '@/service/public-vacancies'

export function publicVacanciesQueryOptions(filter?: PublicVacancyFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.publicVacancies, 'list', filter],
    queryFn: () => getPublicVacancies(filter),
    staleTime: 60 * 1000,
  })
}

export function usePublicVacancies(filter?: PublicVacancyFilter) {
  return useQuery(publicVacanciesQueryOptions(filter))
}

export function publicVacancyQueryOptions(code: string) {
  return queryOptions({
    queryKey: [QUERY_KEY.publicVacancies, 'detail', code],
    queryFn: () => getPublicVacancy(code),
    enabled: Boolean(code),
    staleTime: 60 * 1000,
  })
}

export function usePublicVacancy(code: string) {
  return useQuery(publicVacancyQueryOptions(code))
}
