import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { postService } from "../services/post.service";
import { categoryService } from "../services/category.service";

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
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
   });
};

export const metadata = async (req: AuthRequest, res: Response): Promise<void> => {
   try {
      const { public_id, secure_url, resource_type, category_tag, title, description } =
         req.body;
      const { userId } = req.user;

      const result = await categoryService.getByTag(category_tag);
      const categoryId = result.id;

      if (
         !public_id ||
         !secure_url ||
         !resource_type ||
         !userId ||
         !categoryId ||
         !title ||
         !description
      ) {
         res.status(400).json({ error: "Missing required fields" });
         return;
      }

      await postService.create(
         public_id,
         secure_url,
         resource_type,
         userId,
         categoryId,
         title,
         description,
      );

      res.status(200).json({
         success: true,
         message: `Post creado exitosamente`,
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

export const getPostProfile = async (req: Request, res: Response) => {
   try {
      const { publicid } = req.params;
      const post = await postService.getByPublicId(publicid);

      if (!post) {
         res.status(404).json({
            success: false,
         });
         return;
      }

      res.status(200).json({
         success: true,
         post,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const getAllUser = async (req: Request, res: Response) => {
   try {
      const { username } = req.params;
      const result = await postService.getAllUserPosts(username);

      res.status(200).json({
         success: true,
         posts: result?.posts,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deletePost = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const { publicId } = req.body;

      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResult.result !== "ok") {
         res.status(400).json({
            success: false,
            message: "Ha ocurrido un error, inténtalo nuevamente",
         });

         return;
      }

      const deletedPost = await postService.delete(id);

      res.status(200).json({
         success: true,
         message: `"${deletedPost.title}" eliminado`,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
