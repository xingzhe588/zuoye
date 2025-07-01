import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailPageKab from '../index';

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
      <DetailPageKab />
    </BrowserRouter>
  );
};

describe('DetailPageKab Component', () => {
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

    const imageSection = document.querySelector('.detail-biboppng');
    expect(imageSection).toBeInTheDocument();
  });

  it('displays artwork title', () => {
    renderWithRouter();

    expect(screen.getByText('Футбольная серия')).toBeInTheDocument();
    expect(screen.getByText('Легенда Золотого мяча')).toBeInTheDocument();
  });

  it('displays artwork details', () => {
    renderWithRouter();

    expect(screen.getByText('Cheburasha')).toBeInTheDocument();
    expect(screen.getByText('15 ₽')).toBeInTheDocument();
  });

  it('displays back to collection link', () => {
    renderWithRouter();
    
    const backLink = screen.getByText('Назад к коллекции').closest('a');
    expect(backLink).toHaveAttribute('href', '/project-monday/collection');
  });

  it('renders detail container structure', () => {
    renderWithRouter();
    
    const container = document.querySelector('.detail-app');
    expect(container).toBeInTheDocument();
  });

  it('renders artwork info section', () => {
    renderWithRouter();
    
    const infoSection = document.querySelector('.detail-info');
    expect(infoSection).toBeInTheDocument();
  });
});
