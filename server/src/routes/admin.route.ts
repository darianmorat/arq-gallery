import express from "express";
import { getData } from "../controllers/admin.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/dashboard", privateRoute, getData);

export default router;
