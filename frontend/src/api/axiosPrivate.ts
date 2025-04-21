import { useEffect } from "react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import useRefresh from "../hooks/useRefreshToken";
import { useAuth } from "../context/context"

interface CustomizedAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const axiosPrivate: AxiosInstance = axios.create({
  baseURL: "http://localhost:2500/api/v1",
  withCredentials: true,
});

const useAxiosPrivate = (): AxiosInstance => {
  const { token } = useAuth()!;
  const { refresh } = useRefresh();

  useEffect(() => {
    // ✅ Add request interceptor
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (token) {
          console.log("i just added a token to this request", token);
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // ✅ Add response interceptor
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config as CustomizedAxiosRequestConfig;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newToken = await refresh();

          console.log(newToken, "this is the new token at refresh");

          prevRequest.headers = {
            ...prevRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    // 🧹 Clean up on unmount
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
