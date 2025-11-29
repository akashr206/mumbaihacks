import { nanoid } from "nanoid";

export async function triggerBatch(io, r) {
    const batchId = nanoid(8);
    console.log("Running batch ID:", batchId);

    const task = {
        id: nanoid(12),
        type: "monitor",
        createdAt: Date.now(),
    };

    await r.xadd("tasks:stream", "*", "value", JSON.stringify(task));

    const completionPromise = tailResults(io, r, batchId);

    return { batchId, completionPromise };
}

async function tailResults(io, r, batchId) {
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
            // Break loop on critical error? Or retry?
            // For xreadgroup errors, usually we can retry.
        }
    }
}
