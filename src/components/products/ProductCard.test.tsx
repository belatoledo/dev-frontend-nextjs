import { toast } from 'sonner';

import { Product } from '@/types/product';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductCard } from './ProductCard';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Fjallraven Backpack',
  price: 109.95,
  description: 'A great backpack.',
  category: 'gear',
  image: 'https://fakestoreapi.com/img/example.jpg',
  rating: { rate: 3.9, count: 120 },
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: mockProduct.title })
    ).toBeInTheDocument();
    expect(screen.getByText(/R\$ 109,95/)).toBeInTheDocument();
  });

  it('should have a working details link', () => {
    render(<ProductCard product={mockProduct} />);

    const detailsLink = screen.getByRole('link', { name: /ver detalhes/i });
    expect(detailsLink).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  describe('Favorite functionality', () => {
    it('should toggle favorite state and show notifications', async () => {
      const user = userEvent.setup();
      render(<ProductCard product={mockProduct} />);

      const favoriteButton = screen.getByRole('button', {
        name: /adicionar aos favoritos/i,
      });

      await user.click(favoriteButton);

      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
      expect(toast.success).toHaveBeenCalledWith(
        'Produto adicionado aos favoritos!'
      );
      expect(favoriteButton).toHaveAccessibleName('Remover dos favoritos');

      await user.click(favoriteButton);

      expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
      expect(toast.success).toHaveBeenCalledWith(
        'Produto removido dos favoritos!'
      );
      expect(favoriteButton).toHaveAccessibleName('Adicionar aos favoritos');
    });
  });
});
