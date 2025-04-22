/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useCallback } from "react";
import useAxiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";
import { useAuth } from "../context/context";
import { Axios } from "axios";

const useGetMessagesHook = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { isLogged } = useAuth()!;
  const getAllMessages = useCallback(async () => {
    console.log("this function is called");
    try {
      const response = await AxiosPrivate.get("/chats/all-chats");

      return response.data?.data;
    } catch (error: any) {
      console.log(error);

      if (error.response.data.message === "token expired") {
        console.log("token expired");
      }
    }
  }, [AxiosPrivate]);

  useEffect(() => {
    if (isLogged) {
      getAllMessages();
    }
  }, [isLogged, getAllMessages]);

  return { getAllMessages };
};

export default useGetMessagesHook;
