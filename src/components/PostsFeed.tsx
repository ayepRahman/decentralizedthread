import { getServerAuthSession } from "@/lib/nextAuth";
import { getPosts } from "@/services/api/post";
import { redirect } from "next/navigation";
import { PostCard } from "./PostCard";
import { Card } from "./ui/card";

/**
 * @desc example for scrolling pagination
 * https://codesandbox.io/p/sandbox/adoring-browser-vk5k0d?file=%2Fapp%2Fpage.tsx%3A1%2C13
 */

type Props = {};
const session = null;

export function PostsFeedLoader() {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={`post-card-loader-${i}`}
          className="w-full h-52  animate-pulse bg-slate-500"
        />
      ))}
    </div>
  );
}

export default async function PostsFeed({}: Props) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await getPosts();

  console.log("posts", posts);

  if (!posts.length) return null;

  return (
    <div className="p-4 space-y-4 overflow-hidden overflow-y-auto h-screen">
      {posts.map((post, i) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
