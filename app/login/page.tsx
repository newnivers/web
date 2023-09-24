"use client";

import OAuthLogin from "@/components/domains/oauth/login";

const authUri = process.env.NEXT_PUBLIC_NAVER_AUTH_URI as string;

export default function LoginPage() {
  return (
    <OAuthLogin>
      <OAuthLogin.LoginButton
        authUri={authUri}
        style={{ backgroundColor: "#03c75A" }}
      >
        네이버 로그인
      </OAuthLogin.LoginButton>
    </OAuthLogin>
  );
}
