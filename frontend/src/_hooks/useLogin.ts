import { useState } from "react";
import { AxoisPrivate } from "../api/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuth()!;
  const navigate = useNavigate();
  const axiosInstance = AxoisPrivate();

  async function handleLogin(email: string, password: string) {
    setIsLoading(true);
    try {
      
      if (axiosInstance instanceof Error) {
        toast.error("error signing in, un-authorized");
        return;
      }

      const response = await axiosInstance.post("/api/v1/user/signin", {
        email,
        password,
      });

      setUser({ name: response.data?.name, email: response.data?.email });

      // set token

      setToken(response.data?.token?.accessToken);
     

      // set the local storage

      localStorage.setItem(
        "users",
        JSON.stringify({
          name: response.data?.name,
          email: response.data?.email,
        })
      );

      navigate("/");
      toast.success("Logged in successfully");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
      
        toast.error(error?.response?.data?.message || "Bad Request");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleLogin };
};

export default useLogin;
