import { prisma } from "@/lib/db";
import { getServerAuthSession } from "@/lib/nextAuth";
import { ReplySchema } from "@/schema/ReplySchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const session = await getServerAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: { message: "You must be logged in" } },
        { status: 401 }
      );
    }

    const response = ReplySchema.safeParse(body);

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json(
        { error: { message: "Invalid request", errors } },
        { status: 400 }
      );
    }
    const { title, parentId } = response.data;

    const post = await prisma.post.create({
      data: {
        title,
        parentId,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      { data: { post, message: "Reply created" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("post error", error);
    NextResponse.json({ error }, { status: 400 });
  }
}
