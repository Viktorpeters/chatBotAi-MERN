/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback, useState } from "react";
import AxiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";
import { useAuth } from "../context/context"; // your auth context

const useSignUpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function signup(email: string, name: string, passsword: string) {
    try {
      const response = await AxiosPrivate().post("/user/signup");

      return response.data?.data;
    } catch (error) {
      toast.error("cant sign up, try again");
    }
  }

  return { isLoading, signup };
};

export default useSignUpHook;
