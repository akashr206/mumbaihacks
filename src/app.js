import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";
import Redis from "ioredis";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import staffRoutes from "./routes/staffRoute.js";
import { db } from "./utils/db.js";
import { predictions } from "../schema.js";
import { desc, eq } from "drizzle-orm";
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

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

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

app.post("/run_batch", async (req, res) => {
    const batchId = nanoid(8);
    console.log("Running batch ID:", batchId);

    res.json({
        batchId,
        message: "Batch started",
    });

    const task = {
        id: nanoid(12),
        type: "monitor",
        createdAt: Date.now(),
    };

    await r.xadd("tasks:stream", "*", "value", JSON.stringify(task));

    async function tailResults() {
        const STREAM = "results:stream-" + batchId;

        await r.set("current-stream", STREAM);

        try {
            await r.xgroup("CREATE", STREAM, batchId, "$", "MKSTREAM");
        } catch (e) {
            if (!String(e).includes("BUSYGROUP")) {
                console.error("Group creation error:", e);
            }
        }

        while (true) {
            try {
                const reply = await r.xreadgroup(
                    "GROUP",
                    batchId,
                    "manager",
                    "COUNT",
                    5,
                    "BLOCK",
                    5000,
                    "STREAMS",
                    STREAM,
                    ">"
                );

                if (!reply) continue;

                for (const [, messages] of reply) {
                    for (const [id, fields] of messages) {
                        const obj = {};
                        for (let i = 0; i < fields.length; i += 2) {
                            obj[fields[i]] = fields[i + 1];
                        }

                        const payload = JSON.parse(obj.value);

                        await r.xack(STREAM, batchId, id);

                        io.emit("batch:update", {
                            batchId,
                            payload,
                        });

                        if (payload.id === "exit") {
                            io.emit("batch:completed", {
                                batchId,
                                message: "Batch processing completed",
                                finalPlan: payload.finalPlan,
                            });

                            await r.del(STREAM);
                            console.log("Batch processing completed", batchId);

                            return;
                        }
                    }
                }
            } catch (err) {
                console.error("xreadgroup error:", err);
            }
        }
    }

    tailResults();
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
