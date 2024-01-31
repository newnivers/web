import type { AuthUser } from "@/types";
import useLocalStorage from "../localStorage";

const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

function useAuthUserStorage() {
  const [cachedValue, setValue, resetValue] = useLocalStorage<AuthUser>(
    authUserKey,
    {
      token: "",
      id: "",
    }
  );

  return [cachedValue, setValue, resetValue] as const;
}

export default useAuthUserStorage;
