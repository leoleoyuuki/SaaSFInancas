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
      prompt: `Sua tarefa é atuar como uma ferramenta de extração de dados. Você receberá um texto não estruturado de um extrato bancário e deverá convertê-lo em um relatório JSON estruturado, listando cada gasto e cada entrada.

        REGRAS ABSOLUTAS:
        1.  **NÃO INVENTE DADOS:** Sua resposta DEVE se basear estrita e unicamente nas informações presentes no "Texto Extraído". Se uma informação não estiver no texto, não a inclua. Não adicione transações que não existam no texto.
        2.  **DATA:** A data de cada transação DEVE estar no formato YYYY-MM-DD. Se o ano não for especificado, assuma o ano atual.
        3.  **VALOR (AMOUNT):** O campo 'amount' DEVE ser um número. Use um valor NEGATIVO para despesas (débitos, saques, pagamentos) e um valor POSITIVO para receitas (créditos, depósitos).
        4.  **TIPO (TYPE):** O campo 'type' DEVE ser 'expense' para despesas e 'income' para receitas.
        5.  **IGNORAR LIXO:** Ignore cabeçalhos, saldos resumidos, números de página e qualquer outra linha que não represente uma transação individual.

        Analise o texto abaixo e crie uma lista JSON de transações.

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
