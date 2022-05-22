import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { UserProvider } from '../../../UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('renders the Home page', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    )
    const homeElement = screen.getByTestId('Home');
    expect(homeElement).toBeInTheDocument();
  });

  it('renders the Navbar', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    )
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });
});
