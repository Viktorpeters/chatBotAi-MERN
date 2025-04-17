import toast from "react-hot-toast";
import AxiosPrivate from "../api/axiosPrivate";
import { useState } from "react";


const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function login(email: string, password: string) {
    setIsLoading(true);

    try {
      const response = await AxiosPrivate().post("/user/signin", {
        email,
        password,
      });

      setIsLoading(false);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "an error occured");

      setIsLoading(false);
    }
  }
  return { isLoading, login };
};

export default useLogin;
