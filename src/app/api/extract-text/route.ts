import { NextResponse } from 'next/server';
import pdf from "pdf-parse";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    // Converte o File da Web API em um Buffer do Node.js
    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);
    
    const data = await pdf(pdfBuffer);
    
    return NextResponse.json({ text: data.text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json(
      { error: error.message || 'Ocorreu um erro desconhecido durante a análise do PDF.' },
      { status: 500 }
    );
  }
}
