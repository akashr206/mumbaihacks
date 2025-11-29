import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

export const aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || undefined,
});

// helper to call model and normalize result
export async function callGemini(prompt, options = {}) {
    const model = options.model || "gemini-2.5-flash";
    const contents = Array.isArray(prompt) ? prompt : [String(prompt)];
    const res = await aiClient.models.generateContent({
        model,
        contents,
    });

    // res structure: candidates[0].content.parts[...] — simplify to text join
    try {
        const cleaned = res.text.replace(/```json|```|\\n|\r?\n/g, "");
        return cleaned;
    } catch (e) {
        return typeof res === "string" ? res : JSON.stringify(res);
    }
}
export async function streamGeminiResponse(prompt, res, options = {}) {
    const model = options.model || "gemini-2.5-flash";
    const contents = Array.isArray(prompt) ? prompt : [String(prompt)];

    try {
        const result = await aiClient.models.generateContentStream({
            model,
            contents,
        });

        const stream = result.stream || result;

        for await (const chunk of stream) {
            const text =
                chunk?.candidates?.[0]?.content?.parts?.[0]?.text ||
                chunk?.text ||
                "";

            if (text) res.write(text);
        }

        res.end();
    } catch (e) {
        console.error("Streaming error:", e);
        res.write("Error generating response.");
        res.end();
    }
}
