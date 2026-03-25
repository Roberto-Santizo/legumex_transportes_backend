import { GoogleGenAI } from "@google/genai";
import { AIProvider } from "../../domain/providers/AIProvider";

export class GeminiProviderImpl implements AIProvider {
    private ai: GoogleGenAI;

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    }

    async getCurrentFuelPrices(): Promise<void> {
        const response = await this.ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: '¿Cuáles son los precios de la gasolina hoy en Guatemala?',
            config: {
                tools: [
                    {
                        googleSearchRetrieval: {
                            dynamicRetrievalConfig: {
                                dynamicThreshold: 0.06,
                            },
                        },
                    },
                ],
            }

        });

        console.log(response.text);
    }
}