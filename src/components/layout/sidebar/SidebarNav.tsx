'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Eye, LogOut, Package, Settings, Tags, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SidebarNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard/account', label: 'Minha conta', icon: User },
    { href: '/dashboard/products', label: 'Gerenciar produtos', icon: Package },
    { href: '/dashboard/discounts', label: 'Cadastrar cupons', icon: Tags },
    { href: '/products', label: 'Ver loja', icon: Eye },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 font-semibold"
        >
          <Settings className="h-5 w-5 text-cyan-500" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-2 p-4 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { 'bg-accent text-primary': isActive }
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4 text-cyan-500" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
};
