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
const localStorage = new LocalStorage();

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { token } = localStorage.get(authUserKey) as AuthUser;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
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
  (
    url: AxiosRequestConfig["url"],
    config?: Omit<AxiosRequestConfig, "url">
  ): Promise<any> => {
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
