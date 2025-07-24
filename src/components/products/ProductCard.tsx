'use client';

import React, { useState, useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Heart, Pencil } from 'lucide-react';
import { toast } from 'sonner';

import {
  editProductAction,
  deleteProductAction,
} from '@/actions/productActions';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/product';

import { ConfirmationDialog } from '../shared/ConfirmationDialog';

type ProductCardProps = {
  product: Product;
  isAdminView?: boolean;
};

export const ProductCard = ({
  product,
  isAdminView = false,
}: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast.success(
      !isFavorited
        ? 'Produto adicionado aos favoritos!'
        : 'Produto removido dos favoritos!'
    );
  };

  const handleEdit = () => {
    startTransition(async () => {
      await editProductAction(product.id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProductAction(product.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
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

      {isAdminView && (
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
            disabled={isPending}
            aria-label={`Editar ${product.title}`}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <ConfirmationDialog
            itemName={product.title}
            onConfirm={handleDelete}
            isPending={isPending}
          />
        </div>
      )}

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
