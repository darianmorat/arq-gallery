import express from "express";
import {
   getCategories,
   createCategory,
   deleteCategory,
} from "../controllers/category.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-all", privateRoute, getCategories);
router.post("/create", privateRoute, createCategory);
router.delete("/delete/:id", privateRoute, deleteCategory);

export default router;
