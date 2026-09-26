require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require("@google/genai");
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const models = await ai.models.list();
  for await (const m of models) {
    console.log(m.name);
  }
}
run();