'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { productSchema, ProductFormData } from '@/lib/schemas';
import { createNewProduct, deleteProduct } from '@/services/productService';

export async function createProductAction(data: ProductFormData) {
  const validation = productSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: 'Dados inválidos.' };
  }

  try {
    const newProduct = await createNewProduct(validation.data);

    revalidatePath('/dashboard/products');

    return { success: true, product: newProduct };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Não foi possível criar o produto.' };
  }
}

export async function deleteProductAction(id: number) {
  try {
    const deletedProduct = await deleteProduct(id.toString());

    revalidatePath('/dashboard/products');

    return {
      success: true,
      message: `Produto "${deletedProduct.title}" deletado com sucesso.`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Não foi possível deletar o produto.' };
  }
}

export async function editProductAction(id: number) {
  redirect(`/dashboard/products/${id}/edit`);
}
