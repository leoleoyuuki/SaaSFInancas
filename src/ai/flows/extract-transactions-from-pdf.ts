'use server';

/**
 * @fileOverview A Genkit flow for extracting transactions from raw text.
 *
 * - extractTransactionsFromPdf - A function that takes text content and extracts transaction data.
 * - ExtractTransactionsFromPdfInput - The input type for the extractTransactionsFromPdf function.
 * - ExtractTransactionsFromPdfOutput - The return type for the extractTransactionsFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  date: z.string().describe('The date of the transaction in YYYY-MM-DD format.'),
  amount: z.number().describe('The amount of the transaction. Should be negative for expenses and positive for income.'),
  description: z.string().describe('A description of the transaction.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction.'),
});

const ExtractTransactionsFromPdfInputSchema = z.object({
  text: z.string().describe("The raw text content extracted from a bank statement PDF."),
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
      prompt: `You are a financial expert specializing in extracting transaction data from raw text extracted from a PDF bank statement.
        You will be given a block of text and you need to extract all transactions from it.
        Identify the date, description, amount, and type (income or expense) for each transaction.
        For the transaction type, deposits or credits are 'income', and withdrawals, payments, or debits are 'expense'.
        Return the data in the specified JSON format.

        Text content:
        {{{text}}}
      `,
      output: {
        schema: ExtractTransactionsFromPdfOutputSchema,
      },
    });

    return output!;
  }
);
