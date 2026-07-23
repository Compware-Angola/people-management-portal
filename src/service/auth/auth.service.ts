import { authApi } from "@/lib/api/auth-api";
import type { LoginInput, LoginResponse } from "./type";

export async function login(params:LoginInput){
  return  authApi.post("/auth/login",{json:{platform:"PEOPLE_MANAGEMENT",...params}}).json<LoginResponse>()
}