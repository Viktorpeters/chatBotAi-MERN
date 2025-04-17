/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import AxiosPrivate from "../api/axiosPrivate";
import { useAuth } from "../context/context";

const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {setIsLogged} = useAuth()!

  const logout = async () => {
    setIsLoading(true);

    try {
        const response = await AxiosPrivate().get("/user/logout");
        
        setIsLogged(false)

      return response.data;
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};

export default useLogout;
