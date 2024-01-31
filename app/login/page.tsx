"use client";

import OAuthLogin from "@/components/domains/oauth/login";

const authUri = process.env.NEXT_PUBLIC_NAVER_AUTH_URI as string;
const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string;
const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI as string;

export default function LoginPage() {
  return (
    <OAuthLogin>
      <OAuthLogin.LoginButton
        authUri={authUri}
        clientId={clientId}
        redirectUri={redirectUri}
        state="test"
        style={{ backgroundColor: "#03c75A", width: "350px" }}
      >
        네이버 로그인
      </OAuthLogin.LoginButton>
    </OAuthLogin>
  );
}
