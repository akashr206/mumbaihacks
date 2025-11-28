import { db } from "../utils/db.js";
import { inventory } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllInventory = async (req, res) => {
    try {
        let allInventory = await db.select().from(inventory);
        allInventory = allInventory.map((item) => {
            let temp = JSON.parse(JSON.stringify(item));
            temp.statuses = JSON.parse(
                temp.statuses.replace(/{/g, "[").replace(/}/g, "]")
            );
            return temp;
        });

        res.json(allInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInventory = async (req, res) => {
    try {
        const newInventory = await db
            .insert(inventory)
            .values(req.body)
            .returning();
        res.status(201).json(newInventory[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bulkCreateInventory = async (req, res) => {
    try {
        const newInventory = await db
            .insert(inventory)
            .values(req.body)
            .returning();
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInventory = await db
            .update(inventory)
            .set(req.body)
            .where(eq(inventory.id, id))
            .returning();
        res.json(updatedInventory[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(inventory).where(eq(inventory.id, id));
        res.json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
