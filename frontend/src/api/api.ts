import axios, { AxiosInstance } from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AxoisPrivate = (): AxiosInstance | Error => {
  const { token } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Handle missing token

      navigate("/login");
    }
  }, [token, navigate]);

  return axios.create({
    baseURL: "http://127.0.0.1:2500",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
