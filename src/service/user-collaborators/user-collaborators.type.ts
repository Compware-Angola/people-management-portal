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
  person?: UserCollaboratorPerson
}

export type UserCollaboratorPerson = {
  id: number
  name: string
  identityDocument: string | null
  taxIdentificationNumber: string | null
  phone: string | null
  alternativePhone: string | null
  motherName: string | null
  fatherName: string | null
  nationalityId: number | null
  maritalStatusId: number | null
  genderId: number | null
  birthDate: string | null
  documentIssueDate: string | null
  documentExpirationDate: string | null
  status: number
}

export type UserCollaboratorCompletion = {
  id: number
  isComplete: boolean
  completionPercentage: number
  missingFields: string[]
  filledFields: string[]
}

export type UpdateUserCollaboratorPayload = {
  email?: string
  username?: string
  fullName?: string
  identityDocument?: string
  taxIdentificationNumber?: string
  phone?: string
  alternativePhone?: string
  motherName?: string
  fatherName?: string
  nationalityId?: number
  maritalStatusId?: number
  genderId?: number
  birthDate?: string
  documentIssueDate?: string
  documentExpirationDate?: string
  status?: number
}
