"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { POST_MAX_TITLE_LENGTH } from "@/constants/post";
import { useGetAuthSession } from "@/hooks/useGetAuthSession";
import { useReplyPost } from "@/hooks/useReplyPost";
import { cn } from "@/lib/utils";
import { PostType } from "@/schema/Post";
import { PostKeys } from "@/schema/PostKeys";
import { PostPayload } from "@/schema/PostPayload";
import { PostSchema } from "@/schema/PostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { DotIcon, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Props = {
  className?: string;
  post: PostPayload;
};

export function RepliesButton({ className, post }: Props) {
  const router = useRouter();
  const { data: session } = useGetAuthSession();
  const { toast } = useToast();
  const author = post?.author;
  const currentUser = session?.user;
  const { mutate: replyPost, isLoading, isSuccess } = useReplyPost();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const methods = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });

  const errors = methods.formState.errors;
  const titleError = errors[PostKeys.enum.title]?.message;
  const title = methods.watch(PostKeys.enum.title)?.length || 0;

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
  }, [isOpen, methods]);

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Post replied",
      });
      router.refresh();
    }
  }, [isSuccess, methods, router, toast]);

  const handleSubmit = (data: PostType) => {
    replyPost({
      title: data.title,
      parentId: post.id,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MessageSquare
          className={cn("h-4 w-4 cursor-pointer hover:text-cyan-500")}
        />
      </DialogTrigger>
      <DialogContent>
        {/* author */}
        <div className="flex gap-2">
          <div className="relative">
            <div className="h-full w-[2px] bg-slate-800 absolute mt-10 ml-[15px]" />

            <Avatar className="h-8 w-8">
              <AvatarImage src={author?.image || ""} alt="profile-img" />
              <AvatarFallback>
                {author?.name?.substring(0, 2).toUpperCase() || ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <div className=" flex items-center gap-2 w-full">
              <div className="text-md font-semibold">{author?.name}</div>
              <div className=" text-sm text-slate-500">
                @{author?.name?.split(" ").join("").toLowerCase()}
              </div>
              <DotIcon className="text-slate-500" />

              <div className="text-sm text-slate-500">
                {format(new Date(post.createdAt), "MMM d")}
              </div>
            </div>
            {/* title */}
            <div className="text-sm">{post.title}</div>
          </div>
        </div>

        {/* currentuser */}
        <div className="flex gap-2 mt-8">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.image || ""} alt="profile-img" />
            <AvatarFallback>
              {currentUser?.name?.substring(0, 2).toUpperCase() || ""}
            </AvatarFallback>
          </Avatar>

          <form
            className="w-full"
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <Textarea
              className="w-full border-none !p-0 mt-2 focus-visible:ring-0"
              placeholder="Post your reply!"
              {...methods.register(PostKeys.enum.title)}
            />

            <div className="flex justify-between mt-2">
              {titleError && (
                <div className=" text-sm text-red-500">{titleError}</div>
              )}
              <div
                className={cn("ml-auto text-sm", {
                  "text-red-500": title > POST_MAX_TITLE_LENGTH,
                })}
              >
                {title}/{POST_MAX_TITLE_LENGTH}
              </div>
            </div>

            <div className="w-full flex justify-end mt-4">
              <Button
                isLoading={isLoading}
                className=" rounded-full"
                size="sm"
                type="submit"
              >
                Reply
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
