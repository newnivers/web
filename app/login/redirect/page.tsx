"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LocalStorage } from "@/utils/cache";

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;
const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

export default function LoginRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useQuery(
    ["auth", "code"],
    async () => {
      const { data } = await axios.post<{
        message: string;
        results: { nickname: string; token: string; userId: string };
      }>(`${defaultDomain}/api/users/auth/naver`, {
        code,
        state: "test",
      });

      return data;
    },
    {
      enabled: !!code,
      onSuccess: (data) => {
        localStorage.set(authUserKey, data.results);
        router.replace("/");
      },
    }
  );

  if (code) {
    return <div>redirectPage</div>;
  }

  return null;
}
