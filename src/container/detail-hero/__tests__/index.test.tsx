import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailPageHero from '../index';

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
      <DetailPageHero />
    </BrowserRouter>
  );
};

describe('DetailPageHero Component', () => {
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

  it('displays artwork image section', () => {
    renderWithRouter();

    const imageSection = document.querySelector('.detail-heropng');
    expect(imageSection).toBeInTheDocument();
  });

  it('displays artwork title', () => {
    renderWithRouter();

    expect(screen.getByText('Теннисная серия')).toBeInTheDocument();
    expect(screen.getByText('Чемпион Уимблдона')).toBeInTheDocument();
  });

  it('displays artwork details', () => {
    renderWithRouter();

    expect(screen.getByText('GrandMenu')).toBeInTheDocument();
    expect(screen.getByText('18 ₽')).toBeInTheDocument();
  });

  it('displays action buttons', () => {
    renderWithRouter();

    expect(screen.getByText('Купить сейчас')).toBeInTheDocument();
    expect(screen.getByText('Сделать ставку')).toBeInTheDocument();
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
