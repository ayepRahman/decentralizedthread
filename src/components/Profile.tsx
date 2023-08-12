"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  className?: string;
  showDropdown?: boolean;
};

export function Profile({ className, showDropdown = true }: Props) {
  const { data: session } = useSession();

  const img = session?.user?.image;
  const username = session?.user?.name;

  return (
    <div className={cn(className, "flex items-center gap-2")}>
      <Avatar>
        <AvatarImage src={img || ""} alt="profile-img" />
        <AvatarFallback>
          {username?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">{username}</div>
      {showDropdown && <ProfileDropdown className="ml-auto mr-4" />}
    </div>
  );
}
