import GoogleButton from "@/components/GoogleButton";

type Props = {};

export default async function LoginPage({}: Props) {
  return (
    <main className=" h-screen w-screen flex flex-col justify-center">
      {/* card */}
      <div className="border border-slate-300 max-w-xl mx-auto rounded-lg p-4">
        <div className="text-2xl">Sign in to Dethread</div>
        <GoogleButton className="w-full mt-4" />
      </div>
    </main>
  );
}
