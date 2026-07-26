import { QUERY_KEY } from '@/constants/query-key'
import { getCourseTrainingAreas } from '@/service/course-training-area'
import type { CourseTrainingAreaFilter } from '@/service/course-training-area'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const COURSE_TRAINING_AREA_QUERY_KEY = 'course-training-areas'

export function courseTrainingAreasQueryOptions(
  filter?: CourseTrainingAreaFilter,
) {
  return queryOptions({
    queryKey: [QUERY_KEY.coursesTrainingAreas, 'list', filter],
    queryFn: () => getCourseTrainingAreas(filter),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCourseTrainingAreas(filter?: CourseTrainingAreaFilter) {
  return useQuery(courseTrainingAreasQueryOptions(filter))
}
