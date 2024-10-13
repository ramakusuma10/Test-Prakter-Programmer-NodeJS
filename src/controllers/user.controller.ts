import { NextFunction, Request } from "express";
import userService from "../services/user.service";
import { z } from "zod";
import { upload } from "../middlewares/upload.middleware";

class userController {
  async getProfile(req: Request, res: any) {
    try {
      const userId = res.locals.user.id;
      const profile = await userService.getProfile(userId);

      return res.status(200).json({
        status: 0,
        message: "Sukses",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  }

  async updateProfile(req: Request, res: any) {
    try {
      const userId = res.locals.user.id;
      const updateData = { ...req.body, userId };
      const updatedUser = await userService.updateProfile(updateData);

      return res.status(200).json({
        status: 0,
        message: "Update Profil berhasil",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 102,
          message: error.errors[0].message,
          data: null,
        });
      }

      return res.status(400).json({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  }

  async updateProfileImage(req: any, res: any, next: NextFunction) {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          status:102,
          message: error.message,
          data:null,
        });
      }
      try {
        const userId = res.locals.user.id;
        const imageUrl = req.file?.path;

        if (!imageUrl) {
          return res.status(400).json({
            status: 102,
            message: "Profile image tidak ditemukan",
            data: null,
          });
        }

        const userData = {
          id: userId,
          profile_image: imageUrl,
        };

        const updatedUser = await userService.updateProfileImage(userData);
        return res.status(200).json({
          status: 0,
          message: "Update Profile Image berhasil",
          data: updatedUser,
        });
      } catch (error: any) {
        next(error);
      }
    });
  }

  async getBalance(req: Request, res: any) {
    try {
      const userId = res.locals.user.id;  // Ambil userId dari token yang sudah diverifikasi
      const balance = await userService.getBalance(userId)

      return res.status(200).json({
        status: 0,
        message: 'Get Balance Berhasil',
        data: {
          balance
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: null
      });
    }
  }
}

export default new userController();
