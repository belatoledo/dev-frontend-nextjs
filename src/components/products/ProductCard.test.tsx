import { Product } from '@/types/product';
import { render, screen } from '@testing-library/react';

import { ProductCard } from './ProductCard';

const mockProduct: Product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description: 'Your perfect pack for everyday use and walks in the forest.',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe('Component: ProductCard', () => {
  it('should render product title, image, and price correctly', () => {
    render(<ProductCard product={mockProduct} />);

    const titleElement = screen.getByText(mockProduct.title);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img', { name: mockProduct.title });
    expect(imageElement).toBeInTheDocument();

    const priceElement = screen.getByText(/109.95/i);
    expect(priceElement).toBeInTheDocument();
  });
});
