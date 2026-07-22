import { gaApi } from '@/lib/api/ga.api'
import type {
  CourseTrainingAreaFilter,
  CourseTrainingAreaResponse,
} from './course-training-area.service.type'

export async function getCourseTrainingAreas(
  filter?: CourseTrainingAreaFilter,
) {
  const response = await gaApi
    .get('course-training-areas', {
      searchParams: filter,
    })
    .json<CourseTrainingAreaResponse>()

  return response.data
}
