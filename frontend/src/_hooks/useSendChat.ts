import { useState } from "react";
import { AxoisPrivate } from "../api/api";
import toast from "react-hot-toast";
import { AxiosInstance } from "axios";

const useSendChat = () => {
  const [messages] = useState([]);
  const axios = AxoisPrivate() as AxiosInstance;

  async function useSendChat() {
    try {
      if (axios instanceof Error) {
        toast.error("cant send message");
        return;
      } else {
        const response = await axios.post("");
      }
    } catch (error) {}
  }

  return { messages };
};

export default useSendChat;
