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

const prompt = ai.definePrompt({
  name: 'extractTransactionsPrompt',
  input: { schema: ExtractTransactionsFromPdfInputSchema },
  output: { schema: ExtractTransactionsFromPdfOutputSchema },
  prompt: `Você é um especialista financeiro. Sua tarefa é analisar o texto bruto de um extrato bancário e extrair todas as transações, listando cada gasto e cada entrada.

REGRAS IMPORTANTES:
1.  **Baseie-se Estritamente no Texto:** NÃO invente, infira ou alucine nenhuma informação. Extraia APENAS as transações que estão claramente presentes no texto fornecido.
2.  **Formato do Valor:** Despesas (débitos) DEVEM ter um valor numérico negativo. Receitas (créditos) DEVEM ter um valor numérico positivo.
3.  **Ignore o Resto:** Ignore saldos, resumos, ou qualquer outra informação que não seja uma transação individual, mas tome MUITO cuidado para não faltar informações.

Texto do extrato:
{{{extractedText}}}

Gere um relatório JSON contendo a lista de transações extraídas.`,
});


const extractTransactionsFlow = ai.defineFlow(
  {
    name: 'extractTransactionsFromPdfFlow',
    inputSchema: ExtractTransactionsFromPdfInputSchema,
    outputSchema: ExtractTransactionsFromPdfOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
