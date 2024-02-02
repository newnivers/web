import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  AxiosResponse,
} from "axios";
import type { AuthUser } from "@/types";
import { LocalStorage } from "@/utils/cache";
import { HTTP_METHOD } from "../shared";

const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY as string;

export interface RequestData {
  message: string;
}

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const localStorage = new LocalStorage();
  const authUser = localStorage.get(authUserKey);

  if (!authUser) {
    return config;
  }

  const parsedAuthUser = JSON.parse(authUser) as AuthUser;

  if (!parsedAuthUser.token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${parsedAuthUser.token}`,
    },
  };
};

const handlerResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DEFAULT_SERVER_DOMAIN}/api`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const factoryApiMethod =
  (method: Method) =>
  async <T = any>(
    url: AxiosRequestConfig["url"],
    config?: Omit<AxiosRequestConfig, "url">
  ): Promise<T> => {
    return axiosInstance({
      ...handleRequest({ url, ...config }),
      method,
    }).then((res) => handlerResponse(res));
  };

const httpClient = {
  get: factoryApiMethod(HTTP_METHOD.GET),
  post: factoryApiMethod(HTTP_METHOD.POST),
  patch: factoryApiMethod(HTTP_METHOD.PATCH),
  put: factoryApiMethod(HTTP_METHOD.PUT),
  delete: factoryApiMethod(HTTP_METHOD.DELETE),
};

export default httpClient;
