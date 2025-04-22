import useAxiosPrivate from "../api/axiosPrivate.ts";

const useSendMessages = () => {
  const Axios = useAxiosPrivate();

  async function sendMessage(message: string) {

    try {
        
    } catch (error) {
        
    }
  }

  return { sendMessage };
};

export default useSendMessages;
