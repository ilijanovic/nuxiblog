import { CompatibilityEvent, useCookie } from "h3";
import { config } from "../configuration/config";
import { tokenService } from "../service/tokenService";

export const verifyUser = async (event: CompatibilityEvent) => {
  let token = useCookie(event, config.cookieName);
  if (!token)
    throw {
      message: "No token found",
    };

  let authorized = await tokenService.verifyToken(token);
  if (!authorized) {
    throw {
      message: "You are not authorized",
    };
  }
  return tokenService.decode(token);
};
