/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useState, useEffect } from "react";
import useAxiosPrivate from "../api/axiosPrivate.ts";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

type authType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
};

const authContext = createContext<authType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const AxiosPrivate = useAxiosPrivate();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const raw = localStorage.getItem("state");
      const state = raw ? JSON.parse(raw) : null;

      if (!state?.state) {
        setLoading(false);

        // prompt them to login
        navigate("/login");
        return;
      }

      try {
        const response = await AxiosPrivate.get("/user/auth-status");

        const newToken = response.data.token.accessToken;
        setToken(newToken);
        setIsLogged(true);
      } catch (err) {
        console.error("Auth check failed");
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <authContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        setToken,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
