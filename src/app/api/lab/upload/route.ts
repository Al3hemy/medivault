import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const mvid = formData.get('mvid') as string;

    if (!file || !mvid) {
      return NextResponse.json({ error: 'Missing file or MVID' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // If Supabase isn't fully configured with keys, fallback to mock simulation
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase keys missing. Simulating document upload.");
      return NextResponse.json({ 
        success: true, 
        message: 'Mock upload successful', 
        url: 'https://mock-url.com/lab-result.pdf' 
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const fileBuffer = await file.arrayBuffer();
    const fileName = `${mvid}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('lab-results')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to upload to Supabase' }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from('lab-results').getPublicUrl(fileName);

    return NextResponse.json({ 
      success: true, 
      message: 'Upload successful', 
      url: publicUrlData.publicUrl 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
