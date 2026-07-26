import { useSyncExternalStore } from "react"
import { authStorage } from "@/lib/auth/auth-storage"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, login } from "@/service/auth/auth.service"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/get-api-error-message"

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

export function useLogout() {
  const queryClient = useQueryClient()

  return function logout() {
    authStorage.clear()
    queryClient.clear()
  }
}