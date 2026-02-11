
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recommendation: {
      type: Type.STRING,
      description: "A personalized design recommendation for the user's bathroom."
    },
    suggestedProductIds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of product IDs from the provided catalog that match the recommendation."
    }
  },
  required: ["recommendation", "suggestedProductIds"]
};

export const getDesignAdvice = async (userInput: string) => {
  const catalogContext = MOCK_PRODUCTS.map(p => `${p.id}: ${p.name} - ${p.description}`).join('\n');
  
  const prompt = `You are a world-class luxury interior designer for "Arch & Grain".
  A customer is asking for advice: "${userInput}".
  
  Based on our luxury vanity catalog:
  ${catalogContext}
  
  Provide a warm, sophisticated, and helpful response. Suggest exactly 1-2 product IDs that fit their needs.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You represent Arch & Grain, a high-end, boutique vanity manufacturer. Your tone is refined, empathetic, and knowledgeable. Focus on materials and atmosphere."
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendation: "Our designers are currently curating new collections. For immediate assistance, we recommend the Heirloom Oak for its timeless warmth.",
      suggestedProductIds: ["1"]
    };
  }
};
