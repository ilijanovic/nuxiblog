import { hash, compare } from "bcrypt";
import { config } from "../configuration/config";

export const passwordService = {
  hashPassword(password: string) {
    return hash(password, config.saltRounds);
  },
  comparePasswords(password: string, hash: string) {
    return compare(password, hash);
  },
};
