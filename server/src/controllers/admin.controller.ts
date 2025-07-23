import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { categoryService } from "../services/category.service";

export const getUsers = async (_req: Request, res: Response) => {
   try {
      const result = await userService.getAll();

      res.status(200).json({
         success: true,
         users: result,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createUser = async (req: Request, res: Response) => {
   try {
      const { name, username, phone, email, password } = req.body;
      const emailUsed = await userService.findByEmail(email);
      const usernameUsed = await userService.findByUsername(username);

      if (usernameUsed) {
         res.status(401).json({
            success: false,
            message: "Este usuario ya está en uso",
         });
         return;
      }

      if (emailUsed) {
         res.status(401).json({
            success: false,
            message: "Este correo ya está en uso",
         });
         return;
      }

      const newUser = await userService.create(name, username, phone, email, password);

      res.status(200).json({
         success: true,
         message: `Usuario "${newUser.name}" creado`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const deletedUser = await userService.delete(id);

      res.status(200).json({
         success: true,
         message: `Usuario "${deletedUser.name}" eliminado`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const getCategories = async (_req: Request, res: Response) => {
   try {
      const categories = await categoryService.getAll();

      res.status(200).json({
         success: true,
         categories,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createCategory = async (req: Request, res: Response) => {
   try {
      const { title, tag, description } = req.body;
      const tagUsed = await categoryService.getByTag(tag);

      if (tagUsed) {
         res.status(401).json({
            success: false,
            message: "Este tag ya está en uso",
         });
         return;
      }

      const newCategory = await categoryService.create(title, tag, description);

      res.status(200).json({
         success: true,
         message: `Categoria "${newCategory.tag}" creada`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteCategory = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const deletedCategory = await categoryService.delete(id);

      res.status(200).json({
         success: true,
         message: `Categoria "${deletedCategory.tag}" eliminada`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
