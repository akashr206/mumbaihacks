import express from "express";
import {
    getAllStaff,
    createStaff,
    bulkCreateStaff,
    updateStaff,
    deleteStaff,
    getOneStaff,
} from "../controllers/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaff);
router.post("/bulk", bulkCreateStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.get("/:id", getOneStaff);
export default router;
