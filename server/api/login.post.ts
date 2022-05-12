import { setCookie } from "h3";
import { config } from "../configuration/config";
import { passwordService } from "../service/passwordService";
import { tokenService } from "../service/tokenService";
import { authorService } from "../service/authorService";
import { AuthorResponseI } from "~~/types";

export default defineEventHandler(async (event) => {
  let req = event.req;
  let { username, password } = await useBody(req);

  let author = await authorService.findAuthorByUsername(username, true).lean();
  if (!author) {
    throw {
      message: "Author does not exist",
    };
  }

  let passwordComparison = await passwordService.comparePasswords(
    password,
    author.password_hash!
  );

  if (!passwordComparison) {
    throw {
      message: "Username or password is wrong",
    };
  }

  let token = await tokenService.generateToken({
    _id: author._id,
    role: "author",
  });
  setCookie(event, config.cookieName, token, {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });

  delete author.password_hash;

  return author as unknown as Omit<AuthorResponseI, "password_hash">[];
});
