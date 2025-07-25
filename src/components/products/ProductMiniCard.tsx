'use client';

import { useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Pencil, LoaderCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

import {
  editProductAction,
  deleteProductAction,
} from '@/actions/productActions';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProductsContext } from '@/context/productContext';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/product';

type ProductsMiniCardProps = {
  products: Product[];
  onProductDeleted: (productId: number) => void;
};

export const ProductMiniCard = ({ products }: ProductsMiniCardProps) => {
  const { deleteProduct } = useProductsContext();
  const [isPending, startTransition] = useTransition();

  const handleEdit = (id: number) => {
    startTransition(() => {
      editProductAction(id);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await deleteProductAction(id);
      if (result.success) {
        toast.success(result.message);
        deleteProduct(id);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:hidden">
      {products.length > 0 ? (
        products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col sm:flex-row items-center sm:items-start rounded-lg border p-4 shadow-sm"
          >
            <div className="w-full sm:w-1/4 flex justify-center sm:justify-start mb-4 sm:mb-0 sm:mr-4">
              <Image
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                className="rounded-md object-contain"
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow sm:w-2/4">
              <h3 className="font-semibold text-lg truncate max-w-full sm:max-w-[200px]">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="font-bold text-xl mt-1">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 mt-4 sm:mt-0 sm:ml-auto sm:w-1/4">
              <Button
                asChild
                aria-label={`Visualizar ${product.title}`}
                size="icon"
                variant="outline"
                className="h-9 w-9"
              >
                <Link href={`/products/${product.id}`} target="_blank">
                  <Eye className="h-5 w-5 text-cyan-500" />
                </Link>
              </Button>
              <Button
                aria-label={`Editar ${product.title}`}
                size="icon"
                variant="outline"
                className="h-9 w-9"
                onClick={() => handleEdit(product.id)}
                disabled={isPending}
              >
                {isPending ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Pencil className="h-5 w-5" />
                )}
              </Button>

              <ConfirmationDialog
                itemName={product.title}
                onConfirm={() => handleDelete(product.id)}
                isPending={isPending}
              />
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          Nenhum produto encontrado.
        </div>
      )}
    </div>
  );
};
