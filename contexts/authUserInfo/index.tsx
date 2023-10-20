"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser, AuthError } from "@/types";
import { LocalStorage } from "@/utils/cache";

const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage = new LocalStorage();

export function useAuthUser() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError>({
    isTrigger: false,
    message: "",
  });

  useEffect(() => {
    const authUser = localStorage.get(authUserKey);

    setLoading(false);

    if (!authUser) {
      setError({
        isTrigger: true,
        message: "auth failure",
      });

      return;
    }

    setAuthUser(authUser);
  }, []);

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
  const [authUser, isLoading, error] = useAuthUser();

  useEffect(() => {
    if (error.isTrigger) {
      localStorage.remove(authUserKey);
      router.replace("/login");
    }
  }, [error.isTrigger]);

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
