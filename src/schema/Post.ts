import * as z from "zod";
import { PostSchema } from "./PostSchema";

export type PostType = z.infer<typeof PostSchema>;
