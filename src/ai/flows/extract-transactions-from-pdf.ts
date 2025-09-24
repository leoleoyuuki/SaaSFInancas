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
  date: z.string().describe('The date of the transaction in YYYY-MM-DD format.'),
  amount: z.number().describe('The amount of the transaction. Crucially, this value must be negative for expenses/debits and positive for income/credits.'),
  description: z.string().describe('A description of the transaction.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction. "income" for credits/deposits, "expense" for debits/withdrawals.'),
});

const ExtractTransactionsFromPdfInputSchema = z.object({
  extractedText: z.string().describe("Raw text extracted from a bank statement PDF."),
});
export type ExtractTransactionsFromPdfInput = z.infer<typeof ExtractTransactionsFromPdfInputSchema>;

const ExtractTransactionsFromPdfOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('An array of extracted transactions.'),
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
      prompt: `You are a financial expert specializing in parsing raw text from bank statements.
        You will be given a block of text extracted from a PDF. Analyze the text to correctly identify the date, description, amount, and type for each transaction.
        Return the data in the specified JSON format.

        IMPORTANT RULES:
        - The date for each transaction MUST be in YYYY-MM-DD format.
        - The 'amount' MUST be a negative number for expenses (debits, withdrawals, payments) and a positive number for income (credits, deposits).
        - The 'type' MUST be 'income' for credits/deposits and 'expense' for debits/withdrawals.

        Extracted Text:
        {{{extractedText}}}
      `,
      output: {
        schema: ExtractTransactionsFromPdfOutputSchema,
      },
    });

    return output!;
  }
);
