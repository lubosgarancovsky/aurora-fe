import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.SOME_API_URL || "http://localhost:8080";

const ApiClient = () => {
  const defaultOptions = {
    baseURL
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  });

  return instance;
};

export default ApiClient();
