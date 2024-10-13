import { Request, NextFunction } from 'express';

export const errorHandler = (error: any, req: Request, res: any, next: NextFunction) => {
  console.error(error.stack);

  if (error.message === 'Format Image tidak sesuai. Hanya JPEG dan PNG yang diperbolehkan.') {
    return res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: null,
  });
};