import { useEffect } from "react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import refreshToken from "../api/refreshToken";

interface CustomizedAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const axiosPrivate: AxiosInstance = axios.create({
  baseURL: "http://localhost:2500/api/v1",
  withCredentials: true,
});

const useAxiosPrivate = (): AxiosInstance => {
  const { token } = useAuth()!;
  const navigate = useNavigate();

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
          console.log("a token just expired");

          try {
            const newToken = await refreshToken();

            console.log(newToken, "this is the new token at refresh");

            prevRequest.headers = {
              ...prevRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };

            navigate("/chats");

            return axiosPrivate(prevRequest);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (refreshError: any) {
            // ✅ You can now catch and act on the reason
            console.log(refreshError.message);

            // optionally: logout user, redirect, toast, etc.
            // e.g., logout(); navigate("/login");

            toast.error("log in again");
            navigate("/login");

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // 🧹 Clean up on unmount
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
