import { setCookie, CompatibilityEvent, useCookie } from "h3";
import { config } from "../configuration/config";
export const cookieService = {
  setCookie(event: CompatibilityEvent, token: string) {
    let { cookieName, cookieExpiration } = config;
    setCookie(event, cookieName, token, {
      httpOnly: true,
      maxAge: cookieExpiration,
    });
  },

  getTokenFromCookie(event: CompatibilityEvent) {
    return useCookie(event, config.cookieName);
  },

  eraseCookie(event: CompatibilityEvent): void {
    setCookie(event, config.cookieName, "", {
      maxAge: 0,
    });
  },
};
