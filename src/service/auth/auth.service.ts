import { authApi } from "@/lib/api/auth-api";
import { gpApi } from "@/lib/api/gp.api";
import type {
  CheckEmailInput,
  CheckEmailResponse,
  CurrentUserResponse,
  LoginInput,
  LoginResponse,
  PeopleManagementPortalLoginResponse,
  UserCollaboratorMeResponse,
} from "./type";
import { mailifyApi } from "@/lib/api/mailify.api";

export async function login(params:LoginInput): Promise<LoginResponse>{
  const response = await authApi
    .post("auth/login/people-management-portal", {
      json: params,
    })
    .json<PeopleManagementPortalLoginResponse>()

  return {
    access_token: response.token,
    expires_in: 21600,
    platform: 'PEOPLE_MANAGEMENT_PORTAL',
    user: {
      codigo: response.user.id,
      nome: response.user.fullName,
      bi: '',
      nif: null,
      telefone: '',
      telefone_alternativo: null,
      provincia: '',
      municipio: '',
      morada: '',
      email: response.user.email,
      precisa_mudar_senha: 0,
      estado: response.user.status === 'ACTIVE' ? 1 : 0,
      criado_em: '',
    },
    roles: null,
    permissions: [],
    mensagem: 'Login realizado com sucesso.',
  }
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return gpApi
    .get('users/collaborators/me')
    .json<UserCollaboratorMeResponse>()
    .then((response) => ({
      isAuthenticated: true,
      user: {
        codigo: response.id,
        nome: response.person.name,
        bi: response.person.identityDocument ?? '',
        nif: response.person.taxIdentificationNumber,
        telefone: response.person.phone ?? '',
        telefone_alternativo: response.person.alternativePhone,
        provincia: '',
        municipio: '',
        morada: '',
        email: response.email,
        precisa_mudar_senha: 0,
        estado: response.person.status,
        criado_em: '',
      },
      message: 'Current user fetched successfully.',
    }))
}

const platformPortal = 'PEOPLE_MANAGEMENT_PORTAL'
export async function checkEmail(
  params: CheckEmailInput,
): Promise<CheckEmailResponse> {
  return authApi
    .post('auth/check-email', {
      json: {
       platform: platformPortal,
        ...params,
      },
    })
    .json<CheckEmailResponse>()
}

export async function requestPasswordReset({email}: {email:string}): Promise<void> {
  await authApi
    .post('auth/send-change-password', { json: { email, platform: platformPortal } })
}

export async function resetPassword({newPassword,token}:{token:string, newPassword:string}): Promise<void> {
  await authApi
    .post('auth/reset-password', {
      json: { token, newPassword, platform: platformPortal},
    })
}

export type RequestDataUpdate = {
  fullName: string
  email: string
  documentNumber: string
  phone?: string
  details: string
}

export async function sendRenewDataRequest(payload: RequestDataUpdate) {
  await mailifyApi.post('send-email', {
    json: {
      subject: 'Solicitação de Recuperação de Acesso ao Portal de Candidaturas',
      company: 'universidade_metodista_angola',
      type: 'solicitar_actualizacao_dados_candidatura_portal_colaborador',
      context: {
        fullName: payload.fullName,
        email: payload.email,
        documentNumber: payload.documentNumber,
        phone: payload.phone,
        details: payload.details,
      },
    },
  })
}
