// We'll keep it simple: prepare a prompt and call Gemini via our wrapper.
import { callGemini } from "../utils/gemini-client.js";

export async function summarizeIncidentsNode(state) {
    const { incidents, hospital } = state;
    const prompt = [
        `You are a concise incident summarizer. Given the following ${
            incidents.length
        } incident items for a hospital in ${
            hospital.name || "unknown location"
        }, summarize only the *critical* incidents (accidents, stampedes, pollution spikes, mass casualties, fire etc.) into a short bulleted list of:`,
        `- incident_type`,
        `- short_summary (1 line)`,
        `- urgency ("low"|"medium"|"high")`,
        `- estimated_additional_patients (integer approx)`,
        `Then output a JSON array named "critical_incidents".`,
        `\nInput incidents:\n${JSON.stringify(incidents, null, 2)}\n`,
    ];
    const text = await callGemini(prompt);
    try {
        const parsed = JSON.parse(text);
        return { critical_incidents: parsed, raw_summary: text };
    } catch (e) {
        return { critical_incidents: [], raw_summary: text };
    }
}
