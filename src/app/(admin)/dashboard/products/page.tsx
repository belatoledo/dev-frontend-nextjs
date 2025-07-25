'use client';

import { useState } from 'react';

import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { ProductMiniCard } from '@/components/products/ProductMiniCard';
import { ProductsTable } from '@/components/products/ProductsTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { Button } from '@/components/ui/button';
import { useProductsContext } from '@/context/productContext';

const ITEMS_PER_PAGE = 7;

export default function ProductsManagementPage() {
  const { products, isLoading, deleteProduct } = useProductsContext();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const lastItemIndex = currentPage * ITEMS_PER_PAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PER_PAGE;
  const currentProducts = products.slice(firstItemIndex, lastItemIndex);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner size="lg" text="Carregando produtos..." />
      </div>
    );
  }

  return (
    <main className="container mx-auto pa-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Gerenciar produtos</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <div>
        <div className="lg:hidden">
          <ProductMiniCard
            products={currentProducts}
            onProductDeleted={deleteProduct}
          />
        </div>
        <div className="hidden lg:block">
          <ProductsTable
            products={currentProducts}
            onProductDeleted={deleteProduct}
          />
        </div>{' '}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
