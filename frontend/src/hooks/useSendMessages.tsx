/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxiosPrivate from "../api/axiosPrivate.ts";
import toast from "react-hot-toast";

const useSendMessages = () => {
  const Axios = useAxiosPrivate();

  async function sendMessage(message: string) {
    try {
      const response = await Axios.post("/chats/sendchat");

      return response.data?.data;
    } catch (error) {
      toast.error("cant send chat");
    }
  }

  return { sendMessage };
};

export default useSendMessages;