export type LoginInput = {
  username: string
  password: string
}

export type LoginResponse = {
  access_token: string
  expires_in: number
  platform: string
  user: User
  roles: any
  permissions: any[]
  mensagem: string
}

export type PeopleManagementPortalLoginResponse = {
  token: string
  user: PeopleManagementPortalUser
}

export type User = {
  codigo: number
  nome: string
  bi: string
  nif: string | null
  telefone: string
  telefone_alternativo: string | null
  provincia: string
  municipio: string
  morada: string
  email: string
  precisa_mudar_senha: number
  estado: number
  criado_em: string
}

export type PeopleManagementPortalUser = {
  id: number
  personId: number
  email: string
  username: string
  fullName: string
  status: string
}

export type UserCollaboratorMeResponse = {
  id: number
  email: string
  username: string
  personId: number
  person: {
    id: number
    name: string
    identityDocument: string | null
    taxIdentificationNumber: string | null
    phone: string | null
    alternativePhone: string | null
    status: number
  }
}

export type CurrentUserResponse = {
  isAuthenticated: boolean
  user: User
  message: string
}

export type CheckEmailInput = {
  email: string
}

export type CheckEmailResponse = {
  email: string
  exists: boolean
}
