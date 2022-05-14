import sharp from "sharp";
import { config } from "../configuration/config";

export const imageService = {
  formatToWebp(
    img: Buffer | string,
    {
      width = config.image_width,
      height = config.image_height,
    }: {
      width: number | undefined;
      height: number | undefined;
    }
  ) {
    return sharp(img)
      .webp({ quality: 80 })
      .resize({
        width,
        height,
      })
      .toBuffer();
  },
  formatToPng(
    img: Buffer | string,
    {
      width = config.image_width,
      height = config.image_height,
    }: {
      width: number | undefined;
      height: number | undefined;
    }
  ) {
    return sharp(img)
      .png({ quality: 80 })
      .resize({
        width,
        height,
      })
      .toBuffer();
  },
};
