import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { getProductById } from '@/services/productService';

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  try {
    const product = await getProductById(params.id);

    return (
      <>
        <div className="pt-8 pl-8">
          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg border p-4">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="aspect-square w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold leading-tight">
                {product.title}
              </h1>
              <p className="text-muted-foreground">{product.category}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating.rate)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.count} avaliações)
                </span>
              </div>
              <p className="text-3xl font-extrabold text-primary">
                {formatCurrency(product.price)}
              </p>
              <p className="text-base leading-relaxed text-foreground/80">
                {product.description}
              </p>
              <Button size="lg" className="mt-4 w-full">
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}
