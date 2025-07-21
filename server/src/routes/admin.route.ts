import express from "express";
import {
   createUser,
   getUsers,
   deleteUser,
   getCategories,
   createCategory,
   deleteCategory,
} from "../controllers/admin.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user/get-all", privateRoute, getUsers);
router.post("/user/create", privateRoute, createUser);
router.delete("/user/delete/:id", privateRoute, deleteUser);

router.get("/category/get-all", privateRoute, getCategories);
router.post("/category/create", privateRoute, createCategory);
router.delete("/category/delete/:id", privateRoute, deleteCategory);

export default router;
