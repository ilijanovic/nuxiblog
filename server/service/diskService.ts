import multer from "multer";
import { config } from "../configuration/config";
import { fileService } from "./fileService";
const storeThumbnail = multer.diskStorage({
  destination: async function (req, file, cb) {
    let dirExist = await fileService.directoryExist(
      "static" + config.images_path
    );
    if (!dirExist) {
      await fileService.createDirectory("static" + config.images_path);
    }
    dirExist = await fileService.directoryExist(
      "static" + config.images_webp_path
    );

    if (!dirExist) {
      await fileService.createDirectory("static" + config.images_webp_path);
    }
    cb(null, `static${config.images_path}/`);
  },
  filename(req, file, cb) {
    let [name]: string[] = file.originalname.split(".");
    const uniqueName: string =
      Date.now() + "-" + name.replace(/ /g, "") + ".png";
    cb(null, uniqueName);
  },
});

const storeProfileImage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let dirExist = await fileService.directoryExist(
      "static" + config.profile_path
    );
    if (!dirExist) {
      await fileService.createDirectory("static" + config.profile_path);
    }
    cb(null, `static${config.profile_path}`);
  },
  filename(req, file, cb) {
    let [name]: string[] = file.originalname.split(".");
    const uniqueName: string =
      Date.now() + "-" + name.replace(/ /g, "") + ".png";
    cb(null, uniqueName);
  },
});

export const uploadThumbnailImage: multer.Multer = multer({
  storage: storeThumbnail,
});
export const uploadProfile: multer.Multer = multer({
  storage: storeProfileImage,
});
