import { useMemo } from "react";
import axios from "axios";
import Cookies from "react-cookies";
import { API_URL } from "../constants";
const useAxios = () => {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    let JWT_TOKEN = Cookies.load("token");
    console.log(JWT_TOKEN);
    // Add a request interceptor to set the auth header dynamically
    instance.interceptors.request.use((config) => {
      if (JWT_TOKEN && config.headers) {
        config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
      }
      return config;
    });

    return instance;
  }, []);

  return axiosInstance;
};

export default useAxios;
