import { POST_MAX_TITLE_LENGTH } from "@/constants/post";
import * as z from "zod";

export const ReplySchema = z.object({
  title: z.string().min(1, "Title is required").max(POST_MAX_TITLE_LENGTH),
  parentId: z.string(),
});
