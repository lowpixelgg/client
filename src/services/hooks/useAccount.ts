import { api } from "@/services/apiClient";
import useSWR from "swr";

const useAccount = () => {
  const { data, error, isValidating, mutate } = useSWR(
    "account",
    async () => {
      const { data } = await api.get("/account");

      return data.body;
    },
    { suspense: true }
  );

  return { user: data, error, isValidating, mutate };
};

export default useAccount;
