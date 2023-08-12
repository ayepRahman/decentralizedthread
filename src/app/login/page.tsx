import GoogleButton from "@/components/GoogleButton";
import { getServerAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

type Props = {};

export default async function LoginPage({}: Props) {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className=" h-screen w-screen flex flex-col justify-center bg-[url('/images/bg-gradient-hero.png')]">
      {/* card */}
      <div className="border border-slate-300 max-w-xs w-full mx-auto rounded-xl p-8 bg-white bg-opacity-10 backdrop-blur-lg  drop-shadow-lg">
        <div className=" text-center text-lg">Sign in</div>
        <GoogleButton className="w-full mt-4 rounded-full" />
        <div className="w-full bg-white my-4 h-[1px] opacity-20" />
      </div>
    </main>
  );
}
