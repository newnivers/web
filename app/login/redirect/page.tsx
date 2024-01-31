"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthUserStorage } from "@/hooks";
import { usePostAuthorizationCode } from "@/queries";

export default function LoginRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, setAuthUserInfo] = useAuthUserStorage();

  const { mutate: postAuthorizationCode } = usePostAuthorizationCode({
    onSuccess: (res) => {
      const {
        data: { token, userId },
      } = res;

      setAuthUserInfo({ token, id: userId });
      router.replace("/");
    },
  });

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return;
    }

    const state = process.env.NEXT_PUBLIC_AUTH_CLIENT_STATE;

    if (!state) {
      return;
    }

    postAuthorizationCode({ code, state });
  }, [code, postAuthorizationCode]);

  if (code) {
    return <div>redirectPage</div>;
  }

  return null;
}
