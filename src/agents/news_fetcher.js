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

const TASK_STREAM = "tasks:stream";
const GROUP = "task_consumers";

async function ensureGroup() {
    try {
        await redis.xgroup("CREATE", TASK_STREAM, GROUP, "$", "MKSTREAM");
    } catch (e) {
        if (!String(e).includes("BUSYGROUP")) console.error(e);
    }
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
        TASK_STREAM,
        ">"
    );

    if (!res) return;

    const [, messages] = res[0];

    for (const [id, fields] of messages) {
        const data = {};
        for (let i = 0; i < fields.length; i += 2) {
            data[fields[i]] = fields[i + 1];
        }

        const obj = JSON.parse(data.value);
        console.log(`[${AGENT_ID}] claimed task ${id}`, obj);

        try {
            const RESULT_STREAM = await redis.get("current-stream");

            if (!RESULT_STREAM) {
                console.warn("⚠ No active results stream yet. Skipping...");
                continue;
            }

            await addToStream(RESULT_STREAM, {
                id: AGENT_ID,
                task: "fetch-news",
                batch: RESULT_STREAM,
                agent: "News Fetcher",
                status: "running",
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

            await addToStream(RESULT_STREAM, {
                id: AGENT_ID,
                task: "fetch-news",
                batch: RESULT_STREAM,
                agent: "News Fetcher",
                status: "complete",
                message: "News fetched",
            });

            await redis.xack(TASK_STREAM, GROUP, id);
        } catch (e) {
            console.error("processing error", e);
        }
    }
}

(async function loop() {
    while (true) {
        await claimAndProcess();
    }
})();

const sub = redis.duplicate();
await sub.subscribe("broadcast");
sub.on("message", () => {});
