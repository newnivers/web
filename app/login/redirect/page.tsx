"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePostAuthorizationCode } from "@/queries";
import { useAuthUserStorage } from "@/hooks";

export default function LoginRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, setAuthUserInfo] = useAuthUserStorage();

  const { mutate: postAuthorizationCode } = usePostAuthorizationCode({
    onSuccess: (data) => {
      const {
        results: { token, user_id },
      } = data;
      setAuthUserInfo({ token, id: user_id });
      router.replace("/");
    },
  });

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return;
    }

    postAuthorizationCode({ code, state: "test" });
  }, [code]);

  if (code) {
    return <div>redirectPage</div>;
  }

  return null;
}
