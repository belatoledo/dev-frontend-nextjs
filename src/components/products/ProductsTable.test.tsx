import { toast } from 'sonner';

import { Product } from '@/types/product';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductsTable } from './ProductsTable';

const mockEditAction = jest.fn();
const mockDeleteAction = jest.fn();
const mockDeleteProductFromContext = jest.fn();

jest.mock('@/actions/productActions', () => ({
  editProductAction: (id: number) => mockEditAction(id),
  deleteProductAction: (id: number) => mockDeleteAction(id),
}));

const mockOnProductDeleted = jest.fn();

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/context/productContext', () => ({
  useProductsContext: () => ({
    deleteProduct: mockDeleteProductFromContext,
  }),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Produto Teste 1',
    price: 10,
    category: 'cat1',
    image: '/image1.jpg',
    description: 'desc1',
    rating: { rate: 4, count: 100 },
  },
];

describe('Component: ProductsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render an empty state when no products are provided', () => {
    render(
      <ProductsTable products={[]} onProductDeleted={mockOnProductDeleted} />
    );
    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument();
  });

  it('should render product information correctly', () => {
    render(
      <ProductsTable
        products={mockProducts}
        onProductDeleted={mockOnProductDeleted}
      />
    );
    expect(screen.getByText('Produto Teste 1')).toBeInTheDocument();
  });

  it('should call editProductAction when the edit button is clicked', async () => {
    render(
      <ProductsTable
        products={mockProducts}
        onProductDeleted={mockOnProductDeleted}
      />
    );
    const editButton = screen.getByRole('button', { name: /editar/i });
    await userEvent.click(editButton);
    expect(mockEditAction).toHaveBeenCalledWith(mockProducts[0].id);
  });

  it('should call context delete function after confirmation', async () => {
    mockDeleteAction.mockResolvedValue({
      success: true,
      message: 'Produto deletado com sucesso.',
    });
    render(
      <ProductsTable
        products={mockProducts}
        onProductDeleted={mockOnProductDeleted}
      />
    );

    const deleteTrigger = screen.getByRole('button', { name: /excluir/i });
    await userEvent.click(deleteTrigger);

    const confirmButton = await screen.findByRole('button', {
      name: /confirmar/i,
    });
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteAction).toHaveBeenCalledWith(mockProducts[0].id);
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Produto deletado com sucesso.'
      );
    });
    expect(mockDeleteProductFromContext).toHaveBeenCalledWith(
      mockProducts[0].id
    );
  });
});
