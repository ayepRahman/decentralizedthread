import { PostType } from "@/schema/Post";
import { createPost } from "@/services/api/post";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const mutationKey = ["createPost"];

export const useCreatePost = <TError = AxiosError, TContext = unknown>(
  options?: UseMutationOptions<any, TError, PostType, TContext>
) => {
  return useMutation({
    mutationKey,
    mutationFn: createPost,
    ...options,
  });
};

useCreatePost.getKey = () => mutationKey;

// export const useMeQuery = <TData = MeQuery, TError = unknown>(
//   variables?: MeQueryVariables,
//   options?: UseQueryOptions<MeQuery, TError, TData>
// ) =>
//   useQuery<MeQuery, TError, TData>(
//     variables === undefined ? ['Me'] : ['Me', variables],
//     useFetcher<MeQuery, MeQueryVariables>(MeDocument).bind(null, variables),
//     options
//   );
// useMeQuery.document = MeDocument;

// useMeQuery.getKey = (variables?: MeQueryVariables) =>
//   variables === undefined ? ['Me'] : ['Me', variables];
