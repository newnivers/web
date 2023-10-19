"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePostAuthorizationCode } from "@/queries";
import { LocalStorage } from "@/utils/cache";

const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

export default function LoginRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: postAuthorizationCode } = usePostAuthorizationCode({
    onSuccess: (data) => {
      localStorage.set(authUserKey, data.results);
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
