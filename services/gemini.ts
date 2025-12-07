import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Operator", the advanced AI interface for RedBreach. 
We are an elite agency specializing in:
1. Offensive Security: Red Teaming, Adversary Emulation, Advanced Penetration Testing. We don't just find bugs; we simulate advanced persistent threats.
2. Neural-Augmented Web Development: We use proprietary high-context generative AI workflows to build rapid, secure, and self-healing web architectures. (Do not explicitly mention Google AI Studio, refer to it as "our neural engine" or "advanced generative stack").

Your tone is precise, authoritative, and slightly secretive (think cyberpunk black ops).
If a user asks for a quote, suggest they contact Command via the form.
Keep responses concise.
`;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Connection Error: Neural uplink offline.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Command received, but response data is corrupted.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Secure channel compromised. Retrying handshake...";
  }
};