'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
  addProduct: (newProductData: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = localStorage.getItem('products');

        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
          setIsLoading(false);
        } else {
          const apiProducts = await getProducts();
          setProducts(apiProducts);
          localStorage.setItem('products', JSON.stringify(apiProducts));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          'Falha ao carregar produtos (inicial ou do localStorage):',
          error
        );
        setProducts([]);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating'>) => {
    const productWithId: Product = {
      ...newProductData,
      id: Date.now(),
      rating: { rate: 0, count: 0 },
    };
    const updatedProducts = [productWithId, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const value = {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useProductsContext deve ser usado dentro de um ProductsProvider'
    );
  }
  return context;
};
