export type CreateUserCollaboratorPayload = {
  email: string
  password: string
  fullName: string
}

export type UserCollaborator = {
  id: number
  personId: number
  email: string
  username: string
}

export type UserCollaboratorCompletion = {
  id: number
  isComplete: boolean
  completionPercentage: number
  missingFields: string[]
  filledFields: string[]
}
