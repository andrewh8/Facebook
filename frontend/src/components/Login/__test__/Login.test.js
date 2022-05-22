import { render, screen, fireEvent, findByText } from '@testing-library/react';
import Login from '../Login';
import { UserProvider } from '../../../UserContext';
import { BrowserRouter } from 'react-router-dom';



describe('Login', () => {
  it('renders the Facebook Clone brand text', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    )
    const brandNameElement = screen.getByRole('heading', {name: 'Facebook Clone'});
    expect(brandNameElement).toBeInTheDocument();
  })

  it('renders a login form', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    )
    const formElement = screen.getByPlaceholderText('Email');
    expect(formElement).toBeInTheDocument();
  })

})
