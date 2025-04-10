import { useState } from "react";
import { AxoisPrivate } from "../api/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth()!;

  const axiosInstance = AxoisPrivate();

  async function logout() {
    setIsLoading(true);
    try {
      if (axiosInstance instanceof Error) {
        toast.error("error signing out");
        return;
      }
      await axiosInstance.get("http://127.0.0.1:2500/api/v1/user/logout");

      localStorage.removeItem("users");
      setToken("");
      setUser(null);
      toast.success("signed out succesfully");

      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("error logging out");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, logout };
};

export default useLogout;
