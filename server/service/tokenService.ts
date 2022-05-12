import { DecodedTokenI, TokenSignatureI } from "~~/types";
import jwt, { decode } from "jsonwebtoken";
import { IncomingMessage } from "h3";
import { config } from "../configuration/config";
export const tokenService = {
  generateToken({ _id }: TokenSignatureI): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(
        { _id },
        process.env.PRIVATE_KEY!,
        { expiresIn: config.tokenExpiration },
        (err, token) => {
          if (err) return rej(err);
          if (!token) return rej(err);
          res(token);
        }
      );
    });
  },

  verifyToken(token: string): Promise<boolean> {
    return new Promise((res) => {
      let key = process.env.PRIVATE_KEY?.toString()!;
      jwt.verify(token, key, (err) => {
        if (err) return res(false);
        res(true);
      });
    });
  },

  decode(token: string): DecodedTokenI {
    return <DecodedTokenI>decode(token);
  },

  getTokenFromHeader(req: IncomingMessage): null | string {
    if (!req.headers.authorization) return null;
    return req.headers.authorization.split(" ")[1];
  },
};
