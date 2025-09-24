
import { NextResponse } from 'next/server';

// This function is defined in an API route, not an RSC. 
// It runs in a pure Node.js environment where pdf-parse works.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pdfBase64 } = body;

    if (!pdfBase64) {
      return NextResponse.json({ error: 'Missing pdfBase64 data' }, { status: 400 });
    }

    // Dynamically require pdf-parse to avoid Next.js build-time issues.
    const pdf = require('pdf-parse');
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);

    return NextResponse.json({ text: data.text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred during PDF parsing.' }, { status: 500 });
  }
}
