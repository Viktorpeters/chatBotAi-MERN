/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:2500/api/v1",
  withCredentials: true,
});

export const authCheck = async () => {
  try {
    // returns a token on page reload , and nothing if not refresh token is found .
    const response = await axiosBase.get("/user/auth-status");
    return {
      success: true,
      token: response.data.token.accessToken,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};
