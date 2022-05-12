import { AuthorResponseI } from "~~/types";
import { verifyUser } from "../auth/verifyuser";
import { Author } from "../model/author";
export default defineEventHandler(async (event) => {
  try {
    let { _id } = await verifyUser(event);
    return Author.findOne({ _id }) as unknown as AuthorResponseI;
  } catch (err) {
    throw {
      message: "Cannot find user",
    };
  }
});
