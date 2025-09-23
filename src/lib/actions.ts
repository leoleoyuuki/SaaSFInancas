
'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import { extractTransactionsFromPdf } from '@/ai/flows/extract-transactions-from-pdf';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';
import { function_uuid } from '@/lib/data';

export async function getCategorizedSampleTransactions(): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    const transactions = sampleTransactions;
    return await categorizeAllTransactions(transactions);
  } catch (error) {
    console.error('Error getting sample transactions:', error);
    return { error: 'An error occurred while getting sample transactions. Please try again.' };
  }
}

export async function processAndCategorizePdf(pdfBase64: string): Promise<{ data?: CategorizedTransaction[], error?: string }> {
  try {
    // Simulate a delay for loading states
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const extractionResult = await extractTransactionsFromPdf({ pdfBase64 });
    const extractedTransactions: Transaction[] = extractionResult.transactions.map(t => ({
      ...t,
      id: function_uuid()
    }));
    
    return await categorizeAllTransactions(extractedTransactions);

  } catch (error) {
    console.error('Error processing PDF:', error);
    return { error: 'An error occurred while processing the PDF. Please try again.' };
  }
}

async function categorizeAllTransactions(transactions: Transaction[]): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    // Filter out income, as we don't need to categorize it.
    const expensesToCategorize = transactions.filter(t => t.type === 'expense');
    
    const aiInput = expensesToCategorize.map(({ date, amount, description }) => ({
      date: new Date(date).toLocaleDateString(), // Format date for AI
      amount,
      description,
    }));

    let categorizedExpenses: CategorizedTransaction[] = [];

    if (aiInput.length > 0) {
      const result = await categorizeTransactionsAI({ transactions: aiInput });
      categorizedExpenses = result.categorizedTransactions.map((ct, index) => {
        // Assuming the AI returns transactions in the same order
        return {
          ...expensesToCategorize[index],
          category: ct.category,
        };
      });
    }

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
