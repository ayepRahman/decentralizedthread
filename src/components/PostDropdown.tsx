"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAuthSession } from "@/hooks/useGetAuthSession";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

type Props = {
  className?: string;
  post: Prisma.PostGetPayload<{
    include: { author: true; likes: true };
  }>;
};

export function PostDropdown({ className, post }: Props) {
  const { data: session } = useGetAuthSession();
  const canDelete = session?.user?.id === post.authorId;

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
              console.log("can delete");
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
