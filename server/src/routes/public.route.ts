import express from "express";
import { getUserProfile } from "../controllers/public.controller";

const router = express.Router();

router.get("/user/:username", getUserProfile);

export default router;
