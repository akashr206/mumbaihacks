// Summarizer agent subscribes to broadcast, when it sees summary_request it runs the LangGraph node
// (we implemented as simple call function in src/langgraph/news_graph.js) and publishes 'analysis_request'.
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
import { summarizeIncidentsNode } from "../langgraph/news_graph.js";
import { db } from "../utils/db.js";
import { hospital, wards } from "../../schema.js";
import { addToStream } from "../utils/addToStream.js";
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
// console.log(redisUrl);

const sub = new Redis(redisUrl);
const pub = new Redis(redisUrl);
const r = sub.duplicate();

const AGENT_ID = `summarizer`;

console.log(`[${AGENT_ID}] subscribing to broadcast...`);
await sub.subscribe("broadcast");

sub.on("message", async (channel, message) => {
    try {
        const msg = JSON.parse(message);
        if (msg.type !== "summary_request") return;
        const req = msg.payload;
        console.log(
            `[${AGENT_ID}] summarizing task ${req.taskId} from ${req.from}`
        );
        const STREAM = await r.get("current-stream");
        console.log("stream : ", STREAM);

        let hospitalData = await db.select().from(hospital);
        await addToStream(STREAM, {
            batch: STREAM,
            task: "summarize-incidents",
            agent: "Summarizer",
            id: AGENT_ID,
            status: "running",
            taskStatus: "running",
            message: "Summarizing the data",
        });
        const state = { incidents: req.incidents, hospital: hospitalData };
        const out = await summarizeIncidentsNode(state);
        await addToStream(STREAM, {
            batch: STREAM,
            task: "summarize-incidents",
            agent: "Summarizer",
            id: AGENT_ID,
            status: "complete",
            taskStatus: "complete",
            message: "Summarized all the data.",
        });
        const analysisReq = {
            id: req.id,
            from: AGENT_ID,
            taskId: req.taskId,
            hospital: req.hospital,
            critical_incidents: out.critical_incidents,
            raw_summary: out.raw_summary,
        };
        await pub.publish(
            "broadcast",
            JSON.stringify({ type: "analysis_request", payload: analysisReq })
        );
    } catch (e) {
        console.error(e);
    }
});
