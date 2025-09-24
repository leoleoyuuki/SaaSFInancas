import { NextResponse } from 'next/server';
import PDFParser from "pdf2json";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);
    
    const pdfParser = new PDFParser(this, 1);

    const text = await new Promise<string>((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", (errData: any) => {
            console.error('Error parsing PDF:', errData.parserError);
            reject(new Error('Erro ao processar o PDF.'));
        });

        pdfParser.on("pdfParser_dataReady", () => {
            const rawText = pdfParser.getRawTextContent();
            resolve(rawText);
        });

        pdfParser.parseBuffer(pdfBuffer);
    });
    
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Error in /api/extract-text:', error);
    return NextResponse.json(
      { error: error.message || 'Ocorreu um erro desconhecido durante a análise do PDF.' },
      { status: 500 }
    );
  }
}
