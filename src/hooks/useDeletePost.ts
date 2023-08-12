import { deletePost } from "@/services/api/post";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const mutationKey = ["deletePost"];

export const useDeletePost = <TError = AxiosError, TContext = unknown>(
  options?: UseMutationOptions<any, TError, { postId: string }, TContext>
) => {
  return useMutation({
    mutationKey,
    mutationFn: deletePost,
    ...options,
  });
};

useDeletePost.getKey = () => mutationKey;
