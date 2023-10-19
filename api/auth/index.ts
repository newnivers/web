import httpClient from "@/api/core";
import type { ResponseForm, AuthRequest, AuthResponse } from "@/types";

export const postAuthorizationCode = (
  data: AuthRequest
): Promise<ResponseForm<AuthResponse>> => {
  return httpClient.post("/users/auth/naver", {
    data,
  });
};
