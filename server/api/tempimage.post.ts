import { verifyUser } from "../auth/verifyuser";
import { fileService } from "../service/fileService";
import { config } from "../configuration/config";
import { authorService } from "../service/authorService";
import { utilsService } from "../service/utilsService";

export default defineEventHandler(async (event) => {
  let decodedToken;
  try {
    decodedToken = await verifyUser(event);
  } catch (err) {
    throw {
      message: err,
    };
  }
  let data = await fileService.multiParser(event.req);

  if (data.files.images) {
    let [pngImages, webpImages] = await Promise.all([
      fileService.formatToPngs(data.files.images, {
        height: undefined,
        width: undefined,
      }),
      fileService.formatToWebps(data.files.images, {
        height: undefined,
        width: undefined,
      }),
    ]);
    let directoryTempPng = config.temp_images_path;
    let directoryTempWebp = config.temp_images_webp_path;

    let [webpPaths, pngPaths] = await Promise.all([
      fileService.saveImages(directoryTempWebp, webpImages, "webp"),
      fileService.saveImages(directoryTempPng, pngImages, "png"),
    ]);

    let name = utilsService.makeid(10) + Date.now().toString();
    try {
      console.log(pngPaths);
      let imageObj = await authorService.addImage(decodedToken._id, {
        name,
        src: pngPaths[0],
        webp_src: webpPaths[0],
      });

      return imageObj;
    } catch (err) {
      await fileService.writeErrorLog(
        "./error.log",
        JSON.stringify(err),
        "createpost"
      );
      throw {
        message: "Something wrong happend",
      };
    }
  } else {
    throw {
      message: "No images passed",
    };
  }
});
