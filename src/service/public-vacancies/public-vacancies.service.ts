import { gpPublicApi } from '@/lib/api/gp-public.api'
import type {
  PublicVacanciesResponse,
  PublicVacancy,
  PublicVacancyFilter,
} from './public-vacancies.type'

export function getPublicVacancies(filter?: PublicVacancyFilter) {
  return gpPublicApi
    .get('vacancies/public', {
      searchParams: filter,
    })
    .json<PublicVacanciesResponse>()
}

export function getPublicVacancy(code: string) {
  return gpPublicApi.get(`vacancies/public/${code}`).json<PublicVacancy>()
}
