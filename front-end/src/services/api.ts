import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:8888",
});
