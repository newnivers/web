import { useRecoilState, useResetRecoilState } from "recoil";
import { userAuthAtom } from "@/store";

function useAuthUserStorage() {
  const [userAuth, setUserAuth] = useRecoilState(userAuthAtom);
  const resetUserAuth = useResetRecoilState(userAuthAtom);

  return { userAuth, setUserAuth, resetUserAuth } as const;
}

export default useAuthUserStorage;
