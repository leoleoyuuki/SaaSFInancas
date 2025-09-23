
'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';

export async function getCategorizedSampleTransactions(): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    const transactions = sampleTransactions;
    // Filter out income, as we don't need to categorize it.
    const expensesToCategorize = transactions.filter(t => t.type === 'expense');
    
    const aiInput = expensesToCategorize.map(({ date, amount, description }) => ({
      date: new Date(date).toLocaleDateString(), // Format date for AI
      amount,
      description,
    }));

    if (aiInput.length === 0) {
      const categorizedTransactions = transactions.map(t => ({...t, category: 'Income' as const}));
      return { data: categorizedTransactions };
    }

    // Simulate a delay for loading states
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await categorizeTransactionsAI({ transactions: aiInput });

    const categorizedExpenses = result.categorizedTransactions.map((ct, index) => {
      // Assuming the AI returns transactions in the same order
      return {
        ...expensesToCategorize[index],
        category: ct.category,
      };
    });

    const incomeTransactions = transactions
      .filter(t => t.type === 'income')
      .map(t => ({ ...t, category: 'Income' as const }));

    const allCategorized = [...incomeTransactions, ...categorizedExpenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return { data: allCategorized };
  } catch (error) {
    console.error('Error categorizing transactions:', error);
    return { error: 'An error occurred while categorizing transactions. Please try again.' };
  }
}
