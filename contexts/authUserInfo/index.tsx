"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthUserStorage } from "@/hooks";
import type { AuthUser, AuthError } from "@/types";

const CHECK_SSO_PAGES = ["/", "/ticket", "/login", "/login/redirect"];

export function useAuthUser() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError>({
    isTrigger: false,
    message: "",
  });

  const pathname = usePathname();

  const { userAuth } = useAuthUserStorage();

  useEffect(() => {
    setLoading(false);

    if (!userAuth.id || !userAuth.token) {
      setError({
        isTrigger: true,
        message: "auth failure",
      });

      // 인증 실패에 따른 토큰 로테이션 요청 필요 or 사용자 세션 강제 종료
      return;
    }

    setAuthUser(authUser);
  }, [authUser, userAuth, pathname]);

  return [authUser, isLoading, error] as const;
}

const UserInfoContext = createContext({
  authUser: {} as AuthUser | null,
  isLoading: false,
  error: {} as AuthError,
});

interface Props {
  children: ReactNode;
}

function UserInfoProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [authUser, isLoading, error] = useAuthUser();

  useEffect(() => {
    if (CHECK_SSO_PAGES.includes(pathname)) {
      return;
    }

    if (error.isTrigger) {
      router.replace("/login");
    }
  }, [error.isTrigger, pathname, router]);

  return (
    <UserInfoContext.Provider
      value={{
        authUser,
        isLoading,
        error,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

interface UserInfoWithContextProps {
  fallback?: ReactNode;
  children: (props: {
    authUser: AuthUser | null;
    isLoading: boolean;
    error: AuthError;
  }) => ReactNode;
}

function UserInfoWithContext({ fallback, children }: UserInfoWithContextProps) {
  const { authUser, isLoading, error } = useContext(UserInfoContext);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (authUser) {
    return children({ authUser, isLoading, error });
  }

  return null;
}

const AuthUserInfo = {
  Provider: UserInfoProvider,
  Context: UserInfoContext,
  WithContext: UserInfoWithContext,
};

export default AuthUserInfo;
