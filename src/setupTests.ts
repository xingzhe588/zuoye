// Jest setup file
import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder for Node.js environment
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock localStorage with actual storage functionality
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage with actual storage functionality
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(global, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
  },
  writable: true,
});

// Mock fetch
Object.defineProperty(global, 'fetch', {
  value: jest.fn(),
  writable: true,
});

// Mock IntersectionObserver
Object.defineProperty(global, 'IntersectionObserver', {
  value: class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
  },
  writable: true,
});

// Mock ResizeObserver
Object.defineProperty(global, 'ResizeObserver', {
  value: class ResizeObserver {
    constructor() {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
  },
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock brojs CLI
jest.mock('@brojs/cli', () => ({
  getConfigValue: jest.fn(() => 'http://localhost:8000'),
  getNavigationValue: jest.fn(() => '/project-monday'),
}));
