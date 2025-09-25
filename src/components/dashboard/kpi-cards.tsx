import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Summary = {
  income: number;
  expenses: number;
  net: number;
};

export function KpiCards({ summary, className }: { summary: Summary, className?:string }) {
  const { income, expenses, net } = summary;

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3", className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(income)}</div>
          <p className="text-xs text-muted-foreground">Total income received</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(expenses)}</div>
          <p className="text-xs text-muted-foreground">Total money spent</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(net)}
          </div>
          <p className="text-xs text-muted-foreground">Income minus expenses</p>
        </CardContent>
      </Card>
    </div>
  );
}
