import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { complaint } = await req.json();

    if (!complaint || complaint.length < 10) {
      return NextResponse.json({ suggestions: [] });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY missing. Simulating AI response.");
      return NextResponse.json({ suggestions: [
        "Consider testing for Malaria (endemic region match)",
        "Rule out Typhoid Fever based on duration",
        "Check blood pressure and hydration levels",
        "Flag: Patient has a history of penicillin allergy"
      ]});
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical AI assistant helping a clinician in real-time. 
    The clinician is typing the following presenting complaint for a patient in Nigeria: 
    "${complaint}"
    
    Provide 3 to 4 concise, actionable differential diagnoses or clinical considerations (1 sentence each). 
    Format them as a simple JSON array of strings. Do not use markdown, just the raw JSON array. Example: ["Consider X", "Rule out Y"]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let suggestions = [];
    try {
      const parsed = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
      if (Array.isArray(parsed)) suggestions = parsed;
    } catch (e) {
      suggestions = ["Unable to parse AI response. " + responseText.substring(0, 50)];
    }

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
