import express from "express";
import {
    getAllInventory,
    createInventory,
    bulkCreateInventory,
    updateInventory,
    deleteInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventory);
router.post("/", createInventory);
router.post("/bulk", bulkCreateInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;
