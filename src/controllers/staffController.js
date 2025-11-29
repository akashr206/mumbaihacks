import { db } from "../utils/db.js";
import { doctors, wards } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllStaff = async (req, res) => {
    try {
        const allStaff = await db.select().from(doctors);
        res.json(allStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const oneStaff = await db
            .select()
            .from(doctors)
            .where(eq(doctors.id, id));
        res.json(oneStaff[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createStaff = async (req, res) => {
    try {
        console.log(req.body);

        const newStaff = await db.insert(doctors).values(req.body).returning();
        res.status(201).json(newStaff[0]);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};

export const bulkCreateStaff = async (req, res) => {
    try {
        const newStaff = await db.insert(doctors).values(req.body).returning();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStaff = await db
            .update(doctors)
            .set(req.body)
            .where(eq(doctors.id, id))
            .returning();
        res.json(updatedStaff[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(doctors).where(eq(doctors.id, id));
        res.json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getStaffStats = async (req, res) => {
    try {
        const allStaff = await db.select().from(doctors);
        const total = allStaff.length;
        const onDuty = allStaff.filter((s) => s.status === "on-duty").length;
        const offDuty = allStaff.filter((s) => s.status === "off-duty").length;
        const onBreak = allStaff.filter((s) => s.status === "break").length;

        res.json({
            total,
            onDuty,
            offDuty,
            onBreak,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWardStaffDistribution = async (req, res) => {
    try {
        const wardsData = await db.select().from(wards);
        const doctorsData = await db.select().from(doctors);

        const result = wardsData.map((ward) => {
            const staffInWard = doctorsData.filter((d) => d.wardId === ward.id);
            const roles = {};
            staffInWard.forEach((s) => {
                roles[s.role] = (roles[s.role] || 0) + 1;
            });
            return {
                ...ward,
                staffRoles: roles,
                totalStaff: staffInWard.length,
            };
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
