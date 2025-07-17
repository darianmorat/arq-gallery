import express from "express";
import { authenticate, logout, verify } from "../controllers/auth.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", authenticate);
router.post("/logout", logout);
router.get("/verify", privateRoute, verify);

export default router;
