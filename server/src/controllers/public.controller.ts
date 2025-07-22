import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { postService } from "../services/post.service";

export const getUserProfile = async (req: Request, res: Response) => {
   try {
      const { username } = req.params;
      const user = await userService.getUser(username);

      if (!user) {
         res.status(404).json({
            success: false,
         });
         return;
      }

      res.status(200).json({
         success: true,
         user,
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
