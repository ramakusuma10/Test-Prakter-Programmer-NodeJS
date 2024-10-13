import { Request, 
  NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs/config";

export const authenticate = (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null
              });
            } else {
              return res.status(401).json({
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null
              });
            }
          }

      res.locals.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      status: 103,
      message: "Token tidak ditemukan",
      data: null,
    });
  }
};
