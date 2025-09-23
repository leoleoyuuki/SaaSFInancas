'use server';

/**
 * @fileOverview A flow to suggest a budget plan based on user spending.
 *
 * - suggestBudgetBasedOnSpending - A function that takes spending data and suggests a budget.
 * - SuggestBudgetBasedOnSpendingInput - The input type for the suggestBudgetBasedOnSpending function.
 * - SuggestBudgetBasedOnSpendingOutput - The return type for the suggestBudgetBasedOnSpending function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBudgetBasedOnSpendingInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A CSV formatted string of transaction history, including date, amount, and category.  Should have columns date, amount, category, description.'
    ),
  financialGoals: z.string().describe('The users financial goals.'),
});
export type SuggestBudgetBasedOnSpendingInput = z.infer<
  typeof SuggestBudgetBasedOnSpendingInputSchema
>;

const SuggestBudgetBasedOnSpendingOutputSchema = z.object({
  suggestedBudget: z.string().describe('A detailed budget plan.'),
});
export type SuggestBudgetBasedOnSpendingOutput = z.infer<
  typeof SuggestBudgetBasedOnSpendingOutputSchema
>;

export async function suggestBudgetBasedOnSpending(
  input: SuggestBudgetBasedOnSpendingInput
): Promise<SuggestBudgetBasedOnSpendingOutput> {
  return suggestBudgetBasedOnSpendingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBudgetBasedOnSpendingPrompt',
  input: {schema: SuggestBudgetBasedOnSpendingInputSchema},
  output: {schema: SuggestBudgetBasedOnSpendingOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending data and suggest a budget plan to help them achieve their financial goals.

User Financial Goals: {{{financialGoals}}}

Spending Data:
{{#if spendingData}}
{{{spendingData}}}
{{else}}
No spending data provided.
{{/if}}`,
});

const suggestBudgetBasedOnSpendingFlow = ai.defineFlow(
  {
    name: 'suggestBudgetBasedOnSpendingFlow',
    inputSchema: SuggestBudgetBasedOnSpendingInputSchema,
    outputSchema: SuggestBudgetBasedOnSpendingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
