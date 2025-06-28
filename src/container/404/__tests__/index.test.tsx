import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../index';

// Mock the brojs navigation value
jest.mock('@brojs/cli', () => ({
  getNavigationValue: jest.fn(() => '/'),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NotFoundPage', () => {
  it('renders 404 error message', () => {
    renderWithRouter(<NotFoundPage />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Извините, запрашиваемая страница не существует.')).toBeInTheDocument();
  });

  it('renders return to home button', () => {
    renderWithRouter(<NotFoundPage />);
    
    const homeButton = screen.getByText('Вернуться на главную');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton.tagName).toBe('BUTTON');
  });

  it('has correct link to home page', () => {
    renderWithRouter(<NotFoundPage />);
    
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has correct CSS classes', () => {
    const { container } = renderWithRouter(<NotFoundPage />);
    
    expect(container.querySelector('.notfound-page')).toBeInTheDocument();
    expect(container.querySelector('.notfound-rect')).toBeInTheDocument();
    expect(container.querySelector('.error-content')).toBeInTheDocument();
  });

  it('renders heading elements with correct hierarchy', () => {
    renderWithRouter(<NotFoundPage />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('404');
    expect(h2).toHaveTextContent('Страница не найдена');
  });

  it('renders paragraph with error description', () => {
    renderWithRouter(<NotFoundPage />);
    
    const paragraph = screen.getByText('Извините, запрашиваемая страница не существует.');
    expect(paragraph.tagName).toBe('P');
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithRouter(<NotFoundPage />);
    }).not.toThrow();
  });

  it('has accessible structure', () => {
    renderWithRouter(<NotFoundPage />);
    
    // Check for proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    
    // Check for link accessibility
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    
    // Check for button accessibility
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays content in correct order', () => {
    const { container } = renderWithRouter(<NotFoundPage />);
    
    const errorContent = container.querySelector('.error-content');
    const children = errorContent?.children;
    
    expect(children?.[0].tagName).toBe('H1');
    expect(children?.[1].tagName).toBe('H2');
    expect(children?.[2].tagName).toBe('P');
    expect(children?.[3].tagName).toBe('A'); // Link element
  });

  it('uses correct text content', () => {
    renderWithRouter(<NotFoundPage />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Извините, запрашиваемая страница не существует.')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
