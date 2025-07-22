import express from "express";
import { getPostProfile, getUserProfile } from "../controllers/public.controller";

const router = express.Router();

router.get("/user/:username", getUserProfile);
router.get("/post/:publicid", getPostProfile);

export default router;
