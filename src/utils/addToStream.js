import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new Redis(redisUrl);

export async function addToStream(STREAM, message) {
    if (!STREAM) return;
    await redis.xadd(STREAM, "*", "value", JSON.stringify(message));
}
