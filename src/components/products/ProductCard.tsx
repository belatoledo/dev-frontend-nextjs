import { Product } from '@/types/product';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto h-48 w-full object-contain"
      />
      <h3 className="mt-4 text-lg font-semibold truncate">{product.title}</h3>
      <p className="mt-2 text-xl font-bold text-gray-900">
        R$ {product.price.toFixed(2)}
      </p>
    </div>
  );
};
