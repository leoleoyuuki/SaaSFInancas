'use client';

import { useState, useTransition, useMemo } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { CategorizedTransaction } from '@/lib/types';
import { getCategorizedSampleTransactions } from '@/lib/actions';
import { KpiCards, type Summary } from '@/components/dashboard/kpi-cards';
import { SpendingPieChart, type CategorySpending } from '@/components/dashboard/spending-pie-chart';
import { IncomeExpenseBarChart } from '@/components/dashboard/income-expense-bar-chart';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<CategorizedTransaction[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleUpload = () => {
    startTransition(async () => {
      const result = await getCategorizedSampleTransactions();
      if (result.data) {
        setTransactions(result.data);
        toast({
          title: "Success!",
          description: "Your transactions have been categorized.",
        });
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
        });
      }
    });
  };
  
  const hasTransactions = transactions.length > 0;

  const summary: Summary = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
        } else {
          acc.expenses += Math.abs(t.amount);
        }
        acc.net = acc.income - acc.expenses;
        return acc;
      },
      { income: 0, expenses: 0, net: 0 }
    );
  }, [transactions]);

  const categorySpending: CategorySpending[] = useMemo(() => {
    const spendingMap = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const amount = Math.abs(t.amount);
        acc[t.category] = (acc[t.category] || 0) + amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(spendingMap).map(([category, spending]) => ({
      category,
      spending,
    })).sort((a,b) => b.spending - a.spending);
  }, [transactions]);


  const DashboardSkeleton = () => (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Skeleton className="h-[126px]"/>
        <Skeleton className="h-[126px]"/>
        <Skeleton className="h-[126px]"/>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        <Skeleton className="h-[350px] lg:col-span-3"/>
        <Skeleton className="h-[350px] lg:col-span-4"/>
      </div>
      <Skeleton className="h-[400px]"/>
    </div>
  )


  return (
    <div className="space-y-6">
      {!hasTransactions && !isPending && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center h-[400px] shadow-sm">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold font-headline">Upload your statement</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">Start by uploading your bank statement to see your financial overview.</p>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Statement
          </Button>
          <p className="text-xs text-muted-foreground mt-2">(This will load sample data)</p>
        </div>
      )}

      {isPending && <DashboardSkeleton />}

      {hasTransactions && !isPending && (
        <div className="animate-in fade-in-50 duration-500 space-y-8">
          <KpiCards summary={summary} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <SpendingPieChart data={categorySpending} className="lg:col-span-3" />
            <IncomeExpenseBarChart summary={summary} className="lg:col-span-4" />
          </div>
          <TransactionsTable transactions={transactions} setTransactions={setTransactions} />
        </div>
      )}
    </div>
  );
}
