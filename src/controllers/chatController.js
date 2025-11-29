import { db } from "../utils/db.js";
import {
    hospital,
    wards,
    inventory,
    doctors,
    patients,
    predictions,
} from "../../schema.js";
import { streamGeminiResponse } from "../utils/gemini-client.js";
import { desc } from "drizzle-orm";

export const chatWithContext = async (req, res) => {
    try {
        const { message } = req.body;

        const hospitalData = await db.select().from(hospital);
        const wardsData = await db.select().from(wards);
        const inventoryData = await db.select().from(inventory);

        const doctorsData = await db.select().from(doctors);
        const predictionsData = await db
            .select()
            .from(predictions)
            .orderBy(desc(predictions.createdAt))
            .limit(1);

        const context = `
You are a helpful AI assistant for a hospital operations dashboard.
You have access to the following real-time data:

Hospital Info: ${JSON.stringify(hospitalData, null, 2)}
Wards: ${JSON.stringify(wardsData, null, 2)}
Inventory: ${JSON.stringify(inventoryData, null, 2)}
Doctors: ${JSON.stringify(doctorsData, null, 2)}
Latest Prediction: ${JSON.stringify(predictionsData, null, 2)}

User Query: ${message}

Answer the user's question based on the data provided. Be concise, professional, and helpful.
`;

        // Set headers for streaming
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        await streamGeminiResponse(context, res);
    } catch (error) {
        console.error("Chat error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to process chat request" });
        } else {
            res.end();
        }
    }
};
