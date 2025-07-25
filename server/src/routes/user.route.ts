import express from "express";
import { createUser, getUsers, deleteUser } from "../controllers/user.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-all", privateRoute, getUsers);
router.post("/create", privateRoute, createUser);
router.delete("/delete/:id", privateRoute, deleteUser);

export default router;
