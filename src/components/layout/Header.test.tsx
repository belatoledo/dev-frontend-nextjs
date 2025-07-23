import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Component: Header', () => {
  it('should render the logo, search input, and login button', () => {
    render(<Header />);

    const logoLink = screen.getByRole('link', { name: /diamond store/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const searchInput = screen.getByPlaceholderText(/buscar produtos.../i);
    expect(searchInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
