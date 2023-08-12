import { Loader2 } from "lucide-react";

type Props = {};

export function PageLoader({}: Props) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <Loader2 className="animate-spin mx-auto" />
    </div>
  );
}
