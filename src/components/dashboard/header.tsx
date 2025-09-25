import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
} from "lucide-react";

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
)

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="container flex items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo/>
            <span className="sr-only">FinanceFlow</span>
          </Link>
          <h1 className="text-2xl font-semibold font-headline text-foreground">
            FinanceFlow
          </h1>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
            <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium pt-10">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                >
                    <Logo />
                    <span>FinanceFlow</span>
                </Link>
                <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                </Link>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                </Link>
                </nav>
            </SheetContent>
            </Sheet>
        </div>
        
        {/* Placeholder for right-side content on desktop, can be removed if not needed */}
        <div className="hidden md:flex"></div>
      </div>
    </header>
  );
}
