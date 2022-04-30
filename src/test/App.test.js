import { render, screen } from '@testing-library/react';
import App from '../components/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Popular Games/i);
  expect(linkElement).toBeInTheDocument();
});
