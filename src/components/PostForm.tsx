"use client";

import { useCreatePost } from "@/hooks/useCreatePost";
import { PostType } from "@/schema/Post";
import { PostKeys } from "@/schema/PostKeys";
import { PostSchema } from "@/schema/PostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type Props = {
  onSuccess?: () => void;
};

const POST_MAX_TITLE_LENGTH = 200;

export function PostForm({ onSuccess }: Props) {
  const router = useRouter();
  const methods = useForm<PostType>({
    resolver: zodResolver(PostSchema),
  });

  const { mutate: createPost, isLoading, isSuccess, data } = useCreatePost();
  const errors = methods.formState.errors;
  const titleError = errors[PostKeys.enum.title]?.message;
  const title = methods.watch(PostKeys.enum.title)?.length || 0;

  const handleSubmit = (data: PostType) => {
    createPost(data);
  };

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      onSuccess?.();
      router.refresh();
    }
  }, [isSuccess, methods, onSuccess, router]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Textarea
          placeholder="What's happening?!"
          isError={!!titleError}
          {...methods.register(PostKeys.enum.title)}
        />

        <div className="flex justify-between mt-2">
          {titleError && (
            <div className=" text-sm text-red-500">{titleError}</div>
          )}
          <div className="ml-auto text-sm">
            {title}/{POST_MAX_TITLE_LENGTH}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button isLoading={isLoading} className="rounded-full w-20">
            Post
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
