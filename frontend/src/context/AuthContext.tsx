import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
};

type userAuth = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string
};

const AuthContext = createContext<userAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser: setUser,
        setIsLoggedIn: setIsLoggedIn,
        setToken: setToken,
        token: token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): userAuth | undefined => {
  return useContext(AuthContext);
};
