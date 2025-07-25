'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast.success(
      !isFavorited
        ? 'Produto adicionado aos favoritos!'
        : 'Produto removido dos favoritos!'
    );
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 hover:shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full"
        onClick={handleFavoriteClick}
        aria-pressed={isFavorited}
        aria-label={
          isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
      >
        <Heart
          className={`h-6 w-6 transition-colors ${
            isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
          }`}
        />
      </Button>

      <div className="p-6 pt-12">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="mx-auto aspect-square w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-0">
        <h3 className="flex-1 text-lg font-semibold leading-tight text-foreground">
          {product.title}
        </h3>
        <p className="mt-2 text-2xl font-bold text-foreground">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="mt-auto border-t p-4">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>Ver detalhes</Link>
        </Button>
      </div>
    </div>
  );
};
