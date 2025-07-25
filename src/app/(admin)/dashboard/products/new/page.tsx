import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';

export default function NewProductPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/dashboard/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Adicionar Novo Produto</h1>
      <ProductForm />
    </div>
  );
}
