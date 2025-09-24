'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import { extractTransactionsFromText } from '@/ai/flows/extract-transactions-from-text';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';
import { function_uuid } from '@/lib/data';
import pdf from 'pdf-parse';

async function extractTransactionsFromPdf(pdfBase64: string): Promise<Transaction[]> {
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);
    const textContent = data.text;
    
    if (!textContent) {
        throw new Error("Could not extract text from the PDF. The file might be empty or contain only images.");
    }
    
    const extractionResult = await extractTransactionsFromText({ textContent });
    
    if (!extractionResult.transactions || extractionResult.transactions.length === 0) {
      throw new Error('The AI could not extract any transactions from the PDF text. The document format might be unusual.');
    }
    
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

export async function processAndCategorizePdf(pdfBase64: string): Promise<{ data?: CategorizedTransaction[], error?: string }> {
  let extractedTransactions: Transaction[] = [];
  try {
    extractedTransactions = await extractTransactionsFromPdf(pdfBase64);
  } catch (error) {
    console.error('Error during PDF transaction extraction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed during the PDF parsing or AI extraction step. Details: ${errorMessage}` };
  }

  try {
    return await categorizeAllTransactions(extractedTransactions);
  } catch (error) {
    console.error('Error during transaction categorization:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed during the AI categorization step after transactions were extracted. Details: ${errorMessage}` };
  }
}

async function categorizeAllTransactions(transactions: Transaction[]): Promise<{ data?: CategorizedTransaction[]; error?: string }> {
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
      // Assuming the AI returns transactions in the same order, which can be brittle.
      // A better approach would be to have the AI return a unique identifier if possible.
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
}
