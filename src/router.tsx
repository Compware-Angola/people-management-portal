import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { queryClient } from './lib/query-client'
import { authStorage } from './lib/auth/auth-storage'

export function getRouter() {
  const router = createTanStackRouter({
   routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context:{
    queryClient,
    authStorage: authStorage
    }
    
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
