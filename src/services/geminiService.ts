
import { GoogleGenAI, Type } from "@google/genai";
import { Game, GameCategory, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const generateGame = async (prompt: string): Promise<Game> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a creative English classroom game based on this request: ${prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: { 
            type: Type.STRING, 
            description: "Must be one of: Warm-up, Vocabulary, Grammar, Speaking, Writing, Listening, Ice Breaker" 
          },
          difficulty: { 
            type: Type.STRING, 
            description: "Must be one of: Beginner, Intermediate, Advanced, All Levels" 
          },
          duration: { type: Type.STRING },
          groupSize: { type: Type.STRING },
          materials: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          instructions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          teacherTips: { type: Type.STRING }
        },
        required: ["title", "description", "category", "difficulty", "duration", "groupSize", "materials", "instructions", "teacherTips"]
      }
    }
  });

  const rawJson = JSON.parse(response.text.trim());
  
  return {
    ...rawJson,
    id: Math.random().toString(36).substring(2, 9),
    isAiGenerated: true
  } as Game;
};
