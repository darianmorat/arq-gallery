import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { compare } from "bcrypt-ts";
import { jwtGenerator } from "../utils/jwtGenerator";
import { clearCookie, setCookie } from "../utils/setCookie";

// import { genSaltSync, hashSync } from "bcrypt-ts";
// TESTING
// const salt = genSaltSync(10);
// const result = hashSync("1082124119", salt);

export const authenticate = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;

      const user = await userService.findByEmail(email);

      if (!user) {
         res.status(401).json({
            success: false,
            message: "Credenciales invalidas",
         });
         return;
      }

      const hash = user.password;
      const isValid = await compare(password, hash);

      if (!isValid) {
         res.status(401).json({
            success: false,
            message: "Credenciales invalidas",
         });
         return;
      }

      const token = jwtGenerator(user.id);
      setCookie(res, token);

      res.status(200).json({
         success: true,
         message: "Autenticación exitosa",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const logout = (_req: Request, res: Response) => {
   try {
      clearCookie(res);

      res.status(200).json({
         success: true,
         message: "Logout successful",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

interface AuthRequest extends Request {
   user?: any;
}

export const verify = async (req: AuthRequest, res: Response) => {
   const { userId } = req.user;

   const getUserData = await userService.findById(userId);
   const userData = getUserData;

   if (!userId) {
      res.status(401).json({
         success: false,
         message: "Error in verification",
      });
      return;
   }

   res.status(200).json({
      success: true,
      message: "Verified",
      user: userData,
   });
};
