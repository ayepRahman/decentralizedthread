import { ReplySchema } from "@/schema/ReplySchema";
import { replyPost } from "@/services/api/post";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as z from "zod";

const mutationKey = ["replyPost"];

export const useReplyPost = <TError = AxiosError, TContext = unknown>(
  options?: UseMutationOptions<
    any,
    TError,
    z.infer<typeof ReplySchema>,
    TContext
  >
) =>
  useMutation({
    mutationKey,
    mutationFn: replyPost,
    ...options,
  });

useReplyPost.getKey = () => mutationKey;
