import express from "express";
import {
    getAllStaff,
    createStaff,
    bulkCreateStaff,
    updateStaff,
    deleteStaff,
    getOneStaff,
    getStaffStats,
    getWardStaffDistribution,
} from "../controllers/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.get("/stats", getStaffStats);
router.get("/wards-distribution", getWardStaffDistribution);
router.post("/", createStaff);
router.post("/bulk", bulkCreateStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.get("/:id", getOneStaff);
export default router;
