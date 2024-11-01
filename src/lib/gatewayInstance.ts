import axios, { AxiosInstance } from "axios";


const gatewayInstance: AxiosInstance = axios.create({
  // withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

////Add authorize header

////Use Request Interceptor for retry mechanism, refresh token, other config

//// Response Interceptor for handle error

export default gatewayInstance;