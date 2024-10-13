import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from '../dto/login.dto';
import { z } from 'zod';

class authControllers {
  async registerUser(req: Request, res: any) {
    try {
      const data:RegisterDTO = req.body
      const profile_image = "https://api.dicebear.com/8.x/icons/svg?seed=Sassy";
      await authService.register({...data, profile_image});

      return res.status(200).json({
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: null
      });

    } catch (error: any) {
  
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 102,
          message: error.errors[0].message,
          data: null
        });
      }

      if (error.message === 'Email Sudah Terdaftar') {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null
        });
      }

      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null
      });
    }
  }

  async loginUser(req: Request, res: any) {
    try {
      const data:LoginDTO = req.body
      const result = await authService.loginUser(data);

      return res.status(200).json({
        status: 0,
        message: "Login Sukses",
        data: {
          token: result.token,
        }
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 102,
          message: error.errors[0].message, // Mengambil pesan error dari validasi Zod
          data: null
        });
      }

      if (error.message === 'Invalid credentials') {
        return res.status(401).json({
          status: 103,
          message: "Username atau password salah",
          data: null
        });
      }

      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null
      });
    }
  }
}

export default new authControllers()