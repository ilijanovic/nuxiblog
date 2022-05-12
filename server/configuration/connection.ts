import mongoose from "mongoose";
import { config } from "../configuration/config";
import { envs } from "./env";
export const conn = mongoose.createConnection(
  envs.mongodbUri,
  config.mongodbConfig
);
