// check-models.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// OPTION A: If you have dotenv installed, uncomment the next line:
// import "dotenv/config";

// OPTION B: Or just paste your key here temporarily for this test script
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyA30SI_WdjcoGUYZtl_TG54SnZfwpIEzp8";

async function listModels() {
  if (!API_KEY || API_KEY.startsWith("PASTE")) {
    console.error("❌ Error: Please paste your API key in the script first.");
    return;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  
  try {
    // Note: Use .getGenerativeModelFactory() isn't needed in newer SDKs, 
    // but looking at 'listModels' usually requires the ModelManager or similar. 
    // Actually, the simplest way in the current SDK is usually just trying a model,
    // but there isn't a direct "listModels" on the main instance in v1.
    // However, the error message suggested calling "ListModels".
    // We can hit the REST API directly to be 100% sure what Google sees.
    
    console.log("Fetching available models via REST API...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ AVAILABLE MODELS:");
      console.log("-------------------");
      data.models.forEach(m => {
        // We only care about models that can 'generateContent'
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
            console.log(`Name: ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("Error:", data);
    }

  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();