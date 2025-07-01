import React from 'react';
import { render, screen } from '../../../test-utils';
import Contacts from '../index';

describe('Contacts Container', () => {
  it('renders contacts page correctly', () => {
    render(<Contacts />);
    
    // Check for main container
    const contactPage = document.querySelector('.contact-page-first');
    expect(contactPage).toBeInTheDocument();
  });

  it('renders contact borders container', () => {
    render(<Contacts />);
    
    const contactBorders = document.querySelector('.contact-first-borders');
    expect(contactBorders).toBeInTheDocument();
  });

  it('renders first contact person - Син Чжэ', () => {
    render(<Contacts />);
    
    expect(screen.getByText('Син Чжэ (邢哲)')).toBeInTheDocument();
    expect(screen.getByText('Руководитель проекта, backend/frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Телефон: +86 138 0013 8000')).toBeInTheDocument();
    expect(screen.getByText(/Всегда рад помочь по вопросам сотрудничества/)).toBeInTheDocument();
  });

  it('renders second contact person - Ци Дяньюй', () => {
    render(<Contacts />);
    
    expect(screen.getByText('Ци Дяньюй (齐殿宇)')).toBeInTheDocument();
    expect(screen.getByText('Ведущий разработчик, frontend')).toBeInTheDocument();
    expect(screen.getByText('Телефон: +86 139 0013 9000')).toBeInTheDocument();
    expect(screen.getByText(/По всем вопросам интерфейса и пользовательского опыта/)).toBeInTheDocument();
  });

  it('renders contact rectangles for both contacts', () => {
    render(<Contacts />);
    
    const contactRectangles = document.querySelectorAll('.contact-rectangle');
    expect(contactRectangles).toHaveLength(2);
  });

  it('renders contact images for both contacts', () => {
    render(<Contacts />);
    
    const contactImg1 = document.querySelector('.contact-img-1');
    const contactImg2 = document.querySelector('.contact-img-2');
    
    expect(contactImg1).toBeInTheDocument();
    expect(contactImg2).toBeInTheDocument();
  });

  it('renders contact borders for both contacts', () => {
    render(<Contacts />);
    
    const contactBorders = document.querySelectorAll('.contact-border');
    expect(contactBorders).toHaveLength(2);
  });

  it('renders contact names with correct CSS class', () => {
    render(<Contacts />);
    
    const contactNames = document.querySelectorAll('.contact-name');
    expect(contactNames).toHaveLength(2);
    expect(contactNames[0]).toHaveTextContent('Син Чжэ (邢哲)');
    expect(contactNames[1]).toHaveTextContent('Ци Дяньюй (齐殿宇)');
  });

  it('renders position information with correct CSS classes', () => {
    render(<Contacts />);
    
    const positionsRight = document.querySelectorAll('.contact-pos-right');
    const positionsLeft = document.querySelectorAll('.contact-pos-left');
    
    expect(positionsRight).toHaveLength(2);
    expect(positionsLeft).toHaveLength(4); // 2 phone numbers + 2 comments
  });

  it('displays correct phone numbers', () => {
    render(<Contacts />);
    
    expect(screen.getByText('Телефон: +86 138 0013 8000')).toBeInTheDocument();
    expect(screen.getByText('Телефон: +86 139 0013 9000')).toBeInTheDocument();
  });

  it('displays correct job positions', () => {
    render(<Contacts />);
    
    expect(screen.getByText('Руководитель проекта, backend/frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Ведущий разработчик, frontend')).toBeInTheDocument();
  });

  it('displays correct comments for both contacts', () => {
    render(<Contacts />);
    
    expect(screen.getByText(/Всегда рад помочь по вопросам сотрудничества и технической поддержки/)).toBeInTheDocument();
    expect(screen.getByText(/По всем вопросам интерфейса и пользовательского опыта обращайтесь ко мне/)).toBeInTheDocument();
  });

  it('has correct component structure', () => {
    const { container } = render(<Contacts />);
    
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('contact-page-first');
    
    const bordersContainer = mainContainer.firstChild as HTMLElement;
    expect(bordersContainer).toHaveClass('contact-first-borders');
    
    // Should have 2 contact sections
    expect(bordersContainer.children).toHaveLength(2);
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<Contacts />);
    }).not.toThrow();
  });

  it('contains all required CSS classes', () => {
    render(<Contacts />);
    
    // Check for all expected CSS classes
    expect(document.querySelector('.contact-page-first')).toBeInTheDocument();
    expect(document.querySelector('.contact-first-borders')).toBeInTheDocument();
    expect(document.querySelectorAll('.contact-rectangle')).toHaveLength(2);
    expect(document.querySelector('.contact-img-1')).toBeInTheDocument();
    expect(document.querySelector('.contact-img-2')).toBeInTheDocument();
    expect(document.querySelectorAll('.contact-border')).toHaveLength(2);
    expect(document.querySelectorAll('.contact-name')).toHaveLength(2);
    expect(document.querySelectorAll('.contact-pos-right')).toHaveLength(2);
    expect(document.querySelectorAll('.contact-pos-left')).toHaveLength(4);
  });

  it('displays Chinese names correctly', () => {
    render(<Contacts />);
    
    // Test Chinese character rendering
    expect(screen.getByText(/邢哲/)).toBeInTheDocument();
    expect(screen.getByText(/齐殿宇/)).toBeInTheDocument();
  });

  it('displays Russian text correctly', () => {
    render(<Contacts />);

    // Test Russian text rendering
    expect(screen.getByText(/Руководитель проекта/)).toBeInTheDocument();
    expect(screen.getByText(/Ведущий разработчик/)).toBeInTheDocument();
    expect(screen.getAllByText(/Телефон/)).toHaveLength(2);
    expect(screen.getAllByText(/Комментарий/)).toHaveLength(2);
  });
});
