"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

type Props = {
  error: Error;
  reset: () => void;
};

export default function error({ error, reset }: Props) {
  return (
    <div className="h-screen w-screen justify-center flex flex-col">
      <Card className="mx-auto p-4">
        <div>There was a problem</div>
        <div className=" text-3xl my-2">
          {error?.message || "Something when wrong"}
        </div>
        <div className="text-sm">
          Please try again later or contract support if the problem persists.
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button onClick={reset}>Try again</Button>
          <Button onClick={() => redirect("/")} variant="secondary">
            Go back home
          </Button>
        </div>
      </Card>
    </div>
  );
}
