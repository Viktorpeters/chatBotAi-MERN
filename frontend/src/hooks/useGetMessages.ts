import AxiosPrivate from "../api/axiosPrivate";

const useGetMessagesHook = () => {
  async function getAllMessages() {
    await AxiosPrivate().get("/chats/all-chats");
  }
};

export default useGetMessagesHook;
