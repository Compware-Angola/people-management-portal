import ky from "ky";
import { env } from "../../config/env";

export const authApi = ky.create({
  prefix: env.VITE_AUTH_API_URL,
})