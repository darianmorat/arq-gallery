import express from "express";
import { createUser, getUsers, deleteUser } from "../controllers/admin.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/user/get-all", privateRoute, getUsers);
router.post("/user/create", privateRoute, createUser);
router.delete("/user/delete/:id", privateRoute, deleteUser);

export default router;
