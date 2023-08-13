"use client";

import { useGetAuthSession } from "@/hooks/useGetAuthSession";
import { useLikePost } from "@/hooks/useLikePost";
import { cn } from "@/lib/utils";
import { PostPayload } from "@/schema/PostPayload";
import { format } from "date-fns";
import { DotIcon, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PostDropdown } from "./PostDropdown";
import { RepliesButton } from "./RepliesButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";

type Props = {
  post: PostPayload;
};

export function PostCard({ post }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useGetAuthSession();
  const { mutate: likePost, isSuccess } = useLikePost();

  const likesCount = post?.likes.length;
  const repliesCount = post?.replies.length;
  const hasUserLikedPost = post?.likes.some(
    (like) => like.userId === session?.user?.id
  );

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Post liked",
      });
      router.refresh();
    }
  }, [isSuccess, router, toast]);

  return (
    <Card className="p-4 flex gap-2" key={post.id}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={post?.author?.image || ""} alt="profile-img" />
        <AvatarFallback>
          {post?.author?.name?.substring(0, 2).toUpperCase() || ""}
        </AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className=" flex items-center gap-2 w-full">
          <div className="text-md font-semibold">{post?.author?.name}</div>
          <div className=" text-sm text-slate-500">
            @{post?.author?.name?.split(" ").join("").toLowerCase()}
          </div>
          <DotIcon className="text-slate-500" />

          <div className="text-sm text-slate-500">
            {format(new Date(post.createdAt), "MMM d")}
          </div>

          <div className=" ml-auto">
            <PostDropdown post={post} />
          </div>
        </div>
        {/* title */}
        <div className="text-sm">{post.title}</div>
        {/* actions */}
        <div className="flex items-center justify-between mt-8 gap-2">
          <div className="flex items-center gap-2 w-8">
            <RepliesButton post={post} />
            {repliesCount > 0 && (
              <span className=" text-sm text-slate-500">{repliesCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2 w-8">
            <Heart
              onClick={() => {
                if (!post.id || hasUserLikedPost) return;
                likePost({
                  postId: post.id,
                });
              }}
              className={cn("h-4 w-4 cursor-pointer hover:text-red-500", {
                "text-red-500 fill-red-500 cursor-default": hasUserLikedPost,
              })}
            />
            {likesCount > 0 && (
              <span className=" text-sm text-slate-500">{likesCount}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
