import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the API_KEY directly in the client-side script
const API_KEY = "AIzaSyCNAvBoC1acgMpRi9TmAGDiSvcUT92Gwek";

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateContent() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

generateContent();


