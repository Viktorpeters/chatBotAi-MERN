import axios, { AxiosInstance } from "axios";

const AxiosPrivate = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://127.0.0.1:2500/api/v1",
    withCredentials: true,
  });
};

export default AxiosPrivate;