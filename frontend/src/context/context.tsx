/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useState, useEffect } from "react";
import { authCheck } from "../api/authCheck";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

type authType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  nameInitials: string;
  setNameInitials: React.Dispatch<React.SetStateAction<string>>;
};

const authContext = createContext<authType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameInitials, setNameInitials] = useState("");

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

      const res = await authCheck();

      if (res.success) {
        setToken(res.token);
        setIsLogged(true);

        navigate("/chats");

        setLoading(false);

        // get the name innitials

        const data = JSON.parse(localStorage.getItem("state"));
        setNameInitials(`${data.name[0]}${data.name[1]}`);
        return;
      } else {
        // go to the login
        navigate("/login");

        setLoading(false);
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
        nameInitials,
        setNameInitials,
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
