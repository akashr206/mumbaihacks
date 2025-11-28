import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";
import Redis from "ioredis";
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


io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
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
        r.set("current-stream", STREAM);

        try {
            await r.xgroup("CREATE", STREAM, batchId, "$", "MKSTREAM");
        } catch (e) {}

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
                        const payload = JSON.parse(fields[1]);
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
                console.error(err);
            }
        }
    }

    tailResults();
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
