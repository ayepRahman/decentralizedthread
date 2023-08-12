"use client";

import { Profile } from "@/components/Profile";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PostForm } from "./PostForm";

type Props = {
  className?: string;
};

export function PostButton({ className }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className, "rounded-full")}>Post</Button>
      </DialogTrigger>
      <DialogContent>
        <Profile showDropdown={false} />
        <PostForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
