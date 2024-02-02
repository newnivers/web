import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: authUserKey,
  storage: localStorage,
});

export const userAuthAtom = atom<{ token: string; id: string }>({
  key: "userAuth",
  default: {
    token: "",
    id: "",
  },
  effects: [persistAtom],
});
