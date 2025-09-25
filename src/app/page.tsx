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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
                Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
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
                      Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero Section (Problem + Solution) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid place-items-center gap-10">
            <div className="space-y-6 text-center">
              <main className="text-5xl font-bold font-headline md:text-6xl">
                <h1 className="inline">
                  <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Cansado
                  </span>{' '}
                  de planilhas complicadas?
                </h1>{' '}
                <h2 className="inline">
                  Assuma o controle das suas{' '}
                  <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    finanças
                  </span>
                </h2>
              </main>

              <p className="mx-auto text-xl text-muted-foreground md:w-10/12">
                Esqueça a confusão. O FinanceFlow transforma seu extrato bancário em um dashboard claro e inteligente. Entenda seus gastos e organize sua vida financeira em minutos.
              </p>

              <div className="space-y-4 md:space-y-0 md:space-x-4">
                <Button className="w-full md:w-auto" asChild size="lg">
                  <Link href="/dashboard">
                    Organizar minhas finanças
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Benefits Section (How it solves) */}
        <section
          id="benefits"
          className="container mx-auto space-y-8 px-4 py-24 sm:py-32 sm:px-6 lg:px-8"
        >
          <h2 className="text-center text-3xl font-bold font-headline lg:text-4xl">
            Tudo que você precisa para ter clareza financeira
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Extração Automática
              </h3>
              <p className="text-muted-foreground">
                Faça o upload do seu extrato em PDF. Nossa I.A. extrai todas as transações de forma segura e instantânea, sem trabalho manual.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Categorização Inteligente
              </h3>
              <p className="text-muted-foreground">
                Cada gasto é classificado automaticamente. Saiba exatamente para onde seu dinheiro está indo: mercado, contas, lazer e mais.
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
                Visualize suas finanças com gráficos interativos e fáceis de entender. Tome decisões inteligentes com base em dados claros.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Social Proof Section */}
        <section
          id="social-proof"
          className="bg-card"
        >
        <div className="container mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold font-headline lg:text-4xl">
                Junte-se a milhares de pessoas que organizaram suas finanças
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    <p className="flex-1 text-muted-foreground">"Finalmente entendi para onde meu dinheiro vai todo mês. O FinanceFlow tornou tudo tão simples que me arrependo de não ter usado antes."</p>
                    <div className="mt-4 flex items-center">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Juliana S." />
                            <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">Juliana S.</p>
                            <p className="text-sm text-muted-foreground">Designer</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    <p className="flex-1 text-muted-foreground">"Eu odiava planilhas. O fato de poder simplesmente jogar meu extrato PDF e ter tudo analisado automaticamente é incrível. Economizou horas da minha vida."</p>
                    <div className="mt-4 flex items-center">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Marcos P." />
                            <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">Marcos P.</p>
                            <p className="text-sm text-muted-foreground">Desenvolvedor</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                     <p className="flex-1 text-muted-foreground">"Uma ferramenta poderosa e, ao mesmo tempo, super fácil de usar. O dashboard visual me ajudou a cortar gastos desnecessários e a economizar mais."</p>
                     <div className="mt-4 flex items-center">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Carla M." />
                            <AvatarFallback>CM</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">Carla M.</p>
                            <p className="text-sm text-muted-foreground">Autônoma</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section
          id="how-it-works"
          className="container mx-auto px-4 py-24 text-center sm:py-32 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold font-headline md:text-4xl">
            Comece em 3 Passos Simples
          </h2>
          <p className="mx-auto mt-4 mb-8 text-xl text-muted-foreground md:w-3/4">
            Organize suas finanças em menos de um minuto. É sério.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold font-headline">Faça o Upload</h3>
              <p className="text-muted-foreground">
                Envie seu extrato bancário em formato PDF. É 100% seguro e privado.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold font-headline">A I.A. Analisa</h3>
              <p className="text-muted-foreground">
                Nossa tecnologia extrai e categoriza suas transações em segundos.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold font-headline">
                Visualize Seus Dados
              </h3>
              <p className="text-muted-foreground">
                Explore seu dashboard financeiro e tome decisões mais inteligentes.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <section id="cta" className="bg-card">
          <div className="container mx-auto px-4 py-20 text-center sm:py-24 sm:px-8">
            <h2 className="text-3xl font-bold font-headline md:text-4xl lg:text-5xl">
              Pronto para ter clareza financeira?
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground md:text-xl">
              Sua jornada para uma vida financeira organizada começa com um clique. É grátis.
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
