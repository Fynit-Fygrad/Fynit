import { NextRequest, NextResponse } from 'next/server';
import { extractText } from 'unpdf';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { text } = await extractText(buffer, { mergePages: true });

    if (!text) {
      return NextResponse.json({ error: 'No text extracted' }, { status: 500 });
    }

    // Clean up whitespace
    const cleanText = text.replace(/\n\s*\n/g, '\n').trim();

    return NextResponse.json({ text: cleanText });
    
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse PDF' }, { status: 500 });
  }
}
