"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Lightbulb,
  ListTodo,
  Menu,
  Settings,
  Target,
  Timer,
  Wallet
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Target, label: "대시보드" },
  { href: "/goals", icon: Wallet, label: "목표" },
  { href: "/timer", icon: Timer, label: "타이머" },
  { href: "/todos", icon: ListTodo, label: "할 일" },
  { href: "/ideas", icon: Lightbulb, label: "아이디어" },
  { href: "/stats", icon: BarChart3, label: "통계" },
  { href: "/settings", icon: Settings, label: "설정" }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [tab, setTab] = useState(pathname.startsWith("/dashboard") ? "/dashboard" : pathname);

  useEffect(() => {
    setTab(pathname.startsWith("/dashboard") ? "/dashboard" : pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="text-lg font-bold text-neutral-900">
            Billionaire Timer
          </Link>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback>BT</AvatarFallback>
        </Avatar>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-72 border-r bg-white md:block">
          <SidebarContent />
        </aside>
        <main className="flex-1 space-y-6 px-6 py-8">
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(value);
              router.push(value);
            }}
            className="block md:hidden"
          >
            <TabsList className="flex flex-wrap gap-1 bg-neutral-100">
              {navItems.map((item) => (
                <TabsTrigger key={item.href} value={item.href}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col justify-between">
      <div className="space-y-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-primary/10",
                active ? "bg-primary/20 text-primary-foreground" : "text-neutral-600"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </div>
      <div className="border-t p-4 text-xs text-neutral-400">
        © {new Date().getFullYear()} Billionaire Timer
      </div>
    </nav>
  );
}
