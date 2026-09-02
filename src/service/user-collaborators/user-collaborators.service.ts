import { gpApi } from '@/lib/api/gp.api'
import type {
  CreateUserCollaboratorPayload,
  UserCollaborator,
  UserCollaboratorCompletion,
} from './user-collaborators.type'

export function createUserCollaborator(payload: CreateUserCollaboratorPayload) {
  return gpApi
    .post('users/collaborators', {
      json: payload,
    })
    .json<UserCollaborator>()
}

export function getMyUserCollaboratorCompletion() {
  return gpApi
    .get('users/collaborators/me/completion')
    .json<UserCollaboratorCompletion>()
}
