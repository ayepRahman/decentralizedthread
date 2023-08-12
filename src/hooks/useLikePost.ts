import { likePost } from "@/services/api/post";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const mutationKey = ["likePost"];

export const useLikePost = <TError = AxiosError, TContext = unknown>(
  options?: UseMutationOptions<any, TError, { postId: string }, TContext>
) => {
  return useMutation({
    mutationKey,
    mutationFn: likePost,
    ...options,
  });
};

useLikePost.getKey = () => mutationKey;
