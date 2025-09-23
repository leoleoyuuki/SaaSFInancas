import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-transactions-ai.ts';
import '@/ai/flows/suggest-budget-spending.ts';
import '@/ai/flows/extract-transactions-from-text.ts';
