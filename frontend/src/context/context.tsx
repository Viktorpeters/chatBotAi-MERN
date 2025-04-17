import { createContext, useContext, useState, useLayoutEffect } from "react";

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
    
  }, [])

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
