import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  UploadCloud,
  PieChart,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-primary"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="w-full border-b border-border/40">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold font-headline text-foreground">
              FinanceFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium pt-10">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Logo />
                    <span>FinanceFlow</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-foreground hover:text-foreground/80"
                  >
                    Dashboard
                  </Link>
                  <Button asChild>
                    <Link href="/dashboard">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid place-items-center gap-10">
            <div className="space-y-6 text-center">
              <main className="text-5xl font-bold font-headline md:text-6xl">
                <h1 className="inline">
                  <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Transforme
                  </span>{' '}
                  seus extratos em
                </h1>{' '}
                <h2 className="inline">
                  <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Insights
                  </span>{' '}
                  financeiros
                </h2>
              </main>

              <p className="mx-auto text-xl text-muted-foreground md:w-10/12">
                Faça o upload do seu extrato bancário em PDF e deixe nossa I.A.
                categorizar suas transações, revelar seus hábitos de consumo e
                te ajudar a controlar suas finanças como nunca antes.
              </p>

              <div className="space-y-4 md:space-y-0 md:space-x-4">
                <Button className="w-full md:w-auto" asChild>
                  <Link href="/dashboard">
                    Comece agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container mx-auto space-y-8 px-4 py-24 sm:py-32 sm:px-6 lg:px-8"
        >
          <h2 className="text-center text-3xl font-bold font-headline lg:text-4xl">
            Recursos Principais
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Upload Simples e Rápido
              </h3>
              <p className="text-muted-foreground">
                Basta arrastar e soltar seu extrato bancário em PDF. Nosso
                sistema extrai os dados de forma segura e automática em
                segundos.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Categorização Inteligente com I.A.
              </h3>
              <p className="text-muted-foreground">
                Nossa inteligência artificial analisa e categoriza cada
                transação, permitindo que você entenda para onde seu dinheiro
                está indo.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Dashboards Visuais
              </h3>
              <p className="text-muted-foreground">
                Visualize seus gastos e receitas através de gráficos
                interativos. Tenha uma visão clara da sua saúde financeira.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="container mx-auto px-4 py-24 text-center sm:py-32 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold font-headline md:text-4xl">
            Como Funciona em 3 Passos Simples
          </h2>
          <p className="mx-auto mt-4 mb-8 text-xl text-muted-foreground md:w-3/4">
            Comece a organizar suas finanças em menos de um minuto.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold font-headline">Faça o Upload</h3>
              <p className="text-muted-foreground">
                Envie seu extrato bancário em formato PDF. É seguro e privado.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold font-headline">A I.A. Analisa</h3>
              <p className="text-muted-foreground">
                Nossa tecnologia extrai e categoriza suas transações
                automaticamente.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold font-headline">
                Visualize e Aja
              </h3>
              <p className="text-muted-foreground">
                Explore seus dados em um dashboard intuitivo e tome decisões
                mais inteligentes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-card">
          <div className="container mx-auto px-4 py-20 text-center sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-headline md:text-4xl lg:text-5xl">
              Pronto para assumir o controle?
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground md:text-xl">
              Pare de adivinhar, comece a ver. Sua jornada para a clareza
              financeira começa agora.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/dashboard">Analisar Meu Extrato Gratuitamente</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; 2024 FinanceFlow. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-center text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>Seus dados são processados localmente e nunca armazenados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
