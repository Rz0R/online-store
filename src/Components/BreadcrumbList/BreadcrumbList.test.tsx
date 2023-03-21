import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BreadcrumbList from '.';
import { BREADCRUMBS } from '../../mocks/data';

describe('BreadcrumbList', () => {
  test('renders breadcrumb list', () => {
    render(
      <BrowserRouter>
        <BreadcrumbList
          category={BREADCRUMBS.category}
          brand={BREADCRUMBS.brand}
          title={BREADCRUMBS.title}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Store/i)).toBeInTheDocument();

    Object.values(BREADCRUMBS).forEach((value) => {
      const regex = new RegExp(value, 'i');
      expect(screen.getByText(regex)).toBeInTheDocument();
    });
  });
});
