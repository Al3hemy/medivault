import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { mvid } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        summary: `**AI Patient Digest for ${mvid}**\n\nPatient is a 32-year-old with a history of hypertension. Last visit was 2 months ago for routine checkup. Current medications include Amlodipine 5mg. No known drug allergies.`
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // In a full implementation, you would fetch the patient's records from Prisma here
    // and feed them into the prompt.
    const prompt = `You are a medical AI. Summarize the following mocked medical history for patient ${mvid}:
    - 32 year old female.
    - History of hypertension.
    - Last visit 2 months ago for routine checkup.
    - Current medications: Amlodipine 5mg.
    
    Write a professional, concise 3-sentence clinical summary in Markdown.`;

    const result = await model.generateContent(prompt);
    
    return NextResponse.json({
      summary: result.response.text()
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
