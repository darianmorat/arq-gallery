import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clearCookie } from "../utils/setCookie";

interface AuthRequest extends Request {
   user?: any;
}

export const privateRoute = (req: AuthRequest, res: Response, next: NextFunction) => {
   try {
      const authCookie = req.cookies["SESSION-101"];

      if (!authCookie) {
         res.status(401).json({
            success: false,
            message: "Missing cookie", // Acceso no autorizado
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
         message: "Invalid or expired token", // Acceso no autorizado
      });
   }
};
