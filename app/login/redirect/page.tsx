"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;

export default function LoginRedirectPage() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useQuery(
    ["auth", "code"],
    async () => {
      const { data } = await axios.post<{ token: string; state: string }>(
        `${defaultDomain}/api/users/auth/naver`,
        {
          code,
          state: "test",
        }
      );

      return data;
    },
    {
      enabled: !!code,
    }
  );

  if (code) {
    return <div>redirectPage</div>;
  }

  return null;
}
