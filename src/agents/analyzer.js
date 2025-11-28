import Redis from "ioredis";
import dotenv from "dotenv";
import { db } from "../utils/db.js";
import { sql } from "drizzle-orm";
import { hospital, wards, inventory, doctors } from "../../schema.js";

dotenv.config();
import { predictLoadNode } from "../langgraph/analyze_graph.js";
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

import { addToStream } from "../utils/addToStream.js";
const sub = new Redis(redisUrl);
const pub = new Redis(redisUrl);
const r = sub.duplicate();
const AGENT_ID = `analyzer`;

console.log(`[${AGENT_ID}] subscribing to broadcast...`);
await sub.subscribe("broadcast");

sub.on("message", async (channel, message) => {
    try {
        const msg = JSON.parse(message);
        if (msg.type !== "analysis_request") return;
        const req = msg.payload;
        console.log(
            `[${AGENT_ID}] analyzing task ${req.taskId} from ${req.from}`
        );
        const STREAM = await r.get("current-stream");
        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            task: "fetchHospitalData",
            agent: "Analyzer",
            status: "fetching",
            taskStatus: "fetching",
            message: "Fetching hospital details",
        });
        let hospitalData = await db.select().from(hospital);
        let wardsData = await db.select().from(wards);
        const wardsWithDoctorTypeCounts = await db
            .select({
                wardId: wards.id,
                wardName: wards.name,
                role: doctors.role,
                count: sql`COUNT(${doctors.role})`,
            })
            .from(wards)
            .leftJoin(doctors, sql`${doctors.wardId} = ${wards.id}`)
            .groupBy(wards.id, doctors.role);
        console.log("wardsWithDoctorTypeCounts : ", wardsWithDoctorTypeCounts);

        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            task: "fetchHospitalData",
            agent: "Analyzer",
            status: "running",
            taskStatus: "complete",
            message: "Hospital details fetched",
        });
        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            task: "fetchInventoryData",
            agent: "Analyzer",
            status: "running",
            taskStatus: "running",
            message: "Fetching Inventory details",
        });
        let inventoryData = await db.select().from(inventory);
        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            task: "fetchInventoryData",
            agent: "Analyzer",
            status: "complete",
            taskStatus: "complete",
            message: "Inventory details fetched",
        });
        await addToStream(STREAM, {
            batch: STREAM,
            id: "predictor",
            task: "predict",
            agent: "Predictor",
            status: "running",
            taskStatus: "running",
            message: "Predicting the surges",
        });

        const state = {
            critical_incidents: req.critical_incidents,
            hospital: hospitalData,
            wards: wardsData,
            inventory: inventoryData,
            doctorDetails: wardsWithDoctorTypeCounts,
        };
        const out = await predictLoadNode(state);
        const finalPlan = {
            taskId: req.taskId,
            agent: AGENT_ID,
            predicted: out.analysis,
            raw: out.raw,
            timestamp: Date.now(),
        };

        await pub.publish(
            "broadcast",
            JSON.stringify({ type: "final_plan", payload: finalPlan })
        );

        await addToStream(STREAM, {
            batch: STREAM,
            id: "predictor",
            task: "predict",
            agent: "Predictor",
            status: "complete",
            taskStatus: "complete",
            message: "Completed the final plan",
        });
        await addToStream(STREAM, {
            batch: STREAM,
            id: "exit",
            status: "complete",
            finalPlan,
        });
    } catch (e) {
        console.error(e);
    }
});
