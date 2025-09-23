
'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import { extractTransactionsFromPdf as extractTransactionsFromPdfAI } from '@/ai/flows/extract-transactions-from-pdf';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';
import { function_uuid } from '@/lib/data';

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

export async function processAndCategorizePdf(pdfBase64: string): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    // 1. Extract transactions from PDF
    const extractionResult = await extractTransactionsFromPdfAI({ pdfBase64 });
    if (!extractionResult || !extractionResult.transactions || extractionResult.transactions.length === 0) {
      return { error: 'Could not extract any transactions from the PDF.' };
    }

    const transactions: Transaction[] = extractionResult.transactions.map(t => ({
        ...t,
        id: function_uuid(),
        date: new Date(t.date).toISOString().split('T')[0], // Ensure date format consistency
    }));

    // 2. Separate expenses and income
    const expensesToCategorize = transactions.filter(t => t.type === 'expense');
    const incomeTransactions = transactions.filter(t => t.type === 'income');

    // 3. Categorize expenses
    let categorizedExpenses: CategorizedTransaction[] = [];
    if (expensesToCategorize.length > 0) {
        const aiInput = expensesToCategorize.map(({ date, amount, description }) => ({
            date: new Date(date).toLocaleDateString(),
            amount,
            description,
        }));

        const categorizationResult = await categorizeTransactionsAI({ transactions: aiInput });

        categorizedExpenses = categorizationResult.categorizedTransactions.map((ct, index) => ({
            ...expensesToCategorize[index],
            category: ct.category,
        }));
    }

    // 4. Combine and sort transactions
    const allCategorized = [
        ...incomeTransactions.map(t => ({ ...t, category: 'Income' as const })),
        ...categorizedExpenses
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { data: allCategorized };

  } catch (error) {
    console.error('Error processing PDF:', error);
    return { error: 'An error occurred while processing the PDF. Please try again.' };
  }
}
