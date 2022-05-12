import { Blog } from "../model/blog";

export const blogService = {
  getBlogsById(authorId: string) {
    return Blog.find({ authorId }).exec();
  },
  getBlogBySlug(slug: string) {
    return Blog.findOne({ slug });
  },
};
