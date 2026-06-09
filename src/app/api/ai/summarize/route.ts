import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { mvid } = await req.json();

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      // Mock AI Response for Demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({ 
        summary: `**AI Clinical Digest for ${mvid}**\n\n- **Chronic Conditions**: None reported.\n- **Recent Visit (May 2026)**: Acute lower back pain (radicular symptoms). Suspected sciatica.\n- **History**: Treated for Malaria in March 2026.\n- **Flagged Risks**: Monitor back pain progression; advise MRI if unresolved in 2 weeks.`
      });
    }

    const ai = new GoogleGenAI({});
    // For a real app, we would fetch patient's history from Prisma here
    const prompt = `Summarize the following clinical history for a doctor. Keep it concise, highlighting chronic conditions, recent visits, and risks:\n\nPatient MVID: ${mvid}\n- May 2026: Acute lower back pain, radiating to left leg.\n- March 2026: Positive for Malaria.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ summary: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
