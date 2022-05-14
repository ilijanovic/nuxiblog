import { ImageI } from "~~/types";
import { Author } from "../model/author";

function show(show: boolean) {
  return show ? "" : "-password_hash";
}
export const authorService = {
  findAuthorByEmail(email: string, showPassword = false) {
    return Author.findOne({ email }).select(show(showPassword));
  },
  findAuthorByUsername(username: string, showPassword = false) {
    return Author.findOne({ username }).select(show(showPassword));
  },
  findAuthorById(authorId: string, showPassword = false) {
    return Author.findOne({ _id: authorId }).select(show(showPassword));
  },
  async addImage(authorId: string, image: ImageI) {
    await Author.updateOne(
      { _id: authorId },
      {
        $push: {
          tempImages: {
            ...image,
          },
        },
      }
    );
    return image;
  },
};
