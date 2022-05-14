import { EventHandler } from "h3";
import mongoose from "mongoose";

export interface AuthorI<T = {}> {
  name: string;
  family_name: string;
  created: Date;
  links: AuthorLinksI[];
  blogs: mongoose.Types.ObjectId[];
  description: string;
  author_image: string;
  author_link: string;
  props: T;
  enabled: boolean;
  username: string;
  email: string;
  password_hash?: string;
  tempImages: ImageI[];
}

export interface AuthorLinksI<T = {}> {
  link: string;
  linkName: string;
  props: T;
}
export interface RegisterParamsI {
  username: string;
  password: string;
  name: string;
  family_name: string;
  email: string;
}

export interface ServerControllerI {
  [key: string]: EventHandler;
}

export interface LoginParamsI {
  password: string;
  username: string;
}
export interface ImageI {
  src: string;
  webp_src: string;
  name: string;
}
export interface BlogI<T = {}> {
  title: string;
  description: string;
  date: Date;
  body: string;
  tags: string[];
  props: T;
  images: ImageI[];
  authorId: mongoose.Types.ObjectId;
  comments: CommentI[];
  likeCount: number;
  likes: mongoose.Types.ObjectId[];

  thumbnail: {
    src: string;
    src_webp: string;
  };
  editors: EditorI[];
  slug: string;
  categories: string[];
}

export interface CommentI {
  commentId: mongoose.Types.ObjectId;
  comment: string;
  created: Date;
}

export type EditorPermissionsT =
  | "edit_body"
  | "edit_links"
  | "edit_title"
  | "edit_description"
  | "delete_blog"
  | "delete_comments"
  | "edit_thumbnail"
  | "edit_tags"
  | "add_remove_authors"
  | "disable_blog";

export interface EditorI {
  authorId: mongoose.Types.ObjectId;
  permissions: EditorPermissionsT;
}

export interface TokenSignatureI {
  _id: string;
  role: RoleT;
}

export type RoleT = "admin" | "author";

export interface DecodedTokenI extends TokenSignatureI {
  iat: number;
}

export interface AuthorResponseI extends AuthorI {
  _id: mongoose.Types.ObjectId;
  __v: number;
}

export interface BlogResponseI extends BlogI {
  _id: mongoose.Types.ObjectId;
  __v: number;
}
