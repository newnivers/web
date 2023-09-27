"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN;

export default function LoginRedirectPage() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const postToken = async () => {
        const { data } = await axios.post<{ token: string; state: string }>(
          `${defaultDomain}/api/users/auth/naver`,
          {
            code,
            state: "test",
          }
        );

        console.log("request token result:", data);
      };

      postToken();
    }
  }, [code]);

  return <div>loginRedirectPage</div>;
}
