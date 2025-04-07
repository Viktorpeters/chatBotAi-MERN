import { useState } from "react";
import axios from "../api/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth()!;

  async function logout() {
    setIsLoading(true);
    try {
      await axios.get("http://127.0.0.1:2500/api/v1/user/logout");

      localStorage.removeItem("users");
      setToken("");
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
