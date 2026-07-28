import { authApi } from "@/lib/api/auth-api";
import type { CheckEmailInput, CheckEmailResponse, CurrentUserResponse, LoginInput, LoginResponse } from "./type";
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