/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import AxiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";

type authType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const authContext = createContext<authType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");

  useLayoutEffect(() => {
    async function checkAuth() {
      const raw = localStorage.getItem("state");

      const state = raw ? JSON.parse(raw) : null;

      if (!state) {
        return;
      }
      try {
        const response = await AxiosPrivate().get("/user/auth-status");
        setToken(response.data.token.accessToken);
      } catch (error: any) {
        toast.error("No Authorization");
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <authContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        setToken,
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
