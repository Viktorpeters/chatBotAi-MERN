/* eslint-disable @typescript-eslint/no-unused-vars */
import AxiosPrivate from "../api/axiosPrivate";
import toast from "react-hot-toast";

const useReferesh = () => {
  async function refresh() {
    try {
      const response = await AxiosPrivate().get("/user/refresh");

        console.log(response.data?.token?.accessToken);
        
        return response.data?.token?.accessToken;
    } catch (error) {
      toast.error("sign in again");
    }
  }

  return { refresh };
};

export default useReferesh;
