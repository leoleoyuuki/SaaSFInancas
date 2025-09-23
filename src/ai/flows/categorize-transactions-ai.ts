// categorize-transactions-ai.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing transactions using AI.
 *
 * - categorizeTransactions - A function that takes a list of transactions and categorizes them.
 * - CategorizeTransactionsInput - The input type for the categorizeTransactions function.
 * - CategorizeTransactionsOutput - The return type for the categorizeTransactions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  date: z.string().describe('The date of the transaction.'),
  amount: z.number().describe('The amount of the transaction.'),
  description: z.string().describe('A description of the transaction.'),
});

export type Transaction = z.infer<typeof TransactionSchema>;

const CategorizeTransactionsInputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('An array of transactions to categorize.'),
});
export type CategorizeTransactionsInput = z.infer<typeof CategorizeTransactionsInputSchema>;

const CategorizeTransactionsOutputSchema = z.object({
  categorizedTransactions: z.array(
    TransactionSchema.extend({
      category: z.string().describe('The category of the transaction.'),
    })
  ).describe('The categorized transactions.'),
});
export type CategorizeTransactionsOutput = z.infer<typeof CategorizeTransactionsOutputSchema>;

export async function categorizeTransactions(input: CategorizeTransactionsInput): Promise<CategorizeTransactionsOutput> {
  return categorizeTransactionsFlow(input);
}

const categorizeTransactionsPrompt = ai.definePrompt({
  name: 'categorizeTransactionsPrompt',
  input: {schema: CategorizeTransactionsInputSchema},
  output: {schema: CategorizeTransactionsOutputSchema},
  prompt: `You are a personal finance expert. Given a list of bank transactions, categorize each transaction into one of the following categories: Groceries, Utilities, Entertainment, Travel, Food, Shopping, Bills, Others. Be concise in your categorizations.

Transactions:
{{#each transactions}}
- Date: {{date}}, Amount: {{amount}}, Description: {{description}}
{{/each}}`,
});

const categorizeTransactionsFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionsFlow',
    inputSchema: CategorizeTransactionsInputSchema,
    outputSchema: CategorizeTransactionsOutputSchema,
  },
  async input => {
    const {output} = await categorizeTransactionsPrompt(input);
    return output!;
  }
);
