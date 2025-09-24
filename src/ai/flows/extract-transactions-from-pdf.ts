'use server';

/**
 * @fileOverview A Genkit flow for extracting transactions from raw text.
 *
 * - extractTransactionsFromPdf - A function that takes raw text and extracts transaction data.
 * - ExtractTransactionsFromPdfInput - The input type for the extractTransactionsFromPdf function.
 * - ExtractTransactionsFromPdfOutput - The return type for the extractTransactionsFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  date: z.string().describe('A data da transação no formato YYYY-MM-DD.'),
  amount: z.number().describe('O valor da transação. Crucialmente, este valor deve ser negativo para despesas/débitos e positivo para receitas/créditos.'),
  description: z.string().describe('A descrição da transação.'),
  type: z.enum(['income', 'expense']).describe('O tipo da transação. "income" para créditos/depósitos, "expense" para débitos/saques.'),
});

const ExtractTransactionsFromPdfInputSchema = z.object({
  extractedText: z.string().describe("Texto bruto extraído de um extrato bancário em PDF."),
});
export type ExtractTransactionsFromPdfInput = z.infer<typeof ExtractTransactionsFromPdfInputSchema>;

const ExtractTransactionsFromPdfOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('Uma lista de transações extraídas.'),
});
export type ExtractTransactionsFromPdfOutput = z.infer<typeof ExtractTransactionsFromPdfOutputSchema>;


export async function extractTransactionsFromPdf(input: ExtractTransactionsFromPdfInput): Promise<ExtractTransactionsFromPdfOutput> {
    return extractTransactionsFlow(input);
}

const extractTransactionsFlow = ai.defineFlow(
  {
    name: 'extractTransactionsFromPdfFlow',
    inputSchema: ExtractTransactionsFromPdfInputSchema,
    outputSchema: ExtractTransactionsFromPdfOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: `Você é um especialista financeiro especializado em analisar texto bruto de extratos bancários.
        Você receberá um bloco de texto extraído de um PDF. Analise o texto para identificar corretamente a data, descrição, valor e tipo de cada transação.
        Retorne os dados no formato JSON especificado.

        REGRAS IMPORTANTES:
        - A data de cada transação DEVE estar no formato YYYY-MM-DD. Se o ano não for especificado, assuma o ano atual.
        - O campo 'amount' (valor) DEVE ser um número negativo para despesas (débitos, saques, pagamentos) e um número positivo para receitas (créditos, depósitos).
        - O campo 'type' (tipo) DEVE ser 'income' para créditos/depósitos e 'expense' para débitos/saques.
        - Ignore linhas que não são transações, como saldos, resumos ou cabeçalhos.

        Texto Extraído:
        {{{extractedText}}}
      `,
      output: {
        schema: ExtractTransactionsFromPdfOutputSchema,
      },
    });

    return output!;
  }
);
