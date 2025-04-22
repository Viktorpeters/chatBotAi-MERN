import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:2500/api/v1",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await axiosBase.get("/user/refresh");

    // return token

    return response.data.token.accessToken;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Refresh token expired. Reauthenticate.");
    } else if (error.response?.status === 401) {
      throw new Error("No refresh token. Please login again.");
    }

    // fallback for unknown error
    throw new Error("Failed to refresh token.");
  }
};

export default refreshToken;
