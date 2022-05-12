import { Author } from "../model/author";
import { fileService } from "../service/fileService";
import { passwordService } from "../service/passwordService";
import { authorService } from "../service/authorService";

export default defineEventHandler(async ({ req }) => {
  let { username, password, name, family_name, email } = await useBody(req);

  let author = await authorService.findAuthorByEmail(email);
  if (author !== null) throw "Author already exists";

  let password_hash = await passwordService.hashPassword(password);
  let newAuthor = new Author({
    email,
    password,
    username,
    name,
    family_name,
    password_hash,
  });

  try {
    await newAuthor.save();
    return {
      message: "User created",
    };
  } catch (err) {
    await fileService.writeErrorLog(
      "./error.log",
      JSON.stringify(err),
      "register"
    );
    throw {
      message: "Something wrong happend",
    };
  }
});
