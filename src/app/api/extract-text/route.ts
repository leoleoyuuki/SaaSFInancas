import { NextResponse } from 'next/server';
// Use dynamic import for pdf-parse to ensure it's treated as an external dependency
// in serverless environments, preventing bundling issues.
const pdf = (await import('pdf-parse')).default;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pdfBase64 } = body;

    if (!pdfBase64) {
      return NextResponse.json({ error: 'Missing pdfBase64 data' }, { status: 400 });
    }

    // Correctly convert the Base64 string to a binary Buffer.
    // This is the critical fix.
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);
    
    return NextResponse.json({ text: data.text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred during PDF parsing.' },
      { status: 500 }
    );
  }
}
