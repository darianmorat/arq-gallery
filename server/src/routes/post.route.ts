import express from "express";
import { metadata, signature, getAll } from "../controllers/post.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-all", getAll);
router.get("/generate-signature", privateRoute, signature);
router.post("/save-metadata", privateRoute, metadata);

export default router;
