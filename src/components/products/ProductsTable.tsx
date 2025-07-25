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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProducts } from '@/context/productContext';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/product';

type ProductsTableProps = {
  products: Product[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  const { deleteProduct } = useProducts();
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Imagem</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-center w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} className="h-20">
                <TableCell className="align-middle">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="rounded-md object-contain"
                  />
                </TableCell>
                <TableCell
                  className="font-medium truncate align-middle"
                  title={product.title}
                >
                  {product.title}
                </TableCell>
                <TableCell className="align-middle">
                  {product.category}
                </TableCell>
                <TableCell className="text-right align-middle">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      asChild
                      aria-label={`Visualizar ${product.title}`}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                    >
                      <Link href={`/products/${product.id}`} target="_blank">
                        <Eye className="h-4 w-4 text-cyan-500" />
                      </Link>
                    </Button>
                    <Button
                      aria-label={`Editar ${product.title}`}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => handleEdit(product.id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Pencil className="h-4 w-4" />
                      )}
                    </Button>
                    <ConfirmationDialog
                      itemName={product.title}
                      onConfirm={() => handleDelete(product.id)}
                      isPending={isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
