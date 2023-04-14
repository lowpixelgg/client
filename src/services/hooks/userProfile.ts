import useSWR from "swr";
import { api } from "@/services/apiClient";

export function useProfile<Data = any, Error = any>(slug: string) {
  const { data, error, mutate, isValidating } = useSWR<Data, Error>(
    slug,
    async (slug) => {
      const { data } = await api.get("/social/profiles/" + slug);

      return data.body;
    },
    { suspense: false }
  );

  return { profile: data, error, isValidating, mutate };
}
