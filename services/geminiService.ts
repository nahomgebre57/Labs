
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export async function generateCampaignStrategy(taskDescription: string, technicalStack: string) {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const prompt = `Act as a Senior Design Ops & AI Workflow Architect at Spark Labs. 
    A professional creative needs a technical blueprint to automate a specific task.
    Task: "${taskDescription}"
    Preferred Software Stack: "${technicalStack}"

    Generate a high-end "Workflow Blueprint" that includes:
    1. A "Strategic Approach" (Explain how to bridge human creativity with AI).
    2. A "Technical Stack Expansion" (Suggest specific AI models like Stable Diffusion XL, ControlNet, or EbSynth, and how they connect to their stack).
    3. A "Production Protocol" (Step-by-step technical implementation).
    
    Maintain a highly professional, visionary, and technical tone. Use Markdown formatting.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });

        return response.text || "I was unable to architect a workflow at this moment. Please try again.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
