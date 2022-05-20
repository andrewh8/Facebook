import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from '../Login';


describe('Login', () => {
  it('renders a form', async () => {
    render(<Context.Provider><Login /></Context.Provider>);
    const headingElement = await screen.findByText('Facebook Clone');
    expect(headingElement).toBeInTheDocument();
  });
});

