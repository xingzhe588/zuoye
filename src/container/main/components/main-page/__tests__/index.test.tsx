import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../index';

// Mock image imports
jest.mock('../../../../../assets/images/labubu.png', () => 'test-image-url');

// Mock brojs navigation
jest.mock('@brojs/cli', () => ({
  getNavigationValue: (key: string) => {
    const routes: Record<string, string> = {
      'project-monday.create-nft': '/project-monday/create-nft',
      'project-monday.collection': '/project-monday/collection',
    };
    return routes[key] || '/';
  },
}));

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
};

describe('MainPage Component', () => {
  it('renders without crashing', () => {
    expect(() => {
      renderWithRouter();
    }).not.toThrow();
  });

  it('displays main title', () => {
    renderWithRouter();
    
    expect(screen.getByText('AI ART')).toBeInTheDocument();
    expect(screen.getByText('REVOLUTION')).toBeInTheDocument();
  });

  it('displays navigation buttons', () => {
    renderWithRouter();
    
    expect(screen.getByText('Generate Art')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    renderWithRouter();
    
    const generateArtLink = screen.getByText('Generate Art').closest('a');
    const exploreLink = screen.getByText('Explore').closest('a');
    
    expect(generateArtLink).toHaveAttribute('href', '/project-monday/create-nft');
    expect(exploreLink).toHaveAttribute('href', '/project-monday/collection');
  });

  it('renders main page container', () => {
    renderWithRouter();
    
    const container = document.querySelector('.main-page');
    expect(container).toBeInTheDocument();
  });

  it('renders title block', () => {
    renderWithRouter();
    
    const titleBlock = document.querySelector('.main-title-block');
    expect(titleBlock).toBeInTheDocument();
  });

  it('renders button section', () => {
    renderWithRouter();

    const buttonsSection = document.querySelector('.main-two-buttoms');
    expect(buttonsSection).toBeInTheDocument();
  });

  it('displays description text', () => {
    renderWithRouter();

    expect(screen.getByText(/ArtVision is a revolutionary platform/)).toBeInTheDocument();
    expect(screen.getByText(/digital art pieces/)).toBeInTheDocument();
    expect(screen.getByText(/state-of-the-art technology/)).toBeInTheDocument();
  });

  it('displays cat image', () => {
    renderWithRouter();

    const image = screen.getByAltText('Cat');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('main-cat-logo');
    expect(image).toHaveAttribute('src', 'test-image-url');
  });

  it('renders all CSS classes correctly', () => {
    renderWithRouter();

    expect(document.querySelector('.main-page-container')).toBeInTheDocument();
    expect(document.querySelector('.main-title-part')).toBeInTheDocument();
    expect(document.querySelector('.main-nft-market')).toBeInTheDocument();
    expect(document.querySelector('.main-with-discounts')).toBeInTheDocument();
    expect(document.querySelector('.main-button-buy-nft-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.main-button-galery-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.main-text-about-nft')).toBeInTheDocument();
    expect(document.querySelector('.main-logo')).toBeInTheDocument();
  });

  it('has proper link classes', () => {
    renderWithRouter();

    expect(document.querySelector('.main-fix-link-buy')).toBeInTheDocument();
    expect(document.querySelector('.main-fix-link')).toBeInTheDocument();
  });

  it('renders button elements with correct classes', () => {
    renderWithRouter();

    expect(document.querySelector('.main-button-buy-nft')).toBeInTheDocument();
    expect(document.querySelector('.main-button-galery')).toBeInTheDocument();
  });
});
