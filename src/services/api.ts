import axios, { AxiosError } from "axios";

import * as ls from "@/utils/localstorageSlim";
import { pageDown, signOut } from "@/global/AuthContext";

export function setupApiClient() {
  const api = axios.create({
    // change if in local-dev
    baseURL: "https://saturn-api.rocketmta.com/v1",
    //baseURL: "http://localhost:4096/v1/"
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // if (window.location.pathname !== "/") {
      //   if (error) {
      //     return signOut();
      //   }

      // }

      console.log()

      signOut();

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use(async (config: any) => {
    const token = ls.get("saturn-api.token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  });

  return api;
}
