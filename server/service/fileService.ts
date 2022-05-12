import fs from "fs";
import multiparty from "multiparty";
import { IncomingMessage } from "h3";
import { utilsService } from "./utilsService";
import { imageService } from "./imageService";
import { config } from "../configuration/config";
export const fileService = {
  writeFile(path: string, text: string | NodeJS.ArrayBufferView) {
    return new Promise((res, rej) => {
      fs.writeFile(path, text, (err) => {
        if (err) return rej(err);
        res(null);
      });
    });
  },
  directoryExist(dir: string): Promise<Boolean> {
    return new Promise((res) => {
      fs.access(dir, (err) => {
        if (err) {
          res(false);
        } else {
          res(true);
        }
      });
    });
  },
  createDirectory(path: string): Promise<Boolean> {
    return new Promise((res, rej) => {
      fs.mkdir(path, { recursive: true }, function (err) {
        if (err) rej(err);
        res(true);
      });
    });
  },
  fileExist(path: string) {
    return new Promise((res) => {
      fs.exists(path, res);
    });
  },
  appendFile(path: string, text: string) {
    return new Promise((res, rej) => {
      fs.appendFile(path, text, (err) => {
        if (err) return rej(err);
        res(null);
      });
    });
  },
  async writeErrorLog(path: string, text: string, routeHandler: string) {
    let date = new Date();
    let exist = await this.fileExist(path);
    if (exist) {
      await this.appendFile(
        path,
        `\n ${text} | Time: ${date.toISOString()} | Appeard in:  ${routeHandler} \n`
      );
    } else {
      await this.writeFile(path, text);
    }
  },

  multiParser(req: IncomingMessage): Promise<{
    fields: {
      [key: string]: any;
    };
    files: {
      thumbnail: FileI[] | undefined;
      images: FileI[] | undefined;
    };
  }> {
    return new Promise((res, rej) => {
      let form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) rej(err);
        let responseFields = Object.entries(fields).reduce(
          (prev, [key, value]: [string, unknown]) => {
            //@ts-ignore
            let v = value[0];
            try {
              let res = JSON.parse(v as string);

              prev[key] = res;
              return prev;
            } catch (err) {
              //@ts-ignore
              prev[key] = value[0];
              return prev;
            }
          },
          {} as { [key: string]: any }
        );

        res({ fields: responseFields, files });
      });
    });
  },
  relocateFile(oldpath: string, newpath: string): Promise<boolean> {
    return new Promise((res, rej) => {
      fs.rename(oldpath, newpath, (err) => {
        if (err) rej(err);
        res(true);
      });
    });
  },
  async saveImages(directory: string, images: Buffer[], extension: string) {
    if (!(await this.directoryExist(directory))) {
      await this.createDirectory(directory);
    }
    let id = utilsService.makeid(10);
    return Promise.all(
      images.map(async (img) => {
        let path = directory + "/" + id + `.${extension}`;
        await fileService.writeFile(path, img);
        return path;
      })
    );
  },
  async formatToPngs(
    images: FileI[],
    resizeOptions = {
      height: config.image_height,
      width: config.image_width,
    }
  ) {
    return Promise.all(
      images.map((img) => imageService.formatToPng(img.path, resizeOptions))
    );
  },
  async formatToWebps(
    images: FileI[],
    resizeOptions = {
      height: config.image_height,
      width: config.image_width,
    }
  ) {
    return Promise.all(
      images.map((img) => imageService.formatToWebp(img.path, resizeOptions))
    );
  },
};

interface FileI {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
  headers: { "content-disposition": string; "content-type": string };
}
