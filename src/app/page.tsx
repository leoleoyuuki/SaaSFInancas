import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, UploadCloud, PieChart, ShieldCheck, Menu } from 'lucide-react';
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
        <div className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
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
                   <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                      <Logo />
                      <span>FinanceFlow</span>
                  </Link>
                  <Link href="/dashboard" className="text-foreground hover:text-foreground/80">
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
        <section className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 place-items-center gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold font-headline">
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

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Faça o upload do seu extrato bancário em PDF e deixe nossa I.A. categorizar suas transações, revelar seus hábitos de consumo e te ajudar a controlar suas finanças como nunca antes.
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
            
            {/* Image */}
            <div className="hidden lg:block w-full">
              <div className="bg-card p-4 rounded-xl shadow-lg border">
                <img src="/img/financeGraphs.png" alt="FinanceFlow Dashboard Preview" data-ai-hint="financial dashboard" className="rounded-lg aspect-video object-cover w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-center">
                Recursos Principais
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-8">
                <div className="flex flex-col gap-4 p-6 bg-card border rounded-lg shadow-sm">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <UploadCloud className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Upload Simples e Rápido</h3>
                    <p className="text-muted-foreground">
                        Basta arrastar e soltar seu extrato bancário em PDF. Nosso sistema extrai os dados de forma segura e automática em segundos.
                    </p>
                </div>

                <div className="flex flex-col gap-4 p-6 bg-card border rounded-lg shadow-sm">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Bot className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Categorização Inteligente com I.A.</h3>
                    <p className="text-muted-foreground">
                        Nossa inteligência artificial analisa e categoriza cada transação, permitindo que você entenda para onde seu dinheiro está indo.
                    </p>
                </div>

                 <div className="flex flex-col gap-4 p-6 bg-card border rounded-lg shadow-sm">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <PieChart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">Dashboards Visuais</h3>
                    <p className="text-muted-foreground">
                        Visualize seus gastos e receitas através de gráficos interativos. Tenha uma visão clara da sua saúde financeira.
                    </p>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
             <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Como Funciona em 3 Passos Simples
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                Comece a organizar suas finanças em menos de um minuto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">1</div>
                    <h3 className="text-xl font-bold font-headline">Faça o Upload</h3>
                    <p className="text-muted-foreground">Envie seu extrato bancário em formato PDF. É seguro e privado.</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">2</div>
                    <h3 className="text-xl font-bold font-headline">A I.A. Analisa</h3>
                    <p className="text-muted-foreground">Nossa tecnologia extrai e categoriza suas transações automaticamente.</p>
                </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">3</div>
                    <h3 className="text-xl font-bold font-headline">Visualize e Aja</h3>
                    <p className="text-muted-foreground">Explore seus dados em um dashboard intuitivo e tome decisões mais inteligentes.</p>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-card">
            <div className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">
                    Pronto para assumir o controle?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mt-4 mb-8">
                   Pare de adivinhar, comece a ver. Sua jornada para a clareza financeira começa agora.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/dashboard">
                        Analisar Meu Extrato Gratuitamente
                    </Link>
                </Button>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-[1440px]

 px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy; 2024 FinanceFlow. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground text-center">
                <ShieldCheck className="h-4 w-4" />
                <span>Seus dados são processados localmente e nunca armazenados.</span>
            </div>
        </div>
      </footer>
    </div>
  );
}