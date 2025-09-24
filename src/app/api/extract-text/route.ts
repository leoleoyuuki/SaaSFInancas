import { NextResponse } from 'next/server';
import pdf from 'pdf-extraction';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pdfBase64 } = body;

    if (!pdfBase64) {
      return NextResponse.json({ error: 'Missing pdfBase64 data' }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);
    
    if (!data.text) {
        return NextResponse.json({ error: 'Could not extract text from PDF.' }, { status: 500 });
    }

    return NextResponse.json({ text: data.text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred during PDF parsing.' },
      { status: 500 }
    );
  }
}
