import { AuthorResponseI } from "~~/types";
import { verifyUser } from "../auth/verifyuser";
import { authorService } from "../service/authorService";

export default defineEventHandler(async (event) => {
  let _id;
  try {
    let decodedToken = await verifyUser(event);
    _id = decodedToken._id;

    return authorService.findAuthorById(_id) as unknown as Omit<
      AuthorResponseI,
      "password_hash"
    >;
  } catch (err) {
    return {
      message: err,
    };
  }
});
