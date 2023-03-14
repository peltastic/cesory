import axios from "axios";
export const baseUrl: string = "https://cesory-app.onrender.com";
// export const baseUrl: string = "http://localhost:8000";

export const privateInstance = axios.create({
  baseURL: baseUrl,
  headers: { "content-type": "application/json" },
});

export const publicInstance = axios.create({
  baseURL: baseUrl,
  headers: { "content-type": "application/json" },
});
