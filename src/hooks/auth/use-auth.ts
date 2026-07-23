import { useSyncExternalStore } from "react"
import { authStorage } from "@/lib/auth/auth-storage"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/service/auth/auth.service"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/get-api-error-message"


export function useAuth() {
  const token = useSyncExternalStore(
    authStorage.subscribe,
    () => authStorage.getToken(),
    () => null
  )

  return { token, isAuthenticated: !!token }
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authStorage.setTokens(data.access_token)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  })
}