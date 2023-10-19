import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { postAuthorizationCode } from "@/api";
import type { ResponseForm, AuthRequest, AuthResponse } from "@/types";

export const usePostAuthorizationCode = (
  options?: UseMutationOptions<ResponseForm<AuthResponse>, unknown, AuthRequest>
) => {
  return useMutation<ResponseForm<AuthResponse>, unknown, AuthRequest>(
    (authReq: AuthRequest) => postAuthorizationCode(authReq),
    options
  );
};
