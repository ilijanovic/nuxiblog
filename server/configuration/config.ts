import { ConnectOptions } from "mongoose";

export const config = {
  mongodbConfig: {} as ConnectOptions,
  saltRounds: 10,
  tokenExpiration: "2h",
  cookieName: "nuxibloggy",
  cookieExpiration: 10000000,
  images_path: "./images",
  images_webp_path: "./images_webp",
  profile_path: "./images_profile",
  thumbnail: "./images_thumbnails",
  thumbnail_webp: "./images_thumbnails_webp",
  thumbnail_width: 200,
  thumbnail_height: 200,
  image_height: 600,
  image_width: 600,
  temp_images_path: "./png_images",
  temp_images_webp_path: "./webp_images",
};
