'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import { extractTransactionsFromPdf } from '@/ai/flows/extract-transactions-from-pdf';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';
import { function_uuid } from '@/lib/data';

async function extractTransactions(pdfBase64: string): Promise<Transaction[]> {
  // Use an absolute URL for the API route to ensure it works in all environments
  const url = new URL('/api/extract-text', process.env.NEXT_PUBLIC_URL || 'http://localhost:9002');

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pdfBase64 }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to extract text from PDF.');
  }

  const extractionResult = await extractTransactionsFromPdf({ extractedText: result.text });
    
  if (!extractionResult.transactions || extractionResult.transactions.length === 0) {
    throw new Error('The AI could not extract any transactions from the text. The format might be unusual or unsupported.');
  }
    
  // Ensure every transaction has a unique ID, matching the sample data format.
  return extractionResult.transactions.map(t => ({ ...t, id: function_uuid() }));
}


export async function getCategorizedSampleTransactions(): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    const transactions = sampleTransactions;
    return await categorizeAllTransactions(transactions);
  } catch (error) {
    console.error('Error getting sample transactions:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `An error occurred while getting sample transactions: ${errorMessage}` };
  }
}

export async function processAndCategorizePdf(pdfBase64: string): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
  try {
    const extractedTransactions = await extractTransactions(pdfBase64);
    return await categorizeAllTransactions(extractedTransactions);
  } catch (error) {
    console.error('Error processing PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during PDF processing.';
    return { error: `An unexpected error occurred during PDF processing: ${errorMessage}` };
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
        const originalTransaction = expensesToCategorize.find(t => t.description === ct.description && t.amount === ct.amount);
        return {
          ...(originalTransaction || expensesToCategorize[index]),
          id: originalTransaction?.id || function_uuid(),
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
     console.error('Error during transaction categorization:', error);
     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
     return { error: `Failed during the AI categorization step after transactions were extracted. Details: ${errorMessage}` };
  }
}
