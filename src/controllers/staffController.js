import { db } from "../utils/db.js";
import { doctors, wards, hospital } from "../../schema.js";
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
        const allDoctors = await db.select().from(doctors);
        const hospitalData = await db.select().from(hospital);

        const totalDoctors = allDoctors.length;
        const totalNurses = hospitalData[0]?.totalNurses || 0;
        const totalStaff = totalDoctors + totalNurses;

        // Group doctors by role
        const roles = {};
        allDoctors.forEach((d) => {
            roles[d.role] = (roles[d.role] || 0) + 1;
        });

        res.json({
            total: totalStaff,
            doctors: totalDoctors,
            nurses: totalNurses,
            roles: roles,
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
            const doctorsInWard = doctorsData.filter(
                (d) => d.wardId === ward.id
            );
            const doctorRoles = {};
            doctorsInWard.forEach((d) => {
                doctorRoles[d.role] = (doctorRoles[d.role] || 0) + 1;
            });

            return {
                ...ward,
                doctorsCount: doctorsInWard.length,
                nursesCount: ward.nurses, // from wards table
                doctorRoles: doctorRoles,
            };
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
