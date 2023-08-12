import { prisma } from "@/lib/db";
import { getServerAuthSession } from "@/lib/nextAuth";
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

    const postId = body?.postId;
    const isLike = body?.like;

    if (!postId) {
      return NextResponse.json(
        { error: { message: "postId is required!" } },
        { status: 400 }
      );
    }

    // if (typeof isLike !== "boolean") {
    //   return NextResponse.json(
    //     { error: { message: "like is required!" } },
    //     { status: 400 }
    //   );
    // }

    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json(
      { data: { like, message: "Succesfully like post!" } },
      { status: 200 }
    );

    // const like = await prisma.like.delete({
    //   data: {
    //     userId: session.user.id,
    //     postId,
    //   },
    // });

    // return NextResponse.json(
    //   { data: { like, message: "Succesfully like post!" } },
    //   { status: 200 }
    // );
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Something when wrong!" } },
      { status: 500 }
    );
  }
}
