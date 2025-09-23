'use server';

/**
 * @fileOverview A Genkit flow for extracting transactions from a raw text string or a PDF file.
 *
 * - extractTransactionsFromText - A function that takes a raw text or PDF data URI and extracts transaction data.
 * - ExtractTransactionsFromTextInput - The input type for the extractTransactionsFromText function.
 * - ExtractTransactionsFromTextOutput - The return type for the extractTransactionsFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  date: z.string().describe('The date of the transaction in YYYY-MM-DD format.'),
  amount: z.number().describe('The amount of the transaction. Should be negative for expenses and positive for income.'),
  description: z.string().describe('A description of the transaction.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction.'),
});

const ExtractTransactionsFromTextInputSchema = z.object({
  textContent: z.string().describe('The raw text content from a bank statement, or a data URI for a PDF file.'),
});
export type ExtractTransactionsFromTextInput = z.infer<typeof ExtractTransactionsFromTextInputSchema>;

const ExtractTransactionsFromTextOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('An array of extracted transactions.'),
});
export type ExtractTransactionsFromTextOutput = z.infer<typeof ExtractTransactionsFromTextOutputSchema>;


export async function extractTransactionsFromText(input: ExtractTransactionsFromTextInput): Promise<ExtractTransactionsFromTextOutput> {
    return extractTransactionsFlow(input);
}

const extractTransactionsPrompt = ai.definePrompt({
  name: 'extractTransactionsPrompt',
  input: {schema: ExtractTransactionsFromTextInputSchema},
  output: {schema: ExtractTransactionsFromTextOutputSchema},
  prompt: `You are a financial expert specializing in extracting transaction data from raw text or PDF documents.
  You will be given the text content of a bank statement or a direct PDF file and you need to extract all transactions from it.
  Identify the date, description, amount, and type (income or expense) for each transaction.
  For the transaction type, deposits or credits are 'income', and withdrawals, payments, or debits are 'expense'.
  Return the data in the specified JSON format.

  Content:
  {{#if (startsWith textContent "data:")}}
  {{media url=textContent}}
  {{else}}
  {{{textContent}}}
  {{/if}}
  `,
  model: 'googleai/gemini-2.5-flash',
});


const extractTransactionsFlow = ai.defineFlow(
  {
    name: 'extractTransactionsFlow',
    inputSchema: ExtractTransactionsFromTextInputSchema,
    outputSchema: ExtractTransactionsFromTextOutputSchema,
  },
  async input => {
    const {output} = await extractTransactionsPrompt(input);
    return output!;
  }
);
