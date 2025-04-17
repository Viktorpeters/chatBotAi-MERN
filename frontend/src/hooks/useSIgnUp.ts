/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AxiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";
import { useState } from "react";

const useSignUpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function signup(email: string, name: string, password: string) {
    setIsLoading(true);
    try {
      const response = await AxiosPrivate().post("/user/signup", {
        email,
        password,
        name,
      });

      setIsLoading(false);

      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'an error occured');
      setIsLoading(false);
    }
  }

  return { isLoading, signup };
};

export default useSignUpHook;
