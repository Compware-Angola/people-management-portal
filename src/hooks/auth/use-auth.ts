import { useSyncExternalStore } from "react"
import { authStorage } from "@/lib/auth/auth-storage"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { checkEmail, getCurrentUser, login, requestPasswordReset,resetPassword, sendRenewDataRequest } from "@/service/auth/auth.service"
import { toast } from "sonner"
import { getApiErrorMessage, parseError } from "@/lib/api/get-api-error-message"
import { useNavigate } from "@tanstack/react-router"

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ['auth', 'current-user'],
    queryFn: () => getCurrentUser(),
    enabled: authStorage.isAuthenticated(),
    retry: false, 
    staleTime: 5 * 60 * 1000, 
  })


export function useCurrentUser() {
  return useQuery(currentUserQueryOptions())
}

export function useAuth() {
 
  const token = useSyncExternalStore(
    authStorage.subscribe,
    () => authStorage.getToken(),
    () => null
  )

  return { token, isAuthenticated: !!token }
}

export function useLoginMutation() {
   const navigate = useNavigate()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authStorage.setTokens(data.access_token)
    },
    onError: (error) => {
    const dataError = parseError(error) 
    if(dataError && dataError.statusCode === 403) {
      navigate({to:"/recover-account"})
    }
      toast.error(getApiErrorMessage(error))
    }
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return function logout() {
    authStorage.clear()
    queryClient.clear()
  }
}

export function useCheckEmailMutation() {
  return useMutation({
    mutationFn: checkEmail,
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}

export function useRequestPasswordResetMutation() {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success('Enviamos passos para recuperar sua senha no seu email, verifique a caixa de entrada, ou spam')
    },
    onError: async(error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}

export function useResetPasswordMutation() {
  return useMutation({mutationFn:resetPassword, onError:(error)=>{ toast.error(getApiErrorMessage(error))}})
}

export function useSendRenewDataRequest() {
  return useMutation({
    mutationFn: sendRenewDataRequest,
    onSuccess: () => {
      toast.success('Solicitação enviada com sucesso.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
}