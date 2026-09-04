import ky from 'ky'
import { env } from '@/config/env'

export const gaApi = ky.create({
  prefix: env.VITE_GA_API_URL,
})
