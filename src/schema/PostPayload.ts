import { Prisma } from "@prisma/client";

export type PostPayload = Prisma.PostGetPayload<{
  include: { author: true; likes: true; replies: true };
}>;
