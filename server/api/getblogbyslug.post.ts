import { blogService } from "../service/blogService";
import { BlogResponseI } from "~~/types";
export default defineEventHandler(async (event) => {
  let { slug } = await useBody(event.req);
  return blogService.getBlogBySlug(slug).lean() as unknown as BlogResponseI[];
});
