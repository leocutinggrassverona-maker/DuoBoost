import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  const ai = getClient();
  if (!ai) return null;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to init chat", error);
    return null;
  }
};

export const sendMessageToCoach = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "Hoot! My connection to the nest is broken. (API Key missing or error)";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "...";
  } catch (error) {
    console.error("Chat error", error);
    return "Squawk! Something went wrong processing that request.";
  }
};
