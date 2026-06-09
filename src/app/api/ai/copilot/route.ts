import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { complaint } = await req.json();
    
    // In a real production app, this would send the complaint + patient history to Gemini
    // using @google/generative-ai to generate dynamic differential diagnoses.

    if (!complaint || complaint.length < 10) {
      return NextResponse.json({ suggestions: [] });
    }

    // Mock AI response for the MVP demo
    const suggestions = [
      "Consider testing for Malaria (endemic region match)",
      "Rule out Typhoid Fever based on duration",
      "Check blood pressure and hydration levels",
      "Flag: Patient has a history of penicillin allergy"
    ];

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
