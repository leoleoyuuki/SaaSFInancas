export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
};

export const Categories = [
  "Groceries",
  "Utilities",
  "Entertainment",
  "Travel",
  "Food",
  "Shopping",
  "Bills",
  "Income",
  "Others",
] as const;

export type Category = typeof Categories[number];

export type CategorizedTransaction = Transaction & {
  category: Category | string;
};
