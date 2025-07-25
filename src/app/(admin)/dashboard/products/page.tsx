'use client';

import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { ProductsTable } from '@/components/products/ProductsTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/productContext';

export default function ProductsManagementPage() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <LoadingSpinner text="Carregando produtos..." />;
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
