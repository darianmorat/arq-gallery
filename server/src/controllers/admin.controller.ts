import { Request, Response } from "express";

export const getData = async (_req: Request, res: Response) => {
   try {
      res.status(200).json({
         success: true,
         message: "success here",
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
