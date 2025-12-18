import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  // Surface misconfiguration early so network calls don't silently hit the wrong origin
  console.warn("VITE_API_BASE_URL is not defined. API requests will use the current origin.");
}

console.log(baseURL);

export const api = axios.create({
  baseURL: baseURL || window.location.origin,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_BASE_URL = api.defaults.baseURL;
