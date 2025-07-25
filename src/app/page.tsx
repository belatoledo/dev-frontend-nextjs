'use client';
import Link from 'next/link';

import {
  Gem,
  Sparkle,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-primary"
      aria-labelledby="main-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <span
          className="absolute left-[5%] top-[15%] animate-pulse text-cyan-300/40"
          style={{ animationDelay: '1s' }}
        >
          <Gem className="h-8 w-8" />
        </span>
        <span
          className="absolute right-[15%] bottom-[20%] animate-pulse text-cyan-400/30"
          style={{ animationDelay: '3s' }}
        >
          <Sparkle className="h-8 w-8" />
        </span>
        <span
          className="absolute left-[30%] bottom-[10%] animate-pulse text-cyan-200/50"
          style={{ animationDelay: '5s' }}
        >
          <Sparkles className="h-8 w-8" />
        </span>
        <span
          className="absolute right-[45%] top-[10%] animate-pulse text-cyan-500/20"
          style={{ animationDelay: '7s' }}
        >
          <ShoppingBag className="h-8 w-8" />
        </span>
        <span
          className="absolute left-[60%] top-[40%] animate-pulse text-cyan-300/30"
          style={{ animationDelay: '0s' }}
        >
          <ShoppingCart className="h-8 w-8" />
        </span>

        <span className="absolute left-[20%] top-[40%] text-cyan-400/50">
          <Sparkles className="h-12 w-12" />
        </span>
        <span className="absolute right-[30%] bottom-[30%] text-cyan-200/40">
          <ShoppingBag className="h-12 w-12" />
        </span>
        <span className="absolute left-[50%] top-[15%] text-cyan-500/30">
          <ShoppingCart className="h-12 w-12" />
        </span>
        <span className="absolute right-[70%] top-[60%] text-cyan-300/50">
          <Gem className="h-12 w-12" />
        </span>
        <span className="absolute left-[80%] bottom-[5%] text-cyan-400/40">
          <Sparkle className="h-12 w-12" />
        </span>

        <span
          className="absolute right-[5%] top-[40%] animate-pulse text-cyan-300/20"
          style={{ animationDelay: '2s' }}
        >
          <ShoppingBag className="h-16 w-16" />
        </span>
        <span
          className="absolute left-[40%] bottom-[20%] animate-pulse text-cyan-500/10"
          style={{ animationDelay: '4s' }}
        >
          <ShoppingCart className="h-16 w-16" />
        </span>
        <span
          className="absolute right-[72%] bottom-[63%] animate-pulse text-cyan-200/30"
          style={{ animationDelay: '0s' }}
        >
          <Gem className="h-16 w-16" />
        </span>
        <span
          className="absolute left-[75%] top-[10%] animate-pulse text-cyan-400/20"
          style={{ animationDelay: '6s' }}
        >
          <Sparkles className="h-16 w-16" />
        </span>
        <span
          className="absolute right-[25%] top-[65%] animate-pulse text-cyan-300/10"
          style={{ animationDelay: '1s' }}
        >
          <Sparkle className="h-16 w-16" />
        </span>
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center">
        <h1
          id="main-heading"
          className="text-5xl font-extrabold tracking-tight text-primary-foreground sm:text-6xl md:text-7xl"
        >
          DIAMOND MANAGEMENT
        </h1>
        <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
          Gerencie seus produtos, cupons e mais.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
        >
          <Link href="/login" aria-label="Acessar painel de administração">
            ACESSAR PAINEL
          </Link>
        </Button>
      </div>
    </section>
  );
}
