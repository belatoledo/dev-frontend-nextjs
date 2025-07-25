import { render, screen } from '@testing-library/react';

import LoginPage from './page';

jest.mock('@/components/auth/LoginForm', () => ({
  LoginForm: () => {
    return <div data-testid="mocked-login-form">Formulário de Login</div>;
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Page: Login', () => {
  it('should render the main interactive elements', () => {
    render(<LoginPage />);

    const loginForm = screen.getByTestId('mocked-login-form');
    expect(loginForm).toBeInTheDocument();

    const copyrightText = screen.getByText(
      /diamond management. todos os direitos reservados/i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it('should render the background image with correct alt text', () => {
    render(<LoginPage />);

    const image = screen.getByAltText(
      /diamantes azuis sobre uma superfície escura/i
    );
    expect(image).toBeInTheDocument();
  });

  it('should render the welcome text on top of the image', () => {
    render(<LoginPage />);

    const welcomeHeading = screen.getByRole('heading', {
      name: /bem-vindo de volta!/i,
    });
    const welcomeText = screen.getByText(
      /mantenha seu negócio sob controle com diamond management/i
    );

    expect(welcomeHeading).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });
});
