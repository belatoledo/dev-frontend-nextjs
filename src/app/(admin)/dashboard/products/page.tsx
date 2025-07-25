'use client';

import Link from 'next/link';

import { LoaderCircle, PlusCircle } from 'lucide-react';

import { ProductsTable } from '@/components/products/ProductsTable';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/useProduct';

export default function ProductsManagementPage() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto p-8">
        <LoaderCircle className="mb-4 h-8 w-8 animate-spin" />
        Carregando produtos...
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <ProductsTable products={products} />
    </main>
  );
}
