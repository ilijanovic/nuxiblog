import { Document } from "mongoose";
import { AuthorI } from "~~/types";
import { conn } from "../configuration/connection";
import { authorConfig } from "../configuration/author";
import mongoose from "mongoose";
const schema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
    trim: true,
    minlength: authorConfig.password_min_length,
  },
  name: {
    maxlength: authorConfig.name_length,
    trim: true,
    type: String,
  },
  family_name: {
    type: String,
    maxlength: authorConfig.family_name_length,
    trim: true,
  },
  description: {
    type: String,
    maxlength: authorConfig.description_length,
    trim: true,
  },
  blogs: [mongoose.Types.ObjectId],
  props: {},
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: authorConfig.username_length,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
    immutable: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

export const Author = conn.model<AuthorModel>("Author", schema);

interface AuthorModel extends AuthorI, Document {}
