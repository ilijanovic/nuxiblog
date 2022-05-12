import { blogService } from "../service/blogService";
import { BlogResponseI } from "~~/types";
export default defineEventHandler(async (event) => {
  let { authorId } = await useBody(event.req);

  return blogService.getBlogsById(authorId) as unknown as BlogResponseI[];
});
