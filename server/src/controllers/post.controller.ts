import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { db } from "../db";
import { posts } from "../db/schema";
import { postService } from "../services/post.service";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
   api_key: process.env.CLOUDINARY_API_KEY!,
   api_secret: process.env.CLOUDINARY_API_SECRET!,
   secure: true,
});

interface AuthRequest extends Request {
   user?: any;
}

export const signature = (_req: Request, res: Response) => {
   const timestamp = Math.round(Date.now() / 1000);
   const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!,
   );

   res.status(200).json({
      success: true,
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
   });
};

export const metadata = async (req: AuthRequest, res: Response): Promise<void> => {
   const { public_id, secure_url, resource_type } = req.body;
   const { userId } = req.user;

   if (!public_id || !secure_url || !resource_type || !userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
   }

   try {
      await db.insert(posts).values({
         publicId: public_id,
         mediaUrl: secure_url,
         resourceType: resource_type,
         userId,
      });

      res.status(200).json({
         success: true,
      });
   } catch (error) {
      res.status(500).json({ error: "DB insert failed" });
   }
};

export const getAll = async (_req: Request, res: Response) => {
   try {
      const posts = await postService.getAll();

      res.status(200).json({
         success: true,
         posts,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
