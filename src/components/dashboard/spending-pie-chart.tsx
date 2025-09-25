'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/lib/utils';

export type CategorySpending = {
  category: string;
  spending: number;
};

const chartConfig = {
  spending: {
    label: 'Spending',
  },
  Groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-1))',
  },
  Utilities: {
    label: 'Utilities',
    color: 'hsl(var(--chart-2))',
  },
  Entertainment: {
    label: 'Entertainment',
    color: 'hsl(var(--chart-3))',
  },
  Travel: {
    label: 'Travel',
    color: 'hsl(var(--chart-4))',
  },
  Food: {
    label: 'Food',
    color: 'hsl(var(--chart-5))',
  },
  Shopping: {
    label: 'Shopping',
    color: 'hsl(260, 60%, 55%)',
  },
  Bills: {
    label: 'Bills',
    color: 'hsl(310, 70%, 50%)',
  },
  Others: {
    label: 'Others',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export function SpendingPieChart({ data, className }: { data: CategorySpending[]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>A breakdown of your expenses by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" formatter={(value, name) => `${formatCurrency(value as number)}`} />}
            />
            <Pie
              data={data}
              dataKey="spending"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig[entry.category as keyof typeof chartConfig]?.color || chartConfig.Others.color} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
