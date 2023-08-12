import { getServerAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export function Auth<T>(Component: React.ComponentType<T>) {
  return async function ProtectedRoute(props: T) {
    const session = await getServerAuthSession();

    if (!session?.user) {
      redirect("/login");
    }

    return <Component {...props!} />;
  };
}

Auth.displayName = "Auth";
