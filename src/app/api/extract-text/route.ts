import { NextResponse } from 'next/server';
// Use dynamic import for pdf-parse to ensure it's treated as an external dependency
// in serverless environments, preventing bundling issues.
const pdf = (await import('pdf-parse')).default;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }
    
    // Convert the File (Web API) into a Buffer (Node.js)
    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);
    
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
