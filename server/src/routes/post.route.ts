import express from "express";
import {
   metadata,
   signature,
   getAll,
   getAllUser,
   deletePost,
} from "../controllers/post.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-all", getAll);
router.get("/get-all-user/:username", getAllUser);
router.get("/generate-signature", privateRoute, signature);
router.post("/save-metadata", privateRoute, metadata);

router.delete("/delete/:id", privateRoute, deletePost);

export default router;
