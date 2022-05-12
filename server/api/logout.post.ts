import { config } from "../configuration/config";

export default defineEventHandler(async (event) => {
  setCookie(event, config.cookieName, "", {
    maxAge: 0,
  });
  return "Logged out";
});
