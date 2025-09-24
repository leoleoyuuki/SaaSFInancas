import { NextResponse } from 'next/server';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';

// This is required for the library to work in a Node.js environment.
// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `../../../../node_modules/pdfjs-dist/legacy/build/pdf.worker.js`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pdfBase64 } = body;

    if (!pdfBase64) {
      return NextResponse.json({ error: 'Missing pdfBase64 data' }, { status: 400 });
    }

    // pdfjs-dist expects a Uint8Array, which is what Buffer is.
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    const loadingTask = pdfjs.getDocument({ data: pdfBuffer });
    const pdfDoc = await loadingTask.promise;

    let text = '';
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      // content.items is an array of objects with a `str` property
      text += content.items.map((s: any) => s.str).join(' ') + '\n';
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred during PDF parsing.' }, { status: 500 });
  }
}
