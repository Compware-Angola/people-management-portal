import ky from 'ky'
import { env } from '@/config/env'

export const gpPublicApi = ky.create({
  prefix: env.VITE_GP_API_URL,
})
