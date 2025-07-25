import Link from 'next/link';

import { ArrowLeft, Gem, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <>
      {' '}
      <div className="w-full bg-cyan-500/10 text-cyan-700 py-2 px-4 md:px-6 border-b border-cyan-200 flex flex-col items-center justify-center">
        <span>
          <strong>ATENÇÃO: </strong>
          Você está visualizando sua página de produtos como seus usuários.
        </span>

        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para dashboard
        </Link>
      </div>
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav
          role="navigation"
          className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Gem className="h-6 w-6 text-cyan-500" aria-hidden="true" />
            <span className="sr-only md:not-sr-only md:whitespace-nowrap">
              Diamond Store
            </span>
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>

          <Button aria-label="Fazer login/entrar">Entrar</Button>
        </div>
      </header>
    </>
  );
};
