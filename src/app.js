import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";
import Redis from "ioredis";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import staffRoutes from "./routes/staffRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import { db } from "./utils/db.js";
import { predictions, patients, hospital, wards } from "../schema.js";
import { desc, eq, sql } from "drizzle-orm";
import { triggerBatch } from "./utils/batchRunner.js";
import { startScheduler, getSchedulerStatus } from "./utils/scheduler.js";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const app = express();
const port = process.env.PORT || 8000; 
const r = new Redis(redisUrl);
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send immediate status update
    socket.emit("scheduler:status", getSchedulerStatus());

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

setInterval(() => {
    io.emit("scheduler:status", getSchedulerStatus());
}, 1000);

startScheduler(io, r);

app.get("/api/predictions", async (req, res) => {
    try {
        const result = await db
            .select()
            .from(predictions)
            .orderBy(desc(predictions.createdAt));
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch predictions" });
    }
});

app.get("/api/predictions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db
            .select()
            .from(predictions)
            .where(eq(predictions.id, id));

        if (result.length === 0) {
            return res.status(404).json({ error: "Prediction not found" });
        }

        res.json(result[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch prediction" });
    }
});

app.get("/api/dashboard/stats", async (req, res) => {
    try {
        const patientCountResult = await db.select().from(wards);
        let totalPatients = 0;

        patientCountResult.forEach((e) => {
            totalPatients += e.occupied;
        });

        const hospitalStats = await db.select().from(hospital).limit(1);
        let staffOnDuty = 0;
        if (hospitalStats.length > 0) {
            staffOnDuty =
                hospitalStats[0].totalDoctors + hospitalStats[0].totalNurses;
        }

        const criticalCountResult = await db
            .select({ count: sql`count(*)` })
            .from(patients)
            .where(eq(patients.stage, "Critical"));
        const criticalCases = criticalCountResult[0].count;

        res.json({
            totalPatients,
            staffOnDuty,
            criticalCases,
            avgWaitTime: "29m",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
});

app.get("/api/dashboard/wards", async (req, res) => {
    try {
        const allWards = await db.select().from(wards);
        res.json(allWards);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch wards" });
    }
});

app.post("/run_batch", async (req, res) => {
    try {
        const { batchId, completionPromise } = await triggerBatch(io, r);

        res.json({
            batchId,
            message: "Batch started",
        });

        // Fire and forget, but log errors
        completionPromise.catch((e) =>
            console.error("Batch execution error:", e)
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to start batch" });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
