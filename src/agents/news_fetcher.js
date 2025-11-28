import Redis from "ioredis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { fetchNearbyNews } from "../utils/geonews.js";
import { addToStream } from "../utils/addToStream.js";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new Redis(redisUrl);
const pub = redis.duplicate();

const AGENT_ID = `news_fetcher`;
console.log(`[${AGENT_ID}] started. Claiming tasks from tasks:stream...`);

const STREAM = "tasks:stream";
const GROUP = "task_consumers";
async function ensureGroup() {
    try {
        await redis.xgroup("CREATE", STREAM, GROUP, "$", "MKSTREAM");
    } catch (e) {}
}
await ensureGroup();

async function claimAndProcess() {
    const res = await redis.xreadgroup(
        "GROUP",
        GROUP,
        AGENT_ID,
        "COUNT",
        1,
        "BLOCK",
        2000,
        "STREAMS",
        STREAM,
        ">"
    );
    if (!res) return;
    const [stream, messages] = res[0];
    for (const [id, fields] of messages) {
        const obj = JSON.parse(fields[1]);
        console.log(`[${AGENT_ID}] claimed task ${id}`, obj);
        try {
            const STREAM = await redis.get("current-stream");
            await addToStream(STREAM, {
                id: AGENT_ID,
                task: "fetch-news",
                batch: STREAM,
                agent: "News Fetcher",
                status: "running",
                taskStatus: "running",
                message: "Fetching news",
            });
            const incidents = await fetchNearbyNews();
            const summaryRequest = {
                id: uuidv4(),
                from: AGENT_ID,
                taskId: id,
                incidents,
            };
            await pub.publish(
                "broadcast",
                JSON.stringify({
                    type: "summary_request",
                    payload: summaryRequest,
                })
            );
            await addToStream(STREAM, {
                id: AGENT_ID,
                task: "fetch-news",
                batch: STREAM,
                agent: "News Fetcher",
                status: "complete",
                taskStatus: "complete",
                message: "News fetched",
            });
            await redis.xack(STREAM, GROUP, id);
        } catch (e) {
            console.error("processing error", e);
        }
    }
}

setInterval(claimAndProcess, 1000);

const sub = redis.duplicate();
await sub.subscribe("broadcast");
sub.on("message", (ch, message) => {});
