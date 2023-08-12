import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const queryKey = ["authSession"];

export const useGetAuthSession = <TData = any, TError = unknown>(
  options?: UseQueryOptions<Session | null, TError, TData>
) => {
  return useQuery({
    queryKey,
    queryFn: async () => getSession(),
    ...options,
  });
};

useGetAuthSession.getKey = () => queryKey;
