import express from "express";
import { chatWithContext } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithContext);

export default router;
