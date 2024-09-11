import axios, { AxiosInstance } from "axios";


const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

////Add authorize header

////Use Request Interceptor for retry mechanism, refresh token, other config

//// Response Interceptor for handle error

export default axiosInstance;