"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useGetAuthSession } from "@/hooks/useGetAuthSession";
import { cn } from "@/lib/utils";
import { PostPayload } from "@/schema/PostPayload";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

type Props = {
  className?: string;
  post: PostPayload;
};

export function PostDropdown({ className, post }: Props) {
  const router = useRouter();
  const { data: session } = useGetAuthSession();
  const { toast } = useToast();
  const { mutate: deletePost, isSuccess } = useDeletePost();
  const canDelete = session?.user?.id === post.authorId;

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Post deleted",
      });

      router.refresh();
    }
  }, [isSuccess, router, toast]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className, "cursor-pointer")}>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={cn("text-slate-500 cursor-not-allowed", {
            "text-red-500 cursor-pointer": canDelete,
          })}
          onClick={() => {
            if (canDelete) {
              deletePost({
                postId: post.id,
              });
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
