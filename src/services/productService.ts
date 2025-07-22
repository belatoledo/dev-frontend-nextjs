import { Product } from "@/types/product";
import api from "@/lib/api";

const PRODUCTS_PATH = "/products";

export const getProducts = (): Promise<Product[]> => {
  return api<Product[]>(PRODUCTS_PATH);
};

export const getProductById = (id: string): Promise<Product> => {
  return api<Product>(`${PRODUCTS_PATH}/${id}`);
};

export const createNewProduct = (
  productData: Omit<Product, "id" | "rating">
): Promise<Product> => {
  return api<Product>(PRODUCTS_PATH, {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

export const updateProduct = (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  return api<Product>(`${PRODUCTS_PATH}/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = (id: string): Promise<void> => {
  return api<void>(`${PRODUCTS_PATH}/${id}`, {
    method: "DELETE",
  });
};
