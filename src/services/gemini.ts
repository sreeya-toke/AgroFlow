import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Note: process.env.GEMINI_API_KEY is provided by the platform
export const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

export const CHAT_MODEL = "gemini-3-flash-preview";

export async function chatWithAgroAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "You are AgroAI, a high-speed expert agricultural consultant. Provide precise, ultra-concise, and actionable advice. Support users in both English and Hindi based on their query. Use bullet points for speed-reading. Avoid fluff; get straight to the solution.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    throw error;
  }
}
