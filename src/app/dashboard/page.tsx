'use client';

import { useState, useTransition, useMemo, useRef } from 'react';
import { Loader2, FileText, Upload, Download, Trash2, FileJson, ChevronDown, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import type { CategorizedTransaction } from '@/lib/types';
import { getCategorizedSampleTransactions, processAndCategorizePdf } from '@/lib/actions';
import { KpiCards, type Summary } from '@/components/dashboard/kpi-cards';
import { SpendingPieChart, type CategorySpending } from '@/components/dashboard/spending-pie-chart';
import { IncomeExpenseBarChart } from '@/components/dashboard/income-expense-bar-chart';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<CategorizedTransaction[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const printableContentRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };


  const handleUseSampleData = () => {
    startTransition(async () => {
      const result = await getCategorizedSampleTransactions();
      if (result.data) {
        setTransactions(result.data);
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
        });
      }
    });
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      startTransition(async () => {
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const result = await processAndCategorizePdf(formData);
          
          if (result.data) {
            setTransactions(result.data);
          } else if (result.error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: result.error,
            });
          }
        } catch (error) {
           const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
           toast({
              variant: "destructive",
              title: "Failed to process PDF",
              description: errorMessage,
           });
        }
      });
    }
     // Reset file input
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        startTransition(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text !== 'string') {
                        throw new Error("Could not read file content.");
                    }
                    const data = JSON.parse(text);
                    // TODO: Add validation with Zod or similar to ensure data integrity
                    setTransactions(data);
                    toast({
                        title: "Relatório Importado",
                        description: "Seus dados financeiros foram carregados com sucesso.",
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
                    toast({
                        variant: "destructive",
                        title: "Falha na Importação do JSON",
                        description: `Ocorreu um erro ao ler o arquivo: ${errorMessage}`,
                    });
                }
            };
            reader.onerror = () => {
                 toast({
                    variant: "destructive",
                    title: "Erro de Leitura",
                    description: "Não foi possível ler o arquivo selecionado.",
                });
            }
            reader.readAsText(file);
        });
    }
    // Reset file input
    if (jsonInputRef.current) {
        jsonInputRef.current.value = '';
    }
  };


  const handleJsonDownload = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(transactions, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "relatorio-financeflow.json";

      link.click();
       toast({
          title: "Download Iniciado",
          description: "O arquivo relatorio-financeflow.json foi salvo.",
        });
    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        toast({
            variant: "destructive",
            title: "Erro no Download",
            description: `Não foi possível gerar o arquivo para download: ${errorMessage}`
        });
    }
  }

  const handleClearData = () => {
    setTransactions([]);
  }
  
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
      <div className="flex justify-center items-center flex-col gap-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-lg font-semibold font-headline">Processando seu extrato...</h3>
        <p className="text-sm text-muted-foreground">Aguarde um momento enquanto a I.A. extrai e categoriza suas transações.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
    <div className="mx-auto w-full space-y-6">
       {!hasTransactions && !isPending && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center h-[calc(100vh-200px)] shadow-sm">
          <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold font-headline">Comece a sua análise</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">Faça o upload de um extrato bancário em PDF, importe um relatório JSON ou use nossos dados de exemplo.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => fileInputRef.current?.click()} variant="default">
              <Upload className="mr-2 h-4 w-4" />
              Enviar Extrato PDF
            </Button>
             <Button onClick={() => jsonInputRef.current?.click()} variant="secondary">
              <FileJson className="mr-2 h-4 w-4" />
              Importar JSON
            </Button>
            <Button onClick={handleUseSampleData} variant="secondary">
              <FileText className="mr-2 h-4 w-4" />
              Usar Dados de Exemplo
            </Button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handlePdfUpload} accept=".pdf" className="hidden" />
          <input type="file" ref={jsonInputRef} onChange={handleJsonUpload} accept=".json" className="hidden" />
        </div>
      )}

      {isPending && <DashboardSkeleton />}

      {hasTransactions && !isPending && (
        <div className="animate-in fade-in-50 duration-500 space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-lg shadow-sm no-print">
                <h3 className="text-lg font-semibold font-headline">Seu Dashboard Financeiro</h3>
                <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={handleJsonDownload}>
                           <FileJson className="mr-2 h-4 w-4" />
                           JSON (para importar)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handlePrint}>
                           <FileText className="mr-2 h-4 w-4" />
                           PDF (para visualizar)
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={handleClearData} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Limpar Dados
                    </Button>
                </div>
            </div>
            
            <div ref={printableContentRef} className="space-y-8">
                <style type="text/css" media="print">
                {`
                    @page { 
                      size: landscape;
                      margin: 0.5in;
                    }
                    body { 
                      -webkit-print-color-adjust: exact !important; 
                      print-color-adjust: exact !important;
                    }
                    .print-container { 
                      padding: 0 !important; 
                      margin: 0 !important;
                      width: 100%;
                      height: 100%;
                    }
                    .no-print { 
                      display: none !important; 
                    }
                    .print-content {
                      display: grid;
                      grid-template-rows: auto 1fr;
                      height: 100%;
                      width: 100%;
                      gap: 1rem;
                    }
                    .print-content .kpi-grid {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 1rem;
                    }
                    .print-content .charts-grid {
                      display: grid;
                      grid-template-columns: 40% 1fr;
                      gap: 1rem;
                      align-items: flex-start;
                    }
                    .print-content .card {
                      border: 1px solid #e2e8f0;
                      box-shadow: none;
                    }
                     .print-content .card-header, .print-content .card-content {
                      padding: 0.75rem;
                    }
                    .print-content .card-title {
                       font-size: 1rem;
                    }
                    .print-content .text-2xl {
                      font-size: 1.25rem;
                    }
                    .print-content .recharts-wrapper {
                       height: 250px !important;
                    }
                `}
                </style>
                <div className="print-content">
                  <KpiCards summary={summary} className="kpi-grid" />
                  <div className="charts-grid">
                    <SpendingPieChart data={categorySpending} />
                    <IncomeExpenseBarChart summary={summary} />
                  </div>
                </div>

                <div className="no-print">
                  <div className="mt-8">
                    <TransactionsTable transactions={transactions} setTransactions={setTransactions} />
                  </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
