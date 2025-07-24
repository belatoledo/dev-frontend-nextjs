import { toast } from 'sonner';

import { Product } from '@/types/product';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductCard } from './ProductCard';

const mockEditAction = jest.fn();
const mockDeleteAction = jest.fn();

jest.mock('@/actions/productActions', () => ({
  editProductAction: (id: number) => mockEditAction(id),
  deleteProductAction: (id: number) => mockDeleteAction(id),
}));

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

describe('Component: ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Public View (isAdminView = false)', () => {
    it('should render core product information', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument();
      expect(
        screen.getByRole('img', { name: /Fjallraven Backpack/i })
      ).toBeInTheDocument();
      expect(screen.getByText('R$ 109,95')).toBeInTheDocument();
    });

    it('should have a link to the product details page', () => {
      render(<ProductCard product={mockProduct} />);

      const detailsLink = screen.getByRole('link', { name: /ver detalhes/i });
      expect(detailsLink).toHaveAttribute('href', '/products/1');
    });

    it('should not render admin action buttons', () => {
      render(<ProductCard product={mockProduct} />);
      expect(
        screen.queryByRole('button', { name: /editar/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /excluir/i })
      ).not.toBeInTheDocument();
    });

    it('should toggle favorite status and show toast notification on click', async () => {
      render(<ProductCard product={mockProduct} />);

      const favoriteButton = screen.getByRole('button', {
        name: /adicionar aos favoritos/i,
      });
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');

      await userEvent.click(favoriteButton);

      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
      expect(toast.success).toHaveBeenCalledWith(
        'Produto adicionado aos favoritos!'
      );
      expect(favoriteButton).toHaveAccessibleName('Remover dos favoritos');
    });
  });

  describe('Admin View (isAdminView = true)', () => {
    it('should render admin action buttons', () => {
      render(<ProductCard product={mockProduct} isAdminView />);

      expect(
        screen.getByRole('button', { name: /editar/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /excluir/i })
      ).toBeInTheDocument();
    });

    it('should call editProductAction when edit button is clicked', async () => {
      render(<ProductCard product={mockProduct} isAdminView />);

      const editButton = screen.getByRole('button', { name: /editar/i });
      await userEvent.click(editButton);

      expect(mockEditAction).toHaveBeenCalledTimes(1);
      expect(mockEditAction).toHaveBeenCalledWith(1);
    });

    it('should open confirmation dialog and call deleteProductAction on confirm', async () => {
      mockDeleteAction.mockResolvedValue({
        success: true,
        message: 'Produto deletado.',
      });

      render(<ProductCard product={mockProduct} isAdminView />);

      const deleteTrigger = screen.getByRole('button', { name: /excluir/i });
      await userEvent.click(deleteTrigger);

      const dialog = await screen.findByRole('alertdialog');
      expect(dialog).toBeInTheDocument();

      const dialogDescription = screen.getByText(
        (content) =>
          content.startsWith('Esta ação não pode ser desfeita.') &&
          content.includes(mockProduct.title)
      );
      expect(dialogDescription).toBeInTheDocument();

      const confirmButton = screen.getByRole('button', { name: /confirmar/i });
      await userEvent.click(confirmButton);

      expect(mockDeleteAction).toHaveBeenCalledTimes(1);
      expect(mockDeleteAction).toHaveBeenCalledWith(1);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Produto deletado.');
      });
    });
  });
});
