import express from "express";
import {
   createUser,
   getUsers,
   deleteUser,
   getUser,
} from "../controllers/user.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-all", privateRoute, getUsers);
router.get("/get/:username", getUser);
router.post("/create", privateRoute, createUser);
router.delete("/delete/:id", privateRoute, deleteUser);

export default router;
