import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../configs/config";
import { Request } from "express";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".png") {
      throw new Error("Format Image tidak sesuai");
    }

    return {
      folder: "api-programmer",
      format: ext === ".jpg" ? "jpg" : "png",
      public_id: `apiprogrammer-${Date.now()}`,
    };
  },
});
const upload = multer({
  storage: storage,
}).single('profile_image')

export { upload };
