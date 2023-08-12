import { API_URL } from "@/constants/base";
import { PostType } from "@/schema/Post";
import { Prisma } from "@prisma/client";

export const createPost = async (data: PostType) => {
  return await fetch(`${API_URL}/post`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPosts = async (): Promise<
  Prisma.PostGetPayload<{
    include: { author: true; likes: true };
  }>[]
> => {
  const res = await fetch(`${API_URL}/post?sortBy=createdAt&orderBy=desc`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  return data?.data || [];
};

export const deletePost = async ({ postId }: { postId: string }) => {
  return await fetch(`${API_URL}/post/${postId}`, {
    method: "DELETE",
  });
};

export const likePost = async ({ postId }: { postId: string }) => {
  return await fetch(`${API_URL}/post/like`, {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
};
