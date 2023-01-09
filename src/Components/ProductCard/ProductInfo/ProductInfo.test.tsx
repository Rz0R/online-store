import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductInfo from '.';
import { ITEMS } from '../../../mocks/data';

describe('ProductInfo', () => {
  test('renders product info title', () => {
    render(
      <BrowserRouter>
        <ProductInfo currentItem={ITEMS[0]} />
      </BrowserRouter>,
    );

    const regex = new RegExp(ITEMS[0].title, 'i');
    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});
