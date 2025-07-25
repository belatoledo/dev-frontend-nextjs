import { render, screen } from '@testing-library/react';

import { SidebarNav } from './SidebarNav';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => mockUsePathname(),
}));

describe('Component: SidebarNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should highlight the "Gerenciar produtos" link when on the dashboard page', () => {
    mockUsePathname.mockReturnValue('/dashboard/products');

    render(<SidebarNav />);

    const productsLink = screen.getByRole('link', {
      name: /gerenciar produtos/i,
    });
    const storeLink = screen.getByRole('link', { name: /ver loja/i });

    expect(productsLink).toHaveAttribute('aria-current', 'page');
    expect(storeLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('should highlight the "Ver Loja" link when on the homepage', () => {
    mockUsePathname.mockReturnValue('/products');

    render(<SidebarNav />);

    const productsLink = screen.getByRole('link', {
      name: /gerenciar produtos/i,
    });
    const storeLink = screen.getByRole('link', { name: /ver loja/i });

    expect(storeLink).toHaveAttribute('aria-current', 'page');
    expect(productsLink).not.toHaveAttribute('aria-current', 'page');
  });
});
