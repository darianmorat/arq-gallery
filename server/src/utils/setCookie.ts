import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const setCookie = (res: Response, token: string) => {
   res.cookie("SESSION-101", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 10 * 1000,
   });

   res.cookie("SESSION-102", "active", {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 10 * 1000,
   });

   return res;
};

export const clearCookie = (res: Response) => {
   res.clearCookie("SESSION-101", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
   });

   res.clearCookie("SESSION-102", {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
   });

   return res;
};
