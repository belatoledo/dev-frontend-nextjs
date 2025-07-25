import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/services/productService';

type EditProductPageProps = {
  params: { id: string };
};

export default async function EditProductPage(props: EditProductPageProps) {
  const { params } = props;

  try {
    const product = await getProductById(params.id);

    const initialData = {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };

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
        <h1 className="mb-8 text-3xl font-bold">Editar Produto</h1>
        <ProductForm initialData={initialData} productId={product.id} />
      </div>
    );
  } catch {
    notFound();
  }
}
