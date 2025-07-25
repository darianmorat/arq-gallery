import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clearCookie } from "../utils/setCookie";

interface AuthRequest extends Request {
   user?: any;
}

export const privateRoute = (req: AuthRequest, res: Response, next: NextFunction) => {
   try {
      const authCookie = req.cookies["auth"]; // what about flag

      if (!authCookie) {
         res.status(401).json({
            success: false,
            message: "Acceso no autorizado",
         });
         return;
      }

      const decoded = jwt.verify(authCookie, process.env.JWT_SECRET!);
      req.user = decoded;

      next();
   } catch (error) {
      clearCookie(res);

      res.status(401).json({
         success: false,
         message: "Acceso no autorizado",
      });
   }
};
