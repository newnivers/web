import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  AxiosResponse,
} from "axios";
import { LocalStorage } from "@/utils/cache";
import { AuthUser } from "@/contexts/authUserInfo";
import { HTTP_METHOD } from "../shared";

const authUser = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;
const localStorage = new LocalStorage();

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { token } = localStorage.get(authUser) as AuthUser;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};
