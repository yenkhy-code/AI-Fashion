
import { GoogleGenAI, Modality } from "@google/genai";

// This is a hidden system prompt that the user does not see.
const FASHION_MOODBOARD_PROMPT = `A fashion mood board collage. Surround a portrait with cutouts of the individual items the model is wearing. Add handwritten notes and sketches in a playful, marker-style font, and include the brand name and source of each item in English. The overall aesthetic should be creative and cute.`;

const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const data = result.split(',')[1];
      const mimeType = result.split(';')[0].split(':')[1];
      resolve({ mimeType, data });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generateFashionMoodboard = async (imageFile: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY 환경 변수가 설정되지 않았습니다.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const { mimeType, data: base64ImageData } = await fileToBase64(imageFile);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: FASHION_MOODBOARD_PROMPT,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error("API에서 이미지를 반환하지 않았습니다.");
};
