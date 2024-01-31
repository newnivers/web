"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
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
    return (
      <SpacerSkleton
        id="main-content"
        type="vertical"
        justify="center"
        align="center"
        gap={40}
      >
        <Image
          src="/img/Spin-1s-767px.gif"
          width={80}
          height={80}
          alt="loading-spinner"
        />
        <Typography
          typo="subhead01"
          style={{
            color: "#66666",
          }}
        >
          사용자 인증을 진행 중입니다
        </Typography>
      </SpacerSkleton>
    );
  }

  return null;
}
