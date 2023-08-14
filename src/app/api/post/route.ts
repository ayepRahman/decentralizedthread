import { prisma } from "@/lib/db";
import { getServerAuthSession } from "@/lib/nextAuth";
import { PostSchema } from "@/schema/PostSchema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import qs from "query-string";

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

    const response = PostSchema.safeParse(body);

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json(
        { error: { message: "Invalid request", errors } },
        { status: 400 }
      );
    }
    const { title } = response.data;

    const post = await prisma.post.create({
      data: {
        title,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      { data: { post, message: "Post created" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("post error", error);
    NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const qsParams = qs.parse(searchParams.toString());
    const sortBy = qsParams?.sortBy as string;
    const orderBy = (qsParams?.orderBy || "desc") as Prisma.SortOrder;
    console.log("searchParams", searchParams);
    console.log("qsParams", JSON.stringify(qsParams, null, 2));

    const path = req.nextUrl.searchParams.get("path") || "/";
    const posts = await prisma.post.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        createdAt: sortBy === "createdAt" ? orderBy : "desc",
      },
      include: {
        author: true,
        likes: true,
        replies: true,
      },
    });

    // const getAuthor = await prisma.user.findUnique({
    //   where: { id: session.user.id },
    //   include: { posts: true },
    // });

    revalidatePath(path);

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Something when wrong!" } },
      { status: 500 }
    );
  }
}
