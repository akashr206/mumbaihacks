import { triggerBatch } from "./batchRunner.js";

let nextRunTime = null;
let isRunning = false;
let timer = null;
const INTERVAL_MS = 100 * 60 * 1000;

export function startScheduler(io, r) {
    scheduleNextRun(io, r);
}

export function getSchedulerStatus() {
    return { nextRunTime, isRunning };
}

function scheduleNextRun(io, r) {
    nextRunTime = Date.now() + INTERVAL_MS;
    isRunning = false;
    broadcastStatus(io);

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => runCycle(io, r), INTERVAL_MS);
}

async function runCycle(io, r) {
    isRunning = true;
    nextRunTime = null;
    broadcastStatus(io);

    try {
        const { completionPromise } = await triggerBatch(io, r);
        await completionPromise;
    } catch (e) {
        console.error("Scheduler cycle error:", e);
    } finally {
        scheduleNextRun(io, r);
    }
}

function broadcastStatus(io) {
    io.emit("scheduler:status", { nextRunTime, isRunning });
}
 