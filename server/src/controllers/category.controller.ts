import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

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
