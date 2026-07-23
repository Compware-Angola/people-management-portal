import { useSyncExternalStore } from "react"
import { authStorage } from "@/lib/auth/auth-storage"

export function useAuth() {
  const token = useSyncExternalStore(
    authStorage.subscribe,
    () => authStorage.getToken(),
    () => null
  )

  return { token, isAuthenticated: !!token }
}