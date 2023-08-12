"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button, ButtonProps } from "./ui/button";

type Props = ButtonProps;

export default function GoogleButton({ className, ...props }: Props) {
  const handleOnClick = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error: any) {
      console.error("[ERROR]", error);
    }
  };

  return (
    <Button
      onClick={handleOnClick}
      className={cn(className, "gap-2")}
      {...props}
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </Button>
  );
}
