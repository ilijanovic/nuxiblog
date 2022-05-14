import { BlogI, BlogResponseI } from "~~/types";
import { Blog } from "../model/blog";
import { verifyUser } from "../auth/verifyuser";
import { fileService } from "../service/fileService";
import { config } from "../configuration/config";
import { utilsService } from "../service/utilsService";

export default defineEventHandler(async (event) => {
  let decodedToken;

  try {
    decodedToken = await verifyUser(event);
  } catch (err) {
    return {
      message: err,
    };
  }
  let data = await fileService.multiParser(event.req);

  let {
    title = "",
    description = "",
    body = "",
    tags = [],
    props = {},
    categories = [],
    comments = [],
    editors = [],
    thumbnail = {
      src: "",
      src_webp: "",
    },
    images = [],
    likeCount = 0,
    likes = [],
  } = data.fields as BlogI;
  console.log(images);
  if (data.files.thumbnail) {
    let [webps_thumbnail, pngs_thumbnail] = await Promise.all([
      fileService.formatToWebps(data.files.thumbnail, {
        height: config.thumbnail_height,
        width: config.thumbnail_width,
      }),
      fileService.formatToPngs(data.files.thumbnail, {
        height: config.thumbnail_height,
        width: config.thumbnail_width,
      }),
    ]);

    let directoryThumbnailWebpPath = config.thumbnail_webp;
    let directoryThumbnailPng = config.thumbnail;

    let [webpPaths, pngPaths] = await Promise.all([
      fileService.saveImages(
        directoryThumbnailWebpPath,
        webps_thumbnail,
        "webp"
      ),
      fileService.saveImages(directoryThumbnailPng, pngs_thumbnail, "png"),
    ]);

    thumbnail.src = pngPaths[0];
    thumbnail.src_webp = webpPaths[0];
  }

  let newBlog = new Blog({
    body,
    title,
    description,
    tags,
    props,
    images,
    authorId: decodedToken._id,
    categories,
    comments,
    editors,
    likeCount,
    likes,
    slug: utilsService.convertToSlug(title.trim()),
    date: new Date(),
    thumbnail,
  });

  try {
    let savedBlog = await newBlog.save();

    if (!savedBlog) {
      throw {
        message: "Something wrong happend",
      };
    }
    return savedBlog as unknown as BlogResponseI;
  } catch (err) {
    await fileService.writeErrorLog(
      "./error.log",
      JSON.stringify(err),
      "createpost"
    );
    return {
      message: "Something wrong happend",
    };
  }
});
