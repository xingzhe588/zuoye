import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailPageMonk from '../index';

// Mock brojs navigation
jest.mock('@brojs/cli', () => ({
  getNavigationValue: (key: string) => {
    const routes: Record<string, string> = {
      'project-monday.collection': '/project-monday/collection',
    };
    return routes[key] || '/';
  },
}));

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <DetailPageMonk />
    </BrowserRouter>
  );
};

describe('DetailPageMonk Component', () => {
  it('renders without crashing', () => {
    expect(() => {
      renderWithRouter();
    }).not.toThrow();
  });

  it('displays detail page content', () => {
    renderWithRouter();

    const detailPage = document.querySelector('.detail-block');
    expect(detailPage).toBeInTheDocument();
  });

  it('displays detail structure', () => {
    renderWithRouter();

    const detailBlock1 = document.querySelector('.detail-block-1');
    expect(detailBlock1).toBeInTheDocument();
  });

  it('displays artwork details section', () => {
    renderWithRouter();

    expect(screen.getByText('Детали')).toBeInTheDocument();
    expect(screen.getByText('Создатель:')).toBeInTheDocument();
    expect(screen.getAllByText('8PC')).toHaveLength(2); // Creator and Owner both show 8PC
  });

  it('displays artwork info', () => {
    renderWithRouter();

    expect(screen.getByText('Баскетбольная серия')).toBeInTheDocument();
    expect(screen.getByText('Король данков')).toBeInTheDocument();
  });

  it('displays price information', () => {
    renderWithRouter();

    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('13 ₽')).toBeInTheDocument();
  });

  it('renders detail container structure', () => {
    renderWithRouter();

    const container = document.querySelector('.detail-block');
    expect(container).toBeInTheDocument();
  });

  it('renders artwork details section', () => {
    renderWithRouter();

    const detailsSection = document.querySelector('.detail-details');
    expect(detailsSection).toBeInTheDocument();
  });
});
