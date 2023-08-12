import { Auth } from "@/components/Auth";
import { PostButton } from "@/components/PostButton";
import PostsFeed, { PostsFeedLoader } from "@/components/PostsFeed";
import { Profile } from "@/components/Profile";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function Home() {
  return (
    <main className="h-screen grid grid-cols-7 container max-w-screen-md mx-auto">
      <div className="col-span-2 border-r border-slate-500 space-y-2 py-4 flex flex-col justify-between">
        <div className="p-4">
          <Link
            href="/"
            className="flex gap-2 items-center cursor-pointer hover:text-neutral-500 hover:underline transition duration-150 ease-out hover:ease-in"
          >
            <HomeIcon />
            <span className="font-bold text-md">Dethread</span>
          </Link>
          <PostButton className="w-full mt-4" />
        </div>
        <Profile />
      </div>
      <div className=" col-span-5 border-r border-slate-500">
        <Suspense fallback={<PostsFeedLoader />}>
          <PostsFeed />
        </Suspense>
      </div>
    </main>
  );
}

export default Auth(Home);
