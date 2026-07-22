import type {
  CreateTeacherApplicationRequest,
  CreateTeacherApplicationResponse,
} from './applications.type';
import { gpApi } from '@/lib/api/gp.api';

export function createTeacherApplication({
  data,
}: CreateTeacherApplicationRequest) {
  return gpApi
    .post('applications/teachers', {
      body: data,
    })
    .json<CreateTeacherApplicationResponse>();
}