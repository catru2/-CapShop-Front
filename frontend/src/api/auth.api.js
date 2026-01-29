import { http } from "./http";

export async function loginApi(email, password) {
  return http.post("/auth/login", { email, password });
}
