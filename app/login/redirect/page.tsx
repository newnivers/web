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
    onSuccess: (data) => {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
