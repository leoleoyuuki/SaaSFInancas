import type { ReactNode } from "react";
import Header from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
}
