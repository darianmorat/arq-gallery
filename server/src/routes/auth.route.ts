import express from "express";
import { authenticate } from "../controllers/auth.controller";

const router = express.Router();

router.get("/login", authenticate);

export default router;
