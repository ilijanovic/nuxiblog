import { Document } from "mongoose";
import { BlogI } from "~~/types";
import { conn } from "../configuration/connection";
import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  body: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
  },
  props: {},
  images: [
    {
      imageId: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
      src: {
        type: String,
      },
      webp_src: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
    index: true,
    immutable: true,
  },
  comments: [
    {
      authorId: {
        type: mongoose.Types.ObjectId,
      },
      comment: {
        type: String,
        trim: true,
      },

      created: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true,
      },
      default: [],
    },
  ],

  likeCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Array,
    default: [],
  },
  thumbnail: {
    src: {
      type: String,
      trim: true,
    },
    src_webp: {
      type: String,
      trim: true,
    },
  },
  editors: [
    {
      authorId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      permissions: {
        type: Array,
        default: [],
      },
    },
  ],
  slug: {
    type: String,
    index: true,
    trim: true,
  },
  categories: {
    type: Array,
    default: [],
  },
});

export const Blog = conn.model<BlogModel>("Blog", schema);

export interface BlogModel extends BlogI, Document {}
