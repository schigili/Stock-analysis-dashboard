import axios from "axios";

const LOCAL_API_URL = "http://127.0.0.1:8000";
const PROD_API_URL = "https://finvue-api.onrender.com";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? LOCAL_API_URL : PROD_API_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (
      config &&
      !config._retriedWithProd &&
      config.baseURL === LOCAL_API_URL &&
      !error.response
    ) {
      config._retriedWithProd = true;
      config.baseURL = PROD_API_URL;
      return api.request(config);
    }
    return Promise.reject(error);
  }
);

export default api;