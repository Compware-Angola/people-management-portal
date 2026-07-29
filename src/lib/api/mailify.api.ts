import ky from "ky";
import { env } from "../../config/env";
import { authStorage } from "../auth/auth-storage";
export const mailifyApi = ky.create({
  prefix: env.VITE_API_URL_MAILIFY,
   hooks: {
      beforeRequest: [
        ({request}) => {
          const token = authStorage.getToken()
          if (token) {
           request.headers.set("Authorization", `Bearer ${token}`)
          }
        },
      ],
      afterResponse: [
        async ({response}) => {
          if (response.status === 401) {
            authStorage.clear()
            window.location.href = "/login"
          }
          return response
        },
      ],
    },
  
})