'use server';

/**
 * @fileOverview A Genkit flow for extracting transactions from a PDF file.
 *
 * - extractTransactionsFromPdf - A function that takes a PDF file buffer and extracts transaction data.
 * - ExtractTransactionsFromPdfInput - The input type for the extractTransactionsFromPdf function.
 * - ExtractTransactionsFromPdfOutput - The return type for the extractTransactionsFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import pdf from 'pdf-parse';

const TransactionSchema = z.object({
  date: z.string().describe('The date of the transaction in YYYY-MM-DD format.'),
  amount: z.number().describe('The amount of the transaction. Should be negative for expenses and positive for income.'),
  description: z.string().describe('A description of the transaction.'),
  type: z.enum(['income', 'expense']).describe('The type of transaction.'),
});

const ExtractTransactionsFromPdfInputSchema = z.object({
  pdfBase64: z
    .string()
    .describe(
      "A base64 encoded string of the PDF file. Expected format: '<encoded_data>'."
    ),
});
export type ExtractTransactionsFromPdfInput = z.infer<typeof ExtractTransactionsFromPdfInputSchema>;

const ExtractTransactionsFromPdfOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('An array of extracted transactions.'),
});
export type ExtractTransactionsFromPdfOutput = z.infer<typeof ExtractTransactionsFromPdfOutputSchema>;


export async function extractTransactionsFromPdf(input: ExtractTransactionsFromPdfInput): Promise<ExtractTransactionsFromPdfOutput> {
    const pdfBuffer = Buffer.from(input.pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);
    const textContent = data.text;
    
    return extractTransactionsFlow({textContent});
}


const FlowInputSchema = z.object({
  textContent: z.string(),
});


const extractTransactionsPrompt = ai.definePrompt({
  name: 'extractTransactionsPrompt',
  input: {schema: FlowInputSchema},
  output: {schema: ExtractTransactionsFromPdfOutputSchema},
  prompt: `You are a financial expert specializing in extracting transaction data from raw text.
  You will be given the text content of a bank statement and you need to extract all transactions from it.
  Identify the date, description, amount, and type (income or expense) for each transaction.
  For the transaction type, deposits or credits are 'income', and withdrawals, payments, or debits are 'expense'.
  Return the data in the specified JSON format.

  Text content:
  {{{textContent}}}
  `,
});


const extractTransactionsFlow = ai.defineFlow(
  {
    name: 'extractTransactionsFlow',
    inputSchema: FlowInputSchema,
    outputSchema: ExtractTransactionsFromPdfOutputSchema,
  },
  async input => {
    const {output} = await extractTransactionsPrompt(input);
    return output!;
  }
);
