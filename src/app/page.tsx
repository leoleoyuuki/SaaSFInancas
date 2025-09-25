'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  UploadCloud,
  PieChart,
  ShieldCheck,
  Menu,
  BarChart3,
  Clock,
  Zap,
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
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      icon: UploadCloud,
      title: 'Faça o Upload',
      subtitle: 'Envie seu extrato PDF',
      description:
        'Faça o upload do seu extrato bancário em formato PDF. É 100% seguro e privado.',
      time: '5 segundos',
      features: [
        'Seguro & Privado',
        'Suporte a diversos bancos',
        'PDF de qualquer tamanho',
      ],
      mockup: '/api/placeholder/300/200',
    },
    {
      number: '02',
      icon: Bot,
      title: 'A I.A. Analisa',
      subtitle: 'Categorização inteligente',
      description:
        'Nossa tecnologia extrai e categoriza suas transações em segundos.',
      time: '15 segundos',
      features: ['95%+ Precisão', '20+ Categorias', 'Aprendizado contínuo'],
      mockup: '/api/placeholder/300/200',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Visualize Seus Dados',
      subtitle: 'Insights visuais instantâneos',
      description:
        'Explore seu dashboard financeiro e tome decisões mais inteligentes.',
      time: 'Instantâneo',
      features: [
        'Gráficos interativos',
        'Insights personalizados',
        'Exportação de dados',
      ],
      mockup: '/api/placeholder/300/200',
    },
  ];

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
          <div className="grid grid-cols-1 place-items-center gap-10">
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
                Esqueça a confusão. O FinanceFlow transforma seu extrato
                bancário em um dashboard claro e inteligente. Entenda seus
                gastos e organize sua vida financeira em minutos.
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
                Faça o upload do seu extrato em PDF. Nossa I.A. extrai todas
                as transações de forma segura e instantânea, sem trabalho
                manual.
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
                Cada gasto é classificado automaticamente. Saiba exatamente
                para onde seu dinheiro está indo: mercado, contas, lazer e
                mais.
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
                Visualize suas finanças com gráficos interativos e fáceis de
                entender. Tome decisões inteligentes com base em dados claros.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Social Proof Section */}
        <section id="social-proof" className="bg-card">
          <div className="container mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold font-headline lg:text-4xl">
              Junte-se a milhares de pessoas que organizaram suas finanças
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <p className="flex-1 text-muted-foreground">
                  "Finalmente entendi para onde meu dinheiro vai todo mês. O
                  FinanceFlow tornou tudo tão simples que me arrependo de não
                  ter usado antes."
                </p>
                <div className="mt-4 flex items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Juliana S."
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Juliana S.</p>
                    <p className="text-sm text-muted-foreground">Designer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <p className="flex-1 text-muted-foreground">
                  "Eu odiava planilhas. O fato de poder simplesmente jogar
                  meu extrato PDF e ter tudo analisado automaticamente é
                  incrível. Economizou horas da minha vida."
                </p>
                <div className="mt-4 flex items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Marcos P."
                    />
                    <AvatarFallback>MP</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Marcos P.</p>
                    <p className="text-sm text-muted-foreground">
                      Desenvolvedor
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <p className="flex-1 text-muted-foreground">
                  "Uma ferramenta poderosa e, ao mesmo tempo, super fácil de
                  usar. O dashboard visual me ajudou a cortar gastos
                  desnecessários e a economizar mais."
                </p>
                <div className="mt-4 flex items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Carla M."
                    />
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
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              <span>Processo Revolucionário</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Da Confusão à Clareza em{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                3 Etapas Simples
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transforme seu extrato bancário em insights acionáveis em menos
              de 30 segundos
            </p>
          </div>

          {/* Desktop Version */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8 relative">
              {/* Connection Lines */}
              <div className="absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform translate-x-16"></div>

              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    activeStep === index ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Number Circle */}
                  <div
                    className={`relative w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25'
                        : 'bg-card border-2 border-primary/20 group-hover:border-primary/40'
                    }`}
                  >
                    <step.icon
                      className={`h-12 w-12 transition-colors duration-300 ${
                        activeStep === index ? 'text-white' : 'text-primary'
                      }`}
                    />
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-white text-primary shadow-md'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{step.time}</span>
                    </div>

                    <h3 className="text-xl font-bold font-headline">
                      {step.title}
                    </h3>
                    <p className="text-primary font-medium">{step.subtitle}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mockup Preview */}
                  <div
                    className={`mt-6 p-4 bg-card rounded-xl border transition-all duration-300 ${
                      activeStep === index
                        ? 'shadow-lg border-primary/20'
                        : 'border-border'
                    }`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-muted to-background rounded-lg flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Version */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                {/* Left: Icon & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-20 bg-gradient-to-b from-primary to-accent mt-4"></div>
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      {step.number}
                    </div>
                    <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                      <Clock className="h-3 w-3" />
                      <span>{step.time}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-headline mb-2">
                    {step.title}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {step.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-card border rounded-full px-6 py-3 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">
                <span className="text-green-500">100% Seguro:</span>{' '}
                Processamento local, dados não armazenados
              </span>
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
              Sua jornada para uma vida financeira organizada começa com um
              clique. É grátis.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/dashboard">
                Analisar Meu Extrato Gratuitamente
              </Link>
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
            <span>
              Seus dados são processados localmente e nunca armazenados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
