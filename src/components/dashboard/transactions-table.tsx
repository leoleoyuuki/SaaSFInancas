'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategorizedTransaction, Category } from '@/lib/types';
import { Categories } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { getCategoryIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type TransactionsTableProps = {
  transactions: CategorizedTransaction[];
  setTransactions: (transactions: CategorizedTransaction[]) => void;
};

export function TransactionsTable({ transactions, setTransactions }: TransactionsTableProps) {
  const handleCategoryChange = (transactionId: string, newCategory: Category) => {
    const updatedTransactions = transactions.map(t =>
      t.id === transactionId ? { ...t, category: newCategory } : t
    );
    setTransactions(updatedTransactions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A list of your recent transactions. You can recategorize them if needed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center w-[200px]">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => {
                const Icon = getCategoryIcon(t.category);
                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                         <span className="hidden h-9 w-9 items-center justify-center rounded-lg sm:flex bg-secondary text-secondary-foreground">
                            <Icon className="h-5 w-5" />
                        </span>
                        <div className="font-medium">{t.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(t.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-semibold',
                        t.type === 'income' ? 'text-green-600' : 'text-foreground'
                      )}
                    >
                      {formatCurrency(t.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                       <Select 
                        value={t.category} 
                        onValueChange={(value) => handleCategoryChange(t.id, value as Category)}
                       >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
