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
