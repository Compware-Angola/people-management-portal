import { authApi } from "@/lib/api/auth-api";
import type { CheckEmailInput, CheckEmailResponse, CurrentUserResponse, LoginInput, LoginResponse } from "./type";
import { mailifyApi } from "@/lib/api/mailify.api";
const platform = 'PEOPLE_MANAGEMENT'
export async function login(params:LoginInput){
  return  authApi.post("/auth/login",{json:{platform, ...params}}).json<LoginResponse>()
}

export function getCurrentUser(): Promise<CurrentUserResponse> {
  return authApi
    .get('auth/current-user')
    .json<CurrentUserResponse>()
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

