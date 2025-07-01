import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Collection from '../index';

// Mock image imports
jest.mock('/src/assets/images/PixelMan.png', () => 'pixel-man.png', { virtual: true });
jest.mock('/src/assets/images/HarmonyJapan.png', () => 'harmony-japan.png', { virtual: true });
jest.mock('/src/assets/images/NatureCity.png', () => 'nature-city.png', { virtual: true });

describe('Collection', () => {
  it('renders without crashing', () => {
    render(<Collection />);
    // Check for category buttons instead of title
    expect(screen.getByText('Все')).toBeInTheDocument();
  });

  it('displays all collection items by default', () => {
    render(<Collection />);

    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    expect(screen.getByText('Город природы')).toBeInTheDocument();
  });

  it('displays collection item details', () => {
    render(<Collection />);

    // Check first item details
    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.getByText(/Александр/)).toBeInTheDocument();
    expect(screen.getByText(/12 000 ₽/)).toBeInTheDocument();
    expect(screen.getByText('Пиксель-арт')).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<Collection />);
    
    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Пиксель-арт')).toBeInTheDocument();
    expect(screen.getByText('Японский стиль')).toBeInTheDocument();
    expect(screen.getByText('Город и природа')).toBeInTheDocument();
  });

  it('filters items by category', () => {
    render(<Collection />);
    
    // Click on "Пиксель-арт" category
    fireEvent.click(screen.getByText('Пиксель-арт'));
    
    // Should show only pixel art item
    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.queryByText('Гармония Японии')).not.toBeInTheDocument();
    expect(screen.queryByText('Город природы')).not.toBeInTheDocument();
  });

  it('filters items by Japanese style category', () => {
    render(<Collection />);
    
    fireEvent.click(screen.getByText('Японский стиль'));
    
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    expect(screen.queryByText('Пиксельный человек')).not.toBeInTheDocument();
    expect(screen.queryByText('Город природы')).not.toBeInTheDocument();
  });

  it('filters items by city and nature category', () => {
    render(<Collection />);
    
    fireEvent.click(screen.getByText('Город и природа'));
    
    expect(screen.getByText('Город природы')).toBeInTheDocument();
    expect(screen.queryByText('Пиксельный человек')).not.toBeInTheDocument();
    expect(screen.queryByText('Гармония Японии')).not.toBeInTheDocument();
  });

  it('shows all items when "Все" category is selected', () => {
    render(<Collection />);
    
    // First filter by a specific category
    fireEvent.click(screen.getByText('Пиксель-арт'));
    expect(screen.queryByText('Гармония Японии')).not.toBeInTheDocument();
    
    // Then click "Все" to show all items
    fireEvent.click(screen.getByText('Все'));
    
    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    expect(screen.getByText('Город природы')).toBeInTheDocument();
  });

  it('highlights selected category button', () => {
    render(<Collection />);
    
    const pixelArtButton = screen.getByText('Пиксель-арт');
    fireEvent.click(pixelArtButton);
    
    // Check if the button has active class (assuming CSS class is applied)
    expect(pixelArtButton.closest('button')).toHaveClass('active');
  });

  it('displays collection images', () => {
    render(<Collection />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    expect(images[0]).toHaveAttribute('src', 'pixel-man.png');
    expect(images[1]).toHaveAttribute('src', 'harmony-japan.png');
    expect(images[2]).toHaveAttribute('src', 'nature-city.png');
  });

  it('displays correct alt text for images', () => {
    render(<Collection />);
    
    expect(screen.getByAltText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.getByAltText('Гармония Японии')).toBeInTheDocument();
    expect(screen.getByAltText('Город природы')).toBeInTheDocument();
  });

  it('displays author information', () => {
    render(<Collection />);

    expect(screen.getByText(/Александр/)).toBeInTheDocument();
    expect(screen.getByText(/Мария/)).toBeInTheDocument();
    expect(screen.getByText(/Дмитрий/)).toBeInTheDocument();
  });

  it('displays price information', () => {
    render(<Collection />);

    expect(screen.getByText(/12 000 ₽/)).toBeInTheDocument();
    expect(screen.getByText(/18 500 ₽/)).toBeInTheDocument();
    expect(screen.getByText(/15 000 ₽/)).toBeInTheDocument();
  });

  it('maintains filter state across interactions', () => {
    render(<Collection />);
    
    // Select a category
    fireEvent.click(screen.getByText('Японский стиль'));
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    expect(screen.queryByText('Пиксельный человек')).not.toBeInTheDocument();
    
    // The filter should remain active
    expect(screen.getByText('Японский стиль').closest('button')).toHaveClass('active');
  });

  it('handles empty filter results gracefully', () => {
    render(<Collection />);
    
    // All categories should have items, but test the filtering logic
    fireEvent.click(screen.getByText('Пиксель-арт'));
    
    // Should show only one item
    const items = screen.getAllByText(/₽/);
    expect(items).toHaveLength(1);
  });

  it('renders collection grid layout', () => {
    const { container } = render(<Collection />);

    const collectionGrid = container.querySelector('.collection-icons');
    expect(collectionGrid).toBeInTheDocument();
  });

  it('renders category filters layout', () => {
    const { container } = render(<Collection />);

    const categoryFilters = container.querySelector('.collection-category-bar');
    expect(categoryFilters).toBeInTheDocument();
  });

  it('displays collection components', () => {
    render(<Collection />);

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Пиксель-арт')).toBeInTheDocument();
  });

  it('handles multiple category switches', () => {
    render(<Collection />);
    
    // Switch between categories multiple times
    fireEvent.click(screen.getByText('Пиксель-арт'));
    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Японский стиль'));
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Город и природа'));
    expect(screen.getByText('Город природы')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Все'));
    expect(screen.getByText('Пиксельный человек')).toBeInTheDocument();
    expect(screen.getByText('Гармония Японии')).toBeInTheDocument();
    expect(screen.getByText('Город природы')).toBeInTheDocument();
  });

  it('renders collection item cards with proper structure', () => {
    const { container } = render(<Collection />);

    const collectionItems = container.querySelectorAll('.collection-icon');
    expect(collectionItems).toHaveLength(3);

    // Each item should have image, name, author, price, and category
    collectionItems.forEach(item => {
      expect(item.querySelector('img')).toBeInTheDocument();
      expect(item.querySelector('.collection-name')).toBeInTheDocument();
      expect(item.querySelector('.collection-meta')).toBeInTheDocument();
    });
  });
});
