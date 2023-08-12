import { prisma } from "@/lib/db";
import { getServerAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const session = await getServerAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: { message: "You must be logged in" } },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    const isAuthor = post?.authorId === session.user.id;

    if (!isAuthor) {
      return NextResponse.json(
        { error: { message: "You are not the author of this post" } },
        { status: 401 }
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { data: { message: "Post deleted" } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Something when wrong!" } },
      { status: 500 }
    );
  }
}
