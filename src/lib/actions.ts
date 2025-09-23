
'use server';

import { categorizeTransactions as categorizeTransactionsAI } from '@/ai/flows/categorize-transactions-ai';
import { extractTransactionsFromText } from '@/ai/flows/extract-transactions-from-text';
import type { CategorizedTransaction, Transaction } from '@/lib/types';
import { sampleTransactions } from '@/lib/data';
import { function_uuid } from '@/lib/data';
import { Buffer } from 'buffer';

async function parsePdf(pdfBase64: string): Promise<string> {
    // This is a placeholder for a proper PDF parsing logic.
    // In a real-world scenario, you would use a library like pdf-parse.
    // For this example, we'll assume the PDF text is appended to the base64 string
    // This is a hack to avoid using the broken pdf-parse library in this environment
    try {
        const buffer = Buffer.from(pdfBase64, 'base64');
        const textContent = buffer.toString('utf-8');
        // A simple heuristic to check if it's likely text or still binary
        if (textContent.includes('Date') && (textContent.includes('Description') || textContent.includes('Details'))) {
            return textContent;
        }
        // This is not a robust solution, but a workaround for the current environment
        return "PDF could not be parsed. This is a dummy implementation. Sample transactions will be used.";
    } catch (e) {
         return "PDF could not be parsed. This is a dummy implementation. Sample transactions will be used.";
    }
}


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
    
    // We can't use a real pdf parser, so we will use a hack to simulate it for now.
    const textContent = await parsePdf(pdfBase64);

    if (textContent.includes("dummy implementation")) {
         const transactions = sampleTransactions;
         const result = await categorizeAllTransactions(transactions);
         result.data?.unshift({
             id: function_uuid(),
             date: new Date().toISOString(),
             description: "Used Sample Data due to PDF parse error",
             amount: 0,
             type: 'expense',
             category: 'Others'
         });
         return result;
    }
    
    const extractionResult = await extractTransactionsFromText({ textContent });

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
